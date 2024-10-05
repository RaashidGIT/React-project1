// Import required modules
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const pug = require('pug');

// Initialize the app and set the port
const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'pug'); // Set Pug as the view engine

// MongoDB connection URL and database name
const url = 'mongodb://localhost:27017';
const dbname = 'blogapp'; 
let db;

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async (client) => {
        console.log("Connected to MongoDB");
        db = client.db(dbname);

        // Endpoint to create a new user
        app.post('/blogapp', async (req, res) => {
            try {
                const content = req.body; 
                console.log(content); // Log the content to see what's being sent
                const result = await db.collection('contents').insertOne(content);
                res.send({ message: 'Content inserted successfully' });
            } catch (err) {
                console.error(err); // Log any error that occurs
                res.status(500).send({ message: 'Error inserting content' });
            }
        });
        // Endpoint to get all users
        app.get('/blogapp', async (req, res) => {
            try {
                const contents = await db.collection('contents').find().toArray(); // Fetch all users from the collection
                console.log(contents);
                res.send(contents);
            } catch (err) {
                res.status(500).send({ message: 'Error fetching content' });
            }
        });

        // // Endpoint to delete a user by ID
        // app.delete('/users/:id', async (req, res) => {
        //     try {
        //         const id = req.params.id; // Get the ID from the URL parameters
        //         if (!ObjectId.isValid(id)) {
        //             return res.status(400).send({ message: "Invalid ID" });
        //         }

        //         const result = await db.collection('user').deleteOne({ _id: new ObjectId(id) }); // Delete user
        //         if (result.deletedCount === 0) {
        //             return res.status(404).send({ message: 'User not found' });
        //         }

        //         res.send({ message: 'User deleted successfully' });
        //     } catch (err) {
        //         res.status(500).send({ message: 'Error deleting user' });
        //     }
        // });

        // // Endpoint to update a user by ID
        // app.put('/users/:id', async (req, res) => {
        //     try {
        //         const id = req.params.id; // Get the ID from the URL parameters
        //         if (!ObjectId.isValid(id)) {
        //             return res.status(400).send({ message: "Invalid ID" });
        //         }

        //         const updatedUser = req.body; // Get updated user data from request body
        //         const result = await db.collection('user').updateOne(
        //             { _id: new ObjectId(id) },
        //             { $set: updatedUser } // Update user data
        //         );

        //         if (result.matchedCount === 0) {
        //             return res.status(404).send({ message: 'User not found' });
        //         }

        //         res.send({ message: 'User updated successfully' });
        //     } catch (err) {
        //         res.status(500).send({ message: 'Error updating user' });
        //     }
        // });

        // Start the server
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err); // Log any connection errors
    });
