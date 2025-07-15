import json, os, time
from pypresence import Presence
import toml

rpc = None
active_client_id = None
last_mode = None

MODULE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_TOML_PATH = os.path.abspath(os.path.join(MODULE_DIR, "../config.toml"))
METADATA_PATH = os.path.abspath(os.path.join(MODULE_DIR, "../metadata.json"))
STOP_FLAG_PATH = os.path.join(MODULE_DIR, "stop.flag")
LOCK_FILE_PATH = os.path.join(MODULE_DIR, "running.lock")
start_timestamp = int(time.time())

def log(message):
    print(f"\033[95m[\033[0m\033[92mCBAddons\033[0m\033[95m]\033[0m {message}")

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
        mode = str(discord_cfg.get("rich_presence_type", "0")).strip()
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
    global rpc, active_client_id, start_timestamp
    stop_rpc()
    try:
        rpc = Presence(str(preset["clientId"]))
        rpc.connect()
        active_client_id = str(preset["clientId"])
        start_timestamp = int(time.time())
        log(f"Started Discord Rich Presence with client ID {active_client_id}.")
    except Exception as e:
        log(f"Error starting RPC: {e}")
        rpc = None
        active_client_id = None

def update_rpc(preset):
    if not rpc:
        return
    try:
        kwargs = {
            "start": start_timestamp
        }
        if preset.get("details"):
            kwargs["details"] = preset["details"]
        if preset.get("state"):
            kwargs["state"] = preset["state"]
        rpc.update(**kwargs)
    except Exception as e:
        log(f"Error updating RPC: {e}")

def should_stop():
    return os.path.exists(STOP_FLAG_PATH)

def create_lock():
    try:
        with open(LOCK_FILE_PATH, "w") as f:
            f.write("running")
    except:
        pass

def remove_lock_and_flag():
    if os.path.exists(LOCK_FILE_PATH):
        os.remove(LOCK_FILE_PATH)
    if os.path.exists(STOP_FLAG_PATH):
        os.remove(STOP_FLAG_PATH)

log("Celebimew's Addons Discord Rich Presence Helper started.")
create_lock()

try:
    while not should_stop():
        config = read_config()
        if not config or not config.get("enabled", False):
            if rpc:
                log("Config disabled or unreadable. Stopping RPC.")
            stop_rpc()
            last_mode = None
            active_client_id = None
        else:
            mode = str(config.get("mode", "0")).strip()
            preset = RPC.get(mode)

            if not preset:
                log(f"Invalid mode '{mode}' in config.")
                stop_rpc()
                last_mode = None
                active_client_id = None
            else:
                preset_id = str(preset["clientId"])

                if rpc is None or mode != last_mode or preset_id != active_client_id:
                    log(f"Restarting RPC. Reason - rpc is None: {rpc is None}, mode changed: {mode != last_mode}, clientId changed: {preset_id != active_client_id}")
                    start_rpc(preset)
                    last_mode = mode
                update_rpc(preset)
        time.sleep(1)
finally:
    stop_rpc()
    remove_lock_and_flag()
    log("RPC Helper stopped.")
