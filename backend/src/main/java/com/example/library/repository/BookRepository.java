package com.example.library.repository;

import com.example.library.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findBookByTitleContainingIgnoreCase(String title);
    List<Book> findByCategoryCategoryID(Long categoryId);
    Page<Book> findByCategoryCategoryID(Long id, Pageable pageable);
}