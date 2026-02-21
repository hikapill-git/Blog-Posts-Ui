import { Routes } from '@angular/router';
import { Loginpage } from './features/auth/loginpage/loginpage';
import { Registerpage } from './features/auth/registerpage/registerpage';
import { DefaultPage } from './shared/components/defaultPage/defaultPage';
import { Userprofile } from './features/dashboard/userprofile/userprofile';
import { AuthGuard } from './core/guards/auth-guard';
import { AdminArticle } from './features/dashboard/admin-article/admin-article';
import { Testing } from './pages/testing/testing';
import { AboutUs } from './features/public/about-us/about-us';
import { ContactUs } from './features/public/contact-us/contact-us';
import { PendingArticles } from './features/dashboard/pending-articles/pending-articles';
import { PracticeRoot } from './practice/practice-root/practice-root';
import { Blog } from './shared/components/blog/blog';
import { Pgnotfound } from './shared/components/pgnotfound/pgnotfound';

export const routes: Routes = [
  //{ path: '', component: DefaultPage, pathMatch: 'full' },
  { path: '', component: DefaultPage, pathMatch: 'full' },

  { path: 'login', component: Loginpage },
  { path: 'about-us', component: AboutUs },
  { path: 'contact-us', component: ContactUs },
  { path: 'register', component: Registerpage },
  //  { path: 'blob/:id', component: Blog },
  { path: 'blog/:id', component: Blog },

  { path: 'dashboard', component: Userprofile, canActivate: [AuthGuard] },
  { path: 'article', component: AdminArticle, canActivate: [AuthGuard] },
  { path: 'pending-articles', component: PendingArticles, canActivate: [AuthGuard] },
  { path: 'test', component: Testing },
  { path: 'admin-dashboard', component: Userprofile, canActivate: [AuthGuard] },
  { path: 'pagenotfound', component: Pgnotfound },
  { path: '**', component: Pgnotfound },

  // { path: 'practice', component: PracticeRoot },
  {
    path: 'practice',
    loadComponent: () =>
      import('./practice/practice-root/practice-root').then((e) => e.PracticeRoot),
  },

  //   {
  //     path: 'todos',
  //     loadComponent: () => import('./core/features/todos/todos').then((t) => t.Todos),
  //   },
];
