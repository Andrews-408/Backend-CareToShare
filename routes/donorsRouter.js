/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const donorsController = require("../controllers/donorsController");
const authController = require("../controllers/authController")


const router = express.Router();

router.post("/signUp", authController.signUp )

router
	.route("/")
	.post(donorsController.createDonor)
	.get(donorsController.getAllDonors)

router
	.route("/:username")
	.get(donorsController.getDonor)
	.patch(donorsController.updateDonor)
	.delete(donorsController.deleteDonorAccount)



module.exports = router;