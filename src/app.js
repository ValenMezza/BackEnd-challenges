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
// const app = express();
// const prodManager = new ProductManager();
// const dataProducts = prodManager.getProducts();
// const idProd = prodManager.getProductById();

// app.get('/hola',async (req, res)=>{
//     const prodQuantity = req.query.limit;
//     const allProducts = await dataProducts;
//     console.log('hola')
//     if (prodQuantity){
//         const reduce = allProducts.slice(0, 10);
//         res.send(reduce)
//     }else{
//         res.send(allProducts);
//     }
// })
// // app.get('/products/:id',async(res, req)=>{
// //     const prodId = await prodManager.getProducts(id);
// //     console.log(prodId)
// //     res.send('hola')

// // })



// app.get('/user2', (req, res)=>{
//     console.log(req.query);
//     const users=[
//         {
//             name: 'valentino',
//             pet: 'dog'
//         },
//         {
//             name: 'Juan',
//             pet: 'cat'
//         }
//     ]
//     const search = Object.keys(req.query)[0];
//     console.log(search)

//     const user = users.find(u=>u[search]===req.query[search]);

//     (!user) ?  res.send('Usuario inexistente') : (res.send(user));
//     console.log(user);

// })

// app.get('/user/:name',(req, res)=>{
//     console.log(req.params)
//     const users=[
//         {
//             name: 'valentino',
//             pet: 'dog'
//         },
//         {
//             name: 'Juan',
//             pet: 'cat'
//         }
//     ]
//     const user = users.find(u=>u.name === req.query.name);
//     res.send(user)
// })
