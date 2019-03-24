<h1 align="center">📦 ndeps</h1>
<p align="center">Pretty-print npm dependencies in Terminal.</p>
<img alt="ndeps" src="https://github.com/uetchy/ndeps/blob/master/.readme/screen2.png?raw=true" />

> Formerly known as `npm-deps-list`

## Key Features

- Show installed package description, executables, and its version
- Click on package name to jump to their homepage (iTerm2 exclusive)

## Usage

```bash
npm install -g ndeps
# or
yarn global add ndeps
```

then:

```bash
cd /path/to/yourProject
ndeps
```

![screenshot](https://github.com/uetchy/ndeps/blob/master/.readme/screen2.png?raw=true)

### `--global` option

To list globally installed packages:

```bash
ndeps --global
```

![screenshot](https://github.com/uetchy/ndeps/blob/master/.readme/screen3.png?raw=true)
