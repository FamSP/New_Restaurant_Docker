import { useState, useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router";
import RestaurantService from "../services/restaurant.service";
import Swal from "sweetalert2";

const Add = () => {
  const [restaurant, setRestaurant] = useState({
    title: "",
    type: "",
    imageUrl: "",
  });
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.authorities?.includes("ROLES_ADMIN")) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantService.insertRestaurant(restaurant);
      if (response.status === 200) {
        Swal.fire({
          title: "Add Restaurant",
          text: "Restaurant added successfully!",
          icon: "success",
        });
        setRestaurant({ title: "", type: "", imageUrl: "" });
      }
    } catch (error) {
      Swal.fire({
        title: "Add Restaurant",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="container mx-auto">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Add Item
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span className="text-base label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter title"
                className="w-full input input-bordered"
                name="title"
                value={restaurant.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Type</span>
              </label>
              <input
                type="text"
                placeholder="Enter type"
                className="w-full input input-bordered"
                name="type"
                value={restaurant.type}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Image URL</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                onChange={handleChange}
                placeholder="Restaurant imageUrl"
                name="imageUrl"
                value={restaurant.imageUrl}
              />
              {restaurant.imageUrl && (
                <div className="flex items-center gap-2 mt-2">
                  <img
                    className="h-32"
                    src={restaurant.imageUrl}
                    alt="preview"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-center items-center my-6 space-x-4">
              <button
                type="submit"
                className="btn bg-green-500 text-white px-6"
              >
                Add
              </button>
              <a
                href={"/"}
                type="button"
                className="btn bg-red-500 text-white px-6"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
