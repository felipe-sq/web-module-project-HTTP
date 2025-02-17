import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useParams } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import AddMovieForm from "./components/AddMovieForm";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { id } = useParams();

  useEffect(()=>{
    axios.get('http://localhost:5001/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id)=> {
    let newMovieArray = movies.filter(item=>(item.id !== id))
    setMovies(newMovieArray)
  };

  const addToFavorites = (movie) => {
    if (favoriteMovies.find(favMovie => favMovie.id === movie.id)) {
    return console.log('This movie already exists in your favs!');
    } else {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies}/>
            </Route>

            <Route path="/movies/add">
              <AddMovieForm setMovies={setMovies}/>
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie} addToFavorites={addToFavorites}/>
            </Route>

            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

