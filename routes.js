const express = require("express");
const router = express.Router();

const index = require("./controllers/index");
const users = require("./controllers/users");

const routes = (app) => {
  // report
  router.get("/", index.mainView);
  router.get("/filter-data", index.filterData);
  // excel
  router.get("/downloadExcel", index.excel);

  // user
  router.get("/users", users.index);
  router.get("/users/tambah-user", users.tambah); // halaman tambah user
  router.post("/users/tambah-user", users.tambahUser);
  router.post("/users/edit-user/:id", users.editUser); // halaman edit user
  router.get("/users/edit-user/:id", users.edit);
  router.get("/users/delete-user/:id", users.deleteUser);

  app.use(router);
};

module.exports = routes;
