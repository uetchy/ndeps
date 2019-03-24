<p align="center">
	<h1>📦 ndeps</h1>
	<p>Pretty-print npm dependencies on your terminal.</p>
	<img alt="ndeps" src="https://github.com/uetchy/ndeps/blob/master/.readme/screen2.png?raw=true" />
</p>

> Formerly known as `npm-deps-list`

## Key features

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