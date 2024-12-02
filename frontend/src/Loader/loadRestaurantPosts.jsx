// fetch for all restaurant's posts
export async function allEventsLoader(){
    const res = await fetch("/api/restaurant_post");
    return res.json();
}

// fetch for nearby restaurant events/posts
export async function nearbyEventLoader(){
    const res = await fetch("/api/restaurant_post/user/nearby_post/5");
    return res.json();
}

// fetch for events that user is insterested in
export async function interestedEventLoader(){
    const res = await fetch("/api/restaurant_post/user/interested_post");
    return res.json();
}