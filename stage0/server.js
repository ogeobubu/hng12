const express = require("express");
const app = express();
const port = 3000;

app.get("/api", (req, res) => {
  const data = {
    email: "ogeobubu@gmail.com",
    current_datetime: new Date().toISOString(),
    github_url: "https://github.com/ogeobubu/hng12",
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}/api`);
});
