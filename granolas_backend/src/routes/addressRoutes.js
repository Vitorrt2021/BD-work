const router = require("express").Router();

const address = require("../model/address");

const errorHandler = require("../controller/errorHandler");

router.get("/", async (req, res) => {});

router.get("/:id", async (req, res) => {});

router.post("/", async (req, res) => {});

router.delete("/:addressId", async (req, res) => {});

router.put("/:addressId", async (req, res) => {});

module.exports = router;
