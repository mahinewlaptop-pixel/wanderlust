const Listing = require('./models/listing');
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
module.exports.isLoggedIn = (req, res, next)=>{
    // console.log(req.path,"..", req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must logged in before you working!");
        return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    // else{
    //     res.locals.redirectUrl = "/listing";
    // }
    next();
};

module.exports.isOwner = async (req, res, next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not Owner of this Listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Validate Listings
module.exports.validateListing = (req, res, next)=>{
    let {err} = listingSchema.validate(req.body);
    // const result =listingSchema.validate(req.body);
    // console.log(result);
    if(err){
        let errMsg = err.details.map((el) => el.message).join(",");
        throw new ExpressError(400, err);
    }
    next();

};



//Validate Reviews
const validateReview = (req, res, next)=>{
    let {err} = reviewSchema.validate(req.body);
    // const result =reviewSchema.validate(req.body);
    // console.log(result);
    if(err){
        let errMsg = err.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next)=>{
    let {id, reviewId}= req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the Owner of this listing");
        return res.redirect(`/listing/${id}`);
    }
    next();
}