/**
 * Copyright 2016 Google Inc. All rights reserved.
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

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["images/ajax-loader.gif","ec29cafcd5b3b66970456b7bc8544ab5"],["images/everis_favico.png","91f061808789a86b49b2039b808cfca8"],["images/touch-icon-120.png","2a7de0142538c1450ce9c3f6a3608038"],["images/touch-icon-152.png","931aa6719a82985cccb55f5dd476a859"],["images/touch-icon-167.png","b4432274e7cafa7383f46183b9a55427"],["images/touch-icon-180.png","8399e329e3ee755bceb8f7a4f62ab3c1"],["images/touch-icon-60.png","7131487b2eb801e13db893a72fe9f993"],["images/touch-icon-76.png","1dadfe21f266d8518193ba7ae2f44555"],["index.html","c89ad9a3c7b959656f58b6db3c7c458c"],["plugins/jquery-3.1.1.min.js","e071abda8fe61194711cfc2ab99fe104"],["plugins/lovefield/builddef/firebase_externs.js","7a26334cb7c47165140c29cab78b28d9"],["plugins/lovefield/dist/lovefield.es6.js","ecfc1f61e4b7fc75a4f4f107936b687e"],["plugins/lovefield/dist/lovefield.externs.js","6bf9e5b369894f9e842f85a2671431e3"],["plugins/lovefield/dist/lovefield.js","151f142ef36c70b1c7cd3ca8d953bb60"],["plugins/lovefield/dist/lovefield.min.js","1d2a76d85ff6165b4fcb446b19cc60f3"],["plugins/lovefield/gulpfile.js","a352e78fc176f03b4ce472a0eb0bddfe"],["plugins/lovefield/lib/aggregated_column.js","1cfd2496350b7444ddba9d4c906e54ed"],["plugins/lovefield/lib/back_store.js","3cda20ff51eef5194e5262d9a4ac3162"],["plugins/lovefield/lib/backstore/base_tx.js","5069695bf3004f0b8ae2889e0a7f3be6"],["plugins/lovefield/lib/backstore/bundled_object_store.js","d33e0e55c35e4c67e9b567afb88acf5b"],["plugins/lovefield/lib/backstore/external_change_observer.js","6f530af849cb39c5ed87ecd9494cc6cc"],["plugins/lovefield/lib/backstore/firebase.js","c28a657c6fe0b45c9ea105cc49fe7c79"],["plugins/lovefield/lib/backstore/firebase_raw_back_store.js","b294f280e79e3c3cc84b615dfaf61d12"],["plugins/lovefield/lib/backstore/firebase_tx.js","8af27c30186129256badce73a6118bb2"],["plugins/lovefield/lib/backstore/indexed_db.js","1b01abe923178ac5cba342ac8fa8e535"],["plugins/lovefield/lib/backstore/indexed_db_raw_back_store.js","d053df34ea4e0e7f6bb0483db93cdda5"],["plugins/lovefield/lib/backstore/indexed_db_tx.js","7bbd15df6663a3f12e7853b23b47a0b6"],["plugins/lovefield/lib/backstore/local_storage.js","45278e64d80385ecadf4cae09e93ab60"],["plugins/lovefield/lib/backstore/local_storage_table.js","c335dda40e1e02f4c927f8d602c23dde"],["plugins/lovefield/lib/backstore/local_storage_tx.js","d95c0b4b5446e6b18b61ec533dbce6fa"],["plugins/lovefield/lib/backstore/memory.js","442ed2f109d12c2ea9a18d33c70ad383"],["plugins/lovefield/lib/backstore/memory_table.js","dfb3faed39515ffdda4fcf342155a8a8"],["plugins/lovefield/lib/backstore/memory_tx.js","1ecc786ca67c342b917a75bc7e112560"],["plugins/lovefield/lib/backstore/object_store.js","e47acdf28a696d0257ad0339e1a1aece"],["plugins/lovefield/lib/backstore/observable_store.js","b5a53de4ab94d58e5162a1c2fee678fa"],["plugins/lovefield/lib/backstore/page.js","20990d083b899d32ac761a558dcd2b1d"],["plugins/lovefield/lib/backstore/table_type.js","f0a6b225e6eb222a55c4f555f74880c4"],["plugins/lovefield/lib/backstore/tx.js","a1884bca1eef158f61fb50ab5b888d58"],["plugins/lovefield/lib/backstore/web_sql.js","e002763a5da97151b8e4701c32387325"],["plugins/lovefield/lib/backstore/web_sql_raw_back_store.js","292dc6f7ed7cf1f78ae493646820e157"],["plugins/lovefield/lib/backstore/web_sql_table.js","c17b9b03e16b89eb9852d8009b2f539e"],["plugins/lovefield/lib/backstore/web_sql_tx.js","4bbf4cd1f7580a939a2d8c06758e3517"],["plugins/lovefield/lib/base.js","213cc94d5a146738b04a4cfbd8d856f1"],["plugins/lovefield/lib/bind.js","25226d395fa7eb82bb1e019c034d649e"],["plugins/lovefield/lib/cache/cache.js","545ece6e63a362cbf34549d5be9ca9bf"],["plugins/lovefield/lib/cache/constraint_checker.js","31a0176412ec1e331bd3ae5ec0d54e0e"],["plugins/lovefield/lib/cache/default_cache.js","21e9e9df8de650d058ea4037cecc9442"],["plugins/lovefield/lib/cache/in_memory_updater.js","375ee9a0ab473b1eabae1e9fc28aa3be"],["plugins/lovefield/lib/cache/journal.js","dd5f0e8b5fc6f8bd6d2c0192798a3a44"],["plugins/lovefield/lib/cache/modification.js","09a31903820c1d170a94dba0db0c4630"],["plugins/lovefield/lib/cache/prefetcher.js","8b00238589eef9284e704e53759c760d"],["plugins/lovefield/lib/cache/table_diff.js","1ccab45c7da1c73bc2f6f3a09cd1a2c7"],["plugins/lovefield/lib/capability.js","26a79e95fc4c0c37b217e248f749e4ff"],["plugins/lovefield/lib/database.js","f651bc49cc5e82e6f0e74ce8525808a8"],["plugins/lovefield/lib/diff_calculator.js","888e402cd32b78516a332a76408ee9ea"],["plugins/lovefield/lib/enums.js","bb82383ba562d70ed472fb11d374b303"],["plugins/lovefield/lib/eval.js","aa268f94db975862b31f35343ced400b"],["plugins/lovefield/lib/exception.js","6520ac33ef7f931a6929f5563834cde8"],["plugins/lovefield/lib/flags.js","89b92a644a6eb69e8e09df2da02a1269"],["plugins/lovefield/lib/fn.js","ee785059f14176f3a92ab4199ee202bb"],["plugins/lovefield/lib/global.js","9c6a120cb4a0ccbfc0d717a8e0efb5ae"],["plugins/lovefield/lib/index/btree.js","467621aa3a979f6d761e3d73942df677"],["plugins/lovefield/lib/index/default_comparator.js","088c4d89292e3b084640df5d983f1cb7"],["plugins/lovefield/lib/index/hash.js","b7aa08879051cc429c6277e135e2c449"],["plugins/lovefield/lib/index/index.js","6f6ffcf6d36cd62a8832e89de8621ac6"],["plugins/lovefield/lib/index/index_store.js","e8a94f22a8d1e84343c680c9c54d136a"],["plugins/lovefield/lib/index/key_range.js","9857ebbe50d41fae2c39e7d70d3bf705"],["plugins/lovefield/lib/index/memory_index_store.js","f4f702a6845dfd15dbb72c54482baf18"],["plugins/lovefield/lib/index/multi_key_comparator.js","90ffbc09e26f89edf5897e6bffa45c04"],["plugins/lovefield/lib/index/nullable_index.js","e5e7622df907261a62627f65c6de4dc5"],["plugins/lovefield/lib/index/row_id.js","014fc9b45ea90f4791101cc3cbeedf59"],["plugins/lovefield/lib/index/simple_comparator.js","a9d51ef488c51a198676dc54daf55455"],["plugins/lovefield/lib/index/single_key_range_set.js","bbf81ccc6c82f8be0eb49e03020264b8"],["plugins/lovefield/lib/index/stats.js","d8517d15e850d17b7f497b9b4c567dbb"],["plugins/lovefield/lib/inspect.js","be0d72b8f51fc1ba89c718668261bd46"],["plugins/lovefield/lib/observer_registry.js","deca8e663e8a8a2177fdc9a78dbf74be"],["plugins/lovefield/lib/op.js","44fe5dba8d819ca825cf067c0ebcc559"],["plugins/lovefield/lib/pred/combined_predicate.js","937b34197ec0c37fec747e3f4dfeb528"],["plugins/lovefield/lib/pred/join_predicate.js","2c591300669c5c335101269871aa5fb7"],["plugins/lovefield/lib/pred/operator.js","171535da4fd1bcd854622998ca08bb21"],["plugins/lovefield/lib/pred/pred.js","51ea9ca617c1b1a8e91f4ece045b0a33"],["plugins/lovefield/lib/pred/predicate_node.js","5a54ca8b3c79dcf18cc1e7352d2ab68d"],["plugins/lovefield/lib/pred/value_predicate.js","65a10f146bf29eb4a824b3587257e0c1"],["plugins/lovefield/lib/predicate.js","37c98ae8e556e83d614aea986502f3c1"],["plugins/lovefield/lib/proc/aggregation_step.js","c06ae97aba6c658013fea067603bf3e0"],["plugins/lovefield/lib/proc/and_predicate_pass.js","5226e530e78f9f349721e6d1c870d445"],["plugins/lovefield/lib/proc/cross_product_pass.js","4aa98310865733480efb988574664213"],["plugins/lovefield/lib/proc/cross_product_step.js","477bc237fa418d08e84691fb49a29740"],["plugins/lovefield/lib/proc/database.js","847a6acd9e6c0c32c412352ea26b3642"],["plugins/lovefield/lib/proc/default_query_engine.js","b9e2224609002b95a8b6a0a8fe7d6996"],["plugins/lovefield/lib/proc/delete_logical_plan_generator.js","d3e139e3e6ef20c55fce75664012649b"],["plugins/lovefield/lib/proc/delete_step.js","9579eef667ab979aaac2dab0758c78a3"],["plugins/lovefield/lib/proc/export_task.js","fc5130135c7ff905c0a942d231b6dd5e"],["plugins/lovefield/lib/proc/external_change_task.js","155f5027e071e01ef70f6b7a2f0b8395"],["plugins/lovefield/lib/proc/get_row_count_pass.js","c12e68ae4b3fbd7c0dde88285506819f"],["plugins/lovefield/lib/proc/get_row_count_step.js","97989474844f40e826da2a2dc78200be"],["plugins/lovefield/lib/proc/group_by_step.js","240df0a428f86cafedad7a5e5da629d0"],["plugins/lovefield/lib/proc/implicit_joins_pass.js","44f6a24c91b7f625feec4869313ccd6d"],["plugins/lovefield/lib/proc/import_task.js","c18380447e13ff94e8f46e0c2559b558"],["plugins/lovefield/lib/proc/index_cost_estimator.js","768dca0ba168438ad7b6adb013d8cd23"],["plugins/lovefield/lib/proc/index_join_pass.js","f5ffe2a574c8848391b4567928770acf"],["plugins/lovefield/lib/proc/index_key_range_calculator.js","14f66a28bc74abb6ae6f860412164316"],["plugins/lovefield/lib/proc/index_range_scan_pass.js","7bfe22786842a4d9ea7cbf33239acb7b"],["plugins/lovefield/lib/proc/index_range_scan_step.js","37dc99a2bbdd68cb9cd6d29d14391976"],["plugins/lovefield/lib/proc/insert_step.js","11082fbe0663a2d7ec270cc15b4b00cb"],["plugins/lovefield/lib/proc/join_step.js","43a1113edda30027da6d177976fa321e"],["plugins/lovefield/lib/proc/limit_skip_by_index_pass.js","506bf2bf3f8c2abd2412f051a6dd4e54"],["plugins/lovefield/lib/proc/limit_step.js","46c52a3207623f28f197096e9ba46c41"],["plugins/lovefield/lib/proc/lock_manager.js","7d55fbc12a9e9fed7ec8d9f8321a64d5"],["plugins/lovefield/lib/proc/logical_plan_factory.js","1d6ee73003bfff74acd7b000efeac11e"],["plugins/lovefield/lib/proc/logical_plan_generator.js","4359c57401eafb52923191099def0773"],["plugins/lovefield/lib/proc/logical_plan_rewriter.js","c213889dc6c26eda7990b83ec64d81db"],["plugins/lovefield/lib/proc/logical_query_plan.js","b8d9059f028ea5d33bafb3b24632ed45"],["plugins/lovefield/lib/proc/multi_column_or_pass.js","cec0cdfb8c402eebd0993c54db6a0830"],["plugins/lovefield/lib/proc/no_op_step.js","659d9b0e81b0a89a07d8e67751f2da2c"],["plugins/lovefield/lib/proc/observer_query_task.js","75655930d8019fdfefaf572b852358f2"],["plugins/lovefield/lib/proc/order_by_index_pass.js","38b09eb9dc50ad5ef507307cc89f531a"],["plugins/lovefield/lib/proc/order_by_step.js","8ec42edc1a581fc19c44cfd80ad48df1"],["plugins/lovefield/lib/proc/physical_plan_factory.js","10fb36380efa4e392680e1c80c0a7a3c"],["plugins/lovefield/lib/proc/physical_plan_rewriter.js","3272fa37428255eca9047a010aa1131a"],["plugins/lovefield/lib/proc/physical_query_plan.js","076ccb5ee3a28cd5927ac2109d7fb2bb"],["plugins/lovefield/lib/proc/physical_query_plan_node.js","5b4faa7f6b1bb23e2b8f485f0e510f7b"],["plugins/lovefield/lib/proc/project_step.js","fbaeb6b2f98324f5d58fbb2da24ea5ac"],["plugins/lovefield/lib/proc/push_down_selections_pass.js","0a3a83661e888dc1e73ad61368a4bfa6"],["plugins/lovefield/lib/proc/query_engine.js","b17f885ed61e13707f2e514dca0fb8af"],["plugins/lovefield/lib/proc/query_task.js","1ad8ef2dd3c93966ddb53d9215f76134"],["plugins/lovefield/lib/proc/relation.js","2859718353d7fe8a4e9707ae17872ab2"],["plugins/lovefield/lib/proc/relation_transformer.js","87b26f5a66d4a411bba53b3deb417929"],["plugins/lovefield/lib/proc/rewrite_pass.js","1ef521a4596bf9ea8d79dcd32be3d898"],["plugins/lovefield/lib/proc/runner.js","5229793ae311da0defacb13ea4bf79df"],["plugins/lovefield/lib/proc/select_logical_plan_generator.js","4ffa4ffea65879ee13ab221819c803a3"],["plugins/lovefield/lib/proc/select_step.js","a1f8eb3f086ea422e9fa4ae8965e27d2"],["plugins/lovefield/lib/proc/skip_step.js","07e6c970a8aecac44ae420027230f5f5"],["plugins/lovefield/lib/proc/table_access_by_row_id_step.js","3aaa676bb564bcef95b0108a495828d6"],["plugins/lovefield/lib/proc/table_access_full_step.js","83d94d1a27513da8bf44dee66a2f57a2"],["plugins/lovefield/lib/proc/task.js","f4a2e95bb836029592b609ad4d491fa4"],["plugins/lovefield/lib/proc/transaction.js","b8c78a47435c2f9514e7ab5a839ff9a0"],["plugins/lovefield/lib/proc/transaction_task.js","206a71e1b6083e271b96737a1631f3d1"],["plugins/lovefield/lib/proc/update_step.js","180f03b4e85e503d395200d0afe99bfb"],["plugins/lovefield/lib/proc/user_query_task.js","5319acf6ecb8dbb94413b8e016264939"],["plugins/lovefield/lib/promise.js","7d184bda04394882258048395c1fe573"],["plugins/lovefield/lib/query.js","f712476122915a5dd1d0656eda8128a1"],["plugins/lovefield/lib/query/base_builder.js","254236fc5c9d62b048a64c88f4bad2cf"],["plugins/lovefield/lib/query/context.js","a48b58cd7997979cc93d760396edf7ec"],["plugins/lovefield/lib/query/delete_builder.js","6fb19bf8e6d98c80fe500f6d234e973e"],["plugins/lovefield/lib/query/delete_context.js","bb5c02595819c3a56cd045524e19fc88"],["plugins/lovefield/lib/query/insert_builder.js","364e5759ff5da058c8670a7b2d52b4dd"],["plugins/lovefield/lib/query/insert_context.js","e4e93d18b90cd90a27dfbddd28fde639"],["plugins/lovefield/lib/query/select_builder.js","3061303d89e0806422b572ced34e1916"],["plugins/lovefield/lib/query/select_context.js","2f4c260bcf259f3caf8c60ccaca24f48"],["plugins/lovefield/lib/query/to_sql.js","dcb4b196eaf8762e624be7b8e5417286"],["plugins/lovefield/lib/query/update_builder.js","af79bbee89cbe766ed876ee6ee25f4e0"],["plugins/lovefield/lib/query/update_context.js","285bba225607dec2ffe12aa19150d2f0"],["plugins/lovefield/lib/raw.js","ed5411d87ec7edfd2469299dea79f27b"],["plugins/lovefield/lib/row.js","b578973c68118a1120926f816ac4afc9"],["plugins/lovefield/lib/schema/base_column.js","be7b9925e68b96af101c2dfd5ae93750"],["plugins/lovefield/lib/schema/builder.js","065ed76c7fb7eea252f3df7126b64e98"],["plugins/lovefield/lib/schema/constraint.js","0c8a25442e069416811b1998030de051"],["plugins/lovefield/lib/schema/foreign_key_spec.js","0426578442eadd238a24833def107292"],["plugins/lovefield/lib/schema/info.js","c1ff6ff4a0e71f23f2ba1383bf07e0bd"],["plugins/lovefield/lib/schema/schema.js","96ea5a7c012df5401323910c824df20d"],["plugins/lovefield/lib/schema/table_builder.js","f2acb2b4ff6f99f7da5925ec5c6a8f98"],["plugins/lovefield/lib/service.js","05cf53d24d922697a7c20dbbb2d082d6"],["plugins/lovefield/lib/structs/array.js","d8bc21239ae74b0250a8580cf381e762"],["plugins/lovefield/lib/structs/map.js","812801e23668aca68e2542b7502a9ab2"],["plugins/lovefield/lib/structs/map_set.js","f14e764bbaddae4421ab75b7b6658758"],["plugins/lovefield/lib/structs/set.js","878b0f624a640b503380d6d22ae16b90"],["plugins/lovefield/lib/structs/tree_node.js","130e1aa8260ab37e262421e15b9d938d"],["plugins/lovefield/lib/table.js","b4e419cf91cc1ea3f219064debaf52d7"],["plugins/lovefield/lib/transaction.js","731b0f07b0a6bd029624460db5bf9809"],["plugins/lovefield/lib/transaction_stats.js","eabeee59be5b16320296b0fbd168ee25"],["plugins/lovefield/lib/tree.js","340931c5b9d37ee23b1dc6aca3911a8d"],["plugins/lovefield/spac/codegen.js","b663ddde04645c838a10c93dec17caaa"],["plugins/lovefield/spac/codegen_test.js","b2e0b1288bea3a49f6369a77bb8a984e"],["plugins/lovefield/spac/parser.js","aad9c01ce35dcdee97343c31c8975f93"],["plugins/lovefield/spac/parser_test.js","f54efb859ed4e87cce1bca3a03f6e18f"],["plugins/lovefield/spac/run_test.js","f6be8f760a0c5c5fdfabf5d2338f2a0d"],["plugins/lovefield/spac/spac.js","c68af5b9282aa21ff203f0128ed36436"],["row_coleta.html","0490836dbbb05efdcbbe2eb3750f2939"],["script/countdown.js","26169d880a445866df7de5f0cf8ec697"],["script/local-bd.js","eaf442a654f242cd8e2f2009f01f7aee"],["script/pwaColeta.js","d3710bf95e95b5bd208fadfa5e153c01"],["script/respond.js","8266ac0c642c08f9c20d60b9ec2e3ee5"],["script/schemas/schemas.js","f60e126ad55835b1ebeb998a637a72bb"],["script/utils/utils.js","d41d8cd98f00b204e9800998ecf8427e"],["scss/style.scss","1638edc31369ee81628f5ab7f7d97461"],["styles/normalize.min.css","87d66528cea61c0bfb68cde1b4a4691a"],["styles/style.css","23649197d2cdc9f14e73c539f73d00b6"],["styles/stylePWA.css","7c783f9209f23656c8bc566e5b4960bd"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/^http:\/\/localhost:8080\/ColetaWS/, toolbox.networkFirst, {"cache":{"name":"coletaDadosCache-v2"}});




