import DomNode from "../lib/DomNode.js";

export default class Layout {
  constructor(
    private title: string,
    private index: string,
    private content: DomNode,
  ) {}

  public build() {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">
        <title>${this.title}</title>
        <link rel="stylesheet" type="text/css" href="/bundle.css" />
    </head>
    
    <body>
        <div class="layout">
            <header>
                <button class="doc-index-button">
                    <img src="/images/index-button.png" />
                    Index
                </button>
            </header>
            <main>
                <div class="doc-index">
                    ${this.index}
                </div>
                <div class="doc-wrapper">
                    ${this.content.build()}
                </div>
            </main>
        </div>
        <script src="/bundle.js"></script>
    </body>
    
    </html>`;
  }
}
