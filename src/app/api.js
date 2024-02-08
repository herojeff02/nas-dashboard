import axios from "axios";

const SERVER = "http://1.2.3.2:55255/"

export const API = class {
    constructor(timeout = 1000) {
        this.timeout = timeout
    }
    get(endpoint=""){
        if (endpoint.startsWith("/")) {
            endpoint.replace("/", "")
        }

        return axios.get(SERVER + endpoint,{
            timeout: this.timeout
        })
    }

    AVAIL_ENDPOINT = {
        "ping": "",
        "power": {
            "shutdown": "power/shutdown",
            "reboot": "power/reboot"
        },
        "service": {
            "supervisor": "service/supervisor",
            "transmission": "service/transmission"
        },
        "prometheus": "prometheus"
    }
}