# @halvaradop/auth-init

`@halvaradop/auth-init` is an initializer that facilitates and accelerates the setup of projects with authentication using `Auth.js`. It supports the four main frameworks offered by `Auth.js`:

- Next.js
- Qwik
- SvelteKit
- Express

It simplifies the configuration to create a basic setup for using `Auth.js` with your favorite framework, helping you focus on incorporating custom authentication configurations provided by `Auth.js`.

## Installation

To install the package, use npm or pnpm. For more information about [Auth.js](https://authjs.dev/), you can check their documentation. Run the following command to install the package:

```bash
# npm
npm install -g @halvaradop/auth-init

# pnpm
pnpm add -g @halvaradop/auth-init
```

## Usage

The initializer provides simple commands:

```sh
auth-init [options] [command]
```

### Options

- `-V, --version`: Output the version number
- `-h, --help`: Display help for command

### Commands

- `init [options]`: Setup the project with the selected framework
- `secret [options]`: Generate a secret key (required by Auth.js)
- `provider [options]`: Initialize the configuration for the selected provider
- `help [command]`: Display help for command

### Examples

```sh
# Generate a secret key
auth-init secret

# Set up project with Next.js framework
auth-init init -f next
auth-init init --framework next

# Set up `Google` provider
auth-init provider -p google
auth-init provider --provider google
```

## Contributing

We welcome contributions to `@halvaradop/auth-init`! If you have an idea for a new feature or find an improvement to an existing one, please feel free to open an issue or create a pull request. We offer a guide on how to contribute to the project and the necessary steps to do so. Read our [Contributing Guideline](https://github.com/halvaradop/.github/blob/master/.github/CONTRIBUTING.md).

## Code of Conduct

Please be aware that this project has a code of conduct, and we expect all contributors to follow these guidelines in their interactions. For more information, please read our [Code of Conduct](https://github.com/halvaradop/.github/blob/master/.github/CODE_OF_CONDUCT.md).
