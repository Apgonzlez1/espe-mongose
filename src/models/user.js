const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    match: /@universidad\.edu$/,
  },
});
module.exports = mongoose.model("User", UserSchema);
