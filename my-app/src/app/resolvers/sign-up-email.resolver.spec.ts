import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { signUpEmailResolver } from './sign-up-email.resolver';

describe('signUpEmailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => signUpEmailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
