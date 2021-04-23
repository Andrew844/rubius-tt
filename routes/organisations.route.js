const { Router } = require("express");
const router = Router();

const organisationsController = require("../controllers/organisations.controller");

router.get("/", organisationsController.getOrganisations);

module.exports = router;
