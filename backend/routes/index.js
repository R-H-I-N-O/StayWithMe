const express = require('express');
const { handleSearch, handleHotelViewPage } = require('../controllers/searchController');

const router = express.Router();

router.use("/api/users", require("./users") );
router.get("/api/hotels/search", handleSearch);
router.get("/api/hotels/search/:id", handleHotelViewPage);


module.exports = router;