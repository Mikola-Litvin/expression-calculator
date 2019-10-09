function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

  let openBracket = "(";
  let closeBracket = ")";
  let brackets = [];
  let arr = [];
  let result;
  let calcBrackets = [];
  let storage = [];
  let calc = [];

 (function check(expr) {

    let num = "";

    for (let i = 0; i < expr.length; i++) {
      if (expr[i] == openBracket) {
        brackets.push(expr[i]);
        arr.push(expr[i]);
      }
      else if (expr[i] == closeBracket) {
        if (brackets.length == 0) {
          throw("ExpressionError: Brackets must be paired");
        }
        else {
          brackets.pop();
          if (num.length != 0) {
            arr.push(Number(num));
            num = "";
          }
          arr.push(expr[i]);
        }
      }
      else if (expr[i] == " ") {
        if (num.length != 0) {
          arr.push(Number(num));
          num = "";
        }
        continue;
      }
      else if (expr[i] == "0") {
        if (arr[arr.length-1] == "/" && num.length == 0) {
          throw("TypeError: Division by zero.");
        }
        else {
          num += expr[i];
        }
      }
      else if (expr[i].match(/[1-9]/) != null) {
        num += expr[i];
      }
      else if (expr[i].match(/[\+\*\-\/]/) != null) {
        if (num.length != 0) {
          arr.push(Number(num));
          num = "";
        }
        arr.push(expr[i]);
      }
    }
    if (num.length != 0) {
      arr.push(Number(num));
      num = "";
    }
    if (brackets.length != 0) {
      throw("ExpressionError: Brackets must be paired");
    }
    return true;
  })(expr);

  function multiply(array) {

    let res;
    let arr2 = array;

    for (let i = 0; i < arr2.length; i++) {
      if (arr2[i] == "*") {
        res = arr2[i-1] * arr2[i+1];
        arr2.splice(i-1, 3, res);
        break;
      }
      else if (arr2[i] == "/") {
        res = arr2[i-1] / arr2[i+1];
        arr2.splice(i-1, 3, res);
        break;
      }
    }
    if (arr2.indexOf("*") != -1 || arr2.indexOf("/") != -1) {
      multiply(arr2);
    }
    else {
      plus(arr2);
    } 
  }

  function plus(array) {

    let res;
    let arr2 = array;

    for (let i = 0; i < arr2.length; i++) {
      if (arr2[i] == "+") {
        res = arr2[i-1] + arr2[i+1];
        arr2.splice(i-1, 3, res);
        break;
      }
      else if (arr2[i] == "-") {
        res = arr2[i-1] - arr2[i+1];
        arr2.splice(i-1, 3, res);
        break;
      }
    }
    if (arr2.indexOf("+") != -1 || arr2.indexOf("-") != -1) {
      plus(arr2);
    }
    else {
      result = arr2[0];
    }
  }
  
  for (let i = 0; i < arr.length; i++) {
    let tmpArr = [];
    if (arr[i] == openBracket) {
      if (calcBrackets.length > 0) {
        for (let k = 0; k < calcBrackets.length; k++) {
           tmpArr.push(calcBrackets[k]);
        }
        storage.push(tmpArr);
        calcBrackets.length = 0;
      }
      brackets.push(arr[i]);
    }
    else if (arr[i] == closeBracket) {
      brackets.pop();
      multiply(calcBrackets);
      calcBrackets.length = 0;
      if (brackets.length == 0) {
        calc.push(result);
      }
      else {
        if (storage.length > 0) {
          let exp = storage.pop();
          for (let j = 0; j < exp.length; j++) {
            calcBrackets.push(exp[j]);
          }
        }
        calcBrackets.push(result);
      }
    }
    else if (typeof(arr[i]) == "number" || arr[i].match(/[\+\*\-\/]/) != null) {
      if (brackets.length == 0) {
        calc.push(arr[i]);
      }
      else {
        calcBrackets.push(arr[i]);
      }
    }
  }

  multiply(calc);
  return result;
}

module.exports = {
    expressionCalculator
}