import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})

export class GifsService {
  private giflist:Gif[] = [];

  private _tagsHistory: string[] = [];
  private apikey:string = 'a18rjmYE3VhclzJOC9Z5rg6qbGbDDJOZ';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';
  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
  }

  public get getTagsHistory():string[] {
    return [...this._tagsHistory];
  }
  public get getGifList():Gif[]{
    return [...this.giflist];
  }
  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }
  private loadLocalStorage():void {
    if(!localStorage.getItem('history'))return
    this._tagsHistory! = JSON.parse(localStorage.getItem('history')! );
    this.searchTag(this._tagsHistory.at(0)!);
  }
  private organizeHistory(tag:string){
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter(t => t !==tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory= this._tagsHistory.splice(0,10)
    this.saveLocalStorage();
  }

  public searchTag( tag:string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key',this.apikey)
      .set('limit', '10')
      .set('q', tag)
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe(resp =>{
        this.giflist = resp.data;
      });
  }
}
