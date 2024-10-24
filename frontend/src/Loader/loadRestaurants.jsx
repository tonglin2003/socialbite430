
// fetch for all restaurant in the db
export async function mainSectionRestaurantLoader() {
    // const res = await fetch("/api/restaurant");
    // return res.json();

    const res = [
        {UserId: 8, address: "something", 
        createdAt: "a moment", 
        heroImage:"https://cdn.vox-cdn.com/thumbor/PZifQlALpWmqOJHvui2OL5pxOzc=/0x0:5634x3756/1200x900/filters:focal(2367x1428:3267x2328)/cdn.vox-cdn.com/uploads/chorus_image/image/70083852/Laser_Wolf_6.7.jpg",
        id: 7,
        latitude: 40.6,
        longitude: -74.14,
        popularity: 102,
        rate:3.9,
        restaurantName: "Buffalo Wild Wings"
    },
    {UserId: 8, address: "something", 
        createdAt: "a moment", 
        heroImage:"https://cdn.vox-cdn.com/thumbor/PZifQlALpWmqOJHvui2OL5pxOzc=/0x0:5634x3756/1200x900/filters:focal(2367x1428:3267x2328)/cdn.vox-cdn.com/uploads/chorus_image/image/70083852/Laser_Wolf_6.7.jpg",
        id: 7,
        latitude: 40.6,
        longitude: -74.14,
        popularity: 102,
        rate:3.9,
        restaurantName: "Buffalo Wild Wings"
    },
    {UserId: 8, address: "something", 
        createdAt: "a moment", 
        heroImage:"https://cdn.vox-cdn.com/thumbor/PZifQlALpWmqOJHvui2OL5pxOzc=/0x0:5634x3756/1200x900/filters:focal(2367x1428:3267x2328)/cdn.vox-cdn.com/uploads/chorus_image/image/70083852/Laser_Wolf_6.7.jpg",
        id: 7,
        latitude: 40.6,
        longitude: -74.14,
        popularity: 102,
        rate:3.9,
        restaurantName: "Buffalo Wild Wings"
    }
    ];

    return res;
    
}
