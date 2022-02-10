# kodabako - コダ箱

A codabox client

## the name

Recently started looking back into Japanese kanji.
コダ箱 reads as "ko-da-bako":

- コダ: "koda". Obviously just means "CODA"
- 箱: "hako", which reads as "bako" in a combination. Basically means "box".

The combination just "sounds" like "codabox".

Enterprise software is littered with boring names and this project will likely also get another boring name at some point when we start distributing it.

## Quick start

Install all dependencies:

    yarn install

Start the application

    yarn start

## Development

The main source files at this point

- `src/main.js`: main starting point for the electron application.
- `src/preload.js`: js source which bridges between the main file and the browser renderer
- `src/renderer.js`: js source which runs in the view. Note this runs like a browser window, which does not have access to all system-level calls.

Check out the [electronjs quickstart] for an explanation of the boiler plate code.

Note that there are security-related reasons to not have the browser window being able to execute arbitrary system calls.
Check out this [SO post on electronjs] for an explanation of the relationship between the 3 files.

[electronjs quickstart]: https://www.electronjs.org/docs/latest/tutorial/quick-start
[so post on electronjs]: https://stackoverflow.com/a/69917666/1393391

## Building and releasing

Building the application is done using [`electron-forge`].
The `package.json` file contains the specific config for cross-platform building.
To actually build for different platforms, the package build process needs to be executed on the plaform itself (mac, windows, linux).

Check `.github/workflows/build.yaml` for the github actions config accross multiple platforms.

You can locally build the application with the build script

    yarn make

... but it will only build for your local platform

Releasing has a similar config in `.github/workflows/release.yaml`.
It performs the same tasks as the build job, only for tags in the format `v<x>.<y>.<z>`.
At the end of the build, it will publish a _draft_ release to the github releases page, which can then manually be marked as the newly released version.

The main application itself has an _auto-update_ feature which makes the application check for new releases on github and auto-update directly.
It will check at start-up time and after that every 10 minutes.

[`electron-forge`]: https://www.electronforge.io/

## Open points

- open source? the build / release process currently relies on the fact the full repo is open source
- code signing: not required, but will be once we start distributing the app
- auto-update: make it optional to update?
- nicer packaging, e.g. desktop icons, ...
- UI: vue-based UI with eyecandy
- features! there's nothing implemented yet
