package maudev.inventory.services;

import maudev.inventory.models.Product;
import maudev.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService{
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> listProduct() {
        return this.productRepository.findAll();
    }

    @Override
    public Product searchProductById(Long idProduct) {
        Product product = this.productRepository.findById(idProduct).orElse(null);
        return product;
    }

    @Override
    public Product saveProduct(Product product) {
        return this.productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long idProduct) {
        this.productRepository.deleteById(idProduct);
    }
}
