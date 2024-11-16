import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../config/apiConfig";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (
    {
      query,
      page,
      year,
      type,
    }: { query: string; page: number; year?: string; type?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          s: query,
          type,
          y: year,
          page,
        },
      });
      return {
        movies: response.data.Search || [],
        totalResults: response.data.totalResults || 0,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    totalResults: 0,
    loading: false,
    error: null as string | null,
    currentPage: 1,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload.movies || [];
      state.totalResults = action.payload.totalResults || 0;
    });
  },
});

export const { setCurrentPage } = moviesSlice.actions;
export default moviesSlice.reducer;
