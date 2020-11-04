const mongoose = require("mongoose");

const { Schema } = mongoose;

const DonorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: String,
  bloodGroup: {
    type: String,
    required: true,
  },
  address: String,
  contact: String,
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
});

module.exports = mongoose.model("DonorSchema", DonorSchema);
