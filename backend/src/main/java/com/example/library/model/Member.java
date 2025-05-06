package com.example.library.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "members")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {
    @Id
    @GeneratedValue
    private Long memberID;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private boolean isAdmin;
}
