import { Component, OnInit } from '@angular/core';
import { CarserviceService } from '../carservice.service';
import { ICar } from '../ICar';
import { ActivatedRoute, Router } from '@angular/router';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { CookieService } from 'ngx-cookie-service';


const UploadURL = 'http://localhost:8000/api/upload';

@Component({
  selector: 'app-updatecar',
  templateUrl: './updatecar.component.html',
  styleUrls: ['./updatecar.component.css']
})



export class UpdatecarComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: UploadURL, itemAlias: 'photo'});

  constructor(private carservice:CarserviceService,private route: ActivatedRoute,private cookiservice:CookieService,private router:Router) { }
  name:string;
  car:ICar;

  class:string;
  fuelType:string;
  transmission:string;
  seats:number;
  //photo:File;
  //photopath:string;
  //filedata:any;
  photoname:String;
  filestatus:number;

  


  ngOnInit() {
    if(!this.cookiservice.check("emailid")){
      this.router.navigate(['']);
    }
    this.name=this.route.snapshot.paramMap.get('name');
    console.log(this.name)
    this.carservice.getcar(this.name).subscribe(res => {this.car=res;
    console.log(this.car);
    this.name=this.car.name;
     this.fuelType=this.car.fuelType;
     this.transmission=this.car.transmission;
     this.class=this.car.class;
     this.seats=this.car.seats;
     this.photoname=this.car.photoname;
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item, status, response);
         this.filestatus=status;
         console.log(this.filestatus)
         alert('File uploaded successfully');
         //this.router.navigate[''];
     };
     
  }

  onFileChange(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.photoname=file.name;
    // this.uploadForm.patchValue({
    //   photo: file
    // });
    // this.uploadForm.get('photo').updateValueAndValidity();
    // console.log(this.uploadForm.get('photo'))
  }

  updatecar(car:ICar){
    console.log("calling update car in ts");
    car.photoname=this.photoname;
    this.carservice.putcar(car).subscribe(res => res);
  }

  

}
