import Header from "./Header";
import { netfliximge } from "../constants";
import { useState } from "react";

const Login = () => {
    const [isSignInForm,setisSignInForm] = useState(true);
    const toggleSignInForm = () => {
        setisSignInForm(!isSignInForm);
    }
    return(
        <div>
            <Header/>
            <div className="absolute">
              <img src={netfliximge} alt="netflix-img"/>
            </div>   
            <form className="w-1/4 absolute p-12 bg-black my-44 mx-auto left-0 right-0 bg-opacity-80 text-white">
                <h1 className="font-bold text-3xl py-4 m-3">{isSignInForm ? "Sign In": "Sign Up"}</h1>
                {!isSignInForm && (<input type="text" placeholder="Enter Full Name" className="p-2 m-3 w-64 bg-stone-700 text-gray-500 rounded-lg"/>)}
                <input type="text" placeholder="Email or phone number" className="p-2 m-3 w-64 bg-stone-700 text-gray-500 rounded-lg"/>
                <input type="password" placeholder="Password" className="p-2 m-3 w-64 bg-stone-700 text-gray-500 rounded-lg"/>
                <button className="p-4 m-3 bg-red-600 w-64 rounded-lg text-white">{isSignInForm ? "Sign In": "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix?  Sign Up Now" : "Already a user? Sign In Now"}</p>
            </form>       
        </div>
    )
};

export default Login;