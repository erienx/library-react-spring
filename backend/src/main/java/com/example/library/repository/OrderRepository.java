package com.example.library.repository;
import com.example.library.model.*;
import com.example.library.util.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByMember_MemberIDAndStatus(Long memberID, OrderStatus status);
    Optional<Order> findByOrderIDAndMember_MemberID(Long orderId, Long memberId);
}
