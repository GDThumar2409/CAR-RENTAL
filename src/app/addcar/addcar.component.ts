import { Component, OnInit } from '@angular/core';
import { ICar } from '../ICar';
import { CarserviceService } from '../carservice.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

const UploadURL = 'http://localhost:8000/api/upload';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css']
})
export class AddcarComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: UploadURL, itemAlias: 'photo'});

  uploadForm: FormGroup;  
  name:string;
  class:string;
  fuelType:string;
  transmission:string;
  seats:number;
  //photo:File;
  //photopath:string;
  //filedata:any;
  photoname:String;
  filestatus:number;
  constructor(private carservice:CarserviceService,private router:Router,private cookiservice:CookieService) { }

  ngOnInit() {
    if(!this.cookiservice.check("emailid")){
      this.router.navigate(['']);
    }
    // this.uploadForm = this.formBuilder.group({
    //   name: [''],
    //   class: [''],
    //   transmission: [''],
    //   fuelType: [''],
    //   seats:[''],
    //   photo: [null]
    // });

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

  addcar(car:ICar){
    //car.photo=this.photo;
    car.photoname=this.photoname;
    //this.carservice.savedetail(car).
    //car.photo=this.filedata;
    // const formData = new FormData();
    // formData.append('photo', this.uploadForm.get('photo').value);
    // formData.append('name',this.uploadForm.get('name').value);
    // formData.append('class',this.uploadForm.get('class').value);
    // formData.append('transmission',this.uploadForm.get('transmission').value);
    // formData.append('fuelType',this.uploadForm.get('fuelType').value);
    // formData.append('seats',this.uploadForm.get('seats').value);
    //console.log(formData.value);
    //console.log(car)
    this.carservice.savedetail(car).subscribe(res => res);
    console.log(this.filestatus);
    
      //this.router.navigate[''];
  }

}
