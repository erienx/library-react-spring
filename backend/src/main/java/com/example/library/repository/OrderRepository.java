package com.example.library.repository;
import com.example.library.model.*;
import com.example.library.util.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByMemberAndStatus(Member member, OrderStatus status);
}
