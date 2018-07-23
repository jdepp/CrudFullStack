import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // the library that handles the backend calls
import { Observable } from 'rxjs/Observable';       // the library that handles the reactive programming (the shit with observables)
import 'rxjs/add/operator/map';                     // a library that saves lines of code when calling backend methods.
import 'rxjs/add/operator/toPromise';               // a library that saves lines of code when calling backend methods.

import { Employee } from './employee.model';

// This is a class that interacts directly with the backend calling the GET, POST, PUT, and DELETE methods.
// The point of this is to encapsulate out the direct backend calls to the Employee typescript class (it's good programming practice).
@Injectable()
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly baseURL = "http://localhost:3000/employees";

  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee) {
    return this.http.post(this.baseURL, emp);
  }

  getEmployeeList() {
    return this.http.get(this.baseURL);
  }

  putEmployee(emp: Employee) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
