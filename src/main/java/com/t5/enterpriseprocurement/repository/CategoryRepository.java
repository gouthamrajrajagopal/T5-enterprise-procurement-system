package com.t5.enterpriseprocurement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.t5.enterpriseprocurement.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}