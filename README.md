> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

Mock
For this Mock sprint, we built the beginnings of a web front-end application using HTML and CSS to set up a basic command-prompt interface, and TypeScript with React to organize components and process commands in that interface.

# Design Choices

### REPLInput

We used a Map<string, string[][]> to map the name of a filepath to its contents. <br>

### REPLFunction

We used a Map<string, function> to map the command to a function in REPLFunction. We initally started by using a useState hook, however, we realized that the React setter didn't run until after the event handler finished running. Our variables weren't updating so we thought about using a switch statement which led to the same issue. We finally ended up with a Map.

# Errors/Bugs

There are no bugs that we are currently aware of.

# Tests

The testing suites implemented for the program use Playwright Test, a testing library for web applications.

Each test follows these steps:

1. Navigate: Go to the application's URL.
2. Interact: Perform actions like clicking buttons or filling input fields.
3. Assert: Check if expected changes occur.

Test cases include checking login button visibility, handling unrecognized commands, verifying mode changes, and testing file loading, searching, and viewing functionalities, error handling, and doing multiple commands one after another.

# How to

In order to use the program, a user will first press the login button in order to be able to enter any commands. Once logged in, the user can enter the following commands: mode, load_file, view, or search. Depending on the mode (brief or verbose), their output will vary. If the user is in the mode "brief," the history window will display just the output on its own line. If the user is in the mode "verbose," the history window will display its name alongside its output.

As a developer, they would be able to add new commands by providing a a command name and function to run to our existing map.
Our existing map exists as a prop in our REPL classes, named commandFunctionMap. At present, we have loaded our own functions,
load_file, view, mode, and search into the map so that they are recognized and return the correct values. Developers would
be able to do this same functionality with their added command names and respective functions by adding them to the map.

# Collaboration


Partners: Eric Auguste (eaugust5) and Emily Lin (elin62) <br>
Repo: https://github.com/cs0320-s24/mock-elin62-eaugust5
