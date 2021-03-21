const express = require("express");
const app = express();
const multer = require("multer");
const pool=require("./db/config");
const csv = require("csv-parser");
const fs = require("fs");



const insertData = (file) => {
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", (data) => {
      pool.query(
        `INSERT INTO csv VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
        [
          data["Region"],
          data["Country"],
          data["Item Type"],
          data["Sales Channel"],
          data["Order Priority"],
          data["Order Date"],
          data["Order ID"],
          data["Ship Date"],
          data["Units Sold"],
          data["Unit Price"],
          data["Unit Cost"],
          data["Total Revenue"],
          data["Total Cost"],
          data["Total Profit"],
        ],
        (err, results) => {
          if (err) {
            throw err;
          }
        }
      );
    })
    .on("end", () => {
      console.log("inserted all data");
    });
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const parts = file.mimetype.split("/");
    cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`);
  },
});

const upload = multer({ storage });

//uploading data
app.post("/uploadcsv", upload.single("csvfile"), (req, res) => {
  insertData(`${__dirname}/public/${req.file.filename}`);
  res.send();
});

app.listen(3000, () => {
  console.log(`app started at port`);
});