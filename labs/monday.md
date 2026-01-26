## Swapi
* A Single Page Application is required to present a user interface for the remote API at
https://swapi.dev/api  (This site provides plenty of documentation about how to read from the API)

In this lab you should build a minimum viable product to consume this data with user-provided category value. (one of people, planets, vehicles, species or starships)
You may stick with id=1 or also ask the user for this
Either create individual solutions or work with colleagues
To help with progress, there will be stand-up reports at 40 minute intervals
When the time allocated for this lab expires, there will be an opportunity to talk us through what you built. It is not expected to be beautiful or even functionaly complete, but your thinking processes and implementations are key 

##### User Interface
* A basic user story would include choosing a category and an id to retrieve data about that entity

##### Service
* Access to the remote API should be provided through a service
* Any other services may be created as you see fit

##### Architecture
* The architecture, division of responsibility, choice of package and module names is open ended

##### Re-useable Components
* All data categories include a 'name' value but they also have several other differing properties
* It is acceptable to show just the name value for all categories
* If possible, other values per category should also be shown
* This might be through component inheritance, content projection or any architecture you like
* Bear in mind that this project may evolve to include other kinds of related data in the future (though not on this course)

##### Data retrieval, filtering and persistence
* If possible data should be retrieved from the API
* If this fails, any previous data should be retrieved from localStorage
* If that also fails, the user should be informed

##### Dealing with Asynchronous Delays
* It is not a priority to show any 'loading' message, but would be a nice addition

##### Further Features if time
* When data is displayed to the user (representing a single entity), retrieve the details for each of the films and display it
* For each category, also retrieve an image of your own choosing, by making use of the remote API at https://robohash.org/ 
* There is also a resource here https://dribbble.com/shots/3907212-Starwars-Icon-Set you may like to use