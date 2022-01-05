import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  translate = 0;
  itemWidth = 70 + 10; // 70 px is thumb width & 10 is padding
  selectedImage = '';
  productImages = [
    'assets/product-images/1.jpg',
    'assets/product-images/2.jpg',
    'assets/product-images/3.jpg',
    'assets/product-images/4.jpg',
    'assets/product-images/5.jpg',
    'assets/product-images/6.jpg',
    'assets/product-images/7.jpg',
    'assets/product-images/8.jpg',
    'assets/product-images/9.jpg',
    'assets/product-images/10.jpg'
  ];

  widthOfThumbContainer = 500;
  totalWidth = 0;

  isFirstThumbVisible = true;
  isLastThumbVisible = false;

  zoomCoordinates: any;

  constructor() { }

  ngOnInit(): void {
    this.selectedImage = this.productImages[0];
    this.totalWidth = (this.itemWidth) * this.productImages.length;
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  showPrevious() {
    this.isLastThumbVisible  = false;
    const newTranslate = this.itemWidth * 3;
    if (this.translate-newTranslate <=0) {
      this.translate = 0;
      this.isFirstThumbVisible = true;
    } else {
      this.translate = this.translate - newTranslate;
    }
  }

  showNext() {
    this.isFirstThumbVisible = false;
    const newTranslate = this.itemWidth * 3;
    const maxTranslate = this.totalWidth - this.widthOfThumbContainer;
    if (newTranslate + this.translate < maxTranslate) {
      this.translate = newTranslate + this.translate;
    } else {
      this.translate = maxTranslate;
      this.isLastThumbVisible = true;
    }
  }

  zoomOutput(e:any){
   
    this.zoomCoordinates = e;
  }
}
