import { netfliximge } from "../constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
    return(
        <div>
            <div className="fixed -z-10">
              <img src={netfliximge} alt="Netflix-image1"/>
            </div>
            <GptSearchBar/>
            <GptMovieSuggestions/>
        </div>
    )
}

export default GptSearch;