package com.example.library.dto;

import java.util.Map;

public record FormFieldDefinition(
        String name,
        String type,
        String label,
        boolean required,
        Map<String, Object> validation,
        String icon
) {}
