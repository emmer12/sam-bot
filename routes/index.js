var express = require('express');
const Users = require('../modules/users');
const helper = require('./helper');
var router = express.Router();
const TelegramBot = require('node-telegram-bot-api');

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
 * Checks if the given string is a checksummed address
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
<a href="https://mobile.twitter.com/CHiXXToken">Twitter</a>

<a href="https://web.facebook.com/Cherixxtoken">Facebook</a>

<a href="https://t.me/CherixxAnn">Telegram</a>

<a href="https://medium.com/@cherixxtoken">Medium</a>

<a href="https://www.linkedin.com/in/cherixx-chixx-36b4b118b">LinkedIn</a>

<a href="https://www.reddit.com/user/Cherixx">Reddit</a>
\n
Please Send Your Email address

Please Send Your Twitter Profile Link

Please submit your Twitter retweet link

Please send Your Facebook profile Link

Please send Your Medium profile link

Please Send Your Ethereum Wallet address

`

const facebook_link=`<a href="https://web.facebook.com/Cherixxtoken">Facebook</a>`;
const twitter_link=`<a href="https://mobile.twitter.com/CHiXXToken">Twitter</a>`
const telegram_link=`<a href="https://t.me/CherixxAnn">Telegram</a>`

// replace the value below with the Telegram token you receive from @BotFather
const token = '855829144:AAHGYJw72ZtTtF6q67PWikNNUKahKYCperU';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg,match) => {

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
        console.log("user Exist");
      }else {
        var newUser=new Users({
          userId:msg.chat.id,
          RefererLink:"https://t.me/Cherixxairdropbot?start="+id,
          balance:0,
          Referered:0,
        })
        newUser.save().then(data => {

        bot.sendMessage(msg.chat.id,'click the button bellow to start tasks',{
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



// bot.on("callback_query", (callbackQuery) => {
//   if (callbackQuery.data === "Medium") {  // query is an object from the response you get when the user clicks the inline button
//     console.log(callbackQuery.data );
//     bot.sendMessage(callbackQuery.message.chat.id,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
//     bot.sendMessage(callbackQuery.message.chat.id,tasks,{'parse_mode':"HTML"});
//   }
//   if (callbackQuery.data === "StartTask") {
//     bot.sendMessage(callbackQuery.message.chat.id,"▶️ Please enter your email address:",{'parse_mode':"HTML"});
//   }
//
//   if (callbackQuery.data === "balance") {
//         ref.child('users/'+callbackQuery.from.id).once("value", function(snap) {
//         bot.sendMessage(callbackQuery.message.chat.id,`
//           <b>Balance:</b>${snap.val().data.balance + snap.val().data.Referered * 10 }sb\n \n<b>Refered:</b>${snap.val().data.Referered}
//           `,{'parse_mode':"HTML"});
//        });
//      }
//    if (callbackQuery.data === "Invite_link") {
//          ref.child('users/'+callbackQuery.from.id).once("value", function(snap) {
//          bot.sendMessage(callbackQuery.message.chat.id,`
//            <a href="${snap.val().data.RefererLink}">${snap.val().data.RefererLink}</a>
//            `,{'parse_mode':"HTML"});
//         });
//       }
//
// })


// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   var Hi = "hi";
//     if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
//       usersRef.push({
//          "username":n,
//          "msg":msg.text
//       })
//       console.log(msg.text);
//     bot.sendMessage(msg.chat.id,"Hello dear user");
//     }
//     var bye = "bye";
//     if (msg.text.toString().toLowerCase().includes(bye)) {
//     ref.child("/users").once("value",function(snapshot) {
//       let data=snapshot.val();
//       console.log("you have recived some data"+Object.keys(data));
//       bot.sendMessage(msg.chat.id, `Hope to see you around again , Bye @ ${data.emmer.username}`);
//     })
//     }
//
//
//     /// email validation
//
//     if (validateEmail(msg.text.toString().toLowerCase()) ) {
//       bot.sendMessage(msg.chat.id,"▶️ Please enter your ETH Wallet address (as: 0xE16289557BF9aDc0495Cea8D409a61C921a99C94 )",{'parse_mode':"HTML"});
//       data.email=msg.text.toString()
//       ref.child('users/'+msg.from.id).set({
//         data
//       })
//     }
//     if (msg.text.toString().match(/^0x[a-fA-F0-9]{40}$/g)) {
//       bot.sendMessage(msg.chat.id,"▶️ follow and like our facebook page and enter you facebook link",{
//         'parse_mode':"HTML",
//         "reply_markup": {
//             "inline_keyboard": [[
//         {
//           text: 'Facebook',
//           url: 'https://web.facebook.com/Cherixxtoke'
//         }
//       ]]
//           },
//       });
//       data.eth=msg.text.toString()
//       ref.child('users/'+msg.from.id).set({
//         data
//       })
//     }
//
//     if (msg.text.toString().match("((http|https)://)?(www[.])?facebook.com/.+")) {
//       bot.sendMessage(msg.chat.id,"▶️  retweet this post page and enter retweet link",{
//         'parse_mode':"HTML",
//         "reply_markup": {
//             "inline_keyboard": [[
//         {
//           text: 'Twitter',
//           url: 'https://mobile.twitter.com/CHiXXToken'
//         }
//       ]]
//           },
//       });
//       data.facebook=msg.text.toString()
//       data.balance=data.balance+20;
//       ref.child('users/'+msg.from.id).set({
//         data
//       })
//     }
//
//     // twitter Validate
//
//     if (msg.text.toString().match(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/)) {
//       bot.sendMessage(msg.chat.id,"▶️  Optional* follow us on LinkedIn",{
//         'parse_mode':"HTML",
//         "reply_markup": {
//             "inline_keyboard": [[
//         {
//           text: 'LinkedIn',
//           url: 'https://www.linkedin.com/in/cherixx-chixx-36b4b118b'
//
//         }
//       ]]
//           },
//       });
//       data.twitter=msg.text.toString();
//       data.balance=data.balance+20;
//       ref.child('users/'+msg.from.id).set({
//         data
//       })
//     }
//
//     // LinkedIn Validation
//     if (msg.text.toString().match(/(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)){
//       bot.sendMessage(msg.chat.id,"▶️  Optional* follow us on LinkedIn",{
//         'parse_mode':"HTML",
//         "reply_markup": {
//             "inline_keyboard": [[
//         {
//           text: 'Medium',
//           url: 'https://medium.com/@cherixxtoken'
//         }
//       ]]
//           },
//       });
//       data.linkedin=msg.text.toString();
//       data.balance=data.balance+10;
//       ref.child('users/'+msg.from.id).set({
//         data
//       })
//     }
//
//
//
//     // Medium Validation
//
//     if (msg.text.toString().match(/(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?medium.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)){
//       bot.sendMessage(msg.chat.id,"Thanks for embacking o this project....",{
//         'parse_mode':"HTML",
//           "reply_markup": {
//               "inline_keyboard": [[
//           {
//             text: 'My balance',
//             callback_data: 'balance'
//           },
//           {
//             text: 'invite link',
//             callback_data: 'Invite_link'
//           }
//
//         ]]
//         },
//       });
//       data.medium=msg.text.toString();
//       data.balance=data.balance+10;
//       ref.child('users/'+msg.from.id).set({
//         data
//       })
//     }
//
//     if (msg.text.toString().toLowerCase().indexOf("balance")===0) {
//       ref.child('users/'+msg.from.id).once("value", function(snap) {
//       bot.sendMessage(msg.chat.id,`
//         <b>Balance:</b>${snap.val().data.balance + snap.val().data.Referered * 10 }sb\n \n<b>Refered:</b>${snap.val().data.Referered}
//         `,{'parse_mode':"HTML"});
//      });
//
//     }
//
//
//     if (msg.text.toString().toLowerCase().indexOf("referer link")===0) {
//       ref.child('users/'+msg.from.id).once("value", function(snap) {
//              bot.sendMessage(msg.chat.id,`
//                <a href="${snap.val().data.RefererLink}">${snap.val().data.RefererLink}</a>
//                `,{'parse_mode':"HTML"});
//      });
//     }
//
//     if (msg.text.toString().toLowerCase().indexOf("earn twitter reward")===0) {
//       bot.sendMessage(msg.chat.id,twitter_link,{'parse_mode':"HTML"});
//     }
//
//     if (msg.text.toString().toLowerCase().indexOf("earn telegram reward")===0) {
//       bot.sendMessage(msg.chat.id,telegram_link,{'parse_mode':"HTML"});
//     }
//
//     if (msg.text.toString().toLowerCase().indexOf("earn other rewards")===0) {
//       bot.sendMessage(msg.chat.id,'Other rewards',{
//         'parse_mode':"HTML",
//         "reply_markup": {
//             "inline_keyboard": [[
//         {
//           text: 'LinkedIn',
//           url: 'https://www.linkedin.com/in/cherixx-chixx-36b4b118b'
//         },{
//           text: 'Medium',
//           callback_data: 'Medium'
//         }
//       ]]
//           },
//       });
//     }
//
//
//
//   // send a message to the chat acknowledging receipt of their message
// });



module.exports = router;
