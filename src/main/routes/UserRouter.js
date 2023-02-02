const express=require('express');
const { injectUser } = require('../Controllers/middleware/InjectUser');
const { getLoggedInUserEndpoint, logoutUserEndpoint, validateUserEndpoint } = require('../Controllers/UserAuthController');
const { addUserEndpoint, getUserEndpoint, updateUserEndpoint } = require('../Controllers/UserController');


let userRouter=express.Router();
userRouter.use('/',injectUser);
userRouter.post('/',addUserEndpoint);
userRouter.get('/:email',getUserEndpoint);
userRouter.put('/',updateUserEndpoint);
userRouter.get('/auth/loggedin',getLoggedInUserEndpoint);
userRouter.get('/auth/logout',logoutUserEndpoint);
userRouter.post('/auth/login',validateUserEndpoint);




module.exports={userRouter};


