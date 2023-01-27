const User = require("../models/User");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // todo: finish user controller

  // update a user
  updateUsers(req, res) {
    User.update()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // delete a user
  deleteUsers(req, res) {
    User.destroy()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // **`/api/users/:userId/friends/:friendId`**

  // add a friend
  // * `POST` to add a new friend to a user's friend list
  addFriend(req, res) {
    User.create()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // delete a friend
  // * `DELETE` to remove a friend from a user's friend list
  deleteFriend(req, res) {
    User.destroy()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
};

// need all of these to meet requirements
// getAllUsers - done
// getUsersById - done
// createUsers - done
// updateUsers
// deleteUsers
// addFriend
// deleteFriend
