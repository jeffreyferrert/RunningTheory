const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const Track = mongoose.model('Track');

router.get('/', async (req, res) => {
    try {
        const event = await Event.find()
            .populate("track", "_id name")
            .sort({ createdAt: -1 });
        return res.json(event);
    }
    catch (err) {
        return res.json([]);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newEvent = new Event({
            track: req.body.track._id,
            date: req.body.date
        });

        let event = await newEvent.save();
        event = await event.populate('track', '_id name');
        return res.json(event);
    }
    catch (err) {
        next(err);
    }
});

router.delete('/:eventId', async (req, res, next) => {
    try {
        const eventId = req.url.slice(1)

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        return res.json();
    } catch (err) {
        next(err);
    }
});





module.exports = router;