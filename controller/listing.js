const Listing = require("../models/listing");

module.exports.index = async (req, res)=>{
    const allListing = await Listing.find({});
    return res.render("listings/index.ejs", {allListing});
};

module.exports.show = async (req, res)=>{
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path : "reviews", populate:{path:"author"}}).populate("owner");
    // res.render("listings/show.ejs", {listing});
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listing");
    }
    else{
        return res.render("listings/show.ejs", {listing});
    }
};

module.exports.create = async (req, res)=>{
    // const {title, description, image, price, location, country } = req.body;
    // Listing.insertOne({title, description, image, price, location, country})
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
    // res.redirect('/listing');

    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send valid data for listing");
    // }
    // res.send(req.file);
    const {path : url, filename} = req.file;
    console.log(url, filename);
    const newlisting = new Listing(req.body.listing);
    newlisting.image.url = url
    newlisting.image.filename = filename;
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listing");
};

module.exports.update = async (req, res)=>{
    const {id}= req.params;
    // const {title, description, image, location, country}= req.body;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file != "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listing/${id}`);
};

module.exports.edit = async (req, res)=>{
    const {id}= req.params;
    const listing= await Listing.findById(id);
    // console.log(listing);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listing");
    }
    else{
        let originalImageUrl = listing.image.url;
        originalImageUrl=originalImageUrl.replace("/upload", "/upload/w_250");
        res.render("listings/edit.ejs", {listing, originalImageUrl});
    }
};

module.exports.delete = async (req, res)=>{
    const {id}=req.params;
    const deletedList=await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    req.flash("success", "Listing Deleted");
    res.redirect("/listing");
};

module.exports.renderListingForm = (req, res)=>{
    res.render("listings/new.ejs");
};