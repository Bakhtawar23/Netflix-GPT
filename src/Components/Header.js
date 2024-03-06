import { useDispatch, useSelector } from "react-redux";
import { SUPPORTED_LANGUAGES, logo } from "../constants";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);

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

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    }

    return(
        <div className="flex justify-between w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex-col md:flex-row">
            <img className="w-44 mx-auto md:mx-0" src={logo} alt="netflix-logo"/>
            {user && 
            (<div>
                {showGptSearch && <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
                    {SUPPORTED_LANGUAGES.map((lang) => {
                        return <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                    })}
                </select>}
                <button onClick={handleGptSearchClick} className="py-2 px-4 mx-4 bg-white text-black rounded-lg">
                    {showGptSearch ? "Homepage" : "GPT Search"}
                </button>
                <button onClick={handleSignOut} className="m-2 p-2 border font-bold text-white">Sign Out</button>
            </div>)
            }
        </div>
    )
};

export default Header;