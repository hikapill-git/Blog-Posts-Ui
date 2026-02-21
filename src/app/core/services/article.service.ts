import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  articlePendingResponse,
  articleResponse,
  postArticle,
  postComment,
} from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  // private apiUrl =
  //   'https://blog-platform-fydbc3fmdaffbggk.centralindia-01.azurewebsites.net/api/articles';

  private apiUrl = 'http://localhost:5017/api/articles';
  constructor(private http: HttpClient) {}

  getByUserId(userId: number): Observable<articleResponse[]> {
    //return this.http.get<articleResponse[]>(`${this.apiUrl + userId}`);
    return this.http.get<articleResponse[]>(`${this.apiUrl}/user/${userId}`);
  }
  getById(postId: number): Observable<any> {
    //return this.http.get<articleResponse[]>(`${this.apiUrl + userId}`);
    return this.http.get<articleResponse>(`${this.apiUrl}/${postId}`);
  }
  getApprovedById(postId: number): Observable<any> {
    //return this.http.get<articleResponse[]>(`${this.apiUrl + userId}`);
    return this.http.get<articleResponse>(`${this.apiUrl}/${postId}/approved`);
  }
  getAll(): Observable<any> {
    return this.http.get<articleResponse[]>(`${this.apiUrl}`);
  }
  getPendingArticles(query: string = 'all'): Observable<any> {
    return this.http.get<articlePendingResponse[]>(`${this.apiUrl}/pending?status=${query}`);
  }
  create(post: postArticle): Observable<any> {
    return this.http.post(`${this.apiUrl}`, post);
  }
  update(post: postArticle, postId: number): Observable<any> {
    let params = new HttpParams().set('postId', postId);
    return this.http.put(`${this.apiUrl}`, post, { params: params });
  }
  postComment(post: postComment, postId: number): Observable<any> {
    // 1. Create the Query Parameters (?postId=...)
    let params = new HttpParams().set('postId', postId);

    // 2. Send the POST request
    // Argument 1: URL
    // Argument 2: Body (the DTO)
    // Argument 3: Options (containing the params)
    return this.http.post(`${this.apiUrl}/comment`, post, { params: params });
  }
  postLike(postId: number): Observable<any> {
    // 1. Set the Query Parameter (?postId=...)
    const params = new HttpParams().set('postId', postId);
    // 2. Send the POST request
    // Arg 1: URL
    // Arg 2: Body (Send empty object '{}' because there is no DTO for a Like)
    // Arg 3: Options (contains the params)
    return this.http.post(`${this.apiUrl}/like`, {}, { params: params });
  }

  approvePost(postId: number, status: boolean): Observable<any> {
    const params = new HttpParams().set('status', status);
    // Arg 2: The Body (Send {} because "Approve" usually just updates status, no extra data needed)
    return this.http.patch(`${this.apiUrl}/${postId}/approve`, {}, { params });
  }
  delete(postId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${postId}`);
  }
}
