const models = require ('../models');

async function test(req,res){


    const user = await models.User.findByPk(4,{
        include:[models.Address]
    });
    res.status(200).json({
        data:user
    });
}


module.exports = {
    test:test
}