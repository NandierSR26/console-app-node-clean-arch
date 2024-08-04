import { mkdirSync, writeFileSync } from "fs";

let outputMessage = "";
const base = 5;
const headerMessage = `
=====================================
        Tabla del ${base}
=====================================\n
`;

outputMessage += headerMessage;

for (let i = 1; i <= 10; i++) {
  outputMessage += `${base} x ${i} = ${base * i} \n`;
}
console.log(outputMessage);

const outputPath = "outputs";

mkdirSync(outputPath, { recursive: true });
writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);

console.log("File created!");
