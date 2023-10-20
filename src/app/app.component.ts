import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewDataComponent } from './new-data/new-data.component';
import { EmployeeService } from './data/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './newcore/core.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  displayedColumns: string[] = [
    'id',
   'firstName', 
   'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private member : MatDialog,
  private _empService: EmployeeService,
  private _coreService:CoreService){}
  

  openAddButton(){
    const dailogRef = this.member.open(NewDataComponent);
    dailogRef.afterClosed().subscribe({
      next:(item)=>{
        if(item){
          this.getEmployee();
        }
      },
    });
  }

  getEmployee(){
    this._empService.getEmployee().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
      
    });
  }
  ngOnInit() {
    this.getEmployee();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
deleteEmployee(id: number){
  this._empService.deleteEmployee(id).subscribe({
    next: (res) =>{
     this._coreService.openSnackBar('Employee deleted','done')
     this.getEmployee();
    },
    error: console.log,
  })
}
openEditButton(data:any){
  const dailogRef = this.member.open(NewDataComponent,{
    data,
  });
  dailogRef.afterClosed().subscribe({
    next:(item)=>{
      if(item){
        this.getEmployee();
      }
    },
  });
}
}
