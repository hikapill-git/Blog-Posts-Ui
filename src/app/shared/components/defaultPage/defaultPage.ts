import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
import { Blogs } from '../blogs/blogs';
import { Blog } from '../blog/blog';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-defaultPage',
  imports: [RouterLink, Blogs],
  templateUrl: './defaultPage.html',
  styleUrl: './defaultPage.css',
})
export class DefaultPage implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  //ngOnInit(): void {
  // this.tokenService.user$.subscribe((user) => {
  //   if (user) {
  //     //alert(4);
  //     this.name = user?.FullName || null;
  //     // console.log(this.name);
  //     // if (!user?.exp) this.isTokenExpired = true;
  //     if (!user?.exp) {
  //       const expiry = user?.exp * 1000;
  //       this.isTokenExpired = Date.now() > expiry;
  //     }
  //   }
  // });
  // this.tokenService.user$.subscribe((user) => {
  //   if (user) {
  //     console.log(user?.FullName);
  //     this.name = user?.FullName || null;
  //     if (!user?.exp) this.isTokenExpired = true;
  //     const expiry = user?.exp * 1000;
  //     this.isTokenExpired = Date.now() > expiry;
  //   }
  // });
  // // load from storage if page refreshed
  // this.tokenService.loadUserFromStorage();
  //}
}
