// autheticator to state the user must be signed in to do an action
const userAllowPosition = (req, res, next) => {
    if (!req.session.userLocation){
        return res
            .status(401)
            .json({ message: "You must allow position to use this feature"});
    }
    next();
};

module.exports = {
    userAllowPosition,
}