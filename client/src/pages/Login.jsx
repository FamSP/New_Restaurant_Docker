import React, { useState } from "react";

function Login() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      if (response.ok) {
        alert("Login successful!");
        setLogin({
          username: "",
          password: "",
        });
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleCancel = () => {
    setLogin({
      username: "",
      password: "",
    });
  };

  return (
    <div className="container mx-auto">
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Login
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                value={login.username}
                onChange={handleChange}
                className="w-full input input-bordered"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={login.password}
                onChange={handleChange}
                className="w-full input input-bordered"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-center items-center my-6 space-x-4">
              <button
                type="submit"
                className="btn bg-green-500 text-white px-6"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn bg-red-500 text-white px-6"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
