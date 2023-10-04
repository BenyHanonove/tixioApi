import {randomBytes ,createHash} from "crypto";

const secret = "beny-rest-api";

//Function to create random string from bytes
export const random = () => randomBytes(128).toString('base64');

//Function that Generates authentication hash using salt, password, and a secret
export const generateAuthenticationHash = (salt: string, password: string) => {
    return createHash("sha256")
                .update([salt, password].join("/"))
                .update(secret)
                .digest("hex");
};


// Function to check if a provided password matches the old hashed password
export const doesPasswordMatch = (providedPassword: string, providedSalt: string, oldHashedPassword: string): boolean => {

    // Generate a hash for the provided password using the provided salt and compare it with the old hashed password
    const generatedHash = generateAuthenticationHash(providedSalt, providedPassword);
    return generatedHash === oldHashedPassword;
};