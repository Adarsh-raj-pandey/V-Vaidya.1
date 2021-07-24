const User = require("../models/user.js");


module.exports.profile = function(req,res){
    return res.render('user_profile.ejs', {
        title: 'User Profile'
    })
}

//render the signup page   
module.exports.signup = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('signup_as_user.ejs',{
        title:"V-Vaidya | Sign UP"
    })
}



// get the sign up data
module.exports.create = function(req,res){
    // res.end('<h1>User created</h1>');
             if (req.body.password != req.body.confirm_password){
                  return res.redirect('back');
              }

             User.findOne({email: req.body.email},function(err,user){
                 if(err){console.log('error in finding user in signing up');return}

                 if(!user){
                     User.create(req.body,function(err,user){
                         if(err){console.log('error in creating user while singin up');return}

                         return res.redirect('/users/signin'); 
                     })
                 }else{
                     return res.redirect('back');
                 }
             });
}

//sign in and create the sessioin 
module.exports.createSession = function(req,res){

       //steps to authencticate
      // find the user
      /*manually doing
       User.findOne({email: req.body.email},function(err,user){
                      if(err){console.log('error in finding user in signing in');return}

                      // handle user found

                      if(user){
                               // handle password which don't match
                                    if(user.password != req.body.password){
                                        return res.redirect('back');
                                    }
                               //handle sessioin creation
                               res.cookie('user_id',user.id);
                               return res.redirect('/users/profile');
                      }else{
                               // handle user not found
                          return res.redirect('back');
                      }

       });*/
     
        return res.redirect('/users/profile');

}
//render the sign in page
module.exports.signin = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

 
    return res.render('Signin.ejs',{
        title:"V-Vaidya | Register"
    })
}

//router.get('/users/mental_illness',usersController.mental_illness);   
module.exports.mental_illness = function(req,res){
    if (req.isAuthenticated()){
        return res.render('mental_illness.ejs',{
            title:"V-Vaidya | Mental illness"
        })
    }


    return res.render('Signin.ejs',{
        title:"V-Vaidya | Register"
    })         
}
//router.get('/users/physical_illness',usersController.physical_illness);
module.exports.physical_illness = function(req,res){
    if (req.isAuthenticated()){
        return res.render('physical_illness.ejs',{
              title:"Physical Illness"
        });
    }

 
    return res.render('Signin.ejs',{
        title:"V-Vaidya | Register"
    })         
}
// sign up as doc
module.exports.signup_as_doc = function(req,res){


    return res.render('signup_as_doc.ejs',{
        title:"V-Vaidya | Sign UP"
    })
}

module.exports.home = function(req,res){


    return res.render('home.ejs',{
        title:"V-Vaidya | HOME"
    })
}

module.exports.create_doc = function(req,res){ 

    return res.render('home.ejs',{
        title:"V-Vaidya | HOME"
    })
}
//router.get('/users/Find_a_MentalDoc',usersController.Find_a_MentalDoc);
module.exports.Find_a_MentalDoc = function(req,res){
    if (req.isAuthenticated()){
        return res.render('Find_a_MentalDoc.ejs',{
             title:"V-Vaidya | Find a Mental Doc"
        })
    }

 
    return res.render('Signin.ejs',{
        title:"V-Vaidya | Register"
    })         
}


module.exports.VideoHelp = function(req,res){
    if (req.isAuthenticated()){
        return res.render('VideoHelp.ejs',{
               title: "V-Vaidya | Video"
        })
    }
 
    return res.render('Signin.ejs',{
        title:"V-Vaidya | Register"
    })         
}


//router.get('/users/Find_a_Doc',usersController.Find_a_Doc);
module.exports.FindaDoc = function(req,res){
    if (req.isAuthenticated()){
        return res.render('Find_a_Doc.ejs',{
               title: "V-Vaidya | Find a Doc"
        })
    }
 
    return res.render('Signin.ejs',{
        title:"V-Vaidya | Register"
    })         
}

// rendering mental chatroom
module.exports.MentalChatRoom = function(req,res){
    if(req.isAuthenticated()){
        return res.render('MentalChatRoom.ejs',{
             title:"Mind Chat Room"
        })
    }
};

// rendering public chatroom
module.exports.ChatRoomPublic = function(req,res){
         if(req.isAuthenticated()){
             return res.render('../ChatRoom/public/index.ejs',{
                 title:"Join Chat"
             });
         }
}

module.exports.chat = function(req,res){
    console.log(req.body.room);
         if(req.isAuthenticated()){
             return res.render('chat.ejs',{
                     title:"Chat",
                     chatRoom:req.body.room  
             });
         }
}
module.exports.destroySession = function(req,res){
    User.findByIdAndUpdate(req.user._id,{islogin:0},function(err,user){
        console.log(user.name);
        if(err)
            {
                return res.redirect('/');
            }
        req.logout();
        return res.redirect('/');
  })
 
}