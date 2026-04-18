import jwt from 'jsonwebtoken';
import * as env from '../../config/env.js';
import * as userRepo from "../../repositories/practice/user-repository.js"
import * as error from "../../errors/error.js"

export const generateTokenForUser = (authCode) => {
    console.log(`เตรียมยิง API ด้วย Client ID: ${env.EVENTPOP_CLIENT_ID}`);

    const mockUserData = { userId: "EVT-999", name: "Dev POC", role: "user" };

    const token = jwt.sign(mockUserData, env.JWT_SECRET, { expiresIn: '1h' });
    
    return token;
};

export const loginWithCredentials = (username, password) => {
    const user = userRepo.findUserByUsername(username);
    if (!user || user.password !== password) {
        throw error.badGatewayError("Invalid username or password");
    }

    const payload = { userId: user.id, name: user.name, role: user.role };

    const accessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1m' });
    
    const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    userRepo.getRefreshToken().push(refreshToken);

    return { accessToken, refreshToken };
};

export const getNewAccessToken = (refreshToken) => {
    if (!userRepo.getRefreshToken().includes(refreshToken)) {
        throw error.forbiddenError("Refresh Token is not in database!");
    }

    const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);

    const payload = { userId: decoded.userId, name: decoded.name, role: decoded.role };
    const newAccessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1m' });

    return newAccessToken;
};

export const logoutUser = (refreshToken) => {
    const index = userRepo.getRefreshToken().indexOf(refreshToken);
    if (index > -1) {
        userRepo.getRefreshToken().splice(index, 1);
    }
};