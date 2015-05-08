/* CLASSES: Person and PersonTreeNode */

/**
 * Object to represent an employee. 
 * Person consists of a name and a manager (also of type Person)
 * A null manager represents the CEO/president (top of the organization).
 * @param {String} id - The unique employee identifier.
 * @param {String} name - The name of the employee.
 * @param {Person} manager - The employee's manager.
 */
function Person (id, name, manager) {
	// Just incase they forgot the 'new' keyword.
	var self = this instanceof Person
		? this
		: Object.create(Person.prototype);

	self.name = name;
	self.manager = manager;
	self.id = id;

	return self;
};

Person.prototype.toString = function () {
	return 'Person [name=' + this.name + ', manager=' + this.manager + ', id=' + this.id + ']';
};

/**
 * Object representing a tree node of Person.
 * Contains the Person and an Array of PersonTreeNodes 
 * representing all PersonTreeNode's with Person as their respective manager.
 * @param {Person} person - The person object for this tree node.
 */
function PersonTreeNode (person) {
	// Just incase they forgot the 'new' keyword.
	var self = this instanceof PersonTreeNode
		? this
		: Object.create(PersonTreeNode.prototype);


	self.person = person;
	self.directReports = []; // Array of PersonTreeNode objects.

	return self;
};

PersonTreeNode.prototype.toString = function () {
	return 'PersonTreeNode [person=' + this.person + ', directReports=' + this.directReports + ']';
};

/* TEST */
(function () {

	'use strict';

	// Build employees array
	var employees = [];

	var kirk = new Person('a', 'Kirk', null);
	employees.push(kirk);

	var mark = new Person('b', 'Mark', kirk);
	employees.push(mark);

	var tom1 = new Person('c', 'Tom', mark);
	employees.push(tom1);

	var nick = new Person('d', 'Nick', tom1);
	employees.push(nick);

	var ben = new Person('e', 'Ben', tom1);
	employees.push(ben);

	var david = new Person('f', 'David', ben);
	employees.push(david);

	var stacey = new Person('g', 'Stacey', nick);
	employees.push(stacey);

	var corey = new Person('h', 'Corey', nick);
	employees.push(corey);

	var tom2 = new Person('i', 'Tom', stacey);
	employees.push(tom2);

	var julie = new Person('j', 'Julie', stacey);
	employees.push(julie);

	/** 
	 * Returns the string representation of the flattened tree.
	 */
	function outputFlatTree(treeRoot) {

		var result = treeRoot.person.name;
		var first = true;

		if (treeRoot.directReports.length) {

			result += '{';
			treeRoot.directReports
			.splice(0) // copy it
			.sort(function (o1, o2) { // sort it
				if (o1.person.name.toUpperCase() < o2.person.name.toUpperCase()) return -1;
			    if (o1.person.name.toUpperCase() > o2.person.name.toUpperCase()) return 1;
				return 0;
			})
			.forEach(function (childNode) { // add each direct report to result
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

	/** Just an array shuffle function. */
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

	/**
     * Verify that generateTree will produce the root person tree node (the CEO)
     * and that each persons list of direct reports is correct all the way down the tree.
     * @Return {boolean} result - true if the test passed, false otherwise.
     */
    function testGenerateTree() {

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
    		 	+ 'actual: ' + flattTree;
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
    	}
    });

})();