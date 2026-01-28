## Testing with Playwright
* Individually or in groups, use Playwright to implement end to end tests for either of the previous labs
* Record new tests and try writing by hand
* Make use of trace

There will be an opportunity to talk us through what you built. Thinking and implementations are key 
There may be stand-up reports during the lab

* Try writing some user stories then implment these as end to end tests
* See if there is any opportunity to implement beforeEach/afterEach or beforeAll/afterAll
* Explore fixtures, mocking and other useful techniques

##### Service
* You should be able to use your services as-provided, but try implementing mock service data

##### Architecture
* Treat these tests as if they will end up in a continuous integration scenario 
* When you have some passing tests, implement another feature and ensure the tests still pass
  * Feature ideas:
    * Swapi (Monday): user searches category and also id
    * Weather (Tuesday): user provides city and also country
    * Todos (any of them): if all 'todos' are completed, show a 'Done' message

##### Data retrieval
* Test for API retrieval failure and other edge cases

### Optional
* If you wish to develop further features, try test-driven-development (write a user-story, write a test, then implement some code until test passes)