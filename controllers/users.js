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

exports.tambahUser = async (req, res) => {
  console.log(req.body);

  const nemuIdcard = await Users.findOne({
    where: { idcard: req.body.idcard },
  });

  if (nemuIdcard) {
    return res.render("users/tambah", {
      error: "ID Card sudah terdaftar",
    });
  }

  await Users.create(req.body);
  return res.redirect("/users");
};
