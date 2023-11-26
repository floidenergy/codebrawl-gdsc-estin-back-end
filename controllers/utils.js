const prepareUser = (user) => {
    user.email = undefined;
    user.hash = undefined;
    user.salt = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    user.__v = undefined;

    return user;
} 


module.exports = {prepareUser}