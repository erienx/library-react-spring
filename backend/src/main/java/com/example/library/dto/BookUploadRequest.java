package com.example.library.dto;

import jakarta.validation.constraints.*;

public record BookUploadRequest(
        @NotBlank(message = "Title is required")
        String title,

        @Min(value = 1000, message = "Publication year should be greater than 1000")
        @Max(value = 9999, message = "Publication year should be less than 9999")
        Integer publicationYear,

        @NotBlank(message = "Author is required")
        String author,

        @NotBlank(message = "Path to cover image is required")
        String pathToCover,

        @Min(value = 1, message = "Pages should be greater than 0")
        Integer pages,

        @Min(value = 0, message = "Rented count should be greater than or equal to 0")
        Integer rentedCount,

        @NotBlank(message = "Publisher is required")
        String publisher,

        @NotBlank(message = "Category is required")
        String category,

        @DecimalMin(value = "0.0", message = "Rating must be greater or equal to 0")
        @DecimalMax(value = "5.0", message = "Rating must be less than or equal to 5")
        Double rating,

        @Min(value = 1, message = "Copy count must be at least 1")
        Long copyCount
) { }
