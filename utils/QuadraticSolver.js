// source code : https://stackoverflow.com/questions/33454438/quadratic-equation-solver-in-javascript

exports.solve = (a, b, c) => {
    let result = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    let result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    return [result,result2];
}
