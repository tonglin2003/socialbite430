const request = require('supertest');
const express = require('express');
const session = require('express-session');
const { sequelize, User } = require('../models');


const restauarantRouter = require('../routes/restaurant'); 
const { autheticateUser } = require('../middleware/authUser'); // Your authentication middleware


// Create an express app instance and use the router
const app = express();
app.use(express.json());
app.use(
  session({
    secret: 'testsecret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use('/api/restaurant', restauarantRouter);


// Mock the Sequelize models
jest.mock('../models', () => ({
    Restaurant: {
      findOne: jest.fn(),
      destroy: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
    },
    User: {
      update: jest.fn(),
    }
  }));

const { Restaurant } = require('../models'); // Mocked Restaurant model

// Mock the authentication middleware
jest.mock('../middleware/authUser', () => ({
    autheticateUser: (req, res, next) => next(), // Always allow the request to proceed
}));


describe('Restaurant CRUD route tests', () => {

    // Test POST /api/restaurant
    it('should create a new restaurant and return 201', async () => {

        // Mock the create method of the Restaurant model
        Restaurant.create.mockResolvedValue({
            id: 1,
            restaurantName: 'Test Restaurant',
            address: '123 Test St',
            latitude: 0,
            longitude: 0,
        });
    
        const response = await request(app).post('/api/restaurant').send({
            restaurantName: 'Test Restaurant',
            address: '123 Test St',
            profileImage: 'https://example.com/profile.jpg',
            heroImage: 'https://example.com/hero.jpg',
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('The restaurant is created successfully');
        expect(response.body.restaurant.restaurant).toBe('Test Restaurant');
    });
    
        // Test GET /api/restaurant/:restaurantId
        it('should fetch a restaurant by ID and return 200', async () => {
        // Mock the findOne method of the Restaurant model
        Restaurant.findOne.mockResolvedValue({
            id: 1,
            restaurantName: 'Test Restaurant',
            address: '123 Test St',
            latitude: 0,
            longitude: 0,
      });
  
      const response = await request(app).get('/api/restaurant/1');
  
      expect(response.statusCode).toBe(200);
      expect(response.body.restaurantName).toBe('Test Restaurant');
    });
  
    // Test DELETE /api/restaurant/:restaurantId
    it('should delete a restaurant by ID and return 200', async () => {
      // Mock the destroy method of the Restaurant model
      Restaurant.destroy.mockResolvedValue(1); // Return 1 to simulate successful deletion
  
      const response = await request(app).delete('/api/restaurant/1');
  
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('The restaurant is deleted successfully');
    });
  
    // Test GET /api/restaurant (fetch all restaurant)
    it('should fetch all restaurant and return 200', async () => {
      // Mock the findAll method of the Restaurant model
      Restaurant.findAll.mockResolvedValue([
        {
          id: 1,
          restaurantName: 'Test Restaurant 1',
          address: '123 Test St',
          latitude: 0,
          longitude: 0,
        },
        {
          id: 2,
          restaurantName: 'Test Restaurant 2',
          address: '456 Test St',
          latitude: 0,
          longitude: 0,
        },
      ]);
  
      const response = await request(app).get('/api/restaurant');
  
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].restaurantName).toBe('Test Restaurant 1');
      expect(response.body[1].restaurantName).toBe('Test Restaurant 2');
    });
  
    // Test GET /api/restaurant (no restaurants found)
    it('should return 404 if no restaurant exist', async () => {
      // Mock findAll to return an empty array
      Restaurant.findAll.mockResolvedValue([]);
  
      const response = await request(app).get('/api/restaurant');
  
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('There are no restaurants!');
    });
});  
