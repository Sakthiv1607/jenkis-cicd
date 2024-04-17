import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SignInComponent implements OnInit, AfterViewInit {
  fgSignIn!: FormGroup;

  constructor(private appService: AppService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createSignInForm();
  }

  ngAfterViewInit() { }

  createSignInForm() {
    this.fgSignIn = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get fcUserName() {
    return this.fgSignIn.get('userName') as FormControl;
  }

  get fcPassword() {
    return this.fgSignIn.get('password') as FormControl;
  }

  signIn() {
    const params: any = {
      userName: this.fcUserName.value,
      password: this.fcPassword.value
    };
    this.appService.httpSignIn(params).subscribe((res: any) => {
      console.log(res);

    })
  }
}
