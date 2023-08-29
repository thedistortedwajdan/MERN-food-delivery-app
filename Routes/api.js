const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Order = require("../models/Orders");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
// const uri = process.env.uri;
const jwtsecret = process.env.jwtsecret;
const {
  body,
  // validatoionResult,
  validationResult,
} = require("express-validator");
router.get("/", async (req, res) => {
  try {
    res.send("hello world");
  } catch (error) {
    console.error(error.message);
    res.json({ success: false });
  }
});
router.post(
  "/signup",
  body("email", "invalid email").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const email = req.body.email;
        const isEmail = await User.findOne({ email });
        if (isEmail) {
          res.status(400).json({ errors: "email already exists" });
        } else {
          const salt = await bcryptjs.genSalt(10);
          const secure_pass = await bcryptjs.hash(req.body.password, salt);
          await User.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: secure_pass,
          });
          res.json({ success: true });
        }
      } catch (error) {
        console.error(error.message);
        res.json({ success: false });
      }
    }
  }
);

router.post(
  "/login",
  body("email", "invalid email").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const email = req.body.email;
      try {
        const isEmail = await User.findOne({ email });
        if (!isEmail) {
          res.status(400).json({ errors: "email does not exist" });
        } else if (
          !(await bcryptjs.compare(req.body.password, isEmail.password))
        ) {
          res.status(400).json({ errors: "incorrect password" });
        } else {
          const data = {
            user: {
              // isEmail.id
              id: isEmail.id,
            },
          };
          const authtoken = jwt.sign(data, jwtsecret);
          res.json({ success: true, authtoken: authtoken });
        }
      } catch (error) {
        console.error(error.message);
        res.json({ success: false });
      }
    }
  }
);

router.get("/getFoodData", (req, res) => {
  try {
    // console.log(global.food_items);
    res.json({
      success: true,
      food_data: [global.food_items, global.food_category],
    });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, error: error.message });
  }
});

router.post("/orderData", async (req, res) => {
  try {
    let data = req.body.order_data;
    await data.splice(0, 0, { order_date: req.body.order_date });
    // console.log("1231242343242354", req.body.email);

    let eId = await Order.findOne({ email: req.body.email });
    // console.log(eId);
    if (eId === null) {
      // console.log(data);
      // console.log("1231242343242354", req.body.email);
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
      res.json({ success: true });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
      res.json({ success: true });
    }
  } catch (error) {
    console.log(error.message);
    // res.send("Server Error", error.message);
    res.json({ success: false, error: error.message });
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    // console.log(req.body.email);
    let eId = await Order.findOne({ email: req.body.email });
    // console.log(eId);
    res.json({ orderData: eId });
  } catch (error) {
    // res.send("Error", error.message);
    console.log(error.message);
  }
});
// router.post("/myOrderData", async (req, res) => {
//   try {
//     const email = req.query.email;
//     let eId = await Order.findOne({ email: email });
//     res.json({ success: true, orderData: eId });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, error: error.message });
//   }
// });

module.exports = router;
