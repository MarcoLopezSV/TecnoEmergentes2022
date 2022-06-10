const express = require("express");
const router = express.Router();
const Bookregistry = require("../../models/bookregistry");
const Book = require("../../models/book");
const User = require("../../models/user");

// Get Bookregistries method
router.get("/", async (req, res) => {
  let searchOptions = {};

  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }

  try {
    const bookregistries = await Bookregistry.find(searchOptions)
      .populate("book")
      .populate("user");
    res.json({
      bookregistries,
      searchOptions: req.query,
    });
  } catch {
    res.json({ status: 500, message: "Error" });
  }
});

// Post Bookregistry method
router.post("/", async (req, res) => {
  const bookregistry = new Bookregistry({
    dateCheckout: Date.now(),
    Returned: false,
    book: req.body.book,
    user: req.body.user,
  });

  try {
    const newBook = await bookregistry.save((err, u) => {
      if (err || !u) {
        return res.status(500).send({
          status: "error",
          err,
        });
      }

      return res.json({ status: 200, message: "Bookregistry added" });
    });
  } catch {
    res.json({
      errorMessage: "Something went wrong",
    });
  }
});

// Get Bookregistry by Id method
router.get("/:id", async (req, res) => {
  try {
    const bookregistry = await Bookregistry.findById(req.params.id)
      .populate("book")
      .populate("user")
      .exec();

    if (!bookregistry) {
      return res.json({ status: 404, message: "Not found" });
    }
    return res.json({
      bookregistry,
      //bookregistry:bookregistry,
      //searchOptions: req.query,
    });
  } catch {
    return res.json({ status: 500, message: "Something went wrong!" });
  }
});

// Put returned Bookregistry method
router.put("/:id/returned", async (req, res) => {
  let bookregistry;

  try {
    bookregistry = await Bookregistry.findById(req.params.id);
    bookregistry.dateCheckout = req.body.dateCheckout;
    bookregistry.dateReturn = Date.now();
    bookregistry.Returned = true;
    bookregistry.book = req.body.book;
    bookregistry.user = req.body.user;

    await bookregistry.save((err, u) => {
      if (err || !u) {
        return res.status(500).send({
          status: "error",
          err,
        });
      }
      return res.json({ status: 200, message: "Bookregistry updated" });
    });
  } catch {
    if (bookregistry == null) {
      return res.json({ status: 404, message: "Bookregistry not found" });
    } else {
      return res.json({ status: 500, message: "Something went wrong!" });
    }
  }
});

// Delete Bookregistry method
router.delete("/:id", async (req, res) => {
  let bookregistry;
  try {
    bookregistry = await Bookregistry.findById(req.params.id);
    await bookregistry.remove();
    res.json({ status: 200, message: "Bookregistry deleted" });
  } catch {
    if (bookregistry == null) {
      res.json({ status: 404, message: "Bookregistry not found" });
    } else {
      res.json({ status: 500, message: "Something went wrong!" });
    }
  }
});

module.exports = router;
