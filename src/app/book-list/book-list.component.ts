import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService , IBook, IBookID} from '../book.service'

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Observable<IBookID[]>;
  bookDetail: Observable<IBook>;
  constructor(private bookService: BookService) {
    this.books = this.bookService.books;
  }

  handleError(error) {
    console.log(error);
  }

  sync(book: IBookID) {
    this.bookDetail = this.bookService.sync(book.id);
  }

  get(book: IBookID) {
    this.bookService.get(book.id).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }

  add(bookElement: HTMLInputElement) {
    let book:IBook = {
      name: bookElement.value,
      read: false
    };

    this.bookService.add(book)
    .then( () => {
      bookElement.value = '' ;
    })
    .catch( this.handleError )
  }

  update(book: IBookID) {
    this.bookService.update(book)
    .then(() => {
      console.log("Updated successfully");
    })
    .catch( this.handleError )
  }

  remove(book: IBookID) {
    this.bookService.delete(book);
  }

  ngOnInit() { }
  
}
