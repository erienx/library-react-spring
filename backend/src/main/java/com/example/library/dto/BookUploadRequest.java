package com.example.library.dto;

public record BookUploadRequest(String title, Integer publicationYear, String author, String pathToCover, Integer pages, Integer rentedCount, String publisher, String category, Double rating) {

}
