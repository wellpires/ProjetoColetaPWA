/**
 * @license
 * Copyright 2015 The Lovefield Project Authors. All Rights Reserved.
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
goog.provide('lf.testing.NullableDataGenerator');

goog.require('lf.Type');
goog.require('lf.schema');



/**
 * A helper class for generating sample database rows for tables with
 * nullable columns and also ground truth data for the generated rows.
 * @constructor @struct
 *
 * @param {!lf.schema.Database} schema
 */
lf.testing.NullableDataGenerator = function(schema) {
  /** @private {!lf.schema.Database} */
  this.schema_ = schema;

  /** @type {!Array<!lf.Row>} */
  this.sampleTableARows = [];

  /** @type {!Array<!lf.Row>} */
  this.sampleTableBRows = [];

  /** @type {!Array<!lf.Row>} */
  this.sampleTableCRows = [];

  /**
   * TableA.id has values (1, 2, 3, 4, 5, null, null): see generateTableA_().
   * Hence, average of the non-null values is 3. numNullable is exposed to be
   * used by tests related to nullable columns.
   * @type {!lf.testing.NullableDataGenerator.TableAGroundTruth}
   */
  this.tableAGroundTruth = {
    numNullable: 2,
    avgDistinctId: 3,
    sumDistinctId: 15,
    stddevDistinctId: 1.5811388300841898,
    geomeanDistinctId: 2.6051710846973517
  };
};


/**
 * @typedef {{
 *   numNullable: number,
 *   avgDistinctId: number,
 *   sumDistinctId: number,
 *   geomeanDistinctId: number,
 *   stddevDistinctId: number
 * }}
 */
lf.testing.NullableDataGenerator.TableAGroundTruth;


/**
 * Create a Schema Builder for NullableSchema with tables containing
 * nullable columns.
 * @return {!lf.schema.Builder}
 */
lf.testing.NullableDataGenerator.getSchemaBuilder = function() {
  var schemaBuilder = lf.schema.create('NullableSchema', 1);
  schemaBuilder.
      createTable('TableA').
      addColumn('id', lf.Type.INTEGER).
      addNullable(['id']);
  schemaBuilder.
      createTable('TableB').
      addColumn('id', lf.Type.INTEGER).
      addNullable(['id']);
  schemaBuilder.
      createTable('TableC').
      addColumn('id', lf.Type.INTEGER).
      addNullable(['id']);
  return schemaBuilder;
};


/**
 * Generates sample rows for TableA.
 * @private
 */
lf.testing.NullableDataGenerator.prototype.generateTableA_ = function() {
  var tableA = this.schema_.table('TableA');
  var nonNullCount = 5;
  for (var i = 0; i < nonNullCount; i++) {
    this.sampleTableARows.push(tableA.createRow({id: i + 1}));
  }
  for (var i = 0; i < this.tableAGroundTruth.numNullable; i++) {
    this.sampleTableARows.push(tableA.createRow({id: null}));
  }
};


/**
 * Generates sample rows for TableC. This has identical id values with
 * TableA.id. Intended to be used for testing joins with TableA.
 * @private
 */
lf.testing.NullableDataGenerator.prototype.generateTableC_ = function() {
  var tableC = this.schema_.table('TableC');
  var nonNullCount = 5;
  for (var i = 0; i < nonNullCount; i++) {
    this.sampleTableCRows.push(tableC.createRow({id: i + 1}));
  }
  for (var i = 0; i < this.tableAGroundTruth.numNullable; i++) {
    this.sampleTableCRows.push(tableC.createRow({id: null}));
  }
};


/**
 * Generates sample rows for TableB with only null rows.
 * @private
 */
lf.testing.NullableDataGenerator.prototype.generateTableB_ = function() {
  var tableB = this.schema_.table('TableB');
  for (var i = 0; i < 2; i++) {
    this.sampleTableBRows.push(tableB.createRow({id: null}));
  }
};


/**
 * Generates sample rows for tables in this schema.
 */
lf.testing.NullableDataGenerator.prototype.generate = function() {
  this.generateTableA_();
  this.generateTableB_();
  this.generateTableC_();
};
