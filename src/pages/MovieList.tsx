import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setCurrentPage } from "../redux/slices/moviesSlice";
import { RootState, AppDispatch } from "../redux/store";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Pagination,
} from "@mui/material";

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error, currentPage, totalResults } = useSelector(
    (state: RootState) => state.movies
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>();

  const totalPages = Math.ceil(totalResults / 10);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1997 + 1 }, (_, i) => (1997 + i).toString());

  const debouncedFetchMovies = debounce((query, year, type) => {
    dispatch(fetchMovies({ query, page: 1, year, type }));
  }, 500);

  useEffect(() => {
    const query = searchTerm.trim() === "" ? "Pokemon" : searchTerm;
    debouncedFetchMovies(query, year, type);

    return () => {
      debouncedFetchMovies.cancel();
    };
  }, [searchTerm, year, type]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page));
    const query = searchTerm.trim() === "" ? "Pokemon" : searchTerm;
    dispatch(fetchMovies({ query, page, year, type }));
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        Movie List
      </Typography>

      <Box display="flex" gap={2} marginBottom={2}>
        <Select
          value={type || ""}
          onChange={(e) => setType(e.target.value || undefined)}
          displayEmpty
        >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="movie">Movies</MenuItem>
          <MenuItem value="series">TV Series</MenuItem>
          <MenuItem value="episode">Episodes</MenuItem>
        </Select>

        <Select
          value={year || ""}
          onChange={(e) => setYear(e.target.value || undefined)}
          displayEmpty
        >
          <MenuItem value="">All Years</MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <TextField
        fullWidth
        label="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
      />

      <Grid container spacing={2} marginTop={2}>
        {movies.map((movie: any) => (
          <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
            <Card>
              <CardContent>
                <Typography variant="h6">{movie.Title}</Typography>
                <Typography variant="body2">{movie.Year}</Typography>
                <Typography variant="body2">IMDb ID: {movie.imdbID}</Typography>
                <Button
                  component={Link}
                  to={`/movie/${movie.imdbID}`}
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 8 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box marginTop={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default MovieList;
