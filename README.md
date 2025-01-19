# ZeroTier FileServer

A lightweight file server solution designed for users who cannot port forward their routers and prefer not to waste time uploading files to cloud storage services like Google Drive, Dropbox, or MediaFire.

This file server utilizes [ZeroTier](https://www.zerotier.com), allowing one person to set up an account and create a network. Once the network is established, anyone connected can easily host and share files.

## Key Features
- **Easy File Sharing**: Share files and videos directly between devices without relying on cloud storage.
- **Zero Configuration**: Minimal setup required, with only one account needed to create the network.
- **Faster Transfers**: Experience faster file transfers compared to traditional cloud services.

## MISSING
- **Interacting with multiple files**: Remove/Install multiple files

## Preview
Here’s what the file server looks like in action:

![ZeroTier FileServer](https://i.imgur.com/PCuZz93_d.webp?maxwidth=760&fidelity=grand)

## Disclaimer
> This is a very basic and unpolished implementation, but it provides all the essential functionality I have needed.

## Setup Instructions
To set up the ZeroTier FileServer, follow these steps:

1. Ensure you have [Node.js](https://nodejs.org/) installed on your system.
2. Install [Express](https://expressjs.com/):
    ```bash
    npm install express
    ```
3. Obtain your ZeroTier IP:

![ZeroTier IP](https://i.imgur.com/LCgCESK.png)
4. Edit the `server.js` file to set the `ZEROTIER_IP` to your server's IP.<br>
5. Initialize the project and start the server:
    ```bash
    npm init -y
    node server.js
    ```

## Usage
Once the server is running, connected users can access the file-sharing functionality as intended.
