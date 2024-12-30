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
  const query = `SELECT * FROM public."Blogs" ORDER BY "createdAt" DESC`;
  const blogs = await sequelize.query(query, { type: QueryTypes.SELECT });
  console.log(blogs);
  res.render("blog", { blogs: blogs });
}

async function renderBlogDetail(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public."Blogs" WHERE id = ${id}`;
  const blogDetail = await sequelize.query(query, { type: QueryTypes.SELECT });
  // console.log("hasil query :", blogDetail[0]);
  res.render("blog-detail", { data: blogDetail[0] });
}

function renderBlogAdd(req, res) {
  res.render("blog-add");
}

async function renderBlogEdit(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM public."Blogs" WHERE id = ${id}`;
  const dataToEdit = await sequelize.query(query, { type: QueryTypes.SELECT });
  console.log("data yang mau di edit :", dataToEdit);

  res.render("blog-edit", { data: dataToEdit[0] });
}

async function addBlog(req, res) {
  console.log("form submit");
  const { title, content } = req.body;
  const image = "https://picsum.photos/536/354";
  const query = `INSERT INTO public."Blogs" 
                 (title, content, image) 
                 VALUES 
                ('${title}', '${content}', '${image}')`;
  const result = await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("/blog");
}

async function updateBlog(req, res) {
  console.log("req :", req);
  const { id } = req.params;
  const { title, content } = req.body;
  const image =
    "http://localhost:2200/assets/wp13652202-obito-black-and-white-wallpapers.jpg";
  const query = `UPDATE public."Blogs" 
                 SET title= '${title}', content= '${content}', image='${image}'
                 WHERE id=${id}`;

  const result = await sequelize.query(query, { type: QueryTypes.UPDATE });

  // let updatedBlog = {
  //   author: "Karunia Leo G",
  //   title: title,
  //   content: content,
  //   image:
  //     "https://upload.wikimedia.org/wikipedia/id/thumb/9/95/Obito_unmasked.png/640px-Obito_unmasked.png",
  //   postedAt: new Date(),
  // };

  // blogs.splice(index, 1);
  console.log("result update :", result);
  res.redirect("/blog");
}

async function deleteBlog(req, res) {
  console.log("req :", req);
  const { id } = req.params;
  const query = `DELETE FROM public."Blogs"
               WHERE id = ${id}`;
  const result = await sequelize.query(query, { type: QueryTypes.DELETE });
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
