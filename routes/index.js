// Require express router
const router = require("express").Router();

// Import all of the API routes
const apiRoutes = require("./api");

// add prefix `/api` to all of the api routes
router.use("/api", apiRoutes);

// 404 Status error message
router.use((req, res) => {
  res.status(404).send("404 Error!");
});

// Module exports router
module.exports = router;
