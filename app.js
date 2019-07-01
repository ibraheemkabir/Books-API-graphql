const express = require('express')
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb+srv://ibraheem:ibraheem4077@gql-practice-otzwn.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open',()=>{
	console.log('connected to database')
})

app.use('/graphql', expressGraphQL({
	schema: schema,
	graphiql: true
}))

app.listen(5050, () => console.log('Server Running'))