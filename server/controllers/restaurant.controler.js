import Restaurant from "../models/restaurants.modle.js";

//Create and save a new restuarants
exports.create = async (req, res) => {
  const { id, name, type, imgUrl } = req.body;
  //validate data
  if (!name || !type || !imgUrl) {
    res.status(400).send({ message: "Name , Type or imgUrl Can't be empty" });
    return;
  }
};

await Restaurant.findOne({ where: { name: name } }).then((restaurant) => {
  if (restaurant) {
    res.status(400).send({ message: "Restaurant already exists" });
    return;
  }
  const newRestaurant = {
    title: title,
    type: type,
    imageUrl: imageUrl,
  };
  Restaurant,
    create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message || "Something error" });
      });
});
export default Restaurant;
