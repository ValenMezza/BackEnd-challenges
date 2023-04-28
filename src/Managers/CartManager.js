import fs from 'fs';

export default class CartsManager {
    constructor() {
        this.path = './carts.json';
    }
    getCart = async () => {
        try {
            const data = fs.existsSync(this.path);
            if (data) {
                const info = await fs.promises.readFile(this.path, 'utf-8');
                const prodToAdd = JSON.parse(info);
                return prodToAdd;
            } else {
                console.log('Aún no hay items en el carrito');
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }
    createCart = async () => {
        const carts = await this.getCart();
        const newCart = {
            products: []
        }
        if (carts.length === 0) {
            newCart.id = 1;
        } else {
            newCart.id = carts[carts.length - 1].id + 1;
        }
        carts.push(newCart);

        fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
    }
    addProductToCart = async (idCart, productsToAdd) => {
        const allCarts = new CartsManager;

        const carts = await allCarts.getCart();

        const cartSelected = carts.find((c) => c.id == idCart);

        const isInCart = cartSelected.products.find(
            (p) => p.product == productsToAdd.product
        );
        if (!isInCart) {
            cartSelected.products.push(productsToAdd);
            console.log(productsToAdd);
        } else {
            const index = cartSelected.products.findIndex(
                (p) => p.product == productsToAdd.product
            );
            cartSelected.products[index].quantity += productsToAdd.quantity;
        }

        const newCart = carts.map((c) =>
            c.id == idCart ? { ...c, ...cartSelected } : c
        );

        fs.promises.writeFile(this.path, JSON.stringify(newCart, null, "\t"));
    };
}