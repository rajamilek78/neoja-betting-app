import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingScoreComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: RankingScoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingScoreRoutingModule {}
