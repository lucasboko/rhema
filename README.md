Following are few instructions to run the calculator app:

1. For things to run smoothly I would suggest having node v11.1.0 and npm 6.4.1 
To check your npm and node version you can execute "node -v && npm -v" in your command prompt.
Update them if need be.

2. Unzip the project calculator-app.zip and copy-paste all the project in a folder of your choice.
Make sure to not have any node_modules folder in there.

3. In your command promt go to the directory where the project is located.

4. Execute "npm install" , this will install all the packages required based what is listed in the devDependencies section of the package.json file.
After this is properly executed, you should see a nodes_modules created at the root of the project folder.

5. You can then execute "npm run test" , this will run a the testing scripts of the project.

4. Make sure your port 8080 is free. It is the default port that webpack-dev-server runs on.

If your port 8080 is not available, go in the webpack.dev.config.js file and uncomment the line 53.
This will launch the project at the port 9000.

Feel free to replace the port 9000 by whatever is more suitable for you.

5. Execute "npm run webpack" , this should launch the calculator app in your default browser at the address http://localhost:8080/ . 
Of course the port number will be different based whatever other port you might have changed it to. 