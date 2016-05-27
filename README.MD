This project is from Eloquent JS, where there is a walk-through of building
your own programming language called "Egg".  There are some exercises afterwards.


Overview of code:

First code block:

skipSpace function repeatedly cut the whitespace off the start of the program string.
parseExpression uses three regular expressions to spot the three simple 
elements that Egg supports: strings, numbers, and words.

Second code block:

If the next character in the program is not an opening parenthesis, 
this is not an application, and parseApply simply returns the expression it was given.
Otherwise, it skips the opening parenthesis and creates the syntax tree object for this application expression. 
It then recursively calls parseExpression to parse each argument until a closing parenthesis is found.

Third code block:

This is all we need to parse Egg. We wrap it in a convenient parse function that 
verifies that it has reached the end of the input string after parsing the expression 
(an Egg program is a single expression), and that gives us the program’s data structure.