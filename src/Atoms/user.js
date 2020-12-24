import { atom } from 'jotai';

const userAtom = atom(
    JSON.parse(localStorage.getItem('user')) || {},
    (get, set, newUser) => {
        localStorage.setItem('user', JSON.stringify(newUser));
        set(userAtom, newUser);
    }
);

export default userAtom;