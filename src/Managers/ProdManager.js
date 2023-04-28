import fs from 'fs';

export default class ProductManager {
    constructor() {
        this.path = './Products.json';
        this.nextId = 0;
        this.products = [];

        // Si el archivo existe, lo leemos y lo cargamos en la memoria
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path); 
            if (data) {
                this.products = JSON.parse(data);
                if (this.products.length > 0) {
                    this.nextId = this.products[this.products.length - 1].id + 1;
                }
            }
        }
    }

    addProduct(product) {
        // Asignamos un id único al producto
        product.id = this.nextId++;
        // Añadimos el producto al arreglo de productos
        this.products.push(product);

        // Guardamos los productos en el archivo
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        // Buscamos el producto con el id especificado
        const product = this.products.find(p => p.id === id);

        return product;
    }

    updateProduct(id, updatedProduct) {
        // Buscamos el producto con el id especificado
        const index = this.products.findIndex(p => p.id === id);

        if (index !== -1) {
            // Actualizamos los campos del producto
            Object.assign(this.products[index], updatedProduct);

            // Guardamos los productos en el archivo
            this.saveProducts();
        }
    }

    deleteProduct(id) {
        // Filtramos el producto con el id especificado
        this.products = this.products.filter(p => p.id !== id);

        // Guardamos los productos en el archivo
        this.saveProducts();
    }

    saveProducts() {
        // Guardamos los productos en el archivo
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
}
