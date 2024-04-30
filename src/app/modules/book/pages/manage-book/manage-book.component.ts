import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BookRequest} from "../../../../services/models/book-request";
import {Router, RouterLink} from "@angular/router";
import {BookService} from "../../../../services/services/book.service";
import {findBookById} from "../../../../services/fn/book/find-book-by-id";

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent {

  errorMsg: Array<string> = [];
  selectedBookCover: any;
  selectedPicture: string | undefined;
  bookRequest: BookRequest = {authorName: "", isbn: "", synopsis: "", title: ""};

constructor(
  private bookService: BookService,
  private router: Router
) {
}
  /**
   * Обрабатывает событие выбора файла.
   * @param event Событие выбора файла, которое содержит информацию о выбранных файлах.
   */
  onFileSelected(event: any) {
    // Извлекает первый файл из списка выбранных файлов.
    this.selectedBookCover = event.target.files[0];

    // Выводит информацию о выбранном файле в консоль.
    console.log(this.selectedBookCover);

    // Если файл был выбран (не null и не undefined),
    if (this.selectedBookCover) {
      // Создает объект FileReader для чтения файла.
      const reader = new FileReader();

      // Обработчик события onload, который будет вызван, когда файл полностью прочитан.
      reader.onload = () => {
        // Преобразует прочитанные данные в строку в формате Data URL (Base64) и сохраняет в переменную.
        this.selectedPicture = reader.result as string;
      };

      // Начинает чтение файла в формате Data URL (обычно для отображения в виде изображения).
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next:(bookId)=>{
        this.bookService.uploadBookCoverPicture({
          'book-id': bookId,
          body: {
            file: this.selectedBookCover
          }
        }).subscribe({
          next:()=>{
            this.router.navigate(['/home/my-books']);
          }
        })
      },error:(err)=>{
        this.errorMsg = err.error.validationErrors;
      }
    })
  }
}
