import dotenv from "dotenv";
import Express from "express";
import fs from "fs/promises";

const app = Express();

const getFile = async (fileName) => {
  try {
    return await fs.readFile(`./html/${fileName}.html`, "utf8");
  } catch (error) {
    return await fs.readFile("./html/404.html", "utf8");
  }
};

app.get("/", async (req, res) => {
  res.type("text/html");
  res.send(await getFile("index"));
});

app.get("/about", async (req, res) => {
  res.type("text/html");
  res.send(await getFile("about"));
});
app.get("/contact-me", async (req, res) => {
  res.type("text/html");
  res.send(await getFile("contact-me"));
});
app.get("*", async (req, res) => {
  res.type("text/html");
  res.send(await getFile("404"));
});

const port = dotenv.config().parsed?.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
