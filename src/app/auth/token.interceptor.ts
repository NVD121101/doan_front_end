import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, throwError, } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { TokenUtils } from "./token.utils";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem("access_token");
    if (token) {

      // decode JWT payload part.
      const payload = TokenUtils.parseJwt(token);

      // Check token exp.
      if (!payload || Date.now() >= payload.exp * 1000) {
        // Token expire remove it in sessionStorage
        sessionStorage.removeItem("access_token");
      } else {
        // If we have a token, we set it to the header
        request = this.addToken(request, token)
      }
    }
    request = this.addContentType(request, 'application/json');
    return next.handle(request).pipe(
      catchError((error) => {
        if(error.status === 401 || error.status === 403) {
          this.router.navigate(['/login'])
          sessionStorage.clear()
        }
        if(error.status === 500){   
        // this.router.navigate(['/**'], { state: { message: error.error.message.params } })
        }
        return throwError(error.error);
      })
    );
  }

  private addContentType(request: HttpRequest<any>, contentType: string) {
    return request.clone({
      setHeaders: {
        'Content-Type': contentType,
      },
    });
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const TokenInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true
};