const bcrypt = require('bcryptjs');

const hashPassword = async (passwordString)=>{

    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(passwordString,salt);
    return hash;
};


module.exports = hashPassword;