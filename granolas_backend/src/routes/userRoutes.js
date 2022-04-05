require("dotenv").config();

const users = require("../model/users");
const errorHandler = require("../controller/errorHandler");

const router = require("express").Router();

router.get("/:userId", async (req, res) => {});

router.post("/", async (req, res) => {});

router.put("/:userId", async (req, res) => {});

router.delete("/:userId", async (req, res) => {});

module.exports = router;
