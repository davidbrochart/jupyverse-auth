# jupyverse-auth

![Github Actions Status](https://github.com/davidbrochart/jupyverse-auth/workflows/Build/badge.svg)

A JupyterLab extension for authentication.


This extension is composed of a Python package named `jupyverse-auth`
for the server extension and a NPM package named `jupyverse-auth`
for the frontend extension.


## Install

To install the extension, execute:

```bash
mamba create -n jupyverse-auth-dev
conda activate jupyverse-auth-dev
mamba install pip nodejs

pip install -e .
jupyter labextension develop . --overwrite
jlpm
jlpm run build
```

## Authentication with GitHub

You will need to authorize JupyterLab to access your GitHub information. You can register a new
OAuth application [here](https://github.com/settings/applications/new):
- Application name: JupyterLab
- Homepage URL: http://127.0.0.1:8000/lab
- Authorization callback URL: http://127.0.0.1:8000/auth/github/callback

`127.0.0.1` and `8000` are the IP and port number, respectively. You might have to change them
according to your particular setup.

This will generate a client ID for you, and you must also generate a client secret.

When launching jupyverse, you must pass the client ID and secret:

```bash
jupyverse --config=path/to/config.toml
```

Where `config.toml` looks like this:

```toml
[authenticator]
client_id = "your_client_id"
client_secret = "your_client_secret"
```
