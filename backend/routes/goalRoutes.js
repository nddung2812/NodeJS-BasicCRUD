const express = require('express');
const router = express.Router();

const {getGoals, updateGoal, setGoal, deleteGoal} = require('../controllers/goalController')
 
router.route('/').get(getGoals).post(setGoal)

router.put('/:id', updateGoal)
router.delete('/:id', deleteGoal)

module.exports = router