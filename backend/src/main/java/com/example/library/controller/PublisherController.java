package com.example.library.controller;

import com.example.library.model.Publisher;
import com.example.library.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publishers")
public class PublisherController {

    @Autowired
    private PublisherRepository publisherRepository;

    @PostMapping
    public Publisher createPublisher(@RequestBody Publisher publisher) {
        return publisherRepository.save(publisher);
    }

    @GetMapping
    public List<Publisher> getAllPublishers() {
        return publisherRepository.findAll();
    }
}
