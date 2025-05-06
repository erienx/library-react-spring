package com.example.library.dto;

import lombok.Builder;

@Builder
public record GetMeDto(Long memberId, String firstName, String lastName, String email) {
}
