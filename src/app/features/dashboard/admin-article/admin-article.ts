import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlFocus } from '../../../shared/directives/focus.directive';
import { ChangeInputControlColor } from '../../../shared/directives/chginputcolor.directive';
import { AppConfirmModal } from '../../../shared/components/app-confirm-modal/app-confirm-modal';
import { ArticleService } from '../../../core/services/article.service';
import { articleResponse } from '../../../core/models/article.model';
import { Observable, pipe } from 'rxjs';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-admin-article',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlFocus,
    ChangeInputControlColor,
    AppConfirmModal,
  ],
  templateUrl: './admin-article.html',
  styleUrl: './admin-article.css',
})
export class AdminArticle implements OnInit {
  showConfirm = false;
  deletedId: number = 0;
  openConfirm(id: number) {
    this.deletedId = id;
    this.showConfirm = true;
  }
  handleConfirm(result: boolean) {
    this.showConfirm = false;
    if (result) {
      //alert(this.deletedId);
      //Write deleted code here
      this.deleteUser(this.deletedId);
      this.deletedId = 0;
      // alert(this.deletedId);
      // ✅ Run your logic here
      console.log('User clicked YES, running stuff...');
    } else {
      this.deletedId = 0;
      console.log('User clicked NO, hiding popup.');
    }
  }

  showModal = false;
  editingUser: any | null = null;
  editArticle: articleResponse | null = null;
  blogForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private tokenService: TokenService,
  ) {}
  articles$!: Observable<articleResponse[]>;

  ngOnInit(): void {
    //console.log('userId', this.tokenService.getUserId());
    const id = this.tokenService.getUserId();
    this.articles$ = this.articleService.getByUserId(id);

    // this.articleService.getByUserId(1).subscribe({
    //   next: (res) => {
    //     // console.log(res);
    //     this.articles = res;
    //     console.log(this.articles);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });

    this.blogForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  openAddModal() {
    this.showModal = true;
    this.editArticle = null;
  }
  openEditModal(article: articleResponse) {
    this.editArticle = article;
    //console.log(article);
    this.showModal = true;
    //this.editingUser = user;
    this.blogForm.get('title')?.setValue(this.editArticle.title);
    this.blogForm.get('content')?.setValue(this.editArticle.content);
  }
  deleteUser(id: number) {
    if (id > 0) {
      this.articleService.delete(id).subscribe({
        next: (res) => {
          console.log(res);
          this.articles$ = this.articleService.getByUserId(1);
        },
        error: (err) => {
          alert(err);
        },
      });
    }
  }
  closeModal() {
    this.editArticle = null;
    this.showModal = false;
    this.blogForm.reset();
  }
  saveUser() {
    const id = this.tokenService.getUserId();
    if (this.editArticle != null && this.editArticle.id > 0) {
      // alert(this.editArticle.content);
      //  alert(this.editArticle.title);
      this.articleService
        .update(
          { Content: this.blogForm.value.content, Title: this.blogForm.value.title },
          this.editArticle.id,
        )
        .subscribe({
          next: (res) => {
            this.closeModal();

            this.articles$ = this.articleService.getByUserId(id);
          },
          error: (err) => {
            console.log(err.error);
          },
        });
      //alert(4);
    } else {
      this.articleService
        .create({
          Content: this.blogForm.value.content,
          Title: this.blogForm.value.title,
        })
        .subscribe({
          next: (res) => {
            this.closeModal();
            this.articles$ = this.articleService.getByUserId(id);
          },
          error: (err) => {
            console.log(err.error);
          },
        });

      // this.blogForm.setValue({
      //   name: 'Kapil',
      //   email: 'kapil@example.com',
      //   age: 30,
      // });
    }
  }

  patchForm() {
    this.blogForm.patchValue({
      email: 'newmail@example.com',
    });
  }
}
