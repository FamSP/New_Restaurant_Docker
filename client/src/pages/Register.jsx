import { useState } from "react";
import React from "react";

const Addrestaurant = () => {
  const [restaurant, setRestuarant] = useState({
    title: "",
    type: "",
    img: "",
  });
  const handle = (e) => {
    const { name, value } = e.target;
    setRestuarant({ ...restaurant, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/restaurants", {
        method: "POST",
        body: JSON.stringify(restaurant),
      });
      if (response.ok) {
        alert("Restaurant added Succesfully");
        setRestuarant({
          title: "",
          type: "",
          img: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto ">
      <h1 className="title justify-center text-3xl text-center m-5 p-5">
        {" "}
        Add New Restaurant
      </h1>
      <div className="mt-10">
        <div className="flex justify-center">
          <fieldset className="fieldset">
            <legend className="fieldset-legend jus">
              What is restaurant name?
            </legend>
            <input
              type="text"
              value={restaurant.title}
              name="title"
              onChange={handle}
              className="input input-bordered input-lg w-[700px]"
              placeholder="Type here"
            />
          </fieldset>
        </div>

        <div className="flex justify-center space-y-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend jus">What is your type?</legend>
            <input
              type="text"
              value={restaurant.type}
              name="type"
              onChange={handle}
              className="input input-bordered input-lg w-[700px]"
              placeholder="Type here"
            />
          </fieldset>
        </div>
        <div className="flex justify-center space-y-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend jus">Image URL</legend>
            <input
              type="text"
              name="img"
              value={restaurant.img}
              onChange={handle}
              className="input input-bordered input-lg w-[700px]"
              placeholder="Type here"
            />
          </fieldset>
        </div>
      </div>
      {restaurant.img && (
        <div className="flex justify-center">
          <img src={restaurant.img} alt="preview image"></img>
        </div>
      )}
      <div className="flex justify-end gap-5 px-80 mt-10">
        <button className="btn btn-accent" onClick={handleSubmit}>
          Add
        </button>
        <a className="btn btn-error">Cancel</a>
      </div>
    </div>
  );
};

export default Addrestaurant;
