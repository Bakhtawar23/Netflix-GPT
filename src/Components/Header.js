import { useDispatch, useSelector } from "react-redux";
import { logo } from "../constants";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    const handleSignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
           navigate("/error");
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid, email, displayName} = user;
              dispatch(addUser({uid: uid, email: email, displayName: displayName}));
              navigate("/browse");
            } else {
              // User is signed out
              dispatch(removeUser());
              navigate("/");
            }
          });   
          // unsubscribe when component unmounts
          return () => unsubscribe();
    }, []);

    return(
        <div className="flex justify-between w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10">
            <img className="w-44" src={logo} alt="netflix-logo"/>
            {user && (<div>
                <button onClick={handleSignOut} className="m-2 p-2 border font-bold text-white">Sign Out</button>
            </div>)
            }
        </div>
    )
};

export default Header;