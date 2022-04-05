const view = require("../model/view");
const errorHandler = require("../controller/errorHandler");

const router = require("express").Router();

//TODO passar as funções para o controller

router.get("/", async (req, res) => {});

router.get("/:viewId", async (req, res) => {});

router.post("/", async (req, res) => {});

router.delete("/:viewID", async (req, res) => {});

router.put("/:viewId", async (req, res) => {});

module.exports = router;
