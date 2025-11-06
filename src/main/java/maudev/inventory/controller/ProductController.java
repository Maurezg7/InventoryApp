package maudev.inventory.controller;

import maudev.inventory.exception.ResourceNotFoundException;
import maudev.inventory.models.Product;
import maudev.inventory.services.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("inventory-app") //http://localhost:8080/inventory-app
@CrossOrigin(value = "http://localhost:4200") // Default port angular.
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @GetMapping("/products") //http://localhost:8080/inventory-app/products
    public List<Product> getProducts(){
        List<Product> products = this.productService.listProduct();
        logger.info("Products obtained.");
        products.forEach(product -> {
            logger.info(product.toString());
        });
        return products;
    }

    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product){
        logger.info("Product to add: " + product);
        return this.productService.saveProduct(product);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(
            @PathVariable Long id
    ){
        Product product = this.productService.searchProductById(id);
        if(product != null){
            return ResponseEntity.ok(product);
        }else{
            throw new ResourceNotFoundException("The id was not found: " + id);
        }
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product productReceived
    ){
        Product product = this.productService.searchProductById(id);
        product.setDescription(productReceived.getDescription());
        product.setPrice(productReceived.getPrice());
        product.setExistence(productReceived.getExistence());
        //Save the information
        this.productService.saveProduct(product);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProduct(
            @PathVariable Long id
    ){
        Product product = this.productService.searchProductById(id);
        if(product == null){
            throw new ResourceNotFoundException("The id was not found: " + id);
        }
        this.productService.deleteProduct(product.getIdProduct());
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
