/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Signup = () => {
  const handleClick = () => {
    console.log("hello");
  };
  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <form>
              <input
                type="text"
                className="block border border-gray-300 w-full p-3 rounded mb-4"
                name="username"
                placeholder="Username"
                required
              />

              <input
                type="email"
                className="block border border-gray-300 w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                required
              />

              <input
                type="password"
                className="block border border-gray-300 w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                required
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-center py-3 rounded text-white hover:bg-green-700 focus:outline-none my-1"
                onClick={handleClick}
              >
                Create Account
              </button>

              <div className="text-center text-sm text-gray-500 mt-4">
                By signing up, you agree to the
                <a
                  className="no-underline border-b border-gray-500 text-gray-500"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and
                <a
                  className="no-underline border-b border-gray-500 text-gray-500"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
            </form>
          </div>

          <div className="text-gray-500 mt-6">
            Already have an account?
            <a
              className="no-underline border-b border-blue-500 text-blue-500"
              href="../login/"
            >
              Log in
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
