/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "8d9c9489b7a287f6ff68";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "Vendor";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./app/dist";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/Vendor.js")(__webpack_require__.s = "./src/js/Vendor.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/dist/modernizr-custom.js":
/*!**************************************!*\
  !*** ./app/dist/modernizr-custom.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/*! modernizr 3.6.0 (Custom Build) | MIT *\n * https://modernizr.com/download/?-flexbox-svg-setclasses !*/\n!function (e, n, t) {\n  function r(e) {\n    var n = x.className,\n        t = Modernizr._config.classPrefix || \"\";\n\n    if (_ && (n = n.baseVal), Modernizr._config.enableJSClass) {\n      var r = new RegExp(\"(^|\\\\s)\" + t + \"no-js(\\\\s|$)\");\n      n = n.replace(r, \"$1\" + t + \"js$2\");\n    }\n\n    Modernizr._config.enableClasses && (n += \" \" + t + e.join(\" \" + t), _ ? x.className.baseVal = n : x.className = n);\n  }\n\n  function o(e, n) {\n    return _typeof(e) === n;\n  }\n\n  function s() {\n    var e, n, t, r, s, i, l;\n\n    for (var a in w) {\n      if (w.hasOwnProperty(a)) {\n        if (e = [], n = w[a], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {\n          e.push(n.options.aliases[t].toLowerCase());\n        }\n\n        for (r = o(n.fn, \"function\") ? n.fn() : n.fn, s = 0; s < e.length; s++) {\n          i = e[s], l = i.split(\".\"), 1 === l.length ? Modernizr[l[0]] = r : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = r), C.push((r ? \"\" : \"no-\") + l.join(\"-\"));\n        }\n      }\n    }\n  }\n\n  function i(e, n) {\n    return !!~(\"\" + e).indexOf(n);\n  }\n\n  function l() {\n    return \"function\" != typeof n.createElement ? n.createElement(arguments[0]) : _ ? n.createElementNS.call(n, \"http://www.w3.org/2000/svg\", arguments[0]) : n.createElement.apply(n, arguments);\n  }\n\n  function a(e) {\n    return e.replace(/([a-z])-([a-z])/g, function (e, n, t) {\n      return n + t.toUpperCase();\n    }).replace(/^-/, \"\");\n  }\n\n  function f(e, n) {\n    return function () {\n      return e.apply(n, arguments);\n    };\n  }\n\n  function u(e, n, t) {\n    var r;\n\n    for (var s in e) {\n      if (e[s] in n) return t === !1 ? e[s] : (r = n[e[s]], o(r, \"function\") ? f(r, t || n) : r);\n    }\n\n    return !1;\n  }\n\n  function c(e) {\n    return e.replace(/([A-Z])/g, function (e, n) {\n      return \"-\" + n.toLowerCase();\n    }).replace(/^ms-/, \"-ms-\");\n  }\n\n  function d(n, t, r) {\n    var o;\n\n    if (\"getComputedStyle\" in e) {\n      o = getComputedStyle.call(e, n, t);\n      var s = e.console;\n      if (null !== o) r && (o = o.getPropertyValue(r));else if (s) {\n        var i = s.error ? \"error\" : \"log\";\n        s[i].call(s, \"getComputedStyle returning null, its possible modernizr test results are inaccurate\");\n      }\n    } else o = !t && n.currentStyle && n.currentStyle[r];\n\n    return o;\n  }\n\n  function p() {\n    var e = n.body;\n    return e || (e = l(_ ? \"svg\" : \"body\"), e.fake = !0), e;\n  }\n\n  function m(e, t, r, o) {\n    var s,\n        i,\n        a,\n        f,\n        u = \"modernizr\",\n        c = l(\"div\"),\n        d = p();\n    if (parseInt(r, 10)) for (; r--;) {\n      a = l(\"div\"), a.id = o ? o[r] : u + (r + 1), c.appendChild(a);\n    }\n    return s = l(\"style\"), s.type = \"text/css\", s.id = \"s\" + u, (d.fake ? d : c).appendChild(s), d.appendChild(c), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(n.createTextNode(e)), c.id = u, d.fake && (d.style.background = \"\", d.style.overflow = \"hidden\", f = x.style.overflow, x.style.overflow = \"hidden\", x.appendChild(d)), i = t(c, e), d.fake ? (d.parentNode.removeChild(d), x.style.overflow = f, x.offsetHeight) : c.parentNode.removeChild(c), !!i;\n  }\n\n  function g(n, r) {\n    var o = n.length;\n\n    if (\"CSS\" in e && \"supports\" in e.CSS) {\n      for (; o--;) {\n        if (e.CSS.supports(c(n[o]), r)) return !0;\n      }\n\n      return !1;\n    }\n\n    if (\"CSSSupportsRule\" in e) {\n      for (var s = []; o--;) {\n        s.push(\"(\" + c(n[o]) + \":\" + r + \")\");\n      }\n\n      return s = s.join(\" or \"), m(\"@supports (\" + s + \") { #modernizr { position: absolute; } }\", function (e) {\n        return \"absolute\" == d(e, null, \"position\");\n      });\n    }\n\n    return t;\n  }\n\n  function v(e, n, r, s) {\n    function f() {\n      c && (delete z.style, delete z.modElem);\n    }\n\n    if (s = o(s, \"undefined\") ? !1 : s, !o(r, \"undefined\")) {\n      var u = g(e, r);\n      if (!o(u, \"undefined\")) return u;\n    }\n\n    for (var c, d, p, m, v, y = [\"modernizr\", \"tspan\", \"samp\"]; !z.style && y.length;) {\n      c = !0, z.modElem = l(y.shift()), z.style = z.modElem.style;\n    }\n\n    for (p = e.length, d = 0; p > d; d++) {\n      if (m = e[d], v = z.style[m], i(m, \"-\") && (m = a(m)), z.style[m] !== t) {\n        if (s || o(r, \"undefined\")) return f(), \"pfx\" == n ? m : !0;\n\n        try {\n          z.style[m] = r;\n        } catch (h) {}\n\n        if (z.style[m] != v) return f(), \"pfx\" == n ? m : !0;\n      }\n    }\n\n    return f(), !1;\n  }\n\n  function y(e, n, t, r, s) {\n    var i = e.charAt(0).toUpperCase() + e.slice(1),\n        l = (e + \" \" + E.join(i + \" \") + i).split(\" \");\n    return o(n, \"string\") || o(n, \"undefined\") ? v(l, n, r, s) : (l = (e + \" \" + N.join(i + \" \") + i).split(\" \"), u(l, n, t));\n  }\n\n  function h(e, n, r) {\n    return y(e, t, t, n, r);\n  }\n\n  var C = [],\n      w = [],\n      S = {\n    _version: \"3.6.0\",\n    _config: {\n      classPrefix: \"\",\n      enableClasses: !0,\n      enableJSClass: !0,\n      usePrefixes: !0\n    },\n    _q: [],\n    on: function on(e, n) {\n      var t = this;\n      setTimeout(function () {\n        n(t[e]);\n      }, 0);\n    },\n    addTest: function addTest(e, n, t) {\n      w.push({\n        name: e,\n        fn: n,\n        options: t\n      });\n    },\n    addAsyncTest: function addAsyncTest(e) {\n      w.push({\n        name: null,\n        fn: e\n      });\n    }\n  },\n      Modernizr = function Modernizr() {};\n\n  Modernizr.prototype = S, Modernizr = new Modernizr(), Modernizr.addTest(\"svg\", !!n.createElementNS && !!n.createElementNS(\"http://www.w3.org/2000/svg\", \"svg\").createSVGRect);\n\n  var x = n.documentElement,\n      _ = \"svg\" === x.nodeName.toLowerCase(),\n      b = \"Moz O ms Webkit\",\n      E = S._config.usePrefixes ? b.split(\" \") : [];\n\n  S._cssomPrefixes = E;\n  var N = S._config.usePrefixes ? b.toLowerCase().split(\" \") : [];\n  S._domPrefixes = N;\n  var P = {\n    elem: l(\"modernizr\")\n  };\n\n  Modernizr._q.push(function () {\n    delete P.elem;\n  });\n\n  var z = {\n    style: P.elem.style\n  };\n  Modernizr._q.unshift(function () {\n    delete z.style;\n  }), S.testAllProps = y, S.testAllProps = h, Modernizr.addTest(\"flexbox\", h(\"flexBasis\", \"1px\", !0)), s(), r(C), delete S.addTest, delete S.addAsyncTest;\n\n  for (var T = 0; T < Modernizr._q.length; T++) {\n    Modernizr._q[T]();\n  }\n\n  e.Modernizr = Modernizr;\n}(window, document);\n\n//# sourceURL=webpack:///./app/dist/modernizr-custom.js?");

/***/ }),

