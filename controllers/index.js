const { Absence } = require("../models/absence");
const { Users } = require("../models/users");
const exceljs = require("exceljs");
const { Op } = require("sequelize");
exports.mainView = async (req, res) => {
  const data = await Absence.findAll({
    include: Users,
  });

  return res.render("index", {
    absences: data,
  });
};
exports.excel = async (req, res) => {
  const workbook = new exceljs.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
  worksheet.columns = [
    { header: "No", key: "s_no", width: 10 },
    { header: "User", key: "user", width: 10 },
    { header: "ID Card", key: "idcard", width: 10 },
    { header: "Status", key: "status", width: 10 },
    { header: "Tanggal", key: "tanggal", width: 10 },
  ];

  const path = "./assets/excel";

  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  const data = await Absence.findAll({
    include: Users,
  });
  let counter = 1;
  data &&
    data.length > 0 &&
    data.forEach((d) => {
      worksheet.addRow({
        s_no: counter,
        user: d.user?.name ?? "-",
        tanggal: d.tanggal,
        status: d.status,
        idcard: d.idcard,
      }); // Add data in worksheet
      counter++;
    });
  try {
    await workbook.xlsx.writeFile(`${path}/absence.xlsx`).then(() => {
      return res.download(`${path}/absence.xlsx`);
    });
  } catch (err) {
    res.send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

exports.filterData = async (req, res) => {
  const tanggal = req.query;
  const data_absen = await Absence.findAll({
    where: {
      masuk: {
        [Op.gte]:
          tanggal.tanggal_masuk == "" ? new Date() : tanggal.tanggal_masuk,
      },
      pulang: {
        [Op.lte]:
          tanggal.tanggal_keluar == "" ? new Date() : tanggal.tanggal_keluar,
      },
    },
  });

  console.log(data_absen);
};
