import * as env from "../config/env.js"
import * as authMsService from "../services/auth-ms-service.js"

export const loginWithMicrosoft = (req, res) => {
    const authUrl = `${env.MICROSOFT_AUTH_ENDPOINT}?client_id=${env.MICROSOFT_CLIENT_ID}&response_type=code&redirect_uri=${env.MICROSOFT_REDIRECT_URI}&response_mode=query&scope=User.Read`;
    
    res.redirect(authUrl);
};

export const microsoftCallback = async (req, res) => {
    try {
        const authCode = req.query.code

        if (!authCode) {
            return res.status(400).send("No code provided")
        }

        const token = await authMsService.microsoftLogin(authCode);
        
        // res.json({
        //     message: "Login Success via Microsoft",
        //     accessToken: token
        // })
        res.redirect(`http://localhost:5500/?token=${token}`);
    } catch (err) {
        console.log(err);
        // if (err.response) {
        //     console.error("Microsoft Error Data:", err.response.data);
        // } else {
        //     console.error(err);
        // }
        // res.status(401).json({ error: err.message })
        res.redirect(`http://localhost:5500/?error=${encodeURIComponent(err.message)}`);
    }
}

export const getSecureData = (req, res) => {
    res.json({ 
        message: "Hello, Welcome to webcam Angry bird 67 eighteen++",
        secretData: `Angry bird 67 gooning for you Mr.${req.user.studentId}.`,
        userData: req.user 
    });
};