import express, { json } from 'express';
import ProductManager from './Managers/ProdManager.js';
const app= express();



const newProd = new ProductManager();
const dataProducts = newProd.getProducts();

app.get('/products',async( req, res)=>{
    const prodQuantity = req.query.limit;
    const allProducts = await dataProducts;
    console.log('hola')
    if (prodQuantity){
        const reduce = allProducts.slice(0, prodQuantity);
        console.log(reduce)
        res.send(reduce)
    }else{
        res.send(allProducts);
    }
})

app.get(`/products/:pid`, async (req, res) => {
    const idProducts = req.params.pid;
    const allProducts = await dataProducts;
    const selected = allProducts.find((p) => p.id == idProducts);
    res.send(selected);
});

app.listen(8080 , ()=>console.log('Listening on PORT 8080'));
