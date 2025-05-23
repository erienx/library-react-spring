package com.example.library.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "books")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Book {
    @Id
    @GeneratedValue
    private Long bookID;

    private String title;
    private Integer publicationYear;

    @CreationTimestamp
    private LocalDate addedDate;
    private Integer pages;
    private String pathToCover;

    @Builder.Default
    private Double rating = 0.0;

    @Builder.Default
    private Integer rentedCount = 0;

    @ManyToOne
    @JoinColumn(name = "publisherID", nullable = false)
    private Publisher publisher;

    @ManyToOne
    @JoinColumn(name = "categoryID", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "authorID", nullable = false)
    private Author author;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<BookCopy> bookCopies;
}

