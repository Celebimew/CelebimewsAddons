const version = JSON.parse(FileLib.read("CBAddons", "metadata.json")).version;
ChatLib.chat(`&9&l[&a&lCBA&9&l] &aYou are running Celebimew's Addons &d&lV.${version}`);
import config from "./config";
import request from "../requestV2";
import { onChatPacket } from "../BloomCore/utils/Events";
const ProcessBuilder = Java.type("java.lang.ProcessBuilder");
const { File } = Java.type("java.io");

const moduleDir = new File("config/ChatTriggers/modules/CBAddons");
const batDir = new File(moduleDir, "DiscordRPC");
const lockFile = new File(batDir, "running.lock");

register("command", () => {
    try {
        if (!batDir.exists()) {
            ChatLib.chat("&cDirectory not found: /DiscordRPC");
            return;
        }

        if (lockFile.exists()) {
            ChatLib.chat("&c&lCBA >> &cThe Discord Rich Presence Helper is already running!");
            return;
        }

        const commandToRun = "StartRPC.bat && echo RPC started && pause";

        const processBuilder = new ProcessBuilder([
            "cmd", "/k", commandToRun
        ]);

        processBuilder.directory(batDir);
        processBuilder.start();

        ChatLib.chat("&a&lCBA >> &aStarted the Discord Rich Presence Helper!");
    } catch (e) {
        ChatLib.chat("&cFailed to execute RPC helper: &7" + e);
    }
}).setName("startrpchelper");

register("command", () => {
    if (lockFile.exists()) {
        lockFile.delete();
        ChatLib.chat("&e&lCBA >> &eCleared stale RPC lock file.");
    } else {
        ChatLib.chat("&a&lCBA >> &aNo lock file found.");
    }
}).setName("clearrpchelper");

register("command", () => {
    const dir = "config/ChatTriggers/modules/CBAddons/DiscordRPC";
    const stopFlag = new File(dir, "stop.flag");
    const lockFile = new File(dir, "running.lock");

    try {
        const writer = new java.io.PrintWriter(stopFlag);
        writer.println("stop");
        writer.close();

        if (lockFile.exists()) lockFile.delete();

        ChatLib.chat("&c&lCBA >> &cSent stop signal to the RPC Helper!");
    } catch (err) {
        ChatLib.chat("&c&lCBA >> &cFailed to stop RPC Helper: &7" + err);
    }
}).setName("stoprpchelper");

function suggestable(text, suggestion, hoverText) {
  const msg = new TextComponent(text);
  msg.setClick("suggest_command", suggestion);
  if (hoverText) msg.setHover("show_text", hoverText);
  return msg;
}

function clickable(text, command, hoverText) {
  const msg = new TextComponent(text);
  msg.setClick("run_command", command);
  msg.setHover("show_text", hoverText);
  return msg;
}

register("command", (...args) => {
  const sub = (args[0] || "").toLowerCase();
  const nameArg = args[1];

  if (sub === "" || sub === "help" || sub === "help_1") {
    ChatLib.chat("&e&m===================================");
    ChatLib.chat("&a&lCelebimew's Addons General Commands: &e&l[1/6]");
    ChatLib.chat(suggestable("§8• §a/cba gui §e- §fOpen config GUI", "/cba gui", "§aClick to paste /cba gui"));
    ChatLib.chat(suggestable("§8• §a/cba help §e- §fShow this help menu", "/cba help", "§aClick to paste /cba help"));
    ChatLib.chat(suggestable("§8• §a/cba version §e- §fShow current version", "/cba version", "§aClick to paste /cba version"));
    ChatLib.chat(clickable("&e&l[NEXT]", "/cba help_2", "&cClick to open Help Page 2!"));
    ChatLib.chat("&e&m===================================");
    return;
  }

  if (sub === "help_2") {
    ChatLib.chat("&e&m===================================");
    ChatLib.chat("&a&lCelebimew's Addons Carry Commands: &e&l[2/6]");
    ChatLib.chat(suggestable("§8• §a/startcarry <Floor> <Amount> <Client> §e- §fStart tracking a carry", "/startcarry", "§aClick to paste /startcarry"));
    ChatLib.chat(suggestable("§8• §a/listcarries §e- §fList all active carries", "/listcarries", "§aClick to paste /listcarries"));
    ChatLib.chat(suggestable("§8• §a/stopcarry <Client> §e- §f", "/stopcarry", "§aClick to paste /stopcarry"));
    ChatLib.chat(suggestable("§8• §a/price <Floor> §e- §fList SBM prices for a floor", "/price ", "§7Click to paste /price"));
    ChatLib.chat(suggestable("§8• §a/dhprice <Floor> §e- §fList DH prices for a floor", "/dhprice ", "§7Click to paste /dhprice"));
    ChatLib.chat(suggestable("§8• §a/calcprice <Floor> <Amount> §e- §fCalculate total SBM prices for a floor", "/calcprice ", "§7Click to paste /calcprice"));
    ChatLib.chat(suggestable("§8• §a/calcdhprice <Floor> <Amount> §e- §fCalculate total DH prices for a floor", "/calcdhprice ", "§7Click to paste /calcdhprice"));
    ChatLib.chat(clickable("&e&l[NEXT]", "/cba help_3", "&cClick to open Help Page 3!"))
    ChatLib.chat("&e&m===================================");
    return;
  }

  if (sub === "help_3") {
    ChatLib.chat("&e&m===================================");
    ChatLib.chat("&a&lCelebimew's Addons Sacks Commands: &e&l[3/6]");
    ChatLib.chat(suggestable("§8• §a/boom §e- §fGet 64 Superboom TNT from dungeon sacks", "/boom", "§aClick to paste /boom"));
    ChatLib.chat(suggestable("§8• §a/sl §e- §fGet 16 Spirit Leaps from dungeon sacks", "/sl", "§aClick to paste /sl"));
    ChatLib.chat(suggestable("§8• §a/pearls §e- §fGet 16 Ender Pearls from combat sacks", "/pearls", "§aClick to paste /pearls"));
    ChatLib.chat(suggestable("§8• §a/draft §e- §fGet 1 Architect's First Draft from dungeon sacks", "/draft", "§aClick to paste /draft"));
    ChatLib.chat(suggestable("§8• §a/traps §e- §fGet 64 Traps from dungeon sacks", "/traps", "§aClick to paste /traps"));
    ChatLib.chat(suggestable("§8• §a/decoy §e- §fGet 64 Decoys from dungeon sacks", "/decoy", "§aClick to paste /decoy"));
    ChatLib.chat(clickable("&e&l[NEXT]", "/cba help_4", "&cClick to open Help Page 4!"));
    ChatLib.chat("&e&m===================================");
    return;
  }

  if (sub === "help_4") {
    ChatLib.chat("&e&m===================================");
    ChatLib.chat("&a&lCelebimew's Addons Party Commands: &e&l[4/6]");
    ChatLib.chat(suggestable("§8• §ac!help §e- §fShow party commands", "c!help", "§7Click to paste c!help"));
    ChatLib.chat(suggestable("§8• §ac!price <Floor> §e- §fList SBM prices for a floor", "c!price ", "§7Click to paste c!price"));
    ChatLib.chat(suggestable("§8• §ac!dhprice <Floor> §e- §fList DH prices for a floor", "c!dhprice ", "§7Click to paste c!dhprice"));
    ChatLib.chat(suggestable("§8• §ac!calcprice <Floor> <Amount> §e- §fCalculate SBM price totals for a floor", "c!calcprice ", "§7Click to paste c!calcprice"));
    ChatLib.chat(suggestable("§8• §ac!calcdhprice <Floor> <Amount> §e- §fCalculate DH price totals for a floor", "c!calcdhprice ", "§7Click to paste c!calcdhprice"));
    ChatLib.chat(suggestable("§8• §ac!warp §e- §fWarp the party after a countdown (Editable in Config)", "c!warp", "§7Click to paste c!warp"));
    ChatLib.chat(suggestable("§8• §ac!stop §e- §fStop a party warp (Only when countdown is still active)", "c!stop", "§7Click to paste c!stop"));
    ChatLib.chat(clickable("&e&l[NEXT]", "/cba help_5", "&cClick to open Help Page 5!"));
    ChatLib.chat("&e&m===================================");
  }

  if (sub === "help_5") {
    ChatLib.chat("&e&m===================================");
    ChatLib.chat("&a&lCelebimew's Addons RPC Commands: &e&l[5/6]");
    ChatLib.chat(suggestable("§8• §a/startrpchelper §e- §fRun the Discord Rich Presence helper", "/startrpchelper", "§7Click to paste /startrpchelper"));
    ChatLib.chat(suggestable("§8• §a/stoprpchelper §e- §fStop the Rich Presence helper", "/stoprpchelper", "§7Click to paste /stoprpchelper"));
    ChatLib.chat(suggestable("§8• §a/clearrpchelper §e- §fOnly use this if helper wont start", "/clearrpchelper", "§7Click to paste /clearrpchelper"));
    ChatLib.chat(clickable("&e&l[NEXT]", "/cba help_6", "&cClick to open Help Page 6!"));
    ChatLib.chat("&e&m===================================");
  }

  if (sub === "help_6") {
    ChatLib.chat("&e&m===================================");
    ChatLib.chat("&a&lCelebimew's Addons Misc Commands: &e&l[6/6]");
    ChatLib.chat(suggestable("§8• §a/namehistory <username> §e- §fView the username history for a user", "/namehistory ", "§7Click to paste /namehistory"));
    ChatLib.chat(clickable("&e&l[NEXT]", "/cba help_1", "&cClick to open Help Page 1!"));
    ChatLib.chat("&e&m===================================");
  }

  if (sub === "version") {
    const version = JSON.parse(FileLib.read("CBAddons", "metadata.json")).version;
    ChatLib.chat(`&9&l[&a&lCBA&9&l] &aYou are running Celebimew's Addons &d&lV.${version}`);
    return;
  }

  if (sub === "gui") {
    config.openGUI();
    ChatLib.chat("&a&lCBA &a>> &aOpening config GUI...");
    return;
  }

  if (sub === "config") {
    config.openGUI();
    ChatLib.chat("&a&lCBA &a>> &aOpening config GUI...");
    return;
  }

  if (sub === "gui_carry") {
    carryGuiMove.open()
    ChatLib.chat("&a&lCBA >> &aIn carry GUI editor. Drag to move, Press ESC to finish.")
  }

  if (sub === "gui_fear") {
    fearGuiMove.open()
    ChatLib.chat("&a&lCBA >> &aIn Primal Fear GUI editor. Drag to move, Press ESC to finish.")
  }

}).setName("cba").setAliases("celebimewsaddons", "celebimewaddons", "cbaddons");

