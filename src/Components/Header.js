import { useSelector } from "react-redux";
import { logo } from "../constants";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const user = useSelector(store => store.user);

    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut(auth).then(() => {
           navigate("/");
        }).catch((error) => {
           navigate("/error");
        });
    }
    return(
        <div className="flex justify-between w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10">
            <img className="w-44" src={logo} alt="netflix-logo"/>
            {user && (<div className="">
                <button onClick={handleSignOut} className="m-2 p-2 border font-bold text-white">Sign Out</button>
            </div>)
            }
        </div>
    )
};

export default Header;