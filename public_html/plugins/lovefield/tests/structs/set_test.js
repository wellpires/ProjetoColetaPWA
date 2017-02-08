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
goog.setTestOnly();
goog.require('goog.testing.jsunit');
goog.require('lf.structs.set');


function testSmoke() {
  var set = lf.structs.set.create([1, 2]);
  assertEquals(2, set.size);

  assertTrue(set.delete(1));
  assertEquals(1, set.size);
  set.clear();
  assertEquals(0, set.size);

  for (var i = 0; i < 10; ++i) {
    set.add(i * 10);
  }
  assertTrue(set.has(10));
  assertFalse(set.has(100));

  set.clear();
  assertEquals(0, set.size);

  for (var i = 0; i < 10; ++i) {
    set.add(i * 10);
  }
  set.add(1000);
  assertEquals(11, set.size);


  // Testing forEach.
  set.clear();
  for (var i = 0; i < 5; ++i) {
    set.add(i);
  }

  var values = [];
  set.forEach(function(value) {
    values.push(value);
  });
  assertArrayEquals([0, 1, 2, 3, 4], values);
}

function testSetUtilsForInteger() {
  var set = lf.structs.set.create();
  for (var i = 0; i < 10; ++i) {
    set.add(i * 10);
  }
  set.add(1000);
  set.add(null);
  set.add(undefined);
  assertEquals(13, set.size);

  var values = lf.structs.set.values(set);
  for (var i = 0; i < 10; ++i) {
    assertEquals(i * 10, values[i]);
  }
  assertEquals(1000, values[10]);
  assertEquals(null, values[11]);
  assertEquals(undefined, values[12]);

  var set2 = lf.structs.set.create();
  for (var i = 0; i < 10; ++i) {
    set2.add(i * 10);
  }
  var diffSet = lf.structs.set.diff(set, set2);
  assertEquals(3, diffSet.size);
  assertTrue(diffSet.has(1000));
  assertTrue(diffSet.has(undefined));
  assertTrue(diffSet.has(null));
}

function testSetUtilsForString() {
  var set = lf.structs.set.create();
  for (var i = 0; i < 10; ++i) {
    set.add(i * 10 + '-string');
  }
  set.add(1000 + '-string');
  set.add('');
  assertEquals(12, set.size);

  var values = lf.structs.set.values(set);
  for (var i = 0; i < 10; ++i) {
    assertEquals(i * 10 + '-string', values[i]);
  }
  assertEquals(1000 + '-string', values[10]);
  assertEquals('', values[11]);

  var set2 = lf.structs.set.create();
  for (var i = 0; i < 10; ++i) {
    set2.add(i * 10 + '-string');
  }
  var diffSet = lf.structs.set.diff(set, set2);
  assertEquals(2, diffSet.size);
  assertTrue(diffSet.has(1000 + '-string'));
  assertTrue(diffSet.has(''));
}

function testSetUtilsForObjects() {
  /**
   * @param {number} i
   * @param {string} name
   * @constructor
   */
  var myClass = function(i, name) {
    /** @type {number} */
    this.i = i;

    /** @type {string} */
    this.name = name;
  };

  var rows = new Array(10);
  var set = lf.structs.set.create();
  for (var i = 0; i < 10; ++i) {
    rows[i] = new myClass(i, i + '-string');
    set.add(rows[i]);
  }
  set.add(null);
  assertEquals(11, set.size);

  var values = lf.structs.set.values(set);
  for (var i = 0; i < 10; ++i) {
    assertEquals(rows[i], values[i]);
    assertTrue(rows[i] instanceof myClass);
  }
  assertEquals(null, values[10]);

  var set2 = lf.structs.set.create(rows);
  assertEquals(10, set2.size);
  var diffSet = lf.structs.set.diff(set, set2);
  assertEquals(1, diffSet.size);
  assertTrue(diffSet.has(null));

  var set3 = lf.structs.set.create([rows[0]]);
  assertEquals(1, set3.size);
}

function testIsSubSetAndEquals() {
  var checker = function(s1, s2, s3, s4, s5) {
    assertTrue(lf.structs.set.isSubset(s1, s2));
    assertTrue(lf.structs.set.isSubset(s1, s1));
    assertFalse(lf.structs.set.isSubset(s2, s1));
    assertFalse(lf.structs.set.isSubset(s1, s3));
    assertFalse(lf.structs.set.isSubset(s3, s2));
    assertTrue(lf.structs.set.isSubset(s1, s4));
    assertFalse(lf.structs.set.isSubset(s4, s1));

    assertTrue(lf.structs.set.equals(s1, s1));
    assertTrue(lf.structs.set.equals(s4, s4));
    assertFalse(lf.structs.set.equals(s1, s2));
    assertFalse(lf.structs.set.equals(s2, s3));
    assertFalse(lf.structs.set.equals(s1, s4));
    assertTrue(lf.structs.set.equals(s1, s5));
    assertTrue(lf.structs.set.equals(s5, s1));
  };

  var s1 = lf.structs.set.create([1, 2, 3]);
  var s2 = lf.structs.set.create([2, 3]);
  var s3 = lf.structs.set.create([1, 4]);
  var s4 = lf.structs.set.create();
  var s5 = lf.structs.set.create([1, 2, 3]);
  checker(s1, s2, s3, s4, s5);

  s1 = lf.structs.set.create(['A1', 'B2', 'C3']);
  s2 = lf.structs.set.create(['B2', 'C3']);
  s3 = lf.structs.set.create(['A1', 'D4']);
  s5 = lf.structs.set.create(['A1', 'B2', 'C3']);
  checker(s1, s2, s3, s4, s5);
}

function testSetConstructor() {
  var s = lf.structs.set.create();
  assertEquals(0, s.size);
}
