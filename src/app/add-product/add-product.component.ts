import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    price: ['', Validators.required],
    quantity: ['', Validators.required],
    description: ['', Validators.required],
    imageUrl: ['', Validators.required]
  });

  constructor(
    private router: Router, 
    private apiService: ApiService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
  }

  save() {
    this.apiService.postNewProduct(this.addProductForm.value)
    .subscribe(
      response => console.log('Success!', response),
      error => console.log('Error!', error)
    );

    this.router.navigate(['/home']);
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  get name() { return this.addProductForm.get('name'); }
  get description() { return this.addProductForm.get('description'); }
  get price() { return this.addProductForm.get('price'); }
  get quantity() { return this.addProductForm.get('quantity'); }
  get imageUrl() { return this.addProductForm.get('imageUrl'); }

}
