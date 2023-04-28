import express from 'express';
import prodRouter from './routes/prod.router.js'
import __dirname from './util.js';
import cartRouter from './routes/cart.router.js'

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use('/api/prod',prodRouter);
app.use('/api/carts', cartRouter)


app.listen(8081, () => console.log('Listening on PORT http://localhost:8081'));