package com.example.library.repository;
import com.example.library.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookCopyRepository extends JpaRepository<BookCopy, Long> {
    Optional<BookCopy> findFirstByBook_BookIDAndIsRentedFalse(Long bookId);
    int countByBook_BookIDAndIsRentedFalse(Long bookId);
    int countByBook_BookID(Long bookId);
}