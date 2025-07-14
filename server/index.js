import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
import reataurantRouter from "./routers/restaurant.router";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Restaurant Restful API hbrhb");
});
app.use("/api/va/restaurant", restaurantRouter);
app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
