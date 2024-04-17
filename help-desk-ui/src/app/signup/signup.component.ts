import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent implements OnInit, AfterViewInit {
  fgSignUp!: FormGroup;

  constructor(private appService: AppService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createSignUpForm();
  }

  ngAfterViewInit() { }

  createSignInForm() {
    this.fgSignUp = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get fcUserName() {
    return this.fgSignUp.get('userName') as FormControl;
  }

  get fcPassword() {
    return this.fgSignUp.get('password') as FormControl;
  }

  signUp() {
    const params: any = {
      userName: this.fcUserName.value,
      password: this.fcPassword.value
    };
    this.appService.httpSignUp(params).subscribe((res: any) => {
      console.log(res);

    })
  }
}
