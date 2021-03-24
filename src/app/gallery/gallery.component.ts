import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  saunaImages = [
    {path: "assets/sauna/sauna1.jpg"},
    {path: "assets/sauna/sauna2.jpg"},
    {path: "assets/sauna/sauna3.png"},
    {path: "assets/sauna/sauna4.jpg"},
    {path: "assets/sauna/sauna5.jpg"},
    {path: "assets/sauna/sauna6.png"},
    {path: "assets/sauna/sauna7.png"}
    ];
  houseImages = [
    {path: "assets/house/house1.png"},
    {path: "assets/house/house2.jpg"},
    {path: "assets/house/house3.jpg"},
    {path: "assets/house/house4.jpg"},
    {path: "assets/house/house5.jpg"},
    {path: "assets/house/house6.jpg"},
  ];
  parkImages = [
    {name:'assets/park/park1.jpg'},
    {name:'assets/park/park2.jpg'},
    {name:'assets/park/park3.jpg'},
    {name:'assets/park/park4.jpg'},
  ];

  state = "house";

  constructor() {}


  ngOnInit(): void {
  }

  onHouse(){
    this.state="house";
  }

  onSauna(){
    this.state="sauna";
  }

  onPark(){
    this.state="park";
  }
}
