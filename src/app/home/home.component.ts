import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Router, ActivatedRoute , ParamMap} from '@angular/router';

import { Product } from './product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

	products = [] as any;
	public selectedId: any;

	constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }
  
	ngOnInit() {
		this.apiService.getProducts().subscribe((data: Array<any>) => {  
			this.products = data;  
		})  

		this.route.paramMap.subscribe((params: ParamMap) => {
			let id = parseInt(params.get('id') || 'error');
			this.selectedId = id;
		})
	}

	onSelect(product: Product) {
		this.router.navigate(['/home', product.id]);
	}

	isSelected(product: Product) {
		return product.id === this.selectedId
	}

}