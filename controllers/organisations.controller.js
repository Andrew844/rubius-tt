const fs = require("fs");

const errorHandler = require("../utils/errorHandler.util");

module.exports.getOrganisations = (req, res) => {
  try {
    const { organisations } = JSON.parse(
      fs.readFileSync("./organisations.json", "utf-8")
    );

    res.status(200).json({ data: organisations });
  } catch (e) {
    errorHandler(res);
  }
};
