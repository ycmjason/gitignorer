# gitignorer
Creates `.gitignore` for you with your very own settings.
Have you ever *feel irritated* when you have to add **the same freaking set of files/patterns** like `.*.sw*`, `.DS_Store`, `node_modules` to `.gitignore` every time you start a new project? 

Today, with *gitignorer*, no more worries! :)

## Abstract
1. `gitignorer` allow you to interact with your `.gitignore` easily. 
	- [add files/patterns](#gitignore-add)
	- [remove files/patterns](#gitignore-remove--rm)
	- [list files/patterns](#gitignore-list--ls)
2. `gitignorer` also allow you to create `.gitignore` with predefined settings (profiles) exported from `~/.gitignore.profiles.js`.
	- [create .gitignore with preset profiles](#gitignore-init)
	- [list profiles exported from ~/.gitignore.config.js](#gitignore-profiles)

## Installation
```
npm install -g gitignorer
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
var common = [
  '*.sw*',
  '.DS_Store'
];

var node = [
  'node_modules',
];

var java = [
  '*.class',
  '*.jar'
];

// Use Array.prototype.concat() to inherit from other profiles
module.exports = {
  default: common,
  node: common.concat(node),
  java: common.concat(java)
};
```

## Usage

### `gitignore init`
`gitignore init` creates `.gitignore`.
```bash
# create .gitignore with "default" profile or empty profile
> gitignore init

# create .gitignore with "node" profile
> gitignore init node
```

### `gitignore add`
`gitignore add` adds files/patterns to `.gitignore`.
```bash
# add node_modules to .gitignore
> gitignore add node_modules

# add *.class and *.jar to 'java' .gitignore
> gitignore add '*.class' '*.jar'
```
Use quote when using wildcards(*) to avoid expansion of filenames;

### `gitignore remove | rm`
`gitignore remove`, with alias `gitignore rm`, removes files/patterns from `.gitignore`.
```bash
# remove node_modules and lib/*.js from .gitignore
> gitignore remove node_modules 'lib/*.js'

# remove *.pyc
> gitignore rm *.pyc
```

### `gitignore list | ls`
`gitignore list`, with alias `gitignore ls`, lists files/patterns from `.gitignore`.
```bash
> gitignore ls
*.sw*
.DS_Store
```

### `gitignore profiles`
`gitignore profiles` lists all profiles and their corresponding files.

```bash
> gitignore profiles
default:
  *.sw*
  .DS_Store

node:
  *.sw*
  .DS_Store
  node_modules
```

### Help `-h | --help`
Every command comes with a help menu. For examples:

`gitignore` help:
```
> gitignore -h

  Usage: gitignorer [options] [command]


  Commands:

    init [options] [profile]  Create .gitignore at current directory
    add <files...>            Add file(s) to .gitignore
    remove|rm <files...>      Remove ignored file from .gitignore
    list|ls                   List ignored file in .gitignore
    profiles|profile          List all profiles and their corresponding files

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

subcommands help:
```
> gitignore add --help

  Usage: add [options] <files...>

  Add file(s) to .gitignore

  Options:

    -h, --help  output usage information

```

## Did you know? 
- You can use `gitignore` or `gitignorer` to invoke gitignorer.
- `gitignore profiles` is equivalent to `gitignorer profiles`

## Author
Jason Yu

## License
MIT
