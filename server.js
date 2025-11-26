const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get('/{*any}', (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
