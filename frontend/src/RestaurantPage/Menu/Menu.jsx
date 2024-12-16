import Cook from "../../assets/icons/cook";

function Menu() {
  // Dummy Data for Menu
  const menuData = [
    {
      title: "Value Bundles",
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      isExclusive: true,
      cooking_time: "20-25 min",
    },
    {
      title: "Wings & Tenders",
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
      isExclusive: false,
      cooking_time: "10-15 min",
    },
    {
      title: "Appetizers",
      image:
        "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800",
      isExclusive: false,
      cooking_time: "30-35 min",
    },
    {
      title: "Sides & Extras",
      image:
        "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800",
      isExclusive: false,
      cooking_time: "20-25 min",
    },
    {
      title: "Burgers",
      image:
        "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800",
      isExclusive: false,
      cooking_time: "15-20 min",
    },
    {
      title: "Salads",
      image:
        "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800",
      isExclusive: false,
      cooking_time: "10-15 min",
    },
    {
      title: "Pizza",
      image:
        "https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=800",
      isExclusive: true,
      cooking_time: "25-30 min",
    },
    {
      title: "Desserts",
      image:
        "https://images.pexels.com/photos/3026806/pexels-photo-3026806.jpeg?auto=compress&cs=tinysrgb&w=800",
      isExclusive: false,
      cooking_time: "10-15 min",
    },
  ];

  return (
    <div className="menu-box w-full mb-4 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Our Menu</h1>
      <div className="menu-items grid grid-cols-1 md:grid-cols-3 gap-4">
        {menuData.map((item, index) => (
          <div
            key={index}
            className="menu-item bg-white flex flex-col border border-orange-300 rounded-lg shadow-sm overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              {item.isExclusive && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full uppercase">
                  Online Exclusive
                </span>
              )}
              <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <Cook /> {item?.cooking_time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
