import { mockUsers, mockRefreshTokens } from "../../config/db.js";

export const findUserByUsername = (username) => {
    return mockUsers.find(user => user.username === username)
}

export const getRefreshToken = () => {
    return mockRefreshTokens
}