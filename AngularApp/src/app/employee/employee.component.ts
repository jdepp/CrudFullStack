import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  // This method is automatically called whenever this Employee component is created
  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    // If the form isn't blank, reset it
    if(form) {
      form.reset();
    }

    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
  }

  // Called when the submit button is pressed - save this employee specified in the form to the database via the backend POST method
  onSubmit(form: NgForm) {

    // No ID specified, create new Employee
    if(form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        M.toast({ html: 'Saved successfully', classes: 'rounded' })
        this.refreshEmployeeList();
      });
    }

    // If there already is an employee ID in the form, the user must want to modifiy that employee, do that via the backend PUT method
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        M.toast({ html: 'Updated successfully', classes: 'rounded' })
        this.refreshEmployeeList();
      });
    }
  }

  // Rerenders the list of Employees calling the backend GET method that gets all Employees from database
  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  // Updates the selected employee to the Employee the user just clicked.
  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  // Deletes the employee via the backend DELETE method
  onDelete(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
