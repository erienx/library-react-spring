package com.example.library.repository;

import com.example.library.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndBookCopy_Book_BookID(Cart cart, Long bookId);

}
