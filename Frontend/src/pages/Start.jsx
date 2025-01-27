import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="h-screen w-full flex justify-between flex-col pt-8 bg-[url(https://plus.unsplash.com/premium_photo-1736867129395-57631da15a13?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center">
        <img className="w-16 ml-8" src="uber-logo" alt="" />
        <div className="bg-white py-5 px-5 pb-7">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link
            to="/login"
            className="w-full bg-black text-white py-3 rounded-lg mt-5 flex justify-center items-center"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
