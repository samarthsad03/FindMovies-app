const searchForm = document.querySelector('form');
const moviecontainer = document.querySelector('.movie-container');
const inputbox = document.querySelector('.inputBox');

//function to fetch movie details using omdb API
const getMovieInfo =  async (movie) => {
    const myapiKey = "966892d7";
    const url = `http://www.omdbapi.com/?apikey=${myapiKey}&t=${movie}`;

    const response =  await fetch(url);
    const data = await response.json();
     
    console.log(data);

    
}

//Adding event listeners to search form
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form auto-submission
    const movieName = inputbox.value.trim() //trim is used to delete the extra spaces between the name of the movies 

    if(movieName !== ''){  //checking  if the name of the movie is not empty 
        getMovieInfo(movieName);
    }
});
