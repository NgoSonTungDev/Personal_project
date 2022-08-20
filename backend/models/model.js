const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartUSers" }],
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: "HistoryUsers" }],
  },
  { timestamps: true }
);

const CartAccountUSer = new mongoose.Schema({
  movieID: {
    type: String,
    required: true,
  },
  nameMovie: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  showtime: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  AccountUSer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AccountUSers",
  },
});

const HistoryAccountUSer = new mongoose.Schema(
  {
    codeOrders: {
      type: Number,
      required: true,
    },
    movieID: {
      type: String,
      required: true,
    },
    nameMovie: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    showtime: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    nameUser: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    seats:{
      type: Array,
      required: true,
    },
    AccountUSer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountUSers",
    },
  },
  { timestamps: true }
);

const TicketMovie = new mongoose.Schema({
  namemovie: {
    type: String,
    required: true,
    unique: true,
  },
  background: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  releasedate: {
    type: String,
    required: true,
  },
  showtime: {
    type: Array,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  introduce: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  Room:{
    type: Number,
    required: true,
  },
  seatsBooked: {
    type: Array,
    required: true,
  },
  commment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
});

const commentMovie = new mongoose.Schema({
  nameUser: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  idMovie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movies",
  },
});

const consolidation = new mongoose.Schema(
  {
    nameAccount: {
      type: String,
      required: true,
    },
    nameMovie: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    dateTime:{
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  }
);

//user
let Users = mongoose.model("AccountUSers", userShema);
//movie
let Movie = mongoose.model("Movies", TicketMovie);
//cmt
let Comment = mongoose.model("Comments", commentMovie);
//cart
let Cart = mongoose.model("CartUSers", CartAccountUSer);
//histori order
let Orderhistory = mongoose.model("HistoryUsers", HistoryAccountUSer);
//sum order
let OrderConsolidation = mongoose.model("TotalOdered", consolidation);

module.exports = {
  Users,
  Movie,
  Comment,
  Cart,
  OrderConsolidation,
  Orderhistory,
};
