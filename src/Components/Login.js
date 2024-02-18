import Header from "./Header";
import { netfliximge } from "../constants";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSignInForm,setisSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
   
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setisSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
       const vData = checkValidData(email.current.value, password.current.value);
       setErrorMessage(vData);
       if(vData) return;

       if(!isSignInForm){
          //signup logic
          createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(auth.user, {
                    displayName: name.current.value
                  }).then(() => {
                    const {uid, email, displayName} = auth.currentUser;
                    dispatch(addUser({uid: uid, uid: email, uid: displayName}));
                    navigate("/browse");
                  }).catch((error) => {
                    setErrorMessage(errorMessage);
                  });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+" "+errorMessage);
            });
        }
        else{
          //signin logic
          signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate("/browse");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+" "+errorMessage);
            });
        }
    }

    return(
        <div>
            <Header/>
            <div className="absolute">
              <img src={netfliximge} alt="netflix-img"/>
            </div>   
            <form onSubmit={(e) => e.preventDefault()} className="w-1/4 absolute p-12 bg-black my-44 mx-auto left-0 right-0 bg-opacity-80 text-white">
                <h1 className="font-bold text-3xl py-4 m-3">{isSignInForm ? "Sign In": "Sign Up"}</h1>
                {!isSignInForm && (<input ref={name} type="text" placeholder="Enter Full Name" className="p-2 m-3 w-64 bg-stone-700 text-gray-500 rounded-lg"/>)}
                <input ref={email} type="text" placeholder="Email or phone number" className="p-2 m-3 w-64 bg-stone-700 text-gray-500 rounded-lg"/>
                <input ref={password} type="password" placeholder="Password" className="p-2 m-3 w-64 bg-stone-700 text-gray-500 rounded-lg"/>
                <p className="text-red-500 m-3">{errorMessage}</p>
                <button className="p-4 m-3 bg-red-600 w-64 rounded-lg text-white" onClick={handleButtonClick}>{isSignInForm ? "Sign In": "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix?  Sign Up Now" : "Already a user? Sign In Now"}</p>
            </form>       
        </div>
    )
};

export default Login;