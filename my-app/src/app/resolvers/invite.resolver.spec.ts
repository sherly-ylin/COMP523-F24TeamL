import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { inviteResolver } from './invite.resolver';
import { IInvite } from '../../../../api/src/models/inviteSchema';

describe('inviteResolver', () => {
  const executeResolver: ResolveFn<IInvite> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => inviteResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
