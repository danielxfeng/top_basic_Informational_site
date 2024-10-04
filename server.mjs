import http from "http";
import fs from "fs/promises";

const getFromFile = async (fileName) => {
  try {
    return await fs.readFile(`./html/${fileName}`, "utf-8");
  } catch (err) {
    console.error(err);
    return "Error";
  }
};

http
  .createServer(async (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    let fileName;
    switch (req.url) {
      case "/":
        fileName = "index.html";
        break;
      case "/about":
        fileName = "about.html";
        break;
      case "/contact-me":
        fileName = "contact-me.html";
        break;
      default:
        fileName = "404.html";
    }
    res.write(await getFromFile(fileName));
    res.end();
  })
  .listen(8080);