function checkForUpdates() {
  const CURRENT_VERSION = JSON.parse(FileLib.read("CBAddons", "metadata.json")).version;
  const { request } = require("requestV2");

  request({
    url: "https://api.github.com/repos/Celebimew/CelebimewsAddons/releases/latest",
    headers: {
      "User-Agent": "CBAddons"
    }
  })
    .then(res => {
      const data = JSON.parse(res);
      const tag = data.tag_name;
      const match = tag.match(/Release_V\.(\d+\.\d+\.\d+)/);

      if (!match) {
        ChatLib.chat("&c&l[CBAddons] &cCould not parse the latest version tag.");
        return;
      }

      const latest = match[1];

      const compareVersions = (a, b) => {
        const pa = a.split(".").map(Number);
        const pb = b.split(".").map(Number);
        for (let i = 0; i < 3; i++) {
          if (pa[i] > pb[i]) return 1;
          if (pa[i] < pb[i]) return -1;
        }
        return 0;
      };

      const comparison = compareVersions(CURRENT_VERSION, latest);

      if (comparison === 0) {
        ChatLib.chat(`&a&l[CBAddons] &aYou're on the latest version: &d&l${CURRENT_VERSION}`);
      } else if (comparison < 0) {
        ChatLib.chat(`&6[CBAddons] Update available!`);
        ChatLib.chat(`&eCurrent: &d&l${CURRENT_VERSION} &8| &aLatest: &d&l${latest}`);
        ChatLib.chat(`https://github.com/Celebimew/CelebimewsAddons/releases/latest`);
      } else {
        setTimeout(() => ChatLib.chat("&a&lCBA >> &rhmm... this isnt right..."), 1000);
        setTimeout(() => ChatLib.chat(`&a&lCBA >> &rthe version in your metadata is higher than the latest release...`), 3000);
        setTimeout(() => ChatLib.chat("&a&lCBA >> &rmaybe you're a time traveler?"), 5000);
        setTimeout(() => ChatLib.chat("&a&lCBA >> &rwait... did you mess with the metadata file? please dont mess with the metadata file... you might miss important updates!"), 7000);
      }
    })
    .catch(e => {
      ChatLib.chat("&c&l[CBAddons] &cFailed to check for updates.");
    });
}


register("gameLoad", () => {
  checkForUpdates();
});

register("serverConnect", () => {
  Client.scheduleTask(100, checkForUpdates);
});

const PREFIX = "c!";
const partyOnly = true;

const priceMap = {
  f4: "Comp: 600k/500k || S: 850k/700k",
  f5: "Comp: 600k/500k || S: 750k/650k || S+: 1.2m/1m",
  f6: "Comp: 700k/600k || S: 1m/850k || S+: 1.4m/1.2m",
  f7: "Comp: 5m/4m || S: 9.5m/8.25m || S+: 12m/10.5m",
  m1: "S: 1.25m/1m",
  m2: "S: 2.5m/2.2m",
  m3: "S: 4m/3.6m",
  m4: "S: 15m",
  m5: "S: 5.75m/5.25m",
  m6: "S: 8m/6.75m",
  m7: "S: 35m/30m"
};
const dhpriceMap = {
  f4: "Comp: 500k || S: 700k",
  f5: "Comp: 400k || S: 600k || S+: 750k",
  f6: "Comp: 650k || S: 1m || S+: 1.4m",
  f7: "Comp: 5m || S: 8m || S+: 11m",
  m1: "S: 1m",
  m2: "S: 1.75m",
  m3: "S: 2.5m",
  m4: "S: 12m",
  m5: "S: 5m",
  m6: "S: 7m",
  m7: "S: 30m"
};

let warpCountdown = null;
let countdownTime = 0;
let warpCancelled = false;

function runWarpCountdown() {
  if (warpCancelled) {
    ChatLib.say("/pc CBA >> Warp canceled.");
    warpCountdown = null;
    warpCancelled = false;
    return;
  }

  if (countdownTime > 0) {
    ChatLib.say(`/pc CBA >> Warping in ${countdownTime} second${countdownTime > 1 ? "s" : ""}... Type c!stop in party chat to stop!`);
    countdownTime--;
    warpCountdown = setTimeout(runWarpCountdown, 1000);
  } else {
    warpCountdown = null;
    ChatLib.say("/pc CBA >> Warping now!");
    setTimeout(() => {
      ChatLib.command("p warp");
    }, 1000);
  }
}

