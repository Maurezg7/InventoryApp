package maudev.inventory.services;

import maudev.inventory.models.Product;

import java.util.List;

public interface IProductService {
    List<Product> listProduct();
    Product searchProductById(Long idProduct);
    Product saveProduct(Product product);
    void deleteProduct(Long idProduct);
}
