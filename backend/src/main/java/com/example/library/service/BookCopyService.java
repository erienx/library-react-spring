package com.example.library.service;

import com.example.library.dto.BookCopyCountDto;
import com.example.library.model.Book;
import com.example.library.model.BookCopy;
import com.example.library.repository.BookCopyRepository;
import com.example.library.util.NoAvailableBookCopyException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookCopyService {
    @Autowired
    private BookCopyRepository bookCopyRepository;


    public BookCopy getBookCopy(Long bookId){
        return bookCopyRepository.findFirstByBook_BookIDAndIsRentedFalse(bookId).orElseThrow(()->new NoAvailableBookCopyException(bookId));
    }

    @Transactional
    public void addBookCopies(Book book, Long count) {
        List<BookCopy> copies = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            copies.add(BookCopy.builder().book(book).build());
        }
        bookCopyRepository.saveAll(copies);
    }
    public BookCopyCountDto getBookCopyCount(Long bookId) {
        int available = bookCopyRepository.countByBook_BookIDAndIsRentedFalse(bookId);
        int total = bookCopyRepository.countByBook_BookID(bookId);
        return new BookCopyCountDto(available, total);
    }
}
