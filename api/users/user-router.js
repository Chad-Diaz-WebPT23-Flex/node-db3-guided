const router = require("express").Router();

const Users = require("./user-model.js");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "error finding users" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `id ${id} is not a valid id.` });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving user from the database" });
  }
});

router.post("/", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await Users.add(userData);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "error adding user to the database" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const updatedUser = await Users.update(id, changes);
    if (updatedUser) {
      res.status(202).json(updatedUser);
    } else {
      res.status(404).json({ message: `Could not find user with id of ${id}` });
    }
  } catch (err) {
    res.status(500).json({ message: "failed to update user" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await Users.remove(id);
    if (count) {
      res.status(202).json({ message: `${id} has been deleted` });
    } else {
      res.status(404).json({ message: `${id} is not a valid id` });
    }
  } catch (err) {
    res.status(500).json({ message: "error deleting user from the database" });
  }
});

router.get("/:id/posts", async (req, res, next) => {
  const { id } = req.params;
  try {
    const posts = await Users.findPost(id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "error retrieving posts" });
  }
});

router.post("/:id/posts", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const newPost = await Users.addPostById(id, body);
    if (newPost) {
      res.status(201).json(newPost);
    } else {
      res.status(404).json({ message: `${id} is not a valid id` });
    }
  } catch (err) {
    res.status(500).json({ message: "error adding posts" });
  }
});

// router.delete("/posts/:postId", async (req, res) => {

//   const { postId } = req.params;
//   try {
//     const count = await Users.removePostById(id, postId);
//     if (count) {
//       res.status(202).json({ message: `${postId} has been deleted` });
//     } else {
//       res.status(404).json({ message: `${postId} is not a valid post id` });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "error deleting posts" });
//   }
// });

// REVIEW Why doesn't the below code work?

router.get("/findAllPosts", async (req, res) => {
  try {
    const posts = await Users.findAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "error finding posts" });
  }
});

module.exports = router;
