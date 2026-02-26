const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

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
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "65796ae77baa934937e385e8",
      geometry: obj.geometry || {
        type: "Point",
        coordinates: [77.209, 28.6139],
      },
      //  652d0081ae547c5d37e56b5f",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  } finally {
    await mongoose.connection.close();
  }
};

initDB().catch((err) => console.error("Seeding failed:", err));
