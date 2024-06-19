import { Component } from '@angular/core';
import { LoadCssService } from 'src/app/services/loadcss.service';
import { LoadScriptService } from 'src/app/services/loadscript.service';
@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css']
})
export class LayoutAdminComponent {
  constructor(private loadcss: LoadCssService, private load2: LoadScriptService) { }

  ngOnInit(): void {
    this.loadCss();
    this.loadJS()
  }
  private async loadCss(): Promise<void> {
    await this.loadcss.loadCSS('/assets/StyleForm.css');
  }
  private async loadJS(): Promise<void> {
    await this.load2.loadScript('/assets/JS/jquery-3.5.1.min.js')
    await this.load2.loadScript('/assets/JS/jquery.countup.min.js')
    await this.load2.loadScript('/assets/JS/jquery.validate.min.js')
    await this.load2.loadScript('/assets/JS/jquery.validate.unobtrusive.min.js')
    await this.load2.loadScript('/assets/JS/index.js')
  }
}