const express = require('express');
const router = express.Router();
const UserController = require("../controllers/users");

router.get('/', (req, res, next) => {
  UserController.list()
    .then(d => res.json({ success: true, data: d }))
  .catch(e => next(e))
});

router.post("/", (req, res, next) => {
  UserController.save(req.body)
    .then(d => res.json({ success: true, data: d }))
  .catch(e => next(e))
})

router.put("/:id", (req, res, next) => {
  UserController.update(req.params.id, req.body)
    .then(d => res.json({ success: true, data: d }))
  .catch(e => next(e))
})

router.get("/:id", (req, res, next) => {
  UserController.get(req.params.id)
    .then(d => res.json({ success: true, data: d }))
  .catch(e => next(e))
})

module.exports = router;
