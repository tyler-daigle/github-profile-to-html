const { exec } = require("child_process");

const fs = require("fs/promises");
const showdown = require("showdown");
const deployDirectory = "./dist";
const stylesheetDirectory = "./styles";
const imageDirectory = "./images";
const outputFileName = "index.html";

async function createHtml() {
  const converter = new showdown.Converter();
  converter.setOption("noHeaderId", true);

  // read the markdown and convert it to html
  const data = await fs.readFile("portfolio.md", { encoding: "utf-8" });
  const portfolioData = converter.makeHtml(data);

  const header = await loadTemplate("./templates/header.template");
  const footer = await loadTemplate("./templates/footer.template");

  // the html string to write to the file
  const html = header + portfolioData + footer;

  console.log(html);
  await copyStylesheet();
  await copyImages();
}

async function loadTemplate(templateFileName) {
  const templateData = await fs.readFile(templateFileName, {
    encoding: "utf-8",
  });
  return templateData;
}

async function copyImages() {
  return new Promise((resolve, reject) => {
    exec(`cp -R ${imageDirectory} ${deployDirectory}`, (err, output) => {
      if (err) {
        reject(output);
      } else {
        resolve(true);
      }
    });
  });
}

async function copyStylesheet() {
  return new Promise((resolve, reject) => {
    exec(
      `cp -R ${stylesheetDirectory} ${deployDirectory}/${stylesheetDirectory}`,
      (err, output) => {
        if (err) {
          reject(output);
        } else {
          resolve(true);
        }
      }
    );
  });
}

createHtml();
