const router = require("express").Router();
const MoviesModel = require('../models/Movie.model')


router.get("/movies/create", (req, res, next)=>{
    MoviesModel.find()
    .populate('cast', 'name')
   
    res.render('movies/new-movie.hbs' )
})

router.post("/movies/create", (req, res, next)=>{
    const {name, occupation, catchPhrase, cast} = req.body
   
    CelebModel.create({name, occupation, catchPhrase, cast})
        .then(()=>{
            res.redirect('/celebrities')
        })
        .catch(()=>{
            res.render('celebrities/new-celebrity')
        })
});

router.get("/movies", (req, res, next)=>{    

    MoviesModel.find()
        .populate('cast')
        .then((movies) => {
            res.render('movies/movies.hbs', {movies})
        })
        .catch((error) => {
            next(error)
        });
    });

router.get("/movies/:moviesId", (req, res, next) => {
    const {moviesId} = req.params
    MoviesModel.findById(moviesId)
    .populate('cast')
    
        .then((movies) => {
            res.render('movie-details.hbs', {movies})
        })
        .catch((error) => {
            next(error)
            console.log('error')
        })
  });

  router.get("/movies/create", (req, res, next)=>{
    res.render('/views/movies/new-movie.hbs')
})

router.post("/movies/create", (req, res, next)=>{
    const {title, genre, plot, cast} = req.body
    
  MovieModel.create({title, genre, plo, cast})
        .then(()=>{
            res.redirect('/movies')
        })
        .catch(()=>{
            res.render('error')
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
  


module.exports = router;
