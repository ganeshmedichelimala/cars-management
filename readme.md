# Car Management System

## Admin Interface

### Login URL

- **Endpoint:** `http://localhost:5000/api/auth/login`
- **Purpose:** This URL is used for logging into the admin interface of the Car Management System. It requires admin credentials to access the admin features and perform administrative tasks.
- **Credentials:** Admin credentials are needed to authenticate and gain access to the admin-specific functionalities, such as CRUD operations for car records and viewing car statistics.

## User Interface

### Login URL

- **Endpoint:** `http://localhost:5000/api/auth/login`
- **Purpose:** This URL is used for logging into the user interface of the Car Management System. It allows users to access the features available to them.
- **Credentials:** User credentials are required for authentication, providing access to view the list of cars created by the admin.

## API Endpoints

### Create Car

- **Method:** `POST`
- **Endpoint:** `/api/cars`
- **Purpose:** This endpoint is used to create a new car record in the system. The request body should include details about the car such as make, model, year, and other relevant attributes.

### Get All Cars

- **Method:** `GET`
- **Endpoint:** `/api/cars`
- **Purpose:** This endpoint retrieves a list of all cars available in the system. It provides information on each car, including their details. This endpoint can be used by both admins and users to view the cars.

### Update Car

- **Method:** `PUT`
- **Endpoint:** `/api/cars/:id`
- **Purpose:** This endpoint allows for updating an existing car record. The `:id` parameter represents the unique identifier of the car to be updated. The request body should include the updated details of the car.

### Delete Car

- **Method:** `DELETE`
- **Endpoint:** `/api/cars/:id`
- **Purpose:** This endpoint is used to delete a car record from the system. The `:id` parameter specifies which car to delete. Only authorized users, typically admins, should be able to use this endpoint to ensure proper management of car records.

## Deployment

### Vercel

- **Link:** [https://cars-management-eight.vercel.app/](https://cars-management-eight.vercel.app/)
- **Purpose:** This is the live deployment URL for the Car Management System. It allows users to access the deployed version of the application on the Vercel platform. Users can interact with the system through this link, and any updates to the system will be reflected here.
