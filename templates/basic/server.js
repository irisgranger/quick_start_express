import express from "express";
const app = express();
const port = 3000;

// Using _ as a placeholder for the request object
// since we're not using it in this route as of now.
app.get("/", (_, res) => {
  return res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`);
});
