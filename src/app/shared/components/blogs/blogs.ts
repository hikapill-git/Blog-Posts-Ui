import { AfterViewInit, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ArticleService } from '../../../core/services/article.service';
import { articleResponse } from '../../../core/models/article.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogs',
  imports: [RouterLink],
  templateUrl: './blogs.html',
  styleUrl: './blogs.css',
})
export class Blogs implements OnInit, AfterViewInit {
  //blobs: articleResponse[] = [];
  blobs = signal<articleResponse[]>([]);
  constructor(private articleService: ArticleService) {}
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.articleService.getAll().subscribe({
      next: (data) => this.blobs.set(data),
      error: (err) => console.error('Error loading articles:', err),
    });
    // //alert(3);
    // //setTimeout(() => {
    // this.articleService.getAll().subscribe({
    //   next: (data) => {
    //     this.blobs = data;
    //     // Force view update if running zoneless / outside Angular
    //     this.cdr.detectChanges(); // or this.cdr.markForCheck();
    //     //console.log(this.blobs);
    //   },
    //   error: (err) => {
    //     console.error('Error loading articles:', err);
    //   },
    // });
    // //}, 500);
  }
  // Angular example
  getExcerpt(content: string, maxLength: number): string {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  }
}
