package com.example.library.service;

import com.example.library.model.Author;
import com.example.library.model.Category;
import com.example.library.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {
    @Autowired
    private AuthorRepository authorRepository;

    public List<Author> findAllAuthors(){
        return authorRepository.findAll();
    }

    public Author getOrAddAuthor(String authorName){
        return authorRepository.findByAuthorName(authorName)
                .orElseGet(() -> this.addAuthorByName(authorName));
    }

    public Author addAuthorByName(String authorName){
        Author author = Author.builder().authorName(authorName).build();
        return this.addAuthor(author);
    }

    public Author addAuthor(Author author){
        return authorRepository.save(author);
    }

}
