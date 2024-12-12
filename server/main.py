import json
import os
import subprocess
import base64
from typing import Union
import requests
import random

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()
app.mount("/wall", StaticFiles(directory="wall"), name="wall")

origins = [
    "http://1.2.3.2:3000",
    "http://1.2.3.2:55254",
#    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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

@app.get("/randomwall")
def randomwall():
    list = output_run("ls wall/")
    return random.choice(list)

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


@app.get("/sysinfo")
def sysinfo():
    zsh_output = {
        "top" : output_run("top -b -n 1 | head -n8"),
        "df" : output_run("df"),
        "sda" : output_run("top -b -n 1 | head -n8"),
        "sdb" : output_run("top -b -n 1 | head -n8"),
        "sdc" : output_run("top -b -n 1 | head -n8"),
        "sdd" : output_run("top -b -n 1 | head -n8"),
        "sde" : output_run("top -b -n 1 | head -n8"),
        "nvme0" : output_run("top -b -n 1 | head -n8"),
        "nvme1" : output_run("top -b -n 1 | head -n8"),
        }

    result = {}

    result["uptime"] = "21:43:22 up 6 days"

    result["cpu"] = {}
    result["cpu"]["freq"] = float(4.2)
    result["cpu"]["util"] = float(95)
    result["cpu"]["temp"] = float(40)

    result["mem"] = {}
    result["mem"]["total"] = float(16)
    result["mem"]["used"] = float(3)

    result["dev"] = {}
    result["dev"]["sda"] = {}
    result["dev"]["sda"]["name"] = "sda"
    result["dev"]["sda"]["capacity"] = float(7.5)
    result["dev"]["sda"]["usage"] = float(7)
    result["dev"]["sda"]["temp"] = float(45)
    result["dev"]["sda"]["smart"] = "PASSED"
    result["dev"]["sdb"] = {}
    result["dev"]["sdb"]["name"] = "sdb"
    result["dev"]["sdb"]["capacity"] = float(7.5)
    result["dev"]["sdb"]["usage"] = float(7)
    result["dev"]["sdb"]["temp"] = float(45)
    result["dev"]["sdb"]["smart"] = "PASSED"
    result["dev"]["sdc"] = {}
    result["dev"]["sdc"]["name"] = "sdc"
    result["dev"]["sdc"]["capacity"] = float(7.5)
    result["dev"]["sdc"]["usage"] = float(7)
    result["dev"]["sdc"]["temp"] = float(45)
    result["dev"]["sdc"]["smart"] = "PASSED"
    result["dev"]["sdd"] = {}
    result["dev"]["sdd"]["name"] = "sdd"
    result["dev"]["sdd"]["capacity"] = float(7.5)
    result["dev"]["sdd"]["usage"] = float(7)
    result["dev"]["sdd"]["temp"] = float(45)
    result["dev"]["sdd"]["smart"] = "PASSED"
    result["dev"]["sde"] = {}
    result["dev"]["sde"]["name"] = "sde"
    result["dev"]["sde"]["capacity"] = float(7.5)
    result["dev"]["sde"]["usage"] = float(7)
    result["dev"]["sde"]["temp"] = float(45)
    result["dev"]["sde"]["smart"] = "PASSED"
    result["dev"]["nvme0"] = {}
    result["dev"]["nvme0"]["name"] = "nvme0"
    result["dev"]["nvme0"]["capacity"] = float(7.5)
    result["dev"]["nvme0"]["usage"] = float(7)
    result["dev"]["nvme0"]["temp"] = float(45)
    result["dev"]["nvme0"]["smart"] = "FAILED"
    result["dev"]["nvme1"] = {}
    result["dev"]["nvme1"]["name"] = "nvme1"
    result["dev"]["nvme1"]["capacity"] = float(7.5)
    result["dev"]["nvme1"]["usage"] = float(7)
    result["dev"]["nvme1"]["temp"] = float(45)
    result["dev"]["nvme1"]["smart"] = "STANDBY"

    result["raw"] = zsh_output

    return result
