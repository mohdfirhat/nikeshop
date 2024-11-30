# Nike E-Commerce Project

# Installation

## Frontend Installation

`npm install`

`npm run dev`

## Backend Installation

`npm install`

`npm start`

# Project Description

This project is a PERN full-stack e-commerce website which showcase the frontend and backend of an standard ecommerce shop. This project uses Typescript + React tempelate.
This project uses various dependences such as react-router-dom,axios,redux-toolkit to name a few.
It includes 2 main component which would be the client site, and backend server which will be discussed in detailed below.

# Frontend

## Typescript

TypeScript is used for Frontend and Backend development.

## Redux Toolkit

Redux toolkit is used to mainly to used for the following:

- Cart-To store the product details(id,size,color,quantity) and compute the total unique product quantity and price which will be used to create an order.

## TailwindCSS

Responsive Mobile CSS
The TailwindCSS cater for mobile users and added CSS properties for desktop view.

## Axios

Axios is used to upload post and get data from Postgres Database.

## Jest (Testing)
Jest is used to test the custom function used in the apps.

# Backend

## Express

Express.js backend framework is used for this project.

## PostGresSQL

PostGresSQL is used together with Sequelize(ORM)to create and query the database. There is Many-to-Many relationship between Orders and product which can be seen at Backend/src/database/models. **View the Entity Relationship Diagram(ERD) at /nike-ecommerse.png.**

## JsonWebToken(JWT) and httpOnly Cookies

JsonWebToken(JWT) is used to authenticate the user which is passed from the cookies["access_token"](httpOnly and secure) and using the verifyToken middleware.

## Security(In progress)

Backend Security uses helmet,cors. The use of Sequelize(ORM) protects from SQL injections. Password is salted and encrypted(bcrypt) before stored in the database.
User input is validated using express-validator(In Progress) to validate and sanitize user input.
