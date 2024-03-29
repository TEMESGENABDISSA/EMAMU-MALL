t port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://temesgenabdissa2:10223013@cluster0.dgf7bjz.mongodb.net/EMAMUMALL");

// API Creation

app.get("/",(req, res) => {
res.send("Express APPlication is Running");
})

// image storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
    })
    const upload =multer({storage:storage})
    // creating upload endpoint for images
    app.use('/images',express.static('upload/images'))
    
    app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
    success:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
    })

    // schema for creating products
const product = mongoose.model("product",{
id:{
type:Number,
required:true,
},
name:{
type:String,
required:true,
},
image:{
type:String,
required:true,
},
category:{
type:String,
required:true,
},
new_price:{
type:Number,
required:true,
},
old_price:{
type:Number,
required:true,
},
date:{
type:Date,
default:Date.now,
},
avilable:{
type:Boolean,
default:true,
},
})

app.post('/addproduct', async (req, res) => {
    let products = await product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product = last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }
const Product = new product({
id:id,
name: req.body.name,
image: req.body.image,
category: req.body.category,
new_price: req.body.new_price,
old_price: req.body.old_price,
});
console.log(Product);
await Product.save();
console.log("saved");
res.json({
success: true,
name: req.body.name,
});
});

//creating API for deleting 
 app.post ('/removeproduct',async (req,res)=>{
    await product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success:true,
        name:req.body.name
    })
 })

 // creating API for Getting all products 
 app.get('/allproducts',async(req,res)=>{
    let products = await product.find({});
    console.log("Allproducts fetched");
    res.send(products);

 })
 // schmea for creating for user model
 const users=mongoose.model('users',{
     name:{
        type:String,
     },
     email:{
        type:String,
        unique:true,
     },
     password:{
        type:String,
     },
     cartData:{
        type:Object,
     },
     date:{
        type:Date,
        default:Date.now,
     }
 })
 // creating Endpoint for reigstering the user

 app.post('/signup', async (req, res) => {
    let check = await users.findOne({ email: req.body.email }); // Change Users to users
    if (check) {
        return res.status(400).json({ success: false, errors: "existing user found with the same email address" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new users({ // Change Users to users
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });
    // save user into the database
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});
// Creating endpoint  for user login
app.post('/login',async(req,res)=>{
  let user = await users.findOne({email:req.body.email});
  if(user){
    const passCompare =req.body.password === user.password;
    if (passCompare){
        const data ={
            user:{
                id:user.id
            }
        }
         const token =jwt.sign(data,'secret_ecom');
         res.json({success:true,token});

    }
    else{
        res.json({success:false,errors:"Wrong Password "});

    }

  }
  else{
    res.json({success:false,errors:"wrong Email ID"})
  }
})

// creating new endpoint newcollection of the data
app.get('/newcollections',async (req,res)=>{
     let products = await product.find({});
     let newcollection =products.slice(1).slice(-8);
     console.log("newCollection Fetched");
     res.send(newcollection);
}) 
app.get('/newcollections', async (req, res) => {
    try {
        let products = await product.find({});
        let newcollection = products.slice(1).slice(-8);
        console.log("newCollection Fetched");
        res.json(newcollection);
    } catch (error) {
        console.error("Error fetching new collection:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// creating endpoint popular in women section
app.get('/popularinwomen',async(req,res)=>{
    let products = await product.find({category:"women"});
    let popular_in_women= products.slice(0,4);
    console.log("popular in women fetched");
    res.send(popular_in_women);

})
// creating middleware to fetch user
const fetchUser =async(req,res,next)=>{
     const token = req.header ('auth-token');
     if(!token){
        res.status(401).send({errors:"please authenticate using valid token"})
     }
     else{
        try{
         const data =jwt.verify(token,'secret_ecom');
         req.user=data.user;
         next();
        }
        catch(error){
 res.status(401).send({errors:"please authenticate using  valid token"})
        }
     }
}
// creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser,async(req,res)=>{
    console.log("Added",req.body.itemID);
 let userData = await users.findOne({_id:req.user.id});
 userData.cartData [req.body.itemID]+=1;
 await users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
 response.send("Added")
})

// Creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser,async (req,res)=>{
    console.log("removed",req.body.itemID);
    let userData = await users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemID]>0)
 userData.cartData [req.body.itemID]-=1;
 await users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
 response.send("Removed")
})

// creating endpoint to get cartdata

app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData=await users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port);
    } else {
        console.log("Error: " + error);
    }
});
