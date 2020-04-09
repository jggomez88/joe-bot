// Description:
//
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//

module.exports = function(bot) {
  bot.hear(/hello/, function(res) {
    return res.send("Fuck you");
  });
  bot.respond(/office hours?/, function(res) {
    return res.send("Tues & Thurs 7:00pm - 8:00 pm && Sun 4:00pm - 6:00pm");
  });
  bot.respond(/class (.*)/, function(msg) {
    var info;
    info = msg.match[1];
    console.log(info);
    switch (info) {
      case "website":
        return msg.reply("https://pages.git.generalassemb.ly/romebell/js18/pages/slackbot.html");
        break;
      case "zoom":
        return msg.reply("https://generalassembly.zoom.us/j/475366947");
        break;
      case "exit ticket":
        return msg.reply("https://forms.gle/x61cyVQMArx4GdjA6");
        break;
      case "homework":
        return msg.reply("https://pages.git.generalassemb.ly/romebell/js18/pages/homework.html");
        break;
      default:
        return msg.reply(`Request "website", "zoom", or "exit ticket"`);
    }
  });
  
}


  // bot.hear(/info/, function(res) {
  //   return bot.http("https://pages.git.generalassemb.ly/romebell/js18/index.html")
  //   .timeout(2000)
  //   .get() (err, response, body)
  // });
  
  /************************************
  EXAMPLES OF THE KEY HUBOT FUNCTIONS
  ************************************/
  
  /* Variables for random example */
  
  // const squirrels = ["http://img.skitch.com/20100714-d6q52xajfh4cimxr3888yb77ru.jpg", "https://img.skitch.com/20111026-r2wsngtu4jftwxmsytdke6arwd.png", "http://cl.ly/1i0s1r3t2s2G3P1N3t3M/Screen_Shot_2011-10-27_at_9.36.45_AM.png", "http://shipitsquirrel.github.com/images/squirrel.png"];
  
  // module.exports = function(robot) {
  //   /* Basic example of respond / send. If the user enters hi or hello the bot responds "Howdy!" */
  //   return robot.respond(/hi|hello/i, function(msg) {
  //     return msg.send("Howdy!");
  //   });
  
  //   /* Random Example
  //   If a user enters 'ship it' we return a random squirrel, which is popular for symbolizing shipping something with engineers */
  //   return robot.hear(/ship it/i, function(msg) {
  //     return msg.send(msg.random(squirrels));
  //   });
  // };