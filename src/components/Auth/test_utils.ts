/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import configureStore from 'redux-mock-store';

import { AppState } from '../../store';
import { createRemoteDataLoaded } from '../../store/utils';
import { AuthState, AuthUser, Tenant } from './types';

export function getMockAuthStore(state?: Partial<AppState['auth']>) {
  return configureStore<Pick<AppState, 'auth'>>()({
    auth: {
      users: { loading: false, result: { data: [] } },
      filter: '',
      allowDuplicateEmails: false,
      tenants: { loading: false, result: { data: [] } },
      ...state,
    },
  });
}

export function createFakeUser(user: Partial<AuthUser>): AuthUser {
  return {
    localId: 'pirojok',
    disabled: false,
    displayName: 'Pirojok',
    providerUserInfo: [],
    // September 28 2020
    createdAt: '"1601310006686"',
    lastLoginAt: '"1601310006686"',
    ...user,
  };
}

export function createFakeTenant(tenant: Partial<Tenant>): Tenant {
  return {
    allowPasswordSignup: false,
    disableAuth: false,
    enableAnonymousUser: false,
    enableEmailLinkSignin: false,
    mfaConfig: { state: '', enabledProviders: [] },
    name: 'name',
    tenantId: 'tenant-id',
    ...tenant,
  };
}

export function createFakeState(state: Partial<AuthState>): AuthState {
  return {
    filter: '',
    allowDuplicateEmails: true,
    users: createRemoteDataLoaded([]),
    tenants: createRemoteDataLoaded([]),
    ...state,
  };
}

export function createFakeAuthStateWithUsers(users: AuthUser[]) {
  return createFakeState({ users: createRemoteDataLoaded(users) });
}

export function createFakeAuthStateWithTenants(tenants: Tenant[]) {
  return createFakeState({ tenants: createRemoteDataLoaded(tenants) });
}
