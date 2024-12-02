
// fetch for all restaurant in the db
export async function mainSectionRestaurantLoader() {
    const res = await fetch("/api/restaurant");
    return res.json();
}

export async function nearbyRestaurantLoader() {
    try {
        const res = await fetch("/api/user/nearby_restaurant/5");
        if (!res.ok) {
            throw new Error(
                `HTTP Error: ${res.status} ${res.statusText} - ${await res.text()}`
            );
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching nearby restaurants:", error);
        throw error;
    }
}


//fetch for search restaurant in the db, find similar term of restaurant in the db
export async function searchRestaurantLoader(keywordSearchTerm){
    const res = await fetch(`/api/restaurant/search/${keywordSearchTerm}`);
    return res.json();
}

export async function restaurantByIdLoader(params){
    const res = await fetch(`/api/restaurant/${params.params.restaurantId}`);
    return res.json();
}
