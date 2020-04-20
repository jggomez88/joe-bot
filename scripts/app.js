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
  let jokeArray = ['',''];

  bot.hear(/hi joebot/, function(res) {
    return res.send(`Fuck you, I was sleeping. Ask me "class/info" or "office-hours" or "joke" or "submit-joke".`);
  });
  bot.respond(/office-hours?/, function(res) {
    return res.send("Tues & Thurs 7:00pm - 8:00 pm && Sun 4:00pm - 6:00pm");
  });
  bot.respond(/joke?/, function(msg) {
    return msg.reply(`*Clean or *Dirty?`);
  });
  bot.hear(/\*(.*)/, function(res) {
    let type;
    type = res.match[1];
    if (type === 'Clean') {
      tellJoke('clean');
      res.send(jokeArray[0]);
      res.send('use *Answer')
    }
    if (type === 'Dirty') {
      tellJoke('dirty');
      res.send(jokeArray[0]);
      res.send('use *Answer')
    }
    if (type === 'Answer') {
      res.send(jokeArray[1]);
    }
  });
  bot.hear(/submit-joke/, function(res) {
    return res.send(`Use *newJoke {
        author: 'your name',
        type: 'clean OR dirty',
        intro: 'eg Why did the chicken cross the road?',
        punch: 'eg To get to the other side.',
        id: 'unique id to reference your joke'
      }
      \n Submit joke in an object literal. The "type", "intro", and "punch" fields are required.`
      );
  });
  bot.hear(/\*newJoke (.*)/, function(res) {
    let joke;
    joke = res.match[1];

    joke = JSON.stringify(joke);

    try {
      joke = JSON.parse(joke);

    } catch (error) {
      return res.send(error);
    }

    if (!joke.intro) {
      res.send(`Your joke needs an intro eg intro: "Why did the chicken cross the road.`)
    }

    if (!joke.punch) {
      res.send("Your joke needs a punch-line eg punch: 'To get to the other side.'")
    }

    if (!joke.type || joke.type != 'clean' || joke.type != 'dirty') {
      res.send("Your joke needs a type: 'clean' OR 'dirty'.")
    }

    if (joke.type && joke.punch && joke.intro) {
      submitJoke(joke);
      return res.send(`Thanks. It better be funny.`);
    } else {
      return res.send(`Joke not submitted. Jobot disappointed.`)
    }
  });

  bot.respond(/class\/(.*)/, function(msg) {
    var info;
    info = msg.match[1];
    switch (info) {
      case "info":
        return msg.reply(`Use class/ + "website", "zoom", "password", or "exit-ticket"`);
        break;
      case "password":
        return msg.reply(`Here's the password: \ngo_js18_go`);
        break;
      case "website":
        return msg.reply(`Here's the website: \nhttps://pages.git.generalassemb.ly/romebell/js18/pages/slackbot.html`);
        break;
      case "zoom":
        return msg.reply(`Here's the zoom link: \nhttps://generalassembly.zoom.us/j/475366947`);
        break;
      case "exit-ticket":
        return msg.reply(`Here's the exit ticket: \nhttps://forms.gle/x61cyVQMArx4GdjA6`);
        break;
      case "homework":
        return msg.reply(`Do you're homework: \nhttps://pages.git.generalassemb.ly/romebell/js18/pages/homework.html`);
        break;
      default:
        return msg.reply(`Use class/ + "website", "zoom", "password", or "exit-ticket"`);
    }
  });

  const cleanJokes = [
    {
      intro: "Why did the hippie drown?",
      punch: "He was too far out man.",
    },
    {
      intro: "What concert costs just 45 cents?",
      punch: "50 Cent with Nickelback.",
    },
    {
      intro: "I bought some shoes from a drug dealer...",
      punch: "I don’t know what he laced them with, but I was trippin all day."
    }
  ]

  const dirtyJokes = [
    {
      intro: "What did Cinderella do when she got to the ball?",
      punch: "She gagged."
    },
    {
      intro: "Why does Dr. Pepper come in a bottle?",
      punch: "Because his wife died."
    },
    {
      intro: "What do you call a Czechoslovakian abortion?",
      punch: "A cancelled Check."
    }
  ]

  
  // Submit joke example

  // `{
  //   "yourName": 'your name',
  //   "type": 'clean or dirty',
  //   "intro": 'intro',
  //   "punch": 'the punchline',
  //   "id": 'unique id to reference your joke'
  // }`

  let cleanCount = 0
  let dirtyCount = 0

  const tellJoke = (jokeType) => {

    cleanCount === cleanJokes.length ? cleanCount = 0 : cleanCount;
    dirtyCount === dirtyJokes.length ? dirtyCount = 0 : dirtyCount;

    if (jokeType === 'clean') {
      let intro = cleanJokes[cleanCount].intro
      let punch = cleanJokes[cleanCount].punch

      jokeArray.splice(0,2,intro,punch)
      cleanCount++
    }

    if (jokeType === 'dirty') {
      let intro = dirtyJokes[dirtyCount].intro
      let punch = dirtyJokes[dirtyCount].punch

      jokeArray.splice(0,2,intro,punch);
      dirtyCount++
    }
  }

  const submitJoke = (joke) => {
    if (joke.type === 'clean') {
      cleanJokes.push(joke);
      cleanCount = 0;
    }

    if (joke.type === 'dirty') {
      dirtyJokes.unshift(joke);
      dirtyCount = 0;
    }
  }
  
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