import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable, switchMap } from 'rxjs';

import { ApiService } from '../api-service/api.service';
import { Product } from '../home/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public productId: any;
  product$!: Observable<Product>;

  productForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    price: ['', Validators.required],
    quantity: ['', Validators.required],
    description: ['', Validators.required],
    imageUrl: ['', Validators.required]
  });

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private apiService: ApiService,
    private fb: FormBuilder
    ) {}

  ngOnInit(): void {
    let id  = parseInt(this.route.snapshot.paramMap.get('id') || 'error');
    this.productId = id;
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.apiService.getProduct(params.get('id')!))
    );

    this.product$.subscribe((data: Product) => this.productForm.patchValue({
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      quantity: data.quantity
    }))
  }

  gotoHome() {
    let selectedId = this.productId ? this.productId : null;
    this.router.navigate(['/home', {id: selectedId}]);
  }

  save() {
    this.apiService.setProduct(this.productForm.value, this.productId)
      .subscribe(
        response => console.log('Success!', response),
        error => console.log('Error!', error)
      );
    this.gotoHome();
  }

  cancel() {
    this.gotoHome();
  }

  delete() {
    this.apiService.deleteProduct(this.productId)
    .subscribe(
      response => console.log('Success!', response),
      error => console.log('Error!', error)
    );
    this.gotoHome();
  }

  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
  get quantity() { return this.productForm.get('quantity'); }
  get imageUrl() { return this.productForm.get('imageUrl'); }

}
