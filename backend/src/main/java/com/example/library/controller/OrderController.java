package com.example.library.controller;

import com.example.library.model.Member;
import com.example.library.model.Order;
import com.example.library.repository.MemberRepository;
import com.example.library.service.OrderService;
import com.example.library.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}