const router = require("express").Router();
const MoviesModel = require('../models/Movie.model')


const CelebModel = require("../models/Celebrity.model");

router.get("/movies", (req, res, next)=>{    

    MoviesModel.find()
        .populate('cast')
        .then((movies) => {
            res.render('movies/movies.hbs', {movies})
        })
        .catch((error) => {
            next(error)
        })
})

router.get('/movies/:movieId', (req, res, next) => {
    const {moviesId} = req.params

    MoviesModel.findById(moviesId)
        .populate('cast')
        .then((movies) => {
            res.render('movies-details.hbs', {movies})
        })
        .catch((error) => {
            next(error)
        })
  });

  
  router.post('/movies/:movieId/delete', (req, res, next) => {

    const {movieId} = req.params 
    MoviesModel.findByIdAndRemove(movieId)
    .then(() => {
        res.redirect('/movies')
    })
    .catch(() => {
        next('Movies not deleted')
    })
  });
  
  
  router.get("/movies/create", (req, res, next)=>{
    res.render('/views/movies/new-movie.hbs')
})

router.post("/movies/create", (req, res, next)=>{
    const {title, genre, plot} = req.body
    
    
    MovieModel.create({title, genre, plot})
        .then(()=>{
            res.redirect('/movies')
        })
        .catch(()=>{
            res.render('error')
        })
})

router.get('/movies/:movieId', (req, res, next) => {
    
    const {movieId} = req.params
  
    MoviesModel.findById(movieId)
    populate('name')
    console.log(movieId)
        .then((movie) => {
            res.render('movies/movie-details.hbs', {movie})
        })
        
        .catch(() => {
            next('Not seeing the movie details')
        })
  
  });




module.exports = router;
