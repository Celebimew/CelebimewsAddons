import {
  @Vigilant,
  @SwitchProperty,
  @TextProperty,
  @SelectorProperty,
  @ButtonProperty,
  @SliderProperty
} from "Vigilance";

@Vigilant("CBAddons", "Celebimew's Addons", {
  getCategoryComparator: () => (a, b) => {
    const order = ["Config", "GUIs", "Dungeons", "Commands", "Party Commands", "Messages", "Attributes", "Utilities", "Primal Fear", "Client Mode", "Discord", "Other"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  }
})
class Settings {
  @SwitchProperty({
    name: "Client Mode",
    description: "Enable client mode. Please only enable client mode while receiving carries not giving them.",
    category: "Config"
  })
  client_mode = false;

  @SwitchProperty({
    name: "Discord Integration",
    description: "Send carry logs to a Discord webhook (Dont touch if you dont know what this means).",
    category: "Config"
  })
  discord_integration = false;

  @TextProperty({
    name: "Discord Webhook URL",
    description: "Leave empty to disable Discord webhooks.",
    category: "Config"
  })
  discord_webhook_url = "";

  @SwitchProperty({
    name: "Enable Guild Commands",
    description: "Allow guild chat commands like c!price. (Coming Soon)",
    category: "Config"
  })
  guild_commands = false;

  @SwitchProperty({
    name: "Enable Slash Commands",
    description: "Enable slash commands such as /startcarry.",
    category: "Config"
  })
  slash_commands = true;

  @SwitchProperty({
    name: "Auto Requeue",
    description: "Automatically open the queue menu after a run.",
    category: "Config"
  })
  auto_requeue = false;

  @SelectorProperty({
    name: "GUI Theme",
    description: "The theme of the CBA Config GUI.",
    category: "Config",
    options: ["Dark Mode"]
  })
  gui_mode = 0;

  @SwitchProperty({
    name: "Carry GUI",
    description: "Toggle the carry tracker display.",
    category: "GUIs"
  })
  carry_gui_enabled = true;

  @ButtonProperty({
    name: "Carry GUI Position",
    description: "Edit the carry GUI's location on the screen.",
    category: "GUIs",
    placeholder: "Edit"
  })
  commandsGuiCarry() {
    ChatLib.command("cba gui_carry", true);
    Java.type("net.minecraft.client.Minecraft").func_71410_x().func_147108_a(null);
  }

  @SwitchProperty({
    name: "Auto Warp",
    description: "Automatically warp the party at the start of every run (Including kuudra).",
    category: "Dungeons"
  })
  dungeon_auto_warp = false;

  @SwitchProperty({
    name: "Reborn Attribute",
    description: `Announce whenever you get an extra score from a prince with the reborn attribute.`,
    category: "Dungeons"
  })
  attribute_reborn = true;

  @SwitchProperty({
    name: "Blood Ready",
    description: "Send a message in party chat informing them that blood is ready.",
    category: "Dungeons"
  })
  dungeon_blood_ready = true;

  @SwitchProperty({
    name: "Blood Done",
    description: "Send a message in party chat informing them that blood is done.",
    category: "Dungeons"
  })
  dungeon_blood_done = true;

  @SwitchProperty({
    name: "Auto Potion",
    description: "Automatically open your Potion Bag at the start of every run.",
    category: "Dungeons"
  })
  dungeon_auto_pot = false;

  @SwitchProperty({
    name: "Dungeon Sacks Shortcut",
    description: "Enable dungeon sacks shortcut commands like /boom or /sl.",
    category: "Dungeons"
  })
  dungeon_sacks_commands = true;

  @SwitchProperty({
    name: "Autokick (Coming Soon)",
    description: "Auto kick members from the party if they dont meet a requirement",
    category: "Dungeons"
  })
  autokick_status = true;

  @SwitchProperty({
    name: "Hide All Ability Messages",
    description: 'Hides all ability messages.',
    category: "Messages"
  })
  chat_hide_ability = true;

  @SwitchProperty({
    name: "Hide Blocks In The Way Messages",
    description: 'Hides "There are blocks in the way!"',
    category: "Messages"
  })
  chat_hide_blocked = true;

  @SwitchProperty({
    name: "Hide Kill Combo Messages",
    description: 'Hides Grandma Wolf kill combo messages.',
    category: "Messages"
  })
  chat_hide_combo = true;

  @SwitchProperty({
    name: "Hide Ability Cooldown Messages",
    description: 'Hides messages like "This ability is on cooldown for 1s."',
    category: "Messages"
  })
  chat_hide_ability_cd = true;

  @SwitchProperty({
    name: "Hide Loot Share Messages",
    description: 'Hides loot share messages.',
    category: "Messages"
  })
  chat_hide_loot_share = false;

  @SwitchProperty({
    name: "Hide Mini-Boss Messages",
    description: 'Hides Slayer Mini-boss messages.',
    category: "Messages"
  })
  chat_hide_slayer_miniboss = false;

  @SwitchProperty({
    name: "Hide Arachne's Calling Messages",
    description: `Hides messages like "☄ Celebimew placed an Arachne's Calling! (1/4)"`,
    category: "Messages"
  })
  chat_hide_arachne_calling = false;

  @SwitchProperty({
    name: "Hide Arachne's Keeper Messages",
    description: `Hides messages like "Arachne's Keeper used Venom Shot on you hitting you for 74.9 damage and infecting you with venom.`,
    category: "Messages"
  })
  chat_hide_arachne_keeper = true;

  @SwitchProperty({
    name: "Hide Arachne's Brood Messages",
    description: `Hides messages like "Arachne's Brood used Venom Shot on you hitting you for 74.8 damage and infecting you with venom.`,
    category: "Messages"
  })
  chat_hide_arachne_brood = true;

  @SwitchProperty({
    name: "Auto Tip",
    description: `Automatically tips all players when swapping servers.`,
    category: "Utilities"
  })
  util_autotip = false;

  @SwitchProperty({
    name: "Auto Party",
    description: "Toggle auto-accepting party invites.",
    category: "Utilities"
  })
  util_autoparty = true;

  @SwitchProperty({
    name: "Auto Party All",
    description: "If enabled, accept party invites from anyone (Auto Party must be on).",
    category: "Utilities"
  })
  util_autoparty_all = false;

  @TextProperty({
    name: "Auto Party Whitelist",
    description: "Comma-separated list of usernames to auto-party (only used if Auto Party All is off).",
    category: "Utilities"
  })
  util_autoparty_list = "Celebimew, Caelvoria";

  @SwitchProperty({
    name: "Primal Fear",
    description: "Tells you when the primal fear cooldown is over. Set your fear stat below",
    category: "Primal Fear"
  })
  fear_primal = false

  @SliderProperty({
    name: "Fear Stat",
    description: "Set your fear stat for the Primal Fear cooldown tracker.",
    category: "Primal Fear",
    min: 0,
    max: 120
  })
  fear_stat = 0;

  @SwitchProperty({
    name: "Public Speaking Demon",
    description: "Automatically send a message to help with the Public Speaking Demon.",
    category: "Primal Fear"
  })
  fear_speaking = false

  @SwitchProperty({
    name: "Math Teacher",
    description: "Solve the math problem from the math teacher.",
    category: "Primal Fear"
  })
  fear_math = false

  @SwitchProperty({
      name: "Discord Rich Presence",
      description: "Toggle Discord RPC integration.",
      category: "Discord"
  })
  discord_rpc = true;

  @SelectorProperty({
      name: "Rich Presence Type",
      description: "Select the Rich Presence type to display.",
      category: "Discord",
      options: ["Placeholder", "Floor_1", "Floor_2", "Floor_3", "Floor_4", "Floor_5", "Floor_6", "Floor_7"]
  })
  rpc_mode = 0;

  @ButtonProperty({
    name: "Run Rich Presence Helper",
    description: "Because of ChatTriggers limitations, for Discord Rich Presence to work, CBAddons will have to run an external Python script. Click run to run the Rich Presence Helper.",
    category: "Discord",
    placeholder: "Run"
  })
  discordPresenceHelper() {
    ChatLib.command("startrpchelper", true);
    Java.type("net.minecraft.client.Minecraft").func_71410_x().func_147108_a(null);
  }

  @ButtonProperty({
    name: "Support Server",
    description: "Join the Discord server for bug reports, suggestions, etc.",
    category: "Discord",
    placeholder: "Join"
  })
  openDiscordServer() {
    Java.type("java.awt.Desktop").getDesktop().browse(new java.net.URI("https://discord.gg/FkJA5Hf7we"));
  }

  @ButtonProperty({
    name: "General Commands",
    description: "Executes: /cba help_1",
    category: "Commands",
    placeholder: "Open"
  })
  commandsGeneral() {
    ChatLib.command("cba help_1", true);
    Java.type("net.minecraft.client.Minecraft").func_71410_x().func_147108_a(null);
  }

  @ButtonProperty({
    name: "Carry Commands",
    description: "Executes: /cba help_2",
    category: "Commands",
    placeholder: "Open"
  })
  commandsCarry() {
    ChatLib.command("cba help_2", true);
    Java.type("net.minecraft.client.Minecraft").func_71410_x().func_147108_a(null);
  }

  @ButtonProperty({
    name: "Sacks Commands",
    description: "Executes: /cba help_3",
    category: "Commands",
    placeholder: "Open"
  })
  commandsSacks() {
    ChatLib.command("cba help_3", true);
    Java.type("net.minecraft.client.Minecraft").func_71410_x().func_147108_a(null);
  }

  @ButtonProperty({
    name: "Party Commands",
    description: "Executes: /cba help_4",
    category: "Commands",
    placeholder: "Open"
  })
  commandsParty() {
    ChatLib.command("cba help_4", true);
    Java.type("net.minecraft.client.Minecraft").func_71410_x().func_147108_a(null);
  }

    @ButtonProperty({
    name: "Rich Presence Commands",
    description: "Executes: /cba help_5",
    category: "Commands",
    placeholder: "Open"
  })
  commandsRPC() {
    ChatLib.command("cba help_4", true);
    Java.type("net.minecraft.client.Minecraft").func_71410_x().func_147108_a(null);
  }

  @SwitchProperty({
    name: "Party Commands",
    description: "Allow party message commands like c!price.",
    category: "Party Commands"
  })
  party_commands = true;

  @SliderProperty({
    name: "Warp Countdown Delay",
    description: "Time (in seconds) to wait before executing /p warp when someone runs c!warp",
    category: "Party Commands",
    min: 1,
    max: 30
  })
  party_warp_delay = 5;

  @ButtonProperty({
    name: "Github Repo",
    description: "Open the Github Repo to check for updates!",
    category: "Other",
    placeholder: "Open"
  })
  openWebsite() {
    Java.type("java.awt.Desktop").getDesktop().browse(new java.net.URI("https://github.com/Celebimew/CelebimewsAddons"));
  }

  @ButtonProperty({
    name: "Support Server",
    description: "Join the Discord server for bug reports, suggestions, etc.",
    category: "Other",
    placeholder: "Join"
  })
  openDiscord() {
    Java.type("java.awt.Desktop").getDesktop().browse(new java.net.URI("https://discord.gg/FkJA5Hf7we"));
  }

    @ButtonProperty({
      name: "Check for Updates",
      description: "Checks GitHub for the latest release of CBAddons.",
      category: "Other",
      placeholder: "Check"
    })
    checkupdates() {
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

  constructor() {
    this.initialize(this);
  }

  getWhitelist() {
    return this.util_autoparty_list
      .split(",")
      .map(name => name.trim().toLowerCase())
      .filter(name => name.length > 0);
  }
}

export default new Settings();
