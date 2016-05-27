// skipSpace function repeatedly cut the whitespace off the start of the program string.
//parseExpression uses three regular expressions to spot the three simple 
//elements that Egg supports: strings, numbers, and words
function parseExpression(program) {
  program = skipSpace(program);
  var match, expr;
  if (match = /^"([^"]*)"/.exec(program))
    expr = {type: "value", value: match[1]};
  else if (match = /^\d+\b/.exec(program))
    expr = {type: "value", value: Number(match[0])};
  else if (match = /^[^\s(),"]+/.exec(program))
    expr = {type: "word", name: match[0]};
  else
    throw new SyntaxError("Unexpected syntax: " + program);

  return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
  var first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}

//If the next character in the program is not an opening parenthesis, 
//this is not an application, and parseApply simply returns the expression it was given.
//Otherwise, it skips the opening parenthesis and creates the syntax tree object for this application expression. 
//It then recursively calls parseExpression to parse each argument until a closing parenthesis is found.

function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(")
    return {expr: expr, rest: program};

  program = skipSpace(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    var arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",")
      program = skipSpace(program.slice(1));
    else if (program[0] != ")")
      throw new SyntaxError("Expected ',' or ')'");
  }
  return parseApply(expr, program.slice(1));
}

//This is all we need to parse Egg. We wrap it in a convenient parse function that 
//verifies that it has reached the end of the input string after parsing the expression 
//(an Egg program is a single expression), and that gives us the program’s data structure.

function parse(program) {
  var result = parseExpression(program);
  if (skipSpace(result.rest).length > 0)
    throw new SyntaxError("Unexpected text after program");
  return result.expr;
}