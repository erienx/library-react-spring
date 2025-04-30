package com.example.library.controller;

import com.example.library.dto.BookUploadRequest;
import com.example.library.model.*;
import com.example.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks(@RequestParam(required = false) String search) {
        return bookService.findBooksOptionalTitle(search);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> book = bookService.findBookById(id);
        return book.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{id}")
    public Page<Book> getBooksByCategoryId(@PathVariable Long id, Pageable pageable) {
        return bookService.findBooksByCategoryId(id, pageable);
    }

    @PostMapping
    public Book uploadBook(@RequestBody BookUploadRequest bookRequest) {
        return bookService.uploadBook(bookRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteBook(@PathVariable Long id) {
        if (bookService.deleteBook(id)){
            return ResponseEntity.ok().build();
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
}