# Car Wash Booking System API

This API provides a backend for a Car Wash Booking System. It includes endpoints for user authentication, service management, slot management, and booking services.

## Technology Stack

- TypeScript
- Express.js
- MongoDB
- Mongoose

## Project OverView

- [User Routes](#user-routes)
  - [User Sign Up](#user-sign-up)
  - [User Login](#user-login)
- [Service Routes](#service-routes)
  - [Create Service](#create-service-only-accessible-by-admin)
  - [Get a Service](#get-a-service)
  - [Get All Services](#get-all-services)
  - [Update Service](#update-service-only-accessible-by-admin)
  - [Delete Service](#delete-service-only-accessible-by-admin)
- [Slot Routes](#slot-routes)
  - [Create Slot](#create-slot-only-accessible-by-admin)
  - [Get Available Slots](#get-available-slots)
- [Booking Routes](#booking-routes)
  - [Book a Service](#book-a-service-only-accessible-by-user)

## User Routes

### User Sign Up

**Route:** `/api/auth/signup`  
**Method:** `POST`

#### Request Body
```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "ph-password",
  "phone": "1234567890",
  "role": "admin",
  "address": "123 Main Street, City, Country"
}
### Response
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country",
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}```



## User Login
### Route: /api/auth/login
### Method: POST

## Request Body
```json
{
  "email": "web@programming-hero.com",
  "password": "ph-password"
}```
## Response
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "your-jwt-token",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country",
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}```


## Service Routes
### Create Service (Only Accessible by Admin)
### Route: /api/services
### Method: POST
## Headers: Authorization: Bearer your-jwt-token

## Request Body
```json
{
  "name": "Car Wash",
  "description": "Professional car washing service",
  "price": 50,
  "duration": 60,
  "isDeleted": false
}```
Response
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Service created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Car Wash",
    "description": "Professional car washing service",
    "price": 50,
    "duration": 60,
    "isDeleted": false,
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
Error Response
json
Copy code
{
  "success": false,
  "statusCode": 400,
  "message": "Service creation failed",
  "error": "Service with the same name already exists"
}
Get a Service
Route: /api/services/:serviceId
Method: GET

Response
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Service retrieved successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Car Wash",
    "description": "Professional car washing service",
    "price": 50,
    "duration": 60,
    "isDeleted": false,
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
Error Response
json
Copy code
{
  "success": false,
  "statusCode": 404,
  "message": "Service not found",
  "error": "No service found with the provided ID"
}
Get All Services
Route: /api/services
Method: GET

Response
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Services retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Car Wash",
      "description": "Professional car washing service",
      "price": 50,
      "duration": 60,
      "isDeleted": false,
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    }
  ]
}
Error Response
json
Copy code
{
  "success": false,
  "statusCode": 500,
  "message": "Failed to retrieve services",
  "error": "Internal server error"
}
Update Service (Only Accessible by Admin)
Route: /api/services/:serviceId
Method: PUT
Headers: Authorization: Bearer your-jwt-token

Request Body
json
Copy code
{
  "name": "Updated Car Wash",
  "description": "Updated professional car washing service",
  "price": 60,
  "duration": 70
}
Response
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Service updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Car Wash",
    "description": "Updated professional car washing service",
    "price": 60,
    "duration": 70,
    "isDeleted": false,
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
Error Response
json
Copy code
{
  "success": false,
  "statusCode": 404,
  "message": "Service update failed",
  "error": "No service found with the provided ID"
}
Delete Service (Only Accessible by Admin)
Route: /api/services/:serviceId
Method: DELETE
Headers: Authorization: Bearer your-jwt-token

Response
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Service deleted successfully"
}
Error Response
json
Copy code
{
  "success": false,
  "statusCode": 404,
  "message": "Service deletion failed",
  "error": "No service found with the provided ID"
}
Slot Routes
Create Slot (Only Accessible by Admin)
Route: /api/slots
Method: POST
Headers: Authorization: Bearer your-jwt-token

Request Body
json
Copy code
{
  "date": "2024-06-20",
  "startTime": "10:00",
  "endTime": "11:00",
  "isBooked": false
}
Response
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Slot created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-20",
    "startTime": "10:00",
    "endTime": "11:00",
    "isBooked": false,
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
Error Response
json
Copy code
{
  "success": false,
  "statusCode": 400,
  "message": "Slot creation failed",
  "error": "Slot already exists for the given time"
}
Get Available Slots
Route: /api/slots/available
Method: GET

Response
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Available slots retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-20",
      "startTime": "10:00",
      "endTime": "11:00",
      "isBooked": false,
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    }
  ]
}
Error Response
json
Copy code
{
  "success": false,
  "statusCode": 500,
  "message": "Failed to retrieve available slots",
  "error": "Internal server error"
}
Booking Routes
Book a Service (Only Accessible by User)
Route: /api/bookings
Method: POST
Headers: Authorization: Bearer your-jwt-token

Request Body
json
Copy code
{
  "userId": "60629b8e8cfcd926384b6e5e",
  "serviceId": "60d9c4e4f3b4b544b8b8d1c5",
  "slotId": "60d9c4e4f3b4b544b8b8d1c5"
}
Response
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Service booked successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "userId": "60629b8e8cfcd926384b6e5e",
    "serviceId": "60d9c4e4f3b4b544b8b8d1c5",
    "slotId": "60d9c4e4f3b4b544b8b8d1c5",
    "status": "booked",
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
Error Response
json
Copy code
{
  "success": false,
  "statusCode": 400,
  "message": "Booking failed",
  "error": "Slot is already booked"
}
