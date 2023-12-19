import fs from "fs-extra";
import { argv } from "node:process";
import { exec } from "node:child_process"
import * as readline from "readline";

function async_counter() {
  fs.readFile(
    "/home/jwarchol/ProgramowanieSkryptowe/lab10/src/counter",
    "utf-8",
    function (err, data) {
      let cnt = Number(data) + 1;
      if (isNaN(cnt)) {
        cnt = 1;
      }
      console.log(`Liczba uruchomień: ${cnt}`);
      fs.writeFile(
        "/home/jwarchol/ProgramowanieSkryptowe/lab10/src/counter",
        `${cnt}`
      );
    }
  );
}
function sync_counter() {
  let cnt;
  cnt =
    Number(
      fs.readFileSync("/home/jwarchol/ProgramowanieSkryptowe/lab10/src/counter")
    ) + 1;
  if (isNaN(cnt)) {
    cnt = 1;
  }
  console.log(`Liczba uruchomień: ${cnt}`);
  fs.writeFileSync(
    "/home/jwarchol/ProgramowanieSkryptowe/lab10/src/counter",
    `${cnt}`
  );
}

function sys_cmd(){
    return new Promise(function() {
        let rl = readline.createInterface(process.stdin, process.stdout)
        rl.on('line', function(line) {
            exec(`${line}`, (err, output) => {
                if (err) {
                  console.error("could not execute command: ", err);
                  return;
                }
                console.log(output)
            })
        }).on('close', () => {
            rl.close()
        })
    })
}

async function run(){
    try {
        let sys_result = await sys_cmd()
        console.log(sys_result)
    }
    catch (e) {
        console.log('Failed: ', e)
    }
}

if (process.argv.length === 3) {
  if (process.argv[2] === "--sync") {
    sync_counter();
  } else if (process.argv[2] === "--async") {
    async_counter();
  } else {
    throw new Error("Nieznany argument.");
  }
} else if (process.argv.length === 2) {
  run();
}
