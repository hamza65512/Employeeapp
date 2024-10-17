import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../Services/employee.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Material/material.module';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule, 
    MaterialModule 
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
   @ViewChild("myModel") model : ElementRef | undefined;

   employeeList : Employee [] = [];
   employeeServices = inject(EmployeeService);
   employeeForm : FormGroup = new FormGroup({});

    constructor(private fb:FormBuilder){};
  ngOnInit(): void {
      this.setFormState();
      this.getEmployee();
  }

  openModel(){
    const empModel = document.getElementById("myModal");
    if(empModel != null){
      empModel.style.display = 'block';
    }
  }

  closeModel(){
    this.setFormState();
    if(this.model != null){
      this.model.nativeElement.style = 'none';
    }
  }
  getEmployee(){
    this.employeeServices.etAllEmployee().subscribe((res: Employee[]) => {
      this.employeeList = res;
    }, error => {
      console.error('Error fetching employees:', error);
    });
  }
  setFormState(){
    this.employeeForm = this.fb.group({
      id :[0],
      name : ['',[Validators.required]],
      email : ['',[Validators.required]],
      mobile : ['',[Validators.required]],
      age : ['',[Validators.required]],
      salary : ['',[Validators.required]],
      status : [false,[Validators.required]],

    });
  }
  formValues : any;
  onSubmit(){
    if(this.employeeForm.invalid){
      alert('Please Fill all Field');
      return;
    }
    if(this.employeeForm.value.id == 0){
      this.formValues = this.employeeForm.value;
      this.employeeServices.addEmployee(this.formValues).subscribe((res) =>{
      alert('Employee Added Successfully');
      this.getEmployee();
      this.employeeForm.reset();
      this.closeModel();
    });
    }else{
      this.formValues = this.employeeForm.value;
      this.employeeServices.updateEmployee(this.formValues).subscribe((res) =>{
      alert('Employee Update Successfully');
      this.getEmployee();
      this.employeeForm.reset();
      this.closeModel();
    });
    }
    
  }

  onEdit(employee : Employee){
    this.openModel();
    this.employeeForm.patchValue(employee);
    
  }

  onDelete(employee : Employee){
    const isConferm = confirm("Are You sure want to delete this Employee  " + employee.name);
    if(isConferm){
      this.employeeServices.deleteEmployee(employee.id).subscribe((res) => {
        alert('Employee Deleted Successfully');
        this.getEmployee();
      });
    }
  }
}
