package com.twd.SpringSecurityJWT.controller;

import com.twd.SpringSecurityJWT.dto.ProductRes;
import com.twd.SpringSecurityJWT.dto.ReqRes;
import com.twd.SpringSecurityJWT.entity.OurUsers;
import com.twd.SpringSecurityJWT.entity.Product;
import com.twd.SpringSecurityJWT.repository.ProductRepo;
import com.twd.SpringSecurityJWT.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/users/products")
public class ProductController {

    @Autowired
    private ProductRepo productRepository;


    private final ProductService productService;
    private ReqRes reqRes ;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @PostMapping("/add")
    public Product addProduct(@RequestBody ReqRes productRequest, @AuthenticationPrincipal OurUsers user) {
        Product product = new Product();
        product.setNameProduct(productRequest.getNameProduct());
        product.setDecriptionProduct(productRequest.getDecriptionProduct());
        product.setPriceProduct(productRequest.getPriceProduct());
        product.setStockProduct(productRequest.getStockProduct());
        return productService.addProduct(product, productRequest.getCategoryId(), user);
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable Long productId, @AuthenticationPrincipal OurUsers user) {
        return productService.getProductById(productId);
    }
//    @GetMapping("/products")
//    public List<Product> getProductsByCategoryName(@RequestParam String categoryName) {
//        return productRepository.findByCategoryName(categoryName);
//    }

    @DeleteMapping("/{productId}")
    public String deleteProductById(@PathVariable Long productId, @AuthenticationPrincipal OurUsers user) {
        productService.deleteProductById(productId);
        return ("product deleted");
    }


    @GetMapping("/get/")
    public List<ProductRes> getProductsByCategoryName(@RequestParam String categoryName) {
        List<Product> products = productRepository.findByCategoryName(categoryName);
        return products.stream()
                .map(this::convertToProductRes)
                .collect(Collectors.toList());
    }

    private ProductRes convertToProductRes(Product product) {
        ProductRes productRes = new ProductRes();
        productRes.setName(product.getNameProduct());
        productRes.setPrice(product.getPrice()); // Set price
        productRes.setImage(product.getImage()); // Set image
        productRes.setName_link(product.getName_link()); // Set name_link if needed
        // Set other fields as needed
        return productRes;
    }
}
