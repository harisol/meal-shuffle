import { hash } from 'bcrypt';
export const Users = [];

export const findUserByEmail = (email) => {
    return Users.find(u => u.email === email);
};

export const findUserById = (id) => {
    const matchUser = Users.find(u => u.id === id);
    let result = null;
    if (matchUser) {
        result = {...matchUser, password: undefined};
    }

    return result;
};

export const addUser = async (name, email, password) => {
    const encryptedPassword = await hash(password, 10);

    const digit = 3; // max digit for random user ID
    const newUserId = Math.floor(Math.random() * (10 ** digit));
    Users.push({ id: newUserId, name, email, password: encryptedPassword });
};
