import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChangeButtonColor } from '../directives/chgbuttoncolor.directive';
import { SimpleMouseDirective } from '../directives/chgstucturebehavior.directive';
import { TestComponen } from '../test-componen/test-componen';
import { IfLoggedInDirective } from '../../shared/directives/structural.directive';
import { SignalExample } from '../signal-example/signal-example';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-practice-root',
  imports: [
    ChangeButtonColor,
    TestComponen,
    IfLoggedInDirective,
    SignalExample,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './practice-root.html',
  styleUrl: './practice-root.css',
})
export class PracticeRoot implements AfterViewInit, OnInit {
  post: any;
  searchControl = new FormControl('');
  results: any[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    // 1. THE SOURCE (Observable)
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        tap((val) => console.log('Before:', val)),

        // 2. THE OPERATORS (The Processing Machines)
        map((data) => {
          // The API gave us complex objects.
          // We utilize standard JS array mapping here.
          // return data.map((post) => post.title);
          return data.filter((e) => e.userId == 1).map((post) => post.title);
        }),
        tap((val) => console.log('after:', val)),
      )
      // 3. THE SUBSCRIPTION (The Receiver)
      .subscribe((titles) => {
        console.log('I received only titles:', titles);
        // Result: ["sunt aut facere...", "qui est esse...", ...]
      });

    // Try fetching a post that may not exist (e.g., ID 9999)
    // this.getPost(9999).subscribe((data1) => {
    //   this.post = data1;
    // });

    this.searchControl.valueChanges
      .pipe(
        tap((e) => console.log(e)),
        debounceTime(300), // wait for user to stop typing
        distinctUntilChanged(), // only act if value changed
        switchMap((query) => this.searchPosts(query)), // cancel old request
      )
      .subscribe((data) => (this.results = data));
  }

  searchPosts(query: string | null) {
    return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?q=${query}`).pipe(
      catchError(() => of([])), // fallback if error
    );
  }

  getPost(id: number) {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(
      catchError((err) => {
        console.error('Error fetching post:', err.message);
        // Return a safe fallback value
        return of({ id, title: 'Default Title', body: 'No content available' });
      }),
    );
  }

  ngAfterViewInit(): void {
    this.childView.abcll();
  }
  showDiv: boolean = false;
  @ViewChild(TestComponen) childView!: TestComponen;
  @ViewChild(TestComponen) tempChild!: TestComponen;

  showValue(name: string) {
    alert(name);
  }
}
