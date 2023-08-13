import DomNode, { Attributes, TextNode } from "./DomNode.js";

export type Child = Attributes | DomNode | TextNode | string | undefined;

const el: (tag: string, ...children: Child[]) => DomNode = (tag: string, ...children: Child[]) => {
    const domNode = new DomNode(tag);
    for (const child of children) {
        if (typeof child === "string") {
            domNode.appendText(child);
        } else if (child instanceof DomNode || child instanceof TextNode) {
            domNode.append(child);
        } else if (typeof child === "object") {
            for (const [name, value] of Object.entries(child)) {
                if (value) {
                    domNode.setAttribute(name, value);
                }
            }
        }
    }
    return domNode;
};

export default el;
