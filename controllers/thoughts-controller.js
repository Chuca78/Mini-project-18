// todo: create thoughts route

const Thought = require("../models/Thought");

// **`/api/thoughts`**

module.exports = {
  // * `GET` to get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // * `GET` to get a single thought by its `_id`
  getThoughtsById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
  createThoughts(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },

  // ```json
  // // example data
  // {
  //   "thoughtText": "Here's a cool thought...",
  //   "username": "lernantino",
  //   "userId": "5edff358a0fcb779aa7b118b"
  // }
  // ```

  // * `PUT` to update a thought by its `_id`
  updateThoughts(req, res) {
    Thought.update()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // * `DELETE` to remove a thought by its `_id`
  deleteThoughts(req, res) {
    Thought.destroy()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // ---

  // **`/api/thoughts/:thoughtId/reactions`**

  // * `POST` to create a reaction stored in a single thought's `reactions` array field
  addReaction(req, res) {
    Thought.create()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
  deleteReaction(req, res) {
    Thought.destroy()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
};

// Need all of these to meet requirements
// getAllThoughts
// getThoughtsById
// createThoughts
// updateThoughts
// deleteThoughts
// addReaction
// deleteReaction
