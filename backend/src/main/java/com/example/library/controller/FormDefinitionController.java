package com.example.library.controller;

import com.example.library.dto.FormFieldDefinition;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/form-definitions")
public class FormDefinitionController {

    @GetMapping("/book")
    public List<FormFieldDefinition> getBookFormDefinition() {
        return List.of(
                new FormFieldDefinition("title", "text", "Title", true, Map.of("minLength", 1), "book"),
                new FormFieldDefinition("publicationYear", "text", "Publication Year", true, Map.of("pattern", "^\\d{4}$"), "calendar"),
                new FormFieldDefinition("pages", "text", "Pages", true, Map.of("pattern", "^\\d+$"), "number"),
                new FormFieldDefinition("author", "autocomplete", "Author", true, Map.of("minLength", 1), "author"),
                new FormFieldDefinition("publisher", "autocomplete", "Publisher", true, Map.of("minLength", 1), "publisher"),
                new FormFieldDefinition("category", "autocomplete", "Category", true, Map.of("minLength", 1), "category"),
                new FormFieldDefinition("copyCount", "text", "Copy Count", true, Map.of("pattern", "^\\d+$"), "copy"),
                new FormFieldDefinition("pathToCover", "file", "Cover", false, Map.of(), "image")
        );
    }
    @GetMapping("/login")
    public List<FormFieldDefinition> getLoginFormDefinition() {
        return List.of(
                new FormFieldDefinition("email", "text", "Email", true, Map.of("pattern", "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"), "email"),
                new FormFieldDefinition("password", "password", "Password", true, Map.of("minLength", 8), "password")
        );
    }
    @GetMapping("/register")
    public List<FormFieldDefinition> getRegisterFormDefinition() {
        return List.of(
                new FormFieldDefinition("firstName", "text", "First Name", true, Map.of("minLength", 1), "profile"),
                new FormFieldDefinition("lastName", "text", "Last Name", true, Map.of("minLength", 1), "profile"),
                new FormFieldDefinition("email", "text", "Email", true, Map.of("pattern", "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"), "email"),
                new FormFieldDefinition("password", "password", "Password", true, Map.of("minLength", 8), "password"),
                new FormFieldDefinition("confirmPassword", "password", "Confirm Password", true, Map.of("minLength", 1), "password")
        );
    }
}