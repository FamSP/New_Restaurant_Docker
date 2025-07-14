import Restaurant from "../models/restaurants.modle.js";
const restaurantController = {};
//Create and save a new restuarants
restaurantController.create = async (req, res) => {
  const { title, type, imageUrl } = req.body;
  //validate data
  if (!title || !type || !imageUrl) {
    res.status(400).send({ message: "title , Type or imgUrl Can't be empty" });
    return;
  }
  await Restaurant.findOne({ where: { title } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({ message: "Restaurant already exists" });
      return;
    }
    const newRestaurant = {
      title,
      type,
      imageUrl,
    };
    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message || "Something error" });
      });
  });
};

export default restaurantController;
