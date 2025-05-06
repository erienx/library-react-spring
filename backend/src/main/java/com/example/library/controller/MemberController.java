package com.example.library.controller;

import com.example.library.dto.LoginDto;
import com.example.library.dto.MemberDto;
import com.example.library.service.MemberService;
import com.example.library.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/members")
public class MemberController {
    @Autowired
    private MemberService memberService;

    @PostMapping("/register")
    public ResponseEntity<String> registerMember(@Valid @RequestBody MemberDto memberDto){
        try{
            memberService.register(memberDto);
            return ResponseEntity.ok("registered");
        }catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("register failed");
        }
    }

    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        try {
            memberService.authenticate(loginDto);

            String accessToken = jwtUtil.generateAccessToken(loginDto.email());
            String refreshToken = jwtUtil.generateRefreshToken(loginDto.email());

            ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .sameSite("Strict")
                    .build();

            response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return ResponseEntity.ok(Map.of("accessToken", accessToken));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }


    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(value = "refreshToken", required = false) String refreshToken) {
        try {
            String username = jwtUtil.validateToken(refreshToken);
            String accessToken = jwtUtil.generateAccessToken(username);
            return ResponseEntity.ok(Map.of("accessToken", accessToken));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


}