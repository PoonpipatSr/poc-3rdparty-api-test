import * as microsoftRepo from "../repositories/microsoft-repository.js"
import jwt from "jsonwebtoken"
import * as env from "../config/env.js"
import * as error from "../errors/error.js"

export const microsoftLogin = async (authMSCode) => {
    const msToken = await microsoftRepo.getAccessTokenFromCode(authMSCode)

    const profile = await microsoftRepo.getMicrosoftProfile(msToken)

    console.log(profile);

    const studentId = profile.onPremisesSamAccountName;
    console.log(`SID: ${studentId}`);

    if(!profile.mail.endsWith('@kmutt.ac.th')) {
        throw error.forbiddenError("Permission for KMUTT Student Only")
    }

    const payload = {
        studentId: studentId,
        userId: profile.id,
        email: profile.mail,
        name: profile.displayName,
        role: 'student'
    }

    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' })
}