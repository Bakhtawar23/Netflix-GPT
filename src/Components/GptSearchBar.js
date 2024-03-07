import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector(store => store.config.lang);
    const searchText = useRef(null);

    const searchMovieTMDB = async (movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS);
        const json = await data.json();
        return json.results; 
    }

    const handleGptClick = async() => {
        const gptQuery = "Act as Movie recommendation system and suggest some movies for the query: " + searchText.current.value + ". Only give me names of 5 movies, comma separated like the example given ahead. Example Result: Sholay, Don, Golmaal, Dhamaal, Phir Hera Pheri";
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery}],
            model: 'gpt-3.5-turbo',
        });
        if(!gptResults.choices){
            return <p>Error loading GPT results</p>
        }

        const gptMovies = gptResults?.choices?.[0]?.message?.content.split(", ");

        const promiseArray = gptMovies.map((movie)=>{
            return searchMovieTMDB(movie); 
        })
        const tmdbResults = await Promise.all(promiseArray);

        dispatch(addGptMovieResult({movieNames: gptMovies,movieResults:tmdbResults}));
    }
    return(
        <div className="pt-[8%] flex justify-center">
        <form className="w-1/2 bg-black grid grid-cols-12 rounded-lg" onSubmit={(e)=>e.preventDefault()}>
            <input ref={searchText} type="text" className="p-4 m-4 col-span-9" placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button onClick={handleGptClick} className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">{lang[langKey].search}</button> 
        </form>
        </div>
    )
}

export default GptSearchBar;