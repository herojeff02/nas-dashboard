import os
import subprocess
from typing import Union

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://1.2.3.2:3000",
    "http://1.2.3.2:55254"
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


@app.get("/smartctl/sda")
def restart_transmission():
    return output_run("sudo smartctl -an standby /dev/sda")


@app.get("/smartctl/sdb")
def restart_transmission():
    return output_run("sudo smartctl -an standby /dev/sdb")


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}
