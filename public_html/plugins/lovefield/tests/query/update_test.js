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
goog.require('hr.db');
goog.require('lf.bind');
goog.require('lf.query.UpdateBuilder');
goog.require('lf.schema.DataStoreType');
goog.require('lf.testing.util');


/** @type {!lf.Database} */
var db;


function setUp() {
  return hr.db.connect({storeType: lf.schema.DataStoreType.MEMORY}).then(
      function(database) {
        db = database;
      });
}


function tearDown() {
  db.close();
}


/**
 * Tests that Update#exec() fails if set() has not been called first.
 * @return {!IThenable}
 */
function testExec_ThrowsMissingSet() {
  var employeeTable = db.getSchema().getEmployee();
  var query = new lf.query.UpdateBuilder(hr.db.getGlobal(), employeeTable);
  query.where(employeeTable.jobId.eq('dummyJobId'));
  // 532: Invalid usage of update().
  return lf.testing.util.assertPromiseReject(532, query.exec());
}


/**
 * Tests that Update#where() fails if where() has already been called.
 */
function testWhere_ThrowsAlreadyCalled() {
  var employeeTable = db.getSchema().getEmployee();
  var query = new lf.query.UpdateBuilder(hr.db.getGlobal(), employeeTable);

  var buildQuery = function() {
    var predicate = employeeTable.jobId.eq('dummyJobId');
    query.where(predicate).where(predicate);
  };

  // 516: where() has already been called.
  lf.testing.util.assertThrowsError(516, buildQuery);
}


function testSet_ThrowsMissingBinding() {
  var employeeTable = db.getSchema().getEmployee();
  var query = new lf.query.UpdateBuilder(hr.db.getGlobal(), employeeTable);
  query.set(employeeTable.minSalary, lf.bind(0));
  query.set(employeeTable.maxSalary, 20000);
  query.where(employeeTable.jobId.eq('dummyJobId'));
  // 501: Value is not bounded.
  return lf.testing.util.assertPromiseReject(501, query.exec());
}


function testContext_Clone() {
  var j = db.getSchema().getJob();
  var query = /** @type {!lf.query.UpdateBuilder} */ (
      db.update(j).set(j.minSalary, lf.bind(1)).where(j.id.eq(lf.bind(0))));
  var context = query.getQuery();
  var context2 = context.clone();
  assertObjectEquals(context.table, context2.table);
  assertObjectEquals(context.set, context2.set);
  assertObjectEquals(context.where, context2.where);
  assertFalse(context.set[0] === context2.set[0]);
  assertTrue(context2.clonedFrom == context);
  assertTrue(goog.getUid(context) != goog.getUid(context2));
  assertTrue(goog.getUid(context.where) != goog.getUid(context2.where));
}
