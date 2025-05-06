package com.example.library.controller;

import com.example.library.dto.MemberDto;
import com.example.library.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
public class MemberController {
    @Autowired
    private MemberService memberService;

    @PostMapping("/register")
    public ResponseEntity<String> registerMember(@RequestBody MemberDto memberDto){
        try{
            memberService.register(memberDto);
            return ResponseEntity.ok("registered");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("register failed");
        }
    }

}