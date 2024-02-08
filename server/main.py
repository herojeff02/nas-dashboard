import json
import os
import subprocess
from typing import Union
import requests

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://1.2.3.2:3000",
    "http://1.2.3.2:55254",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


PROMETHEUS_API = "http://1.2.3.2:9101/api/v1/query?query="
SATA = ["sda", "sdb"]
SATA_COMMANDS = ["smartprom_raw_read_error_rate_raw", "smartprom_reallocated_sector_ct_raw",
                 "smartprom_seek_error_rate_raw", "smartprom_spin_retry_count_raw",
                 "smartprom_reallocated_event_count_raw", "smartprom_current_pending_sector_raw",
                 "smartprom_offline_uncorrectable_raw", "smartprom_temperature_celsius_raw",
                 "smartprom_raw_read_error_rate_raw"]
NVME = ["nvme0n1"]
NVME_COMMANDS = ["smartprom_media_errors", "smartprom_critical_warning",
                 "smartprom_percentage_used", "smartprom_available_spare",
                 "smartprom_temperature"]


def simple_run(command):
    os.system(command)


def output_run(command=""):
    try:
        output = subprocess.check_output(command, shell=True)
    except subprocess.CalledProcessError as e:
        output = e.output
    return output.splitlines()


@app.get("/")
def ping():
    return "alive"


@app.get("/power/shutdown")
def shutdown():
    simple_run("sudo shutdown -h now")
    return "success"


@app.get("/power/reboot")
def reboot():
    simple_run("sudo reboot")
    return "success"


@app.get("/service/supervisor")
def restart_supervisor():
    return output_run("sudo service supervisor restart")


@app.get("/service/transmission")
def restart_transmission():
    return output_run("sudo service transmission-daemon restart")


@app.get("/prometheus")
def prometheus():
    request_cache = {}
    result = {}

    def get(query="", idx=0):
        try:
            if query in request_cache.keys():
                return_value = request_cache[query]["data"]["result"][idx]['value'][1]
            else:
                tmp = requests.get(PROMETHEUS_API + query).text
                request_cache[query] = json.loads(tmp)
                return_value = request_cache[query]["data"]["result"][idx]['value'][1]
        except Exception as e:
            return_value = -1
        return return_value

    for index, drive in enumerate(SATA):
        for command in SATA_COMMANDS:
            if drive not in result.keys():
                result[drive] = {}
            result[drive][command] = int(get(command, index))

    for index, drive in enumerate(NVME):
        for command in NVME_COMMANDS:
            if drive not in result.keys():
                result[drive] = {}
            result[drive][command] = int(get(command, index))

    result["cpu"] = {}
    result["cpu"]["freq"] = float(get("(avg by (instance) (node_cpu_scaling_frequency_hertz)) / 1000000000", 0))
    result["cpu"]["util"] = float(get("100 - (avg by (instance) (irate(node_cpu_seconds_total{mode='idle'}[1m])) * 100)", 0))
    result["mem"] = {}
    result["mem"]["total"] = float(get("node_memory_MemTotal_bytes / 1024 / 1024 / 1024", 0))
    result["mem"]["used"] = float(get("(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / 1024 / 1024 / 1024", 0))
    result["mem"]["left"] = float(get("node_memory_MemAvailable_bytes / 1024 / 1024 / 1024", 0))

    return result
