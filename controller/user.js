const User = require("../models/user");

module.exports.renderSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next)=>{
    try{
        let {username, email, password } = req.body;
        const newUser = new User({email, username});
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","User Register Successfullys");
            res.redirect("/listing");
        });
        
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async (req, res)=>{
    try{
        // let {username, password } = req.body;
        // const newUser = 
        req.flash("success","welcome back to wanderlust");
        res.redirect(res.locals.redirectUrl || "/listing");
    
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/login");
    }
};

module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
    });
    req.flash("success", "you are logged out!");
    res.redirect("/listing");
};
