"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependency = void 0;
const vscode = require("vscode");
const path = require("path");
class Dependency extends vscode.TreeItem {
    constructor(label, version, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.version = version;
        this.collapsibleState = collapsibleState;
        this.iconPath = {
            light: path.join(__filename, '..', '..', 'resources', 'light', 'download.svg'),
            dark: path.join(__filename, '..', '..', 'resources', 'dark', 'download.svg')
        };
        this.tooltip = `${this.label}-${this.version}`;
        this.description = this.version;
    }
}
exports.Dependency = Dependency;
//# sourceMappingURL=dependency.js.map