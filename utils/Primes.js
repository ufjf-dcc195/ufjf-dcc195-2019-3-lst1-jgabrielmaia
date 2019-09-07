// source code: https://snippets.bentasker.co.uk/page-1705211104-Find-Prime-Numbers-in-Range-Javascript.html

exports.calculatePrimesForRange = (l,h) => {
    var primes=[];
    for (i=l; i<h; i++){

        if (checkNumPrime(i)){
          primes.push(i);
        }

    }
    return primes;
}

// Check whether a number is a prime
function checkNumPrime(n){

    // Check whether the number is 1,2 or 3
    if (n<4){
        return true;
    }

    // Check the number isn't directly divisible by 2 or 3
    if (n%2 == 0 || n%3 == 0){
        return false;
    }

    var di=2;
    var i = 5;

    // Don't calculcate higher than the square root (rounded down if needed)
    var lim = Math.floor(Math.sqrt(n));

    while (i < lim){

      if (n%i == 0){
          return false;
      }
      i=i+di;
      di=6-di;
    }

    // If we haven't already returned, n is prime
    return true;
}
