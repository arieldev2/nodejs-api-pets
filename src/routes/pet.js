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
    res.send(userPet);

});

router.post('/', verifyToken, async (req, res) => {
    const newPet = new Pet(req.body);
    newPet.owner = req.user;
    const pet = await newPet.save();
    res.send(pet);

});

router.put('/:id', verifyToken, async (req, res) => {
    const petId = req.params.id;
    const editPet = req.body;
    const pet = await Pet.findByIdAndUpdate(petId, editPet);
    await pet.save();
    res.send('Updated');
});

router.delete('/:id', verifyToken, async (req, res) => {
    const petId = req.params.id;
    const pet = await Pet.findByIdAndRemove(petId);
    res.send('Deleted');
});






module.exports = router;