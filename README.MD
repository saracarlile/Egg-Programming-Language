This project is from Eloquent JS, where there is a walk-through of building
your own programming language called "Egg".  There are some exercises afterwards. http://eloquentjavascript.net/11_language.html


Overview of code:

Create syntax tree for a program:

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


 Run syntax tree:
 
 Fourth code block:
 
Give evaluate function a syntax tree and an environment object that associates names with values, 
and it will evaluate the expression that the tree represents and return the value that this produces.
In evaluate, a literal value expressio, ie. "199", simply produces its value.   
For a variable, we must check whether it is actually defined in the environment and, if it is, fetch the variable’s value.
Applications are more involved. If they are a special form, like if, we do not evaluate anything and simply pass the argument expressions, 
along with the environment, to the function that handles this form. 
If it is a normal call, we evaluate the operator, verify that it is a function, and call it with the result of evaluating the arguments.
Evaluate is recursive until all arguments and expressions in a "tree" have been evaluated.

Fifth code block:

Special forms "if", "while", "do" and "defined" defined.

Sixth code block:

The environment object accepted by evaluate is defined.

Seventh code block:

The run function provides a fresh environment, and parses and evaluates the strings for a single program we give it.
The use of Array.prototype.slice.call is a trick to turn an array-like object, such as arguments, 
into a real array so that we can call join on it. 

Eigth code block:

The fun function construct treats its last argument as the function’s body, and 
treats all the arguments before that as the names of the function’s arguments.