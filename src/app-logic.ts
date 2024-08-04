import { mkdirSync, writeFileSync } from "fs";
import { yarg } from "./config/plugins/args.plugin";

const { b: base, l: limit, s: showTable  } = yarg

let outputMessage = "";
const headerMessage = `
=====================================
        Tabla del ${base}
=====================================\n
`;

outputMessage += headerMessage;

for (let i = 1; i <= limit; i++) {
  outputMessage += `${base} x ${i} = ${base * i} \n`;
}

if(showTable) console.log(outputMessage);

const outputPath = "outputs";

mkdirSync(outputPath, { recursive: true });
writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);

console.log("File created!");
