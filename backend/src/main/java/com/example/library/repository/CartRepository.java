package com.example.library.repository;
import com.example.library.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByMember(Member member);
    Page<Cart> findAll(Pageable pageable);
    void deleteByMember(Member member);
}
