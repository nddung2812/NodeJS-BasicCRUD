const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');
const subscriber = require('../models/subscriber');

// Get all Subs
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch(err) {
        res.status(500).json( { message: err.message})
    }
})

// Get one sub
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

// Create a sub
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribeToChannel: req.body.subscribeToChannel
    })

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

// Update a sub
router.patch('/:id', getSubscriber, async (req, res) => {
    if(!!req.body.name) {
        res.subscriber.name = req.body.name
    }
    if (!!req.body.subscribeToChannel) {
        res.subscriber.subscribeToChannel = req.body.subscribeToChannel
    }

    try{
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber)
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete a sub
router.delete('/:id', getSubscriber, async (req,res) => {
    try {
        await res.subscriber.deleteOne();
        res.json({message: "Subscriber successfully deleted!"})
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})


async function getSubscriber(req,res,next) {
    let subscriber;
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({message: 'Subscriber is not found!'})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    res.subscriber = subscriber
    next()
}
module.exports = router