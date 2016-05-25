import { Component, OnInit } from '@angular/core';
import { Router, RouteSegment, OnActivate, RouteTree } from '@angular/router';

import {MdToolbar} from '@angular2-material/toolbar/toolbar';

import { WorkSubDetail } from './workSubDetail';
import { WorkSubDetailService } from '../../services/workSubDetail.service';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'my-work-subdetail',
  templateUrl: 'workSubDetail.template.html',
  directives: [MdToolbar]
})

export class WorkSubDetailComponent implements OnActivate  {
  subDetail: WorkSubDetail;

  constructor(
    private router: Router,
    private service: WorkSubDetailService) {}


  routerOnActivate(curr: RouteSegment): void {
    let id = +curr.getParam('id');
    this.service.getSubDetail(id).then(subDetail => this.subDetail = subDetail);
  }
}
