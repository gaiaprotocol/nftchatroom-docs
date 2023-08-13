import TreeNode from "./TreeNode.js";

export interface Attributes {
    [name: string]: string | number | boolean | undefined;
}

export class TextNode extends TreeNode {
    constructor(public text: string) {
        super();
    }

    public build(): string {
        return this.text;
    }
}

export default class DomNode extends TreeNode {

    declare public parent: DomNode | undefined;
    public children: DomNode[] = [];

    private attributes: Attributes = {};
    private _classes = "";

    constructor(private tag: string) {
        super();
    }

    public appendText(text: string): this {
        if (this.tag.indexOf("textarea") !== -1) {
            this.append(new TextNode(text));
        } else {
            const strs = text.split("\n");
            for (const [index, str] of strs.entries()) {
                if (index > 0) {
                    this.append(new TextNode("<br>"));
                }
                this.append(new TextNode(str));
            }
        }
        return this;
    }

    public set text(text: string) {
        this.empty().appendText(text);
    }

    public append(...nodes: (TreeNode | string | undefined)[]): this {
        for (const node of nodes) {
            if (typeof node === "string") {
                this.appendText(node);
            } else if (node !== undefined) {
                node.appendTo(this);
            }
        }
        return this;
    }

    public addClass(className: string): void {
        if (!this.hasClass(className)) {
            this._classes += ` ${className}`;
        }
    }

    public deleteClass(className: string): void {
        let classesArray = this._classes.split(' ');
        classesArray = classesArray.filter(classItem => classItem !== className);
        this._classes = classesArray.join(' ');
    }

    public hasClass(className: string): boolean {
        const classesArray = this._classes.split(' ');
        return classesArray.includes(className);
    }

    public setAttribute(name: string, value: string | number | boolean | undefined): void {
        this.attributes[name] = value;
    }

    public removeAttribute(name: string): void {
        delete this.attributes[name];
    }

    public clone() {
        const dom = new DomNode(this.tag);
        dom.attributes = structuredClone(this.attributes);
        dom._classes = this._classes;
        for (const child of this.children) {
            dom.append(child.clone());
        }
        return dom;
    }

    public build(): string {
        let tag = this.tag;

        let id: string | undefined;
        const idIndex = tag.indexOf("#");
        if (idIndex !== -1) {
            id = tag.substring(idIndex + 1);
            tag = tag.substring(0, idIndex);

            const cindex = id.indexOf(".");
            if (cindex !== -1) {
                tag += id.substring(cindex);
                id = id.substring(0, cindex);
            }
        }

        let className: string | undefined = this._classes === "" ? undefined : this._classes;
        const classNameIndex = tag.indexOf(".");
        if (classNameIndex !== -1) {
            className = tag.substring(classNameIndex + 1).replace(/\./g, " ");
            tag = tag.substring(0, classNameIndex);
        }

        if (tag === "") {
            tag = "div";
        }

        let html = `<${tag}`;
        if (id !== undefined) { html += ` id="${id}"`; }
        if (className !== undefined) { html += ` class="${className}"`; }

        for (const [name, value] of Object.entries(this.attributes)) {
            html += ` ${name}="${value}"`;
        }
        html += ">"
        for (const child of this.children) {
            html += child.build();
        }
        html += `</${tag}>`;
        return html;
    }
}