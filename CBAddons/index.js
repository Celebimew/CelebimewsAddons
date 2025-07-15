const version = JSON.parse(FileLib.read("CBAddons", "metadata.json")).version;
ChatLib.chat(`&9&l[&a&lCBA&9&l] &aYou are running Celebimew's Addons &d&lV.${version}`);
import config from "./config";
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

  if (sub === "" || sub === "help" || sub === "help_1") {
    ChatLib.chat("&e&m===================================");
    ChatLib.chat("&a&lCelebimew's Addons General Commands: &e&l[1/4]");
    ChatLib.chat(suggestable("§8• §a/cba gui §e- §fOpen config GUI", "/cba gui", "§aClick to paste /cba gui"));
    ChatLib.chat(suggestable("§8• §a/cba help §e- §fShow this help menu", "/cba help", "§aClick to paste /cba help"));
    ChatLib.chat(suggestable("§8• §a/cba version §e- §fShow current version", "/cba version", "§aClick to paste /cba version"));
    ChatLib.chat(clickable("&e&l[NEXT]", "/cba help_2", "&cClick to open Help Page 2!"));
    ChatLib.chat("&e&m===================================");
    return;
  }

  if (sub === "help_2") {
    ChatLib.chat("&e&m===================================");
    ChatLib.chat("&a&lCelebimew's Addons Carry Commands: &e&l[2/4]");
    ChatLib.chat(suggestable("§8• §a/startcarry <Floor> <Amount> <Client> §e- §fStart tracking a carry", "/startcarry", "§aClick to paste /startcarry"));
    ChatLib.chat(suggestable("§8• §a/listcarries §e- §fList all active carries", "/listcarries", "§aClick to paste /listcarries"));
    ChatLib.chat(suggestable("§8• §a/stopcarry <Client> §e- §f", "/stopcarry", "§aClick to paste /stopcarry"));
    ChatLib.chat(suggestable("§8• §a/price <Floor> §e- §fList prices for a floor", "/price ", "§7Click to paste /price"));
    ChatLib.chat(suggestable("§8• §a/calcprice <Floor> <Amount> §e- §fCalculate total prices for a floor", "/calcprice ", "§7Click to paste /calcprice"));
    ChatLib.chat(clickable("&e&l[NEXT]", "/cba help_3", "&cClick to open Help Page 3!"))
    ChatLib.chat("&e&m===================================");
    return;
  }

  if (sub === "help_3") {
    ChatLib.chat("&e&m===================================");
    ChatLib.chat("&a&lCelebimew's Addons Sacks Commands: &e&l[3/4]");
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
    ChatLib.chat("&a&lCelebimew's Addons Party Commands: &e&l[4/4]");
    ChatLib.chat(suggestable("§8• §ac!price <Floor> §e- §fList prices for a floor", "c!price ", "§7Click to paste c!price"));
    ChatLib.chat(suggestable("§8• §ac!calcprice <Floor> <Amount> §e- §fCalculate price totals for a floor", "c!calcprice ", "§7Click to paste c!calcprice"));
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

      if (CURRENT_VERSION === latest) {
        ChatLib.chat(`&a&l[CBAddons] &aYou're on the latest version: &d&l${CURRENT_VERSION}`);
      } else {
        ChatLib.chat(`&6[CBAddons] Update available!`);
        ChatLib.chat(`&eCurrent: &d&l${CURRENT_VERSION} &8| &aLatest: &d&l${latest}`);
        ChatLib.chat(`https://github.com/Celebimew/CelebimewsAddons/releases/latest`);
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

register("worldLoad", () => {
  dungeonStarted = false;
});

register("command", () => {
  if (config.dungeon_sacks_commands) {
    ChatLib.command("gfs spirit_leap 16", false);
  }
}).setCommandName("spiritleap").setAliases("sl", "sp", "spl", "spirit", "leaps", "spiritleaps", "leap", "spirit_leap", "spirit_leaps");

register("command", () => {
  if (config.dungeon_sacks_commands) {
    ChatLib.command("gfs ender_pearl 16", false);
  }
}).setCommandName("enderpearl").setAliases("ep", "epearl", "ender", "pearls", "pearl", "enderpearls", "epearls", "ender_pearls");

register("command", () => {
  if (config.dungeon_sacks_commands) {
    ChatLib.command("gfs superboom_tnt 64", false);
  }
}).setCommandName("superboom").setAliases("tnt", "boom", "superbooms", "superboomtnt", "super_boom", "superboom_tnt", "superb", "booms");

register("command", () => {
  if (config.dungeon_sacks_commands) {
    ChatLib.command("gfs architect_first_draft 1", false);
  }
}).setCommandName("architectsdraft").setAliases("draft", "drafts", "architectsdrafts", "architect", "firstdraft");

register("command", () => {
  if (config.dungeon_sacks_commands) {
    ChatLib.command("gfs decoy 64", false);
  }
}).setCommandName("decoy").setAliases("decoys", "dungeondecoys");

register("command", () => {
  if (config.dungeon_sacks_commands) {
    ChatLib.command("gfs trap 64", false);
  }
}).setCommandName("trap").setAliases("traps", "dungeontraps", "dungeontrap");

register("command", (subcommand, floorArg) => {
  if (!subcommand || subcommand.toLowerCase() !== "carrytracker") {
    ChatLib.chat("&c&lCBA >> &cUsage: /cbadebug carrytracker <f1-f7/m1-m7>");
    return;
  }

  const floor = floorArg?.toLowerCase();
  const validFloors = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "m1", "m2", "m3", "m4", "m5", "m6", "m7"];

  if (!validFloors.includes(floor)) {
    ChatLib.chat("&c&lCBA >> &cInvalid floor: " + floor);
    return;
  }

  const testClient = "DebugClient";

  carries[testClient] = {
    floor: floor,
    done: 0,
    target: 1
  };

  ChatLib.chat(`&a&lCBA >> &aSimulating carry for &d${floor.toUpperCase()} &awith test client.`);
  updateCarryProgress(floor);
}).setName("cbadebug");

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

    ChatLib.chat(`§9§l[§a§lCBA§9§l] §aSBM Price for §d${amount} ${floor.toUpperCase()}§a runs: §e${result}`);
  } catch (err) {
    ChatLib.chat(`§cCBA >> [Error: calcprice] ${err}`);
    console.error(err);
  }
}).setName("calcprice");

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
register("command", () => {
  ChatLib.chat("&6&lCBA >> &6Webhook test command triggered.");

  if (!config.discord_integration) {
    ChatLib.chat("&c&lCBA >> &cDiscord integration is disabled in config.");
    return;
  }

  const webhookURL = config.discord_webhook_url?.trim();
  if (!webhookURL || !/^https:\/\/discord\.com\/api\/webhooks\//.test(webhookURL)) {
    ChatLib.chat("&c&lCBA >> &cInvalid webhook URL! Please edit this in the config menu (/cba)");
    return;
  }

  try {
    const payload = JSON.stringify({
      embeds: [{
        title: "Test Webhook",
        description: "This is a test message from CBAddons.",
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
      ChatLib.chat("&a&lCBA >> &aWebhook test sent successfully.");
    } else {
      ChatLib.chat(`&c&lCBA >> &cWebhook test error (code ${responseCode})`);
    }
  } catch (e) {
    ChatLib.chat(`&c&lCBA >> &cWebhook test failed: ${e}`);
  }
}).setName("cbatestwebhook");

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

register("chat", (event) => {
  if (config.chat_hide_combo) cancel(event);
}).setCriteria("+5 Kill Combo +3% ✯ Magic Find");
register("chat", (event) => {
  if (config.chat_hide_combo) cancel(event);
}).setCriteria("+10 Kill Combo +10 coins per kill");
register("chat", (event) => {
  if (config.chat_hide_combo) cancel(event);
}).setCriteria("+15 Kill Combo +3% ✯ Magic Find");
register("chat", (event) => {
  if (config.chat_hide_combo) cancel(event);
}).setCriteria("+20 Kill Combo +15☯ Combat Wisdom");
register("chat", (event) => {
  if (config.chat_hide_combo) cancel(event);
}).setCriteria("+25 Kill Combo +3% ✯ Magic Find");
register("chat", (event) => {
  if (config.chat_hide_combo) cancel(event);
}).setCriteria("+30 Kill Combo +10 coins per kill");
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

register("chat", (message, event) => {
  if (config.client_mode && /.* Milestone ❸: You have dealt .* Total Damage so far! .*s/.test(message))
    ChatLib.command("pc CBA Client Mode >> Milestone 3 Reached!")
}).setCriteria("${message}");

onChatPacket(() => {
  if (config.dungeon_blood_ready) {
    ChatLib.command("pc CBA >> Blood Ready to Clear!");
  }
}).setCriteria("[BOSS] The Watcher: That will be enough for now.");

onChatPacket(() => {
  if (config.dungeon_blood_done) {
    ChatLib.command("pc CBA >> Blood Done!");
  }
}).setCriteria("[BOSS] The Watcher: You have proven yourself. You may pass.");
