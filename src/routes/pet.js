const express = require('express');
const router = express.Router();

const Pet = require('../models/Pet');
const User = require('../models/User');

const verifyToken = require('./verifyToken');

router.get('/', verifyToken, async (req, res) => {
    const userPet = await Pet.find({ owner: req.user });


    res.json(userPet);
});

router.get('/:id', verifyToken, async (req, res) => {

    const userPet = await Pet.findById(req.params.id);
    if (JSON.stringify(userPet.owner[0]) === JSON.stringify(req.user._id)) {
        res.send(userPet);
    } else {
        res.send('Wrong');
    }


});

router.post('/', verifyToken, async (req, res) => {
    const newPet = new Pet(req.body);
    newPet.owner = req.user;
    const pet = await newPet.save();
    res.send(pet);

});

router.put('/:id', verifyToken, async (req, res) => {
    const petId = req.params.id;

    const userPet = await Pet.findById(petId);
    if (JSON.stringify(userPet.owner[0]) === JSON.stringify(req.user._id)) {
        const editPet = req.body;
        const pet = await Pet.findByIdAndUpdate(petId, editPet);
        await pet.save();
        res.send('Updated');
    } else {
        res.send('Wrong');
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    const petId = req.params.id;

    const userPet = await Pet.findById(petId);
    if (JSON.stringify(userPet.owner[0]) === JSON.stringify(req.user._id)) {
        const pet = await Pet.findByIdAndRemove(petId);
        res.send('Deleted');
    } else {
        res.send('Wrong');
    }
});


module.exports = router;