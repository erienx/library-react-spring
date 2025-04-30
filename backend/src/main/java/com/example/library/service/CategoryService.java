package com.example.library.service;

import com.example.library.model.Category;
import com.example.library.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category getOrAddCategory(String categoryName){
        return categoryRepository.findByCategoryName(categoryName)
                .orElseGet(() -> this.addCategoryByName(categoryName));
    }

    public Category addCategoryByName(String categoryName){
        Category category = Category.builder().categoryName(categoryName).build();
        return this.addCategory(category);
    }

    public Category addCategory(Category category){
        return categoryRepository.save(category);
    }

    public List<Category> findAllCategories(){
        return categoryRepository.findAll();
    }

}
