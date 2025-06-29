import {
  @Vigilant,
  @SwitchProperty,
  @TextProperty,
  @SelectorProperty,
  @ButtonProperty
} from "Vigilance";

@Vigilant("CBAddons", "Celebimew's Addons", {
  getCategoryComparator: () => (a, b) => {
    const order = ["Config", "Commands", "Other"];
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

  @ButtonProperty({
    name: "Listcarries Command",
    description: "Executes: /listcarries",
    category: "Commands",
    placeholder: "List Active Carries"
  })
  sayHello() {
    ChatLib.command("listcarries", true);
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
