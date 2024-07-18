const express = require('express');
const { handleSearch } = require('../controllers/searchController');

const router = express.Router();

router.use("/api/users", require("./users") );
router.get("/api/hotels/search", handleSearch);

module.exports = router;