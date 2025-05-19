import { useEffect, useState } from "react";
import { z, ZodObject } from "zod";
import { FieldDefinition } from "../../types/types";


export default function useFormDefinition(endpoint: string) {
  const [fields, setFields] = useState<FieldDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [schema, setSchema] = useState<ZodObject<any>>(z.object({}));

  useEffect(() => {
    fetch(`http://localhost:8080/form-definitions/${endpoint}`)
      .then((res) => res.json())
      .then((fieldDefs: FieldDefinition[]) => {
        setFields(fieldDefs);
        setSchema(generateZodSchema(fieldDefs));
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { fields, loading, schema };
}

function generateZodSchema(fields: FieldDefinition[]) {
  const shape: Record<string, any> = {};
  
  for (const field of fields) {
    const rules = field.validation || {};
    let zodField;

    if (field.type === "number") {
      zodField = z.coerce.number({
        required_error: `${field.label} is required`,
        invalid_type_error: `${field.label} must be a number`,
      });

      if (rules.min) {
        zodField = zodField.min(rules.min, `${field.label} must be at least ${rules.min}`);
      }
      if (rules.max) {
        zodField = zodField.max(rules.max, `${field.label} must be at most ${rules.max}`);
      }
    } else if (field.type === "file") {
      zodField = z.any().optional();
    } else if (field.type === "autocomplete") {
      zodField = z.string();
      if (field.required) {
        zodField = zodField.nonempty(`${field.label} is required`);
      }
    } else {
      zodField = z.string();
      if (rules.pattern) {
        zodField = zodField.regex(new RegExp(rules.pattern), "Invalid format");
      }
      if (rules.minLength) {
        zodField = zodField.min(rules.minLength, `${field.label} is too short`);
      }
      if (rules.maxLength) {
        zodField = zodField.max(rules.maxLength, `${field.label} is too long`);
      }
    }

    if (!field.required && field.type !== "file" && field.type !== "number") {
      zodField = zodField.optional();
    }

    shape[field.name] = zodField;
  }

  return z.object(shape);
}