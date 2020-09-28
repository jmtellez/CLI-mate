const chalk = require("chalk");


const ascii = `

________      ___           ___                     _____ ______       ________      _________    _______      
|\\   ____\\    |\\  \\         |\\  \\                   |\\   _ \\  _   \\    |\\   __  \\    |\\___   ___\\ |\\  ___ \\     
\\ \\  \\___|    \\ \\  \\        \\ \\  \\    ____________  \\ \\  \\\\\\__\\ \\  \\   \\ \\  \\|\\  \\   \\|___ \\  \\_| \\ \\   __/|    
 \\ \\  \\        \\ \\  \\        \\ \\  \\  |\\____________\\ \\ \\  \\\\|__| \\  \\   \\ \\   __  \\       \\ \\  \\   \\ \\  \\_|/__  
  \\ \\  \\____    \\ \\  \\____    \\ \\  \\ \\|____________|  \\ \\  \\    \\ \\  \\   \\ \\  \\ \\  \\       \\ \\  \\   \\ \\  \\_|\\ \\ 
   \\ \\_______\\   \\ \\_______\\   \\ \\__\\                  \\ \\__\\    \\ \\__\\   \\ \\__\\ \\__\\       \\ \\__\\   \\ \\_______\\
    \\|_______|    \\|_______|    \\|__|                   \\|__|     \\|__|    \\|__|\\|__|        \\|__|    \\|_______|
                                                                                                                
       
`

const options = `

  Usage: cli-mate <location>

  where <location> is a city / place / address / airport code

  Eg:
    cli-mate McAllen

  Options:
    --help          Show help 
    --version       Show version number

`

const menu = ()=>{

  console.log(chalk.yellowBright(ascii));
  console.log(options);
}
module.exports = menu;

// --units         m - Metric / s - Scientific / f - Fahrenheit (default)