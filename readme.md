# Car Management System

## Admin Interface

### Login URL

- **Endpoint:** `http://localhost:5000/api/auth/login`
- **Credentials:** Admin credentials are needed to authenticate and gain access to the admin-specific functionalities, such as CRUD operations for car records and viewing car statistics.

## User Interface

### Login URL

- **Endpoint:** `http://localhost:5000/api/auth/login`
- **Credentials:** User credentials are required for authentication, providing access to view the list of cars created by the admin.

## API Endpoints

### Create Car

- **Method:** `POST`
- **Endpoint:** `/api/cars`
- **Request Body:** Include details about the car such as make, model, year, and other relevant attributes.

### Get All Cars

- **Method:** `GET`
- **Endpoint:** `/api/cars`

### Update Car

- **Method:** `PUT`
- **Endpoint:** `/api/cars/:id`
- **Request Body:** Include the updated details of the car.

### Delete Car

- **Method:** `DELETE`
- **Endpoint:** `/api/cars/:id`

## Deployment

### Vercel

- **Link:** [https://cars-management-eight.vercel.app/](https://cars-management-eight.vercel.app/)
