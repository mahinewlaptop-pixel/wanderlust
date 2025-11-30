const mongoose =require("mongoose");
const initData = require("./data.js")
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wander";

async function main() {
    mongoose.connect(MONGO_URL);
};

main()
.then(()=> console.log("Connected"))
.catch(err => console.log(err));

const initDB = async function () {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner : '689a9c17a93ec2e2aa9fbb3b',
    }));
    await Listing.insertMany(initData.data);
    console.log("Clear And Re-Initialize Fresh Data..");
}

initDB();