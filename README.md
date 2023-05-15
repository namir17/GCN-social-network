# GCN and Social Networks

These are scripts  that generates user data, creates realistic social connections between users, and provides a Node.js server to 
interact with the data.

## Setup Instructions

1. Make sure you have Node.js installed on your machine. If not, download and install it from the official website: 
[Node.js](https://nodejs.org)

2. Create a new directory for your project, let's call it "social-network-app".

3. Inside the "social-network-app" directory, create the following files:
   - `generate_data.py`: Contains the Python script for generating user data.
   - `generate_connections.js`: Contains the JavaScript script for creating social connections.
   - `server.js`: Contains the JavaScript code for the server.

4. Open a terminal or command prompt and navigate to the "social-network-app" directory.

## Setting up the Node.js server# GCN-social-network

1. In the terminal, run the following command to initialize a new Node.js project:

npm init -y

2. Install the required Node.js packages by running the following command:

npm install express neo4j-driver

## Running the scripts

1. In the terminal, run the Python script to generate user data by executing the following command:

python generate_data.py

This will create a file named `user_data.csv` containing the generated user data.

2. Next, open a new terminal window (while keeping the previous one open) and navigate to the "social-network-app" directory.

3. In the new terminal, run the following command to start the Node.js server:

node server.js

This will start the server, and it should display a message confirming that it is running on `http://localhost:5003`.

4. Finally, open another terminal window (while keeping the previous ones open) and navigate to the "social-network-app" directory.

5. In this new terminal, run the following command to create realistic social connections between users:

node generate_connections.js

The script will connect to your local Neo4j instance and create connections between users based on their hobbies.


