package com.example.library.repository;

import com.example.library.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findBookByTitleContainingIgnoreCase(String title);

    Page<Book> findByCategoryCategoryID(Long id, Pageable pageable);

    @Query("SELECT b FROM Book b WHERE LOWER(b.author.authorName) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<Book> findBooksByAuthorNameLike(@Param("name") String name, Pageable pageable);
}