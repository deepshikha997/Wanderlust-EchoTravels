const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to the database:",err);
  });

async function main(){
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
     ...obj, 
     owner: "67912b686eea0e47285016ad",
    //  65796ae77baa934937e385e8
    //  652d0081ae547c5d37e56b5f",
     }));
  await Listing.insertMany(initData.data);
  console.log("data was initalized");
};

initDB();