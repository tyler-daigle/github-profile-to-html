const { exec } = require("child_process");

const fs = require("fs/promises");
const fsOld = require("fs");
const showdown = require("showdown");
const deployDirectory = "./dist";
const stylesheetDirectory = "./styles";
const imageDirectory = "./images";
const outputFileName = "index.html";

createHtml();

async function createHtml() {
  // clean dist up first or create it if it doesn't exist

  if (fsOld.existsSync("./dist")) {
    await cleanDist();
  } else {
    await createDist();
  }

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

// DANGER!!!

async function cleanDist() {
  return new Promise((resolve, reject) => {
    exec("rm -rf dist", (err) => {
      if (!err) {
        exec("mkdir dist", (err) => {
          if (!err) {
            resolve("Directory Cleaned");
          }
        });
      } else {
        reject("Error removing dist directory");
      }
    });
  });
}

async function createDist() {
  return new Promise((resolve, reject) => {
    exec("mkdir dist", (err) => {
      if (!err) {
        resolve("Created dist directory");
      } else {
        reject("Error creating dist diretory");
      }
    });
  });
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
