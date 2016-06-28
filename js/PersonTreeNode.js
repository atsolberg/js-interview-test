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

  /**
   * Array of PersonTreeNode objects.
   * Note: a 'direct report' is someone who reports directly for you, i.e. you are their manager.
   */
  self.directReports = [];

  return self;
};

PersonTreeNode.prototype.toString = function () {
  return 'PersonTreeNode [person=' + this.person + ', directReports=' + this.directReports + ']';
};