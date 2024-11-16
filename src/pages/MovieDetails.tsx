import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, CircularProgress, Card, CardMedia, CardContent } from "@mui/material";
import { API_KEY, BASE_URL } from "../config/apiConfig";

interface MovieDetailsType {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            apikey: API_KEY,
            i: id,
          },
        });
        setMovie(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!movie) return <Typography>No movie details found.</Typography>;

  return (
    <Box padding={2} display="flex" flexDirection="column" alignItems="center">
      <Card style={{ maxWidth: 600 }}>
        <CardMedia
          component="img"
          alt={movie.Title}
          height="400"
          image={movie.Poster}
        />
        <CardContent>
          <Typography variant="h5">{movie.Title}</Typography>
          <Typography><strong>Year:</strong> {movie.Year}</Typography>
          <Typography><strong>Genre:</strong> {movie.Genre}</Typography>
          <Typography><strong>Director:</strong> {movie.Director}</Typography>
          <Typography><strong>Actors:</strong> {movie.Actors}</Typography>
          <Typography><strong>Plot:</strong> {movie.Plot}</Typography>
          <Typography><strong>IMDb Rating:</strong> {movie.imdbRating}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieDetails;
