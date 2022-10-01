import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Employee } from './employee';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


 
  private baseURL = "http://localhost:8080/employeeapp/";

  constructor(private httpClient: HttpClient) { }

  getEmployeeList() : Observable<Employee[]>{
    return this.httpClient.get<Employee[]>("http://localhost:8080/employeeapp/employees");
  }

  addEmployee(employee:Employee): Observable<Object>{
    return this.httpClient.post("http://localhost:8080/employeeapp/employee",employee);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(this.baseURL + 'getemployee/' + id )
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee>{
    console.log(employee)
    return this.httpClient.put<any>(this.baseURL+'updateemployee/'+id, employee, httpOptions)
  }

  deleteData(id: number): Observable<Object> {
    return this.httpClient.delete(this.baseURL+'delete/'+id)
}

private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Something bad happened; please try again later.'));
}
}
