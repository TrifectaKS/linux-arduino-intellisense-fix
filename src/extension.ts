import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('Linux Arduino Intellisense Fix Extension Activated!');

    const disposable = vscode.commands.registerCommand('linux-arduino-intellisense-fix.updateIncludePath', () => {
        // Step 1: Get the workspace folder
        const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : '';
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found!');
            return;
        }

        // Step 2: Find the .vscode/c_cpp_properties.json file
        const cppPropertiesPath = path.join(workspaceFolder, '.vscode', 'c_cpp_properties.json');
        
        // Check if the file exists
        if (!fs.existsSync(cppPropertiesPath)) {
            vscode.window.showErrorMessage('.vscode/c_cpp_properties.json not found!');
            return;
        }

        // Step 3: Read the c_cpp_properties.json file
        const cppProperties = JSON.parse(fs.readFileSync(cppPropertiesPath, 'utf8'));

        // Step 4: Retrieve the 'additional-include-path' setting
        const additionalIncludePath = vscode.workspace.getConfiguration('linux-arduino-intellisense-fix').get<string>('additional_include_path');
        if (!additionalIncludePath) {
            vscode.window.showErrorMessage('No additional include paths found in settings!');
            return;
        }

        // Split the additional include paths into an array (handle multiple lines)
        const pathsToAdd = additionalIncludePath.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        // Step 5: Update includePath in c_cpp_properties.json
        const configurations = cppProperties.configurations || [];
        for (const config of configurations) {
            if (Array.isArray(config.includePath)) {
                config.includePath.push(...pathsToAdd);
				config.includePath.push("${workspaceFolder}/**");
            }
        }

        // Step 6: Write the updated c_cpp_properties.json file back
        fs.writeFileSync(cppPropertiesPath, JSON.stringify(cppProperties, null, 4), 'utf8');
        
        vscode.window.showInformationMessage('Include paths updated in c_cpp_properties.json!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
