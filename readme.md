> Sticky Note app for managing your daily notes (requires nwjs ver >= 0.76.0)

# Linux

##### Get started

```
cd /path/to/project # navigate to project folder
npm i # install modules
cp node_modules -r /path/to/project/node/linux # copy modules
cp ~/nwjs-sdk-v0.76.0-linux-x64 /path/to/project/node/linux # copy node binary file
----------
cd /path/to/project/src # navigate to project src folder
npm i # install modules
./app.sh
```

##### Final Structure

```
├── app.bat
├── app.sh
├── config.js
├── credentials.json
├── db.json
├── dist
│   ├── assets
│   ├── index.html
│   ├── libs
│   └── vite.svg
├── node
│   ├── linux
│   ├── mac
│   └── win
├── olum.js
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── readme.md
└── src
    ├── README.md
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── node_modules
    ├── package.json
    ├── pnpm-lock.yaml
    ├── public
    ├── src
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

##### Make project portable

> copy the final structure to a USB flash

##### copy project to usb flash

```
cp /path/to/project -r /path/to/usb-flash
```

##### Create master password

```
node config.js
```
