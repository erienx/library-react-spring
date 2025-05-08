package com.example.library.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "book_copy")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookCopy {
    @Id
    @GeneratedValue
    private Long bookCopyID;

    @Builder.Default
    private boolean isRented = false;

    @ManyToOne
    @JoinColumn(name = "bookID", nullable = false)
    @JsonBackReference
    private Book book;
}