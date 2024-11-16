# Movie Explorer App

This is a React-based movie exploration application built with Material-UI and Redux. The app uses the OMDb API to fetch and display movies, allowing users to search, filter, and view details of movies.

## Features

- **Movie Listing**: Displays a list of movies in a card-based grid layout.
- **Search Functionality**: Search for movies by title using a search bar.
- **Filters**:
  - Filter by release year (1997 to the current year).
  - Filter by type (Movies, TV Series, or Episodes).
- **Pagination**: Navigate through the movie results 10 items per page.
- **Movie Details**: Click on a movie to view detailed information, including title, year, genre, director, actors, plot, poster, and IMDb rating.
- **Responsive UI**: Designed with Material-UI for a modern and responsive interface.

## Technologies Used

- **Frontend**:
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Material-UI](https://mui.com/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [Axios](https://axios-http.com/)
  - [React Router](https://reactrouter.com/)

- **API**:
  - [OMDb API](https://www.omdbapi.com/) (Open Movie Database API)

- **Styling**:
  - [SCSS](https://sass-lang.com/)

## Installation and Setup

Follow the steps below to set up and run the application locally:

### 1. Clone the Repository
```bash
git clone https://github.com/malik-turk/movie-explorer-app
```
### 2. Install Dependencies
```npm install```
```npm start```

### Project Structure
```
src/
├── config/
│   └── apiConfig.ts       # Shared API constants (API_KEY, BASE_URL)
├── components/
│   └── MovieList.tsx      # Movie listing component with search, filters, and pagination
├── pages/
│   └── MovieDetails.tsx   # Movie details page
├── redux/
│   ├── slices/
│   │   └── moviesSlice.ts # Redux slice for managing movie state
│   └── store.ts           # Redux store configuration
├── App.tsx                # App routing setup
└── index.tsx              # Entry point
```



