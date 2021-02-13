import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input() name: string = "";
  @Input() specialization: string = "";
  @Input() from_year: string = "";
  @Input() to_year: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
