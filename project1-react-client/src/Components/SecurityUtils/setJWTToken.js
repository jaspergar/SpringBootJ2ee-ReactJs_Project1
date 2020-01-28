import axios from "axios"

const setJWTToken = token =>{
    token? axios.defaults.headers.common["Authorization"] = token : delete axios.defaults.headers.common["Authorization"]
}

export default setJWTToken;