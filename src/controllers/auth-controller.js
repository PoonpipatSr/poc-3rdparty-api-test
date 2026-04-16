import * as authService from '../services/auth-service.js';
import * as env from '../config/env.js';

export const loginRedirect = (req, res) => {
    console.log("Redirecting user to Login...");
    res.redirect(`${env.CALLBACK_URL}?code=123456`);
};

export const handleCallback = (req, res) => {
    try {
        const authCode = req.query.code;

        if (!authCode) {
            return res.status(400).json({ 
                error: "invalid_request",
                error_description: "invalid_request.missing_params"
            });
        }

        console.log(`Received Auth Code: ${authCode}`);

        const myAccessToken = authService.generateTokenForUser(authCode);

        res.json({
            message: "Login Successful!",
            token: myAccessToken
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Missing credentials" });

        const tokens = authService.loginWithCredentials(username, password);

        res.json({
            message: "Login Successful!",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message });
    }
};

export const refreshToken = (req, res) => {
    try {
        const { token } = req.body; 

        if (!token) return res.status(401).json({ error: "Refresh Token is required" });

        const newAccessToken = authService.getNewAccessToken(token);

        res.json({
            message: "Token refreshed successfully!",
            accessToken: newAccessToken
        });
    } catch (error) {
        console.log(error);
        res.status(403).json({ error: "Invalid or Expired Refresh Token! Please login again." });
    }
};

export const logout = (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Refresh Token is required for logout" });

    authService.logoutUser(token);
    
    res.json({ message: "Logged out successfully! Refresh Token revoked." });
};