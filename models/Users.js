// Require Mongoose
const { Schema, model } = require("mongoose");

// User:
const UsersSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Must match a valid email address (look into Mongoose's matching validation)
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    // Array of _id values referencing the Thought model
    thoughts: [{}],
    friends: [{}],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Array of _id values referencing the User model (self-reference)
// get total count of friends
UsersSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create the Users model using the Users Schema
const Users = model("Users", UsersSchema);

// Export Users module
module.exports = Users;
