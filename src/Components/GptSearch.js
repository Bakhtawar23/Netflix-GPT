import { netfliximge } from "../constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
    return(
        <div>
            <img src={netfliximge} alt="Netflix-image1" className="absolute -z-10"/>
            <GptSearchBar/>
            <GptMovieSuggestions/>
        </div>
    )
}

export default GptSearch;