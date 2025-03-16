const express = require('express');
const router = express.Router();
const Item = require('../models/items');

router.get('/', async (req, res) => {
    const items = await Item.findAll();
    res.json(items);
});

router.post('/', async (req, res) => {
    const newItem = await Item.create(req.body);
    res.json(newItem);
});

router.put('/:id', async (req, res) => {
    const item = await Item.findByPk(req.params.id);
    if (item) {
        await item.update(req.body);
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

router.delete('/:id', async (req, res) => {
    const item = await Item.findByPk(req.params.id);
    if (item) {
        await item.destroy();
        res.send('Item deleted');
    } else {
        res.status(404).send('Item not found');
    }
});

module.exports = router;