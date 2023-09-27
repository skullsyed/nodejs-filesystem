const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.post("/products", (req, res) => {
  const myDate = new Date().toISOString();

  //   console.log(myDate);

  const path = `date-time.txt`;
  //   console.log(path);

  let fileContent = myDate;
  try {
    fs.writeFile(path, fileContent, (err) => {
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
