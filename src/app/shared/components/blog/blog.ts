import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { articleResponse } from '../../../core/models/article.model';
import { ArticleService } from '../../../core/services/article.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';
import { AppConfirmModal } from '../app-confirm-modal/app-confirm-modal';
import { Confimlogin } from '../confimlogin/confimlogin';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, AsyncPipe, CommonModule, Confimlogin, FormsModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  blogId: number = 0;
  commentText: string = '';
  blog$!: Observable<articleResponse | null>;

  blog!: articleResponse;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  // ngOnInit(): void {
  //   //alert(3);
  //   this.blogId = this.route.snapshot.paramMap.get('id')!;
  //   let id: number = Number(this.blogId); // NaN

  //   if (!isNaN(id)) {
  //     this.articleService.getApprovedById(id).subscribe({
  //       next: (data) => {
  //         console.log(data);
  //         this.blog = data;
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  //   } else {
  //     //this.router.navigate(['/blogs', id]);
  //     this.router.navigateByUrl('/pagenotfound');
  //   }
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.blogId = Number(idParam);

    if (!isNaN(this.blogId)) {
      this.loadData();
    } else {
      this.router.navigateByUrl('/pagenotfound');
    }
  }
  loadData() {
    this.blog$ = this.articleService.getApprovedById(this.blogId).pipe(
      tap((data) => {
        //console.log(data);
        if (data.id <= 0) {
          // If API returns null/undefined, redirect
          this.router.navigateByUrl('/pagenotfound');
        }
      }),
      catchError((err) => {
        console.error(err);
        this.router.navigateByUrl('/pagenotfound');
        return of(null); // emit null so template can handle gracefully
      }),
    );
  }
  // Or subscribe for reactive updates:
  // this.route.paramMap.subscribe(params => {
  //   this.blogId = params.get('id')!;
  // });

  likePost() {
    if (!this.authService.isLoggedIn()) {
      this.showConfirm = true;
      return;
    }

    // proceed with like API call
    this.articleService.postLike(this.blogId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.loadData();
  }

  postComment() {
    if (!this.authService.isLoggedIn()) {
      this.showConfirm = true;
      return;
    }
    // proceed with like API call
    this.articleService.postComment({ Text: this.commentText }, this.blogId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.loadData();
    this.commentText = '';
  }
  showConfirm = false;
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
