# zerotier-fileserver
If u can't port forward ur router like me and don't want to waste time with uploading to drive/dropbox/mediafire etc.

You'll love this little fireserver using [ZeroTier](www.zerotier.com)
Only one person needs to set up an account to set up the network, then anyone on the network can host stuff like [this](https://github.com/Doommafia/zerotier-fileserver).

## Disclaimer
> This is VERY basic&ugly, but provides all the functionality I've needed.

# SETUP
All you need is node, your [ZeroTier IP](https://imgur.com/a/XxOwrm3).
After editing the ZEROTIER_IP in server.js and setting it to your server ip you just:
```
npm init
node server.js
```
