const request = require('supertest');
const express = require('express');

// Import the routes
const postsRouter = require('../routes/restaurantPost');

// Mock the Sequelize models
jest.mock('../models', () => ({
  Post: {
    findAll: jest.fn(),
    findOne: jest.fn(),
  },
  User: {},
  Restaurant: {}
}));

const { Post } = require('../models'); // Mocked Post model

// Set up Express app for testing
const app = express();
app.use(express.json());
app.use('/api/restaurant_post', postsRouter); 

describe('Posts Route Tests (Mocked Database)', () => {
  // Test GET /api/restaurant_post/:restaurantId
  it('should fetch all posts for a given restaurant ID and return 200', async () => {
    // Mock the response of Post.findAll to return a list of posts
    Post.findAll.mockResolvedValue([
      {
        id: 1,
        RestaurantId: 1,
        content: 'Post content for restaurant 1',
        User: { username: 'User1' },
        Restaurant: { restaurantName: 'Restaurant 1', profileImage: 'image.jpg', id: 1 }
      }
    ]);

    const response = await request(app).get('/api/restaurant_post/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure we got posts back
    expect(response.body[0].Restaurant.restaurantName).toBe('Restaurant 1');
  });

  // Test GET /api/restaurant_post/post/:postId
  it('should fetch a post by post ID and return 200', async () => {
    // Mock the response of Post.findOne to return a single post
    Post.findOne.mockResolvedValue({
      id: 1,
      RestaurantId: 1,
      content: 'Specific post content',
      User: { username: 'User1' },
      Restaurant: { restaurantName: 'Restaurant 1', profileImage: 'image.jpg', id: 1 }
    });

    const response = await request(app).get('/api/restaurant_post/post/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe('Specific post content');
    expect(response.body.User.username).toBe('User1');
  });

  // Test GET /api/restaurant_post
  it('should fetch all posts with a RestaurantId and return 200', async () => {
    // Mock the response of Post.findAll to return posts with RestaurantId
    Post.findAll.mockResolvedValue([
      {
        id: 1,
        RestaurantId: 1,
        content: 'Post content 1',
        User: { username: 'User1' },
        Restaurant: { restaurantName: 'Restaurant 1', profileImage: 'image.jpg', id: 1 }
      },
      {
        id: 2,
        RestaurantId: 2,
        content: 'Post content 2',
        User: { username: 'User2' },
        Restaurant: { restaurantName: 'Restaurant 2', profileImage: 'image2.jpg', id: 2 }
      }
    ]);

    const response = await request(app).get('/api/restaurant_post');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2); // We expect 2 posts
    expect(response.body[0].content).toBe('Post content 1');
    expect(response.body[1].content).toBe('Post content 2');
  });

  // Test GET /api/restaurant_post when no posts are found
  it('should return 404 if no posts are found for a restaurant ID', async () => {
    // Mock Post.findAll to return an empty array, simulating no posts found
    Post.findAll.mockResolvedValue([]);

    const response = await request(app).get('/api/restaurant_post/999');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('No posts found for this restaurant.');
  });

  // Test GET /api/restaurant_post when no posts are found
  it('should return 404 if no post found based on the ID', async () => {
    // Mock Post.findAll to return an empty array, simulating no posts found
    Post.findOne.mockResolvedValue(null);

    const response = await request(app).get('/api/restaurant_post/post/999');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Post not found');
  });
});