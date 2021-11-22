export class Participant{

  FirstName: String | undefined;
  LastName: String | undefined;
  FullName: String | undefined;

  constructor(firstName: String, lastName: String) {
    this.FirstName = firstName;
    this.LastName = lastName;
    this.FullName = this.FirstName + ' ' + this.LastName;
  }
}
