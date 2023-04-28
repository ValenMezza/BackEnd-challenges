import { Router } from "express";
import CartsManager from "../Managers/CartManager.js";
import ProductManager from "../Managers/ProdManager.js";

const cartsManager = new CartsManager();
// const Cart = cartNew.createCart();
const carts = cartsManager.getCart();
const productManager = new ProductManager();
const products = productManager.getProducts();

const router = Router();
export default router;


router.get(`/`, async (req, res)=>{
    const cartData = await carts;
    res.send(cartData)
})
router.get(`/:cId`, async (req, res) => {
    try {
        const idCart = req.params.cId;
        const allCarts = await carts;
        const selected = allCarts.find((c) => c.id == idCart);
        res.send(selected);
    } catch (error) {
        console.log(error);
        return res.status(404).send({ status: "error", error: "not found" });
    }
});

router.post(`/`, async (req, res) => {
    try {
        const cartNew = cartsManager.createCart();
        res.send(cartNew);
        console.log("New cart created successfully")
    } catch (error) {
        console.log(error);
        return res.status(404).send({ status: "error", error: "cart not created" });
    }
});

router.post(`/:cId/product/:pId`, async (req, res) => {
    const allCarts = await carts;
    const idCart = req.params.cId;
    const CartExist = allCarts.find((c) => c.id == idCart);
    if (!CartExist) {
        return res.status(404).send({ status: "error", error: "cart not found" });
    }
    const idProduct = req.params.pId;
    let quantity = req.body.quantity;
    quantity ? (quantity = quantity) : (quantity = 1);
    const allProducts = await products;
    const productSelected = allProducts.find((p) => p.id == idProduct);
    productSelected
        ? res.send({ status: "succes ", code: "Product and Cart found" })
        : res.send("product not found");
    const productSelectedId = productSelected.id;
    const cartToSend = {
        product: productSelectedId,
        quantity: quantity,
    };
    cartsManager.addProductToCart(idCart, cartToSend);
});


