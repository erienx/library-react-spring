package com.example.library.controller;

import com.example.library.model.Member;
import com.example.library.model.Order;
import com.example.library.model.OrderItem;
import com.example.library.repository.MemberRepository;
import com.example.library.service.OrderService;
import com.example.library.util.JwtUtil;
import com.example.library.util.OrderStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;
    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;

    @PostMapping("/commit")
    public ResponseEntity<?> commitOrder(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.validateToken(token);

            Member member = memberRepository.getMemberByEmail(email)
                    .orElseThrow(() -> new RuntimeException("member not found"));

            Order order = orderService.commitOrder(member);

            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid token or user not found");
        }
    }

    @GetMapping("/items")
    public ResponseEntity<?> getOrderItemsByStatus(@RequestParam Long memberId, @RequestParam String status) {
        try {
            OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
            List<OrderItem> items = orderService.getOrderItemsByStatus(memberId, orderStatus);
            return ResponseEntity.ok(items);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("invalid order status");
        }
    }
}