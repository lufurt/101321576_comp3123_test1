const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const logDirPath = path.join(__dirname, 'Logs');
const originalDir = process.cwd(); // Store the original working directory

function createLogFiles() {
    // Creating Logs directory and files
    if (!fs.existsSync(logDirPath)) {
        fs.mkdirSync(logDirPath);
    }

    // Changing the current process to the Logs directory
    process.chdir(logDirPath);

    // Creating 10 log files
    for (let i = 0; i < 10; i++) {
        const fileName = `log${i}.txt`;
        fs.writeFileSync(fileName, `This is log file ${i}`);
        console.log(fileName);
    }
    
    // Change back to the original directory
    process.chdir(originalDir);
}

function removeLogFiles() {
    // Changing the current process to the Logs directory
    process.chdir(logDirPath);

    // Removing files and Logs directory
    if (fs.existsSync(logDirPath)) {
        const files = fs.readdirSync(logDirPath);
        files.forEach(file => {
            console.log('delete files...' + file);
            fs.unlinkSync(path.join(logDirPath, file));
        });
        fs.rmdirSync(logDirPath);
    } else {
        console.log('Logs directory does not exist.');
    }

    // Change back to the original directory
    process.chdir(originalDir);
}

console.log('--- Creating Log Files ---');
createLogFiles();

console.log('\n--- Removing Log Files ---');
removeLogFiles();
