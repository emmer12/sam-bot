const Users = require('../modules/users');

const updateUserInput=(field,id,value,bot,msg)=>{
  if (field=="email") {
     Users.findOne({'userId':id}, (err,user) => {
       if (err) {
         console.log(err);
       }else {
         if(user) {
           if (user.email) {
             bot.sendMessage(id,"⚠️ You have already submited your email address",{'parse_mode':"HTML"});
             console.log("you have already sunmitted this value");
           }else {
              Users.findOne({'email':value},(err,user)=>{
                if (user) {
                  bot.sendMessage(msg.chat.id,"⚠️ Email address has been taken",{'parse_mode':"HTML"});
                }else {
                  Users.update({"userId":id},{$set:{'email':value}},function(err,updatedUser){
                    if (err) {
                      console.log(err);
                    }else {
                      console.log("updated...email"+updatedUser);
                      bot.sendMessage(msg.chat.id,"▶️ Please enter your ETH Wallet address (as: 0xE16289557BF9aDc0495Cea8D409a61C921a99C94 )",{'parse_mode':"HTML"});
                    }
                  })
                }
              })
           }

          }
         else {
           console.log('user not found');
         }
       }
     })
  }

  //------->Telegram<----------//


  if (field=="telegram") {
     Users.findOne({'userId':id}, (err,userOk) => {
       if (err) {
         console.log(err);
       }else {
         if(userOk) {
           if (!userOk.telegram) {
             Users.findOne({'telegram':value},(err,user)=>{
               if (user) {
                 bot.sendMessage(msg.chat.id,"⚠️ Telegram username has been taken",{'parse_mode':"HTML"});
               }else {
                 Users.update({"userId":id},{$set:{'telegram':value,'balance':userOk.balance+4}},{multi:true},function(err,updatedUser){
                   if (err) {
                     console.log(err);
                   }else {
                     console.log("updated...telegram"+updatedUser);
                     bot.sendMessage(msg.chat.id,"▶️ follow and like our facebook page and enter you facebook link",{
                       'parse_mode':"HTML",
                       "reply_markup": {
                         "inline_keyboard": [[
                           {
                             text: 'Facebook',
                             url: 'https://web.facebook.com/Cherixxtoke'
                           }
                         ]]
                       },
                     });

                   }
                 })
               }
             })
           }
           else {
             bot.sendMessage(msg.chat.id,"⚠️ You have already submited",{'parse_mode':"HTML"});
           }
          }
         else {
           console.log('user not found');
         }
       }
     })
  }

// ------------->eth<---------------------//


if (field=="eth") {
   Users.findOne({'userId':id}, (err,user) => {
     if (err) {
       console.log(err);
     }else {
       if(user) {
         if (user.eth) {
           bot.sendMessage(id,"⚠️ You have already submited your eth address",{'parse_mode':"HTML"});
           console.log("you have already sunmitted this value");
         }else {
            Users.findOne({'eth':value},(err,user)=>{
              if (user) {
                bot.sendMessage(msg.chat.id,"⚠️ Eth address has been taken",{'parse_mode':"HTML"});
              }else {
                Users.update({"userId":id},{$set:{'eth':value}},function(err,updatedUser){
                  if (err) {
                    console.log(err);
                  }else {
                    console.log("updated...eth"+updatedUser);
                    bot.sendMessage(msg.chat.id,"▶️ Please Join our telegram community and announcement channel  submit and submit your usernamen ( @username )",{
                      'parse_mode':"HTML",
                      "reply_markup": {
                          "inline_keyboard": [[
                      {
                        text: 'Telegram Group',
                        url: 'https://t.me/CherixxAnn'
                      }
                    ],[
                    {
                      text: 'Telegram Announcement',
                      url: 'https://t.me/CherixxAnn'
                    }
                  ]]
                        },
                    });
                  }
                })
              }
            })
         }

        }
       else {
         console.log('user not found');
       }
     }
   })
}


// ------------->facebook<------------//
if (field=="facebook") {
   Users.findOne({'userId':id}, (err,userOk) => {
     if (err) {
       console.log(err);
     }else {
       if(userOk){
         if (!user.facebook) {
           Users.findOne({'facebook':value},(err,user)=>{
             if (user) {
               bot.sendMessage(msg.chat.id,"⚠️ facebook link has been taken",{'parse_mode':"HTML"});

             }else {
               Users.update({"userId":id},{$set:{'facebook':value,'balance':userOk.balance+4}},{multi:true},function(err,updatedUser){
                 if (err) {
                   console.log(err);
                 }else {
                   console.log("updated...facebook"+updatedUser);
                   bot.sendMessage(msg.chat.id,"▶️  retweet this post page and enter twitter profile link (https://twitter.com/CHiXXToken)",{
                     'parse_mode':"HTML",
                     "reply_markup": {
                       "inline_keyboard": [[
                         {
                           text: 'Twitter',
                           url: 'https://mobile.twitter.com/CHiXXToken'
                         }
                       ]]
                     },
                   });
                 }
               })
             }
           })

         }
         else {
           bot.sendMessage(msg.chat.id,"⚠️ Email address has been taken",{'parse_mode':"HTML"});
         }
        }
       else {
         console.log('user not found');
       }
     }
   })
}

// ------------>twitter<-------------//
if (field=="twitter") {
   Users.findOne({'userId':id}, (err,userOk) => {
     if (err) {
       console.log(err);
     }else {
       if(userOk) {
         if (!user.twitter) {
           Users.findOne({'twitter':value},(err,user)=>{
             if (user) {
               bot.sendMessage(msg.chat.id,"⚠️ Twitter Link has been taken",{'parse_mode':"HTML"});

             }else {
               Users.update({"userId":id},{$set:{'twitter':value,'balance':userOk.balance+4}},{multi:true},function(err,updatedUser){
                 if (err) {
                   console.log(err);
                 }else {
                   console.log("updated...twitter"+updatedUser);
                   bot.sendMessage(msg.chat.id,"▶️  Optional* follow us on LinkedIn",{
                     'parse_mode':"HTML",
                     "reply_markup": {
                       "inline_keyboard": [[
                         {
                           text: 'LinkedIn',
                           url: 'https://www.linkedin.com/in/cherixx-chixx-36b4b118b'

                         }
                       ]]
                     },
                   });
                 }
               })
             }
           })
         }
         else {
          bot.sendMessage(msg.chat.id,"⚠️ Email address has been taken",{'parse_mode':"HTML"});
         }
        }
       else {
         console.log('user not found');
       }
     }
   })
}

//----------->LinkedIn<-------------//
if (field=="linkedin") {
   Users.findOne({'userId':id}, (err,userOk) => {
     if (err) {
       console.log(err);
     }else {
       if(userOk) {
         if (!user.linkedin) {
           Users.findOne({'linkedin':value},(err,user)=>{
             if (user) {
               bot.sendMessage(msg.chat.id,"⚠️ linkedin Link has been taken",{'parse_mode':"HTML"});
             }else {
               Users.update({"userId":id},{$set:{'linkedin':value,'balance':userOk.balance+4}},{multi:true},function(err,updatedUser){
                 if (err) {
                   console.log(err);
                 }else {
                   console.log("updated...linkedin"+updatedUser);
                   bot.sendMessage(msg.chat.id,"▶️  Optional* follow us on midium and give some claps 👏🏽",{
                     'parse_mode':"HTML",
                     "reply_markup": {
                       "inline_keyboard": [[
                         {
                           text: 'Medium',
                           url: 'https://medium.com/@cherixxtoken'
                         }
                       ]]
                     },
                   });

                 }
               })
             }
           })
         }else{
          bot.sendMessage(msg.chat.id,"⚠️ Email address has been taken",{'parse_mode':"HTML"});
         }
        }
       else {
         console.log('user not found');
       }
     }
   })
}
// ----------->Medium<------------//

if (field=="medium") {
   Users.findOne({'userId':id}, (err,userOk) => {
     if (err) {
       console.log(err);
     }else {
       if(userOk) {
         if (!userOk.medium) {
           Users.findOne({'medium':value},(err,user)=>{
             if (user) {
               bot.sendMessage(msg.chat.id,"⚠️ Medium Link has been taken",{'parse_mode':"HTML"});
             }else {
               Users.update({"userId":id},{$set:{'medium':value,'balance':userOk.balance+4}},{multi:true},function(err,updatedUser){
                 if (err) {
                   console.log(err);
                 }else {
                   console.log("updated...medium"+updatedUser);
                   bot.sendMessage(msg.chat.id,`
                     Thanks for joining Cherixx airdrop 1.
                     If you properly fullfill all the airdrop conditions you will receive a minimum of 💲12 worth of CHiXX.

                     👫 Referral Link:<a href="${userOk.RefererLink}">${snap.val().RefererLink}</a> \n
                     👫 Referrals:${userOk.Referered}

                     <b>your Details:</b>
                     -------------
                     Twitter:${userOk.twitter}
                     Facebook:${userOk.facebook}
                     Medium Link:${userOk.medium}
                     LinkedIn :${userOk.linkedin}
                     Wallet:${userOk.eth}

                     `,{'parse_mode':"HTML"});

                 }
               })
             }
           })

         }else {
            bot.sendMessage(msg.chat.id,"⚠️ Email address has been taken",{'parse_mode':"HTML"});
         }
        }
       else {
         console.log('user not found');
       }
     }
   })
}


}


