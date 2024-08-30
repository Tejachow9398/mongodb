import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/myloginRegisterDB", {
            useUnifiedTopology: true,
            useNewUrlParser: true 
        });
        console.log("DB connected");
    } catch (error) {
        console.error("Error connecting to DB:", error);
    }
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const User = mongoose.model("User", userSchema);

connectToDatabase();

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "User not registered" });
        }

        if (password === user.password) {
            res.send({ message: "Login Successful", user });
        } else {
            res.status(400).send({ message: "Incorrect password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ message: "All fields are required" });
    }

    try {
       
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).send({ message: "User already registered" });
        }

  
        const newUser = new User({
            name,
            email,
            password
        });

        return res.status(201).send({ message: "Successfully Registered" });
    } catch (err) {
        return res.status(500).send({ message: "Error processing request", error: err });
    }
});

app.listen(9003, () => {
    console.log("BE started at port 9003");
});
