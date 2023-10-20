import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { EmployeeService } from '../data/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../newcore/core.service';

@Component({
  selector: 'app-new-data',
  templateUrl: './new-data.component.html',
  styleUrls: ['./new-data.component.css']
})
export class NewDataComponent implements OnInit {
  empForm: FormGroup;
  education: string[] = [
    'Matric',
    'Intermediate',
    'Diploma',
    'Graduate',
    'Post Graduate'
];

constructor(private _fb:FormBuilder,
   private _empService:EmployeeService, 
   private _dailogRef: MatDialogRef<NewDataComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   private _coreService:CoreService)
   {
   this.empForm = this._fb.group({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    education: '',
    company: '',
    experience: '',
    package: '',

  });
}

onFormSubmit(){
  if(this.empForm.valid){
    if(this.data){
      this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
        next: (item: any) =>{
           this._coreService.openSnackBar('Employee updated','done')
           this._dailogRef.close(true);
        },
        error: (err: any) => {
          console.log(err);
        }, 
      });

    }else{
    this._empService.addEmployee(this.empForm.value).subscribe({
      next: (item: any) =>{
         this._coreService.openSnackBar('Employee addeg','done')
         this._dailogRef.close(true);
      },
      error: (err: any) => {
        console.log(err);
      }, 
    });
  }
  }
}
  ngOnInit(): void {
  this.empForm.patchValue(this.data)
  }
}
