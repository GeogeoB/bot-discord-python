const { exec } = require("child_process");
const fs = require('fs');
const { Client, Intents } = require('discord.js');
const { REPL_MODE_SLOPPY } = require("repl");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
token = "YOUR TOKEN";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
  //console.log(message.author.username + " : " + message.content);
  if (message.content[0] == '$' && message.content[message.content.length - 1] == '$') {
    Python_msg = message.content.slice(1,message.content.length - 1);
    fs.appendFile('FichierTampon.py', Python_msg, function (err) {
      if (err) throw err;
      console.log('Fichier créé !');
   });

   console.log(Python_msg);

    exec("python3 FichierTampon.py",
      function (error, stdout, stderr) {
        console.log(String(error));

        if(error) {
          message.reply(String(error));
        }
        else if(stdout != "") {
          message.reply(stdout);
        }

       exec("del /f FichierTampon.py");
       console.log("fichier supprime");

      }
    );
  };

});

client.login(token);