#!/bin/bash

platform="$(uname | tr '[:upper:]' '[:lower:]')"

if [ "$platform" == 'linux' ]
then
    ./nw/linux/nwjs-sdk-v0.55.0-linux-x64/nw ../../../
elif [ "$platform" == 'darwin' ]
then
    ./nw/mac/nwjs-sdk-v0.39.0-osx-x64/nwjs.app/Contents/MacOS/nwjs .
else
    echo $platform
    echo "Your OS neither linux nor mac"
fi
