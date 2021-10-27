const { exec } = require('child_process');
const { book } = require('./json/data.json');

async function addBooks(params) {
  for (let index = 0; index < book.length; index++) {
    let temp = book[index];
    await exec(
      `near call mindy11.testnet add_book '{"book":${JSON.stringify(
        temp
      )}}' --account-id mindy11.testnet`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
  }
}

addBooks();
