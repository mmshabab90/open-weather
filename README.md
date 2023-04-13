# React Weather App

A simple weather application build with react, typescript. The app uses tailwind css as a css framework and open weather api as the source of weather forecast data.\
There are no state management used in this app which might case some reload issue and state retention if the browser is refreshed.\
The app uses local storage to store the unit selection (C or F).

## Procedure to run the application

Once you clone the repo in your local machine, run the following commands from the project/repo directory to install all required dependancies.

### `npm install --legacy-peer-deps`

## Note
This app is created with create-react-app. Make sure that node is installed in your local machine.

Make sure to create a .env.local file that holds the api key and the url. Make sure the key is stored in `REACT_APP_API_KEY` variable and the api base url is store in `REACT_APP_WEATHER_API_BASE_URL`as those variables are ued in the app to access the api.

Once the node modules are installed, run the following command:

### `npm start`

You can access the app in you browser by visiting http://localhost:3000

## Testing

React testing library has been used to test some of the components since it comes out of the box. Testing is only done on the Spinner and Tile components.\
To run the tests in the console, open a new terminal window and run the following command in the project directory and follow the instruction in the console:

### `npm run test`

Press `a` to run all available tests
