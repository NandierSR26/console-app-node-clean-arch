import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs( process.argv )
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Multiplication table base'
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Multiplicación table limit'
  })
  .option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show multiplication table'
  })
  .check(( argv, options ) => {
    if(argv.b < 1) throw "El valor de la base debe ser mayor a cero"
    return true;
  })
  .parseSync()