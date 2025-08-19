import { __commonJS, __require, __toESM as __toESM$1, require_core, require_lib, require_undici } from "../../core-CQ1wL5Ef.js";

//#region ../node_modules/.pnpm/@actions+github@6.0.1/node_modules/@actions/github/lib/context.js
var require_context = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/@actions+github@6.0.1/node_modules/@actions/github/lib/context.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Context = void 0;
	const fs_1 = __require("fs");
	const os_1 = __require("os");
	var Context$2 = class {
		/**
		* Hydrate the context from the environment
		*/
		constructor() {
			var _a, _b, _c;
			this.payload = {};
			if (process.env.GITHUB_EVENT_PATH) if ((0, fs_1.existsSync)(process.env.GITHUB_EVENT_PATH)) this.payload = JSON.parse((0, fs_1.readFileSync)(process.env.GITHUB_EVENT_PATH, { encoding: "utf8" }));
			else {
				const path = process.env.GITHUB_EVENT_PATH;
				process.stdout.write(`GITHUB_EVENT_PATH ${path} does not exist${os_1.EOL}`);
			}
			this.eventName = process.env.GITHUB_EVENT_NAME;
			this.sha = process.env.GITHUB_SHA;
			this.ref = process.env.GITHUB_REF;
			this.workflow = process.env.GITHUB_WORKFLOW;
			this.action = process.env.GITHUB_ACTION;
			this.actor = process.env.GITHUB_ACTOR;
			this.job = process.env.GITHUB_JOB;
			this.runAttempt = parseInt(process.env.GITHUB_RUN_ATTEMPT, 10);
			this.runNumber = parseInt(process.env.GITHUB_RUN_NUMBER, 10);
			this.runId = parseInt(process.env.GITHUB_RUN_ID, 10);
			this.apiUrl = (_a = process.env.GITHUB_API_URL) !== null && _a !== void 0 ? _a : `https://api.github.com`;
			this.serverUrl = (_b = process.env.GITHUB_SERVER_URL) !== null && _b !== void 0 ? _b : `https://github.com`;
			this.graphqlUrl = (_c = process.env.GITHUB_GRAPHQL_URL) !== null && _c !== void 0 ? _c : `https://api.github.com/graphql`;
		}
		get issue() {
			const payload = this.payload;
			return Object.assign(Object.assign({}, this.repo), { number: (payload.issue || payload.pull_request || payload).number });
		}
		get repo() {
			if (process.env.GITHUB_REPOSITORY) {
				const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
				return {
					owner,
					repo
				};
			}
			if (this.payload.repository) return {
				owner: this.payload.repository.owner.login,
				repo: this.payload.repository.name
			};
			throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'");
		}
	};
	exports.Context = Context$2;
}) });

//#endregion
//#region ../node_modules/.pnpm/@actions+github@6.0.1/node_modules/@actions/github/lib/internal/utils.js
var require_utils$1 = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/@actions+github@6.0.1/node_modules/@actions/github/lib/internal/utils.js": ((exports) => {
	var __createBinding$2 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault$2 = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar$2 = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$2(result, mod, k);
		}
		__setModuleDefault$2(result, mod);
		return result;
	};
	var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getApiBaseUrl = exports.getProxyFetch = exports.getProxyAgentDispatcher = exports.getProxyAgent = exports.getAuthString = void 0;
	const httpClient = __importStar$2(require_lib());
	const undici_1 = require_undici();
	function getAuthString(token, options) {
		if (!token && !options.auth) throw new Error("Parameter token or opts.auth is required");
		else if (token && options.auth) throw new Error("Parameters token and opts.auth may not both be specified");
		return typeof options.auth === "string" ? options.auth : `token ${token}`;
	}
	exports.getAuthString = getAuthString;
	function getProxyAgent(destinationUrl) {
		const hc = new httpClient.HttpClient();
		return hc.getAgent(destinationUrl);
	}
	exports.getProxyAgent = getProxyAgent;
	function getProxyAgentDispatcher(destinationUrl) {
		const hc = new httpClient.HttpClient();
		return hc.getAgentDispatcher(destinationUrl);
	}
	exports.getProxyAgentDispatcher = getProxyAgentDispatcher;
	function getProxyFetch(destinationUrl) {
		const httpDispatcher = getProxyAgentDispatcher(destinationUrl);
		const proxyFetch = (url, opts) => __awaiter(this, void 0, void 0, function* () {
			return (0, undici_1.fetch)(url, Object.assign(Object.assign({}, opts), { dispatcher: httpDispatcher }));
		});
		return proxyFetch;
	}
	exports.getProxyFetch = getProxyFetch;
	function getApiBaseUrl() {
		return process.env["GITHUB_API_URL"] || "https://api.github.com";
	}
	exports.getApiBaseUrl = getApiBaseUrl;
}) });

//#endregion
//#region ../node_modules/.pnpm/universal-user-agent@6.0.1/node_modules/universal-user-agent/dist-node/index.js
var require_dist_node$9 = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/universal-user-agent@6.0.1/node_modules/universal-user-agent/dist-node/index.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function getUserAgent() {
		if (typeof navigator === "object" && "userAgent" in navigator) return navigator.userAgent;
		if (typeof process === "object" && process.version !== void 0) return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
		return "<environment undetectable>";
	}
	exports.getUserAgent = getUserAgent;
}) });

//#endregion
//#region ../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/lib/register.js
var require_register = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/lib/register.js": ((exports, module) => {
	module.exports = register$1;
	function register$1(state, name, method, options) {
		if (typeof method !== "function") throw new Error("method for before hook must be a function");
		if (!options) options = {};
		if (Array.isArray(name)) return name.reverse().reduce(function(callback, name$1) {
			return register$1.bind(null, state, name$1, callback, options);
		}, method)();
		return Promise.resolve().then(function() {
			if (!state.registry[name]) return method(options);
			return state.registry[name].reduce(function(method$1, registered) {
				return registered.hook.bind(null, method$1, options);
			}, method)();
		});
	}
}) });

//#endregion
//#region ../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/lib/add.js
var require_add = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/lib/add.js": ((exports, module) => {
	module.exports = addHook$1;
	function addHook$1(state, kind, name, hook$1) {
		var orig = hook$1;
		if (!state.registry[name]) state.registry[name] = [];
		if (kind === "before") hook$1 = function(method, options) {
			return Promise.resolve().then(orig.bind(null, options)).then(method.bind(null, options));
		};
		if (kind === "after") hook$1 = function(method, options) {
			var result;
			return Promise.resolve().then(method.bind(null, options)).then(function(result_) {
				result = result_;
				return orig(result, options);
			}).then(function() {
				return result;
			});
		};
		if (kind === "error") hook$1 = function(method, options) {
			return Promise.resolve().then(method.bind(null, options)).catch(function(error) {
				return orig(error, options);
			});
		};
		state.registry[name].push({
			hook: hook$1,
			orig
		});
	}
}) });

//#endregion
//#region ../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/lib/remove.js
var require_remove = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/lib/remove.js": ((exports, module) => {
	module.exports = removeHook$1;
	function removeHook$1(state, name, method) {
		if (!state.registry[name]) return;
		var index = state.registry[name].map(function(registered) {
			return registered.orig;
		}).indexOf(method);
		if (index === -1) return;
		state.registry[name].splice(index, 1);
	}
}) });

//#endregion
//#region ../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/index.js
var require_before_after_hook = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/index.js": ((exports, module) => {
	var register = require_register();
	var addHook = require_add();
	var removeHook = require_remove();
	var bind = Function.bind;
	var bindable = bind.bind(bind);
	function bindApi(hook$1, state, name) {
		var removeHookRef = bindable(removeHook, null).apply(null, name ? [state, name] : [state]);
		hook$1.api = { remove: removeHookRef };
		hook$1.remove = removeHookRef;
		[
			"before",
			"error",
			"after",
			"wrap"
		].forEach(function(kind) {
			var args = name ? [
				state,
				kind,
				name
			] : [state, kind];
			hook$1[kind] = hook$1.api[kind] = bindable(addHook, null).apply(null, args);
		});
	}
	function HookSingular() {
		var singularHookName = "h";
		var singularHookState = { registry: {} };
		var singularHook = register.bind(null, singularHookState, singularHookName);
		bindApi(singularHook, singularHookState, singularHookName);
		return singularHook;
	}
	function HookCollection() {
		var state = { registry: {} };
		var hook$1 = register.bind(null, state);
		bindApi(hook$1, state);
		return hook$1;
	}
	var collectionHookDeprecationMessageDisplayed = false;
	function Hook() {
		if (!collectionHookDeprecationMessageDisplayed) {
			console.warn("[before-after-hook]: \"Hook()\" repurposing warning, use \"Hook.Collection()\". Read more: https://git.io/upgrade-before-after-hook-to-1.4");
			collectionHookDeprecationMessageDisplayed = true;
		}
		return HookCollection();
	}
	Hook.Singular = HookSingular.bind();
	Hook.Collection = HookCollection.bind();
	module.exports = Hook;
	module.exports.Hook = Hook;
	module.exports.Singular = Hook.Singular;
	module.exports.Collection = Hook.Collection;
}) });

//#endregion
//#region ../node_modules/.pnpm/@octokit+endpoint@9.0.6/node_modules/@octokit/endpoint/dist-node/index.js
var require_dist_node$8 = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/@octokit+endpoint@9.0.6/node_modules/@octokit/endpoint/dist-node/index.js": ((exports, module) => {
	var __defProp$7 = Object.defineProperty;
	var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$7 = Object.getOwnPropertyNames;
	var __hasOwnProp$7 = Object.prototype.hasOwnProperty;
	var __export$7 = (target, all) => {
		for (var name in all) __defProp$7(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps$7 = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames$7(from)) if (!__hasOwnProp$7.call(to, key) && key !== except) __defProp$7(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc$7(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS$7 = (mod) => __copyProps$7(__defProp$7({}, "__esModule", { value: true }), mod);
	var dist_src_exports$5 = {};
	__export$7(dist_src_exports$5, { endpoint: () => endpoint });
	module.exports = __toCommonJS$7(dist_src_exports$5);
	var import_universal_user_agent$3 = require_dist_node$9();
	var VERSION$5 = "9.0.6";
	var userAgent = `octokit-endpoint.js/${VERSION$5} ${(0, import_universal_user_agent$3.getUserAgent)()}`;
	var DEFAULTS = {
		method: "GET",
		baseUrl: "https://api.github.com",
		headers: {
			accept: "application/vnd.github.v3+json",
			"user-agent": userAgent
		},
		mediaType: { format: "" }
	};
	function lowercaseKeys(object) {
		if (!object) return {};
		return Object.keys(object).reduce((newObj, key) => {
			newObj[key.toLowerCase()] = object[key];
			return newObj;
		}, {});
	}
	function isPlainObject$1(value) {
		if (typeof value !== "object" || value === null) return false;
		if (Object.prototype.toString.call(value) !== "[object Object]") return false;
		const proto = Object.getPrototypeOf(value);
		if (proto === null) return true;
		const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
		return typeof Ctor === "function" && Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value);
	}
	function mergeDeep(defaults, options) {
		const result = Object.assign({}, defaults);
		Object.keys(options).forEach((key) => {
			if (isPlainObject$1(options[key])) if (!(key in defaults)) Object.assign(result, { [key]: options[key] });
			else result[key] = mergeDeep(defaults[key], options[key]);
			else Object.assign(result, { [key]: options[key] });
		});
		return result;
	}
	function removeUndefinedProperties(obj) {
		for (const key in obj) if (obj[key] === void 0) delete obj[key];
		return obj;
	}
	function merge(defaults, route, options) {
		if (typeof route === "string") {
			let [method, url] = route.split(" ");
			options = Object.assign(url ? {
				method,
				url
			} : { url: method }, options);
		} else options = Object.assign({}, route);
		options.headers = lowercaseKeys(options.headers);
		removeUndefinedProperties(options);
		removeUndefinedProperties(options.headers);
		const mergedOptions = mergeDeep(defaults || {}, options);
		if (options.url === "/graphql") {
			if (defaults && defaults.mediaType.previews?.length) mergedOptions.mediaType.previews = defaults.mediaType.previews.filter((preview) => !mergedOptions.mediaType.previews.includes(preview)).concat(mergedOptions.mediaType.previews);
			mergedOptions.mediaType.previews = (mergedOptions.mediaType.previews || []).map((preview) => preview.replace(/-preview/, ""));
		}
		return mergedOptions;
	}
	function addQueryParameters(url, parameters) {
		const separator = /\?/.test(url) ? "&" : "?";
		const names = Object.keys(parameters);
		if (names.length === 0) return url;
		return url + separator + names.map((name) => {
			if (name === "q") return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
			return `${name}=${encodeURIComponent(parameters[name])}`;
		}).join("&");
	}
	var urlVariableRegex = /\{[^{}}]+\}/g;
	function removeNonChars(variableName) {
		return variableName.replace(/(?:^\W+)|(?:(?<!\W)\W+$)/g, "").split(/,/);
	}
	function extractUrlVariableNames(url) {
		const matches = url.match(urlVariableRegex);
		if (!matches) return [];
		return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
	}
	function omit(object, keysToOmit) {
		const result = { __proto__: null };
		for (const key of Object.keys(object)) if (keysToOmit.indexOf(key) === -1) result[key] = object[key];
		return result;
	}
	function encodeReserved(str) {
		return str.split(/(%[0-9A-Fa-f]{2})/g).map(function(part) {
			if (!/%[0-9A-Fa-f]/.test(part)) part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
			return part;
		}).join("");
	}
	function encodeUnreserved(str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
			return "%" + c.charCodeAt(0).toString(16).toUpperCase();
		});
	}
	function encodeValue(operator, value, key) {
		value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);
		if (key) return encodeUnreserved(key) + "=" + value;
		else return value;
	}
	function isDefined(value) {
		return value !== void 0 && value !== null;
	}
	function isKeyOperator(operator) {
		return operator === ";" || operator === "&" || operator === "?";
	}
	function getValues(context$1, operator, key, modifier) {
		var value = context$1[key], result = [];
		if (isDefined(value) && value !== "") if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
			value = value.toString();
			if (modifier && modifier !== "*") value = value.substring(0, parseInt(modifier, 10));
			result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
		} else if (modifier === "*") if (Array.isArray(value)) value.filter(isDefined).forEach(function(value2) {
			result.push(encodeValue(operator, value2, isKeyOperator(operator) ? key : ""));
		});
		else Object.keys(value).forEach(function(k) {
			if (isDefined(value[k])) result.push(encodeValue(operator, value[k], k));
		});
		else {
			const tmp = [];
			if (Array.isArray(value)) value.filter(isDefined).forEach(function(value2) {
				tmp.push(encodeValue(operator, value2));
			});
			else Object.keys(value).forEach(function(k) {
				if (isDefined(value[k])) {
					tmp.push(encodeUnreserved(k));
					tmp.push(encodeValue(operator, value[k].toString()));
				}
			});
			if (isKeyOperator(operator)) result.push(encodeUnreserved(key) + "=" + tmp.join(","));
			else if (tmp.length !== 0) result.push(tmp.join(","));
		}
		else if (operator === ";") {
			if (isDefined(value)) result.push(encodeUnreserved(key));
		} else if (value === "" && (operator === "&" || operator === "?")) result.push(encodeUnreserved(key) + "=");
		else if (value === "") result.push("");
		return result;
	}
	function parseUrl(template) {
		return { expand: expand.bind(null, template) };
	}
	function expand(template, context$1) {
		var operators = [
			"+",
			"#",
			".",
			"/",
			";",
			"?",
			"&"
		];
		template = template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function(_, expression, literal) {
			if (expression) {
				let operator = "";
				const values = [];
				if (operators.indexOf(expression.charAt(0)) !== -1) {
					operator = expression.charAt(0);
					expression = expression.substr(1);
				}
				expression.split(/,/g).forEach(function(variable) {
					var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
					values.push(getValues(context$1, operator, tmp[1], tmp[2] || tmp[3]));
				});
				if (operator && operator !== "+") {
					var separator = ",";
					if (operator === "?") separator = "&";
					else if (operator !== "#") separator = operator;
					return (values.length !== 0 ? operator : "") + values.join(separator);
				} else return values.join(",");
			} else return encodeReserved(literal);
		});
		if (template === "/") return template;
		else return template.replace(/\/$/, "");
	}
	function parse(options) {
		let method = options.method.toUpperCase();
		let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
		let headers = Object.assign({}, options.headers);
		let body;
		let parameters = omit(options, [
			"method",
			"baseUrl",
			"url",
			"headers",
			"request",
			"mediaType"
		]);
		const urlVariableNames = extractUrlVariableNames(url);
		url = parseUrl(url).expand(parameters);
		if (!/^http/.test(url)) url = options.baseUrl + url;
		const omittedParameters = Object.keys(options).filter((option) => urlVariableNames.includes(option)).concat("baseUrl");
		const remainingParameters = omit(parameters, omittedParameters);
		const isBinaryRequest = /application\/octet-stream/i.test(headers.accept);
		if (!isBinaryRequest) {
			if (options.mediaType.format) headers.accept = headers.accept.split(/,/).map((format) => format.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${options.mediaType.format}`)).join(",");
			if (url.endsWith("/graphql")) {
				if (options.mediaType.previews?.length) {
					const previewsFromAcceptHeader = headers.accept.match(/(?<![\w-])[\w-]+(?=-preview)/g) || [];
					headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map((preview) => {
						const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
						return `application/vnd.github.${preview}-preview${format}`;
					}).join(",");
				}
			}
		}
		if (["GET", "HEAD"].includes(method)) url = addQueryParameters(url, remainingParameters);
		else if ("data" in remainingParameters) body = remainingParameters.data;
		else if (Object.keys(remainingParameters).length) body = remainingParameters;
		if (!headers["content-type"] && typeof body !== "undefined") headers["content-type"] = "application/json; charset=utf-8";
		if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") body = "";
		return Object.assign({
			method,
			url,
			headers
		}, typeof body !== "undefined" ? { body } : null, options.request ? { request: options.request } : null);
	}
	function endpointWithDefaults(defaults, route, options) {
		return parse(merge(defaults, route, options));
	}
	function withDefaults$2(oldDefaults, newDefaults) {
		const DEFAULTS2 = merge(oldDefaults, newDefaults);
		const endpoint2 = endpointWithDefaults.bind(null, DEFAULTS2);
		return Object.assign(endpoint2, {
			DEFAULTS: DEFAULTS2,
			defaults: withDefaults$2.bind(null, DEFAULTS2),
			merge: merge.bind(null, DEFAULTS2),
			parse
		});
	}
	var endpoint = withDefaults$2(null, DEFAULTS);
}) });

//#endregion
//#region ../node_modules/.pnpm/deprecation@2.3.1/node_modules/deprecation/dist-node/index.js
var require_dist_node$7 = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/deprecation@2.3.1/node_modules/deprecation/dist-node/index.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Deprecation = class extends Error {
		constructor(message) {
			super(message);
			/* istanbul ignore next */
			if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
			this.name = "Deprecation";
		}
	};
	exports.Deprecation = Deprecation;
}) });

//#endregion
//#region ../node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js
var require_wrappy = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js": ((exports, module) => {
	module.exports = wrappy$1;
	function wrappy$1(fn, cb) {
		if (fn && cb) return wrappy$1(fn)(cb);
		if (typeof fn !== "function") throw new TypeError("need wrapper function");
		Object.keys(fn).forEach(function(k) {
			wrapper[k] = fn[k];
		});
		return wrapper;
		function wrapper() {
			var args = new Array(arguments.length);
			for (var i = 0; i < args.length; i++) args[i] = arguments[i];
			var ret = fn.apply(this, args);
			var cb$1 = args[args.length - 1];
			if (typeof ret === "function" && ret !== cb$1) Object.keys(cb$1).forEach(function(k) {
				ret[k] = cb$1[k];
			});
			return ret;
		}
	}
}) });

//#endregion
//#region ../node_modules/.pnpm/once@1.4.0/node_modules/once/once.js
var require_once = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/once@1.4.0/node_modules/once/once.js": ((exports, module) => {
	var wrappy = require_wrappy();
	module.exports = wrappy(once);
	module.exports.strict = wrappy(onceStrict);
	once.proto = once(function() {
		Object.defineProperty(Function.prototype, "once", {
			value: function() {
				return once(this);
			},
			configurable: true
		});
		Object.defineProperty(Function.prototype, "onceStrict", {
			value: function() {
				return onceStrict(this);
			},
			configurable: true
		});
	});
	function once(fn) {
		var f = function() {
			if (f.called) return f.value;
			f.called = true;
			return f.value = fn.apply(this, arguments);
		};
		f.called = false;
		return f;
	}
	function onceStrict(fn) {
		var f = function() {
			if (f.called) throw new Error(f.onceError);
			f.called = true;
			return f.value = fn.apply(this, arguments);
		};
		var name = fn.name || "Function wrapped with `once`";
		f.onceError = name + " shouldn't be called more than once";
		f.called = false;
		return f;
	}
}) });

//#endregion
//#region ../node_modules/.pnpm/@octokit+request-error@5.1.1/node_modules/@octokit/request-error/dist-node/index.js
var require_dist_node$6 = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/@octokit+request-error@5.1.1/node_modules/@octokit/request-error/dist-node/index.js": ((exports, module) => {
	var __create = Object.create;
	var __defProp$6 = Object.defineProperty;
	var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$6 = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
	var __export$6 = (target, all) => {
		for (var name in all) __defProp$6(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps$6 = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames$6(from)) if (!__hasOwnProp$6.call(to, key) && key !== except) __defProp$6(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc$6(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps$6(isNodeMode || !mod || !mod.__esModule ? __defProp$6(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	var __toCommonJS$6 = (mod) => __copyProps$6(__defProp$6({}, "__esModule", { value: true }), mod);
	var dist_src_exports$4 = {};
	__export$6(dist_src_exports$4, { RequestError: () => RequestError });
	module.exports = __toCommonJS$6(dist_src_exports$4);
	var import_deprecation = require_dist_node$7();
	var import_once = __toESM(require_once());
	var logOnceCode = (0, import_once.default)((deprecation) => console.warn(deprecation));
	var logOnceHeaders = (0, import_once.default)((deprecation) => console.warn(deprecation));
	var RequestError = class extends Error {
		constructor(message, statusCode, options) {
			super(message);
			if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
			this.name = "HttpError";
			this.status = statusCode;
			let headers;
			if ("headers" in options && typeof options.headers !== "undefined") headers = options.headers;
			if ("response" in options) {
				this.response = options.response;
				headers = options.response.headers;
			}
			const requestCopy = Object.assign({}, options.request);
			if (options.request.headers.authorization) requestCopy.headers = Object.assign({}, options.request.headers, { authorization: options.request.headers.authorization.replace(/(?<! ) .*$/, " [REDACTED]") });
			requestCopy.url = requestCopy.url.replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]").replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
			this.request = requestCopy;
			Object.defineProperty(this, "code", { get() {
				logOnceCode(new import_deprecation.Deprecation("[@octokit/request-error] `error.code` is deprecated, use `error.status`."));
				return statusCode;
			} });
			Object.defineProperty(this, "headers", { get() {
				logOnceHeaders(new import_deprecation.Deprecation("[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`."));
				return headers || {};
			} });
		}
	};
}) });

//#endregion
//#region ../node_modules/.pnpm/@octokit+request@8.4.1/node_modules/@octokit/request/dist-node/index.js
var require_dist_node$5 = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/@octokit+request@8.4.1/node_modules/@octokit/request/dist-node/index.js": ((exports, module) => {
	var __defProp$5 = Object.defineProperty;
	var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$5 = Object.getOwnPropertyNames;
	var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
	var __export$5 = (target, all) => {
		for (var name in all) __defProp$5(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps$5 = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames$5(from)) if (!__hasOwnProp$5.call(to, key) && key !== except) __defProp$5(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc$5(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS$5 = (mod) => __copyProps$5(__defProp$5({}, "__esModule", { value: true }), mod);
	var dist_src_exports$3 = {};
	__export$5(dist_src_exports$3, { request: () => request });
	module.exports = __toCommonJS$5(dist_src_exports$3);
	var import_endpoint = require_dist_node$8();
	var import_universal_user_agent$2 = require_dist_node$9();
	var VERSION$4 = "8.4.1";
	function isPlainObject(value) {
		if (typeof value !== "object" || value === null) return false;
		if (Object.prototype.toString.call(value) !== "[object Object]") return false;
		const proto = Object.getPrototypeOf(value);
		if (proto === null) return true;
		const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
		return typeof Ctor === "function" && Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value);
	}
	var import_request_error = require_dist_node$6();
	function getBufferResponse(response) {
		return response.arrayBuffer();
	}
	function fetchWrapper(requestOptions) {
		var _a, _b, _c, _d;
		const log = requestOptions.request && requestOptions.request.log ? requestOptions.request.log : console;
		const parseSuccessResponseBody = ((_a = requestOptions.request) == null ? void 0 : _a.parseSuccessResponseBody) !== false;
		if (isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) requestOptions.body = JSON.stringify(requestOptions.body);
		let headers = {};
		let status;
		let url;
		let { fetch } = globalThis;
		if ((_b = requestOptions.request) == null ? void 0 : _b.fetch) fetch = requestOptions.request.fetch;
		if (!fetch) throw new Error("fetch is not set. Please pass a fetch implementation as new Octokit({ request: { fetch }}). Learn more at https://github.com/octokit/octokit.js/#fetch-missing");
		return fetch(requestOptions.url, {
			method: requestOptions.method,
			body: requestOptions.body,
			redirect: (_c = requestOptions.request) == null ? void 0 : _c.redirect,
			headers: requestOptions.headers,
			signal: (_d = requestOptions.request) == null ? void 0 : _d.signal,
			...requestOptions.body && { duplex: "half" }
		}).then(async (response) => {
			url = response.url;
			status = response.status;
			for (const keyAndValue of response.headers) headers[keyAndValue[0]] = keyAndValue[1];
			if ("deprecation" in headers) {
				const matches = headers.link && headers.link.match(/<([^<>]+)>; rel="deprecation"/);
				const deprecationLink = matches && matches.pop();
				log.warn(`[@octokit/request] "${requestOptions.method} ${requestOptions.url}" is deprecated. It is scheduled to be removed on ${headers.sunset}${deprecationLink ? `. See ${deprecationLink}` : ""}`);
			}
			if (status === 204 || status === 205) return;
			if (requestOptions.method === "HEAD") {
				if (status < 400) return;
				throw new import_request_error.RequestError(response.statusText, status, {
					response: {
						url,
						status,
						headers,
						data: void 0
					},
					request: requestOptions
				});
			}
			if (status === 304) throw new import_request_error.RequestError("Not modified", status, {
				response: {
					url,
					status,
					headers,
					data: await getResponseData(response)
				},
				request: requestOptions
			});
			if (status >= 400) {
				const data = await getResponseData(response);
				const error = new import_request_error.RequestError(toErrorMessage(data), status, {
					response: {
						url,
						status,
						headers,
						data
					},
					request: requestOptions
				});
				throw error;
			}
			return parseSuccessResponseBody ? await getResponseData(response) : response.body;
		}).then((data) => {
			return {
				status,
				url,
				headers,
				data
			};
		}).catch((error) => {
			if (error instanceof import_request_error.RequestError) throw error;
			else if (error.name === "AbortError") throw error;
			let message = error.message;
			if (error.name === "TypeError" && "cause" in error) {
				if (error.cause instanceof Error) message = error.cause.message;
				else if (typeof error.cause === "string") message = error.cause;
			}
			throw new import_request_error.RequestError(message, 500, { request: requestOptions });
		});
	}
	async function getResponseData(response) {
		const contentType = response.headers.get("content-type");
		if (/application\/json/.test(contentType)) return response.json().catch(() => response.text()).catch(() => "");
		if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) return response.text();
		return getBufferResponse(response);
	}
	function toErrorMessage(data) {
		if (typeof data === "string") return data;
		let suffix;
		if ("documentation_url" in data) suffix = ` - ${data.documentation_url}`;
		else suffix = "";
		if ("message" in data) {
			if (Array.isArray(data.errors)) return `${data.message}: ${data.errors.map(JSON.stringify).join(", ")}${suffix}`;
			return `${data.message}${suffix}`;
		}
		return `Unknown error: ${JSON.stringify(data)}`;
	}
	function withDefaults$1(oldEndpoint, newDefaults) {
		const endpoint2 = oldEndpoint.defaults(newDefaults);
		const newApi = function(route, parameters) {
			const endpointOptions = endpoint2.merge(route, parameters);
			if (!endpointOptions.request || !endpointOptions.request.hook) return fetchWrapper(endpoint2.parse(endpointOptions));
			const request2 = (route2, parameters2) => {
				return fetchWrapper(endpoint2.parse(endpoint2.merge(route2, parameters2)));
			};
			Object.assign(request2, {
				endpoint: endpoint2,
				defaults: withDefaults$1.bind(null, endpoint2)
			});
			return endpointOptions.request.hook(request2, endpointOptions);
		};
		return Object.assign(newApi, {
			endpoint: endpoint2,
			defaults: withDefaults$1.bind(null, endpoint2)
		});
	}
	var request = withDefaults$1(import_endpoint.endpoint, { headers: { "user-agent": `octokit-request.js/${VERSION$4} ${(0, import_universal_user_agent$2.getUserAgent)()}` } });
}) });

//#endregion
//#region ../node_modules/.pnpm/@octokit+graphql@7.1.1/node_modules/@octokit/graphql/dist-node/index.js
var require_dist_node$4 = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/@octokit+graphql@7.1.1/node_modules/@octokit/graphql/dist-node/index.js": ((exports, module) => {
	var __defProp$4 = Object.defineProperty;
	var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$4 = Object.getOwnPropertyNames;
	var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
	var __export$4 = (target, all) => {
		for (var name in all) __defProp$4(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps$4 = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames$4(from)) if (!__hasOwnProp$4.call(to, key) && key !== except) __defProp$4(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc$4(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS$4 = (mod) => __copyProps$4(__defProp$4({}, "__esModule", { value: true }), mod);
	var index_exports$1 = {};
	__export$4(index_exports$1, {
		GraphqlResponseError: () => GraphqlResponseError,
		graphql: () => graphql2,
		withCustomRequest: () => withCustomRequest
	});
	module.exports = __toCommonJS$4(index_exports$1);
	var import_request3 = require_dist_node$5();
	var import_universal_user_agent$1 = require_dist_node$9();
	var VERSION$3 = "7.1.1";
	require_dist_node$5();
	require_dist_node$5();
	function _buildMessageForResponseErrors(data) {
		return `Request failed due to following response errors:
` + data.errors.map((e) => ` - ${e.message}`).join("\n");
	}
	var GraphqlResponseError = class extends Error {
		constructor(request2, headers, response) {
			super(_buildMessageForResponseErrors(response));
			this.request = request2;
			this.headers = headers;
			this.response = response;
			this.name = "GraphqlResponseError";
			this.errors = response.errors;
			this.data = response.data;
			if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
		}
	};
	var NON_VARIABLE_OPTIONS = [
		"method",
		"baseUrl",
		"url",
		"headers",
		"request",
		"query",
		"mediaType"
	];
	var FORBIDDEN_VARIABLE_OPTIONS = [
		"query",
		"method",
		"url"
	];
	var GHES_V3_SUFFIX_REGEX = /\/api\/v3\/?$/;
	function graphql(request2, query, options) {
		if (options) {
			if (typeof query === "string" && "query" in options) return Promise.reject(/* @__PURE__ */ new Error(`[@octokit/graphql] "query" cannot be used as variable name`));
			for (const key in options) {
				if (!FORBIDDEN_VARIABLE_OPTIONS.includes(key)) continue;
				return Promise.reject(/* @__PURE__ */ new Error(`[@octokit/graphql] "${key}" cannot be used as variable name`));
			}
		}
		const parsedOptions = typeof query === "string" ? Object.assign({ query }, options) : query;
		const requestOptions = Object.keys(parsedOptions).reduce((result, key) => {
			if (NON_VARIABLE_OPTIONS.includes(key)) {
				result[key] = parsedOptions[key];
				return result;
			}
			if (!result.variables) result.variables = {};
			result.variables[key] = parsedOptions[key];
			return result;
		}, {});
		const baseUrl$1 = parsedOptions.baseUrl || request2.endpoint.DEFAULTS.baseUrl;
		if (GHES_V3_SUFFIX_REGEX.test(baseUrl$1)) requestOptions.url = baseUrl$1.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
		return request2(requestOptions).then((response) => {
			if (response.data.errors) {
				const headers = {};
				for (const key of Object.keys(response.headers)) headers[key] = response.headers[key];
				throw new GraphqlResponseError(requestOptions, headers, response.data);
			}
			return response.data.data;
		});
	}
	function withDefaults(request2, newDefaults) {
		const newRequest = request2.defaults(newDefaults);
		const newApi = (query, options) => {
			return graphql(newRequest, query, options);
		};
		return Object.assign(newApi, {
			defaults: withDefaults.bind(null, newRequest),
			endpoint: newRequest.endpoint
		});
	}
	var graphql2 = withDefaults(import_request3.request, {
		headers: { "user-agent": `octokit-graphql.js/${VERSION$3} ${(0, import_universal_user_agent$1.getUserAgent)()}` },
		method: "POST",
		url: "/graphql"
	});
	function withCustomRequest(customRequest) {
		return withDefaults(customRequest, {
			method: "POST",
			url: "/graphql"
		});
	}
}) });

//#endregion
//#region ../node_modules/.pnpm/@octokit+auth-token@4.0.0/node_modules/@octokit/auth-token/dist-node/index.js
var require_dist_node$3 = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/@octokit+auth-token@4.0.0/node_modules/@octokit/auth-token/dist-node/index.js": ((exports, module) => {
	var __defProp$3 = Object.defineProperty;
	var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$3 = Object.getOwnPropertyNames;
	var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
	var __export$3 = (target, all) => {
		for (var name in all) __defProp$3(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps$3 = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames$3(from)) if (!__hasOwnProp$3.call(to, key) && key !== except) __defProp$3(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc$3(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS$3 = (mod) => __copyProps$3(__defProp$3({}, "__esModule", { value: true }), mod);
	var dist_src_exports$2 = {};
	__export$3(dist_src_exports$2, { createTokenAuth: () => createTokenAuth });
	module.exports = __toCommonJS$3(dist_src_exports$2);
	var REGEX_IS_INSTALLATION_LEGACY = /^v1\./;
	var REGEX_IS_INSTALLATION = /^ghs_/;
	var REGEX_IS_USER_TO_SERVER = /^ghu_/;
	async function auth(token) {
		const isApp = token.split(/\./).length === 3;
		const isInstallation = REGEX_IS_INSTALLATION_LEGACY.test(token) || REGEX_IS_INSTALLATION.test(token);
		const isUserToServer = REGEX_IS_USER_TO_SERVER.test(token);
		const tokenType = isApp ? "app" : isInstallation ? "installation" : isUserToServer ? "user-to-server" : "oauth";
		return {
			type: "token",
			token,
			tokenType
		};
	}
	function withAuthorizationPrefix(token) {
		if (token.split(/\./).length === 3) return `bearer ${token}`;
		return `token ${token}`;
	}
	async function hook(token, request$1, route, parameters) {
		const endpoint$1 = request$1.endpoint.merge(route, parameters);
		endpoint$1.headers.authorization = withAuthorizationPrefix(token);
		return request$1(endpoint$1);
	}
	var createTokenAuth = function createTokenAuth2(token) {
		if (!token) throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
		if (typeof token !== "string") throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");
		token = token.replace(/^(token|bearer) +/i, "");
		return Object.assign(auth.bind(null, token), { hook: hook.bind(null, token) });
	};
}) });

//#endregion
//#region ../node_modules/.pnpm/@octokit+core@5.2.2/node_modules/@octokit/core/dist-node/index.js
var require_dist_node$2 = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/@octokit+core@5.2.2/node_modules/@octokit/core/dist-node/index.js": ((exports, module) => {
	var __defProp$2 = Object.defineProperty;
	var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$2 = Object.getOwnPropertyNames;
	var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
	var __export$2 = (target, all) => {
		for (var name in all) __defProp$2(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps$2 = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames$2(from)) if (!__hasOwnProp$2.call(to, key) && key !== except) __defProp$2(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc$2(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS$2 = (mod) => __copyProps$2(__defProp$2({}, "__esModule", { value: true }), mod);
	var index_exports = {};
	__export$2(index_exports, { Octokit: () => Octokit });
	module.exports = __toCommonJS$2(index_exports);
	var import_universal_user_agent = require_dist_node$9();
	var import_before_after_hook = require_before_after_hook();
	var import_request = require_dist_node$5();
	var import_graphql = require_dist_node$4();
	var import_auth_token = require_dist_node$3();
	var VERSION$2 = "5.2.2";
	var noop = () => {};
	var consoleWarn = console.warn.bind(console);
	var consoleError = console.error.bind(console);
	function createLogger(logger = {}) {
		if (typeof logger.debug !== "function") logger.debug = noop;
		if (typeof logger.info !== "function") logger.info = noop;
		if (typeof logger.warn !== "function") logger.warn = consoleWarn;
		if (typeof logger.error !== "function") logger.error = consoleError;
		return logger;
	}
	var userAgentTrail = `octokit-core.js/${VERSION$2} ${(0, import_universal_user_agent.getUserAgent)()}`;
	var Octokit = class {
		static {
			this.VERSION = VERSION$2;
		}
		static defaults(defaults) {
			const OctokitWithDefaults = class extends this {
				constructor(...args) {
					const options = args[0] || {};
					if (typeof defaults === "function") {
						super(defaults(options));
						return;
					}
					super(Object.assign({}, defaults, options, options.userAgent && defaults.userAgent ? { userAgent: `${options.userAgent} ${defaults.userAgent}` } : null));
				}
			};
			return OctokitWithDefaults;
		}
		static {
			this.plugins = [];
		}
		/**
		* Attach a plugin (or many) to your Octokit instance.
		*
		* @example
		* const API = Octokit.plugin(plugin1, plugin2, plugin3, ...)
		*/
		static plugin(...newPlugins) {
			const currentPlugins = this.plugins;
			const NewOctokit = class extends this {
				static {
					this.plugins = currentPlugins.concat(newPlugins.filter((plugin) => !currentPlugins.includes(plugin)));
				}
			};
			return NewOctokit;
		}
		constructor(options = {}) {
			const hook$1 = new import_before_after_hook.Collection();
			const requestDefaults = {
				baseUrl: import_request.request.endpoint.DEFAULTS.baseUrl,
				headers: {},
				request: Object.assign({}, options.request, { hook: hook$1.bind(null, "request") }),
				mediaType: {
					previews: [],
					format: ""
				}
			};
			requestDefaults.headers["user-agent"] = options.userAgent ? `${options.userAgent} ${userAgentTrail}` : userAgentTrail;
			if (options.baseUrl) requestDefaults.baseUrl = options.baseUrl;
			if (options.previews) requestDefaults.mediaType.previews = options.previews;
			if (options.timeZone) requestDefaults.headers["time-zone"] = options.timeZone;
			this.request = import_request.request.defaults(requestDefaults);
			this.graphql = (0, import_graphql.withCustomRequest)(this.request).defaults(requestDefaults);
			this.log = createLogger(options.log);
			this.hook = hook$1;
			if (!options.authStrategy) if (!options.auth) this.auth = async () => ({ type: "unauthenticated" });
			else {
				const auth$1 = (0, import_auth_token.createTokenAuth)(options.auth);
				hook$1.wrap("request", auth$1.hook);
				this.auth = auth$1;
			}
			else {
				const { authStrategy,...otherOptions } = options;
				const auth$1 = authStrategy(Object.assign({
					request: this.request,
					log: this.log,
					octokit: this,
					octokitOptions: otherOptions
				}, options.auth));
				hook$1.wrap("request", auth$1.hook);
				this.auth = auth$1;
			}
			const classConstructor = this.constructor;
			for (let i = 0; i < classConstructor.plugins.length; ++i) Object.assign(this, classConstructor.plugins[i](this, options));
		}
	};
}) });

//#endregion
//#region ../node_modules/.pnpm/@octokit+plugin-rest-endpoint-methods@10.4.1_@octokit+core@5.2.2/node_modules/@octokit/plugin-rest-endpoint-methods/dist-node/index.js
var require_dist_node$1 = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/@octokit+plugin-rest-endpoint-methods@10.4.1_@octokit+core@5.2.2/node_modules/@octokit/plugin-rest-endpoint-methods/dist-node/index.js": ((exports, module) => {
	var __defProp$1 = Object.defineProperty;
	var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$1 = Object.getOwnPropertyNames;
	var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
	var __export$1 = (target, all) => {
		for (var name in all) __defProp$1(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps$1 = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames$1(from)) if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS$1 = (mod) => __copyProps$1(__defProp$1({}, "__esModule", { value: true }), mod);
	var dist_src_exports$1 = {};
	__export$1(dist_src_exports$1, {
		legacyRestEndpointMethods: () => legacyRestEndpointMethods,
		restEndpointMethods: () => restEndpointMethods
	});
	module.exports = __toCommonJS$1(dist_src_exports$1);
	var VERSION$1 = "10.4.1";
	var Endpoints = {
		actions: {
			addCustomLabelsToSelfHostedRunnerForOrg: ["POST /orgs/{org}/actions/runners/{runner_id}/labels"],
			addCustomLabelsToSelfHostedRunnerForRepo: ["POST /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"],
			addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
			addSelectedRepoToOrgVariable: ["PUT /orgs/{org}/actions/variables/{name}/repositories/{repository_id}"],
			approveWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve"],
			cancelWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel"],
			createEnvironmentVariable: ["POST /repositories/{repository_id}/environments/{environment_name}/variables"],
			createOrUpdateEnvironmentSecret: ["PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
			createOrUpdateOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}"],
			createOrUpdateRepoSecret: ["PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
			createOrgVariable: ["POST /orgs/{org}/actions/variables"],
			createRegistrationTokenForOrg: ["POST /orgs/{org}/actions/runners/registration-token"],
			createRegistrationTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/registration-token"],
			createRemoveTokenForOrg: ["POST /orgs/{org}/actions/runners/remove-token"],
			createRemoveTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/remove-token"],
			createRepoVariable: ["POST /repos/{owner}/{repo}/actions/variables"],
			createWorkflowDispatch: ["POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches"],
			deleteActionsCacheById: ["DELETE /repos/{owner}/{repo}/actions/caches/{cache_id}"],
			deleteActionsCacheByKey: ["DELETE /repos/{owner}/{repo}/actions/caches{?key,ref}"],
			deleteArtifact: ["DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
			deleteEnvironmentSecret: ["DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
			deleteEnvironmentVariable: ["DELETE /repositories/{repository_id}/environments/{environment_name}/variables/{name}"],
			deleteOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}"],
			deleteOrgVariable: ["DELETE /orgs/{org}/actions/variables/{name}"],
			deleteRepoSecret: ["DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
			deleteRepoVariable: ["DELETE /repos/{owner}/{repo}/actions/variables/{name}"],
			deleteSelfHostedRunnerFromOrg: ["DELETE /orgs/{org}/actions/runners/{runner_id}"],
			deleteSelfHostedRunnerFromRepo: ["DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}"],
			deleteWorkflowRun: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}"],
			deleteWorkflowRunLogs: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
			disableSelectedRepositoryGithubActionsOrganization: ["DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}"],
			disableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable"],
			downloadArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}"],
			downloadJobLogsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs"],
			downloadWorkflowRunAttemptLogs: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs"],
			downloadWorkflowRunLogs: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
			enableSelectedRepositoryGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories/{repository_id}"],
			enableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable"],
			forceCancelWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel"],
			generateRunnerJitconfigForOrg: ["POST /orgs/{org}/actions/runners/generate-jitconfig"],
			generateRunnerJitconfigForRepo: ["POST /repos/{owner}/{repo}/actions/runners/generate-jitconfig"],
			getActionsCacheList: ["GET /repos/{owner}/{repo}/actions/caches"],
			getActionsCacheUsage: ["GET /repos/{owner}/{repo}/actions/cache/usage"],
			getActionsCacheUsageByRepoForOrg: ["GET /orgs/{org}/actions/cache/usage-by-repository"],
			getActionsCacheUsageForOrg: ["GET /orgs/{org}/actions/cache/usage"],
			getAllowedActionsOrganization: ["GET /orgs/{org}/actions/permissions/selected-actions"],
			getAllowedActionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions/selected-actions"],
			getArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
			getCustomOidcSubClaimForRepo: ["GET /repos/{owner}/{repo}/actions/oidc/customization/sub"],
			getEnvironmentPublicKey: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key"],
			getEnvironmentSecret: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
			getEnvironmentVariable: ["GET /repositories/{repository_id}/environments/{environment_name}/variables/{name}"],
			getGithubActionsDefaultWorkflowPermissionsOrganization: ["GET /orgs/{org}/actions/permissions/workflow"],
			getGithubActionsDefaultWorkflowPermissionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions/workflow"],
			getGithubActionsPermissionsOrganization: ["GET /orgs/{org}/actions/permissions"],
			getGithubActionsPermissionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions"],
			getJobForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}"],
			getOrgPublicKey: ["GET /orgs/{org}/actions/secrets/public-key"],
			getOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}"],
			getOrgVariable: ["GET /orgs/{org}/actions/variables/{name}"],
			getPendingDeploymentsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
			getRepoPermissions: [
				"GET /repos/{owner}/{repo}/actions/permissions",
				{},
				{ renamed: ["actions", "getGithubActionsPermissionsRepository"] }
			],
			getRepoPublicKey: ["GET /repos/{owner}/{repo}/actions/secrets/public-key"],
			getRepoSecret: ["GET /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
			getRepoVariable: ["GET /repos/{owner}/{repo}/actions/variables/{name}"],
			getReviewsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals"],
			getSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}"],
			getSelfHostedRunnerForRepo: ["GET /repos/{owner}/{repo}/actions/runners/{runner_id}"],
			getWorkflow: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}"],
			getWorkflowAccessToRepository: ["GET /repos/{owner}/{repo}/actions/permissions/access"],
			getWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}"],
			getWorkflowRunAttempt: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}"],
			getWorkflowRunUsage: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing"],
			getWorkflowUsage: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing"],
			listArtifactsForRepo: ["GET /repos/{owner}/{repo}/actions/artifacts"],
			listEnvironmentSecrets: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets"],
			listEnvironmentVariables: ["GET /repositories/{repository_id}/environments/{environment_name}/variables"],
			listJobsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs"],
			listJobsForWorkflowRunAttempt: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs"],
			listLabelsForSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}/labels"],
			listLabelsForSelfHostedRunnerForRepo: ["GET /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"],
			listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
			listOrgVariables: ["GET /orgs/{org}/actions/variables"],
			listRepoOrganizationSecrets: ["GET /repos/{owner}/{repo}/actions/organization-secrets"],
			listRepoOrganizationVariables: ["GET /repos/{owner}/{repo}/actions/organization-variables"],
			listRepoSecrets: ["GET /repos/{owner}/{repo}/actions/secrets"],
			listRepoVariables: ["GET /repos/{owner}/{repo}/actions/variables"],
			listRepoWorkflows: ["GET /repos/{owner}/{repo}/actions/workflows"],
			listRunnerApplicationsForOrg: ["GET /orgs/{org}/actions/runners/downloads"],
			listRunnerApplicationsForRepo: ["GET /repos/{owner}/{repo}/actions/runners/downloads"],
			listSelectedReposForOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}/repositories"],
			listSelectedReposForOrgVariable: ["GET /orgs/{org}/actions/variables/{name}/repositories"],
			listSelectedRepositoriesEnabledGithubActionsOrganization: ["GET /orgs/{org}/actions/permissions/repositories"],
			listSelfHostedRunnersForOrg: ["GET /orgs/{org}/actions/runners"],
			listSelfHostedRunnersForRepo: ["GET /repos/{owner}/{repo}/actions/runners"],
			listWorkflowRunArtifacts: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts"],
			listWorkflowRuns: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs"],
			listWorkflowRunsForRepo: ["GET /repos/{owner}/{repo}/actions/runs"],
			reRunJobForWorkflowRun: ["POST /repos/{owner}/{repo}/actions/jobs/{job_id}/rerun"],
			reRunWorkflow: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun"],
			reRunWorkflowFailedJobs: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs"],
			removeAllCustomLabelsFromSelfHostedRunnerForOrg: ["DELETE /orgs/{org}/actions/runners/{runner_id}/labels"],
			removeAllCustomLabelsFromSelfHostedRunnerForRepo: ["DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"],
			removeCustomLabelFromSelfHostedRunnerForOrg: ["DELETE /orgs/{org}/actions/runners/{runner_id}/labels/{name}"],
			removeCustomLabelFromSelfHostedRunnerForRepo: ["DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}"],
			removeSelectedRepoFromOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
			removeSelectedRepoFromOrgVariable: ["DELETE /orgs/{org}/actions/variables/{name}/repositories/{repository_id}"],
			reviewCustomGatesForRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/deployment_protection_rule"],
			reviewPendingDeploymentsForRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
			setAllowedActionsOrganization: ["PUT /orgs/{org}/actions/permissions/selected-actions"],
			setAllowedActionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions/selected-actions"],
			setCustomLabelsForSelfHostedRunnerForOrg: ["PUT /orgs/{org}/actions/runners/{runner_id}/labels"],
			setCustomLabelsForSelfHostedRunnerForRepo: ["PUT /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"],
			setCustomOidcSubClaimForRepo: ["PUT /repos/{owner}/{repo}/actions/oidc/customization/sub"],
			setGithubActionsDefaultWorkflowPermissionsOrganization: ["PUT /orgs/{org}/actions/permissions/workflow"],
			setGithubActionsDefaultWorkflowPermissionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions/workflow"],
			setGithubActionsPermissionsOrganization: ["PUT /orgs/{org}/actions/permissions"],
			setGithubActionsPermissionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions"],
			setSelectedReposForOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories"],
			setSelectedReposForOrgVariable: ["PUT /orgs/{org}/actions/variables/{name}/repositories"],
			setSelectedRepositoriesEnabledGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories"],
			setWorkflowAccessToRepository: ["PUT /repos/{owner}/{repo}/actions/permissions/access"],
			updateEnvironmentVariable: ["PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}"],
			updateOrgVariable: ["PATCH /orgs/{org}/actions/variables/{name}"],
			updateRepoVariable: ["PATCH /repos/{owner}/{repo}/actions/variables/{name}"]
		},
		activity: {
			checkRepoIsStarredByAuthenticatedUser: ["GET /user/starred/{owner}/{repo}"],
			deleteRepoSubscription: ["DELETE /repos/{owner}/{repo}/subscription"],
			deleteThreadSubscription: ["DELETE /notifications/threads/{thread_id}/subscription"],
			getFeeds: ["GET /feeds"],
			getRepoSubscription: ["GET /repos/{owner}/{repo}/subscription"],
			getThread: ["GET /notifications/threads/{thread_id}"],
			getThreadSubscriptionForAuthenticatedUser: ["GET /notifications/threads/{thread_id}/subscription"],
			listEventsForAuthenticatedUser: ["GET /users/{username}/events"],
			listNotificationsForAuthenticatedUser: ["GET /notifications"],
			listOrgEventsForAuthenticatedUser: ["GET /users/{username}/events/orgs/{org}"],
			listPublicEvents: ["GET /events"],
			listPublicEventsForRepoNetwork: ["GET /networks/{owner}/{repo}/events"],
			listPublicEventsForUser: ["GET /users/{username}/events/public"],
			listPublicOrgEvents: ["GET /orgs/{org}/events"],
			listReceivedEventsForUser: ["GET /users/{username}/received_events"],
			listReceivedPublicEventsForUser: ["GET /users/{username}/received_events/public"],
			listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
			listRepoNotificationsForAuthenticatedUser: ["GET /repos/{owner}/{repo}/notifications"],
			listReposStarredByAuthenticatedUser: ["GET /user/starred"],
			listReposStarredByUser: ["GET /users/{username}/starred"],
			listReposWatchedByUser: ["GET /users/{username}/subscriptions"],
			listStargazersForRepo: ["GET /repos/{owner}/{repo}/stargazers"],
			listWatchedReposForAuthenticatedUser: ["GET /user/subscriptions"],
			listWatchersForRepo: ["GET /repos/{owner}/{repo}/subscribers"],
			markNotificationsAsRead: ["PUT /notifications"],
			markRepoNotificationsAsRead: ["PUT /repos/{owner}/{repo}/notifications"],
			markThreadAsDone: ["DELETE /notifications/threads/{thread_id}"],
			markThreadAsRead: ["PATCH /notifications/threads/{thread_id}"],
			setRepoSubscription: ["PUT /repos/{owner}/{repo}/subscription"],
			setThreadSubscription: ["PUT /notifications/threads/{thread_id}/subscription"],
			starRepoForAuthenticatedUser: ["PUT /user/starred/{owner}/{repo}"],
			unstarRepoForAuthenticatedUser: ["DELETE /user/starred/{owner}/{repo}"]
		},
		apps: {
			addRepoToInstallation: [
				"PUT /user/installations/{installation_id}/repositories/{repository_id}",
				{},
				{ renamed: ["apps", "addRepoToInstallationForAuthenticatedUser"] }
			],
			addRepoToInstallationForAuthenticatedUser: ["PUT /user/installations/{installation_id}/repositories/{repository_id}"],
			checkToken: ["POST /applications/{client_id}/token"],
			createFromManifest: ["POST /app-manifests/{code}/conversions"],
			createInstallationAccessToken: ["POST /app/installations/{installation_id}/access_tokens"],
			deleteAuthorization: ["DELETE /applications/{client_id}/grant"],
			deleteInstallation: ["DELETE /app/installations/{installation_id}"],
			deleteToken: ["DELETE /applications/{client_id}/token"],
			getAuthenticated: ["GET /app"],
			getBySlug: ["GET /apps/{app_slug}"],
			getInstallation: ["GET /app/installations/{installation_id}"],
			getOrgInstallation: ["GET /orgs/{org}/installation"],
			getRepoInstallation: ["GET /repos/{owner}/{repo}/installation"],
			getSubscriptionPlanForAccount: ["GET /marketplace_listing/accounts/{account_id}"],
			getSubscriptionPlanForAccountStubbed: ["GET /marketplace_listing/stubbed/accounts/{account_id}"],
			getUserInstallation: ["GET /users/{username}/installation"],
			getWebhookConfigForApp: ["GET /app/hook/config"],
			getWebhookDelivery: ["GET /app/hook/deliveries/{delivery_id}"],
			listAccountsForPlan: ["GET /marketplace_listing/plans/{plan_id}/accounts"],
			listAccountsForPlanStubbed: ["GET /marketplace_listing/stubbed/plans/{plan_id}/accounts"],
			listInstallationReposForAuthenticatedUser: ["GET /user/installations/{installation_id}/repositories"],
			listInstallationRequestsForAuthenticatedApp: ["GET /app/installation-requests"],
			listInstallations: ["GET /app/installations"],
			listInstallationsForAuthenticatedUser: ["GET /user/installations"],
			listPlans: ["GET /marketplace_listing/plans"],
			listPlansStubbed: ["GET /marketplace_listing/stubbed/plans"],
			listReposAccessibleToInstallation: ["GET /installation/repositories"],
			listSubscriptionsForAuthenticatedUser: ["GET /user/marketplace_purchases"],
			listSubscriptionsForAuthenticatedUserStubbed: ["GET /user/marketplace_purchases/stubbed"],
			listWebhookDeliveries: ["GET /app/hook/deliveries"],
			redeliverWebhookDelivery: ["POST /app/hook/deliveries/{delivery_id}/attempts"],
			removeRepoFromInstallation: [
				"DELETE /user/installations/{installation_id}/repositories/{repository_id}",
				{},
				{ renamed: ["apps", "removeRepoFromInstallationForAuthenticatedUser"] }
			],
			removeRepoFromInstallationForAuthenticatedUser: ["DELETE /user/installations/{installation_id}/repositories/{repository_id}"],
			resetToken: ["PATCH /applications/{client_id}/token"],
			revokeInstallationAccessToken: ["DELETE /installation/token"],
			scopeToken: ["POST /applications/{client_id}/token/scoped"],
			suspendInstallation: ["PUT /app/installations/{installation_id}/suspended"],
			unsuspendInstallation: ["DELETE /app/installations/{installation_id}/suspended"],
			updateWebhookConfigForApp: ["PATCH /app/hook/config"]
		},
		billing: {
			getGithubActionsBillingOrg: ["GET /orgs/{org}/settings/billing/actions"],
			getGithubActionsBillingUser: ["GET /users/{username}/settings/billing/actions"],
			getGithubPackagesBillingOrg: ["GET /orgs/{org}/settings/billing/packages"],
			getGithubPackagesBillingUser: ["GET /users/{username}/settings/billing/packages"],
			getSharedStorageBillingOrg: ["GET /orgs/{org}/settings/billing/shared-storage"],
			getSharedStorageBillingUser: ["GET /users/{username}/settings/billing/shared-storage"]
		},
		checks: {
			create: ["POST /repos/{owner}/{repo}/check-runs"],
			createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
			get: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}"],
			getSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}"],
			listAnnotations: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations"],
			listForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-runs"],
			listForSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs"],
			listSuitesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-suites"],
			rerequestRun: ["POST /repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest"],
			rerequestSuite: ["POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest"],
			setSuitesPreferences: ["PATCH /repos/{owner}/{repo}/check-suites/preferences"],
			update: ["PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}"]
		},
		codeScanning: {
			deleteAnalysis: ["DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}"],
			getAlert: [
				"GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}",
				{},
				{ renamedParameters: { alert_id: "alert_number" } }
			],
			getAnalysis: ["GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}"],
			getCodeqlDatabase: ["GET /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}"],
			getDefaultSetup: ["GET /repos/{owner}/{repo}/code-scanning/default-setup"],
			getSarif: ["GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}"],
			listAlertInstances: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances"],
			listAlertsForOrg: ["GET /orgs/{org}/code-scanning/alerts"],
			listAlertsForRepo: ["GET /repos/{owner}/{repo}/code-scanning/alerts"],
			listAlertsInstances: [
				"GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances",
				{},
				{ renamed: ["codeScanning", "listAlertInstances"] }
			],
			listCodeqlDatabases: ["GET /repos/{owner}/{repo}/code-scanning/codeql/databases"],
			listRecentAnalyses: ["GET /repos/{owner}/{repo}/code-scanning/analyses"],
			updateAlert: ["PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}"],
			updateDefaultSetup: ["PATCH /repos/{owner}/{repo}/code-scanning/default-setup"],
			uploadSarif: ["POST /repos/{owner}/{repo}/code-scanning/sarifs"]
		},
		codesOfConduct: {
			getAllCodesOfConduct: ["GET /codes_of_conduct"],
			getConductCode: ["GET /codes_of_conduct/{key}"]
		},
		codespaces: {
			addRepositoryForSecretForAuthenticatedUser: ["PUT /user/codespaces/secrets/{secret_name}/repositories/{repository_id}"],
			addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}"],
			checkPermissionsForDevcontainer: ["GET /repos/{owner}/{repo}/codespaces/permissions_check"],
			codespaceMachinesForAuthenticatedUser: ["GET /user/codespaces/{codespace_name}/machines"],
			createForAuthenticatedUser: ["POST /user/codespaces"],
			createOrUpdateOrgSecret: ["PUT /orgs/{org}/codespaces/secrets/{secret_name}"],
			createOrUpdateRepoSecret: ["PUT /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"],
			createOrUpdateSecretForAuthenticatedUser: ["PUT /user/codespaces/secrets/{secret_name}"],
			createWithPrForAuthenticatedUser: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/codespaces"],
			createWithRepoForAuthenticatedUser: ["POST /repos/{owner}/{repo}/codespaces"],
			deleteForAuthenticatedUser: ["DELETE /user/codespaces/{codespace_name}"],
			deleteFromOrganization: ["DELETE /orgs/{org}/members/{username}/codespaces/{codespace_name}"],
			deleteOrgSecret: ["DELETE /orgs/{org}/codespaces/secrets/{secret_name}"],
			deleteRepoSecret: ["DELETE /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"],
			deleteSecretForAuthenticatedUser: ["DELETE /user/codespaces/secrets/{secret_name}"],
			exportForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/exports"],
			getCodespacesForUserInOrg: ["GET /orgs/{org}/members/{username}/codespaces"],
			getExportDetailsForAuthenticatedUser: ["GET /user/codespaces/{codespace_name}/exports/{export_id}"],
			getForAuthenticatedUser: ["GET /user/codespaces/{codespace_name}"],
			getOrgPublicKey: ["GET /orgs/{org}/codespaces/secrets/public-key"],
			getOrgSecret: ["GET /orgs/{org}/codespaces/secrets/{secret_name}"],
			getPublicKeyForAuthenticatedUser: ["GET /user/codespaces/secrets/public-key"],
			getRepoPublicKey: ["GET /repos/{owner}/{repo}/codespaces/secrets/public-key"],
			getRepoSecret: ["GET /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"],
			getSecretForAuthenticatedUser: ["GET /user/codespaces/secrets/{secret_name}"],
			listDevcontainersInRepositoryForAuthenticatedUser: ["GET /repos/{owner}/{repo}/codespaces/devcontainers"],
			listForAuthenticatedUser: ["GET /user/codespaces"],
			listInOrganization: [
				"GET /orgs/{org}/codespaces",
				{},
				{ renamedParameters: { org_id: "org" } }
			],
			listInRepositoryForAuthenticatedUser: ["GET /repos/{owner}/{repo}/codespaces"],
			listOrgSecrets: ["GET /orgs/{org}/codespaces/secrets"],
			listRepoSecrets: ["GET /repos/{owner}/{repo}/codespaces/secrets"],
			listRepositoriesForSecretForAuthenticatedUser: ["GET /user/codespaces/secrets/{secret_name}/repositories"],
			listSecretsForAuthenticatedUser: ["GET /user/codespaces/secrets"],
			listSelectedReposForOrgSecret: ["GET /orgs/{org}/codespaces/secrets/{secret_name}/repositories"],
			preFlightWithRepoForAuthenticatedUser: ["GET /repos/{owner}/{repo}/codespaces/new"],
			publishForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/publish"],
			removeRepositoryForSecretForAuthenticatedUser: ["DELETE /user/codespaces/secrets/{secret_name}/repositories/{repository_id}"],
			removeSelectedRepoFromOrgSecret: ["DELETE /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}"],
			repoMachinesForAuthenticatedUser: ["GET /repos/{owner}/{repo}/codespaces/machines"],
			setRepositoriesForSecretForAuthenticatedUser: ["PUT /user/codespaces/secrets/{secret_name}/repositories"],
			setSelectedReposForOrgSecret: ["PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories"],
			startForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/start"],
			stopForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/stop"],
			stopInOrganization: ["POST /orgs/{org}/members/{username}/codespaces/{codespace_name}/stop"],
			updateForAuthenticatedUser: ["PATCH /user/codespaces/{codespace_name}"]
		},
		copilot: {
			addCopilotSeatsForTeams: ["POST /orgs/{org}/copilot/billing/selected_teams"],
			addCopilotSeatsForUsers: ["POST /orgs/{org}/copilot/billing/selected_users"],
			cancelCopilotSeatAssignmentForTeams: ["DELETE /orgs/{org}/copilot/billing/selected_teams"],
			cancelCopilotSeatAssignmentForUsers: ["DELETE /orgs/{org}/copilot/billing/selected_users"],
			getCopilotOrganizationDetails: ["GET /orgs/{org}/copilot/billing"],
			getCopilotSeatDetailsForUser: ["GET /orgs/{org}/members/{username}/copilot"],
			listCopilotSeats: ["GET /orgs/{org}/copilot/billing/seats"]
		},
		dependabot: {
			addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}"],
			createOrUpdateOrgSecret: ["PUT /orgs/{org}/dependabot/secrets/{secret_name}"],
			createOrUpdateRepoSecret: ["PUT /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"],
			deleteOrgSecret: ["DELETE /orgs/{org}/dependabot/secrets/{secret_name}"],
			deleteRepoSecret: ["DELETE /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"],
			getAlert: ["GET /repos/{owner}/{repo}/dependabot/alerts/{alert_number}"],
			getOrgPublicKey: ["GET /orgs/{org}/dependabot/secrets/public-key"],
			getOrgSecret: ["GET /orgs/{org}/dependabot/secrets/{secret_name}"],
			getRepoPublicKey: ["GET /repos/{owner}/{repo}/dependabot/secrets/public-key"],
			getRepoSecret: ["GET /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"],
			listAlertsForEnterprise: ["GET /enterprises/{enterprise}/dependabot/alerts"],
			listAlertsForOrg: ["GET /orgs/{org}/dependabot/alerts"],
			listAlertsForRepo: ["GET /repos/{owner}/{repo}/dependabot/alerts"],
			listOrgSecrets: ["GET /orgs/{org}/dependabot/secrets"],
			listRepoSecrets: ["GET /repos/{owner}/{repo}/dependabot/secrets"],
			listSelectedReposForOrgSecret: ["GET /orgs/{org}/dependabot/secrets/{secret_name}/repositories"],
			removeSelectedRepoFromOrgSecret: ["DELETE /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}"],
			setSelectedReposForOrgSecret: ["PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories"],
			updateAlert: ["PATCH /repos/{owner}/{repo}/dependabot/alerts/{alert_number}"]
		},
		dependencyGraph: {
			createRepositorySnapshot: ["POST /repos/{owner}/{repo}/dependency-graph/snapshots"],
			diffRange: ["GET /repos/{owner}/{repo}/dependency-graph/compare/{basehead}"],
			exportSbom: ["GET /repos/{owner}/{repo}/dependency-graph/sbom"]
		},
		emojis: { get: ["GET /emojis"] },
		gists: {
			checkIsStarred: ["GET /gists/{gist_id}/star"],
			create: ["POST /gists"],
			createComment: ["POST /gists/{gist_id}/comments"],
			delete: ["DELETE /gists/{gist_id}"],
			deleteComment: ["DELETE /gists/{gist_id}/comments/{comment_id}"],
			fork: ["POST /gists/{gist_id}/forks"],
			get: ["GET /gists/{gist_id}"],
			getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
			getRevision: ["GET /gists/{gist_id}/{sha}"],
			list: ["GET /gists"],
			listComments: ["GET /gists/{gist_id}/comments"],
			listCommits: ["GET /gists/{gist_id}/commits"],
			listForUser: ["GET /users/{username}/gists"],
			listForks: ["GET /gists/{gist_id}/forks"],
			listPublic: ["GET /gists/public"],
			listStarred: ["GET /gists/starred"],
			star: ["PUT /gists/{gist_id}/star"],
			unstar: ["DELETE /gists/{gist_id}/star"],
			update: ["PATCH /gists/{gist_id}"],
			updateComment: ["PATCH /gists/{gist_id}/comments/{comment_id}"]
		},
		git: {
			createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
			createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
			createRef: ["POST /repos/{owner}/{repo}/git/refs"],
			createTag: ["POST /repos/{owner}/{repo}/git/tags"],
			createTree: ["POST /repos/{owner}/{repo}/git/trees"],
			deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
			getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
			getCommit: ["GET /repos/{owner}/{repo}/git/commits/{commit_sha}"],
			getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
			getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
			getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
			listMatchingRefs: ["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"],
			updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"]
		},
		gitignore: {
			getAllTemplates: ["GET /gitignore/templates"],
			getTemplate: ["GET /gitignore/templates/{name}"]
		},
		interactions: {
			getRestrictionsForAuthenticatedUser: ["GET /user/interaction-limits"],
			getRestrictionsForOrg: ["GET /orgs/{org}/interaction-limits"],
			getRestrictionsForRepo: ["GET /repos/{owner}/{repo}/interaction-limits"],
			getRestrictionsForYourPublicRepos: [
				"GET /user/interaction-limits",
				{},
				{ renamed: ["interactions", "getRestrictionsForAuthenticatedUser"] }
			],
			removeRestrictionsForAuthenticatedUser: ["DELETE /user/interaction-limits"],
			removeRestrictionsForOrg: ["DELETE /orgs/{org}/interaction-limits"],
			removeRestrictionsForRepo: ["DELETE /repos/{owner}/{repo}/interaction-limits"],
			removeRestrictionsForYourPublicRepos: [
				"DELETE /user/interaction-limits",
				{},
				{ renamed: ["interactions", "removeRestrictionsForAuthenticatedUser"] }
			],
			setRestrictionsForAuthenticatedUser: ["PUT /user/interaction-limits"],
			setRestrictionsForOrg: ["PUT /orgs/{org}/interaction-limits"],
			setRestrictionsForRepo: ["PUT /repos/{owner}/{repo}/interaction-limits"],
			setRestrictionsForYourPublicRepos: [
				"PUT /user/interaction-limits",
				{},
				{ renamed: ["interactions", "setRestrictionsForAuthenticatedUser"] }
			]
		},
		issues: {
			addAssignees: ["POST /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
			addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
			checkUserCanBeAssigned: ["GET /repos/{owner}/{repo}/assignees/{assignee}"],
			checkUserCanBeAssignedToIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}"],
			create: ["POST /repos/{owner}/{repo}/issues"],
			createComment: ["POST /repos/{owner}/{repo}/issues/{issue_number}/comments"],
			createLabel: ["POST /repos/{owner}/{repo}/labels"],
			createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
			deleteComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}"],
			deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
			deleteMilestone: ["DELETE /repos/{owner}/{repo}/milestones/{milestone_number}"],
			get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
			getComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"],
			getEvent: ["GET /repos/{owner}/{repo}/issues/events/{event_id}"],
			getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
			getMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}"],
			list: ["GET /issues"],
			listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
			listComments: ["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"],
			listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
			listEvents: ["GET /repos/{owner}/{repo}/issues/{issue_number}/events"],
			listEventsForRepo: ["GET /repos/{owner}/{repo}/issues/events"],
			listEventsForTimeline: ["GET /repos/{owner}/{repo}/issues/{issue_number}/timeline"],
			listForAuthenticatedUser: ["GET /user/issues"],
			listForOrg: ["GET /orgs/{org}/issues"],
			listForRepo: ["GET /repos/{owner}/{repo}/issues"],
			listLabelsForMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels"],
			listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
			listLabelsOnIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/labels"],
			listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
			lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
			removeAllLabels: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels"],
			removeAssignees: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
			removeLabel: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}"],
			setLabels: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/labels"],
			unlock: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock"],
			update: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}"],
			updateComment: ["PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"],
			updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
			updateMilestone: ["PATCH /repos/{owner}/{repo}/milestones/{milestone_number}"]
		},
		licenses: {
			get: ["GET /licenses/{license}"],
			getAllCommonlyUsed: ["GET /licenses"],
			getForRepo: ["GET /repos/{owner}/{repo}/license"]
		},
		markdown: {
			render: ["POST /markdown"],
			renderRaw: ["POST /markdown/raw", { headers: { "content-type": "text/plain; charset=utf-8" } }]
		},
		meta: {
			get: ["GET /meta"],
			getAllVersions: ["GET /versions"],
			getOctocat: ["GET /octocat"],
			getZen: ["GET /zen"],
			root: ["GET /"]
		},
		migrations: {
			cancelImport: [
				"DELETE /repos/{owner}/{repo}/import",
				{},
				{ deprecated: "octokit.rest.migrations.cancelImport() is deprecated, see https://docs.github.com/rest/migrations/source-imports#cancel-an-import" }
			],
			deleteArchiveForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/archive"],
			deleteArchiveForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/archive"],
			downloadArchiveForOrg: ["GET /orgs/{org}/migrations/{migration_id}/archive"],
			getArchiveForAuthenticatedUser: ["GET /user/migrations/{migration_id}/archive"],
			getCommitAuthors: [
				"GET /repos/{owner}/{repo}/import/authors",
				{},
				{ deprecated: "octokit.rest.migrations.getCommitAuthors() is deprecated, see https://docs.github.com/rest/migrations/source-imports#get-commit-authors" }
			],
			getImportStatus: [
				"GET /repos/{owner}/{repo}/import",
				{},
				{ deprecated: "octokit.rest.migrations.getImportStatus() is deprecated, see https://docs.github.com/rest/migrations/source-imports#get-an-import-status" }
			],
			getLargeFiles: [
				"GET /repos/{owner}/{repo}/import/large_files",
				{},
				{ deprecated: "octokit.rest.migrations.getLargeFiles() is deprecated, see https://docs.github.com/rest/migrations/source-imports#get-large-files" }
			],
			getStatusForAuthenticatedUser: ["GET /user/migrations/{migration_id}"],
			getStatusForOrg: ["GET /orgs/{org}/migrations/{migration_id}"],
			listForAuthenticatedUser: ["GET /user/migrations"],
			listForOrg: ["GET /orgs/{org}/migrations"],
			listReposForAuthenticatedUser: ["GET /user/migrations/{migration_id}/repositories"],
			listReposForOrg: ["GET /orgs/{org}/migrations/{migration_id}/repositories"],
			listReposForUser: [
				"GET /user/migrations/{migration_id}/repositories",
				{},
				{ renamed: ["migrations", "listReposForAuthenticatedUser"] }
			],
			mapCommitAuthor: [
				"PATCH /repos/{owner}/{repo}/import/authors/{author_id}",
				{},
				{ deprecated: "octokit.rest.migrations.mapCommitAuthor() is deprecated, see https://docs.github.com/rest/migrations/source-imports#map-a-commit-author" }
			],
			setLfsPreference: [
				"PATCH /repos/{owner}/{repo}/import/lfs",
				{},
				{ deprecated: "octokit.rest.migrations.setLfsPreference() is deprecated, see https://docs.github.com/rest/migrations/source-imports#update-git-lfs-preference" }
			],
			startForAuthenticatedUser: ["POST /user/migrations"],
			startForOrg: ["POST /orgs/{org}/migrations"],
			startImport: [
				"PUT /repos/{owner}/{repo}/import",
				{},
				{ deprecated: "octokit.rest.migrations.startImport() is deprecated, see https://docs.github.com/rest/migrations/source-imports#start-an-import" }
			],
			unlockRepoForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock"],
			unlockRepoForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock"],
			updateImport: [
				"PATCH /repos/{owner}/{repo}/import",
				{},
				{ deprecated: "octokit.rest.migrations.updateImport() is deprecated, see https://docs.github.com/rest/migrations/source-imports#update-an-import" }
			]
		},
		oidc: {
			getOidcCustomSubTemplateForOrg: ["GET /orgs/{org}/actions/oidc/customization/sub"],
			updateOidcCustomSubTemplateForOrg: ["PUT /orgs/{org}/actions/oidc/customization/sub"]
		},
		orgs: {
			addSecurityManagerTeam: ["PUT /orgs/{org}/security-managers/teams/{team_slug}"],
			assignTeamToOrgRole: ["PUT /orgs/{org}/organization-roles/teams/{team_slug}/{role_id}"],
			assignUserToOrgRole: ["PUT /orgs/{org}/organization-roles/users/{username}/{role_id}"],
			blockUser: ["PUT /orgs/{org}/blocks/{username}"],
			cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
			checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
			checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
			checkPublicMembershipForUser: ["GET /orgs/{org}/public_members/{username}"],
			convertMemberToOutsideCollaborator: ["PUT /orgs/{org}/outside_collaborators/{username}"],
			createCustomOrganizationRole: ["POST /orgs/{org}/organization-roles"],
			createInvitation: ["POST /orgs/{org}/invitations"],
			createOrUpdateCustomProperties: ["PATCH /orgs/{org}/properties/schema"],
			createOrUpdateCustomPropertiesValuesForRepos: ["PATCH /orgs/{org}/properties/values"],
			createOrUpdateCustomProperty: ["PUT /orgs/{org}/properties/schema/{custom_property_name}"],
			createWebhook: ["POST /orgs/{org}/hooks"],
			delete: ["DELETE /orgs/{org}"],
			deleteCustomOrganizationRole: ["DELETE /orgs/{org}/organization-roles/{role_id}"],
			deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
			enableOrDisableSecurityProductOnAllOrgRepos: ["POST /orgs/{org}/{security_product}/{enablement}"],
			get: ["GET /orgs/{org}"],
			getAllCustomProperties: ["GET /orgs/{org}/properties/schema"],
			getCustomProperty: ["GET /orgs/{org}/properties/schema/{custom_property_name}"],
			getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
			getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
			getOrgRole: ["GET /orgs/{org}/organization-roles/{role_id}"],
			getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
			getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
			getWebhookDelivery: ["GET /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}"],
			list: ["GET /organizations"],
			listAppInstallations: ["GET /orgs/{org}/installations"],
			listBlockedUsers: ["GET /orgs/{org}/blocks"],
			listCustomPropertiesValuesForRepos: ["GET /orgs/{org}/properties/values"],
			listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
			listForAuthenticatedUser: ["GET /user/orgs"],
			listForUser: ["GET /users/{username}/orgs"],
			listInvitationTeams: ["GET /orgs/{org}/invitations/{invitation_id}/teams"],
			listMembers: ["GET /orgs/{org}/members"],
			listMembershipsForAuthenticatedUser: ["GET /user/memberships/orgs"],
			listOrgRoleTeams: ["GET /orgs/{org}/organization-roles/{role_id}/teams"],
			listOrgRoleUsers: ["GET /orgs/{org}/organization-roles/{role_id}/users"],
			listOrgRoles: ["GET /orgs/{org}/organization-roles"],
			listOrganizationFineGrainedPermissions: ["GET /orgs/{org}/organization-fine-grained-permissions"],
			listOutsideCollaborators: ["GET /orgs/{org}/outside_collaborators"],
			listPatGrantRepositories: ["GET /orgs/{org}/personal-access-tokens/{pat_id}/repositories"],
			listPatGrantRequestRepositories: ["GET /orgs/{org}/personal-access-token-requests/{pat_request_id}/repositories"],
			listPatGrantRequests: ["GET /orgs/{org}/personal-access-token-requests"],
			listPatGrants: ["GET /orgs/{org}/personal-access-tokens"],
			listPendingInvitations: ["GET /orgs/{org}/invitations"],
			listPublicMembers: ["GET /orgs/{org}/public_members"],
			listSecurityManagerTeams: ["GET /orgs/{org}/security-managers"],
			listWebhookDeliveries: ["GET /orgs/{org}/hooks/{hook_id}/deliveries"],
			listWebhooks: ["GET /orgs/{org}/hooks"],
			patchCustomOrganizationRole: ["PATCH /orgs/{org}/organization-roles/{role_id}"],
			pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
			redeliverWebhookDelivery: ["POST /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts"],
			removeCustomProperty: ["DELETE /orgs/{org}/properties/schema/{custom_property_name}"],
			removeMember: ["DELETE /orgs/{org}/members/{username}"],
			removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
			removeOutsideCollaborator: ["DELETE /orgs/{org}/outside_collaborators/{username}"],
			removePublicMembershipForAuthenticatedUser: ["DELETE /orgs/{org}/public_members/{username}"],
			removeSecurityManagerTeam: ["DELETE /orgs/{org}/security-managers/teams/{team_slug}"],
			reviewPatGrantRequest: ["POST /orgs/{org}/personal-access-token-requests/{pat_request_id}"],
			reviewPatGrantRequestsInBulk: ["POST /orgs/{org}/personal-access-token-requests"],
			revokeAllOrgRolesTeam: ["DELETE /orgs/{org}/organization-roles/teams/{team_slug}"],
			revokeAllOrgRolesUser: ["DELETE /orgs/{org}/organization-roles/users/{username}"],
			revokeOrgRoleTeam: ["DELETE /orgs/{org}/organization-roles/teams/{team_slug}/{role_id}"],
			revokeOrgRoleUser: ["DELETE /orgs/{org}/organization-roles/users/{username}/{role_id}"],
			setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
			setPublicMembershipForAuthenticatedUser: ["PUT /orgs/{org}/public_members/{username}"],
			unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
			update: ["PATCH /orgs/{org}"],
			updateMembershipForAuthenticatedUser: ["PATCH /user/memberships/orgs/{org}"],
			updatePatAccess: ["POST /orgs/{org}/personal-access-tokens/{pat_id}"],
			updatePatAccesses: ["POST /orgs/{org}/personal-access-tokens"],
			updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
			updateWebhookConfigForOrg: ["PATCH /orgs/{org}/hooks/{hook_id}/config"]
		},
		packages: {
			deletePackageForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}"],
			deletePackageForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}"],
			deletePackageForUser: ["DELETE /users/{username}/packages/{package_type}/{package_name}"],
			deletePackageVersionForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
			deletePackageVersionForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
			deletePackageVersionForUser: ["DELETE /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
			getAllPackageVersionsForAPackageOwnedByAnOrg: [
				"GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
				{},
				{ renamed: ["packages", "getAllPackageVersionsForPackageOwnedByOrg"] }
			],
			getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser: [
				"GET /user/packages/{package_type}/{package_name}/versions",
				{},
				{ renamed: ["packages", "getAllPackageVersionsForPackageOwnedByAuthenticatedUser"] }
			],
			getAllPackageVersionsForPackageOwnedByAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions"],
			getAllPackageVersionsForPackageOwnedByOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions"],
			getAllPackageVersionsForPackageOwnedByUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions"],
			getPackageForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}"],
			getPackageForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}"],
			getPackageForUser: ["GET /users/{username}/packages/{package_type}/{package_name}"],
			getPackageVersionForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
			getPackageVersionForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
			getPackageVersionForUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
			listDockerMigrationConflictingPackagesForAuthenticatedUser: ["GET /user/docker/conflicts"],
			listDockerMigrationConflictingPackagesForOrganization: ["GET /orgs/{org}/docker/conflicts"],
			listDockerMigrationConflictingPackagesForUser: ["GET /users/{username}/docker/conflicts"],
			listPackagesForAuthenticatedUser: ["GET /user/packages"],
			listPackagesForOrganization: ["GET /orgs/{org}/packages"],
			listPackagesForUser: ["GET /users/{username}/packages"],
			restorePackageForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/restore{?token}"],
			restorePackageForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}"],
			restorePackageForUser: ["POST /users/{username}/packages/{package_type}/{package_name}/restore{?token}"],
			restorePackageVersionForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"],
			restorePackageVersionForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"],
			restorePackageVersionForUser: ["POST /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"]
		},
		projects: {
			addCollaborator: ["PUT /projects/{project_id}/collaborators/{username}"],
			createCard: ["POST /projects/columns/{column_id}/cards"],
			createColumn: ["POST /projects/{project_id}/columns"],
			createForAuthenticatedUser: ["POST /user/projects"],
			createForOrg: ["POST /orgs/{org}/projects"],
			createForRepo: ["POST /repos/{owner}/{repo}/projects"],
			delete: ["DELETE /projects/{project_id}"],
			deleteCard: ["DELETE /projects/columns/cards/{card_id}"],
			deleteColumn: ["DELETE /projects/columns/{column_id}"],
			get: ["GET /projects/{project_id}"],
			getCard: ["GET /projects/columns/cards/{card_id}"],
			getColumn: ["GET /projects/columns/{column_id}"],
			getPermissionForUser: ["GET /projects/{project_id}/collaborators/{username}/permission"],
			listCards: ["GET /projects/columns/{column_id}/cards"],
			listCollaborators: ["GET /projects/{project_id}/collaborators"],
			listColumns: ["GET /projects/{project_id}/columns"],
			listForOrg: ["GET /orgs/{org}/projects"],
			listForRepo: ["GET /repos/{owner}/{repo}/projects"],
			listForUser: ["GET /users/{username}/projects"],
			moveCard: ["POST /projects/columns/cards/{card_id}/moves"],
			moveColumn: ["POST /projects/columns/{column_id}/moves"],
			removeCollaborator: ["DELETE /projects/{project_id}/collaborators/{username}"],
			update: ["PATCH /projects/{project_id}"],
			updateCard: ["PATCH /projects/columns/cards/{card_id}"],
			updateColumn: ["PATCH /projects/columns/{column_id}"]
		},
		pulls: {
			checkIfMerged: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
			create: ["POST /repos/{owner}/{repo}/pulls"],
			createReplyForReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies"],
			createReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
			createReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
			deletePendingReview: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
			deleteReviewComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
			dismissReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals"],
			get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
			getReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
			getReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
			list: ["GET /repos/{owner}/{repo}/pulls"],
			listCommentsForReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments"],
			listCommits: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"],
			listFiles: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/files"],
			listRequestedReviewers: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
			listReviewComments: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
			listReviewCommentsForRepo: ["GET /repos/{owner}/{repo}/pulls/comments"],
			listReviews: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
			merge: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
			removeRequestedReviewers: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
			requestReviewers: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
			submitReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events"],
			update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
			updateBranch: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch"],
			updateReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
			updateReviewComment: ["PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}"]
		},
		rateLimit: { get: ["GET /rate_limit"] },
		reactions: {
			createForCommitComment: ["POST /repos/{owner}/{repo}/comments/{comment_id}/reactions"],
			createForIssue: ["POST /repos/{owner}/{repo}/issues/{issue_number}/reactions"],
			createForIssueComment: ["POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions"],
			createForPullRequestReviewComment: ["POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions"],
			createForRelease: ["POST /repos/{owner}/{repo}/releases/{release_id}/reactions"],
			createForTeamDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions"],
			createForTeamDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions"],
			deleteForCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}"],
			deleteForIssue: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}"],
			deleteForIssueComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}"],
			deleteForPullRequestComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}"],
			deleteForRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}/reactions/{reaction_id}"],
			deleteForTeamDiscussion: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}"],
			deleteForTeamDiscussionComment: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}"],
			listForCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}/reactions"],
			listForIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/reactions"],
			listForIssueComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions"],
			listForPullRequestReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions"],
			listForRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}/reactions"],
			listForTeamDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions"],
			listForTeamDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions"]
		},
		repos: {
			acceptInvitation: [
				"PATCH /user/repository_invitations/{invitation_id}",
				{},
				{ renamed: ["repos", "acceptInvitationForAuthenticatedUser"] }
			],
			acceptInvitationForAuthenticatedUser: ["PATCH /user/repository_invitations/{invitation_id}"],
			addAppAccessRestrictions: [
				"POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
				{},
				{ mapToData: "apps" }
			],
			addCollaborator: ["PUT /repos/{owner}/{repo}/collaborators/{username}"],
			addStatusCheckContexts: [
				"POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
				{},
				{ mapToData: "contexts" }
			],
			addTeamAccessRestrictions: [
				"POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
				{},
				{ mapToData: "teams" }
			],
			addUserAccessRestrictions: [
				"POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
				{},
				{ mapToData: "users" }
			],
			cancelPagesDeployment: ["POST /repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}/cancel"],
			checkAutomatedSecurityFixes: ["GET /repos/{owner}/{repo}/automated-security-fixes"],
			checkCollaborator: ["GET /repos/{owner}/{repo}/collaborators/{username}"],
			checkVulnerabilityAlerts: ["GET /repos/{owner}/{repo}/vulnerability-alerts"],
			codeownersErrors: ["GET /repos/{owner}/{repo}/codeowners/errors"],
			compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
			compareCommitsWithBasehead: ["GET /repos/{owner}/{repo}/compare/{basehead}"],
			createAutolink: ["POST /repos/{owner}/{repo}/autolinks"],
			createCommitComment: ["POST /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
			createCommitSignatureProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"],
			createCommitStatus: ["POST /repos/{owner}/{repo}/statuses/{sha}"],
			createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
			createDeployment: ["POST /repos/{owner}/{repo}/deployments"],
			createDeploymentBranchPolicy: ["POST /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies"],
			createDeploymentProtectionRule: ["POST /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules"],
			createDeploymentStatus: ["POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
			createDispatchEvent: ["POST /repos/{owner}/{repo}/dispatches"],
			createForAuthenticatedUser: ["POST /user/repos"],
			createFork: ["POST /repos/{owner}/{repo}/forks"],
			createInOrg: ["POST /orgs/{org}/repos"],
			createOrUpdateCustomPropertiesValues: ["PATCH /repos/{owner}/{repo}/properties/values"],
			createOrUpdateEnvironment: ["PUT /repos/{owner}/{repo}/environments/{environment_name}"],
			createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
			createOrgRuleset: ["POST /orgs/{org}/rulesets"],
			createPagesDeployment: ["POST /repos/{owner}/{repo}/pages/deployments"],
			createPagesSite: ["POST /repos/{owner}/{repo}/pages"],
			createRelease: ["POST /repos/{owner}/{repo}/releases"],
			createRepoRuleset: ["POST /repos/{owner}/{repo}/rulesets"],
			createTagProtection: ["POST /repos/{owner}/{repo}/tags/protection"],
			createUsingTemplate: ["POST /repos/{template_owner}/{template_repo}/generate"],
			createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
			declineInvitation: [
				"DELETE /user/repository_invitations/{invitation_id}",
				{},
				{ renamed: ["repos", "declineInvitationForAuthenticatedUser"] }
			],
			declineInvitationForAuthenticatedUser: ["DELETE /user/repository_invitations/{invitation_id}"],
			delete: ["DELETE /repos/{owner}/{repo}"],
			deleteAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
			deleteAdminBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
			deleteAnEnvironment: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}"],
			deleteAutolink: ["DELETE /repos/{owner}/{repo}/autolinks/{autolink_id}"],
			deleteBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection"],
			deleteCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}"],
			deleteCommitSignatureProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"],
			deleteDeployKey: ["DELETE /repos/{owner}/{repo}/keys/{key_id}"],
			deleteDeployment: ["DELETE /repos/{owner}/{repo}/deployments/{deployment_id}"],
			deleteDeploymentBranchPolicy: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"],
			deleteFile: ["DELETE /repos/{owner}/{repo}/contents/{path}"],
			deleteInvitation: ["DELETE /repos/{owner}/{repo}/invitations/{invitation_id}"],
			deleteOrgRuleset: ["DELETE /orgs/{org}/rulesets/{ruleset_id}"],
			deletePagesSite: ["DELETE /repos/{owner}/{repo}/pages"],
			deletePullRequestReviewProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
			deleteRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}"],
			deleteReleaseAsset: ["DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}"],
			deleteRepoRuleset: ["DELETE /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
			deleteTagProtection: ["DELETE /repos/{owner}/{repo}/tags/protection/{tag_protection_id}"],
			deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
			disableAutomatedSecurityFixes: ["DELETE /repos/{owner}/{repo}/automated-security-fixes"],
			disableDeploymentProtectionRule: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}"],
			disablePrivateVulnerabilityReporting: ["DELETE /repos/{owner}/{repo}/private-vulnerability-reporting"],
			disableVulnerabilityAlerts: ["DELETE /repos/{owner}/{repo}/vulnerability-alerts"],
			downloadArchive: [
				"GET /repos/{owner}/{repo}/zipball/{ref}",
				{},
				{ renamed: ["repos", "downloadZipballArchive"] }
			],
			downloadTarballArchive: ["GET /repos/{owner}/{repo}/tarball/{ref}"],
			downloadZipballArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}"],
			enableAutomatedSecurityFixes: ["PUT /repos/{owner}/{repo}/automated-security-fixes"],
			enablePrivateVulnerabilityReporting: ["PUT /repos/{owner}/{repo}/private-vulnerability-reporting"],
			enableVulnerabilityAlerts: ["PUT /repos/{owner}/{repo}/vulnerability-alerts"],
			generateReleaseNotes: ["POST /repos/{owner}/{repo}/releases/generate-notes"],
			get: ["GET /repos/{owner}/{repo}"],
			getAccessRestrictions: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
			getAdminBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
			getAllDeploymentProtectionRules: ["GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules"],
			getAllEnvironments: ["GET /repos/{owner}/{repo}/environments"],
			getAllStatusCheckContexts: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts"],
			getAllTopics: ["GET /repos/{owner}/{repo}/topics"],
			getAppsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps"],
			getAutolink: ["GET /repos/{owner}/{repo}/autolinks/{autolink_id}"],
			getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
			getBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection"],
			getBranchRules: ["GET /repos/{owner}/{repo}/rules/branches/{branch}"],
			getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
			getCodeFrequencyStats: ["GET /repos/{owner}/{repo}/stats/code_frequency"],
			getCollaboratorPermissionLevel: ["GET /repos/{owner}/{repo}/collaborators/{username}/permission"],
			getCombinedStatusForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/status"],
			getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
			getCommitActivityStats: ["GET /repos/{owner}/{repo}/stats/commit_activity"],
			getCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}"],
			getCommitSignatureProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"],
			getCommunityProfileMetrics: ["GET /repos/{owner}/{repo}/community/profile"],
			getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
			getContributorsStats: ["GET /repos/{owner}/{repo}/stats/contributors"],
			getCustomDeploymentProtectionRule: ["GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}"],
			getCustomPropertiesValues: ["GET /repos/{owner}/{repo}/properties/values"],
			getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
			getDeployment: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}"],
			getDeploymentBranchPolicy: ["GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"],
			getDeploymentStatus: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}"],
			getEnvironment: ["GET /repos/{owner}/{repo}/environments/{environment_name}"],
			getLatestPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/latest"],
			getLatestRelease: ["GET /repos/{owner}/{repo}/releases/latest"],
			getOrgRuleSuite: ["GET /orgs/{org}/rulesets/rule-suites/{rule_suite_id}"],
			getOrgRuleSuites: ["GET /orgs/{org}/rulesets/rule-suites"],
			getOrgRuleset: ["GET /orgs/{org}/rulesets/{ruleset_id}"],
			getOrgRulesets: ["GET /orgs/{org}/rulesets"],
			getPages: ["GET /repos/{owner}/{repo}/pages"],
			getPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/{build_id}"],
			getPagesDeployment: ["GET /repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}"],
			getPagesHealthCheck: ["GET /repos/{owner}/{repo}/pages/health"],
			getParticipationStats: ["GET /repos/{owner}/{repo}/stats/participation"],
			getPullRequestReviewProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
			getPunchCardStats: ["GET /repos/{owner}/{repo}/stats/punch_card"],
			getReadme: ["GET /repos/{owner}/{repo}/readme"],
			getReadmeInDirectory: ["GET /repos/{owner}/{repo}/readme/{dir}"],
			getRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}"],
			getReleaseAsset: ["GET /repos/{owner}/{repo}/releases/assets/{asset_id}"],
			getReleaseByTag: ["GET /repos/{owner}/{repo}/releases/tags/{tag}"],
			getRepoRuleSuite: ["GET /repos/{owner}/{repo}/rulesets/rule-suites/{rule_suite_id}"],
			getRepoRuleSuites: ["GET /repos/{owner}/{repo}/rulesets/rule-suites"],
			getRepoRuleset: ["GET /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
			getRepoRulesets: ["GET /repos/{owner}/{repo}/rulesets"],
			getStatusChecksProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
			getTeamsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams"],
			getTopPaths: ["GET /repos/{owner}/{repo}/traffic/popular/paths"],
			getTopReferrers: ["GET /repos/{owner}/{repo}/traffic/popular/referrers"],
			getUsersWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users"],
			getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
			getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
			getWebhookConfigForRepo: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/config"],
			getWebhookDelivery: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}"],
			listActivities: ["GET /repos/{owner}/{repo}/activity"],
			listAutolinks: ["GET /repos/{owner}/{repo}/autolinks"],
			listBranches: ["GET /repos/{owner}/{repo}/branches"],
			listBranchesForHeadCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head"],
			listCollaborators: ["GET /repos/{owner}/{repo}/collaborators"],
			listCommentsForCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
			listCommitCommentsForRepo: ["GET /repos/{owner}/{repo}/comments"],
			listCommitStatusesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/statuses"],
			listCommits: ["GET /repos/{owner}/{repo}/commits"],
			listContributors: ["GET /repos/{owner}/{repo}/contributors"],
			listCustomDeploymentRuleIntegrations: ["GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps"],
			listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
			listDeploymentBranchPolicies: ["GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies"],
			listDeploymentStatuses: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
			listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
			listForAuthenticatedUser: ["GET /user/repos"],
			listForOrg: ["GET /orgs/{org}/repos"],
			listForUser: ["GET /users/{username}/repos"],
			listForks: ["GET /repos/{owner}/{repo}/forks"],
			listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
			listInvitationsForAuthenticatedUser: ["GET /user/repository_invitations"],
			listLanguages: ["GET /repos/{owner}/{repo}/languages"],
			listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
			listPublic: ["GET /repositories"],
			listPullRequestsAssociatedWithCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls"],
			listReleaseAssets: ["GET /repos/{owner}/{repo}/releases/{release_id}/assets"],
			listReleases: ["GET /repos/{owner}/{repo}/releases"],
			listTagProtection: ["GET /repos/{owner}/{repo}/tags/protection"],
			listTags: ["GET /repos/{owner}/{repo}/tags"],
			listTeams: ["GET /repos/{owner}/{repo}/teams"],
			listWebhookDeliveries: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries"],
			listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
			merge: ["POST /repos/{owner}/{repo}/merges"],
			mergeUpstream: ["POST /repos/{owner}/{repo}/merge-upstream"],
			pingWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/pings"],
			redeliverWebhookDelivery: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts"],
			removeAppAccessRestrictions: [
				"DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
				{},
				{ mapToData: "apps" }
			],
			removeCollaborator: ["DELETE /repos/{owner}/{repo}/collaborators/{username}"],
			removeStatusCheckContexts: [
				"DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
				{},
				{ mapToData: "contexts" }
			],
			removeStatusCheckProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
			removeTeamAccessRestrictions: [
				"DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
				{},
				{ mapToData: "teams" }
			],
			removeUserAccessRestrictions: [
				"DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
				{},
				{ mapToData: "users" }
			],
			renameBranch: ["POST /repos/{owner}/{repo}/branches/{branch}/rename"],
			replaceAllTopics: ["PUT /repos/{owner}/{repo}/topics"],
			requestPagesBuild: ["POST /repos/{owner}/{repo}/pages/builds"],
			setAdminBranchProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
			setAppAccessRestrictions: [
				"PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
				{},
				{ mapToData: "apps" }
			],
			setStatusCheckContexts: [
				"PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
				{},
				{ mapToData: "contexts" }
			],
			setTeamAccessRestrictions: [
				"PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
				{},
				{ mapToData: "teams" }
			],
			setUserAccessRestrictions: [
				"PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
				{},
				{ mapToData: "users" }
			],
			testPushWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/tests"],
			transfer: ["POST /repos/{owner}/{repo}/transfer"],
			update: ["PATCH /repos/{owner}/{repo}"],
			updateBranchProtection: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection"],
			updateCommitComment: ["PATCH /repos/{owner}/{repo}/comments/{comment_id}"],
			updateDeploymentBranchPolicy: ["PUT /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"],
			updateInformationAboutPagesSite: ["PUT /repos/{owner}/{repo}/pages"],
			updateInvitation: ["PATCH /repos/{owner}/{repo}/invitations/{invitation_id}"],
			updateOrgRuleset: ["PUT /orgs/{org}/rulesets/{ruleset_id}"],
			updatePullRequestReviewProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
			updateRelease: ["PATCH /repos/{owner}/{repo}/releases/{release_id}"],
			updateReleaseAsset: ["PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}"],
			updateRepoRuleset: ["PUT /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
			updateStatusCheckPotection: [
				"PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
				{},
				{ renamed: ["repos", "updateStatusCheckProtection"] }
			],
			updateStatusCheckProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
			updateWebhook: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}"],
			updateWebhookConfigForRepo: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config"],
			uploadReleaseAsset: ["POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}", { baseUrl: "https://uploads.github.com" }]
		},
		search: {
			code: ["GET /search/code"],
			commits: ["GET /search/commits"],
			issuesAndPullRequests: ["GET /search/issues"],
			labels: ["GET /search/labels"],
			repos: ["GET /search/repositories"],
			topics: ["GET /search/topics"],
			users: ["GET /search/users"]
		},
		secretScanning: {
			getAlert: ["GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"],
			listAlertsForEnterprise: ["GET /enterprises/{enterprise}/secret-scanning/alerts"],
			listAlertsForOrg: ["GET /orgs/{org}/secret-scanning/alerts"],
			listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
			listLocationsForAlert: ["GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations"],
			updateAlert: ["PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"]
		},
		securityAdvisories: {
			createFork: ["POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/forks"],
			createPrivateVulnerabilityReport: ["POST /repos/{owner}/{repo}/security-advisories/reports"],
			createRepositoryAdvisory: ["POST /repos/{owner}/{repo}/security-advisories"],
			createRepositoryAdvisoryCveRequest: ["POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/cve"],
			getGlobalAdvisory: ["GET /advisories/{ghsa_id}"],
			getRepositoryAdvisory: ["GET /repos/{owner}/{repo}/security-advisories/{ghsa_id}"],
			listGlobalAdvisories: ["GET /advisories"],
			listOrgRepositoryAdvisories: ["GET /orgs/{org}/security-advisories"],
			listRepositoryAdvisories: ["GET /repos/{owner}/{repo}/security-advisories"],
			updateRepositoryAdvisory: ["PATCH /repos/{owner}/{repo}/security-advisories/{ghsa_id}"]
		},
		teams: {
			addOrUpdateMembershipForUserInOrg: ["PUT /orgs/{org}/teams/{team_slug}/memberships/{username}"],
			addOrUpdateProjectPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}"],
			addOrUpdateRepoPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
			checkPermissionsForProjectInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects/{project_id}"],
			checkPermissionsForRepoInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
			create: ["POST /orgs/{org}/teams"],
			createDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
			createDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions"],
			deleteDiscussionCommentInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
			deleteDiscussionInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
			deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
			getByName: ["GET /orgs/{org}/teams/{team_slug}"],
			getDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
			getDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
			getMembershipForUserInOrg: ["GET /orgs/{org}/teams/{team_slug}/memberships/{username}"],
			list: ["GET /orgs/{org}/teams"],
			listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
			listDiscussionCommentsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
			listDiscussionsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions"],
			listForAuthenticatedUser: ["GET /user/teams"],
			listMembersInOrg: ["GET /orgs/{org}/teams/{team_slug}/members"],
			listPendingInvitationsInOrg: ["GET /orgs/{org}/teams/{team_slug}/invitations"],
			listProjectsInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects"],
			listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
			removeMembershipForUserInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}"],
			removeProjectInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}"],
			removeRepoInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
			updateDiscussionCommentInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
			updateDiscussionInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
			updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"]
		},
		users: {
			addEmailForAuthenticated: [
				"POST /user/emails",
				{},
				{ renamed: ["users", "addEmailForAuthenticatedUser"] }
			],
			addEmailForAuthenticatedUser: ["POST /user/emails"],
			addSocialAccountForAuthenticatedUser: ["POST /user/social_accounts"],
			block: ["PUT /user/blocks/{username}"],
			checkBlocked: ["GET /user/blocks/{username}"],
			checkFollowingForUser: ["GET /users/{username}/following/{target_user}"],
			checkPersonIsFollowedByAuthenticated: ["GET /user/following/{username}"],
			createGpgKeyForAuthenticated: [
				"POST /user/gpg_keys",
				{},
				{ renamed: ["users", "createGpgKeyForAuthenticatedUser"] }
			],
			createGpgKeyForAuthenticatedUser: ["POST /user/gpg_keys"],
			createPublicSshKeyForAuthenticated: [
				"POST /user/keys",
				{},
				{ renamed: ["users", "createPublicSshKeyForAuthenticatedUser"] }
			],
			createPublicSshKeyForAuthenticatedUser: ["POST /user/keys"],
			createSshSigningKeyForAuthenticatedUser: ["POST /user/ssh_signing_keys"],
			deleteEmailForAuthenticated: [
				"DELETE /user/emails",
				{},
				{ renamed: ["users", "deleteEmailForAuthenticatedUser"] }
			],
			deleteEmailForAuthenticatedUser: ["DELETE /user/emails"],
			deleteGpgKeyForAuthenticated: [
				"DELETE /user/gpg_keys/{gpg_key_id}",
				{},
				{ renamed: ["users", "deleteGpgKeyForAuthenticatedUser"] }
			],
			deleteGpgKeyForAuthenticatedUser: ["DELETE /user/gpg_keys/{gpg_key_id}"],
			deletePublicSshKeyForAuthenticated: [
				"DELETE /user/keys/{key_id}",
				{},
				{ renamed: ["users", "deletePublicSshKeyForAuthenticatedUser"] }
			],
			deletePublicSshKeyForAuthenticatedUser: ["DELETE /user/keys/{key_id}"],
			deleteSocialAccountForAuthenticatedUser: ["DELETE /user/social_accounts"],
			deleteSshSigningKeyForAuthenticatedUser: ["DELETE /user/ssh_signing_keys/{ssh_signing_key_id}"],
			follow: ["PUT /user/following/{username}"],
			getAuthenticated: ["GET /user"],
			getByUsername: ["GET /users/{username}"],
			getContextForUser: ["GET /users/{username}/hovercard"],
			getGpgKeyForAuthenticated: [
				"GET /user/gpg_keys/{gpg_key_id}",
				{},
				{ renamed: ["users", "getGpgKeyForAuthenticatedUser"] }
			],
			getGpgKeyForAuthenticatedUser: ["GET /user/gpg_keys/{gpg_key_id}"],
			getPublicSshKeyForAuthenticated: [
				"GET /user/keys/{key_id}",
				{},
				{ renamed: ["users", "getPublicSshKeyForAuthenticatedUser"] }
			],
			getPublicSshKeyForAuthenticatedUser: ["GET /user/keys/{key_id}"],
			getSshSigningKeyForAuthenticatedUser: ["GET /user/ssh_signing_keys/{ssh_signing_key_id}"],
			list: ["GET /users"],
			listBlockedByAuthenticated: [
				"GET /user/blocks",
				{},
				{ renamed: ["users", "listBlockedByAuthenticatedUser"] }
			],
			listBlockedByAuthenticatedUser: ["GET /user/blocks"],
			listEmailsForAuthenticated: [
				"GET /user/emails",
				{},
				{ renamed: ["users", "listEmailsForAuthenticatedUser"] }
			],
			listEmailsForAuthenticatedUser: ["GET /user/emails"],
			listFollowedByAuthenticated: [
				"GET /user/following",
				{},
				{ renamed: ["users", "listFollowedByAuthenticatedUser"] }
			],
			listFollowedByAuthenticatedUser: ["GET /user/following"],
			listFollowersForAuthenticatedUser: ["GET /user/followers"],
			listFollowersForUser: ["GET /users/{username}/followers"],
			listFollowingForUser: ["GET /users/{username}/following"],
			listGpgKeysForAuthenticated: [
				"GET /user/gpg_keys",
				{},
				{ renamed: ["users", "listGpgKeysForAuthenticatedUser"] }
			],
			listGpgKeysForAuthenticatedUser: ["GET /user/gpg_keys"],
			listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
			listPublicEmailsForAuthenticated: [
				"GET /user/public_emails",
				{},
				{ renamed: ["users", "listPublicEmailsForAuthenticatedUser"] }
			],
			listPublicEmailsForAuthenticatedUser: ["GET /user/public_emails"],
			listPublicKeysForUser: ["GET /users/{username}/keys"],
			listPublicSshKeysForAuthenticated: [
				"GET /user/keys",
				{},
				{ renamed: ["users", "listPublicSshKeysForAuthenticatedUser"] }
			],
			listPublicSshKeysForAuthenticatedUser: ["GET /user/keys"],
			listSocialAccountsForAuthenticatedUser: ["GET /user/social_accounts"],
			listSocialAccountsForUser: ["GET /users/{username}/social_accounts"],
			listSshSigningKeysForAuthenticatedUser: ["GET /user/ssh_signing_keys"],
			listSshSigningKeysForUser: ["GET /users/{username}/ssh_signing_keys"],
			setPrimaryEmailVisibilityForAuthenticated: [
				"PATCH /user/email/visibility",
				{},
				{ renamed: ["users", "setPrimaryEmailVisibilityForAuthenticatedUser"] }
			],
			setPrimaryEmailVisibilityForAuthenticatedUser: ["PATCH /user/email/visibility"],
			unblock: ["DELETE /user/blocks/{username}"],
			unfollow: ["DELETE /user/following/{username}"],
			updateAuthenticated: ["PATCH /user"]
		}
	};
	var endpoints_default = Endpoints;
	var endpointMethodsMap = /* @__PURE__ */ new Map();
	for (const [scope, endpoints] of Object.entries(endpoints_default)) for (const [methodName, endpoint$1] of Object.entries(endpoints)) {
		const [route, defaults, decorations] = endpoint$1;
		const [method, url] = route.split(/ /);
		const endpointDefaults = Object.assign({
			method,
			url
		}, defaults);
		if (!endpointMethodsMap.has(scope)) endpointMethodsMap.set(scope, /* @__PURE__ */ new Map());
		endpointMethodsMap.get(scope).set(methodName, {
			scope,
			methodName,
			endpointDefaults,
			decorations
		});
	}
	var handler = {
		has({ scope }, methodName) {
			return endpointMethodsMap.get(scope).has(methodName);
		},
		getOwnPropertyDescriptor(target, methodName) {
			return {
				value: this.get(target, methodName),
				configurable: true,
				writable: true,
				enumerable: true
			};
		},
		defineProperty(target, methodName, descriptor) {
			Object.defineProperty(target.cache, methodName, descriptor);
			return true;
		},
		deleteProperty(target, methodName) {
			delete target.cache[methodName];
			return true;
		},
		ownKeys({ scope }) {
			return [...endpointMethodsMap.get(scope).keys()];
		},
		set(target, methodName, value) {
			return target.cache[methodName] = value;
		},
		get({ octokit, scope, cache }, methodName) {
			if (cache[methodName]) return cache[methodName];
			const method = endpointMethodsMap.get(scope).get(methodName);
			if (!method) return void 0;
			const { endpointDefaults, decorations } = method;
			if (decorations) cache[methodName] = decorate(octokit, scope, methodName, endpointDefaults, decorations);
			else cache[methodName] = octokit.request.defaults(endpointDefaults);
			return cache[methodName];
		}
	};
	function endpointsToMethods(octokit) {
		const newMethods = {};
		for (const scope of endpointMethodsMap.keys()) newMethods[scope] = new Proxy({
			octokit,
			scope,
			cache: {}
		}, handler);
		return newMethods;
	}
	function decorate(octokit, scope, methodName, defaults, decorations) {
		const requestWithDefaults = octokit.request.defaults(defaults);
		function withDecorations(...args) {
			let options = requestWithDefaults.endpoint.merge(...args);
			if (decorations.mapToData) {
				options = Object.assign({}, options, {
					data: options[decorations.mapToData],
					[decorations.mapToData]: void 0
				});
				return requestWithDefaults(options);
			}
			if (decorations.renamed) {
				const [newScope, newMethodName] = decorations.renamed;
				octokit.log.warn(`octokit.${scope}.${methodName}() has been renamed to octokit.${newScope}.${newMethodName}()`);
			}
			if (decorations.deprecated) octokit.log.warn(decorations.deprecated);
			if (decorations.renamedParameters) {
				const options2 = requestWithDefaults.endpoint.merge(...args);
				for (const [name, alias] of Object.entries(decorations.renamedParameters)) if (name in options2) {
					octokit.log.warn(`"${name}" parameter is deprecated for "octokit.${scope}.${methodName}()". Use "${alias}" instead`);
					if (!(alias in options2)) options2[alias] = options2[name];
					delete options2[name];
				}
				return requestWithDefaults(options2);
			}
			return requestWithDefaults(...args);
		}
		return Object.assign(withDecorations, requestWithDefaults);
	}
	function restEndpointMethods(octokit) {
		const api = endpointsToMethods(octokit);
		return { rest: api };
	}
	restEndpointMethods.VERSION = VERSION$1;
	function legacyRestEndpointMethods(octokit) {
		const api = endpointsToMethods(octokit);
		return {
			...api,
			rest: api
		};
	}
	legacyRestEndpointMethods.VERSION = VERSION$1;
}) });

//#endregion
//#region ../node_modules/.pnpm/@octokit+plugin-paginate-rest@9.2.2_@octokit+core@5.2.2/node_modules/@octokit/plugin-paginate-rest/dist-node/index.js
var require_dist_node = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/@octokit+plugin-paginate-rest@9.2.2_@octokit+core@5.2.2/node_modules/@octokit/plugin-paginate-rest/dist-node/index.js": ((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var dist_src_exports = {};
	__export(dist_src_exports, {
		composePaginateRest: () => composePaginateRest,
		isPaginatingEndpoint: () => isPaginatingEndpoint,
		paginateRest: () => paginateRest,
		paginatingEndpoints: () => paginatingEndpoints
	});
	module.exports = __toCommonJS(dist_src_exports);
	var VERSION = "9.2.2";
	function normalizePaginatedListResponse(response) {
		if (!response.data) return {
			...response,
			data: []
		};
		const responseNeedsNormalization = "total_count" in response.data && !("url" in response.data);
		if (!responseNeedsNormalization) return response;
		const incompleteResults = response.data.incomplete_results;
		const repositorySelection = response.data.repository_selection;
		const totalCount = response.data.total_count;
		delete response.data.incomplete_results;
		delete response.data.repository_selection;
		delete response.data.total_count;
		const namespaceKey = Object.keys(response.data)[0];
		const data = response.data[namespaceKey];
		response.data = data;
		if (typeof incompleteResults !== "undefined") response.data.incomplete_results = incompleteResults;
		if (typeof repositorySelection !== "undefined") response.data.repository_selection = repositorySelection;
		response.data.total_count = totalCount;
		return response;
	}
	function iterator(octokit, route, parameters) {
		const options = typeof route === "function" ? route.endpoint(parameters) : octokit.request.endpoint(route, parameters);
		const requestMethod = typeof route === "function" ? route : octokit.request;
		const method = options.method;
		const headers = options.headers;
		let url = options.url;
		return { [Symbol.asyncIterator]: () => ({ async next() {
			if (!url) return { done: true };
			try {
				const response = await requestMethod({
					method,
					url,
					headers
				});
				const normalizedResponse = normalizePaginatedListResponse(response);
				url = ((normalizedResponse.headers.link || "").match(/<([^<>]+)>;\s*rel="next"/) || [])[1];
				return { value: normalizedResponse };
			} catch (error) {
				if (error.status !== 409) throw error;
				url = "";
				return { value: {
					status: 200,
					headers: {},
					data: []
				} };
			}
		} }) };
	}
	function paginate(octokit, route, parameters, mapFn) {
		if (typeof parameters === "function") {
			mapFn = parameters;
			parameters = void 0;
		}
		return gather(octokit, [], iterator(octokit, route, parameters)[Symbol.asyncIterator](), mapFn);
	}
	function gather(octokit, results, iterator2, mapFn) {
		return iterator2.next().then((result) => {
			if (result.done) return results;
			let earlyExit = false;
			function done() {
				earlyExit = true;
			}
			results = results.concat(mapFn ? mapFn(result.value, done) : result.value.data);
			if (earlyExit) return results;
			return gather(octokit, results, iterator2, mapFn);
		});
	}
	var composePaginateRest = Object.assign(paginate, { iterator });
	var paginatingEndpoints = [
		"GET /advisories",
		"GET /app/hook/deliveries",
		"GET /app/installation-requests",
		"GET /app/installations",
		"GET /assignments/{assignment_id}/accepted_assignments",
		"GET /classrooms",
		"GET /classrooms/{classroom_id}/assignments",
		"GET /enterprises/{enterprise}/dependabot/alerts",
		"GET /enterprises/{enterprise}/secret-scanning/alerts",
		"GET /events",
		"GET /gists",
		"GET /gists/public",
		"GET /gists/starred",
		"GET /gists/{gist_id}/comments",
		"GET /gists/{gist_id}/commits",
		"GET /gists/{gist_id}/forks",
		"GET /installation/repositories",
		"GET /issues",
		"GET /licenses",
		"GET /marketplace_listing/plans",
		"GET /marketplace_listing/plans/{plan_id}/accounts",
		"GET /marketplace_listing/stubbed/plans",
		"GET /marketplace_listing/stubbed/plans/{plan_id}/accounts",
		"GET /networks/{owner}/{repo}/events",
		"GET /notifications",
		"GET /organizations",
		"GET /orgs/{org}/actions/cache/usage-by-repository",
		"GET /orgs/{org}/actions/permissions/repositories",
		"GET /orgs/{org}/actions/runners",
		"GET /orgs/{org}/actions/secrets",
		"GET /orgs/{org}/actions/secrets/{secret_name}/repositories",
		"GET /orgs/{org}/actions/variables",
		"GET /orgs/{org}/actions/variables/{name}/repositories",
		"GET /orgs/{org}/blocks",
		"GET /orgs/{org}/code-scanning/alerts",
		"GET /orgs/{org}/codespaces",
		"GET /orgs/{org}/codespaces/secrets",
		"GET /orgs/{org}/codespaces/secrets/{secret_name}/repositories",
		"GET /orgs/{org}/copilot/billing/seats",
		"GET /orgs/{org}/dependabot/alerts",
		"GET /orgs/{org}/dependabot/secrets",
		"GET /orgs/{org}/dependabot/secrets/{secret_name}/repositories",
		"GET /orgs/{org}/events",
		"GET /orgs/{org}/failed_invitations",
		"GET /orgs/{org}/hooks",
		"GET /orgs/{org}/hooks/{hook_id}/deliveries",
		"GET /orgs/{org}/installations",
		"GET /orgs/{org}/invitations",
		"GET /orgs/{org}/invitations/{invitation_id}/teams",
		"GET /orgs/{org}/issues",
		"GET /orgs/{org}/members",
		"GET /orgs/{org}/members/{username}/codespaces",
		"GET /orgs/{org}/migrations",
		"GET /orgs/{org}/migrations/{migration_id}/repositories",
		"GET /orgs/{org}/organization-roles/{role_id}/teams",
		"GET /orgs/{org}/organization-roles/{role_id}/users",
		"GET /orgs/{org}/outside_collaborators",
		"GET /orgs/{org}/packages",
		"GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
		"GET /orgs/{org}/personal-access-token-requests",
		"GET /orgs/{org}/personal-access-token-requests/{pat_request_id}/repositories",
		"GET /orgs/{org}/personal-access-tokens",
		"GET /orgs/{org}/personal-access-tokens/{pat_id}/repositories",
		"GET /orgs/{org}/projects",
		"GET /orgs/{org}/properties/values",
		"GET /orgs/{org}/public_members",
		"GET /orgs/{org}/repos",
		"GET /orgs/{org}/rulesets",
		"GET /orgs/{org}/rulesets/rule-suites",
		"GET /orgs/{org}/secret-scanning/alerts",
		"GET /orgs/{org}/security-advisories",
		"GET /orgs/{org}/teams",
		"GET /orgs/{org}/teams/{team_slug}/discussions",
		"GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments",
		"GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions",
		"GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions",
		"GET /orgs/{org}/teams/{team_slug}/invitations",
		"GET /orgs/{org}/teams/{team_slug}/members",
		"GET /orgs/{org}/teams/{team_slug}/projects",
		"GET /orgs/{org}/teams/{team_slug}/repos",
		"GET /orgs/{org}/teams/{team_slug}/teams",
		"GET /projects/columns/{column_id}/cards",
		"GET /projects/{project_id}/collaborators",
		"GET /projects/{project_id}/columns",
		"GET /repos/{owner}/{repo}/actions/artifacts",
		"GET /repos/{owner}/{repo}/actions/caches",
		"GET /repos/{owner}/{repo}/actions/organization-secrets",
		"GET /repos/{owner}/{repo}/actions/organization-variables",
		"GET /repos/{owner}/{repo}/actions/runners",
		"GET /repos/{owner}/{repo}/actions/runs",
		"GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts",
		"GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs",
		"GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs",
		"GET /repos/{owner}/{repo}/actions/secrets",
		"GET /repos/{owner}/{repo}/actions/variables",
		"GET /repos/{owner}/{repo}/actions/workflows",
		"GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
		"GET /repos/{owner}/{repo}/activity",
		"GET /repos/{owner}/{repo}/assignees",
		"GET /repos/{owner}/{repo}/branches",
		"GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations",
		"GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs",
		"GET /repos/{owner}/{repo}/code-scanning/alerts",
		"GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances",
		"GET /repos/{owner}/{repo}/code-scanning/analyses",
		"GET /repos/{owner}/{repo}/codespaces",
		"GET /repos/{owner}/{repo}/codespaces/devcontainers",
		"GET /repos/{owner}/{repo}/codespaces/secrets",
		"GET /repos/{owner}/{repo}/collaborators",
		"GET /repos/{owner}/{repo}/comments",
		"GET /repos/{owner}/{repo}/comments/{comment_id}/reactions",
		"GET /repos/{owner}/{repo}/commits",
		"GET /repos/{owner}/{repo}/commits/{commit_sha}/comments",
		"GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls",
		"GET /repos/{owner}/{repo}/commits/{ref}/check-runs",
		"GET /repos/{owner}/{repo}/commits/{ref}/check-suites",
		"GET /repos/{owner}/{repo}/commits/{ref}/status",
		"GET /repos/{owner}/{repo}/commits/{ref}/statuses",
		"GET /repos/{owner}/{repo}/contributors",
		"GET /repos/{owner}/{repo}/dependabot/alerts",
		"GET /repos/{owner}/{repo}/dependabot/secrets",
		"GET /repos/{owner}/{repo}/deployments",
		"GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses",
		"GET /repos/{owner}/{repo}/environments",
		"GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies",
		"GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps",
		"GET /repos/{owner}/{repo}/events",
		"GET /repos/{owner}/{repo}/forks",
		"GET /repos/{owner}/{repo}/hooks",
		"GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries",
		"GET /repos/{owner}/{repo}/invitations",
		"GET /repos/{owner}/{repo}/issues",
		"GET /repos/{owner}/{repo}/issues/comments",
		"GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions",
		"GET /repos/{owner}/{repo}/issues/events",
		"GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
		"GET /repos/{owner}/{repo}/issues/{issue_number}/events",
		"GET /repos/{owner}/{repo}/issues/{issue_number}/labels",
		"GET /repos/{owner}/{repo}/issues/{issue_number}/reactions",
		"GET /repos/{owner}/{repo}/issues/{issue_number}/timeline",
		"GET /repos/{owner}/{repo}/keys",
		"GET /repos/{owner}/{repo}/labels",
		"GET /repos/{owner}/{repo}/milestones",
		"GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels",
		"GET /repos/{owner}/{repo}/notifications",
		"GET /repos/{owner}/{repo}/pages/builds",
		"GET /repos/{owner}/{repo}/projects",
		"GET /repos/{owner}/{repo}/pulls",
		"GET /repos/{owner}/{repo}/pulls/comments",
		"GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions",
		"GET /repos/{owner}/{repo}/pulls/{pull_number}/comments",
		"GET /repos/{owner}/{repo}/pulls/{pull_number}/commits",
		"GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
		"GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews",
		"GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments",
		"GET /repos/{owner}/{repo}/releases",
		"GET /repos/{owner}/{repo}/releases/{release_id}/assets",
		"GET /repos/{owner}/{repo}/releases/{release_id}/reactions",
		"GET /repos/{owner}/{repo}/rules/branches/{branch}",
		"GET /repos/{owner}/{repo}/rulesets",
		"GET /repos/{owner}/{repo}/rulesets/rule-suites",
		"GET /repos/{owner}/{repo}/secret-scanning/alerts",
		"GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations",
		"GET /repos/{owner}/{repo}/security-advisories",
		"GET /repos/{owner}/{repo}/stargazers",
		"GET /repos/{owner}/{repo}/subscribers",
		"GET /repos/{owner}/{repo}/tags",
		"GET /repos/{owner}/{repo}/teams",
		"GET /repos/{owner}/{repo}/topics",
		"GET /repositories",
		"GET /repositories/{repository_id}/environments/{environment_name}/secrets",
		"GET /repositories/{repository_id}/environments/{environment_name}/variables",
		"GET /search/code",
		"GET /search/commits",
		"GET /search/issues",
		"GET /search/labels",
		"GET /search/repositories",
		"GET /search/topics",
		"GET /search/users",
		"GET /teams/{team_id}/discussions",
		"GET /teams/{team_id}/discussions/{discussion_number}/comments",
		"GET /teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}/reactions",
		"GET /teams/{team_id}/discussions/{discussion_number}/reactions",
		"GET /teams/{team_id}/invitations",
		"GET /teams/{team_id}/members",
		"GET /teams/{team_id}/projects",
		"GET /teams/{team_id}/repos",
		"GET /teams/{team_id}/teams",
		"GET /user/blocks",
		"GET /user/codespaces",
		"GET /user/codespaces/secrets",
		"GET /user/emails",
		"GET /user/followers",
		"GET /user/following",
		"GET /user/gpg_keys",
		"GET /user/installations",
		"GET /user/installations/{installation_id}/repositories",
		"GET /user/issues",
		"GET /user/keys",
		"GET /user/marketplace_purchases",
		"GET /user/marketplace_purchases/stubbed",
		"GET /user/memberships/orgs",
		"GET /user/migrations",
		"GET /user/migrations/{migration_id}/repositories",
		"GET /user/orgs",
		"GET /user/packages",
		"GET /user/packages/{package_type}/{package_name}/versions",
		"GET /user/public_emails",
		"GET /user/repos",
		"GET /user/repository_invitations",
		"GET /user/social_accounts",
		"GET /user/ssh_signing_keys",
		"GET /user/starred",
		"GET /user/subscriptions",
		"GET /user/teams",
		"GET /users",
		"GET /users/{username}/events",
		"GET /users/{username}/events/orgs/{org}",
		"GET /users/{username}/events/public",
		"GET /users/{username}/followers",
		"GET /users/{username}/following",
		"GET /users/{username}/gists",
		"GET /users/{username}/gpg_keys",
		"GET /users/{username}/keys",
		"GET /users/{username}/orgs",
		"GET /users/{username}/packages",
		"GET /users/{username}/projects",
		"GET /users/{username}/received_events",
		"GET /users/{username}/received_events/public",
		"GET /users/{username}/repos",
		"GET /users/{username}/social_accounts",
		"GET /users/{username}/ssh_signing_keys",
		"GET /users/{username}/starred",
		"GET /users/{username}/subscriptions"
	];
	function isPaginatingEndpoint(arg) {
		if (typeof arg === "string") return paginatingEndpoints.includes(arg);
		else return false;
	}
	function paginateRest(octokit) {
		return { paginate: Object.assign(paginate.bind(null, octokit), { iterator: iterator.bind(null, octokit) }) };
	}
	paginateRest.VERSION = VERSION;
}) });

//#endregion
//#region ../node_modules/.pnpm/@actions+github@6.0.1/node_modules/@actions/github/lib/utils.js
var require_utils = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/@actions+github@6.0.1/node_modules/@actions/github/lib/utils.js": ((exports) => {
	var __createBinding$1 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault$1 = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar$1 = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
		}
		__setModuleDefault$1(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getOctokitOptions = exports.GitHub = exports.defaults = exports.context = void 0;
	const Context$1 = __importStar$1(require_context());
	const Utils = __importStar$1(require_utils$1());
	const core_1 = require_dist_node$2();
	const plugin_rest_endpoint_methods_1 = require_dist_node$1();
	const plugin_paginate_rest_1 = require_dist_node();
	exports.context = new Context$1.Context();
	const baseUrl = Utils.getApiBaseUrl();
	exports.defaults = {
		baseUrl,
		request: {
			agent: Utils.getProxyAgent(baseUrl),
			fetch: Utils.getProxyFetch(baseUrl)
		}
	};
	exports.GitHub = core_1.Octokit.plugin(plugin_rest_endpoint_methods_1.restEndpointMethods, plugin_paginate_rest_1.paginateRest).defaults(exports.defaults);
	/**
	* Convience function to correctly format Octokit Options to pass into the constructor.
	*
	* @param     token    the repo PAT or GITHUB_TOKEN
	* @param     options  other options to set
	*/
	function getOctokitOptions(token, options) {
		const opts = Object.assign({}, options || {});
		const auth$1 = Utils.getAuthString(token, opts);
		if (auth$1) opts.auth = auth$1;
		return opts;
	}
	exports.getOctokitOptions = getOctokitOptions;
}) });

//#endregion
//#region ../node_modules/.pnpm/@actions+github@6.0.1/node_modules/@actions/github/lib/github.js
var require_github = /* @__PURE__ */ __commonJS({ "../node_modules/.pnpm/@actions+github@6.0.1/node_modules/@actions/github/lib/github.js": ((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getOctokit = exports.context = void 0;
	const Context = __importStar(require_context());
	const utils_1 = require_utils();
	exports.context = new Context.Context();
	/**
	* Returns a hydrated octokit ready to use for GitHub Actions
	*
	* @param     token    the repo PAT or GITHUB_TOKEN
	* @param     options  other options to set
	*/
	function getOctokit(token, options, ...additionalPlugins) {
		const GitHubWithPlugins = utils_1.GitHub.plugin(...additionalPlugins);
		return new GitHubWithPlugins((0, utils_1.getOctokitOptions)(token, options));
	}
	exports.getOctokit = getOctokit;
}) });

//#endregion
//#region src/utils/git/create-new-git-branch.ts
var import_core = /* @__PURE__ */ __toESM$1(require_core(), 1);
var import_github = /* @__PURE__ */ __toESM$1(require_github(), 1);
/**
* Factory function that returns an async function to create a new Git branch in a GitHub repository using Octokit.
*
* @param octokit - An authenticated Octokit instance for interacting with the GitHub API.
* @returns An async function that creates a new branch from a specified base branch.
*
* @function
* @async
* @param owner - The owner of the repository.
* @param repo - The name of the repository.
* @param branchName - The name of the new branch to create.
* @param baseBranch - (Optional) The name of the base branch to branch from. Defaults to the current context ref or 'main'.
* @returns The newly created branch data if successful; otherwise, handles errors and sets the failure state.
*
* @throws Will call `setFailed` if the branch creation fails.
*/
function createNewGitBranch(octokit) {
	return async function createNewGitBranch$1({ baseBranch = import_github.context.ref.split("/").pop() || "main", branchName, owner, repo }) {
		try {
			const { data: refData } = await octokit.rest.git.getRef({
				owner,
				repo,
				ref: `heads/${baseBranch}`
			});
			const { data: newBranch } = await octokit.rest.git.createRef({
				owner,
				repo,
				ref: `refs/heads/${branchName}`,
				sha: refData.object.sha
			});
			return newBranch;
		} catch (error) {
			if (error instanceof Error) (0, import_core.setFailed)(`Failed to create new git branch: ${error.message}`);
			else (0, import_core.setFailed)("Failed to create new git branch: Unknown error");
		}
	};
}

//#endregion
export { createNewGitBranch };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5ldy1naXQtYnJhbmNoLmpzIiwibmFtZXMiOlsiQ29udGV4dCIsIl9fY3JlYXRlQmluZGluZyIsIl9fc2V0TW9kdWxlRGVmYXVsdCIsIl9faW1wb3J0U3RhciIsInJlZ2lzdGVyIiwibmFtZSIsIm1ldGhvZCIsImFkZEhvb2siLCJob29rIiwicmVtb3ZlSG9vayIsImhvb2siLCJfX2RlZlByb3AiLCJfX2dldE93blByb3BEZXNjIiwiX19nZXRPd25Qcm9wTmFtZXMiLCJfX2hhc093blByb3AiLCJfX2V4cG9ydCIsIl9fY29weVByb3BzIiwiX190b0NvbW1vbkpTIiwiZGlzdF9zcmNfZXhwb3J0cyIsImltcG9ydF91bml2ZXJzYWxfdXNlcl9hZ2VudCIsIlZFUlNJT04iLCJpc1BsYWluT2JqZWN0IiwiY29udGV4dCIsIndpdGhEZWZhdWx0cyIsIndyYXBweSIsImNiIiwiX19kZWZQcm9wIiwiX19nZXRPd25Qcm9wRGVzYyIsIl9fZ2V0T3duUHJvcE5hbWVzIiwiX19oYXNPd25Qcm9wIiwiX19leHBvcnQiLCJfX2NvcHlQcm9wcyIsIl9fdG9Db21tb25KUyIsImRpc3Rfc3JjX2V4cG9ydHMiLCJfX2RlZlByb3AiLCJfX2dldE93blByb3BEZXNjIiwiX19nZXRPd25Qcm9wTmFtZXMiLCJfX2hhc093blByb3AiLCJfX2V4cG9ydCIsIl9fY29weVByb3BzIiwiX190b0NvbW1vbkpTIiwiZGlzdF9zcmNfZXhwb3J0cyIsImltcG9ydF91bml2ZXJzYWxfdXNlcl9hZ2VudCIsIlZFUlNJT04iLCJ3aXRoRGVmYXVsdHMiLCJfX2RlZlByb3AiLCJfX2dldE93blByb3BEZXNjIiwiX19nZXRPd25Qcm9wTmFtZXMiLCJfX2hhc093blByb3AiLCJfX2V4cG9ydCIsIl9fY29weVByb3BzIiwiX190b0NvbW1vbkpTIiwiaW5kZXhfZXhwb3J0cyIsImltcG9ydF91bml2ZXJzYWxfdXNlcl9hZ2VudCIsIlZFUlNJT04iLCJiYXNlVXJsIiwiX19kZWZQcm9wIiwiX19nZXRPd25Qcm9wRGVzYyIsIl9fZ2V0T3duUHJvcE5hbWVzIiwiX19oYXNPd25Qcm9wIiwiX19leHBvcnQiLCJfX2NvcHlQcm9wcyIsIl9fdG9Db21tb25KUyIsImRpc3Rfc3JjX2V4cG9ydHMiLCJlbmRwb2ludCIsInJlcXVlc3QiLCJfX2RlZlByb3AiLCJfX2dldE93blByb3BEZXNjIiwiX19nZXRPd25Qcm9wTmFtZXMiLCJfX2hhc093blByb3AiLCJfX2V4cG9ydCIsIl9fY29weVByb3BzIiwiX190b0NvbW1vbkpTIiwiVkVSU0lPTiIsImhvb2siLCJhdXRoIiwiX19kZWZQcm9wIiwiX19nZXRPd25Qcm9wRGVzYyIsIl9fZ2V0T3duUHJvcE5hbWVzIiwiX19oYXNPd25Qcm9wIiwiX19leHBvcnQiLCJfX2NvcHlQcm9wcyIsIl9fdG9Db21tb25KUyIsImRpc3Rfc3JjX2V4cG9ydHMiLCJWRVJTSU9OIiwiZW5kcG9pbnQiLCJfX2NyZWF0ZUJpbmRpbmciLCJfX3NldE1vZHVsZURlZmF1bHQiLCJfX2ltcG9ydFN0YXIiLCJDb250ZXh0IiwiYXV0aCIsImNyZWF0ZU5ld0dpdEJyYW5jaCIsImNvbnRleHQiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFjdGlvbnMrZ2l0aHViQDYuMC4xL25vZGVfbW9kdWxlcy9AYWN0aW9ucy9naXRodWIvbGliL2NvbnRleHQuanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFjdGlvbnMrZ2l0aHViQDYuMC4xL25vZGVfbW9kdWxlcy9AYWN0aW9ucy9naXRodWIvbGliL2ludGVybmFsL3V0aWxzLmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3VuaXZlcnNhbC11c2VyLWFnZW50QDYuMC4xL25vZGVfbW9kdWxlcy91bml2ZXJzYWwtdXNlci1hZ2VudC9kaXN0LW5vZGUvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vYmVmb3JlLWFmdGVyLWhvb2tAMi4yLjMvbm9kZV9tb2R1bGVzL2JlZm9yZS1hZnRlci1ob29rL2xpYi9yZWdpc3Rlci5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9iZWZvcmUtYWZ0ZXItaG9va0AyLjIuMy9ub2RlX21vZHVsZXMvYmVmb3JlLWFmdGVyLWhvb2svbGliL2FkZC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9iZWZvcmUtYWZ0ZXItaG9va0AyLjIuMy9ub2RlX21vZHVsZXMvYmVmb3JlLWFmdGVyLWhvb2svbGliL3JlbW92ZS5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9iZWZvcmUtYWZ0ZXItaG9va0AyLjIuMy9ub2RlX21vZHVsZXMvYmVmb3JlLWFmdGVyLWhvb2svaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQG9jdG9raXQrZW5kcG9pbnRAOS4wLjYvbm9kZV9tb2R1bGVzL0BvY3Rva2l0L2VuZHBvaW50L2Rpc3Qtbm9kZS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kZXByZWNhdGlvbkAyLjMuMS9ub2RlX21vZHVsZXMvZGVwcmVjYXRpb24vZGlzdC1ub2RlL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3dyYXBweUAxLjAuMi9ub2RlX21vZHVsZXMvd3JhcHB5L3dyYXBweS5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9vbmNlQDEuNC4wL25vZGVfbW9kdWxlcy9vbmNlL29uY2UuanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQG9jdG9raXQrcmVxdWVzdC1lcnJvckA1LjEuMS9ub2RlX21vZHVsZXMvQG9jdG9raXQvcmVxdWVzdC1lcnJvci9kaXN0LW5vZGUvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQG9jdG9raXQrcmVxdWVzdEA4LjQuMS9ub2RlX21vZHVsZXMvQG9jdG9raXQvcmVxdWVzdC9kaXN0LW5vZGUvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQG9jdG9raXQrZ3JhcGhxbEA3LjEuMS9ub2RlX21vZHVsZXMvQG9jdG9raXQvZ3JhcGhxbC9kaXN0LW5vZGUvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQG9jdG9raXQrYXV0aC10b2tlbkA0LjAuMC9ub2RlX21vZHVsZXMvQG9jdG9raXQvYXV0aC10b2tlbi9kaXN0LW5vZGUvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQG9jdG9raXQrY29yZUA1LjIuMi9ub2RlX21vZHVsZXMvQG9jdG9raXQvY29yZS9kaXN0LW5vZGUvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQG9jdG9raXQrcGx1Z2luLXJlc3QtZW5kcG9pbnQtbWV0aG9kc0AxMC40LjFfQG9jdG9raXQrY29yZUA1LjIuMi9ub2RlX21vZHVsZXMvQG9jdG9raXQvcGx1Z2luLXJlc3QtZW5kcG9pbnQtbWV0aG9kcy9kaXN0LW5vZGUvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQG9jdG9raXQrcGx1Z2luLXBhZ2luYXRlLXJlc3RAOS4yLjJfQG9jdG9raXQrY29yZUA1LjIuMi9ub2RlX21vZHVsZXMvQG9jdG9raXQvcGx1Z2luLXBhZ2luYXRlLXJlc3QvZGlzdC1ub2RlL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhY3Rpb25zK2dpdGh1YkA2LjAuMS9ub2RlX21vZHVsZXMvQGFjdGlvbnMvZ2l0aHViL2xpYi91dGlscy5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWN0aW9ucytnaXRodWJANi4wLjEvbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2dpdGh1Yi9saWIvZ2l0aHViLmpzIiwiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9jcmVhdGUtbmV3LWdpdC1icmFuY2gudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNvbnRleHQgPSB2b2lkIDA7XG5jb25zdCBmc18xID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3Qgb3NfMSA9IHJlcXVpcmUoXCJvc1wiKTtcbmNsYXNzIENvbnRleHQge1xuICAgIC8qKlxuICAgICAqIEh5ZHJhdGUgdGhlIGNvbnRleHQgZnJvbSB0aGUgZW52aXJvbm1lbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHRoaXMucGF5bG9hZCA9IHt9O1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuR0lUSFVCX0VWRU5UX1BBVEgpIHtcbiAgICAgICAgICAgIGlmICgoMCwgZnNfMS5leGlzdHNTeW5jKShwcm9jZXNzLmVudi5HSVRIVUJfRVZFTlRfUEFUSCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBheWxvYWQgPSBKU09OLnBhcnNlKCgwLCBmc18xLnJlYWRGaWxlU3luYykocHJvY2Vzcy5lbnYuR0lUSFVCX0VWRU5UX1BBVEgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gcHJvY2Vzcy5lbnYuR0lUSFVCX0VWRU5UX1BBVEg7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYEdJVEhVQl9FVkVOVF9QQVRIICR7cGF0aH0gZG9lcyBub3QgZXhpc3Qke29zXzEuRU9MfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnROYW1lID0gcHJvY2Vzcy5lbnYuR0lUSFVCX0VWRU5UX05BTUU7XG4gICAgICAgIHRoaXMuc2hhID0gcHJvY2Vzcy5lbnYuR0lUSFVCX1NIQTtcbiAgICAgICAgdGhpcy5yZWYgPSBwcm9jZXNzLmVudi5HSVRIVUJfUkVGO1xuICAgICAgICB0aGlzLndvcmtmbG93ID0gcHJvY2Vzcy5lbnYuR0lUSFVCX1dPUktGTE9XO1xuICAgICAgICB0aGlzLmFjdGlvbiA9IHByb2Nlc3MuZW52LkdJVEhVQl9BQ1RJT047XG4gICAgICAgIHRoaXMuYWN0b3IgPSBwcm9jZXNzLmVudi5HSVRIVUJfQUNUT1I7XG4gICAgICAgIHRoaXMuam9iID0gcHJvY2Vzcy5lbnYuR0lUSFVCX0pPQjtcbiAgICAgICAgdGhpcy5ydW5BdHRlbXB0ID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuR0lUSFVCX1JVTl9BVFRFTVBULCAxMCk7XG4gICAgICAgIHRoaXMucnVuTnVtYmVyID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuR0lUSFVCX1JVTl9OVU1CRVIsIDEwKTtcbiAgICAgICAgdGhpcy5ydW5JZCA9IHBhcnNlSW50KHByb2Nlc3MuZW52LkdJVEhVQl9SVU5fSUQsIDEwKTtcbiAgICAgICAgdGhpcy5hcGlVcmwgPSAoX2EgPSBwcm9jZXNzLmVudi5HSVRIVUJfQVBJX1VSTCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb21gO1xuICAgICAgICB0aGlzLnNlcnZlclVybCA9IChfYiA9IHByb2Nlc3MuZW52LkdJVEhVQl9TRVJWRVJfVVJMKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBgaHR0cHM6Ly9naXRodWIuY29tYDtcbiAgICAgICAgdGhpcy5ncmFwaHFsVXJsID1cbiAgICAgICAgICAgIChfYyA9IHByb2Nlc3MuZW52LkdJVEhVQl9HUkFQSFFMX1VSTCkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vZ3JhcGhxbGA7XG4gICAgfVxuICAgIGdldCBpc3N1ZSgpIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMucGF5bG9hZDtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yZXBvKSwgeyBudW1iZXI6IChwYXlsb2FkLmlzc3VlIHx8IHBheWxvYWQucHVsbF9yZXF1ZXN0IHx8IHBheWxvYWQpLm51bWJlciB9KTtcbiAgICB9XG4gICAgZ2V0IHJlcG8oKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5HSVRIVUJfUkVQT1NJVE9SWSkge1xuICAgICAgICAgICAgY29uc3QgW293bmVyLCByZXBvXSA9IHByb2Nlc3MuZW52LkdJVEhVQl9SRVBPU0lUT1JZLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICByZXR1cm4geyBvd25lciwgcmVwbyB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBheWxvYWQucmVwb3NpdG9yeSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBvd25lcjogdGhpcy5wYXlsb2FkLnJlcG9zaXRvcnkub3duZXIubG9naW4sXG4gICAgICAgICAgICAgICAgcmVwbzogdGhpcy5wYXlsb2FkLnJlcG9zaXRvcnkubmFtZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb250ZXh0LnJlcG8gcmVxdWlyZXMgYSBHSVRIVUJfUkVQT1NJVE9SWSBlbnZpcm9ubWVudCB2YXJpYWJsZSBsaWtlICdvd25lci9yZXBvJ1wiKTtcbiAgICB9XG59XG5leHBvcnRzLkNvbnRleHQgPSBDb250ZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGV4dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEFwaUJhc2VVcmwgPSBleHBvcnRzLmdldFByb3h5RmV0Y2ggPSBleHBvcnRzLmdldFByb3h5QWdlbnREaXNwYXRjaGVyID0gZXhwb3J0cy5nZXRQcm94eUFnZW50ID0gZXhwb3J0cy5nZXRBdXRoU3RyaW5nID0gdm9pZCAwO1xuY29uc3QgaHR0cENsaWVudCA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvaHR0cC1jbGllbnRcIikpO1xuY29uc3QgdW5kaWNpXzEgPSByZXF1aXJlKFwidW5kaWNpXCIpO1xuZnVuY3Rpb24gZ2V0QXV0aFN0cmluZyh0b2tlbiwgb3B0aW9ucykge1xuICAgIGlmICghdG9rZW4gJiYgIW9wdGlvbnMuYXV0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciB0b2tlbiBvciBvcHRzLmF1dGggaXMgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodG9rZW4gJiYgb3B0aW9ucy5hdXRoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVycyB0b2tlbiBhbmQgb3B0cy5hdXRoIG1heSBub3QgYm90aCBiZSBzcGVjaWZpZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVvZiBvcHRpb25zLmF1dGggPT09ICdzdHJpbmcnID8gb3B0aW9ucy5hdXRoIDogYHRva2VuICR7dG9rZW59YDtcbn1cbmV4cG9ydHMuZ2V0QXV0aFN0cmluZyA9IGdldEF1dGhTdHJpbmc7XG5mdW5jdGlvbiBnZXRQcm94eUFnZW50KGRlc3RpbmF0aW9uVXJsKSB7XG4gICAgY29uc3QgaGMgPSBuZXcgaHR0cENsaWVudC5IdHRwQ2xpZW50KCk7XG4gICAgcmV0dXJuIGhjLmdldEFnZW50KGRlc3RpbmF0aW9uVXJsKTtcbn1cbmV4cG9ydHMuZ2V0UHJveHlBZ2VudCA9IGdldFByb3h5QWdlbnQ7XG5mdW5jdGlvbiBnZXRQcm94eUFnZW50RGlzcGF0Y2hlcihkZXN0aW5hdGlvblVybCkge1xuICAgIGNvbnN0IGhjID0gbmV3IGh0dHBDbGllbnQuSHR0cENsaWVudCgpO1xuICAgIHJldHVybiBoYy5nZXRBZ2VudERpc3BhdGNoZXIoZGVzdGluYXRpb25VcmwpO1xufVxuZXhwb3J0cy5nZXRQcm94eUFnZW50RGlzcGF0Y2hlciA9IGdldFByb3h5QWdlbnREaXNwYXRjaGVyO1xuZnVuY3Rpb24gZ2V0UHJveHlGZXRjaChkZXN0aW5hdGlvblVybCkge1xuICAgIGNvbnN0IGh0dHBEaXNwYXRjaGVyID0gZ2V0UHJveHlBZ2VudERpc3BhdGNoZXIoZGVzdGluYXRpb25VcmwpO1xuICAgIGNvbnN0IHByb3h5RmV0Y2ggPSAodXJsLCBvcHRzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiAoMCwgdW5kaWNpXzEuZmV0Y2gpKHVybCwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRzKSwgeyBkaXNwYXRjaGVyOiBodHRwRGlzcGF0Y2hlciB9KSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHByb3h5RmV0Y2g7XG59XG5leHBvcnRzLmdldFByb3h5RmV0Y2ggPSBnZXRQcm94eUZldGNoO1xuZnVuY3Rpb24gZ2V0QXBpQmFzZVVybCgpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5lbnZbJ0dJVEhVQl9BUElfVVJMJ10gfHwgJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20nO1xufVxuZXhwb3J0cy5nZXRBcGlCYXNlVXJsID0gZ2V0QXBpQmFzZVVybDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWxzLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gZ2V0VXNlckFnZW50KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciA9PT0gXCJvYmplY3RcIiAmJiBcInVzZXJBZ2VudFwiIGluIG5hdmlnYXRvcikge1xuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHByb2Nlc3MudmVyc2lvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGBOb2RlLmpzLyR7cHJvY2Vzcy52ZXJzaW9uLnN1YnN0cigxKX0gKCR7cHJvY2Vzcy5wbGF0Zm9ybX07ICR7cHJvY2Vzcy5hcmNofSlgO1xuICB9XG5cbiAgcmV0dXJuIFwiPGVudmlyb25tZW50IHVuZGV0ZWN0YWJsZT5cIjtcbn1cblxuZXhwb3J0cy5nZXRVc2VyQWdlbnQgPSBnZXRVc2VyQWdlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXI7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyKHN0YXRlLCBuYW1lLCBtZXRob2QsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBtZXRob2QgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm1ldGhvZCBmb3IgYmVmb3JlIGhvb2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkobmFtZSkpIHtcbiAgICByZXR1cm4gbmFtZS5yZXZlcnNlKCkucmVkdWNlKGZ1bmN0aW9uIChjYWxsYmFjaywgbmFtZSkge1xuICAgICAgcmV0dXJuIHJlZ2lzdGVyLmJpbmQobnVsbCwgc3RhdGUsIG5hbWUsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICB9LCBtZXRob2QpKCk7XG4gIH1cblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzdGF0ZS5yZWdpc3RyeVtuYW1lXSkge1xuICAgICAgcmV0dXJuIG1ldGhvZChvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGUucmVnaXN0cnlbbmFtZV0ucmVkdWNlKGZ1bmN0aW9uIChtZXRob2QsIHJlZ2lzdGVyZWQpIHtcbiAgICAgIHJldHVybiByZWdpc3RlcmVkLmhvb2suYmluZChudWxsLCBtZXRob2QsIG9wdGlvbnMpO1xuICAgIH0sIG1ldGhvZCkoKTtcbiAgfSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGFkZEhvb2s7XG5cbmZ1bmN0aW9uIGFkZEhvb2soc3RhdGUsIGtpbmQsIG5hbWUsIGhvb2spIHtcbiAgdmFyIG9yaWcgPSBob29rO1xuICBpZiAoIXN0YXRlLnJlZ2lzdHJ5W25hbWVdKSB7XG4gICAgc3RhdGUucmVnaXN0cnlbbmFtZV0gPSBbXTtcbiAgfVxuXG4gIGlmIChraW5kID09PSBcImJlZm9yZVwiKSB7XG4gICAgaG9vayA9IGZ1bmN0aW9uIChtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAudGhlbihvcmlnLmJpbmQobnVsbCwgb3B0aW9ucykpXG4gICAgICAgIC50aGVuKG1ldGhvZC5iaW5kKG51bGwsIG9wdGlvbnMpKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKGtpbmQgPT09IFwiYWZ0ZXJcIikge1xuICAgIGhvb2sgPSBmdW5jdGlvbiAobWV0aG9kLCBvcHRpb25zKSB7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgIC50aGVuKG1ldGhvZC5iaW5kKG51bGwsIG9wdGlvbnMpKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0Xykge1xuICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdF87XG4gICAgICAgICAgcmV0dXJuIG9yaWcocmVzdWx0LCBvcHRpb25zKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBpZiAoa2luZCA9PT0gXCJlcnJvclwiKSB7XG4gICAgaG9vayA9IGZ1bmN0aW9uIChtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAudGhlbihtZXRob2QuYmluZChudWxsLCBvcHRpb25zKSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBvcmlnKGVycm9yLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRlLnJlZ2lzdHJ5W25hbWVdLnB1c2goe1xuICAgIGhvb2s6IGhvb2ssXG4gICAgb3JpZzogb3JpZyxcbiAgfSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlbW92ZUhvb2s7XG5cbmZ1bmN0aW9uIHJlbW92ZUhvb2soc3RhdGUsIG5hbWUsIG1ldGhvZCkge1xuICBpZiAoIXN0YXRlLnJlZ2lzdHJ5W25hbWVdKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGluZGV4ID0gc3RhdGUucmVnaXN0cnlbbmFtZV1cbiAgICAubWFwKGZ1bmN0aW9uIChyZWdpc3RlcmVkKSB7XG4gICAgICByZXR1cm4gcmVnaXN0ZXJlZC5vcmlnO1xuICAgIH0pXG4gICAgLmluZGV4T2YobWV0aG9kKTtcblxuICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc3RhdGUucmVnaXN0cnlbbmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbn1cbiIsInZhciByZWdpc3RlciA9IHJlcXVpcmUoXCIuL2xpYi9yZWdpc3RlclwiKTtcbnZhciBhZGRIb29rID0gcmVxdWlyZShcIi4vbGliL2FkZFwiKTtcbnZhciByZW1vdmVIb29rID0gcmVxdWlyZShcIi4vbGliL3JlbW92ZVwiKTtcblxuLy8gYmluZCB3aXRoIGFycmF5IG9mIGFyZ3VtZW50czogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxNzkyOTEzXG52YXIgYmluZCA9IEZ1bmN0aW9uLmJpbmQ7XG52YXIgYmluZGFibGUgPSBiaW5kLmJpbmQoYmluZCk7XG5cbmZ1bmN0aW9uIGJpbmRBcGkoaG9vaywgc3RhdGUsIG5hbWUpIHtcbiAgdmFyIHJlbW92ZUhvb2tSZWYgPSBiaW5kYWJsZShyZW1vdmVIb29rLCBudWxsKS5hcHBseShcbiAgICBudWxsLFxuICAgIG5hbWUgPyBbc3RhdGUsIG5hbWVdIDogW3N0YXRlXVxuICApO1xuICBob29rLmFwaSA9IHsgcmVtb3ZlOiByZW1vdmVIb29rUmVmIH07XG4gIGhvb2sucmVtb3ZlID0gcmVtb3ZlSG9va1JlZjtcbiAgW1wiYmVmb3JlXCIsIFwiZXJyb3JcIiwgXCJhZnRlclwiLCBcIndyYXBcIl0uZm9yRWFjaChmdW5jdGlvbiAoa2luZCkge1xuICAgIHZhciBhcmdzID0gbmFtZSA/IFtzdGF0ZSwga2luZCwgbmFtZV0gOiBbc3RhdGUsIGtpbmRdO1xuICAgIGhvb2tba2luZF0gPSBob29rLmFwaVtraW5kXSA9IGJpbmRhYmxlKGFkZEhvb2ssIG51bGwpLmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gSG9va1Npbmd1bGFyKCkge1xuICB2YXIgc2luZ3VsYXJIb29rTmFtZSA9IFwiaFwiO1xuICB2YXIgc2luZ3VsYXJIb29rU3RhdGUgPSB7XG4gICAgcmVnaXN0cnk6IHt9LFxuICB9O1xuICB2YXIgc2luZ3VsYXJIb29rID0gcmVnaXN0ZXIuYmluZChudWxsLCBzaW5ndWxhckhvb2tTdGF0ZSwgc2luZ3VsYXJIb29rTmFtZSk7XG4gIGJpbmRBcGkoc2luZ3VsYXJIb29rLCBzaW5ndWxhckhvb2tTdGF0ZSwgc2luZ3VsYXJIb29rTmFtZSk7XG4gIHJldHVybiBzaW5ndWxhckhvb2s7XG59XG5cbmZ1bmN0aW9uIEhvb2tDb2xsZWN0aW9uKCkge1xuICB2YXIgc3RhdGUgPSB7XG4gICAgcmVnaXN0cnk6IHt9LFxuICB9O1xuXG4gIHZhciBob29rID0gcmVnaXN0ZXIuYmluZChudWxsLCBzdGF0ZSk7XG4gIGJpbmRBcGkoaG9vaywgc3RhdGUpO1xuXG4gIHJldHVybiBob29rO1xufVxuXG52YXIgY29sbGVjdGlvbkhvb2tEZXByZWNhdGlvbk1lc3NhZ2VEaXNwbGF5ZWQgPSBmYWxzZTtcbmZ1bmN0aW9uIEhvb2soKSB7XG4gIGlmICghY29sbGVjdGlvbkhvb2tEZXByZWNhdGlvbk1lc3NhZ2VEaXNwbGF5ZWQpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnW2JlZm9yZS1hZnRlci1ob29rXTogXCJIb29rKClcIiByZXB1cnBvc2luZyB3YXJuaW5nLCB1c2UgXCJIb29rLkNvbGxlY3Rpb24oKVwiLiBSZWFkIG1vcmU6IGh0dHBzOi8vZ2l0LmlvL3VwZ3JhZGUtYmVmb3JlLWFmdGVyLWhvb2stdG8tMS40J1xuICAgICk7XG4gICAgY29sbGVjdGlvbkhvb2tEZXByZWNhdGlvbk1lc3NhZ2VEaXNwbGF5ZWQgPSB0cnVlO1xuICB9XG4gIHJldHVybiBIb29rQ29sbGVjdGlvbigpO1xufVxuXG5Ib29rLlNpbmd1bGFyID0gSG9va1Npbmd1bGFyLmJpbmQoKTtcbkhvb2suQ29sbGVjdGlvbiA9IEhvb2tDb2xsZWN0aW9uLmJpbmQoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBIb29rO1xuLy8gZXhwb3NlIGNvbnN0cnVjdG9ycyBhcyBhIG5hbWVkIHByb3BlcnR5IGZvciBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5Ib29rID0gSG9vaztcbm1vZHVsZS5leHBvcnRzLlNpbmd1bGFyID0gSG9vay5TaW5ndWxhcjtcbm1vZHVsZS5leHBvcnRzLkNvbGxlY3Rpb24gPSBIb29rLkNvbGxlY3Rpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19nZXRPd25Qcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBfX2hhc093blByb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIF9fZXhwb3J0ID0gKHRhcmdldCwgYWxsKSA9PiB7XG4gIGZvciAodmFyIG5hbWUgaW4gYWxsKVxuICAgIF9fZGVmUHJvcCh0YXJnZXQsIG5hbWUsIHsgZ2V0OiBhbGxbbmFtZV0sIGVudW1lcmFibGU6IHRydWUgfSk7XG59O1xudmFyIF9fY29weVByb3BzID0gKHRvLCBmcm9tLCBleGNlcHQsIGRlc2MpID0+IHtcbiAgaWYgKGZyb20gJiYgdHlwZW9mIGZyb20gPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGZyb20gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGZvciAobGV0IGtleSBvZiBfX2dldE93blByb3BOYW1lcyhmcm9tKSlcbiAgICAgIGlmICghX19oYXNPd25Qcm9wLmNhbGwodG8sIGtleSkgJiYga2V5ICE9PSBleGNlcHQpXG4gICAgICAgIF9fZGVmUHJvcCh0bywga2V5LCB7IGdldDogKCkgPT4gZnJvbVtrZXldLCBlbnVtZXJhYmxlOiAhKGRlc2MgPSBfX2dldE93blByb3BEZXNjKGZyb20sIGtleSkpIHx8IGRlc2MuZW51bWVyYWJsZSB9KTtcbiAgfVxuICByZXR1cm4gdG87XG59O1xudmFyIF9fdG9Db21tb25KUyA9IChtb2QpID0+IF9fY29weVByb3BzKF9fZGVmUHJvcCh7fSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSksIG1vZCk7XG5cbi8vIHBrZy9kaXN0LXNyYy9pbmRleC5qc1xudmFyIGRpc3Rfc3JjX2V4cG9ydHMgPSB7fTtcbl9fZXhwb3J0KGRpc3Rfc3JjX2V4cG9ydHMsIHtcbiAgZW5kcG9pbnQ6ICgpID0+IGVuZHBvaW50XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX190b0NvbW1vbkpTKGRpc3Rfc3JjX2V4cG9ydHMpO1xuXG4vLyBwa2cvZGlzdC1zcmMvZGVmYXVsdHMuanNcbnZhciBpbXBvcnRfdW5pdmVyc2FsX3VzZXJfYWdlbnQgPSByZXF1aXJlKFwidW5pdmVyc2FsLXVzZXItYWdlbnRcIik7XG5cbi8vIHBrZy9kaXN0LXNyYy92ZXJzaW9uLmpzXG52YXIgVkVSU0lPTiA9IFwiOS4wLjZcIjtcblxuLy8gcGtnL2Rpc3Qtc3JjL2RlZmF1bHRzLmpzXG52YXIgdXNlckFnZW50ID0gYG9jdG9raXQtZW5kcG9pbnQuanMvJHtWRVJTSU9OfSAkeygwLCBpbXBvcnRfdW5pdmVyc2FsX3VzZXJfYWdlbnQuZ2V0VXNlckFnZW50KSgpfWA7XG52YXIgREVGQVVMVFMgPSB7XG4gIG1ldGhvZDogXCJHRVRcIixcbiAgYmFzZVVybDogXCJodHRwczovL2FwaS5naXRodWIuY29tXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhY2NlcHQ6IFwiYXBwbGljYXRpb24vdm5kLmdpdGh1Yi52Mytqc29uXCIsXG4gICAgXCJ1c2VyLWFnZW50XCI6IHVzZXJBZ2VudFxuICB9LFxuICBtZWRpYVR5cGU6IHtcbiAgICBmb3JtYXQ6IFwiXCJcbiAgfVxufTtcblxuLy8gcGtnL2Rpc3Qtc3JjL3V0aWwvbG93ZXJjYXNlLWtleXMuanNcbmZ1bmN0aW9uIGxvd2VyY2FzZUtleXMob2JqZWN0KSB7XG4gIGlmICghb2JqZWN0KSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpLnJlZHVjZSgobmV3T2JqLCBrZXkpID0+IHtcbiAgICBuZXdPYmpba2V5LnRvTG93ZXJDYXNlKCldID0gb2JqZWN0W2tleV07XG4gICAgcmV0dXJuIG5ld09iajtcbiAgfSwge30pO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvdXRpbC9pcy1wbGFpbi1vYmplY3QuanNcbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCB2YWx1ZSA9PT0gbnVsbClcbiAgICByZXR1cm4gZmFsc2U7XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICE9PSBcIltvYmplY3QgT2JqZWN0XVwiKVxuICAgIHJldHVybiBmYWxzZTtcbiAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpXG4gICAgcmV0dXJuIHRydWU7XG4gIGNvbnN0IEN0b3IgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocHJvdG8sIFwiY29uc3RydWN0b3JcIikgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PT0gXCJmdW5jdGlvblwiICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsKEN0b3IpID09PSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbCh2YWx1ZSk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy91dGlsL21lcmdlLWRlZXAuanNcbmZ1bmN0aW9uIG1lcmdlRGVlcChkZWZhdWx0cywgb3B0aW9ucykge1xuICBjb25zdCByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cyk7XG4gIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KG9wdGlvbnNba2V5XSkpIHtcbiAgICAgIGlmICghKGtleSBpbiBkZWZhdWx0cykpXG4gICAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7IFtrZXldOiBvcHRpb25zW2tleV0gfSk7XG4gICAgICBlbHNlXG4gICAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2VEZWVwKGRlZmF1bHRzW2tleV0sIG9wdGlvbnNba2V5XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7IFtrZXldOiBvcHRpb25zW2tleV0gfSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL3V0aWwvcmVtb3ZlLXVuZGVmaW5lZC1wcm9wZXJ0aWVzLmpzXG5mdW5jdGlvbiByZW1vdmVVbmRlZmluZWRQcm9wZXJ0aWVzKG9iaikge1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqW2tleV0gPT09IHZvaWQgMCkge1xuICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvbWVyZ2UuanNcbmZ1bmN0aW9uIG1lcmdlKGRlZmF1bHRzLCByb3V0ZSwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIHJvdXRlID09PSBcInN0cmluZ1wiKSB7XG4gICAgbGV0IFttZXRob2QsIHVybF0gPSByb3V0ZS5zcGxpdChcIiBcIik7XG4gICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24odXJsID8geyBtZXRob2QsIHVybCB9IDogeyB1cmw6IG1ldGhvZCB9LCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcm91dGUpO1xuICB9XG4gIG9wdGlvbnMuaGVhZGVycyA9IGxvd2VyY2FzZUtleXMob3B0aW9ucy5oZWFkZXJzKTtcbiAgcmVtb3ZlVW5kZWZpbmVkUHJvcGVydGllcyhvcHRpb25zKTtcbiAgcmVtb3ZlVW5kZWZpbmVkUHJvcGVydGllcyhvcHRpb25zLmhlYWRlcnMpO1xuICBjb25zdCBtZXJnZWRPcHRpb25zID0gbWVyZ2VEZWVwKGRlZmF1bHRzIHx8IHt9LCBvcHRpb25zKTtcbiAgaWYgKG9wdGlvbnMudXJsID09PSBcIi9ncmFwaHFsXCIpIHtcbiAgICBpZiAoZGVmYXVsdHMgJiYgZGVmYXVsdHMubWVkaWFUeXBlLnByZXZpZXdzPy5sZW5ndGgpIHtcbiAgICAgIG1lcmdlZE9wdGlvbnMubWVkaWFUeXBlLnByZXZpZXdzID0gZGVmYXVsdHMubWVkaWFUeXBlLnByZXZpZXdzLmZpbHRlcihcbiAgICAgICAgKHByZXZpZXcpID0+ICFtZXJnZWRPcHRpb25zLm1lZGlhVHlwZS5wcmV2aWV3cy5pbmNsdWRlcyhwcmV2aWV3KVxuICAgICAgKS5jb25jYXQobWVyZ2VkT3B0aW9ucy5tZWRpYVR5cGUucHJldmlld3MpO1xuICAgIH1cbiAgICBtZXJnZWRPcHRpb25zLm1lZGlhVHlwZS5wcmV2aWV3cyA9IChtZXJnZWRPcHRpb25zLm1lZGlhVHlwZS5wcmV2aWV3cyB8fCBbXSkubWFwKChwcmV2aWV3KSA9PiBwcmV2aWV3LnJlcGxhY2UoLy1wcmV2aWV3LywgXCJcIikpO1xuICB9XG4gIHJldHVybiBtZXJnZWRPcHRpb25zO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvdXRpbC9hZGQtcXVlcnktcGFyYW1ldGVycy5qc1xuZnVuY3Rpb24gYWRkUXVlcnlQYXJhbWV0ZXJzKHVybCwgcGFyYW1ldGVycykge1xuICBjb25zdCBzZXBhcmF0b3IgPSAvXFw/Ly50ZXN0KHVybCkgPyBcIiZcIiA6IFwiP1wiO1xuICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKHBhcmFtZXRlcnMpO1xuICBpZiAobmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICByZXR1cm4gdXJsICsgc2VwYXJhdG9yICsgbmFtZXMubWFwKChuYW1lKSA9PiB7XG4gICAgaWYgKG5hbWUgPT09IFwicVwiKSB7XG4gICAgICByZXR1cm4gXCJxPVwiICsgcGFyYW1ldGVycy5xLnNwbGl0KFwiK1wiKS5tYXAoZW5jb2RlVVJJQ29tcG9uZW50KS5qb2luKFwiK1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke25hbWV9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtZXRlcnNbbmFtZV0pfWA7XG4gIH0pLmpvaW4oXCImXCIpO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvdXRpbC9leHRyYWN0LXVybC12YXJpYWJsZS1uYW1lcy5qc1xudmFyIHVybFZhcmlhYmxlUmVnZXggPSAvXFx7W157fX1dK1xcfS9nO1xuZnVuY3Rpb24gcmVtb3ZlTm9uQ2hhcnModmFyaWFibGVOYW1lKSB7XG4gIHJldHVybiB2YXJpYWJsZU5hbWUucmVwbGFjZSgvKD86XlxcVyspfCg/Oig/PCFcXFcpXFxXKyQpL2csIFwiXCIpLnNwbGl0KC8sLyk7XG59XG5mdW5jdGlvbiBleHRyYWN0VXJsVmFyaWFibGVOYW1lcyh1cmwpIHtcbiAgY29uc3QgbWF0Y2hlcyA9IHVybC5tYXRjaCh1cmxWYXJpYWJsZVJlZ2V4KTtcbiAgaWYgKCFtYXRjaGVzKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHJldHVybiBtYXRjaGVzLm1hcChyZW1vdmVOb25DaGFycykucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSwgW10pO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvdXRpbC9vbWl0LmpzXG5mdW5jdGlvbiBvbWl0KG9iamVjdCwga2V5c1RvT21pdCkge1xuICBjb25zdCByZXN1bHQgPSB7IF9fcHJvdG9fXzogbnVsbCB9O1xuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvYmplY3QpKSB7XG4gICAgaWYgKGtleXNUb09taXQuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBvYmplY3Rba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL3V0aWwvdXJsLXRlbXBsYXRlLmpzXG5mdW5jdGlvbiBlbmNvZGVSZXNlcnZlZChzdHIpIHtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvKCVbMC05QS1GYS1mXXsyfSkvZykubWFwKGZ1bmN0aW9uKHBhcnQpIHtcbiAgICBpZiAoIS8lWzAtOUEtRmEtZl0vLnRlc3QocGFydCkpIHtcbiAgICAgIHBhcnQgPSBlbmNvZGVVUkkocGFydCkucmVwbGFjZSgvJTVCL2csIFwiW1wiKS5yZXBsYWNlKC8lNUQvZywgXCJdXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcGFydDtcbiAgfSkuam9pbihcIlwiKTtcbn1cbmZ1bmN0aW9uIGVuY29kZVVucmVzZXJ2ZWQoc3RyKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKSpdL2csIGZ1bmN0aW9uKGMpIHtcbiAgICByZXR1cm4gXCIlXCIgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gZW5jb2RlVmFsdWUob3BlcmF0b3IsIHZhbHVlLCBrZXkpIHtcbiAgdmFsdWUgPSBvcGVyYXRvciA9PT0gXCIrXCIgfHwgb3BlcmF0b3IgPT09IFwiI1wiID8gZW5jb2RlUmVzZXJ2ZWQodmFsdWUpIDogZW5jb2RlVW5yZXNlcnZlZCh2YWx1ZSk7XG4gIGlmIChrZXkpIHtcbiAgICByZXR1cm4gZW5jb2RlVW5yZXNlcnZlZChrZXkpICsgXCI9XCIgKyB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbmZ1bmN0aW9uIGlzRGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZvaWQgMCAmJiB2YWx1ZSAhPT0gbnVsbDtcbn1cbmZ1bmN0aW9uIGlzS2V5T3BlcmF0b3Iob3BlcmF0b3IpIHtcbiAgcmV0dXJuIG9wZXJhdG9yID09PSBcIjtcIiB8fCBvcGVyYXRvciA9PT0gXCImXCIgfHwgb3BlcmF0b3IgPT09IFwiP1wiO1xufVxuZnVuY3Rpb24gZ2V0VmFsdWVzKGNvbnRleHQsIG9wZXJhdG9yLCBrZXksIG1vZGlmaWVyKSB7XG4gIHZhciB2YWx1ZSA9IGNvbnRleHRba2V5XSwgcmVzdWx0ID0gW107XG4gIGlmIChpc0RlZmluZWQodmFsdWUpICYmIHZhbHVlICE9PSBcIlwiKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikge1xuICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgaWYgKG1vZGlmaWVyICYmIG1vZGlmaWVyICE9PSBcIipcIikge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygwLCBwYXJzZUludChtb2RpZmllciwgMTApKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICBlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWUsIGlzS2V5T3BlcmF0b3Iob3BlcmF0b3IpID8ga2V5IDogXCJcIilcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtb2RpZmllciA9PT0gXCIqXCIpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWUuZmlsdGVyKGlzRGVmaW5lZCkuZm9yRWFjaChmdW5jdGlvbih2YWx1ZTIpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICBlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWUyLCBpc0tleU9wZXJhdG9yKG9wZXJhdG9yKSA/IGtleSA6IFwiXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcbiAgICAgICAgICAgIGlmIChpc0RlZmluZWQodmFsdWVba10pKSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZVtrXSwgaykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0bXAgPSBbXTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWUuZmlsdGVyKGlzRGVmaW5lZCkuZm9yRWFjaChmdW5jdGlvbih2YWx1ZTIpIHtcbiAgICAgICAgICAgIHRtcC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZTIpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWZpbmVkKHZhbHVlW2tdKSkge1xuICAgICAgICAgICAgICB0bXAucHVzaChlbmNvZGVVbnJlc2VydmVkKGspKTtcbiAgICAgICAgICAgICAgdG1wLnB1c2goZW5jb2RlVmFsdWUob3BlcmF0b3IsIHZhbHVlW2tdLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNLZXlPcGVyYXRvcihvcGVyYXRvcikpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVVbnJlc2VydmVkKGtleSkgKyBcIj1cIiArIHRtcC5qb2luKFwiLFwiKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodG1wLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHRtcC5qb2luKFwiLFwiKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG9wZXJhdG9yID09PSBcIjtcIikge1xuICAgICAgaWYgKGlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZW5jb2RlVW5yZXNlcnZlZChrZXkpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcIlwiICYmIChvcGVyYXRvciA9PT0gXCImXCIgfHwgb3BlcmF0b3IgPT09IFwiP1wiKSkge1xuICAgICAgcmVzdWx0LnB1c2goZW5jb2RlVW5yZXNlcnZlZChrZXkpICsgXCI9XCIpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiXCIpIHtcbiAgICAgIHJlc3VsdC5wdXNoKFwiXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gcGFyc2VVcmwodGVtcGxhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICBleHBhbmQ6IGV4cGFuZC5iaW5kKG51bGwsIHRlbXBsYXRlKVxuICB9O1xufVxuZnVuY3Rpb24gZXhwYW5kKHRlbXBsYXRlLCBjb250ZXh0KSB7XG4gIHZhciBvcGVyYXRvcnMgPSBbXCIrXCIsIFwiI1wiLCBcIi5cIiwgXCIvXCIsIFwiO1wiLCBcIj9cIiwgXCImXCJdO1xuICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoXG4gICAgL1xceyhbXlxce1xcfV0rKVxcfXwoW15cXHtcXH1dKykvZyxcbiAgICBmdW5jdGlvbihfLCBleHByZXNzaW9uLCBsaXRlcmFsKSB7XG4gICAgICBpZiAoZXhwcmVzc2lvbikge1xuICAgICAgICBsZXQgb3BlcmF0b3IgPSBcIlwiO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgaWYgKG9wZXJhdG9ycy5pbmRleE9mKGV4cHJlc3Npb24uY2hhckF0KDApKSAhPT0gLTEpIHtcbiAgICAgICAgICBvcGVyYXRvciA9IGV4cHJlc3Npb24uY2hhckF0KDApO1xuICAgICAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnN1YnN0cigxKTtcbiAgICAgICAgfVxuICAgICAgICBleHByZXNzaW9uLnNwbGl0KC8sL2cpLmZvckVhY2goZnVuY3Rpb24odmFyaWFibGUpIHtcbiAgICAgICAgICB2YXIgdG1wID0gLyhbXjpcXCpdKikoPzo6KFxcZCspfChcXCopKT8vLmV4ZWModmFyaWFibGUpO1xuICAgICAgICAgIHZhbHVlcy5wdXNoKGdldFZhbHVlcyhjb250ZXh0LCBvcGVyYXRvciwgdG1wWzFdLCB0bXBbMl0gfHwgdG1wWzNdKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob3BlcmF0b3IgJiYgb3BlcmF0b3IgIT09IFwiK1wiKSB7XG4gICAgICAgICAgdmFyIHNlcGFyYXRvciA9IFwiLFwiO1xuICAgICAgICAgIGlmIChvcGVyYXRvciA9PT0gXCI/XCIpIHtcbiAgICAgICAgICAgIHNlcGFyYXRvciA9IFwiJlwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgIT09IFwiI1wiKSB7XG4gICAgICAgICAgICBzZXBhcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICh2YWx1ZXMubGVuZ3RoICE9PSAwID8gb3BlcmF0b3IgOiBcIlwiKSArIHZhbHVlcy5qb2luKHNlcGFyYXRvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlcy5qb2luKFwiLFwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZVJlc2VydmVkKGxpdGVyYWwpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbiAgaWYgKHRlbXBsYXRlID09PSBcIi9cIikge1xuICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xuICB9XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9wYXJzZS5qc1xuZnVuY3Rpb24gcGFyc2Uob3B0aW9ucykge1xuICBsZXQgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QudG9VcHBlckNhc2UoKTtcbiAgbGV0IHVybCA9IChvcHRpb25zLnVybCB8fCBcIi9cIikucmVwbGFjZSgvOihbYS16XVxcdyspL2csIFwieyQxfVwiKTtcbiAgbGV0IGhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLmhlYWRlcnMpO1xuICBsZXQgYm9keTtcbiAgbGV0IHBhcmFtZXRlcnMgPSBvbWl0KG9wdGlvbnMsIFtcbiAgICBcIm1ldGhvZFwiLFxuICAgIFwiYmFzZVVybFwiLFxuICAgIFwidXJsXCIsXG4gICAgXCJoZWFkZXJzXCIsXG4gICAgXCJyZXF1ZXN0XCIsXG4gICAgXCJtZWRpYVR5cGVcIlxuICBdKTtcbiAgY29uc3QgdXJsVmFyaWFibGVOYW1lcyA9IGV4dHJhY3RVcmxWYXJpYWJsZU5hbWVzKHVybCk7XG4gIHVybCA9IHBhcnNlVXJsKHVybCkuZXhwYW5kKHBhcmFtZXRlcnMpO1xuICBpZiAoIS9eaHR0cC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gb3B0aW9ucy5iYXNlVXJsICsgdXJsO1xuICB9XG4gIGNvbnN0IG9taXR0ZWRQYXJhbWV0ZXJzID0gT2JqZWN0LmtleXMob3B0aW9ucykuZmlsdGVyKChvcHRpb24pID0+IHVybFZhcmlhYmxlTmFtZXMuaW5jbHVkZXMob3B0aW9uKSkuY29uY2F0KFwiYmFzZVVybFwiKTtcbiAgY29uc3QgcmVtYWluaW5nUGFyYW1ldGVycyA9IG9taXQocGFyYW1ldGVycywgb21pdHRlZFBhcmFtZXRlcnMpO1xuICBjb25zdCBpc0JpbmFyeVJlcXVlc3QgPSAvYXBwbGljYXRpb25cXC9vY3RldC1zdHJlYW0vaS50ZXN0KGhlYWRlcnMuYWNjZXB0KTtcbiAgaWYgKCFpc0JpbmFyeVJlcXVlc3QpIHtcbiAgICBpZiAob3B0aW9ucy5tZWRpYVR5cGUuZm9ybWF0KSB7XG4gICAgICBoZWFkZXJzLmFjY2VwdCA9IGhlYWRlcnMuYWNjZXB0LnNwbGl0KC8sLykubWFwKFxuICAgICAgICAoZm9ybWF0KSA9PiBmb3JtYXQucmVwbGFjZShcbiAgICAgICAgICAvYXBwbGljYXRpb25cXC92bmQoXFwuXFx3KykoXFwudjMpPyhcXC5cXHcrKT8oXFwranNvbik/JC8sXG4gICAgICAgICAgYGFwcGxpY2F0aW9uL3ZuZCQxJDIuJHtvcHRpb25zLm1lZGlhVHlwZS5mb3JtYXR9YFxuICAgICAgICApXG4gICAgICApLmpvaW4oXCIsXCIpO1xuICAgIH1cbiAgICBpZiAodXJsLmVuZHNXaXRoKFwiL2dyYXBocWxcIikpIHtcbiAgICAgIGlmIChvcHRpb25zLm1lZGlhVHlwZS5wcmV2aWV3cz8ubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHByZXZpZXdzRnJvbUFjY2VwdEhlYWRlciA9IGhlYWRlcnMuYWNjZXB0Lm1hdGNoKC8oPzwhW1xcdy1dKVtcXHctXSsoPz0tcHJldmlldykvZykgfHwgW107XG4gICAgICAgIGhlYWRlcnMuYWNjZXB0ID0gcHJldmlld3NGcm9tQWNjZXB0SGVhZGVyLmNvbmNhdChvcHRpb25zLm1lZGlhVHlwZS5wcmV2aWV3cykubWFwKChwcmV2aWV3KSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybWF0ID0gb3B0aW9ucy5tZWRpYVR5cGUuZm9ybWF0ID8gYC4ke29wdGlvbnMubWVkaWFUeXBlLmZvcm1hdH1gIDogXCIranNvblwiO1xuICAgICAgICAgIHJldHVybiBgYXBwbGljYXRpb24vdm5kLmdpdGh1Yi4ke3ByZXZpZXd9LXByZXZpZXcke2Zvcm1hdH1gO1xuICAgICAgICB9KS5qb2luKFwiLFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKFtcIkdFVFwiLCBcIkhFQURcIl0uaW5jbHVkZXMobWV0aG9kKSkge1xuICAgIHVybCA9IGFkZFF1ZXJ5UGFyYW1ldGVycyh1cmwsIHJlbWFpbmluZ1BhcmFtZXRlcnMpO1xuICB9IGVsc2Uge1xuICAgIGlmIChcImRhdGFcIiBpbiByZW1haW5pbmdQYXJhbWV0ZXJzKSB7XG4gICAgICBib2R5ID0gcmVtYWluaW5nUGFyYW1ldGVycy5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXMocmVtYWluaW5nUGFyYW1ldGVycykubGVuZ3RoKSB7XG4gICAgICAgIGJvZHkgPSByZW1haW5pbmdQYXJhbWV0ZXJzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoIWhlYWRlcnNbXCJjb250ZW50LXR5cGVcIl0gJiYgdHlwZW9mIGJvZHkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBoZWFkZXJzW1wiY29udGVudC10eXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCI7XG4gIH1cbiAgaWYgKFtcIlBBVENIXCIsIFwiUFVUXCJdLmluY2x1ZGVzKG1ldGhvZCkgJiYgdHlwZW9mIGJvZHkgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBib2R5ID0gXCJcIjtcbiAgfVxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICB7IG1ldGhvZCwgdXJsLCBoZWFkZXJzIH0sXG4gICAgdHlwZW9mIGJvZHkgIT09IFwidW5kZWZpbmVkXCIgPyB7IGJvZHkgfSA6IG51bGwsXG4gICAgb3B0aW9ucy5yZXF1ZXN0ID8geyByZXF1ZXN0OiBvcHRpb25zLnJlcXVlc3QgfSA6IG51bGxcbiAgKTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL2VuZHBvaW50LXdpdGgtZGVmYXVsdHMuanNcbmZ1bmN0aW9uIGVuZHBvaW50V2l0aERlZmF1bHRzKGRlZmF1bHRzLCByb3V0ZSwgb3B0aW9ucykge1xuICByZXR1cm4gcGFyc2UobWVyZ2UoZGVmYXVsdHMsIHJvdXRlLCBvcHRpb25zKSk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy93aXRoLWRlZmF1bHRzLmpzXG5mdW5jdGlvbiB3aXRoRGVmYXVsdHMob2xkRGVmYXVsdHMsIG5ld0RlZmF1bHRzKSB7XG4gIGNvbnN0IERFRkFVTFRTMiA9IG1lcmdlKG9sZERlZmF1bHRzLCBuZXdEZWZhdWx0cyk7XG4gIGNvbnN0IGVuZHBvaW50MiA9IGVuZHBvaW50V2l0aERlZmF1bHRzLmJpbmQobnVsbCwgREVGQVVMVFMyKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZW5kcG9pbnQyLCB7XG4gICAgREVGQVVMVFM6IERFRkFVTFRTMixcbiAgICBkZWZhdWx0czogd2l0aERlZmF1bHRzLmJpbmQobnVsbCwgREVGQVVMVFMyKSxcbiAgICBtZXJnZTogbWVyZ2UuYmluZChudWxsLCBERUZBVUxUUzIpLFxuICAgIHBhcnNlXG4gIH0pO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbnZhciBlbmRwb2ludCA9IHdpdGhEZWZhdWx0cyhudWxsLCBERUZBVUxUUyk7XG4vLyBBbm5vdGF0ZSB0aGUgQ29tbW9uSlMgZXhwb3J0IG5hbWVzIGZvciBFU00gaW1wb3J0IGluIG5vZGU6XG4wICYmIChtb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW5kcG9pbnRcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG5jbGFzcyBEZXByZWNhdGlvbiBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpOyAvLyBNYWludGFpbnMgcHJvcGVyIHN0YWNrIHRyYWNlIChvbmx5IGF2YWlsYWJsZSBvbiBWOClcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgIH1cblxuICAgIHRoaXMubmFtZSA9ICdEZXByZWNhdGlvbic7XG4gIH1cblxufVxuXG5leHBvcnRzLkRlcHJlY2F0aW9uID0gRGVwcmVjYXRpb247XG4iLCIvLyBSZXR1cm5zIGEgd3JhcHBlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSB3cmFwcGVkIGNhbGxiYWNrXG4vLyBUaGUgd3JhcHBlciBmdW5jdGlvbiBzaG91bGQgZG8gc29tZSBzdHVmZiwgYW5kIHJldHVybiBhXG4vLyBwcmVzdW1hYmx5IGRpZmZlcmVudCBjYWxsYmFjayBmdW5jdGlvbi5cbi8vIFRoaXMgbWFrZXMgc3VyZSB0aGF0IG93biBwcm9wZXJ0aWVzIGFyZSByZXRhaW5lZCwgc28gdGhhdFxuLy8gZGVjb3JhdGlvbnMgYW5kIHN1Y2ggYXJlIG5vdCBsb3N0IGFsb25nIHRoZSB3YXkuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBweVxuZnVuY3Rpb24gd3JhcHB5IChmbiwgY2IpIHtcbiAgaWYgKGZuICYmIGNiKSByZXR1cm4gd3JhcHB5KGZuKShjYilcblxuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25lZWQgd3JhcHBlciBmdW5jdGlvbicpXG5cbiAgT2JqZWN0LmtleXMoZm4pLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICB3cmFwcGVyW2tdID0gZm5ba11cbiAgfSlcblxuICByZXR1cm4gd3JhcHBlclxuXG4gIGZ1bmN0aW9uIHdyYXBwZXIoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV1cbiAgICB9XG4gICAgdmFyIHJldCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgdmFyIGNiID0gYXJnc1thcmdzLmxlbmd0aC0xXVxuICAgIGlmICh0eXBlb2YgcmV0ID09PSAnZnVuY3Rpb24nICYmIHJldCAhPT0gY2IpIHtcbiAgICAgIE9iamVjdC5rZXlzKGNiKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIHJldFtrXSA9IGNiW2tdXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cbn1cbiIsInZhciB3cmFwcHkgPSByZXF1aXJlKCd3cmFwcHknKVxubW9kdWxlLmV4cG9ydHMgPSB3cmFwcHkob25jZSlcbm1vZHVsZS5leHBvcnRzLnN0cmljdCA9IHdyYXBweShvbmNlU3RyaWN0KVxuXG5vbmNlLnByb3RvID0gb25jZShmdW5jdGlvbiAoKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGdW5jdGlvbi5wcm90b3R5cGUsICdvbmNlJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb25jZSh0aGlzKVxuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bmN0aW9uLnByb3RvdHlwZSwgJ29uY2VTdHJpY3QnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvbmNlU3RyaWN0KHRoaXMpXG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSlcbn0pXG5cbmZ1bmN0aW9uIG9uY2UgKGZuKSB7XG4gIHZhciBmID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChmLmNhbGxlZCkgcmV0dXJuIGYudmFsdWVcbiAgICBmLmNhbGxlZCA9IHRydWVcbiAgICByZXR1cm4gZi52YWx1ZSA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgfVxuICBmLmNhbGxlZCA9IGZhbHNlXG4gIHJldHVybiBmXG59XG5cbmZ1bmN0aW9uIG9uY2VTdHJpY3QgKGZuKSB7XG4gIHZhciBmID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChmLmNhbGxlZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihmLm9uY2VFcnJvcilcbiAgICBmLmNhbGxlZCA9IHRydWVcbiAgICByZXR1cm4gZi52YWx1ZSA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgfVxuICB2YXIgbmFtZSA9IGZuLm5hbWUgfHwgJ0Z1bmN0aW9uIHdyYXBwZWQgd2l0aCBgb25jZWAnXG4gIGYub25jZUVycm9yID0gbmFtZSArIFwiIHNob3VsZG4ndCBiZSBjYWxsZWQgbW9yZSB0aGFuIG9uY2VcIlxuICBmLmNhbGxlZCA9IGZhbHNlXG4gIHJldHVybiBmXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19nZXRQcm90b09mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19leHBvcnQgPSAodGFyZ2V0LCBhbGwpID0+IHtcbiAgZm9yICh2YXIgbmFtZSBpbiBhbGwpXG4gICAgX19kZWZQcm9wKHRhcmdldCwgbmFtZSwgeyBnZXQ6IGFsbFtuYW1lXSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbn07XG52YXIgX19jb3B5UHJvcHMgPSAodG8sIGZyb20sIGV4Y2VwdCwgZGVzYykgPT4ge1xuICBpZiAoZnJvbSAmJiB0eXBlb2YgZnJvbSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20pKVxuICAgICAgaWYgKCFfX2hhc093blByb3AuY2FsbCh0bywga2V5KSAmJiBrZXkgIT09IGV4Y2VwdClcbiAgICAgICAgX19kZWZQcm9wKHRvLCBrZXksIHsgZ2V0OiAoKSA9PiBmcm9tW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MoZnJvbSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0bztcbn07XG52YXIgX190b0VTTSA9IChtb2QsIGlzTm9kZU1vZGUsIHRhcmdldCkgPT4gKHRhcmdldCA9IG1vZCAhPSBudWxsID8gX19jcmVhdGUoX19nZXRQcm90b09mKG1vZCkpIDoge30sIF9fY29weVByb3BzKFxuICAvLyBJZiB0aGUgaW1wb3J0ZXIgaXMgaW4gbm9kZSBjb21wYXRpYmlsaXR5IG1vZGUgb3IgdGhpcyBpcyBub3QgYW4gRVNNXG4gIC8vIGZpbGUgdGhhdCBoYXMgYmVlbiBjb252ZXJ0ZWQgdG8gYSBDb21tb25KUyBmaWxlIHVzaW5nIGEgQmFiZWwtXG4gIC8vIGNvbXBhdGlibGUgdHJhbnNmb3JtIChpLmUuIFwiX19lc01vZHVsZVwiIGhhcyBub3QgYmVlbiBzZXQpLCB0aGVuIHNldFxuICAvLyBcImRlZmF1bHRcIiB0byB0aGUgQ29tbW9uSlMgXCJtb2R1bGUuZXhwb3J0c1wiIGZvciBub2RlIGNvbXBhdGliaWxpdHkuXG4gIGlzTm9kZU1vZGUgfHwgIW1vZCB8fCAhbW9kLl9fZXNNb2R1bGUgPyBfX2RlZlByb3AodGFyZ2V0LCBcImRlZmF1bHRcIiwgeyB2YWx1ZTogbW9kLCBlbnVtZXJhYmxlOiB0cnVlIH0pIDogdGFyZ2V0LFxuICBtb2RcbikpO1xudmFyIF9fdG9Db21tb25KUyA9IChtb2QpID0+IF9fY29weVByb3BzKF9fZGVmUHJvcCh7fSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSksIG1vZCk7XG5cbi8vIHBrZy9kaXN0LXNyYy9pbmRleC5qc1xudmFyIGRpc3Rfc3JjX2V4cG9ydHMgPSB7fTtcbl9fZXhwb3J0KGRpc3Rfc3JjX2V4cG9ydHMsIHtcbiAgUmVxdWVzdEVycm9yOiAoKSA9PiBSZXF1ZXN0RXJyb3Jcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfX3RvQ29tbW9uSlMoZGlzdF9zcmNfZXhwb3J0cyk7XG52YXIgaW1wb3J0X2RlcHJlY2F0aW9uID0gcmVxdWlyZShcImRlcHJlY2F0aW9uXCIpO1xudmFyIGltcG9ydF9vbmNlID0gX190b0VTTShyZXF1aXJlKFwib25jZVwiKSk7XG52YXIgbG9nT25jZUNvZGUgPSAoMCwgaW1wb3J0X29uY2UuZGVmYXVsdCkoKGRlcHJlY2F0aW9uKSA9PiBjb25zb2xlLndhcm4oZGVwcmVjYXRpb24pKTtcbnZhciBsb2dPbmNlSGVhZGVycyA9ICgwLCBpbXBvcnRfb25jZS5kZWZhdWx0KSgoZGVwcmVjYXRpb24pID0+IGNvbnNvbGUud2FybihkZXByZWNhdGlvbikpO1xudmFyIFJlcXVlc3RFcnJvciA9IGNsYXNzIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXNDb2RlLCBvcHRpb25zKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICB9XG4gICAgdGhpcy5uYW1lID0gXCJIdHRwRXJyb3JcIjtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1c0NvZGU7XG4gICAgbGV0IGhlYWRlcnM7XG4gICAgaWYgKFwiaGVhZGVyc1wiIGluIG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMuaGVhZGVycyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycztcbiAgICB9XG4gICAgaWYgKFwicmVzcG9uc2VcIiBpbiBvcHRpb25zKSB7XG4gICAgICB0aGlzLnJlc3BvbnNlID0gb3B0aW9ucy5yZXNwb25zZTtcbiAgICAgIGhlYWRlcnMgPSBvcHRpb25zLnJlc3BvbnNlLmhlYWRlcnM7XG4gICAgfVxuICAgIGNvbnN0IHJlcXVlc3RDb3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucy5yZXF1ZXN0KTtcbiAgICBpZiAob3B0aW9ucy5yZXF1ZXN0LmhlYWRlcnMuYXV0aG9yaXphdGlvbikge1xuICAgICAgcmVxdWVzdENvcHkuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMucmVxdWVzdC5oZWFkZXJzLCB7XG4gICAgICAgIGF1dGhvcml6YXRpb246IG9wdGlvbnMucmVxdWVzdC5oZWFkZXJzLmF1dGhvcml6YXRpb24ucmVwbGFjZShcbiAgICAgICAgICAvKD88ISApIC4qJC8sXG4gICAgICAgICAgXCIgW1JFREFDVEVEXVwiXG4gICAgICAgIClcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXF1ZXN0Q29weS51cmwgPSByZXF1ZXN0Q29weS51cmwucmVwbGFjZSgvXFxiY2xpZW50X3NlY3JldD1cXHcrL2csIFwiY2xpZW50X3NlY3JldD1bUkVEQUNURURdXCIpLnJlcGxhY2UoL1xcYmFjY2Vzc190b2tlbj1cXHcrL2csIFwiYWNjZXNzX3Rva2VuPVtSRURBQ1RFRF1cIik7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdENvcHk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiY29kZVwiLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIGxvZ09uY2VDb2RlKFxuICAgICAgICAgIG5ldyBpbXBvcnRfZGVwcmVjYXRpb24uRGVwcmVjYXRpb24oXG4gICAgICAgICAgICBcIltAb2N0b2tpdC9yZXF1ZXN0LWVycm9yXSBgZXJyb3IuY29kZWAgaXMgZGVwcmVjYXRlZCwgdXNlIGBlcnJvci5zdGF0dXNgLlwiXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gc3RhdHVzQ29kZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJoZWFkZXJzXCIsIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgbG9nT25jZUhlYWRlcnMoXG4gICAgICAgICAgbmV3IGltcG9ydF9kZXByZWNhdGlvbi5EZXByZWNhdGlvbihcbiAgICAgICAgICAgIFwiW0BvY3Rva2l0L3JlcXVlc3QtZXJyb3JdIGBlcnJvci5oZWFkZXJzYCBpcyBkZXByZWNhdGVkLCB1c2UgYGVycm9yLnJlc3BvbnNlLmhlYWRlcnNgLlwiXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gaGVhZGVycyB8fCB7fTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcbi8vIEFubm90YXRlIHRoZSBDb21tb25KUyBleHBvcnQgbmFtZXMgZm9yIEVTTSBpbXBvcnQgaW4gbm9kZTpcbjAgJiYgKG1vZHVsZS5leHBvcnRzID0ge1xuICBSZXF1ZXN0RXJyb3Jcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvQ29tbW9uSlMgPSAobW9kKSA9PiBfX2NvcHlQcm9wcyhfX2RlZlByb3Aoe30sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pLCBtb2QpO1xuXG4vLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbnZhciBkaXN0X3NyY19leHBvcnRzID0ge307XG5fX2V4cG9ydChkaXN0X3NyY19leHBvcnRzLCB7XG4gIHJlcXVlc3Q6ICgpID0+IHJlcXVlc3Rcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfX3RvQ29tbW9uSlMoZGlzdF9zcmNfZXhwb3J0cyk7XG52YXIgaW1wb3J0X2VuZHBvaW50ID0gcmVxdWlyZShcIkBvY3Rva2l0L2VuZHBvaW50XCIpO1xudmFyIGltcG9ydF91bml2ZXJzYWxfdXNlcl9hZ2VudCA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtdXNlci1hZ2VudFwiKTtcblxuLy8gcGtnL2Rpc3Qtc3JjL3ZlcnNpb24uanNcbnZhciBWRVJTSU9OID0gXCI4LjQuMVwiO1xuXG4vLyBwa2cvZGlzdC1zcmMvaXMtcGxhaW4tb2JqZWN0LmpzXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgdmFsdWUgPT09IG51bGwpXG4gICAgcmV0dXJuIGZhbHNlO1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSAhPT0gXCJbb2JqZWN0IE9iamVjdF1cIilcbiAgICByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKVxuICAgIHJldHVybiB0cnVlO1xuICBjb25zdCBDdG9yID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCBcImNvbnN0cnVjdG9yXCIpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gdHlwZW9mIEN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbChDdG9yKSA9PT0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwodmFsdWUpO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvZmV0Y2gtd3JhcHBlci5qc1xudmFyIGltcG9ydF9yZXF1ZXN0X2Vycm9yID0gcmVxdWlyZShcIkBvY3Rva2l0L3JlcXVlc3QtZXJyb3JcIik7XG5cbi8vIHBrZy9kaXN0LXNyYy9nZXQtYnVmZmVyLXJlc3BvbnNlLmpzXG5mdW5jdGlvbiBnZXRCdWZmZXJSZXNwb25zZShyZXNwb25zZSkge1xuICByZXR1cm4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL2ZldGNoLXdyYXBwZXIuanNcbmZ1bmN0aW9uIGZldGNoV3JhcHBlcihyZXF1ZXN0T3B0aW9ucykge1xuICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gIGNvbnN0IGxvZyA9IHJlcXVlc3RPcHRpb25zLnJlcXVlc3QgJiYgcmVxdWVzdE9wdGlvbnMucmVxdWVzdC5sb2cgPyByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0LmxvZyA6IGNvbnNvbGU7XG4gIGNvbnN0IHBhcnNlU3VjY2Vzc1Jlc3BvbnNlQm9keSA9ICgoX2EgPSByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0KSA9PSBudWxsID8gdm9pZCAwIDogX2EucGFyc2VTdWNjZXNzUmVzcG9uc2VCb2R5KSAhPT0gZmFsc2U7XG4gIGlmIChpc1BsYWluT2JqZWN0KHJlcXVlc3RPcHRpb25zLmJvZHkpIHx8IEFycmF5LmlzQXJyYXkocmVxdWVzdE9wdGlvbnMuYm9keSkpIHtcbiAgICByZXF1ZXN0T3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdE9wdGlvbnMuYm9keSk7XG4gIH1cbiAgbGV0IGhlYWRlcnMgPSB7fTtcbiAgbGV0IHN0YXR1cztcbiAgbGV0IHVybDtcbiAgbGV0IHsgZmV0Y2ggfSA9IGdsb2JhbFRoaXM7XG4gIGlmICgoX2IgPSByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0KSA9PSBudWxsID8gdm9pZCAwIDogX2IuZmV0Y2gpIHtcbiAgICBmZXRjaCA9IHJlcXVlc3RPcHRpb25zLnJlcXVlc3QuZmV0Y2g7XG4gIH1cbiAgaWYgKCFmZXRjaCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIFwiZmV0Y2ggaXMgbm90IHNldC4gUGxlYXNlIHBhc3MgYSBmZXRjaCBpbXBsZW1lbnRhdGlvbiBhcyBuZXcgT2N0b2tpdCh7IHJlcXVlc3Q6IHsgZmV0Y2ggfX0pLiBMZWFybiBtb3JlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9vY3Rva2l0L29jdG9raXQuanMvI2ZldGNoLW1pc3NpbmdcIlxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGZldGNoKHJlcXVlc3RPcHRpb25zLnVybCwge1xuICAgIG1ldGhvZDogcmVxdWVzdE9wdGlvbnMubWV0aG9kLFxuICAgIGJvZHk6IHJlcXVlc3RPcHRpb25zLmJvZHksXG4gICAgcmVkaXJlY3Q6IChfYyA9IHJlcXVlc3RPcHRpb25zLnJlcXVlc3QpID09IG51bGwgPyB2b2lkIDAgOiBfYy5yZWRpcmVjdCxcbiAgICBoZWFkZXJzOiByZXF1ZXN0T3B0aW9ucy5oZWFkZXJzLFxuICAgIHNpZ25hbDogKF9kID0gcmVxdWVzdE9wdGlvbnMucmVxdWVzdCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9kLnNpZ25hbCxcbiAgICAvLyBkdXBsZXggbXVzdCBiZSBzZXQgaWYgcmVxdWVzdC5ib2R5IGlzIFJlYWRhYmxlU3RyZWFtIG9yIEFzeW5jIEl0ZXJhYmxlcy5cbiAgICAvLyBTZWUgaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2RvbS1yZXF1ZXN0aW5pdC1kdXBsZXguXG4gICAgLi4ucmVxdWVzdE9wdGlvbnMuYm9keSAmJiB7IGR1cGxleDogXCJoYWxmXCIgfVxuICB9KS50aGVuKGFzeW5jIChyZXNwb25zZSkgPT4ge1xuICAgIHVybCA9IHJlc3BvbnNlLnVybDtcbiAgICBzdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgZm9yIChjb25zdCBrZXlBbmRWYWx1ZSBvZiByZXNwb25zZS5oZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzW2tleUFuZFZhbHVlWzBdXSA9IGtleUFuZFZhbHVlWzFdO1xuICAgIH1cbiAgICBpZiAoXCJkZXByZWNhdGlvblwiIGluIGhlYWRlcnMpIHtcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBoZWFkZXJzLmxpbmsgJiYgaGVhZGVycy5saW5rLm1hdGNoKC88KFtePD5dKyk+OyByZWw9XCJkZXByZWNhdGlvblwiLyk7XG4gICAgICBjb25zdCBkZXByZWNhdGlvbkxpbmsgPSBtYXRjaGVzICYmIG1hdGNoZXMucG9wKCk7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYFtAb2N0b2tpdC9yZXF1ZXN0XSBcIiR7cmVxdWVzdE9wdGlvbnMubWV0aG9kfSAke3JlcXVlc3RPcHRpb25zLnVybH1cIiBpcyBkZXByZWNhdGVkLiBJdCBpcyBzY2hlZHVsZWQgdG8gYmUgcmVtb3ZlZCBvbiAke2hlYWRlcnMuc3Vuc2V0fSR7ZGVwcmVjYXRpb25MaW5rID8gYC4gU2VlICR7ZGVwcmVjYXRpb25MaW5rfWAgOiBcIlwifWBcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChzdGF0dXMgPT09IDIwNCB8fCBzdGF0dXMgPT09IDIwNSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVxdWVzdE9wdGlvbnMubWV0aG9kID09PSBcIkhFQURcIikge1xuICAgICAgaWYgKHN0YXR1cyA8IDQwMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgaW1wb3J0X3JlcXVlc3RfZXJyb3IuUmVxdWVzdEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQsIHN0YXR1cywge1xuICAgICAgICByZXNwb25zZToge1xuICAgICAgICAgIHVybCxcbiAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICBkYXRhOiB2b2lkIDBcbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdE9wdGlvbnNcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoc3RhdHVzID09PSAzMDQpIHtcbiAgICAgIHRocm93IG5ldyBpbXBvcnRfcmVxdWVzdF9lcnJvci5SZXF1ZXN0RXJyb3IoXCJOb3QgbW9kaWZpZWRcIiwgc3RhdHVzLCB7XG4gICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgdXJsLFxuICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIGRhdGE6IGF3YWl0IGdldFJlc3BvbnNlRGF0YShyZXNwb25zZSlcbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdE9wdGlvbnNcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoc3RhdHVzID49IDQwMCkge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGdldFJlc3BvbnNlRGF0YShyZXNwb25zZSk7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBpbXBvcnRfcmVxdWVzdF9lcnJvci5SZXF1ZXN0RXJyb3IodG9FcnJvck1lc3NhZ2UoZGF0YSksIHN0YXR1cywge1xuICAgICAgICByZXNwb25zZToge1xuICAgICAgICAgIHVybCxcbiAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICBkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RPcHRpb25zXG4gICAgICB9KTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VTdWNjZXNzUmVzcG9uc2VCb2R5ID8gYXdhaXQgZ2V0UmVzcG9uc2VEYXRhKHJlc3BvbnNlKSA6IHJlc3BvbnNlLmJvZHk7XG4gIH0pLnRoZW4oKGRhdGEpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzLFxuICAgICAgdXJsLFxuICAgICAgaGVhZGVycyxcbiAgICAgIGRhdGFcbiAgICB9O1xuICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBpbXBvcnRfcmVxdWVzdF9lcnJvci5SZXF1ZXN0RXJyb3IpXG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICBlbHNlIGlmIChlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIilcbiAgICAgIHRocm93IGVycm9yO1xuICAgIGxldCBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICBpZiAoZXJyb3IubmFtZSA9PT0gXCJUeXBlRXJyb3JcIiAmJiBcImNhdXNlXCIgaW4gZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvci5jYXVzZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5jYXVzZS5tZXNzYWdlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IuY2F1c2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLmNhdXNlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgaW1wb3J0X3JlcXVlc3RfZXJyb3IuUmVxdWVzdEVycm9yKG1lc3NhZ2UsIDUwMCwge1xuICAgICAgcmVxdWVzdDogcmVxdWVzdE9wdGlvbnNcbiAgICB9KTtcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRSZXNwb25zZURhdGEocmVzcG9uc2UpIHtcbiAgY29uc3QgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKTtcbiAgaWYgKC9hcHBsaWNhdGlvblxcL2pzb24vLnRlc3QoY29udGVudFR5cGUpKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiByZXNwb25zZS50ZXh0KCkpLmNhdGNoKCgpID0+IFwiXCIpO1xuICB9XG4gIGlmICghY29udGVudFR5cGUgfHwgL150ZXh0XFwvfGNoYXJzZXQ9dXRmLTgkLy50ZXN0KGNvbnRlbnRUeXBlKSkge1xuICAgIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG4gIH1cbiAgcmV0dXJuIGdldEJ1ZmZlclJlc3BvbnNlKHJlc3BvbnNlKTtcbn1cbmZ1bmN0aW9uIHRvRXJyb3JNZXNzYWdlKGRhdGEpIHtcbiAgaWYgKHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiBkYXRhO1xuICBsZXQgc3VmZml4O1xuICBpZiAoXCJkb2N1bWVudGF0aW9uX3VybFwiIGluIGRhdGEpIHtcbiAgICBzdWZmaXggPSBgIC0gJHtkYXRhLmRvY3VtZW50YXRpb25fdXJsfWA7XG4gIH0gZWxzZSB7XG4gICAgc3VmZml4ID0gXCJcIjtcbiAgfVxuICBpZiAoXCJtZXNzYWdlXCIgaW4gZGF0YSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEuZXJyb3JzKSkge1xuICAgICAgcmV0dXJuIGAke2RhdGEubWVzc2FnZX06ICR7ZGF0YS5lcnJvcnMubWFwKEpTT04uc3RyaW5naWZ5KS5qb2luKFwiLCBcIil9JHtzdWZmaXh9YDtcbiAgICB9XG4gICAgcmV0dXJuIGAke2RhdGEubWVzc2FnZX0ke3N1ZmZpeH1gO1xuICB9XG4gIHJldHVybiBgVW5rbm93biBlcnJvcjogJHtKU09OLnN0cmluZ2lmeShkYXRhKX1gO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvd2l0aC1kZWZhdWx0cy5qc1xuZnVuY3Rpb24gd2l0aERlZmF1bHRzKG9sZEVuZHBvaW50LCBuZXdEZWZhdWx0cykge1xuICBjb25zdCBlbmRwb2ludDIgPSBvbGRFbmRwb2ludC5kZWZhdWx0cyhuZXdEZWZhdWx0cyk7XG4gIGNvbnN0IG5ld0FwaSA9IGZ1bmN0aW9uKHJvdXRlLCBwYXJhbWV0ZXJzKSB7XG4gICAgY29uc3QgZW5kcG9pbnRPcHRpb25zID0gZW5kcG9pbnQyLm1lcmdlKHJvdXRlLCBwYXJhbWV0ZXJzKTtcbiAgICBpZiAoIWVuZHBvaW50T3B0aW9ucy5yZXF1ZXN0IHx8ICFlbmRwb2ludE9wdGlvbnMucmVxdWVzdC5ob29rKSB7XG4gICAgICByZXR1cm4gZmV0Y2hXcmFwcGVyKGVuZHBvaW50Mi5wYXJzZShlbmRwb2ludE9wdGlvbnMpKTtcbiAgICB9XG4gICAgY29uc3QgcmVxdWVzdDIgPSAocm91dGUyLCBwYXJhbWV0ZXJzMikgPT4ge1xuICAgICAgcmV0dXJuIGZldGNoV3JhcHBlcihcbiAgICAgICAgZW5kcG9pbnQyLnBhcnNlKGVuZHBvaW50Mi5tZXJnZShyb3V0ZTIsIHBhcmFtZXRlcnMyKSlcbiAgICAgICk7XG4gICAgfTtcbiAgICBPYmplY3QuYXNzaWduKHJlcXVlc3QyLCB7XG4gICAgICBlbmRwb2ludDogZW5kcG9pbnQyLFxuICAgICAgZGVmYXVsdHM6IHdpdGhEZWZhdWx0cy5iaW5kKG51bGwsIGVuZHBvaW50MilcbiAgICB9KTtcbiAgICByZXR1cm4gZW5kcG9pbnRPcHRpb25zLnJlcXVlc3QuaG9vayhyZXF1ZXN0MiwgZW5kcG9pbnRPcHRpb25zKTtcbiAgfTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3QXBpLCB7XG4gICAgZW5kcG9pbnQ6IGVuZHBvaW50MixcbiAgICBkZWZhdWx0czogd2l0aERlZmF1bHRzLmJpbmQobnVsbCwgZW5kcG9pbnQyKVxuICB9KTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL2luZGV4LmpzXG52YXIgcmVxdWVzdCA9IHdpdGhEZWZhdWx0cyhpbXBvcnRfZW5kcG9pbnQuZW5kcG9pbnQsIHtcbiAgaGVhZGVyczoge1xuICAgIFwidXNlci1hZ2VudFwiOiBgb2N0b2tpdC1yZXF1ZXN0LmpzLyR7VkVSU0lPTn0gJHsoMCwgaW1wb3J0X3VuaXZlcnNhbF91c2VyX2FnZW50LmdldFVzZXJBZ2VudCkoKX1gXG4gIH1cbn0pO1xuLy8gQW5ub3RhdGUgdGhlIENvbW1vbkpTIGV4cG9ydCBuYW1lcyBmb3IgRVNNIGltcG9ydCBpbiBub2RlOlxuMCAmJiAobW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlcXVlc3Rcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvQ29tbW9uSlMgPSAobW9kKSA9PiBfX2NvcHlQcm9wcyhfX2RlZlByb3Aoe30sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pLCBtb2QpO1xuXG4vLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbnZhciBpbmRleF9leHBvcnRzID0ge307XG5fX2V4cG9ydChpbmRleF9leHBvcnRzLCB7XG4gIEdyYXBocWxSZXNwb25zZUVycm9yOiAoKSA9PiBHcmFwaHFsUmVzcG9uc2VFcnJvcixcbiAgZ3JhcGhxbDogKCkgPT4gZ3JhcGhxbDIsXG4gIHdpdGhDdXN0b21SZXF1ZXN0OiAoKSA9PiB3aXRoQ3VzdG9tUmVxdWVzdFxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fdG9Db21tb25KUyhpbmRleF9leHBvcnRzKTtcbnZhciBpbXBvcnRfcmVxdWVzdDMgPSByZXF1aXJlKFwiQG9jdG9raXQvcmVxdWVzdFwiKTtcbnZhciBpbXBvcnRfdW5pdmVyc2FsX3VzZXJfYWdlbnQgPSByZXF1aXJlKFwidW5pdmVyc2FsLXVzZXItYWdlbnRcIik7XG5cbi8vIHBrZy9kaXN0LXNyYy92ZXJzaW9uLmpzXG52YXIgVkVSU0lPTiA9IFwiNy4xLjFcIjtcblxuLy8gcGtnL2Rpc3Qtc3JjL3dpdGgtZGVmYXVsdHMuanNcbnZhciBpbXBvcnRfcmVxdWVzdDIgPSByZXF1aXJlKFwiQG9jdG9raXQvcmVxdWVzdFwiKTtcblxuLy8gcGtnL2Rpc3Qtc3JjL2dyYXBocWwuanNcbnZhciBpbXBvcnRfcmVxdWVzdCA9IHJlcXVpcmUoXCJAb2N0b2tpdC9yZXF1ZXN0XCIpO1xuXG4vLyBwa2cvZGlzdC1zcmMvZXJyb3IuanNcbmZ1bmN0aW9uIF9idWlsZE1lc3NhZ2VGb3JSZXNwb25zZUVycm9ycyhkYXRhKSB7XG4gIHJldHVybiBgUmVxdWVzdCBmYWlsZWQgZHVlIHRvIGZvbGxvd2luZyByZXNwb25zZSBlcnJvcnM6XG5gICsgZGF0YS5lcnJvcnMubWFwKChlKSA9PiBgIC0gJHtlLm1lc3NhZ2V9YCkuam9pbihcIlxcblwiKTtcbn1cbnZhciBHcmFwaHFsUmVzcG9uc2VFcnJvciA9IGNsYXNzIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihyZXF1ZXN0MiwgaGVhZGVycywgcmVzcG9uc2UpIHtcbiAgICBzdXBlcihfYnVpbGRNZXNzYWdlRm9yUmVzcG9uc2VFcnJvcnMocmVzcG9uc2UpKTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0MjtcbiAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICB0aGlzLm5hbWUgPSBcIkdyYXBocWxSZXNwb25zZUVycm9yXCI7XG4gICAgdGhpcy5lcnJvcnMgPSByZXNwb25zZS5lcnJvcnM7XG4gICAgdGhpcy5kYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gcGtnL2Rpc3Qtc3JjL2dyYXBocWwuanNcbnZhciBOT05fVkFSSUFCTEVfT1BUSU9OUyA9IFtcbiAgXCJtZXRob2RcIixcbiAgXCJiYXNlVXJsXCIsXG4gIFwidXJsXCIsXG4gIFwiaGVhZGVyc1wiLFxuICBcInJlcXVlc3RcIixcbiAgXCJxdWVyeVwiLFxuICBcIm1lZGlhVHlwZVwiXG5dO1xudmFyIEZPUkJJRERFTl9WQVJJQUJMRV9PUFRJT05TID0gW1wicXVlcnlcIiwgXCJtZXRob2RcIiwgXCJ1cmxcIl07XG52YXIgR0hFU19WM19TVUZGSVhfUkVHRVggPSAvXFwvYXBpXFwvdjNcXC8/JC87XG5mdW5jdGlvbiBncmFwaHFsKHJlcXVlc3QyLCBxdWVyeSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgcXVlcnkgPT09IFwic3RyaW5nXCIgJiYgXCJxdWVyeVwiIGluIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcbiAgICAgICAgbmV3IEVycm9yKGBbQG9jdG9raXQvZ3JhcGhxbF0gXCJxdWVyeVwiIGNhbm5vdCBiZSB1c2VkIGFzIHZhcmlhYmxlIG5hbWVgKVxuICAgICAgKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgaWYgKCFGT1JCSURERU5fVkFSSUFCTEVfT1BUSU9OUy5pbmNsdWRlcyhrZXkpKSBjb250aW51ZTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcbiAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgIGBbQG9jdG9raXQvZ3JhcGhxbF0gXCIke2tleX1cIiBjYW5ub3QgYmUgdXNlZCBhcyB2YXJpYWJsZSBuYW1lYFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBjb25zdCBwYXJzZWRPcHRpb25zID0gdHlwZW9mIHF1ZXJ5ID09PSBcInN0cmluZ1wiID8gT2JqZWN0LmFzc2lnbih7IHF1ZXJ5IH0sIG9wdGlvbnMpIDogcXVlcnk7XG4gIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gT2JqZWN0LmtleXMoXG4gICAgcGFyc2VkT3B0aW9uc1xuICApLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcbiAgICBpZiAoTk9OX1ZBUklBQkxFX09QVElPTlMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBwYXJzZWRPcHRpb25zW2tleV07XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpZiAoIXJlc3VsdC52YXJpYWJsZXMpIHtcbiAgICAgIHJlc3VsdC52YXJpYWJsZXMgPSB7fTtcbiAgICB9XG4gICAgcmVzdWx0LnZhcmlhYmxlc1trZXldID0gcGFyc2VkT3B0aW9uc1trZXldO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sIHt9KTtcbiAgY29uc3QgYmFzZVVybCA9IHBhcnNlZE9wdGlvbnMuYmFzZVVybCB8fCByZXF1ZXN0Mi5lbmRwb2ludC5ERUZBVUxUUy5iYXNlVXJsO1xuICBpZiAoR0hFU19WM19TVUZGSVhfUkVHRVgudGVzdChiYXNlVXJsKSkge1xuICAgIHJlcXVlc3RPcHRpb25zLnVybCA9IGJhc2VVcmwucmVwbGFjZShHSEVTX1YzX1NVRkZJWF9SRUdFWCwgXCIvYXBpL2dyYXBocWxcIik7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3QyKHJlcXVlc3RPcHRpb25zKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZS5kYXRhLmVycm9ycykge1xuICAgICAgY29uc3QgaGVhZGVycyA9IHt9O1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmVzcG9uc2UuaGVhZGVycykpIHtcbiAgICAgICAgaGVhZGVyc1trZXldID0gcmVzcG9uc2UuaGVhZGVyc1trZXldO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEdyYXBocWxSZXNwb25zZUVycm9yKFxuICAgICAgICByZXF1ZXN0T3B0aW9ucyxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgcmVzcG9uc2UuZGF0YVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgfSk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy93aXRoLWRlZmF1bHRzLmpzXG5mdW5jdGlvbiB3aXRoRGVmYXVsdHMocmVxdWVzdDIsIG5ld0RlZmF1bHRzKSB7XG4gIGNvbnN0IG5ld1JlcXVlc3QgPSByZXF1ZXN0Mi5kZWZhdWx0cyhuZXdEZWZhdWx0cyk7XG4gIGNvbnN0IG5ld0FwaSA9IChxdWVyeSwgb3B0aW9ucykgPT4ge1xuICAgIHJldHVybiBncmFwaHFsKG5ld1JlcXVlc3QsIHF1ZXJ5LCBvcHRpb25zKTtcbiAgfTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3QXBpLCB7XG4gICAgZGVmYXVsdHM6IHdpdGhEZWZhdWx0cy5iaW5kKG51bGwsIG5ld1JlcXVlc3QpLFxuICAgIGVuZHBvaW50OiBuZXdSZXF1ZXN0LmVuZHBvaW50XG4gIH0pO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbnZhciBncmFwaHFsMiA9IHdpdGhEZWZhdWx0cyhpbXBvcnRfcmVxdWVzdDMucmVxdWVzdCwge1xuICBoZWFkZXJzOiB7XG4gICAgXCJ1c2VyLWFnZW50XCI6IGBvY3Rva2l0LWdyYXBocWwuanMvJHtWRVJTSU9OfSAkeygwLCBpbXBvcnRfdW5pdmVyc2FsX3VzZXJfYWdlbnQuZ2V0VXNlckFnZW50KSgpfWBcbiAgfSxcbiAgbWV0aG9kOiBcIlBPU1RcIixcbiAgdXJsOiBcIi9ncmFwaHFsXCJcbn0pO1xuZnVuY3Rpb24gd2l0aEN1c3RvbVJlcXVlc3QoY3VzdG9tUmVxdWVzdCkge1xuICByZXR1cm4gd2l0aERlZmF1bHRzKGN1c3RvbVJlcXVlc3QsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogXCIvZ3JhcGhxbFwiXG4gIH0pO1xufVxuLy8gQW5ub3RhdGUgdGhlIENvbW1vbkpTIGV4cG9ydCBuYW1lcyBmb3IgRVNNIGltcG9ydCBpbiBub2RlOlxuMCAmJiAobW9kdWxlLmV4cG9ydHMgPSB7XG4gIEdyYXBocWxSZXNwb25zZUVycm9yLFxuICBncmFwaHFsLFxuICB3aXRoQ3VzdG9tUmVxdWVzdFxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19nZXRPd25Qcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBfX2hhc093blByb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIF9fZXhwb3J0ID0gKHRhcmdldCwgYWxsKSA9PiB7XG4gIGZvciAodmFyIG5hbWUgaW4gYWxsKVxuICAgIF9fZGVmUHJvcCh0YXJnZXQsIG5hbWUsIHsgZ2V0OiBhbGxbbmFtZV0sIGVudW1lcmFibGU6IHRydWUgfSk7XG59O1xudmFyIF9fY29weVByb3BzID0gKHRvLCBmcm9tLCBleGNlcHQsIGRlc2MpID0+IHtcbiAgaWYgKGZyb20gJiYgdHlwZW9mIGZyb20gPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGZyb20gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGZvciAobGV0IGtleSBvZiBfX2dldE93blByb3BOYW1lcyhmcm9tKSlcbiAgICAgIGlmICghX19oYXNPd25Qcm9wLmNhbGwodG8sIGtleSkgJiYga2V5ICE9PSBleGNlcHQpXG4gICAgICAgIF9fZGVmUHJvcCh0bywga2V5LCB7IGdldDogKCkgPT4gZnJvbVtrZXldLCBlbnVtZXJhYmxlOiAhKGRlc2MgPSBfX2dldE93blByb3BEZXNjKGZyb20sIGtleSkpIHx8IGRlc2MuZW51bWVyYWJsZSB9KTtcbiAgfVxuICByZXR1cm4gdG87XG59O1xudmFyIF9fdG9Db21tb25KUyA9IChtb2QpID0+IF9fY29weVByb3BzKF9fZGVmUHJvcCh7fSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSksIG1vZCk7XG5cbi8vIHBrZy9kaXN0LXNyYy9pbmRleC5qc1xudmFyIGRpc3Rfc3JjX2V4cG9ydHMgPSB7fTtcbl9fZXhwb3J0KGRpc3Rfc3JjX2V4cG9ydHMsIHtcbiAgY3JlYXRlVG9rZW5BdXRoOiAoKSA9PiBjcmVhdGVUb2tlbkF1dGhcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfX3RvQ29tbW9uSlMoZGlzdF9zcmNfZXhwb3J0cyk7XG5cbi8vIHBrZy9kaXN0LXNyYy9hdXRoLmpzXG52YXIgUkVHRVhfSVNfSU5TVEFMTEFUSU9OX0xFR0FDWSA9IC9edjFcXC4vO1xudmFyIFJFR0VYX0lTX0lOU1RBTExBVElPTiA9IC9eZ2hzXy87XG52YXIgUkVHRVhfSVNfVVNFUl9UT19TRVJWRVIgPSAvXmdodV8vO1xuYXN5bmMgZnVuY3Rpb24gYXV0aCh0b2tlbikge1xuICBjb25zdCBpc0FwcCA9IHRva2VuLnNwbGl0KC9cXC4vKS5sZW5ndGggPT09IDM7XG4gIGNvbnN0IGlzSW5zdGFsbGF0aW9uID0gUkVHRVhfSVNfSU5TVEFMTEFUSU9OX0xFR0FDWS50ZXN0KHRva2VuKSB8fCBSRUdFWF9JU19JTlNUQUxMQVRJT04udGVzdCh0b2tlbik7XG4gIGNvbnN0IGlzVXNlclRvU2VydmVyID0gUkVHRVhfSVNfVVNFUl9UT19TRVJWRVIudGVzdCh0b2tlbik7XG4gIGNvbnN0IHRva2VuVHlwZSA9IGlzQXBwID8gXCJhcHBcIiA6IGlzSW5zdGFsbGF0aW9uID8gXCJpbnN0YWxsYXRpb25cIiA6IGlzVXNlclRvU2VydmVyID8gXCJ1c2VyLXRvLXNlcnZlclwiIDogXCJvYXV0aFwiO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFwidG9rZW5cIixcbiAgICB0b2tlbixcbiAgICB0b2tlblR5cGVcbiAgfTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL3dpdGgtYXV0aG9yaXphdGlvbi1wcmVmaXguanNcbmZ1bmN0aW9uIHdpdGhBdXRob3JpemF0aW9uUHJlZml4KHRva2VuKSB7XG4gIGlmICh0b2tlbi5zcGxpdCgvXFwuLykubGVuZ3RoID09PSAzKSB7XG4gICAgcmV0dXJuIGBiZWFyZXIgJHt0b2tlbn1gO1xuICB9XG4gIHJldHVybiBgdG9rZW4gJHt0b2tlbn1gO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvaG9vay5qc1xuYXN5bmMgZnVuY3Rpb24gaG9vayh0b2tlbiwgcmVxdWVzdCwgcm91dGUsIHBhcmFtZXRlcnMpIHtcbiAgY29uc3QgZW5kcG9pbnQgPSByZXF1ZXN0LmVuZHBvaW50Lm1lcmdlKFxuICAgIHJvdXRlLFxuICAgIHBhcmFtZXRlcnNcbiAgKTtcbiAgZW5kcG9pbnQuaGVhZGVycy5hdXRob3JpemF0aW9uID0gd2l0aEF1dGhvcml6YXRpb25QcmVmaXgodG9rZW4pO1xuICByZXR1cm4gcmVxdWVzdChlbmRwb2ludCk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9pbmRleC5qc1xudmFyIGNyZWF0ZVRva2VuQXV0aCA9IGZ1bmN0aW9uIGNyZWF0ZVRva2VuQXV0aDIodG9rZW4pIHtcbiAgaWYgKCF0b2tlbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIltAb2N0b2tpdC9hdXRoLXRva2VuXSBObyB0b2tlbiBwYXNzZWQgdG8gY3JlYXRlVG9rZW5BdXRoXCIpO1xuICB9XG4gIGlmICh0eXBlb2YgdG9rZW4gIT09IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBcIltAb2N0b2tpdC9hdXRoLXRva2VuXSBUb2tlbiBwYXNzZWQgdG8gY3JlYXRlVG9rZW5BdXRoIGlzIG5vdCBhIHN0cmluZ1wiXG4gICAgKTtcbiAgfVxuICB0b2tlbiA9IHRva2VuLnJlcGxhY2UoL14odG9rZW58YmVhcmVyKSArL2ksIFwiXCIpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihhdXRoLmJpbmQobnVsbCwgdG9rZW4pLCB7XG4gICAgaG9vazogaG9vay5iaW5kKG51bGwsIHRva2VuKVxuICB9KTtcbn07XG4vLyBBbm5vdGF0ZSB0aGUgQ29tbW9uSlMgZXhwb3J0IG5hbWVzIGZvciBFU00gaW1wb3J0IGluIG5vZGU6XG4wICYmIChtb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlVG9rZW5BdXRoXG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19leHBvcnQgPSAodGFyZ2V0LCBhbGwpID0+IHtcbiAgZm9yICh2YXIgbmFtZSBpbiBhbGwpXG4gICAgX19kZWZQcm9wKHRhcmdldCwgbmFtZSwgeyBnZXQ6IGFsbFtuYW1lXSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbn07XG52YXIgX19jb3B5UHJvcHMgPSAodG8sIGZyb20sIGV4Y2VwdCwgZGVzYykgPT4ge1xuICBpZiAoZnJvbSAmJiB0eXBlb2YgZnJvbSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20pKVxuICAgICAgaWYgKCFfX2hhc093blByb3AuY2FsbCh0bywga2V5KSAmJiBrZXkgIT09IGV4Y2VwdClcbiAgICAgICAgX19kZWZQcm9wKHRvLCBrZXksIHsgZ2V0OiAoKSA9PiBmcm9tW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MoZnJvbSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0bztcbn07XG52YXIgX190b0NvbW1vbkpTID0gKG1vZCkgPT4gX19jb3B5UHJvcHMoX19kZWZQcm9wKHt9LCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KSwgbW9kKTtcblxuLy8gcGtnL2Rpc3Qtc3JjL2luZGV4LmpzXG52YXIgaW5kZXhfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQoaW5kZXhfZXhwb3J0cywge1xuICBPY3Rva2l0OiAoKSA9PiBPY3Rva2l0XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX190b0NvbW1vbkpTKGluZGV4X2V4cG9ydHMpO1xudmFyIGltcG9ydF91bml2ZXJzYWxfdXNlcl9hZ2VudCA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtdXNlci1hZ2VudFwiKTtcbnZhciBpbXBvcnRfYmVmb3JlX2FmdGVyX2hvb2sgPSByZXF1aXJlKFwiYmVmb3JlLWFmdGVyLWhvb2tcIik7XG52YXIgaW1wb3J0X3JlcXVlc3QgPSByZXF1aXJlKFwiQG9jdG9raXQvcmVxdWVzdFwiKTtcbnZhciBpbXBvcnRfZ3JhcGhxbCA9IHJlcXVpcmUoXCJAb2N0b2tpdC9ncmFwaHFsXCIpO1xudmFyIGltcG9ydF9hdXRoX3Rva2VuID0gcmVxdWlyZShcIkBvY3Rva2l0L2F1dGgtdG9rZW5cIik7XG5cbi8vIHBrZy9kaXN0LXNyYy92ZXJzaW9uLmpzXG52YXIgVkVSU0lPTiA9IFwiNS4yLjJcIjtcblxuLy8gcGtnL2Rpc3Qtc3JjL2luZGV4LmpzXG52YXIgbm9vcCA9ICgpID0+IHtcbn07XG52YXIgY29uc29sZVdhcm4gPSBjb25zb2xlLndhcm4uYmluZChjb25zb2xlKTtcbnZhciBjb25zb2xlRXJyb3IgPSBjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7XG5mdW5jdGlvbiBjcmVhdGVMb2dnZXIobG9nZ2VyID0ge30pIHtcbiAgaWYgKHR5cGVvZiBsb2dnZXIuZGVidWcgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIGxvZ2dlci5kZWJ1ZyA9IG5vb3A7XG4gIH1cbiAgaWYgKHR5cGVvZiBsb2dnZXIuaW5mbyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbG9nZ2VyLmluZm8gPSBub29wO1xuICB9XG4gIGlmICh0eXBlb2YgbG9nZ2VyLndhcm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgIGxvZ2dlci53YXJuID0gY29uc29sZVdhcm47XG4gIH1cbiAgaWYgKHR5cGVvZiBsb2dnZXIuZXJyb3IgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIGxvZ2dlci5lcnJvciA9IGNvbnNvbGVFcnJvcjtcbiAgfVxuICByZXR1cm4gbG9nZ2VyO1xufVxudmFyIHVzZXJBZ2VudFRyYWlsID0gYG9jdG9raXQtY29yZS5qcy8ke1ZFUlNJT059ICR7KDAsIGltcG9ydF91bml2ZXJzYWxfdXNlcl9hZ2VudC5nZXRVc2VyQWdlbnQpKCl9YDtcbnZhciBPY3Rva2l0ID0gY2xhc3Mge1xuICBzdGF0aWMge1xuICAgIHRoaXMuVkVSU0lPTiA9IFZFUlNJT047XG4gIH1cbiAgc3RhdGljIGRlZmF1bHRzKGRlZmF1bHRzKSB7XG4gICAgY29uc3QgT2N0b2tpdFdpdGhEZWZhdWx0cyA9IGNsYXNzIGV4dGVuZHMgdGhpcyB7XG4gICAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBhcmdzWzBdIHx8IHt9O1xuICAgICAgICBpZiAodHlwZW9mIGRlZmF1bHRzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBzdXBlcihkZWZhdWx0cyhvcHRpb25zKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIGRlZmF1bHRzLFxuICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICAgIG9wdGlvbnMudXNlckFnZW50ICYmIGRlZmF1bHRzLnVzZXJBZ2VudCA/IHtcbiAgICAgICAgICAgICAgdXNlckFnZW50OiBgJHtvcHRpb25zLnVzZXJBZ2VudH0gJHtkZWZhdWx0cy51c2VyQWdlbnR9YFxuICAgICAgICAgICAgfSA6IG51bGxcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gT2N0b2tpdFdpdGhEZWZhdWx0cztcbiAgfVxuICBzdGF0aWMge1xuICAgIHRoaXMucGx1Z2lucyA9IFtdO1xuICB9XG4gIC8qKlxuICAgKiBBdHRhY2ggYSBwbHVnaW4gKG9yIG1hbnkpIHRvIHlvdXIgT2N0b2tpdCBpbnN0YW5jZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgQVBJID0gT2N0b2tpdC5wbHVnaW4ocGx1Z2luMSwgcGx1Z2luMiwgcGx1Z2luMywgLi4uKVxuICAgKi9cbiAgc3RhdGljIHBsdWdpbiguLi5uZXdQbHVnaW5zKSB7XG4gICAgY29uc3QgY3VycmVudFBsdWdpbnMgPSB0aGlzLnBsdWdpbnM7XG4gICAgY29uc3QgTmV3T2N0b2tpdCA9IGNsYXNzIGV4dGVuZHMgdGhpcyB7XG4gICAgICBzdGF0aWMge1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSBjdXJyZW50UGx1Z2lucy5jb25jYXQoXG4gICAgICAgICAgbmV3UGx1Z2lucy5maWx0ZXIoKHBsdWdpbikgPT4gIWN1cnJlbnRQbHVnaW5zLmluY2x1ZGVzKHBsdWdpbikpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTmV3T2N0b2tpdDtcbiAgfVxuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBob29rID0gbmV3IGltcG9ydF9iZWZvcmVfYWZ0ZXJfaG9vay5Db2xsZWN0aW9uKCk7XG4gICAgY29uc3QgcmVxdWVzdERlZmF1bHRzID0ge1xuICAgICAgYmFzZVVybDogaW1wb3J0X3JlcXVlc3QucmVxdWVzdC5lbmRwb2ludC5ERUZBVUxUUy5iYXNlVXJsLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICByZXF1ZXN0OiBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLnJlcXVlc3QsIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSBpbnRlcm5hbCB1c2FnZSBvbmx5LCBubyBuZWVkIHRvIHR5cGVcbiAgICAgICAgaG9vazogaG9vay5iaW5kKG51bGwsIFwicmVxdWVzdFwiKVxuICAgICAgfSksXG4gICAgICBtZWRpYVR5cGU6IHtcbiAgICAgICAgcHJldmlld3M6IFtdLFxuICAgICAgICBmb3JtYXQ6IFwiXCJcbiAgICAgIH1cbiAgICB9O1xuICAgIHJlcXVlc3REZWZhdWx0cy5oZWFkZXJzW1widXNlci1hZ2VudFwiXSA9IG9wdGlvbnMudXNlckFnZW50ID8gYCR7b3B0aW9ucy51c2VyQWdlbnR9ICR7dXNlckFnZW50VHJhaWx9YCA6IHVzZXJBZ2VudFRyYWlsO1xuICAgIGlmIChvcHRpb25zLmJhc2VVcmwpIHtcbiAgICAgIHJlcXVlc3REZWZhdWx0cy5iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5wcmV2aWV3cykge1xuICAgICAgcmVxdWVzdERlZmF1bHRzLm1lZGlhVHlwZS5wcmV2aWV3cyA9IG9wdGlvbnMucHJldmlld3M7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnRpbWVab25lKSB7XG4gICAgICByZXF1ZXN0RGVmYXVsdHMuaGVhZGVyc1tcInRpbWUtem9uZVwiXSA9IG9wdGlvbnMudGltZVpvbmU7XG4gICAgfVxuICAgIHRoaXMucmVxdWVzdCA9IGltcG9ydF9yZXF1ZXN0LnJlcXVlc3QuZGVmYXVsdHMocmVxdWVzdERlZmF1bHRzKTtcbiAgICB0aGlzLmdyYXBocWwgPSAoMCwgaW1wb3J0X2dyYXBocWwud2l0aEN1c3RvbVJlcXVlc3QpKHRoaXMucmVxdWVzdCkuZGVmYXVsdHMocmVxdWVzdERlZmF1bHRzKTtcbiAgICB0aGlzLmxvZyA9IGNyZWF0ZUxvZ2dlcihvcHRpb25zLmxvZyk7XG4gICAgdGhpcy5ob29rID0gaG9vaztcbiAgICBpZiAoIW9wdGlvbnMuYXV0aFN0cmF0ZWd5KSB7XG4gICAgICBpZiAoIW9wdGlvbnMuYXV0aCkge1xuICAgICAgICB0aGlzLmF1dGggPSBhc3luYyAoKSA9PiAoe1xuICAgICAgICAgIHR5cGU6IFwidW5hdXRoZW50aWNhdGVkXCJcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBhdXRoID0gKDAsIGltcG9ydF9hdXRoX3Rva2VuLmNyZWF0ZVRva2VuQXV0aCkob3B0aW9ucy5hdXRoKTtcbiAgICAgICAgaG9vay53cmFwKFwicmVxdWVzdFwiLCBhdXRoLmhvb2spO1xuICAgICAgICB0aGlzLmF1dGggPSBhdXRoO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7IGF1dGhTdHJhdGVneSwgLi4ub3RoZXJPcHRpb25zIH0gPSBvcHRpb25zO1xuICAgICAgY29uc3QgYXV0aCA9IGF1dGhTdHJhdGVneShcbiAgICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICB7XG4gICAgICAgICAgICByZXF1ZXN0OiB0aGlzLnJlcXVlc3QsXG4gICAgICAgICAgICBsb2c6IHRoaXMubG9nLFxuICAgICAgICAgICAgLy8gd2UgcGFzcyB0aGUgY3VycmVudCBvY3Rva2l0IGluc3RhbmNlIGFzIHdlbGwgYXMgaXRzIGNvbnN0cnVjdG9yIG9wdGlvbnNcbiAgICAgICAgICAgIC8vIHRvIGFsbG93IGZvciBhdXRoZW50aWNhdGlvbiBzdHJhdGVnaWVzIHRoYXQgcmV0dXJuIGEgbmV3IG9jdG9raXQgaW5zdGFuY2VcbiAgICAgICAgICAgIC8vIHRoYXQgc2hhcmVzIHRoZSBzYW1lIGludGVybmFsIHN0YXRlIGFzIHRoZSBjdXJyZW50IG9uZS4gVGhlIG9yaWdpbmFsXG4gICAgICAgICAgICAvLyByZXF1aXJlbWVudCBmb3IgdGhpcyB3YXMgdGhlIFwiZXZlbnQtb2N0b2tpdFwiIGF1dGhlbnRpY2F0aW9uIHN0cmF0ZWd5XG4gICAgICAgICAgICAvLyBvZiBodHRwczovL2dpdGh1Yi5jb20vcHJvYm90L29jdG9raXQtYXV0aC1wcm9ib3QuXG4gICAgICAgICAgICBvY3Rva2l0OiB0aGlzLFxuICAgICAgICAgICAgb2N0b2tpdE9wdGlvbnM6IG90aGVyT3B0aW9uc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb3B0aW9ucy5hdXRoXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBob29rLndyYXAoXCJyZXF1ZXN0XCIsIGF1dGguaG9vayk7XG4gICAgICB0aGlzLmF1dGggPSBhdXRoO1xuICAgIH1cbiAgICBjb25zdCBjbGFzc0NvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsYXNzQ29uc3RydWN0b3IucGx1Z2lucy5sZW5ndGg7ICsraSkge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjbGFzc0NvbnN0cnVjdG9yLnBsdWdpbnNbaV0odGhpcywgb3B0aW9ucykpO1xuICAgIH1cbiAgfVxufTtcbi8vIEFubm90YXRlIHRoZSBDb21tb25KUyBleHBvcnQgbmFtZXMgZm9yIEVTTSBpbXBvcnQgaW4gbm9kZTpcbjAgJiYgKG1vZHVsZS5leHBvcnRzID0ge1xuICBPY3Rva2l0XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19leHBvcnQgPSAodGFyZ2V0LCBhbGwpID0+IHtcbiAgZm9yICh2YXIgbmFtZSBpbiBhbGwpXG4gICAgX19kZWZQcm9wKHRhcmdldCwgbmFtZSwgeyBnZXQ6IGFsbFtuYW1lXSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbn07XG52YXIgX19jb3B5UHJvcHMgPSAodG8sIGZyb20sIGV4Y2VwdCwgZGVzYykgPT4ge1xuICBpZiAoZnJvbSAmJiB0eXBlb2YgZnJvbSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20pKVxuICAgICAgaWYgKCFfX2hhc093blByb3AuY2FsbCh0bywga2V5KSAmJiBrZXkgIT09IGV4Y2VwdClcbiAgICAgICAgX19kZWZQcm9wKHRvLCBrZXksIHsgZ2V0OiAoKSA9PiBmcm9tW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MoZnJvbSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0bztcbn07XG52YXIgX190b0NvbW1vbkpTID0gKG1vZCkgPT4gX19jb3B5UHJvcHMoX19kZWZQcm9wKHt9LCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KSwgbW9kKTtcblxuLy8gcGtnL2Rpc3Qtc3JjL2luZGV4LmpzXG52YXIgZGlzdF9zcmNfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQoZGlzdF9zcmNfZXhwb3J0cywge1xuICBsZWdhY3lSZXN0RW5kcG9pbnRNZXRob2RzOiAoKSA9PiBsZWdhY3lSZXN0RW5kcG9pbnRNZXRob2RzLFxuICByZXN0RW5kcG9pbnRNZXRob2RzOiAoKSA9PiByZXN0RW5kcG9pbnRNZXRob2RzXG59KTtcbm1vZHVsZS5leHBvcnRzID0gX190b0NvbW1vbkpTKGRpc3Rfc3JjX2V4cG9ydHMpO1xuXG4vLyBwa2cvZGlzdC1zcmMvdmVyc2lvbi5qc1xudmFyIFZFUlNJT04gPSBcIjEwLjQuMVwiO1xuXG4vLyBwa2cvZGlzdC1zcmMvZ2VuZXJhdGVkL2VuZHBvaW50cy5qc1xudmFyIEVuZHBvaW50cyA9IHtcbiAgYWN0aW9uczoge1xuICAgIGFkZEN1c3RvbUxhYmVsc1RvU2VsZkhvc3RlZFJ1bm5lckZvck9yZzogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfS9sYWJlbHNcIlxuICAgIF0sXG4gICAgYWRkQ3VzdG9tTGFiZWxzVG9TZWxmSG9zdGVkUnVubmVyRm9yUmVwbzogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH0vbGFiZWxzXCJcbiAgICBdLFxuICAgIGFkZFNlbGVjdGVkUmVwb1RvT3JnU2VjcmV0OiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9hY3Rpb25zL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIGFkZFNlbGVjdGVkUmVwb1RvT3JnVmFyaWFibGU6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvdmFyaWFibGVzL3tuYW1lfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIGFwcHJvdmVXb3JrZmxvd1J1bjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vYXBwcm92ZVwiXG4gICAgXSxcbiAgICBjYW5jZWxXb3JrZmxvd1J1bjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vY2FuY2VsXCJcbiAgICBdLFxuICAgIGNyZWF0ZUVudmlyb25tZW50VmFyaWFibGU6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3ZhcmlhYmxlc1wiXG4gICAgXSxcbiAgICBjcmVhdGVPclVwZGF0ZUVudmlyb25tZW50U2VjcmV0OiBbXG4gICAgICBcIlBVVCAvcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBjcmVhdGVPclVwZGF0ZU9yZ1NlY3JldDogW1wiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJdLFxuICAgIGNyZWF0ZU9yVXBkYXRlUmVwb1NlY3JldDogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGNyZWF0ZU9yZ1ZhcmlhYmxlOiBbXCJQT1NUIC9vcmdzL3tvcmd9L2FjdGlvbnMvdmFyaWFibGVzXCJdLFxuICAgIGNyZWF0ZVJlZ2lzdHJhdGlvblRva2VuRm9yT3JnOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vYWN0aW9ucy9ydW5uZXJzL3JlZ2lzdHJhdGlvbi10b2tlblwiXG4gICAgXSxcbiAgICBjcmVhdGVSZWdpc3RyYXRpb25Ub2tlbkZvclJlcG86IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5uZXJzL3JlZ2lzdHJhdGlvbi10b2tlblwiXG4gICAgXSxcbiAgICBjcmVhdGVSZW1vdmVUb2tlbkZvck9yZzogW1wiUE9TVCAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnMvcmVtb3ZlLXRva2VuXCJdLFxuICAgIGNyZWF0ZVJlbW92ZVRva2VuRm9yUmVwbzogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnMvcmVtb3ZlLXRva2VuXCJcbiAgICBdLFxuICAgIGNyZWF0ZVJlcG9WYXJpYWJsZTogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy92YXJpYWJsZXNcIl0sXG4gICAgY3JlYXRlV29ya2Zsb3dEaXNwYXRjaDogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3dvcmtmbG93cy97d29ya2Zsb3dfaWR9L2Rpc3BhdGNoZXNcIlxuICAgIF0sXG4gICAgZGVsZXRlQWN0aW9uc0NhY2hlQnlJZDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvY2FjaGVzL3tjYWNoZV9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlQWN0aW9uc0NhY2hlQnlLZXk6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL2NhY2hlc3s/a2V5LHJlZn1cIlxuICAgIF0sXG4gICAgZGVsZXRlQXJ0aWZhY3Q6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL2FydGlmYWN0cy97YXJ0aWZhY3RfaWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUVudmlyb25tZW50U2VjcmV0OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBkZWxldGVFbnZpcm9ubWVudFZhcmlhYmxlOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3ZhcmlhYmxlcy97bmFtZX1cIlxuICAgIF0sXG4gICAgZGVsZXRlT3JnU2VjcmV0OiBbXCJERUxFVEUgL29yZ3Mve29yZ30vYWN0aW9ucy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIl0sXG4gICAgZGVsZXRlT3JnVmFyaWFibGU6IFtcIkRFTEVURSAvb3Jncy97b3JnfS9hY3Rpb25zL3ZhcmlhYmxlcy97bmFtZX1cIl0sXG4gICAgZGVsZXRlUmVwb1NlY3JldDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVJlcG9WYXJpYWJsZTogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvdmFyaWFibGVzL3tuYW1lfVwiXG4gICAgXSxcbiAgICBkZWxldGVTZWxmSG9zdGVkUnVubmVyRnJvbU9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vYWN0aW9ucy9ydW5uZXJzL3tydW5uZXJfaWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVNlbGZIb3N0ZWRSdW5uZXJGcm9tUmVwbzogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVXb3JrZmxvd1J1bjogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH1cIl0sXG4gICAgZGVsZXRlV29ya2Zsb3dSdW5Mb2dzOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L2xvZ3NcIlxuICAgIF0sXG4gICAgZGlzYWJsZVNlbGVjdGVkUmVwb3NpdG9yeUdpdGh1YkFjdGlvbnNPcmdhbml6YXRpb246IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2FjdGlvbnMvcGVybWlzc2lvbnMvcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfVwiXG4gICAgXSxcbiAgICBkaXNhYmxlV29ya2Zsb3c6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3dvcmtmbG93cy97d29ya2Zsb3dfaWR9L2Rpc2FibGVcIlxuICAgIF0sXG4gICAgZG93bmxvYWRBcnRpZmFjdDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvYXJ0aWZhY3RzL3thcnRpZmFjdF9pZH0ve2FyY2hpdmVfZm9ybWF0fVwiXG4gICAgXSxcbiAgICBkb3dubG9hZEpvYkxvZ3NGb3JXb3JrZmxvd1J1bjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvam9icy97am9iX2lkfS9sb2dzXCJcbiAgICBdLFxuICAgIGRvd25sb2FkV29ya2Zsb3dSdW5BdHRlbXB0TG9nczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9hdHRlbXB0cy97YXR0ZW1wdF9udW1iZXJ9L2xvZ3NcIlxuICAgIF0sXG4gICAgZG93bmxvYWRXb3JrZmxvd1J1bkxvZ3M6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vbG9nc1wiXG4gICAgXSxcbiAgICBlbmFibGVTZWxlY3RlZFJlcG9zaXRvcnlHaXRodWJBY3Rpb25zT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9hY3Rpb25zL3Blcm1pc3Npb25zL3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgZW5hYmxlV29ya2Zsb3c6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3dvcmtmbG93cy97d29ya2Zsb3dfaWR9L2VuYWJsZVwiXG4gICAgXSxcbiAgICBmb3JjZUNhbmNlbFdvcmtmbG93UnVuOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9mb3JjZS1jYW5jZWxcIlxuICAgIF0sXG4gICAgZ2VuZXJhdGVSdW5uZXJKaXRjb25maWdGb3JPcmc6IFtcbiAgICAgIFwiUE9TVCAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnMvZ2VuZXJhdGUtaml0Y29uZmlnXCJcbiAgICBdLFxuICAgIGdlbmVyYXRlUnVubmVySml0Y29uZmlnRm9yUmVwbzogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnMvZ2VuZXJhdGUtaml0Y29uZmlnXCJcbiAgICBdLFxuICAgIGdldEFjdGlvbnNDYWNoZUxpc3Q6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9jYWNoZXNcIl0sXG4gICAgZ2V0QWN0aW9uc0NhY2hlVXNhZ2U6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9jYWNoZS91c2FnZVwiXSxcbiAgICBnZXRBY3Rpb25zQ2FjaGVVc2FnZUJ5UmVwb0Zvck9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9jYWNoZS91c2FnZS1ieS1yZXBvc2l0b3J5XCJcbiAgICBdLFxuICAgIGdldEFjdGlvbnNDYWNoZVVzYWdlRm9yT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9jYWNoZS91c2FnZVwiXSxcbiAgICBnZXRBbGxvd2VkQWN0aW9uc09yZ2FuaXphdGlvbjogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9wZXJtaXNzaW9ucy9zZWxlY3RlZC1hY3Rpb25zXCJcbiAgICBdLFxuICAgIGdldEFsbG93ZWRBY3Rpb25zUmVwb3NpdG9yeTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcGVybWlzc2lvbnMvc2VsZWN0ZWQtYWN0aW9uc1wiXG4gICAgXSxcbiAgICBnZXRBcnRpZmFjdDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL2FydGlmYWN0cy97YXJ0aWZhY3RfaWR9XCJdLFxuICAgIGdldEN1c3RvbU9pZGNTdWJDbGFpbUZvclJlcG86IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL29pZGMvY3VzdG9taXphdGlvbi9zdWJcIlxuICAgIF0sXG4gICAgZ2V0RW52aXJvbm1lbnRQdWJsaWNLZXk6IFtcbiAgICAgIFwiR0VUIC9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vc2VjcmV0cy9wdWJsaWMta2V5XCJcbiAgICBdLFxuICAgIGdldEVudmlyb25tZW50U2VjcmV0OiBbXG4gICAgICBcIkdFVCAvcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBnZXRFbnZpcm9ubWVudFZhcmlhYmxlOiBbXG4gICAgICBcIkdFVCAvcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3ZhcmlhYmxlcy97bmFtZX1cIlxuICAgIF0sXG4gICAgZ2V0R2l0aHViQWN0aW9uc0RlZmF1bHRXb3JrZmxvd1Blcm1pc3Npb25zT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3Blcm1pc3Npb25zL3dvcmtmbG93XCJcbiAgICBdLFxuICAgIGdldEdpdGh1YkFjdGlvbnNEZWZhdWx0V29ya2Zsb3dQZXJtaXNzaW9uc1JlcG9zaXRvcnk6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3Blcm1pc3Npb25zL3dvcmtmbG93XCJcbiAgICBdLFxuICAgIGdldEdpdGh1YkFjdGlvbnNQZXJtaXNzaW9uc09yZ2FuaXphdGlvbjogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9wZXJtaXNzaW9uc1wiXG4gICAgXSxcbiAgICBnZXRHaXRodWJBY3Rpb25zUGVybWlzc2lvbnNSZXBvc2l0b3J5OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9wZXJtaXNzaW9uc1wiXG4gICAgXSxcbiAgICBnZXRKb2JGb3JXb3JrZmxvd1J1bjogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL2pvYnMve2pvYl9pZH1cIl0sXG4gICAgZ2V0T3JnUHVibGljS2V5OiBbXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9zZWNyZXRzL3B1YmxpYy1rZXlcIl0sXG4gICAgZ2V0T3JnU2VjcmV0OiBbXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIl0sXG4gICAgZ2V0T3JnVmFyaWFibGU6IFtcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3ZhcmlhYmxlcy97bmFtZX1cIl0sXG4gICAgZ2V0UGVuZGluZ0RlcGxveW1lbnRzRm9yUnVuOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L3BlbmRpbmdfZGVwbG95bWVudHNcIlxuICAgIF0sXG4gICAgZ2V0UmVwb1Blcm1pc3Npb25zOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9wZXJtaXNzaW9uc1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcImFjdGlvbnNcIiwgXCJnZXRHaXRodWJBY3Rpb25zUGVybWlzc2lvbnNSZXBvc2l0b3J5XCJdIH1cbiAgICBdLFxuICAgIGdldFJlcG9QdWJsaWNLZXk6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9zZWNyZXRzL3B1YmxpYy1rZXlcIl0sXG4gICAgZ2V0UmVwb1NlY3JldDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXSxcbiAgICBnZXRSZXBvVmFyaWFibGU6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy92YXJpYWJsZXMve25hbWV9XCJdLFxuICAgIGdldFJldmlld3NGb3JSdW46IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vYXBwcm92YWxzXCJcbiAgICBdLFxuICAgIGdldFNlbGZIb3N0ZWRSdW5uZXJGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH1cIl0sXG4gICAgZ2V0U2VsZkhvc3RlZFJ1bm5lckZvclJlcG86IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH1cIlxuICAgIF0sXG4gICAgZ2V0V29ya2Zsb3c6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy93b3JrZmxvd3Mve3dvcmtmbG93X2lkfVwiXSxcbiAgICBnZXRXb3JrZmxvd0FjY2Vzc1RvUmVwb3NpdG9yeTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcGVybWlzc2lvbnMvYWNjZXNzXCJcbiAgICBdLFxuICAgIGdldFdvcmtmbG93UnVuOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfVwiXSxcbiAgICBnZXRXb3JrZmxvd1J1bkF0dGVtcHQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vYXR0ZW1wdHMve2F0dGVtcHRfbnVtYmVyfVwiXG4gICAgXSxcbiAgICBnZXRXb3JrZmxvd1J1blVzYWdlOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L3RpbWluZ1wiXG4gICAgXSxcbiAgICBnZXRXb3JrZmxvd1VzYWdlOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy93b3JrZmxvd3Mve3dvcmtmbG93X2lkfS90aW1pbmdcIlxuICAgIF0sXG4gICAgbGlzdEFydGlmYWN0c0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9hcnRpZmFjdHNcIl0sXG4gICAgbGlzdEVudmlyb25tZW50U2VjcmV0czogW1xuICAgICAgXCJHRVQgL3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH0vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9zZWNyZXRzXCJcbiAgICBdLFxuICAgIGxpc3RFbnZpcm9ubWVudFZhcmlhYmxlczogW1xuICAgICAgXCJHRVQgL3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH0vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS92YXJpYWJsZXNcIlxuICAgIF0sXG4gICAgbGlzdEpvYnNGb3JXb3JrZmxvd1J1bjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9qb2JzXCJcbiAgICBdLFxuICAgIGxpc3RKb2JzRm9yV29ya2Zsb3dSdW5BdHRlbXB0OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L2F0dGVtcHRzL3thdHRlbXB0X251bWJlcn0vam9ic1wiXG4gICAgXSxcbiAgICBsaXN0TGFiZWxzRm9yU2VsZkhvc3RlZFJ1bm5lckZvck9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9ydW5uZXJzL3tydW5uZXJfaWR9L2xhYmVsc1wiXG4gICAgXSxcbiAgICBsaXN0TGFiZWxzRm9yU2VsZkhvc3RlZFJ1bm5lckZvclJlcG86IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH0vbGFiZWxzXCJcbiAgICBdLFxuICAgIGxpc3RPcmdTZWNyZXRzOiBbXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9zZWNyZXRzXCJdLFxuICAgIGxpc3RPcmdWYXJpYWJsZXM6IFtcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3ZhcmlhYmxlc1wiXSxcbiAgICBsaXN0UmVwb09yZ2FuaXphdGlvblNlY3JldHM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL29yZ2FuaXphdGlvbi1zZWNyZXRzXCJcbiAgICBdLFxuICAgIGxpc3RSZXBvT3JnYW5pemF0aW9uVmFyaWFibGVzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9vcmdhbml6YXRpb24tdmFyaWFibGVzXCJcbiAgICBdLFxuICAgIGxpc3RSZXBvU2VjcmV0czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3NlY3JldHNcIl0sXG4gICAgbGlzdFJlcG9WYXJpYWJsZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy92YXJpYWJsZXNcIl0sXG4gICAgbGlzdFJlcG9Xb3JrZmxvd3M6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy93b3JrZmxvd3NcIl0sXG4gICAgbGlzdFJ1bm5lckFwcGxpY2F0aW9uc0Zvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVycy9kb3dubG9hZHNcIl0sXG4gICAgbGlzdFJ1bm5lckFwcGxpY2F0aW9uc0ZvclJlcG86IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnMvZG93bmxvYWRzXCJcbiAgICBdLFxuICAgIGxpc3RTZWxlY3RlZFJlcG9zRm9yT3JnU2VjcmV0OiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgbGlzdFNlbGVjdGVkUmVwb3NGb3JPcmdWYXJpYWJsZTogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy92YXJpYWJsZXMve25hbWV9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBsaXN0U2VsZWN0ZWRSZXBvc2l0b3JpZXNFbmFibGVkR2l0aHViQWN0aW9uc09yZ2FuaXphdGlvbjogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9wZXJtaXNzaW9ucy9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgbGlzdFNlbGZIb3N0ZWRSdW5uZXJzRm9yT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9ydW5uZXJzXCJdLFxuICAgIGxpc3RTZWxmSG9zdGVkUnVubmVyc0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5uZXJzXCJdLFxuICAgIGxpc3RXb3JrZmxvd1J1bkFydGlmYWN0czogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9hcnRpZmFjdHNcIlxuICAgIF0sXG4gICAgbGlzdFdvcmtmbG93UnVuczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvd29ya2Zsb3dzL3t3b3JrZmxvd19pZH0vcnVuc1wiXG4gICAgXSxcbiAgICBsaXN0V29ya2Zsb3dSdW5zRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnNcIl0sXG4gICAgcmVSdW5Kb2JGb3JXb3JrZmxvd1J1bjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL2pvYnMve2pvYl9pZH0vcmVydW5cIlxuICAgIF0sXG4gICAgcmVSdW5Xb3JrZmxvdzogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L3JlcnVuXCJdLFxuICAgIHJlUnVuV29ya2Zsb3dGYWlsZWRKb2JzOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9yZXJ1bi1mYWlsZWQtam9ic1wiXG4gICAgXSxcbiAgICByZW1vdmVBbGxDdXN0b21MYWJlbHNGcm9tU2VsZkhvc3RlZFJ1bm5lckZvck9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vYWN0aW9ucy9ydW5uZXJzL3tydW5uZXJfaWR9L2xhYmVsc1wiXG4gICAgXSxcbiAgICByZW1vdmVBbGxDdXN0b21MYWJlbHNGcm9tU2VsZkhvc3RlZFJ1bm5lckZvclJlcG86IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH0vbGFiZWxzXCJcbiAgICBdLFxuICAgIHJlbW92ZUN1c3RvbUxhYmVsRnJvbVNlbGZIb3N0ZWRSdW5uZXJGb3JPcmc6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfS9sYWJlbHMve25hbWV9XCJcbiAgICBdLFxuICAgIHJlbW92ZUN1c3RvbUxhYmVsRnJvbVNlbGZIb3N0ZWRSdW5uZXJGb3JSZXBvOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5uZXJzL3tydW5uZXJfaWR9L2xhYmVscy97bmFtZX1cIlxuICAgIF0sXG4gICAgcmVtb3ZlU2VsZWN0ZWRSZXBvRnJvbU9yZ1NlY3JldDogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vYWN0aW9ucy9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfVwiXG4gICAgXSxcbiAgICByZW1vdmVTZWxlY3RlZFJlcG9Gcm9tT3JnVmFyaWFibGU6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2FjdGlvbnMvdmFyaWFibGVzL3tuYW1lfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIHJldmlld0N1c3RvbUdhdGVzRm9yUnVuOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9kZXBsb3ltZW50X3Byb3RlY3Rpb25fcnVsZVwiXG4gICAgXSxcbiAgICByZXZpZXdQZW5kaW5nRGVwbG95bWVudHNGb3JSdW46IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L3BlbmRpbmdfZGVwbG95bWVudHNcIlxuICAgIF0sXG4gICAgc2V0QWxsb3dlZEFjdGlvbnNPcmdhbml6YXRpb246IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcGVybWlzc2lvbnMvc2VsZWN0ZWQtYWN0aW9uc1wiXG4gICAgXSxcbiAgICBzZXRBbGxvd2VkQWN0aW9uc1JlcG9zaXRvcnk6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3Blcm1pc3Npb25zL3NlbGVjdGVkLWFjdGlvbnNcIlxuICAgIF0sXG4gICAgc2V0Q3VzdG9tTGFiZWxzRm9yU2VsZkhvc3RlZFJ1bm5lckZvck9yZzogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vYWN0aW9ucy9ydW5uZXJzL3tydW5uZXJfaWR9L2xhYmVsc1wiXG4gICAgXSxcbiAgICBzZXRDdXN0b21MYWJlbHNGb3JTZWxmSG9zdGVkUnVubmVyRm9yUmVwbzogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfS9sYWJlbHNcIlxuICAgIF0sXG4gICAgc2V0Q3VzdG9tT2lkY1N1YkNsYWltRm9yUmVwbzogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvb2lkYy9jdXN0b21pemF0aW9uL3N1YlwiXG4gICAgXSxcbiAgICBzZXRHaXRodWJBY3Rpb25zRGVmYXVsdFdvcmtmbG93UGVybWlzc2lvbnNPcmdhbml6YXRpb246IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcGVybWlzc2lvbnMvd29ya2Zsb3dcIlxuICAgIF0sXG4gICAgc2V0R2l0aHViQWN0aW9uc0RlZmF1bHRXb3JrZmxvd1Blcm1pc3Npb25zUmVwb3NpdG9yeTogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcGVybWlzc2lvbnMvd29ya2Zsb3dcIlxuICAgIF0sXG4gICAgc2V0R2l0aHViQWN0aW9uc1Blcm1pc3Npb25zT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9hY3Rpb25zL3Blcm1pc3Npb25zXCJcbiAgICBdLFxuICAgIHNldEdpdGh1YkFjdGlvbnNQZXJtaXNzaW9uc1JlcG9zaXRvcnk6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3Blcm1pc3Npb25zXCJcbiAgICBdLFxuICAgIHNldFNlbGVjdGVkUmVwb3NGb3JPcmdTZWNyZXQ6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBzZXRTZWxlY3RlZFJlcG9zRm9yT3JnVmFyaWFibGU6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvdmFyaWFibGVzL3tuYW1lfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgc2V0U2VsZWN0ZWRSZXBvc2l0b3JpZXNFbmFibGVkR2l0aHViQWN0aW9uc09yZ2FuaXphdGlvbjogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vYWN0aW9ucy9wZXJtaXNzaW9ucy9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgc2V0V29ya2Zsb3dBY2Nlc3NUb1JlcG9zaXRvcnk6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3Blcm1pc3Npb25zL2FjY2Vzc1wiXG4gICAgXSxcbiAgICB1cGRhdGVFbnZpcm9ubWVudFZhcmlhYmxlOiBbXG4gICAgICBcIlBBVENIIC9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vdmFyaWFibGVzL3tuYW1lfVwiXG4gICAgXSxcbiAgICB1cGRhdGVPcmdWYXJpYWJsZTogW1wiUEFUQ0ggL29yZ3Mve29yZ30vYWN0aW9ucy92YXJpYWJsZXMve25hbWV9XCJdLFxuICAgIHVwZGF0ZVJlcG9WYXJpYWJsZTogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy92YXJpYWJsZXMve25hbWV9XCJcbiAgICBdXG4gIH0sXG4gIGFjdGl2aXR5OiB7XG4gICAgY2hlY2tSZXBvSXNTdGFycmVkQnlBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL3N0YXJyZWQve293bmVyfS97cmVwb31cIl0sXG4gICAgZGVsZXRlUmVwb1N1YnNjcmlwdGlvbjogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zdWJzY3JpcHRpb25cIl0sXG4gICAgZGVsZXRlVGhyZWFkU3Vic2NyaXB0aW9uOiBbXG4gICAgICBcIkRFTEVURSAvbm90aWZpY2F0aW9ucy90aHJlYWRzL3t0aHJlYWRfaWR9L3N1YnNjcmlwdGlvblwiXG4gICAgXSxcbiAgICBnZXRGZWVkczogW1wiR0VUIC9mZWVkc1wiXSxcbiAgICBnZXRSZXBvU3Vic2NyaXB0aW9uOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N1YnNjcmlwdGlvblwiXSxcbiAgICBnZXRUaHJlYWQ6IFtcIkdFVCAvbm90aWZpY2F0aW9ucy90aHJlYWRzL3t0aHJlYWRfaWR9XCJdLFxuICAgIGdldFRocmVhZFN1YnNjcmlwdGlvbkZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvbm90aWZpY2F0aW9ucy90aHJlYWRzL3t0aHJlYWRfaWR9L3N1YnNjcmlwdGlvblwiXG4gICAgXSxcbiAgICBsaXN0RXZlbnRzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9ldmVudHNcIl0sXG4gICAgbGlzdE5vdGlmaWNhdGlvbnNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC9ub3RpZmljYXRpb25zXCJdLFxuICAgIGxpc3RPcmdFdmVudHNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZXZlbnRzL29yZ3Mve29yZ31cIlxuICAgIF0sXG4gICAgbGlzdFB1YmxpY0V2ZW50czogW1wiR0VUIC9ldmVudHNcIl0sXG4gICAgbGlzdFB1YmxpY0V2ZW50c0ZvclJlcG9OZXR3b3JrOiBbXCJHRVQgL25ldHdvcmtzL3tvd25lcn0ve3JlcG99L2V2ZW50c1wiXSxcbiAgICBsaXN0UHVibGljRXZlbnRzRm9yVXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L2V2ZW50cy9wdWJsaWNcIl0sXG4gICAgbGlzdFB1YmxpY09yZ0V2ZW50czogW1wiR0VUIC9vcmdzL3tvcmd9L2V2ZW50c1wiXSxcbiAgICBsaXN0UmVjZWl2ZWRFdmVudHNGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcmVjZWl2ZWRfZXZlbnRzXCJdLFxuICAgIGxpc3RSZWNlaXZlZFB1YmxpY0V2ZW50c0ZvclVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3JlY2VpdmVkX2V2ZW50cy9wdWJsaWNcIlxuICAgIF0sXG4gICAgbGlzdFJlcG9FdmVudHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZXZlbnRzXCJdLFxuICAgIGxpc3RSZXBvTm90aWZpY2F0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vbm90aWZpY2F0aW9uc1wiXG4gICAgXSxcbiAgICBsaXN0UmVwb3NTdGFycmVkQnlBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL3N0YXJyZWRcIl0sXG4gICAgbGlzdFJlcG9zU3RhcnJlZEJ5VXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L3N0YXJyZWRcIl0sXG4gICAgbGlzdFJlcG9zV2F0Y2hlZEJ5VXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L3N1YnNjcmlwdGlvbnNcIl0sXG4gICAgbGlzdFN0YXJnYXplcnNGb3JSZXBvOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N0YXJnYXplcnNcIl0sXG4gICAgbGlzdFdhdGNoZWRSZXBvc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvc3Vic2NyaXB0aW9uc1wiXSxcbiAgICBsaXN0V2F0Y2hlcnNGb3JSZXBvOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N1YnNjcmliZXJzXCJdLFxuICAgIG1hcmtOb3RpZmljYXRpb25zQXNSZWFkOiBbXCJQVVQgL25vdGlmaWNhdGlvbnNcIl0sXG4gICAgbWFya1JlcG9Ob3RpZmljYXRpb25zQXNSZWFkOiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L25vdGlmaWNhdGlvbnNcIl0sXG4gICAgbWFya1RocmVhZEFzRG9uZTogW1wiREVMRVRFIC9ub3RpZmljYXRpb25zL3RocmVhZHMve3RocmVhZF9pZH1cIl0sXG4gICAgbWFya1RocmVhZEFzUmVhZDogW1wiUEFUQ0ggL25vdGlmaWNhdGlvbnMvdGhyZWFkcy97dGhyZWFkX2lkfVwiXSxcbiAgICBzZXRSZXBvU3Vic2NyaXB0aW9uOiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N1YnNjcmlwdGlvblwiXSxcbiAgICBzZXRUaHJlYWRTdWJzY3JpcHRpb246IFtcbiAgICAgIFwiUFVUIC9ub3RpZmljYXRpb25zL3RocmVhZHMve3RocmVhZF9pZH0vc3Vic2NyaXB0aW9uXCJcbiAgICBdLFxuICAgIHN0YXJSZXBvRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBVVCAvdXNlci9zdGFycmVkL3tvd25lcn0ve3JlcG99XCJdLFxuICAgIHVuc3RhclJlcG9Gb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiREVMRVRFIC91c2VyL3N0YXJyZWQve293bmVyfS97cmVwb31cIl1cbiAgfSxcbiAgYXBwczoge1xuICAgIGFkZFJlcG9Ub0luc3RhbGxhdGlvbjogW1xuICAgICAgXCJQVVQgL3VzZXIvaW5zdGFsbGF0aW9ucy97aW5zdGFsbGF0aW9uX2lkfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wiYXBwc1wiLCBcImFkZFJlcG9Ub0luc3RhbGxhdGlvbkZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGFkZFJlcG9Ub0luc3RhbGxhdGlvbkZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBVVCAvdXNlci9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgY2hlY2tUb2tlbjogW1wiUE9TVCAvYXBwbGljYXRpb25zL3tjbGllbnRfaWR9L3Rva2VuXCJdLFxuICAgIGNyZWF0ZUZyb21NYW5pZmVzdDogW1wiUE9TVCAvYXBwLW1hbmlmZXN0cy97Y29kZX0vY29udmVyc2lvbnNcIl0sXG4gICAgY3JlYXRlSW5zdGFsbGF0aW9uQWNjZXNzVG9rZW46IFtcbiAgICAgIFwiUE9TVCAvYXBwL2luc3RhbGxhdGlvbnMve2luc3RhbGxhdGlvbl9pZH0vYWNjZXNzX3Rva2Vuc1wiXG4gICAgXSxcbiAgICBkZWxldGVBdXRob3JpemF0aW9uOiBbXCJERUxFVEUgL2FwcGxpY2F0aW9ucy97Y2xpZW50X2lkfS9ncmFudFwiXSxcbiAgICBkZWxldGVJbnN0YWxsYXRpb246IFtcIkRFTEVURSAvYXBwL2luc3RhbGxhdGlvbnMve2luc3RhbGxhdGlvbl9pZH1cIl0sXG4gICAgZGVsZXRlVG9rZW46IFtcIkRFTEVURSAvYXBwbGljYXRpb25zL3tjbGllbnRfaWR9L3Rva2VuXCJdLFxuICAgIGdldEF1dGhlbnRpY2F0ZWQ6IFtcIkdFVCAvYXBwXCJdLFxuICAgIGdldEJ5U2x1ZzogW1wiR0VUIC9hcHBzL3thcHBfc2x1Z31cIl0sXG4gICAgZ2V0SW5zdGFsbGF0aW9uOiBbXCJHRVQgL2FwcC9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9XCJdLFxuICAgIGdldE9yZ0luc3RhbGxhdGlvbjogW1wiR0VUIC9vcmdzL3tvcmd9L2luc3RhbGxhdGlvblwiXSxcbiAgICBnZXRSZXBvSW5zdGFsbGF0aW9uOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2luc3RhbGxhdGlvblwiXSxcbiAgICBnZXRTdWJzY3JpcHRpb25QbGFuRm9yQWNjb3VudDogW1xuICAgICAgXCJHRVQgL21hcmtldHBsYWNlX2xpc3RpbmcvYWNjb3VudHMve2FjY291bnRfaWR9XCJcbiAgICBdLFxuICAgIGdldFN1YnNjcmlwdGlvblBsYW5Gb3JBY2NvdW50U3R1YmJlZDogW1xuICAgICAgXCJHRVQgL21hcmtldHBsYWNlX2xpc3Rpbmcvc3R1YmJlZC9hY2NvdW50cy97YWNjb3VudF9pZH1cIlxuICAgIF0sXG4gICAgZ2V0VXNlckluc3RhbGxhdGlvbjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L2luc3RhbGxhdGlvblwiXSxcbiAgICBnZXRXZWJob29rQ29uZmlnRm9yQXBwOiBbXCJHRVQgL2FwcC9ob29rL2NvbmZpZ1wiXSxcbiAgICBnZXRXZWJob29rRGVsaXZlcnk6IFtcIkdFVCAvYXBwL2hvb2svZGVsaXZlcmllcy97ZGVsaXZlcnlfaWR9XCJdLFxuICAgIGxpc3RBY2NvdW50c0ZvclBsYW46IFtcIkdFVCAvbWFya2V0cGxhY2VfbGlzdGluZy9wbGFucy97cGxhbl9pZH0vYWNjb3VudHNcIl0sXG4gICAgbGlzdEFjY291bnRzRm9yUGxhblN0dWJiZWQ6IFtcbiAgICAgIFwiR0VUIC9tYXJrZXRwbGFjZV9saXN0aW5nL3N0dWJiZWQvcGxhbnMve3BsYW5faWR9L2FjY291bnRzXCJcbiAgICBdLFxuICAgIGxpc3RJbnN0YWxsYXRpb25SZXBvc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBsaXN0SW5zdGFsbGF0aW9uUmVxdWVzdHNGb3JBdXRoZW50aWNhdGVkQXBwOiBbXG4gICAgICBcIkdFVCAvYXBwL2luc3RhbGxhdGlvbi1yZXF1ZXN0c1wiXG4gICAgXSxcbiAgICBsaXN0SW5zdGFsbGF0aW9uczogW1wiR0VUIC9hcHAvaW5zdGFsbGF0aW9uc1wiXSxcbiAgICBsaXN0SW5zdGFsbGF0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvaW5zdGFsbGF0aW9uc1wiXSxcbiAgICBsaXN0UGxhbnM6IFtcIkdFVCAvbWFya2V0cGxhY2VfbGlzdGluZy9wbGFuc1wiXSxcbiAgICBsaXN0UGxhbnNTdHViYmVkOiBbXCJHRVQgL21hcmtldHBsYWNlX2xpc3Rpbmcvc3R1YmJlZC9wbGFuc1wiXSxcbiAgICBsaXN0UmVwb3NBY2Nlc3NpYmxlVG9JbnN0YWxsYXRpb246IFtcIkdFVCAvaW5zdGFsbGF0aW9uL3JlcG9zaXRvcmllc1wiXSxcbiAgICBsaXN0U3Vic2NyaXB0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvbWFya2V0cGxhY2VfcHVyY2hhc2VzXCJdLFxuICAgIGxpc3RTdWJzY3JpcHRpb25zRm9yQXV0aGVudGljYXRlZFVzZXJTdHViYmVkOiBbXG4gICAgICBcIkdFVCAvdXNlci9tYXJrZXRwbGFjZV9wdXJjaGFzZXMvc3R1YmJlZFwiXG4gICAgXSxcbiAgICBsaXN0V2ViaG9va0RlbGl2ZXJpZXM6IFtcIkdFVCAvYXBwL2hvb2svZGVsaXZlcmllc1wiXSxcbiAgICByZWRlbGl2ZXJXZWJob29rRGVsaXZlcnk6IFtcbiAgICAgIFwiUE9TVCAvYXBwL2hvb2svZGVsaXZlcmllcy97ZGVsaXZlcnlfaWR9L2F0dGVtcHRzXCJcbiAgICBdLFxuICAgIHJlbW92ZVJlcG9Gcm9tSW5zdGFsbGF0aW9uOiBbXG4gICAgICBcIkRFTEVURSAvdXNlci9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJhcHBzXCIsIFwicmVtb3ZlUmVwb0Zyb21JbnN0YWxsYXRpb25Gb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICByZW1vdmVSZXBvRnJvbUluc3RhbGxhdGlvbkZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkRFTEVURSAvdXNlci9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgcmVzZXRUb2tlbjogW1wiUEFUQ0ggL2FwcGxpY2F0aW9ucy97Y2xpZW50X2lkfS90b2tlblwiXSxcbiAgICByZXZva2VJbnN0YWxsYXRpb25BY2Nlc3NUb2tlbjogW1wiREVMRVRFIC9pbnN0YWxsYXRpb24vdG9rZW5cIl0sXG4gICAgc2NvcGVUb2tlbjogW1wiUE9TVCAvYXBwbGljYXRpb25zL3tjbGllbnRfaWR9L3Rva2VuL3Njb3BlZFwiXSxcbiAgICBzdXNwZW5kSW5zdGFsbGF0aW9uOiBbXCJQVVQgL2FwcC9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9L3N1c3BlbmRlZFwiXSxcbiAgICB1bnN1c3BlbmRJbnN0YWxsYXRpb246IFtcbiAgICAgIFwiREVMRVRFIC9hcHAvaW5zdGFsbGF0aW9ucy97aW5zdGFsbGF0aW9uX2lkfS9zdXNwZW5kZWRcIlxuICAgIF0sXG4gICAgdXBkYXRlV2ViaG9va0NvbmZpZ0ZvckFwcDogW1wiUEFUQ0ggL2FwcC9ob29rL2NvbmZpZ1wiXVxuICB9LFxuICBiaWxsaW5nOiB7XG4gICAgZ2V0R2l0aHViQWN0aW9uc0JpbGxpbmdPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9zZXR0aW5ncy9iaWxsaW5nL2FjdGlvbnNcIl0sXG4gICAgZ2V0R2l0aHViQWN0aW9uc0JpbGxpbmdVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9zZXR0aW5ncy9iaWxsaW5nL2FjdGlvbnNcIlxuICAgIF0sXG4gICAgZ2V0R2l0aHViUGFja2FnZXNCaWxsaW5nT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vc2V0dGluZ3MvYmlsbGluZy9wYWNrYWdlc1wiXSxcbiAgICBnZXRHaXRodWJQYWNrYWdlc0JpbGxpbmdVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9zZXR0aW5ncy9iaWxsaW5nL3BhY2thZ2VzXCJcbiAgICBdLFxuICAgIGdldFNoYXJlZFN0b3JhZ2VCaWxsaW5nT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9zZXR0aW5ncy9iaWxsaW5nL3NoYXJlZC1zdG9yYWdlXCJcbiAgICBdLFxuICAgIGdldFNoYXJlZFN0b3JhZ2VCaWxsaW5nVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vc2V0dGluZ3MvYmlsbGluZy9zaGFyZWQtc3RvcmFnZVwiXG4gICAgXVxuICB9LFxuICBjaGVja3M6IHtcbiAgICBjcmVhdGU6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NoZWNrLXJ1bnNcIl0sXG4gICAgY3JlYXRlU3VpdGU6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NoZWNrLXN1aXRlc1wiXSxcbiAgICBnZXQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stcnVucy97Y2hlY2tfcnVuX2lkfVwiXSxcbiAgICBnZXRTdWl0ZTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jaGVjay1zdWl0ZXMve2NoZWNrX3N1aXRlX2lkfVwiXSxcbiAgICBsaXN0QW5ub3RhdGlvbnM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jaGVjay1ydW5zL3tjaGVja19ydW5faWR9L2Fubm90YXRpb25zXCJcbiAgICBdLFxuICAgIGxpc3RGb3JSZWY6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97cmVmfS9jaGVjay1ydW5zXCJdLFxuICAgIGxpc3RGb3JTdWl0ZTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NoZWNrLXN1aXRlcy97Y2hlY2tfc3VpdGVfaWR9L2NoZWNrLXJ1bnNcIlxuICAgIF0sXG4gICAgbGlzdFN1aXRlc0ZvclJlZjogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tyZWZ9L2NoZWNrLXN1aXRlc1wiXSxcbiAgICByZXJlcXVlc3RSdW46IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stcnVucy97Y2hlY2tfcnVuX2lkfS9yZXJlcXVlc3RcIlxuICAgIF0sXG4gICAgcmVyZXF1ZXN0U3VpdGU6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stc3VpdGVzL3tjaGVja19zdWl0ZV9pZH0vcmVyZXF1ZXN0XCJcbiAgICBdLFxuICAgIHNldFN1aXRlc1ByZWZlcmVuY2VzOiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jaGVjay1zdWl0ZXMvcHJlZmVyZW5jZXNcIlxuICAgIF0sXG4gICAgdXBkYXRlOiBbXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stcnVucy97Y2hlY2tfcnVuX2lkfVwiXVxuICB9LFxuICBjb2RlU2Nhbm5pbmc6IHtcbiAgICBkZWxldGVBbmFseXNpczogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvYW5hbHlzZXMve2FuYWx5c2lzX2lkfXs/Y29uZmlybV9kZWxldGV9XCJcbiAgICBdLFxuICAgIGdldEFsZXJ0OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbGVydHMve2FsZXJ0X251bWJlcn1cIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkUGFyYW1ldGVyczogeyBhbGVydF9pZDogXCJhbGVydF9udW1iZXJcIiB9IH1cbiAgICBdLFxuICAgIGdldEFuYWx5c2lzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbmFseXNlcy97YW5hbHlzaXNfaWR9XCJcbiAgICBdLFxuICAgIGdldENvZGVxbERhdGFiYXNlOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9jb2RlcWwvZGF0YWJhc2VzL3tsYW5ndWFnZX1cIlxuICAgIF0sXG4gICAgZ2V0RGVmYXVsdFNldHVwOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvZGVmYXVsdC1zZXR1cFwiXSxcbiAgICBnZXRTYXJpZjogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL3Nhcmlmcy97c2FyaWZfaWR9XCJdLFxuICAgIGxpc3RBbGVydEluc3RhbmNlczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9L2luc3RhbmNlc1wiXG4gICAgXSxcbiAgICBsaXN0QWxlcnRzRm9yT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vY29kZS1zY2FubmluZy9hbGVydHNcIl0sXG4gICAgbGlzdEFsZXJ0c0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbGVydHNcIl0sXG4gICAgbGlzdEFsZXJ0c0luc3RhbmNlczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9L2luc3RhbmNlc1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcImNvZGVTY2FubmluZ1wiLCBcImxpc3RBbGVydEluc3RhbmNlc1wiXSB9XG4gICAgXSxcbiAgICBsaXN0Q29kZXFsRGF0YWJhc2VzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9jb2RlcWwvZGF0YWJhc2VzXCJcbiAgICBdLFxuICAgIGxpc3RSZWNlbnRBbmFseXNlczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL2FuYWx5c2VzXCJdLFxuICAgIHVwZGF0ZUFsZXJ0OiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL2FsZXJ0cy97YWxlcnRfbnVtYmVyfVwiXG4gICAgXSxcbiAgICB1cGRhdGVEZWZhdWx0U2V0dXA6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvZGVmYXVsdC1zZXR1cFwiXG4gICAgXSxcbiAgICB1cGxvYWRTYXJpZjogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9zYXJpZnNcIl1cbiAgfSxcbiAgY29kZXNPZkNvbmR1Y3Q6IHtcbiAgICBnZXRBbGxDb2Rlc09mQ29uZHVjdDogW1wiR0VUIC9jb2Rlc19vZl9jb25kdWN0XCJdLFxuICAgIGdldENvbmR1Y3RDb2RlOiBbXCJHRVQgL2NvZGVzX29mX2NvbmR1Y3Qve2tleX1cIl1cbiAgfSxcbiAgY29kZXNwYWNlczoge1xuICAgIGFkZFJlcG9zaXRvcnlGb3JTZWNyZXRGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQVVQgL3VzZXIvY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfVwiXG4gICAgXSxcbiAgICBhZGRTZWxlY3RlZFJlcG9Ub09yZ1NlY3JldDogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfVwiXG4gICAgXSxcbiAgICBjaGVja1Blcm1pc3Npb25zRm9yRGV2Y29udGFpbmVyOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlcy9wZXJtaXNzaW9uc19jaGVja1wiXG4gICAgXSxcbiAgICBjb2Rlc3BhY2VNYWNoaW5lc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9jb2Rlc3BhY2VzL3tjb2Rlc3BhY2VfbmFtZX0vbWFjaGluZXNcIlxuICAgIF0sXG4gICAgY3JlYXRlRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBPU1QgL3VzZXIvY29kZXNwYWNlc1wiXSxcbiAgICBjcmVhdGVPclVwZGF0ZU9yZ1NlY3JldDogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgY3JlYXRlT3JVcGRhdGVSZXBvU2VjcmV0OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgY3JlYXRlT3JVcGRhdGVTZWNyZXRGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQVVQgL3VzZXIvY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgY3JlYXRlV2l0aFByRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9jb2Rlc3BhY2VzXCJcbiAgICBdLFxuICAgIGNyZWF0ZVdpdGhSZXBvRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlc1wiXG4gICAgXSxcbiAgICBkZWxldGVGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiREVMRVRFIC91c2VyL2NvZGVzcGFjZXMve2NvZGVzcGFjZV9uYW1lfVwiXSxcbiAgICBkZWxldGVGcm9tT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9tZW1iZXJzL3t1c2VybmFtZX0vY29kZXNwYWNlcy97Y29kZXNwYWNlX25hbWV9XCJcbiAgICBdLFxuICAgIGRlbGV0ZU9yZ1NlY3JldDogW1wiREVMRVRFIC9vcmdzL3tvcmd9L2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJdLFxuICAgIGRlbGV0ZVJlcG9TZWNyZXQ6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBkZWxldGVTZWNyZXRGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgZXhwb3J0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiUE9TVCAvdXNlci9jb2Rlc3BhY2VzL3tjb2Rlc3BhY2VfbmFtZX0vZXhwb3J0c1wiXG4gICAgXSxcbiAgICBnZXRDb2Rlc3BhY2VzRm9yVXNlckluT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9tZW1iZXJzL3t1c2VybmFtZX0vY29kZXNwYWNlc1wiXG4gICAgXSxcbiAgICBnZXRFeHBvcnREZXRhaWxzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL2NvZGVzcGFjZXMve2NvZGVzcGFjZV9uYW1lfS9leHBvcnRzL3tleHBvcnRfaWR9XCJcbiAgICBdLFxuICAgIGdldEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvY29kZXNwYWNlcy97Y29kZXNwYWNlX25hbWV9XCJdLFxuICAgIGdldE9yZ1B1YmxpY0tleTogW1wiR0VUIC9vcmdzL3tvcmd9L2NvZGVzcGFjZXMvc2VjcmV0cy9wdWJsaWMta2V5XCJdLFxuICAgIGdldE9yZ1NlY3JldDogW1wiR0VUIC9vcmdzL3tvcmd9L2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJdLFxuICAgIGdldFB1YmxpY0tleUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9jb2Rlc3BhY2VzL3NlY3JldHMvcHVibGljLWtleVwiXG4gICAgXSxcbiAgICBnZXRSZXBvUHVibGljS2V5OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlcy9zZWNyZXRzL3B1YmxpYy1rZXlcIlxuICAgIF0sXG4gICAgZ2V0UmVwb1NlY3JldDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGdldFNlY3JldEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBsaXN0RGV2Y29udGFpbmVyc0luUmVwb3NpdG9yeUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlcy9kZXZjb250YWluZXJzXCJcbiAgICBdLFxuICAgIGxpc3RGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL2NvZGVzcGFjZXNcIl0sXG4gICAgbGlzdEluT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9jb2Rlc3BhY2VzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZFBhcmFtZXRlcnM6IHsgb3JnX2lkOiBcIm9yZ1wiIH0gfVxuICAgIF0sXG4gICAgbGlzdEluUmVwb3NpdG9yeUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlc1wiXG4gICAgXSxcbiAgICBsaXN0T3JnU2VjcmV0czogW1wiR0VUIC9vcmdzL3tvcmd9L2NvZGVzcGFjZXMvc2VjcmV0c1wiXSxcbiAgICBsaXN0UmVwb1NlY3JldHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlcy9zZWNyZXRzXCJdLFxuICAgIGxpc3RSZXBvc2l0b3JpZXNGb3JTZWNyZXRGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXIvY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIGxpc3RTZWNyZXRzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9jb2Rlc3BhY2VzL3NlY3JldHNcIl0sXG4gICAgbGlzdFNlbGVjdGVkUmVwb3NGb3JPcmdTZWNyZXQ6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBwcmVGbGlnaHRXaXRoUmVwb0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlcy9uZXdcIlxuICAgIF0sXG4gICAgcHVibGlzaEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBPU1QgL3VzZXIvY29kZXNwYWNlcy97Y29kZXNwYWNlX25hbWV9L3B1Ymxpc2hcIlxuICAgIF0sXG4gICAgcmVtb3ZlUmVwb3NpdG9yeUZvclNlY3JldEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkRFTEVURSAvdXNlci9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIHJlbW92ZVNlbGVjdGVkUmVwb0Zyb21PcmdTZWNyZXQ6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgcmVwb01hY2hpbmVzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlc3BhY2VzL21hY2hpbmVzXCJcbiAgICBdLFxuICAgIHNldFJlcG9zaXRvcmllc0ZvclNlY3JldEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBVVCAvdXNlci9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgc2V0U2VsZWN0ZWRSZXBvc0Zvck9yZ1NlY3JldDogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIHN0YXJ0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBPU1QgL3VzZXIvY29kZXNwYWNlcy97Y29kZXNwYWNlX25hbWV9L3N0YXJ0XCJdLFxuICAgIHN0b3BGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUE9TVCAvdXNlci9jb2Rlc3BhY2VzL3tjb2Rlc3BhY2VfbmFtZX0vc3RvcFwiXSxcbiAgICBzdG9wSW5Pcmdhbml6YXRpb246IFtcbiAgICAgIFwiUE9TVCAvb3Jncy97b3JnfS9tZW1iZXJzL3t1c2VybmFtZX0vY29kZXNwYWNlcy97Y29kZXNwYWNlX25hbWV9L3N0b3BcIlxuICAgIF0sXG4gICAgdXBkYXRlRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBBVENIIC91c2VyL2NvZGVzcGFjZXMve2NvZGVzcGFjZV9uYW1lfVwiXVxuICB9LFxuICBjb3BpbG90OiB7XG4gICAgYWRkQ29waWxvdFNlYXRzRm9yVGVhbXM6IFtcbiAgICAgIFwiUE9TVCAvb3Jncy97b3JnfS9jb3BpbG90L2JpbGxpbmcvc2VsZWN0ZWRfdGVhbXNcIlxuICAgIF0sXG4gICAgYWRkQ29waWxvdFNlYXRzRm9yVXNlcnM6IFtcbiAgICAgIFwiUE9TVCAvb3Jncy97b3JnfS9jb3BpbG90L2JpbGxpbmcvc2VsZWN0ZWRfdXNlcnNcIlxuICAgIF0sXG4gICAgY2FuY2VsQ29waWxvdFNlYXRBc3NpZ25tZW50Rm9yVGVhbXM6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2NvcGlsb3QvYmlsbGluZy9zZWxlY3RlZF90ZWFtc1wiXG4gICAgXSxcbiAgICBjYW5jZWxDb3BpbG90U2VhdEFzc2lnbm1lbnRGb3JVc2VyczogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vY29waWxvdC9iaWxsaW5nL3NlbGVjdGVkX3VzZXJzXCJcbiAgICBdLFxuICAgIGdldENvcGlsb3RPcmdhbml6YXRpb25EZXRhaWxzOiBbXCJHRVQgL29yZ3Mve29yZ30vY29waWxvdC9iaWxsaW5nXCJdLFxuICAgIGdldENvcGlsb3RTZWF0RGV0YWlsc0ZvclVzZXI6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L21lbWJlcnMve3VzZXJuYW1lfS9jb3BpbG90XCJcbiAgICBdLFxuICAgIGxpc3RDb3BpbG90U2VhdHM6IFtcIkdFVCAvb3Jncy97b3JnfS9jb3BpbG90L2JpbGxpbmcvc2VhdHNcIl1cbiAgfSxcbiAgZGVwZW5kYWJvdDoge1xuICAgIGFkZFNlbGVjdGVkUmVwb1RvT3JnU2VjcmV0OiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9kZXBlbmRhYm90L3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIGNyZWF0ZU9yVXBkYXRlT3JnU2VjcmV0OiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9kZXBlbmRhYm90L3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBjcmVhdGVPclVwZGF0ZVJlcG9TZWNyZXQ6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRhYm90L3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBkZWxldGVPcmdTZWNyZXQ6IFtcIkRFTEVURSAvb3Jncy97b3JnfS9kZXBlbmRhYm90L3NlY3JldHMve3NlY3JldF9uYW1lfVwiXSxcbiAgICBkZWxldGVSZXBvU2VjcmV0OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwZW5kYWJvdC9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgZ2V0QWxlcnQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwZW5kYWJvdC9hbGVydHMve2FsZXJ0X251bWJlcn1cIl0sXG4gICAgZ2V0T3JnUHVibGljS2V5OiBbXCJHRVQgL29yZ3Mve29yZ30vZGVwZW5kYWJvdC9zZWNyZXRzL3B1YmxpYy1rZXlcIl0sXG4gICAgZ2V0T3JnU2VjcmV0OiBbXCJHRVQgL29yZ3Mve29yZ30vZGVwZW5kYWJvdC9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIl0sXG4gICAgZ2V0UmVwb1B1YmxpY0tleTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGVuZGFib3Qvc2VjcmV0cy9wdWJsaWMta2V5XCJcbiAgICBdLFxuICAgIGdldFJlcG9TZWNyZXQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRhYm90L3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBsaXN0QWxlcnRzRm9yRW50ZXJwcmlzZTogW1xuICAgICAgXCJHRVQgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS9kZXBlbmRhYm90L2FsZXJ0c1wiXG4gICAgXSxcbiAgICBsaXN0QWxlcnRzRm9yT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vZGVwZW5kYWJvdC9hbGVydHNcIl0sXG4gICAgbGlzdEFsZXJ0c0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwZW5kYWJvdC9hbGVydHNcIl0sXG4gICAgbGlzdE9yZ1NlY3JldHM6IFtcIkdFVCAvb3Jncy97b3JnfS9kZXBlbmRhYm90L3NlY3JldHNcIl0sXG4gICAgbGlzdFJlcG9TZWNyZXRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGVuZGFib3Qvc2VjcmV0c1wiXSxcbiAgICBsaXN0U2VsZWN0ZWRSZXBvc0Zvck9yZ1NlY3JldDogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vZGVwZW5kYWJvdC9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIHJlbW92ZVNlbGVjdGVkUmVwb0Zyb21PcmdTZWNyZXQ6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2RlcGVuZGFib3Qvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgc2V0U2VsZWN0ZWRSZXBvc0Zvck9yZ1NlY3JldDogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vZGVwZW5kYWJvdC9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIHVwZGF0ZUFsZXJ0OiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRhYm90L2FsZXJ0cy97YWxlcnRfbnVtYmVyfVwiXG4gICAgXVxuICB9LFxuICBkZXBlbmRlbmN5R3JhcGg6IHtcbiAgICBjcmVhdGVSZXBvc2l0b3J5U25hcHNob3Q6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwZW5kZW5jeS1ncmFwaC9zbmFwc2hvdHNcIlxuICAgIF0sXG4gICAgZGlmZlJhbmdlOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwZW5kZW5jeS1ncmFwaC9jb21wYXJlL3tiYXNlaGVhZH1cIlxuICAgIF0sXG4gICAgZXhwb3J0U2JvbTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRlbmN5LWdyYXBoL3Nib21cIl1cbiAgfSxcbiAgZW1vamlzOiB7IGdldDogW1wiR0VUIC9lbW9qaXNcIl0gfSxcbiAgZ2lzdHM6IHtcbiAgICBjaGVja0lzU3RhcnJlZDogW1wiR0VUIC9naXN0cy97Z2lzdF9pZH0vc3RhclwiXSxcbiAgICBjcmVhdGU6IFtcIlBPU1QgL2dpc3RzXCJdLFxuICAgIGNyZWF0ZUNvbW1lbnQ6IFtcIlBPU1QgL2dpc3RzL3tnaXN0X2lkfS9jb21tZW50c1wiXSxcbiAgICBkZWxldGU6IFtcIkRFTEVURSAvZ2lzdHMve2dpc3RfaWR9XCJdLFxuICAgIGRlbGV0ZUNvbW1lbnQ6IFtcIkRFTEVURSAvZ2lzdHMve2dpc3RfaWR9L2NvbW1lbnRzL3tjb21tZW50X2lkfVwiXSxcbiAgICBmb3JrOiBbXCJQT1NUIC9naXN0cy97Z2lzdF9pZH0vZm9ya3NcIl0sXG4gICAgZ2V0OiBbXCJHRVQgL2dpc3RzL3tnaXN0X2lkfVwiXSxcbiAgICBnZXRDb21tZW50OiBbXCJHRVQgL2dpc3RzL3tnaXN0X2lkfS9jb21tZW50cy97Y29tbWVudF9pZH1cIl0sXG4gICAgZ2V0UmV2aXNpb246IFtcIkdFVCAvZ2lzdHMve2dpc3RfaWR9L3tzaGF9XCJdLFxuICAgIGxpc3Q6IFtcIkdFVCAvZ2lzdHNcIl0sXG4gICAgbGlzdENvbW1lbnRzOiBbXCJHRVQgL2dpc3RzL3tnaXN0X2lkfS9jb21tZW50c1wiXSxcbiAgICBsaXN0Q29tbWl0czogW1wiR0VUIC9naXN0cy97Z2lzdF9pZH0vY29tbWl0c1wiXSxcbiAgICBsaXN0Rm9yVXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L2dpc3RzXCJdLFxuICAgIGxpc3RGb3JrczogW1wiR0VUIC9naXN0cy97Z2lzdF9pZH0vZm9ya3NcIl0sXG4gICAgbGlzdFB1YmxpYzogW1wiR0VUIC9naXN0cy9wdWJsaWNcIl0sXG4gICAgbGlzdFN0YXJyZWQ6IFtcIkdFVCAvZ2lzdHMvc3RhcnJlZFwiXSxcbiAgICBzdGFyOiBbXCJQVVQgL2dpc3RzL3tnaXN0X2lkfS9zdGFyXCJdLFxuICAgIHVuc3RhcjogW1wiREVMRVRFIC9naXN0cy97Z2lzdF9pZH0vc3RhclwiXSxcbiAgICB1cGRhdGU6IFtcIlBBVENIIC9naXN0cy97Z2lzdF9pZH1cIl0sXG4gICAgdXBkYXRlQ29tbWVudDogW1wiUEFUQ0ggL2dpc3RzL3tnaXN0X2lkfS9jb21tZW50cy97Y29tbWVudF9pZH1cIl1cbiAgfSxcbiAgZ2l0OiB7XG4gICAgY3JlYXRlQmxvYjogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZ2l0L2Jsb2JzXCJdLFxuICAgIGNyZWF0ZUNvbW1pdDogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZ2l0L2NvbW1pdHNcIl0sXG4gICAgY3JlYXRlUmVmOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvcmVmc1wiXSxcbiAgICBjcmVhdGVUYWc6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2dpdC90YWdzXCJdLFxuICAgIGNyZWF0ZVRyZWU6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2dpdC90cmVlc1wiXSxcbiAgICBkZWxldGVSZWY6IFtcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vZ2l0L3JlZnMve3JlZn1cIl0sXG4gICAgZ2V0QmxvYjogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvYmxvYnMve2ZpbGVfc2hhfVwiXSxcbiAgICBnZXRDb21taXQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZ2l0L2NvbW1pdHMve2NvbW1pdF9zaGF9XCJdLFxuICAgIGdldFJlZjogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvcmVmL3tyZWZ9XCJdLFxuICAgIGdldFRhZzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvdGFncy97dGFnX3NoYX1cIl0sXG4gICAgZ2V0VHJlZTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvdHJlZXMve3RyZWVfc2hhfVwiXSxcbiAgICBsaXN0TWF0Y2hpbmdSZWZzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2dpdC9tYXRjaGluZy1yZWZzL3tyZWZ9XCJdLFxuICAgIHVwZGF0ZVJlZjogW1wiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2dpdC9yZWZzL3tyZWZ9XCJdXG4gIH0sXG4gIGdpdGlnbm9yZToge1xuICAgIGdldEFsbFRlbXBsYXRlczogW1wiR0VUIC9naXRpZ25vcmUvdGVtcGxhdGVzXCJdLFxuICAgIGdldFRlbXBsYXRlOiBbXCJHRVQgL2dpdGlnbm9yZS90ZW1wbGF0ZXMve25hbWV9XCJdXG4gIH0sXG4gIGludGVyYWN0aW9uczoge1xuICAgIGdldFJlc3RyaWN0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvaW50ZXJhY3Rpb24tbGltaXRzXCJdLFxuICAgIGdldFJlc3RyaWN0aW9uc0Zvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L2ludGVyYWN0aW9uLWxpbWl0c1wiXSxcbiAgICBnZXRSZXN0cmljdGlvbnNGb3JSZXBvOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2ludGVyYWN0aW9uLWxpbWl0c1wiXSxcbiAgICBnZXRSZXN0cmljdGlvbnNGb3JZb3VyUHVibGljUmVwb3M6IFtcbiAgICAgIFwiR0VUIC91c2VyL2ludGVyYWN0aW9uLWxpbWl0c1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcImludGVyYWN0aW9uc1wiLCBcImdldFJlc3RyaWN0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIHJlbW92ZVJlc3RyaWN0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJERUxFVEUgL3VzZXIvaW50ZXJhY3Rpb24tbGltaXRzXCJdLFxuICAgIHJlbW92ZVJlc3RyaWN0aW9uc0Zvck9yZzogW1wiREVMRVRFIC9vcmdzL3tvcmd9L2ludGVyYWN0aW9uLWxpbWl0c1wiXSxcbiAgICByZW1vdmVSZXN0cmljdGlvbnNGb3JSZXBvOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vaW50ZXJhY3Rpb24tbGltaXRzXCJcbiAgICBdLFxuICAgIHJlbW92ZVJlc3RyaWN0aW9uc0ZvcllvdXJQdWJsaWNSZXBvczogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvaW50ZXJhY3Rpb24tbGltaXRzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wiaW50ZXJhY3Rpb25zXCIsIFwicmVtb3ZlUmVzdHJpY3Rpb25zRm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgc2V0UmVzdHJpY3Rpb25zRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBVVCAvdXNlci9pbnRlcmFjdGlvbi1saW1pdHNcIl0sXG4gICAgc2V0UmVzdHJpY3Rpb25zRm9yT3JnOiBbXCJQVVQgL29yZ3Mve29yZ30vaW50ZXJhY3Rpb24tbGltaXRzXCJdLFxuICAgIHNldFJlc3RyaWN0aW9uc0ZvclJlcG86IFtcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vaW50ZXJhY3Rpb24tbGltaXRzXCJdLFxuICAgIHNldFJlc3RyaWN0aW9uc0ZvcllvdXJQdWJsaWNSZXBvczogW1xuICAgICAgXCJQVVQgL3VzZXIvaW50ZXJhY3Rpb24tbGltaXRzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wiaW50ZXJhY3Rpb25zXCIsIFwic2V0UmVzdHJpY3Rpb25zRm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF1cbiAgfSxcbiAgaXNzdWVzOiB7XG4gICAgYWRkQXNzaWduZWVzOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9hc3NpZ25lZXNcIlxuICAgIF0sXG4gICAgYWRkTGFiZWxzOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vbGFiZWxzXCJdLFxuICAgIGNoZWNrVXNlckNhbkJlQXNzaWduZWQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYXNzaWduZWVzL3thc3NpZ25lZX1cIl0sXG4gICAgY2hlY2tVc2VyQ2FuQmVBc3NpZ25lZFRvSXNzdWU6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vYXNzaWduZWVzL3thc3NpZ25lZX1cIlxuICAgIF0sXG4gICAgY3JlYXRlOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXNcIl0sXG4gICAgY3JlYXRlQ29tbWVudDogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vY29tbWVudHNcIlxuICAgIF0sXG4gICAgY3JlYXRlTGFiZWw6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2xhYmVsc1wiXSxcbiAgICBjcmVhdGVNaWxlc3RvbmU6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L21pbGVzdG9uZXNcIl0sXG4gICAgZGVsZXRlQ29tbWVudDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy9jb21tZW50cy97Y29tbWVudF9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlTGFiZWw6IFtcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vbGFiZWxzL3tuYW1lfVwiXSxcbiAgICBkZWxldGVNaWxlc3RvbmU6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9taWxlc3RvbmVzL3ttaWxlc3RvbmVfbnVtYmVyfVwiXG4gICAgXSxcbiAgICBnZXQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9XCJdLFxuICAgIGdldENvbW1lbnQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL2NvbW1lbnRzL3tjb21tZW50X2lkfVwiXSxcbiAgICBnZXRFdmVudDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvZXZlbnRzL3tldmVudF9pZH1cIl0sXG4gICAgZ2V0TGFiZWw6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vbGFiZWxzL3tuYW1lfVwiXSxcbiAgICBnZXRNaWxlc3RvbmU6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vbWlsZXN0b25lcy97bWlsZXN0b25lX251bWJlcn1cIl0sXG4gICAgbGlzdDogW1wiR0VUIC9pc3N1ZXNcIl0sXG4gICAgbGlzdEFzc2lnbmVlczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hc3NpZ25lZXNcIl0sXG4gICAgbGlzdENvbW1lbnRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9jb21tZW50c1wiXSxcbiAgICBsaXN0Q29tbWVudHNGb3JSZXBvOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy9jb21tZW50c1wiXSxcbiAgICBsaXN0RXZlbnRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9ldmVudHNcIl0sXG4gICAgbGlzdEV2ZW50c0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL2V2ZW50c1wiXSxcbiAgICBsaXN0RXZlbnRzRm9yVGltZWxpbmU6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vdGltZWxpbmVcIlxuICAgIF0sXG4gICAgbGlzdEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvaXNzdWVzXCJdLFxuICAgIGxpc3RGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9pc3N1ZXNcIl0sXG4gICAgbGlzdEZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzXCJdLFxuICAgIGxpc3RMYWJlbHNGb3JNaWxlc3RvbmU6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9taWxlc3RvbmVzL3ttaWxlc3RvbmVfbnVtYmVyfS9sYWJlbHNcIlxuICAgIF0sXG4gICAgbGlzdExhYmVsc0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vbGFiZWxzXCJdLFxuICAgIGxpc3RMYWJlbHNPbklzc3VlOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2xhYmVsc1wiXG4gICAgXSxcbiAgICBsaXN0TWlsZXN0b25lczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9taWxlc3RvbmVzXCJdLFxuICAgIGxvY2s6IFtcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2xvY2tcIl0sXG4gICAgcmVtb3ZlQWxsTGFiZWxzOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2xhYmVsc1wiXG4gICAgXSxcbiAgICByZW1vdmVBc3NpZ25lZXM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vYXNzaWduZWVzXCJcbiAgICBdLFxuICAgIHJlbW92ZUxhYmVsOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2xhYmVscy97bmFtZX1cIlxuICAgIF0sXG4gICAgc2V0TGFiZWxzOiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9sYWJlbHNcIl0sXG4gICAgdW5sb2NrOiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9sb2NrXCJdLFxuICAgIHVwZGF0ZTogW1wiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfVwiXSxcbiAgICB1cGRhdGVDb21tZW50OiBbXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL2NvbW1lbnRzL3tjb21tZW50X2lkfVwiXSxcbiAgICB1cGRhdGVMYWJlbDogW1wiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2xhYmVscy97bmFtZX1cIl0sXG4gICAgdXBkYXRlTWlsZXN0b25lOiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9taWxlc3RvbmVzL3ttaWxlc3RvbmVfbnVtYmVyfVwiXG4gICAgXVxuICB9LFxuICBsaWNlbnNlczoge1xuICAgIGdldDogW1wiR0VUIC9saWNlbnNlcy97bGljZW5zZX1cIl0sXG4gICAgZ2V0QWxsQ29tbW9ubHlVc2VkOiBbXCJHRVQgL2xpY2Vuc2VzXCJdLFxuICAgIGdldEZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vbGljZW5zZVwiXVxuICB9LFxuICBtYXJrZG93bjoge1xuICAgIHJlbmRlcjogW1wiUE9TVCAvbWFya2Rvd25cIl0sXG4gICAgcmVuZGVyUmF3OiBbXG4gICAgICBcIlBPU1QgL21hcmtkb3duL3Jhd1wiLFxuICAgICAgeyBoZWFkZXJzOiB7IFwiY29udGVudC10eXBlXCI6IFwidGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOFwiIH0gfVxuICAgIF1cbiAgfSxcbiAgbWV0YToge1xuICAgIGdldDogW1wiR0VUIC9tZXRhXCJdLFxuICAgIGdldEFsbFZlcnNpb25zOiBbXCJHRVQgL3ZlcnNpb25zXCJdLFxuICAgIGdldE9jdG9jYXQ6IFtcIkdFVCAvb2N0b2NhdFwiXSxcbiAgICBnZXRaZW46IFtcIkdFVCAvemVuXCJdLFxuICAgIHJvb3Q6IFtcIkdFVCAvXCJdXG4gIH0sXG4gIG1pZ3JhdGlvbnM6IHtcbiAgICBjYW5jZWxJbXBvcnQ6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbXBvcnRcIixcbiAgICAgIHt9LFxuICAgICAge1xuICAgICAgICBkZXByZWNhdGVkOiBcIm9jdG9raXQucmVzdC5taWdyYXRpb25zLmNhbmNlbEltcG9ydCgpIGlzIGRlcHJlY2F0ZWQsIHNlZSBodHRwczovL2RvY3MuZ2l0aHViLmNvbS9yZXN0L21pZ3JhdGlvbnMvc291cmNlLWltcG9ydHMjY2FuY2VsLWFuLWltcG9ydFwiXG4gICAgICB9XG4gICAgXSxcbiAgICBkZWxldGVBcmNoaXZlRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL21pZ3JhdGlvbnMve21pZ3JhdGlvbl9pZH0vYXJjaGl2ZVwiXG4gICAgXSxcbiAgICBkZWxldGVBcmNoaXZlRm9yT3JnOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L2FyY2hpdmVcIlxuICAgIF0sXG4gICAgZG93bmxvYWRBcmNoaXZlRm9yT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L2FyY2hpdmVcIlxuICAgIF0sXG4gICAgZ2V0QXJjaGl2ZUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L2FyY2hpdmVcIlxuICAgIF0sXG4gICAgZ2V0Q29tbWl0QXV0aG9yczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2ltcG9ydC9hdXRob3JzXCIsXG4gICAgICB7fSxcbiAgICAgIHtcbiAgICAgICAgZGVwcmVjYXRlZDogXCJvY3Rva2l0LnJlc3QubWlncmF0aW9ucy5nZXRDb21taXRBdXRob3JzKCkgaXMgZGVwcmVjYXRlZCwgc2VlIGh0dHBzOi8vZG9jcy5naXRodWIuY29tL3Jlc3QvbWlncmF0aW9ucy9zb3VyY2UtaW1wb3J0cyNnZXQtY29tbWl0LWF1dGhvcnNcIlxuICAgICAgfVxuICAgIF0sXG4gICAgZ2V0SW1wb3J0U3RhdHVzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaW1wb3J0XCIsXG4gICAgICB7fSxcbiAgICAgIHtcbiAgICAgICAgZGVwcmVjYXRlZDogXCJvY3Rva2l0LnJlc3QubWlncmF0aW9ucy5nZXRJbXBvcnRTdGF0dXMoKSBpcyBkZXByZWNhdGVkLCBzZWUgaHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vcmVzdC9taWdyYXRpb25zL3NvdXJjZS1pbXBvcnRzI2dldC1hbi1pbXBvcnQtc3RhdHVzXCJcbiAgICAgIH1cbiAgICBdLFxuICAgIGdldExhcmdlRmlsZXM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbXBvcnQvbGFyZ2VfZmlsZXNcIixcbiAgICAgIHt9LFxuICAgICAge1xuICAgICAgICBkZXByZWNhdGVkOiBcIm9jdG9raXQucmVzdC5taWdyYXRpb25zLmdldExhcmdlRmlsZXMoKSBpcyBkZXByZWNhdGVkLCBzZWUgaHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vcmVzdC9taWdyYXRpb25zL3NvdXJjZS1pbXBvcnRzI2dldC1sYXJnZS1maWxlc1wiXG4gICAgICB9XG4gICAgXSxcbiAgICBnZXRTdGF0dXNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL21pZ3JhdGlvbnMve21pZ3JhdGlvbl9pZH1cIl0sXG4gICAgZ2V0U3RhdHVzRm9yT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vbWlncmF0aW9ucy97bWlncmF0aW9uX2lkfVwiXSxcbiAgICBsaXN0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9taWdyYXRpb25zXCJdLFxuICAgIGxpc3RGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9taWdyYXRpb25zXCJdLFxuICAgIGxpc3RSZXBvc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBsaXN0UmVwb3NGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L3JlcG9zaXRvcmllc1wiXSxcbiAgICBsaXN0UmVwb3NGb3JVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L3JlcG9zaXRvcmllc1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcIm1pZ3JhdGlvbnNcIiwgXCJsaXN0UmVwb3NGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBtYXBDb21taXRBdXRob3I6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2ltcG9ydC9hdXRob3JzL3thdXRob3JfaWR9XCIsXG4gICAgICB7fSxcbiAgICAgIHtcbiAgICAgICAgZGVwcmVjYXRlZDogXCJvY3Rva2l0LnJlc3QubWlncmF0aW9ucy5tYXBDb21taXRBdXRob3IoKSBpcyBkZXByZWNhdGVkLCBzZWUgaHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vcmVzdC9taWdyYXRpb25zL3NvdXJjZS1pbXBvcnRzI21hcC1hLWNvbW1pdC1hdXRob3JcIlxuICAgICAgfVxuICAgIF0sXG4gICAgc2V0TGZzUHJlZmVyZW5jZTogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vaW1wb3J0L2xmc1wiLFxuICAgICAge30sXG4gICAgICB7XG4gICAgICAgIGRlcHJlY2F0ZWQ6IFwib2N0b2tpdC5yZXN0Lm1pZ3JhdGlvbnMuc2V0TGZzUHJlZmVyZW5jZSgpIGlzIGRlcHJlY2F0ZWQsIHNlZSBodHRwczovL2RvY3MuZ2l0aHViLmNvbS9yZXN0L21pZ3JhdGlvbnMvc291cmNlLWltcG9ydHMjdXBkYXRlLWdpdC1sZnMtcHJlZmVyZW5jZVwiXG4gICAgICB9XG4gICAgXSxcbiAgICBzdGFydEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJQT1NUIC91c2VyL21pZ3JhdGlvbnNcIl0sXG4gICAgc3RhcnRGb3JPcmc6IFtcIlBPU1QgL29yZ3Mve29yZ30vbWlncmF0aW9uc1wiXSxcbiAgICBzdGFydEltcG9ydDogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2ltcG9ydFwiLFxuICAgICAge30sXG4gICAgICB7XG4gICAgICAgIGRlcHJlY2F0ZWQ6IFwib2N0b2tpdC5yZXN0Lm1pZ3JhdGlvbnMuc3RhcnRJbXBvcnQoKSBpcyBkZXByZWNhdGVkLCBzZWUgaHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vcmVzdC9taWdyYXRpb25zL3NvdXJjZS1pbXBvcnRzI3N0YXJ0LWFuLWltcG9ydFwiXG4gICAgICB9XG4gICAgXSxcbiAgICB1bmxvY2tSZXBvRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL21pZ3JhdGlvbnMve21pZ3JhdGlvbl9pZH0vcmVwb3Mve3JlcG9fbmFtZX0vbG9ja1wiXG4gICAgXSxcbiAgICB1bmxvY2tSZXBvRm9yT3JnOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L3JlcG9zL3tyZXBvX25hbWV9L2xvY2tcIlxuICAgIF0sXG4gICAgdXBkYXRlSW1wb3J0OiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbXBvcnRcIixcbiAgICAgIHt9LFxuICAgICAge1xuICAgICAgICBkZXByZWNhdGVkOiBcIm9jdG9raXQucmVzdC5taWdyYXRpb25zLnVwZGF0ZUltcG9ydCgpIGlzIGRlcHJlY2F0ZWQsIHNlZSBodHRwczovL2RvY3MuZ2l0aHViLmNvbS9yZXN0L21pZ3JhdGlvbnMvc291cmNlLWltcG9ydHMjdXBkYXRlLWFuLWltcG9ydFwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBvaWRjOiB7XG4gICAgZ2V0T2lkY0N1c3RvbVN1YlRlbXBsYXRlRm9yT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL29pZGMvY3VzdG9taXphdGlvbi9zdWJcIlxuICAgIF0sXG4gICAgdXBkYXRlT2lkY0N1c3RvbVN1YlRlbXBsYXRlRm9yT3JnOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9hY3Rpb25zL29pZGMvY3VzdG9taXphdGlvbi9zdWJcIlxuICAgIF1cbiAgfSxcbiAgb3Jnczoge1xuICAgIGFkZFNlY3VyaXR5TWFuYWdlclRlYW06IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L3NlY3VyaXR5LW1hbmFnZXJzL3RlYW1zL3t0ZWFtX3NsdWd9XCJcbiAgICBdLFxuICAgIGFzc2lnblRlYW1Ub09yZ1JvbGU6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlcy90ZWFtcy97dGVhbV9zbHVnfS97cm9sZV9pZH1cIlxuICAgIF0sXG4gICAgYXNzaWduVXNlclRvT3JnUm9sZTogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vb3JnYW5pemF0aW9uLXJvbGVzL3VzZXJzL3t1c2VybmFtZX0ve3JvbGVfaWR9XCJcbiAgICBdLFxuICAgIGJsb2NrVXNlcjogW1wiUFVUIC9vcmdzL3tvcmd9L2Jsb2Nrcy97dXNlcm5hbWV9XCJdLFxuICAgIGNhbmNlbEludml0YXRpb246IFtcIkRFTEVURSAvb3Jncy97b3JnfS9pbnZpdGF0aW9ucy97aW52aXRhdGlvbl9pZH1cIl0sXG4gICAgY2hlY2tCbG9ja2VkVXNlcjogW1wiR0VUIC9vcmdzL3tvcmd9L2Jsb2Nrcy97dXNlcm5hbWV9XCJdLFxuICAgIGNoZWNrTWVtYmVyc2hpcEZvclVzZXI6IFtcIkdFVCAvb3Jncy97b3JnfS9tZW1iZXJzL3t1c2VybmFtZX1cIl0sXG4gICAgY2hlY2tQdWJsaWNNZW1iZXJzaGlwRm9yVXNlcjogW1wiR0VUIC9vcmdzL3tvcmd9L3B1YmxpY19tZW1iZXJzL3t1c2VybmFtZX1cIl0sXG4gICAgY29udmVydE1lbWJlclRvT3V0c2lkZUNvbGxhYm9yYXRvcjogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vb3V0c2lkZV9jb2xsYWJvcmF0b3JzL3t1c2VybmFtZX1cIlxuICAgIF0sXG4gICAgY3JlYXRlQ3VzdG9tT3JnYW5pemF0aW9uUm9sZTogW1wiUE9TVCAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXNcIl0sXG4gICAgY3JlYXRlSW52aXRhdGlvbjogW1wiUE9TVCAvb3Jncy97b3JnfS9pbnZpdGF0aW9uc1wiXSxcbiAgICBjcmVhdGVPclVwZGF0ZUN1c3RvbVByb3BlcnRpZXM6IFtcIlBBVENIIC9vcmdzL3tvcmd9L3Byb3BlcnRpZXMvc2NoZW1hXCJdLFxuICAgIGNyZWF0ZU9yVXBkYXRlQ3VzdG9tUHJvcGVydGllc1ZhbHVlc0ZvclJlcG9zOiBbXG4gICAgICBcIlBBVENIIC9vcmdzL3tvcmd9L3Byb3BlcnRpZXMvdmFsdWVzXCJcbiAgICBdLFxuICAgIGNyZWF0ZU9yVXBkYXRlQ3VzdG9tUHJvcGVydHk6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L3Byb3BlcnRpZXMvc2NoZW1hL3tjdXN0b21fcHJvcGVydHlfbmFtZX1cIlxuICAgIF0sXG4gICAgY3JlYXRlV2ViaG9vazogW1wiUE9TVCAvb3Jncy97b3JnfS9ob29rc1wiXSxcbiAgICBkZWxldGU6IFtcIkRFTEVURSAvb3Jncy97b3JnfVwiXSxcbiAgICBkZWxldGVDdXN0b21Pcmdhbml6YXRpb25Sb2xlOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMve3JvbGVfaWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVdlYmhvb2s6IFtcIkRFTEVURSAvb3Jncy97b3JnfS9ob29rcy97aG9va19pZH1cIl0sXG4gICAgZW5hYmxlT3JEaXNhYmxlU2VjdXJpdHlQcm9kdWN0T25BbGxPcmdSZXBvczogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L3tzZWN1cml0eV9wcm9kdWN0fS97ZW5hYmxlbWVudH1cIlxuICAgIF0sXG4gICAgZ2V0OiBbXCJHRVQgL29yZ3Mve29yZ31cIl0sXG4gICAgZ2V0QWxsQ3VzdG9tUHJvcGVydGllczogW1wiR0VUIC9vcmdzL3tvcmd9L3Byb3BlcnRpZXMvc2NoZW1hXCJdLFxuICAgIGdldEN1c3RvbVByb3BlcnR5OiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9wcm9wZXJ0aWVzL3NjaGVtYS97Y3VzdG9tX3Byb3BlcnR5X25hbWV9XCJcbiAgICBdLFxuICAgIGdldE1lbWJlcnNoaXBGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL21lbWJlcnNoaXBzL29yZ3Mve29yZ31cIl0sXG4gICAgZ2V0TWVtYmVyc2hpcEZvclVzZXI6IFtcIkdFVCAvb3Jncy97b3JnfS9tZW1iZXJzaGlwcy97dXNlcm5hbWV9XCJdLFxuICAgIGdldE9yZ1JvbGU6IFtcIkdFVCAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMve3JvbGVfaWR9XCJdLFxuICAgIGdldFdlYmhvb2s6IFtcIkdFVCAvb3Jncy97b3JnfS9ob29rcy97aG9va19pZH1cIl0sXG4gICAgZ2V0V2ViaG9va0NvbmZpZ0Zvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L2hvb2tzL3tob29rX2lkfS9jb25maWdcIl0sXG4gICAgZ2V0V2ViaG9va0RlbGl2ZXJ5OiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9ob29rcy97aG9va19pZH0vZGVsaXZlcmllcy97ZGVsaXZlcnlfaWR9XCJcbiAgICBdLFxuICAgIGxpc3Q6IFtcIkdFVCAvb3JnYW5pemF0aW9uc1wiXSxcbiAgICBsaXN0QXBwSW5zdGFsbGF0aW9uczogW1wiR0VUIC9vcmdzL3tvcmd9L2luc3RhbGxhdGlvbnNcIl0sXG4gICAgbGlzdEJsb2NrZWRVc2VyczogW1wiR0VUIC9vcmdzL3tvcmd9L2Jsb2Nrc1wiXSxcbiAgICBsaXN0Q3VzdG9tUHJvcGVydGllc1ZhbHVlc0ZvclJlcG9zOiBbXCJHRVQgL29yZ3Mve29yZ30vcHJvcGVydGllcy92YWx1ZXNcIl0sXG4gICAgbGlzdEZhaWxlZEludml0YXRpb25zOiBbXCJHRVQgL29yZ3Mve29yZ30vZmFpbGVkX2ludml0YXRpb25zXCJdLFxuICAgIGxpc3RGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL29yZ3NcIl0sXG4gICAgbGlzdEZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9vcmdzXCJdLFxuICAgIGxpc3RJbnZpdGF0aW9uVGVhbXM6IFtcIkdFVCAvb3Jncy97b3JnfS9pbnZpdGF0aW9ucy97aW52aXRhdGlvbl9pZH0vdGVhbXNcIl0sXG4gICAgbGlzdE1lbWJlcnM6IFtcIkdFVCAvb3Jncy97b3JnfS9tZW1iZXJzXCJdLFxuICAgIGxpc3RNZW1iZXJzaGlwc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvbWVtYmVyc2hpcHMvb3Jnc1wiXSxcbiAgICBsaXN0T3JnUm9sZVRlYW1zOiBbXCJHRVQgL29yZ3Mve29yZ30vb3JnYW5pemF0aW9uLXJvbGVzL3tyb2xlX2lkfS90ZWFtc1wiXSxcbiAgICBsaXN0T3JnUm9sZVVzZXJzOiBbXCJHRVQgL29yZ3Mve29yZ30vb3JnYW5pemF0aW9uLXJvbGVzL3tyb2xlX2lkfS91c2Vyc1wiXSxcbiAgICBsaXN0T3JnUm9sZXM6IFtcIkdFVCAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXNcIl0sXG4gICAgbGlzdE9yZ2FuaXphdGlvbkZpbmVHcmFpbmVkUGVybWlzc2lvbnM6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1maW5lLWdyYWluZWQtcGVybWlzc2lvbnNcIlxuICAgIF0sXG4gICAgbGlzdE91dHNpZGVDb2xsYWJvcmF0b3JzOiBbXCJHRVQgL29yZ3Mve29yZ30vb3V0c2lkZV9jb2xsYWJvcmF0b3JzXCJdLFxuICAgIGxpc3RQYXRHcmFudFJlcG9zaXRvcmllczogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vcGVyc29uYWwtYWNjZXNzLXRva2Vucy97cGF0X2lkfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgbGlzdFBhdEdyYW50UmVxdWVzdFJlcG9zaXRvcmllczogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vcGVyc29uYWwtYWNjZXNzLXRva2VuLXJlcXVlc3RzL3twYXRfcmVxdWVzdF9pZH0vcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIGxpc3RQYXRHcmFudFJlcXVlc3RzOiBbXCJHRVQgL29yZ3Mve29yZ30vcGVyc29uYWwtYWNjZXNzLXRva2VuLXJlcXVlc3RzXCJdLFxuICAgIGxpc3RQYXRHcmFudHM6IFtcIkdFVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW5zXCJdLFxuICAgIGxpc3RQZW5kaW5nSW52aXRhdGlvbnM6IFtcIkdFVCAvb3Jncy97b3JnfS9pbnZpdGF0aW9uc1wiXSxcbiAgICBsaXN0UHVibGljTWVtYmVyczogW1wiR0VUIC9vcmdzL3tvcmd9L3B1YmxpY19tZW1iZXJzXCJdLFxuICAgIGxpc3RTZWN1cml0eU1hbmFnZXJUZWFtczogW1wiR0VUIC9vcmdzL3tvcmd9L3NlY3VyaXR5LW1hbmFnZXJzXCJdLFxuICAgIGxpc3RXZWJob29rRGVsaXZlcmllczogW1wiR0VUIC9vcmdzL3tvcmd9L2hvb2tzL3tob29rX2lkfS9kZWxpdmVyaWVzXCJdLFxuICAgIGxpc3RXZWJob29rczogW1wiR0VUIC9vcmdzL3tvcmd9L2hvb2tzXCJdLFxuICAgIHBhdGNoQ3VzdG9tT3JnYW5pemF0aW9uUm9sZTogW1xuICAgICAgXCJQQVRDSCAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMve3JvbGVfaWR9XCJcbiAgICBdLFxuICAgIHBpbmdXZWJob29rOiBbXCJQT1NUIC9vcmdzL3tvcmd9L2hvb2tzL3tob29rX2lkfS9waW5nc1wiXSxcbiAgICByZWRlbGl2ZXJXZWJob29rRGVsaXZlcnk6IFtcbiAgICAgIFwiUE9TVCAvb3Jncy97b3JnfS9ob29rcy97aG9va19pZH0vZGVsaXZlcmllcy97ZGVsaXZlcnlfaWR9L2F0dGVtcHRzXCJcbiAgICBdLFxuICAgIHJlbW92ZUN1c3RvbVByb3BlcnR5OiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9wcm9wZXJ0aWVzL3NjaGVtYS97Y3VzdG9tX3Byb3BlcnR5X25hbWV9XCJcbiAgICBdLFxuICAgIHJlbW92ZU1lbWJlcjogW1wiREVMRVRFIC9vcmdzL3tvcmd9L21lbWJlcnMve3VzZXJuYW1lfVwiXSxcbiAgICByZW1vdmVNZW1iZXJzaGlwRm9yVXNlcjogW1wiREVMRVRFIC9vcmdzL3tvcmd9L21lbWJlcnNoaXBzL3t1c2VybmFtZX1cIl0sXG4gICAgcmVtb3ZlT3V0c2lkZUNvbGxhYm9yYXRvcjogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vb3V0c2lkZV9jb2xsYWJvcmF0b3JzL3t1c2VybmFtZX1cIlxuICAgIF0sXG4gICAgcmVtb3ZlUHVibGljTWVtYmVyc2hpcEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9wdWJsaWNfbWVtYmVycy97dXNlcm5hbWV9XCJcbiAgICBdLFxuICAgIHJlbW92ZVNlY3VyaXR5TWFuYWdlclRlYW06IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L3NlY3VyaXR5LW1hbmFnZXJzL3RlYW1zL3t0ZWFtX3NsdWd9XCJcbiAgICBdLFxuICAgIHJldmlld1BhdEdyYW50UmVxdWVzdDogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L3BlcnNvbmFsLWFjY2Vzcy10b2tlbi1yZXF1ZXN0cy97cGF0X3JlcXVlc3RfaWR9XCJcbiAgICBdLFxuICAgIHJldmlld1BhdEdyYW50UmVxdWVzdHNJbkJ1bGs6IFtcbiAgICAgIFwiUE9TVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW4tcmVxdWVzdHNcIlxuICAgIF0sXG4gICAgcmV2b2tlQWxsT3JnUm9sZXNUZWFtOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMvdGVhbXMve3RlYW1fc2x1Z31cIlxuICAgIF0sXG4gICAgcmV2b2tlQWxsT3JnUm9sZXNVc2VyOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMvdXNlcnMve3VzZXJuYW1lfVwiXG4gICAgXSxcbiAgICByZXZva2VPcmdSb2xlVGVhbTogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vb3JnYW5pemF0aW9uLXJvbGVzL3RlYW1zL3t0ZWFtX3NsdWd9L3tyb2xlX2lkfVwiXG4gICAgXSxcbiAgICByZXZva2VPcmdSb2xlVXNlcjogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vb3JnYW5pemF0aW9uLXJvbGVzL3VzZXJzL3t1c2VybmFtZX0ve3JvbGVfaWR9XCJcbiAgICBdLFxuICAgIHNldE1lbWJlcnNoaXBGb3JVc2VyOiBbXCJQVVQgL29yZ3Mve29yZ30vbWVtYmVyc2hpcHMve3VzZXJuYW1lfVwiXSxcbiAgICBzZXRQdWJsaWNNZW1iZXJzaGlwRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L3B1YmxpY19tZW1iZXJzL3t1c2VybmFtZX1cIlxuICAgIF0sXG4gICAgdW5ibG9ja1VzZXI6IFtcIkRFTEVURSAvb3Jncy97b3JnfS9ibG9ja3Mve3VzZXJuYW1lfVwiXSxcbiAgICB1cGRhdGU6IFtcIlBBVENIIC9vcmdzL3tvcmd9XCJdLFxuICAgIHVwZGF0ZU1lbWJlcnNoaXBGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQQVRDSCAvdXNlci9tZW1iZXJzaGlwcy9vcmdzL3tvcmd9XCJcbiAgICBdLFxuICAgIHVwZGF0ZVBhdEFjY2VzczogW1wiUE9TVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW5zL3twYXRfaWR9XCJdLFxuICAgIHVwZGF0ZVBhdEFjY2Vzc2VzOiBbXCJQT1NUIC9vcmdzL3tvcmd9L3BlcnNvbmFsLWFjY2Vzcy10b2tlbnNcIl0sXG4gICAgdXBkYXRlV2ViaG9vazogW1wiUEFUQ0ggL29yZ3Mve29yZ30vaG9va3Mve2hvb2tfaWR9XCJdLFxuICAgIHVwZGF0ZVdlYmhvb2tDb25maWdGb3JPcmc6IFtcIlBBVENIIC9vcmdzL3tvcmd9L2hvb2tzL3tob29rX2lkfS9jb25maWdcIl1cbiAgfSxcbiAgcGFja2FnZXM6IHtcbiAgICBkZWxldGVQYWNrYWdlRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVBhY2thZ2VGb3JPcmc6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVBhY2thZ2VGb3JVc2VyOiBbXG4gICAgICBcIkRFTEVURSAvdXNlcnMve3VzZXJuYW1lfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfVwiXG4gICAgXSxcbiAgICBkZWxldGVQYWNrYWdlVmVyc2lvbkZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkRFTEVURSAvdXNlci9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9ucy97cGFja2FnZV92ZXJzaW9uX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVQYWNrYWdlVmVyc2lvbkZvck9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnMve3BhY2thZ2VfdmVyc2lvbl9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlUGFja2FnZVZlcnNpb25Gb3JVc2VyOiBbXG4gICAgICBcIkRFTEVURSAvdXNlcnMve3VzZXJuYW1lfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9ucy97cGFja2FnZV92ZXJzaW9uX2lkfVwiXG4gICAgXSxcbiAgICBnZXRBbGxQYWNrYWdlVmVyc2lvbnNGb3JBUGFja2FnZU93bmVkQnlBbk9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnNcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJwYWNrYWdlc1wiLCBcImdldEFsbFBhY2thZ2VWZXJzaW9uc0ZvclBhY2thZ2VPd25lZEJ5T3JnXCJdIH1cbiAgICBdLFxuICAgIGdldEFsbFBhY2thZ2VWZXJzaW9uc0ZvckFQYWNrYWdlT3duZWRCeVRoZUF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9uc1wiLFxuICAgICAge30sXG4gICAgICB7XG4gICAgICAgIHJlbmFtZWQ6IFtcbiAgICAgICAgICBcInBhY2thZ2VzXCIsXG4gICAgICAgICAgXCJnZXRBbGxQYWNrYWdlVmVyc2lvbnNGb3JQYWNrYWdlT3duZWRCeUF1dGhlbnRpY2F0ZWRVc2VyXCJcbiAgICAgICAgXVxuICAgICAgfVxuICAgIF0sXG4gICAgZ2V0QWxsUGFja2FnZVZlcnNpb25zRm9yUGFja2FnZU93bmVkQnlBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXIvcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnNcIlxuICAgIF0sXG4gICAgZ2V0QWxsUGFja2FnZVZlcnNpb25zRm9yUGFja2FnZU93bmVkQnlPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zXCJcbiAgICBdLFxuICAgIGdldEFsbFBhY2thZ2VWZXJzaW9uc0ZvclBhY2thZ2VPd25lZEJ5VXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnNcIlxuICAgIF0sXG4gICAgZ2V0UGFja2FnZUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfVwiXG4gICAgXSxcbiAgICBnZXRQYWNrYWdlRm9yT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfVwiXG4gICAgXSxcbiAgICBnZXRQYWNrYWdlRm9yVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX1cIlxuICAgIF0sXG4gICAgZ2V0UGFja2FnZVZlcnNpb25Gb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXIvcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnMve3BhY2thZ2VfdmVyc2lvbl9pZH1cIlxuICAgIF0sXG4gICAgZ2V0UGFja2FnZVZlcnNpb25Gb3JPcmdhbml6YXRpb246IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zL3twYWNrYWdlX3ZlcnNpb25faWR9XCJcbiAgICBdLFxuICAgIGdldFBhY2thZ2VWZXJzaW9uRm9yVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnMve3BhY2thZ2VfdmVyc2lvbl9pZH1cIlxuICAgIF0sXG4gICAgbGlzdERvY2tlck1pZ3JhdGlvbkNvbmZsaWN0aW5nUGFja2FnZXNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXIvZG9ja2VyL2NvbmZsaWN0c1wiXG4gICAgXSxcbiAgICBsaXN0RG9ja2VyTWlncmF0aW9uQ29uZmxpY3RpbmdQYWNrYWdlc0Zvck9yZ2FuaXphdGlvbjogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vZG9ja2VyL2NvbmZsaWN0c1wiXG4gICAgXSxcbiAgICBsaXN0RG9ja2VyTWlncmF0aW9uQ29uZmxpY3RpbmdQYWNrYWdlc0ZvclVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L2RvY2tlci9jb25mbGljdHNcIlxuICAgIF0sXG4gICAgbGlzdFBhY2thZ2VzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9wYWNrYWdlc1wiXSxcbiAgICBsaXN0UGFja2FnZXNGb3JPcmdhbml6YXRpb246IFtcIkdFVCAvb3Jncy97b3JnfS9wYWNrYWdlc1wiXSxcbiAgICBsaXN0UGFja2FnZXNGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcGFja2FnZXNcIl0sXG4gICAgcmVzdG9yZVBhY2thZ2VGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQT1NUIC91c2VyL3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3Jlc3RvcmV7P3Rva2VufVwiXG4gICAgXSxcbiAgICByZXN0b3JlUGFja2FnZUZvck9yZzogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3Jlc3RvcmV7P3Rva2VufVwiXG4gICAgXSxcbiAgICByZXN0b3JlUGFja2FnZUZvclVzZXI6IFtcbiAgICAgIFwiUE9TVCAvdXNlcnMve3VzZXJuYW1lfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS9yZXN0b3Jlez90b2tlbn1cIlxuICAgIF0sXG4gICAgcmVzdG9yZVBhY2thZ2VWZXJzaW9uRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiUE9TVCAvdXNlci9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9ucy97cGFja2FnZV92ZXJzaW9uX2lkfS9yZXN0b3JlXCJcbiAgICBdLFxuICAgIHJlc3RvcmVQYWNrYWdlVmVyc2lvbkZvck9yZzogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zL3twYWNrYWdlX3ZlcnNpb25faWR9L3Jlc3RvcmVcIlxuICAgIF0sXG4gICAgcmVzdG9yZVBhY2thZ2VWZXJzaW9uRm9yVXNlcjogW1xuICAgICAgXCJQT1NUIC91c2Vycy97dXNlcm5hbWV9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zL3twYWNrYWdlX3ZlcnNpb25faWR9L3Jlc3RvcmVcIlxuICAgIF1cbiAgfSxcbiAgcHJvamVjdHM6IHtcbiAgICBhZGRDb2xsYWJvcmF0b3I6IFtcIlBVVCAvcHJvamVjdHMve3Byb2plY3RfaWR9L2NvbGxhYm9yYXRvcnMve3VzZXJuYW1lfVwiXSxcbiAgICBjcmVhdGVDYXJkOiBbXCJQT1NUIC9wcm9qZWN0cy9jb2x1bW5zL3tjb2x1bW5faWR9L2NhcmRzXCJdLFxuICAgIGNyZWF0ZUNvbHVtbjogW1wiUE9TVCAvcHJvamVjdHMve3Byb2plY3RfaWR9L2NvbHVtbnNcIl0sXG4gICAgY3JlYXRlRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBPU1QgL3VzZXIvcHJvamVjdHNcIl0sXG4gICAgY3JlYXRlRm9yT3JnOiBbXCJQT1NUIC9vcmdzL3tvcmd9L3Byb2plY3RzXCJdLFxuICAgIGNyZWF0ZUZvclJlcG86IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3Byb2plY3RzXCJdLFxuICAgIGRlbGV0ZTogW1wiREVMRVRFIC9wcm9qZWN0cy97cHJvamVjdF9pZH1cIl0sXG4gICAgZGVsZXRlQ2FyZDogW1wiREVMRVRFIC9wcm9qZWN0cy9jb2x1bW5zL2NhcmRzL3tjYXJkX2lkfVwiXSxcbiAgICBkZWxldGVDb2x1bW46IFtcIkRFTEVURSAvcHJvamVjdHMvY29sdW1ucy97Y29sdW1uX2lkfVwiXSxcbiAgICBnZXQ6IFtcIkdFVCAvcHJvamVjdHMve3Byb2plY3RfaWR9XCJdLFxuICAgIGdldENhcmQ6IFtcIkdFVCAvcHJvamVjdHMvY29sdW1ucy9jYXJkcy97Y2FyZF9pZH1cIl0sXG4gICAgZ2V0Q29sdW1uOiBbXCJHRVQgL3Byb2plY3RzL2NvbHVtbnMve2NvbHVtbl9pZH1cIl0sXG4gICAgZ2V0UGVybWlzc2lvbkZvclVzZXI6IFtcbiAgICAgIFwiR0VUIC9wcm9qZWN0cy97cHJvamVjdF9pZH0vY29sbGFib3JhdG9ycy97dXNlcm5hbWV9L3Blcm1pc3Npb25cIlxuICAgIF0sXG4gICAgbGlzdENhcmRzOiBbXCJHRVQgL3Byb2plY3RzL2NvbHVtbnMve2NvbHVtbl9pZH0vY2FyZHNcIl0sXG4gICAgbGlzdENvbGxhYm9yYXRvcnM6IFtcIkdFVCAvcHJvamVjdHMve3Byb2plY3RfaWR9L2NvbGxhYm9yYXRvcnNcIl0sXG4gICAgbGlzdENvbHVtbnM6IFtcIkdFVCAvcHJvamVjdHMve3Byb2plY3RfaWR9L2NvbHVtbnNcIl0sXG4gICAgbGlzdEZvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L3Byb2plY3RzXCJdLFxuICAgIGxpc3RGb3JSZXBvOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3Byb2plY3RzXCJdLFxuICAgIGxpc3RGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcHJvamVjdHNcIl0sXG4gICAgbW92ZUNhcmQ6IFtcIlBPU1QgL3Byb2plY3RzL2NvbHVtbnMvY2FyZHMve2NhcmRfaWR9L21vdmVzXCJdLFxuICAgIG1vdmVDb2x1bW46IFtcIlBPU1QgL3Byb2plY3RzL2NvbHVtbnMve2NvbHVtbl9pZH0vbW92ZXNcIl0sXG4gICAgcmVtb3ZlQ29sbGFib3JhdG9yOiBbXG4gICAgICBcIkRFTEVURSAvcHJvamVjdHMve3Byb2plY3RfaWR9L2NvbGxhYm9yYXRvcnMve3VzZXJuYW1lfVwiXG4gICAgXSxcbiAgICB1cGRhdGU6IFtcIlBBVENIIC9wcm9qZWN0cy97cHJvamVjdF9pZH1cIl0sXG4gICAgdXBkYXRlQ2FyZDogW1wiUEFUQ0ggL3Byb2plY3RzL2NvbHVtbnMvY2FyZHMve2NhcmRfaWR9XCJdLFxuICAgIHVwZGF0ZUNvbHVtbjogW1wiUEFUQ0ggL3Byb2plY3RzL2NvbHVtbnMve2NvbHVtbl9pZH1cIl1cbiAgfSxcbiAgcHVsbHM6IHtcbiAgICBjaGVja0lmTWVyZ2VkOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vbWVyZ2VcIl0sXG4gICAgY3JlYXRlOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxsc1wiXSxcbiAgICBjcmVhdGVSZXBseUZvclJldmlld0NvbW1lbnQ6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9jb21tZW50cy97Y29tbWVudF9pZH0vcmVwbGllc1wiXG4gICAgXSxcbiAgICBjcmVhdGVSZXZpZXc6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vcmV2aWV3c1wiXSxcbiAgICBjcmVhdGVSZXZpZXdDb21tZW50OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vY29tbWVudHNcIlxuICAgIF0sXG4gICAgZGVsZXRlUGVuZGluZ1JldmlldzogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vcmV2aWV3cy97cmV2aWV3X2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVSZXZpZXdDb21tZW50OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMvY29tbWVudHMve2NvbW1lbnRfaWR9XCJcbiAgICBdLFxuICAgIGRpc21pc3NSZXZpZXc6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3Jldmlld3Mve3Jldmlld19pZH0vZGlzbWlzc2Fsc1wiXG4gICAgXSxcbiAgICBnZXQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfVwiXSxcbiAgICBnZXRSZXZpZXc6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3Jldmlld3Mve3Jldmlld19pZH1cIlxuICAgIF0sXG4gICAgZ2V0UmV2aWV3Q29tbWVudDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy9jb21tZW50cy97Y29tbWVudF9pZH1cIl0sXG4gICAgbGlzdDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxsc1wiXSxcbiAgICBsaXN0Q29tbWVudHNGb3JSZXZpZXc6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3Jldmlld3Mve3Jldmlld19pZH0vY29tbWVudHNcIlxuICAgIF0sXG4gICAgbGlzdENvbW1pdHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9jb21taXRzXCJdLFxuICAgIGxpc3RGaWxlczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L2ZpbGVzXCJdLFxuICAgIGxpc3RSZXF1ZXN0ZWRSZXZpZXdlcnM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3JlcXVlc3RlZF9yZXZpZXdlcnNcIlxuICAgIF0sXG4gICAgbGlzdFJldmlld0NvbW1lbnRzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9jb21tZW50c1wiXG4gICAgXSxcbiAgICBsaXN0UmV2aWV3Q29tbWVudHNGb3JSZXBvOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL2NvbW1lbnRzXCJdLFxuICAgIGxpc3RSZXZpZXdzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vcmV2aWV3c1wiXSxcbiAgICBtZXJnZTogW1wiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L21lcmdlXCJdLFxuICAgIHJlbW92ZVJlcXVlc3RlZFJldmlld2VyczogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vcmVxdWVzdGVkX3Jldmlld2Vyc1wiXG4gICAgXSxcbiAgICByZXF1ZXN0UmV2aWV3ZXJzOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vcmVxdWVzdGVkX3Jldmlld2Vyc1wiXG4gICAgXSxcbiAgICBzdWJtaXRSZXZpZXc6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9yZXZpZXdzL3tyZXZpZXdfaWR9L2V2ZW50c1wiXG4gICAgXSxcbiAgICB1cGRhdGU6IFtcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9XCJdLFxuICAgIHVwZGF0ZUJyYW5jaDogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vdXBkYXRlLWJyYW5jaFwiXG4gICAgXSxcbiAgICB1cGRhdGVSZXZpZXc6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3Jldmlld3Mve3Jldmlld19pZH1cIlxuICAgIF0sXG4gICAgdXBkYXRlUmV2aWV3Q29tbWVudDogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMvY29tbWVudHMve2NvbW1lbnRfaWR9XCJcbiAgICBdXG4gIH0sXG4gIHJhdGVMaW1pdDogeyBnZXQ6IFtcIkdFVCAvcmF0ZV9saW1pdFwiXSB9LFxuICByZWFjdGlvbnM6IHtcbiAgICBjcmVhdGVGb3JDb21taXRDb21tZW50OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1lbnRzL3tjb21tZW50X2lkfS9yZWFjdGlvbnNcIlxuICAgIF0sXG4gICAgY3JlYXRlRm9ySXNzdWU6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L3JlYWN0aW9uc1wiXG4gICAgXSxcbiAgICBjcmVhdGVGb3JJc3N1ZUNvbW1lbnQ6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL2NvbW1lbnRzL3tjb21tZW50X2lkfS9yZWFjdGlvbnNcIlxuICAgIF0sXG4gICAgY3JlYXRlRm9yUHVsbFJlcXVlc3RSZXZpZXdDb21tZW50OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL2NvbW1lbnRzL3tjb21tZW50X2lkfS9yZWFjdGlvbnNcIlxuICAgIF0sXG4gICAgY3JlYXRlRm9yUmVsZWFzZTogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy97cmVsZWFzZV9pZH0vcmVhY3Rpb25zXCJcbiAgICBdLFxuICAgIGNyZWF0ZUZvclRlYW1EaXNjdXNzaW9uQ29tbWVudEluT3JnOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9jb21tZW50cy97Y29tbWVudF9udW1iZXJ9L3JlYWN0aW9uc1wiXG4gICAgXSxcbiAgICBjcmVhdGVGb3JUZWFtRGlzY3Vzc2lvbkluT3JnOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9yZWFjdGlvbnNcIlxuICAgIF0sXG4gICAgZGVsZXRlRm9yQ29tbWl0Q29tbWVudDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1lbnRzL3tjb21tZW50X2lkfS9yZWFjdGlvbnMve3JlYWN0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVGb3JJc3N1ZTogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9yZWFjdGlvbnMve3JlYWN0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVGb3JJc3N1ZUNvbW1lbnQ6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvY29tbWVudHMve2NvbW1lbnRfaWR9L3JlYWN0aW9ucy97cmVhY3Rpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUZvclB1bGxSZXF1ZXN0Q29tbWVudDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL2NvbW1lbnRzL3tjb21tZW50X2lkfS9yZWFjdGlvbnMve3JlYWN0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVGb3JSZWxlYXNlOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMve3JlbGVhc2VfaWR9L3JlYWN0aW9ucy97cmVhY3Rpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUZvclRlYW1EaXNjdXNzaW9uOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L3JlYWN0aW9ucy97cmVhY3Rpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUZvclRlYW1EaXNjdXNzaW9uQ29tbWVudDogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9jb21tZW50cy97Y29tbWVudF9udW1iZXJ9L3JlYWN0aW9ucy97cmVhY3Rpb25faWR9XCJcbiAgICBdLFxuICAgIGxpc3RGb3JDb21taXRDb21tZW50OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWVudHMve2NvbW1lbnRfaWR9L3JlYWN0aW9uc1wiXG4gICAgXSxcbiAgICBsaXN0Rm9ySXNzdWU6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L3JlYWN0aW9uc1wiXSxcbiAgICBsaXN0Rm9ySXNzdWVDb21tZW50OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL2NvbW1lbnRzL3tjb21tZW50X2lkfS9yZWFjdGlvbnNcIlxuICAgIF0sXG4gICAgbGlzdEZvclB1bGxSZXF1ZXN0UmV2aWV3Q29tbWVudDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL2NvbW1lbnRzL3tjb21tZW50X2lkfS9yZWFjdGlvbnNcIlxuICAgIF0sXG4gICAgbGlzdEZvclJlbGVhc2U6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy97cmVsZWFzZV9pZH0vcmVhY3Rpb25zXCJcbiAgICBdLFxuICAgIGxpc3RGb3JUZWFtRGlzY3Vzc2lvbkNvbW1lbnRJbk9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9jb21tZW50cy97Y29tbWVudF9udW1iZXJ9L3JlYWN0aW9uc1wiXG4gICAgXSxcbiAgICBsaXN0Rm9yVGVhbURpc2N1c3Npb25Jbk9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9yZWFjdGlvbnNcIlxuICAgIF1cbiAgfSxcbiAgcmVwb3M6IHtcbiAgICBhY2NlcHRJbnZpdGF0aW9uOiBbXG4gICAgICBcIlBBVENIIC91c2VyL3JlcG9zaXRvcnlfaW52aXRhdGlvbnMve2ludml0YXRpb25faWR9XCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wicmVwb3NcIiwgXCJhY2NlcHRJbnZpdGF0aW9uRm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgYWNjZXB0SW52aXRhdGlvbkZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBBVENIIC91c2VyL3JlcG9zaXRvcnlfaW52aXRhdGlvbnMve2ludml0YXRpb25faWR9XCJcbiAgICBdLFxuICAgIGFkZEFwcEFjY2Vzc1Jlc3RyaWN0aW9uczogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3Jlc3RyaWN0aW9ucy9hcHBzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgbWFwVG9EYXRhOiBcImFwcHNcIiB9XG4gICAgXSxcbiAgICBhZGRDb2xsYWJvcmF0b3I6IFtcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29sbGFib3JhdG9ycy97dXNlcm5hbWV9XCJdLFxuICAgIGFkZFN0YXR1c0NoZWNrQ29udGV4dHM6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXF1aXJlZF9zdGF0dXNfY2hlY2tzL2NvbnRleHRzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgbWFwVG9EYXRhOiBcImNvbnRleHRzXCIgfVxuICAgIF0sXG4gICAgYWRkVGVhbUFjY2Vzc1Jlc3RyaWN0aW9uczogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3Jlc3RyaWN0aW9ucy90ZWFtc1wiLFxuICAgICAge30sXG4gICAgICB7IG1hcFRvRGF0YTogXCJ0ZWFtc1wiIH1cbiAgICBdLFxuICAgIGFkZFVzZXJBY2Nlc3NSZXN0cmljdGlvbnM6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvdXNlcnNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwidXNlcnNcIiB9XG4gICAgXSxcbiAgICBjYW5jZWxQYWdlc0RlcGxveW1lbnQ6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcGFnZXMvZGVwbG95bWVudHMve3BhZ2VzX2RlcGxveW1lbnRfaWR9L2NhbmNlbFwiXG4gICAgXSxcbiAgICBjaGVja0F1dG9tYXRlZFNlY3VyaXR5Rml4ZXM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hdXRvbWF0ZWQtc2VjdXJpdHktZml4ZXNcIlxuICAgIF0sXG4gICAgY2hlY2tDb2xsYWJvcmF0b3I6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29sbGFib3JhdG9ycy97dXNlcm5hbWV9XCJdLFxuICAgIGNoZWNrVnVsbmVyYWJpbGl0eUFsZXJ0czogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3Z1bG5lcmFiaWxpdHktYWxlcnRzXCJcbiAgICBdLFxuICAgIGNvZGVvd25lcnNFcnJvcnM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZW93bmVycy9lcnJvcnNcIl0sXG4gICAgY29tcGFyZUNvbW1pdHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tcGFyZS97YmFzZX0uLi57aGVhZH1cIl0sXG4gICAgY29tcGFyZUNvbW1pdHNXaXRoQmFzZWhlYWQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21wYXJlL3tiYXNlaGVhZH1cIlxuICAgIF0sXG4gICAgY3JlYXRlQXV0b2xpbms6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2F1dG9saW5rc1wiXSxcbiAgICBjcmVhdGVDb21taXRDb21tZW50OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve2NvbW1pdF9zaGF9L2NvbW1lbnRzXCJcbiAgICBdLFxuICAgIGNyZWF0ZUNvbW1pdFNpZ25hdHVyZVByb3RlY3Rpb246IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXF1aXJlZF9zaWduYXR1cmVzXCJcbiAgICBdLFxuICAgIGNyZWF0ZUNvbW1pdFN0YXR1czogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3RhdHVzZXMve3NoYX1cIl0sXG4gICAgY3JlYXRlRGVwbG95S2V5OiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9rZXlzXCJdLFxuICAgIGNyZWF0ZURlcGxveW1lbnQ6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGxveW1lbnRzXCJdLFxuICAgIGNyZWF0ZURlcGxveW1lbnRCcmFuY2hQb2xpY3k6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50LWJyYW5jaC1wb2xpY2llc1wiXG4gICAgXSxcbiAgICBjcmVhdGVEZXBsb3ltZW50UHJvdGVjdGlvblJ1bGU6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50X3Byb3RlY3Rpb25fcnVsZXNcIlxuICAgIF0sXG4gICAgY3JlYXRlRGVwbG95bWVudFN0YXR1czogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBsb3ltZW50cy97ZGVwbG95bWVudF9pZH0vc3RhdHVzZXNcIlxuICAgIF0sXG4gICAgY3JlYXRlRGlzcGF0Y2hFdmVudDogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGlzcGF0Y2hlc1wiXSxcbiAgICBjcmVhdGVGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUE9TVCAvdXNlci9yZXBvc1wiXSxcbiAgICBjcmVhdGVGb3JrOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9mb3Jrc1wiXSxcbiAgICBjcmVhdGVJbk9yZzogW1wiUE9TVCAvb3Jncy97b3JnfS9yZXBvc1wiXSxcbiAgICBjcmVhdGVPclVwZGF0ZUN1c3RvbVByb3BlcnRpZXNWYWx1ZXM6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L3Byb3BlcnRpZXMvdmFsdWVzXCJcbiAgICBdLFxuICAgIGNyZWF0ZU9yVXBkYXRlRW52aXJvbm1lbnQ6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9XCJcbiAgICBdLFxuICAgIGNyZWF0ZU9yVXBkYXRlRmlsZUNvbnRlbnRzOiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbnRlbnRzL3twYXRofVwiXSxcbiAgICBjcmVhdGVPcmdSdWxlc2V0OiBbXCJQT1NUIC9vcmdzL3tvcmd9L3J1bGVzZXRzXCJdLFxuICAgIGNyZWF0ZVBhZ2VzRGVwbG95bWVudDogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcGFnZXMvZGVwbG95bWVudHNcIl0sXG4gICAgY3JlYXRlUGFnZXNTaXRlOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlc1wiXSxcbiAgICBjcmVhdGVSZWxlYXNlOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlc1wiXSxcbiAgICBjcmVhdGVSZXBvUnVsZXNldDogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXNldHNcIl0sXG4gICAgY3JlYXRlVGFnUHJvdGVjdGlvbjogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vdGFncy9wcm90ZWN0aW9uXCJdLFxuICAgIGNyZWF0ZVVzaW5nVGVtcGxhdGU6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve3RlbXBsYXRlX293bmVyfS97dGVtcGxhdGVfcmVwb30vZ2VuZXJhdGVcIlxuICAgIF0sXG4gICAgY3JlYXRlV2ViaG9vazogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3NcIl0sXG4gICAgZGVjbGluZUludml0YXRpb246IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL3JlcG9zaXRvcnlfaW52aXRhdGlvbnMve2ludml0YXRpb25faWR9XCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wicmVwb3NcIiwgXCJkZWNsaW5lSW52aXRhdGlvbkZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGRlY2xpbmVJbnZpdGF0aW9uRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL3JlcG9zaXRvcnlfaW52aXRhdGlvbnMve2ludml0YXRpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZTogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfVwiXSxcbiAgICBkZWxldGVBY2Nlc3NSZXN0cmljdGlvbnM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3Jlc3RyaWN0aW9uc1wiXG4gICAgXSxcbiAgICBkZWxldGVBZG1pbkJyYW5jaFByb3RlY3Rpb246IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL2VuZm9yY2VfYWRtaW5zXCJcbiAgICBdLFxuICAgIGRlbGV0ZUFuRW52aXJvbm1lbnQ6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUF1dG9saW5rOiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2F1dG9saW5rcy97YXV0b2xpbmtfaWR9XCJdLFxuICAgIGRlbGV0ZUJyYW5jaFByb3RlY3Rpb246IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uXCJcbiAgICBdLFxuICAgIGRlbGV0ZUNvbW1pdENvbW1lbnQ6IFtcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWVudHMve2NvbW1lbnRfaWR9XCJdLFxuICAgIGRlbGV0ZUNvbW1pdFNpZ25hdHVyZVByb3RlY3Rpb246IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3NpZ25hdHVyZXNcIlxuICAgIF0sXG4gICAgZGVsZXRlRGVwbG95S2V5OiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2tleXMve2tleV9pZH1cIl0sXG4gICAgZGVsZXRlRGVwbG95bWVudDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGxveW1lbnRzL3tkZXBsb3ltZW50X2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVEZXBsb3ltZW50QnJhbmNoUG9saWN5OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50LWJyYW5jaC1wb2xpY2llcy97YnJhbmNoX3BvbGljeV9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlRmlsZTogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb250ZW50cy97cGF0aH1cIl0sXG4gICAgZGVsZXRlSW52aXRhdGlvbjogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2ludml0YXRpb25zL3tpbnZpdGF0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVPcmdSdWxlc2V0OiBbXCJERUxFVEUgL29yZ3Mve29yZ30vcnVsZXNldHMve3J1bGVzZXRfaWR9XCJdLFxuICAgIGRlbGV0ZVBhZ2VzU2l0ZTogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlc1wiXSxcbiAgICBkZWxldGVQdWxsUmVxdWVzdFJldmlld1Byb3RlY3Rpb246IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3B1bGxfcmVxdWVzdF9yZXZpZXdzXCJcbiAgICBdLFxuICAgIGRlbGV0ZVJlbGVhc2U6IFtcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMve3JlbGVhc2VfaWR9XCJdLFxuICAgIGRlbGV0ZVJlbGVhc2VBc3NldDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL2Fzc2V0cy97YXNzZXRfaWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVJlcG9SdWxlc2V0OiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzZXRzL3tydWxlc2V0X2lkfVwiXSxcbiAgICBkZWxldGVUYWdQcm90ZWN0aW9uOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vdGFncy9wcm90ZWN0aW9uL3t0YWdfcHJvdGVjdGlvbl9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlV2ViaG9vazogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ob29rcy97aG9va19pZH1cIl0sXG4gICAgZGlzYWJsZUF1dG9tYXRlZFNlY3VyaXR5Rml4ZXM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hdXRvbWF0ZWQtc2VjdXJpdHktZml4ZXNcIlxuICAgIF0sXG4gICAgZGlzYWJsZURlcGxveW1lbnRQcm90ZWN0aW9uUnVsZTogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vZGVwbG95bWVudF9wcm90ZWN0aW9uX3J1bGVzL3twcm90ZWN0aW9uX3J1bGVfaWR9XCJcbiAgICBdLFxuICAgIGRpc2FibGVQcml2YXRlVnVsbmVyYWJpbGl0eVJlcG9ydGluZzogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3ByaXZhdGUtdnVsbmVyYWJpbGl0eS1yZXBvcnRpbmdcIlxuICAgIF0sXG4gICAgZGlzYWJsZVZ1bG5lcmFiaWxpdHlBbGVydHM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS92dWxuZXJhYmlsaXR5LWFsZXJ0c1wiXG4gICAgXSxcbiAgICBkb3dubG9hZEFyY2hpdmU6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS96aXBiYWxsL3tyZWZ9XCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wicmVwb3NcIiwgXCJkb3dubG9hZFppcGJhbGxBcmNoaXZlXCJdIH1cbiAgICBdLFxuICAgIGRvd25sb2FkVGFyYmFsbEFyY2hpdmU6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdGFyYmFsbC97cmVmfVwiXSxcbiAgICBkb3dubG9hZFppcGJhbGxBcmNoaXZlOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3ppcGJhbGwve3JlZn1cIl0sXG4gICAgZW5hYmxlQXV0b21hdGVkU2VjdXJpdHlGaXhlczogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2F1dG9tYXRlZC1zZWN1cml0eS1maXhlc1wiXG4gICAgXSxcbiAgICBlbmFibGVQcml2YXRlVnVsbmVyYWJpbGl0eVJlcG9ydGluZzogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3ByaXZhdGUtdnVsbmVyYWJpbGl0eS1yZXBvcnRpbmdcIlxuICAgIF0sXG4gICAgZW5hYmxlVnVsbmVyYWJpbGl0eUFsZXJ0czogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3Z1bG5lcmFiaWxpdHktYWxlcnRzXCJcbiAgICBdLFxuICAgIGdlbmVyYXRlUmVsZWFzZU5vdGVzOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL2dlbmVyYXRlLW5vdGVzXCJcbiAgICBdLFxuICAgIGdldDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfVwiXSxcbiAgICBnZXRBY2Nlc3NSZXN0cmljdGlvbnM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3Jlc3RyaWN0aW9uc1wiXG4gICAgXSxcbiAgICBnZXRBZG1pbkJyYW5jaFByb3RlY3Rpb246IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL2VuZm9yY2VfYWRtaW5zXCJcbiAgICBdLFxuICAgIGdldEFsbERlcGxveW1lbnRQcm90ZWN0aW9uUnVsZXM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L2RlcGxveW1lbnRfcHJvdGVjdGlvbl9ydWxlc1wiXG4gICAgXSxcbiAgICBnZXRBbGxFbnZpcm9ubWVudHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzXCJdLFxuICAgIGdldEFsbFN0YXR1c0NoZWNrQ29udGV4dHM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3N0YXR1c19jaGVja3MvY29udGV4dHNcIlxuICAgIF0sXG4gICAgZ2V0QWxsVG9waWNzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RvcGljc1wiXSxcbiAgICBnZXRBcHBzV2l0aEFjY2Vzc1RvUHJvdGVjdGVkQnJhbmNoOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvYXBwc1wiXG4gICAgXSxcbiAgICBnZXRBdXRvbGluazogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hdXRvbGlua3Mve2F1dG9saW5rX2lkfVwiXSxcbiAgICBnZXRCcmFuY2g6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH1cIl0sXG4gICAgZ2V0QnJhbmNoUHJvdGVjdGlvbjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb25cIlxuICAgIF0sXG4gICAgZ2V0QnJhbmNoUnVsZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXMvYnJhbmNoZXMve2JyYW5jaH1cIl0sXG4gICAgZ2V0Q2xvbmVzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RyYWZmaWMvY2xvbmVzXCJdLFxuICAgIGdldENvZGVGcmVxdWVuY3lTdGF0czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zdGF0cy9jb2RlX2ZyZXF1ZW5jeVwiXSxcbiAgICBnZXRDb2xsYWJvcmF0b3JQZXJtaXNzaW9uTGV2ZWw6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2xsYWJvcmF0b3JzL3t1c2VybmFtZX0vcGVybWlzc2lvblwiXG4gICAgXSxcbiAgICBnZXRDb21iaW5lZFN0YXR1c0ZvclJlZjogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tyZWZ9L3N0YXR1c1wiXSxcbiAgICBnZXRDb21taXQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97cmVmfVwiXSxcbiAgICBnZXRDb21taXRBY3Rpdml0eVN0YXRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N0YXRzL2NvbW1pdF9hY3Rpdml0eVwiXSxcbiAgICBnZXRDb21taXRDb21tZW50OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1lbnRzL3tjb21tZW50X2lkfVwiXSxcbiAgICBnZXRDb21taXRTaWduYXR1cmVQcm90ZWN0aW9uOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXF1aXJlZF9zaWduYXR1cmVzXCJcbiAgICBdLFxuICAgIGdldENvbW11bml0eVByb2ZpbGVNZXRyaWNzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW11bml0eS9wcm9maWxlXCJdLFxuICAgIGdldENvbnRlbnQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29udGVudHMve3BhdGh9XCJdLFxuICAgIGdldENvbnRyaWJ1dG9yc1N0YXRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N0YXRzL2NvbnRyaWJ1dG9yc1wiXSxcbiAgICBnZXRDdXN0b21EZXBsb3ltZW50UHJvdGVjdGlvblJ1bGU6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L2RlcGxveW1lbnRfcHJvdGVjdGlvbl9ydWxlcy97cHJvdGVjdGlvbl9ydWxlX2lkfVwiXG4gICAgXSxcbiAgICBnZXRDdXN0b21Qcm9wZXJ0aWVzVmFsdWVzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3Byb3BlcnRpZXMvdmFsdWVzXCJdLFxuICAgIGdldERlcGxveUtleTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9rZXlzL3trZXlfaWR9XCJdLFxuICAgIGdldERlcGxveW1lbnQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwbG95bWVudHMve2RlcGxveW1lbnRfaWR9XCJdLFxuICAgIGdldERlcGxveW1lbnRCcmFuY2hQb2xpY3k6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L2RlcGxveW1lbnQtYnJhbmNoLXBvbGljaWVzL3ticmFuY2hfcG9saWN5X2lkfVwiXG4gICAgXSxcbiAgICBnZXREZXBsb3ltZW50U3RhdHVzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwbG95bWVudHMve2RlcGxveW1lbnRfaWR9L3N0YXR1c2VzL3tzdGF0dXNfaWR9XCJcbiAgICBdLFxuICAgIGdldEVudmlyb25tZW50OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfVwiXG4gICAgXSxcbiAgICBnZXRMYXRlc3RQYWdlc0J1aWxkOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzL2J1aWxkcy9sYXRlc3RcIl0sXG4gICAgZ2V0TGF0ZXN0UmVsZWFzZTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy9sYXRlc3RcIl0sXG4gICAgZ2V0T3JnUnVsZVN1aXRlOiBbXCJHRVQgL29yZ3Mve29yZ30vcnVsZXNldHMvcnVsZS1zdWl0ZXMve3J1bGVfc3VpdGVfaWR9XCJdLFxuICAgIGdldE9yZ1J1bGVTdWl0ZXM6IFtcIkdFVCAvb3Jncy97b3JnfS9ydWxlc2V0cy9ydWxlLXN1aXRlc1wiXSxcbiAgICBnZXRPcmdSdWxlc2V0OiBbXCJHRVQgL29yZ3Mve29yZ30vcnVsZXNldHMve3J1bGVzZXRfaWR9XCJdLFxuICAgIGdldE9yZ1J1bGVzZXRzOiBbXCJHRVQgL29yZ3Mve29yZ30vcnVsZXNldHNcIl0sXG4gICAgZ2V0UGFnZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcGFnZXNcIl0sXG4gICAgZ2V0UGFnZXNCdWlsZDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlcy9idWlsZHMve2J1aWxkX2lkfVwiXSxcbiAgICBnZXRQYWdlc0RlcGxveW1lbnQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlcy9kZXBsb3ltZW50cy97cGFnZXNfZGVwbG95bWVudF9pZH1cIlxuICAgIF0sXG4gICAgZ2V0UGFnZXNIZWFsdGhDaGVjazogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlcy9oZWFsdGhcIl0sXG4gICAgZ2V0UGFydGljaXBhdGlvblN0YXRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N0YXRzL3BhcnRpY2lwYXRpb25cIl0sXG4gICAgZ2V0UHVsbFJlcXVlc3RSZXZpZXdQcm90ZWN0aW9uOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXF1aXJlZF9wdWxsX3JlcXVlc3RfcmV2aWV3c1wiXG4gICAgXSxcbiAgICBnZXRQdW5jaENhcmRTdGF0czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zdGF0cy9wdW5jaF9jYXJkXCJdLFxuICAgIGdldFJlYWRtZTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWFkbWVcIl0sXG4gICAgZ2V0UmVhZG1lSW5EaXJlY3Rvcnk6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVhZG1lL3tkaXJ9XCJdLFxuICAgIGdldFJlbGVhc2U6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMve3JlbGVhc2VfaWR9XCJdLFxuICAgIGdldFJlbGVhc2VBc3NldDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy9hc3NldHMve2Fzc2V0X2lkfVwiXSxcbiAgICBnZXRSZWxlYXNlQnlUYWc6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMvdGFncy97dGFnfVwiXSxcbiAgICBnZXRSZXBvUnVsZVN1aXRlOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXNldHMvcnVsZS1zdWl0ZXMve3J1bGVfc3VpdGVfaWR9XCJcbiAgICBdLFxuICAgIGdldFJlcG9SdWxlU3VpdGVzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzZXRzL3J1bGUtc3VpdGVzXCJdLFxuICAgIGdldFJlcG9SdWxlc2V0OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzZXRzL3tydWxlc2V0X2lkfVwiXSxcbiAgICBnZXRSZXBvUnVsZXNldHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXNldHNcIl0sXG4gICAgZ2V0U3RhdHVzQ2hlY2tzUHJvdGVjdGlvbjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfc3RhdHVzX2NoZWNrc1wiXG4gICAgXSxcbiAgICBnZXRUZWFtc1dpdGhBY2Nlc3NUb1Byb3RlY3RlZEJyYW5jaDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVzdHJpY3Rpb25zL3RlYW1zXCJcbiAgICBdLFxuICAgIGdldFRvcFBhdGhzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RyYWZmaWMvcG9wdWxhci9wYXRoc1wiXSxcbiAgICBnZXRUb3BSZWZlcnJlcnM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdHJhZmZpYy9wb3B1bGFyL3JlZmVycmVyc1wiXSxcbiAgICBnZXRVc2Vyc1dpdGhBY2Nlc3NUb1Byb3RlY3RlZEJyYW5jaDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVzdHJpY3Rpb25zL3VzZXJzXCJcbiAgICBdLFxuICAgIGdldFZpZXdzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RyYWZmaWMvdmlld3NcIl0sXG4gICAgZ2V0V2ViaG9vazogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ob29rcy97aG9va19pZH1cIl0sXG4gICAgZ2V0V2ViaG9va0NvbmZpZ0ZvclJlcG86IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ob29rcy97aG9va19pZH0vY29uZmlnXCJcbiAgICBdLFxuICAgIGdldFdlYmhvb2tEZWxpdmVyeTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfS9kZWxpdmVyaWVzL3tkZWxpdmVyeV9pZH1cIlxuICAgIF0sXG4gICAgbGlzdEFjdGl2aXRpZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aXZpdHlcIl0sXG4gICAgbGlzdEF1dG9saW5rczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hdXRvbGlua3NcIl0sXG4gICAgbGlzdEJyYW5jaGVzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzXCJdLFxuICAgIGxpc3RCcmFuY2hlc0ZvckhlYWRDb21taXQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tjb21taXRfc2hhfS9icmFuY2hlcy13aGVyZS1oZWFkXCJcbiAgICBdLFxuICAgIGxpc3RDb2xsYWJvcmF0b3JzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbGxhYm9yYXRvcnNcIl0sXG4gICAgbGlzdENvbW1lbnRzRm9yQ29tbWl0OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97Y29tbWl0X3NoYX0vY29tbWVudHNcIlxuICAgIF0sXG4gICAgbGlzdENvbW1pdENvbW1lbnRzRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21tZW50c1wiXSxcbiAgICBsaXN0Q29tbWl0U3RhdHVzZXNGb3JSZWY6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tyZWZ9L3N0YXR1c2VzXCJcbiAgICBdLFxuICAgIGxpc3RDb21taXRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHNcIl0sXG4gICAgbGlzdENvbnRyaWJ1dG9yczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb250cmlidXRvcnNcIl0sXG4gICAgbGlzdEN1c3RvbURlcGxveW1lbnRSdWxlSW50ZWdyYXRpb25zOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50X3Byb3RlY3Rpb25fcnVsZXMvYXBwc1wiXG4gICAgXSxcbiAgICBsaXN0RGVwbG95S2V5czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9rZXlzXCJdLFxuICAgIGxpc3REZXBsb3ltZW50QnJhbmNoUG9saWNpZXM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L2RlcGxveW1lbnQtYnJhbmNoLXBvbGljaWVzXCJcbiAgICBdLFxuICAgIGxpc3REZXBsb3ltZW50U3RhdHVzZXM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBsb3ltZW50cy97ZGVwbG95bWVudF9pZH0vc3RhdHVzZXNcIlxuICAgIF0sXG4gICAgbGlzdERlcGxveW1lbnRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGxveW1lbnRzXCJdLFxuICAgIGxpc3RGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL3JlcG9zXCJdLFxuICAgIGxpc3RGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9yZXBvc1wiXSxcbiAgICBsaXN0Rm9yVXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L3JlcG9zXCJdLFxuICAgIGxpc3RGb3JrczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9mb3Jrc1wiXSxcbiAgICBsaXN0SW52aXRhdGlvbnM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaW52aXRhdGlvbnNcIl0sXG4gICAgbGlzdEludml0YXRpb25zRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9yZXBvc2l0b3J5X2ludml0YXRpb25zXCJdLFxuICAgIGxpc3RMYW5ndWFnZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vbGFuZ3VhZ2VzXCJdLFxuICAgIGxpc3RQYWdlc0J1aWxkczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlcy9idWlsZHNcIl0sXG4gICAgbGlzdFB1YmxpYzogW1wiR0VUIC9yZXBvc2l0b3JpZXNcIl0sXG4gICAgbGlzdFB1bGxSZXF1ZXN0c0Fzc29jaWF0ZWRXaXRoQ29tbWl0OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97Y29tbWl0X3NoYX0vcHVsbHNcIlxuICAgIF0sXG4gICAgbGlzdFJlbGVhc2VBc3NldHM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy97cmVsZWFzZV9pZH0vYXNzZXRzXCJcbiAgICBdLFxuICAgIGxpc3RSZWxlYXNlczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlc1wiXSxcbiAgICBsaXN0VGFnUHJvdGVjdGlvbjogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS90YWdzL3Byb3RlY3Rpb25cIl0sXG4gICAgbGlzdFRhZ3M6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdGFnc1wiXSxcbiAgICBsaXN0VGVhbXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdGVhbXNcIl0sXG4gICAgbGlzdFdlYmhvb2tEZWxpdmVyaWVzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3Mve2hvb2tfaWR9L2RlbGl2ZXJpZXNcIlxuICAgIF0sXG4gICAgbGlzdFdlYmhvb2tzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzXCJdLFxuICAgIG1lcmdlOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9tZXJnZXNcIl0sXG4gICAgbWVyZ2VVcHN0cmVhbTogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vbWVyZ2UtdXBzdHJlYW1cIl0sXG4gICAgcGluZ1dlYmhvb2s6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfS9waW5nc1wiXSxcbiAgICByZWRlbGl2ZXJXZWJob29rRGVsaXZlcnk6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3Mve2hvb2tfaWR9L2RlbGl2ZXJpZXMve2RlbGl2ZXJ5X2lkfS9hdHRlbXB0c1wiXG4gICAgXSxcbiAgICByZW1vdmVBcHBBY2Nlc3NSZXN0cmljdGlvbnM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3Jlc3RyaWN0aW9ucy9hcHBzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgbWFwVG9EYXRhOiBcImFwcHNcIiB9XG4gICAgXSxcbiAgICByZW1vdmVDb2xsYWJvcmF0b3I6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2xsYWJvcmF0b3JzL3t1c2VybmFtZX1cIlxuICAgIF0sXG4gICAgcmVtb3ZlU3RhdHVzQ2hlY2tDb250ZXh0czogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfc3RhdHVzX2NoZWNrcy9jb250ZXh0c1wiLFxuICAgICAge30sXG4gICAgICB7IG1hcFRvRGF0YTogXCJjb250ZXh0c1wiIH1cbiAgICBdLFxuICAgIHJlbW92ZVN0YXR1c0NoZWNrUHJvdGVjdGlvbjogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfc3RhdHVzX2NoZWNrc1wiXG4gICAgXSxcbiAgICByZW1vdmVUZWFtQWNjZXNzUmVzdHJpY3Rpb25zOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvdGVhbXNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwidGVhbXNcIiB9XG4gICAgXSxcbiAgICByZW1vdmVVc2VyQWNjZXNzUmVzdHJpY3Rpb25zOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvdXNlcnNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwidXNlcnNcIiB9XG4gICAgXSxcbiAgICByZW5hbWVCcmFuY2g6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3JlbmFtZVwiXSxcbiAgICByZXBsYWNlQWxsVG9waWNzOiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RvcGljc1wiXSxcbiAgICByZXF1ZXN0UGFnZXNCdWlsZDogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcGFnZXMvYnVpbGRzXCJdLFxuICAgIHNldEFkbWluQnJhbmNoUHJvdGVjdGlvbjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL2VuZm9yY2VfYWRtaW5zXCJcbiAgICBdLFxuICAgIHNldEFwcEFjY2Vzc1Jlc3RyaWN0aW9uczogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVzdHJpY3Rpb25zL2FwcHNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwiYXBwc1wiIH1cbiAgICBdLFxuICAgIHNldFN0YXR1c0NoZWNrQ29udGV4dHM6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3N0YXR1c19jaGVja3MvY29udGV4dHNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwiY29udGV4dHNcIiB9XG4gICAgXSxcbiAgICBzZXRUZWFtQWNjZXNzUmVzdHJpY3Rpb25zOiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvdGVhbXNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwidGVhbXNcIiB9XG4gICAgXSxcbiAgICBzZXRVc2VyQWNjZXNzUmVzdHJpY3Rpb25zOiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvdXNlcnNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwidXNlcnNcIiB9XG4gICAgXSxcbiAgICB0ZXN0UHVzaFdlYmhvb2s6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfS90ZXN0c1wiXSxcbiAgICB0cmFuc2ZlcjogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vdHJhbnNmZXJcIl0sXG4gICAgdXBkYXRlOiBbXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb31cIl0sXG4gICAgdXBkYXRlQnJhbmNoUHJvdGVjdGlvbjogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb25cIlxuICAgIF0sXG4gICAgdXBkYXRlQ29tbWl0Q29tbWVudDogW1wiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1lbnRzL3tjb21tZW50X2lkfVwiXSxcbiAgICB1cGRhdGVEZXBsb3ltZW50QnJhbmNoUG9saWN5OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50LWJyYW5jaC1wb2xpY2llcy97YnJhbmNoX3BvbGljeV9pZH1cIlxuICAgIF0sXG4gICAgdXBkYXRlSW5mb3JtYXRpb25BYm91dFBhZ2VzU2l0ZTogW1wiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlc1wiXSxcbiAgICB1cGRhdGVJbnZpdGF0aW9uOiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbnZpdGF0aW9ucy97aW52aXRhdGlvbl9pZH1cIlxuICAgIF0sXG4gICAgdXBkYXRlT3JnUnVsZXNldDogW1wiUFVUIC9vcmdzL3tvcmd9L3J1bGVzZXRzL3tydWxlc2V0X2lkfVwiXSxcbiAgICB1cGRhdGVQdWxsUmVxdWVzdFJldmlld1Byb3RlY3Rpb246IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfcHVsbF9yZXF1ZXN0X3Jldmlld3NcIlxuICAgIF0sXG4gICAgdXBkYXRlUmVsZWFzZTogW1wiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL3tyZWxlYXNlX2lkfVwiXSxcbiAgICB1cGRhdGVSZWxlYXNlQXNzZXQ6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL2Fzc2V0cy97YXNzZXRfaWR9XCJcbiAgICBdLFxuICAgIHVwZGF0ZVJlcG9SdWxlc2V0OiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzZXRzL3tydWxlc2V0X2lkfVwiXSxcbiAgICB1cGRhdGVTdGF0dXNDaGVja1BvdGVjdGlvbjogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXF1aXJlZF9zdGF0dXNfY2hlY2tzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wicmVwb3NcIiwgXCJ1cGRhdGVTdGF0dXNDaGVja1Byb3RlY3Rpb25cIl0gfVxuICAgIF0sXG4gICAgdXBkYXRlU3RhdHVzQ2hlY2tQcm90ZWN0aW9uOiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3N0YXR1c19jaGVja3NcIlxuICAgIF0sXG4gICAgdXBkYXRlV2ViaG9vazogW1wiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfVwiXSxcbiAgICB1cGRhdGVXZWJob29rQ29uZmlnRm9yUmVwbzogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3Mve2hvb2tfaWR9L2NvbmZpZ1wiXG4gICAgXSxcbiAgICB1cGxvYWRSZWxlYXNlQXNzZXQ6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMve3JlbGVhc2VfaWR9L2Fzc2V0c3s/bmFtZSxsYWJlbH1cIixcbiAgICAgIHsgYmFzZVVybDogXCJodHRwczovL3VwbG9hZHMuZ2l0aHViLmNvbVwiIH1cbiAgICBdXG4gIH0sXG4gIHNlYXJjaDoge1xuICAgIGNvZGU6IFtcIkdFVCAvc2VhcmNoL2NvZGVcIl0sXG4gICAgY29tbWl0czogW1wiR0VUIC9zZWFyY2gvY29tbWl0c1wiXSxcbiAgICBpc3N1ZXNBbmRQdWxsUmVxdWVzdHM6IFtcIkdFVCAvc2VhcmNoL2lzc3Vlc1wiXSxcbiAgICBsYWJlbHM6IFtcIkdFVCAvc2VhcmNoL2xhYmVsc1wiXSxcbiAgICByZXBvczogW1wiR0VUIC9zZWFyY2gvcmVwb3NpdG9yaWVzXCJdLFxuICAgIHRvcGljczogW1wiR0VUIC9zZWFyY2gvdG9waWNzXCJdLFxuICAgIHVzZXJzOiBbXCJHRVQgL3NlYXJjaC91c2Vyc1wiXVxuICB9LFxuICBzZWNyZXRTY2FubmluZzoge1xuICAgIGdldEFsZXJ0OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjcmV0LXNjYW5uaW5nL2FsZXJ0cy97YWxlcnRfbnVtYmVyfVwiXG4gICAgXSxcbiAgICBsaXN0QWxlcnRzRm9yRW50ZXJwcmlzZTogW1xuICAgICAgXCJHRVQgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS9zZWNyZXQtc2Nhbm5pbmcvYWxlcnRzXCJcbiAgICBdLFxuICAgIGxpc3RBbGVydHNGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9zZWNyZXQtc2Nhbm5pbmcvYWxlcnRzXCJdLFxuICAgIGxpc3RBbGVydHNGb3JSZXBvOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3NlY3JldC1zY2FubmluZy9hbGVydHNcIl0sXG4gICAgbGlzdExvY2F0aW9uc0ZvckFsZXJ0OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjcmV0LXNjYW5uaW5nL2FsZXJ0cy97YWxlcnRfbnVtYmVyfS9sb2NhdGlvbnNcIlxuICAgIF0sXG4gICAgdXBkYXRlQWxlcnQ6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L3NlY3JldC1zY2FubmluZy9hbGVydHMve2FsZXJ0X251bWJlcn1cIlxuICAgIF1cbiAgfSxcbiAgc2VjdXJpdHlBZHZpc29yaWVzOiB7XG4gICAgY3JlYXRlRm9yazogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWN1cml0eS1hZHZpc29yaWVzL3tnaHNhX2lkfS9mb3Jrc1wiXG4gICAgXSxcbiAgICBjcmVhdGVQcml2YXRlVnVsbmVyYWJpbGl0eVJlcG9ydDogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWN1cml0eS1hZHZpc29yaWVzL3JlcG9ydHNcIlxuICAgIF0sXG4gICAgY3JlYXRlUmVwb3NpdG9yeUFkdmlzb3J5OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3NlY3VyaXR5LWFkdmlzb3JpZXNcIlxuICAgIF0sXG4gICAgY3JlYXRlUmVwb3NpdG9yeUFkdmlzb3J5Q3ZlUmVxdWVzdDogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWN1cml0eS1hZHZpc29yaWVzL3tnaHNhX2lkfS9jdmVcIlxuICAgIF0sXG4gICAgZ2V0R2xvYmFsQWR2aXNvcnk6IFtcIkdFVCAvYWR2aXNvcmllcy97Z2hzYV9pZH1cIl0sXG4gICAgZ2V0UmVwb3NpdG9yeUFkdmlzb3J5OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjdXJpdHktYWR2aXNvcmllcy97Z2hzYV9pZH1cIlxuICAgIF0sXG4gICAgbGlzdEdsb2JhbEFkdmlzb3JpZXM6IFtcIkdFVCAvYWR2aXNvcmllc1wiXSxcbiAgICBsaXN0T3JnUmVwb3NpdG9yeUFkdmlzb3JpZXM6IFtcIkdFVCAvb3Jncy97b3JnfS9zZWN1cml0eS1hZHZpc29yaWVzXCJdLFxuICAgIGxpc3RSZXBvc2l0b3J5QWR2aXNvcmllczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWN1cml0eS1hZHZpc29yaWVzXCJdLFxuICAgIHVwZGF0ZVJlcG9zaXRvcnlBZHZpc29yeTogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjdXJpdHktYWR2aXNvcmllcy97Z2hzYV9pZH1cIlxuICAgIF1cbiAgfSxcbiAgdGVhbXM6IHtcbiAgICBhZGRPclVwZGF0ZU1lbWJlcnNoaXBGb3JVc2VySW5Pcmc6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L21lbWJlcnNoaXBzL3t1c2VybmFtZX1cIlxuICAgIF0sXG4gICAgYWRkT3JVcGRhdGVQcm9qZWN0UGVybWlzc2lvbnNJbk9yZzogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vcHJvamVjdHMve3Byb2plY3RfaWR9XCJcbiAgICBdLFxuICAgIGFkZE9yVXBkYXRlUmVwb1Blcm1pc3Npb25zSW5Pcmc6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L3JlcG9zL3tvd25lcn0ve3JlcG99XCJcbiAgICBdLFxuICAgIGNoZWNrUGVybWlzc2lvbnNGb3JQcm9qZWN0SW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L3Byb2plY3RzL3twcm9qZWN0X2lkfVwiXG4gICAgXSxcbiAgICBjaGVja1Blcm1pc3Npb25zRm9yUmVwb0luT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9yZXBvcy97b3duZXJ9L3tyZXBvfVwiXG4gICAgXSxcbiAgICBjcmVhdGU6IFtcIlBPU1QgL29yZ3Mve29yZ30vdGVhbXNcIl0sXG4gICAgY3JlYXRlRGlzY3Vzc2lvbkNvbW1lbnRJbk9yZzogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vY29tbWVudHNcIlxuICAgIF0sXG4gICAgY3JlYXRlRGlzY3Vzc2lvbkluT3JnOiBbXCJQT1NUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zXCJdLFxuICAgIGRlbGV0ZURpc2N1c3Npb25Db21tZW50SW5Pcmc6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vY29tbWVudHMve2NvbW1lbnRfbnVtYmVyfVwiXG4gICAgXSxcbiAgICBkZWxldGVEaXNjdXNzaW9uSW5Pcmc6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn1cIlxuICAgIF0sXG4gICAgZGVsZXRlSW5Pcmc6IFtcIkRFTEVURSAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfVwiXSxcbiAgICBnZXRCeU5hbWU6IFtcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfVwiXSxcbiAgICBnZXREaXNjdXNzaW9uQ29tbWVudEluT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L2NvbW1lbnRzL3tjb21tZW50X251bWJlcn1cIlxuICAgIF0sXG4gICAgZ2V0RGlzY3Vzc2lvbkluT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9XCJcbiAgICBdLFxuICAgIGdldE1lbWJlcnNoaXBGb3JVc2VySW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L21lbWJlcnNoaXBzL3t1c2VybmFtZX1cIlxuICAgIF0sXG4gICAgbGlzdDogW1wiR0VUIC9vcmdzL3tvcmd9L3RlYW1zXCJdLFxuICAgIGxpc3RDaGlsZEluT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vdGVhbXNcIl0sXG4gICAgbGlzdERpc2N1c3Npb25Db21tZW50c0luT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L2NvbW1lbnRzXCJcbiAgICBdLFxuICAgIGxpc3REaXNjdXNzaW9uc0luT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnNcIl0sXG4gICAgbGlzdEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvdGVhbXNcIl0sXG4gICAgbGlzdE1lbWJlcnNJbk9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L21lbWJlcnNcIl0sXG4gICAgbGlzdFBlbmRpbmdJbnZpdGF0aW9uc0luT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9pbnZpdGF0aW9uc1wiXG4gICAgXSxcbiAgICBsaXN0UHJvamVjdHNJbk9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L3Byb2plY3RzXCJdLFxuICAgIGxpc3RSZXBvc0luT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vcmVwb3NcIl0sXG4gICAgcmVtb3ZlTWVtYmVyc2hpcEZvclVzZXJJbk9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vbWVtYmVyc2hpcHMve3VzZXJuYW1lfVwiXG4gICAgXSxcbiAgICByZW1vdmVQcm9qZWN0SW5Pcmc6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L3Byb2plY3RzL3twcm9qZWN0X2lkfVwiXG4gICAgXSxcbiAgICByZW1vdmVSZXBvSW5Pcmc6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L3JlcG9zL3tvd25lcn0ve3JlcG99XCJcbiAgICBdLFxuICAgIHVwZGF0ZURpc2N1c3Npb25Db21tZW50SW5Pcmc6IFtcbiAgICAgIFwiUEFUQ0ggL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9jb21tZW50cy97Y29tbWVudF9udW1iZXJ9XCJcbiAgICBdLFxuICAgIHVwZGF0ZURpc2N1c3Npb25Jbk9yZzogW1xuICAgICAgXCJQQVRDSCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9XCJcbiAgICBdLFxuICAgIHVwZGF0ZUluT3JnOiBbXCJQQVRDSCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfVwiXVxuICB9LFxuICB1c2Vyczoge1xuICAgIGFkZEVtYWlsRm9yQXV0aGVudGljYXRlZDogW1xuICAgICAgXCJQT1NUIC91c2VyL2VtYWlsc1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwiYWRkRW1haWxGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBhZGRFbWFpbEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJQT1NUIC91c2VyL2VtYWlsc1wiXSxcbiAgICBhZGRTb2NpYWxBY2NvdW50Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBPU1QgL3VzZXIvc29jaWFsX2FjY291bnRzXCJdLFxuICAgIGJsb2NrOiBbXCJQVVQgL3VzZXIvYmxvY2tzL3t1c2VybmFtZX1cIl0sXG4gICAgY2hlY2tCbG9ja2VkOiBbXCJHRVQgL3VzZXIvYmxvY2tzL3t1c2VybmFtZX1cIl0sXG4gICAgY2hlY2tGb2xsb3dpbmdGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZm9sbG93aW5nL3t0YXJnZXRfdXNlcn1cIl0sXG4gICAgY2hlY2tQZXJzb25Jc0ZvbGxvd2VkQnlBdXRoZW50aWNhdGVkOiBbXCJHRVQgL3VzZXIvZm9sbG93aW5nL3t1c2VybmFtZX1cIl0sXG4gICAgY3JlYXRlR3BnS2V5Rm9yQXV0aGVudGljYXRlZDogW1xuICAgICAgXCJQT1NUIC91c2VyL2dwZ19rZXlzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJjcmVhdGVHcGdLZXlGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBjcmVhdGVHcGdLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUE9TVCAvdXNlci9ncGdfa2V5c1wiXSxcbiAgICBjcmVhdGVQdWJsaWNTc2hLZXlGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIlBPU1QgL3VzZXIva2V5c1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwiY3JlYXRlUHVibGljU3NoS2V5Rm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgY3JlYXRlUHVibGljU3NoS2V5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBPU1QgL3VzZXIva2V5c1wiXSxcbiAgICBjcmVhdGVTc2hTaWduaW5nS2V5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBPU1QgL3VzZXIvc3NoX3NpZ25pbmdfa2V5c1wiXSxcbiAgICBkZWxldGVFbWFpbEZvckF1dGhlbnRpY2F0ZWQ6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL2VtYWlsc1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwiZGVsZXRlRW1haWxGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBkZWxldGVFbWFpbEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJERUxFVEUgL3VzZXIvZW1haWxzXCJdLFxuICAgIGRlbGV0ZUdwZ0tleUZvckF1dGhlbnRpY2F0ZWQ6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL2dwZ19rZXlzL3tncGdfa2V5X2lkfVwiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwiZGVsZXRlR3BnS2V5Rm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgZGVsZXRlR3BnS2V5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkRFTEVURSAvdXNlci9ncGdfa2V5cy97Z3BnX2tleV9pZH1cIl0sXG4gICAgZGVsZXRlUHVibGljU3NoS2V5Rm9yQXV0aGVudGljYXRlZDogW1xuICAgICAgXCJERUxFVEUgL3VzZXIva2V5cy97a2V5X2lkfVwiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwiZGVsZXRlUHVibGljU3NoS2V5Rm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgZGVsZXRlUHVibGljU3NoS2V5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkRFTEVURSAvdXNlci9rZXlzL3trZXlfaWR9XCJdLFxuICAgIGRlbGV0ZVNvY2lhbEFjY291bnRGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiREVMRVRFIC91c2VyL3NvY2lhbF9hY2NvdW50c1wiXSxcbiAgICBkZWxldGVTc2hTaWduaW5nS2V5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL3NzaF9zaWduaW5nX2tleXMve3NzaF9zaWduaW5nX2tleV9pZH1cIlxuICAgIF0sXG4gICAgZm9sbG93OiBbXCJQVVQgL3VzZXIvZm9sbG93aW5nL3t1c2VybmFtZX1cIl0sXG4gICAgZ2V0QXV0aGVudGljYXRlZDogW1wiR0VUIC91c2VyXCJdLFxuICAgIGdldEJ5VXNlcm5hbWU6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfVwiXSxcbiAgICBnZXRDb250ZXh0Rm9yVXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L2hvdmVyY2FyZFwiXSxcbiAgICBnZXRHcGdLZXlGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIkdFVCAvdXNlci9ncGdfa2V5cy97Z3BnX2tleV9pZH1cIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJ1c2Vyc1wiLCBcImdldEdwZ0tleUZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGdldEdwZ0tleUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvZ3BnX2tleXMve2dwZ19rZXlfaWR9XCJdLFxuICAgIGdldFB1YmxpY1NzaEtleUZvckF1dGhlbnRpY2F0ZWQ6IFtcbiAgICAgIFwiR0VUIC91c2VyL2tleXMve2tleV9pZH1cIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJ1c2Vyc1wiLCBcImdldFB1YmxpY1NzaEtleUZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGdldFB1YmxpY1NzaEtleUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIva2V5cy97a2V5X2lkfVwiXSxcbiAgICBnZXRTc2hTaWduaW5nS2V5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL3NzaF9zaWduaW5nX2tleXMve3NzaF9zaWduaW5nX2tleV9pZH1cIlxuICAgIF0sXG4gICAgbGlzdDogW1wiR0VUIC91c2Vyc1wiXSxcbiAgICBsaXN0QmxvY2tlZEJ5QXV0aGVudGljYXRlZDogW1xuICAgICAgXCJHRVQgL3VzZXIvYmxvY2tzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJsaXN0QmxvY2tlZEJ5QXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgbGlzdEJsb2NrZWRCeUF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvYmxvY2tzXCJdLFxuICAgIGxpc3RFbWFpbHNGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIkdFVCAvdXNlci9lbWFpbHNcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJ1c2Vyc1wiLCBcImxpc3RFbWFpbHNGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBsaXN0RW1haWxzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9lbWFpbHNcIl0sXG4gICAgbGlzdEZvbGxvd2VkQnlBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIkdFVCAvdXNlci9mb2xsb3dpbmdcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJ1c2Vyc1wiLCBcImxpc3RGb2xsb3dlZEJ5QXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgbGlzdEZvbGxvd2VkQnlBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL2ZvbGxvd2luZ1wiXSxcbiAgICBsaXN0Rm9sbG93ZXJzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9mb2xsb3dlcnNcIl0sXG4gICAgbGlzdEZvbGxvd2Vyc0ZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9mb2xsb3dlcnNcIl0sXG4gICAgbGlzdEZvbGxvd2luZ0ZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9mb2xsb3dpbmdcIl0sXG4gICAgbGlzdEdwZ0tleXNGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIkdFVCAvdXNlci9ncGdfa2V5c1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwibGlzdEdwZ0tleXNGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBsaXN0R3BnS2V5c0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvZ3BnX2tleXNcIl0sXG4gICAgbGlzdEdwZ0tleXNGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZ3BnX2tleXNcIl0sXG4gICAgbGlzdFB1YmxpY0VtYWlsc0ZvckF1dGhlbnRpY2F0ZWQ6IFtcbiAgICAgIFwiR0VUIC91c2VyL3B1YmxpY19lbWFpbHNcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJ1c2Vyc1wiLCBcImxpc3RQdWJsaWNFbWFpbHNGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBsaXN0UHVibGljRW1haWxzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9wdWJsaWNfZW1haWxzXCJdLFxuICAgIGxpc3RQdWJsaWNLZXlzRm9yVXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L2tleXNcIl0sXG4gICAgbGlzdFB1YmxpY1NzaEtleXNGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIkdFVCAvdXNlci9rZXlzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJsaXN0UHVibGljU3NoS2V5c0ZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGxpc3RQdWJsaWNTc2hLZXlzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9rZXlzXCJdLFxuICAgIGxpc3RTb2NpYWxBY2NvdW50c0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvc29jaWFsX2FjY291bnRzXCJdLFxuICAgIGxpc3RTb2NpYWxBY2NvdW50c0ZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9zb2NpYWxfYWNjb3VudHNcIl0sXG4gICAgbGlzdFNzaFNpZ25pbmdLZXlzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9zc2hfc2lnbmluZ19rZXlzXCJdLFxuICAgIGxpc3RTc2hTaWduaW5nS2V5c0ZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9zc2hfc2lnbmluZ19rZXlzXCJdLFxuICAgIHNldFByaW1hcnlFbWFpbFZpc2liaWxpdHlGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIlBBVENIIC91c2VyL2VtYWlsL3Zpc2liaWxpdHlcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJ1c2Vyc1wiLCBcInNldFByaW1hcnlFbWFpbFZpc2liaWxpdHlGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBzZXRQcmltYXJ5RW1haWxWaXNpYmlsaXR5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiUEFUQ0ggL3VzZXIvZW1haWwvdmlzaWJpbGl0eVwiXG4gICAgXSxcbiAgICB1bmJsb2NrOiBbXCJERUxFVEUgL3VzZXIvYmxvY2tzL3t1c2VybmFtZX1cIl0sXG4gICAgdW5mb2xsb3c6IFtcIkRFTEVURSAvdXNlci9mb2xsb3dpbmcve3VzZXJuYW1lfVwiXSxcbiAgICB1cGRhdGVBdXRoZW50aWNhdGVkOiBbXCJQQVRDSCAvdXNlclwiXVxuICB9XG59O1xudmFyIGVuZHBvaW50c19kZWZhdWx0ID0gRW5kcG9pbnRzO1xuXG4vLyBwa2cvZGlzdC1zcmMvZW5kcG9pbnRzLXRvLW1ldGhvZHMuanNcbnZhciBlbmRwb2ludE1ldGhvZHNNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuZm9yIChjb25zdCBbc2NvcGUsIGVuZHBvaW50c10gb2YgT2JqZWN0LmVudHJpZXMoZW5kcG9pbnRzX2RlZmF1bHQpKSB7XG4gIGZvciAoY29uc3QgW21ldGhvZE5hbWUsIGVuZHBvaW50XSBvZiBPYmplY3QuZW50cmllcyhlbmRwb2ludHMpKSB7XG4gICAgY29uc3QgW3JvdXRlLCBkZWZhdWx0cywgZGVjb3JhdGlvbnNdID0gZW5kcG9pbnQ7XG4gICAgY29uc3QgW21ldGhvZCwgdXJsXSA9IHJvdXRlLnNwbGl0KC8gLyk7XG4gICAgY29uc3QgZW5kcG9pbnREZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgdXJsXG4gICAgICB9LFxuICAgICAgZGVmYXVsdHNcbiAgICApO1xuICAgIGlmICghZW5kcG9pbnRNZXRob2RzTWFwLmhhcyhzY29wZSkpIHtcbiAgICAgIGVuZHBvaW50TWV0aG9kc01hcC5zZXQoc2NvcGUsIC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCkpO1xuICAgIH1cbiAgICBlbmRwb2ludE1ldGhvZHNNYXAuZ2V0KHNjb3BlKS5zZXQobWV0aG9kTmFtZSwge1xuICAgICAgc2NvcGUsXG4gICAgICBtZXRob2ROYW1lLFxuICAgICAgZW5kcG9pbnREZWZhdWx0cyxcbiAgICAgIGRlY29yYXRpb25zXG4gICAgfSk7XG4gIH1cbn1cbnZhciBoYW5kbGVyID0ge1xuICBoYXMoeyBzY29wZSB9LCBtZXRob2ROYW1lKSB7XG4gICAgcmV0dXJuIGVuZHBvaW50TWV0aG9kc01hcC5nZXQoc2NvcGUpLmhhcyhtZXRob2ROYW1lKTtcbiAgfSxcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgbWV0aG9kTmFtZSkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdGhpcy5nZXQodGFyZ2V0LCBtZXRob2ROYW1lKSxcbiAgICAgIC8vIGVuc3VyZXMgbWV0aG9kIGlzIGluIHRoZSBjYWNoZVxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfTtcbiAgfSxcbiAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBtZXRob2ROYW1lLCBkZXNjcmlwdG9yKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldC5jYWNoZSwgbWV0aG9kTmFtZSwgZGVzY3JpcHRvcik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwgbWV0aG9kTmFtZSkge1xuICAgIGRlbGV0ZSB0YXJnZXQuY2FjaGVbbWV0aG9kTmFtZV07XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIG93bktleXMoeyBzY29wZSB9KSB7XG4gICAgcmV0dXJuIFsuLi5lbmRwb2ludE1ldGhvZHNNYXAuZ2V0KHNjb3BlKS5rZXlzKCldO1xuICB9LFxuICBzZXQodGFyZ2V0LCBtZXRob2ROYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiB0YXJnZXQuY2FjaGVbbWV0aG9kTmFtZV0gPSB2YWx1ZTtcbiAgfSxcbiAgZ2V0KHsgb2N0b2tpdCwgc2NvcGUsIGNhY2hlIH0sIG1ldGhvZE5hbWUpIHtcbiAgICBpZiAoY2FjaGVbbWV0aG9kTmFtZV0pIHtcbiAgICAgIHJldHVybiBjYWNoZVttZXRob2ROYW1lXTtcbiAgICB9XG4gICAgY29uc3QgbWV0aG9kID0gZW5kcG9pbnRNZXRob2RzTWFwLmdldChzY29wZSkuZ2V0KG1ldGhvZE5hbWUpO1xuICAgIGlmICghbWV0aG9kKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICBjb25zdCB7IGVuZHBvaW50RGVmYXVsdHMsIGRlY29yYXRpb25zIH0gPSBtZXRob2Q7XG4gICAgaWYgKGRlY29yYXRpb25zKSB7XG4gICAgICBjYWNoZVttZXRob2ROYW1lXSA9IGRlY29yYXRlKFxuICAgICAgICBvY3Rva2l0LFxuICAgICAgICBzY29wZSxcbiAgICAgICAgbWV0aG9kTmFtZSxcbiAgICAgICAgZW5kcG9pbnREZWZhdWx0cyxcbiAgICAgICAgZGVjb3JhdGlvbnNcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlW21ldGhvZE5hbWVdID0gb2N0b2tpdC5yZXF1ZXN0LmRlZmF1bHRzKGVuZHBvaW50RGVmYXVsdHMpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVbbWV0aG9kTmFtZV07XG4gIH1cbn07XG5mdW5jdGlvbiBlbmRwb2ludHNUb01ldGhvZHMob2N0b2tpdCkge1xuICBjb25zdCBuZXdNZXRob2RzID0ge307XG4gIGZvciAoY29uc3Qgc2NvcGUgb2YgZW5kcG9pbnRNZXRob2RzTWFwLmtleXMoKSkge1xuICAgIG5ld01ldGhvZHNbc2NvcGVdID0gbmV3IFByb3h5KHsgb2N0b2tpdCwgc2NvcGUsIGNhY2hlOiB7fSB9LCBoYW5kbGVyKTtcbiAgfVxuICByZXR1cm4gbmV3TWV0aG9kcztcbn1cbmZ1bmN0aW9uIGRlY29yYXRlKG9jdG9raXQsIHNjb3BlLCBtZXRob2ROYW1lLCBkZWZhdWx0cywgZGVjb3JhdGlvbnMpIHtcbiAgY29uc3QgcmVxdWVzdFdpdGhEZWZhdWx0cyA9IG9jdG9raXQucmVxdWVzdC5kZWZhdWx0cyhkZWZhdWx0cyk7XG4gIGZ1bmN0aW9uIHdpdGhEZWNvcmF0aW9ucyguLi5hcmdzKSB7XG4gICAgbGV0IG9wdGlvbnMgPSByZXF1ZXN0V2l0aERlZmF1bHRzLmVuZHBvaW50Lm1lcmdlKC4uLmFyZ3MpO1xuICAgIGlmIChkZWNvcmF0aW9ucy5tYXBUb0RhdGEpIHtcbiAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7XG4gICAgICAgIGRhdGE6IG9wdGlvbnNbZGVjb3JhdGlvbnMubWFwVG9EYXRhXSxcbiAgICAgICAgW2RlY29yYXRpb25zLm1hcFRvRGF0YV06IHZvaWQgMFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVxdWVzdFdpdGhEZWZhdWx0cyhvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKGRlY29yYXRpb25zLnJlbmFtZWQpIHtcbiAgICAgIGNvbnN0IFtuZXdTY29wZSwgbmV3TWV0aG9kTmFtZV0gPSBkZWNvcmF0aW9ucy5yZW5hbWVkO1xuICAgICAgb2N0b2tpdC5sb2cud2FybihcbiAgICAgICAgYG9jdG9raXQuJHtzY29wZX0uJHttZXRob2ROYW1lfSgpIGhhcyBiZWVuIHJlbmFtZWQgdG8gb2N0b2tpdC4ke25ld1Njb3BlfS4ke25ld01ldGhvZE5hbWV9KClgXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZGVjb3JhdGlvbnMuZGVwcmVjYXRlZCkge1xuICAgICAgb2N0b2tpdC5sb2cud2FybihkZWNvcmF0aW9ucy5kZXByZWNhdGVkKTtcbiAgICB9XG4gICAgaWYgKGRlY29yYXRpb25zLnJlbmFtZWRQYXJhbWV0ZXJzKSB7XG4gICAgICBjb25zdCBvcHRpb25zMiA9IHJlcXVlc3RXaXRoRGVmYXVsdHMuZW5kcG9pbnQubWVyZ2UoLi4uYXJncyk7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCBhbGlhc10gb2YgT2JqZWN0LmVudHJpZXMoXG4gICAgICAgIGRlY29yYXRpb25zLnJlbmFtZWRQYXJhbWV0ZXJzXG4gICAgICApKSB7XG4gICAgICAgIGlmIChuYW1lIGluIG9wdGlvbnMyKSB7XG4gICAgICAgICAgb2N0b2tpdC5sb2cud2FybihcbiAgICAgICAgICAgIGBcIiR7bmFtZX1cIiBwYXJhbWV0ZXIgaXMgZGVwcmVjYXRlZCBmb3IgXCJvY3Rva2l0LiR7c2NvcGV9LiR7bWV0aG9kTmFtZX0oKVwiLiBVc2UgXCIke2FsaWFzfVwiIGluc3RlYWRgXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoIShhbGlhcyBpbiBvcHRpb25zMikpIHtcbiAgICAgICAgICAgIG9wdGlvbnMyW2FsaWFzXSA9IG9wdGlvbnMyW25hbWVdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWxldGUgb3B0aW9uczJbbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXF1ZXN0V2l0aERlZmF1bHRzKG9wdGlvbnMyKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcXVlc3RXaXRoRGVmYXVsdHMoLi4uYXJncyk7XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24od2l0aERlY29yYXRpb25zLCByZXF1ZXN0V2l0aERlZmF1bHRzKTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL2luZGV4LmpzXG5mdW5jdGlvbiByZXN0RW5kcG9pbnRNZXRob2RzKG9jdG9raXQpIHtcbiAgY29uc3QgYXBpID0gZW5kcG9pbnRzVG9NZXRob2RzKG9jdG9raXQpO1xuICByZXR1cm4ge1xuICAgIHJlc3Q6IGFwaVxuICB9O1xufVxucmVzdEVuZHBvaW50TWV0aG9kcy5WRVJTSU9OID0gVkVSU0lPTjtcbmZ1bmN0aW9uIGxlZ2FjeVJlc3RFbmRwb2ludE1ldGhvZHMob2N0b2tpdCkge1xuICBjb25zdCBhcGkgPSBlbmRwb2ludHNUb01ldGhvZHMob2N0b2tpdCk7XG4gIHJldHVybiB7XG4gICAgLi4uYXBpLFxuICAgIHJlc3Q6IGFwaVxuICB9O1xufVxubGVnYWN5UmVzdEVuZHBvaW50TWV0aG9kcy5WRVJTSU9OID0gVkVSU0lPTjtcbi8vIEFubm90YXRlIHRoZSBDb21tb25KUyBleHBvcnQgbmFtZXMgZm9yIEVTTSBpbXBvcnQgaW4gbm9kZTpcbjAgJiYgKG1vZHVsZS5leHBvcnRzID0ge1xuICBsZWdhY3lSZXN0RW5kcG9pbnRNZXRob2RzLFxuICByZXN0RW5kcG9pbnRNZXRob2RzXG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19leHBvcnQgPSAodGFyZ2V0LCBhbGwpID0+IHtcbiAgZm9yICh2YXIgbmFtZSBpbiBhbGwpXG4gICAgX19kZWZQcm9wKHRhcmdldCwgbmFtZSwgeyBnZXQ6IGFsbFtuYW1lXSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbn07XG52YXIgX19jb3B5UHJvcHMgPSAodG8sIGZyb20sIGV4Y2VwdCwgZGVzYykgPT4ge1xuICBpZiAoZnJvbSAmJiB0eXBlb2YgZnJvbSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20pKVxuICAgICAgaWYgKCFfX2hhc093blByb3AuY2FsbCh0bywga2V5KSAmJiBrZXkgIT09IGV4Y2VwdClcbiAgICAgICAgX19kZWZQcm9wKHRvLCBrZXksIHsgZ2V0OiAoKSA9PiBmcm9tW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MoZnJvbSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0bztcbn07XG52YXIgX190b0NvbW1vbkpTID0gKG1vZCkgPT4gX19jb3B5UHJvcHMoX19kZWZQcm9wKHt9LCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KSwgbW9kKTtcblxuLy8gcGtnL2Rpc3Qtc3JjL2luZGV4LmpzXG52YXIgZGlzdF9zcmNfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQoZGlzdF9zcmNfZXhwb3J0cywge1xuICBjb21wb3NlUGFnaW5hdGVSZXN0OiAoKSA9PiBjb21wb3NlUGFnaW5hdGVSZXN0LFxuICBpc1BhZ2luYXRpbmdFbmRwb2ludDogKCkgPT4gaXNQYWdpbmF0aW5nRW5kcG9pbnQsXG4gIHBhZ2luYXRlUmVzdDogKCkgPT4gcGFnaW5hdGVSZXN0LFxuICBwYWdpbmF0aW5nRW5kcG9pbnRzOiAoKSA9PiBwYWdpbmF0aW5nRW5kcG9pbnRzXG59KTtcbm1vZHVsZS5leHBvcnRzID0gX190b0NvbW1vbkpTKGRpc3Rfc3JjX2V4cG9ydHMpO1xuXG4vLyBwa2cvZGlzdC1zcmMvdmVyc2lvbi5qc1xudmFyIFZFUlNJT04gPSBcIjkuMi4yXCI7XG5cbi8vIHBrZy9kaXN0LXNyYy9ub3JtYWxpemUtcGFnaW5hdGVkLWxpc3QtcmVzcG9uc2UuanNcbmZ1bmN0aW9uIG5vcm1hbGl6ZVBhZ2luYXRlZExpc3RSZXNwb25zZShyZXNwb25zZSkge1xuICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4ucmVzcG9uc2UsXG4gICAgICBkYXRhOiBbXVxuICAgIH07XG4gIH1cbiAgY29uc3QgcmVzcG9uc2VOZWVkc05vcm1hbGl6YXRpb24gPSBcInRvdGFsX2NvdW50XCIgaW4gcmVzcG9uc2UuZGF0YSAmJiAhKFwidXJsXCIgaW4gcmVzcG9uc2UuZGF0YSk7XG4gIGlmICghcmVzcG9uc2VOZWVkc05vcm1hbGl6YXRpb24pXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICBjb25zdCBpbmNvbXBsZXRlUmVzdWx0cyA9IHJlc3BvbnNlLmRhdGEuaW5jb21wbGV0ZV9yZXN1bHRzO1xuICBjb25zdCByZXBvc2l0b3J5U2VsZWN0aW9uID0gcmVzcG9uc2UuZGF0YS5yZXBvc2l0b3J5X3NlbGVjdGlvbjtcbiAgY29uc3QgdG90YWxDb3VudCA9IHJlc3BvbnNlLmRhdGEudG90YWxfY291bnQ7XG4gIGRlbGV0ZSByZXNwb25zZS5kYXRhLmluY29tcGxldGVfcmVzdWx0cztcbiAgZGVsZXRlIHJlc3BvbnNlLmRhdGEucmVwb3NpdG9yeV9zZWxlY3Rpb247XG4gIGRlbGV0ZSByZXNwb25zZS5kYXRhLnRvdGFsX2NvdW50O1xuICBjb25zdCBuYW1lc3BhY2VLZXkgPSBPYmplY3Qua2V5cyhyZXNwb25zZS5kYXRhKVswXTtcbiAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmRhdGFbbmFtZXNwYWNlS2V5XTtcbiAgcmVzcG9uc2UuZGF0YSA9IGRhdGE7XG4gIGlmICh0eXBlb2YgaW5jb21wbGV0ZVJlc3VsdHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXNwb25zZS5kYXRhLmluY29tcGxldGVfcmVzdWx0cyA9IGluY29tcGxldGVSZXN1bHRzO1xuICB9XG4gIGlmICh0eXBlb2YgcmVwb3NpdG9yeVNlbGVjdGlvbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJlc3BvbnNlLmRhdGEucmVwb3NpdG9yeV9zZWxlY3Rpb24gPSByZXBvc2l0b3J5U2VsZWN0aW9uO1xuICB9XG4gIHJlc3BvbnNlLmRhdGEudG90YWxfY291bnQgPSB0b3RhbENvdW50O1xuICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9pdGVyYXRvci5qc1xuZnVuY3Rpb24gaXRlcmF0b3Iob2N0b2tpdCwgcm91dGUsIHBhcmFtZXRlcnMpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IHR5cGVvZiByb3V0ZSA9PT0gXCJmdW5jdGlvblwiID8gcm91dGUuZW5kcG9pbnQocGFyYW1ldGVycykgOiBvY3Rva2l0LnJlcXVlc3QuZW5kcG9pbnQocm91dGUsIHBhcmFtZXRlcnMpO1xuICBjb25zdCByZXF1ZXN0TWV0aG9kID0gdHlwZW9mIHJvdXRlID09PSBcImZ1bmN0aW9uXCIgPyByb3V0ZSA6IG9jdG9raXQucmVxdWVzdDtcbiAgY29uc3QgbWV0aG9kID0gb3B0aW9ucy5tZXRob2Q7XG4gIGNvbnN0IGhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnM7XG4gIGxldCB1cmwgPSBvcHRpb25zLnVybDtcbiAgcmV0dXJuIHtcbiAgICBbU3ltYm9sLmFzeW5jSXRlcmF0b3JdOiAoKSA9PiAoe1xuICAgICAgYXN5bmMgbmV4dCgpIHtcbiAgICAgICAgaWYgKCF1cmwpXG4gICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdE1ldGhvZCh7IG1ldGhvZCwgdXJsLCBoZWFkZXJzIH0pO1xuICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVBhZ2luYXRlZExpc3RSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgdXJsID0gKChub3JtYWxpemVkUmVzcG9uc2UuaGVhZGVycy5saW5rIHx8IFwiXCIpLm1hdGNoKFxuICAgICAgICAgICAgLzwoW148Pl0rKT47XFxzKnJlbD1cIm5leHRcIi9cbiAgICAgICAgICApIHx8IFtdKVsxXTtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbm9ybWFsaXplZFJlc3BvbnNlIH07XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyAhPT0gNDA5KVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgdXJsID0gXCJcIjtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9O1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvcGFnaW5hdGUuanNcbmZ1bmN0aW9uIHBhZ2luYXRlKG9jdG9raXQsIHJvdXRlLCBwYXJhbWV0ZXJzLCBtYXBGbikge1xuICBpZiAodHlwZW9mIHBhcmFtZXRlcnMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIG1hcEZuID0gcGFyYW1ldGVycztcbiAgICBwYXJhbWV0ZXJzID0gdm9pZCAwO1xuICB9XG4gIHJldHVybiBnYXRoZXIoXG4gICAgb2N0b2tpdCxcbiAgICBbXSxcbiAgICBpdGVyYXRvcihvY3Rva2l0LCByb3V0ZSwgcGFyYW1ldGVycylbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCksXG4gICAgbWFwRm5cbiAgKTtcbn1cbmZ1bmN0aW9uIGdhdGhlcihvY3Rva2l0LCByZXN1bHRzLCBpdGVyYXRvcjIsIG1hcEZuKSB7XG4gIHJldHVybiBpdGVyYXRvcjIubmV4dCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIGlmIChyZXN1bHQuZG9uZSkge1xuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIGxldCBlYXJseUV4aXQgPSBmYWxzZTtcbiAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgZWFybHlFeGl0ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KFxuICAgICAgbWFwRm4gPyBtYXBGbihyZXN1bHQudmFsdWUsIGRvbmUpIDogcmVzdWx0LnZhbHVlLmRhdGFcbiAgICApO1xuICAgIGlmIChlYXJseUV4aXQpIHtcbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICByZXR1cm4gZ2F0aGVyKG9jdG9raXQsIHJlc3VsdHMsIGl0ZXJhdG9yMiwgbWFwRm4pO1xuICB9KTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL2NvbXBvc2UtcGFnaW5hdGUuanNcbnZhciBjb21wb3NlUGFnaW5hdGVSZXN0ID0gT2JqZWN0LmFzc2lnbihwYWdpbmF0ZSwge1xuICBpdGVyYXRvclxufSk7XG5cbi8vIHBrZy9kaXN0LXNyYy9nZW5lcmF0ZWQvcGFnaW5hdGluZy1lbmRwb2ludHMuanNcbnZhciBwYWdpbmF0aW5nRW5kcG9pbnRzID0gW1xuICBcIkdFVCAvYWR2aXNvcmllc1wiLFxuICBcIkdFVCAvYXBwL2hvb2svZGVsaXZlcmllc1wiLFxuICBcIkdFVCAvYXBwL2luc3RhbGxhdGlvbi1yZXF1ZXN0c1wiLFxuICBcIkdFVCAvYXBwL2luc3RhbGxhdGlvbnNcIixcbiAgXCJHRVQgL2Fzc2lnbm1lbnRzL3thc3NpZ25tZW50X2lkfS9hY2NlcHRlZF9hc3NpZ25tZW50c1wiLFxuICBcIkdFVCAvY2xhc3Nyb29tc1wiLFxuICBcIkdFVCAvY2xhc3Nyb29tcy97Y2xhc3Nyb29tX2lkfS9hc3NpZ25tZW50c1wiLFxuICBcIkdFVCAvZW50ZXJwcmlzZXMve2VudGVycHJpc2V9L2RlcGVuZGFib3QvYWxlcnRzXCIsXG4gIFwiR0VUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vc2VjcmV0LXNjYW5uaW5nL2FsZXJ0c1wiLFxuICBcIkdFVCAvZXZlbnRzXCIsXG4gIFwiR0VUIC9naXN0c1wiLFxuICBcIkdFVCAvZ2lzdHMvcHVibGljXCIsXG4gIFwiR0VUIC9naXN0cy9zdGFycmVkXCIsXG4gIFwiR0VUIC9naXN0cy97Z2lzdF9pZH0vY29tbWVudHNcIixcbiAgXCJHRVQgL2dpc3RzL3tnaXN0X2lkfS9jb21taXRzXCIsXG4gIFwiR0VUIC9naXN0cy97Z2lzdF9pZH0vZm9ya3NcIixcbiAgXCJHRVQgL2luc3RhbGxhdGlvbi9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL2lzc3Vlc1wiLFxuICBcIkdFVCAvbGljZW5zZXNcIixcbiAgXCJHRVQgL21hcmtldHBsYWNlX2xpc3RpbmcvcGxhbnNcIixcbiAgXCJHRVQgL21hcmtldHBsYWNlX2xpc3RpbmcvcGxhbnMve3BsYW5faWR9L2FjY291bnRzXCIsXG4gIFwiR0VUIC9tYXJrZXRwbGFjZV9saXN0aW5nL3N0dWJiZWQvcGxhbnNcIixcbiAgXCJHRVQgL21hcmtldHBsYWNlX2xpc3Rpbmcvc3R1YmJlZC9wbGFucy97cGxhbl9pZH0vYWNjb3VudHNcIixcbiAgXCJHRVQgL25ldHdvcmtzL3tvd25lcn0ve3JlcG99L2V2ZW50c1wiLFxuICBcIkdFVCAvbm90aWZpY2F0aW9uc1wiLFxuICBcIkdFVCAvb3JnYW5pemF0aW9uc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL2NhY2hlL3VzYWdlLWJ5LXJlcG9zaXRvcnlcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9wZXJtaXNzaW9ucy9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9ydW5uZXJzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvc2VjcmV0c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy92YXJpYWJsZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy92YXJpYWJsZXMve25hbWV9L3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9ibG9ja3NcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vY29kZS1zY2FubmluZy9hbGVydHNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vY29kZXNwYWNlc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9jb2Rlc3BhY2VzL3NlY3JldHNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2NvcGlsb3QvYmlsbGluZy9zZWF0c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9kZXBlbmRhYm90L2FsZXJ0c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9kZXBlbmRhYm90L3NlY3JldHNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vZGVwZW5kYWJvdC9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2V2ZW50c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9mYWlsZWRfaW52aXRhdGlvbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vaG9va3NcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vaG9va3Mve2hvb2tfaWR9L2RlbGl2ZXJpZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vaW5zdGFsbGF0aW9uc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9pbnZpdGF0aW9uc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9pbnZpdGF0aW9ucy97aW52aXRhdGlvbl9pZH0vdGVhbXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vaXNzdWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L21lbWJlcnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vbWVtYmVycy97dXNlcm5hbWV9L2NvZGVzcGFjZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vbWlncmF0aW9uc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMve3JvbGVfaWR9L3RlYW1zXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlcy97cm9sZV9pZH0vdXNlcnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vb3V0c2lkZV9jb2xsYWJvcmF0b3JzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3BhY2thZ2VzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3BlcnNvbmFsLWFjY2Vzcy10b2tlbi1yZXF1ZXN0c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW4tcmVxdWVzdHMve3BhdF9yZXF1ZXN0X2lkfS9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcGVyc29uYWwtYWNjZXNzLXRva2Vuc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW5zL3twYXRfaWR9L3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9wcm9qZWN0c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9wcm9wZXJ0aWVzL3ZhbHVlc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9wdWJsaWNfbWVtYmVyc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9yZXBvc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9ydWxlc2V0c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9ydWxlc2V0cy9ydWxlLXN1aXRlc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9zZWNyZXQtc2Nhbm5pbmcvYWxlcnRzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3NlY3VyaXR5LWFkdmlzb3JpZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9jb21tZW50c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L2NvbW1lbnRzL3tjb21tZW50X251bWJlcn0vcmVhY3Rpb25zXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vcmVhY3Rpb25zXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2ludml0YXRpb25zXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L21lbWJlcnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vcHJvamVjdHNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vcmVwb3NcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vdGVhbXNcIixcbiAgXCJHRVQgL3Byb2plY3RzL2NvbHVtbnMve2NvbHVtbl9pZH0vY2FyZHNcIixcbiAgXCJHRVQgL3Byb2plY3RzL3twcm9qZWN0X2lkfS9jb2xsYWJvcmF0b3JzXCIsXG4gIFwiR0VUIC9wcm9qZWN0cy97cHJvamVjdF9pZH0vY29sdW1uc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9hcnRpZmFjdHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvY2FjaGVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL29yZ2FuaXphdGlvbi1zZWNyZXRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL29yZ2FuaXphdGlvbi12YXJpYWJsZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVyc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vYXJ0aWZhY3RzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vYXR0ZW1wdHMve2F0dGVtcHRfbnVtYmVyfS9qb2JzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vam9ic1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9zZWNyZXRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3ZhcmlhYmxlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy93b3JrZmxvd3NcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvd29ya2Zsb3dzL3t3b3JrZmxvd19pZH0vcnVuc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aXZpdHlcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Fzc2lnbmVlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NoZWNrLXJ1bnMve2NoZWNrX3J1bl9pZH0vYW5ub3RhdGlvbnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NoZWNrLXN1aXRlcy97Y2hlY2tfc3VpdGVfaWR9L2NoZWNrLXJ1bnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvYWxlcnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL2FsZXJ0cy97YWxlcnRfbnVtYmVyfS9pbnN0YW5jZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvYW5hbHlzZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVzcGFjZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVzcGFjZXMvZGV2Y29udGFpbmVyc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlcy9zZWNyZXRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2xsYWJvcmF0b3JzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21tZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWVudHMve2NvbW1lbnRfaWR9L3JlYWN0aW9uc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97Y29tbWl0X3NoYX0vY29tbWVudHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve2NvbW1pdF9zaGF9L3B1bGxzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tyZWZ9L2NoZWNrLXJ1bnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve3JlZn0vY2hlY2stc3VpdGVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tyZWZ9L3N0YXR1c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97cmVmfS9zdGF0dXNlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29udHJpYnV0b3JzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRhYm90L2FsZXJ0c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwZW5kYWJvdC9zZWNyZXRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBsb3ltZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwbG95bWVudHMve2RlcGxveW1lbnRfaWR9L3N0YXR1c2VzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vZGVwbG95bWVudC1icmFuY2gtcG9saWNpZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vZGVwbG95bWVudF9wcm90ZWN0aW9uX3J1bGVzL2FwcHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2V2ZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZm9ya3NcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ob29rcy97aG9va19pZH0vZGVsaXZlcmllc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaW52aXRhdGlvbnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL2NvbW1lbnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvY29tbWVudHMve2NvbW1lbnRfaWR9L3JlYWN0aW9uc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL2V2ZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2NvbW1lbnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vZXZlbnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vbGFiZWxzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vcmVhY3Rpb25zXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vdGltZWxpbmVcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2tleXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2xhYmVsc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vbWlsZXN0b25lc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vbWlsZXN0b25lcy97bWlsZXN0b25lX251bWJlcn0vbGFiZWxzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ub3RpZmljYXRpb25zXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlcy9idWlsZHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3Byb2plY3RzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxsc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMvY29tbWVudHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL2NvbW1lbnRzL3tjb21tZW50X2lkfS9yZWFjdGlvbnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vY29tbWVudHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vY29tbWl0c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9maWxlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9yZXZpZXdzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3Jldmlld3Mve3Jldmlld19pZH0vY29tbWVudHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy97cmVsZWFzZV9pZH0vYXNzZXRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy97cmVsZWFzZV9pZH0vcmVhY3Rpb25zXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ydWxlcy9icmFuY2hlcy97YnJhbmNofVwiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXNldHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzZXRzL3J1bGUtc3VpdGVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWNyZXQtc2Nhbm5pbmcvYWxlcnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWNyZXQtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9L2xvY2F0aW9uc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjdXJpdHktYWR2aXNvcmllc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3RhcmdhemVyc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3Vic2NyaWJlcnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RhZ3NcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RlYW1zXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS90b3BpY3NcIixcbiAgXCJHRVQgL3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3NlY3JldHNcIixcbiAgXCJHRVQgL3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH0vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS92YXJpYWJsZXNcIixcbiAgXCJHRVQgL3NlYXJjaC9jb2RlXCIsXG4gIFwiR0VUIC9zZWFyY2gvY29tbWl0c1wiLFxuICBcIkdFVCAvc2VhcmNoL2lzc3Vlc1wiLFxuICBcIkdFVCAvc2VhcmNoL2xhYmVsc1wiLFxuICBcIkdFVCAvc2VhcmNoL3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvc2VhcmNoL3RvcGljc1wiLFxuICBcIkdFVCAvc2VhcmNoL3VzZXJzXCIsXG4gIFwiR0VUIC90ZWFtcy97dGVhbV9pZH0vZGlzY3Vzc2lvbnNcIixcbiAgXCJHRVQgL3RlYW1zL3t0ZWFtX2lkfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L2NvbW1lbnRzXCIsXG4gIFwiR0VUIC90ZWFtcy97dGVhbV9pZH0vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9jb21tZW50cy97Y29tbWVudF9udW1iZXJ9L3JlYWN0aW9uc1wiLFxuICBcIkdFVCAvdGVhbXMve3RlYW1faWR9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vcmVhY3Rpb25zXCIsXG4gIFwiR0VUIC90ZWFtcy97dGVhbV9pZH0vaW52aXRhdGlvbnNcIixcbiAgXCJHRVQgL3RlYW1zL3t0ZWFtX2lkfS9tZW1iZXJzXCIsXG4gIFwiR0VUIC90ZWFtcy97dGVhbV9pZH0vcHJvamVjdHNcIixcbiAgXCJHRVQgL3RlYW1zL3t0ZWFtX2lkfS9yZXBvc1wiLFxuICBcIkdFVCAvdGVhbXMve3RlYW1faWR9L3RlYW1zXCIsXG4gIFwiR0VUIC91c2VyL2Jsb2Nrc1wiLFxuICBcIkdFVCAvdXNlci9jb2Rlc3BhY2VzXCIsXG4gIFwiR0VUIC91c2VyL2NvZGVzcGFjZXMvc2VjcmV0c1wiLFxuICBcIkdFVCAvdXNlci9lbWFpbHNcIixcbiAgXCJHRVQgL3VzZXIvZm9sbG93ZXJzXCIsXG4gIFwiR0VUIC91c2VyL2ZvbGxvd2luZ1wiLFxuICBcIkdFVCAvdXNlci9ncGdfa2V5c1wiLFxuICBcIkdFVCAvdXNlci9pbnN0YWxsYXRpb25zXCIsXG4gIFwiR0VUIC91c2VyL2luc3RhbGxhdGlvbnMve2luc3RhbGxhdGlvbl9pZH0vcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC91c2VyL2lzc3Vlc1wiLFxuICBcIkdFVCAvdXNlci9rZXlzXCIsXG4gIFwiR0VUIC91c2VyL21hcmtldHBsYWNlX3B1cmNoYXNlc1wiLFxuICBcIkdFVCAvdXNlci9tYXJrZXRwbGFjZV9wdXJjaGFzZXMvc3R1YmJlZFwiLFxuICBcIkdFVCAvdXNlci9tZW1iZXJzaGlwcy9vcmdzXCIsXG4gIFwiR0VUIC91c2VyL21pZ3JhdGlvbnNcIixcbiAgXCJHRVQgL3VzZXIvbWlncmF0aW9ucy97bWlncmF0aW9uX2lkfS9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL3VzZXIvb3Jnc1wiLFxuICBcIkdFVCAvdXNlci9wYWNrYWdlc1wiLFxuICBcIkdFVCAvdXNlci9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9uc1wiLFxuICBcIkdFVCAvdXNlci9wdWJsaWNfZW1haWxzXCIsXG4gIFwiR0VUIC91c2VyL3JlcG9zXCIsXG4gIFwiR0VUIC91c2VyL3JlcG9zaXRvcnlfaW52aXRhdGlvbnNcIixcbiAgXCJHRVQgL3VzZXIvc29jaWFsX2FjY291bnRzXCIsXG4gIFwiR0VUIC91c2VyL3NzaF9zaWduaW5nX2tleXNcIixcbiAgXCJHRVQgL3VzZXIvc3RhcnJlZFwiLFxuICBcIkdFVCAvdXNlci9zdWJzY3JpcHRpb25zXCIsXG4gIFwiR0VUIC91c2VyL3RlYW1zXCIsXG4gIFwiR0VUIC91c2Vyc1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9ldmVudHNcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZXZlbnRzL29yZ3Mve29yZ31cIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZXZlbnRzL3B1YmxpY1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9mb2xsb3dlcnNcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZm9sbG93aW5nXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L2dpc3RzXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L2dwZ19rZXlzXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L2tleXNcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vb3Jnc1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wYWNrYWdlc1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wcm9qZWN0c1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9yZWNlaXZlZF9ldmVudHNcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcmVjZWl2ZWRfZXZlbnRzL3B1YmxpY1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9yZXBvc1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9zb2NpYWxfYWNjb3VudHNcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vc3NoX3NpZ25pbmdfa2V5c1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9zdGFycmVkXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3N1YnNjcmlwdGlvbnNcIlxuXTtcblxuLy8gcGtnL2Rpc3Qtc3JjL3BhZ2luYXRpbmctZW5kcG9pbnRzLmpzXG5mdW5jdGlvbiBpc1BhZ2luYXRpbmdFbmRwb2ludChhcmcpIHtcbiAgaWYgKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gcGFnaW5hdGluZ0VuZHBvaW50cy5pbmNsdWRlcyhhcmcpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbmZ1bmN0aW9uIHBhZ2luYXRlUmVzdChvY3Rva2l0KSB7XG4gIHJldHVybiB7XG4gICAgcGFnaW5hdGU6IE9iamVjdC5hc3NpZ24ocGFnaW5hdGUuYmluZChudWxsLCBvY3Rva2l0KSwge1xuICAgICAgaXRlcmF0b3I6IGl0ZXJhdG9yLmJpbmQobnVsbCwgb2N0b2tpdClcbiAgICB9KVxuICB9O1xufVxucGFnaW5hdGVSZXN0LlZFUlNJT04gPSBWRVJTSU9OO1xuLy8gQW5ub3RhdGUgdGhlIENvbW1vbkpTIGV4cG9ydCBuYW1lcyBmb3IgRVNNIGltcG9ydCBpbiBub2RlOlxuMCAmJiAobW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbXBvc2VQYWdpbmF0ZVJlc3QsXG4gIGlzUGFnaW5hdGluZ0VuZHBvaW50LFxuICBwYWdpbmF0ZVJlc3QsXG4gIHBhZ2luYXRpbmdFbmRwb2ludHNcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0T2N0b2tpdE9wdGlvbnMgPSBleHBvcnRzLkdpdEh1YiA9IGV4cG9ydHMuZGVmYXVsdHMgPSBleHBvcnRzLmNvbnRleHQgPSB2b2lkIDA7XG5jb25zdCBDb250ZXh0ID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL2NvbnRleHRcIikpO1xuY29uc3QgVXRpbHMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vaW50ZXJuYWwvdXRpbHNcIikpO1xuLy8gb2N0b2tpdCArIHBsdWdpbnNcbmNvbnN0IGNvcmVfMSA9IHJlcXVpcmUoXCJAb2N0b2tpdC9jb3JlXCIpO1xuY29uc3QgcGx1Z2luX3Jlc3RfZW5kcG9pbnRfbWV0aG9kc18xID0gcmVxdWlyZShcIkBvY3Rva2l0L3BsdWdpbi1yZXN0LWVuZHBvaW50LW1ldGhvZHNcIik7XG5jb25zdCBwbHVnaW5fcGFnaW5hdGVfcmVzdF8xID0gcmVxdWlyZShcIkBvY3Rva2l0L3BsdWdpbi1wYWdpbmF0ZS1yZXN0XCIpO1xuZXhwb3J0cy5jb250ZXh0ID0gbmV3IENvbnRleHQuQ29udGV4dCgpO1xuY29uc3QgYmFzZVVybCA9IFV0aWxzLmdldEFwaUJhc2VVcmwoKTtcbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG4gICAgYmFzZVVybCxcbiAgICByZXF1ZXN0OiB7XG4gICAgICAgIGFnZW50OiBVdGlscy5nZXRQcm94eUFnZW50KGJhc2VVcmwpLFxuICAgICAgICBmZXRjaDogVXRpbHMuZ2V0UHJveHlGZXRjaChiYXNlVXJsKVxuICAgIH1cbn07XG5leHBvcnRzLkdpdEh1YiA9IGNvcmVfMS5PY3Rva2l0LnBsdWdpbihwbHVnaW5fcmVzdF9lbmRwb2ludF9tZXRob2RzXzEucmVzdEVuZHBvaW50TWV0aG9kcywgcGx1Z2luX3BhZ2luYXRlX3Jlc3RfMS5wYWdpbmF0ZVJlc3QpLmRlZmF1bHRzKGV4cG9ydHMuZGVmYXVsdHMpO1xuLyoqXG4gKiBDb252aWVuY2UgZnVuY3Rpb24gdG8gY29ycmVjdGx5IGZvcm1hdCBPY3Rva2l0IE9wdGlvbnMgdG8gcGFzcyBpbnRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0gICAgIHRva2VuICAgIHRoZSByZXBvIFBBVCBvciBHSVRIVUJfVE9LRU5cbiAqIEBwYXJhbSAgICAgb3B0aW9ucyAgb3RoZXIgb3B0aW9ucyB0byBzZXRcbiAqL1xuZnVuY3Rpb24gZ2V0T2N0b2tpdE9wdGlvbnModG9rZW4sIG9wdGlvbnMpIHtcbiAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyB8fCB7fSk7IC8vIFNoYWxsb3cgY2xvbmUgLSBkb24ndCBtdXRhdGUgdGhlIG9iamVjdCBwcm92aWRlZCBieSB0aGUgY2FsbGVyXG4gICAgLy8gQXV0aFxuICAgIGNvbnN0IGF1dGggPSBVdGlscy5nZXRBdXRoU3RyaW5nKHRva2VuLCBvcHRzKTtcbiAgICBpZiAoYXV0aCkge1xuICAgICAgICBvcHRzLmF1dGggPSBhdXRoO1xuICAgIH1cbiAgICByZXR1cm4gb3B0cztcbn1cbmV4cG9ydHMuZ2V0T2N0b2tpdE9wdGlvbnMgPSBnZXRPY3Rva2l0T3B0aW9ucztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWxzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldE9jdG9raXQgPSBleHBvcnRzLmNvbnRleHQgPSB2b2lkIDA7XG5jb25zdCBDb250ZXh0ID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL2NvbnRleHRcIikpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuZXhwb3J0cy5jb250ZXh0ID0gbmV3IENvbnRleHQuQ29udGV4dCgpO1xuLyoqXG4gKiBSZXR1cm5zIGEgaHlkcmF0ZWQgb2N0b2tpdCByZWFkeSB0byB1c2UgZm9yIEdpdEh1YiBBY3Rpb25zXG4gKlxuICogQHBhcmFtICAgICB0b2tlbiAgICB0aGUgcmVwbyBQQVQgb3IgR0lUSFVCX1RPS0VOXG4gKiBAcGFyYW0gICAgIG9wdGlvbnMgIG90aGVyIG9wdGlvbnMgdG8gc2V0XG4gKi9cbmZ1bmN0aW9uIGdldE9jdG9raXQodG9rZW4sIG9wdGlvbnMsIC4uLmFkZGl0aW9uYWxQbHVnaW5zKSB7XG4gICAgY29uc3QgR2l0SHViV2l0aFBsdWdpbnMgPSB1dGlsc18xLkdpdEh1Yi5wbHVnaW4oLi4uYWRkaXRpb25hbFBsdWdpbnMpO1xuICAgIHJldHVybiBuZXcgR2l0SHViV2l0aFBsdWdpbnMoKDAsIHV0aWxzXzEuZ2V0T2N0b2tpdE9wdGlvbnMpKHRva2VuLCBvcHRpb25zKSk7XG59XG5leHBvcnRzLmdldE9jdG9raXQgPSBnZXRPY3Rva2l0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2l0aHViLmpzLm1hcCIsImltcG9ydCB7IHNldEZhaWxlZCB9IGZyb20gJ0BhY3Rpb25zL2NvcmUnXG5pbXBvcnQgeyBjb250ZXh0IH0gZnJvbSAnQGFjdGlvbnMvZ2l0aHViJ1xuaW1wb3J0IHsgT2N0b2tpdCB9IGZyb20gJy4uLy4uL3R5cGVzL21vZGVscy9naXRodWIvb2N0b2tpdC5qcydcblxuZXhwb3J0IHR5cGUgQ3JlYXRlTmV3R2l0QnJhbmNoUGFyYW1zID0ge1xuICBvd25lcjogc3RyaW5nXG4gIHJlcG86IHN0cmluZ1xuICBicmFuY2hOYW1lOiBzdHJpbmdcbiAgYmFzZUJyYW5jaD86IHN0cmluZ1xufVxuXG4vKipcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIGFzeW5jIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhIG5ldyBHaXQgYnJhbmNoIGluIGEgR2l0SHViIHJlcG9zaXRvcnkgdXNpbmcgT2N0b2tpdC5cbiAqXG4gKiBAcGFyYW0gb2N0b2tpdCAtIEFuIGF1dGhlbnRpY2F0ZWQgT2N0b2tpdCBpbnN0YW5jZSBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgR2l0SHViIEFQSS5cbiAqIEByZXR1cm5zIEFuIGFzeW5jIGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBhIG5ldyBicmFuY2ggZnJvbSBhIHNwZWNpZmllZCBiYXNlIGJyYW5jaC5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBhc3luY1xuICogQHBhcmFtIG93bmVyIC0gVGhlIG93bmVyIG9mIHRoZSByZXBvc2l0b3J5LlxuICogQHBhcmFtIHJlcG8gLSBUaGUgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeS5cbiAqIEBwYXJhbSBicmFuY2hOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIG5ldyBicmFuY2ggdG8gY3JlYXRlLlxuICogQHBhcmFtIGJhc2VCcmFuY2ggLSAoT3B0aW9uYWwpIFRoZSBuYW1lIG9mIHRoZSBiYXNlIGJyYW5jaCB0byBicmFuY2ggZnJvbS4gRGVmYXVsdHMgdG8gdGhlIGN1cnJlbnQgY29udGV4dCByZWYgb3IgJ21haW4nLlxuICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgYnJhbmNoIGRhdGEgaWYgc3VjY2Vzc2Z1bDsgb3RoZXJ3aXNlLCBoYW5kbGVzIGVycm9ycyBhbmQgc2V0cyB0aGUgZmFpbHVyZSBzdGF0ZS5cbiAqXG4gKiBAdGhyb3dzIFdpbGwgY2FsbCBgc2V0RmFpbGVkYCBpZiB0aGUgYnJhbmNoIGNyZWF0aW9uIGZhaWxzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTmV3R2l0QnJhbmNoKG9jdG9raXQ6IE9jdG9raXQpIHtcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU5ld0dpdEJyYW5jaCh7XG4gICAgYmFzZUJyYW5jaCA9IGNvbnRleHQucmVmLnNwbGl0KCcvJykucG9wKCkgfHwgJ21haW4nLFxuICAgIGJyYW5jaE5hbWUsXG4gICAgb3duZXIsXG4gICAgcmVwbyxcbiAgfTogQ3JlYXRlTmV3R2l0QnJhbmNoUGFyYW1zKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIEdldCB0aGUgbGF0ZXN0IGNvbW1pdCBmcm9tIHRoZSBiYXNlIGJyYW5jaFxuICAgICAgY29uc3QgeyBkYXRhOiByZWZEYXRhIH0gPSBhd2FpdCBvY3Rva2l0LnJlc3QuZ2l0LmdldFJlZih7XG4gICAgICAgIG93bmVyLFxuICAgICAgICByZXBvLFxuICAgICAgICByZWY6IGBoZWFkcy8ke2Jhc2VCcmFuY2h9YCxcbiAgICAgIH0pXG5cbiAgICAgIC8vIENyZWF0ZSBhIG5ldyBicmFuY2ggZnJvbSB0aGUgbGF0ZXN0IGNvbW1pdFxuICAgICAgY29uc3QgeyBkYXRhOiBuZXdCcmFuY2ggfSA9IGF3YWl0IG9jdG9raXQucmVzdC5naXQuY3JlYXRlUmVmKHtcbiAgICAgICAgb3duZXIsXG4gICAgICAgIHJlcG8sXG4gICAgICAgIHJlZjogYHJlZnMvaGVhZHMvJHticmFuY2hOYW1lfWAsXG4gICAgICAgIHNoYTogcmVmRGF0YS5vYmplY3Quc2hhLFxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIG5ld0JyYW5jaFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBzZXRGYWlsZWQoYEZhaWxlZCB0byBjcmVhdGUgbmV3IGdpdCBicmFuY2g6ICR7ZXJyb3IubWVzc2FnZX1gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0RmFpbGVkKCdGYWlsZWQgdG8gY3JlYXRlIG5ldyBnaXQgYnJhbmNoOiBVbmtub3duIGVycm9yJylcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOV0sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsUUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sTUFBTTtBQUM1RCxTQUFRLFVBQVUsS0FBSztDQUN2QixNQUFNLGlCQUFlO0NBQ3JCLE1BQU0saUJBQWU7Q0FDckIsSUFBTUEsWUFBTixNQUFjOzs7O0VBSVYsY0FBYztHQUNWLElBQUksSUFBSSxJQUFJO0FBQ1osUUFBSyxVQUFVLEVBQUU7QUFDakIsT0FBSSxRQUFRLElBQUksa0JBQ1osTUFBSyxHQUFHLEtBQUssWUFBWSxRQUFRLElBQUksbUJBQ2pDLE1BQUssVUFBVSxLQUFLLE9BQU8sR0FBRyxLQUFLLGNBQWMsUUFBUSxJQUFJLG1CQUFtQixFQUFFLFVBQVUsUUFBUTtRQUVuRztJQUNELE1BQU0sT0FBTyxR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QUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNEO0NBR0QsU0FBUyxxQkFBcUIsS0FBSztBQUNqQyxNQUFJLE9BQU8sUUFBUSxTQUNqQixRQUFPLG9C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