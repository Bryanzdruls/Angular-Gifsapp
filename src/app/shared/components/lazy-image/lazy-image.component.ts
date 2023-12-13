import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {

  public hasLoaded: boolean = false;

  @Input()
  public url!: string;

  @Input()
  public alt: string= this.url;


  ngOnInit(): void {
    if(!this.url) throw new Error('URL Property is required');
  }

  public onLoad(){
    setTimeout(()=>{
      this.hasLoaded = true;
    },1000)
  }
}
