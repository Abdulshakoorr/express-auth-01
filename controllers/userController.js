const userModel = require('../models/user.js')

const bcrypt = require('bcrypt')



const homeController = (req, res) => {
        res.render('index',{title: 'Home'});
 }


 const registerController = (req, res) => {
        res.render('../views/registration.ejs',{title: 'Registration'})
}

// create a new user operation withouthash
// const createUser = async (req,res) => {
//     const {name, email, password, date} = req.body;
//     try {
//         const newUser = new userModel({
//             name, email, password, date
//         })
//         await newUser.save();
//         res.redirect('/login');
//     } catch (error) {
//         console.log(error.message)
//     }
// }
// create a new user operation with hash password
const createUser = async (req,res) => {
    const {name, email, password, date} = req.body;
    const hashPassword = await bcrypt.hash(password,10)
    try {
        const newUser = new userModel({
            name, email, password:hashPassword, date
        })
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.log(error.message)
    }
}

// login operation
const loginController = (req, res) => {
    res.render('../views/login.ejs',{title: 'Login'})
}
// login verification operation without hash

// const loginVerification =async (req, res) => {
//     try {
//         const {email , password} = req.body;
//         const result = await userModel.findOne({email});
//         console.log(result);

//         if (result != null) {

//         if(result.email === email && result.password === password) {
//             res.send(`<p>Dashboard-------------> ${result}</p>`)
//         }else{
//             res.send("user not found");
//         }
//     }else{
//         res.send(`this user does not exist yet! email: ${email} password: ${password} <br> <a class="bg-indigo-400 text-white text-md font-md " href=${'/register'} > go to register page</a>`);
//     }
//     } catch (error) {
//         console.log(error.message);
//     }

// }
// login verification operation without hash

const loginVerification =async (req, res) => {
    try {
        const {email , password} = req.body;
        const result = await userModel.findOne({email});
        console.log(result);

        if (result != null) {
            const isMatch = await bcrypt.compare(password, result.password)
        if(result.email === email && isMatch) {
            res.send(`<p>Dashboard-------------> ${result}</p>`)
        }else{
            res.send("user not found");
        }
    }else{
        res.send(`this user does not exist yet! email: ${email} password: ${password} <br> <a class="bg-indigo-400 text-white text-md font-md " href=${'/register'} > go to register page</a>`);
    }
    } catch (error) {
        console.log(error.message);
    }

}

module.exports = { homeController , registerController, loginController, createUser ,loginVerification};