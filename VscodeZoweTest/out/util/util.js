"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathExists = exports.getDependenciesInPackageJson = void 0;
const fs = require("fs");
const vscode = require("vscode");
const path = require("path");
const dependency_1 = require("./dependency");
function getDependenciesInPackageJson(packageJsonPath, workspaceRoot) {
    if (pathExists(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        const toDependency = (moduleName, version) => {
            if (pathExists(path.join(workspaceRoot, 'node_modules', moduleName))) {
                return new dependency_1.Dependency(moduleName, version, vscode.TreeItemCollapsibleState.Collapsed);
            }
            else {
                return new dependency_1.Dependency(moduleName, version, vscode.TreeItemCollapsibleState.None);
            }
        };
        const deps = packageJson.dependencies
            ? Object.keys(packageJson.dependencies).map(dep => toDependency(dep, packageJson.dependencies[dep]))
            : [];
        const devDeps = packageJson.devDependencies
            ? Object.keys(packageJson.devDependencies).map(dep => toDependency(dep, packageJson.devDependencies[dep]))
            : [];
        return deps.concat(devDeps);
    }
    else {
        return [];
    }
}
exports.getDependenciesInPackageJson = getDependenciesInPackageJson;
function pathExists(path) {
    try {
        fs.accessSync(path);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
exports.pathExists = pathExists;
//# sourceMappingURL=util.js.map