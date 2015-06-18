
/**
 * Given an array of Person objects, should produce the root PersonTreeNode (the CEO)
 * and each person's list of direct reports is correct all the way down the tree.
 * @param {Array[<Person>]} employees - An array of Person objects representing
 *                                      all the employees of the company.
 */
function generateTree(employees) {

  /**
   * INSTRUCTIONS: 
   * 1. Analyze the Person and PersonTreeNode classes in the test.js file.
   *    Those two constructor functions are the only things you should use
   *    from the test.js file.
   *
   * 2. DO NOT EDIT the test.js file. The index.html file will use the 
   *    test.js file to call this function.
   *
   * 3. Parse the 'employees' array and build a single PersonTreeNode
   *    that will represent the fictional company's organization.
   *    Refresh the index.html page to retry the test.
   *  
   *  Things to note:
   *  'employees' is an array of objects of type Person.
   *
   *  The 'manager' property of the ceo Person will be null.
   *  
   *  This function should create and return the root PersonTreeNode (the ceo).
   *  
   *  Each PersonTreeNode's 'directReports' array should contain a PersonTreeNode 
   *  for each direct report of that person. A 'direct report' is someone who 
   *  reports directly for you, i.e. you are their manager.
   *  
   *  Create any additional functions in this file as needed.
   */

  var ceo = null; // Should be a PersonTreeNode object at the end;

  // YOUR CODE STARTS HERE
  
  // YOUR CODE ENDS HERE

  return ceo;
};