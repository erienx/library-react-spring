package com.example.library.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record LoginDto(@Email(message = "Email should be valid")
                       @NotBlank(message = "Email is required")
                       String email,

                       @Size(min = 8, message = "Password must be at least 8 characters")
                       String password) {
}
