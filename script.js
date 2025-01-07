// Selecting necessary DOM elements
const searchForm = document.querySelector('form'); // Form element for movie search
const movieContainer = document.querySelector('.movie-container'); // Container to display movie details
const inputBox = document.querySelector('.inputBox'); // Input box for movie name

// Function to fetch movie details using OMDB API
const getMovieInfo = async (movie) => {
    const myApiKey = "966892d7"; // Your OMDB API key
    const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`; // Construct API URL with movie name
    
    try {
        const response = await fetch(url); // Fetch data from the API
        const data = await response.json(); // Parse the JSON response
        
        // Check if the movie exists in the database
        if (data.Response === "True") {
            showMovieData(data); // Call function to display movie details
        } else {
            // If movie not found, display an error message
            movieContainer.innerHTML = `<p class="error-message">Movie not found! Please try again.</p>`;
        }
    } catch (error) {
        // Handle any network or API errors
        console.error("Error fetching data:", error); // Log error to console
        movieContainer.innerHTML = `<p class="error-message">Something went wrong. Please try again later.</p>`; // Show user-friendly error
    }
};

// Function to display movie data on the screen
const showMovieData = (data) => {
    // Destructure necessary data from the API response
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    // Clear the container to remove previous results
    movieContainer.innerHTML = "";

    // Create a new div element for the movie details
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-element'); // Add a CSS class for styling
    
    // Add movie details to the newly created div
    movieElement.innerHTML = `
        <h2>${Title}</h2> <!-- Movie Title -->
        <p><strong>Rating: ⭐</strong> ${imdbRating}</p> <!-- IMDb Rating -->
        <p><strong>Genre:</strong> ${Genre}</p> <!-- Genre -->
        <p><strong>Released:</strong> ${Released}</p> <!-- Release Date -->
        <p><strong>Runtime:</strong> ${Runtime}</p> <!-- Duration -->
        <p><strong>Actors:</strong> ${Actors}</p> <!-- Lead Actors -->
        <p><strong>Plot:</strong> ${Plot}</p> <!-- Plot Summary -->
        <img src="${Poster}" alt="${Title}" class="movie-poster" /> <!-- Movie Poster -->
    `;

    // Append the new div to the container
    movieContainer.appendChild(movieElement);
};

// Add event listener for form submission
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    const movieName = inputBox.value.trim(); // Get movie name and trim extra spaces

    // Check if the input is not empty
    if (movieName !== '') {
        getMovieInfo(movieName); // Fetch movie info
    }
});
