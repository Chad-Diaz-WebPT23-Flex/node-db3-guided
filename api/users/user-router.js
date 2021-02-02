const express = require("express");


// the knex reference that used to be here (through db-config) is replaced by a
// reference to our data model object: user-model.
const Users = require('./user-model.js');

const router = express.Router();

//----------------------------------------------------------------------------//
// Each of these middleware route handlers have been refactored to use our
// model db functions from user-model.js.
// 
// This helps us keep our source files single-purpose, simplifying testing and
// troubleshooting, etc.
//
// The name "model" is really just a reference to the role of that "layer or
// logic" in the design - it's where our database methods are. 
// 
// This follows the typical MVC pattern. You can read about it here:
//    https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller 
// 
//----------------------------------------------------------------------------//

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'invalid id' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
});

router.get('/:id/posts', async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Users.findPosts(id);
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
})

router.post("/", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await Users.add(userData);
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }

});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const changedUser = await Users.update(id, changes);
    if (changedUser) {
      res.json(changedUser);
    } else {
      res.status(404).json({ message: 'invalid id' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await Users.remove(id);
    if (count) {
      res.json({ message: `deleted ${count} records` });
    } else {
      res.status(404).json({ message: 'invalid id' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
});

module.exports = router;
