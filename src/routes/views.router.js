import { Router} from "express";

const router = Router();
router.get('/',(req,res)=>{
    const User={
        name: "Valentino",
        email: "mezza12354@gmail.com"
    }
    res.render('home',{
        name: User.name,
        // css: 'home'
    })
})

router.get('/food', (req, res)=>{
    const food=[
        {name: 'Hamburguesa', price: 2500},
        {name: 'pizza', price:1800},
        {name: 'lomito', price:2500}
    ]
    res.render('food',{
        food,
        css: 'food'
    })
})


router.get('/register',(req,res)=>{
    res.render('register')
})
export default router;