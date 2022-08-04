// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path'
import { ZoweVsCodeExtension, MessageSeverityEnum, IZoweLogger } from "@zowe/zowe-explorer-api";
import { NodeDependenciesProvider } from './providers/NodeDependenciesProvider';

export const logger = new IZoweLogger("Zowe Explorer Test extension", path.join(__dirname, "..", ".."));

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	void bootstrapper();
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "VscodeZoweTest" is now active!');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('VscodeZoweTest.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from VscodeZoweTest!');
	// });

	// context.subscriptions.push(disposable);
}

async function bootstrapper(): Promise<Boolean> {
	const zoweExplorerApi = ZoweVsCodeExtension.getZoweExplorerApi('2.2.0')

	if (zoweExplorerApi) {
		ZoweVsCodeExtension.showVsCodeMessage("Zowe Explorer test extension has loaded", MessageSeverityEnum.INFO, logger)

		vscode.workspace.updateWorkspaceFolders(0,0,{uri: vscode.Uri.parse('/Users/juleskreutzer/Git/vscode-zowe-test/VscodeZoweTest')})
		const workspacePath = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders?.length > 0 ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined
		vscode.window.registerTreeDataProvider('zowetest.testa.explorer', new NodeDependenciesProvider(workspacePath!))
		vscode.window.createTreeView('zowetest.testa.explorer', {
			treeDataProvider: new NodeDependenciesProvider(workspacePath!)
		});

		ZoweVsCodeExtension.showVsCodeMessage("Check Node Dependencies view in explorer", MessageSeverityEnum.INFO, logger)

		return true
	}

	ZoweVsCodeExtension.showVsCodeMessage("Unable to load Zowe Explorer API's", MessageSeverityEnum.FATAL, logger)
	return false

}


// this method is called when your extension is deactivated
export function deactivate() {}
