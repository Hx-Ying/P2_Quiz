
const readline = require('readline');

const figlet = require('figlet');
const chalk = require('chalk');

//Importo los modulos que he creado yo
const model = require('./model');
const {log, biglog, errorlog, colorize} = require('./out');
const cmds = require('./cmds');

biglog('CORE Quiz', 'green');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: colorize("quiz > ", 'blue'),
  completer: (line) => {
    const completions = 'h help add delete edit list test p play credits q quit'.split(" ");
    const hits = completions.filter((c) => c.startsWith(line));
    return [hits.length ? hits: completions, line];
  }
});

rl.prompt();

rl
.on('line', (line) => {

  let args = line.split(" ");
  let cmd = args[0].toLowerCase().trim();
  let idPregunta = args[1];
  
  switch (cmd) {
    case'':
      rl.prompt();
      break;

    case 'h':
    case 'help':
      cmds.helpCmd(rl);
      break;
      
    case 'quit':
    case 'q':
      cmds.quitCmd(rl);
      break;
      
    case "add":
      cmds.addCmd(rl);
      break;

    case 'list':
      cmds.listCmd(rl);
      break;

    case 'show':
      cmds.showCmd(rl, idPregunta);
      break;

    case 'test':
      cmds.testCmd(rl, idPregunta);
      break;

    case 'p':
    case 'play':
      cmds.playCmd(rl);
      break;

    case 'delete':
      cmds.deleteCmd(rl, idPregunta);
      break;

    case 'edit':
      cmds.editCmd(rl, idPregunta);
      break;

    case 'credits':
      cmds.creditsCmd(rl);
      break;

    default:
      log(`Comando desconocido: '${colorize(cmd, 'red')}'`);
      console.log(`Use ${colorize('help', 'green')} para ver todos los comandos disponibles.`);
      rl.prompt();
      break;
  }
  
})
.on('close', () => {
  console.log('Adios!');
  process.exit(0);
});

