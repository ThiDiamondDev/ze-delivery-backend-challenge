# Zé Delivery Backend Challenge

This project is a solution for the Zé Delivery Backend Challenge, which consists of creating a REST API to manage and search for partners. The project is built using **Node.js**, **Express**, **MongoDB**, and **Docker**.

## Project Description

The project implements the following features:

- **Create a partner**: A partner is a store that sells Zé Delivery products. A partner has a unique ID, a trading name, an owner name, a document (CNPJ), and a coverage area (a MultiPolygon GeoJSON). To create a partner, the API receives a POST request with a JSON body containing the partner's information. The API validates the input and returns the created partner or an error message.
- **Load partner by id**: The API receives a GET request with a partner ID as a parameter and returns the partner with that ID or an error message if not found.
- **Search partner**: The API receives a GET request with a latitude and longitude as query parameters and returns the nearest partner that covers that location or an error message if not found. The API uses the geospatial features of MongoDB to perform the search.

## Technologies Used

- **Node.js**: A JavaScript runtime environment that executes JavaScript code outside a web browser.
- **Express**: A web framework for Node.js that provides features for web and mobile applications.
- **MongoDB**: A cross-platform document-oriented database program that uses JSON-like documents with optional schemas.
- **Docker**: A software platform that enables you to build, test, and deploy applications using containers.

## How to Run

To run the project, you need to have **Docker** and **Docker Compose** installed on your machine. Follow these steps:

1. Clone this repository to your local machine.
2. Rename the `.env.example` file to `.env` and fill in the environment variables with your own values.
3. Run `docker-compose up -d` to start the MongoDB container and the Node.js container.
4. The API will be available at `http://localhost:{NODE_LOCAL_PORT}`.

## How to Test

To test the project, you need to have the MongoDB container running. Follow these steps:

1. Run `npm install` to install the dependencies.
2. Run `npm test` to run the tests using Jest and Supertest.
3. The test results will be displayed on the terminal.

## API Endpoints

Here are the endpoints available in the API:

- `GET /partners/:id`: Retrieves a partner by its ID.
- `POST /partners`: Creates a new partner with the given data in the request body.
- `GET /partners/search?lng=:lng&lat=:lat`: Searches for the nearest partner that covers the given location (longitude and latitude) in the query parameters.