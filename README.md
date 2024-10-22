---

# GastroBeast

GastroBeast is a web-based application that allows users to explore, review, and manage restaurant information. Built with a **React** frontend and a **RESTful API** backend, GastroBeast provides an intuitive interface for restaurant discovery, category sorting, and user-generated reviews.


![image](https://github.com/user-attachments/assets/c45f16cd-4d95-4f6a-9da2-4dc1b0533bf4)



![image](https://github.com/user-attachments/assets/3efc0587-b4ca-4eb9-8346-78ad2fd836ef)



![image](https://github.com/user-attachments/assets/eb4f6ca4-7bbc-4af7-9e53-21507b586b7e)




![image](https://github.com/user-attachments/assets/0f87c8a1-19b3-48b1-b34c-5f773d5dec68)



## Features

- **Browse Restaurants**: View restaurants by categories, star ratings, and detailed descriptions.
- **Add Reviews**: Leave feedback and rate restaurants based on your experience.
- **Categories & Filtering**: Filter restaurants by various categories like Fast Food, Family Style, Premium, Cafeteria, etc.
- **Authentication**: Secure login and registration for users using JWT.

## Frontend Setup (React)

The frontend of GastroBeast is built with React, and it connects seamlessly to the backend API for managing restaurant-related data. Below are the steps to set up and run the React frontend:

### Prerequisites

- **Node.js** installed on your system.
- **npm** or **yarn** package manager.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gastrobeast.git
   cd gastrobeast/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or using yarn
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or using yarn
   yarn start
   ```

4. Access the application at `http://localhost:3000`.

## Backend Setup (RESTful API)

The GastroBeast backend is a RESTful API designed to manage restaurants, reviews, categories, and user accounts. Below are the core details of the backend:

### API Endpoints

#### **Address**
- `GET /api/restaurants/{restaurantId}/address`: Retrieves the address of a specific restaurant by its ID.
- `POST /api/restaurants/{restaurantId}/address`: Adds or updates the address for a specific restaurant.

#### **Category**
- `POST /api/restaurants/categories`: Creates a new restaurant category.
- `GET /api/restaurants/categories`: Retrieves a list of all restaurant categories.
- `GET /api/restaurants/{restaurantId}/categories`: Retrieves the categories associated with a specific restaurant.
- `POST /api/restaurants/{restaurantId}/categories`: Adds categories to a specific restaurant.

#### **Restaurant**
- `GET /api/restaurants`: Retrieves a list of all restaurants.
- `POST /api/restaurants`: Creates a new restaurant.
- `GET /api/restaurants/all`: Retrieves detailed information about all restaurants.
- `GET /api/restaurants/{id}`: Retrieves information about a specific restaurant by its ID.
- `DELETE /api/restaurants/{restaurantId}`: Deletes a specific restaurant by its ID.
- `PUT /api/restaurants/{restaurantId}`: Updates the details of a specific restaurant.

#### **Review**
- `POST /api/restaurants/{restaurantId}/reviews`: Adds a new review to a specific restaurant.
- `GET /api/restaurants/{restaurantId}/reviews`: Retrieves reviews for a specific restaurant.
- `DELETE /api/restaurants/{restaurantId}/reviews/{reviewId}/delete`: Deletes a specific review by its ID.
- `PUT /api/restaurants/{restaurantId}/reviews/{reviewId}/update`: Updates a specific review by its ID.

#### **User**
- `POST /api/account/register`: Registers a new user.
- `POST /api/account/login`: Logs in an existing user and returns a JWT token.

### Authentication

GastroBeast uses **JWT** (JSON Web Tokens) for authentication. Users must include a valid JWT token in the Authorization header when making requests to protected endpoints.

#### Obtaining a Token

To obtain a JWT token, send a POST request to `/api/account/login` with valid user credentials. The response will include the token that can be used for authenticated requests.

### Error Handling

The API returns standard HTTP status codes to indicate the success or failure of an API request. Common status codes include:

- `200 OK` - The request was successful.
- `201 Created` - The resource was successfully created.
- `400 Bad Request` - The request was invalid or cannot be otherwise served.
- `401 Unauthorized` - Authentication failed or user does not have permissions for the requested operation.
- `404 Not Found` - The requested resource could not be found.
- `500 Internal Server Error` - An error occurred on the server.

## Testing

For testing purposes, Postman was used to send HTTP requests, and integration tests were implemented. The project includes coverage for requests involving DTOs, database interactions, and service operations. Feel free to explore the testing solution.

## Contributing

Contributions to the **GastroBeast** are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---




