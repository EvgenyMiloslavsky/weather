import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse} from '@angular/common/http';

const maxAge = 30000;

@Injectable({
  providedIn: 'root'
})
export class RequestCacheService {
  cache = new Map();

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    return cached.response;
  }

  put() {
    return;
  }
}
