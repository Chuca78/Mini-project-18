// Require Mongoose and Moment
const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

// reactions (These are like replies)
// Reaction (SCHEMA ONLY)
const ReactionsSchema = new Schema(
  {
    // Use Mongoose's ObjectId data type
    // Default value is set to a new ObjectId
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    // Set default value to the current timestamp
    // Use a getter method to format the timestamp on query
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// ThoughtsSchema
const ThoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // Set default value to the current timestamp
    // Use a getter method to format the timestamp on query
    createdAt: {
      type: Date,
      default: Date.now,
      // Moment
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    // (The user that created this thought)
    username: {
      type: String,
      required: true,
    },
    // Use ReactionsSchema to validate data
    reactions: [ReactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Array of nested documents created with the reactionSchema
// get total count of reactions
ThoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create the Thoughts model using the Thoughts Schema
const Thoughts = model("Thoughts", ThoughtsSchema);

// Export Thoughts Module
module.exports = Thoughts;
