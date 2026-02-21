import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
import { flush } from '@angular/core/testing';
import { IfLoggedInDirective } from '../../directives/structural.directive';
import { ShareDataToComponentsService } from '../../../core/services/sharedata.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, IfLoggedInDirective],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  isTokenExpired: boolean = true;
  name: string = '';
  shareDataVar: string = '';
  role: string | null = '';
  constructor(
    private tokenService: TokenService,
    private shareData: ShareDataToComponentsService,
  ) {}
  ngOnInit(): void {
    this.role = this.tokenService.getRole();

    this.shareData.dataObservable$.subscribe((value) => {
      this.shareDataVar = value;
      //console.log('Sibling B received:', value);
    });

    // load from storage if page refreshed
    this.tokenService.loadUserFromStorage();

    this.tokenService.user$.subscribe((user) => {
      if (user) {
        console.log(user);
        //alert(4);
        this.name = user?.FullName || null;
        console.log(this.name);
        // if (!user?.exp) this.isTokenExpired = true;
        if (!user?.exp) {
          const expiry = user?.exp * 1000;
          this.isTokenExpired = Date.now() > expiry;
        }
      }
    });
  }
}
