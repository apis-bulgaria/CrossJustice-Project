var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
var EurovocTreeComponent = /** @class */ (function () {
    function EurovocTreeComponent(http) {
        this.http = http;
        this.selected = [];
        this.selectedClone = [];
        this.selectionConfirmed = new EventEmitter();
    }
    Object.defineProperty(EurovocTreeComponent.prototype, "selectedSet", {
        set: function (value) {
            if (!!!value || value.every(function (x) { return x.selectable === true; })) { // case with real TreeNode data
                this.selected = value || [];
                this.codesToFilterBy = [];
            }
            else { // case with data from api json - only names and codes
                this.codesToFilterBy = value.map(function (x) { return x.code; });
                if (this.euroTreeFull) {
                    this.selected = [];
                    this.selectNodesByFilter(this.euroTreeFull); // needed when selection is cleared but tree is not saved
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    EurovocTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.http.get('case/GetWholeTree').subscribe(function (x) {
            _this.euroTree = x;
            _this.euroTreeFull = x;
            _this.loading = false;
            if (_this.codesToFilterBy) {
                _this.selectNodesByFilter(_this.euroTreeFull);
            }
        });
    };
    EurovocTreeComponent.prototype.loadNodeContent = function (event) {
        var _this = this;
        return;
        if (event.node && !event.node.children) {
            this.loading = true;
            var node_1 = event.node;
            this.http.get('case/GetTreeData/' + node_1.id).subscribe(function (x) {
                node_1.children = x;
                _this.loading = false;
            });
        }
    };
    EurovocTreeComponent.prototype.filterTree = function () {
        var _this = this;
        if (!this.filterText) {
            return;
        }
        if (!this.selectedClone.length) {
            this.selectedClone = this.selected.slice();
        }
        this.selected = [];
        this.codesToFilterBy = this.selectedClone.map(function (x) { return x.data; });
        this.euroTree = this.filterData(this.euroTreeFull, function (x) { return x.label.toLowerCase().includes(_this.filterText.toLowerCase()); });
        // delete below if shit happens
    };
    EurovocTreeComponent.prototype.filterData = function (data, predicate) {
        var _this = this;
        // if no data is sent in, return null, otherwise transform the data
        return !!!data ? null : data.reduce(function (list, entry) {
            var clone = null;
            if (entry.children.length === 0 && predicate(entry)) {
                // if the object matches the filter, clone it as it is
                clone = __assign({}, entry);
            }
            else {
                // if the object has children, filter the list of children
                var children = _this.filterData(entry.children, predicate);
                if (children.length > 0) {
                    // if any of the children matches, clone the parent object, overwrite
                    // the children list with the filtered list
                    clone = __assign({}, entry, { children: children });
                }
                else if (predicate(entry)) {
                    // if parent matches but none of the children do add only parent
                    clone = __assign({}, entry, { children: [] });
                }
            }
            // if there's a cloned object, push it to the output list
            if (clone) {
                clone.expanded = true;
                list.push(clone);
                if (_this.codesToFilterBy.includes(clone.data)) {
                    _this.selected.push(clone);
                }
            }
            return list;
        }, []);
    };
    EurovocTreeComponent.prototype.clearFilter = function () {
        if (this.selectedClone.length) {
            this.selected = this.selectedClone.slice();
        }
        this.euroTree = this.euroTreeFull;
        this.filterText = '';
    };
    EurovocTreeComponent.prototype.done = function () {
        // sanitize all selected data so that it comes from full tree and not filtered!
        var hash = new Set();
        if (this.selectedClone.length) {
            this.selectedClone.forEach(function (x) { return hash.add(x.data); });
        }
        if (this.selected.length) {
            this.selected.forEach(function (x) { return hash.add(x.data); });
        }
        this.codesToFilterBy = Array.from(hash);
        this.selected = [];
        this.selectNodesByFilter(this.euroTreeFull);
        this.euroTree = this.euroTreeFull;
        this.filterText = '';
        this.selectionConfirmed.emit(this.selected);
    };
    EurovocTreeComponent.prototype.clear = function () {
        this.selected.length = 0;
    };
    EurovocTreeComponent.prototype.selectNodesByFilter = function (nodes) {
        var hasSelectedChildren = false;
        var _loop_1 = function (node) {
            if (this_1.codesToFilterBy.includes(node.data)) {
                if (!this_1.selected.some(function (x) { return x.data === node.data; })) {
                    this_1.selected.push(node);
                }
                hasSelectedChildren = true;
            }
            if (node.children) {
                var res = this_1.selectNodesByFilter(node.children);
                if (res) {
                    node.expanded = true;
                    hasSelectedChildren = hasSelectedChildren || res;
                }
                else {
                    node.expanded = false;
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            _loop_1(node);
        }
        return hasSelectedChildren;
    };
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], EurovocTreeComponent.prototype, "selectedSet", null);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], EurovocTreeComponent.prototype, "selectionConfirmed", void 0);
    EurovocTreeComponent = __decorate([
        Component({
            selector: 'app-eurovoc-tree',
            template: "\n    <div class=\"ui-inputgroup\">\n      <input type=\"text\" pInputText placeholder=\"Keyword\" [(ngModel)]=\"filterText\" (keyup.enter)=\"filterTree()\">\n      <button pButton type=\"button\" icon=\"pi pi-times\" class=\"ui-button-danger\" (click)=\"clearFilter()\"></button>\n      <button pButton type=\"button\" label=\"Search\" (click)=\"filterTree()\"></button>\n    </div>\n    <p-tree [value]=\"euroTree\" [propagateSelectionDown]=\"false\" [propagateSelectionUp]=\"false\" [loading]=\"loading\"\n            (onNodeExpand)=\"loadNodeContent($event)\"\n            selectionMode=\"checkbox\" [(selection)]=\"selected\" [style]=\"{'width':'100%'}\"></p-tree>\n    <button pButton (click)=\"done()\" label=\"Done\"></button>\n    <button pButton (click)=\"clear()\" label=\"Clear Selection\"></button>",
            styles: []
        }),
        __metadata("design:paramtypes", [HttpService])
    ], EurovocTreeComponent);
    return EurovocTreeComponent;
}());
export { EurovocTreeComponent };
//# sourceMappingURL=eurovoc-tree.component.js.map