import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-zoom',
  templateUrl: './product-zoom.component.html',
  styleUrls: ['./product-zoom.component.css']
})
export class ProductZoomComponent implements OnInit,AfterViewInit {
  

  @ViewChild('zoomedImagePreview', {static: true}) zoomedImagePreview: ElementRef;

  imagePreviewEl:any;
  @Input('zoomCoordinates') set zoomCoordinates(val:any){
    if(!this.imagePreviewEl || !val){
      return;
    }
    this.renderer2.setStyle(this.imagePreviewEl,'backgroundPosition',`${val.x}% ${val.y}%`);
  }

  private selectedImage = '';
  @Input('selectedIMG') set setSelectedImage(imgPath:string){
    this.selectedImage = imgPath;
    this.setImage();
  }

  constructor(private renderer2:Renderer2) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.imagePreviewEl =  this.zoomedImagePreview.nativeElement;
     this.setImage();
  }
  setImage() {
    if(!this.selectedImage || !this.imagePreviewEl){
      return;
    }
    this.renderer2.setStyle(this.imagePreviewEl,'backgroundImage',`url(${this.selectedImage})`);
  }

}
