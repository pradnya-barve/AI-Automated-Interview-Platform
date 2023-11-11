import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

// Create a token for the user
export const createToken = (email, id, role, expiresIn, SECRET, VIDEOSDK_API_KEY) => {
    var permissions = null;
    if (role==='candidate') {
        permissions = ['allow_join', 'ask_join']
    } else if (role==='hr') {
        permissions = ['allow_join', 'ask_join', 'allow_create', 'ask_create']
    } else if (role==='admin') {
        permissions = ['allow_join', 'ask_join', 'allow_create', 'ask_create', 'allow_delete', 'ask_delete']
    }
    else {
        permissions = ['ask_join']
    }
    // referecence: https://docs.videosdk.live/react/guide/video-and-audio-calling-api-sdk/authentication-and-token#payload-while-generating-token
    return jwt.sign({ 
        email, 
        id,
        role: role,
        permissions: permissions,
        apikey: VIDEOSDK_API_KEY,
        version: 2
    }, SECRET, {
        expiresIn: expiresIn
    });
}
