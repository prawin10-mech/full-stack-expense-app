const express = require('express')
const app = express();
const db = require('../models/expenses')
app.use(express.urlencoded({ extended: true }));

exports.getHome = (req, res, nxt) => {
    res.send('controller')
}

exports.postExpense = async (req, res, next) =>{
    const expense = req.body;
    const money = expense.money;
    const description = expense.description;
    const category = expense.category;
    const data = await db.create({money: money, description: description, category: category})
    res.status(200).json({newExpense:data})
}

exports.getExpenses = async(req, res, next)=>{
    return db.findAll()
    .then((result)=>{
        res.send(result)
    }).catch(err => console.log(err))
}

exports.getExpenseData = async(req, res, next) => {
    const expenseId = req.params.id;
    db.findOne({where: {id: expenseId}})
    .then((result) => {
        res.send(result)
    })
}

exports.deleteExpense = (req, res, next) => {
    const expenseId = req.params.id;
    db.destroy({where: {id: expenseId}})
    res.sendStatus(200)
}

exports.editExpense = (req, res, next) => {
    const expenseId = req.params.id;
    db.findOne({where: {id: expenseId}})
    .then((result) => {
        res.send(result)
    })
}