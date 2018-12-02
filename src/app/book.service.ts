import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IBook { name: string; read: boolean; }
export interface IBookID extends IBook { id: string; }

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookCollection: AngularFirestoreCollection<IBook>
  books: Observable<IBookID[]>;

  add(book: IBook) {
    return this.bookCollection.add(book);
  }

  get(bookID: string) {
    let book: AngularFirestoreDocument<IBook>;
    book = this.bookCollection.doc<IBook>(bookID);
    return book.valueChanges();
  }

  update(book: IBookID) {
    return this.bookCollection.doc(book.id).update(book);
  }

  delete(book: IBookID) {
    this.bookCollection.doc(book.id).delete();
  }

  includeID(actions) {
    return actions.map((a) => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    });
  };

  constructor(private afs: AngularFirestore) {
    this.bookCollection = this.afs.collection<IBook>('books');
    this.books = this.bookCollection.snapshotChanges().pipe(map(this.includeID));
   }
}
