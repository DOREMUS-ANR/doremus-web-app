import {Component} from '@angular/core';
import {ExpressionService} from './expression.service';
import {SharedService} from '../../services/sharedService.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './expression.detail.template.html',
  styleUrls: ['./expression.css'],
  providers: [ExpressionService]
})
export class ExpressionDetailComponent {
  sharedService: SharedService;
  expression: any;
  recommendation: [any];
  querying: boolean;
  dates: any[];

  constructor(sharedService: SharedService,
    private expressionService: ExpressionService,
    private route: ActivatedRoute) {

    this.sharedService = sharedService;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      if (id) {
        this.querying = true;
        this.expressionService.get(id).then(exp => {
          this.expression = exp;
          console.log(this.expression);
          this.querying = false;

          // prepare dates for timeline
          this.dates = [];
          if (this.expression.creationStart)
            this.dates.push({
              type: 'creation',
              agent: this.expression.composer,
              date: this.expression.creationStart
            });
          if (this.expression.premiere)
            this.dates.push({
              type: 'premiere',
              description: this.expression.premiereNote,
              date: this.expression.premiereStart
            });
          if (this.expression.publicationEvent)
            this.dates.push({
              type: 'publication',
              description: this.expression.publicationEventNote,
              date: this.expression.publicationStart
            });

        });
        // retrieve recommendations
        this.expressionService.recommend(id)
          .then((res) => this.recommendation = res);

        // FIXME discover why this is not propagated to sharedService
        this.sharedService.sharchBarVisible = false;
      }
    });
  }

  isNode(a) {
    return a.startsWith('node');
  }

}
