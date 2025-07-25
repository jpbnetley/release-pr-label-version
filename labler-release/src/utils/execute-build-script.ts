export function executeBuildScript(script: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const childProcess = require('child_process');
    childProcess.exec(script, (error: Error | null) => {
      if (error) {
        reject(`Error executing script: ${error.message}`);
      } else {
        resolve();
      }
    });
  });
}