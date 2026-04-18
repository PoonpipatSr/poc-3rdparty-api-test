import * as microsoftRepo from "../repositories/microsoft-repository.js"
import jwt from "jsonwebtoken"
import * as env from "../config/env.js"
import * as error from "../errors/error.js"

export const microsoftLogin = async (authMSCode) => {
    const msToken = await microsoftRepo.getAccessTokenFromCode(authMSCode)

    const profile = await microsoftRepo.getMicrosoftProfile(msToken)

    if(!profile.mail.endsWith('@ad.sit.kmutt.ac.th')) {
        throw error.forbiddenError("Permission for SIT Student Only")
    }

    const payload = {
        userId: profile.id,
        email: profile.mail,
        name: profile.displayName,
        role: 'student'
    }

    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' })
}