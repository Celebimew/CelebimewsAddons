import {
  @Vigilant,
  @SwitchProperty,
  @TextProperty,
  @SelectorProperty,
  @ButtonProperty
} from "Vigilance";

@Vigilant("CBAddons", "Celebimew's Addons", {
  getCategoryComparator: () => (a, b) => {
    const order = ["Config", "Dungeons", "Commands", "Messages", "Discord", "Other"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  }
})
class Settings {
  @SwitchProperty({
    name: "Client Mode",
    description: "Enable client mode. Please only enable client mode while receiving carries not giving them. (Coming Soon)",
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
    name: "Enable Party Commands",
    description: "Allow party message commands like c!price.",
    category: "Config"
  })
  party_commands = true;

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
    name: "Price Info Source",
    description: "Which source to use for c!price.",
    category: "Config",
    options: ["Skyblock Maniacs"]
  })
  price_info = 0;

  @SelectorProperty({
    name: "GUI Theme",
    description: "The theme of the CBA Config GUI.",
    category: "Config",
    options: ["Dark Mode"]
  })
  gui_mode = 0;

  @SwitchProperty({
    name: "Enable Dungeon Sacks Shortcut",
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
    category: "Chat"
  })
  chat_hide_ability = true;

  @SwitchProperty({
    name: "Hide Implosion Messages",
    description: 'Hides implosion messages like "Your Implosion hit 1 enemy for 1,857,709.3 damage."',
    category: "Chat"
  })
  chat_hide_implosion = true;

  @SwitchProperty({
    name: "Hide Blocks In The Way Messages",
    description: 'Hides "There are blocks in the way!"',
    category: "Chat"
  })
  chat_hide_blocked = true;

  @SwitchProperty({
    name: "Hide Ability Cooldown Messages",
    description: 'Hides messages like "This ability is on cooldown for 1s."',
    category: "Chat"
  })
  chat_hide_ability_cd = true;

  @SwitchProperty({
    name: "Hide Arachne's Calling Messages",
    description: `Hides messages like "☄ Celebimew placed an Arachne's Calling! (1/4)"`,
    category: "Chat"
  })
  chat_hide_arachne_calling = false;

  @SwitchProperty({
    name: "Hide Arachne's Keeper Messages",
    description: `Hides messages like "Arachne's Keeper used Venom Shot on you hitting you for 74.9 damage and infecting you with venom.`,
    category: "Chat"
  })
  chat_hide_arachne_keeper = true;

  @SwitchProperty({
    name: "Hide Arachne's Brood Messages",
    description: `Hides messages like "Arachne's Brood used Venom Shot on you hitting you for 74.8 damage and infecting you with venom.`,
    category: "Chat"
  })
  chat_hide_arachne_brood = true;
  
  @SwitchProperty({
    name: "Enable Discord Rich Presence (Coming Soon)",
    description: "Enable or disable Discord Rich Presence.",
    category: "Discord"
  })
  discord_rps = false;

  @SelectorProperty({
    name: "Discord Rich Presence Type",
    description: "Select which type of Discord Rich Presence to use.",
    category: "Discord",
    options: ["Floor_1", "Floor_2", "Floor_3", "Floor_4", "Floor_5", "Floor_6", "Floor_7", "Master_1", "Master_2", "Master_3", "Master_4", "Master_5", "Master_6", "Master_7"]
  })
  discord_rps_type = 0;

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
    checkUpdates() {
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

          Java.type("net.minecraft.client.Minecraft").func_71410_x().func_147108_a(null);
    }

  constructor() {
    this.initialize(this);
  }
}

export default new Settings();
