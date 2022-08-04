"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.logger = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
const zowe_explorer_api_1 = require("@zowe/zowe-explorer-api");
const NodeDependenciesProvider_1 = require("./providers/NodeDependenciesProvider");
exports.logger = new zowe_explorer_api_1.IZoweLogger("Zowe Explorer Test extension", path.join(__dirname, "..", ".."));
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
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
exports.activate = activate;
async function bootstrapper() {
    const zoweExplorerApi = zowe_explorer_api_1.ZoweVsCodeExtension.getZoweExplorerApi('2.2.0');
    if (zoweExplorerApi) {
        zowe_explorer_api_1.ZoweVsCodeExtension.showVsCodeMessage("Zowe Explorer test extension has loaded", zowe_explorer_api_1.MessageSeverityEnum.INFO, exports.logger);
        vscode.workspace.updateWorkspaceFolders(0, 0, { uri: vscode.Uri.parse('/Users/juleskreutzer/Git/vscode-zowe-test/VscodeZoweTest') });
        const workspacePath = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders?.length > 0 ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
        vscode.window.registerTreeDataProvider('zowetest.testa.explorer', new NodeDependenciesProvider_1.NodeDependenciesProvider(workspacePath));
        vscode.window.createTreeView('zowetest.testa.explorer', {
            treeDataProvider: new NodeDependenciesProvider_1.NodeDependenciesProvider(workspacePath)
        });
        zowe_explorer_api_1.ZoweVsCodeExtension.showVsCodeMessage("Check Node Dependencies view in explorer", zowe_explorer_api_1.MessageSeverityEnum.INFO, exports.logger);
        return true;
    }
    zowe_explorer_api_1.ZoweVsCodeExtension.showVsCodeMessage("Unable to load Zowe Explorer API's", zowe_explorer_api_1.MessageSeverityEnum.FATAL, exports.logger);
    return false;
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map