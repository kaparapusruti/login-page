
const User = require("../models/user");
//TA 
module.exports.profile = function(req, res){
  return res.render('user_profile', {
      title: 'User Profile'
  })
}

//async
// module.exports.profile = async function(req, res) {
//   try {
//     if (req.cookies.user_id) {
//       const user = await User.findById(req.cookies.user_id);
      
//       if (user) {
//         return res.render("./user_profile", {
//           title: "user profile",
//           user: user
//         });
//       }
//     }
    
//     return res.redirect('user/sign-in');
//   } catch (err) {
//     // Handle any errors that occurred during the async operations
//     console.error(err);
//     return res.redirect('user/sign-in');
//   }
// };
//non async
// module.exports.profile = function(req,res){
//   if(req.cookies.user_id){
// User.findById(req.cookies.user_id,function(err,user){
//   if(user){
//     return res.render("user_profile",{
//       title:"user profile",
//       user:user
//   })
// }
//   return res.redirect('user/sign-in');
// });

//   }else{
//     return res.redirect('user/sign-in');
//   }
// }
  

//render sign-up page

module.exports.signup = async function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  try {
    await res.render("user_sign_up", {
      title: "codeinal | Sign-up",
    });
  } catch (error) {
    // Handle the error
    console.error(error);
    // Send an error response
    res.status(500).send("Internal Server Error");
  }
};


//render sign-in page
module.exports.signin = async function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  try {
    await res.render("user_sign_in", {
      title: "codeinal | Sign-in",
    });
  } catch (error) {
    // Handle the error
    console.error(error);
    // Send an error response
    res.status(500).send("Internal Server Error");
  }
};

//get the sign up data
module.exports.create = async function (req, res) {
    try {
      if (req.body.password != req.body.confirm_password) {
        return res.redirect("back");
      }
  
      const existingUser = await User.findOne({ email: req.body.email });
  
      if (!existingUser) {
        const newUser = await User.create(req.body);
        return res.redirect("/user/sign-in");
      } else {
        return res.redirect("back");
      }
    } catch (err) {
      console.log("Error in signing up:", err);
    }
  };
  
// module.exports.create = function(req,res){
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect("back");
//     }
//     User.findOne({email: req.body.email},function(err,user){
//         if(err){console.log(`error in finding user in signing up`);return}
//         if(!user){
//             user.create(req.body,function(err,user){
//                 if(err){console.log(`error in creating user in signing up`);return}
//                 return res.redirect("/users/sign-in")
//             })
//         }else{
//             return res.redirect("back");
//         }
//     });
// }

//get the sign in  data

// module.exports.createSession = function(req,res){
//   //steps to authenticate
//   //find the user
//   User.findOne({email: req.body.email},function(err,user){
//             if(err){console.log(`error in finding user in signing up`);return}


//   //handle user found
//   if(user){

// //handle mismatching password
// if(user.password!=req.body.password){
// return res.redirect("back");
// }
// //handle the session creation
// res.cookies('user_id',user.id);
// return res.redirect('/user/profile');

// }else{
// //handle user not found

// return res.redirect("back");
// }


// });
//manual auth
// module.exports.createSession = async function(req, res) {
//   try {
//     // Steps to authenticate
//     // Find the user
//     let user = await User.findOne({ email: req.body.email });
    
//     // Handle user found
//     if (user) {
//       // Handle mismatching password
//       if (user.password !== req.body.password) {
//         return res.redirect("back");
//       }
      
//       // Handle the session creation
//       res.cookie('user_id', user.id);
//       return res.redirect('/user/profile');
//     } else {
//       // Handle user not found
//       return res.redirect("back");
//     }
//   } catch (err) {
//     console.log("Error in finding user in signing up", err);
//     return;
//   }
// };


//sign in and create a session for the user

module.exports.createSession = function(req,res){
  return res.redirect("/");
}
module.exports.destroySession = function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      // Handle any errors that occurred during logout
      return next(err);
    }
    return res.redirect("/");
  });
}

