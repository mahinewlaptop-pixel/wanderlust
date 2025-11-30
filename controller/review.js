const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.deleteReview = async (req, res)=>{
    const {id, reviewId} = req.params;
    const a = await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    const b = await Review.findByIdAndDelete(reviewId);
    // console.log(a,b);
    req.flash("success", "Review Deleted");
    res.redirect(`/listing/${id}`);
    // console.log(reviewId);
    // res.send(id);
};

module.exports.createReview = async (req, res)=>{
  let listing = await  Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  console.log("New Review saved");
  req.flash("success", "New Review Created");
  res.redirect(`/listing/${req.params.id}`);
//   res.render("listings/show.ejs", {listing});
};
