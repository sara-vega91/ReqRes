import { HttpInterceptorFn } from '@angular/common/http';

export const ApiKeyInterceptor: HttpInterceptorFn = (req, next) => {
    //Clonamos la petición agregando el header de apiKey
    const authReq = req.clone({
        setHeaders: { 'x-api-key': 'pub_eb5be86a016ed8c553d2067165593cbcdf08efd308f5a392d1af1531e236e9cd' },
    });

    //Pasamos la petición modificada al siguiente interceptor o backend
    return next(authReq);
};