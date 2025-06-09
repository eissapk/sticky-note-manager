#!/bin/bash

platform="$(uname | tr '[:upper:]' '[:lower:]')"

if [ "$platform" == 'linux' ]
then
    ./node/linux/nwjs-sdk-v0.76.0-linux-x64/nw .
elif [ "$platform" == 'darwin' ]
then
    ./node/mac/nwjs-sdk-v0.76.0-osx-x64/nwjs.app/Contents/MacOS/nwjs .
else
    echo $platform
    echo "Your OS neither linux nor mac"
fi
