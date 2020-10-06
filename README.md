[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/jmtellez/Weather-CLI/issues)&nbsp;

# CLI-mate :sunrise:

`Node.js` CLI app that gives you the weather forecast for a given city :sunny:

![usage](img/usage.png)

**Install**

```bash
npm install -g @jmt3559/cli-mate
```

Setting up the env variables:
New version:

1. Copy the `.exemple.env` and rename it to `.env`
2. In `.env` change the variables by setting your API tokens:

```
MAPBOX=
WEATHERSTACK=
```

Old version:

1. On your terminal export these two environment variables:

**Zsh**

```bash
echo 'export MAPBOX=API_KEY' >>  ~/.zprofile

echo 'export WEATHERSTACK=API_KEY' >> ~/.zprofile
```

**Bash**

```bash
echo 'export MAPBOX=API_KEY' >>  ~/.bash_profile

echo 'export WEATHERSTACK=API_KEY' >> ~/.bash_profile
```

## Get API Keys

### [Weatherstack](https://weatherstack.com/) - 1k free requests per month

### [Mapbox](https://docs.mapbox.com/) - 100K free requests

#

#

#

### Running the Project:

-> if you are using npm:
1 **`npm install`**
2 **`npm start`**

-> if you are using yarn, then `yarn start`:
1 **`yarn`**
2 **`yarn start`**
