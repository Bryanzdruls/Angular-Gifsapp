import { Component, Input } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor(private gifService: GifsService){};
  @Input()
  public gifs: Gif[] = [];

  public get getGifs():Gif[]{
    return [...this.gifService.getGifList];
  }
}
