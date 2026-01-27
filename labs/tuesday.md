## Weather
* A Single Page Application is required to present a user interface for the free weather API at
https://home.openweathermap.org/ (This site also provides plenty of documentation about how to read from the API)
* The expectation is that NgRX will be used to manage state throughout the application
* Individual or group solutions are fine
* Where possible re-use anything from earlier on the course, or from the previous lab
* Use the developer tools as you see fit

You may choose to sign up for a free API key or use this one:
* appid=48f2d5e18b0d2bc50519b58cce6409f1
* This is limited to 60 requests per minute

There will be stand-up reports at 40 minute intervals. 
At the end there will be an opportunity to talk us through what you built. Your thinking processes and implementations are key 

* The returned JSON is a bit complex, but these data points may be useful:
  - Weather description: weather[0].description
  - Temperature: main.temp

##### User Interface
* A basic user story would be: choose a city to retrieve a weather report for that city.

##### Service
* Access to the remote API should be provided through a service

##### Architecture
* NgRX principles should be used
* Treat this project as if it were one feature of a major project and architect accordingly
* To get started, write a service to get the weather in Galway, using `https://api.openweathermap.org/data/2.5/weather?q=galway&appid=48f2d5e18b0d2bc50519b58cce6409f1&units=metric`
* On success, console.log() this weather data, to see what is being retrieved
* When that is working, move on to using a user-chosen city value, and show some returned data points in a component (description and temperature) 

##### Data retrieval failure
* If the API retrieval fails, the user should be informed

##### Further Features if time
* In addition to the description and temperature, also display the wind speed and direction (and any other data points you like)
* Persist each successful weather retrieval in localStorage and provide a way to see these historical reports
* In the assets for this repository there is a long-ish list of places in Ireland. Retrieve the weather for some or all of them (or your own places), then display the results nicely
* The openweathermap API also provides icons for weather conditions. Use these in the UI
* There is an API you could use that provides a lot of country-specific information: https://restcountries.com/
* Each weather report comes back with lat/lon data. Find a useful way to use this.
