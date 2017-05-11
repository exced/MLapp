# MLapp

ML helper app is a mobile app to help managing datas for machine learning.
The goal is to build an user-friendly app to manage datas inputs.

You can train the datas or evaluate it with a ML algorithm implemented in the backend.

# Install on Debian and Ubuntu based Linux distribution

## Install NodeJS
```bash
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

sudo apt-get install -y nodejs

sudo apt-get install -y build-essential
```

Check the install :
```bash
node -v
```

## Install MongoDB
```bash
sudo apt-get install mongodb-server mongodb-clients
```

Check the install :
```bash
mongo
```

## Install NPM or Yarn (Package managers)
```bash
sudo apt-get install npm
```
## Install Server Side
```bash
cd server/
sudo npm install
```

Run the server :
```bash
./bin/www
```

## Install Client Side

## Documentation
Check out ioni2 doc :
https://ionicframework.com/docs/v2/

### Install Cordova
```bash
sudo npm install -g cordova
```

Run the client :
```bash
ionic serve --lab
```



