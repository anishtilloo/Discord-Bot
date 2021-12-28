const Discord = require('discord.js');

const { Client, Intents } = require('discord.js');


const client = new Discord.Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.on('ready', () => {
    console.log("Connected as " + client.user.tag);

    client.user.setActivity("Netflix", {type: "WATCHING"});

    client.guilds.cache.forEach((guild) => {
        console.log(guild.name);
        guild.channels.cache.forEach((channel) => {
            console.log(` -${channel.name} ${channel.type} ${channel.id}`);
        });
    });
    // General channel id 925339321593102348

    let generalChannel = client.channels.cache.get("925339321593102348");
    const attachment = new Discord.MessageAttachment("https://cdnb.artstation.com/p/assets/images/images/035/214/141/large/marcos-emilio-trafalgar-law-2.jpg?1614376282");
    generalChannel.send({files: [attachment]})
});

client.on('messageCreate', (recivedMessage) => {
    if (recivedMessage.author === client.user) {
        return;
    }
    recivedMessage.channel.send("Message Recived, " + recivedMessage.author.toString() + ": " + recivedMessage.content);
    
    recivedMessage.react("👍");
    
    let customEmoji = recivedMessage.guild.emojis.cache.get("925363750574391296");
    recivedMessage.react(customEmoji);

    if (recivedMessage.content.startsWith("!")) {
        processCommand(recivedMessage);
    }
});

function processCommand(recivedMessage) {
    let fullCommand = recivedMessage.content.substr(1);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let arguments = splitCommand.slice(1);
    
    if (primaryCommand === "help") {
        helpCommand(arguments, recivedMessage);
    } else if (primaryCommand === "multiply") {
        multiplyCommand(arguments, recivedMessage);
    } else {
        recivedMessage.channel.send("Unknown Command. Try `!help` or `!multiply`");
    }
}

function helpCommand(arguments, recivedMessage) {
     if (arguments.length === 0) {
        recivedMessage.channel.send("I am not sure what you need help with. Try `!help [topics]`");
    } else {
        recivedMessage.channel.send("It looks like you need help with " + arguments);
    }
}

function multiplyCommand(arguments, recivedMessage) {
    if (arguments.length < 2) {
        recivedMessage.channel.send("Not enough arguments. Try `!multiply 2 10`");
        return;
    } 
    let product = 1;
    arguments.forEach((value) => {
        product = product * parseFloat(value);
    });
    recivedMessage.channel.send("The Product of " + arguments + " is " + product.toString());
}

client.login("OTI1MzM5ODU4OTQ2MzU5MzE3.Ycrr5g.aRG3477_WBQndUt6JpG37qGp9aE");
