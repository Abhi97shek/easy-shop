import { expressJwt as jwt } from 'express-jwt';

function authJwt(){

    const secret = process.env.SECRET;

    return expressJwt({
        secret,
        algorithms:['HS256']
    }).unless({
            path:[
                {url:/\/public\/uploads(.*)/,methods:['GET','OPTIONS']},
                {url:/\/api\/v1\/products(.*)/,methods:['GET','OPTIONS']},
                {url:/\/api\/v1\/categories(.*)/,methods:['GET','OPTIONS']},
                `/api/v1/users/login`,
                `/api/v1/users/register`
            ]
    });
};

export default authJwt;