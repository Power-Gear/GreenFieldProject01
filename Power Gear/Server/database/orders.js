const db = require("./config");

module.exports = {
  
addOrder : async (req, res) => {
  try {
    const { customerName, products, totalAmount, status, date } = req.body;
    const newOrder = await Order.create({
      customerName,
      products,
      totalAmount,
      status,
      date
    });

    res.status(201).json({ success: true, message: 'Order added successfully', order: newOrder });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ success: false, message: 'Failed to add order', error: error.message });
  }
},
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

      deleteOrder: async (req, res) => {
        const orderId = req.params.id;
        try {
          const order = await db.Order.findByPk(orderId);
          if (!order) {
            return res.status(404).send('Order not found');
          }
          await order.destroy();
          res.status(204).send();
        } catch (error) {
          console.error(error);
          res.status(500).send('Error deleting order');
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

       getOrdersByUser : async (req, res) => {
        const { userId } = req.params;
        try {
          const orders = await db.Order.find({ userId: userId });
          res.json(orders);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch orders for the user." });
        }
      },

}