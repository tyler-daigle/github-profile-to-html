const fs = require("fs/promises");
const showdown = require("showdown");

// const md = `
// ![linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
// `;

// const html = converter.makeHtml(md);
// console.log(html);

async function createHtml() {
  const converter = new showdown.Converter();
  converter.setOption("noHeaderId", true);
  const data = await fs.readFile("portfolio.md", { encoding: "utf-8" });
  const portfolioData = converter.makeHtml(data);

  const header = await loadTemplate("./templates/header.template");
  const footer = await loadTemplate("./templates/footer.template");
  const html = header + portfolioData + footer;

  console.log(html);
}

async function loadTemplate(templateFileName) {
  const templateData = await fs.readFile(templateFileName, {
    encoding: "utf-8",
  });
  return templateData;
}
createHtml();
