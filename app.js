const express = require('express')
const cors = require('cors');
const Sequelize = require('sequelize');

const sequelize = require('./models/expenses')
const expensesRoute = require('./routes/expenses')


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expensesRoute)


sequelize.sync()
.then(()=> {
    app.listen(3000, ()=>{
        console.log("server started")
    })
})
.catch(err => console.log(err))
