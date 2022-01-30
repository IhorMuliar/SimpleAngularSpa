import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from './user';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  userModel = new User('', '', true);
  aboutForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subscribe: ['']
  });

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  sentUser() {
    this.apiService.postSubscriber(this.userModel)
      .subscribe(
        data => console.log('Success!', data),
        error => console.log('Error!', error)
      );
  }

  get name() { return this.aboutForm.get('name'); }
  get email() { return this.aboutForm.get('name'); }
}