import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  id!: number;
  checkoutForm!: FormGroup;
  // checkoutForm = this.formBuilder.group({
  //   name: '',
  //   address: ''
  // });
 
  constructor(private employeeService: EmployeeService,
    private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.checkoutForm = new FormGroup({
      employeeName: new FormControl(''),
      employeeEmail: new FormControl(''),
    });
  

    this.employeeService.getEmployeeById(this.id).subscribe((data:Employee) =>  {
    this.employee = data;
    this.checkoutForm.patchValue(data)
    });
  }

  onSubmit(){
    this.employee.employeeName = this.checkoutForm.get('employeeName')!.value;
    this.employee.employeeEmail = this.checkoutForm.get('employeeEmail')!.value;

  

    this.employeeService.updateEmployee(this.id, this.employee).subscribe( data =>{
     console.log(data);
    });
    this.goToEmployeeList();
    // this.checkoutForm.reset();
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }
}