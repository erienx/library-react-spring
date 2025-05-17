package com.example.library.controller;

import com.example.library.dto.BookCopyCountDto;
import com.example.library.dto.BookUploadRequest;
import com.example.library.model.*;
import com.example.library.service.BookCopyService;
import com.example.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;
    @Autowired
    private BookCopyService bookCopyService;

    @GetMapping
    public Page<Book> getAllBooks(@RequestParam(required = false) String search, @PageableDefault(size = 8) Pageable pageable) {
        return bookService.findBooksOptionalTitle(search, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> book = bookService.findBookById(id);
        return book.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<Page<Book>> getBooksByCategoryId(@PathVariable Long id, Pageable pageable) {
        Page<Book> books =  bookService.findBooksByCategoryId(id, pageable);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/author/{name}")
    public ResponseEntity<Page<Book>> getBooksByAuthorNameLike(@PathVariable String name, Pageable pageable) {
        Page<Book> books = bookService.findBooksByAuthorName(name, pageable);
        return ResponseEntity.ok(books);
    }   
    @GetMapping("/publisher/{name}")
    public ResponseEntity<Page<Book>> getBooksByPublisherNameLike(@PathVariable String name, Pageable pageable) {
        Page<Book> books = bookService.findBooksByPublisherName(name, pageable);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{bookId}/copies")
    public BookCopyCountDto getBookCopyCount(@PathVariable Long bookId) {
        return bookCopyService.getBookCopyCount(bookId);
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