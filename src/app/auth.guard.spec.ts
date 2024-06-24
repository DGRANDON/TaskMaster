import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './authentication.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthenticationService,
          useValue: { isAuthenticated: jasmine.createSpy() }
        },
        {
          provide: Router,
          useValue: { createUrlTree: jasmine.createSpy().and.returnValue({} as UrlTree) }
        }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow activation if user is authenticated', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(true);
    const result = authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBe(true);
  });

  it('should not allow activation and redirect to login if user is not authenticated', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(false);
    const result = authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toEqual(router.createUrlTree(['/login']));
  });
});


