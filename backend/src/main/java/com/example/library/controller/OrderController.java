package com.example.library.controller;

import com.example.library.dto.OrderDto;
import com.example.library.model.Member;
import com.example.library.model.Order;
import com.example.library.model.OrderItem;
import com.example.library.repository.MemberRepository;
import com.example.library.service.OrderService;
import com.example.library.util.JwtUtil;
import com.example.library.util.OrderStatus;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping
    public ResponseEntity<List<OrderDto>> getOrdersByMemberAndStatus(
            @RequestParam Long memberId,
            @RequestParam String status
    ) {
        return ResponseEntity.ok(orderService.getOrdersByMemberAndStatus(memberId, status));
    }
    @DeleteMapping("/{orderId}")
    public ResponseEntity<?> cancelOrder(
            @PathVariable Long orderId,
            @RequestParam Long memberId) {
        try {
            boolean cancelled = orderService.cancelOrder(orderId, memberId);
            if (cancelled) {
                return ResponseEntity.ok().body(Map.of("message", "order cancelled successfully"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "failed to cancel order"));
            }
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "error: " + e.getMessage()));
        }
    }
    @PostMapping("/{orderId}/forward")
    public ResponseEntity<?> forwardOrder(@PathVariable Long orderId) {
        try {
            orderService.forwardOrder(orderId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}