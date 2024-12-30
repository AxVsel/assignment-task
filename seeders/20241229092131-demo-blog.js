"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Blogs", [
      {
        title: "The mad wizard",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam nisi porro labore natus id cupiditate expedita laudantium officiis est necessitatibus vel nihil, in facere? Cum esse tempora libero.",
        image: "blog-img.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: "The good wizard",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam nisi porro labore natus id cupiditate expedita laudantium officiis est necessitatibus vel nihil, in facere? Cum esse tempora libero.",
        image: "blog-img.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Blogs", null, {});
  },
};
