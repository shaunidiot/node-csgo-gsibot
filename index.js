var config = require('./config');
var Steam = require('steam');
var fs = require('fs');
var crypto = require('crypto');

var CSGOGSI = require('node-csgo-gsi');
var gsi = new CSGOGSI();

var steamClient = new Steam.SteamClient();
var steamUser = new Steam.SteamUser(steamClient);
var steamFriends = new Steam.SteamFriends(steamClient);

var admin = config.admin;

var gamestate = '';

var logOnOptions = {
    account_name: config.bot.username,
    password: config.bot.password
};

var authCode = config.bot.authCode; // code received by email

try {
    logOnOptions.sha_sentryfile = getSHA1(fs.readFileSync('sentry'));
} catch (e) {
    if (authCode !== '') {
        logOnOptions.auth_code = authCode;
    }
}

// if we've saved a server list, use it
if (fs.existsSync('servers')) {
    Steam.servers = JSON.parse(fs.readFileSync('servers'));
}

steamClient.connect();
steamClient.on('connected', function() {
    steamUser.logOn(logOnOptions);
});

steamClient.on('logOnResponse', function(logonResp) {
    if (logonResp.eresult === Steam.EResult.OK) {
        console.log('[Steam] Bot logged in successfully.');
        steamFriends.setPersonaState(Steam.EPersonaState.Online);
    }
    else if (logonResp.eresult == Steam.EResult.AccountLogonDenied) {
        console.log('[Steam] SteamGuard denied login of bot ' + logOnOptions.account_name);
    }
    else if (logonResp.eresult == Steam.EResult.InvalidPassword) {
        console.log('[Steam] Wrong username/password for bot ' + logOnOptions.account_name);
    }
    else {
        console.log('[Steam] Bot ' + logOnOptions.account_name + ' failed to sign in. ' + logonResp.eresult);
    }
});


steamClient.on('servers', function(servers) {
    fs.writeFile('servers', JSON.stringify(servers));
});

steamUser.on('updateMachineAuth', function(sentry, callback) {
    fs.writeFileSync('sentry', sentry.bytes);
    callback({
        sha_file: getSHA1(sentry.bytes)
    });
});

steamFriends.on('friend', function(source, change) {
    if (change == Steam.EFriendRelationship.RequestRecipient) {
        steamFriends.addFriend(source);
    }
});

function getSHA1(bytes) {
    var shasum = crypto.createHash('sha1');
    shasum.end(bytes);
    return shasum.read();
}

gsi.on('bombTimeStart', function(data) {
    steamFriends.sendMessage(admin, 'Bomb planted.');
});

gsi.on('bombTimeLeft', function(data) {
    var time = parseInt(Math.floor(data)) - config.c4buffer;
    if (time < 0) {
        return;
    }
    if (time % 5 == 0) {
        steamFriends.sendMessage(admin, time + ' seconds left.');
    }
});

gsi.on('gamePhase', function(data) {
    if (gamestate !== data) {
        switch (data) {
            case 'warmup':
            steamFriends.sendMessage(admin, 'Warmup detected.');
            break;
            case 'live':
            steamFriends.sendMessage(admin, 'Game starting.');
            break;
        }
        gamestate = data;
    }
});
