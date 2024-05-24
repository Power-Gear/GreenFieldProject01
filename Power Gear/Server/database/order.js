const db = require("./config");

module.exports = {
    getOrder: async (req, res) => {
        const OrderId = req.params.orderId;
        try {
          const order = await db.Order.findByPk(OrderId,{ include: db.User }); 
          if (!order) {
            return res.status(404).send("order not found");
          }
          res.json(order);
        } catch (error) {
          console.error(error);
          res.status(500).send("Error fetching order");
        }
      },
       
    getAllorders: async (req,res)=> {
        try {
          const order = await db.Order.findAll();
          res.json(order);
        } catch (error) {
          console.error(error);
          res.status(500).send("Error fetching products");
        }
      },

      addOrder: async (req, res) => {
        const newOrderData = req.body;
        try {
          const order = await db.Order.create(newOrderData);
          res.status(201).send({ message: "Order created successfully", orderId: order.id });
        } catch (error) {
          console.error(error);
          res.status(500).send("Error adding order");
        }
      }
}