const express = require("express");
const router = express.Router();
const products = require("../models/products.js");

router.get("/new", (req, res) => {
  res.render("new.ejs");
});

router.post("/", (req, res) => {
  products.create(req.body, () => {
    res.redirect("/products");
  });
});

router.get("/", (req, res) => {
  products.find({}, (error, allproducts) => {
    res.render("index.ejs", {
      products: allproducts,
      currentUser: req.session.currentUser
    });
  });
});

router.get("/:id", (req, res) => {
  products.findById(req.params.id, (err, product) => {
    if (err) {
      console.log(err);
    }
    res.render("show.ejs", { product: product });
  });
});

router.get("/:id/edit", (req, res) => {
  products.findById(req.params.id, (err, product) => {
    if (err) {
      console.log(err);
    }
    res.render("edit.ejs", { product: product });
  });
});

router.get("/:id/buy", (req, res) => {
  products.findByIdAndUpdate(
    req.params.id,
    { $inc: { qty: -0 } },
    (err, product) => {
      if (err) {
        console.log(err);
      }
      res.render("buy.ejs", { product: product });
    }
  );
});

router.get("/:id/remove", (req, res) => {
  products.findByIdAndUpdate(req.params.id, { qty: -1 }, (err, product) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/products");
  });
});

router.put("/:id", (req, res) => {
  products.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, product) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/products/" + req.params.id + "/buy");
    }
  );
});

router.delete("/:id", (req, res) => {
  products.findByIdAndRemove(req.params.id, (err, product) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/products");
  });
});

router.get("/seed/newproducts", (req, res) => {
  const newProducts = [
    {
      _id: "58e913abb7304c0e0f20d0d8",
      name: "cappuccino",
      description: "A small day break",
      img: "https://www.ndtv.com/cooks/images/coffee.6.jpg",
      price: 5,
      qty: 99,
      __v: 0
    },
    {
      _id: "58e913abb7304c0e0f20d0da",
      name: "cannoli",
      description: "A stack nice cannnoli",
      img:
        "https://www.newideafood.com.au/media/17388/chocolate-hazelnut-cannoliresize.jpg?width=606&height=0&mode=crop&center=0.5,0.5",
      price: 7000,
      qty: 1,
      __v: 0
    },
    {
      _id: "58e913abb7304c0e0f20d0d9",
      name: "cakes",
      description: "It's a cake.",
      img:
        "https://ashleemarie.com/wp-content/uploads/2016/08/peanut-butter-cookie-smore-cake.jpg",
      price: 25,
      qty: 3,
      __v: 0
    },
    {
      _id: "58e9452e28ccf4146d4c485e",
      name: "panino",
      img:
        "https://www.caffelilitaly.com/wp-content/uploads/2011/04/prosciutto-panini.jpg",
      description: "Beautiful, panino",
      qty: 5,
      __v: 0,
      price: 1000000
    },
    {
      _id: "58e94d443931ca152bdd4478",
      name: "caffe",
      img:
        "https://www.thespruceeats.com/thmb/FDcuWXyroOQWqzL3qFWWMWN3P-Y=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-591995793-5b3bca8d46e0fb0037d35613.jpg",
      description: " authentic caffe",
      price: 17,
      qty: 72,
      __v: 0
    },
    {
      _id: "58e956e73931ca152bdd4479",
      name: "salad",
      img:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_760,h_950/k%2FPhoto%2FRecipes%2F2019-06-how-to-classic-cobb-salad%2FHow-to-Make-Classic-Cobb-Salad_70698",
      description: "is gluten-free",
      price: 887,
      qty: 0,
      __v: 0
    },
    {
      _id: "58e958243931ca152bdd447a",
      name: "gelato",
      img:
        "https://vellutogelato.com/wp-content/uploads/2018/10/Gelato-Best-in-Bali-Ice-Cream-Es-Krim-Cafe-2018-10-23-2.jpg",
      description: "Get  all your flavor",
      price: 6,
      qty: 913462,
      __v: 0
    },
    {
      _id: "58e9893444738817298b3a3b",
      name: "Croissants",
      img:
        "https://prods3.imgix.net/images/articles/2016_12/Feature-Culinary-Institute-Croissants-French-Pastry.jpg?auto=format%2Ccompress&ixjsv=2.2.3&w=750",
      description: "Croissants",
      qty: 14,
      __v: 0
    },
    {
      _id: "58eba62854241b05b274dc78",
      name: "muffin",
      img:
        "https://s-media-cache-ak0.pinimg.com/736x/0a/6f/b6/0a6fb62caa11cfdb68c7c12a2620c012.jpg",
      description: "Capture the beauty",
      price: 49.99,
      qty: 49,
      __v: 0
    },
    {
      _id: "58ed05dfa2b6901441a43419",
      name: "nutella",
      img: "https://images-assets.nasa.gov/image/PIA20912/PIA20912~thumb.jpg",
      description: "Bored nutella?",
      price: 1,
      qty: 54,
      __v: 0
    }
  ];

  products.create(newProducts, (err, product) => {
    if (err) {
      console.log(err);
    }
    console.log("SEED: NEW PRODUCTS CREATED!");
    res.redirect("/products");
  });
});

module.exports = router;
