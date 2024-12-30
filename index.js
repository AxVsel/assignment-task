const express = require("express");
var methodOverride = require("method-override");
const path = require("path");
const hbs = require("hbs");
require("dotenv").config();
const {
  renderHome,
  renderContactme,
  renderMyproject,
  renderTestimonial,
  // renderBlog,
  // renderBlogDetail,
  renderBlogAdd,
  // renderBlogEdit,
  // addBlog,
  // updateBlog,
  // deleteBlog,
  render404,
} = require("./controllers/controller");
const {
  renderBlog,
  renderBlogDetail,
  renderBlogEdit,
  addBlog,
  updateBlog,
  deleteBlog,
} = require("./controllers/controller-v2");
const { formatDateToWIB, getRelativeTime } = require("./utils/time");
const { truncateText } = require("./utils/text");

const app = express();
const port = process.env.SERVER_PORT || 5002;

app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/css", express.static(path.join(__dirname, "./css")));
app.use("/js", express.static(path.join(__dirname, "./js")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("truncateText", truncateText);
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});

app.get("/", renderHome);
app.get("/contactme", renderContactme);
app.get("/myproject", renderMyproject);
app.get("/testimonial", renderTestimonial);
app.get("/blog", renderBlog);
app.get("/blog-detail/:id", renderBlogDetail);
app.post("/blog", addBlog);
app.get("/blog-add", renderBlogAdd);
app.get("/blog-edit/:id", renderBlogEdit);
app.put("/blog-update/:id", updateBlog);
app.delete("/blog-delete/:id", deleteBlog);
app.get("*", render404);

app.get("/:lang/project/:id", (req, res) => {
  const { idProject, lang } = req.params;
  const { name, title } = req.query;

  let textToRender = "";

  if (lang === "id") {
    textToRender = `halaman project dengan id : ${idProject} ; penulis : ${name} ; tema : ${title}`;
  } else {
    textToRender = `project page with id : ${idProject} ; author : ${name} ; title : ${title}`;
  }
  res.send(textToRender);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  // console.log(`test dotenv ${process.env.URL_TEST}`);
});
