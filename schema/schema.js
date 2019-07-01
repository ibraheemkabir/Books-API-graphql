const graphql = require('graphql');
const _ = require('lodash')
const Book = require('../models/books')
const Author = require('../models/author')

const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} = require('graphql');


const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: {type: GraphQLString},
		genre: {type: GraphQLString},
		author: {
			type: Authortype,
			resolve(parent,args){
				console.log(parent);
				//return _.find(authors,{id:parent.authorId})
				return Author.findById(parent.authorId)
			}
		}
	})
})

const Authortype = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		age: { type: GraphQLInt },
		name: { type: GraphQLString },
		books: {
			type: new GraphQLList(BookType),
			resolve (parent,args){
				//return _.filter(books,{ authorId: parent.id })
				return Book.find({authorId: parent.id})
			}
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType', 
	fields: () => ({
		book: {
			type: BookType,
			args: {id: { type: GraphQLString}},
			resolve(parent,args){
				//return _.find(books,{ id:args.id });
				return Book.findById(args.id)
			}
		},
		author: {
			type: Authortype,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				//return _.find(authors,{id: args.id})
				return Author.findById(args.id)
			}
		},
		authors: {
			type: new GraphQLList(Authortype),
			resolve(parent,args){
				//return authors
				return Author.find({})
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent,args){
				//return books
				return Book.find({})
			}
		}
	})
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: Authortype,
			args: {
				name: {type: GraphQLString},
				age: {type: GraphQLString},
			},
			resolve(parent,args){
				let author = new Author({
					name: args.name,
					age: args.age,
				});
				return author.save();
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: {type: GraphQLString},
				genre: {type: GraphQLString},
				authorId: {type: GraphQLID}
			},
			resolve(parent,args){
				let book = new Book({
					name: args.name,
					genre: args.genre,
				});
				return book.save();
			}

		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})