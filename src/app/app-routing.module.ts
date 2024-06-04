import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstant } from './helpers/constants';
import { AppAuthGuard } from './utility/_guards';
import { HomePageComponent } from './public-modules/components/home-page/home-page.component';
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: RouteConstant.MANAGER,
    loadChildren: () =>
      import('./private-modules/manager-module/manager.module').then(
        (m) => m.ManagerModule
      ),
    //canActivate: [AppAuthGuard]
  },

  {
    path: RouteConstant.RANKING_SCORE,
    loadChildren: () =>
      import(
        './private-modules/ranking-score-module/ranking-score.module'
      ).then((m) => m.RankingScoreModule),
    //canActivate: [AppAuthGuard]
  },

  {
    path: RouteConstant.OPERATOR,
    loadChildren: () =>
      import('./private-modules/operator-module/operator.module').then(
        (m) => m.OperatorModule
      ),
    //canActivate: [AppAuthGuard]
  },

  {
    path: '**',
    component: HomePageComponent,
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
