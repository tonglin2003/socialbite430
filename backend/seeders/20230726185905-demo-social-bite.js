'use strict';
const bcrypt = require("bcryptjs");
const user = require("../models/user");
const post = require("../models/post");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

// insert "user" seeders rows into db
    await queryInterface.bulkInsert("user", [{
      username: "Jane Doe",
      email: "janeDoe@gmail.com",
      password: await bcrypt.hash("password",10),
      has_restaurant: true,
      profile_image: "https://www.preventivevet.com/hubfs/german%20shepherd%20mix%20dog%20popping%20in%20his%20back%20yard-canva.jpg"
    },
  {
      username: "Jane Doe Third Account",
      email: "janeDoe3@gmail.com",
      password: await bcrypt.hash("password",10),
      has_restaurant: false,
      profile_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJpoz2Bn30kr3qmpfgA0UwJGmem5k51TDMpg&usqp=CAU"

  },
  {
    username: "Jane Doe Second Account",
    email: "janeDoe2@gmail.com",
    password: await bcrypt.hash("password",10),
    has_restaurant: false,
    profile_image: "https://hips.hearstapps.com/hmg-prod/images/delish-210419-carne-asada-torta-01-portrait-jg-1620136948.jpg?crop=0.942xw:0.707xh;0.0369xw,0.212xh&resize=1200:*"
},
  ]);

  //insert "tag" seeders rows into db
  await queryInterface.bulkInsert("tag", [
    {
    tag: "japanese food"
    },
    {
      tag: "game"
    },
    {
      tag: "movies"
    }
]);

//fetch for user's first id
const users = await queryInterface.sequelize.query(`SELECT id FROM "user"`);
const userId = users[0][0].id;
// fetch for first tag
const tags = await queryInterface.sequelize.query(`SELECT id FROM "tag"`);
const tagId = tags[0][0].id;

// insert data for "user_tag" table, where we can know tags each user likes
  await queryInterface.bulkInsert("user_tag", [
    {
     UserId:  userId,
     TagId: tagId
    }
  ]);

// insert data for "restaurant" table
  await queryInterface.bulkInsert("restaurant", [
    {
      UserId: userId,
      restaurant_name: "Hawaii Poke Bowl",
      rate: 4.5, // the rating will be decided based on another table named "user_rate"
      popularity: 102, // the popularity will be based on another table named "user_favorite"
      address: "1430 Richmond Ave, Staten Island, NY 10314",
      longitude: -74.15901282328339,
      latitude: 40.61389640713802,
      profile_image: "https://takestwoeggs.com/wp-content/uploads/2022/07/Hawaiian-Poke-Bowl-Takestwoeggs-Final-Photography-sq.jpg",
      hero_image: "https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/E2A4S6FHDBC33NN4TFJGIMZ7NE.jpeg"
    },
    {
      UserId: userId,
      restaurant_name: "Buffalo Wild Wings",
      rate: 3.9, // the rating will be decided based on another table named "user_rate"
      popularity: 102, // the popularity will be based on another table named "user_favorite"
      address: "1447 Richmond Ave, Staten Island, NY 10314",
      longitude: -74.15826389821179,
      latitude: 40.61250571654796,
      profile_image: "https://gimmedelicious.com/wp-content/uploads/2021/04/Images-8.jpg",
      hero_image: "https://popmenucloud.com/cdn-cgi/image/width=1920,height=1920,format=auto,fit=scale-down/qrvmatis/2b160bd4-81e0-4e76-a9cb-2e4fc44be6b9.JPG"
    },
  ]);

  // fetch for restaurant id to use as FK for other table
  const restaurants = await queryInterface.sequelize.query(`SELECT id FROM "restaurant"`);
  const restaurantId = restaurants[0][0].id;

  // insert data row for "post" table, note: RestaurantId(fk) is optional to indicate whether is is a restaurant post or a normal user post
  await queryInterface.bulkInsert("post", [
    {
      UserId: userId,
      RestaurantId: restaurantId,
      post_title: "25% OFF on All Menu Items!!",
      post_content: "The promotion will be availiable from 07/12/23 to 07/25/23!!",
      post_img: "https://i2.wp.com/greenpointers.com/app/uploads/2022/07/Screen-Shot-2022-07-25-at-10.10.31-PM-e1658846111596.png?fit=1200%2C1067&ssl=1"
    },
    {
      UserId: userId,
      RestaurantId: null,
      post_title: "Experience of Mine in Hawaii Poke Bowl",
      post_content: "Meh, not bad, but took a long time since there were lots of people. But I like it overall",
    }
  ]);

  // fetch for post id to be used in the "post_tag"
  const posts = await queryInterface.sequelize.query(`SELECT id FROM "post"`);
  const postId = posts[0][0].id;

  await queryInterface.bulkInsert("post_tag", [
    {
      TagId: tagId,
      PostId: postId,
    }
  ]);

  await queryInterface.bulkInsert("user_favorite", [
    {
      UserId: userId,
      RestaurantId: restaurantId,
    }
  ]);

  await queryInterface.bulkInsert("user_rate", [
    {
      UserId: userId,
      RestaurantId: restaurantId,
      rate: 5,
      review: "Great service! Really like it!"
    }
  ]);

  await queryInterface.bulkInsert("comment", [
    {
      UserId: userId,
      PostId: postId,
      content: "This restaurant is amazing! I love it! I would come next time"
    },
    {
      UserId: userId,
      PostId: postId,
      content: "This restaurant is amazing! I love it! I would come next time"
    }
  ])

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user", null, {});
    await queryInterface.bulkDelete("tag", null, {});
    await queryInterface.bulkDelete("user_tag", null, {});
  }
};
