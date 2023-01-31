const { Users } = require("../models");

module.exports = {
  // * `GET` all users
  getAllUsers(req, res) {
    Users.find({})
      // populate users thoughts
      .populate({ path: "thoughts", select: "-__v" })
      // populate user friends
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      // .sort({_id: -1})
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // * `GET` a single user by its `_id` and populated thought and friend data
  getUsersById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      // return if no user is found
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No User with this particular ID!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // * `POST` a new user
  createUsers({ body }, res) {
    Users.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // ```json
  // example data
  // {
  //   "username": "lernantino",
  //   "email": "lernantino@gmail.com"
  // }
  // ```

  // * `PUT` to update a user by its `_id`
  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No User with this particular ID!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  // * `DELETE` to remove user by its `_id`
  deleteUsers({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No User with this particular ID!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // **`/api/users/:userId/friends/:friendId`**
  // * `POST` to add a new friend to a user's friend list
  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No User with this particular ID!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  // * `DELETE` to remove a friend from a user's friend list
  deleteFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No User with this particular ID!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

// need all of these to meet requirements
// getAllUsers - done
// getUsersById - done
// createUsers - done
// updateUsers - done
// deleteUsers - done
// addFriend - done
// deleteFriend - done
