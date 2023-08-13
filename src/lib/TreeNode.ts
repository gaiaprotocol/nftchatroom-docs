import ArrayUtil from "./ArrayUtil.js";

export default class TreeNode {
  public parent: TreeNode | undefined;
  protected children: TreeNode[] = [];

  public append(...nodes: (TreeNode | undefined)[]): this {
    for (const node of nodes) {
      if (node !== undefined) {
        node.appendTo(this);
      }
    }
    return this;
  }

  public appendTo(node: TreeNode, index?: number): this {
    if (
      this.parent === node && index !== undefined &&
      this.parent.children.indexOf(this) < index
    ) {
      index -= 1;
    }
    this.exceptFromParent();
    if (index !== undefined && index < node.children.length) {
      node.children.splice(index, 0, this);
    } else {
      node.children.push(this);
    }
    this.parent = node;
    return this;
  }

  protected exceptFromParent(): void {
    if (this.parent !== undefined) {
      ArrayUtil.pull(this.parent.children, this);
      this.parent = undefined;
    }
  }

  public empty(): this {
    const copy = [];
    for (const child of this.children) copy.push(child);
    for (const child of copy) child.delete();
    return this;
  }

  public checkChild(target: TreeNode): boolean {
    for (const child of this.children) {
      if (child === target || child.checkChild(target) === true) {
        return true;
      }
    }
    return false;
  }

  public delete(): void {
    this.exceptFromParent();
    this.empty();
    (this.children as unknown) = undefined;
  }
}
