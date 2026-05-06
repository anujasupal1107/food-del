import express  from "express"
import cors from 'cors'
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js"
import foodRoute from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRoute from "./routes/cartRoute.js"
import orderRoute from "./routes/orderRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000;


// middlewares
app.use(express.json())
app.use(cors())

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRoute)
app.use("/api/food", foodRoute)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRoute)
app.use("/api/order",orderRoute)

app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://localhost:4000`))