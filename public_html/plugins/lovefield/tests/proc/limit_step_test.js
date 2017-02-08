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
goog.setTestOnly();
goog.require('goog.testing.jsunit');
goog.require('lf.Row');
goog.require('lf.proc.LimitStep');
goog.require('lf.proc.NoOpStep');
goog.require('lf.proc.Relation');
goog.require('lf.query.SelectContext');
goog.require('lf.testing.MockEnv');
goog.require('lf.testing.getSchemaBuilder');


/** @type {!lf.schema.Database} */
var schema;


function setUp() {
  schema = lf.testing.getSchemaBuilder().getSchema();
  var env = new lf.testing.MockEnv(schema);
  return env.init();
}


function testExec_LimitLessThanResults() {
  return checkExec(/* sampleDataCount */ 20, /* limit */ 10);
}


function testExec_LimitMoreThanResults() {
  return checkExec(/* sampleDataCount */ 20, /* limit */ 100);
}


function testExec_LimitEqualToResults() {
  return checkExec(/* sampleDataCount */ 20, /* limit */ 20);
}


function testExec_LimitZero() {
  return checkExec(/* sampleDataCount */ 20, /* limit */ 0);
}


/**
 * Checks that the number of returned results is as expected.
 * @param {number} sampleDataCount The total number of rows available.
 * @param {number} limit The max number of rows requested by the user.
 * @return {!IThenable}
 */
function checkExec(sampleDataCount, limit) {
  var rows = generateSampleRows(sampleDataCount);
  var tableName = 'dummyTable';
  var childStep = new lf.proc.NoOpStep(
      [lf.proc.Relation.fromRows(rows, [tableName])]);

  var queryContext = new lf.query.SelectContext(schema);
  queryContext.limit = limit;

  var step = new lf.proc.LimitStep();
  step.addChild(childStep);

  return step.exec(undefined, queryContext).then(function(relations) {
    assertEquals(
        Math.min(limit, sampleDataCount),
        relations[0].entries.length);
  });
}


/**
 * Generates sample data for testing.
 * @param {number} rowCount The number of sample rows to be generated.
 * @return {!Array<!lf.Row>}
 */
function generateSampleRows(rowCount) {
  var rows = new Array(rowCount);

  for (var i = 0; i < rowCount; i++) {
    rows[i] = lf.Row.create({
      'id': 'id' + i.toString()
    });
  }

  return rows;
}
