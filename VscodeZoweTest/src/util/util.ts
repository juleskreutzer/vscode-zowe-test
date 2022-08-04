import * as fs from 'fs';
import * as vscode from 'vscode'
import * as path from 'path'
import { Dependency } from './dependency';

export function getDependenciesInPackageJson(packageJsonPath: string, workspaceRoot: string): Dependency[] {
    if (pathExists(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

        const toDependency = (moduleName: string, version: string): Dependency => {
            if (pathExists(path.join(workspaceRoot, 'node_modules', moduleName))) {
                return new Dependency(
                  moduleName,
                  version,
                  vscode.TreeItemCollapsibleState.Collapsed
                );
              } else {
                return new Dependency(moduleName, version, vscode.TreeItemCollapsibleState.None);
              }
        };

        const deps = packageJson.dependencies
        ? Object.keys(packageJson.dependencies).map(dep =>
            toDependency(dep, packageJson.dependencies[dep])
          )
        : [];

        const devDeps = packageJson.devDependencies
        ? Object.keys(packageJson.devDependencies).map(dep =>
            toDependency(dep, packageJson.devDependencies[dep])
          )
        : [];
        
        return deps.concat(devDeps)
    }
    else {
        return []
    }
}

export function pathExists(path: string): boolean {
    try {
        fs.accessSync(path)
        return true
    } catch(err) {
        console.log(err)
        return false
    }
}