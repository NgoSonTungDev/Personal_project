const { Users, Orderhistory } = require("../models/model");

const OrderhistoryController = {
  addToOrderhistory: async (req, res) => {
    try {
      const newOrderhistory = new Orderhistory(req.body);
      const save = await newOrderhistory.save();
      if (req.body.AccountUSer) {
        const idUser = Users.findById(req.body.AccountUSer);
        await idUser.updateOne({ $push: { history: save._id } });
      }
      res.status(200).json(save);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  UpdateHistory: async (req, res) => {
    try {
      const IdMovie = await Orderhistory.findById(req.params.id);
      await IdMovie.updateOne({ $set: req.body });
      res.status(200).json("Update Successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  GetAnHistory: async (req, res) => {
    try {
      const History = await Orderhistory.findById(req.params.id)
      res.status(200).json(History);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllHistory: async (req, res) => {
    try {
      const allUSer = await Orderhistory.find();
      res.status(200).json(allUSer);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  DeleteFromOrderhistory: async (req, res) => {
    try {
      await Users.updateMany(
        { history: req.params.id },
        { $pull: { history: req.params.id } }
      );
      await Orderhistory.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = OrderhistoryController;
