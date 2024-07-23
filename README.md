# @halvaradop/auth-init
@halvaradop/auth-init is an initializer that facilitates and accelerates the setup of projects with authentication using auth.js. It supports the three main frameworks offered by auth.js:
- NextJs
- SvelteKit
- Express

It simplifies the configuration to create a basic setup for using auth.js with your favorite framework, helping you focus on incorporating custom authentication configurations provided by auth.js.

## Installation
To install the initializer of authentication with Auth.js, you should install it via npm. For more information about [Auth.js](https://authjs.dev/), you can check their documentation. The command to install the package is:
```bash
npm i -g @halvaradop/auth-init
```

## Usage
To use the initializer, you can run the following code. This command will display a series of questions to help you build your application with NextAuth using the CLI.
There are three flags that can be used with this command:
```bash
# Build the configuration
auth-init --init (default)

# Import and set up the providers
auth-init --providers

# Generate the secret key for the project
auth-init --secret
```


## Contributing

Here, you will find a guide on how to contribute to the project and the necessary steps to do so. Please read our [Contributing Guidelines](https://github.com/halvaradop/.github/blob/master/.github/CODE_OF_CONDUCT.md).

## Code of Conduct

Please be aware that this project has a code of conduct, and we expect all contributors to follow these guidelines in their interactions. For more information, please read our [Code of Conduct](https://github.com/halvaradop/.github/blob/master/.github/CODE_OF_CONDUCT.md).
