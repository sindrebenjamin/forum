# Project Documentation

IMPORTANT! Before doing any requests, you have to make a POST request to login to the app with Postman.

This project is a simple REST API built with Express.js and Firebase Firestore as the datastore. It provides endpoints for user authentication and CRUD operations on 'Posts' data.

## Datastore

The project uses Firebase Firestore as the datastore. The Firestore database is structured into collections of documents. Each document contains a set of key-value pairs. Firestore is a NoSQL database, which allows for flexible data structures.

In this project, we have a 'Posts' collection. Each document in the 'Posts' collection represents a post and has the following structure:

```json
{
  "id": "string",
  "title": "string",
  "content": "string"
}
```

## Endpoints

### Authentication Endpoints

- `POST /auth/register`: Registers a new user. The request body should include [`email`](command:_github.copilot.openSymbolInFile?%5B%22controllers%2FauthController.js%22%2C%22email%22%5D 'controllers/authController.js') and [`password`](command:_github.copilot.openSymbolInFile?%5B%22controllers%2FauthController.js%22%2C%22password%22%5D 'controllers/authController.js').

- `POST /auth/login`: Logs in a user. The request body should include [`email`](command:_github.copilot.openSymbolInFile?%5B%22controllers%2FauthController.js%22%2C%22email%22%5D 'controllers/authController.js') and [`password`](command:_github.copilot.openSymbolInFile?%5B%22controllers%2FauthController.js%22%2C%22password%22%5D 'controllers/authController.js').

- `POST /auth/logout`: Logs out the current user.

### Data Endpoints

- `GET /data`: Retrieves all posts from the 'Posts' collection.

- `POST /data/create`: Adds a new post to the 'Posts' collection. The request body should include [`title`](command:_github.copilot.openSymbolInFile?%5B%22controllers%2FdataController.js%22%2C%22title%22%5D 'controllers/dataController.js') and [`content`](command:_github.copilot.openSymbolInFile?%5B%22controllers%2FdataController.js%22%2C%22content%22%5D 'controllers/dataController.js').

- `DELETE /data/delete/:id`: Deletes a post with the given [`id`](command:_github.copilot.openSymbolInFile?%5B%22controllers%2FdataController.js%22%2C%22id%22%5D 'controllers/dataController.js') from the 'Posts' collection.

- `PUT /data/update/:id`: Updates a post with the given [`id`](command:_github.copilot.openSymbolInFile?%5B%22controllers%2FdataController.js%22%2C%22id%22%5D 'controllers/dataController.js') in the 'Posts' collection. The request body should include [`title`](command:_github.copilot.openSymbolInFile?%5B%22controllers%2FdataController.js%22%2C%22title%22%5D 'controllers/dataController.js') and [`content`](command:_github.copilot.openSymbolInFile?%5B%22controllers%2FdataController.js%22%2C%22content%22%5D 'controllers/dataController.js').

## Running the Project

To run the project, use the following command:

```sh
npm start
```

This will start the server on port 8080 (or the port specified in your [`.env`](command:_github.copilot.openRelativePath?%5B%22.env%22%5D '.env') file).

Please ensure that you have the correct Firebase Firestore credentials in your environment variables.
