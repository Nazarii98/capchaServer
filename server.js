const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

console.log("process.env.EMAIL_USER", process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/submit-captcha", (req, res) => {
  const { images } = req.body;

  const mailOptions = {
    from: "nazzikk1998@gmail.com",
    to: "nazzikk1998@gmail.com",
    subject: "Chosed images",
    text: `Chosed images: ${images.join(", ")}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "sending error", error });
    }
    res.status(200).json({ message: "Email sent success" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
