import { Injectable, inject } from '@angular/core';
import {
  Auth,
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';

export interface Credential {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //method email and password
  private auth: Auth = inject(Auth);

  readonly authState$ = authState(this.auth);
  signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  loginWithEmailAndPassword(credential: Credential) {
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  logOut(): Promise<void> {
    return this.auth.signOut();
  }

  //Google and Github
  //PopUP function
  async callPopUP(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this.auth, provider);
      return result;
    } catch (error: any) {
      return error;
    }
  }
  //provider google 
  signInWithGoogleProvider(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return this.callPopUP(provider);
  }
  //provider github 
  signInWithGithubProvider(): Promise<UserCredential> {
    const provider = new GithubAuthProvider();
    return this.callPopUP(provider);
  }
}
