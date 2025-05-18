package com.example.library.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record MemberWIthIdDto( @NotBlank(message = "Id is required")
                               Long memberId,
                        @NotBlank(message = "First name is required")
                        String firstName,

                        @NotBlank(message = "Last name is required")
                        String lastName,

                        @Email(message = "Email should be valid")
                        @NotBlank(message = "Email is required")
                        String email,

                        @Size(min = 8, message = "Password must be at least 8 characters")
                        String password,

                        @NotBlank(message = "Please confirm your password")
                        String confirmPassword) {
}