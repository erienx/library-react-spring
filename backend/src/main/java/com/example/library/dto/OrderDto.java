package com.example.library.dto;

import com.example.library.model.Book;
import com.example.library.model.Order;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderDto {
    private Long orderID;
    private LocalDateTime createdAt;
    private List<Book> books;

    public static OrderDto fromOrder(Order order) {
        return OrderDto.builder()
                .orderID(order.getOrderID())
                .createdAt(order.getCreatedAt())
                .books(order.getOrderItems().stream()
                        .map(item -> item.getBookCopy().getBook())
                        .distinct()
                        .toList())
                .build();
    }
}
