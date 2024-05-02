package com.twd.SpringSecurityJWT.repository;

import com.twd.SpringSecurityJWT.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    List<Product> findByCategoryName(String categoryName);
}
