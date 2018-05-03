# node-csgo-gsibot

[![Greenkeeper badge](https://badges.greenkeeper.io/shaunidiot/node-csgo-gsibot.svg)](https://greenkeeper.io/)
Steambot that interacts with you (Admin) and your current CS:GO match's C4 remaining time.

# Description

Based on [Counter-Strike: Global Offensive Game State Integration](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration), client will inform server/localhost that the C4 is planted in-game, in which the Steambot will get notified of the in-game events and notify you about the time remaining (via Steam chat).

# Usage
- Clone repository or download zip [here](https://github.com/shaunidiot/node-csgo-csgibot/archive/master.zip).
- Unzip, open folder and do `npm install`.
- Edit configuration file `config.js`
    - `config.admin` - The main account playing CS:GO.
    - `config.c4buffer` - Compensate for the lag between the client, server and the Steambot. Do multiple test for this to be perfect.
    - `config.bot.username/password/authCode` - Self explanatory.
- Start bot with `node index.js`.

# License
The MIT License (MIT)

Copyright (c) 2015 Shaun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
