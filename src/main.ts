import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { importProvidersFrom } from '@angular/core';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

const firebaseConfig = {
  apiKey: "AIzaSyCmHD6ftAaPMFzobLkGgsDonjDG28AzCAc",
  authDomain: "angular-todo-36a76.firebaseapp.com",
  projectId: "angular-todo-36a76",
  storageBucket: "angular-todo-36a76.appspot.com",
  messagingSenderId: "332110211789",
  appId: "1:332110211789:web:b9543f415318eaf7221784"
};

bootstrapApplication(AppComponent, { providers: [
  provideRouter(routes),
  importProvidersFrom([
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ])
] });