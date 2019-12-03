import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private ngxService: NgxUiLoaderService,
              private authService: AuthService,
              private router: Router, private http: HttpClient,
              private messageService: MessageService) { }

  ngOnInit() {
    this.ngxService.start();
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.ngxService.stop();
  }

  login() {
    this.authService.logIn(this.loginForm.value)
      .subscribe(data => {
        this.authService.setToken(data.token);
        this.router.navigate(['/dashboard']);
      });
  }
}

