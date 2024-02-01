import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize, first, tap } from 'rxjs/operators';
import { AppState } from '../reducers';
import { loadAllCourses } from './course.actions';

export const coursesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<any> => {
  const store = inject(Store<AppState>);
  let loading = false;

  return store.pipe(
    tap(() => {
      if (!loading) {
        loading = true;
        store.dispatch(loadAllCourses());
      }
    }),
    first(),
    finalize(() => (loading = false))
  );
};
