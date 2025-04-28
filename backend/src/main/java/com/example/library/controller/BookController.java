package com.example.library.controller;

import com.example.library.dto.BookUploadRequest;
import com.example.library.model.*;
import com.example.library.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private PublisherRepository publisherRepository;

    @GetMapping
    public List<Book> getAllBooks(@RequestParam(required = false) String search) {
        if (search!=null && !search.isEmpty()){
            return bookRepository.findBookByTitleContainingIgnoreCase(search);
        }
        return bookRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> book = bookRepository.findById(id);
        return book.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Book uploadBook(@RequestBody BookUploadRequest bookRequest) {
        Author author = authorRepository.findByAuthorName(bookRequest.author())
                .orElseGet(() -> authorRepository.save(Author.builder().authorName(bookRequest.author()).build()));

        Category cat = categoryRepository.findByCategoryName(bookRequest.category())
                .orElseGet(() -> categoryRepository.save(Category.builder().categoryName(bookRequest.category()).build()));

        Publisher publisher = (Publisher) publisherRepository.findByPublisherName(bookRequest.publisher())
                .orElseGet(() -> publisherRepository.save(Publisher.builder().publisherName(bookRequest.publisher()).build()));

        Book book = Book.builder()
                .title(bookRequest.title())
                .publicationYear(bookRequest.publicationYear())
                .author(author)
                .category(cat)
                .rating(bookRequest.rating())
                .publisher(publisher)
                .pathToCover(bookRequest.pathToCover())
                .pages(bookRequest.pages())
                .rentedCount(bookRequest.rentedCount())
                .build();

        return bookRepository.save(book);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        return bookRepository.findById(id).map(book -> {
            book.setTitle(bookDetails.getTitle());
            book.setPages(bookDetails.getPages());
            book.setPublicationYear(bookDetails.getPublicationYear());
            book.setAddedDate(bookDetails.getAddedDate());
            book.setPathToCover(bookDetails.getPathToCover());
            book.setRentedCount(bookDetails.getRentedCount());
            book.setPublisher(bookDetails.getPublisher());
            book.setCategory(bookDetails.getCategory());
            book.setBookCopies(bookDetails.getBookCopies());
            return ResponseEntity.ok(bookRepository.save(book));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteBook(@PathVariable Long id) {
        return bookRepository.findById(id).map(book -> {
            bookRepository.delete(book);
            return ResponseEntity.ok().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}