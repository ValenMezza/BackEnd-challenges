import { Router } from "express";
import uploader from '../services/uploader.js'
import ProductManager from "../Managers/ProdManager.js";

const router = Router();

const newProd = new ProductManager();
const dataProducts = newProd.getProducts();
const allProducts = await dataProducts;
router.get('/', async (req, res) => {
    const prodQuantity = req.query.limit;

    console.log('hola')
    if (prodQuantity) {
        const reduce = allProducts.slice(0, prodQuantity);
        console.log(reduce)
        res.send(reduce)
    } else {
        res.send(allProducts);
    }
})

router.get(`/:pid`, async (req, res) => {
    const idProducts = req.params.pid;
    const allProducts = await dataProducts;
    const selected = allProducts.find((p) => p.id == idProducts);
    (idProducts <= allProducts.length - 1) ? res.send(selected) : res.send('No existe')
});

// router.get(`/:pid`, async(req, res)=>{
//     const idProducts   = req.params.pid;
//     const product= await dataIdProducts();
//     const selected = product.find((p)=>p.id===idProducts);
//     res.send(selected)
// })

router.post('/', uploader.single('image'), (req, res) => {
    try {
        const newContent = req.body;
        newProd.addProduct(newContent);
        res.send({ status: "succes", message: "product posted" });
    } catch (error) {
        res.status(404).send({ status: "error", error: "not found" });
        console.log(error);
    }
})


//CON PUT SOLICITAMOS EDITAR UN USUARIO
router.put(`/:pId`, async (req, res) => {
    const allProducts = await dataProducts;
    const id = req.params.pId;
    const newContent = req.body;
    const productIndex = allProducts.findIndex((p) => p.id == id);
    if (productIndex === -1) {
        return res.status(404).send({ status: "error", error: "not found" });
    }
    allProducts[productIndex] = newContent;
    newProd.updateProduct(id, newContent);
    res.send({ status: "succes", message: "product updated" });
});
//CON ESTE SOLICITAMOS ELIMINAR UN USUARIO
router.delete("/:pId", async (req, res) => {
    const allProducts = await dataProducts;
    const id = req.params.pId;
    const productIndex = allProducts.findIndex((p) => p.id == id);
    if (productIndex === -1) {
        return res.status(404).send({ status: "error", error: "not found" });
    }
    allProducts.splice(productIndex, 1);
    newProd.deleteProduct(allProducts);
    res.send({ status: "succes", message: "product deleted" });
});


export default router;