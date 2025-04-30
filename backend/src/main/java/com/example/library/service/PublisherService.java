package com.example.library.service;

import com.example.library.model.Publisher;
import com.example.library.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublisherService {
    @Autowired
    private PublisherRepository publisherRepository;

    public Publisher getOrAddPublisher(String publisherName){
        return publisherRepository.findByPublisherName(publisherName)
                .orElseGet(() -> this.addPublisherByName(publisherName));
    }

    public Publisher addPublisherByName(String publisherName){
        Publisher publisher =  Publisher.builder().publisherName(publisherName).build();
        return this.addPublisher(publisher);
    }
    public Publisher addPublisher(Publisher publisher){
        return publisherRepository.save(publisher);
    }

    public List<Publisher> findAllPublishers(){
        return publisherRepository.findAll();
    }
}
