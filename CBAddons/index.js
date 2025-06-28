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
  if (chatType !== "Party > ") return;
  if (username === myUsername) return;
  if (!message.startsWith(PREFIX)) return;

  handleCommand(message);
}).setCriteria(/^(\[\d+\] )?(Party > )?(.)? ?(\[\w+\+{0,2}\] )?(\w{1,16}) ?(♲)?: (.*)$/);

register("messageSent", (msg, event) => {
  if (!msg.startsWith(PREFIX)) return;
  if (partyOnly && !msg.startsWith("c!")) return;

  handleCommand(msg);
});

function handleCommand(msg) {
  const args = msg.slice(PREFIX.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  if (commands.hasOwnProperty(command)) {
    commands[command](args);
  }
}

const carries = {};
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
      ChatLib.say("/pc CBA >> Master mode carry tracking not available yet!");
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
}).setName("listcarries");

register("command", (client) => {
  if (!client) return ChatLib.chat("§cCBA >> Usage: /stopcarry <client>");
  client = client.toLowerCase();
  if (!carries[client]) return ChatLib.chat("§cCBA >> No carry found for client: " + client);

  delete carries[client];
  setTimeout(() => {
    ChatLib.say(`/pc CBA >> Carry for ${client} stopped early.`);
  }, 500);
}).setName("stopcarry");

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

register("chat", (time) => updateCarryProgress("f1")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cBonzo &r&ein &r&a${time}&r");
register("chat", (time) => updateCarryProgress("f2")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cScarf &r&ein &r&a${time}&r");
register("chat", (time) => updateCarryProgress("f3")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cThe Professor &r&ein &r&a${time}&r");
register("chat", (time) => updateCarryProgress("f4")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cThorn &r&ein &r&a${time}&r");
register("chat", (time) => updateCarryProgress("f5")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cLivid &r&ein &r&a${time}&r");
register("chat", (time) => updateCarryProgress("f6")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cSadan &r&ein &r&a${time}&r");
register("chat", (time) => updateCarryProgress("f7")).setChatCriteria("${*}&r&c☠ &r&eDefeated &r&cNecron &r&ein &r&a${time}&r");

function updateCarryProgress(floor) {
  if (Object.keys(carries).length === 0) return;

  Object.entries(carries).forEach(([client, data]) => {
    if (data.floor !== floor || data.done >= data.target) return;

    data.done++;
    const done = data.done;
    const target = data.target;

    setTimeout(() => {
      ChatLib.say(`/pc CBA >> ${done}/${target} runs done!`);
    }, 2000);
    Client.showTitle(`${done}/${target}`, "", 0, 40, 10);

    if (done >= target) {
      setTimeout(() => {
        ChatLib.say("/pc CBA >> The requested amounts of carries complete!");
      }, 2000);
      Client.showTitle("Carry Done!", "", 0, 60, 20);
      delete carries[client];
    }
  });
}
