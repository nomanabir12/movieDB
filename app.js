const path = require("path");
const express = require("express");
const app = express();
const port = 5000;

const fetch = require("node-fetch");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// // https://api.themoviedb.org/3/movie/popular?api_key=e79ac0011bfb24448cb1deac7a374f78
// // https://api.themoviedb.org/3/movie/550?api_key=e79ac0011bfb24448cb1deac7a374f78/
const apiKey = "e79ac0011bfb24448cb1deac7a374f78";
const imgURL = "https://image.tmdb.org/t/p/original";
const endPoint = "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey;
const singleMovie = "https://api.themoviedb.org/3/movie";

app.get("/details/:id", function (req, res, id) {
  console.log("ID", req.params.id);
  fetch(singleMovie + "/" + req.params.id + "?api_key=" + apiKey)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.render("details", { movieData: data, imgURL: imgURL });
    });
});

app.get("/", function (req, res) {
  fetch(endPoint)
    .then((response) => response.json())
    .then((data) => {
      res.render("index", { movieList: data, imgURL: imgURL });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
