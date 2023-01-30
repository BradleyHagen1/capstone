// require packages
const express = require("express");
const cors = require("cors");

// app instance
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//endpoints
const { getActivity,addActivity,deleteActivity, updateActivity } = require("./controller");

app.get("/activity", getActivity);
app.post("/activity", addActivity);
app.delete("/activity/:id", deleteActivity);
app.put("/activity/:id", updateActivity);

//starting server with app.listen

app.listen(5678, () => console.log("listening on port 5678"));
