/**
 * admin auth 专门为了管理员开发的
 * 设置了管理员的权限
 *
 */

import { NextFunction, Request } from 'express';
import { roles } from '../common';
import config from '../config';
import JWTUtils from '../utils/jwtUtils';

const adminAuth = (req: Request, _, next: NextFunction) => {
    // check if the bearer token existed
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        const verification = JWTUtils.verifyJWT(bearerToken, config.salt);

        if (verification.success) {
            if (verification.data.role !== roles.ADMIN) {
                throw new Error('Only admin allowed');
            }
            next();
        } else {
            throw new Error('Invalid token');
        }
    } else {
        throw new Error('Not Authorized');
    }
};

export default adminAuth;
