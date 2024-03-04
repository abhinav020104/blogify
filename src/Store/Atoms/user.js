import { atom } from "recoil"

const tokenAtom = atom({
    key: "tokenAtom",
    default:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
})

const userAtom = atom({
    key:"userAtom",
    default:{}
})

const loadingAtom = atom({
    key:"loadingAtom",
    default:false,
})

export {tokenAtom , userAtom , loadingAtom};