const updateUser=(field,id)=>{
  Users.findOne({'userId':id}, (err,user) => {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        let point=user.Referered+1;
        let newBalance=user.balance+2;
        let fields=String(field);
        Users.update({"userId":id},{$set:{'Referered':point,'balance':newBalance}},{multi:true},function(err,updatedUser){
          if (err) {
            console.log(err);
          }else {
            console.log("updated...")
          }
        })
      }else {
        console.log("no user...found"+id);
      }
    }
  });
}

const emitBalanceCall=(id,callbackQuery,bot)=>{
  Users.findOne({"userId":id}, (err, user) => {
    if (err) {
      console.log("err");
    }
    else {
     console.log("balance");
      bot.sendMessage(callbackQuery.message.chat.id,`
        <b>Balance:</b>💲 ${user.balance} CHiXX\n \n<b>Refered:</b>${user.Referered}
        `,{'parse_mode':"HTML"});
    }
  });
}

const emitBalance=(id,msg,bot)=>{
  Users.findOne({"userId":id}, (err, user) => {
    if (err) {
      console.log("err");
    }
    else {
     console.log("balance");
      bot.sendMessage(msg.chat.id,`
        <b>Balance:</b>💲 ${user.balance} CHiXX\n \n<b>Refered:</b>${user.Referered}
        `,{'parse_mode':"HTML"});
    }
  });
}

  const emitLink=(id,msg,bot)=>{
    Users.findOne({"userId":id}, (err, user) => {
      if (err) {
        console.log("err");
      } else {
        bot.sendMessage(msg.chat.id,`
          <a href="${user.RefererLink}">${user.RefererLink}</a>
          `,{'parse_mode':"HTML"});
      }
    });
  }

  const emitLinkCall=(id,bot,callbackQuery)=>{
    Users.findOne({"userId":id}, (err, user) => {
      if (err) {
        console.log("err");
      } else {
        bot.sendMessage(callbackQuery.message.chat.id,`
          <a href="${user.RefererLink}">${user.RefererLink}</a>
          `,{'parse_mode':"HTML"});
      }
    });
  }




module.exports = {
  updateUserInput,
  updateUser,
  emitBalance,
  emitBalanceCall,
  emitLink,
  emitLinkCall,
};
