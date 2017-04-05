"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_globals_1 = require("../../app.globals");
var expression_service_1 = require("./expression.service");
var ExpressionListComponent = (function () {
    function ExpressionListComponent(_expressionService, router, globals, route) {
        this._expressionService = _expressionService;
        this.router = router;
        this.globals = globals;
        this.route = route;
        this.display = 'none';
        this.class = 'menu-icon icon-plus';
        this.displayDiscover = 'none';
        this.classDiscover = 'menu-icon icon-plus';
        this.search = false;
        this.filter = {};
        this.querying = false;
        this.error = false;
        this.scrollInProgress = false;
        this.globals = globals;
    }
    ExpressionListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filter = this.route.queryParams['value'];
        this.getList();
        this.router.events
            .map(function (event) { return event instanceof router_1.NavigationStart; })
            .subscribe(function () {
            var newFilter = _this.route.queryParams['value'];
            if (JSON.stringify(newFilter) != JSON.stringify(_this.filter)) {
                _this.filter = newFilter;
                _this.getList();
            }
        }, function (err) {
            _this.error = true;
            console.error(err);
        });
    };
    ExpressionListComponent.prototype.getList = function () {
        var _this = this;
        // if (this.querying) return false;
        this.querying = true;
        this.error = false;
        this._expressionService.query(this.filter).then(function (res) {
            _this.items = res;
            _this.querying = false;
        }, function (error) {
            console.error('Error: ' + error);
            _this.querying = false;
            _this.error = true;
        });
    };
    ExpressionListComponent.prototype.onFilterChanged = function (filter) {
        if (filter === void 0) { filter = {}; }
        this.router.navigate(['/expression'], {
            queryParams: filter
        });
    };
    ExpressionListComponent.prototype.onScroll = function () {
        var _this = this;
        if (this.scrollInProgress || !this.items)
            return;
        this.scrollInProgress = true;
        this._expressionService.query(this.filter, this.items.length)
            .then(function (res) {
            _this.scrollInProgress = false;
            (_a = _this.items).push.apply(_a, res);
            var _a;
        }, function (error) { return console.error('Error: ' + error); });
    };
    ExpressionListComponent.prototype.myIdChange = function (event) {
        this.expressionURI = '<' + event.value + '>';
        this.ngOnInit();
        window.scrollTo(0, 0);
    };
    ExpressionListComponent.prototype.wip = function () {
        this.router.navigate(['/wip']);
    };
    return ExpressionListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ExpressionListComponent.prototype, "expressionURI", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Array)
], ExpressionListComponent.prototype, "items", void 0);
ExpressionListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './expression.list.template.html',
        styleUrls: ['./expression.css'],
        providers: [expression_service_1.ExpressionService]
    }),
    __metadata("design:paramtypes", [expression_service_1.ExpressionService,
        router_1.Router, app_globals_1.Globals, router_1.ActivatedRoute])
], ExpressionListComponent);
exports.ExpressionListComponent = ExpressionListComponent;
