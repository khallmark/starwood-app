# starwood-app

These instructions assume you have xcode, node, and npm installed. 

#Install Dependencies

```
sudo npm install -g bower
sudo npm install -g ios-sim
sudo npm install -g ios-deploy
sudo npm install -g cordova

cd contacts/www
bower install
```

#Run The App

```
cordova prepare
cordova emulate ios
```
