package com.example.library.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "publishers")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Publisher {
    @Id
    @GeneratedValue
    private Long publisherID;

    private String publisherName;

    @JsonIgnore
    @OneToMany(mappedBy = "publisher")
    private List<Book> books;
}
