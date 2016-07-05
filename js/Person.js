/**
 * Object to represent an employee. 
 * Person consists of a name and a manager (also of type Person)
 * A null manager represents the CEO/president (top of the organization).
 * @constructor
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