import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingScoreRoutingModule } from './ranking-score-routing.module';
import { rankingScoreModuleComponents } from './components/components.export';

@NgModule({
  declarations: [...rankingScoreModuleComponents],
  imports: [CommonModule, RankingScoreRoutingModule],
})
export class RankingScoreModule {}
