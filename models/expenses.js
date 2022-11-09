const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Expenses = sequelize.define('expenses', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    money:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Expenses;