/***/ "./node_modules/lazysizes/lazysizes.js":
/*!*********************************************!*\
  !*** ./node_modules/lazysizes/lazysizes.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function(window, factory) {\n\tvar lazySizes = factory(window, window.document);\n\twindow.lazySizes = lazySizes;\n\tif( true && module.exports){\n\t\tmodule.exports = lazySizes;\n\t}\n}(typeof window != 'undefined' ?\n      window : {}, function l(window, document) {\n\t'use strict';\n\t/*jshint eqnull:true */\n\n\tvar lazysizes, lazySizesCfg;\n\n\t(function(){\n\t\tvar prop;\n\n\t\tvar lazySizesDefaults = {\n\t\t\tlazyClass: 'lazyload',\n\t\t\tloadedClass: 'lazyloaded',\n\t\t\tloadingClass: 'lazyloading',\n\t\t\tpreloadClass: 'lazypreload',\n\t\t\terrorClass: 'lazyerror',\n\t\t\t//strictClass: 'lazystrict',\n\t\t\tautosizesClass: 'lazyautosizes',\n\t\t\tsrcAttr: 'data-src',\n\t\t\tsrcsetAttr: 'data-srcset',\n\t\t\tsizesAttr: 'data-sizes',\n\t\t\t//preloadAfterLoad: false,\n\t\t\tminSize: 40,\n\t\t\tcustomMedia: {},\n\t\t\tinit: true,\n\t\t\texpFactor: 1.5,\n\t\t\thFac: 0.8,\n\t\t\tloadMode: 2,\n\t\t\tloadHidden: true,\n\t\t\tricTimeout: 0,\n\t\t\tthrottleDelay: 125,\n\t\t};\n\n\t\tlazySizesCfg = window.lazySizesConfig || window.lazysizesConfig || {};\n\n\t\tfor(prop in lazySizesDefaults){\n\t\t\tif(!(prop in lazySizesCfg)){\n\t\t\t\tlazySizesCfg[prop] = lazySizesDefaults[prop];\n\t\t\t}\n\t\t}\n\t})();\n\n\tif (!document || !document.getElementsByClassName) {\n\t\treturn {\n\t\t\tinit: function () {},\n\t\t\tcfg: lazySizesCfg,\n\t\t\tnoSupport: true,\n\t\t};\n\t}\n\n\tvar docElem = document.documentElement;\n\n\tvar Date = window.Date;\n\n\tvar supportPicture = window.HTMLPictureElement;\n\n\tvar _addEventListener = 'addEventListener';\n\n\tvar _getAttribute = 'getAttribute';\n\n\tvar addEventListener = window[_addEventListener];\n\n\tvar setTimeout = window.setTimeout;\n\n\tvar requestAnimationFrame = window.requestAnimationFrame || setTimeout;\n\n\tvar requestIdleCallback = window.requestIdleCallback;\n\n\tvar regPicture = /^picture$/i;\n\n\tvar loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];\n\n\tvar regClassCache = {};\n\n\tvar forEach = Array.prototype.forEach;\n\n\tvar hasClass = function(ele, cls) {\n\t\tif(!regClassCache[cls]){\n\t\t\tregClassCache[cls] = new RegExp('(\\\\s|^)'+cls+'(\\\\s|$)');\n\t\t}\n\t\treturn regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];\n\t};\n\n\tvar addClass = function(ele, cls) {\n\t\tif (!hasClass(ele, cls)){\n\t\t\tele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);\n\t\t}\n\t};\n\n\tvar removeClass = function(ele, cls) {\n\t\tvar reg;\n\t\tif ((reg = hasClass(ele,cls))) {\n\t\t\tele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));\n\t\t}\n\t};\n\n\tvar addRemoveLoadEvents = function(dom, fn, add){\n\t\tvar action = add ? _addEventListener : 'removeEventListener';\n\t\tif(add){\n\t\t\taddRemoveLoadEvents(dom, fn);\n\t\t}\n\t\tloadEvents.forEach(function(evt){\n\t\t\tdom[action](evt, fn);\n\t\t});\n\t};\n\n\tvar triggerEvent = function(elem, name, detail, noBubbles, noCancelable){\n\t\tvar event = document.createEvent('Event');\n\n\t\tif(!detail){\n\t\t\tdetail = {};\n\t\t}\n\n\t\tdetail.instance = lazysizes;\n\n\t\tevent.initEvent(name, !noBubbles, !noCancelable);\n\n\t\tevent.detail = detail;\n\n\t\telem.dispatchEvent(event);\n\t\treturn event;\n\t};\n\n\tvar updatePolyfill = function (el, full){\n\t\tvar polyfill;\n\t\tif( !supportPicture && ( polyfill = (window.picturefill || lazySizesCfg.pf) ) ){\n\t\t\tif(full && full.src && !el[_getAttribute]('srcset')){\n\t\t\t\tel.setAttribute('srcset', full.src);\n\t\t\t}\n\t\t\tpolyfill({reevaluate: true, elements: [el]});\n\t\t} else if(full && full.src){\n\t\t\tel.src = full.src;\n\t\t}\n\t};\n\n\tvar getCSS = function (elem, style){\n\t\treturn (getComputedStyle(elem, null) || {})[style];\n\t};\n\n\tvar getWidth = function(elem, parent, width){\n\t\twidth = width || elem.offsetWidth;\n\n\t\twhile(width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth){\n\t\t\twidth =  parent.offsetWidth;\n\t\t\tparent = parent.parentNode;\n\t\t}\n\n\t\treturn width;\n\t};\n\n\tvar rAF = (function(){\n\t\tvar running, waiting;\n\t\tvar firstFns = [];\n\t\tvar secondFns = [];\n\t\tvar fns = firstFns;\n\n\t\tvar run = function(){\n\t\t\tvar runFns = fns;\n\n\t\t\tfns = firstFns.length ? secondFns : firstFns;\n\n\t\t\trunning = true;\n\t\t\twaiting = false;\n\n\t\t\twhile(runFns.length){\n\t\t\t\trunFns.shift()();\n\t\t\t}\n\n\t\t\trunning = false;\n\t\t};\n\n\t\tvar rafBatch = function(fn, queue){\n\t\t\tif(running && !queue){\n\t\t\t\tfn.apply(this, arguments);\n\t\t\t} else {\n\t\t\t\tfns.push(fn);\n\n\t\t\t\tif(!waiting){\n\t\t\t\t\twaiting = true;\n\t\t\t\t\t(document.hidden ? setTimeout : requestAnimationFrame)(run);\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\trafBatch._lsFlush = run;\n\n\t\treturn rafBatch;\n\t})();\n\n\tvar rAFIt = function(fn, simple){\n\t\treturn simple ?\n\t\t\tfunction() {\n\t\t\t\trAF(fn);\n\t\t\t} :\n\t\t\tfunction(){\n\t\t\t\tvar that = this;\n\t\t\t\tvar args = arguments;\n\t\t\t\trAF(function(){\n\t\t\t\t\tfn.apply(that, args);\n\t\t\t\t});\n\t\t\t}\n\t\t;\n\t};\n\n\tvar throttle = function(fn){\n\t\tvar running;\n\t\tvar lastTime = 0;\n\t\tvar gDelay = lazySizesCfg.throttleDelay;\n\t\tvar rICTimeout = lazySizesCfg.ricTimeout;\n\t\tvar run = function(){\n\t\t\trunning = false;\n\t\t\tlastTime = Date.now();\n\t\t\tfn();\n\t\t};\n\t\tvar idleCallback = requestIdleCallback && rICTimeout > 49 ?\n\t\t\tfunction(){\n\t\t\t\trequestIdleCallback(run, {timeout: rICTimeout});\n\n\t\t\t\tif(rICTimeout !== lazySizesCfg.ricTimeout){\n\t\t\t\t\trICTimeout = lazySizesCfg.ricTimeout;\n\t\t\t\t}\n\t\t\t} :\n\t\t\trAFIt(function(){\n\t\t\t\tsetTimeout(run);\n\t\t\t}, true)\n\t\t;\n\n\t\treturn function(isPriority){\n\t\t\tvar delay;\n\n\t\t\tif((isPriority = isPriority === true)){\n\t\t\t\trICTimeout = 33;\n\t\t\t}\n\n\t\t\tif(running){\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\trunning =  true;\n\n\t\t\tdelay = gDelay - (Date.now() - lastTime);\n\n\t\t\tif(delay < 0){\n\t\t\t\tdelay = 0;\n\t\t\t}\n\n\t\t\tif(isPriority || delay < 9){\n\t\t\t\tidleCallback();\n\t\t\t} else {\n\t\t\t\tsetTimeout(idleCallback, delay);\n\t\t\t}\n\t\t};\n\t};\n\n\t//based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html\n\tvar debounce = function(func) {\n\t\tvar timeout, timestamp;\n\t\tvar wait = 99;\n\t\tvar run = function(){\n\t\t\ttimeout = null;\n\t\t\tfunc();\n\t\t};\n\t\tvar later = function() {\n\t\t\tvar last = Date.now() - timestamp;\n\n\t\t\tif (last < wait) {\n\t\t\t\tsetTimeout(later, wait - last);\n\t\t\t} else {\n\t\t\t\t(requestIdleCallback || run)(run);\n\t\t\t}\n\t\t};\n\n\t\treturn function() {\n\t\t\ttimestamp = Date.now();\n\n\t\t\tif (!timeout) {\n\t\t\t\ttimeout = setTimeout(later, wait);\n\t\t\t}\n\t\t};\n\t};\n\n\tvar loader = (function(){\n\t\tvar preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;\n\n\t\tvar eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;\n\n\t\tvar regImg = /^img$/i;\n\t\tvar regIframe = /^iframe$/i;\n\n\t\tvar supportScroll = ('onscroll' in window) && !(/(gle|ing)bot/.test(navigator.userAgent));\n\n\t\tvar shrinkExpand = 0;\n\t\tvar currentExpand = 0;\n\n\t\tvar isLoading = 0;\n\t\tvar lowRuns = -1;\n\n\t\tvar resetPreloading = function(e){\n\t\t\tisLoading--;\n\t\t\tif(!e || isLoading < 0 || !e.target){\n\t\t\t\tisLoading = 0;\n\t\t\t}\n\t\t};\n\n\t\tvar isVisible = function (elem) {\n\t\t\tif (isBodyHidden == null) {\n\t\t\t\tisBodyHidden = getCSS(document.body, 'visibility') == 'hidden';\n\t\t\t}\n\n\t\t\treturn isBodyHidden || (getCSS(elem.parentNode, 'visibility') != 'hidden' && getCSS(elem, 'visibility') != 'hidden');\n\t\t};\n\n\t\tvar isNestedVisible = function(elem, elemExpand){\n\t\t\tvar outerRect;\n\t\t\tvar parent = elem;\n\t\t\tvar visible = isVisible(elem);\n\n\t\t\teLtop -= elemExpand;\n\t\t\teLbottom += elemExpand;\n\t\t\teLleft -= elemExpand;\n\t\t\teLright += elemExpand;\n\n\t\t\twhile(visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem){\n\t\t\t\tvisible = ((getCSS(parent, 'opacity') || 1) > 0);\n\n\t\t\t\tif(visible && getCSS(parent, 'overflow') != 'visible'){\n\t\t\t\t\touterRect = parent.getBoundingClientRect();\n\t\t\t\t\tvisible = eLright > outerRect.left &&\n\t\t\t\t\t\teLleft < outerRect.right &&\n\t\t\t\t\t\teLbottom > outerRect.top - 1 &&\n\t\t\t\t\t\teLtop < outerRect.bottom + 1\n\t\t\t\t\t;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn visible;\n\t\t};\n\n\t\tvar checkElements = function() {\n\t\t\tvar eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal,\n\t\t\t\tbeforeExpandVal, defaultExpand, preloadExpand, hFac;\n\t\t\tvar lazyloadElems = lazysizes.elements;\n\n\t\t\tif((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){\n\n\t\t\t\ti = 0;\n\n\t\t\t\tlowRuns++;\n\n\t\t\t\tfor(; i < eLlen; i++){\n\n\t\t\t\t\tif(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}\n\n\t\t\t\t\tif(!supportScroll || (lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i]))){unveilElement(lazyloadElems[i]);continue;}\n\n\t\t\t\t\tif(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){\n\t\t\t\t\t\telemExpand = currentExpand;\n\t\t\t\t\t}\n\n\t\t\t\t\tif (!defaultExpand) {\n\t\t\t\t\t\tdefaultExpand = (!lazySizesCfg.expand || lazySizesCfg.expand < 1) ?\n\t\t\t\t\t\t\tdocElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 :\n\t\t\t\t\t\t\tlazySizesCfg.expand;\n\n\t\t\t\t\t\tlazysizes._defEx = defaultExpand;\n\n\t\t\t\t\t\tpreloadExpand = defaultExpand * lazySizesCfg.expFactor;\n\t\t\t\t\t\thFac = lazySizesCfg.hFac;\n\t\t\t\t\t\tisBodyHidden = null;\n\n\t\t\t\t\t\tif(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden){\n\t\t\t\t\t\t\tcurrentExpand = preloadExpand;\n\t\t\t\t\t\t\tlowRuns = 0;\n\t\t\t\t\t\t} else if(loadMode > 1 && lowRuns > 1 && isLoading < 6){\n\t\t\t\t\t\t\tcurrentExpand = defaultExpand;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tcurrentExpand = shrinkExpand;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\tif(beforeExpandVal !== elemExpand){\n\t\t\t\t\t\teLvW = innerWidth + (elemExpand * hFac);\n\t\t\t\t\t\telvH = innerHeight + elemExpand;\n\t\t\t\t\t\telemNegativeExpand = elemExpand * -1;\n\t\t\t\t\t\tbeforeExpandVal = elemExpand;\n\t\t\t\t\t}\n\n\t\t\t\t\trect = lazyloadElems[i].getBoundingClientRect();\n\n\t\t\t\t\tif ((eLbottom = rect.bottom) >= elemNegativeExpand &&\n\t\t\t\t\t\t(eLtop = rect.top) <= elvH &&\n\t\t\t\t\t\t(eLright = rect.right) >= elemNegativeExpand * hFac &&\n\t\t\t\t\t\t(eLleft = rect.left) <= eLvW &&\n\t\t\t\t\t\t(eLbottom || eLright || eLleft || eLtop) &&\n\t\t\t\t\t\t(lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) &&\n\t\t\t\t\t\t((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){\n\t\t\t\t\t\tunveilElement(lazyloadElems[i]);\n\t\t\t\t\t\tloadedSomething = true;\n\t\t\t\t\t\tif(isLoading > 9){break;}\n\t\t\t\t\t} else if(!loadedSomething && isCompleted && !autoLoadElem &&\n\t\t\t\t\t\tisLoading < 4 && lowRuns < 4 && loadMode > 2 &&\n\t\t\t\t\t\t(preloadElems[0] || lazySizesCfg.preloadAfterLoad) &&\n\t\t\t\t\t\t(preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != 'auto')))){\n\t\t\t\t\t\tautoLoadElem = preloadElems[0] || lazyloadElems[i];\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tif(autoLoadElem && !loadedSomething){\n\t\t\t\t\tunveilElement(autoLoadElem);\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\tvar throttledCheckElements = throttle(checkElements);\n\n\t\tvar switchLoadingClass = function(e){\n\t\t\tvar elem = e.target;\n\n\t\t\tif (elem._lazyCache) {\n\t\t\t\tdelete elem._lazyCache;\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tresetPreloading(e);\n\t\t\taddClass(elem, lazySizesCfg.loadedClass);\n\t\t\tremoveClass(elem, lazySizesCfg.loadingClass);\n\t\t\taddRemoveLoadEvents(elem, rafSwitchLoadingClass);\n\t\t\ttriggerEvent(elem, 'lazyloaded');\n\t\t};\n\t\tvar rafedSwitchLoadingClass = rAFIt(switchLoadingClass);\n\t\tvar rafSwitchLoadingClass = function(e){\n\t\t\trafedSwitchLoadingClass({target: e.target});\n\t\t};\n\n\t\tvar changeIframeSrc = function(elem, src){\n\t\t\ttry {\n\t\t\t\telem.contentWindow.location.replace(src);\n\t\t\t} catch(e){\n\t\t\t\telem.src = src;\n\t\t\t}\n\t\t};\n\n\t\tvar handleSources = function(source){\n\t\t\tvar customMedia;\n\n\t\t\tvar sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);\n\n\t\t\tif( (customMedia = lazySizesCfg.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){\n\t\t\t\tsource.setAttribute('media', customMedia);\n\t\t\t}\n\n\t\t\tif(sourceSrcset){\n\t\t\t\tsource.setAttribute('srcset', sourceSrcset);\n\t\t\t}\n\t\t};\n\n\t\tvar lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg){\n\t\t\tvar src, srcset, parent, isPicture, event, firesLoad;\n\n\t\t\tif(!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented){\n\n\t\t\t\tif(sizes){\n\t\t\t\t\tif(isAuto){\n\t\t\t\t\t\taddClass(elem, lazySizesCfg.autosizesClass);\n\t\t\t\t\t} else {\n\t\t\t\t\t\telem.setAttribute('sizes', sizes);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tsrcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);\n\t\t\t\tsrc = elem[_getAttribute](lazySizesCfg.srcAttr);\n\n\t\t\t\tif(isImg) {\n\t\t\t\t\tparent = elem.parentNode;\n\t\t\t\t\tisPicture = parent && regPicture.test(parent.nodeName || '');\n\t\t\t\t}\n\n\t\t\t\tfiresLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));\n\n\t\t\t\tevent = {target: elem};\n\n\t\t\t\taddClass(elem, lazySizesCfg.loadingClass);\n\n\t\t\t\tif(firesLoad){\n\t\t\t\t\tclearTimeout(resetPreloadingTimer);\n\t\t\t\t\tresetPreloadingTimer = setTimeout(resetPreloading, 2500);\n\t\t\t\t\taddRemoveLoadEvents(elem, rafSwitchLoadingClass, true);\n\t\t\t\t}\n\n\t\t\t\tif(isPicture){\n\t\t\t\t\tforEach.call(parent.getElementsByTagName('source'), handleSources);\n\t\t\t\t}\n\n\t\t\t\tif(srcset){\n\t\t\t\t\telem.setAttribute('srcset', srcset);\n\t\t\t\t} else if(src && !isPicture){\n\t\t\t\t\tif(regIframe.test(elem.nodeName)){\n\t\t\t\t\t\tchangeIframeSrc(elem, src);\n\t\t\t\t\t} else {\n\t\t\t\t\t\telem.src = src;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tif(isImg && (srcset || isPicture)){\n\t\t\t\t\tupdatePolyfill(elem, {src: src});\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif(elem._lazyRace){\n\t\t\t\tdelete elem._lazyRace;\n\t\t\t}\n\t\t\tremoveClass(elem, lazySizesCfg.lazyClass);\n\n\t\t\trAF(function(){\n\t\t\t\t// Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)\n\t\t\t\tvar isLoaded = elem.complete && elem.naturalWidth > 1;\n\n\t\t\t\tif( !firesLoad || isLoaded){\n\t\t\t\t\tif (isLoaded) {\n\t\t\t\t\t\taddClass(elem, 'ls-is-cached');\n\t\t\t\t\t}\n\t\t\t\t\tswitchLoadingClass(event);\n\t\t\t\t\telem._lazyCache = true;\n\t\t\t\t\tsetTimeout(function(){\n\t\t\t\t\t\tif ('_lazyCache' in elem) {\n\t\t\t\t\t\t\tdelete elem._lazyCache;\n\t\t\t\t\t\t}\n\t\t\t\t\t}, 9);\n\t\t\t\t}\n\t\t\t\tif (elem.loading == 'lazy') {\n\t\t\t\t\tisLoading--;\n\t\t\t\t}\n\t\t\t}, true);\n\t\t});\n\n\t\tvar unveilElement = function (elem){\n\t\t\tif (elem._lazyRace) {return;}\n\t\t\tvar detail;\n\n\t\t\tvar isImg = regImg.test(elem.nodeName);\n\n\t\t\t//allow using sizes=\"auto\", but don't use. it's invalid. Use data-sizes=\"auto\" or a valid value for sizes instead (i.e.: sizes=\"80vw\")\n\t\t\tvar sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]('sizes'));\n\t\t\tvar isAuto = sizes == 'auto';\n\n\t\t\tif( (isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)){return;}\n\n\t\t\tdetail = triggerEvent(elem, 'lazyunveilread').detail;\n\n\t\t\tif(isAuto){\n\t\t\t\t autoSizer.updateElem(elem, true, elem.offsetWidth);\n\t\t\t}\n\n\t\t\telem._lazyRace = true;\n\t\t\tisLoading++;\n\n\t\t\tlazyUnveil(elem, detail, isAuto, sizes, isImg);\n\t\t};\n\n\t\tvar afterScroll = debounce(function(){\n\t\t\tlazySizesCfg.loadMode = 3;\n\t\t\tthrottledCheckElements();\n\t\t});\n\n\t\tvar altLoadmodeScrollListner = function(){\n\t\t\tif(lazySizesCfg.loadMode == 3){\n\t\t\t\tlazySizesCfg.loadMode = 2;\n\t\t\t}\n\t\t\tafterScroll();\n\t\t};\n\n\t\tvar onload = function(){\n\t\t\tif(isCompleted){return;}\n\t\t\tif(Date.now() - started < 999){\n\t\t\t\tsetTimeout(onload, 999);\n\t\t\t\treturn;\n\t\t\t}\n\n\n\t\t\tisCompleted = true;\n\n\t\t\tlazySizesCfg.loadMode = 3;\n\n\t\t\tthrottledCheckElements();\n\n\t\t\taddEventListener('scroll', altLoadmodeScrollListner, true);\n\t\t};\n\n\t\treturn {\n\t\t\t_: function(){\n\t\t\t\tstarted = Date.now();\n\n\t\t\t\tlazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);\n\t\t\t\tpreloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + ' ' + lazySizesCfg.preloadClass);\n\n\t\t\t\taddEventListener('scroll', throttledCheckElements, true);\n\n\t\t\t\taddEventListener('resize', throttledCheckElements, true);\n\n\t\t\t\tif(window.MutationObserver){\n\t\t\t\t\tnew MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );\n\t\t\t\t} else {\n\t\t\t\t\tdocElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);\n\t\t\t\t\tdocElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);\n\t\t\t\t\tsetInterval(throttledCheckElements, 999);\n\t\t\t\t}\n\n\t\t\t\taddEventListener('hashchange', throttledCheckElements, true);\n\n\t\t\t\t//, 'fullscreenchange'\n\t\t\t\t['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend'].forEach(function(name){\n\t\t\t\t\tdocument[_addEventListener](name, throttledCheckElements, true);\n\t\t\t\t});\n\n\t\t\t\tif((/d$|^c/.test(document.readyState))){\n\t\t\t\t\tonload();\n\t\t\t\t} else {\n\t\t\t\t\taddEventListener('load', onload);\n\t\t\t\t\tdocument[_addEventListener]('DOMContentLoaded', throttledCheckElements);\n\t\t\t\t\tsetTimeout(onload, 20000);\n\t\t\t\t}\n\n\t\t\t\tif(lazysizes.elements.length){\n\t\t\t\t\tcheckElements();\n\t\t\t\t\trAF._lsFlush();\n\t\t\t\t} else {\n\t\t\t\t\tthrottledCheckElements();\n\t\t\t\t}\n\t\t\t},\n\t\t\tcheckElems: throttledCheckElements,\n\t\t\tunveil: unveilElement,\n\t\t\t_aLSL: altLoadmodeScrollListner,\n\t\t};\n\t})();\n\n\n\tvar autoSizer = (function(){\n\t\tvar autosizesElems;\n\n\t\tvar sizeElement = rAFIt(function(elem, parent, event, width){\n\t\t\tvar sources, i, len;\n\t\t\telem._lazysizesWidth = width;\n\t\t\twidth += 'px';\n\n\t\t\telem.setAttribute('sizes', width);\n\n\t\t\tif(regPicture.test(parent.nodeName || '')){\n\t\t\t\tsources = parent.getElementsByTagName('source');\n\t\t\t\tfor(i = 0, len = sources.length; i < len; i++){\n\t\t\t\t\tsources[i].setAttribute('sizes', width);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif(!event.detail.dataAttr){\n\t\t\t\tupdatePolyfill(elem, event.detail);\n\t\t\t}\n\t\t});\n\t\tvar getSizeElement = function (elem, dataAttr, width){\n\t\t\tvar event;\n\t\t\tvar parent = elem.parentNode;\n\n\t\t\tif(parent){\n\t\t\t\twidth = getWidth(elem, parent, width);\n\t\t\t\tevent = triggerEvent(elem, 'lazybeforesizes', {width: width, dataAttr: !!dataAttr});\n\n\t\t\t\tif(!event.defaultPrevented){\n\t\t\t\t\twidth = event.detail.width;\n\n\t\t\t\t\tif(width && width !== elem._lazysizesWidth){\n\t\t\t\t\t\tsizeElement(elem, parent, event, width);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\tvar updateElementsSizes = function(){\n\t\t\tvar i;\n\t\t\tvar len = autosizesElems.length;\n\t\t\tif(len){\n\t\t\t\ti = 0;\n\n\t\t\t\tfor(; i < len; i++){\n\t\t\t\t\tgetSizeElement(autosizesElems[i]);\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\tvar debouncedUpdateElementsSizes = debounce(updateElementsSizes);\n\n\t\treturn {\n\t\t\t_: function(){\n\t\t\t\tautosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);\n\t\t\t\taddEventListener('resize', debouncedUpdateElementsSizes);\n\t\t\t},\n\t\t\tcheckElems: debouncedUpdateElementsSizes,\n\t\t\tupdateElem: getSizeElement\n\t\t};\n\t})();\n\n\tvar init = function(){\n\t\tif(!init.i && document.getElementsByClassName){\n\t\t\tinit.i = true;\n\t\t\tautoSizer._();\n\t\t\tloader._();\n\t\t}\n\t};\n\n\tsetTimeout(function(){\n\t\tif(lazySizesCfg.init){\n\t\t\tinit();\n\t\t}\n\t});\n\n\tlazysizes = {\n\t\tcfg: lazySizesCfg,\n\t\tautoSizer: autoSizer,\n\t\tloader: loader,\n\t\tinit: init,\n\t\tuP: updatePolyfill,\n\t\taC: addClass,\n\t\trC: removeClass,\n\t\thC: hasClass,\n\t\tfire: triggerEvent,\n\t\tgW: getWidth,\n\t\trAF: rAF,\n\t};\n\n\treturn lazysizes;\n}\n));\n\n\n//# sourceURL=webpack:///./node_modules/lazysizes/lazysizes.js?");

/***/ }),

/***/ "./node_modules/picturefill/dist/picturefill.js":
/*!******************************************************!*\
  !*** ./node_modules/picturefill/dist/picturefill.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/*! picturefill - v3.0.2 - 2016-02-12\n * https://scottjehl.github.io/picturefill/\n * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT\n */\n/*! Gecko-Picture - v1.0\n * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture\n * Firefox's early picture implementation (prior to FF41) is static and does\n * not react to viewport changes. This tiny module fixes this.\n */\n(function(window) {\n\t/*jshint eqnull:true */\n\tvar ua = navigator.userAgent;\n\n\tif ( window.HTMLPictureElement && ((/ecko/).test(ua) && ua.match(/rv\\:(\\d+)/) && RegExp.$1 < 45) ) {\n\t\taddEventListener(\"resize\", (function() {\n\t\t\tvar timer;\n\n\t\t\tvar dummySrc = document.createElement(\"source\");\n\n\t\t\tvar fixRespimg = function(img) {\n\t\t\t\tvar source, sizes;\n\t\t\t\tvar picture = img.parentNode;\n\n\t\t\t\tif (picture.nodeName.toUpperCase() === \"PICTURE\") {\n\t\t\t\t\tsource = dummySrc.cloneNode();\n\n\t\t\t\t\tpicture.insertBefore(source, picture.firstElementChild);\n\t\t\t\t\tsetTimeout(function() {\n\t\t\t\t\t\tpicture.removeChild(source);\n\t\t\t\t\t});\n\t\t\t\t} else if (!img._pfLastSize || img.offsetWidth > img._pfLastSize) {\n\t\t\t\t\timg._pfLastSize = img.offsetWidth;\n\t\t\t\t\tsizes = img.sizes;\n\t\t\t\t\timg.sizes += \",100vw\";\n\t\t\t\t\tsetTimeout(function() {\n\t\t\t\t\t\timg.sizes = sizes;\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tvar findPictureImgs = function() {\n\t\t\t\tvar i;\n\t\t\t\tvar imgs = document.querySelectorAll(\"picture > img, img[srcset][sizes]\");\n\t\t\t\tfor (i = 0; i < imgs.length; i++) {\n\t\t\t\t\tfixRespimg(imgs[i]);\n\t\t\t\t}\n\t\t\t};\n\t\t\tvar onResize = function() {\n\t\t\t\tclearTimeout(timer);\n\t\t\t\ttimer = setTimeout(findPictureImgs, 99);\n\t\t\t};\n\t\t\tvar mq = window.matchMedia && matchMedia(\"(orientation: landscape)\");\n\t\t\tvar init = function() {\n\t\t\t\tonResize();\n\n\t\t\t\tif (mq && mq.addListener) {\n\t\t\t\t\tmq.addListener(onResize);\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tdummySrc.srcset = \"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\";\n\n\t\t\tif (/^[c|i]|d$/.test(document.readyState || \"\")) {\n\t\t\t\tinit();\n\t\t\t} else {\n\t\t\t\tdocument.addEventListener(\"DOMContentLoaded\", init);\n\t\t\t}\n\n\t\t\treturn onResize;\n\t\t})());\n\t}\n})(window);\n\n/*! Picturefill - v3.0.2\n * http://scottjehl.github.io/picturefill\n * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;\n *  License: MIT\n */\n\n(function( window, document, undefined ) {\n\t// Enable strict mode\n\t\"use strict\";\n\n\t// HTML shim|v it for old IE (IE9 will still need the HTML video tag workaround)\n\tdocument.createElement( \"picture\" );\n\n\tvar warn, eminpx, alwaysCheckWDescriptor, evalId;\n\t// local object for method references and testing exposure\n\tvar pf = {};\n\tvar isSupportTestReady = false;\n\tvar noop = function() {};\n\tvar image = document.createElement( \"img\" );\n\tvar getImgAttr = image.getAttribute;\n\tvar setImgAttr = image.setAttribute;\n\tvar removeImgAttr = image.removeAttribute;\n\tvar docElem = document.documentElement;\n\tvar types = {};\n\tvar cfg = {\n\t\t//resource selection:\n\t\talgorithm: \"\"\n\t};\n\tvar srcAttr = \"data-pfsrc\";\n\tvar srcsetAttr = srcAttr + \"set\";\n\t// ua sniffing is done for undetectable img loading features,\n\t// to do some non crucial perf optimizations\n\tvar ua = navigator.userAgent;\n\tvar supportAbort = (/rident/).test(ua) || ((/ecko/).test(ua) && ua.match(/rv\\:(\\d+)/) && RegExp.$1 > 35 );\n\tvar curSrcProp = \"currentSrc\";\n\tvar regWDesc = /\\s+\\+?\\d+(e\\d+)?w/;\n\tvar regSize = /(\\([^)]+\\))?\\s*(.+)/;\n\tvar setOptions = window.picturefillCFG;\n\t/**\n\t * Shortcut property for https://w3c.github.io/webappsec/specs/mixedcontent/#restricts-mixed-content ( for easy overriding in tests )\n\t */\n\t// baseStyle also used by getEmValue (i.e.: width: 1em is important)\n\tvar baseStyle = \"position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)\";\n\tvar fsCss = \"font-size:100%!important;\";\n\tvar isVwDirty = true;\n\n\tvar cssCache = {};\n\tvar sizeLengthCache = {};\n\tvar DPR = window.devicePixelRatio;\n\tvar units = {\n\t\tpx: 1,\n\t\t\"in\": 96\n\t};\n\tvar anchor = document.createElement( \"a\" );\n\t/**\n\t * alreadyRun flag used for setOptions. is it true setOptions will reevaluate\n\t * @type {boolean}\n\t */\n\tvar alreadyRun = false;\n\n\t// Reusable, non-\"g\" Regexes\n\n\t// (Don't use \\s, to avoid matching non-breaking space.)\n\tvar regexLeadingSpaces = /^[ \\t\\n\\r\\u000c]+/,\n\t    regexLeadingCommasOrSpaces = /^[, \\t\\n\\r\\u000c]+/,\n\t    regexLeadingNotSpaces = /^[^ \\t\\n\\r\\u000c]+/,\n\t    regexTrailingCommas = /[,]+$/,\n\t    regexNonNegativeInteger = /^\\d+$/,\n\n\t    // ( Positive or negative or unsigned integers or decimals, without or without exponents.\n\t    // Must include at least one digit.\n\t    // According to spec tests any decimal point must be followed by a digit.\n\t    // No leading plus sign is allowed.)\n\t    // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-floating-point-number\n\t    regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;\n\n\tvar on = function(obj, evt, fn, capture) {\n\t\tif ( obj.addEventListener ) {\n\t\t\tobj.addEventListener(evt, fn, capture || false);\n\t\t} else if ( obj.attachEvent ) {\n\t\t\tobj.attachEvent( \"on\" + evt, fn);\n\t\t}\n\t};\n\n\t/**\n\t * simple memoize function:\n\t */\n\n\tvar memoize = function(fn) {\n\t\tvar cache = {};\n\t\treturn function(input) {\n\t\t\tif ( !(input in cache) ) {\n\t\t\t\tcache[ input ] = fn(input);\n\t\t\t}\n\t\t\treturn cache[ input ];\n\t\t};\n\t};\n\n\t// UTILITY FUNCTIONS\n\n\t// Manual is faster than RegEx\n\t// http://jsperf.com/whitespace-character/5\n\tfunction isSpace(c) {\n\t\treturn (c === \"\\u0020\" || // space\n\t\t        c === \"\\u0009\" || // horizontal tab\n\t\t        c === \"\\u000A\" || // new line\n\t\t        c === \"\\u000C\" || // form feed\n\t\t        c === \"\\u000D\");  // carriage return\n\t}\n\n\t/**\n\t * gets a mediaquery and returns a boolean or gets a css length and returns a number\n\t * @param css mediaqueries or css length\n\t * @returns {boolean|number}\n\t *\n\t * based on: https://gist.github.com/jonathantneal/db4f77009b155f083738\n\t */\n\tvar evalCSS = (function() {\n\n\t\tvar regLength = /^([\\d\\.]+)(em|vw|px)$/;\n\t\tvar replace = function() {\n\t\t\tvar args = arguments, index = 0, string = args[0];\n\t\t\twhile (++index in args) {\n\t\t\t\tstring = string.replace(args[index], args[++index]);\n\t\t\t}\n\t\t\treturn string;\n\t\t};\n\n\t\tvar buildStr = memoize(function(css) {\n\n\t\t\treturn \"return \" + replace((css || \"\").toLowerCase(),\n\t\t\t\t// interpret `and`\n\t\t\t\t/\\band\\b/g, \"&&\",\n\n\t\t\t\t// interpret `,`\n\t\t\t\t/,/g, \"||\",\n\n\t\t\t\t// interpret `min-` as >=\n\t\t\t\t/min-([a-z-\\s]+):/g, \"e.$1>=\",\n\n\t\t\t\t// interpret `max-` as <=\n\t\t\t\t/max-([a-z-\\s]+):/g, \"e.$1<=\",\n\n\t\t\t\t//calc value\n\t\t\t\t/calc([^)]+)/g, \"($1)\",\n\n\t\t\t\t// interpret css values\n\t\t\t\t/(\\d+[\\.]*[\\d]*)([a-z]+)/g, \"($1 * e.$2)\",\n\t\t\t\t//make eval less evil\n\t\t\t\t/^(?!(e.[a-z]|[0-9\\.&=|><\\+\\-\\*\\(\\)\\/])).*/ig, \"\"\n\t\t\t) + \";\";\n\t\t});\n\n\t\treturn function(css, length) {\n\t\t\tvar parsedLength;\n\t\t\tif (!(css in cssCache)) {\n\t\t\t\tcssCache[css] = false;\n\t\t\t\tif (length && (parsedLength = css.match( regLength ))) {\n\t\t\t\t\tcssCache[css] = parsedLength[ 1 ] * units[parsedLength[ 2 ]];\n\t\t\t\t} else {\n\t\t\t\t\t/*jshint evil:true */\n\t\t\t\t\ttry{\n\t\t\t\t\t\tcssCache[css] = new Function(\"e\", buildStr(css))(units);\n\t\t\t\t\t} catch(e) {}\n\t\t\t\t\t/*jshint evil:false */\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn cssCache[css];\n\t\t};\n\t})();\n\n\tvar setResolution = function( candidate, sizesattr ) {\n\t\tif ( candidate.w ) { // h = means height: || descriptor.type === 'h' do not handle yet...\n\t\t\tcandidate.cWidth = pf.calcListLength( sizesattr || \"100vw\" );\n\t\t\tcandidate.res = candidate.w / candidate.cWidth ;\n\t\t} else {\n\t\t\tcandidate.res = candidate.d;\n\t\t}\n\t\treturn candidate;\n\t};\n\n\t/**\n\t *\n\t * @param opt\n\t */\n\tvar picturefill = function( opt ) {\n\n\t\tif (!isSupportTestReady) {return;}\n\n\t\tvar elements, i, plen;\n\n\t\tvar options = opt || {};\n\n\t\tif ( options.elements && options.elements.nodeType === 1 ) {\n\t\t\tif ( options.elements.nodeName.toUpperCase() === \"IMG\" ) {\n\t\t\t\toptions.elements =  [ options.elements ];\n\t\t\t} else {\n\t\t\t\toptions.context = options.elements;\n\t\t\t\toptions.elements =  null;\n\t\t\t}\n\t\t}\n\n\t\telements = options.elements || pf.qsa( (options.context || document), ( options.reevaluate || options.reselect ) ? pf.sel : pf.selShort );\n\n\t\tif ( (plen = elements.length) ) {\n\n\t\t\tpf.setupRun( options );\n\t\t\talreadyRun = true;\n\n\t\t\t// Loop through all elements\n\t\t\tfor ( i = 0; i < plen; i++ ) {\n\t\t\t\tpf.fillImg(elements[ i ], options);\n\t\t\t}\n\n\t\t\tpf.teardownRun( options );\n\t\t}\n\t};\n\n\t/**\n\t * outputs a warning for the developer\n\t * @param {message}\n\t * @type {Function}\n\t */\n\twarn = ( window.console && console.warn ) ?\n\t\tfunction( message ) {\n\t\t\tconsole.warn( message );\n\t\t} :\n\t\tnoop\n\t;\n\n\tif ( !(curSrcProp in image) ) {\n\t\tcurSrcProp = \"src\";\n\t}\n\n\t// Add support for standard mime types.\n\ttypes[ \"image/jpeg\" ] = true;\n\ttypes[ \"image/gif\" ] = true;\n\ttypes[ \"image/png\" ] = true;\n\n\tfunction detectTypeSupport( type, typeUri ) {\n\t\t// based on Modernizr's lossless img-webp test\n\t\t// note: asynchronous\n\t\tvar image = new window.Image();\n\t\timage.onerror = function() {\n\t\t\ttypes[ type ] = false;\n\t\t\tpicturefill();\n\t\t};\n\t\timage.onload = function() {\n\t\t\ttypes[ type ] = image.width === 1;\n\t\t\tpicturefill();\n\t\t};\n\t\timage.src = typeUri;\n\t\treturn \"pending\";\n\t}\n\n\t// test svg support\n\ttypes[ \"image/svg+xml\" ] = document.implementation.hasFeature( \"http://www.w3.org/TR/SVG11/feature#Image\", \"1.1\" );\n\n\t/**\n\t * updates the internal vW property with the current viewport width in px\n\t */\n\tfunction updateMetrics() {\n\n\t\tisVwDirty = false;\n\t\tDPR = window.devicePixelRatio;\n\t\tcssCache = {};\n\t\tsizeLengthCache = {};\n\n\t\tpf.DPR = DPR || 1;\n\n\t\tunits.width = Math.max(window.innerWidth || 0, docElem.clientWidth);\n\t\tunits.height = Math.max(window.innerHeight || 0, docElem.clientHeight);\n\n\t\tunits.vw = units.width / 100;\n\t\tunits.vh = units.height / 100;\n\n\t\tevalId = [ units.height, units.width, DPR ].join(\"-\");\n\n\t\tunits.em = pf.getEmValue();\n\t\tunits.rem = units.em;\n\t}\n\n\tfunction chooseLowRes( lowerValue, higherValue, dprValue, isCached ) {\n\t\tvar bonusFactor, tooMuch, bonus, meanDensity;\n\n\t\t//experimental\n\t\tif (cfg.algorithm === \"saveData\" ){\n\t\t\tif ( lowerValue > 2.7 ) {\n\t\t\t\tmeanDensity = dprValue + 1;\n\t\t\t} else {\n\t\t\t\ttooMuch = higherValue - dprValue;\n\t\t\t\tbonusFactor = Math.pow(lowerValue - 0.6, 1.5);\n\n\t\t\t\tbonus = tooMuch * bonusFactor;\n\n\t\t\t\tif (isCached) {\n\t\t\t\t\tbonus += 0.1 * bonusFactor;\n\t\t\t\t}\n\n\t\t\t\tmeanDensity = lowerValue + bonus;\n\t\t\t}\n\t\t} else {\n\t\t\tmeanDensity = (dprValue > 1) ?\n\t\t\t\tMath.sqrt(lowerValue * higherValue) :\n\t\t\t\tlowerValue;\n\t\t}\n\n\t\treturn meanDensity > dprValue;\n\t}\n\n\tfunction applyBestCandidate( img ) {\n\t\tvar srcSetCandidates;\n\t\tvar matchingSet = pf.getSet( img );\n\t\tvar evaluated = false;\n\t\tif ( matchingSet !== \"pending\" ) {\n\t\t\tevaluated = evalId;\n\t\t\tif ( matchingSet ) {\n\t\t\t\tsrcSetCandidates = pf.setRes( matchingSet );\n\t\t\t\tpf.applySetCandidate( srcSetCandidates, img );\n\t\t\t}\n\t\t}\n\t\timg[ pf.ns ].evaled = evaluated;\n\t}\n\n\tfunction ascendingSort( a, b ) {\n\t\treturn a.res - b.res;\n\t}\n\n\tfunction setSrcToCur( img, src, set ) {\n\t\tvar candidate;\n\t\tif ( !set && src ) {\n\t\t\tset = img[ pf.ns ].sets;\n\t\t\tset = set && set[set.length - 1];\n\t\t}\n\n\t\tcandidate = getCandidateForSrc(src, set);\n\n\t\tif ( candidate ) {\n\t\t\tsrc = pf.makeUrl(src);\n\t\t\timg[ pf.ns ].curSrc = src;\n\t\t\timg[ pf.ns ].curCan = candidate;\n\n\t\t\tif ( !candidate.res ) {\n\t\t\t\tsetResolution( candidate, candidate.set.sizes );\n\t\t\t}\n\t\t}\n\t\treturn candidate;\n\t}\n\n\tfunction getCandidateForSrc( src, set ) {\n\t\tvar i, candidate, candidates;\n\t\tif ( src && set ) {\n\t\t\tcandidates = pf.parseSet( set );\n\t\t\tsrc = pf.makeUrl(src);\n\t\t\tfor ( i = 0; i < candidates.length; i++ ) {\n\t\t\t\tif ( src === pf.makeUrl(candidates[ i ].url) ) {\n\t\t\t\t\tcandidate = candidates[ i ];\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn candidate;\n\t}\n\n\tfunction getAllSourceElements( picture, candidates ) {\n\t\tvar i, len, source, srcset;\n\n\t\t// SPEC mismatch intended for size and perf:\n\t\t// actually only source elements preceding the img should be used\n\t\t// also note: don't use qsa here, because IE8 sometimes doesn't like source as the key part in a selector\n\t\tvar sources = picture.getElementsByTagName( \"source\" );\n\n\t\tfor ( i = 0, len = sources.length; i < len; i++ ) {\n\t\t\tsource = sources[ i ];\n\t\t\tsource[ pf.ns ] = true;\n\t\t\tsrcset = source.getAttribute( \"srcset\" );\n\n\t\t\t// if source does not have a srcset attribute, skip\n\t\t\tif ( srcset ) {\n\t\t\t\tcandidates.push( {\n\t\t\t\t\tsrcset: srcset,\n\t\t\t\t\tmedia: source.getAttribute( \"media\" ),\n\t\t\t\t\ttype: source.getAttribute( \"type\" ),\n\t\t\t\t\tsizes: source.getAttribute( \"sizes\" )\n\t\t\t\t} );\n\t\t\t}\n\t\t}\n\t}\n\n\t/**\n\t * Srcset Parser\n\t * By Alex Bell |  MIT License\n\t *\n\t * @returns Array [{url: _, d: _, w: _, h:_, set:_(????)}, ...]\n\t *\n\t * Based super duper closely on the reference algorithm at:\n\t * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-srcset-attribute\n\t */\n\n\t// 1. Let input be the value passed to this algorithm.\n\t// (TO-DO : Explain what \"set\" argument is here. Maybe choose a more\n\t// descriptive & more searchable name.  Since passing the \"set\" in really has\n\t// nothing to do with parsing proper, I would prefer this assignment eventually\n\t// go in an external fn.)\n\tfunction parseSrcset(input, set) {\n\n\t\tfunction collectCharacters(regEx) {\n\t\t\tvar chars,\n\t\t\t    match = regEx.exec(input.substring(pos));\n\t\t\tif (match) {\n\t\t\t\tchars = match[ 0 ];\n\t\t\t\tpos += chars.length;\n\t\t\t\treturn chars;\n\t\t\t}\n\t\t}\n\n\t\tvar inputLength = input.length,\n\t\t    url,\n\t\t    descriptors,\n\t\t    currentDescriptor,\n\t\t    state,\n\t\t    c,\n\n\t\t    // 2. Let position be a pointer into input, initially pointing at the start\n\t\t    //    of the string.\n\t\t    pos = 0,\n\n\t\t    // 3. Let candidates be an initially empty source set.\n\t\t    candidates = [];\n\n\t\t/**\n\t\t* Adds descriptor properties to a candidate, pushes to the candidates array\n\t\t* @return undefined\n\t\t*/\n\t\t// (Declared outside of the while loop so that it's only created once.\n\t\t// (This fn is defined before it is used, in order to pass JSHINT.\n\t\t// Unfortunately this breaks the sequencing of the spec comments. :/ )\n\t\tfunction parseDescriptors() {\n\n\t\t\t// 9. Descriptor parser: Let error be no.\n\t\t\tvar pError = false,\n\n\t\t\t// 10. Let width be absent.\n\t\t\t// 11. Let density be absent.\n\t\t\t// 12. Let future-compat-h be absent. (We're implementing it now as h)\n\t\t\t    w, d, h, i,\n\t\t\t    candidate = {},\n\t\t\t    desc, lastChar, value, intVal, floatVal;\n\n\t\t\t// 13. For each descriptor in descriptors, run the appropriate set of steps\n\t\t\t// from the following list:\n\t\t\tfor (i = 0 ; i < descriptors.length; i++) {\n\t\t\t\tdesc = descriptors[ i ];\n\n\t\t\t\tlastChar = desc[ desc.length - 1 ];\n\t\t\t\tvalue = desc.substring(0, desc.length - 1);\n\t\t\t\tintVal = parseInt(value, 10);\n\t\t\t\tfloatVal = parseFloat(value);\n\n\t\t\t\t// If the descriptor consists of a valid non-negative integer followed by\n\t\t\t\t// a U+0077 LATIN SMALL LETTER W character\n\t\t\t\tif (regexNonNegativeInteger.test(value) && (lastChar === \"w\")) {\n\n\t\t\t\t\t// If width and density are not both absent, then let error be yes.\n\t\t\t\t\tif (w || d) {pError = true;}\n\n\t\t\t\t\t// Apply the rules for parsing non-negative integers to the descriptor.\n\t\t\t\t\t// If the result is zero, let error be yes.\n\t\t\t\t\t// Otherwise, let width be the result.\n\t\t\t\t\tif (intVal === 0) {pError = true;} else {w = intVal;}\n\n\t\t\t\t// If the descriptor consists of a valid floating-point number followed by\n\t\t\t\t// a U+0078 LATIN SMALL LETTER X character\n\t\t\t\t} else if (regexFloatingPoint.test(value) && (lastChar === \"x\")) {\n\n\t\t\t\t\t// If width, density and future-compat-h are not all absent, then let error\n\t\t\t\t\t// be yes.\n\t\t\t\t\tif (w || d || h) {pError = true;}\n\n\t\t\t\t\t// Apply the rules for parsing floating-point number values to the descriptor.\n\t\t\t\t\t// If the result is less than zero, let error be yes. Otherwise, let density\n\t\t\t\t\t// be the result.\n\t\t\t\t\tif (floatVal < 0) {pError = true;} else {d = floatVal;}\n\n\t\t\t\t// If the descriptor consists of a valid non-negative integer followed by\n\t\t\t\t// a U+0068 LATIN SMALL LETTER H character\n\t\t\t\t} else if (regexNonNegativeInteger.test(value) && (lastChar === \"h\")) {\n\n\t\t\t\t\t// If height and density are not both absent, then let error be yes.\n\t\t\t\t\tif (h || d) {pError = true;}\n\n\t\t\t\t\t// Apply the rules for parsing non-negative integers to the descriptor.\n\t\t\t\t\t// If the result is zero, let error be yes. Otherwise, let future-compat-h\n\t\t\t\t\t// be the result.\n\t\t\t\t\tif (intVal === 0) {pError = true;} else {h = intVal;}\n\n\t\t\t\t// Anything else, Let error be yes.\n\t\t\t\t} else {pError = true;}\n\t\t\t} // (close step 13 for loop)\n\n\t\t\t// 15. If error is still no, then append a new image source to candidates whose\n\t\t\t// URL is url, associated with a width width if not absent and a pixel\n\t\t\t// density density if not absent. Otherwise, there is a parse error.\n\t\t\tif (!pError) {\n\t\t\t\tcandidate.url = url;\n\n\t\t\t\tif (w) { candidate.w = w;}\n\t\t\t\tif (d) { candidate.d = d;}\n\t\t\t\tif (h) { candidate.h = h;}\n\t\t\t\tif (!h && !d && !w) {candidate.d = 1;}\n\t\t\t\tif (candidate.d === 1) {set.has1x = true;}\n\t\t\t\tcandidate.set = set;\n\n\t\t\t\tcandidates.push(candidate);\n\t\t\t}\n\t\t} // (close parseDescriptors fn)\n\n\t\t/**\n\t\t* Tokenizes descriptor properties prior to parsing\n\t\t* Returns undefined.\n\t\t* (Again, this fn is defined before it is used, in order to pass JSHINT.\n\t\t* Unfortunately this breaks the logical sequencing of the spec comments. :/ )\n\t\t*/\n\t\tfunction tokenize() {\n\n\t\t\t// 8.1. Descriptor tokeniser: Skip whitespace\n\t\t\tcollectCharacters(regexLeadingSpaces);\n\n\t\t\t// 8.2. Let current descriptor be the empty string.\n\t\t\tcurrentDescriptor = \"\";\n\n\t\t\t// 8.3. Let state be in descriptor.\n\t\t\tstate = \"in descriptor\";\n\n\t\t\twhile (true) {\n\n\t\t\t\t// 8.4. Let c be the character at position.\n\t\t\t\tc = input.charAt(pos);\n\n\t\t\t\t//  Do the following depending on the value of state.\n\t\t\t\t//  For the purpose of this step, \"EOF\" is a special character representing\n\t\t\t\t//  that position is past the end of input.\n\n\t\t\t\t// In descriptor\n\t\t\t\tif (state === \"in descriptor\") {\n\t\t\t\t\t// Do the following, depending on the value of c:\n\n\t\t\t\t  // Space character\n\t\t\t\t  // If current descriptor is not empty, append current descriptor to\n\t\t\t\t  // descriptors and let current descriptor be the empty string.\n\t\t\t\t  // Set state to after descriptor.\n\t\t\t\t\tif (isSpace(c)) {\n\t\t\t\t\t\tif (currentDescriptor) {\n\t\t\t\t\t\t\tdescriptors.push(currentDescriptor);\n\t\t\t\t\t\t\tcurrentDescriptor = \"\";\n\t\t\t\t\t\t\tstate = \"after descriptor\";\n\t\t\t\t\t\t}\n\n\t\t\t\t\t// U+002C COMMA (,)\n\t\t\t\t\t// Advance position to the next character in input. If current descriptor\n\t\t\t\t\t// is not empty, append current descriptor to descriptors. Jump to the step\n\t\t\t\t\t// labeled descriptor parser.\n\t\t\t\t\t} else if (c === \",\") {\n\t\t\t\t\t\tpos += 1;\n\t\t\t\t\t\tif (currentDescriptor) {\n\t\t\t\t\t\t\tdescriptors.push(currentDescriptor);\n\t\t\t\t\t\t}\n\t\t\t\t\t\tparseDescriptors();\n\t\t\t\t\t\treturn;\n\n\t\t\t\t\t// U+0028 LEFT PARENTHESIS (()\n\t\t\t\t\t// Append c to current descriptor. Set state to in parens.\n\t\t\t\t\t} else if (c === \"\\u0028\") {\n\t\t\t\t\t\tcurrentDescriptor = currentDescriptor + c;\n\t\t\t\t\t\tstate = \"in parens\";\n\n\t\t\t\t\t// EOF\n\t\t\t\t\t// If current descriptor is not empty, append current descriptor to\n\t\t\t\t\t// descriptors. Jump to the step labeled descriptor parser.\n\t\t\t\t\t} else if (c === \"\") {\n\t\t\t\t\t\tif (currentDescriptor) {\n\t\t\t\t\t\t\tdescriptors.push(currentDescriptor);\n\t\t\t\t\t\t}\n\t\t\t\t\t\tparseDescriptors();\n\t\t\t\t\t\treturn;\n\n\t\t\t\t\t// Anything else\n\t\t\t\t\t// Append c to current descriptor.\n\t\t\t\t\t} else {\n\t\t\t\t\t\tcurrentDescriptor = currentDescriptor + c;\n\t\t\t\t\t}\n\t\t\t\t// (end \"in descriptor\"\n\n\t\t\t\t// In parens\n\t\t\t\t} else if (state === \"in parens\") {\n\n\t\t\t\t\t// U+0029 RIGHT PARENTHESIS ())\n\t\t\t\t\t// Append c to current descriptor. Set state to in descriptor.\n\t\t\t\t\tif (c === \")\") {\n\t\t\t\t\t\tcurrentDescriptor = currentDescriptor + c;\n\t\t\t\t\t\tstate = \"in descriptor\";\n\n\t\t\t\t\t// EOF\n\t\t\t\t\t// Append current descriptor to descriptors. Jump to the step labeled\n\t\t\t\t\t// descriptor parser.\n\t\t\t\t\t} else if (c === \"\") {\n\t\t\t\t\t\tdescriptors.push(currentDescriptor);\n\t\t\t\t\t\tparseDescriptors();\n\t\t\t\t\t\treturn;\n\n\t\t\t\t\t// Anything else\n\t\t\t\t\t// Append c to current descriptor.\n\t\t\t\t\t} else {\n\t\t\t\t\t\tcurrentDescriptor = currentDescriptor + c;\n\t\t\t\t\t}\n\n\t\t\t\t// After descriptor\n\t\t\t\t} else if (state === \"after descriptor\") {\n\n\t\t\t\t\t// Do the following, depending on the value of c:\n\t\t\t\t\t// Space character: Stay in this state.\n\t\t\t\t\tif (isSpace(c)) {\n\n\t\t\t\t\t// EOF: Jump to the step labeled descriptor parser.\n\t\t\t\t\t} else if (c === \"\") {\n\t\t\t\t\t\tparseDescriptors();\n\t\t\t\t\t\treturn;\n\n\t\t\t\t\t// Anything else\n\t\t\t\t\t// Set state to in descriptor. Set position to the previous character in input.\n\t\t\t\t\t} else {\n\t\t\t\t\t\tstate = \"in descriptor\";\n\t\t\t\t\t\tpos -= 1;\n\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Advance position to the next character in input.\n\t\t\t\tpos += 1;\n\n\t\t\t// Repeat this step.\n\t\t\t} // (close while true loop)\n\t\t}\n\n\t\t// 4. Splitting loop: Collect a sequence of characters that are space\n\t\t//    characters or U+002C COMMA characters. If any U+002C COMMA characters\n\t\t//    were collected, that is a parse error.\n\t\twhile (true) {\n\t\t\tcollectCharacters(regexLeadingCommasOrSpaces);\n\n\t\t\t// 5. If position is past the end of input, return candidates and abort these steps.\n\t\t\tif (pos >= inputLength) {\n\t\t\t\treturn candidates; // (we're done, this is the sole return path)\n\t\t\t}\n\n\t\t\t// 6. Collect a sequence of characters that are not space characters,\n\t\t\t//    and let that be url.\n\t\t\turl = collectCharacters(regexLeadingNotSpaces);\n\n\t\t\t// 7. Let descriptors be a new empty list.\n\t\t\tdescriptors = [];\n\n\t\t\t// 8. If url ends with a U+002C COMMA character (,), follow these substeps:\n\t\t\t//\t\t(1). Remove all trailing U+002C COMMA characters from url. If this removed\n\t\t\t//         more than one character, that is a parse error.\n\t\t\tif (url.slice(-1) === \",\") {\n\t\t\t\turl = url.replace(regexTrailingCommas, \"\");\n\t\t\t\t// (Jump ahead to step 9 to skip tokenization and just push the candidate).\n\t\t\t\tparseDescriptors();\n\n\t\t\t//\tOtherwise, follow these substeps:\n\t\t\t} else {\n\t\t\t\ttokenize();\n\t\t\t} // (close else of step 8)\n\n\t\t// 16. Return to the step labeled splitting loop.\n\t\t} // (Close of big while loop.)\n\t}\n\n\t/*\n\t * Sizes Parser\n\t *\n\t * By Alex Bell |  MIT License\n\t *\n\t * Non-strict but accurate and lightweight JS Parser for the string value <img sizes=\"here\">\n\t *\n\t * Reference algorithm at:\n\t * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-sizes-attribute\n\t *\n\t * Most comments are copied in directly from the spec\n\t * (except for comments in parens).\n\t *\n\t * Grammar is:\n\t * <source-size-list> = <source-size># [ , <source-size-value> ]? | <source-size-value>\n\t * <source-size> = <media-condition> <source-size-value>\n\t * <source-size-value> = <length>\n\t * http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#attr-img-sizes\n\t *\n\t * E.g. \"(max-width: 30em) 100vw, (max-width: 50em) 70vw, 100vw\"\n\t * or \"(min-width: 30em), calc(30vw - 15px)\" or just \"30vw\"\n\t *\n\t * Returns the first valid <css-length> with a media condition that evaluates to true,\n\t * or \"100vw\" if all valid media conditions evaluate to false.\n\t *\n\t */\n\n\tfunction parseSizes(strValue) {\n\n\t\t// (Percentage CSS lengths are not allowed in this case, to avoid confusion:\n\t\t// https://html.spec.whatwg.org/multipage/embedded-content.html#valid-source-size-list\n\t\t// CSS allows a single optional plus or minus sign:\n\t\t// http://www.w3.org/TR/CSS2/syndata.html#numbers\n\t\t// CSS is ASCII case-insensitive:\n\t\t// http://www.w3.org/TR/CSS2/syndata.html#characters )\n\t\t// Spec allows exponential notation for <number> type:\n\t\t// http://dev.w3.org/csswg/css-values/#numbers\n\t\tvar regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i;\n\n\t\t// (This is a quick and lenient test. Because of optional unlimited-depth internal\n\t\t// grouping parens and strict spacing rules, this could get very complicated.)\n\t\tvar regexCssCalc = /^calc\\((?:[0-9a-z \\.\\+\\-\\*\\/\\(\\)]+)\\)$/i;\n\n\t\tvar i;\n\t\tvar unparsedSizesList;\n\t\tvar unparsedSizesListLength;\n\t\tvar unparsedSize;\n\t\tvar lastComponentValue;\n\t\tvar size;\n\n\t\t// UTILITY FUNCTIONS\n\n\t\t//  (Toy CSS parser. The goals here are:\n\t\t//  1) expansive test coverage without the weight of a full CSS parser.\n\t\t//  2) Avoiding regex wherever convenient.\n\t\t//  Quick tests: http://jsfiddle.net/gtntL4gr/3/\n\t\t//  Returns an array of arrays.)\n\t\tfunction parseComponentValues(str) {\n\t\t\tvar chrctr;\n\t\t\tvar component = \"\";\n\t\t\tvar componentArray = [];\n\t\t\tvar listArray = [];\n\t\t\tvar parenDepth = 0;\n\t\t\tvar pos = 0;\n\t\t\tvar inComment = false;\n\n\t\t\tfunction pushComponent() {\n\t\t\t\tif (component) {\n\t\t\t\t\tcomponentArray.push(component);\n\t\t\t\t\tcomponent = \"\";\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfunction pushComponentArray() {\n\t\t\t\tif (componentArray[0]) {\n\t\t\t\t\tlistArray.push(componentArray);\n\t\t\t\t\tcomponentArray = [];\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// (Loop forwards from the beginning of the string.)\n\t\t\twhile (true) {\n\t\t\t\tchrctr = str.charAt(pos);\n\n\t\t\t\tif (chrctr === \"\") { // ( End of string reached.)\n\t\t\t\t\tpushComponent();\n\t\t\t\t\tpushComponentArray();\n\t\t\t\t\treturn listArray;\n\t\t\t\t} else if (inComment) {\n\t\t\t\t\tif ((chrctr === \"*\") && (str[pos + 1] === \"/\")) { // (At end of a comment.)\n\t\t\t\t\t\tinComment = false;\n\t\t\t\t\t\tpos += 2;\n\t\t\t\t\t\tpushComponent();\n\t\t\t\t\t\tcontinue;\n\t\t\t\t\t} else {\n\t\t\t\t\t\tpos += 1; // (Skip all characters inside comments.)\n\t\t\t\t\t\tcontinue;\n\t\t\t\t\t}\n\t\t\t\t} else if (isSpace(chrctr)) {\n\t\t\t\t\t// (If previous character in loop was also a space, or if\n\t\t\t\t\t// at the beginning of the string, do not add space char to\n\t\t\t\t\t// component.)\n\t\t\t\t\tif ( (str.charAt(pos - 1) && isSpace( str.charAt(pos - 1) ) ) || !component ) {\n\t\t\t\t\t\tpos += 1;\n\t\t\t\t\t\tcontinue;\n\t\t\t\t\t} else if (parenDepth === 0) {\n\t\t\t\t\t\tpushComponent();\n\t\t\t\t\t\tpos +=1;\n\t\t\t\t\t\tcontinue;\n\t\t\t\t\t} else {\n\t\t\t\t\t\t// (Replace any space character with a plain space for legibility.)\n\t\t\t\t\t\tchrctr = \" \";\n\t\t\t\t\t}\n\t\t\t\t} else if (chrctr === \"(\") {\n\t\t\t\t\tparenDepth += 1;\n\t\t\t\t} else if (chrctr === \")\") {\n\t\t\t\t\tparenDepth -= 1;\n\t\t\t\t} else if (chrctr === \",\") {\n\t\t\t\t\tpushComponent();\n\t\t\t\t\tpushComponentArray();\n\t\t\t\t\tpos += 1;\n\t\t\t\t\tcontinue;\n\t\t\t\t} else if ( (chrctr === \"/\") && (str.charAt(pos + 1) === \"*\") ) {\n\t\t\t\t\tinComment = true;\n\t\t\t\t\tpos += 2;\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\tcomponent = component + chrctr;\n\t\t\t\tpos += 1;\n\t\t\t}\n\t\t}\n\n\t\tfunction isValidNonNegativeSourceSizeValue(s) {\n\t\t\tif (regexCssLengthWithUnits.test(s) && (parseFloat(s) >= 0)) {return true;}\n\t\t\tif (regexCssCalc.test(s)) {return true;}\n\t\t\t// ( http://www.w3.org/TR/CSS2/syndata.html#numbers says:\n\t\t\t// \"-0 is equivalent to 0 and is not a negative number.\" which means that\n\t\t\t// unitless zero and unitless negative zero must be accepted as special cases.)\n\t\t\tif ((s === \"0\") || (s === \"-0\") || (s === \"+0\")) {return true;}\n\t\t\treturn false;\n\t\t}\n\n\t\t// When asked to parse a sizes attribute from an element, parse a\n\t\t// comma-separated list of component values from the value of the element's\n\t\t// sizes attribute (or the empty string, if the attribute is absent), and let\n\t\t// unparsed sizes list be the result.\n\t\t// http://dev.w3.org/csswg/css-syntax/#parse-comma-separated-list-of-component-values\n\n\t\tunparsedSizesList = parseComponentValues(strValue);\n\t\tunparsedSizesListLength = unparsedSizesList.length;\n\n\t\t// For each unparsed size in unparsed sizes list:\n\t\tfor (i = 0; i < unparsedSizesListLength; i++) {\n\t\t\tunparsedSize = unparsedSizesList[i];\n\n\t\t\t// 1. Remove all consecutive <whitespace-token>s from the end of unparsed size.\n\t\t\t// ( parseComponentValues() already omits spaces outside of parens. )\n\n\t\t\t// If unparsed size is now empty, that is a parse error; continue to the next\n\t\t\t// iteration of this algorithm.\n\t\t\t// ( parseComponentValues() won't push an empty array. )\n\n\t\t\t// 2. If the last component value in unparsed size is a valid non-negative\n\t\t\t// <source-size-value>, let size be its value and remove the component value\n\t\t\t// from unparsed size. Any CSS function other than the calc() function is\n\t\t\t// invalid. Otherwise, there is a parse error; continue to the next iteration\n\t\t\t// of this algorithm.\n\t\t\t// http://dev.w3.org/csswg/css-syntax/#parse-component-value\n\t\t\tlastComponentValue = unparsedSize[unparsedSize.length - 1];\n\n\t\t\tif (isValidNonNegativeSourceSizeValue(lastComponentValue)) {\n\t\t\t\tsize = lastComponentValue;\n\t\t\t\tunparsedSize.pop();\n\t\t\t} else {\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\t// 3. Remove all consecutive <whitespace-token>s from the end of unparsed\n\t\t\t// size. If unparsed size is now empty, return size and exit this algorithm.\n\t\t\t// If this was not the last item in unparsed sizes list, that is a parse error.\n\t\t\tif (unparsedSize.length === 0) {\n\t\t\t\treturn size;\n\t\t\t}\n\n\t\t\t// 4. Parse the remaining component values in unparsed size as a\n\t\t\t// <media-condition>. If it does not parse correctly, or it does parse\n\t\t\t// correctly but the <media-condition> evaluates to false, continue to the\n\t\t\t// next iteration of this algorithm.\n\t\t\t// (Parsing all possible compound media conditions in JS is heavy, complicated,\n\t\t\t// and the payoff is unclear. Is there ever an situation where the\n\t\t\t// media condition parses incorrectly but still somehow evaluates to true?\n\t\t\t// Can we just rely on the browser/polyfill to do it?)\n\t\t\tunparsedSize = unparsedSize.join(\" \");\n\t\t\tif (!(pf.matchesMedia( unparsedSize ) ) ) {\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\t// 5. Return size and exit this algorithm.\n\t\t\treturn size;\n\t\t}\n\n\t\t// If the above algorithm exhausts unparsed sizes list without returning a\n\t\t// size value, return 100vw.\n\t\treturn \"100vw\";\n\t}\n\n\t// namespace\n\tpf.ns = (\"pf\" + new Date().getTime()).substr(0, 9);\n\n\t// srcset support test\n\tpf.supSrcset = \"srcset\" in image;\n\tpf.supSizes = \"sizes\" in image;\n\tpf.supPicture = !!window.HTMLPictureElement;\n\n\t// UC browser does claim to support srcset and picture, but not sizes,\n\t// this extended test reveals the browser does support nothing\n\tif (pf.supSrcset && pf.supPicture && !pf.supSizes) {\n\t\t(function(image2) {\n\t\t\timage.srcset = \"data:,a\";\n\t\t\timage2.src = \"data:,a\";\n\t\t\tpf.supSrcset = image.complete === image2.complete;\n\t\t\tpf.supPicture = pf.supSrcset && pf.supPicture;\n\t\t})(document.createElement(\"img\"));\n\t}\n\n\t// Safari9 has basic support for sizes, but does't expose the `sizes` idl attribute\n\tif (pf.supSrcset && !pf.supSizes) {\n\n\t\t(function() {\n\t\t\tvar width2 = \"data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==\";\n\t\t\tvar width1 = \"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\";\n\t\t\tvar img = document.createElement(\"img\");\n\t\t\tvar test = function() {\n\t\t\t\tvar width = img.width;\n\n\t\t\t\tif (width === 2) {\n\t\t\t\t\tpf.supSizes = true;\n\t\t\t\t}\n\n\t\t\t\talwaysCheckWDescriptor = pf.supSrcset && !pf.supSizes;\n\n\t\t\t\tisSupportTestReady = true;\n\t\t\t\t// force async\n\t\t\t\tsetTimeout(picturefill);\n\t\t\t};\n\n\t\t\timg.onload = test;\n\t\t\timg.onerror = test;\n\t\t\timg.setAttribute(\"sizes\", \"9px\");\n\n\t\t\timg.srcset = width1 + \" 1w,\" + width2 + \" 9w\";\n\t\t\timg.src = width1;\n\t\t})();\n\n\t} else {\n\t\tisSupportTestReady = true;\n\t}\n\n\t// using pf.qsa instead of dom traversing does scale much better,\n\t// especially on sites mixing responsive and non-responsive images\n\tpf.selShort = \"picture>img,img[srcset]\";\n\tpf.sel = pf.selShort;\n\tpf.cfg = cfg;\n\n\t/**\n\t * Shortcut property for `devicePixelRatio` ( for easy overriding in tests )\n\t */\n\tpf.DPR = (DPR  || 1 );\n\tpf.u = units;\n\n\t// container of supported mime types that one might need to qualify before using\n\tpf.types =  types;\n\n\tpf.setSize = noop;\n\n\t/**\n\t * Gets a string and returns the absolute URL\n\t * @param src\n\t * @returns {String} absolute URL\n\t */\n\n\tpf.makeUrl = memoize(function(src) {\n\t\tanchor.href = src;\n\t\treturn anchor.href;\n\t});\n\n\t/**\n\t * Gets a DOM element or document and a selctor and returns the found matches\n\t * Can be extended with jQuery/Sizzle for IE7 support\n\t * @param context\n\t * @param sel\n\t * @returns {NodeList|Array}\n\t */\n\tpf.qsa = function(context, sel) {\n\t\treturn ( \"querySelector\" in context ) ? context.querySelectorAll(sel) : [];\n\t};\n\n\t/**\n\t * Shortcut method for matchMedia ( for easy overriding in tests )\n\t * wether native or pf.mMQ is used will be decided lazy on first call\n\t * @returns {boolean}\n\t */\n\tpf.matchesMedia = function() {\n\t\tif ( window.matchMedia && (matchMedia( \"(min-width: 0.1em)\" ) || {}).matches ) {\n\t\t\tpf.matchesMedia = function( media ) {\n\t\t\t\treturn !media || ( matchMedia( media ).matches );\n\t\t\t};\n\t\t} else {\n\t\t\tpf.matchesMedia = pf.mMQ;\n\t\t}\n\n\t\treturn pf.matchesMedia.apply( this, arguments );\n\t};\n\n\t/**\n\t * A simplified matchMedia implementation for IE8 and IE9\n\t * handles only min-width/max-width with px or em values\n\t * @param media\n\t * @returns {boolean}\n\t */\n\tpf.mMQ = function( media ) {\n\t\treturn media ? evalCSS(media) : true;\n\t};\n\n\t/**\n\t * Returns the calculated length in css pixel from the given sourceSizeValue\n\t * http://dev.w3.org/csswg/css-values-3/#length-value\n\t * intended Spec mismatches:\n\t * * Does not check for invalid use of CSS functions\n\t * * Does handle a computed length of 0 the same as a negative and therefore invalid value\n\t * @param sourceSizeValue\n\t * @returns {Number}\n\t */\n\tpf.calcLength = function( sourceSizeValue ) {\n\n\t\tvar value = evalCSS(sourceSizeValue, true) || false;\n\t\tif (value < 0) {\n\t\t\tvalue = false;\n\t\t}\n\n\t\treturn value;\n\t};\n\n\t/**\n\t * Takes a type string and checks if its supported\n\t */\n\n\tpf.supportsType = function( type ) {\n\t\treturn ( type ) ? types[ type ] : true;\n\t};\n\n\t/**\n\t * Parses a sourceSize into mediaCondition (media) and sourceSizeValue (length)\n\t * @param sourceSizeStr\n\t * @returns {*}\n\t */\n\tpf.parseSize = memoize(function( sourceSizeStr ) {\n\t\tvar match = ( sourceSizeStr || \"\" ).match(regSize);\n\t\treturn {\n\t\t\tmedia: match && match[1],\n\t\t\tlength: match && match[2]\n\t\t};\n\t});\n\n\tpf.parseSet = function( set ) {\n\t\tif ( !set.cands ) {\n\t\t\tset.cands = parseSrcset(set.srcset, set);\n\t\t}\n\t\treturn set.cands;\n\t};\n\n\t/**\n\t * returns 1em in css px for html/body default size\n\t * function taken from respondjs\n\t * @returns {*|number}\n\t */\n\tpf.getEmValue = function() {\n\t\tvar body;\n\t\tif ( !eminpx && (body = document.body) ) {\n\t\t\tvar div = document.createElement( \"div\" ),\n\t\t\t\toriginalHTMLCSS = docElem.style.cssText,\n\t\t\t\toriginalBodyCSS = body.style.cssText;\n\n\t\t\tdiv.style.cssText = baseStyle;\n\n\t\t\t// 1em in a media query is the value of the default font size of the browser\n\t\t\t// reset docElem and body to ensure the correct value is returned\n\t\t\tdocElem.style.cssText = fsCss;\n\t\t\tbody.style.cssText = fsCss;\n\n\t\t\tbody.appendChild( div );\n\t\t\teminpx = div.offsetWidth;\n\t\t\tbody.removeChild( div );\n\n\t\t\t//also update eminpx before returning\n\t\t\teminpx = parseFloat( eminpx, 10 );\n\n\t\t\t// restore the original values\n\t\t\tdocElem.style.cssText = originalHTMLCSS;\n\t\t\tbody.style.cssText = originalBodyCSS;\n\n\t\t}\n\t\treturn eminpx || 16;\n\t};\n\n\t/**\n\t * Takes a string of sizes and returns the width in pixels as a number\n\t */\n\tpf.calcListLength = function( sourceSizeListStr ) {\n\t\t// Split up source size list, ie ( max-width: 30em ) 100%, ( max-width: 50em ) 50%, 33%\n\t\t//\n\t\t//                           or (min-width:30em) calc(30% - 15px)\n\t\tif ( !(sourceSizeListStr in sizeLengthCache) || cfg.uT ) {\n\t\t\tvar winningLength = pf.calcLength( parseSizes( sourceSizeListStr ) );\n\n\t\t\tsizeLengthCache[ sourceSizeListStr ] = !winningLength ? units.width : winningLength;\n\t\t}\n\n\t\treturn sizeLengthCache[ sourceSizeListStr ];\n\t};\n\n\t/**\n\t * Takes a candidate object with a srcset property in the form of url/\n\t * ex. \"images/pic-medium.png 1x, images/pic-medium-2x.png 2x\" or\n\t *     \"images/pic-medium.png 400w, images/pic-medium-2x.png 800w\" or\n\t *     \"images/pic-small.png\"\n\t * Get an array of image candidates in the form of\n\t *      {url: \"/foo/bar.png\", resolution: 1}\n\t * where resolution is http://dev.w3.org/csswg/css-values-3/#resolution-value\n\t * If sizes is specified, res is calculated\n\t */\n\tpf.setRes = function( set ) {\n\t\tvar candidates;\n\t\tif ( set ) {\n\n\t\t\tcandidates = pf.parseSet( set );\n\n\t\t\tfor ( var i = 0, len = candidates.length; i < len; i++ ) {\n\t\t\t\tsetResolution( candidates[ i ], set.sizes );\n\t\t\t}\n\t\t}\n\t\treturn candidates;\n\t};\n\n\tpf.setRes.res = setResolution;\n\n\tpf.applySetCandidate = function( candidates, img ) {\n\t\tif ( !candidates.length ) {return;}\n\t\tvar candidate,\n\t\t\ti,\n\t\t\tj,\n\t\t\tlength,\n\t\t\tbestCandidate,\n\t\t\tcurSrc,\n\t\t\tcurCan,\n\t\t\tcandidateSrc,\n\t\t\tabortCurSrc;\n\n\t\tvar imageData = img[ pf.ns ];\n\t\tvar dpr = pf.DPR;\n\n\t\tcurSrc = imageData.curSrc || img[curSrcProp];\n\n\t\tcurCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set);\n\n\t\t// if we have a current source, we might either become lazy or give this source some advantage\n\t\tif ( curCan && curCan.set === candidates[ 0 ].set ) {\n\n\t\t\t// if browser can abort image request and the image has a higher pixel density than needed\n\t\t\t// and this image isn't downloaded yet, we skip next part and try to save bandwidth\n\t\t\tabortCurSrc = (supportAbort && !img.complete && curCan.res - 0.1 > dpr);\n\n\t\t\tif ( !abortCurSrc ) {\n\t\t\t\tcurCan.cached = true;\n\n\t\t\t\t// if current candidate is \"best\", \"better\" or \"okay\",\n\t\t\t\t// set it to bestCandidate\n\t\t\t\tif ( curCan.res >= dpr ) {\n\t\t\t\t\tbestCandidate = curCan;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tif ( !bestCandidate ) {\n\n\t\t\tcandidates.sort( ascendingSort );\n\n\t\t\tlength = candidates.length;\n\t\t\tbestCandidate = candidates[ length - 1 ];\n\n\t\t\tfor ( i = 0; i < length; i++ ) {\n\t\t\t\tcandidate = candidates[ i ];\n\t\t\t\tif ( candidate.res >= dpr ) {\n\t\t\t\t\tj = i - 1;\n\n\t\t\t\t\t// we have found the perfect candidate,\n\t\t\t\t\t// but let's improve this a little bit with some assumptions ;-)\n\t\t\t\t\tif (candidates[ j ] &&\n\t\t\t\t\t\t(abortCurSrc || curSrc !== pf.makeUrl( candidate.url )) &&\n\t\t\t\t\t\tchooseLowRes(candidates[ j ].res, candidate.res, dpr, candidates[ j ].cached)) {\n\n\t\t\t\t\t\tbestCandidate = candidates[ j ];\n\n\t\t\t\t\t} else {\n\t\t\t\t\t\tbestCandidate = candidate;\n\t\t\t\t\t}\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tif ( bestCandidate ) {\n\n\t\t\tcandidateSrc = pf.makeUrl( bestCandidate.url );\n\n\t\t\timageData.curSrc = candidateSrc;\n\t\t\timageData.curCan = bestCandidate;\n\n\t\t\tif ( candidateSrc !== curSrc ) {\n\t\t\t\tpf.setSrc( img, bestCandidate );\n\t\t\t}\n\t\t\tpf.setSize( img );\n\t\t}\n\t};\n\n\tpf.setSrc = function( img, bestCandidate ) {\n\t\tvar origWidth;\n\t\timg.src = bestCandidate.url;\n\n\t\t// although this is a specific Safari issue, we don't want to take too much different code paths\n\t\tif ( bestCandidate.set.type === \"image/svg+xml\" ) {\n\t\t\torigWidth = img.style.width;\n\t\t\timg.style.width = (img.offsetWidth + 1) + \"px\";\n\n\t\t\t// next line only should trigger a repaint\n\t\t\t// if... is only done to trick dead code removal\n\t\t\tif ( img.offsetWidth + 1 ) {\n\t\t\t\timg.style.width = origWidth;\n\t\t\t}\n\t\t}\n\t};\n\n\tpf.getSet = function( img ) {\n\t\tvar i, set, supportsType;\n\t\tvar match = false;\n\t\tvar sets = img [ pf.ns ].sets;\n\n\t\tfor ( i = 0; i < sets.length && !match; i++ ) {\n\t\t\tset = sets[i];\n\n\t\t\tif ( !set.srcset || !pf.matchesMedia( set.media ) || !(supportsType = pf.supportsType( set.type )) ) {\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tif ( supportsType === \"pending\" ) {\n\t\t\t\tset = supportsType;\n\t\t\t}\n\n\t\t\tmatch = set;\n\t\t\tbreak;\n\t\t}\n\n\t\treturn match;\n\t};\n\n\tpf.parseSets = function( element, parent, options ) {\n\t\tvar srcsetAttribute, imageSet, isWDescripor, srcsetParsed;\n\n\t\tvar hasPicture = parent && parent.nodeName.toUpperCase() === \"PICTURE\";\n\t\tvar imageData = element[ pf.ns ];\n\n\t\tif ( imageData.src === undefined || options.src ) {\n\t\t\timageData.src = getImgAttr.call( element, \"src\" );\n\t\t\tif ( imageData.src ) {\n\t\t\t\tsetImgAttr.call( element, srcAttr, imageData.src );\n\t\t\t} else {\n\t\t\t\tremoveImgAttr.call( element, srcAttr );\n\t\t\t}\n\t\t}\n\n\t\tif ( imageData.srcset === undefined || options.srcset || !pf.supSrcset || element.srcset ) {\n\t\t\tsrcsetAttribute = getImgAttr.call( element, \"srcset\" );\n\t\t\timageData.srcset = srcsetAttribute;\n\t\t\tsrcsetParsed = true;\n\t\t}\n\n\t\timageData.sets = [];\n\n\t\tif ( hasPicture ) {\n\t\t\timageData.pic = true;\n\t\t\tgetAllSourceElements( parent, imageData.sets );\n\t\t}\n\n\t\tif ( imageData.srcset ) {\n\t\t\timageSet = {\n\t\t\t\tsrcset: imageData.srcset,\n\t\t\t\tsizes: getImgAttr.call( element, \"sizes\" )\n\t\t\t};\n\n\t\t\timageData.sets.push( imageSet );\n\n\t\t\tisWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || \"\");\n\n\t\t\t// add normal src as candidate, if source has no w descriptor\n\t\t\tif ( !isWDescripor && imageData.src && !getCandidateForSrc(imageData.src, imageSet) && !imageSet.has1x ) {\n\t\t\t\timageSet.srcset += \", \" + imageData.src;\n\t\t\t\timageSet.cands.push({\n\t\t\t\t\turl: imageData.src,\n\t\t\t\t\td: 1,\n\t\t\t\t\tset: imageSet\n\t\t\t\t});\n\t\t\t}\n\n\t\t} else if ( imageData.src ) {\n\t\t\timageData.sets.push( {\n\t\t\t\tsrcset: imageData.src,\n\t\t\t\tsizes: null\n\t\t\t} );\n\t\t}\n\n\t\timageData.curCan = null;\n\t\timageData.curSrc = undefined;\n\n\t\t// if img has picture or the srcset was removed or has a srcset and does not support srcset at all\n\t\t// or has a w descriptor (and does not support sizes) set support to false to evaluate\n\t\timageData.supported = !( hasPicture || ( imageSet && !pf.supSrcset ) || (isWDescripor && !pf.supSizes) );\n\n\t\tif ( srcsetParsed && pf.supSrcset && !imageData.supported ) {\n\t\t\tif ( srcsetAttribute ) {\n\t\t\t\tsetImgAttr.call( element, srcsetAttr, srcsetAttribute );\n\t\t\t\telement.srcset = \"\";\n\t\t\t} else {\n\t\t\t\tremoveImgAttr.call( element, srcsetAttr );\n\t\t\t}\n\t\t}\n\n\t\tif (imageData.supported && !imageData.srcset && ((!imageData.src && element.src) ||  element.src !== pf.makeUrl(imageData.src))) {\n\t\t\tif (imageData.src === null) {\n\t\t\t\telement.removeAttribute(\"src\");\n\t\t\t} else {\n\t\t\t\telement.src = imageData.src;\n\t\t\t}\n\t\t}\n\n\t\timageData.parsed = true;\n\t};\n\n\tpf.fillImg = function(element, options) {\n\t\tvar imageData;\n\t\tvar extreme = options.reselect || options.reevaluate;\n\n\t\t// expando for caching data on the img\n\t\tif ( !element[ pf.ns ] ) {\n\t\t\telement[ pf.ns ] = {};\n\t\t}\n\n\t\timageData = element[ pf.ns ];\n\n\t\t// if the element has already been evaluated, skip it\n\t\t// unless `options.reevaluate` is set to true ( this, for example,\n\t\t// is set to true when running `picturefill` on `resize` ).\n\t\tif ( !extreme && imageData.evaled === evalId ) {\n\t\t\treturn;\n\t\t}\n\n\t\tif ( !imageData.parsed || options.reevaluate ) {\n\t\t\tpf.parseSets( element, element.parentNode, options );\n\t\t}\n\n\t\tif ( !imageData.supported ) {\n\t\t\tapplyBestCandidate( element );\n\t\t} else {\n\t\t\timageData.evaled = evalId;\n\t\t}\n\t};\n\n\tpf.setupRun = function() {\n\t\tif ( !alreadyRun || isVwDirty || (DPR !== window.devicePixelRatio) ) {\n\t\t\tupdateMetrics();\n\t\t}\n\t};\n\n\t// If picture is supported, well, that's awesome.\n\tif ( pf.supPicture ) {\n\t\tpicturefill = noop;\n\t\tpf.fillImg = noop;\n\t} else {\n\n\t\t // Set up picture polyfill by polling the document\n\t\t(function() {\n\t\t\tvar isDomReady;\n\t\t\tvar regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/;\n\n\t\t\tvar run = function() {\n\t\t\t\tvar readyState = document.readyState || \"\";\n\n\t\t\t\ttimerId = setTimeout(run, readyState === \"loading\" ? 200 :  999);\n\t\t\t\tif ( document.body ) {\n\t\t\t\t\tpf.fillImgs();\n\t\t\t\t\tisDomReady = isDomReady || regReady.test(readyState);\n\t\t\t\t\tif ( isDomReady ) {\n\t\t\t\t\t\tclearTimeout( timerId );\n\t\t\t\t\t}\n\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tvar timerId = setTimeout(run, document.body ? 9 : 99);\n\n\t\t\t// Also attach picturefill on resize and readystatechange\n\t\t\t// http://modernjavascript.blogspot.com/2013/08/building-better-debounce.html\n\t\t\tvar debounce = function(func, wait) {\n\t\t\t\tvar timeout, timestamp;\n\t\t\t\tvar later = function() {\n\t\t\t\t\tvar last = (new Date()) - timestamp;\n\n\t\t\t\t\tif (last < wait) {\n\t\t\t\t\t\ttimeout = setTimeout(later, wait - last);\n\t\t\t\t\t} else {\n\t\t\t\t\t\ttimeout = null;\n\t\t\t\t\t\tfunc();\n\t\t\t\t\t}\n\t\t\t\t};\n\n\t\t\t\treturn function() {\n\t\t\t\t\ttimestamp = new Date();\n\n\t\t\t\t\tif (!timeout) {\n\t\t\t\t\t\ttimeout = setTimeout(later, wait);\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t};\n\t\t\tvar lastClientWidth = docElem.clientHeight;\n\t\t\tvar onResize = function() {\n\t\t\t\tisVwDirty = Math.max(window.innerWidth || 0, docElem.clientWidth) !== units.width || docElem.clientHeight !== lastClientWidth;\n\t\t\t\tlastClientWidth = docElem.clientHeight;\n\t\t\t\tif ( isVwDirty ) {\n\t\t\t\t\tpf.fillImgs();\n\t\t\t\t}\n\t\t\t};\n\n\t\t\ton( window, \"resize\", debounce(onResize, 99 ) );\n\t\t\ton( document, \"readystatechange\", run );\n\t\t})();\n\t}\n\n\tpf.picturefill = picturefill;\n\t//use this internally for easy monkey patching/performance testing\n\tpf.fillImgs = picturefill;\n\tpf.teardownRun = noop;\n\n\t/* expose methods for testing */\n\tpicturefill._ = pf;\n\n\twindow.picturefillCFG = {\n\t\tpf: pf,\n\t\tpush: function(args) {\n\t\t\tvar name = args.shift();\n\t\t\tif (typeof pf[name] === \"function\") {\n\t\t\t\tpf[name].apply(pf, args);\n\t\t\t} else {\n\t\t\t\tcfg[name] = args[0];\n\t\t\t\tif (alreadyRun) {\n\t\t\t\t\tpf.fillImgs( { reselect: true } );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n\n\twhile (setOptions && setOptions.length) {\n\t\twindow.picturefillCFG.push(setOptions.shift());\n\t}\n\n\t/* expose picturefill */\n\twindow.picturefill = picturefill;\n\n\t/* expose picturefill */\n\tif (  true && typeof module.exports === \"object\" ) {\n\t\t// CommonJS, just export\n\t\tmodule.exports = picturefill;\n\t} else if ( true ) {\n\t\t// AMD support\n\t\t!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return picturefill; }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t}\n\n\t// IE8 evals this sync, so it must be the last thing we do\n\tif ( !pf.supPicture ) {\n\t\ttypes[ \"image/webp\" ] = detectTypeSupport(\"image/webp\", \"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==\" );\n\t}\n\n} )( window, document );\n\n\n//# sourceURL=webpack:///./node_modules/picturefill/dist/picturefill.js?");

/***/ }),

/***/ "./src/js/Vendor.js":
/*!**************************!*\
  !*** ./src/js/Vendor.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var picturefill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! picturefill */ \"./node_modules/picturefill/dist/picturefill.js\");\n/* harmony import */ var picturefill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(picturefill__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lazysizes */ \"./node_modules/lazysizes/lazysizes.js\");\n/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lazysizes__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app_dist_modernizr_custom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/dist/modernizr-custom */ \"./app/dist/modernizr-custom.js\");\n/* harmony import */ var _app_dist_modernizr_custom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_app_dist_modernizr_custom__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n//# sourceURL=webpack:///./src/js/Vendor.js?");

/***/ })

/******/ });