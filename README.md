
## Install

### Clone and install

From your favorite terminal

``` bash
git clone https://github.com/scott-fryxell/sign-up

cd web

yarn install
```

### Configure firebase

Add a project from the [firebase console](https://console.firebase.google.com). Bear in mind that the name you give your project will be it's url

`https://${project-name}.web.app`

Once your project is created you will want to enable phone authentication and file storage.

#### Enable phone authentication

- Click getting started from the authentication screen

- Edit the configuration for phone

- Enable and save

### Deploy to firebase

Install firebase-tools, login, and deploy

``` bash
yarn global add firebase-tools

firebase login

yarn deploy
```

# DONE!

Visit [https://${project-name}.web.app](https://${name}.wep.app).
