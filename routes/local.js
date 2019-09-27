var express = require('express');
const Users = require('../modules/users');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data=Users.find({},function(err,data) {
    console.log(data);
    res.send('respond with a resource local'+data);
  })
});


router.get('/start', function(req, res, next) {
  updateUserInput('email',req.body.id,req.body.email,res)

});



router.post('/start', function(req, res, next) {

  // if (req.body.url.slice(7)=="") {
  //   console.log(match.input.slice(7));
  //   ref.child('users/'+match.input.slice(7)).once("value", function(snap){
  //     refererCount(snap.val().data.Referered)
  //   });
  //   function refererCount(value) {
  //     ref.child('users/'+match.input.slice(7)+'/data/').update({Referered:value+1});
  //   }
  // }else {
  //   console.log('no param');
  // }
  Users.findOne({'userId':req.body.userId}, (err,user) => {
    if (err) {
      console.log(err);
      console.log("this is an error");
    } else {
      if (user) {
        console.log("user Exist");
      }else {
        var id=Math.round(Math.random()*100000);
        var newUser=new Users({
          userId:id,
          RefererLink:"https://t.me/Cherixxairdropbot?start="+id,
          balance:0,
          Referered:0,
        })
        newUser.save().then(data => {
          res.send({data})
        }).catch( err => {
            console.log(err);
        });
      }
    }
  });
});
router.post('/telegram', function(req, res, next) {
  updateUserInput('telegram',req.body.id,req.body.telegram,res)

});

router.post('/email', function(req, res, next) {
  updateUserInput('email',req.body.id,req.body.email,res)
});

router.post('/facebook', function(req, res, next) {
  updateUserInput('facebook',req.body.id,req.body.facebook,res)

});

router.post('/twitter', function(req, res, next) {
  updateUserInput('twitter',req.body.id,req.body.twitter,res)

});


router.post('/linkedin', function(req, res, next) {
  updateUserInput('linkedin',req.body.id,req.body.linkedin,res)

});


router.post('/medium', function(req, res, next) {
  updateUserInput('medium',req.body.id,req.body.medium,res)

});

router.get('/balance/:id', function(req, res, next) {
  emitBalance(req.params.id,res)

});

router.get('/link/:id', function(req, res, next) {
  console.log(req.params.id);
  emitLink(req.params.id,res)


});




router.post('/start/:id', (req, res) => {
 Users.findOne({"userId":req.body.userId}, (err,user) => {
   if (err) {
     console.log(err);
   } else {
     if (user) {
       console.log(user);
       console.log("reward has already been recieved");
     }else {
       updateUser("Referered",req.params.id,res)
     }
   }
 });
});


const updateUserInput=(field,id,value,res)=>{
  if (field=="email") {
     Users.findOne({'userId':id}, (err,user) => {
       if (err) {
         console.log(err);
       }else {
         if(user) {
           if (user.email) {
             console.log("you have already sunmitted this value");
           }else {
              Users.findOne({'email':value},(err,user)=>{
                if (user) {
                  console.log("email has already been taken");
                }else {
                  Users.update({"userId":id},{$set:{'email':value}},function(err,updatedUser){
                    if (err) {
                      console.log(err);
                    }else {
                      console.log("updated...email"+updatedUser);
                      res.send({updatedUser})
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
     Users.findOne({'userId':id}, (err,user) => {
       if (err) {
         console.log(err);
       }else {
         if(user) {
           if (!user.telegram) {
             Users.findOne({'telegram':value},(err,user)=>{
               if (user) {
                 console.log("telegram has already been taken");
               }else {
                 Users.update({"userId":id},{$set:{'telegram':value,'balance':user.balance+4}},{multi:true},function(err,updatedUser){
                   if (err) {
                     console.log(err);
                   }else {
                     console.log("updated...telegram"+updatedUser);
                     res.send({updatedUser})
                   }
                 })
               }
             })
           }
           else {
             console.log("you have already sunmitted this value");
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
   Users.findOne({'userId':id}, (err,user) => {
     if (err) {
       console.log(err);
     }else {
       if(user){
         if (!user.facebook) {
           Users.findOne({'facebook':value},(err,user)=>{
             if (user) {
               console.log("facebook has already been taken");
             }else {
               Users.update({"userId":id},{$set:{'facebook':value,'balance':user.balance+4}},{multi:true},function(err,updatedUser){
                 if (err) {
                   console.log(err);
                 }else {
                   console.log("updated...facebook"+updatedUser);
                   res.send({updatedUser})
                 }
               })
             }
           })

         }
         else {
           console.log("you have already sunmitted this value");
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
   Users.findOne({'userId':id}, (err,user) => {
     if (err) {
       console.log(err);
     }else {
       if(user) {
         if (!user.twitter) {
           Users.findOne({'twitter':value},(err,user)=>{
             if (user) {
               console.log("twitter has already been taken");
             }else {
               Users.update({"userId":id},{$set:{'twitter':value,'balance':user.balance+4}},{multi:true},function(err,updatedUser){
                 if (err) {
                   console.log(err);
                 }else {
                   console.log("updated...twitter"+updatedUser);
                   res.send({updatedUser})
                 }
               })
             }
           })
         }
         else {
           console.log("you have already sunmitted this value");
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
   Users.findOne({'userId':id}, (err,user) => {
     if (err) {
       console.log(err);
     }else {
       if(user) {
         if (!user.linkedin) {
           Users.findOne({'linkedin':value},(err,user)=>{
             if (user) {
               console.log("linkedin has already been taken");
             }else {
               Users.update({"userId":id},{$set:{'linkedin':value,'balance':user.balance+4}},{multi:true},function(err,updatedUser){
                 if (err) {
                   console.log(err);
                 }else {
                   console.log("updated...linkedin"+updatedUser);
                   res.send({updatedUser})
                 }
               })
             }
           })
         }else{
           console.log("you have already sunmitted this value");
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
   Users.findOne({'userId':id}, (err,user) => {
     if (err) {
       console.log(err);
     }else {
       if(user) {
         if (!user.medium) {
           Users.findOne({'medium':value},(err,user)=>{
             if (user) {
               console.log("medium has already been taken");
             }else {
               Users.update({"userId":id},{$set:{'medium':value,'balance':user.balance+4}},{multi:true},function(err,updatedUser){
                 if (err) {
                   console.log(err);
                 }else {
                   console.log("updated...medium"+updatedUser);
                   res.send({updatedUser})
                 }
               })
             }
           })

         }else {
           console.log("you have already sunmitted this value");
         }
        }
       else {
         console.log('user not found');
       }
     }
   })
}


}


const updateUser=(field,id,res)=>{
  Users.findOne({'userId':id}, (err,user) => {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        let point=user.Referered+1;
        let fields=String(field);
        Users.update({"userId":id},{$set:{'Referered':point}},function(err,updatedUser){
          if (err) {
            console.log(err);
          }else {
            console.log("updated..."+updatedUser);
            res.send({updatedUser})
          }
        })
      }else {
        console.log("no user...found"+id);
      }
    }
  });
}

const emitBalance=(id,res)=>{
  Users.findOne({"userId":id}, (err, user) => {
    if (err) {
      console.log("err");
    } else {
      res.send({"balance":user.balance})
    }
  });
}

  const emitLink=(id,res)=>{
    Users.findOne({"userId":id}, (err, user) => {
      if (err) {
        console.log("err");
      } else {
        res.send({"link":user.RefererLink})
      }
    });
  }



module.exports = router;
