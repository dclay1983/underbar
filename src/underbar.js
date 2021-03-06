(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] : n > array.length ? array : array.slice(array.length - n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }else {
        for (let key in collection) {
          iterator(collection[key], key, collection);
        }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(value) {if (test(value)) {result.push(value)}})
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, function (value) {return !(test(value))});
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var result = []
    if (typeof iterator !== "function") {iterator = _.identity};
    var compare = function (val, tranTest) {
      var tranVal = iterator(val);
      return tranVal === tranTest;
    }
    if (isSorted) {
      _.each(array, function (val) {
        var tranTest = (iterator(result[result.length - 1]));
        if(!(compare(val, tranTest))) {result.push(val)};
      })
    } else {
      _.each(array, function (val) {
        var isUniq = true;
        _.each(result, function (test) {
          var tranTest = iterator(test);
          if (compare(val, tranTest)) {
            isUniq = false;
            return
          }
        });
        if (isUniq) {result.push(val)}
      })
    }
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(collection, function(item) {
      result.push(iterator(item));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var noMemo = accumulator === undefined;
    // track index if object
    var index = 0;
    _.each(collection, function(val) {
      accumulator = index === 0 && noMemo ? val : iterator(accumulator, val);
      index++
    })
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    iterator = iterator || _.identity;
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(match, item) {
      if (!match) {
        return false;
      }
      return iterator(item) ? true : false;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    iterator = iterator || _.identity;
    // TIP: There's a very clever way to re-use every() here.
    // ^^ Todo: find out how
    return !_.every(collection, function(item) {
        return !iterator(item);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.reduce( arguments, function (obj, argument) {
      _.each(argument, function(val, key) {
        obj[key] = val;
      })
      return obj;
    })
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.reduce( arguments, function (obj, argument) {
      _.each(argument, function(val, key) {
        obj[key] = obj.hasOwnProperty(key) ? obj[key] : val;
      })
      return obj;
    })
    return obj;
  };
  


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // Store the initial call of the function so it is only ever
    // called once and its argument list for comparison.
    var funcCalls = {called: [], args: []}
    return function() {
      // Test if function has been called with given arguments
      var calledArgs = _.map(funcCalls.args, function (arg) {return JSON.stringify(arg)})
      var indexOfArgs = _.indexOf(calledArgs, JSON.stringify(arguments))
      if (indexOfArgs === -1) {
        // If not save a new instance of _.once(func) and the argument list
        indexOfArgs = funcCalls.called.push(_.once(func)) - 1;
        funcCalls.args.push(arguments);
      }
      return funcCalls.called[indexOfArgs].apply(funcCalls.called[indexOfArgs],
        funcCalls.args[indexOfArgs]);
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.from(arguments).slice(2);
    setTimeout(func, wait, ...args);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    array = array.slice();
    var shuffled = [];
    while (array.length > 0) {
      shuffled.push(array.splice(Math.random() * array.length, 1)[0]);
    }
    return shuffled;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    if (!(typeof functionOrKey === "function")) {
      functionOrKey = collection[0][functionOrKey];
    }
    var result = _.map(collection, function (val) {
        return functionOrKey.apply(val, args);
    });
    return result;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    // work with a copy not a reference
    var col = collection.slice();
    var len = collection.length;
    while (len >= 1) {
      var newlen = 0;
      if (typeof iterator === "string") {
        for (let i = 1; i < len; i++) {
          var a = col[i - 1][iterator] !== undefined ? col[i - 1][iterator] : Infinity
          var b = col[i][iterator] !== undefined ? col[i][iterator] : Infinity
          if (a > b) {
            [col[i - 1], col[i]] = [col[i], col[i-1]];
            newlen = i;
          }
        }
      } else {
        for (let i = 1; i < len; i++) {
          var a = iterator(col[i - 1]) !== undefined ? iterator(col[i - 1]) : Infinity
          var b = iterator(col[i]) !== undefined ? iterator(col[i]) : Infinity
          if (a > b) {
            [col[i - 1], col[i]] = [col[i], col[i-1]];
            newlen = i;
          }
        }
      }
      len = newlen;
    }
    return col;

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = arguments;
    var len = _.reduce(args, function (len, arg) {
      return len > arg.length ? len : arg.length;
    }, 0);
    var result = Array(len);
    _.each(result, function(arr, i) {
      result[i] = []
      _.each(args, function(x) {
        result[i].push(x[i]);
      })
    })
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = result || [];
    _.each(nestedArray, function(element) {
      if (Array.isArray(element)) {
        _.flatten(element, result);
      } else {
        result.push(element)
      }
    })
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.from(arguments);
    var result = _.uniq(_.flatten(args))
    for (let i = 0; i < result.length; i++) {
      var found = true;
      _.each(args, function(arg) {
        if (found) {
          found = _.contains(arg, result[i]);
        }
      })
      if (!found) {
        result.splice(i, 1)
        --i;
      };
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    array = array.slice()
    for (let i = 0; i < array.length; i++) {
      var val = array[i];
      var found = false;
      for (let x = 1; x < arguments.length; x++) {
        for (let y = 0; y < arguments[x].length; y++) {
          if(val === arguments[x][y]) {
            found = true;
            array.splice(i, 1)
            i--;
            break;
          }
        }
        if (found) break;
      }
    }
    return array;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var callFunc = function(callArgs) {
      last = new Date().getTime();
      calledTwice = false;
      func.apply(func, callArgs);
    }
    var last = 0;
    var calledTwice = false;
    return function () {
      if (calledTwice) {
        return;
      }
      var now = new Date().getTime();
      var timeFromCall = now - last;
      if (timeFromCall < wait) {
        calledTwice = true;
        setTimeout(callFunc, (wait + 1 - timeFromCall), Array.from(arguments));
      } else {
        callFunc(Array.from(arguments));        
      }
    }
  };
}());
