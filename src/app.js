import express from 'express';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import userRouter from './routes/user.router.js';
import { Server } from 'socket.io';
import __dirname from './utils.js';

const app = express();

const server = app.listen(8081, ()=>console.log('Listening on port 8081'));
const io = new Server(server)
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}))




app.engine('handlebars', handlebars.engine());
app.set('views' , `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use('/',viewsRouter);
app.use('/api/users',userRouter)



//ON es el escuchador de eventos - acá ocurre el handshaking 
io.on('connection', socket =>{
    console.log('Nuevo cliente conectado')
})











// import express from 'express';
// import prodRouter from './routes/prod.router.js'
// import __dirname from './util.js';
// import cartRouter from './routes/cart.router.js'
// import handlebars from 'express-handlebars';
// import { Server, Socket } from 'socket.io';

// const app = express();
// // app.use(express.urlencoded({extended:true}))
// //app.use(express.static(`${__dirname}/public`))
// // app.use(express.json());
// // app.use('/api/prod',prodRouter);
// // app.use('/api/carts', cartRouter)

// const server = app.listen(8081, () => console.log('Listening on PORT http://localhost:8081'));

// app.use(express.static(`${__dirname}/public`))

// const io = new Server(server)

// // io.on('connection', socket =>{
// //     console.log('Nuevo cliente conectado.')
// // })

// //DESAFIO HANDLEBARS
// app.engine('handlebars', handlebars.engine());
// // app.set('views', `${__dirname}/views`);
// app.set('view engine', 'handlebars');
// app.get('/', (req, res) => {
//     res.render('home')
// })

