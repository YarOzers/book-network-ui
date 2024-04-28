import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PageResponseBookResponse} from "../../services/models/page-response-book-response";
import {BookService} from "../../services/services/book.service";
import {Router} from "@angular/router";
import {BookCardComponent} from "../../modules/book/components/book-card/book-card.component";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    NgForOf,
    BookCardComponent
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{
  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 5;

  constructor(private bookService: BookService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.findAllBooks()
    {
    }
  }

  private findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books)=>{
          console.log()
      }
    })
  }
}
