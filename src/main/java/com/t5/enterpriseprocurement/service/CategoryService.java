package com.t5.enterpriseprocurement.service;

import java.util.List;

import com.t5.enterpriseprocurement.entity.Category;

public interface CategoryService {

    Category saveCategory(Category category);

    List<Category> getAllCategories();

    Category getCategoryById(Integer id);

    Category updateCategory(Integer id, Category category);

    void deleteCategory(Integer id);
}