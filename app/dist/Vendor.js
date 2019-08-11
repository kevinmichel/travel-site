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
/******/ 	var hotCurrentHash = "35b0c13566250e1616ed";
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

/***/ "./node_modules/lazysizes/lazysizes.js":
/*!*********************************************!*\
  !*** ./node_modules/lazysizes/lazysizes.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function(window, factory) {\n\tvar lazySizes = factory(window, window.document);\n\twindow.lazySizes = lazySizes;\n\tif( true && module.exports){\n\t\tmodule.exports = lazySizes;\n\t}\n}(typeof window != 'undefined' ?\n      window : {}, function l(window, document) {\n\t'use strict';\n\t/*jshint eqnull:true */\n\n\tvar lazysizes, lazySizesCfg;\n\n\t(function(){\n\t\tvar prop;\n\n\t\tvar lazySizesDefaults = {\n\t\t\tlazyClass: 'lazyload',\n\t\t\tloadedClass: 'lazyloaded',\n\t\t\tloadingClass: 'lazyloading',\n\t\t\tpreloadClass: 'lazypreload',\n\t\t\terrorClass: 'lazyerror',\n\t\t\t//strictClass: 'lazystrict',\n\t\t\tautosizesClass: 'lazyautosizes',\n\t\t\tsrcAttr: 'data-src',\n\t\t\tsrcsetAttr: 'data-srcset',\n\t\t\tsizesAttr: 'data-sizes',\n\t\t\t//preloadAfterLoad: false,\n\t\t\tminSize: 40,\n\t\t\tcustomMedia: {},\n\t\t\tinit: true,\n\t\t\texpFactor: 1.5,\n\t\t\thFac: 0.8,\n\t\t\tloadMode: 2,\n\t\t\tloadHidden: true,\n\t\t\tricTimeout: 0,\n\t\t\tthrottleDelay: 125,\n\t\t};\n\n\t\tlazySizesCfg = window.lazySizesConfig || window.lazysizesConfig || {};\n\n\t\tfor(prop in lazySizesDefaults){\n\t\t\tif(!(prop in lazySizesCfg)){\n\t\t\t\tlazySizesCfg[prop] = lazySizesDefaults[prop];\n\t\t\t}\n\t\t}\n\t})();\n\n\tif (!document || !document.getElementsByClassName) {\n\t\treturn {\n\t\t\tinit: function () {},\n\t\t\tcfg: lazySizesCfg,\n\t\t\tnoSupport: true,\n\t\t};\n\t}\n\n\tvar docElem = document.documentElement;\n\n\tvar Date = window.Date;\n\n\tvar supportPicture = window.HTMLPictureElement;\n\n\tvar _addEventListener = 'addEventListener';\n\n\tvar _getAttribute = 'getAttribute';\n\n\tvar addEventListener = window[_addEventListener];\n\n\tvar setTimeout = window.setTimeout;\n\n\tvar requestAnimationFrame = window.requestAnimationFrame || setTimeout;\n\n\tvar requestIdleCallback = window.requestIdleCallback;\n\n\tvar regPicture = /^picture$/i;\n\n\tvar loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];\n\n\tvar regClassCache = {};\n\n\tvar forEach = Array.prototype.forEach;\n\n\tvar hasClass = function(ele, cls) {\n\t\tif(!regClassCache[cls]){\n\t\t\tregClassCache[cls] = new RegExp('(\\\\s|^)'+cls+'(\\\\s|$)');\n\t\t}\n\t\treturn regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];\n\t};\n\n\tvar addClass = function(ele, cls) {\n\t\tif (!hasClass(ele, cls)){\n\t\t\tele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);\n\t\t}\n\t};\n\n\tvar removeClass = function(ele, cls) {\n\t\tvar reg;\n\t\tif ((reg = hasClass(ele,cls))) {\n\t\t\tele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));\n\t\t}\n\t};\n\n\tvar addRemoveLoadEvents = function(dom, fn, add){\n\t\tvar action = add ? _addEventListener : 'removeEventListener';\n\t\tif(add){\n\t\t\taddRemoveLoadEvents(dom, fn);\n\t\t}\n\t\tloadEvents.forEach(function(evt){\n\t\t\tdom[action](evt, fn);\n\t\t});\n\t};\n\n\tvar triggerEvent = function(elem, name, detail, noBubbles, noCancelable){\n\t\tvar event = document.createEvent('Event');\n\n\t\tif(!detail){\n\t\t\tdetail = {};\n\t\t}\n\n\t\tdetail.instance = lazysizes;\n\n\t\tevent.initEvent(name, !noBubbles, !noCancelable);\n\n\t\tevent.detail = detail;\n\n\t\telem.dispatchEvent(event);\n\t\treturn event;\n\t};\n\n\tvar updatePolyfill = function (el, full){\n\t\tvar polyfill;\n\t\tif( !supportPicture && ( polyfill = (window.picturefill || lazySizesCfg.pf) ) ){\n\t\t\tif(full && full.src && !el[_getAttribute]('srcset')){\n\t\t\t\tel.setAttribute('srcset', full.src);\n\t\t\t}\n\t\t\tpolyfill({reevaluate: true, elements: [el]});\n\t\t} else if(full && full.src){\n\t\t\tel.src = full.src;\n\t\t}\n\t};\n\n\tvar getCSS = function (elem, style){\n\t\treturn (getComputedStyle(elem, null) || {})[style];\n\t};\n\n\tvar getWidth = function(elem, parent, width){\n\t\twidth = width || elem.offsetWidth;\n\n\t\twhile(width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth){\n\t\t\twidth =  parent.offsetWidth;\n\t\t\tparent = parent.parentNode;\n\t\t}\n\n\t\treturn width;\n\t};\n\n\tvar rAF = (function(){\n\t\tvar running, waiting;\n\t\tvar firstFns = [];\n\t\tvar secondFns = [];\n\t\tvar fns = firstFns;\n\n\t\tvar run = function(){\n\t\t\tvar runFns = fns;\n\n\t\t\tfns = firstFns.length ? secondFns : firstFns;\n\n\t\t\trunning = true;\n\t\t\twaiting = false;\n\n\t\t\twhile(runFns.length){\n\t\t\t\trunFns.shift()();\n\t\t\t}\n\n\t\t\trunning = false;\n\t\t};\n\n\t\tvar rafBatch = function(fn, queue){\n\t\t\tif(running && !queue){\n\t\t\t\tfn.apply(this, arguments);\n\t\t\t} else {\n\t\t\t\tfns.push(fn);\n\n\t\t\t\tif(!waiting){\n\t\t\t\t\twaiting = true;\n\t\t\t\t\t(document.hidden ? setTimeout : requestAnimationFrame)(run);\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\trafBatch._lsFlush = run;\n\n\t\treturn rafBatch;\n\t})();\n\n\tvar rAFIt = function(fn, simple){\n\t\treturn simple ?\n\t\t\tfunction() {\n\t\t\t\trAF(fn);\n\t\t\t} :\n\t\t\tfunction(){\n\t\t\t\tvar that = this;\n\t\t\t\tvar args = arguments;\n\t\t\t\trAF(function(){\n\t\t\t\t\tfn.apply(that, args);\n\t\t\t\t});\n\t\t\t}\n\t\t;\n\t};\n\n\tvar throttle = function(fn){\n\t\tvar running;\n\t\tvar lastTime = 0;\n\t\tvar gDelay = lazySizesCfg.throttleDelay;\n\t\tvar rICTimeout = lazySizesCfg.ricTimeout;\n\t\tvar run = function(){\n\t\t\trunning = false;\n\t\t\tlastTime = Date.now();\n\t\t\tfn();\n\t\t};\n\t\tvar idleCallback = requestIdleCallback && rICTimeout > 49 ?\n\t\t\tfunction(){\n\t\t\t\trequestIdleCallback(run, {timeout: rICTimeout});\n\n\t\t\t\tif(rICTimeout !== lazySizesCfg.ricTimeout){\n\t\t\t\t\trICTimeout = lazySizesCfg.ricTimeout;\n\t\t\t\t}\n\t\t\t} :\n\t\t\trAFIt(function(){\n\t\t\t\tsetTimeout(run);\n\t\t\t}, true)\n\t\t;\n\n\t\treturn function(isPriority){\n\t\t\tvar delay;\n\n\t\t\tif((isPriority = isPriority === true)){\n\t\t\t\trICTimeout = 33;\n\t\t\t}\n\n\t\t\tif(running){\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\trunning =  true;\n\n\t\t\tdelay = gDelay - (Date.now() - lastTime);\n\n\t\t\tif(delay < 0){\n\t\t\t\tdelay = 0;\n\t\t\t}\n\n\t\t\tif(isPriority || delay < 9){\n\t\t\t\tidleCallback();\n\t\t\t} else {\n\t\t\t\tsetTimeout(idleCallback, delay);\n\t\t\t}\n\t\t};\n\t};\n\n\t//based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html\n\tvar debounce = function(func) {\n\t\tvar timeout, timestamp;\n\t\tvar wait = 99;\n\t\tvar run = function(){\n\t\t\ttimeout = null;\n\t\t\tfunc();\n\t\t};\n\t\tvar later = function() {\n\t\t\tvar last = Date.now() - timestamp;\n\n\t\t\tif (last < wait) {\n\t\t\t\tsetTimeout(later, wait - last);\n\t\t\t} else {\n\t\t\t\t(requestIdleCallback || run)(run);\n\t\t\t}\n\t\t};\n\n\t\treturn function() {\n\t\t\ttimestamp = Date.now();\n\n\t\t\tif (!timeout) {\n\t\t\t\ttimeout = setTimeout(later, wait);\n\t\t\t}\n\t\t};\n\t};\n\n\tvar loader = (function(){\n\t\tvar preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;\n\n\t\tvar eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;\n\n\t\tvar regImg = /^img$/i;\n\t\tvar regIframe = /^iframe$/i;\n\n\t\tvar supportScroll = ('onscroll' in window) && !(/(gle|ing)bot/.test(navigator.userAgent));\n\n\t\tvar shrinkExpand = 0;\n\t\tvar currentExpand = 0;\n\n\t\tvar isLoading = 0;\n\t\tvar lowRuns = -1;\n\n\t\tvar resetPreloading = function(e){\n\t\t\tisLoading--;\n\t\t\tif(!e || isLoading < 0 || !e.target){\n\t\t\t\tisLoading = 0;\n\t\t\t}\n\t\t};\n\n\t\tvar isVisible = function (elem) {\n\t\t\tif (isBodyHidden == null) {\n\t\t\t\tisBodyHidden = getCSS(document.body, 'visibility') == 'hidden';\n\t\t\t}\n\n\t\t\treturn isBodyHidden || (getCSS(elem.parentNode, 'visibility') != 'hidden' && getCSS(elem, 'visibility') != 'hidden');\n\t\t};\n\n\t\tvar isNestedVisible = function(elem, elemExpand){\n\t\t\tvar outerRect;\n\t\t\tvar parent = elem;\n\t\t\tvar visible = isVisible(elem);\n\n\t\t\teLtop -= elemExpand;\n\t\t\teLbottom += elemExpand;\n\t\t\teLleft -= elemExpand;\n\t\t\teLright += elemExpand;\n\n\t\t\twhile(visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem){\n\t\t\t\tvisible = ((getCSS(parent, 'opacity') || 1) > 0);\n\n\t\t\t\tif(visible && getCSS(parent, 'overflow') != 'visible'){\n\t\t\t\t\touterRect = parent.getBoundingClientRect();\n\t\t\t\t\tvisible = eLright > outerRect.left &&\n\t\t\t\t\t\teLleft < outerRect.right &&\n\t\t\t\t\t\teLbottom > outerRect.top - 1 &&\n\t\t\t\t\t\teLtop < outerRect.bottom + 1\n\t\t\t\t\t;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn visible;\n\t\t};\n\n\t\tvar checkElements = function() {\n\t\t\tvar eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal,\n\t\t\t\tbeforeExpandVal, defaultExpand, preloadExpand, hFac;\n\t\t\tvar lazyloadElems = lazysizes.elements;\n\n\t\t\tif((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){\n\n\t\t\t\ti = 0;\n\n\t\t\t\tlowRuns++;\n\n\t\t\t\tfor(; i < eLlen; i++){\n\n\t\t\t\t\tif(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}\n\n\t\t\t\t\tif(!supportScroll || (lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i]))){unveilElement(lazyloadElems[i]);continue;}\n\n\t\t\t\t\tif(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){\n\t\t\t\t\t\telemExpand = currentExpand;\n\t\t\t\t\t}\n\n\t\t\t\t\tif (!defaultExpand) {\n\t\t\t\t\t\tdefaultExpand = (!lazySizesCfg.expand || lazySizesCfg.expand < 1) ?\n\t\t\t\t\t\t\tdocElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 :\n\t\t\t\t\t\t\tlazySizesCfg.expand;\n\n\t\t\t\t\t\tlazysizes._defEx = defaultExpand;\n\n\t\t\t\t\t\tpreloadExpand = defaultExpand * lazySizesCfg.expFactor;\n\t\t\t\t\t\thFac = lazySizesCfg.hFac;\n\t\t\t\t\t\tisBodyHidden = null;\n\n\t\t\t\t\t\tif(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden){\n\t\t\t\t\t\t\tcurrentExpand = preloadExpand;\n\t\t\t\t\t\t\tlowRuns = 0;\n\t\t\t\t\t\t} else if(loadMode > 1 && lowRuns > 1 && isLoading < 6){\n\t\t\t\t\t\t\tcurrentExpand = defaultExpand;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tcurrentExpand = shrinkExpand;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\tif(beforeExpandVal !== elemExpand){\n\t\t\t\t\t\teLvW = innerWidth + (elemExpand * hFac);\n\t\t\t\t\t\telvH = innerHeight + elemExpand;\n\t\t\t\t\t\telemNegativeExpand = elemExpand * -1;\n\t\t\t\t\t\tbeforeExpandVal = elemExpand;\n\t\t\t\t\t}\n\n\t\t\t\t\trect = lazyloadElems[i].getBoundingClientRect();\n\n\t\t\t\t\tif ((eLbottom = rect.bottom) >= elemNegativeExpand &&\n\t\t\t\t\t\t(eLtop = rect.top) <= elvH &&\n\t\t\t\t\t\t(eLright = rect.right) >= elemNegativeExpand * hFac &&\n\t\t\t\t\t\t(eLleft = rect.left) <= eLvW &&\n\t\t\t\t\t\t(eLbottom || eLright || eLleft || eLtop) &&\n\t\t\t\t\t\t(lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) &&\n\t\t\t\t\t\t((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){\n\t\t\t\t\t\tunveilElement(lazyloadElems[i]);\n\t\t\t\t\t\tloadedSomething = true;\n\t\t\t\t\t\tif(isLoading > 9){break;}\n\t\t\t\t\t} else if(!loadedSomething && isCompleted && !autoLoadElem &&\n\t\t\t\t\t\tisLoading < 4 && lowRuns < 4 && loadMode > 2 &&\n\t\t\t\t\t\t(preloadElems[0] || lazySizesCfg.preloadAfterLoad) &&\n\t\t\t\t\t\t(preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != 'auto')))){\n\t\t\t\t\t\tautoLoadElem = preloadElems[0] || lazyloadElems[i];\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tif(autoLoadElem && !loadedSomething){\n\t\t\t\t\tunveilElement(autoLoadElem);\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\tvar throttledCheckElements = throttle(checkElements);\n\n\t\tvar switchLoadingClass = function(e){\n\t\t\tvar elem = e.target;\n\n\t\t\tif (elem._lazyCache) {\n\t\t\t\tdelete elem._lazyCache;\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tresetPreloading(e);\n\t\t\taddClass(elem, lazySizesCfg.loadedClass);\n\t\t\tremoveClass(elem, lazySizesCfg.loadingClass);\n\t\t\taddRemoveLoadEvents(elem, rafSwitchLoadingClass);\n\t\t\ttriggerEvent(elem, 'lazyloaded');\n\t\t};\n\t\tvar rafedSwitchLoadingClass = rAFIt(switchLoadingClass);\n\t\tvar rafSwitchLoadingClass = function(e){\n\t\t\trafedSwitchLoadingClass({target: e.target});\n\t\t};\n\n\t\tvar changeIframeSrc = function(elem, src){\n\t\t\ttry {\n\t\t\t\telem.contentWindow.location.replace(src);\n\t\t\t} catch(e){\n\t\t\t\telem.src = src;\n\t\t\t}\n\t\t};\n\n\t\tvar handleSources = function(source){\n\t\t\tvar customMedia;\n\n\t\t\tvar sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);\n\n\t\t\tif( (customMedia = lazySizesCfg.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){\n\t\t\t\tsource.setAttribute('media', customMedia);\n\t\t\t}\n\n\t\t\tif(sourceSrcset){\n\t\t\t\tsource.setAttribute('srcset', sourceSrcset);\n\t\t\t}\n\t\t};\n\n\t\tvar lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg){\n\t\t\tvar src, srcset, parent, isPicture, event, firesLoad;\n\n\t\t\tif(!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented){\n\n\t\t\t\tif(sizes){\n\t\t\t\t\tif(isAuto){\n\t\t\t\t\t\taddClass(elem, lazySizesCfg.autosizesClass);\n\t\t\t\t\t} else {\n\t\t\t\t\t\telem.setAttribute('sizes', sizes);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tsrcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);\n\t\t\t\tsrc = elem[_getAttribute](lazySizesCfg.srcAttr);\n\n\t\t\t\tif(isImg) {\n\t\t\t\t\tparent = elem.parentNode;\n\t\t\t\t\tisPicture = parent && regPicture.test(parent.nodeName || '');\n\t\t\t\t}\n\n\t\t\t\tfiresLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));\n\n\t\t\t\tevent = {target: elem};\n\n\t\t\t\taddClass(elem, lazySizesCfg.loadingClass);\n\n\t\t\t\tif(firesLoad){\n\t\t\t\t\tclearTimeout(resetPreloadingTimer);\n\t\t\t\t\tresetPreloadingTimer = setTimeout(resetPreloading, 2500);\n\t\t\t\t\taddRemoveLoadEvents(elem, rafSwitchLoadingClass, true);\n\t\t\t\t}\n\n\t\t\t\tif(isPicture){\n\t\t\t\t\tforEach.call(parent.getElementsByTagName('source'), handleSources);\n\t\t\t\t}\n\n\t\t\t\tif(srcset){\n\t\t\t\t\telem.setAttribute('srcset', srcset);\n\t\t\t\t} else if(src && !isPicture){\n\t\t\t\t\tif(regIframe.test(elem.nodeName)){\n\t\t\t\t\t\tchangeIframeSrc(elem, src);\n\t\t\t\t\t} else {\n\t\t\t\t\t\telem.src = src;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tif(isImg && (srcset || isPicture)){\n\t\t\t\t\tupdatePolyfill(elem, {src: src});\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif(elem._lazyRace){\n\t\t\t\tdelete elem._lazyRace;\n\t\t\t}\n\t\t\tremoveClass(elem, lazySizesCfg.lazyClass);\n\n\t\t\trAF(function(){\n\t\t\t\t// Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)\n\t\t\t\tvar isLoaded = elem.complete && elem.naturalWidth > 1;\n\n\t\t\t\tif( !firesLoad || isLoaded){\n\t\t\t\t\tif (isLoaded) {\n\t\t\t\t\t\taddClass(elem, 'ls-is-cached');\n\t\t\t\t\t}\n\t\t\t\t\tswitchLoadingClass(event);\n\t\t\t\t\telem._lazyCache = true;\n\t\t\t\t\tsetTimeout(function(){\n\t\t\t\t\t\tif ('_lazyCache' in elem) {\n\t\t\t\t\t\t\tdelete elem._lazyCache;\n\t\t\t\t\t\t}\n\t\t\t\t\t}, 9);\n\t\t\t\t}\n\t\t\t\tif (elem.loading == 'lazy') {\n\t\t\t\t\tisLoading--;\n\t\t\t\t}\n\t\t\t}, true);\n\t\t});\n\n\t\tvar unveilElement = function (elem){\n\t\t\tif (elem._lazyRace) {return;}\n\t\t\tvar detail;\n\n\t\t\tvar isImg = regImg.test(elem.nodeName);\n\n\t\t\t//allow using sizes=\"auto\", but don't use. it's invalid. Use data-sizes=\"auto\" or a valid value for sizes instead (i.e.: sizes=\"80vw\")\n\t\t\tvar sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]('sizes'));\n\t\t\tvar isAuto = sizes == 'auto';\n\n\t\t\tif( (isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)){return;}\n\n\t\t\tdetail = triggerEvent(elem, 'lazyunveilread').detail;\n\n\t\t\tif(isAuto){\n\t\t\t\t autoSizer.updateElem(elem, true, elem.offsetWidth);\n\t\t\t}\n\n\t\t\telem._lazyRace = true;\n\t\t\tisLoading++;\n\n\t\t\tlazyUnveil(elem, detail, isAuto, sizes, isImg);\n\t\t};\n\n\t\tvar afterScroll = debounce(function(){\n\t\t\tlazySizesCfg.loadMode = 3;\n\t\t\tthrottledCheckElements();\n\t\t});\n\n\t\tvar altLoadmodeScrollListner = function(){\n\t\t\tif(lazySizesCfg.loadMode == 3){\n\t\t\t\tlazySizesCfg.loadMode = 2;\n\t\t\t}\n\t\t\tafterScroll();\n\t\t};\n\n\t\tvar onload = function(){\n\t\t\tif(isCompleted){return;}\n\t\t\tif(Date.now() - started < 999){\n\t\t\t\tsetTimeout(onload, 999);\n\t\t\t\treturn;\n\t\t\t}\n\n\n\t\t\tisCompleted = true;\n\n\t\t\tlazySizesCfg.loadMode = 3;\n\n\t\t\tthrottledCheckElements();\n\n\t\t\taddEventListener('scroll', altLoadmodeScrollListner, true);\n\t\t};\n\n\t\treturn {\n\t\t\t_: function(){\n\t\t\t\tstarted = Date.now();\n\n\t\t\t\tlazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);\n\t\t\t\tpreloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + ' ' + lazySizesCfg.preloadClass);\n\n\t\t\t\taddEventListener('scroll', throttledCheckElements, true);\n\n\t\t\t\taddEventListener('resize', throttledCheckElements, true);\n\n\t\t\t\tif(window.MutationObserver){\n\t\t\t\t\tnew MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );\n\t\t\t\t} else {\n\t\t\t\t\tdocElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);\n\t\t\t\t\tdocElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);\n\t\t\t\t\tsetInterval(throttledCheckElements, 999);\n\t\t\t\t}\n\n\t\t\t\taddEventListener('hashchange', throttledCheckElements, true);\n\n\t\t\t\t//, 'fullscreenchange'\n\t\t\t\t['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend'].forEach(function(name){\n\t\t\t\t\tdocument[_addEventListener](name, throttledCheckElements, true);\n\t\t\t\t});\n\n\t\t\t\tif((/d$|^c/.test(document.readyState))){\n\t\t\t\t\tonload();\n\t\t\t\t} else {\n\t\t\t\t\taddEventListener('load', onload);\n\t\t\t\t\tdocument[_addEventListener]('DOMContentLoaded', throttledCheckElements);\n\t\t\t\t\tsetTimeout(onload, 20000);\n\t\t\t\t}\n\n\t\t\t\tif(lazysizes.elements.length){\n\t\t\t\t\tcheckElements();\n\t\t\t\t\trAF._lsFlush();\n\t\t\t\t} else {\n\t\t\t\t\tthrottledCheckElements();\n\t\t\t\t}\n\t\t\t},\n\t\t\tcheckElems: throttledCheckElements,\n\t\t\tunveil: unveilElement,\n\t\t\t_aLSL: altLoadmodeScrollListner,\n\t\t};\n\t})();\n\n\n\tvar autoSizer = (function(){\n\t\tvar autosizesElems;\n\n\t\tvar sizeElement = rAFIt(function(elem, parent, event, width){\n\t\t\tvar sources, i, len;\n\t\t\telem._lazysizesWidth = width;\n\t\t\twidth += 'px';\n\n\t\t\telem.setAttribute('sizes', width);\n\n\t\t\tif(regPicture.test(parent.nodeName || '')){\n\t\t\t\tsources = parent.getElementsByTagName('source');\n\t\t\t\tfor(i = 0, len = sources.length; i < len; i++){\n\t\t\t\t\tsources[i].setAttribute('sizes', width);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif(!event.detail.dataAttr){\n\t\t\t\tupdatePolyfill(elem, event.detail);\n\t\t\t}\n\t\t});\n\t\tvar getSizeElement = function (elem, dataAttr, width){\n\t\t\tvar event;\n\t\t\tvar parent = elem.parentNode;\n\n\t\t\tif(parent){\n\t\t\t\twidth = getWidth(elem, parent, width);\n\t\t\t\tevent = triggerEvent(elem, 'lazybeforesizes', {width: width, dataAttr: !!dataAttr});\n\n\t\t\t\tif(!event.defaultPrevented){\n\t\t\t\t\twidth = event.detail.width;\n\n\t\t\t\t\tif(width && width !== elem._lazysizesWidth){\n\t\t\t\t\t\tsizeElement(elem, parent, event, width);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\tvar updateElementsSizes = function(){\n\t\t\tvar i;\n\t\t\tvar len = autosizesElems.length;\n\t\t\tif(len){\n\t\t\t\ti = 0;\n\n\t\t\t\tfor(; i < len; i++){\n\t\t\t\t\tgetSizeElement(autosizesElems[i]);\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\tvar debouncedUpdateElementsSizes = debounce(updateElementsSizes);\n\n\t\treturn {\n\t\t\t_: function(){\n\t\t\t\tautosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);\n\t\t\t\taddEventListener('resize', debouncedUpdateElementsSizes);\n\t\t\t},\n\t\t\tcheckElems: debouncedUpdateElementsSizes,\n\t\t\tupdateElem: getSizeElement\n\t\t};\n\t})();\n\n\tvar init = function(){\n\t\tif(!init.i && document.getElementsByClassName){\n\t\t\tinit.i = true;\n\t\t\tautoSizer._();\n\t\t\tloader._();\n\t\t}\n\t};\n\n\tsetTimeout(function(){\n\t\tif(lazySizesCfg.init){\n\t\t\tinit();\n\t\t}\n\t});\n\n\tlazysizes = {\n\t\tcfg: lazySizesCfg,\n\t\tautoSizer: autoSizer,\n\t\tloader: loader,\n\t\tinit: init,\n\t\tuP: updatePolyfill,\n\t\taC: addClass,\n\t\trC: removeClass,\n\t\thC: hasClass,\n\t\tfire: triggerEvent,\n\t\tgW: getWidth,\n\t\trAF: rAF,\n\t};\n\n\treturn lazysizes;\n}\n));\n\n\n//# sourceURL=webpack:///./node_modules/lazysizes/lazysizes.js?");

/***/ }),

/***/ "./src/js/Vendor.js":
/*!**************************!*\
  !*** ./src/js/Vendor.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lazysizes */ \"./node_modules/lazysizes/lazysizes.js\");\n/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lazysizes__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./src/js/Vendor.js?");

/***/ })

/******/ });