import { useState, useEffect } from "react";
import { FieldError } from "react-hook-form";

const useInputState = (initialValue?: string, error?: FieldError) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState(initialValue ?? "");

  const color = (() => {
    if (error) {
      return focus ? "error-focus" : "error";
    }
    if (value) {
      return focus ? "filled-focus" : "filled";
    }
    return focus ? "empty-focus" : "empty";
  })();

  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  return { color, onFocus, onBlur, onChange };
};

export default useInputState;
