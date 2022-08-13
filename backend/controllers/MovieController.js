const { Movie } = require("../models/model");

const MovieController = {
  addMovie: async (req, res) => {
    try {
        const newMovie = new Movie(req.body)
        const saveMovie = await newMovie.save()
      res.status(200).json(saveMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll : async (req,res) =>{
    try {
      const allMovie = await Movie.find()
      res.status(200).json(allMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  GetAnMovie: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id).populate("commment")
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  UpdateMovie: async (req, res) => {
    try {
      const IdMovie = await Movie.findById(req.params.id);
      await IdMovie.updateOne({ $set: req.body });
      res.status(200).json("Update Successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteMovie: async (req, res) => {
    try {
      await Movie.findByIdAndDelete(req.params.id)
      res.status(200).json("Delete Succesfully !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = MovieController