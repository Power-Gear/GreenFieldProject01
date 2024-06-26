const db = require("./config");


module.exports = {
    
    getAllproducts: async (req,res)=> {
      try {
        const products = await db.Product.findAll();
        res.json(products);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching products");
      }
    },
      
      getOneProduct: async (req, res) => {
        const productId = req.params.productId;
        console.log(productId);
        try {
          const product = await db.Product.findByPk(productId); 
          if (!product) {
            return res.status(404).send("product not found");
          }
          res.json(product);
        } catch (error) {
          console.error(error);
          res.status(500).send("Error fetching product");
        }
      },
      
      addProduct: async(req,res) =>{
        const newProduct = req.body;
        try {
          const product = await db.Product.create(newProduct); 
          res
            .status(201)
            .send({ message: "product created successfully", productid: product.id });
        } catch (error) {
          console.error(error);
          res.status(500).send("Error adding product");
        }
      },
      modifyProduct: async (req, res) => {
        const productId = req.params.productid;
        const updatedProduct = req.body;
        try {
          const product = await db.Product.findByPk(productId);
          if (!product) {
            return res.status(404).send("Product not found");
          }
          await product.update(updatedProduct);
          res.status(200).send("Product modified successfully");
        } catch (error) {
          console.error(error);
          res.status(500).send("Error modifying product");
        }
      },
      removeProduct: async (req, res) => {
        const productId = req.params.productid;
        try {
        await db.Product.destroy({ where:{id:productId}  }); 
          res.status(201).send('deleted')
        } catch (error) {
          console.error(error);
          res.status(500).send("Error fetching product");
        }
      },
      getByCategory: async (req, res) => {
        const category = req.params.category;
        try {
        const response=await db.Product.findAll({ where:{category:category}  }); 
        res.json(response);
        } catch (error) {
          console.error(error);
          res.status(500).send("Error fetching product");
        }
      }
    };
        