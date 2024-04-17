const User = require("../model/users.model");

const signUp = async (req, res) => {
    const user = new User({
        userName: req.body.userName,
        password: req.body.password
    });
    if (req.body.userName === 'admin') {
        user.role = 'admin';
    }

    try {
        const newUser = await user.save();
        return res.json({ statusCode: 200, status: 'success', message: `Your Login Registered Successfully, ${newUser.userName}`, });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

const signIn = async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName.trim(), password: req.body.password.trim() });
        if (!user) {
            return res.json({ statusCode: 401, status: 'unauthourized', message: 'invalid username/password' });
        }

        return res.json({ statusCode: 200, status: 'success', message: `Welcome To Our IT HelpDesk, ${user.userName}`, user: user });
    } catch (error) {
        return res.json({ statusCode: 500, status: 'error', message: error.message });
    }
};

module.exports = { signUp, signIn };