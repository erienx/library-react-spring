package com.example.library.service;

import com.example.library.dto.BookUploadRequest;
import com.example.library.model.Author;
import com.example.library.model.Book;
import com.example.library.model.Category;
import com.example.library.model.Publisher;
import com.example.library.repository.AuthorRepository;
import com.example.library.repository.BookRepository;
import com.example.library.repository.CategoryRepository;
import com.example.library.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private PublisherRepository publisherRepository;

    public Book uploadBook(BookUploadRequest bookRequest){
        Author author = authorRepository.findByAuthorName(bookRequest.author())
                .orElseGet(() -> authorRepository.save(Author.builder().authorName(bookRequest.author()).build()));

        Category cat = categoryRepository.findByCategoryName(bookRequest.category())
                .orElseGet(() -> categoryRepository.save(Category.builder().categoryName(bookRequest.category()).build()));

        Publisher publisher = publisherRepository.findByPublisherName(bookRequest.publisher())
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

    public List<Book> findBooksOptionalTitle(String title){
        if (title!=null && !title.isEmpty()){
            return bookRepository.findBookByTitleContainingIgnoreCase(title);
        }
        return bookRepository.findAll();
    }
    public Optional<Book> findBookById(Long id){
        return bookRepository.findById(id);
    }
    public Page<Book> findBooksByCategoryId(Long id, Pageable pageable){
        return bookRepository.findByCategoryCategoryID(id, pageable);
    }

    public Boolean deleteBook(Long id){
        return bookRepository.findById(id).map(book -> {
            bookRepository.delete(book);
            return true;
        }).orElse(false);
    }

}
