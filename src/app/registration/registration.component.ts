import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { SharedService } from '../shared/services/shared.service';
import { CommonService } from '../shared/services/common.service';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  domains: any = [];
  selectedDomains: any;
  keywords: any = [];
  topics: any = [];
  selectedIndex=0;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router:Router,
    private sharedService: SharedService ,
    private commonService: CommonService ) {
    this.form = this.formBuilder.group({
      name: new FormControl("",[Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      email: new FormControl("",[Validators.required,Validators.email]),
      mobileNumber:new FormControl("",[
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10), Validators.maxLength(10)
      ]),
      password:new FormControl("",[Validators.required, Validators.minLength(6)]),
      domains:new FormControl("",Validators.required),
      role:new FormControl(3,Validators.required),
      subscription:new FormControl({value : 1, disabled : true},Validators.required),
      companyName:new FormControl(""),
      website:new FormControl("",  Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'))
    });
  }

  onSubmit(){
     if (this.form.invalid) return;
     let domains:any=[];
     this.selectedDomains.forEach((domain:any)=>{
      domains.push(domain?._id);
     })
     this.form.get('domains')?.setValue(domains);

     console.log(this.form.value);
      this.registrationService.addUser(this.form.value).subscribe(
        {
          next: (response) => {
            // console.log(response);
          if (response.success){
              this.commonService.showSnackbar("snackbar-success",response.message );
              this.router.navigate(['/home/anonymous']);
            }
          },
          error: (err) => {
            console.log("Error adding user:", err);
        }
        }
      );
    }

    ngOnInit() {
      // this.getAllDomains();
    }
  
    dropdownChange(event: any) {
      this.selectedDomains = event?.value;
      this.changeChips();
    }
  
    changeChips() {
      this.topics = [];
      this.keywords = [];

      this.selectedDomains.forEach((domain:any) => {
        console.log('keywords',domain?.keywords);
        this.topics =[...this.topics,...domain?.subtopics];
        this.keywords =[...this.keywords,...domain?.keywords];
      });
      
    }
  
    // getAllDomains() {
    //   this.sharedService.getAllDomains().subscribe({
    //     next: (response: any) => {
    //       this.domains.push(...response.data);
    //     },
    //     error: (e:any) => console.log("Error : ", e),
    //     complete: () => {
    //       console.info('Complete!');
    //     }
    //   });
    // }
    stepCheck1(){
      if((this.form.get('name')?.valid && this.form.get('email')?.valid && this.form.get('password')?.valid)){
        return true;
      }
      else
        return false;
    }
    stepCheck2(){
      if(this.form.get('domains')?.valid){
        return true;
      }
      else{
        return false
      }
    }

    selectRole(event:MatSelectChange){
      console.log("selectRole",event.value);
      if(event.value == 3){
        this.form.controls["subscription"].setValue(1);
        this.form.controls["subscription"].disable();
      }else{
        this.form.controls["subscription"].enable();

      }

    }
  }

  
