# linux-arduino-intellisense-fix README

For some reason, I couldn't get the intellisense for Arduino development with C/C++ to work on Linux. It was throwing include path errors.

## Features
Appends the `linux-arduino-intellisense-fix.additional_include_path` setting (and more if split by new line) to the include path array in .vscode/c_cpp_properties.json

## Extension Settings

This extension contributes the following settings:

* `linux-arduino-intellisense-fix.additional_include_path`: Specifies the additional includePath to add to .vscode/c_cpp_properties.json

## Following extension guidelines

Command name to run: Linux Arduino Intellisense Fix

**Enjoy!**
