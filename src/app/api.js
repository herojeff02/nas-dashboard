import axios from "axios";

const SERVER = "http://1.2.3.2:55255/"

export const API = class {
    get(endpoint=""){
        if (endpoint.startsWith("/")) {
            endpoint.replace("/", "")
        }

        return axios.get(SERVER + endpoint,{
            timeout: 1000
        }).catch(()=>{})
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
        "smartctl": {
            "sda": "smartctl/sda",
            "sdb": "smartctl/sdb"
        }
    }
}