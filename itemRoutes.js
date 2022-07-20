const express = require('express');
const { toNamespacedPath } = require('path');
const { nextTick } = require('process');
const router = new express.Router();
const ExpressError = require("./expressError")
let ITEMS = require("./fakeDb");



router.get('/', (req, res, next) => {
    try{
    res.json({ items: ITEMS })}
    catch(e){
        return next(e);
    }

})

router.get('/:name', (req, res, next) => {
    try{
    const item = ITEMS.find(i=>i.product === req.params.name)
    if(item == undefined) throw new ExpressError("Item not found.",404)
    res.json({product: item.product, price: item.price})}
    catch(e){
        return next(e)
    }

})

router.post('/', (req, res,next) => {
    try{
    const newProductName = req.body.product;
    const newProductPrice = req.body.price;
    if(newProductName == undefined || newProductPrice == undefined){
    throw new ExpressError("Enter a valid item and price.",405 )
    }

    const newItem = {"product": newProductName, "price": newProductPrice};
    ITEMS.push(newItem);
    return res.status(201).json({
        item: newItem})}
    catch(e){
        return next(e);
    }
})

router.patch('/:name', (req, res, next) => {
    try{
    const item = ITEMS.find(i=>i.product === req.params.name);
    let newName = req.body.product;
    let newPrice = req.body.price;
    if(newName == undefined || newPrice == undefined){
        throw new ExpressError("Enter a valid item and price.",404 )
        }
    item.product = newName;
    item.price = newPrice;
    return res.status(200).json({
        "updated":{ item }
    });}
    catch(e){
        return next(e);
    }
})

router.delete('/', (req,res, next) => {
    try{
    let index = ITEMS.findIndex(i => i.product === req.body.product);
    if(index === -1){
        throw new ExpressError("Item not found.",404 )
        }
    ITEMS.splice(index, 1);
    return res.status(200).json({message: "deleted"})}
    
    catch(e){
        return next(e);
    }

})



module.exports = router;