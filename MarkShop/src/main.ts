import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { ThamSoService } from './app/services/thamso.service';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(platformRef => {
    const thamSoService = platformRef.injector.get(ThamSoService);
    thamSoService.getByKyHieu("ICON").subscribe(res => {
      const icon = "data:image/jpg;base64," + res.anh;
      const faviconLink = document.getElementById('faviconLink') as HTMLLinkElement;
      if (faviconLink) { faviconLink.href = icon; }
    });
  })
  .catch(err => console.error(err));