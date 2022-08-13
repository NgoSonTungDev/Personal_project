const { Comment, Movie } = require("../models/model");

const commentController = {
  addCmt: async (req, res) => {
    try {
      const newcmt = new Comment(req.body);
      const save = await newcmt.save();
      if (req.body.idMovie) {
        const idMove = Movie.findById(req.body.idMovie);
        await idMove.updateOne({ $push: { commment: save._id } });
      }
      res.status(200).json(save);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  GetAllCmt: async (req, res) => {
    try {
      const allMovie = await Comment.find();
      res.status(200).json(allMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  Deletecmt: async (req, res) => {
    try {
        await Movie.updateMany(
          {commment: req.params.id },
          {$pull:{commment: req.params.id}}
       );
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete successfully!")
      } catch (error) {
        res.status(500).json(error);
      }
  },
};

module.exports = commentController;
