function renderHome(req, res) {
  res.render("index");
}
function renderContactme(req, res) {
  res.render("contactme");
}
function renderMyproject(req, res) {
  res.render("myproject");
}
function renderTestimonial(req, res) {
  res.render("testimonial");
}

// blog
const { formatDateToWIB } = require("../utils/time");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);
const { Blog } = require("../models");

// let blogs = [
//   {
//     author: "Karunia Leo G",
//     title: "title 1",
//     content: "aaaaaaaaaaaaaa",
//     image: "https://picsum.photos/536/354",
//     postedAt: new Date(),
//   },
//   {
//     author: "Karunia Leo G",
//     title: "title 2",
//     content: "bbbbbbbbbbbbb",
//     image: "https://picsum.photos/536/354",
//     postedAt: new Date(),
//   },
// ];

async function renderBlog(req, res) {
  const blogs = await Blog.findAll({
    order: [["createdAt", "DESC"]],
  });

  console.log(blogs);

  res.render("blog", { blogs: blogs });
}

async function renderBlogDetail(req, res) {
  const { id } = req.params;
  const blogDetail = await Blog.findOne({
    where: {
      id: id,
    },
  });

  if (blogDetail === null) {
    res.render("page-404");
  } else {
    console.log("blog detail :", blogDetail);
    res.render("blog-detail", { data: blogDetail });
  }
}

function renderBlogAdd(req, res) {
  res.render("blog-add");
}

async function renderBlogEdit(req, res) {
  const { id } = req.params;

  const dataToEdit = await Blog.findOne({
    where: {
      id: id,
    },
  });

  if (dataToEdit === null) {
    res.render("page-404");
  } else {
    console.log("data yang mau di edit :", dataToEdit);
    res.render("blog-edit", { data: dataToEdit });
  }
}

async function addBlog(req, res) {
  console.log("form submit");
  const { title, content } = req.body;
  const image = "https://picsum.photos/536/354";
  const result = await Blog.create({
    title: title,
    content: content,
    image: image,
  });
  console.log("blog created", result);
  res.redirect("/blog");
}

async function updateBlog(req, res) {
  console.log("req :", req);
  const { id } = req.params;
  const { title, content } = req.body;
  const image =
    "http://localhost:2200/assets/wp13652202-obito-black-and-white-wallpapers.jpg";
  const result = await Blog.update(
    {
      title: title,
      content: content,
      image: image,
      updatedAt: sequelize.fn("NOW"),
    },
    {
      where: {
        id: id,
      },
    }
  );

  // blogs.splice(index, 1);
  console.log("result update :", result);
  res.redirect("/blog");
}

async function deleteBlog(req, res) {
  console.log("req :", req);
  const { id } = req.params;
  const result = await Blog.destroy({
    where: {
      id: id,
    },
  });
  console.log("result query delete :", result);
  res.redirect("/blog");
}
// blog
function render404(req, res) {
  res.send("halaman ini tidak tersedia");
}

module.exports = {
  renderHome,
  renderContactme,
  renderMyproject,
  renderTestimonial,
  renderBlog,
  renderBlogDetail,
  renderBlogAdd,
  renderBlogEdit,
  addBlog,
  updateBlog,
  deleteBlog,
  render404,
};
