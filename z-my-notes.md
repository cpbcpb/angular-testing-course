# Jasmine

Behavior-driven javascript testing framework
https://jasmine.github.io

Tests are called specs, grouped in test suites

For testing a service, you want the only real service to be the one you are testing, and everything else needed to be mock.  That way it is a unit test, only testing that one unit.

So only an actual implementation of the service being tested, everything else mock.

can use jasmine spy functionality.  createSpyObj.

## Dependency Injection in our tests.

// The service does not have the responsibility of creating the service itself.
// instead it receives it in the constructor such as above constructor(private logger: LoggerService)
// this is called dependency injection
// so its a good idea to use dependency injection in our tests.

