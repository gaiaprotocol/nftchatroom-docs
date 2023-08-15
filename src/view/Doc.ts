import { marked } from "marked";
import DomNode, { TextNode } from "../lib/DomNode.js";

export default class Doc extends DomNode {
  constructor(markdown: string) {
    super(".doc-view.markdown-body");
    this.append(
      new TextNode(
        marked.parse(
          markdown.replace(/\]\((.*?)\.md\)/g, (_match, url) => `](${url})`),
        ).replace(/\<a/g, '<a target="_blank"'),
      ),
    );
  }
}
