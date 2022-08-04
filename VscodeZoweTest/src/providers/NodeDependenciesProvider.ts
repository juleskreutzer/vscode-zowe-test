import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path'
import { Dependency, pathExists, getDependenciesInPackageJson } from '../util/';

export class NodeDependenciesProvider implements vscode.TreeDataProvider<Dependency> {

    constructor(private workspaceRoot: string) {}

    getTreeItem(element: Dependency): vscode.TreeItem {
        return element;
    }

    getChildren(element?: any): vscode.ProviderResult<Dependency[]> {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No dependency in empty workspace')
            return Promise.resolve([])
        }

        if (element) {
            Promise.resolve(
                getDependenciesInPackageJson(path.join(this.workspaceRoot, 'node_modules', element.label, 'package.json'), this.workspaceRoot)
            );
        } else {
            const packageJsonPath = path.join(this.workspaceRoot, 'package.json')
            if (pathExists(packageJsonPath)) {
                return Promise.resolve(getDependenciesInPackageJson(packageJsonPath, this.workspaceRoot))
            } else {
                vscode.window.showErrorMessage('Current workspace has no package.json file')
                return Promise.resolve([])
            }
        }
    }
}