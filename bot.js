const { exec } = require("child_process");
const fs = require('fs');
const { Client, Intents } = require('discord.js');
const { REPL_MODE_SLOPPY } = require("repl");
const { setInterval } = require("timers");
const { strictEqual } = require("assert");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
token = "YOUR TOKEN";

const Parsage = 500;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.channels.fetch("196258540065652736").then(channel => {
    channel.send("OUI tkt je marche");
  });

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
      async function (error, stdout, stderr) {
        console.log(String(error));

        if(error) {
          message.reply(String(error));
        }
        else if(stdout != "") {
          if(stdout.length < 2000) {
            message.channel.send(stdout);
          }
          else {
            fs.appendFile('FichierTampon.txt', stdout, function (err) {
            });

            message.channel.send({
              files: ['./FichierTampon.txt']
            });

            exec("del /f FichierTampon.txt");
          }
        }

       exec("del /f FichierTampon.py");
       console.log("fichier supprime");

      }
    );
  };

});

client.login(token);