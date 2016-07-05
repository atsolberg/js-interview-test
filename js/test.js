/* TEST */
(function () {

  'use strict';

  // Build employees array
  var employees = [];

  var kirk = new Person(uuid(), 'Kirk', null);
  employees.push(kirk);

  var mark = new Person(uuid(), 'Mark', kirk);
  employees.push(mark);

  var tom1 = new Person(uuid(), 'Tom', mark);
  employees.push(tom1);

  var nick = new Person(uuid(), 'Nick', tom1);
  employees.push(nick);

  var ben = new Person(uuid(), 'Ben', tom1);
  employees.push(ben);

  var david = new Person(uuid(), 'David', ben);
  employees.push(david);

  var stacey = new Person(uuid(), 'Stacey', nick);
  employees.push(stacey);

  var corey = new Person(uuid(), 'Corey', nick);
  employees.push(corey);

  var tom2 = new Person(uuid(), 'Tom', stacey);
  employees.push(tom2);

  var julie = new Person(uuid(), 'Julie', stacey);
  employees.push(julie);

  /** @returns - The string representation of the tree. */
  function outputFlatTree(treeRoot) {

    var result = treeRoot.person.name;
    var first = true;

    if (treeRoot.visited) throw 'Person ' + treeRoot.person +  ' reports to more than one person.';
    treeRoot.visited = true;

    if (treeRoot.directReports.length) {

      result += '{';
      treeRoot.directReports
      .slice(0) // Copy it
      .sort(function (o1, o2) { // Sort it
        return o1.person.name.toUpperCase().localeCompare(o2.person.name.toUpperCase());
      })
      .forEach(function (childNode) { // Add each direct report to result
        if (!first) {
          result += ',';
        }
        result += outputFlatTree(childNode);
        first = false;
      });

      result += '}';
    }

    return result;
  }

  /** Shuffle an array. */
  function shuffle(array) {
    
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  /** @returns {String} uuid - An auto-generated 32 character UUID. */
  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  /**
   * Verify that generateTree will produce the root person tree node (the CEO)
   * and that each persons list of direct reports is correct all the way down the tree.
   * @returns {boolean} result - true if the test passed, false otherwise.
   */
  function testGenerateTree() {

    try {

      var expectedTree = 'Kirk{Mark{Tom{Ben{David},Nick{Corey,Stacey{Julie,Tom}}}}}';
      var result = {
        success: true
      }

      var shuffled = shuffle(employees.splice(0));

      var rootNode = generateTree(shuffled);

      if (rootNode === null) {
        result.success = false;
        result.message = 'The returned node was null';

        return result;
      }

      if (rootNode.person.name !== 'Kirk') {
        result.success = false;
        result.message = 'Incorrect ceo, expected: Kirk, actual: ' 
          + rootNode.person.name;

        return result;
      }

      var flatTree = outputFlatTree(rootNode);

      if (flatTree !== expectedTree) {
        result.success = false;
        result.message = 'Incorrect tree, <br>expected: ' + expectedTree + '<br>'
      	  + 'actual: ' + flatTree;
      }

    } catch (error) {
      result.success = false;
      result.message = 'Exception occurred generating tree: <br><br>' + error + '<br><br>'
        + 'Check the console for errors. (F12) in most browsers.';
      result.error = error;
    }

    return result;
  }

  // Run test on page load.
  $(function () {
    var result = testGenerateTree();
    if (result.success) {
      $('#test-results').html('Test Passed!').css({ color: 'green' });
    } else {
      $('#test-results').html('Test Failed:<br>' + result.message).css({ color: 'red' });
      if (result.error) throw result.error;
    }
  });

})();