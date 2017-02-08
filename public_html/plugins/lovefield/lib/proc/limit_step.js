/**
 * @license
 * Copyright 2014 The Lovefield Project Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
goog.provide('lf.proc.LimitStep');

goog.require('lf.proc.PhysicalQueryPlanNode');



/**
 * @constructor @struct
 * @extends {lf.proc.PhysicalQueryPlanNode}
 */
lf.proc.LimitStep = function() {
  lf.proc.LimitStep.base(this, 'constructor',
      1,
      lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
};
goog.inherits(lf.proc.LimitStep, lf.proc.PhysicalQueryPlanNode);


/** @override */
lf.proc.LimitStep.prototype.toString = function() {
  return 'limit(?)';
};


/** @override */
lf.proc.LimitStep.prototype.toContextString = function(context) {
  return this.toString().replace('?', context.limit.toString());
};


/** @override */
lf.proc.LimitStep.prototype.execInternal = function(
    relations, opt_journal, opt_context) {
  // opt_context must be provided for LimitStep.
  var context = opt_context;
  relations[0].entries.splice(context.limit);
  return relations;
};
