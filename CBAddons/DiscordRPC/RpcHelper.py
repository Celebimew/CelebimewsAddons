import json, os, time
from pypresence import Presence
import toml

rpc = None
active_client_id = None
last_mode = None

MODULE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_TOML_PATH = os.path.abspath(os.path.join(MODULE_DIR, "../config.toml"))
METADATA_PATH = os.path.abspath(os.path.join(MODULE_DIR, "../metadata.json"))

def log(message):
    print(f"[CBAddons] {message}")

def get_version():
    try:
        with open(METADATA_PATH, "r") as f:
            metadata = json.load(f)
            return metadata.get("version", "Unknown")
    except Exception as e:
        print("Failed to load metadata.json:", e)
        return "Unknown"

VERSION = get_version()

RPC = {
    "0": {
        "clientId": "1394250573318066249",
        "details": "Floor: None | Mode: None | Type: None",
        "state": f"Celebimew's Addons V.{VERSION}"
    },
    "1": {
        "clientId": "1389511636158517288",
        "details": "Floor: F1 | Mode: Carrier | Type: Catacombs",
        "state": f"Celebimew's Addons V.{VERSION}"
    },
    "2": {
        "clientId": "1389511636158517288",
        "details": "Floor: F2 | Mode: Carrier | Type: Catacombs",
        "state": f"Celebimew's Addons V.{VERSION}"
    },
    "3": {
        "clientId": "1389511636158517288",
        "details": "Floor: F3 | Mode: Carrier | Type: Catacombs",
        "state": f"Celebimew's Addons V.{VERSION}"
    },
    "4": {
        "clientId": "1389511636158517288",
        "details": "Floor: F4 | Mode: Carrier | Type: Catacombs",
        "state": f"Celebimew's Addons V.{VERSION}"
    },
    "5": {
        "clientId": "1389511636158517288",
        "details": "Floor: F5 | Mode: Carrier | Type: Catacombs",
        "state": f"Celebimew's Addons V.{VERSION}"
    },
    "6": {
        "clientId": "1389511636158517288",
        "details": "Floor: F6 | Mode: Carrier | Type: Catacombs",
        "state": f"Celebimew's Addons V.{VERSION}"
    },
    "7": {
        "clientId": "1389511636158517288",
        "details": "Floor: F7 | Mode: Carrier | Type: Catacombs",
        "state": f"Celebimew's Addons V.{VERSION}"
    }
}

def read_config():
    if not os.path.exists(CONFIG_TOML_PATH):
        log("config.toml not found.")
        return None
    try:
        with open(CONFIG_TOML_PATH, "r", encoding="utf-8") as f:
            raw = f.read()
            config = toml.loads(raw)
        discord_cfg = config.get("discord", {})
        enabled = discord_cfg.get("discord_rich_presence", False)
        mode = str(discord_cfg.get("rich_presence_type", "0"))
        return {"enabled": enabled, "mode": mode}
    except Exception as e:
        log(f"Failed to read config.toml: {e}")
        return None

def stop_rpc():
    global rpc, active_client_id
    if rpc:
        try:
            rpc.clear()
            rpc.close()
            log("Stopped Discord Rich Presence.")
        except Exception as e:
            log(f"Error stopping RPC: {e}")
    rpc = None
    active_client_id = None

def start_rpc(preset):
    global rpc, active_client_id
    stop_rpc()
    try:
        rpc = Presence(preset["clientId"])
        rpc.connect()
        active_client_id = preset["clientId"]
        log("Started Discord Rich Presence.")
    except Exception as e:
        log(f"Error starting RPC: {e}")
        rpc = None

def update_rpc(preset):
    if not rpc:
        return
    try:
        kwargs = {}
        if preset.get("details"):
            kwargs["details"] = preset["details"]
        if preset.get("state"):
            kwargs["state"] = preset["state"]
        rpc.update(**kwargs)
    except Exception as e:
        log(f"Error updating RPC: {e}")

log("Celebimew's Addons Discord Rich Presence Helper started.")

while True:
    config = read_config()
    if not config:
        stop_rpc()
    elif not config.get("enabled", False):
        stop_rpc()
    else:
        mode = config.get("mode", "0")
        preset = RPC.get(mode)
        if not preset:
            stop_rpc()
        else:
            if mode != last_mode or preset["clientId"] != active_client_id:
                start_rpc(preset)
                last_mode = mode
            update_rpc(preset)
    time.sleep(1)
