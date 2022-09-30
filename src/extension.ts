// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('###################################################');
  // 小写转大写
  const toUpper = vscode.commands.registerCommand(
    'str-transform.toUpper',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      if (editor.selections?.length) {
        try {
          editor.edit((editBuilder: vscode.TextEditorEdit) => {
            editor.selections.forEach((selection: vscode.Selection) => {
              const text = editor.document.getText(selection);
              if (text) {
                const res = text.toUpperCase();
                editBuilder.replace(selection, res);
              }
            });
          });
        } catch (e) {
          console.log('toUpper error:', e);
        }
      }
    }
  );
  // 大写转小写
  const toLower = vscode.commands.registerCommand(
    'str-transform.toLower',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      if (editor.selections?.length) {
        try {
          editor.edit((editBuilder: vscode.TextEditorEdit) => {
            editor.selections.forEach((selection: vscode.Selection) => {
              const text = editor.document.getText(selection);
              if (text) {
                const res = text.toLowerCase();
                editBuilder.replace(selection, res);
              }
            });
          });
        } catch (e) {
          console.log('toLower error:', e);
        }
      }
    }
  );
  // 字符串转数字
  const toNumber = vscode.commands.registerCommand(
    'str-transform.toNumber',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      if (editor.selections?.length) {
        try {
          editor.edit((editBuilder: vscode.TextEditorEdit) => {
            editor.selections.forEach((selection: vscode.Selection) => {
              const text = editor.document.getText(selection);
              if (text) {
                const reg = /^[`|'|"](\d*\.?\d*)[`|'|"]$/;
                const res = text.replace(reg, '$1');
                if (isNaN(Number(res))) {
                  // 不能转数字，直接返回，不做处理
                  return;
                }
                editBuilder.replace(selection, res);
              }
            });
          });
        } catch (e) {
          console.log('toString error:', e);
        }
      }
    }
  );
  // 转成字符串
  const toString = vscode.commands.registerCommand(
    'str-transform.toString',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      if (editor.selections?.length) {
        try {
          editor.edit((editBuilder: vscode.TextEditorEdit) => {
            editor.selections.forEach((selection: vscode.Selection) => {
              const text = editor.document.getText(selection);
              if (text) {
                if (isNaN(Number(text))) {
                  // 不是数字，直接返回，不做处理
                  return;
                }
                editBuilder.replace(selection, `'${text}'`);
              }
            });
          });
        } catch (e) {
          console.log('toString error:', e);
        }
      }
    }
  );

  context.subscriptions.push(toUpper, toLower, toNumber, toString);
}

// this method is called when your extension is deactivated
export function deactivate() {}
