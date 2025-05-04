package com.example.library.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

@RestController
@RequestMapping("/covers")
public class CoverController {

    private static final String UPLOAD_DIR = "uploads/covers";

    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("cover") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file selected");
        }

        String filename =  System.currentTimeMillis() + "-" + StringUtils.cleanPath(file.getOriginalFilename());
        Path uploadPath = Paths.get(UPLOAD_DIR);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        String publicPath = "http://localhost:8080/covers/" + filename;
        return ResponseEntity.ok(publicPath);
    }
}
