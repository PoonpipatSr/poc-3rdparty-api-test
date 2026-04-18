import axios from "axios";
import * as env from "../config/env.js"

export const getAccessTokenFromCode = async (authMSCode) => {
    const response = await axios.post(env.MICROSOFT_TOKEN_ENDPOINT,
        new URLSearchParams({
            client_id: env.MICROSOFT_CLIENT_ID,
            client_secret: env.MICROSOFT_CLIENT_SECRET,
            code: authMSCode,
            redirect_uri: env.MICROSOFT_REDIRECT_URI,
            grant_type: 'authorization_code'
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
    return response.data.access_token    
}

export const getMicrosoftProfile = async (accessMSToken) => {
    const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
        headers: {
            Authorization: `Bearer ${accessMSToken}`
        }
    })

    return response.data;
}
