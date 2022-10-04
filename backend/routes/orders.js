const express= require('express');
const Order = require('../modal/order');
const OrderItem = require('../modal/orderItem');
const router = express.Router();

// Get all the Products
router.get("/",async (req,res)=>{
    const orderList = await Order.find().populate('user',"name").sort({'dateOrdered':-1});
    if(!orderList)
        {
        return res.status(500).json({success:false,message:"Internal Server Error"})
        }
        res.status(200).send(orderList);
});

// Find the Order By User Id
router.get("/:id",async (req,res)=>{
    const orderList = await Order.findById(req.params.id)
    .populate('user',"name").sort({'dateOrdered':-1})
    .populate({
        path:'orderItems',populate:
        {path:'product',populate:'category'} 
    })
    if(!orderList)
        {
        return res.status(500).json({success:false,message:"Internal Server Error"})
        }

        res.status(200).send(orderList);

});

// API to create an Order

router.post("/", async( req,res)=>{

    const orderItemsIDs = Promise.all(req.body.orderItems.map(async (orderItem)=>{

        const newOrderItem = new OrderItem({
            quantity:orderItem.quantity,
            product:orderItem.product
        }); 
         await newOrderItem.save();
         return newOrderItem._id;
    }))

    const orderItemIdsResolved = await orderItemsIDs;

    let newOrder = new Order({
       orderItems:orderItemIdsResolved,
       shippingAddress1:req.body.shippingAddress1,
       shippingAddress2:req.body.shippingAddress2,
       city:req.body.city,
       zip:req.body.zip,
       country:req.body.country,
       phone:req.body.phone,
       status:req.body.status,
       totalPrice:req.body.totalPrice,
       user:req.body.user
    }); 

    newOrder = await newOrder.save();

    if(!newOrder)
    {
        res.status(404).send('the Category cannot be created');
    }
    else
    {
        res.status(201).send(newOrder);
    }

 });

// Updating an Order by the Admin User Only

 router.put("/:id",async (req,res)=>{

        const order = Order.findByIdAndUpdate(req.params.id,{
            status:req.body.status
        },{new:true});


        if(!order)
        {
           return res.status(500).json({success:false,message:"Internal Server Error"});
        }

        res.status(200).send(order);
 });

// Delete an Order 

 router.delete("/:id",(req,res)=>{

        Order.findByIdAndRemove(req.params.id).then(async(result)=>{
            if(!result)
                {
                    console.log(result)
                  await result.orderItems.map(async (orderItemId)=>{
                        await OrderItem.findByIdAndRemove(orderItemId);
                     })
                    res.status(404).json({success:false,message:"No Order Found"});
                }
                else
                {
                    res.status(200).json({success:true,message:"Order is Deleted"});
                }
        }).catch((err)=>{
            res.status(500).json({success:false,message:err});
        });
 });


//  Total Sales in Whole E-Shop

router.get("/get/totalsales",async (req,res)=>{

     const totalSales = await Order.aggregate([
        {
            $group:{_id:null,totalsales:{$sum:'totalProce'}}
        }
     ]);
     if(!totalSales)
        {
         return res.status(404).send('The order sales cannot be generated');
        }
res.send({totalsales:totalSales.pop().totalsales});


});


module.exports = router;