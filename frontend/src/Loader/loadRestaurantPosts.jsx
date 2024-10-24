// fetch for all restaurant's posts
export async function allEventsLoader(){
    const res = await fetch("/api/restaurant_post");
    return res.json();
}
