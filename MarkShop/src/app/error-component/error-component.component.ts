import { Component, OnInit } from '@angular/core';
import { LoadScriptService } from '../services/loadscript.service';

@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.css']
})
export class ErrorComponentComponent implements OnInit {
  constructor(
    private load2: LoadScriptService) { }

  ngOnInit(): void {
    this.loadJS();
  }
  private async loadJS(): Promise<void> {
    await this.load2.loadScript('/assets/JS/jquery-3.5.1.min.js')
    await this.load2.loadScript('/assets/JS/index.js')
  }
}
