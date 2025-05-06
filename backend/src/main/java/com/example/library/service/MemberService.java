package com.example.library.service;

import com.example.library.dto.GetMeDto;
import com.example.library.dto.LoginDto;
import com.example.library.dto.MemberDto;
import com.example.library.model.Member;
import com.example.library.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


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
    public void authenticate(LoginDto loginDto){
        Member member = memberRepository.getMemberByEmail(loginDto.email()).orElseThrow(() ->  new IllegalArgumentException("Email or password is invalid"));
        if (!passwordEncoder.matches(loginDto.password(), member.getPassword())) {
            throw new IllegalArgumentException("Email or password is invalid");
        }
    }

    public GetMeDto getCurrentUserByEmail(String email) {
        Optional<Member> user = memberRepository.getMemberByEmail(email);

        if (user.isPresent()) {
            return GetMeDto.builder()
                    .memberId(user.get().getMemberID())
                    .firstName(user.get().getFirstName())
                    .lastName(user.get().getLastName())
                    .email(user.get().getEmail())
                    .build();
        }

        return null;
    }
}
