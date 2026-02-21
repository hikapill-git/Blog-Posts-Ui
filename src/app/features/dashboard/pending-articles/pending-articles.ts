import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfirmModal } from '../../../shared/components/app-confirm-modal/app-confirm-modal';
import { ArticleService } from '../../../core/services/article.service';
import { articleResponse } from '../../../core/models/article.model';
import { Observable, pipe } from 'rxjs';
@Component({
  selector: 'app-pending-articles',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppConfirmModal],
  templateUrl: './pending-articles.html',
  styleUrl: './pending-articles.css',
})
export class PendingArticles implements OnInit {
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
  approvalStatus: string = 'pending'; // default
  showModal = false;
  editingUser: any | null = null;
  editArticle: articleResponse | null = null;
  blogForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
  ) {}
  articles$!: Observable<articleResponse[]>;

  ngOnInit(): void {
    this.commonGetData(this.approvalStatus);
    this.blogForm = this.fb.group({
      title: [''],
      content: [''],
      isApproved: [false],
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
    this.blogForm.get('isApproved')?.setValue(this.editArticle.isApproved);
  }
  deleteUser(id: number) {
    if (id > 0) {
      this.articleService.delete(id).subscribe({
        next: (res) => {
          console.log(res);
          this.commonGetData(this.approvalStatus);
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
    if (this.editArticle != null && this.editArticle.id > 0) {
      console.log(this.blogForm.value);
      this.articleService
        .approvePost(this.editArticle.id, this.blogForm.value.isApproved)
        .subscribe({
          next: (res) => {
            this.closeModal();
            this.commonGetData(this.approvalStatus);
          },
          error: (err) => {
            console.log(err.error);
          },
        });
    }
  }

  patchForm() {
    this.blogForm.patchValue({
      email: 'newmail@example.com',
    });
  }
  onApprovalChange(event: any) {
    //const value = event.target.value;
    //this.commonGetData(value);
    this.commonGetData(this.approvalStatus);
  }
  commonGetData(selectedVal: string) {
    this.articles$ = this.articleService.getPendingArticles(selectedVal);
  }
}
