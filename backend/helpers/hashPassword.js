const bcrypt = require('bcryptjs');

const hashPassword = async (passwordString)=>{

    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(passwordString,salt);
    console.log(hash);
    return hash;
};

hashPassword("123456");
module.exports = hashPassword;