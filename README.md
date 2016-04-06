# gitignorer
Creates `.gitignore` for you with your very own settings.
Have you ever *feel irritated* when you have to add **the same freaking set of files/patterns** like `.*.sw*`, `.DS_Store`, `node_modules` to `.gitignore` every time you start a new project? 

Today, with *gitignorer*, no more worries! :)

## Installation
```
npm install -g gitignorer
```

## Usage
Listed below are all the operations that `gitignorer` capable to perform.

1. Generating `.gitignore` with an existing profile
  - [create `.gitignore` with preset profiles](#gitignore-init)
2. Managing files to be ignored
  - [add files/patterns to `.gitignore` or a profile](#gitignore-add)
  - [remove files/patterns from `.gitignore` or a profile](#gitignore-remove--rm)
  - [list files/patterns in `.gitignore` or a profile](#gitignore-list--ls)
3. Manging Profiles
  - [create a new profile](#gitignore-init)
  - [delete a profile](#gitignore-init)
  - [copy a profile](#gitignore-init)
  - [rename a profile](#gitignore-init)

### `gitignore init`
`gitignore init` creates `.gitignore`.
```bash
# create .gitignore with "default" profile
> gitignore init

# create .gitignore with "nodeDev" profile
> gitignore init -p nodeDev
```

> You can use `--profile` instead of `-p` if you wish.

### `gitignore add`
`gitignore add` adds files/patterns to `.gitignore` or profile.
```bash
# add node_modules to .gitignore
> gitignore add node_modules

# add *.class and *.jar to 'java' profile
> gitignore add -p java *.class *.jar
```

### `gitignore remove | rm`
`gitignore remove`, with alias `gitignore rm`, removes files/patterns from `.gitignore` or profile.
```bash
# remove node_modules and lib/*.js from .gitignore
> gitignore remove node_modules lib/*.js

# remove *.pyc from 'C' profile
> gitignore rm *.pyc -p C
```

> Notice that you can put your flag anywhere. Thanks to [commander](https://www.npmjs.com/package/commander).

### `gitignore list | ls`
`gitignore list`, with alias `gitignore ls`, list files/patterns from `.gitignore` or profile.
```bash
> gitignore ls # list files from .gitignore
# created by gitignorer
# profile used: default
*.sw*

> gitignore list -p angularjs # list files from 'angularjs' profile
node_modules
bower_components

# alias command to `gitignore profile --list`
> gitignore list -p
default
angularjs
node
coffee
```

### `gitignore profile`
`gitignore profile` manges your profiles.

> The 'default' profile shouldn't be renamed/removed.

```bash
# list all existing profiles (--list/-l)
> gitignore profile -l
default
happytree
i_hate_typing_markdown

# create a profile (--create/-c)
> gitignore profile --create java

# delete a profile (--delete/-d)
> gitignore profile --delete typescript

# copy a profile (--copy)
# here we copy 'node' to 'angularjs' profile
> gitignore profile node --copy angularjs

# move/rename a profile (--move)
# here we move 'jave' to 'java' profile
> gitignore profile jave --move java
```

### Help `-h | --help`
Every command comes with a help menu. For examples:

`gitignore` help:
```
> gitignore -h

  Usage: gitignore [options] [command]


  Commands:

    init [options] [profile]        Create .gitignore at current directory
    add [options] <files...>        Add file(s) to .gitignore
    remove|rm [options] <files...>  Remove ignored file from .gitignore or [profile]
    list|ls [options]               List ignored file in .gitignore or [profile]
    profile [options] <name>        Perform operation on profile base on [options]

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

    -h, --help               output usage information
    -p, --profile [profile]  add file to profile instead of .gitignore
```

## Did you know? 
- You can use `gitignore` or `gitignorer` to invoke gitignorer.
  - `gitignore profile -l` is equivalent to `gitignorer profile -l`

## License
MIT
