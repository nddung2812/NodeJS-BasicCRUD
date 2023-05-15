const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel')
//@desc Get goals
//@route GET/api/goals
//@access Private

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

//@desc update a goal
//@route PUT/api/goals/:id
//@access Private

const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `update goal id ${req.params.id}`})
})

//@desc create a new goal
//@route POST/api/goals
//@access Private

const setGoal = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.text) {
        res.status(400).send('Please add a text field');
        return;
    }

    const text = req.body.text.trim();
    if (!text) {
        res.status(400).send('Text field cannot be empty');
        return;
    }

    res.status(200).json({message: 'New goal created', text});
})

//@desc delete a goal
//@route DELETE/api/goals/:id
//@access Private

const deleteGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: `deleted goal id ${req.params.id}`})
})


module.exports = {
    getGoals,
    updateGoal,
    setGoal,
    deleteGoal,
}