const express = require("express");
const router = express.Router({mergeParams:true});
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controller/review.js")

//Reviews


router.route("/")
//Post Review route
.post(isLoggedIn, wrapAsync(reviewController.createReview));

router.route("/:reviewId")
// Delete Review Route
.delete(isLoggedIn, isReviewAuthor,  wrapAsync(reviewController.deleteReview));

module.exports = router;