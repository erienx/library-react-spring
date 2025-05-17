package com.example.library.service;

import com.example.library.model.*;
import com.example.library.repository.CartItemRepository;
import com.example.library.repository.CartRepository;
import com.example.library.repository.OrderRepository;
import com.example.library.util.OrderStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

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
        }
        cart.getCartItems().clear();
        cartRepository.save(cart);

        return orderRepository.save(order);
    }
}
