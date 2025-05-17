package com.example.library.repository;

import com.example.library.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    Page<Book> findBookByTitleContainingIgnoreCase(String title, Pageable pageable);


    Page<Book> findByCategoryCategoryID(Long id, Pageable pageable);

    @Query("select book from Book book where lower(book.author.authorName) like lower(concat('%', :name, '%'))")
    Page<Book> findBooksByAuthorNameLike(@Param("name") String name, Pageable pageable);

    @Query("select book from Book book where lower(book.publisher.publisherName) like lower(concat('%', :name, '%'))")
    Page<Book> findBooksByPublisherNameLike(@Param("name") String name, Pageable pageable);
}