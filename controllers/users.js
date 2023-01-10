const { Users } = require("../models/users");
exports.index = async (req, res) => {
  const users = await Users.findAll();
  return res.render("users/index", {
    users: users,
  });
};

exports.tambah = async (req, res) => {
  return res.render("users/tambah", {
    error: null,
  });
};

exports.edit = async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  return res.render("users/edit", {
    user: user,
  });
};

exports.editUser = async (req, res) => {
  console.log(req.body);
  await Users.update(req.body, {
    where: { id: req.params.id },
  });
  return res.redirect("/users");
};

exports.deleteUser = async (req, res) => {
  await Users.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.redirect("/users");
};

exports.tambahUser = async (request, response) => {
  console.log(request.body);

  const nemuIdcard = await Users.findOne({
    where: { idcard: request.body.idcard },
  });

  const nemuNis = await Users.findOne({
    where: {
      nis: request.body.nis,
    },
  });

  // nis sudah digunakan
  if (nemuNis) {
    return response.render("users/tambah", {
      error: "NIS sudah terdaftar",
    });
  }

  // id card sudah digunakan
  if (nemuIdcard) {
    return response.render("users/tambah", {
      error: "ID Card sudah terdaftar",
    });
  }
  await Users.create({
    nis: request.body.nis,
    kelas: request.body.kelas,
    name: request.body.name,
    idcard: request.body.idcard,
  });
  return response.redirect("/users");
};
