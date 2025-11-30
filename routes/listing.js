const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfing.js");
const upload = multer({storage});


//3 New route
router.route("/new").get(isLoggedIn, listingController.renderListingForm);

router.route("/:id")
//7 Delete route
.delete(isLoggedIn, wrapAsync(listingController.delete))
//6 Update route
.put(isLoggedIn, isOwner, upload.single("listing[image]"), wrapAsync(listingController.update))
//2 Show route
.get(wrapAsync(listingController.show));


router.route("/:id/edit")
//5 Edit route
.get(isLoggedIn, isOwner, wrapAsync(listingController.edit));

router.route("/")
//1 Index route
.get(wrapAsync(listingController.index))
//4 Create Route
.post(isLoggedIn, upload.single("listing[image]"), wrapAsync(listingController.create));
// .post(upload.single("listing[image]"),(req, res)=>{
//     res.send(req.file);
// });

module.exports = router;