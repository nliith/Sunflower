export const fetchMovies = async ({ query }: any) => {
    const allMovies = [
        { id: 1, title: "Immigration", year: 2010, genre: "Sci-Fi" },
        { id: 2, title: "Housing", year: 2008, genre: "Action" },
        { id: 3, title: "Politics", year: 2014, genre: "Adventure" },
        { id: 4, title: "Environment", year: 2017, genre: "War" },
        { id: 5, title: "Economics", year: 2017, genre: "WAdventurear" },
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

export const fetchMovieDetails = async (moveId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(``, { method: 'GET', headers: '' });

        if (!response.ok) throw new Error('Failed to fetch movie details');

        const data = await response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}