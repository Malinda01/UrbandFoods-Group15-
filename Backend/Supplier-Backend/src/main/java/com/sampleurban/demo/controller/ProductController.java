package com.sampleurban.demo.controller;

import com.sampleurban.demo.DTO.ProductRequest;
import com.sampleurban.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*") // Enable this if you're calling from React or other frontend
public class ProductController {

    @Autowired
    private ProductService productService;

    // Add product
    @PostMapping("/add")
    public String addProduct(@RequestBody ProductRequest product) {
        productService.addProduct(
                product.getname(), // Removed productId since it will be auto-generated
                product.getPrice(),
                product.getQuantity(),
                product.getCategory(),
                product.getDescription(),
                product.getImageUrl(),
                product.getSupplierId()
        );
        return "Product added successfully";
    }

    // Populate the update product
    @GetMapping("/{productId}")
    public ResponseEntity<ProductRequest> getProductById(@PathVariable String productId) {
        try {
            ProductRequest product = productService.getProductById(productId);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    // Update product
    @PutMapping("/{productId}/{supplierId}")
    public ResponseEntity<String> updateProduct(
            @PathVariable String productId,
            @PathVariable String supplierId,
            @RequestBody ProductRequest productRequest) {
        try {
            productService.updateProductUsingProcedure(productId, supplierId, productRequest);
            return ResponseEntity.ok("Product updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update product");
        }
    }



    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable String productId) {
        productService.deleteProduct(productId);
        return "Product deleted successfully";
    }

    @GetMapping("/by-supplier/{supplierId}")
    public List<ProductRequest> getProductsBySupplier(@PathVariable String supplierId) {
        return productService.getProductsBySupplier(supplierId);
    }

//    SAles
@GetMapping("/sales")
public ResponseEntity<Double> getSupplierSalesInPeriod(
        @RequestParam String supplierId,
        @RequestParam String startDate,
        @RequestParam String endDate) {
    try {
        java.sql.Timestamp start = java.sql.Timestamp.valueOf(startDate + " 00:00:00");
        java.sql.Timestamp end = java.sql.Timestamp.valueOf(endDate + " 23:59:59");

        double totalSales = productService.getSupplierSalesInPeriod(supplierId, start, end);
        return ResponseEntity.ok(totalSales);
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().build(); // Invalid format
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

//High demand
@GetMapping("/high-demand/{supplierId}")
public ResponseEntity<List<ProductRequest>> getHighDemandProducts(@PathVariable String supplierId) {
    try {
        List<ProductRequest> highDemandProducts = productService.getHighDemandProducts(supplierId);
        return ResponseEntity.ok(highDemandProducts);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}


}