const commands = {
  price: (args) => {
    const floor = args[0]?.toLowerCase();
    if (!floor) {
      setTimeout(() => {
        ChatLib.say("/pc CBA >> Usage: c!price <floor>");
      }, 500);
      return;
    }

    const result = priceMap[floor];

    if (result) {
      setTimeout(() => {
        ChatLib.say(`/pc CBA >> Skyblock Maniacs (SBM) price for ${floor.toUpperCase()}: ${result}`);
      }, 500);
    } else {
      setTimeout(() => {
        ChatLib.say(`/pc CBA >> Unknown floor: ${floor}`);
      }, 500);
    }
  },
calcprice: (args) => {
  try {
    const floor = ChatLib.removeFormatting(args[0] || "").toLowerCase().trim();
    const amountRaw = args[1];
    const amount = parseInt(amountRaw);

    if (!floor || isNaN(amount)) {
      ChatLib.chat(`§cCBA >> Invalid floor or amount. floor: ${floor}, amountRaw: ${amountRaw}`);
      return setTimeout(() => {
        ChatLib.say("/pc CBA >> Usage: c!calcprice <floor> <amount>");
      }, 500);
    }

    const over5 = amount >= 5;

    const format = (n) => {
      if (typeof n !== "number" || isNaN(n)) {
        throw new Error(`Tried to format invalid number: ${n}`);
      }
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    let comp = 0, s = 0, sp = 0, result = "";

    switch (floor) {
      case "f4":
        comp = format((over5 ? 500000 : 600000) * amount);
        s = format((over5 ? 700000 : 850000) * amount);
        result = `Comp: ${comp} || S: ${s} || No data`;
        break;
      case "f5":
        comp = format((over5 ? 500000 : 600000) * amount);
        s = format((over5 ? 650000 : 750000) * amount);
        sp = format((over5 ? 1000000 : 1200000) * amount);
        result = `Comp: ${comp} || S: ${s} || S+: ${sp}`;
        break;
      case "f6":
        comp = format((over5 ? 600000 : 700000) * amount);
        s = format((over5 ? 850000 : 1000000) * amount);
        sp = format((over5 ? 1200000 : 1400000) * amount);
        result = `Comp: ${comp} || S: ${s} || S+: ${sp}`;
        break;
      case "f7":
        comp = format((over5 ? 4000000 : 5000000) * amount);
        s = format((over5 ? 8250000 : 9500000) * amount);
        sp = format((over5 ? 10500000 : 12000000) * amount);
        result = `Comp: ${comp} || S: ${s} || S+: ${sp}`;
        break;
      case "m1":
        s = format((over5 ? 1000000 : 1250000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m2":
        s = format((over5 ? 2200000 : 2500000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m3":
        s = format((over5 ? 3600000 : 4000000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m4":
        s = format(15000000 * amount);
        result = `- || ${s} || -`;
        break;
      case "m5":
        s = format((over5 ? 5250000 : 5750000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m6":
        s = format((over5 ? 6750000 : 8000000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m7":
        s = format((over5 ? 30000000 : 35000000) * amount);
        result = `- || ${s} || -`;
        break;
      default:
        return setTimeout(() => {
          ChatLib.say(`/pc CBA >> Unknown floor: ${floor}`);
        }, 500);
    }

    setTimeout(() => {
      ChatLib.say(`/pc CBA >> Skyblock Maniacs (SBM) Price for ${amount} ${floor.toUpperCase()} runs: ${result}`);
    }, 500);

  } catch (err) {
    ChatLib.chat(`§cCBA >> [Error: calcprice] ${err}`);
    console.error(err);
  }
},
calcdhprice: (args) => {
  try {
    const floor = ChatLib.removeFormatting(args[0] || "").toLowerCase().trim();
    const amountRaw = args[1];
    const amount = parseInt(amountRaw);

    if (!floor || isNaN(amount)) {
      ChatLib.chat(`§cCBA >> Invalid floor or amount. floor: ${floor}, amountRaw: ${amountRaw}`);
      return setTimeout(() => {
        ChatLib.say("/pc CBA >> Usage: c!calcdhprice <floor> <amount>");
      }, 500);
    }

    const over5 = amount >= 5;

    const format = (n) => {
      if (typeof n !== "number" || isNaN(n)) {
        throw new Error(`Tried to format invalid number: ${n}`);
      }
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    let comp = 0, s = 0, sp = 0, result = "";

    switch (floor) {
      case "f4":
        comp = format(500000 * amount);
        s = format(700000 * amount);
        result = `Comp: ${comp} || S: ${s} || No data`;
        break;
      case "f5":
        comp = format(400000 * amount);
        s = format(600000 * amount);
        sp = format(750000 * amount);
        result = `Comp: ${comp} || S: ${s} || S+: ${sp}`;
        break;
      case "f6":
        comp = format(650000 * amount);
        s = format(1000000 * amount);
        sp = format(1400000 * amount);
        result = `Comp: ${comp} || S: ${s} || S+: ${sp}`;
        break;
      case "f7":
        comp = format(5000000 * amount);
        s = format(8000000 * amount);
        sp = format(11000000 * amount);
        result = `Comp: ${comp} || S: ${s} || S+: ${sp}`;
        break;
      case "m1":
        s = format((over5 ? 1000000 : 1250000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m2":
        s = format((over5 ? 2200000 : 2500000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m3":
        s = format((over5 ? 3600000 : 4000000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m4":
        s = format(15000000 * amount);
        result = `- || ${s} || -`;
        break;
      case "m5":
        s = format((over5 ? 5250000 : 5750000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m6":
        s = format((over5 ? 6750000 : 8000000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m7":
        s = format((over5 ? 30000000 : 35000000) * amount);
        result = `- || ${s} || -`;
        break;
      default:
        return setTimeout(() => {
          ChatLib.say(`/pc CBA >> Unknown floor: ${floor}`);
        }, 500);
    }

    setTimeout(() => {
      ChatLib.say(`/pc CBA >> Dungeon Hub (DH) Price for ${amount} ${floor.toUpperCase()} runs: ${result}`);
    }, 500);

  } catch (err) {
    ChatLib.chat(`§cCBA >> [Error: calcprice] ${err}`);
    console.error(err);
  }
},
  dhprice: (args) => {
    const floor = args[0]?.toLowerCase();
    if (!floor) {
      setTimeout(() => {
        ChatLib.say("/pc CBA >> Usage: c!price <floor>");
      }, 500);
      return;
    }

    const result = dhpriceMap[floor];

    if (result) {
      setTimeout(() => {
        ChatLib.say(`/pc CBA >> Dungeon Hub (DH) price for ${floor.toUpperCase()}: ${result}`);
      }, 500);
    } else {
      setTimeout(() => {
        ChatLib.say(`/pc CBA >> Unknown floor: ${floor}`);
      }, 500);
    }
  },
  warp: () => { 
    if (warpCountdown !== null) {
      ChatLib.say("/pc CBA >> Delayed Warp is already in progress.");
      return;
    }
    countdownTime = config.party_warp_delay;
    warpCancelled = false;
    runWarpCountdown();
  },

  stop: () => {

    if (warpCountdown === null) {
      return;
    }

    warpCancelled = true;
  },

  help: () => {
    ChatLib.command("pc CBA >> Party commands: c!price <floor>, c!calcprice <floor> <amount>, c!dhprice <floor>, c!calcdhprice <floor> <amount>, c!warp, c!stop")
  }
};

const myUsername = Player.getName();

register("chat", (level, chatType, emblem, rank, username, ironman, message) => {
  if (!config.party_commands) return;
  if (chatType !== "Party > ") return;
  if (username === myUsername) return;
  if (!message.startsWith(PREFIX)) return;

  handleCommand(message);
}).setCriteria(/^(\[\d+\] )?(Party > )?(.)? ?(\[\w+\+{0,2}\] )?(\w{1,16}) ?(♲)?: (.*)$/);

register("messageSent", (msg, event) => {
  if (!msg.startsWith(PREFIX)) return;
  if (partyOnly && !msg.startsWith("c!")) return;
  if (!config.party_commands) return;

  handleCommand(msg);
});

function handleCommand(msg) {
  const args = msg.slice(PREFIX.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  if (commands.hasOwnProperty(command)) {
    commands[command](args);
  }
}

const dataPath = "./config/ChatTriggers/modules/CBAddons/guiData/"
const carries = {}

let carryGuiX = parseInt(FileLib.read(dataPath + "CarryGuiX.txt") || "200")
let carryGuiY = parseInt(FileLib.read(dataPath + "CarryGuiY.txt") || "100")

export const carryGuiMove = new Gui()

register("dragged", (dx, dy, x, y) => {
  if (carryGuiMove.isOpen()) {
    carryGuiX = x
    carryGuiY = y
    FileLib.write(dataPath + "CarryGuiX.txt", x)
    FileLib.write(dataPath + "CarryGuiY.txt", y)
  }
})

register("renderOverlay", () => {
  if (!config.carry_gui_enabled) return

  const editing = carryGuiMove.isOpen()
  const hasCarries = Object.keys(carries).length > 0
  if (!editing && !hasCarries) return

  let x = carryGuiX
  let y = carryGuiY

  if (editing) {
    Renderer.drawRect(Renderer.color(0, 0, 0, 120), 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight())
  }


  Renderer.drawStringWithShadow("§a§lCelebimew's Addons Tracker", x, y)
  y += 12

  const entries = hasCarries
    ? Object.entries(carries)
    : [["Client", { floor: "F7", done: 0, target: 0 }]]

  entries.forEach(([client, data]) => {
    Renderer.drawStringWithShadow(`§e• Client: §b${client}`, x, y)
    y += 10
    Renderer.drawStringWithShadow(`§e• | Floor: §c${data.floor.toUpperCase()} §eCarries: §9${data.done}§e/§1${data.target}`, x, y)
    y += 15
  })
})

const floorRegex = /^(f[1-7]|m[1-7])$/i;

const floorNames = {
  f1: "The Catacombs - Floor I",
  f2: "The Catacombs - Floor II",
  f3: "The Catacombs - Floor III",
  f4: "The Catacombs - Floor IV",
  f5: "The Catacombs - Floor V",
  f6: "The Catacombs - Floor VI",
  f7: "The Catacombs - Floor VII"
};

register("command", (floor, amount, client) => {
  if (!floor || !amount || !client) return ChatLib.chat("§cCBA >> Usage: /startcarry <floor> <amount> <client>");
  floor = floor.toLowerCase();

  if (!floorRegex.test(floor)) return ChatLib.chat("§cInvalid floor: " + floor);
  if (floor.startsWith("m")) {
    setTimeout(() => {
      ChatLib.chat("&cCBA >> Master mode carry tracking not available yet!");
    }, 500);
    return;
  }

  if (isNaN(amount)) return ChatLib.chat("§cCBA >> Amount must be a number");

  if (!floorNames[floor]) return ChatLib.chat("§cCBA >> That floor is not supported.");

  carries[client.toLowerCase()] = {
    floor,
    target: parseInt(amount),
    done: 0
  };

  setTimeout(() => {
    ChatLib.say(`/pc CBA >> Started carry for ${client} (${floor.toUpperCase()} x${amount})`);
    ChatLib.chat(`&a&lCBA &7>> &aStarted carry for &b&l${client} &e(&c&l${floor.toUpperCase()} &9&lx${amount}&e)`);
  }, 500);
}).setName("startcarry");

register("command", () => {
  if (Object.keys(carries).length === 0) return ChatLib.chat("§cCBA >> No active carries.");
  ChatLib.chat("§eActive Carries:");
  Object.entries(carries).forEach(([client, data]) => {
    ChatLib.chat(`§b• ${client}: ${data.floor.toUpperCase()} ${data.done}/${data.target}`);
  });
}).setName("listcarries").setAliases("listcarry");

register("command", (client) => {
  if (!client) return ChatLib.chat("§cCBA >> Usage: /stopcarry <client>");
  client = client.toLowerCase();
  if (!carries[client]) return ChatLib.chat("§cCBA >> No carry found for client: " + client);

  delete carries[client];
  setTimeout(() => {
    ChatLib.say(`/pc CBA >> Carry for ${client} stopped early.`);
    ChatLib.chat(`&a&lCBA &7>> &cStopped carry for &b&l${client}.`);
  }, 500);
}).setName("stopcarry").setAliases("removecarry", "remcar", "remcarry", "delcarry");

let dungeonStarted = false;

register("chat", () => {
  if (Object.keys(carries).length === 0 || dungeonStarted) return;

  dungeonStarted = true;
  setTimeout(() => {
    ChatLib.say("/pc CBA >> Reminder: Milestone 2 for chests! Milestone 3 for max EXP!");
  }, 1000);
}).setCriteria("Starting in 1 second.");

register("chat", () => {
  if (config.dungeon_auto_warp) {
    ChatLib.command("p warp", false);
  }
}).setCriteria("Starting in 4 seconds.");

register("chat", () => {
  if (config.dungeon_auto_pot) {
    ChatLib.command("pb", false);
  }
}).setCriteria("Starting in 3 seconds.");

register("worldLoad", () => {
  dungeonStarted = false;
});

function getSuperboomCount() {
  let inv = Player.getInventory().getItems();
  let count = 0;

  inv.forEach(item => {
    if (item && item.getName().removeFormatting().includes("Superboom TNT")) {
      count += item.getStackSize();
    }
  });

  return count;
}
function getSpiritLeapCount() {
  let inv = Player.getInventory().getItems();
  let count = 0;

  inv.forEach(item => {
    if (item && item.getName().removeFormatting().includes("Spirit Leap")) {
      count += item.getStackSize();
    }
  });

  return count;
}
function getEnderPearlCount() {
  let inv = Player.getInventory().getItems();
  let count = 0;

  inv.forEach(item => {
    if (item && item.getName().removeFormatting().includes("Ender Pearl")) {
      count += item.getStackSize();
    }
  });

  return count;
}
function getDecoyCount() {
  let inv = Player.getInventory().getItems();
  let count = 0;

  inv.forEach(item => {
    if (item && item.getName().removeFormatting().includes("Decoy")) {
      count += item.getStackSize();
    }
  });

  return count;
}
function getTrapCount() {
  let inv = Player.getInventory().getItems();
  let count = 0;

  inv.forEach(item => {
    if (item && item.getName().removeFormatting().includes("Trap")) {
      count += item.getStackSize();
    }
  });

  return count;
}

let commandQueue = [];
let isProcessing = false;

function processQueue() {
  if (commandQueue.length === 0) {
    isProcessing = false;
    return;
  }
  isProcessing = true;

  let nextCommand = commandQueue.shift();
  nextCommand();

  setTimeout(processQueue, 2000);
}

function queueCommand(fn) {
  commandQueue.push(fn);
  if (!isProcessing) processQueue();
}

register("command", () => {
  if (!config.dungeon_sacks_commands) return;

  let amount = getSpiritLeapCount();

  if (amount < 16) {
    let needed = 16 - amount;
    queueCommand(() => {
      ChatLib.chat(`&2CBA &7» &6Getting &e${needed} &bSpirit &9Leaps &6from sacks...`);
      ChatLib.command(`gfs spirit_leap ${needed}`, false);
    });
  } else {
    ChatLib.chat("&2CBA &7» &aYou already have at least 16 Spirit Leaps!");
  }
}).setCommandName("spiritleap").setAliases("sl", "sp", "spl", "spirit", "leaps", "spiritleaps", "leap", "spirit_leap", "spirit_leaps");

register("command", () => {
  if (!config.dungeon_sacks_commands) return;

  let amount = getEnderPearlCount();

  if (amount < 16) {
    let needed = 16 - amount;
    queueCommand(() => {
      ChatLib.chat(`&2CBA &7» &6Getting &e${needed} &5Ender &fPearls &6from sacks...`);
      ChatLib.command(`gfs ender_pearl ${needed}`, false);
    });
  } else {
    ChatLib.chat("&2CBA &7» &aYou already have at least 16 Ender Pearls!");
  }
}).setCommandName("enderpearl").setAliases("ep", "epearl", "ender", "pearls", "pearl", "enderpearls", "epearls", "ender_pearls");

register("command", () => {
  if (!config.dungeon_sacks_commands) return;

  let amount = getSuperboomCount();

  if (amount < 64) {
    let needed = 64 - amount;
    queueCommand(() => {
      ChatLib.chat(`&2CBA &7» &6Getting &e${needed} &cSuper&fbooms &6from sacks...`);
      ChatLib.command(`gfs superboom_tnt ${needed}`, false);
    });
  } else {
    ChatLib.chat("&2CBA &7» &aYou already have at least 64 Superboom TNT!");
  }
}).setCommandName("superboom").setAliases("tnt", "boom", "superbooms", "superboomtnt", "super_boom", "superboom_tnt", "superb", "booms");

register("command", () => {
  if (config.dungeon_sacks_commands) {
    queueCommand(() => {
      ChatLib.chat("&2CBA &7» &6Getting 1 &9Architect's &5First Draft &6from sacks...");
      ChatLib.command("gfs architect_first_draft 1", false);
    });
  }
}).setCommandName("architectsdraft").setAliases("draft", "drafts", "architectsdrafts", "architect", "firstdraft");

register("command", () => {
  if (!config.dungeon_sacks_commands) return;

  let amount = getDecoyCount();

  if (amount < 64) {
    let needed = 64 - amount;
    queueCommand(() => {
      ChatLib.chat(`&2CBA &7» &6Getting &e${needed} &fDecoys &6from sacks...`);
      ChatLib.command(`gfs decoy ${needed}`, false);
    });
  } else {
    ChatLib.chat("&2CBA &7» &aYou already have at least 64 Decoys!");
  }
}).setCommandName("decoy").setAliases("decoys", "dungeondecoys");

register("command", () => {
  if (!config.dungeon_sacks_commands) return;

  let amount = getTrapCount();

  if (amount < 64) {
    let needed = 64 - amount;
    queueCommand(() => {
      ChatLib.chat(`&2CBA &7» &6Getting &e${needed} &fTraps &6from sacks...`);
      ChatLib.command(`gfs trap ${needed}`, false);
    });
  } else {
    ChatLib.chat("&2CBA &7» &aYou already have at least 64 Traps!");
  }
}).setCommandName("trap").setAliases("traps", "dungeontraps", "dungeontrap");

register("command", (...args) => {
  const floor = args[0]?.toLowerCase();
  if (!floor) {
    ChatLib.chat("§9§l[§a§lCBA§9§l] §cUsage: /price <floor>");
    return;
  }

  const result = priceMap[floor];
  if (result) {
    ChatLib.chat(`§9§l[§a§lCBA§9§l] §aSBM price for §d${floor.toUpperCase()}§a: §e${result}`);
  } else {
    ChatLib.chat(`§9§l[§a§lCBA§9§l] §cUnknown floor: ${floor}`);
  }
}).setName("price");

register("command", (...args) => {
  const floor = args[0]?.toLowerCase();
  if (!floor) {
    ChatLib.chat("§9§l[§a§lCBA§9§l] §cUsage: /dhprice <floor>");
    return;
  }

  const result = dhpriceMap[floor];
  if (result) {
    ChatLib.chat(`§9§l[§a§lCBA§9§l] §aDH price for §d${floor.toUpperCase()}§a: §e${result}`);
  } else {
    ChatLib.chat(`§9§l[§a§lCBA§9§l] §cUnknown floor: ${floor}`);
  }
}).setName("dhprice");

register("command", () => {
ChatLib.chat("&c&lHypixel Rules: &e&lhttps://support.hypixel.net/hc/en-us/categories/5166495502098-Hypixel-Rules");
}).setName("hypixelrules");

register("command", (...args) => {
  try {
    const floor = ChatLib.removeFormatting(args[0] || "").toLowerCase().trim();
    const amountRaw = args[1];
    const amount = parseInt(amountRaw);

    if (!floor || isNaN(amount)) {
      ChatLib.chat(`§cCBA >> Invalid floor or amount. floor: ${floor}, amountRaw: ${amountRaw}`);
      ChatLib.chat("§9§l[§a§lCBA§9§l] §cUsage: /calcprice <floor> <amount>");
      return;
    }

    const over5 = amount >= 5;
    const format = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let comp = 0, s = 0, sp = 0, result = "";

    switch (floor) {
      case "f4":
        comp = format((over5 ? 500000 : 600000) * amount);
        s = format((over5 ? 700000 : 850000) * amount);
        result = `${comp} || ${s} || No data`;
        break;
      case "f5":
        comp = format((over5 ? 500000 : 600000) * amount);
        s = format((over5 ? 650000 : 750000) * amount);
        sp = format((over5 ? 1000000 : 1200000) * amount);
        result = `${comp} || ${s} || ${sp}`;
        break;
      case "f6":
        comp = format((over5 ? 600000 : 700000) * amount);
        s = format((over5 ? 850000 : 1000000) * amount);
        sp = format((over5 ? 1200000 : 1400000) * amount);
        result = `${comp} || ${s} || ${sp}`;
        break;
      case "f7":
        comp = format((over5 ? 4000000 : 5000000) * amount);
        s = format((over5 ? 8250000 : 9500000) * amount);
        sp = format((over5 ? 10500000 : 12000000) * amount);
        result = `${comp} || ${s} || ${sp}`;
        break;
      case "m1":
        s = format((over5 ? 1000000 : 1250000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m2":
        s = format((over5 ? 2200000 : 2500000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m3":
        s = format((over5 ? 3600000 : 4000000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m4":
        s = format(15000000 * amount);
        result = `- || ${s} || -`;
        break;
      case "m5":
        s = format((over5 ? 5250000 : 5750000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m6":
        s = format((over5 ? 6750000 : 8000000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m7":
        s = format((over5 ? 30000000 : 35000000) * amount);
        result = `- || ${s} || -`;
        break;
      default:
        ChatLib.chat(`§9§l[§a§lCBA§9§l] §cUnknown floor: ${floor}`);
        return;
    }

    ChatLib.chat(`§9§l[§a§lCBA§9§l] §aSkyblock Maniacs (SBM) Price for §d${amount} ${floor.toUpperCase()}§a runs: §e${result}`);
  } catch (err) {
    ChatLib.chat(`§cCBA >> [Error: calcprice] ${err}`);
    console.error(err);
  }
}).setName("calcprice");

register("command", (...args) => {
  try {
    const floor = ChatLib.removeFormatting(args[0] || "").toLowerCase().trim();
    const amountRaw = args[1];
    const amount = parseInt(amountRaw);

    if (!floor || isNaN(amount)) {
      ChatLib.chat(`§cCBA >> Invalid floor or amount. floor: ${floor}, amountRaw: ${amountRaw}`);
      ChatLib.chat("§9§l[§a§lCBA§9§l] §cUsage: /calcdhprice <floor> <amount>");
      return;
    }

    const over5 = amount >= 5;
    const format = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let comp = 0, s = 0, sp = 0, result = "";

    switch (floor) {
      case "f4":
        comp = format(500000 * amount);
        s = format(700000 * amount);
        result = `Comp: ${comp} || S: ${s} || No data`;
        break;
      case "f5":
        comp = format(400000 * amount);
        s = format(600000 * amount);
        sp = format(750000 * amount);
        result = `Comp: ${comp} || S: ${s} || S+: ${sp}`;
        break;
      case "f6":
        comp = format(650000 * amount);
        s = format(1000000 * amount);
        sp = format(1400000 * amount);
        result = `Comp: ${comp} || S: ${s} || S+: ${sp}`;
        break;
      case "f7":
        comp = format(5000000 * amount);
        s = format(8000000 * amount);
        sp = format(11000000 * amount);
        result = `Comp: ${comp} || S: ${s} || S+: ${sp}`;
        break;
      case "m1":
        s = format((over5 ? 1000000 : 1250000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m2":
        s = format((over5 ? 2200000 : 2500000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m3":
        s = format((over5 ? 3600000 : 4000000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m4":
        s = format(15000000 * amount);
        result = `- || ${s} || -`;
        break;
      case "m5":
        s = format((over5 ? 5250000 : 5750000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m6":
        s = format((over5 ? 6750000 : 8000000) * amount);
        result = `- || ${s} || -`;
        break;
      case "m7":
        s = format((over5 ? 30000000 : 35000000) * amount);
        result = `- || ${s} || -`;
        break;
      default:
        return setTimeout(() => {
          ChatLib.say(`/pc CBA >> Unknown floor: ${floor}`);
        }, 500);
    }

    ChatLib.chat(`§9§l[§a§lCBA§9§l] §aDungeon Hub (DH) Price for §d${amount} ${floor.toUpperCase()}§a runs: §e${result}`);
  } catch (err) {
    ChatLib.chat(`§cCBA >> [Error: calcprice] ${err}`);
    console.error(err);
  }
}).setName("calcdhprice");

register("chat", (time) => updateCarryProgress("f1")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cBonzo &r&ein &r&a${time}&r");
register("chat", (time) => updateCarryProgress("f2")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cScarf &r&ein &r&a${time}&r");
register("chat", (time) => updateCarryProgress("f3")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cThe Professor &r&ein &r&a${time}&r");
register("chat", (time) => updateCarryProgress("f4")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cThorn &r&ein &r&a${time}&r");
register("chat", (time) => updateCarryProgress("f5")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cLivid &r&ein &r&a${time}&r");
register("chat", (time) => updateCarryProgress("f6")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cSadan &r&ein &r&a${time}&r");
register("chat", (time) => updateCarryProgress("f7")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cNecron &r&ein &r&a${time}&r");

const floorCooldowns = {};

function updateCarryProgress(floor) {
  if (Object.keys(carries).length === 0) return;

  const now = Date.now();
  const lastTrigger = floorCooldowns[floor] || 0;

  if (now - lastTrigger < 30000) return;
  floorCooldowns[floor] = now;

  Object.entries(carries).forEach(([client, data]) => {
    if (data.floor !== floor || data.done >= data.target) return;

    data.done++;
    const done = data.done;
    const target = data.target;

    setTimeout(() => {
      ChatLib.say(`/pc CBA >> ${done}/${target} runs done for ${client}!`);
    }, 2000);
    Client.showTitle(`${done}/${target}`, "", 0, 40, 10);

    if (done >= target) {
      setTimeout(() => {
        ChatLib.say(`/pc CBA >> The requested amounts of carries for ${client} complete!`);
      }, 2000);
      Client.showTitle("Carry Done!", "", 0, 60, 20);
      delete carries[client];

      if (config.discord_integration) {
        const webhookURL = config.discord_webhook_url?.trim();
        if (!webhookURL || !/^https:\/\/discord\.com\/api\/webhooks\//.test(webhookURL)) {
          ChatLib.chat("&c&lCBA >> &cInvalid webhook URL! Please edit this in the config menu (/cba)");
        } else {
          try {
            const payload = JSON.stringify({
              embeds: [{
                title: "Carry Tracker",
                description: `Carry tracker for **${client}**\nFloor: **${floor.toUpperCase()}**\nCarries: **${done}/${target}**`,
                footer: { text: "Celebimew's Addons Carry Tracker" },
                color: 0x00FF00
              }]
            });

            const connection = new java.net.URL(webhookURL).openConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");

            const outputStream = connection.getOutputStream();
            outputStream.write(new java.lang.String(payload).getBytes("UTF-8"));
            outputStream.close();

            const responseCode = connection.getResponseCode();
            if (responseCode === 204) {
              ChatLib.chat("&a&lCBA >> &aWebhook sent successfully.");
            } else {
              ChatLib.chat(`&c&lCBA >> &cWebhook error (code ${responseCode})`);
            }
          } catch (e) {
            ChatLib.chat(`&c&lCBA >> &cWebhook failed: ${e}`);
          }
        }
      }
    }

    if (config.auto_requeue && data.done < data.target) {
      const floorCommandMap = {
        f1: "/joininstance catacombs_floor_one",
        f2: "/joininstance catacombs_floor_two",
        f3: "/joininstance catacombs_floor_three",
        f4: "/joininstance catacombs_floor_four",
        f5: "/joininstance catacombs_floor_five",
        f6: "/joininstance catacombs_floor_six",
        f7: "/joininstance catacombs_floor_seven"
      };

      const command = floorCommandMap[floor.toLowerCase()];
      if (command) {
        setTimeout(() => {
          ChatLib.command(command.substring(1));
        }, 3000);
      }
    }
  });
}

register("command", (name) => {
  const DEBUG = true;
  const d = (...args) => DEBUG && console.log("[CBA:namehistory]", ...args);

  ChatLib.chat("&aCBA >> Fetching username history...");

  if (!name) {
    ChatLib.chat("&cCBA >> Error: Name not specified");
    return;
  }

  const url = "https://crafty.gg/players/" + name + ".json";
  d("Requesting:", url);

  request({
    url,
    headers: { "User-Agent": "CBAddons/1.0" },
    json: true,
  })
    .then((response) => {
      try {
        if (!response || !Array.isArray(response.usernames) || response.usernames.length === 0) {
          d("No usernames array or empty.", { hasResponse: !!response });
          ChatLib.chat("&cCBA >> No name history found.");
          return;
        }

        const history = response.usernames;
        d("History length:", history.length);
        d("First two (if present):", history[0]?.username, history[1]?.username);

        ChatLib.chat("&e&l=========================");

        ChatLib.chat("&e&l" + history[0].username + " &7- &9Current username");
        d("Printed current:", history[0].username);

        let markedSecondAsRead = false;

        if (history.length > 2) {
          for (let i = 1; i < history.length - 1; i++) {
            const entry = history[i];
            const raw = entry?.changed_at;
            const changed_at = (typeof raw === "string" && raw.includes("T"))
              ? raw.split("T")[0]
              : (raw ? String(raw) : "Unknown date");

            d("Loop i=", i, "username=", entry?.username, "raw_changed_at=", raw, "parsed=", changed_at);

            if (i === 1 && !markedSecondAsRead) {
              markedSecondAsRead = true;
              d("Marked second entry as read:", entry?.username);
            }

            ChatLib.chat("&e&l" + entry.username + " &7- &9" + changed_at);
            d("Printed i=", i);
          }
        } else {
          d("No middle entries to print (length <= 2).");
        }

        if (history.length > 1) {
          const original = history[history.length - 1];
          ChatLib.chat("&e&l" + original.username + " &7- &9Original name");
          d("Printed original:", original.username);
        }

        ChatLib.chat("&e&l=========================");
        d("Done");
      } catch (innerErr) {
        console.log(innerErr);
        ChatLib.chat("&cCBA >> An error occurred (inner).");
      }
    })
    .catch((error) => {
      console.log(error);
      ChatLib.chat("&cCBA >> An error occurred");
    });
}).setName("namehistory").setAliases("name");

register("chat", (msg, event) => {
  if (!config.util_autoparty || config.util_autoparty_all) return;

  const cleaned = ChatLib.removeFormatting(msg);

  if (
    cleaned.includes("has invited you to join their party!") &&
    cleaned.includes("Click here to join!")
  ) {
    const match = cleaned.match(/\] (.+) has invited you to join their party!/);
    const username = match ? match[1] : null;

    if (!username) {
      ChatLib.chat("&c[CBA] Failed to extract username.");
      return;
    }

    const lowerUsername = username.toLowerCase();
    const whitelist = config.getWhitelist();

    if (!whitelist.includes(lowerUsername)) {
      ChatLib.chat(`&c[CBA] Ignored party invite from &7${username} &cbecause they're not in your whitelist.`);
      return;
    }

    ChatLib.chat(`&9&l[&a&lCBA&9&l] &aAccepting party invite from &b${username}&a...`);
    ChatLib.command(`p accept ${username}`);
    setTimeout(() => {
      ChatLib.command(`pc CBA >> Auto party ran the command: /p accept ${username}!`);
    }, 1000);
  }
}).setCriteria("${message}");

register("chat", (msg, event) => {
  if (!config.util_autoparty_all || !config.util_autoparty) return;
  const cleaned = ChatLib.removeFormatting(msg);

  if (
    cleaned.includes("has invited you to join their party!") &&
    cleaned.includes("Click here to join!")
  ) {
    const match = cleaned.match(/\] (.+) has invited you to join their party!/);
    const username = match ? match[1] : null;

    if (username) {
      ChatLib.chat(`&9&l[&a&lCBA&9&l] &aAccepting party invite from &b${username}&a...`);
      ChatLib.command(`p accept ${username}`);
      setTimeout(() => {
        ChatLib.command(`pc CBA >> Auto party ran the command: /p accept ${username}!`);
      }, 1000);
    } else {
      ChatLib.chat("&c[CBA] Failed to extract username.");
    }
  }
}).setCriteria("${message}");

register("chat", (message, event) => {
  if (config.chat_hide_ability && /Your .* hit .* enemies for .* damage\./.test(message))
    cancel(event);
}).setCriteria("${message}");

register("chat", (message, event) => {
  if (config.chat_hide_ability && /Your .* hit .* enemy for .* damage\./.test(message))
    cancel(event);
}).setCriteria("${message}");

register("chat", (message, event) => {
  if (config.chat_hide_implosion && /Your Implosion hit .* enemies for .* damage\./.test(message))
    cancel(event);
}).setCriteria("${message}");

register("chat", (message, event) => {
  if (config.chat_hide_implosion && /Your Implosion hit .* enemy for .* damage\./.test(message))
    cancel(event);
}).setCriteria("${message}");

register("chat", (event) => {
  if (config.chat_hide_blocked) cancel(event);
}).setCriteria("There are blocks in the way!");

register("chat", (message, event) => {
  if (config.chat_hide_ability_cd && /This ability is on cooldown for .*s/.test(message))
    cancel(event);
}).setCriteria("${message}");

register("chat", (message, event) => {
  if (config.chat_hide_arachne_keeper && /Arachne's Keeper used Venom Shot on you hitting you for .* damage and infecting you with venom./.test(message))
    cancel(event);
}).setCriteria("${message}");

register("chat", (message, event) => {
  if (config.chat_hide_arachne_brood && /Arachne's Brood used Venom Shot on you hitting you for .*..* damage and infecting you with venom.\./.test(message))
    cancel(event);
}).setCriteria("${message}");

register("chat", (event) => {
  if (!config.chat_hide_arachne_calling) return;

  const raw = ChatLib.getChatMessage(event, true);
  const stripped = ChatLib.removeFormatting(raw);

  if (stripped.includes("placed an Arachne's Calling")) {
    cancel(event);
  }
});

register("chat", (message, event) => {
  if (config.chat_hide_combo && /\+5 Kill Combo \+.*% ✯ Magic Find/.test(message))
    cancel(event);
}).setCriteria("${message}");
register("chat", (message, event) => {
  if (config.chat_hide_combo && /\+10 Kill Combo \+.* coins per kill/.test(message))
    cancel(event);
}).setCriteria("${message}");
register("chat", (message, event) => {
  if (config.chat_hide_combo && /\+15 Kill Combo \+.*% ✯ Magic Find/.test(message))
    cancel(event);
}).setCriteria("${message}");
register("chat", (message, event) => {
  if (config.chat_hide_combo && /\+20 Kill Combo \+.*☯ Combat Wisdom/.test(message))
    cancel(event);
}).setCriteria("${message}");
register("chat", (message, event) => {
  if (config.chat_hide_combo && /\+25 Kill Combo \+.*% ✯ Magic Find/.test(message))
    cancel(event);
}).setCriteria("${message}");
register("chat", (message, event) => {
  if (config.chat_hide_combo && /\+30 Kill Combo \+.* coins per kill/.test(message))
    cancel(event);
}).setCriteria("${message}");
register("chat", (message, event) => {
  if (config.chat_hide_combo && /Your Kill Combo has expired! You reached a .* Kill Combo!/.test(message))
    cancel(event);
}).setCriteria("${message}");

register("chat", (message, event) => {
  if (config.chat_hide_loot_share && /LOOT SHARE You received loot for assisting .*!/.test(message))
    cancel(event);
}).setCriteria("${message}");

register("chat", (message, event) => {
  if (config.chat_hide_slayer_miniboss && /SLAYER MINI-BOSS .* .* has spawned!/.test(message))
    cancel(event);
}).setCriteria("${message}");
register("chat", (message, event) => {
  if (config.chat_hide_slayer_miniboss && /SLAYER MINI-BOSS .* has spawned!/.test(message))
    cancel(event);
}).setCriteria("${message}");

register("chat", (message) => {
  if (config.client_mode && /.* Milestone ❸: You have dealt .* Total Damage so far! .*s/.test(message))
    ChatLib.command("pc CBA Client Mode >> Milestone 3 Reached!")
}).setCriteria("${message}");

onChatPacket(() => {
  ChatLib.chat("&2CBA &7» &cBlood Ready to Clear!");
  if (config.dungeon_blood_ready) {
    ChatLib.command("pc CBA >> Blood Ready to Clear!");
  }
}).setCriteria("[BOSS] The Watcher: That will be enough for now.");

onChatPacket(() => {
  ChatLib.chat("&2CBA &7» &cBlood Done!");
  if (config.dungeon_blood_done) {
    ChatLib.command("pc CBA >> Blood Done!");
  }
}).setCriteria("[BOSS] The Watcher: You have proven yourself. You may pass.");

register("chat", (message) => {
  if (config.util_autotip && /Sending to server .*.../.test(message))
    ChatLib.command("tip all")
}).setCriteria("${message}");

register("chat", (message) => {
  if (config.util_autotip && /Sending you to .*!/.test(message))
    ChatLib.command("tip all")
}).setCriteria("${message}");

register("chat", (message, event) => {
  if (/You already tipped everyone that has boosters active, so there isn't anybody to be tipped right now!/.test(message))
    cancel(event);
}).setCriteria("${message}");

onChatPacket(() => {
  ChatLib.chat("&2CBA &7» &e+1 Bonus Score! (Reborn attribute)");
  if (config.attribute_reborn) {
    ChatLib.command("pc CBA >> Prince got assasinated! +1 Bonus Score!");
  }
}).setCriteria("A Prince falls. +1 Bonus Score");

let lastTriggerTime = 0;
let timeout = null;

register("chat", (event) => {
  if (!config.fear_speaking) return;
  const message = ChatLib.removeFormatting(ChatLib.getChatMessage(event, true));

  const triggers = [
    /^\[FEAR\] Public Speaking Demon: Speak .+!$/i,
    /^\[FEAR\] Public Speaking Demon: Say something interesting .+!$/i
  ];

  if (triggers.some(regex => regex.test(message))) {
    const now = Date.now();

    if (now - lastTriggerTime < 5000) return;
    lastTriggerTime = now;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      ChatLib.say(`/ac cba-speakingdemon-${randomNum}`);
      ChatLib.chat("&9&l[&a&lCBA&9&l] &aPublic Speaking Demon Solved!");
    }, 1000);
  }
});

register("chat", (event) => {
  if (!config.fear_math) return;
  const message = ChatLib.removeFormatting(ChatLib.getChatMessage(event, true));

  const match = message.match(/QUICK MATHS! Solve: (.+)/i);
  if (match) {
    const rawExpression = match[1];

    const expression = rawExpression
      .replace(/×/g, "*")
      .replace(/[xX]/g, "*")
      .replace(/÷/g, "/")
      .replace(/[^0-9+\-*/().]/g, "");

    try {
      const answer = eval(expression);
      ChatLib.chat(`&9&l[&a&lCBA&9&l] &dPrimal Fear &aAnswer: &b${answer}`);
    } catch (err) {
      ChatLib.chat(`&c[CBA] Could not solve: &f${rawExpression}`);
    }
  }
});

let fear_cooldown = 0;
let fear_amount = 0;

register("chat", (event) => {
  const message = ChatLib.removeFormatting(ChatLib.getChatMessage(event, true)).trim();

  if (message.includes("FEAR. A Primal Fear has been summoned!")) {
    if (!config.fear_primal) return;

    let fearStat = config.fear_stat ?? 0;
    let baseTime = 6 * 60 + 3;

    ChatLib.chat(`&9&l[&a&lCBA&9&l] &dPrimal Fear &acounter started! Your &5&lFear &ais set to: &5&l${fearStat}&a! Change this in config!`);
    Client.showTitle("&dPRIMAL FEAR SPAWNED!", "&dPrimal Fear &7cooldown tracker started!", 10, 60, 10);
    World.playSound("mob.enderdragon.growl", 100, 1);

    if (fearStat >= 120) {
      ChatLib.chat("&9&l[&a&lCBA&9&l] &aYou set your &5&lFear &acounter config to &5&l120&a! Which means there is no cooldown! Congrats!");
      fear_cooldown = 0;
      fear_amount++;
      return;
    }

    fear_cooldown = baseTime - (fearStat * 3);
    if (fear_cooldown < 0) fear_cooldown = 0;

    fear_amount++;

    const interval = setInterval(() => {
      if (fear_cooldown <= 0) {
        clearInterval(interval);
      } else {
        fear_cooldown--;
      }
    }, 1000);

    setTimeout(() => {ChatLib.chat("&9&l[&a&lCBA&9&l] &aThe &dPrimal Fear &acounter has ended! You can now spawn another &dPrimal Fear&a!");}, timeToWait * 990);
    setTimeout(() => {Client.showTitle("&dPRIMAL FEAR READY!", "&7You can now spawn another &dPrimal Fear&a!", 10, 60, 10);}, timeToWait * 980);
    setTimeout(() => {World.playSound("random.levelup", 100, 1);}, timeToWait * 970);
    setTimeout(() => {World.playSound("mob.enderdragon.growl", 100, 0.1);}, timeToWait * 970);
    fear_cooldown = 0;
  }
});

let fearGuiX = parseInt(FileLib.read(dataPath + "fearGuiX.txt") || "200");
let fearGuiY = parseInt(FileLib.read(dataPath + "fearGuiY.txt") || "100");
let lastUpdate = Date.now();

export const fearGuiMove = new Gui();

register("dragged", (dx, dy, x, y) => {
  if (fearGuiMove.isOpen()) {
    fearGuiX = x;
    fearGuiY = y;
    FileLib.write(dataPath + "fearGuiX.txt", x);
    FileLib.write(dataPath + "fearGuiY.txt", y);
  }
});

register("renderOverlay", () => {
  if (!config.fear_gui) return;

  const now = Date.now();
  const delta = (now - lastUpdate) / 1000;
  lastUpdate = now;

  if (fear_cooldown > 0) {
    fear_cooldown = Math.max(0, fear_cooldown - delta);
  }

  const editing = fearGuiMove.isOpen();
  let x = fearGuiX;
  let y = fearGuiY;

  if (editing) {
    Renderer.drawRect(Renderer.color(0, 0, 0, 120), 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());
  }

  Renderer.drawStringWithShadow("§a§lCBAddons Fear Tracker", x, y);
  y += 12;

  let primalFearsText =
    typeof fear_amount === "number" && !isNaN(fear_amount)
      ? `§7• §d§lPrimal Fears: §6${fear_amount}`
      : "§7• §d§lPrimal Fears: §cN/A";

  Renderer.drawStringWithShadow(primalFearsText, x, y);
  y += 12;

  let cooldownText;
  if (typeof fear_cooldown === "number" && !isNaN(fear_cooldown)) {
    cooldownText =
      fear_cooldown > 0
        ? `§7• §e§lCooldown: §c${formatTime(fear_cooldown)}`
        : "§7• §e§lCooldown: §a§lAvailable!";
  } else {
    cooldownText = "§7• §e§lCooldown: §cN/A";
  }

  Renderer.drawStringWithShadow(cooldownText, x, y);
});

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}m ${s}s`;
}
