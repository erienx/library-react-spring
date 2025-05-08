package com.example.library.service;

import com.example.library.dto.BookUploadRequest;
import com.example.library.model.Author;
import com.example.library.model.Book;
import com.example.library.model.Category;
import com.example.library.model.Publisher;
import com.example.library.repository.BookRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorService authorService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private PublisherService publisherService;
    @Autowired
    private BookCopyService bookCopyService;

    @Transactional
    public Book uploadBook(BookUploadRequest bookRequest){
        Author author = authorService.getOrAddAuthor(bookRequest.author());
        Category cat = categoryService.getOrAddCategory(bookRequest.category());
        Publisher publisher = publisherService.getOrAddPublisher(bookRequest.publisher());

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
        book = bookRepository.save(book);
        bookCopyService.addBookCopies(book, bookRequest.copyCount());

        return book;
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

    public Page<Book> findBooksByAuthorName(String name, Pageable pageable){
        return bookRepository.findBooksByAuthorNameLike(name, pageable);
    }

    public Page<Book> findBooksByPublisherName(String name, Pageable pageable){
        return bookRepository.findBooksByPublisherNameLike(name, pageable);
    }

    public Boolean deleteBook(Long id){
        return bookRepository.findById(id).map(book -> {
            bookRepository.delete(book);
            return true;
        }).orElse(false);
    }

}
