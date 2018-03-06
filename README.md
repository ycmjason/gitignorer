# gitignorer

[![Build Status](https://travis-ci.org/ycmjason/gitignorer.svg?branch=master)](https://travis-ci.org/ycmjason/gitignorer)
[![codecov](https://codecov.io/gh/ycmjason/gitignorer/branch/master/graph/badge.svg)](https://codecov.io/gh/ycmjason/gitignorer)

Creates `.gitignore` for you with your very own profiles.

No more copy and pasting people's `.gitignore`. Start building your profiles!

## Abstract
gitignorer has only two commands, yet they are very convenient:
1. [`gitignore init [profile]`](#gitignore-init)
2. [`gitignore profiles`](#gitignore-profiles)

## Installation
```
npm install -g gitignorer
```

## Usage

### `gitignore init [profile]`
`gitignore init` creates `.gitignore` with the given profile.
```bash
# create .gitignore with "default" profile or empty profile
> gitignore init

# create .gitignore with "node" profile
> gitignore init node
```

### `gitignore profiles`
`gitignore profiles` lists the profiles exported by `~/.gitignore.profiles.js`.

```
> gitignore profiles

 default
  |- *.sw*
  |- .DS_Store

 node
  |- *.sw*
  |- .DS_Store
  |- node_modules
  |- npm-debug.log*

You can create a `.gitignore` using `gitignore init [profile]`
```

### `gitignore -h`
`gitignore` help:
```
> gitignore -h

  Usage: gitignorer [options] [command]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    init [options] [profile]  Create .gitignore at current directory
    profiles                  List all profiles and their corresponding files

```

subcommands help:
```
> gitignore init --help

  Usage: init [options] [profile]

  Create .gitignore at current directory


  Options:

    -f, --force  overwrite the existing .gitignore
    -h, --help   output usage information

```

## Profiles (`~/.gitignore.profiles.js`)
`gitignorer` looks into `~/.gitignore.profiles.js` which should export profiles.

A simple example that defines the `default` profile:
```javascript
module.exports = {
  default: ['*.sw*', '.DS_Store']
};
```

A more complicated example:
```javascript
const common = [
  '*.sw*',
  '.DS_Store'
];

const node = [
  'node_modules',
];

const java = [
  'url: https://raw.githubusercontent.com/github/gitignore/master/Java.gitignore',
  '.object2'
];

module.exports = {
  default: common,
  node: [...common, ...node],
  java: [...common, ...java],
  awesome: [...common, ...node, ...java],
};
```

Note that you could attach an url with any gitignore template. A very nice repository provides loads of templates available: [github/gitignore](https://github.com/github/gitignore).

**Urls entry should start with `"url: "`.**

## Author
Jason Yu

## License
MIT
