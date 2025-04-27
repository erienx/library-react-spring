package com.example.library.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "authors")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Author {
    @Id
    @GeneratedValue
    private Long authorID;

    private String authorName;


    @ManyToMany(mappedBy = "authors")
    @JsonIgnore
    private List<Book> books;
}
