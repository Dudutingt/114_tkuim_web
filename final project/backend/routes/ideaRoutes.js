const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// 1. 【Create】新增靈感
router.post('/', async (req, res) => {
    try {
        const newIdea = new Idea(req.body);
        const savedIdea = await newIdea.save();
        res.status(201).json(savedIdea);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 2. 【Read】取得所有靈感
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find().sort({ createdAt: -1 }); 
        res.json(ideas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. 【Update】更新靈感 (你原本漏掉這段)
router.put('/:id', async (req, res) => {
    try {
        const updatedIdea = await Idea.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // 這會回傳更新後的資料
        );
        if (!updatedIdea) {
            return res.status(404).json({ message: "找不到該筆靈感" });
        }
        res.json(updatedIdea);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. 【Delete】刪除靈感
router.delete('/:id', async (req, res) => {
    try {
        await Idea.findByIdAndDelete(req.params.id);
        res.json({ message: '靈感已刪除' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;