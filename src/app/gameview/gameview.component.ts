import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-gameview',
  templateUrl: './gameview.component.html',
  styleUrls: ['./gameview.component.css', '../../../node_modules/flag-icon-css/css/flag-icon.css']
})
export class GameviewComponent implements OnInit {
  flag: string;
  countryName: string;
  options: string[] = [];
  num: number = 0;
  score: number = 0;
  res: number = -1;
  op: any = '';
  scoreArr: string[] = [];

  constructor(public cService : CountriesService) {

  }

  ngOnInit() {
  }

  startGame(){
    this.res = 0;
    this.next();
  }

  next(){
    this.calcResult();
    if(this.options.length > 0){
      this.options.length = 0;
    }
      let countries = this.cService.getCountry();
      let random = Math.floor(Math.random() * countries.length);
      if(random < 20){
        var random2 = Math.floor(random * 5);
        var random3 = Math.floor(random * 2);
        var random4 = Math.floor(random * 7);
      }else{
        var random2 = Math.floor(random / 5);
        var random3 = Math.floor(random / 2);
        var random4 = Math.floor(random / 7);
      }

      this.flag = countries[random]["alpha-2"];
      this.countryName = countries[random].name;
      console.log(this.flag + '-' + this.countryName);

      this.num++;

      this.options.push(countries[random].name, countries[random2].name, countries[random3].name, countries[random4].name);
      this.options.sort(() => Math.random() - 0.5);

  }

  calcResult(){
    console.log(this.op);
    console.log(this.countryName);
    if(this.op && this.op === this.countryName){
      this.score += 1;
      this.scoreArr.push('true');
    }else{
      this.score += 0;
      this.scoreArr.push('false');
    }
  }

  endGame(){
    let extraScore = 0;
    for(let i = 1 ; i < this.scoreArr.length ; i++){
      if(this.scoreArr[i-1] === this.scoreArr[i] && this.scoreArr[i] === this.scoreArr[i+1]){
        extraScore ++;
        console.log(extraScore);
      }
    }
    if(this.op === this.countryName){
      this.score += 1;
    }
    this.res = 1;
    console.log(this.scoreArr);
    console.log(extraScore);
  }

  resetGame(){
    this.res = -1;
    this.num = 0;
    this.score = 0;
    this.op = '';
  }


}
