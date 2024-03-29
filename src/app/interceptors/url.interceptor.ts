import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()

export class UrlInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpReq = req.clone(
      {url: `${environment.apiUrl}${req.url.replace('apikey=', `apikey=${environment.appKey}`)}`});
    return next.handle(httpReq);
  }
}
