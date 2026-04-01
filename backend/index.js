
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const PORT = process.env.PORT || 8000;
const mongo_uri = process.env.MONGO_URL;

const app = express();

app.use(cookieParser());

const {HoldingModel} = require('./models/HoldingModel');
const {PositionModel} = require("./models/PositionModel");
const {OrderModel} = require("./models/OrderModel");

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true
}));
app.use(bodyParser.json());

// app.get("/positions", async (req, res) => {
//   let newPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     }
//   ];

//   newPositions.forEach((item) => {
//     const position = new PositionModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     position.save();
//   });

// res.send("Positions saved successfully");
// });

app.get("/allHoldings", async (req, res) => {
    let allHoldings = await HoldingModel.find({});
    res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
    let allPositions = await PositionModel.find({});
    res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
    const newOrder = new OrderModel({
        name: req.body.name,
        price: req.body.price,
        percent: req.body.percent,
        isDown: req.body.isDown
    });

    await newOrder.save();
    res.send("Order placed!");
});

app.use(express.json());

app.use("/", authRoute);

mongoose.connect(mongo_uri).then(()=>{
    console.log("Mongo_DB working!");

    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });

});