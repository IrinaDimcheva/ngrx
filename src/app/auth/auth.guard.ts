import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const router = inject(Router);
  return inject(Store<AppState>).pipe(
    select(isLoggedIn),
    tap((loggedIn) => {
      if (!loggedIn) {
        router.navigateByUrl('/login');
      }
    })
  );
};
