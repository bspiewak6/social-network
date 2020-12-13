# Social Network Back-End API Application
![License](https://img.shields.io/badge/license-MIT%20License-blue.svg)

## Description
This social network API app is a back-end Node.js application that was created using a NoSQL database. The app does not have a front-end so the user will need to run npm install and test out the routes using Insomnia Core. Users are created, can be updated and deleted. All users have the ability to add thoughts, friends and reactions. The key technologies used are listed below. 

## Table of Contents
* [Technologies](#technologies)
* [Screenshots](#screenshots)
* [Requirements](#requirements)
* [Links](#links)

## Technologies
1. JavaScript
2. Node.js
3. Express.js
4. MongoDB
5. Mongoose.js
6. Moment.js

## Screenshots
#### Get All Users and Thoughts
![Screenshots]()

#### Get All Users and Thoughts by id
![Screenshots]()

#### Create, Update and Delete a User
![Screenshots]()

#### Add and Delete a Friend
![Screenshots]()

#### Add and Delete Reactions to Thoughts
![Screenshots]()

## Requirements
1. When the user enters npm start to invoke the application
    * the server is started and the Mongoose models are synced to the MongoDB database
2. The app is built with API GET routes for viewing users and thoughts through Insomnia Core
    * this data is shows in a formatted JSON
3. Next, the app also includes POST, PUT and DELETE routes that can create, update and delete users and thoughts in the database
4. Lastly, the app has POST and DELETE routes to create and delete reactions to thoughts as well as add and remove friends from a user's friend list. 
    * One addition to app was to include a route that removes just one reaction to a thought instead of just having functionality that deletes all reactions

## Links
* [Social Network Walkthrough Video]()
* [Social Network Repository](https://github.com/bspiewak6/social-network)

## License
![License](https://img.shields.io/badge/license-MIT%20License-blue.svg)  
This app is licensed under the MIT license.