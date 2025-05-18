package com.example.library.service;

import com.example.library.dto.OrderDto;
import com.example.library.model.*;
import com.example.library.repository.CartItemRepository;
import com.example.library.repository.CartRepository;
import com.example.library.repository.MemberRepository;
import com.example.library.repository.OrderRepository;
import com.example.library.util.OrderStatus;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;

    public Order commitOrder(Member member) {
        Cart cart = cartRepository.findByMember(member)
                .orElseThrow(() -> new RuntimeException("cart not found"));

        if (cart.getCartItems().isEmpty()) {
            throw new RuntimeException("cart is empty");
        }

        Order order = Order.builder()
                .member(member)
                .status(OrderStatus.PENDING)
                .orderItems(new ArrayList<>())
                .build();

        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .bookCopy(cartItem.getBookCopy())
                    .build();
            order.getOrderItems().add(orderItem);
            orderItem.getBookCopy().setRented(true);
        }
        cart.getCartItems().clear();
        cartRepository.save(cart);

        return orderRepository.save(order);
    }

    public List<OrderDto> getOrdersByMemberAndStatus(Long memberId, String status) {
        OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
        return orderRepository.findByMember_MemberIDAndStatus(memberId, orderStatus).stream()
                .map(OrderDto::fromOrder)
                .toList();
    }
    public boolean cancelOrder(Long orderId, Long memberId) {
        Order order = orderRepository.findByOrderIDAndMember_MemberID(orderId, memberId)
                .orElseThrow(() -> new EntityNotFoundException("order not found or does not belong to this member"));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("only pending orders can be cancelled");
        }

        orderRepository.delete(order);


        return true;
    }
    public void forwardOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("order not found"));

        switch (order.getStatus()) {
            case PENDING -> {
                order.setStatus(OrderStatus.RENTED);
                order.setRentedAt(LocalDateTime.now());
            }
            case RENTED -> {
                order.setStatus(OrderStatus.COMPLETED);
                order.setCompletedAt(LocalDateTime.now());
                order.getOrderItems().forEach(item -> item.getBookCopy().setRented(false));
            }
            case COMPLETED -> {
                return;
            }
        }

        orderRepository.save(order);
    }

}
