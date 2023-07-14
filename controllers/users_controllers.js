const User = require("../models/user");

module.exports.profile = async function(req, res) {
  try {
    if (req.cookies.user_id) {
      const user = await User.findById(req.cookies.user_id);
      
      if (user) {
        return res.render("user_profile", {
          title: "user profile",
          user: user
        });
      }
    }
    
    return res.redirect('user/sign-in');
  } catch (err) {
    // Handle any errors that occurred during the async operations
    console.error(err);
    return res.redirect('user/sign-in');
  }
};

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

module.exports.signup = function(req,res){
    return res.render("user_sign_up",{
        title:"codeinal | Sign-up"
    })
}

//render sign-in page
module.exports.signin = function(req,res){
    return res.render("user_sign_in",{
        title:"codeinal | Sign-in"
    })
}

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
module.exports.createSession = async function(req, res) {
  try {
    // Steps to authenticate
    // Find the user
    let user = await User.findOne({ email: req.body.email });
    
    // Handle user found
    if (user) {
      // Handle mismatching password
      if (user.password !== req.body.password) {
        return res.redirect("back");
      }
      
      // Handle the session creation
      res.cookie('user_id', user.id);
      return res.redirect('/user/profile');
    } else {
      // Handle user not found
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in finding user in signing up", err);
    return;
  }
};
