// fetch for all restaurant in the db
export async function mainSectionRestaurantLoader() {
    const res = await fetch("/api/restaurant");
    return res.json();
}
