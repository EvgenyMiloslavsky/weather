import {Component, OnInit} from '@angular/core';
import {Output} from '@angular/core/';
import {EventEmitter} from '@angular/core/';
import {MatSlideToggleChange} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();
  modelName = 'language';

  constructor() {
  }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onChange($event: MatSlideToggleChange) {

  }
}
