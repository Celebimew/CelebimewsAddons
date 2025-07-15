# Celebimews Addons
Chattriggers module for tracking dungeon carries!
# How to install
## Manual Install
1. Install [Chattriggers](https://chattriggers.com/)
2. Put the CBAddons folder to your chattriggers module folder
3. Run `/ct reload` to reload your modules
## In-game Command
(Still pending verification)
# Commands
## Slash Commands
### General
`/cba help` - List Celebimew's Addons commands.<br>
`/cba gui` - Open the config GUI.<br>
`/cba gui_carry` - Open the carry GUI position editor.<br>
`/cba version` - Show current Celebimew's Addons version.<br>
### Price Checkers
`/price <floor>` - List Skyblock Maniacs (SBM) Prices for a floor.<br>
`/calprice <floor> <amount>` - Calculate the total price for multiple runs on a floor.<br>
### Carry Tracking
`/startcarry <floor> <amount> <client>` - Start tracking carries for a client.<br>
`/listcarries` - Lists all active carries.<br>
`/stopcarry <client>` - Stop tracking carries for a client.<br>
### Dungeon Sacks Commands
`/boom` - Take 64 Superboom TNT from your dungeon sacks.<br>
`/sl` - Take 16 Spirit Leap from your dungeon sacks.<br>
`/pearls` - Take 16 Ender Pearls from your combat sacks.<br>
`/draft` - Take 1 Architect's First Draft from your dungeon sacks.<br>
`/traps` - Take 64 Traps from your dungeon sacks.<br>
`/decoy` - Take 64 Decoys from your dungeon sacks.<br>
### Rich Presence Helper Commands
`/startrpchelper` - Run the Discord Rich Presence helper.<br>
`/stoprpchelper` - Stop the Discord Rich Presence helper.<br>
`/clearrpchelper` - Only run this command if the helper refuses to launch.<br>
## Party Commands
### Price Checkers
`c!price <floor>` - List Skyblock Maniacs (SBM) Prices for a floor.<br>
`c!calcprice <floor> <amount>` - Calculate the total price for multiple runs on a floor.<br>
## Guild Commands
Coming Soon!
# Discord Rich Presence
`/startrpchelper` - Launch the rich presence helper.<br>
`/stoprpchelper` - Stop the rich presence helper.<br>
`/clearrpchelper` - If the rich presence helper wont launch, run this command.<br>
Because of ChatTriggers limitations, Celebimew's Addons will launch an external python script to help with rich presence loading. You can run it by running the command: `/startrpchelper`, Clicking the run button in the GUI or running the .bat file in `/DiscordRPC/StartRPC.bat`. When launched by the command or GUI button, it will not pop up a window and will be a background process (Terminate in task manager. It will show up as Python). You will need to install Python and import **pypresence** and **toml**. You can do this by running `pip install pypresence toml` in a terminal (The .bat file installs pypresence and toml automatically).<br>
Customize your Rich Presence in config!
WARNING! You will have to turn off Discord Rich Presence in config or manually terminate the Rich Presence helper or the Rich Presence will continue to show!
# Bug Reports/Questions
Please report any bugs in the discord server [Click Here](https://discord.gg/FkJA5Hf7we)
