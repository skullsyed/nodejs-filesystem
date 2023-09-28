const { timeStamp } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

//https://github.com/skullsyed/nodejs-filesystem
//https://https-github-com-skullsyed-nodejs.onrender.com

app.post("/products", (req, res) => {
  // const timeStamp = "C:UsersAdminDesktop\timestamp\newfolder";

  const myDate = new Date().toISOString();

  //   console.log(myDate);

  const pathName = `${myDate}`;

  const filePath = path.join(
    __dirname,
    `/timestamp/${pathName.split("T")[0]}.txt`
  );
  console.log(filePath);

  let fileContent = myDate;

  try {
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error(" error writing file", err);
        res.status(401).send({ message: "Error writing file" });
      } else {
        res.status(201).send({ message: "successfully added file " });
      }
    });
  } catch (e) {
    res.status(500).send({ message: "internal error" });
    res.status(401).send({ message: "authentication error" });
  }
});

app.get("/allFiles", (req, res) => {
  const filePath = path.join(__dirname, `/timestamp`);

  try {
    fs.readdir(filePath, (err, data) => {
      if (err) {
        res.status(401).send({ message: "internal error", err: err });
        console.log(data);
      } else if (!data) {
        res.send({ message: "no data on folder" });
      } else {
        res.status(200).send(data);
      }
    });
  } catch (e) {
    res.status(500).send({ message: "internal error" });
    res.status(401).send({ message: "authentication error" });
  }
});

// app.post("/products/append", (req, res) => {
//   let myDate = new Date().toISOString();
//   // const myDate = new Date().toISOString();
//   console.log(myDate);

//   const path = `${myDate}.txt`;
//   console.log(path);

//   let fileContent = myDate;
//   try {
//     fs.appendFile(path, fileContent, (err) => {
//       if (err) {
//         console.error(" error writing file", err);
//         res.status(401).send({ message: "Error writing file" });
//       } else {
//         res.status(201).send({ message: "successfully added file " });
//       }
//     });
//   } catch (e) {
//     res.status(500).send({ message: "internal error" });
//     res.status(401).send({ message: "authentication error" });
//   }
// });

const PORT = 6000;

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
