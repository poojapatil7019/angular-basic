import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employees: Employee[] = [];
  constructor(private employeeService: EmployeeService, private route: Router) { }

  ngOnInit(): void {
    this.getEmployees();
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }

  private getEmployees(){
    this.employeeService.getEmployeeList().subscribe((data: any) =>{
      this.employees = data;
      console.log(data);
    });
  }

  updateEmployee(id: number){
    this.route.navigate(['updateemployee', id]);
    
  }

  deleteEmployee(id: number){
    this.employeeService.deleteData(id).subscribe(data=>{
      console.log(data)
      this.getEmployees()
    })
    // this.route.navigate(['employees',id]);
  }

  employeeDetails(id: number){
    this.route.navigate(['employeedetails', id]);
  }
}
