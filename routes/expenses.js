const express = require('express')

const router = express.Router();

const expensesController = require('../controls/expenses')



router.post('/expenses/add-expense', expensesController.postExpense)

router.get('/expenses', expensesController.getExpenses)

router.get('/expenses/:id', expensesController.getExpenseData)

router.delete('/delete-expense/:id', expensesController.deleteExpense)

router.get('/expenses/edit-expense/:id', expensesController.editExpense)

router.get('/', expensesController.getHome)

module.exports = router;