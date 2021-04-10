const fs = require('fs');
const process = require('process');
const childProcess = require('child_process');

function forkServerProcess() {  
  const childP = childProcess.spawn('node', ['index.js']);
  console.log('server pid: ', childP.pid, '\n')
  childP.stdout.on('data', stdout => console.log(stdout.toString()))
  return childP;
}

let child = forkServerProcess();

fs.watchFile('index.js', (curr, prev) => {
  child.kill();
  console.log('killed!')
  console.log(`childProcess ${child.pid} killed`)
  child = forkServerProcess();
})

process.on('SIGINT', (sig) => {
  child.kill();
  console.log(`\nchildProcess ${child.pid} killed`)
  process.exit();
})
