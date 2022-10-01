import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  employees: Employee[] = [];
  employeeForm!: FormGroup;
  constructor(private employeeservice: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      employeeName: new FormControl(''),
      employeeEmail: new FormControl(''),
    });
  }

  saveEmployee() {
    this.employeeservice.addEmployee(this.employee).subscribe(res => {
      console.log(res);
    })
    this.goToEmployeeList();
  }

  onSubmit(): void {
    this.employee.employeeName = this.employeeForm.get('employeeName')?.value;
    this.employee.employeeEmail = this.employeeForm.get('employeeEmail')?.value;

    console.log(this.employee);
    this.saveEmployee();
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
