import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {MyBooksComponent} from "./pages/my-books/my-books.component";
import {BookListComponent} from "./pages/book-list/book-list.component";
import {ManageBookComponent} from "./pages/manage-book/manage-book.component";
import {BorrowedBookListComponent} from "./components/borrowed-book-list/borrowed-book-list.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: BookListComponent
      },
      {
        path: 'my-books',
        component: MyBooksComponent
      },
      {
        path: 'my-books/manage',
        component: ManageBookComponent
      },{
        path: 'my-borrowed-books',
        component: BorrowedBookListComponent
      },
      {
        path: 'my-books/manage/:bookId',
        component: ManageBookComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
