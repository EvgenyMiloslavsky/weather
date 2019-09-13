import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()

export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: RequestCache) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const catchResponce = this.cache.get(req);
    return;
  }
}
