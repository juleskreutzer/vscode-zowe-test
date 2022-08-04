"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeDependenciesProvider = void 0;
const vscode = require("vscode");
const path = require("path");
const util_1 = require("../util/");
class NodeDependenciesProvider {
    constructor(workspaceRoot) {
        this.workspaceRoot = workspaceRoot;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No dependency in empty workspace');
            return Promise.resolve([]);
        }
        if (element) {
            Promise.resolve((0, util_1.getDependenciesInPackageJson)(path.join(this.workspaceRoot, 'node_modules', element.label, 'package.json'), this.workspaceRoot));
        }
        else {
            const packageJsonPath = path.join(this.workspaceRoot, 'package.json');
            if ((0, util_1.pathExists)(packageJsonPath)) {
                return Promise.resolve((0, util_1.getDependenciesInPackageJson)(packageJsonPath, this.workspaceRoot));
            }
            else {
                vscode.window.showErrorMessage('Current workspace has no package.json file');
                return Promise.resolve([]);
            }
        }
    }
}
exports.NodeDependenciesProvider = NodeDependenciesProvider;
//# sourceMappingURL=NodeDependenciesProvider.js.map