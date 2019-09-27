var express = require('express');
var path = require('path');
var expressHbs=require('express-handlebars')
let mongoose = require('mongoose');
var http = require("http");
//var bodyParser = require('body-parser');



const CONNECTION_URL=process.env.MONGODB_URI || "mongodb://localhost/chexx"


setInterval(function() {
    http.get("https://chexx.herokuapp.com");
}, 300000);// every 5 minutes (300000)


mongoose.Promise = require('bluebird');
const Users = require('./modules/users');
const helper = require('./routes/helper');
const TelegramBot = require('node-telegram-bot-api');


//var index = require('./routes/index');
var local = require('./routes/local');
var app = express();


var port=process.env.PORT || 8000


// database connection
mongoose.connect(CONNECTION_URL);
let db=mongoose.connection;
db.once('open',function(){
  console.log("connected");
});
db.on('error',function(err) {
     console.log(err);
});


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.engine('.hbs',expressHbs({defaultLayout:'layout', extname:'.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/local', local);






function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};

/**
 * Checks if the given string is a checksummed addressas
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isChecksumAddress = function (address) {
    // Check each case
    address = address.replace('0x','');
    var addressHash = sha3(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};

// <i>italic</i>, <em>italic</em>
// <a href="http://www.example.com/">inline URL</a>
// <code>inline fixed-width code</code>
// <pre>pre-formatted fixed-width code block</pre>

const tasks=
`
Hey, I am Cherixx airdrop bot.\n

You can earn up to 💲20 CHiXX for a few and very simple tasks,\n

plus 💲2 CHiXX for every eligible referrers.\n

CHERIXX ecosystem is a freelance marketplace with a secure decentralized cryptocurrency exchange, using cherixx token as the only payment option on the cherixx freelance platform. Cherixx Token is a self-destructive cryptocurrency with initial total supply of 5 million and a fixed minimum supply of 2 million. CHIXX is designed in compliance with the Ethereum ERC20 standard.

Website:<a href="https://cherixx.com">cherixx.com</a>
`

var earn_more=`

You have earn $12 CHiXX \n

Would you like to earn more?\n
Follow us on LinkedIn,like and comment to the post.\n

Do you still want more? follow us on medium and give some claps 👏🏽
`


const facebook_link=`<a href="https://web.facebook.com/Cherixxtoken">Facebook</a>`;
const twitter_link=`<a href="https://mobile.twitter.com/CHiXXToken">Twitter</a>`
const telegram_link=`<a href="https://t.me/CherixxAnn">Telegram</a>`

// replace the value below with the Telegram token you receive from @BotFather
const token='955213634:AAEQAkFMixX-ECk6rWU98cNrOFk_8mdMskU';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg,match) => {

  console.log("starting..");
  bot.sendMessage(msg.chat.id,tasks,{
  'parse_mode':"HTML",
  "reply_markup": {
      "keyboard": [["Referer Link","balance"]],
      "resize_keyboard":true
      }
  },

);



  Users.findOne({'userId':msg.chat.id}, (err,user) => {
    if (err) {
      console.log("this is an error");
    } else {
      if (user) {
          bot.sendMessage(msg.chat.id,`⚠️ you have already started the tasks` ,{'parse_mode':"HTML"});
          console.log("user Exist");
      }else {
        var newUser=new Users({
          userId:msg.chat.id,
          RefererLink:"https://t.me/Cherixxairdropbot?start="+msg.chat.id,
          balance:0,
          Referered:0,
        })
        newUser.save().then(data => {

        bot.sendMessage(msg.chat.id,'click the button bellow to start tasks ⬇️',{
          "reply_markup": {
              "inline_keyboard": [[
          {
            text: 'Start Tasks',
            callback_data: 'StartTask'
          }
         ]]
         }
        })


        }).catch( err => {
            console.log(err);
        });
      }
    }
  });



  if (!match.input.slice(7)=="") {
    let refererId=match.input.slice(7);
    console.log(refererId);
    Users.findOne({"userId":msg.chat.id}, (err,user) => {
      if (err) {
        console.log(err);
      } else {
        if (user) {
          console.log(user);
          console.log("reward has already been recieved");
        }else {
          helper.updateUser("Referered",refererId)
        }
      }
    });
  }else {
    console.log('no param');
  }

});



bot.on("callback_query", (callbackQuery) => {
  if (callbackQuery.data === "Medium") {  // query is an object from the response you get when the user clicks the inline button
    console.log(callbackQuery.data );
    bot.sendMessage(callbackQuery.message.chat.id,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    bot.sendMessage(callbackQuery.message.chat.id,tasks,{'parse_mode':"HTML"});
  }
  if (callbackQuery.data === "StartTask") {
    bot.sendMessage(callbackQuery.message.chat.id,"▶️ Please enter your email address:",{'parse_mode':"HTML"});
  }

  if (callbackQuery.data === "balance") {
        helper.emitBalanceCall(callbackQuery.from.id,callbackQuery,bot)
     }
   if (callbackQuery.data === "Invite_link") {
        helper.emitLinkCall(callbackQuery.from.id,callbackQuery,bot)
      }

})

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
      console.log(msg.text);
       bot.sendMessage(msg.chat.id,"Hello dear user");
    }


    // ------->Email validation<-------//

    if (validateEmail(msg.text.toString().toLowerCase()) ) {
      helper.updateUserInput('email',chatId,msg.text.toString(),bot,msg)
    }

    // ------->Eth validation<-------//

    if (msg.text.toString().match(/^0x[a-fA-F0-9]{40}$/g)) {
      helper.updateUserInput('eth',chatId,msg.text.toString(),bot,msg)
    }

    // ------->Telegram Username validation<-------//

    if (msg.text.charAt(0)=="@") {
      helper.updateUserInput('telegram',chatId,msg.text.toString(),bot,msg)
    }

    // ------->facebook validation<-------//

    if (msg.text.toString().match(/(?:https?:\/\/)?(?:www\.)?(web.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/ig)){
      helper.updateUserInput('facebook',chatId,msg.text.toString(),bot,msg)
    }

    // ------->Twitter validation<-------//

    if (msg.text.toString().match(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/)) {
      bot.sendMessage(msg.chat.id,earn_more);
      helper.updateUserInput('twitter',chatId,msg.text.toString(),bot,msg)
    }

    // ------->LinkedIn validation<-------//

    if (msg.text.toString().match(/(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)) {
      helper.updateUserInput('linkedin',chatId,msg.text.toString(),bot,msg)
    }

    // ------->Medium validation<-------//

    if (msg.text.toString().match(/(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?medium.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)) {
      helper.updateUserInput('medium',chatId,msg.text.toString(),bot,msg)

    }

    // ------->Check Balance<-------//


    if (msg.text.toString().toLowerCase().indexOf("balance")===0) {
      helper.emitBalance(chatId,msg,bot)
    }

    // ------->Check RefererLink<-------//


    if (msg.text.toString().toLowerCase().indexOf("referer link")===0) {
      helper.emitLink(chatId,msg,bot)
    }

})







app.get("/",function(req,res) {
  res.send("Hello Welcome to the bot test zone updated (refresh itself every 5min) v4")
})

app.get("/registerd-user/thisismysecretkey5011298348483",function(req,res) {
  Users.find({},(err,users)=>{
    if (users) {
      res.render("users",{
        "users":users,
      })
    }else {
      console.log("no user");
    }
  })
})

app.listen(port, (req, res) => {
  console.log("listening...");
});
;
