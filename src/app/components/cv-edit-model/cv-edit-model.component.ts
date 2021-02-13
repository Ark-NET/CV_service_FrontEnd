import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cv-edit-model',
  templateUrl: './cv-edit-model.component.html',
  styleUrls: ['./cv-edit-model.component.scss']
})
export class CvEditModelComponent implements OnInit {
  errorMess: string = "";
  user = {};
  constructor(
    private storage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //функция запрос на получение данных с базы для заполнения формы
  }

}
