import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { TodoInterface } from '../types/todo.interface';
import { collectionData, collection, Firestore, addDoc, doc, deleteDoc, updateDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TodosFirebaseService {
  fireStore = inject(Firestore);
  todosCollection = collection(this.fireStore, 'todos');

  constructor() { }

  getTodos(): Observable<TodoInterface[]> {
    return collectionData(this.todosCollection, {idField: 'id'}) as Observable<TodoInterface[]>;
  }

  addTodo(text: string): Observable<string> {
    const promise = addDoc(this.todosCollection, {text, isCompleted: false}).then(resp => resp.id);
    return from(promise);
  }

  removeTodo(todoId: string): Observable<void> {
    const docRef = doc(this.fireStore, 'todos/' + todoId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  updateTodo(todoId: string, dataToUpdate: {text: string; isCompleted: boolean}) {
    const docRef = doc(this.fireStore, 'todos/' + todoId);
    const promise = setDoc(docRef, dataToUpdate);
    return from(promise);
  }
}
