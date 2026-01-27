import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { Book } from './book';

@Injectable({ providedIn: 'root' })
export class GoogleBooksService {
  private readonly http = inject(HttpClient);

  getBooks(): Observable<Array<Book>> {
    return this.http
      .get<{
        items: Book[];
      }>(
        // altered this line to look for 12 instead of 5 and different author
        'https://www.googleapis.com/books/v1/volumes?maxResults=6&orderBy=relevance&q=fidelity%20investments'
      )
      .pipe(map((books) => books.items || []));
  }
}
