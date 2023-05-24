const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { connect } = require("http2");

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Arnav@123",
  database: "instagramdb",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("MySQL connected...");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images"); // Upload destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
});

app.post("/upload", upload.single("image"), async (req, res) => {
  const { username, caption } = req.body;
  const { originalname, buffer } = req.file;

  const tempPath = path.join(__dirname, "images", originalname);

  fs.writeFileSync(tempPath, buffer);
  console.log("Username:", username);
  console.log("Caption:", caption);
  console.log("Filename:", originalname);
  console.log("Path:", tempPath);

  const imageData = fs.readFileSync(tempPath);

  await new Promise((resolve, reject) => {
    const query =
      "INSERT INTO posts (username, caption, filename, image) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [username, caption, originalname, imageData],
      (err, result) => {
        if (err) {
          console.error("Error inserting data into MySQL:", err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });

  // fs.unlinkSync(tempPath);

  res.send("Image uploaded");
});

app.get("/display", (req, res) => {
  const sql = "select * from posts;";

  connection.query(sql, (err, results) => {
    const data = results.map((result) => {
      if (err) {
        console.error("Error fetching image data:", err);
        res.status(500).json({ error: "Error fetching image data" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ err: "Image not found" });
      }
      if (result.image) {
        const { id, username, caption, image } = result;
        return {
          id,
          username: username || "", // Use an empty string if username is null
          caption: caption || "", // Use an empty string if caption is null
          base64Image: image.toString("base64"),
        };
      }
      return null;
    });

    console.log(data);

    res.send(data);
    // console.log(data);
    // res.send(data);
  });
});

app.listen(8000, () => {
  console.log("Server is running");
});
