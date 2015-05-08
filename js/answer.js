/**
 * Instructions: 
 *  Complete 'generateTree' such that the test will pass.
 *  Create any additional functions as needed.
 */

/**
 * Given an array of Person objects, should produce the root PersonTreeNode (the CEO)
 * and each person's list of direct reports is correct all the way down the tree.
 * @param {Array[<Person>]} employees - An array of Person objects representing
 *                                      all the employees of the company.
 */
function generateTree(employees) {

	var ceo = null; // Should be a PersonTreeNode object at the end;

	// YOUR CODE STARTS HERE
	/** @type {Person} boss - The person object of the ceo. */
	var boss = null;
	/** @type {Object} people - A map of Person.id to Person */
	var people = {}; 

	employees.forEach(function (person) {

		var personNode = people[person.id];
		if (personNode === undefined) {
			personNode = new PersonTreeNode(person);
			people[person.id] = personNode;
		}
		
		var manager = person.manager;
		if (manager === null) {
			boss = person;
		} else {

			var managerNode = people[manager.id];
			if (managerNode === undefined) {
				managerNode = new PersonTreeNode(manager);
				people[manager.id] = managerNode;
			}

			managerNode.directReports.push(personNode);
		}

	});

	ceo = people[boss.id];
	// YOUR CODE ENDS HERE

	return ceo;
};