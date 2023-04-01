import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)',
  },
  exportAs: 'blocksStyle'
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {

  @Input() selector: string;
  @Input() initFirst: boolean = false;

  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement[];
  private index: number = 0;
  public activeElementIndex: number = 0;

  $event: KeyboardEvent;


  constructor(private el: ElementRef) {

   }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.activeElementIndex = 0

    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);

      if (this.initFirst) {
        if (this.items[0]) {
          (this.items[0] as HTMLElement).setAttribute('style', 'border: 3px solid blue');

        }
      }
    } else {
      console.error('Не передан селектор')
    }
    setTimeout(() =>{
      this.renderComplete.emit(true);
    })
  }

  ngOnChanges(data: SimpleChanges): void {

  }

  initKeyUp(ev: KeyboardEvent): void {

    if(ev.key === 'ArrowRight' || ev.key === 'ArrowLeft'){
      (this.items[this.index] as HTMLElement).removeAttribute('style');
    }

    if(ev.key === 'ArrowRight'){
      if(this.index < this.items.length - 1){
        this.index++;
      }
      if(this.items[this.index]){
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 3px solid blue')
      }

    } else if (ev.key === 'ArrowLeft'){
      if(this.index > 0){
        this.index--;
      }
      if(this.items[this.index]){
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 3px solid blue')
      }
    }
      this.activeElementIndex = this.index;
      this.items[this.index].scrollIntoView({behavior:'smooth',block:'center',inline: 'start'});
  }

    initStyle( index: number):void {
      this.index = index;
      this.activeElementIndex = this.index;
      if (this.items[index]){
       (this.items[index] as HTMLElement).setAttribute('style', 'border: 3px solid blue')
      }
   }
}
