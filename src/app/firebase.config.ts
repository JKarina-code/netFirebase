import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environment/environment';

const firebaseProviders: EnvironmentProviders = importProvidersFrom([
  provideFirebaseApp(() => initializeApp(environment)),
  provideAuth(() => getAuth()),
]);
export { firebaseProviders };