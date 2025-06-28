export const fetchMovies = async ({ query }: any) => {
    const allMovies = [
        { id: 1, title: "Immigration", year: 2010, genre: "Sci-Fi" },
        { id: 2, title: "Housing", year: 2008, genre: "Action" },
        { id: 3, title: "Politics", year: 2014, genre: "Adventure" },
        { id: 4, title: "Environment", year: 2017, genre: "War" },
        { id: 5, title: "Economics", year: 2017, genre: "Adventure" },
        { id: 6, title: "Climate Change", year: 2017, genre: "Adventure" },
        { id: 7, title: "Import-Export", year: 2017, genre: "Adventure" }
    ];

    // Normalize query for case-insensitive search
    const normalizedQuery = query.trim().toLowerCase();

    // If query is empty, return all movies
    if (!normalizedQuery) {
        return allMovies;
    }

    // Otherwise, filter movies by title
    const filteredMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(normalizedQuery)
    );

    return filteredMovies;
}

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        // For development purposes, return mock data based on movieId
        const mockMovieDetails: MovieDetails = {
            id: parseInt(movieId),
            title: `Movie ${movieId}`,
            year: 2023,
            genre: "Drama",
            description: `This is a detailed description for movie ${movieId}. It contains comprehensive information about the plot, characters, and production details.`,
            rating: 8.5,
            duration: 120,
            director: "John Director",
            cast: ["Actor One", "Actor Two", "Actor Three"],
            poster: `https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=400`,
            trailer: "https://example.com/trailer"
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return mockMovieDetails;
    } catch (error) {
        console.log(error);
        throw error;
    }
}