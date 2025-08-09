#!/usr/bin/env node
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _axios = _interopRequireDefault(require("axios"));

var _colors = _interopRequireDefault(require("colors"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _prompts = require("./prompts");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getTeamId = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(token) {
    var _yield$axios$get, _yield$axios$get$data, teams;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios["default"].get('https://vercel.com/api/v2/teams', {
              headers: {
                Authorization: token
              }
            });

          case 3:
            _yield$axios$get = _context.sent;
            _yield$axios$get$data = _yield$axios$get.data.teams;
            teams = _yield$axios$get$data === void 0 ? [] : _yield$axios$get$data;
            _context.next = 8;
            return (0, _prompts.promptForTeam)([{
              name: 'Personal project (NO TEAM)',
              id: false
            }].concat(_toConsumableArray(teams)));

          case 8:
            return _context.abrupt("return", _context.sent);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log(_colors["default"].red('Cannot download teams list. Please check your authorization token !'));
            process.exit(0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function getTeamId(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getDeployment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(env) {
    var _yield$axios$get2, _yield$axios$get2$dat, deployments, projectName;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _axios["default"].get((0, _utils.appendTeamId)("https://vercel.com/api/v6/deployments", env.TEAM_ID), {
              headers: {
                Authorization: env.AUTHORIZATION_TOKEN
              }
            });

          case 3:
            _yield$axios$get2 = _context2.sent;
            _yield$axios$get2$dat = _yield$axios$get2.data.deployments;
            deployments = _yield$axios$get2$dat === void 0 ? [] : _yield$axios$get2$dat;

            if (!deployments.length > 0) {
              console.log(_colors["default"].red('No deployments found for your choices. Exiting...'));
              process.exit();
            }

            _context2.next = 9;
            return (0, _prompts.promptForProjectName)(_toConsumableArray(new Set(deployments.map(function (project) {
              return project.name;
            }))));

          case 9:
            projectName = _context2.sent;
            console.log("Getting list of deployments for ".concat(projectName));
            _context2.next = 13;
            return (0, _prompts.promptForProjectUrl)(deployments.filter(function (deployment) {
              return deployment.name === projectName;
            }));

          case 13:
            return _context2.abrupt("return", _context2.sent);

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            console.log(_colors["default"].red('Cannot get deployment UID. Please raise an issue here: https://github.com/CalinaCristian/source-from-vercel-deployment/issues !'));
            process.exit(0);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));

  return function getDeployment(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
  var _process$env$VERCEL_A;

  var env, _yield$getDeployment, deploymentUid, deploymentUrl, getDeploymentStructureURL, _yield$axios$get3, data, _err$response, _err$response2;

  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          env = {
            DEPLOYMENT_URL: '',
            DEPLOYMENT_FILE_URL: '',
            AUTHORIZATION_TOKEN: '',
            OUTPUT_DIRECTORY: './deployment_source',
            TEAM_ID: false
          };
          _context3.t0 = _utils.getAuthToken;

          if (!((_process$env$VERCEL_A = process.env.VERCEL_AUTH_TOKEN) !== null && _process$env$VERCEL_A !== void 0)) {
            _context3.next = 6;
            break;
          }

          _context3.t1 = _process$env$VERCEL_A;
          _context3.next = 9;
          break;

        case 6:
          _context3.next = 8;
          return (0, _prompts.promptForAuthorizationToken)();

        case 8:
          _context3.t1 = _context3.sent;

        case 9:
          _context3.t2 = _context3.t1;
          env.AUTHORIZATION_TOKEN = (0, _context3.t0)(_context3.t2);
          console.log(_colors["default"].yellow('Getting list of teams...'));
          _context3.next = 14;
          return getTeamId(env.AUTHORIZATION_TOKEN);

        case 14:
          env.TEAM_ID = _context3.sent;
          console.log(_colors["default"].yellow('Getting list of deployments...This might take a while...'));
          _context3.next = 18;
          return getDeployment(env);

        case 18:
          _yield$getDeployment = _context3.sent;
          deploymentUid = _yield$getDeployment.deploymentUid;
          deploymentUrl = _yield$getDeployment.deploymentUrl;
          // Try to get source files instead of output files
          // The file-tree endpoint needs the slug parameter to get the full tree
          env.DEPLOYMENT_URL = "https://vercel.com/api/v2/deployments/".concat(deploymentUid, "/files"); // Try the source file endpoint

          env.DEPLOYMENT_FILE_URL = "https://vercel.com/api/v2/now/files/";
          env.DEPLOYMENT_UID = deploymentUid;
          _context3.next = 26;
          return (0, _prompts.promptForOutputDirectory)();

        case 26:
          _context3.t3 = _context3.sent;

          if (_context3.t3) {
            _context3.next = 29;
            break;
          }

          _context3.t3 = env.OUTPUT_DIRECTORY;

        case 29:
          env.OUTPUT_DIRECTORY = _context3.t3;
          console.log(_colors["default"].yellow('Starting the process of recreating the structure...'));
          getDeploymentStructureURL = (0, _utils.appendTeamId)(env.DEPLOYMENT_URL, env.TEAM_ID, '?');
          console.log(_colors["default"].cyan('Fetching file tree from:', getDeploymentStructureURL));
          _context3.prev = 33;
          _context3.next = 36;
          return _axios["default"].get(getDeploymentStructureURL, {
            headers: {
              Authorization: env.AUTHORIZATION_TOKEN
            }
          });

        case 36:
          _yield$axios$get3 = _context3.sent;
          data = _yield$axios$get3.data;
          console.log(_colors["default"].cyan('API Response:'), JSON.stringify(data).substring(0, 500));
          (0, _mkdirp["default"])(env.OUTPUT_DIRECTORY); // Check different response formats

          if (!data.files) {
            _context3.next = 46;
            break;
          }

          // v2 API returns {files: [...]}
          console.log(_colors["default"].yellow("Processing ".concat(data.files.length, " files from files array...")));
          _context3.next = 44;
          return (0, _utils.processFilesList)(data.files, env.OUTPUT_DIRECTORY, env);

        case 44:
          _context3.next = 54;
          break;

        case 46:
          if (!Array.isArray(data)) {
            _context3.next = 52;
            break;
          }

          console.log(_colors["default"].yellow("Processing ".concat(data.length, " top-level items..."))); // Process as tree structure - the array contains directory/file nodes

          _context3.next = 50;
          return (0, _utils.parseStructure)(data, env.OUTPUT_DIRECTORY, env);

        case 50:
          _context3.next = 54;
          break;

        case 52:
          _context3.next = 54;
          return (0, _utils.parseStructure)(data, env.OUTPUT_DIRECTORY, env);

        case 54:
          _context3.next = 62;
          break;

        case 56:
          _context3.prev = 56;
          _context3.t4 = _context3["catch"](33);
          console.log('Error details:', (_err$response = _context3.t4.response) === null || _err$response === void 0 ? void 0 : _err$response.status, (_err$response2 = _context3.t4.response) === null || _err$response2 === void 0 ? void 0 : _err$response2.data);
          console.log(_context3.t4.message);
          console.log(_colors["default"].red('Cannot recreate the file tree. Please raise an issue here: https://github.com/CalinaCristian/source-from-vercel-deployment/issues !'));
          process.exit(0);

        case 62:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, null, [[33, 56]]);
}))();