const router = require("express").Router();
const contacts = require("../controllers/contact.controller");

router.route("/").get(contacts.findAll).post(contacts.create);

router.route("/favorite").get(contacts.findAllFavorite);

router
  .route("/:id")
  .get(contacts.findOne)
  .put(contacts.update)
  .delete(contacts.delete);

module.exports = router;
