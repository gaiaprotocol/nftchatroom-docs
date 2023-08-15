import { parse, stringify } from "himalaya";
import { marked } from "marked";
import * as Path from "path";
import FileUtil from "./lib/FileUtil.js";
import Doc from "./view/Doc.js";
import Layout from "./view/Layout.js";

function liToHTML(children: any[]): string {
  let html = "";
  for (const li of children) {
    if (li.tagName === "li") {
      html += "<li>";
      let summary = "";
      for (const c of li.children) {
        if (c.type === "text") {
          summary = c.content;
        } else if (c.tagName === "a") {
          html += stringify([c]);
        } else if (c.tagName === "ul") {
          html += '<details open="open">';
          html += `<summary>${summary}</summary>`;
          html += `<ul>${liToHTML(c.children)}</ul>`;
          html += "</details>";
        }
      }
      html += "</li>";
    }
  }
  return html;
}

export default async function generate() {
  const docs = await FileUtil.getAllFiles("./docs");

  let index = await FileUtil.readText("./docs/index.md");
  index = index.replace(
    /\]\((.*?)\.md\)/g,
    (_match, url) => `](/${url === "introduction" ? "" : url})`,
  );
  const indexContent = `<ul>${
    liToHTML((parse(marked(index))[0] as any).children)
  }</ul>`;

  for (const file of docs) {
    const filePath = Path.parse(file);
    const fileName = filePath.name;
    if (fileName === "index" || Path.extname(file) !== ".md") continue;

    const markdown = await FileUtil.readText(file);
    const titleLine = markdown.split("\n").find((line) => line.startsWith("#"));
    const title = titleLine
      ? (titleLine.slice(1).trim() + " - NFTChatRoom.com Docs")
      : "NFTChatRoom.com Docs";
    const outputFileName = fileName === "introduction"
      ? "index.html"
      : `${fileName}.html`;
    const outputPath = `public/${filePath.dir.substring("docs/".length)}`;

    await FileUtil.write(
      `${outputPath}/${outputFileName}`,
      new Layout(title ?? "", indexContent, new Doc(markdown)).build(),
    );
  }
}
