import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImageZoomDirective]'
})
export class ImageZoomDirectiveDirective implements AfterViewInit {

  private lens:any ;
   @Output() eZoomCoordinates = new EventEmitter();
  constructor(private el:ElementRef,private render2:Renderer2) { }

  ngAfterViewInit(): void {
    console.log('after view init');

  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    console.log('mouse enter')
    const lens = this.render2.createElement('div');
    this.render2.addClass(lens,'lens');
    this.render2.appendChild(this.el.nativeElement, lens);

    this.lens = lens;
    console.log(lens);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    console.log('mouse leave')
    this.eZoomCoordinates.emit(null);
    this.render2.removeChild(this.el.nativeElement,this.lens);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if(!event){
      return;
    }
    // console.log(event);
    // console.log(event.offsetX, event.offsetY);
    this.movelens(event);
  }

  

  
  private movelens(event:MouseEvent){
    let pos, x, y;
    pos = this.getCursorPos(event);
   
  /*calculate the position of the this.lens:*/
  const img = this.el.nativeElement;
  x = pos.x - (this.lens.offsetWidth / 2);
  y = pos.y - (this.lens.offsetHeight / 2);
  /*prevent the this.lens from being positioned outside the image:*/
 // console.log(img.target, this.lens.offsetWidth)
  if (x > pos.width - this.lens.offsetWidth) {
    x = pos.width - this.lens.offsetWidth;
  }
  if (x < 0) {x = 0;}
  if (y > pos.height - this.lens.offsetHeight) {y = pos.height - this.lens.offsetHeight;}
  if (y < 0) {y = 0;}
  /*set the position of the this.lens:*/
  this.lens.style.left = x + "px";
  this.lens.style.top = y + "px";

 // console.log(pos.x*100/pos.width, pos.y*100/pos.height);

  this.eZoomCoordinates.emit({x : pos.x*100/pos.width, y:  pos.y*100/pos.height});
  }

  private getCursorPos(e:MouseEvent) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = this.el.nativeElement.getBoundingClientRect();
   
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y, width: a.width, height: a.height};
  }

}
