var passport = require('passport');
const localStrategy=require("passport-local").Strategy;
const Users=require("../modules/user");

passport.serializeUser(function(user,done){
  done(null,user.id);
});
passport.deserializeUser(function(id,done){
  Users.findById(id,function(err,user){
    done(err,user);
  });
});

  // local Strategy  sign Up
  passport.use('local.signup',new localStrategy({
          usernameField:'email',
          passwordField:'password',
          passReqToCallback:true
        },function(req,email,password,done) {
          req.checkBody('email',"invalid Email").notEmpty().isEmail();
          req.checkBody('password',"invalid password (password must have at least (5) characters)").notEmpty().isLength({min:5});
          var errors=req.validationErrors();
          if (errors) {
            var message=[];
            errors.forEach(function(error){
              message.push(error.msg)
            });
            return done(null,false,req.flash('error',message))
          }
            let query={'email':email};
               Users.findOne(query,function(err,user){
                   if(err){return done(err)};
                   if (user) {return done(null,false,{message:"email is already in use"})}
                   else {
                      var newUser=new Users();
                       newUser.email=email;
                       newUser.password=newUser.encryptPassword(password);
                       newUser.save(function(err,result) {
                        if (err) {return done(err)}
                        return done(null,newUser);
                     });
                   }
                });
             }
          ));

          // local Strategy  sign In
          passport.use('local.signin',new localStrategy({
                  usernameField:'email',
                  passwordField:'password',
                  passReqToCallback:true
                },function(req,email,password,done) {
                  req.checkBody('email',"invalid Email").notEmpty().isEmail();
                  req.checkBody('password',"invalid password").notEmpty();
                  var errors=req.validationErrors();
                  if (errors) {
                    var message=[];
                    errors.forEach(function(error){
                      message.push(error.msg)
                    });
                    return done(null,false,req.flash('error',message))
                  }
                    let query={'email':email};
                       Users.findOne(query,function(err,user){
                           if(err){return done(err)};
                           if (!user) {return done(null,false,{message:"No user found"})}
                           if (!user.validPassword(password)) {return done(null,false,{message:"Wrong password"})}
                           else {
                            return done(null,user)
                           }
                        });
                     }
                  ));
