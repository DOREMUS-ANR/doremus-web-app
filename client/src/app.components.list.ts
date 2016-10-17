import {HomeComponent} from './components/home/home.component';
import {QueriesTestComponent} from './components/search/queries-test.component';
import {WorkTabComponent} from './components/work-tab/work-tab.component';
import {PerformanceTabComponent} from './components/performance-tab/performance-tab.component';
import {RecordingTabComponent} from './components/recording-tab/recording-tab.component';
import {PersonTabComponent} from './components/person-tab/person-tab.component';
import {ScoreTabComponent} from './components/score-tab/score-tab.component';
import {WorkSubDetailComponent} from './components/work-tab/workSubDetail.component';
import {ExpressionListComponent} from './components/expression/expression.list.component';
import {ExpressionDetailComponent} from './components/expression/expression.detail.component';
import {TopNavComponent} from './components/top-nav/top-nav.component';
import {SearchComponent} from './components/search/search.component';
import {WipComponent} from './components/wip/wip.component';


export const myComponents = {
 HomeComponent, QueriesTestComponent, WorkTabComponent, PerformanceTabComponent, RecordingTabComponent, PersonTabComponent, ScoreTabComponent, WorkSubDetailComponent, ExpressionListComponent, ExpressionDetailComponent, WipComponent, TopNavComponent, SearchComponent
};

export const myComponentsList =  Object.keys(myComponents).map(key => myComponents[key]);
