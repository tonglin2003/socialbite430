// autheticator to state the user must be signed in to do an action
const autheticateUser = (req, res, next) => {
    if (!req.session.userId){
        return res
            .status(401)
            .json({ message: "You must be logged in to view this page"});
    }
    next();
};

module.exports = {
    autheticateUser,
}