package com.example.library.service;

import com.example.library.dto.MemberDto;
import com.example.library.model.Member;
import com.example.library.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    public MemberService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    public void register(MemberDto memberDto) {
        if (!memberDto.password().equals(memberDto.confirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        if (memberRepository.existsByEmail((memberDto.email()))) {
            throw new IllegalArgumentException("Email is already registered");
        }
        Member member = Member.builder().
                firstName(memberDto.firstName())
                .lastName(memberDto.lastName())
                .email(memberDto.email())
                .password(passwordEncoder.encode(memberDto.password()))
                .isAdmin(false)
                .build();

        memberRepository.save(member);
    }
}
