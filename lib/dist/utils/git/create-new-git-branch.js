import { __commonJS, __require, __toESM, require_core, require_lib, require_undici } from "../../core-Bd4l5kNc.js";

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
	var __toESM$1 = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps$6(isNodeMode || !mod || !mod.__esModule ? __defProp$6(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	var __toCommonJS$6 = (mod) => __copyProps$6(__defProp$6({}, "__esModule", { value: true }), mod);
	var dist_src_exports$4 = {};
	__export$6(dist_src_exports$4, { RequestError: () => RequestError });
	module.exports = __toCommonJS$6(dist_src_exports$4);
	var import_deprecation = require_dist_node$7();
	var import_once = __toESM$1(require_once());
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
var import_core = /* @__PURE__ */ __toESM(require_core(), 1);
var import_github = /* @__PURE__ */ __toESM(require_github(), 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5ldy1naXQtYnJhbmNoLmpzIiwibmFtZXMiOlsiQ29udGV4dCIsIl9fY3JlYXRlQmluZGluZyIsIl9fc2V0TW9kdWxlRGVmYXVsdCIsIl9faW1wb3J0U3RhciIsInJlZ2lzdGVyIiwibmFtZSIsIm1ldGhvZCIsImFkZEhvb2siLCJob29rIiwicmVtb3ZlSG9vayIsImhvb2siLCJfX2RlZlByb3AiLCJfX2dldE93blByb3BEZXNjIiwiX19nZXRPd25Qcm9wTmFtZXMiLCJfX2hhc093blByb3AiLCJfX2V4cG9ydCIsIl9fY29weVByb3BzIiwiX190b0NvbW1vbkpTIiwiZGlzdF9zcmNfZXhwb3J0cyIsImltcG9ydF91bml2ZXJzYWxfdXNlcl9hZ2VudCIsIlZFUlNJT04iLCJpc1BsYWluT2JqZWN0IiwiY29udGV4dCIsIndpdGhEZWZhdWx0cyIsIndyYXBweSIsImNiIiwiX19kZWZQcm9wIiwiX19nZXRPd25Qcm9wRGVzYyIsIl9fZ2V0T3duUHJvcE5hbWVzIiwiX19oYXNPd25Qcm9wIiwiX19leHBvcnQiLCJfX2NvcHlQcm9wcyIsIl9fdG9FU00iLCJfX3RvQ29tbW9uSlMiLCJkaXN0X3NyY19leHBvcnRzIiwiX19kZWZQcm9wIiwiX19nZXRPd25Qcm9wRGVzYyIsIl9fZ2V0T3duUHJvcE5hbWVzIiwiX19oYXNPd25Qcm9wIiwiX19leHBvcnQiLCJfX2NvcHlQcm9wcyIsIl9fdG9Db21tb25KUyIsImRpc3Rfc3JjX2V4cG9ydHMiLCJpbXBvcnRfdW5pdmVyc2FsX3VzZXJfYWdlbnQiLCJWRVJTSU9OIiwid2l0aERlZmF1bHRzIiwiX19kZWZQcm9wIiwiX19nZXRPd25Qcm9wRGVzYyIsIl9fZ2V0T3duUHJvcE5hbWVzIiwiX19oYXNPd25Qcm9wIiwiX19leHBvcnQiLCJfX2NvcHlQcm9wcyIsIl9fdG9Db21tb25KUyIsImluZGV4X2V4cG9ydHMiLCJpbXBvcnRfdW5pdmVyc2FsX3VzZXJfYWdlbnQiLCJWRVJTSU9OIiwiYmFzZVVybCIsIl9fZGVmUHJvcCIsIl9fZ2V0T3duUHJvcERlc2MiLCJfX2dldE93blByb3BOYW1lcyIsIl9faGFzT3duUHJvcCIsIl9fZXhwb3J0IiwiX19jb3B5UHJvcHMiLCJfX3RvQ29tbW9uSlMiLCJkaXN0X3NyY19leHBvcnRzIiwicmVxdWVzdCIsImVuZHBvaW50IiwiX19kZWZQcm9wIiwiX19nZXRPd25Qcm9wRGVzYyIsIl9fZ2V0T3duUHJvcE5hbWVzIiwiX19oYXNPd25Qcm9wIiwiX19leHBvcnQiLCJfX2NvcHlQcm9wcyIsIl9fdG9Db21tb25KUyIsIlZFUlNJT04iLCJob29rIiwiYXV0aCIsIl9fZGVmUHJvcCIsIl9fZ2V0T3duUHJvcERlc2MiLCJfX2dldE93blByb3BOYW1lcyIsIl9faGFzT3duUHJvcCIsIl9fZXhwb3J0IiwiX19jb3B5UHJvcHMiLCJfX3RvQ29tbW9uSlMiLCJkaXN0X3NyY19leHBvcnRzIiwiVkVSU0lPTiIsImVuZHBvaW50IiwiX19jcmVhdGVCaW5kaW5nIiwiX19zZXRNb2R1bGVEZWZhdWx0IiwiX19pbXBvcnRTdGFyIiwiQ29udGV4dCIsImF1dGgiLCJvY3Rva2l0OiBPY3Rva2l0IiwiY3JlYXRlTmV3R2l0QnJhbmNoIiwiY29udGV4dCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWN0aW9ucytnaXRodWJANi4wLjEvbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2dpdGh1Yi9saWIvY29udGV4dC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWN0aW9ucytnaXRodWJANi4wLjEvbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2dpdGh1Yi9saWIvaW50ZXJuYWwvdXRpbHMuanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vdW5pdmVyc2FsLXVzZXItYWdlbnRANi4wLjEvbm9kZV9tb2R1bGVzL3VuaXZlcnNhbC11c2VyLWFnZW50L2Rpc3Qtbm9kZS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9iZWZvcmUtYWZ0ZXItaG9va0AyLjIuMy9ub2RlX21vZHVsZXMvYmVmb3JlLWFmdGVyLWhvb2svbGliL3JlZ2lzdGVyLmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2JlZm9yZS1hZnRlci1ob29rQDIuMi4zL25vZGVfbW9kdWxlcy9iZWZvcmUtYWZ0ZXItaG9vay9saWIvYWRkLmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2JlZm9yZS1hZnRlci1ob29rQDIuMi4zL25vZGVfbW9kdWxlcy9iZWZvcmUtYWZ0ZXItaG9vay9saWIvcmVtb3ZlLmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2JlZm9yZS1hZnRlci1ob29rQDIuMi4zL25vZGVfbW9kdWxlcy9iZWZvcmUtYWZ0ZXItaG9vay9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ab2N0b2tpdCtlbmRwb2ludEA5LjAuNi9ub2RlX21vZHVsZXMvQG9jdG9raXQvZW5kcG9pbnQvZGlzdC1ub2RlL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RlcHJlY2F0aW9uQDIuMy4xL25vZGVfbW9kdWxlcy9kZXByZWNhdGlvbi9kaXN0LW5vZGUvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vd3JhcHB5QDEuMC4yL25vZGVfbW9kdWxlcy93cmFwcHkvd3JhcHB5LmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL29uY2VAMS40LjAvbm9kZV9tb2R1bGVzL29uY2Uvb25jZS5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ab2N0b2tpdCtyZXF1ZXN0LWVycm9yQDUuMS4xL25vZGVfbW9kdWxlcy9Ab2N0b2tpdC9yZXF1ZXN0LWVycm9yL2Rpc3Qtbm9kZS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ab2N0b2tpdCtyZXF1ZXN0QDguNC4xL25vZGVfbW9kdWxlcy9Ab2N0b2tpdC9yZXF1ZXN0L2Rpc3Qtbm9kZS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ab2N0b2tpdCtncmFwaHFsQDcuMS4xL25vZGVfbW9kdWxlcy9Ab2N0b2tpdC9ncmFwaHFsL2Rpc3Qtbm9kZS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ab2N0b2tpdCthdXRoLXRva2VuQDQuMC4wL25vZGVfbW9kdWxlcy9Ab2N0b2tpdC9hdXRoLXRva2VuL2Rpc3Qtbm9kZS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ab2N0b2tpdCtjb3JlQDUuMi4yL25vZGVfbW9kdWxlcy9Ab2N0b2tpdC9jb3JlL2Rpc3Qtbm9kZS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ab2N0b2tpdCtwbHVnaW4tcmVzdC1lbmRwb2ludC1tZXRob2RzQDEwLjQuMV9Ab2N0b2tpdCtjb3JlQDUuMi4yL25vZGVfbW9kdWxlcy9Ab2N0b2tpdC9wbHVnaW4tcmVzdC1lbmRwb2ludC1tZXRob2RzL2Rpc3Qtbm9kZS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ab2N0b2tpdCtwbHVnaW4tcGFnaW5hdGUtcmVzdEA5LjIuMl9Ab2N0b2tpdCtjb3JlQDUuMi4yL25vZGVfbW9kdWxlcy9Ab2N0b2tpdC9wbHVnaW4tcGFnaW5hdGUtcmVzdC9kaXN0LW5vZGUvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFjdGlvbnMrZ2l0aHViQDYuMC4xL25vZGVfbW9kdWxlcy9AYWN0aW9ucy9naXRodWIvbGliL3V0aWxzLmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhY3Rpb25zK2dpdGh1YkA2LjAuMS9ub2RlX21vZHVsZXMvQGFjdGlvbnMvZ2l0aHViL2xpYi9naXRodWIuanMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2NyZWF0ZS1uZXctZ2l0LWJyYW5jaC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29udGV4dCA9IHZvaWQgMDtcbmNvbnN0IGZzXzEgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCBvc18xID0gcmVxdWlyZShcIm9zXCIpO1xuY2xhc3MgQ29udGV4dCB7XG4gICAgLyoqXG4gICAgICogSHlkcmF0ZSB0aGUgY29udGV4dCBmcm9tIHRoZSBlbnZpcm9ubWVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgdGhpcy5wYXlsb2FkID0ge307XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5HSVRIVUJfRVZFTlRfUEFUSCkge1xuICAgICAgICAgICAgaWYgKCgwLCBmc18xLmV4aXN0c1N5bmMpKHByb2Nlc3MuZW52LkdJVEhVQl9FVkVOVF9QQVRIKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGF5bG9hZCA9IEpTT04ucGFyc2UoKDAsIGZzXzEucmVhZEZpbGVTeW5jKShwcm9jZXNzLmVudi5HSVRIVUJfRVZFTlRfUEFUSCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSBwcm9jZXNzLmVudi5HSVRIVUJfRVZFTlRfUEFUSDtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgR0lUSFVCX0VWRU5UX1BBVEggJHtwYXRofSBkb2VzIG5vdCBleGlzdCR7b3NfMS5FT0x9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBwcm9jZXNzLmVudi5HSVRIVUJfRVZFTlRfTkFNRTtcbiAgICAgICAgdGhpcy5zaGEgPSBwcm9jZXNzLmVudi5HSVRIVUJfU0hBO1xuICAgICAgICB0aGlzLnJlZiA9IHByb2Nlc3MuZW52LkdJVEhVQl9SRUY7XG4gICAgICAgIHRoaXMud29ya2Zsb3cgPSBwcm9jZXNzLmVudi5HSVRIVUJfV09SS0ZMT1c7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gcHJvY2Vzcy5lbnYuR0lUSFVCX0FDVElPTjtcbiAgICAgICAgdGhpcy5hY3RvciA9IHByb2Nlc3MuZW52LkdJVEhVQl9BQ1RPUjtcbiAgICAgICAgdGhpcy5qb2IgPSBwcm9jZXNzLmVudi5HSVRIVUJfSk9CO1xuICAgICAgICB0aGlzLnJ1bkF0dGVtcHQgPSBwYXJzZUludChwcm9jZXNzLmVudi5HSVRIVUJfUlVOX0FUVEVNUFQsIDEwKTtcbiAgICAgICAgdGhpcy5ydW5OdW1iZXIgPSBwYXJzZUludChwcm9jZXNzLmVudi5HSVRIVUJfUlVOX05VTUJFUiwgMTApO1xuICAgICAgICB0aGlzLnJ1bklkID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuR0lUSFVCX1JVTl9JRCwgMTApO1xuICAgICAgICB0aGlzLmFwaVVybCA9IChfYSA9IHByb2Nlc3MuZW52LkdJVEhVQl9BUElfVVJMKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbWA7XG4gICAgICAgIHRoaXMuc2VydmVyVXJsID0gKF9iID0gcHJvY2Vzcy5lbnYuR0lUSFVCX1NFUlZFUl9VUkwpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGBodHRwczovL2dpdGh1Yi5jb21gO1xuICAgICAgICB0aGlzLmdyYXBocWxVcmwgPVxuICAgICAgICAgICAgKF9jID0gcHJvY2Vzcy5lbnYuR0lUSFVCX0dSQVBIUUxfVVJMKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9ncmFwaHFsYDtcbiAgICB9XG4gICAgZ2V0IGlzc3VlKCkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5wYXlsb2FkO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJlcG8pLCB7IG51bWJlcjogKHBheWxvYWQuaXNzdWUgfHwgcGF5bG9hZC5wdWxsX3JlcXVlc3QgfHwgcGF5bG9hZCkubnVtYmVyIH0pO1xuICAgIH1cbiAgICBnZXQgcmVwbygpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52LkdJVEhVQl9SRVBPU0lUT1JZKSB7XG4gICAgICAgICAgICBjb25zdCBbb3duZXIsIHJlcG9dID0gcHJvY2Vzcy5lbnYuR0lUSFVCX1JFUE9TSVRPUlkuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgIHJldHVybiB7IG93bmVyLCByZXBvIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGF5bG9hZC5yZXBvc2l0b3J5KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG93bmVyOiB0aGlzLnBheWxvYWQucmVwb3NpdG9yeS5vd25lci5sb2dpbixcbiAgICAgICAgICAgICAgICByZXBvOiB0aGlzLnBheWxvYWQucmVwb3NpdG9yeS5uYW1lXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvbnRleHQucmVwbyByZXF1aXJlcyBhIEdJVEhVQl9SRVBPU0lUT1JZIGVudmlyb25tZW50IHZhcmlhYmxlIGxpa2UgJ293bmVyL3JlcG8nXCIpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29udGV4dCA9IENvbnRleHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250ZXh0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0QXBpQmFzZVVybCA9IGV4cG9ydHMuZ2V0UHJveHlGZXRjaCA9IGV4cG9ydHMuZ2V0UHJveHlBZ2VudERpc3BhdGNoZXIgPSBleHBvcnRzLmdldFByb3h5QWdlbnQgPSBleHBvcnRzLmdldEF1dGhTdHJpbmcgPSB2b2lkIDA7XG5jb25zdCBodHRwQ2xpZW50ID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAYWN0aW9ucy9odHRwLWNsaWVudFwiKSk7XG5jb25zdCB1bmRpY2lfMSA9IHJlcXVpcmUoXCJ1bmRpY2lcIik7XG5mdW5jdGlvbiBnZXRBdXRoU3RyaW5nKHRva2VuLCBvcHRpb25zKSB7XG4gICAgaWYgKCF0b2tlbiAmJiAhb3B0aW9ucy5hdXRoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIHRva2VuIG9yIG9wdHMuYXV0aCBpcyByZXF1aXJlZCcpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0b2tlbiAmJiBvcHRpb25zLmF1dGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXJzIHRva2VuIGFuZCBvcHRzLmF1dGggbWF5IG5vdCBib3RoIGJlIHNwZWNpZmllZCcpO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIG9wdGlvbnMuYXV0aCA9PT0gJ3N0cmluZycgPyBvcHRpb25zLmF1dGggOiBgdG9rZW4gJHt0b2tlbn1gO1xufVxuZXhwb3J0cy5nZXRBdXRoU3RyaW5nID0gZ2V0QXV0aFN0cmluZztcbmZ1bmN0aW9uIGdldFByb3h5QWdlbnQoZGVzdGluYXRpb25VcmwpIHtcbiAgICBjb25zdCBoYyA9IG5ldyBodHRwQ2xpZW50Lkh0dHBDbGllbnQoKTtcbiAgICByZXR1cm4gaGMuZ2V0QWdlbnQoZGVzdGluYXRpb25VcmwpO1xufVxuZXhwb3J0cy5nZXRQcm94eUFnZW50ID0gZ2V0UHJveHlBZ2VudDtcbmZ1bmN0aW9uIGdldFByb3h5QWdlbnREaXNwYXRjaGVyKGRlc3RpbmF0aW9uVXJsKSB7XG4gICAgY29uc3QgaGMgPSBuZXcgaHR0cENsaWVudC5IdHRwQ2xpZW50KCk7XG4gICAgcmV0dXJuIGhjLmdldEFnZW50RGlzcGF0Y2hlcihkZXN0aW5hdGlvblVybCk7XG59XG5leHBvcnRzLmdldFByb3h5QWdlbnREaXNwYXRjaGVyID0gZ2V0UHJveHlBZ2VudERpc3BhdGNoZXI7XG5mdW5jdGlvbiBnZXRQcm94eUZldGNoKGRlc3RpbmF0aW9uVXJsKSB7XG4gICAgY29uc3QgaHR0cERpc3BhdGNoZXIgPSBnZXRQcm94eUFnZW50RGlzcGF0Y2hlcihkZXN0aW5hdGlvblVybCk7XG4gICAgY29uc3QgcHJveHlGZXRjaCA9ICh1cmwsIG9wdHMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgcmV0dXJuICgwLCB1bmRpY2lfMS5mZXRjaCkodXJsLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdHMpLCB7IGRpc3BhdGNoZXI6IGh0dHBEaXNwYXRjaGVyIH0pKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcHJveHlGZXRjaDtcbn1cbmV4cG9ydHMuZ2V0UHJveHlGZXRjaCA9IGdldFByb3h5RmV0Y2g7XG5mdW5jdGlvbiBnZXRBcGlCYXNlVXJsKCkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudlsnR0lUSFVCX0FQSV9VUkwnXSB8fCAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSc7XG59XG5leHBvcnRzLmdldEFwaUJhc2VVcmwgPSBnZXRBcGlCYXNlVXJsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbHMuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG5mdW5jdGlvbiBnZXRVc2VyQWdlbnQoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSBcIm9iamVjdFwiICYmIFwidXNlckFnZW50XCIgaW4gbmF2aWdhdG9yKSB7XG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy52ZXJzaW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYE5vZGUuanMvJHtwcm9jZXNzLnZlcnNpb24uc3Vic3RyKDEpfSAoJHtwcm9jZXNzLnBsYXRmb3JtfTsgJHtwcm9jZXNzLmFyY2h9KWA7XG4gIH1cblxuICByZXR1cm4gXCI8ZW52aXJvbm1lbnQgdW5kZXRlY3RhYmxlPlwiO1xufVxuXG5leHBvcnRzLmdldFVzZXJBZ2VudCA9IGdldFVzZXJBZ2VudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHMgPSByZWdpc3RlcjtcblxuZnVuY3Rpb24gcmVnaXN0ZXIoc3RhdGUsIG5hbWUsIG1ldGhvZCwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG1ldGhvZCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibWV0aG9kIGZvciBiZWZvcmUgaG9vayBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShuYW1lKSkge1xuICAgIHJldHVybiBuYW1lLnJldmVyc2UoKS5yZWR1Y2UoZnVuY3Rpb24gKGNhbGxiYWNrLCBuYW1lKSB7XG4gICAgICByZXR1cm4gcmVnaXN0ZXIuYmluZChudWxsLCBzdGF0ZSwgbmFtZSwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIH0sIG1ldGhvZCkoKTtcbiAgfVxuXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXN0YXRlLnJlZ2lzdHJ5W25hbWVdKSB7XG4gICAgICByZXR1cm4gbWV0aG9kKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZS5yZWdpc3RyeVtuYW1lXS5yZWR1Y2UoZnVuY3Rpb24gKG1ldGhvZCwgcmVnaXN0ZXJlZCkge1xuICAgICAgcmV0dXJuIHJlZ2lzdGVyZWQuaG9vay5iaW5kKG51bGwsIG1ldGhvZCwgb3B0aW9ucyk7XG4gICAgfSwgbWV0aG9kKSgpO1xuICB9KTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gYWRkSG9vaztcblxuZnVuY3Rpb24gYWRkSG9vayhzdGF0ZSwga2luZCwgbmFtZSwgaG9vaykge1xuICB2YXIgb3JpZyA9IGhvb2s7XG4gIGlmICghc3RhdGUucmVnaXN0cnlbbmFtZV0pIHtcbiAgICBzdGF0ZS5yZWdpc3RyeVtuYW1lXSA9IFtdO1xuICB9XG5cbiAgaWYgKGtpbmQgPT09IFwiYmVmb3JlXCIpIHtcbiAgICBob29rID0gZnVuY3Rpb24gKG1ldGhvZCwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgIC50aGVuKG9yaWcuYmluZChudWxsLCBvcHRpb25zKSlcbiAgICAgICAgLnRoZW4obWV0aG9kLmJpbmQobnVsbCwgb3B0aW9ucykpO1xuICAgIH07XG4gIH1cblxuICBpZiAoa2luZCA9PT0gXCJhZnRlclwiKSB7XG4gICAgaG9vayA9IGZ1bmN0aW9uIChtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIHZhciByZXN1bHQ7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgLnRoZW4obWV0aG9kLmJpbmQobnVsbCwgb3B0aW9ucykpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHRfKSB7XG4gICAgICAgICAgcmVzdWx0ID0gcmVzdWx0XztcbiAgICAgICAgICByZXR1cm4gb3JpZyhyZXN1bHQsIG9wdGlvbnMpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChraW5kID09PSBcImVycm9yXCIpIHtcbiAgICBob29rID0gZnVuY3Rpb24gKG1ldGhvZCwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgIC50aGVuKG1ldGhvZC5iaW5kKG51bGwsIG9wdGlvbnMpKVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIG9yaWcoZXJyb3IsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgc3RhdGUucmVnaXN0cnlbbmFtZV0ucHVzaCh7XG4gICAgaG9vazogaG9vayxcbiAgICBvcmlnOiBvcmlnLFxuICB9KTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVtb3ZlSG9vaztcblxuZnVuY3Rpb24gcmVtb3ZlSG9vayhzdGF0ZSwgbmFtZSwgbWV0aG9kKSB7XG4gIGlmICghc3RhdGUucmVnaXN0cnlbbmFtZV0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaW5kZXggPSBzdGF0ZS5yZWdpc3RyeVtuYW1lXVxuICAgIC5tYXAoZnVuY3Rpb24gKHJlZ2lzdGVyZWQpIHtcbiAgICAgIHJldHVybiByZWdpc3RlcmVkLm9yaWc7XG4gICAgfSlcbiAgICAuaW5kZXhPZihtZXRob2QpO1xuXG4gIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzdGF0ZS5yZWdpc3RyeVtuYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xufVxuIiwidmFyIHJlZ2lzdGVyID0gcmVxdWlyZShcIi4vbGliL3JlZ2lzdGVyXCIpO1xudmFyIGFkZEhvb2sgPSByZXF1aXJlKFwiLi9saWIvYWRkXCIpO1xudmFyIHJlbW92ZUhvb2sgPSByZXF1aXJlKFwiLi9saWIvcmVtb3ZlXCIpO1xuXG4vLyBiaW5kIHdpdGggYXJyYXkgb2YgYXJndW1lbnRzOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjE3OTI5MTNcbnZhciBiaW5kID0gRnVuY3Rpb24uYmluZDtcbnZhciBiaW5kYWJsZSA9IGJpbmQuYmluZChiaW5kKTtcblxuZnVuY3Rpb24gYmluZEFwaShob29rLCBzdGF0ZSwgbmFtZSkge1xuICB2YXIgcmVtb3ZlSG9va1JlZiA9IGJpbmRhYmxlKHJlbW92ZUhvb2ssIG51bGwpLmFwcGx5KFxuICAgIG51bGwsXG4gICAgbmFtZSA/IFtzdGF0ZSwgbmFtZV0gOiBbc3RhdGVdXG4gICk7XG4gIGhvb2suYXBpID0geyByZW1vdmU6IHJlbW92ZUhvb2tSZWYgfTtcbiAgaG9vay5yZW1vdmUgPSByZW1vdmVIb29rUmVmO1xuICBbXCJiZWZvcmVcIiwgXCJlcnJvclwiLCBcImFmdGVyXCIsIFwid3JhcFwiXS5mb3JFYWNoKGZ1bmN0aW9uIChraW5kKSB7XG4gICAgdmFyIGFyZ3MgPSBuYW1lID8gW3N0YXRlLCBraW5kLCBuYW1lXSA6IFtzdGF0ZSwga2luZF07XG4gICAgaG9va1traW5kXSA9IGhvb2suYXBpW2tpbmRdID0gYmluZGFibGUoYWRkSG9vaywgbnVsbCkuYXBwbHkobnVsbCwgYXJncyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBIb29rU2luZ3VsYXIoKSB7XG4gIHZhciBzaW5ndWxhckhvb2tOYW1lID0gXCJoXCI7XG4gIHZhciBzaW5ndWxhckhvb2tTdGF0ZSA9IHtcbiAgICByZWdpc3RyeToge30sXG4gIH07XG4gIHZhciBzaW5ndWxhckhvb2sgPSByZWdpc3Rlci5iaW5kKG51bGwsIHNpbmd1bGFySG9va1N0YXRlLCBzaW5ndWxhckhvb2tOYW1lKTtcbiAgYmluZEFwaShzaW5ndWxhckhvb2ssIHNpbmd1bGFySG9va1N0YXRlLCBzaW5ndWxhckhvb2tOYW1lKTtcbiAgcmV0dXJuIHNpbmd1bGFySG9vaztcbn1cblxuZnVuY3Rpb24gSG9va0NvbGxlY3Rpb24oKSB7XG4gIHZhciBzdGF0ZSA9IHtcbiAgICByZWdpc3RyeToge30sXG4gIH07XG5cbiAgdmFyIGhvb2sgPSByZWdpc3Rlci5iaW5kKG51bGwsIHN0YXRlKTtcbiAgYmluZEFwaShob29rLCBzdGF0ZSk7XG5cbiAgcmV0dXJuIGhvb2s7XG59XG5cbnZhciBjb2xsZWN0aW9uSG9va0RlcHJlY2F0aW9uTWVzc2FnZURpc3BsYXllZCA9IGZhbHNlO1xuZnVuY3Rpb24gSG9vaygpIHtcbiAgaWYgKCFjb2xsZWN0aW9uSG9va0RlcHJlY2F0aW9uTWVzc2FnZURpc3BsYXllZCkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdbYmVmb3JlLWFmdGVyLWhvb2tdOiBcIkhvb2soKVwiIHJlcHVycG9zaW5nIHdhcm5pbmcsIHVzZSBcIkhvb2suQ29sbGVjdGlvbigpXCIuIFJlYWQgbW9yZTogaHR0cHM6Ly9naXQuaW8vdXBncmFkZS1iZWZvcmUtYWZ0ZXItaG9vay10by0xLjQnXG4gICAgKTtcbiAgICBjb2xsZWN0aW9uSG9va0RlcHJlY2F0aW9uTWVzc2FnZURpc3BsYXllZCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIEhvb2tDb2xsZWN0aW9uKCk7XG59XG5cbkhvb2suU2luZ3VsYXIgPSBIb29rU2luZ3VsYXIuYmluZCgpO1xuSG9vay5Db2xsZWN0aW9uID0gSG9va0NvbGxlY3Rpb24uYmluZCgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvb2s7XG4vLyBleHBvc2UgY29uc3RydWN0b3JzIGFzIGEgbmFtZWQgcHJvcGVydHkgZm9yIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLkhvb2sgPSBIb29rO1xubW9kdWxlLmV4cG9ydHMuU2luZ3VsYXIgPSBIb29rLlNpbmd1bGFyO1xubW9kdWxlLmV4cG9ydHMuQ29sbGVjdGlvbiA9IEhvb2suQ29sbGVjdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19leHBvcnQgPSAodGFyZ2V0LCBhbGwpID0+IHtcbiAgZm9yICh2YXIgbmFtZSBpbiBhbGwpXG4gICAgX19kZWZQcm9wKHRhcmdldCwgbmFtZSwgeyBnZXQ6IGFsbFtuYW1lXSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbn07XG52YXIgX19jb3B5UHJvcHMgPSAodG8sIGZyb20sIGV4Y2VwdCwgZGVzYykgPT4ge1xuICBpZiAoZnJvbSAmJiB0eXBlb2YgZnJvbSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20pKVxuICAgICAgaWYgKCFfX2hhc093blByb3AuY2FsbCh0bywga2V5KSAmJiBrZXkgIT09IGV4Y2VwdClcbiAgICAgICAgX19kZWZQcm9wKHRvLCBrZXksIHsgZ2V0OiAoKSA9PiBmcm9tW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MoZnJvbSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0bztcbn07XG52YXIgX190b0NvbW1vbkpTID0gKG1vZCkgPT4gX19jb3B5UHJvcHMoX19kZWZQcm9wKHt9LCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KSwgbW9kKTtcblxuLy8gcGtnL2Rpc3Qtc3JjL2luZGV4LmpzXG52YXIgZGlzdF9zcmNfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQoZGlzdF9zcmNfZXhwb3J0cywge1xuICBlbmRwb2ludDogKCkgPT4gZW5kcG9pbnRcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfX3RvQ29tbW9uSlMoZGlzdF9zcmNfZXhwb3J0cyk7XG5cbi8vIHBrZy9kaXN0LXNyYy9kZWZhdWx0cy5qc1xudmFyIGltcG9ydF91bml2ZXJzYWxfdXNlcl9hZ2VudCA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtdXNlci1hZ2VudFwiKTtcblxuLy8gcGtnL2Rpc3Qtc3JjL3ZlcnNpb24uanNcbnZhciBWRVJTSU9OID0gXCI5LjAuNlwiO1xuXG4vLyBwa2cvZGlzdC1zcmMvZGVmYXVsdHMuanNcbnZhciB1c2VyQWdlbnQgPSBgb2N0b2tpdC1lbmRwb2ludC5qcy8ke1ZFUlNJT059ICR7KDAsIGltcG9ydF91bml2ZXJzYWxfdXNlcl9hZ2VudC5nZXRVc2VyQWdlbnQpKCl9YDtcbnZhciBERUZBVUxUUyA9IHtcbiAgbWV0aG9kOiBcIkdFVFwiLFxuICBiYXNlVXJsOiBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb21cIixcbiAgaGVhZGVyczoge1xuICAgIGFjY2VwdDogXCJhcHBsaWNhdGlvbi92bmQuZ2l0aHViLnYzK2pzb25cIixcbiAgICBcInVzZXItYWdlbnRcIjogdXNlckFnZW50XG4gIH0sXG4gIG1lZGlhVHlwZToge1xuICAgIGZvcm1hdDogXCJcIlxuICB9XG59O1xuXG4vLyBwa2cvZGlzdC1zcmMvdXRpbC9sb3dlcmNhc2Uta2V5cy5qc1xuZnVuY3Rpb24gbG93ZXJjYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFvYmplY3QpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdCkucmVkdWNlKChuZXdPYmosIGtleSkgPT4ge1xuICAgIG5ld09ialtrZXkudG9Mb3dlckNhc2UoKV0gPSBvYmplY3Rba2V5XTtcbiAgICByZXR1cm4gbmV3T2JqO1xuICB9LCB7fSk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy91dGlsL2lzLXBsYWluLW9iamVjdC5qc1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IHZhbHVlID09PSBudWxsKVxuICAgIHJldHVybiBmYWxzZTtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgIT09IFwiW29iamVjdCBPYmplY3RdXCIpXG4gICAgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbClcbiAgICByZXR1cm4gdHJ1ZTtcbiAgY29uc3QgQ3RvciA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgXCJjb25zdHJ1Y3RvclwiKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09PSBcImZ1bmN0aW9uXCIgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwoQ3RvcikgPT09IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsKHZhbHVlKTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL3V0aWwvbWVyZ2UtZGVlcC5qc1xuZnVuY3Rpb24gbWVyZ2VEZWVwKGRlZmF1bHRzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzKTtcbiAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKGlzUGxhaW5PYmplY3Qob3B0aW9uc1trZXldKSkge1xuICAgICAgaWYgKCEoa2V5IGluIGRlZmF1bHRzKSlcbiAgICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgW2tleV06IG9wdGlvbnNba2V5XSB9KTtcbiAgICAgIGVsc2VcbiAgICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZURlZXAoZGVmYXVsdHNba2V5XSwgb3B0aW9uc1trZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgW2tleV06IG9wdGlvbnNba2V5XSB9KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvdXRpbC9yZW1vdmUtdW5kZWZpbmVkLXByb3BlcnRpZXMuanNcbmZ1bmN0aW9uIHJlbW92ZVVuZGVmaW5lZFByb3BlcnRpZXMob2JqKSB7XG4gIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgIGlmIChvYmpba2V5XSA9PT0gdm9pZCAwKSB7XG4gICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9tZXJnZS5qc1xuZnVuY3Rpb24gbWVyZ2UoZGVmYXVsdHMsIHJvdXRlLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2Ygcm91dGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBsZXQgW21ldGhvZCwgdXJsXSA9IHJvdXRlLnNwbGl0KFwiIFwiKTtcbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih1cmwgPyB7IG1ldGhvZCwgdXJsIH0gOiB7IHVybDogbWV0aG9kIH0sIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCByb3V0ZSk7XG4gIH1cbiAgb3B0aW9ucy5oZWFkZXJzID0gbG93ZXJjYXNlS2V5cyhvcHRpb25zLmhlYWRlcnMpO1xuICByZW1vdmVVbmRlZmluZWRQcm9wZXJ0aWVzKG9wdGlvbnMpO1xuICByZW1vdmVVbmRlZmluZWRQcm9wZXJ0aWVzKG9wdGlvbnMuaGVhZGVycyk7XG4gIGNvbnN0IG1lcmdlZE9wdGlvbnMgPSBtZXJnZURlZXAoZGVmYXVsdHMgfHwge30sIG9wdGlvbnMpO1xuICBpZiAob3B0aW9ucy51cmwgPT09IFwiL2dyYXBocWxcIikge1xuICAgIGlmIChkZWZhdWx0cyAmJiBkZWZhdWx0cy5tZWRpYVR5cGUucHJldmlld3M/Lmxlbmd0aCkge1xuICAgICAgbWVyZ2VkT3B0aW9ucy5tZWRpYVR5cGUucHJldmlld3MgPSBkZWZhdWx0cy5tZWRpYVR5cGUucHJldmlld3MuZmlsdGVyKFxuICAgICAgICAocHJldmlldykgPT4gIW1lcmdlZE9wdGlvbnMubWVkaWFUeXBlLnByZXZpZXdzLmluY2x1ZGVzKHByZXZpZXcpXG4gICAgICApLmNvbmNhdChtZXJnZWRPcHRpb25zLm1lZGlhVHlwZS5wcmV2aWV3cyk7XG4gICAgfVxuICAgIG1lcmdlZE9wdGlvbnMubWVkaWFUeXBlLnByZXZpZXdzID0gKG1lcmdlZE9wdGlvbnMubWVkaWFUeXBlLnByZXZpZXdzIHx8IFtdKS5tYXAoKHByZXZpZXcpID0+IHByZXZpZXcucmVwbGFjZSgvLXByZXZpZXcvLCBcIlwiKSk7XG4gIH1cbiAgcmV0dXJuIG1lcmdlZE9wdGlvbnM7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy91dGlsL2FkZC1xdWVyeS1wYXJhbWV0ZXJzLmpzXG5mdW5jdGlvbiBhZGRRdWVyeVBhcmFtZXRlcnModXJsLCBwYXJhbWV0ZXJzKSB7XG4gIGNvbnN0IHNlcGFyYXRvciA9IC9cXD8vLnRlc3QodXJsKSA/IFwiJlwiIDogXCI/XCI7XG4gIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXMocGFyYW1ldGVycyk7XG4gIGlmIChuYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHJldHVybiB1cmwgKyBzZXBhcmF0b3IgKyBuYW1lcy5tYXAoKG5hbWUpID0+IHtcbiAgICBpZiAobmFtZSA9PT0gXCJxXCIpIHtcbiAgICAgIHJldHVybiBcInE9XCIgKyBwYXJhbWV0ZXJzLnEuc3BsaXQoXCIrXCIpLm1hcChlbmNvZGVVUklDb21wb25lbnQpLmpvaW4oXCIrXCIpO1xuICAgIH1cbiAgICByZXR1cm4gYCR7bmFtZX09JHtlbmNvZGVVUklDb21wb25lbnQocGFyYW1ldGVyc1tuYW1lXSl9YDtcbiAgfSkuam9pbihcIiZcIik7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy91dGlsL2V4dHJhY3QtdXJsLXZhcmlhYmxlLW5hbWVzLmpzXG52YXIgdXJsVmFyaWFibGVSZWdleCA9IC9cXHtbXnt9fV0rXFx9L2c7XG5mdW5jdGlvbiByZW1vdmVOb25DaGFycyh2YXJpYWJsZU5hbWUpIHtcbiAgcmV0dXJuIHZhcmlhYmxlTmFtZS5yZXBsYWNlKC8oPzpeXFxXKyl8KD86KD88IVxcVylcXFcrJCkvZywgXCJcIikuc3BsaXQoLywvKTtcbn1cbmZ1bmN0aW9uIGV4dHJhY3RVcmxWYXJpYWJsZU5hbWVzKHVybCkge1xuICBjb25zdCBtYXRjaGVzID0gdXJsLm1hdGNoKHVybFZhcmlhYmxlUmVnZXgpO1xuICBpZiAoIW1hdGNoZXMpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgcmV0dXJuIG1hdGNoZXMubWFwKHJlbW92ZU5vbkNoYXJzKS5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpLCBbXSk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy91dGlsL29taXQuanNcbmZ1bmN0aW9uIG9taXQob2JqZWN0LCBrZXlzVG9PbWl0KSB7XG4gIGNvbnN0IHJlc3VsdCA9IHsgX19wcm90b19fOiBudWxsIH07XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iamVjdCkpIHtcbiAgICBpZiAoa2V5c1RvT21pdC5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG9iamVjdFtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvdXRpbC91cmwtdGVtcGxhdGUuanNcbmZ1bmN0aW9uIGVuY29kZVJlc2VydmVkKHN0cikge1xuICByZXR1cm4gc3RyLnNwbGl0KC8oJVswLTlBLUZhLWZdezJ9KS9nKS5tYXAoZnVuY3Rpb24ocGFydCkge1xuICAgIGlmICghLyVbMC05QS1GYS1mXS8udGVzdChwYXJ0KSkge1xuICAgICAgcGFydCA9IGVuY29kZVVSSShwYXJ0KS5yZXBsYWNlKC8lNUIvZywgXCJbXCIpLnJlcGxhY2UoLyU1RC9nLCBcIl1cIik7XG4gICAgfVxuICAgIHJldHVybiBwYXJ0O1xuICB9KS5qb2luKFwiXCIpO1xufVxuZnVuY3Rpb24gZW5jb2RlVW5yZXNlcnZlZChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpKl0vZywgZnVuY3Rpb24oYykge1xuICAgIHJldHVybiBcIiVcIiArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWUsIGtleSkge1xuICB2YWx1ZSA9IG9wZXJhdG9yID09PSBcIitcIiB8fCBvcGVyYXRvciA9PT0gXCIjXCIgPyBlbmNvZGVSZXNlcnZlZCh2YWx1ZSkgOiBlbmNvZGVVbnJlc2VydmVkKHZhbHVlKTtcbiAgaWYgKGtleSkge1xuICAgIHJldHVybiBlbmNvZGVVbnJlc2VydmVkKGtleSkgKyBcIj1cIiArIHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuZnVuY3Rpb24gaXNEZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdm9pZCAwICYmIHZhbHVlICE9PSBudWxsO1xufVxuZnVuY3Rpb24gaXNLZXlPcGVyYXRvcihvcGVyYXRvcikge1xuICByZXR1cm4gb3BlcmF0b3IgPT09IFwiO1wiIHx8IG9wZXJhdG9yID09PSBcIiZcIiB8fCBvcGVyYXRvciA9PT0gXCI/XCI7XG59XG5mdW5jdGlvbiBnZXRWYWx1ZXMoY29udGV4dCwgb3BlcmF0b3IsIGtleSwgbW9kaWZpZXIpIHtcbiAgdmFyIHZhbHVlID0gY29udGV4dFtrZXldLCByZXN1bHQgPSBbXTtcbiAgaWYgKGlzRGVmaW5lZCh2YWx1ZSkgJiYgdmFsdWUgIT09IFwiXCIpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICBpZiAobW9kaWZpZXIgJiYgbW9kaWZpZXIgIT09IFwiKlwiKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyaW5nKDAsIHBhcnNlSW50KG1vZGlmaWVyLCAxMCkpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgIGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZSwgaXNLZXlPcGVyYXRvcihvcGVyYXRvcikgPyBrZXkgOiBcIlwiKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG1vZGlmaWVyID09PSBcIipcIikge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZS5maWx0ZXIoaXNEZWZpbmVkKS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlMikge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgIGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZTIsIGlzS2V5T3BlcmF0b3Iob3BlcmF0b3IpID8ga2V5IDogXCJcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goZnVuY3Rpb24oaykge1xuICAgICAgICAgICAgaWYgKGlzRGVmaW5lZCh2YWx1ZVtrXSkpIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZW5jb2RlVmFsdWUob3BlcmF0b3IsIHZhbHVlW2tdLCBrKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRtcCA9IFtdO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZS5maWx0ZXIoaXNEZWZpbmVkKS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlMikge1xuICAgICAgICAgICAgdG1wLnB1c2goZW5jb2RlVmFsdWUob3BlcmF0b3IsIHZhbHVlMikpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcbiAgICAgICAgICAgIGlmIChpc0RlZmluZWQodmFsdWVba10pKSB7XG4gICAgICAgICAgICAgIHRtcC5wdXNoKGVuY29kZVVucmVzZXJ2ZWQoaykpO1xuICAgICAgICAgICAgICB0bXAucHVzaChlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWVba10udG9TdHJpbmcoKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0tleU9wZXJhdG9yKG9wZXJhdG9yKSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVVucmVzZXJ2ZWQoa2V5KSArIFwiPVwiICsgdG1wLmpvaW4oXCIsXCIpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0bXAubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2godG1wLmpvaW4oXCIsXCIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAob3BlcmF0b3IgPT09IFwiO1wiKSB7XG4gICAgICBpZiAoaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICByZXN1bHQucHVzaChlbmNvZGVVbnJlc2VydmVkKGtleSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiXCIgJiYgKG9wZXJhdG9yID09PSBcIiZcIiB8fCBvcGVyYXRvciA9PT0gXCI/XCIpKSB7XG4gICAgICByZXN1bHQucHVzaChlbmNvZGVVbnJlc2VydmVkKGtleSkgKyBcIj1cIik7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgcmVzdWx0LnB1c2goXCJcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBwYXJzZVVybCh0ZW1wbGF0ZSkge1xuICByZXR1cm4ge1xuICAgIGV4cGFuZDogZXhwYW5kLmJpbmQobnVsbCwgdGVtcGxhdGUpXG4gIH07XG59XG5mdW5jdGlvbiBleHBhbmQodGVtcGxhdGUsIGNvbnRleHQpIHtcbiAgdmFyIG9wZXJhdG9ycyA9IFtcIitcIiwgXCIjXCIsIFwiLlwiLCBcIi9cIiwgXCI7XCIsIFwiP1wiLCBcIiZcIl07XG4gIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShcbiAgICAvXFx7KFteXFx7XFx9XSspXFx9fChbXlxce1xcfV0rKS9nLFxuICAgIGZ1bmN0aW9uKF8sIGV4cHJlc3Npb24sIGxpdGVyYWwpIHtcbiAgICAgIGlmIChleHByZXNzaW9uKSB7XG4gICAgICAgIGxldCBvcGVyYXRvciA9IFwiXCI7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBpZiAob3BlcmF0b3JzLmluZGV4T2YoZXhwcmVzc2lvbi5jaGFyQXQoMCkpICE9PSAtMSkge1xuICAgICAgICAgIG9wZXJhdG9yID0gZXhwcmVzc2lvbi5jaGFyQXQoMCk7XG4gICAgICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24uc3Vic3RyKDEpO1xuICAgICAgICB9XG4gICAgICAgIGV4cHJlc3Npb24uc3BsaXQoLywvZykuZm9yRWFjaChmdW5jdGlvbih2YXJpYWJsZSkge1xuICAgICAgICAgIHZhciB0bXAgPSAvKFteOlxcKl0qKSg/OjooXFxkKyl8KFxcKikpPy8uZXhlYyh2YXJpYWJsZSk7XG4gICAgICAgICAgdmFsdWVzLnB1c2goZ2V0VmFsdWVzKGNvbnRleHQsIG9wZXJhdG9yLCB0bXBbMV0sIHRtcFsyXSB8fCB0bXBbM10pKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChvcGVyYXRvciAmJiBvcGVyYXRvciAhPT0gXCIrXCIpIHtcbiAgICAgICAgICB2YXIgc2VwYXJhdG9yID0gXCIsXCI7XG4gICAgICAgICAgaWYgKG9wZXJhdG9yID09PSBcIj9cIikge1xuICAgICAgICAgICAgc2VwYXJhdG9yID0gXCImXCI7XG4gICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciAhPT0gXCIjXCIpIHtcbiAgICAgICAgICAgIHNlcGFyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKHZhbHVlcy5sZW5ndGggIT09IDAgPyBvcGVyYXRvciA6IFwiXCIpICsgdmFsdWVzLmpvaW4oc2VwYXJhdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVzLmpvaW4oXCIsXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW5jb2RlUmVzZXJ2ZWQobGl0ZXJhbCk7XG4gICAgICB9XG4gICAgfVxuICApO1xuICBpZiAodGVtcGxhdGUgPT09IFwiL1wiKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gIH1cbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL3BhcnNlLmpzXG5mdW5jdGlvbiBwYXJzZShvcHRpb25zKSB7XG4gIGxldCBtZXRob2QgPSBvcHRpb25zLm1ldGhvZC50b1VwcGVyQ2FzZSgpO1xuICBsZXQgdXJsID0gKG9wdGlvbnMudXJsIHx8IFwiL1wiKS5yZXBsYWNlKC86KFthLXpdXFx3KykvZywgXCJ7JDF9XCIpO1xuICBsZXQgaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMuaGVhZGVycyk7XG4gIGxldCBib2R5O1xuICBsZXQgcGFyYW1ldGVycyA9IG9taXQob3B0aW9ucywgW1xuICAgIFwibWV0aG9kXCIsXG4gICAgXCJiYXNlVXJsXCIsXG4gICAgXCJ1cmxcIixcbiAgICBcImhlYWRlcnNcIixcbiAgICBcInJlcXVlc3RcIixcbiAgICBcIm1lZGlhVHlwZVwiXG4gIF0pO1xuICBjb25zdCB1cmxWYXJpYWJsZU5hbWVzID0gZXh0cmFjdFVybFZhcmlhYmxlTmFtZXModXJsKTtcbiAgdXJsID0gcGFyc2VVcmwodXJsKS5leHBhbmQocGFyYW1ldGVycyk7XG4gIGlmICghL15odHRwLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSBvcHRpb25zLmJhc2VVcmwgKyB1cmw7XG4gIH1cbiAgY29uc3Qgb21pdHRlZFBhcmFtZXRlcnMgPSBPYmplY3Qua2V5cyhvcHRpb25zKS5maWx0ZXIoKG9wdGlvbikgPT4gdXJsVmFyaWFibGVOYW1lcy5pbmNsdWRlcyhvcHRpb24pKS5jb25jYXQoXCJiYXNlVXJsXCIpO1xuICBjb25zdCByZW1haW5pbmdQYXJhbWV0ZXJzID0gb21pdChwYXJhbWV0ZXJzLCBvbWl0dGVkUGFyYW1ldGVycyk7XG4gIGNvbnN0IGlzQmluYXJ5UmVxdWVzdCA9IC9hcHBsaWNhdGlvblxcL29jdGV0LXN0cmVhbS9pLnRlc3QoaGVhZGVycy5hY2NlcHQpO1xuICBpZiAoIWlzQmluYXJ5UmVxdWVzdCkge1xuICAgIGlmIChvcHRpb25zLm1lZGlhVHlwZS5mb3JtYXQpIHtcbiAgICAgIGhlYWRlcnMuYWNjZXB0ID0gaGVhZGVycy5hY2NlcHQuc3BsaXQoLywvKS5tYXAoXG4gICAgICAgIChmb3JtYXQpID0+IGZvcm1hdC5yZXBsYWNlKFxuICAgICAgICAgIC9hcHBsaWNhdGlvblxcL3ZuZChcXC5cXHcrKShcXC52Myk/KFxcLlxcdyspPyhcXCtqc29uKT8kLyxcbiAgICAgICAgICBgYXBwbGljYXRpb24vdm5kJDEkMi4ke29wdGlvbnMubWVkaWFUeXBlLmZvcm1hdH1gXG4gICAgICAgIClcbiAgICAgICkuam9pbihcIixcIik7XG4gICAgfVxuICAgIGlmICh1cmwuZW5kc1dpdGgoXCIvZ3JhcGhxbFwiKSkge1xuICAgICAgaWYgKG9wdGlvbnMubWVkaWFUeXBlLnByZXZpZXdzPy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgcHJldmlld3NGcm9tQWNjZXB0SGVhZGVyID0gaGVhZGVycy5hY2NlcHQubWF0Y2goLyg/PCFbXFx3LV0pW1xcdy1dKyg/PS1wcmV2aWV3KS9nKSB8fCBbXTtcbiAgICAgICAgaGVhZGVycy5hY2NlcHQgPSBwcmV2aWV3c0Zyb21BY2NlcHRIZWFkZXIuY29uY2F0KG9wdGlvbnMubWVkaWFUeXBlLnByZXZpZXdzKS5tYXAoKHByZXZpZXcpID0+IHtcbiAgICAgICAgICBjb25zdCBmb3JtYXQgPSBvcHRpb25zLm1lZGlhVHlwZS5mb3JtYXQgPyBgLiR7b3B0aW9ucy5tZWRpYVR5cGUuZm9ybWF0fWAgOiBcIitqc29uXCI7XG4gICAgICAgICAgcmV0dXJuIGBhcHBsaWNhdGlvbi92bmQuZ2l0aHViLiR7cHJldmlld30tcHJldmlldyR7Zm9ybWF0fWA7XG4gICAgICAgIH0pLmpvaW4oXCIsXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoW1wiR0VUXCIsIFwiSEVBRFwiXS5pbmNsdWRlcyhtZXRob2QpKSB7XG4gICAgdXJsID0gYWRkUXVlcnlQYXJhbWV0ZXJzKHVybCwgcmVtYWluaW5nUGFyYW1ldGVycyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKFwiZGF0YVwiIGluIHJlbWFpbmluZ1BhcmFtZXRlcnMpIHtcbiAgICAgIGJvZHkgPSByZW1haW5pbmdQYXJhbWV0ZXJzLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhyZW1haW5pbmdQYXJhbWV0ZXJzKS5sZW5ndGgpIHtcbiAgICAgICAgYm9keSA9IHJlbWFpbmluZ1BhcmFtZXRlcnM7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICghaGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXSAmJiB0eXBlb2YgYm9keSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGhlYWRlcnNbXCJjb250ZW50LXR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIjtcbiAgfVxuICBpZiAoW1wiUEFUQ0hcIiwgXCJQVVRcIl0uaW5jbHVkZXMobWV0aG9kKSAmJiB0eXBlb2YgYm9keSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGJvZHkgPSBcIlwiO1xuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgIHsgbWV0aG9kLCB1cmwsIGhlYWRlcnMgfSxcbiAgICB0eXBlb2YgYm9keSAhPT0gXCJ1bmRlZmluZWRcIiA/IHsgYm9keSB9IDogbnVsbCxcbiAgICBvcHRpb25zLnJlcXVlc3QgPyB7IHJlcXVlc3Q6IG9wdGlvbnMucmVxdWVzdCB9IDogbnVsbFxuICApO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvZW5kcG9pbnQtd2l0aC1kZWZhdWx0cy5qc1xuZnVuY3Rpb24gZW5kcG9pbnRXaXRoRGVmYXVsdHMoZGVmYXVsdHMsIHJvdXRlLCBvcHRpb25zKSB7XG4gIHJldHVybiBwYXJzZShtZXJnZShkZWZhdWx0cywgcm91dGUsIG9wdGlvbnMpKTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL3dpdGgtZGVmYXVsdHMuanNcbmZ1bmN0aW9uIHdpdGhEZWZhdWx0cyhvbGREZWZhdWx0cywgbmV3RGVmYXVsdHMpIHtcbiAgY29uc3QgREVGQVVMVFMyID0gbWVyZ2Uob2xkRGVmYXVsdHMsIG5ld0RlZmF1bHRzKTtcbiAgY29uc3QgZW5kcG9pbnQyID0gZW5kcG9pbnRXaXRoRGVmYXVsdHMuYmluZChudWxsLCBERUZBVUxUUzIpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihlbmRwb2ludDIsIHtcbiAgICBERUZBVUxUUzogREVGQVVMVFMyLFxuICAgIGRlZmF1bHRzOiB3aXRoRGVmYXVsdHMuYmluZChudWxsLCBERUZBVUxUUzIpLFxuICAgIG1lcmdlOiBtZXJnZS5iaW5kKG51bGwsIERFRkFVTFRTMiksXG4gICAgcGFyc2VcbiAgfSk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9pbmRleC5qc1xudmFyIGVuZHBvaW50ID0gd2l0aERlZmF1bHRzKG51bGwsIERFRkFVTFRTKTtcbi8vIEFubm90YXRlIHRoZSBDb21tb25KUyBleHBvcnQgbmFtZXMgZm9yIEVTTSBpbXBvcnQgaW4gbm9kZTpcbjAgJiYgKG1vZHVsZS5leHBvcnRzID0ge1xuICBlbmRwb2ludFxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbmNsYXNzIERlcHJlY2F0aW9uIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7IC8vIE1haW50YWlucyBwcm9wZXIgc3RhY2sgdHJhY2UgKG9ubHkgYXZhaWxhYmxlIG9uIFY4KVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblxuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuXG4gICAgdGhpcy5uYW1lID0gJ0RlcHJlY2F0aW9uJztcbiAgfVxuXG59XG5cbmV4cG9ydHMuRGVwcmVjYXRpb24gPSBEZXByZWNhdGlvbjtcbiIsIi8vIFJldHVybnMgYSB3cmFwcGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHdyYXBwZWQgY2FsbGJhY2tcbi8vIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHNob3VsZCBkbyBzb21lIHN0dWZmLCBhbmQgcmV0dXJuIGFcbi8vIHByZXN1bWFibHkgZGlmZmVyZW50IGNhbGxiYWNrIGZ1bmN0aW9uLlxuLy8gVGhpcyBtYWtlcyBzdXJlIHRoYXQgb3duIHByb3BlcnRpZXMgYXJlIHJldGFpbmVkLCBzbyB0aGF0XG4vLyBkZWNvcmF0aW9ucyBhbmQgc3VjaCBhcmUgbm90IGxvc3QgYWxvbmcgdGhlIHdheS5cbm1vZHVsZS5leHBvcnRzID0gd3JhcHB5XG5mdW5jdGlvbiB3cmFwcHkgKGZuLCBjYikge1xuICBpZiAoZm4gJiYgY2IpIHJldHVybiB3cmFwcHkoZm4pKGNiKVxuXG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbmVlZCB3cmFwcGVyIGZ1bmN0aW9uJylcblxuICBPYmplY3Qua2V5cyhmbikuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgIHdyYXBwZXJba10gPSBmbltrXVxuICB9KVxuXG4gIHJldHVybiB3cmFwcGVyXG5cbiAgZnVuY3Rpb24gd3JhcHBlcigpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXVxuICAgIH1cbiAgICB2YXIgcmV0ID0gZm4uYXBwbHkodGhpcywgYXJncylcbiAgICB2YXIgY2IgPSBhcmdzW2FyZ3MubGVuZ3RoLTFdXG4gICAgaWYgKHR5cGVvZiByZXQgPT09ICdmdW5jdGlvbicgJiYgcmV0ICE9PSBjYikge1xuICAgICAgT2JqZWN0LmtleXMoY2IpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgcmV0W2tdID0gY2Jba11cbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiByZXRcbiAgfVxufVxuIiwidmFyIHdyYXBweSA9IHJlcXVpcmUoJ3dyYXBweScpXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBweShvbmNlKVxubW9kdWxlLmV4cG9ydHMuc3RyaWN0ID0gd3JhcHB5KG9uY2VTdHJpY3QpXG5cbm9uY2UucHJvdG8gPSBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bmN0aW9uLnByb3RvdHlwZSwgJ29uY2UnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvbmNlKHRoaXMpXG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSlcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRnVuY3Rpb24ucHJvdG90eXBlLCAnb25jZVN0cmljdCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9uY2VTdHJpY3QodGhpcylcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KVxufSlcblxuZnVuY3Rpb24gb25jZSAoZm4pIHtcbiAgdmFyIGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGYuY2FsbGVkKSByZXR1cm4gZi52YWx1ZVxuICAgIGYuY2FsbGVkID0gdHJ1ZVxuICAgIHJldHVybiBmLnZhbHVlID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG4gIGYuY2FsbGVkID0gZmFsc2VcbiAgcmV0dXJuIGZcbn1cblxuZnVuY3Rpb24gb25jZVN0cmljdCAoZm4pIHtcbiAgdmFyIGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGYuY2FsbGVkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGYub25jZUVycm9yKVxuICAgIGYuY2FsbGVkID0gdHJ1ZVxuICAgIHJldHVybiBmLnZhbHVlID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG4gIHZhciBuYW1lID0gZm4ubmFtZSB8fCAnRnVuY3Rpb24gd3JhcHBlZCB3aXRoIGBvbmNlYCdcbiAgZi5vbmNlRXJyb3IgPSBuYW1lICsgXCIgc2hvdWxkbid0IGJlIGNhbGxlZCBtb3JlIHRoYW4gb25jZVwiXG4gIGYuY2FsbGVkID0gZmFsc2VcbiAgcmV0dXJuIGZcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19nZXRPd25Qcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBfX2dldFByb3RvT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvRVNNID0gKG1vZCwgaXNOb2RlTW9kZSwgdGFyZ2V0KSA9PiAodGFyZ2V0ID0gbW9kICE9IG51bGwgPyBfX2NyZWF0ZShfX2dldFByb3RvT2YobW9kKSkgOiB7fSwgX19jb3B5UHJvcHMoXG4gIC8vIElmIHRoZSBpbXBvcnRlciBpcyBpbiBub2RlIGNvbXBhdGliaWxpdHkgbW9kZSBvciB0aGlzIGlzIG5vdCBhbiBFU01cbiAgLy8gZmlsZSB0aGF0IGhhcyBiZWVuIGNvbnZlcnRlZCB0byBhIENvbW1vbkpTIGZpbGUgdXNpbmcgYSBCYWJlbC1cbiAgLy8gY29tcGF0aWJsZSB0cmFuc2Zvcm0gKGkuZS4gXCJfX2VzTW9kdWxlXCIgaGFzIG5vdCBiZWVuIHNldCksIHRoZW4gc2V0XG4gIC8vIFwiZGVmYXVsdFwiIHRvIHRoZSBDb21tb25KUyBcIm1vZHVsZS5leHBvcnRzXCIgZm9yIG5vZGUgY29tcGF0aWJpbGl0eS5cbiAgaXNOb2RlTW9kZSB8fCAhbW9kIHx8ICFtb2QuX19lc01vZHVsZSA/IF9fZGVmUHJvcCh0YXJnZXQsIFwiZGVmYXVsdFwiLCB7IHZhbHVlOiBtb2QsIGVudW1lcmFibGU6IHRydWUgfSkgOiB0YXJnZXQsXG4gIG1vZFxuKSk7XG52YXIgX190b0NvbW1vbkpTID0gKG1vZCkgPT4gX19jb3B5UHJvcHMoX19kZWZQcm9wKHt9LCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KSwgbW9kKTtcblxuLy8gcGtnL2Rpc3Qtc3JjL2luZGV4LmpzXG52YXIgZGlzdF9zcmNfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQoZGlzdF9zcmNfZXhwb3J0cywge1xuICBSZXF1ZXN0RXJyb3I6ICgpID0+IFJlcXVlc3RFcnJvclxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fdG9Db21tb25KUyhkaXN0X3NyY19leHBvcnRzKTtcbnZhciBpbXBvcnRfZGVwcmVjYXRpb24gPSByZXF1aXJlKFwiZGVwcmVjYXRpb25cIik7XG52YXIgaW1wb3J0X29uY2UgPSBfX3RvRVNNKHJlcXVpcmUoXCJvbmNlXCIpKTtcbnZhciBsb2dPbmNlQ29kZSA9ICgwLCBpbXBvcnRfb25jZS5kZWZhdWx0KSgoZGVwcmVjYXRpb24pID0+IGNvbnNvbGUud2FybihkZXByZWNhdGlvbikpO1xudmFyIGxvZ09uY2VIZWFkZXJzID0gKDAsIGltcG9ydF9vbmNlLmRlZmF1bHQpKChkZXByZWNhdGlvbikgPT4gY29uc29sZS53YXJuKGRlcHJlY2F0aW9uKSk7XG52YXIgUmVxdWVzdEVycm9yID0gY2xhc3MgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHN0YXR1c0NvZGUsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgIH1cbiAgICB0aGlzLm5hbWUgPSBcIkh0dHBFcnJvclwiO1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzQ29kZTtcbiAgICBsZXQgaGVhZGVycztcbiAgICBpZiAoXCJoZWFkZXJzXCIgaW4gb3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5oZWFkZXJzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBoZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzO1xuICAgIH1cbiAgICBpZiAoXCJyZXNwb25zZVwiIGluIG9wdGlvbnMpIHtcbiAgICAgIHRoaXMucmVzcG9uc2UgPSBvcHRpb25zLnJlc3BvbnNlO1xuICAgICAgaGVhZGVycyA9IG9wdGlvbnMucmVzcG9uc2UuaGVhZGVycztcbiAgICB9XG4gICAgY29uc3QgcmVxdWVzdENvcHkgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLnJlcXVlc3QpO1xuICAgIGlmIChvcHRpb25zLnJlcXVlc3QuaGVhZGVycy5hdXRob3JpemF0aW9uKSB7XG4gICAgICByZXF1ZXN0Q29weS5oZWFkZXJzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucy5yZXF1ZXN0LmhlYWRlcnMsIHtcbiAgICAgICAgYXV0aG9yaXphdGlvbjogb3B0aW9ucy5yZXF1ZXN0LmhlYWRlcnMuYXV0aG9yaXphdGlvbi5yZXBsYWNlKFxuICAgICAgICAgIC8oPzwhICkgLiokLyxcbiAgICAgICAgICBcIiBbUkVEQUNURURdXCJcbiAgICAgICAgKVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlcXVlc3RDb3B5LnVybCA9IHJlcXVlc3RDb3B5LnVybC5yZXBsYWNlKC9cXGJjbGllbnRfc2VjcmV0PVxcdysvZywgXCJjbGllbnRfc2VjcmV0PVtSRURBQ1RFRF1cIikucmVwbGFjZSgvXFxiYWNjZXNzX3Rva2VuPVxcdysvZywgXCJhY2Nlc3NfdG9rZW49W1JFREFDVEVEXVwiKTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0Q29weTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJjb2RlXCIsIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgbG9nT25jZUNvZGUoXG4gICAgICAgICAgbmV3IGltcG9ydF9kZXByZWNhdGlvbi5EZXByZWNhdGlvbihcbiAgICAgICAgICAgIFwiW0BvY3Rva2l0L3JlcXVlc3QtZXJyb3JdIGBlcnJvci5jb2RlYCBpcyBkZXByZWNhdGVkLCB1c2UgYGVycm9yLnN0YXR1c2AuXCJcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBzdGF0dXNDb2RlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImhlYWRlcnNcIiwge1xuICAgICAgZ2V0KCkge1xuICAgICAgICBsb2dPbmNlSGVhZGVycyhcbiAgICAgICAgICBuZXcgaW1wb3J0X2RlcHJlY2F0aW9uLkRlcHJlY2F0aW9uKFxuICAgICAgICAgICAgXCJbQG9jdG9raXQvcmVxdWVzdC1lcnJvcl0gYGVycm9yLmhlYWRlcnNgIGlzIGRlcHJlY2F0ZWQsIHVzZSBgZXJyb3IucmVzcG9uc2UuaGVhZGVyc2AuXCJcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBoZWFkZXJzIHx8IHt9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuLy8gQW5ub3RhdGUgdGhlIENvbW1vbkpTIGV4cG9ydCBuYW1lcyBmb3IgRVNNIGltcG9ydCBpbiBub2RlOlxuMCAmJiAobW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJlcXVlc3RFcnJvclxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19nZXRPd25Qcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBfX2hhc093blByb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIF9fZXhwb3J0ID0gKHRhcmdldCwgYWxsKSA9PiB7XG4gIGZvciAodmFyIG5hbWUgaW4gYWxsKVxuICAgIF9fZGVmUHJvcCh0YXJnZXQsIG5hbWUsIHsgZ2V0OiBhbGxbbmFtZV0sIGVudW1lcmFibGU6IHRydWUgfSk7XG59O1xudmFyIF9fY29weVByb3BzID0gKHRvLCBmcm9tLCBleGNlcHQsIGRlc2MpID0+IHtcbiAgaWYgKGZyb20gJiYgdHlwZW9mIGZyb20gPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGZyb20gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGZvciAobGV0IGtleSBvZiBfX2dldE93blByb3BOYW1lcyhmcm9tKSlcbiAgICAgIGlmICghX19oYXNPd25Qcm9wLmNhbGwodG8sIGtleSkgJiYga2V5ICE9PSBleGNlcHQpXG4gICAgICAgIF9fZGVmUHJvcCh0bywga2V5LCB7IGdldDogKCkgPT4gZnJvbVtrZXldLCBlbnVtZXJhYmxlOiAhKGRlc2MgPSBfX2dldE93blByb3BEZXNjKGZyb20sIGtleSkpIHx8IGRlc2MuZW51bWVyYWJsZSB9KTtcbiAgfVxuICByZXR1cm4gdG87XG59O1xudmFyIF9fdG9Db21tb25KUyA9IChtb2QpID0+IF9fY29weVByb3BzKF9fZGVmUHJvcCh7fSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSksIG1vZCk7XG5cbi8vIHBrZy9kaXN0LXNyYy9pbmRleC5qc1xudmFyIGRpc3Rfc3JjX2V4cG9ydHMgPSB7fTtcbl9fZXhwb3J0KGRpc3Rfc3JjX2V4cG9ydHMsIHtcbiAgcmVxdWVzdDogKCkgPT4gcmVxdWVzdFxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fdG9Db21tb25KUyhkaXN0X3NyY19leHBvcnRzKTtcbnZhciBpbXBvcnRfZW5kcG9pbnQgPSByZXF1aXJlKFwiQG9jdG9raXQvZW5kcG9pbnRcIik7XG52YXIgaW1wb3J0X3VuaXZlcnNhbF91c2VyX2FnZW50ID0gcmVxdWlyZShcInVuaXZlcnNhbC11c2VyLWFnZW50XCIpO1xuXG4vLyBwa2cvZGlzdC1zcmMvdmVyc2lvbi5qc1xudmFyIFZFUlNJT04gPSBcIjguNC4xXCI7XG5cbi8vIHBrZy9kaXN0LXNyYy9pcy1wbGFpbi1vYmplY3QuanNcbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCB2YWx1ZSA9PT0gbnVsbClcbiAgICByZXR1cm4gZmFsc2U7XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICE9PSBcIltvYmplY3QgT2JqZWN0XVwiKVxuICAgIHJldHVybiBmYWxzZTtcbiAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpXG4gICAgcmV0dXJuIHRydWU7XG4gIGNvbnN0IEN0b3IgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocHJvdG8sIFwiY29uc3RydWN0b3JcIikgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PT0gXCJmdW5jdGlvblwiICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsKEN0b3IpID09PSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbCh2YWx1ZSk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9mZXRjaC13cmFwcGVyLmpzXG52YXIgaW1wb3J0X3JlcXVlc3RfZXJyb3IgPSByZXF1aXJlKFwiQG9jdG9raXQvcmVxdWVzdC1lcnJvclwiKTtcblxuLy8gcGtnL2Rpc3Qtc3JjL2dldC1idWZmZXItcmVzcG9uc2UuanNcbmZ1bmN0aW9uIGdldEJ1ZmZlclJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gIHJldHVybiByZXNwb25zZS5hcnJheUJ1ZmZlcigpO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvZmV0Y2gtd3JhcHBlci5qc1xuZnVuY3Rpb24gZmV0Y2hXcmFwcGVyKHJlcXVlc3RPcHRpb25zKSB7XG4gIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgY29uc3QgbG9nID0gcmVxdWVzdE9wdGlvbnMucmVxdWVzdCAmJiByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0LmxvZyA/IHJlcXVlc3RPcHRpb25zLnJlcXVlc3QubG9nIDogY29uc29sZTtcbiAgY29uc3QgcGFyc2VTdWNjZXNzUmVzcG9uc2VCb2R5ID0gKChfYSA9IHJlcXVlc3RPcHRpb25zLnJlcXVlc3QpID09IG51bGwgPyB2b2lkIDAgOiBfYS5wYXJzZVN1Y2Nlc3NSZXNwb25zZUJvZHkpICE9PSBmYWxzZTtcbiAgaWYgKGlzUGxhaW5PYmplY3QocmVxdWVzdE9wdGlvbnMuYm9keSkgfHwgQXJyYXkuaXNBcnJheShyZXF1ZXN0T3B0aW9ucy5ib2R5KSkge1xuICAgIHJlcXVlc3RPcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0T3B0aW9ucy5ib2R5KTtcbiAgfVxuICBsZXQgaGVhZGVycyA9IHt9O1xuICBsZXQgc3RhdHVzO1xuICBsZXQgdXJsO1xuICBsZXQgeyBmZXRjaCB9ID0gZ2xvYmFsVGhpcztcbiAgaWYgKChfYiA9IHJlcXVlc3RPcHRpb25zLnJlcXVlc3QpID09IG51bGwgPyB2b2lkIDAgOiBfYi5mZXRjaCkge1xuICAgIGZldGNoID0gcmVxdWVzdE9wdGlvbnMucmVxdWVzdC5mZXRjaDtcbiAgfVxuICBpZiAoIWZldGNoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJmZXRjaCBpcyBub3Qgc2V0LiBQbGVhc2UgcGFzcyBhIGZldGNoIGltcGxlbWVudGF0aW9uIGFzIG5ldyBPY3Rva2l0KHsgcmVxdWVzdDogeyBmZXRjaCB9fSkuIExlYXJuIG1vcmUgYXQgaHR0cHM6Ly9naXRodWIuY29tL29jdG9raXQvb2N0b2tpdC5qcy8jZmV0Y2gtbWlzc2luZ1wiXG4gICAgKTtcbiAgfVxuICByZXR1cm4gZmV0Y2gocmVxdWVzdE9wdGlvbnMudXJsLCB7XG4gICAgbWV0aG9kOiByZXF1ZXN0T3B0aW9ucy5tZXRob2QsXG4gICAgYm9keTogcmVxdWVzdE9wdGlvbnMuYm9keSxcbiAgICByZWRpcmVjdDogKF9jID0gcmVxdWVzdE9wdGlvbnMucmVxdWVzdCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9jLnJlZGlyZWN0LFxuICAgIGhlYWRlcnM6IHJlcXVlc3RPcHRpb25zLmhlYWRlcnMsXG4gICAgc2lnbmFsOiAoX2QgPSByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0KSA9PSBudWxsID8gdm9pZCAwIDogX2Quc2lnbmFsLFxuICAgIC8vIGR1cGxleCBtdXN0IGJlIHNldCBpZiByZXF1ZXN0LmJvZHkgaXMgUmVhZGFibGVTdHJlYW0gb3IgQXN5bmMgSXRlcmFibGVzLlxuICAgIC8vIFNlZSBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jZG9tLXJlcXVlc3Rpbml0LWR1cGxleC5cbiAgICAuLi5yZXF1ZXN0T3B0aW9ucy5ib2R5ICYmIHsgZHVwbGV4OiBcImhhbGZcIiB9XG4gIH0pLnRoZW4oYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgdXJsID0gcmVzcG9uc2UudXJsO1xuICAgIHN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICBmb3IgKGNvbnN0IGtleUFuZFZhbHVlIG9mIHJlc3BvbnNlLmhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnNba2V5QW5kVmFsdWVbMF1dID0ga2V5QW5kVmFsdWVbMV07XG4gICAgfVxuICAgIGlmIChcImRlcHJlY2F0aW9uXCIgaW4gaGVhZGVycykge1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IGhlYWRlcnMubGluayAmJiBoZWFkZXJzLmxpbmsubWF0Y2goLzwoW148Pl0rKT47IHJlbD1cImRlcHJlY2F0aW9uXCIvKTtcbiAgICAgIGNvbnN0IGRlcHJlY2F0aW9uTGluayA9IG1hdGNoZXMgJiYgbWF0Y2hlcy5wb3AoKTtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgW0BvY3Rva2l0L3JlcXVlc3RdIFwiJHtyZXF1ZXN0T3B0aW9ucy5tZXRob2R9ICR7cmVxdWVzdE9wdGlvbnMudXJsfVwiIGlzIGRlcHJlY2F0ZWQuIEl0IGlzIHNjaGVkdWxlZCB0byBiZSByZW1vdmVkIG9uICR7aGVhZGVycy5zdW5zZXR9JHtkZXByZWNhdGlvbkxpbmsgPyBgLiBTZWUgJHtkZXByZWNhdGlvbkxpbmt9YCA6IFwiXCJ9YFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHN0YXR1cyA9PT0gMjA0IHx8IHN0YXR1cyA9PT0gMjA1KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5tZXRob2QgPT09IFwiSEVBRFwiKSB7XG4gICAgICBpZiAoc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBpbXBvcnRfcmVxdWVzdF9lcnJvci5SZXF1ZXN0RXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCwgc3RhdHVzLCB7XG4gICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgdXJsLFxuICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIGRhdGE6IHZvaWQgMFxuICAgICAgICB9LFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0T3B0aW9uc1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChzdGF0dXMgPT09IDMwNCkge1xuICAgICAgdGhyb3cgbmV3IGltcG9ydF9yZXF1ZXN0X2Vycm9yLlJlcXVlc3RFcnJvcihcIk5vdCBtb2RpZmllZFwiLCBzdGF0dXMsIHtcbiAgICAgICAgcmVzcG9uc2U6IHtcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgZGF0YTogYXdhaXQgZ2V0UmVzcG9uc2VEYXRhKHJlc3BvbnNlKVxuICAgICAgICB9LFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0T3B0aW9uc1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChzdGF0dXMgPj0gNDAwKSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0UmVzcG9uc2VEYXRhKHJlc3BvbnNlKTtcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IGltcG9ydF9yZXF1ZXN0X2Vycm9yLlJlcXVlc3RFcnJvcih0b0Vycm9yTWVzc2FnZShkYXRhKSwgc3RhdHVzLCB7XG4gICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgdXJsLFxuICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIGRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdE9wdGlvbnNcbiAgICAgIH0pO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZVN1Y2Nlc3NSZXNwb25zZUJvZHkgPyBhd2FpdCBnZXRSZXNwb25zZURhdGEocmVzcG9uc2UpIDogcmVzcG9uc2UuYm9keTtcbiAgfSkudGhlbigoZGF0YSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXMsXG4gICAgICB1cmwsXG4gICAgICBoZWFkZXJzLFxuICAgICAgZGF0YVxuICAgIH07XG4gIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIGltcG9ydF9yZXF1ZXN0X2Vycm9yLlJlcXVlc3RFcnJvcilcbiAgICAgIHRocm93IGVycm9yO1xuICAgIGVsc2UgaWYgKGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKVxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgbGV0IG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgIGlmIChlcnJvci5uYW1lID09PSBcIlR5cGVFcnJvclwiICYmIFwiY2F1c2VcIiBpbiBlcnJvcikge1xuICAgICAgaWYgKGVycm9yLmNhdXNlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLmNhdXNlLm1lc3NhZ2U7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvci5jYXVzZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IuY2F1c2U7XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBpbXBvcnRfcmVxdWVzdF9lcnJvci5SZXF1ZXN0RXJyb3IobWVzc2FnZSwgNTAwLCB7XG4gICAgICByZXF1ZXN0OiByZXF1ZXN0T3B0aW9uc1xuICAgIH0pO1xuICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldFJlc3BvbnNlRGF0YShyZXNwb25zZSkge1xuICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpO1xuICBpZiAoL2FwcGxpY2F0aW9uXFwvanNvbi8udGVzdChjb250ZW50VHlwZSkpIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+IHJlc3BvbnNlLnRleHQoKSkuY2F0Y2goKCkgPT4gXCJcIik7XG4gIH1cbiAgaWYgKCFjb250ZW50VHlwZSB8fCAvXnRleHRcXC98Y2hhcnNldD11dGYtOCQvLnRlc3QoY29udGVudFR5cGUpKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgfVxuICByZXR1cm4gZ2V0QnVmZmVyUmVzcG9uc2UocmVzcG9uc2UpO1xufVxuZnVuY3Rpb24gdG9FcnJvck1lc3NhZ2UoZGF0YSkge1xuICBpZiAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIGRhdGE7XG4gIGxldCBzdWZmaXg7XG4gIGlmIChcImRvY3VtZW50YXRpb25fdXJsXCIgaW4gZGF0YSkge1xuICAgIHN1ZmZpeCA9IGAgLSAke2RhdGEuZG9jdW1lbnRhdGlvbl91cmx9YDtcbiAgfSBlbHNlIHtcbiAgICBzdWZmaXggPSBcIlwiO1xuICB9XG4gIGlmIChcIm1lc3NhZ2VcIiBpbiBkYXRhKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS5lcnJvcnMpKSB7XG4gICAgICByZXR1cm4gYCR7ZGF0YS5tZXNzYWdlfTogJHtkYXRhLmVycm9ycy5tYXAoSlNPTi5zdHJpbmdpZnkpLmpvaW4oXCIsIFwiKX0ke3N1ZmZpeH1gO1xuICAgIH1cbiAgICByZXR1cm4gYCR7ZGF0YS5tZXNzYWdlfSR7c3VmZml4fWA7XG4gIH1cbiAgcmV0dXJuIGBVbmtub3duIGVycm9yOiAke0pTT04uc3RyaW5naWZ5KGRhdGEpfWA7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy93aXRoLWRlZmF1bHRzLmpzXG5mdW5jdGlvbiB3aXRoRGVmYXVsdHMob2xkRW5kcG9pbnQsIG5ld0RlZmF1bHRzKSB7XG4gIGNvbnN0IGVuZHBvaW50MiA9IG9sZEVuZHBvaW50LmRlZmF1bHRzKG5ld0RlZmF1bHRzKTtcbiAgY29uc3QgbmV3QXBpID0gZnVuY3Rpb24ocm91dGUsIHBhcmFtZXRlcnMpIHtcbiAgICBjb25zdCBlbmRwb2ludE9wdGlvbnMgPSBlbmRwb2ludDIubWVyZ2Uocm91dGUsIHBhcmFtZXRlcnMpO1xuICAgIGlmICghZW5kcG9pbnRPcHRpb25zLnJlcXVlc3QgfHwgIWVuZHBvaW50T3B0aW9ucy5yZXF1ZXN0Lmhvb2spIHtcbiAgICAgIHJldHVybiBmZXRjaFdyYXBwZXIoZW5kcG9pbnQyLnBhcnNlKGVuZHBvaW50T3B0aW9ucykpO1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0MiA9IChyb3V0ZTIsIHBhcmFtZXRlcnMyKSA9PiB7XG4gICAgICByZXR1cm4gZmV0Y2hXcmFwcGVyKFxuICAgICAgICBlbmRwb2ludDIucGFyc2UoZW5kcG9pbnQyLm1lcmdlKHJvdXRlMiwgcGFyYW1ldGVyczIpKVxuICAgICAgKTtcbiAgICB9O1xuICAgIE9iamVjdC5hc3NpZ24ocmVxdWVzdDIsIHtcbiAgICAgIGVuZHBvaW50OiBlbmRwb2ludDIsXG4gICAgICBkZWZhdWx0czogd2l0aERlZmF1bHRzLmJpbmQobnVsbCwgZW5kcG9pbnQyKVxuICAgIH0pO1xuICAgIHJldHVybiBlbmRwb2ludE9wdGlvbnMucmVxdWVzdC5ob29rKHJlcXVlc3QyLCBlbmRwb2ludE9wdGlvbnMpO1xuICB9O1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXdBcGksIHtcbiAgICBlbmRwb2ludDogZW5kcG9pbnQyLFxuICAgIGRlZmF1bHRzOiB3aXRoRGVmYXVsdHMuYmluZChudWxsLCBlbmRwb2ludDIpXG4gIH0pO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbnZhciByZXF1ZXN0ID0gd2l0aERlZmF1bHRzKGltcG9ydF9lbmRwb2ludC5lbmRwb2ludCwge1xuICBoZWFkZXJzOiB7XG4gICAgXCJ1c2VyLWFnZW50XCI6IGBvY3Rva2l0LXJlcXVlc3QuanMvJHtWRVJTSU9OfSAkeygwLCBpbXBvcnRfdW5pdmVyc2FsX3VzZXJfYWdlbnQuZ2V0VXNlckFnZW50KSgpfWBcbiAgfVxufSk7XG4vLyBBbm5vdGF0ZSB0aGUgQ29tbW9uSlMgZXhwb3J0IG5hbWVzIGZvciBFU00gaW1wb3J0IGluIG5vZGU6XG4wICYmIChtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVxdWVzdFxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19nZXRPd25Qcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBfX2hhc093blByb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIF9fZXhwb3J0ID0gKHRhcmdldCwgYWxsKSA9PiB7XG4gIGZvciAodmFyIG5hbWUgaW4gYWxsKVxuICAgIF9fZGVmUHJvcCh0YXJnZXQsIG5hbWUsIHsgZ2V0OiBhbGxbbmFtZV0sIGVudW1lcmFibGU6IHRydWUgfSk7XG59O1xudmFyIF9fY29weVByb3BzID0gKHRvLCBmcm9tLCBleGNlcHQsIGRlc2MpID0+IHtcbiAgaWYgKGZyb20gJiYgdHlwZW9mIGZyb20gPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGZyb20gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGZvciAobGV0IGtleSBvZiBfX2dldE93blByb3BOYW1lcyhmcm9tKSlcbiAgICAgIGlmICghX19oYXNPd25Qcm9wLmNhbGwodG8sIGtleSkgJiYga2V5ICE9PSBleGNlcHQpXG4gICAgICAgIF9fZGVmUHJvcCh0bywga2V5LCB7IGdldDogKCkgPT4gZnJvbVtrZXldLCBlbnVtZXJhYmxlOiAhKGRlc2MgPSBfX2dldE93blByb3BEZXNjKGZyb20sIGtleSkpIHx8IGRlc2MuZW51bWVyYWJsZSB9KTtcbiAgfVxuICByZXR1cm4gdG87XG59O1xudmFyIF9fdG9Db21tb25KUyA9IChtb2QpID0+IF9fY29weVByb3BzKF9fZGVmUHJvcCh7fSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSksIG1vZCk7XG5cbi8vIHBrZy9kaXN0LXNyYy9pbmRleC5qc1xudmFyIGluZGV4X2V4cG9ydHMgPSB7fTtcbl9fZXhwb3J0KGluZGV4X2V4cG9ydHMsIHtcbiAgR3JhcGhxbFJlc3BvbnNlRXJyb3I6ICgpID0+IEdyYXBocWxSZXNwb25zZUVycm9yLFxuICBncmFwaHFsOiAoKSA9PiBncmFwaHFsMixcbiAgd2l0aEN1c3RvbVJlcXVlc3Q6ICgpID0+IHdpdGhDdXN0b21SZXF1ZXN0XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX190b0NvbW1vbkpTKGluZGV4X2V4cG9ydHMpO1xudmFyIGltcG9ydF9yZXF1ZXN0MyA9IHJlcXVpcmUoXCJAb2N0b2tpdC9yZXF1ZXN0XCIpO1xudmFyIGltcG9ydF91bml2ZXJzYWxfdXNlcl9hZ2VudCA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtdXNlci1hZ2VudFwiKTtcblxuLy8gcGtnL2Rpc3Qtc3JjL3ZlcnNpb24uanNcbnZhciBWRVJTSU9OID0gXCI3LjEuMVwiO1xuXG4vLyBwa2cvZGlzdC1zcmMvd2l0aC1kZWZhdWx0cy5qc1xudmFyIGltcG9ydF9yZXF1ZXN0MiA9IHJlcXVpcmUoXCJAb2N0b2tpdC9yZXF1ZXN0XCIpO1xuXG4vLyBwa2cvZGlzdC1zcmMvZ3JhcGhxbC5qc1xudmFyIGltcG9ydF9yZXF1ZXN0ID0gcmVxdWlyZShcIkBvY3Rva2l0L3JlcXVlc3RcIik7XG5cbi8vIHBrZy9kaXN0LXNyYy9lcnJvci5qc1xuZnVuY3Rpb24gX2J1aWxkTWVzc2FnZUZvclJlc3BvbnNlRXJyb3JzKGRhdGEpIHtcbiAgcmV0dXJuIGBSZXF1ZXN0IGZhaWxlZCBkdWUgdG8gZm9sbG93aW5nIHJlc3BvbnNlIGVycm9yczpcbmAgKyBkYXRhLmVycm9ycy5tYXAoKGUpID0+IGAgLSAke2UubWVzc2FnZX1gKS5qb2luKFwiXFxuXCIpO1xufVxudmFyIEdyYXBocWxSZXNwb25zZUVycm9yID0gY2xhc3MgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHJlcXVlc3QyLCBoZWFkZXJzLCByZXNwb25zZSkge1xuICAgIHN1cGVyKF9idWlsZE1lc3NhZ2VGb3JSZXNwb25zZUVycm9ycyhyZXNwb25zZSkpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3QyO1xuICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIHRoaXMubmFtZSA9IFwiR3JhcGhxbFJlc3BvbnNlRXJyb3JcIjtcbiAgICB0aGlzLmVycm9ycyA9IHJlc3BvbnNlLmVycm9ycztcbiAgICB0aGlzLmRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuICB9XG59O1xuXG4vLyBwa2cvZGlzdC1zcmMvZ3JhcGhxbC5qc1xudmFyIE5PTl9WQVJJQUJMRV9PUFRJT05TID0gW1xuICBcIm1ldGhvZFwiLFxuICBcImJhc2VVcmxcIixcbiAgXCJ1cmxcIixcbiAgXCJoZWFkZXJzXCIsXG4gIFwicmVxdWVzdFwiLFxuICBcInF1ZXJ5XCIsXG4gIFwibWVkaWFUeXBlXCJcbl07XG52YXIgRk9SQklEREVOX1ZBUklBQkxFX09QVElPTlMgPSBbXCJxdWVyeVwiLCBcIm1ldGhvZFwiLCBcInVybFwiXTtcbnZhciBHSEVTX1YzX1NVRkZJWF9SRUdFWCA9IC9cXC9hcGlcXC92M1xcLz8kLztcbmZ1bmN0aW9uIGdyYXBocWwocmVxdWVzdDIsIHF1ZXJ5LCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gXCJzdHJpbmdcIiAmJiBcInF1ZXJ5XCIgaW4gb3B0aW9ucykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICBuZXcgRXJyb3IoYFtAb2N0b2tpdC9ncmFwaHFsXSBcInF1ZXJ5XCIgY2Fubm90IGJlIHVzZWQgYXMgdmFyaWFibGUgbmFtZWApXG4gICAgICApO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRpb25zKSB7XG4gICAgICBpZiAoIUZPUkJJRERFTl9WQVJJQUJMRV9PUFRJT05TLmluY2x1ZGVzKGtleSkpIGNvbnRpbnVlO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgYFtAb2N0b2tpdC9ncmFwaHFsXSBcIiR7a2V5fVwiIGNhbm5vdCBiZSB1c2VkIGFzIHZhcmlhYmxlIG5hbWVgXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGNvbnN0IHBhcnNlZE9wdGlvbnMgPSB0eXBlb2YgcXVlcnkgPT09IFwic3RyaW5nXCIgPyBPYmplY3QuYXNzaWduKHsgcXVlcnkgfSwgb3B0aW9ucykgOiBxdWVyeTtcbiAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBPYmplY3Qua2V5cyhcbiAgICBwYXJzZWRPcHRpb25zXG4gICkucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuICAgIGlmIChOT05fVkFSSUFCTEVfT1BUSU9OUy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHBhcnNlZE9wdGlvbnNba2V5XTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmICghcmVzdWx0LnZhcmlhYmxlcykge1xuICAgICAgcmVzdWx0LnZhcmlhYmxlcyA9IHt9O1xuICAgIH1cbiAgICByZXN1bHQudmFyaWFibGVzW2tleV0gPSBwYXJzZWRPcHRpb25zW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSwge30pO1xuICBjb25zdCBiYXNlVXJsID0gcGFyc2VkT3B0aW9ucy5iYXNlVXJsIHx8IHJlcXVlc3QyLmVuZHBvaW50LkRFRkFVTFRTLmJhc2VVcmw7XG4gIGlmIChHSEVTX1YzX1NVRkZJWF9SRUdFWC50ZXN0KGJhc2VVcmwpKSB7XG4gICAgcmVxdWVzdE9wdGlvbnMudXJsID0gYmFzZVVybC5yZXBsYWNlKEdIRVNfVjNfU1VGRklYX1JFR0VYLCBcIi9hcGkvZ3JhcGhxbFwiKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdDIocmVxdWVzdE9wdGlvbnMpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLmRhdGEuZXJyb3JzKSB7XG4gICAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZXNwb25zZS5oZWFkZXJzKSkge1xuICAgICAgICBoZWFkZXJzW2tleV0gPSByZXNwb25zZS5oZWFkZXJzW2tleV07XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgR3JhcGhxbFJlc3BvbnNlRXJyb3IoXG4gICAgICAgIHJlcXVlc3RPcHRpb25zLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICByZXNwb25zZS5kYXRhXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICB9KTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL3dpdGgtZGVmYXVsdHMuanNcbmZ1bmN0aW9uIHdpdGhEZWZhdWx0cyhyZXF1ZXN0MiwgbmV3RGVmYXVsdHMpIHtcbiAgY29uc3QgbmV3UmVxdWVzdCA9IHJlcXVlc3QyLmRlZmF1bHRzKG5ld0RlZmF1bHRzKTtcbiAgY29uc3QgbmV3QXBpID0gKHF1ZXJ5LCBvcHRpb25zKSA9PiB7XG4gICAgcmV0dXJuIGdyYXBocWwobmV3UmVxdWVzdCwgcXVlcnksIG9wdGlvbnMpO1xuICB9O1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXdBcGksIHtcbiAgICBkZWZhdWx0czogd2l0aERlZmF1bHRzLmJpbmQobnVsbCwgbmV3UmVxdWVzdCksXG4gICAgZW5kcG9pbnQ6IG5ld1JlcXVlc3QuZW5kcG9pbnRcbiAgfSk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9pbmRleC5qc1xudmFyIGdyYXBocWwyID0gd2l0aERlZmF1bHRzKGltcG9ydF9yZXF1ZXN0My5yZXF1ZXN0LCB7XG4gIGhlYWRlcnM6IHtcbiAgICBcInVzZXItYWdlbnRcIjogYG9jdG9raXQtZ3JhcGhxbC5qcy8ke1ZFUlNJT059ICR7KDAsIGltcG9ydF91bml2ZXJzYWxfdXNlcl9hZ2VudC5nZXRVc2VyQWdlbnQpKCl9YFxuICB9LFxuICBtZXRob2Q6IFwiUE9TVFwiLFxuICB1cmw6IFwiL2dyYXBocWxcIlxufSk7XG5mdW5jdGlvbiB3aXRoQ3VzdG9tUmVxdWVzdChjdXN0b21SZXF1ZXN0KSB7XG4gIHJldHVybiB3aXRoRGVmYXVsdHMoY3VzdG9tUmVxdWVzdCwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBcIi9ncmFwaHFsXCJcbiAgfSk7XG59XG4vLyBBbm5vdGF0ZSB0aGUgQ29tbW9uSlMgZXhwb3J0IG5hbWVzIGZvciBFU00gaW1wb3J0IGluIG5vZGU6XG4wICYmIChtb2R1bGUuZXhwb3J0cyA9IHtcbiAgR3JhcGhxbFJlc3BvbnNlRXJyb3IsXG4gIGdyYXBocWwsXG4gIHdpdGhDdXN0b21SZXF1ZXN0XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19leHBvcnQgPSAodGFyZ2V0LCBhbGwpID0+IHtcbiAgZm9yICh2YXIgbmFtZSBpbiBhbGwpXG4gICAgX19kZWZQcm9wKHRhcmdldCwgbmFtZSwgeyBnZXQ6IGFsbFtuYW1lXSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbn07XG52YXIgX19jb3B5UHJvcHMgPSAodG8sIGZyb20sIGV4Y2VwdCwgZGVzYykgPT4ge1xuICBpZiAoZnJvbSAmJiB0eXBlb2YgZnJvbSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20pKVxuICAgICAgaWYgKCFfX2hhc093blByb3AuY2FsbCh0bywga2V5KSAmJiBrZXkgIT09IGV4Y2VwdClcbiAgICAgICAgX19kZWZQcm9wKHRvLCBrZXksIHsgZ2V0OiAoKSA9PiBmcm9tW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MoZnJvbSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0bztcbn07XG52YXIgX190b0NvbW1vbkpTID0gKG1vZCkgPT4gX19jb3B5UHJvcHMoX19kZWZQcm9wKHt9LCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KSwgbW9kKTtcblxuLy8gcGtnL2Rpc3Qtc3JjL2luZGV4LmpzXG52YXIgZGlzdF9zcmNfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQoZGlzdF9zcmNfZXhwb3J0cywge1xuICBjcmVhdGVUb2tlbkF1dGg6ICgpID0+IGNyZWF0ZVRva2VuQXV0aFxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fdG9Db21tb25KUyhkaXN0X3NyY19leHBvcnRzKTtcblxuLy8gcGtnL2Rpc3Qtc3JjL2F1dGguanNcbnZhciBSRUdFWF9JU19JTlNUQUxMQVRJT05fTEVHQUNZID0gL152MVxcLi87XG52YXIgUkVHRVhfSVNfSU5TVEFMTEFUSU9OID0gL15naHNfLztcbnZhciBSRUdFWF9JU19VU0VSX1RPX1NFUlZFUiA9IC9eZ2h1Xy87XG5hc3luYyBmdW5jdGlvbiBhdXRoKHRva2VuKSB7XG4gIGNvbnN0IGlzQXBwID0gdG9rZW4uc3BsaXQoL1xcLi8pLmxlbmd0aCA9PT0gMztcbiAgY29uc3QgaXNJbnN0YWxsYXRpb24gPSBSRUdFWF9JU19JTlNUQUxMQVRJT05fTEVHQUNZLnRlc3QodG9rZW4pIHx8IFJFR0VYX0lTX0lOU1RBTExBVElPTi50ZXN0KHRva2VuKTtcbiAgY29uc3QgaXNVc2VyVG9TZXJ2ZXIgPSBSRUdFWF9JU19VU0VSX1RPX1NFUlZFUi50ZXN0KHRva2VuKTtcbiAgY29uc3QgdG9rZW5UeXBlID0gaXNBcHAgPyBcImFwcFwiIDogaXNJbnN0YWxsYXRpb24gPyBcImluc3RhbGxhdGlvblwiIDogaXNVc2VyVG9TZXJ2ZXIgPyBcInVzZXItdG8tc2VydmVyXCIgOiBcIm9hdXRoXCI7XG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJ0b2tlblwiLFxuICAgIHRva2VuLFxuICAgIHRva2VuVHlwZVxuICB9O1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvd2l0aC1hdXRob3JpemF0aW9uLXByZWZpeC5qc1xuZnVuY3Rpb24gd2l0aEF1dGhvcml6YXRpb25QcmVmaXgodG9rZW4pIHtcbiAgaWYgKHRva2VuLnNwbGl0KC9cXC4vKS5sZW5ndGggPT09IDMpIHtcbiAgICByZXR1cm4gYGJlYXJlciAke3Rva2VufWA7XG4gIH1cbiAgcmV0dXJuIGB0b2tlbiAke3Rva2VufWA7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9ob29rLmpzXG5hc3luYyBmdW5jdGlvbiBob29rKHRva2VuLCByZXF1ZXN0LCByb3V0ZSwgcGFyYW1ldGVycykge1xuICBjb25zdCBlbmRwb2ludCA9IHJlcXVlc3QuZW5kcG9pbnQubWVyZ2UoXG4gICAgcm91dGUsXG4gICAgcGFyYW1ldGVyc1xuICApO1xuICBlbmRwb2ludC5oZWFkZXJzLmF1dGhvcml6YXRpb24gPSB3aXRoQXV0aG9yaXphdGlvblByZWZpeCh0b2tlbik7XG4gIHJldHVybiByZXF1ZXN0KGVuZHBvaW50KTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL2luZGV4LmpzXG52YXIgY3JlYXRlVG9rZW5BdXRoID0gZnVuY3Rpb24gY3JlYXRlVG9rZW5BdXRoMih0b2tlbikge1xuICBpZiAoIXRva2VuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiW0BvY3Rva2l0L2F1dGgtdG9rZW5dIE5vIHRva2VuIHBhc3NlZCB0byBjcmVhdGVUb2tlbkF1dGhcIik7XG4gIH1cbiAgaWYgKHR5cGVvZiB0b2tlbiAhPT0gXCJzdHJpbmdcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIFwiW0BvY3Rva2l0L2F1dGgtdG9rZW5dIFRva2VuIHBhc3NlZCB0byBjcmVhdGVUb2tlbkF1dGggaXMgbm90IGEgc3RyaW5nXCJcbiAgICApO1xuICB9XG4gIHRva2VuID0gdG9rZW4ucmVwbGFjZSgvXih0b2tlbnxiZWFyZXIpICsvaSwgXCJcIik7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKGF1dGguYmluZChudWxsLCB0b2tlbiksIHtcbiAgICBob29rOiBob29rLmJpbmQobnVsbCwgdG9rZW4pXG4gIH0pO1xufTtcbi8vIEFubm90YXRlIHRoZSBDb21tb25KUyBleHBvcnQgbmFtZXMgZm9yIEVTTSBpbXBvcnQgaW4gbm9kZTpcbjAgJiYgKG1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVUb2tlbkF1dGhcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvQ29tbW9uSlMgPSAobW9kKSA9PiBfX2NvcHlQcm9wcyhfX2RlZlByb3Aoe30sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pLCBtb2QpO1xuXG4vLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbnZhciBpbmRleF9leHBvcnRzID0ge307XG5fX2V4cG9ydChpbmRleF9leHBvcnRzLCB7XG4gIE9jdG9raXQ6ICgpID0+IE9jdG9raXRcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfX3RvQ29tbW9uSlMoaW5kZXhfZXhwb3J0cyk7XG52YXIgaW1wb3J0X3VuaXZlcnNhbF91c2VyX2FnZW50ID0gcmVxdWlyZShcInVuaXZlcnNhbC11c2VyLWFnZW50XCIpO1xudmFyIGltcG9ydF9iZWZvcmVfYWZ0ZXJfaG9vayA9IHJlcXVpcmUoXCJiZWZvcmUtYWZ0ZXItaG9va1wiKTtcbnZhciBpbXBvcnRfcmVxdWVzdCA9IHJlcXVpcmUoXCJAb2N0b2tpdC9yZXF1ZXN0XCIpO1xudmFyIGltcG9ydF9ncmFwaHFsID0gcmVxdWlyZShcIkBvY3Rva2l0L2dyYXBocWxcIik7XG52YXIgaW1wb3J0X2F1dGhfdG9rZW4gPSByZXF1aXJlKFwiQG9jdG9raXQvYXV0aC10b2tlblwiKTtcblxuLy8gcGtnL2Rpc3Qtc3JjL3ZlcnNpb24uanNcbnZhciBWRVJTSU9OID0gXCI1LjIuMlwiO1xuXG4vLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbnZhciBub29wID0gKCkgPT4ge1xufTtcbnZhciBjb25zb2xlV2FybiA9IGNvbnNvbGUud2Fybi5iaW5kKGNvbnNvbGUpO1xudmFyIGNvbnNvbGVFcnJvciA9IGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlKTtcbmZ1bmN0aW9uIGNyZWF0ZUxvZ2dlcihsb2dnZXIgPSB7fSkge1xuICBpZiAodHlwZW9mIGxvZ2dlci5kZWJ1ZyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbG9nZ2VyLmRlYnVnID0gbm9vcDtcbiAgfVxuICBpZiAodHlwZW9mIGxvZ2dlci5pbmZvICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBsb2dnZXIuaW5mbyA9IG5vb3A7XG4gIH1cbiAgaWYgKHR5cGVvZiBsb2dnZXIud2FybiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbG9nZ2VyLndhcm4gPSBjb25zb2xlV2FybjtcbiAgfVxuICBpZiAodHlwZW9mIGxvZ2dlci5lcnJvciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbG9nZ2VyLmVycm9yID0gY29uc29sZUVycm9yO1xuICB9XG4gIHJldHVybiBsb2dnZXI7XG59XG52YXIgdXNlckFnZW50VHJhaWwgPSBgb2N0b2tpdC1jb3JlLmpzLyR7VkVSU0lPTn0gJHsoMCwgaW1wb3J0X3VuaXZlcnNhbF91c2VyX2FnZW50LmdldFVzZXJBZ2VudCkoKX1gO1xudmFyIE9jdG9raXQgPSBjbGFzcyB7XG4gIHN0YXRpYyB7XG4gICAgdGhpcy5WRVJTSU9OID0gVkVSU0lPTjtcbiAgfVxuICBzdGF0aWMgZGVmYXVsdHMoZGVmYXVsdHMpIHtcbiAgICBjb25zdCBPY3Rva2l0V2l0aERlZmF1bHRzID0gY2xhc3MgZXh0ZW5kcyB0aGlzIHtcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3NbMF0gfHwge307XG4gICAgICAgIGlmICh0eXBlb2YgZGVmYXVsdHMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHN1cGVyKGRlZmF1bHRzKG9wdGlvbnMpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgZGVmYXVsdHMsXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgb3B0aW9ucy51c2VyQWdlbnQgJiYgZGVmYXVsdHMudXNlckFnZW50ID8ge1xuICAgICAgICAgICAgICB1c2VyQWdlbnQ6IGAke29wdGlvbnMudXNlckFnZW50fSAke2RlZmF1bHRzLnVzZXJBZ2VudH1gXG4gICAgICAgICAgICB9IDogbnVsbFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPY3Rva2l0V2l0aERlZmF1bHRzO1xuICB9XG4gIHN0YXRpYyB7XG4gICAgdGhpcy5wbHVnaW5zID0gW107XG4gIH1cbiAgLyoqXG4gICAqIEF0dGFjaCBhIHBsdWdpbiAob3IgbWFueSkgdG8geW91ciBPY3Rva2l0IGluc3RhbmNlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBBUEkgPSBPY3Rva2l0LnBsdWdpbihwbHVnaW4xLCBwbHVnaW4yLCBwbHVnaW4zLCAuLi4pXG4gICAqL1xuICBzdGF0aWMgcGx1Z2luKC4uLm5ld1BsdWdpbnMpIHtcbiAgICBjb25zdCBjdXJyZW50UGx1Z2lucyA9IHRoaXMucGx1Z2lucztcbiAgICBjb25zdCBOZXdPY3Rva2l0ID0gY2xhc3MgZXh0ZW5kcyB0aGlzIHtcbiAgICAgIHN0YXRpYyB7XG4gICAgICAgIHRoaXMucGx1Z2lucyA9IGN1cnJlbnRQbHVnaW5zLmNvbmNhdChcbiAgICAgICAgICBuZXdQbHVnaW5zLmZpbHRlcigocGx1Z2luKSA9PiAhY3VycmVudFBsdWdpbnMuaW5jbHVkZXMocGx1Z2luKSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBOZXdPY3Rva2l0O1xuICB9XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGhvb2sgPSBuZXcgaW1wb3J0X2JlZm9yZV9hZnRlcl9ob29rLkNvbGxlY3Rpb24oKTtcbiAgICBjb25zdCByZXF1ZXN0RGVmYXVsdHMgPSB7XG4gICAgICBiYXNlVXJsOiBpbXBvcnRfcmVxdWVzdC5yZXF1ZXN0LmVuZHBvaW50LkRFRkFVTFRTLmJhc2VVcmwsXG4gICAgICBoZWFkZXJzOiB7fSxcbiAgICAgIHJlcXVlc3Q6IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMucmVxdWVzdCwge1xuICAgICAgICAvLyBAdHMtaWdub3JlIGludGVybmFsIHVzYWdlIG9ubHksIG5vIG5lZWQgdG8gdHlwZVxuICAgICAgICBob29rOiBob29rLmJpbmQobnVsbCwgXCJyZXF1ZXN0XCIpXG4gICAgICB9KSxcbiAgICAgIG1lZGlhVHlwZToge1xuICAgICAgICBwcmV2aWV3czogW10sXG4gICAgICAgIGZvcm1hdDogXCJcIlxuICAgICAgfVxuICAgIH07XG4gICAgcmVxdWVzdERlZmF1bHRzLmhlYWRlcnNbXCJ1c2VyLWFnZW50XCJdID0gb3B0aW9ucy51c2VyQWdlbnQgPyBgJHtvcHRpb25zLnVzZXJBZ2VudH0gJHt1c2VyQWdlbnRUcmFpbH1gIDogdXNlckFnZW50VHJhaWw7XG4gICAgaWYgKG9wdGlvbnMuYmFzZVVybCkge1xuICAgICAgcmVxdWVzdERlZmF1bHRzLmJhc2VVcmwgPSBvcHRpb25zLmJhc2VVcmw7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnByZXZpZXdzKSB7XG4gICAgICByZXF1ZXN0RGVmYXVsdHMubWVkaWFUeXBlLnByZXZpZXdzID0gb3B0aW9ucy5wcmV2aWV3cztcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudGltZVpvbmUpIHtcbiAgICAgIHJlcXVlc3REZWZhdWx0cy5oZWFkZXJzW1widGltZS16b25lXCJdID0gb3B0aW9ucy50aW1lWm9uZTtcbiAgICB9XG4gICAgdGhpcy5yZXF1ZXN0ID0gaW1wb3J0X3JlcXVlc3QucmVxdWVzdC5kZWZhdWx0cyhyZXF1ZXN0RGVmYXVsdHMpO1xuICAgIHRoaXMuZ3JhcGhxbCA9ICgwLCBpbXBvcnRfZ3JhcGhxbC53aXRoQ3VzdG9tUmVxdWVzdCkodGhpcy5yZXF1ZXN0KS5kZWZhdWx0cyhyZXF1ZXN0RGVmYXVsdHMpO1xuICAgIHRoaXMubG9nID0gY3JlYXRlTG9nZ2VyKG9wdGlvbnMubG9nKTtcbiAgICB0aGlzLmhvb2sgPSBob29rO1xuICAgIGlmICghb3B0aW9ucy5hdXRoU3RyYXRlZ3kpIHtcbiAgICAgIGlmICghb3B0aW9ucy5hdXRoKSB7XG4gICAgICAgIHRoaXMuYXV0aCA9IGFzeW5jICgpID0+ICh7XG4gICAgICAgICAgdHlwZTogXCJ1bmF1dGhlbnRpY2F0ZWRcIlxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGF1dGggPSAoMCwgaW1wb3J0X2F1dGhfdG9rZW4uY3JlYXRlVG9rZW5BdXRoKShvcHRpb25zLmF1dGgpO1xuICAgICAgICBob29rLndyYXAoXCJyZXF1ZXN0XCIsIGF1dGguaG9vayk7XG4gICAgICAgIHRoaXMuYXV0aCA9IGF1dGg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHsgYXV0aFN0cmF0ZWd5LCAuLi5vdGhlck9wdGlvbnMgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBhdXRoID0gYXV0aFN0cmF0ZWd5KFxuICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHJlcXVlc3Q6IHRoaXMucmVxdWVzdCxcbiAgICAgICAgICAgIGxvZzogdGhpcy5sb2csXG4gICAgICAgICAgICAvLyB3ZSBwYXNzIHRoZSBjdXJyZW50IG9jdG9raXQgaW5zdGFuY2UgYXMgd2VsbCBhcyBpdHMgY29uc3RydWN0b3Igb3B0aW9uc1xuICAgICAgICAgICAgLy8gdG8gYWxsb3cgZm9yIGF1dGhlbnRpY2F0aW9uIHN0cmF0ZWdpZXMgdGhhdCByZXR1cm4gYSBuZXcgb2N0b2tpdCBpbnN0YW5jZVxuICAgICAgICAgICAgLy8gdGhhdCBzaGFyZXMgdGhlIHNhbWUgaW50ZXJuYWwgc3RhdGUgYXMgdGhlIGN1cnJlbnQgb25lLiBUaGUgb3JpZ2luYWxcbiAgICAgICAgICAgIC8vIHJlcXVpcmVtZW50IGZvciB0aGlzIHdhcyB0aGUgXCJldmVudC1vY3Rva2l0XCIgYXV0aGVudGljYXRpb24gc3RyYXRlZ3lcbiAgICAgICAgICAgIC8vIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9wcm9ib3Qvb2N0b2tpdC1hdXRoLXByb2JvdC5cbiAgICAgICAgICAgIG9jdG9raXQ6IHRoaXMsXG4gICAgICAgICAgICBvY3Rva2l0T3B0aW9uczogb3RoZXJPcHRpb25zXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcHRpb25zLmF1dGhcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGhvb2sud3JhcChcInJlcXVlc3RcIiwgYXV0aC5ob29rKTtcbiAgICAgIHRoaXMuYXV0aCA9IGF1dGg7XG4gICAgfVxuICAgIGNvbnN0IGNsYXNzQ29uc3RydWN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3NDb25zdHJ1Y3Rvci5wbHVnaW5zLmxlbmd0aDsgKytpKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNsYXNzQ29uc3RydWN0b3IucGx1Z2luc1tpXSh0aGlzLCBvcHRpb25zKSk7XG4gICAgfVxuICB9XG59O1xuLy8gQW5ub3RhdGUgdGhlIENvbW1vbkpTIGV4cG9ydCBuYW1lcyBmb3IgRVNNIGltcG9ydCBpbiBub2RlOlxuMCAmJiAobW9kdWxlLmV4cG9ydHMgPSB7XG4gIE9jdG9raXRcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvQ29tbW9uSlMgPSAobW9kKSA9PiBfX2NvcHlQcm9wcyhfX2RlZlByb3Aoe30sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pLCBtb2QpO1xuXG4vLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbnZhciBkaXN0X3NyY19leHBvcnRzID0ge307XG5fX2V4cG9ydChkaXN0X3NyY19leHBvcnRzLCB7XG4gIGxlZ2FjeVJlc3RFbmRwb2ludE1ldGhvZHM6ICgpID0+IGxlZ2FjeVJlc3RFbmRwb2ludE1ldGhvZHMsXG4gIHJlc3RFbmRwb2ludE1ldGhvZHM6ICgpID0+IHJlc3RFbmRwb2ludE1ldGhvZHNcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfX3RvQ29tbW9uSlMoZGlzdF9zcmNfZXhwb3J0cyk7XG5cbi8vIHBrZy9kaXN0LXNyYy92ZXJzaW9uLmpzXG52YXIgVkVSU0lPTiA9IFwiMTAuNC4xXCI7XG5cbi8vIHBrZy9kaXN0LXNyYy9nZW5lcmF0ZWQvZW5kcG9pbnRzLmpzXG52YXIgRW5kcG9pbnRzID0ge1xuICBhY3Rpb25zOiB7XG4gICAgYWRkQ3VzdG9tTGFiZWxzVG9TZWxmSG9zdGVkUnVubmVyRm9yT3JnOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vYWN0aW9ucy9ydW5uZXJzL3tydW5uZXJfaWR9L2xhYmVsc1wiXG4gICAgXSxcbiAgICBhZGRDdXN0b21MYWJlbHNUb1NlbGZIb3N0ZWRSdW5uZXJGb3JSZXBvOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfS9sYWJlbHNcIlxuICAgIF0sXG4gICAgYWRkU2VsZWN0ZWRSZXBvVG9PcmdTZWNyZXQ6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgYWRkU2VsZWN0ZWRSZXBvVG9PcmdWYXJpYWJsZTogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vYWN0aW9ucy92YXJpYWJsZXMve25hbWV9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgYXBwcm92ZVdvcmtmbG93UnVuOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9hcHByb3ZlXCJcbiAgICBdLFxuICAgIGNhbmNlbFdvcmtmbG93UnVuOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9jYW5jZWxcIlxuICAgIF0sXG4gICAgY3JlYXRlRW52aXJvbm1lbnRWYXJpYWJsZTogW1xuICAgICAgXCJQT1NUIC9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vdmFyaWFibGVzXCJcbiAgICBdLFxuICAgIGNyZWF0ZU9yVXBkYXRlRW52aXJvbm1lbnRTZWNyZXQ6IFtcbiAgICAgIFwiUFVUIC9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGNyZWF0ZU9yVXBkYXRlT3JnU2VjcmV0OiBbXCJQVVQgL29yZ3Mve29yZ30vYWN0aW9ucy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIl0sXG4gICAgY3JlYXRlT3JVcGRhdGVSZXBvU2VjcmV0OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgY3JlYXRlT3JnVmFyaWFibGU6IFtcIlBPU1QgL29yZ3Mve29yZ30vYWN0aW9ucy92YXJpYWJsZXNcIl0sXG4gICAgY3JlYXRlUmVnaXN0cmF0aW9uVG9rZW5Gb3JPcmc6IFtcbiAgICAgIFwiUE9TVCAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnMvcmVnaXN0cmF0aW9uLXRva2VuXCJcbiAgICBdLFxuICAgIGNyZWF0ZVJlZ2lzdHJhdGlvblRva2VuRm9yUmVwbzogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnMvcmVnaXN0cmF0aW9uLXRva2VuXCJcbiAgICBdLFxuICAgIGNyZWF0ZVJlbW92ZVRva2VuRm9yT3JnOiBbXCJQT1NUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVycy9yZW1vdmUtdG9rZW5cIl0sXG4gICAgY3JlYXRlUmVtb3ZlVG9rZW5Gb3JSZXBvOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVycy9yZW1vdmUtdG9rZW5cIlxuICAgIF0sXG4gICAgY3JlYXRlUmVwb1ZhcmlhYmxlOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3ZhcmlhYmxlc1wiXSxcbiAgICBjcmVhdGVXb3JrZmxvd0Rpc3BhdGNoOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvd29ya2Zsb3dzL3t3b3JrZmxvd19pZH0vZGlzcGF0Y2hlc1wiXG4gICAgXSxcbiAgICBkZWxldGVBY3Rpb25zQ2FjaGVCeUlkOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9jYWNoZXMve2NhY2hlX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVBY3Rpb25zQ2FjaGVCeUtleTogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvY2FjaGVzez9rZXkscmVmfVwiXG4gICAgXSxcbiAgICBkZWxldGVBcnRpZmFjdDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvYXJ0aWZhY3RzL3thcnRpZmFjdF9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlRW52aXJvbm1lbnRTZWNyZXQ6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUVudmlyb25tZW50VmFyaWFibGU6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vdmFyaWFibGVzL3tuYW1lfVwiXG4gICAgXSxcbiAgICBkZWxldGVPcmdTZWNyZXQ6IFtcIkRFTEVURSAvb3Jncy97b3JnfS9hY3Rpb25zL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXSxcbiAgICBkZWxldGVPcmdWYXJpYWJsZTogW1wiREVMRVRFIC9vcmdzL3tvcmd9L2FjdGlvbnMvdmFyaWFibGVzL3tuYW1lfVwiXSxcbiAgICBkZWxldGVSZXBvU2VjcmV0OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgZGVsZXRlUmVwb1ZhcmlhYmxlOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy92YXJpYWJsZXMve25hbWV9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVNlbGZIb3N0ZWRSdW5uZXJGcm9tT3JnOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlU2VsZkhvc3RlZFJ1bm5lckZyb21SZXBvOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5uZXJzL3tydW5uZXJfaWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVdvcmtmbG93UnVuOiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfVwiXSxcbiAgICBkZWxldGVXb3JrZmxvd1J1bkxvZ3M6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vbG9nc1wiXG4gICAgXSxcbiAgICBkaXNhYmxlU2VsZWN0ZWRSZXBvc2l0b3J5R2l0aHViQWN0aW9uc09yZ2FuaXphdGlvbjogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vYWN0aW9ucy9wZXJtaXNzaW9ucy9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIGRpc2FibGVXb3JrZmxvdzogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvd29ya2Zsb3dzL3t3b3JrZmxvd19pZH0vZGlzYWJsZVwiXG4gICAgXSxcbiAgICBkb3dubG9hZEFydGlmYWN0OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9hcnRpZmFjdHMve2FydGlmYWN0X2lkfS97YXJjaGl2ZV9mb3JtYXR9XCJcbiAgICBdLFxuICAgIGRvd25sb2FkSm9iTG9nc0ZvcldvcmtmbG93UnVuOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9qb2JzL3tqb2JfaWR9L2xvZ3NcIlxuICAgIF0sXG4gICAgZG93bmxvYWRXb3JrZmxvd1J1bkF0dGVtcHRMb2dzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L2F0dGVtcHRzL3thdHRlbXB0X251bWJlcn0vbG9nc1wiXG4gICAgXSxcbiAgICBkb3dubG9hZFdvcmtmbG93UnVuTG9nczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9sb2dzXCJcbiAgICBdLFxuICAgIGVuYWJsZVNlbGVjdGVkUmVwb3NpdG9yeUdpdGh1YkFjdGlvbnNPcmdhbml6YXRpb246IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcGVybWlzc2lvbnMvcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfVwiXG4gICAgXSxcbiAgICBlbmFibGVXb3JrZmxvdzogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvd29ya2Zsb3dzL3t3b3JrZmxvd19pZH0vZW5hYmxlXCJcbiAgICBdLFxuICAgIGZvcmNlQ2FuY2VsV29ya2Zsb3dSdW46IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L2ZvcmNlLWNhbmNlbFwiXG4gICAgXSxcbiAgICBnZW5lcmF0ZVJ1bm5lckppdGNvbmZpZ0Zvck9yZzogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVycy9nZW5lcmF0ZS1qaXRjb25maWdcIlxuICAgIF0sXG4gICAgZ2VuZXJhdGVSdW5uZXJKaXRjb25maWdGb3JSZXBvOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVycy9nZW5lcmF0ZS1qaXRjb25maWdcIlxuICAgIF0sXG4gICAgZ2V0QWN0aW9uc0NhY2hlTGlzdDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL2NhY2hlc1wiXSxcbiAgICBnZXRBY3Rpb25zQ2FjaGVVc2FnZTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL2NhY2hlL3VzYWdlXCJdLFxuICAgIGdldEFjdGlvbnNDYWNoZVVzYWdlQnlSZXBvRm9yT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL2NhY2hlL3VzYWdlLWJ5LXJlcG9zaXRvcnlcIlxuICAgIF0sXG4gICAgZ2V0QWN0aW9uc0NhY2hlVXNhZ2VGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL2NhY2hlL3VzYWdlXCJdLFxuICAgIGdldEFsbG93ZWRBY3Rpb25zT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3Blcm1pc3Npb25zL3NlbGVjdGVkLWFjdGlvbnNcIlxuICAgIF0sXG4gICAgZ2V0QWxsb3dlZEFjdGlvbnNSZXBvc2l0b3J5OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9wZXJtaXNzaW9ucy9zZWxlY3RlZC1hY3Rpb25zXCJcbiAgICBdLFxuICAgIGdldEFydGlmYWN0OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvYXJ0aWZhY3RzL3thcnRpZmFjdF9pZH1cIl0sXG4gICAgZ2V0Q3VzdG9tT2lkY1N1YkNsYWltRm9yUmVwbzogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvb2lkYy9jdXN0b21pemF0aW9uL3N1YlwiXG4gICAgXSxcbiAgICBnZXRFbnZpcm9ubWVudFB1YmxpY0tleTogW1xuICAgICAgXCJHRVQgL3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH0vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9zZWNyZXRzL3B1YmxpYy1rZXlcIlxuICAgIF0sXG4gICAgZ2V0RW52aXJvbm1lbnRTZWNyZXQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGdldEVudmlyb25tZW50VmFyaWFibGU6IFtcbiAgICAgIFwiR0VUIC9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vdmFyaWFibGVzL3tuYW1lfVwiXG4gICAgXSxcbiAgICBnZXRHaXRodWJBY3Rpb25zRGVmYXVsdFdvcmtmbG93UGVybWlzc2lvbnNPcmdhbml6YXRpb246IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcGVybWlzc2lvbnMvd29ya2Zsb3dcIlxuICAgIF0sXG4gICAgZ2V0R2l0aHViQWN0aW9uc0RlZmF1bHRXb3JrZmxvd1Blcm1pc3Npb25zUmVwb3NpdG9yeTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcGVybWlzc2lvbnMvd29ya2Zsb3dcIlxuICAgIF0sXG4gICAgZ2V0R2l0aHViQWN0aW9uc1Blcm1pc3Npb25zT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3Blcm1pc3Npb25zXCJcbiAgICBdLFxuICAgIGdldEdpdGh1YkFjdGlvbnNQZXJtaXNzaW9uc1JlcG9zaXRvcnk6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3Blcm1pc3Npb25zXCJcbiAgICBdLFxuICAgIGdldEpvYkZvcldvcmtmbG93UnVuOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvam9icy97am9iX2lkfVwiXSxcbiAgICBnZXRPcmdQdWJsaWNLZXk6IFtcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3NlY3JldHMvcHVibGljLWtleVwiXSxcbiAgICBnZXRPcmdTZWNyZXQ6IFtcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXSxcbiAgICBnZXRPcmdWYXJpYWJsZTogW1wiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvdmFyaWFibGVzL3tuYW1lfVwiXSxcbiAgICBnZXRQZW5kaW5nRGVwbG95bWVudHNGb3JSdW46IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vcGVuZGluZ19kZXBsb3ltZW50c1wiXG4gICAgXSxcbiAgICBnZXRSZXBvUGVybWlzc2lvbnM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3Blcm1pc3Npb25zXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wiYWN0aW9uc1wiLCBcImdldEdpdGh1YkFjdGlvbnNQZXJtaXNzaW9uc1JlcG9zaXRvcnlcIl0gfVxuICAgIF0sXG4gICAgZ2V0UmVwb1B1YmxpY0tleTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3NlY3JldHMvcHVibGljLWtleVwiXSxcbiAgICBnZXRSZXBvU2VjcmV0OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJdLFxuICAgIGdldFJlcG9WYXJpYWJsZTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3ZhcmlhYmxlcy97bmFtZX1cIl0sXG4gICAgZ2V0UmV2aWV3c0ZvclJ1bjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9hcHByb3ZhbHNcIlxuICAgIF0sXG4gICAgZ2V0U2VsZkhvc3RlZFJ1bm5lckZvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfVwiXSxcbiAgICBnZXRTZWxmSG9zdGVkUnVubmVyRm9yUmVwbzogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfVwiXG4gICAgXSxcbiAgICBnZXRXb3JrZmxvdzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3dvcmtmbG93cy97d29ya2Zsb3dfaWR9XCJdLFxuICAgIGdldFdvcmtmbG93QWNjZXNzVG9SZXBvc2l0b3J5OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9wZXJtaXNzaW9ucy9hY2Nlc3NcIlxuICAgIF0sXG4gICAgZ2V0V29ya2Zsb3dSdW46IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9XCJdLFxuICAgIGdldFdvcmtmbG93UnVuQXR0ZW1wdDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9hdHRlbXB0cy97YXR0ZW1wdF9udW1iZXJ9XCJcbiAgICBdLFxuICAgIGdldFdvcmtmbG93UnVuVXNhZ2U6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vdGltaW5nXCJcbiAgICBdLFxuICAgIGdldFdvcmtmbG93VXNhZ2U6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3dvcmtmbG93cy97d29ya2Zsb3dfaWR9L3RpbWluZ1wiXG4gICAgXSxcbiAgICBsaXN0QXJ0aWZhY3RzRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL2FydGlmYWN0c1wiXSxcbiAgICBsaXN0RW52aXJvbm1lbnRTZWNyZXRzOiBbXG4gICAgICBcIkdFVCAvcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3NlY3JldHNcIlxuICAgIF0sXG4gICAgbGlzdEVudmlyb25tZW50VmFyaWFibGVzOiBbXG4gICAgICBcIkdFVCAvcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3ZhcmlhYmxlc1wiXG4gICAgXSxcbiAgICBsaXN0Sm9ic0ZvcldvcmtmbG93UnVuOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L2pvYnNcIlxuICAgIF0sXG4gICAgbGlzdEpvYnNGb3JXb3JrZmxvd1J1bkF0dGVtcHQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vYXR0ZW1wdHMve2F0dGVtcHRfbnVtYmVyfS9qb2JzXCJcbiAgICBdLFxuICAgIGxpc3RMYWJlbHNGb3JTZWxmSG9zdGVkUnVubmVyRm9yT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH0vbGFiZWxzXCJcbiAgICBdLFxuICAgIGxpc3RMYWJlbHNGb3JTZWxmSG9zdGVkUnVubmVyRm9yUmVwbzogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfS9sYWJlbHNcIlxuICAgIF0sXG4gICAgbGlzdE9yZ1NlY3JldHM6IFtcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3NlY3JldHNcIl0sXG4gICAgbGlzdE9yZ1ZhcmlhYmxlczogW1wiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvdmFyaWFibGVzXCJdLFxuICAgIGxpc3RSZXBvT3JnYW5pemF0aW9uU2VjcmV0czogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvb3JnYW5pemF0aW9uLXNlY3JldHNcIlxuICAgIF0sXG4gICAgbGlzdFJlcG9Pcmdhbml6YXRpb25WYXJpYWJsZXM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL29yZ2FuaXphdGlvbi12YXJpYWJsZXNcIlxuICAgIF0sXG4gICAgbGlzdFJlcG9TZWNyZXRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvc2VjcmV0c1wiXSxcbiAgICBsaXN0UmVwb1ZhcmlhYmxlczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3ZhcmlhYmxlc1wiXSxcbiAgICBsaXN0UmVwb1dvcmtmbG93czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3dvcmtmbG93c1wiXSxcbiAgICBsaXN0UnVubmVyQXBwbGljYXRpb25zRm9yT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9ydW5uZXJzL2Rvd25sb2Fkc1wiXSxcbiAgICBsaXN0UnVubmVyQXBwbGljYXRpb25zRm9yUmVwbzogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVycy9kb3dubG9hZHNcIlxuICAgIF0sXG4gICAgbGlzdFNlbGVjdGVkUmVwb3NGb3JPcmdTZWNyZXQ6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBsaXN0U2VsZWN0ZWRSZXBvc0Zvck9yZ1ZhcmlhYmxlOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3ZhcmlhYmxlcy97bmFtZX0vcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIGxpc3RTZWxlY3RlZFJlcG9zaXRvcmllc0VuYWJsZWRHaXRodWJBY3Rpb25zT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3Blcm1pc3Npb25zL3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBsaXN0U2VsZkhvc3RlZFJ1bm5lcnNGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnNcIl0sXG4gICAgbGlzdFNlbGZIb3N0ZWRSdW5uZXJzRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnNcIl0sXG4gICAgbGlzdFdvcmtmbG93UnVuQXJ0aWZhY3RzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L2FydGlmYWN0c1wiXG4gICAgXSxcbiAgICBsaXN0V29ya2Zsb3dSdW5zOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy93b3JrZmxvd3Mve3dvcmtmbG93X2lkfS9ydW5zXCJcbiAgICBdLFxuICAgIGxpc3RXb3JrZmxvd1J1bnNGb3JSZXBvOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVuc1wiXSxcbiAgICByZVJ1bkpvYkZvcldvcmtmbG93UnVuOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvam9icy97am9iX2lkfS9yZXJ1blwiXG4gICAgXSxcbiAgICByZVJ1bldvcmtmbG93OiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vcmVydW5cIl0sXG4gICAgcmVSdW5Xb3JrZmxvd0ZhaWxlZEpvYnM6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L3JlcnVuLWZhaWxlZC1qb2JzXCJcbiAgICBdLFxuICAgIHJlbW92ZUFsbEN1c3RvbUxhYmVsc0Zyb21TZWxmSG9zdGVkUnVubmVyRm9yT3JnOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH0vbGFiZWxzXCJcbiAgICBdLFxuICAgIHJlbW92ZUFsbEN1c3RvbUxhYmVsc0Zyb21TZWxmSG9zdGVkUnVubmVyRm9yUmVwbzogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfS9sYWJlbHNcIlxuICAgIF0sXG4gICAgcmVtb3ZlQ3VzdG9tTGFiZWxGcm9tU2VsZkhvc3RlZFJ1bm5lckZvck9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vYWN0aW9ucy9ydW5uZXJzL3tydW5uZXJfaWR9L2xhYmVscy97bmFtZX1cIlxuICAgIF0sXG4gICAgcmVtb3ZlQ3VzdG9tTGFiZWxGcm9tU2VsZkhvc3RlZFJ1bm5lckZvclJlcG86IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH0vbGFiZWxzL3tuYW1lfVwiXG4gICAgXSxcbiAgICByZW1vdmVTZWxlY3RlZFJlcG9Gcm9tT3JnU2VjcmV0OiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9hY3Rpb25zL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIHJlbW92ZVNlbGVjdGVkUmVwb0Zyb21PcmdWYXJpYWJsZTogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vYWN0aW9ucy92YXJpYWJsZXMve25hbWV9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgcmV2aWV3Q3VzdG9tR2F0ZXNGb3JSdW46IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L2RlcGxveW1lbnRfcHJvdGVjdGlvbl9ydWxlXCJcbiAgICBdLFxuICAgIHJldmlld1BlbmRpbmdEZXBsb3ltZW50c0ZvclJ1bjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vcGVuZGluZ19kZXBsb3ltZW50c1wiXG4gICAgXSxcbiAgICBzZXRBbGxvd2VkQWN0aW9uc09yZ2FuaXphdGlvbjogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vYWN0aW9ucy9wZXJtaXNzaW9ucy9zZWxlY3RlZC1hY3Rpb25zXCJcbiAgICBdLFxuICAgIHNldEFsbG93ZWRBY3Rpb25zUmVwb3NpdG9yeTogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcGVybWlzc2lvbnMvc2VsZWN0ZWQtYWN0aW9uc1wiXG4gICAgXSxcbiAgICBzZXRDdXN0b21MYWJlbHNGb3JTZWxmSG9zdGVkUnVubmVyRm9yT3JnOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH0vbGFiZWxzXCJcbiAgICBdLFxuICAgIHNldEN1c3RvbUxhYmVsc0ZvclNlbGZIb3N0ZWRSdW5uZXJGb3JSZXBvOiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5uZXJzL3tydW5uZXJfaWR9L2xhYmVsc1wiXG4gICAgXSxcbiAgICBzZXRDdXN0b21PaWRjU3ViQ2xhaW1Gb3JSZXBvOiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9vaWRjL2N1c3RvbWl6YXRpb24vc3ViXCJcbiAgICBdLFxuICAgIHNldEdpdGh1YkFjdGlvbnNEZWZhdWx0V29ya2Zsb3dQZXJtaXNzaW9uc09yZ2FuaXphdGlvbjogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vYWN0aW9ucy9wZXJtaXNzaW9ucy93b3JrZmxvd1wiXG4gICAgXSxcbiAgICBzZXRHaXRodWJBY3Rpb25zRGVmYXVsdFdvcmtmbG93UGVybWlzc2lvbnNSZXBvc2l0b3J5OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9wZXJtaXNzaW9ucy93b3JrZmxvd1wiXG4gICAgXSxcbiAgICBzZXRHaXRodWJBY3Rpb25zUGVybWlzc2lvbnNPcmdhbml6YXRpb246IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcGVybWlzc2lvbnNcIlxuICAgIF0sXG4gICAgc2V0R2l0aHViQWN0aW9uc1Blcm1pc3Npb25zUmVwb3NpdG9yeTogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcGVybWlzc2lvbnNcIlxuICAgIF0sXG4gICAgc2V0U2VsZWN0ZWRSZXBvc0Zvck9yZ1NlY3JldDogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vYWN0aW9ucy9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIHNldFNlbGVjdGVkUmVwb3NGb3JPcmdWYXJpYWJsZTogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vYWN0aW9ucy92YXJpYWJsZXMve25hbWV9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBzZXRTZWxlY3RlZFJlcG9zaXRvcmllc0VuYWJsZWRHaXRodWJBY3Rpb25zT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9hY3Rpb25zL3Blcm1pc3Npb25zL3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBzZXRXb3JrZmxvd0FjY2Vzc1RvUmVwb3NpdG9yeTogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcGVybWlzc2lvbnMvYWNjZXNzXCJcbiAgICBdLFxuICAgIHVwZGF0ZUVudmlyb25tZW50VmFyaWFibGU6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH0vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS92YXJpYWJsZXMve25hbWV9XCJcbiAgICBdLFxuICAgIHVwZGF0ZU9yZ1ZhcmlhYmxlOiBbXCJQQVRDSCAvb3Jncy97b3JnfS9hY3Rpb25zL3ZhcmlhYmxlcy97bmFtZX1cIl0sXG4gICAgdXBkYXRlUmVwb1ZhcmlhYmxlOiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3ZhcmlhYmxlcy97bmFtZX1cIlxuICAgIF1cbiAgfSxcbiAgYWN0aXZpdHk6IHtcbiAgICBjaGVja1JlcG9Jc1N0YXJyZWRCeUF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvc3RhcnJlZC97b3duZXJ9L3tyZXBvfVwiXSxcbiAgICBkZWxldGVSZXBvU3Vic2NyaXB0aW9uOiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N1YnNjcmlwdGlvblwiXSxcbiAgICBkZWxldGVUaHJlYWRTdWJzY3JpcHRpb246IFtcbiAgICAgIFwiREVMRVRFIC9ub3RpZmljYXRpb25zL3RocmVhZHMve3RocmVhZF9pZH0vc3Vic2NyaXB0aW9uXCJcbiAgICBdLFxuICAgIGdldEZlZWRzOiBbXCJHRVQgL2ZlZWRzXCJdLFxuICAgIGdldFJlcG9TdWJzY3JpcHRpb246IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3Vic2NyaXB0aW9uXCJdLFxuICAgIGdldFRocmVhZDogW1wiR0VUIC9ub3RpZmljYXRpb25zL3RocmVhZHMve3RocmVhZF9pZH1cIl0sXG4gICAgZ2V0VGhyZWFkU3Vic2NyaXB0aW9uRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC9ub3RpZmljYXRpb25zL3RocmVhZHMve3RocmVhZF9pZH0vc3Vic2NyaXB0aW9uXCJcbiAgICBdLFxuICAgIGxpc3RFdmVudHNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L2V2ZW50c1wiXSxcbiAgICBsaXN0Tm90aWZpY2F0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL25vdGlmaWNhdGlvbnNcIl0sXG4gICAgbGlzdE9yZ0V2ZW50c0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9ldmVudHMvb3Jncy97b3JnfVwiXG4gICAgXSxcbiAgICBsaXN0UHVibGljRXZlbnRzOiBbXCJHRVQgL2V2ZW50c1wiXSxcbiAgICBsaXN0UHVibGljRXZlbnRzRm9yUmVwb05ldHdvcms6IFtcIkdFVCAvbmV0d29ya3Mve293bmVyfS97cmVwb30vZXZlbnRzXCJdLFxuICAgIGxpc3RQdWJsaWNFdmVudHNGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZXZlbnRzL3B1YmxpY1wiXSxcbiAgICBsaXN0UHVibGljT3JnRXZlbnRzOiBbXCJHRVQgL29yZ3Mve29yZ30vZXZlbnRzXCJdLFxuICAgIGxpc3RSZWNlaXZlZEV2ZW50c0ZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9yZWNlaXZlZF9ldmVudHNcIl0sXG4gICAgbGlzdFJlY2VpdmVkUHVibGljRXZlbnRzRm9yVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcmVjZWl2ZWRfZXZlbnRzL3B1YmxpY1wiXG4gICAgXSxcbiAgICBsaXN0UmVwb0V2ZW50czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ldmVudHNcIl0sXG4gICAgbGlzdFJlcG9Ob3RpZmljYXRpb25zRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ub3RpZmljYXRpb25zXCJcbiAgICBdLFxuICAgIGxpc3RSZXBvc1N0YXJyZWRCeUF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvc3RhcnJlZFwiXSxcbiAgICBsaXN0UmVwb3NTdGFycmVkQnlVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vc3RhcnJlZFwiXSxcbiAgICBsaXN0UmVwb3NXYXRjaGVkQnlVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vc3Vic2NyaXB0aW9uc1wiXSxcbiAgICBsaXN0U3RhcmdhemVyc0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3RhcmdhemVyc1wiXSxcbiAgICBsaXN0V2F0Y2hlZFJlcG9zRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9zdWJzY3JpcHRpb25zXCJdLFxuICAgIGxpc3RXYXRjaGVyc0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3Vic2NyaWJlcnNcIl0sXG4gICAgbWFya05vdGlmaWNhdGlvbnNBc1JlYWQ6IFtcIlBVVCAvbm90aWZpY2F0aW9uc1wiXSxcbiAgICBtYXJrUmVwb05vdGlmaWNhdGlvbnNBc1JlYWQ6IFtcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vbm90aWZpY2F0aW9uc1wiXSxcbiAgICBtYXJrVGhyZWFkQXNEb25lOiBbXCJERUxFVEUgL25vdGlmaWNhdGlvbnMvdGhyZWFkcy97dGhyZWFkX2lkfVwiXSxcbiAgICBtYXJrVGhyZWFkQXNSZWFkOiBbXCJQQVRDSCAvbm90aWZpY2F0aW9ucy90aHJlYWRzL3t0aHJlYWRfaWR9XCJdLFxuICAgIHNldFJlcG9TdWJzY3JpcHRpb246IFtcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3Vic2NyaXB0aW9uXCJdLFxuICAgIHNldFRocmVhZFN1YnNjcmlwdGlvbjogW1xuICAgICAgXCJQVVQgL25vdGlmaWNhdGlvbnMvdGhyZWFkcy97dGhyZWFkX2lkfS9zdWJzY3JpcHRpb25cIlxuICAgIF0sXG4gICAgc3RhclJlcG9Gb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUFVUIC91c2VyL3N0YXJyZWQve293bmVyfS97cmVwb31cIl0sXG4gICAgdW5zdGFyUmVwb0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJERUxFVEUgL3VzZXIvc3RhcnJlZC97b3duZXJ9L3tyZXBvfVwiXVxuICB9LFxuICBhcHBzOiB7XG4gICAgYWRkUmVwb1RvSW5zdGFsbGF0aW9uOiBbXG4gICAgICBcIlBVVCAvdXNlci9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJhcHBzXCIsIFwiYWRkUmVwb1RvSW5zdGFsbGF0aW9uRm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgYWRkUmVwb1RvSW5zdGFsbGF0aW9uRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiUFVUIC91c2VyL2luc3RhbGxhdGlvbnMve2luc3RhbGxhdGlvbl9pZH0vcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfVwiXG4gICAgXSxcbiAgICBjaGVja1Rva2VuOiBbXCJQT1NUIC9hcHBsaWNhdGlvbnMve2NsaWVudF9pZH0vdG9rZW5cIl0sXG4gICAgY3JlYXRlRnJvbU1hbmlmZXN0OiBbXCJQT1NUIC9hcHAtbWFuaWZlc3RzL3tjb2RlfS9jb252ZXJzaW9uc1wiXSxcbiAgICBjcmVhdGVJbnN0YWxsYXRpb25BY2Nlc3NUb2tlbjogW1xuICAgICAgXCJQT1NUIC9hcHAvaW5zdGFsbGF0aW9ucy97aW5zdGFsbGF0aW9uX2lkfS9hY2Nlc3NfdG9rZW5zXCJcbiAgICBdLFxuICAgIGRlbGV0ZUF1dGhvcml6YXRpb246IFtcIkRFTEVURSAvYXBwbGljYXRpb25zL3tjbGllbnRfaWR9L2dyYW50XCJdLFxuICAgIGRlbGV0ZUluc3RhbGxhdGlvbjogW1wiREVMRVRFIC9hcHAvaW5zdGFsbGF0aW9ucy97aW5zdGFsbGF0aW9uX2lkfVwiXSxcbiAgICBkZWxldGVUb2tlbjogW1wiREVMRVRFIC9hcHBsaWNhdGlvbnMve2NsaWVudF9pZH0vdG9rZW5cIl0sXG4gICAgZ2V0QXV0aGVudGljYXRlZDogW1wiR0VUIC9hcHBcIl0sXG4gICAgZ2V0QnlTbHVnOiBbXCJHRVQgL2FwcHMve2FwcF9zbHVnfVwiXSxcbiAgICBnZXRJbnN0YWxsYXRpb246IFtcIkdFVCAvYXBwL2luc3RhbGxhdGlvbnMve2luc3RhbGxhdGlvbl9pZH1cIl0sXG4gICAgZ2V0T3JnSW5zdGFsbGF0aW9uOiBbXCJHRVQgL29yZ3Mve29yZ30vaW5zdGFsbGF0aW9uXCJdLFxuICAgIGdldFJlcG9JbnN0YWxsYXRpb246IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaW5zdGFsbGF0aW9uXCJdLFxuICAgIGdldFN1YnNjcmlwdGlvblBsYW5Gb3JBY2NvdW50OiBbXG4gICAgICBcIkdFVCAvbWFya2V0cGxhY2VfbGlzdGluZy9hY2NvdW50cy97YWNjb3VudF9pZH1cIlxuICAgIF0sXG4gICAgZ2V0U3Vic2NyaXB0aW9uUGxhbkZvckFjY291bnRTdHViYmVkOiBbXG4gICAgICBcIkdFVCAvbWFya2V0cGxhY2VfbGlzdGluZy9zdHViYmVkL2FjY291bnRzL3thY2NvdW50X2lkfVwiXG4gICAgXSxcbiAgICBnZXRVc2VySW5zdGFsbGF0aW9uOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vaW5zdGFsbGF0aW9uXCJdLFxuICAgIGdldFdlYmhvb2tDb25maWdGb3JBcHA6IFtcIkdFVCAvYXBwL2hvb2svY29uZmlnXCJdLFxuICAgIGdldFdlYmhvb2tEZWxpdmVyeTogW1wiR0VUIC9hcHAvaG9vay9kZWxpdmVyaWVzL3tkZWxpdmVyeV9pZH1cIl0sXG4gICAgbGlzdEFjY291bnRzRm9yUGxhbjogW1wiR0VUIC9tYXJrZXRwbGFjZV9saXN0aW5nL3BsYW5zL3twbGFuX2lkfS9hY2NvdW50c1wiXSxcbiAgICBsaXN0QWNjb3VudHNGb3JQbGFuU3R1YmJlZDogW1xuICAgICAgXCJHRVQgL21hcmtldHBsYWNlX2xpc3Rpbmcvc3R1YmJlZC9wbGFucy97cGxhbl9pZH0vYWNjb3VudHNcIlxuICAgIF0sXG4gICAgbGlzdEluc3RhbGxhdGlvblJlcG9zRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL2luc3RhbGxhdGlvbnMve2luc3RhbGxhdGlvbl9pZH0vcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIGxpc3RJbnN0YWxsYXRpb25SZXF1ZXN0c0ZvckF1dGhlbnRpY2F0ZWRBcHA6IFtcbiAgICAgIFwiR0VUIC9hcHAvaW5zdGFsbGF0aW9uLXJlcXVlc3RzXCJcbiAgICBdLFxuICAgIGxpc3RJbnN0YWxsYXRpb25zOiBbXCJHRVQgL2FwcC9pbnN0YWxsYXRpb25zXCJdLFxuICAgIGxpc3RJbnN0YWxsYXRpb25zRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9pbnN0YWxsYXRpb25zXCJdLFxuICAgIGxpc3RQbGFuczogW1wiR0VUIC9tYXJrZXRwbGFjZV9saXN0aW5nL3BsYW5zXCJdLFxuICAgIGxpc3RQbGFuc1N0dWJiZWQ6IFtcIkdFVCAvbWFya2V0cGxhY2VfbGlzdGluZy9zdHViYmVkL3BsYW5zXCJdLFxuICAgIGxpc3RSZXBvc0FjY2Vzc2libGVUb0luc3RhbGxhdGlvbjogW1wiR0VUIC9pbnN0YWxsYXRpb24vcmVwb3NpdG9yaWVzXCJdLFxuICAgIGxpc3RTdWJzY3JpcHRpb25zRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9tYXJrZXRwbGFjZV9wdXJjaGFzZXNcIl0sXG4gICAgbGlzdFN1YnNjcmlwdGlvbnNGb3JBdXRoZW50aWNhdGVkVXNlclN0dWJiZWQ6IFtcbiAgICAgIFwiR0VUIC91c2VyL21hcmtldHBsYWNlX3B1cmNoYXNlcy9zdHViYmVkXCJcbiAgICBdLFxuICAgIGxpc3RXZWJob29rRGVsaXZlcmllczogW1wiR0VUIC9hcHAvaG9vay9kZWxpdmVyaWVzXCJdLFxuICAgIHJlZGVsaXZlcldlYmhvb2tEZWxpdmVyeTogW1xuICAgICAgXCJQT1NUIC9hcHAvaG9vay9kZWxpdmVyaWVzL3tkZWxpdmVyeV9pZH0vYXR0ZW1wdHNcIlxuICAgIF0sXG4gICAgcmVtb3ZlUmVwb0Zyb21JbnN0YWxsYXRpb246IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL2luc3RhbGxhdGlvbnMve2luc3RhbGxhdGlvbl9pZH0vcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfVwiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcImFwcHNcIiwgXCJyZW1vdmVSZXBvRnJvbUluc3RhbGxhdGlvbkZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIHJlbW92ZVJlcG9Gcm9tSW5zdGFsbGF0aW9uRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL2luc3RhbGxhdGlvbnMve2luc3RhbGxhdGlvbl9pZH0vcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfVwiXG4gICAgXSxcbiAgICByZXNldFRva2VuOiBbXCJQQVRDSCAvYXBwbGljYXRpb25zL3tjbGllbnRfaWR9L3Rva2VuXCJdLFxuICAgIHJldm9rZUluc3RhbGxhdGlvbkFjY2Vzc1Rva2VuOiBbXCJERUxFVEUgL2luc3RhbGxhdGlvbi90b2tlblwiXSxcbiAgICBzY29wZVRva2VuOiBbXCJQT1NUIC9hcHBsaWNhdGlvbnMve2NsaWVudF9pZH0vdG9rZW4vc2NvcGVkXCJdLFxuICAgIHN1c3BlbmRJbnN0YWxsYXRpb246IFtcIlBVVCAvYXBwL2luc3RhbGxhdGlvbnMve2luc3RhbGxhdGlvbl9pZH0vc3VzcGVuZGVkXCJdLFxuICAgIHVuc3VzcGVuZEluc3RhbGxhdGlvbjogW1xuICAgICAgXCJERUxFVEUgL2FwcC9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9L3N1c3BlbmRlZFwiXG4gICAgXSxcbiAgICB1cGRhdGVXZWJob29rQ29uZmlnRm9yQXBwOiBbXCJQQVRDSCAvYXBwL2hvb2svY29uZmlnXCJdXG4gIH0sXG4gIGJpbGxpbmc6IHtcbiAgICBnZXRHaXRodWJBY3Rpb25zQmlsbGluZ09yZzogW1wiR0VUIC9vcmdzL3tvcmd9L3NldHRpbmdzL2JpbGxpbmcvYWN0aW9uc1wiXSxcbiAgICBnZXRHaXRodWJBY3Rpb25zQmlsbGluZ1VzZXI6IFtcbiAgICAgIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3NldHRpbmdzL2JpbGxpbmcvYWN0aW9uc1wiXG4gICAgXSxcbiAgICBnZXRHaXRodWJQYWNrYWdlc0JpbGxpbmdPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9zZXR0aW5ncy9iaWxsaW5nL3BhY2thZ2VzXCJdLFxuICAgIGdldEdpdGh1YlBhY2thZ2VzQmlsbGluZ1VzZXI6IFtcbiAgICAgIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3NldHRpbmdzL2JpbGxpbmcvcGFja2FnZXNcIlxuICAgIF0sXG4gICAgZ2V0U2hhcmVkU3RvcmFnZUJpbGxpbmdPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3NldHRpbmdzL2JpbGxpbmcvc2hhcmVkLXN0b3JhZ2VcIlxuICAgIF0sXG4gICAgZ2V0U2hhcmVkU3RvcmFnZUJpbGxpbmdVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9zZXR0aW5ncy9iaWxsaW5nL3NoYXJlZC1zdG9yYWdlXCJcbiAgICBdXG4gIH0sXG4gIGNoZWNrczoge1xuICAgIGNyZWF0ZTogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stcnVuc1wiXSxcbiAgICBjcmVhdGVTdWl0ZTogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stc3VpdGVzXCJdLFxuICAgIGdldDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jaGVjay1ydW5zL3tjaGVja19ydW5faWR9XCJdLFxuICAgIGdldFN1aXRlOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NoZWNrLXN1aXRlcy97Y2hlY2tfc3VpdGVfaWR9XCJdLFxuICAgIGxpc3RBbm5vdGF0aW9uczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NoZWNrLXJ1bnMve2NoZWNrX3J1bl9pZH0vYW5ub3RhdGlvbnNcIlxuICAgIF0sXG4gICAgbGlzdEZvclJlZjogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tyZWZ9L2NoZWNrLXJ1bnNcIl0sXG4gICAgbGlzdEZvclN1aXRlOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stc3VpdGVzL3tjaGVja19zdWl0ZV9pZH0vY2hlY2stcnVuc1wiXG4gICAgXSxcbiAgICBsaXN0U3VpdGVzRm9yUmVmOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve3JlZn0vY2hlY2stc3VpdGVzXCJdLFxuICAgIHJlcmVxdWVzdFJ1bjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jaGVjay1ydW5zL3tjaGVja19ydW5faWR9L3JlcmVxdWVzdFwiXG4gICAgXSxcbiAgICByZXJlcXVlc3RTdWl0ZTogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jaGVjay1zdWl0ZXMve2NoZWNrX3N1aXRlX2lkfS9yZXJlcXVlc3RcIlxuICAgIF0sXG4gICAgc2V0U3VpdGVzUHJlZmVyZW5jZXM6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2NoZWNrLXN1aXRlcy9wcmVmZXJlbmNlc1wiXG4gICAgXSxcbiAgICB1cGRhdGU6IFtcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jaGVjay1ydW5zL3tjaGVja19ydW5faWR9XCJdXG4gIH0sXG4gIGNvZGVTY2FubmluZzoge1xuICAgIGRlbGV0ZUFuYWx5c2lzOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbmFseXNlcy97YW5hbHlzaXNfaWR9ez9jb25maXJtX2RlbGV0ZX1cIlxuICAgIF0sXG4gICAgZ2V0QWxlcnQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL2FsZXJ0cy97YWxlcnRfbnVtYmVyfVwiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWRQYXJhbWV0ZXJzOiB7IGFsZXJ0X2lkOiBcImFsZXJ0X251bWJlclwiIH0gfVxuICAgIF0sXG4gICAgZ2V0QW5hbHlzaXM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL2FuYWx5c2VzL3thbmFseXNpc19pZH1cIlxuICAgIF0sXG4gICAgZ2V0Q29kZXFsRGF0YWJhc2U6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL2NvZGVxbC9kYXRhYmFzZXMve2xhbmd1YWdlfVwiXG4gICAgXSxcbiAgICBnZXREZWZhdWx0U2V0dXA6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9kZWZhdWx0LXNldHVwXCJdLFxuICAgIGdldFNhcmlmOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvc2FyaWZzL3tzYXJpZl9pZH1cIl0sXG4gICAgbGlzdEFsZXJ0SW5zdGFuY2VzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbGVydHMve2FsZXJ0X251bWJlcn0vaW5zdGFuY2VzXCJcbiAgICBdLFxuICAgIGxpc3RBbGVydHNGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9jb2RlLXNjYW5uaW5nL2FsZXJ0c1wiXSxcbiAgICBsaXN0QWxlcnRzRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL2FsZXJ0c1wiXSxcbiAgICBsaXN0QWxlcnRzSW5zdGFuY2VzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbGVydHMve2FsZXJ0X251bWJlcn0vaW5zdGFuY2VzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wiY29kZVNjYW5uaW5nXCIsIFwibGlzdEFsZXJ0SW5zdGFuY2VzXCJdIH1cbiAgICBdLFxuICAgIGxpc3RDb2RlcWxEYXRhYmFzZXM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL2NvZGVxbC9kYXRhYmFzZXNcIlxuICAgIF0sXG4gICAgbGlzdFJlY2VudEFuYWx5c2VzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvYW5hbHlzZXNcIl0sXG4gICAgdXBkYXRlQWxlcnQ6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9XCJcbiAgICBdLFxuICAgIHVwZGF0ZURlZmF1bHRTZXR1cDogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9kZWZhdWx0LXNldHVwXCJcbiAgICBdLFxuICAgIHVwbG9hZFNhcmlmOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL3Nhcmlmc1wiXVxuICB9LFxuICBjb2Rlc09mQ29uZHVjdDoge1xuICAgIGdldEFsbENvZGVzT2ZDb25kdWN0OiBbXCJHRVQgL2NvZGVzX29mX2NvbmR1Y3RcIl0sXG4gICAgZ2V0Q29uZHVjdENvZGU6IFtcIkdFVCAvY29kZXNfb2ZfY29uZHVjdC97a2V5fVwiXVxuICB9LFxuICBjb2Rlc3BhY2VzOiB7XG4gICAgYWRkUmVwb3NpdG9yeUZvclNlY3JldEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBVVCAvdXNlci9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIGFkZFNlbGVjdGVkUmVwb1RvT3JnU2VjcmV0OiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIGNoZWNrUGVybWlzc2lvbnNGb3JEZXZjb250YWluZXI6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlc3BhY2VzL3Blcm1pc3Npb25zX2NoZWNrXCJcbiAgICBdLFxuICAgIGNvZGVzcGFjZU1hY2hpbmVzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL2NvZGVzcGFjZXMve2NvZGVzcGFjZV9uYW1lfS9tYWNoaW5lc1wiXG4gICAgXSxcbiAgICBjcmVhdGVGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUE9TVCAvdXNlci9jb2Rlc3BhY2VzXCJdLFxuICAgIGNyZWF0ZU9yVXBkYXRlT3JnU2VjcmV0OiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBjcmVhdGVPclVwZGF0ZVJlcG9TZWNyZXQ6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBjcmVhdGVPclVwZGF0ZVNlY3JldEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBVVCAvdXNlci9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBjcmVhdGVXaXRoUHJGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L2NvZGVzcGFjZXNcIlxuICAgIF0sXG4gICAgY3JlYXRlV2l0aFJlcG9Gb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlc3BhY2VzXCJcbiAgICBdLFxuICAgIGRlbGV0ZUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJERUxFVEUgL3VzZXIvY29kZXNwYWNlcy97Y29kZXNwYWNlX25hbWV9XCJdLFxuICAgIGRlbGV0ZUZyb21Pcmdhbml6YXRpb246IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L21lbWJlcnMve3VzZXJuYW1lfS9jb2Rlc3BhY2VzL3tjb2Rlc3BhY2VfbmFtZX1cIlxuICAgIF0sXG4gICAgZGVsZXRlT3JnU2VjcmV0OiBbXCJERUxFVEUgL29yZ3Mve29yZ30vY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIl0sXG4gICAgZGVsZXRlUmVwb1NlY3JldDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVNlY3JldEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkRFTEVURSAvdXNlci9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBleHBvcnRGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQT1NUIC91c2VyL2NvZGVzcGFjZXMve2NvZGVzcGFjZV9uYW1lfS9leHBvcnRzXCJcbiAgICBdLFxuICAgIGdldENvZGVzcGFjZXNGb3JVc2VySW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L21lbWJlcnMve3VzZXJuYW1lfS9jb2Rlc3BhY2VzXCJcbiAgICBdLFxuICAgIGdldEV4cG9ydERldGFpbHNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXIvY29kZXNwYWNlcy97Y29kZXNwYWNlX25hbWV9L2V4cG9ydHMve2V4cG9ydF9pZH1cIlxuICAgIF0sXG4gICAgZ2V0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9jb2Rlc3BhY2VzL3tjb2Rlc3BhY2VfbmFtZX1cIl0sXG4gICAgZ2V0T3JnUHVibGljS2V5OiBbXCJHRVQgL29yZ3Mve29yZ30vY29kZXNwYWNlcy9zZWNyZXRzL3B1YmxpYy1rZXlcIl0sXG4gICAgZ2V0T3JnU2VjcmV0OiBbXCJHRVQgL29yZ3Mve29yZ30vY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIl0sXG4gICAgZ2V0UHVibGljS2V5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL2NvZGVzcGFjZXMvc2VjcmV0cy9wdWJsaWMta2V5XCJcbiAgICBdLFxuICAgIGdldFJlcG9QdWJsaWNLZXk6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlc3BhY2VzL3NlY3JldHMvcHVibGljLWtleVwiXG4gICAgXSxcbiAgICBnZXRSZXBvU2VjcmV0OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgZ2V0U2VjcmV0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGxpc3REZXZjb250YWluZXJzSW5SZXBvc2l0b3J5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlc3BhY2VzL2RldmNvbnRhaW5lcnNcIlxuICAgIF0sXG4gICAgbGlzdEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvY29kZXNwYWNlc1wiXSxcbiAgICBsaXN0SW5Pcmdhbml6YXRpb246IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2NvZGVzcGFjZXNcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkUGFyYW1ldGVyczogeyBvcmdfaWQ6IFwib3JnXCIgfSB9XG4gICAgXSxcbiAgICBsaXN0SW5SZXBvc2l0b3J5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlc3BhY2VzXCJcbiAgICBdLFxuICAgIGxpc3RPcmdTZWNyZXRzOiBbXCJHRVQgL29yZ3Mve29yZ30vY29kZXNwYWNlcy9zZWNyZXRzXCJdLFxuICAgIGxpc3RSZXBvU2VjcmV0czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlc3BhY2VzL3NlY3JldHNcIl0sXG4gICAgbGlzdFJlcG9zaXRvcmllc0ZvclNlY3JldEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgbGlzdFNlY3JldHNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL2NvZGVzcGFjZXMvc2VjcmV0c1wiXSxcbiAgICBsaXN0U2VsZWN0ZWRSZXBvc0Zvck9yZ1NlY3JldDogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIHByZUZsaWdodFdpdGhSZXBvRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlc3BhY2VzL25ld1wiXG4gICAgXSxcbiAgICBwdWJsaXNoRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiUE9TVCAvdXNlci9jb2Rlc3BhY2VzL3tjb2Rlc3BhY2VfbmFtZX0vcHVibGlzaFwiXG4gICAgXSxcbiAgICByZW1vdmVSZXBvc2l0b3J5Rm9yU2VjcmV0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgcmVtb3ZlU2VsZWN0ZWRSZXBvRnJvbU9yZ1NlY3JldDogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfVwiXG4gICAgXSxcbiAgICByZXBvTWFjaGluZXNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVzcGFjZXMvbWFjaGluZXNcIlxuICAgIF0sXG4gICAgc2V0UmVwb3NpdG9yaWVzRm9yU2VjcmV0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiUFVUIC91c2VyL2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBzZXRTZWxlY3RlZFJlcG9zRm9yT3JnU2VjcmV0OiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgc3RhcnRGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUE9TVCAvdXNlci9jb2Rlc3BhY2VzL3tjb2Rlc3BhY2VfbmFtZX0vc3RhcnRcIl0sXG4gICAgc3RvcEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJQT1NUIC91c2VyL2NvZGVzcGFjZXMve2NvZGVzcGFjZV9uYW1lfS9zdG9wXCJdLFxuICAgIHN0b3BJbk9yZ2FuaXphdGlvbjogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L21lbWJlcnMve3VzZXJuYW1lfS9jb2Rlc3BhY2VzL3tjb2Rlc3BhY2VfbmFtZX0vc3RvcFwiXG4gICAgXSxcbiAgICB1cGRhdGVGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUEFUQ0ggL3VzZXIvY29kZXNwYWNlcy97Y29kZXNwYWNlX25hbWV9XCJdXG4gIH0sXG4gIGNvcGlsb3Q6IHtcbiAgICBhZGRDb3BpbG90U2VhdHNGb3JUZWFtczogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L2NvcGlsb3QvYmlsbGluZy9zZWxlY3RlZF90ZWFtc1wiXG4gICAgXSxcbiAgICBhZGRDb3BpbG90U2VhdHNGb3JVc2VyczogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L2NvcGlsb3QvYmlsbGluZy9zZWxlY3RlZF91c2Vyc1wiXG4gICAgXSxcbiAgICBjYW5jZWxDb3BpbG90U2VhdEFzc2lnbm1lbnRGb3JUZWFtczogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vY29waWxvdC9iaWxsaW5nL3NlbGVjdGVkX3RlYW1zXCJcbiAgICBdLFxuICAgIGNhbmNlbENvcGlsb3RTZWF0QXNzaWdubWVudEZvclVzZXJzOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9jb3BpbG90L2JpbGxpbmcvc2VsZWN0ZWRfdXNlcnNcIlxuICAgIF0sXG4gICAgZ2V0Q29waWxvdE9yZ2FuaXphdGlvbkRldGFpbHM6IFtcIkdFVCAvb3Jncy97b3JnfS9jb3BpbG90L2JpbGxpbmdcIl0sXG4gICAgZ2V0Q29waWxvdFNlYXREZXRhaWxzRm9yVXNlcjogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vbWVtYmVycy97dXNlcm5hbWV9L2NvcGlsb3RcIlxuICAgIF0sXG4gICAgbGlzdENvcGlsb3RTZWF0czogW1wiR0VUIC9vcmdzL3tvcmd9L2NvcGlsb3QvYmlsbGluZy9zZWF0c1wiXVxuICB9LFxuICBkZXBlbmRhYm90OiB7XG4gICAgYWRkU2VsZWN0ZWRSZXBvVG9PcmdTZWNyZXQ6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2RlcGVuZGFib3Qvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgY3JlYXRlT3JVcGRhdGVPcmdTZWNyZXQ6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2RlcGVuZGFib3Qvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGNyZWF0ZU9yVXBkYXRlUmVwb1NlY3JldDogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGVuZGFib3Qvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGRlbGV0ZU9yZ1NlY3JldDogW1wiREVMRVRFIC9vcmdzL3tvcmd9L2RlcGVuZGFib3Qvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJdLFxuICAgIGRlbGV0ZVJlcG9TZWNyZXQ6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRhYm90L3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBnZXRBbGVydDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRhYm90L2FsZXJ0cy97YWxlcnRfbnVtYmVyfVwiXSxcbiAgICBnZXRPcmdQdWJsaWNLZXk6IFtcIkdFVCAvb3Jncy97b3JnfS9kZXBlbmRhYm90L3NlY3JldHMvcHVibGljLWtleVwiXSxcbiAgICBnZXRPcmdTZWNyZXQ6IFtcIkdFVCAvb3Jncy97b3JnfS9kZXBlbmRhYm90L3NlY3JldHMve3NlY3JldF9uYW1lfVwiXSxcbiAgICBnZXRSZXBvUHVibGljS2V5OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwZW5kYWJvdC9zZWNyZXRzL3B1YmxpYy1rZXlcIlxuICAgIF0sXG4gICAgZ2V0UmVwb1NlY3JldDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGVuZGFib3Qvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGxpc3RBbGVydHNGb3JFbnRlcnByaXNlOiBbXG4gICAgICBcIkdFVCAvZW50ZXJwcmlzZXMve2VudGVycHJpc2V9L2RlcGVuZGFib3QvYWxlcnRzXCJcbiAgICBdLFxuICAgIGxpc3RBbGVydHNGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9kZXBlbmRhYm90L2FsZXJ0c1wiXSxcbiAgICBsaXN0QWxlcnRzRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRhYm90L2FsZXJ0c1wiXSxcbiAgICBsaXN0T3JnU2VjcmV0czogW1wiR0VUIC9vcmdzL3tvcmd9L2RlcGVuZGFib3Qvc2VjcmV0c1wiXSxcbiAgICBsaXN0UmVwb1NlY3JldHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwZW5kYWJvdC9zZWNyZXRzXCJdLFxuICAgIGxpc3RTZWxlY3RlZFJlcG9zRm9yT3JnU2VjcmV0OiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9kZXBlbmRhYm90L3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgcmVtb3ZlU2VsZWN0ZWRSZXBvRnJvbU9yZ1NlY3JldDogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vZGVwZW5kYWJvdC9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfVwiXG4gICAgXSxcbiAgICBzZXRTZWxlY3RlZFJlcG9zRm9yT3JnU2VjcmV0OiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9kZXBlbmRhYm90L3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgdXBkYXRlQWxlcnQ6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGVuZGFib3QvYWxlcnRzL3thbGVydF9udW1iZXJ9XCJcbiAgICBdXG4gIH0sXG4gIGRlcGVuZGVuY3lHcmFwaDoge1xuICAgIGNyZWF0ZVJlcG9zaXRvcnlTbmFwc2hvdDogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRlbmN5LWdyYXBoL3NuYXBzaG90c1wiXG4gICAgXSxcbiAgICBkaWZmUmFuZ2U6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRlbmN5LWdyYXBoL2NvbXBhcmUve2Jhc2VoZWFkfVwiXG4gICAgXSxcbiAgICBleHBvcnRTYm9tOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGVuZGVuY3ktZ3JhcGgvc2JvbVwiXVxuICB9LFxuICBlbW9qaXM6IHsgZ2V0OiBbXCJHRVQgL2Vtb2ppc1wiXSB9LFxuICBnaXN0czoge1xuICAgIGNoZWNrSXNTdGFycmVkOiBbXCJHRVQgL2dpc3RzL3tnaXN0X2lkfS9zdGFyXCJdLFxuICAgIGNyZWF0ZTogW1wiUE9TVCAvZ2lzdHNcIl0sXG4gICAgY3JlYXRlQ29tbWVudDogW1wiUE9TVCAvZ2lzdHMve2dpc3RfaWR9L2NvbW1lbnRzXCJdLFxuICAgIGRlbGV0ZTogW1wiREVMRVRFIC9naXN0cy97Z2lzdF9pZH1cIl0sXG4gICAgZGVsZXRlQ29tbWVudDogW1wiREVMRVRFIC9naXN0cy97Z2lzdF9pZH0vY29tbWVudHMve2NvbW1lbnRfaWR9XCJdLFxuICAgIGZvcms6IFtcIlBPU1QgL2dpc3RzL3tnaXN0X2lkfS9mb3Jrc1wiXSxcbiAgICBnZXQ6IFtcIkdFVCAvZ2lzdHMve2dpc3RfaWR9XCJdLFxuICAgIGdldENvbW1lbnQ6IFtcIkdFVCAvZ2lzdHMve2dpc3RfaWR9L2NvbW1lbnRzL3tjb21tZW50X2lkfVwiXSxcbiAgICBnZXRSZXZpc2lvbjogW1wiR0VUIC9naXN0cy97Z2lzdF9pZH0ve3NoYX1cIl0sXG4gICAgbGlzdDogW1wiR0VUIC9naXN0c1wiXSxcbiAgICBsaXN0Q29tbWVudHM6IFtcIkdFVCAvZ2lzdHMve2dpc3RfaWR9L2NvbW1lbnRzXCJdLFxuICAgIGxpc3RDb21taXRzOiBbXCJHRVQgL2dpc3RzL3tnaXN0X2lkfS9jb21taXRzXCJdLFxuICAgIGxpc3RGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZ2lzdHNcIl0sXG4gICAgbGlzdEZvcmtzOiBbXCJHRVQgL2dpc3RzL3tnaXN0X2lkfS9mb3Jrc1wiXSxcbiAgICBsaXN0UHVibGljOiBbXCJHRVQgL2dpc3RzL3B1YmxpY1wiXSxcbiAgICBsaXN0U3RhcnJlZDogW1wiR0VUIC9naXN0cy9zdGFycmVkXCJdLFxuICAgIHN0YXI6IFtcIlBVVCAvZ2lzdHMve2dpc3RfaWR9L3N0YXJcIl0sXG4gICAgdW5zdGFyOiBbXCJERUxFVEUgL2dpc3RzL3tnaXN0X2lkfS9zdGFyXCJdLFxuICAgIHVwZGF0ZTogW1wiUEFUQ0ggL2dpc3RzL3tnaXN0X2lkfVwiXSxcbiAgICB1cGRhdGVDb21tZW50OiBbXCJQQVRDSCAvZ2lzdHMve2dpc3RfaWR9L2NvbW1lbnRzL3tjb21tZW50X2lkfVwiXVxuICB9LFxuICBnaXQ6IHtcbiAgICBjcmVhdGVCbG9iOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvYmxvYnNcIl0sXG4gICAgY3JlYXRlQ29tbWl0OiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvY29tbWl0c1wiXSxcbiAgICBjcmVhdGVSZWY6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2dpdC9yZWZzXCJdLFxuICAgIGNyZWF0ZVRhZzogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZ2l0L3RhZ3NcIl0sXG4gICAgY3JlYXRlVHJlZTogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZ2l0L3RyZWVzXCJdLFxuICAgIGRlbGV0ZVJlZjogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvcmVmcy97cmVmfVwiXSxcbiAgICBnZXRCbG9iOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2dpdC9ibG9icy97ZmlsZV9zaGF9XCJdLFxuICAgIGdldENvbW1pdDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvY29tbWl0cy97Y29tbWl0X3NoYX1cIl0sXG4gICAgZ2V0UmVmOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2dpdC9yZWYve3JlZn1cIl0sXG4gICAgZ2V0VGFnOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2dpdC90YWdzL3t0YWdfc2hhfVwiXSxcbiAgICBnZXRUcmVlOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2dpdC90cmVlcy97dHJlZV9zaGF9XCJdLFxuICAgIGxpc3RNYXRjaGluZ1JlZnM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZ2l0L21hdGNoaW5nLXJlZnMve3JlZn1cIl0sXG4gICAgdXBkYXRlUmVmOiBbXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vZ2l0L3JlZnMve3JlZn1cIl1cbiAgfSxcbiAgZ2l0aWdub3JlOiB7XG4gICAgZ2V0QWxsVGVtcGxhdGVzOiBbXCJHRVQgL2dpdGlnbm9yZS90ZW1wbGF0ZXNcIl0sXG4gICAgZ2V0VGVtcGxhdGU6IFtcIkdFVCAvZ2l0aWdub3JlL3RlbXBsYXRlcy97bmFtZX1cIl1cbiAgfSxcbiAgaW50ZXJhY3Rpb25zOiB7XG4gICAgZ2V0UmVzdHJpY3Rpb25zRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9pbnRlcmFjdGlvbi1saW1pdHNcIl0sXG4gICAgZ2V0UmVzdHJpY3Rpb25zRm9yT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vaW50ZXJhY3Rpb24tbGltaXRzXCJdLFxuICAgIGdldFJlc3RyaWN0aW9uc0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaW50ZXJhY3Rpb24tbGltaXRzXCJdLFxuICAgIGdldFJlc3RyaWN0aW9uc0ZvcllvdXJQdWJsaWNSZXBvczogW1xuICAgICAgXCJHRVQgL3VzZXIvaW50ZXJhY3Rpb24tbGltaXRzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wiaW50ZXJhY3Rpb25zXCIsIFwiZ2V0UmVzdHJpY3Rpb25zRm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgcmVtb3ZlUmVzdHJpY3Rpb25zRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkRFTEVURSAvdXNlci9pbnRlcmFjdGlvbi1saW1pdHNcIl0sXG4gICAgcmVtb3ZlUmVzdHJpY3Rpb25zRm9yT3JnOiBbXCJERUxFVEUgL29yZ3Mve29yZ30vaW50ZXJhY3Rpb24tbGltaXRzXCJdLFxuICAgIHJlbW92ZVJlc3RyaWN0aW9uc0ZvclJlcG86IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbnRlcmFjdGlvbi1saW1pdHNcIlxuICAgIF0sXG4gICAgcmVtb3ZlUmVzdHJpY3Rpb25zRm9yWW91clB1YmxpY1JlcG9zOiBbXG4gICAgICBcIkRFTEVURSAvdXNlci9pbnRlcmFjdGlvbi1saW1pdHNcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJpbnRlcmFjdGlvbnNcIiwgXCJyZW1vdmVSZXN0cmljdGlvbnNGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBzZXRSZXN0cmljdGlvbnNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUFVUIC91c2VyL2ludGVyYWN0aW9uLWxpbWl0c1wiXSxcbiAgICBzZXRSZXN0cmljdGlvbnNGb3JPcmc6IFtcIlBVVCAvb3Jncy97b3JnfS9pbnRlcmFjdGlvbi1saW1pdHNcIl0sXG4gICAgc2V0UmVzdHJpY3Rpb25zRm9yUmVwbzogW1wiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbnRlcmFjdGlvbi1saW1pdHNcIl0sXG4gICAgc2V0UmVzdHJpY3Rpb25zRm9yWW91clB1YmxpY1JlcG9zOiBbXG4gICAgICBcIlBVVCAvdXNlci9pbnRlcmFjdGlvbi1saW1pdHNcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJpbnRlcmFjdGlvbnNcIiwgXCJzZXRSZXN0cmljdGlvbnNGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXVxuICB9LFxuICBpc3N1ZXM6IHtcbiAgICBhZGRBc3NpZ25lZXM6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2Fzc2lnbmVlc1wiXG4gICAgXSxcbiAgICBhZGRMYWJlbHM6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9sYWJlbHNcIl0sXG4gICAgY2hlY2tVc2VyQ2FuQmVBc3NpZ25lZDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hc3NpZ25lZXMve2Fzc2lnbmVlfVwiXSxcbiAgICBjaGVja1VzZXJDYW5CZUFzc2lnbmVkVG9Jc3N1ZTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9hc3NpZ25lZXMve2Fzc2lnbmVlfVwiXG4gICAgXSxcbiAgICBjcmVhdGU6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlc1wiXSxcbiAgICBjcmVhdGVDb21tZW50OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9jb21tZW50c1wiXG4gICAgXSxcbiAgICBjcmVhdGVMYWJlbDogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vbGFiZWxzXCJdLFxuICAgIGNyZWF0ZU1pbGVzdG9uZTogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vbWlsZXN0b25lc1wiXSxcbiAgICBkZWxldGVDb21tZW50OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL2NvbW1lbnRzL3tjb21tZW50X2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVMYWJlbDogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9sYWJlbHMve25hbWV9XCJdLFxuICAgIGRlbGV0ZU1pbGVzdG9uZTogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L21pbGVzdG9uZXMve21pbGVzdG9uZV9udW1iZXJ9XCJcbiAgICBdLFxuICAgIGdldDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn1cIl0sXG4gICAgZ2V0Q29tbWVudDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvY29tbWVudHMve2NvbW1lbnRfaWR9XCJdLFxuICAgIGdldEV2ZW50OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy9ldmVudHMve2V2ZW50X2lkfVwiXSxcbiAgICBnZXRMYWJlbDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9sYWJlbHMve25hbWV9XCJdLFxuICAgIGdldE1pbGVzdG9uZTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9taWxlc3RvbmVzL3ttaWxlc3RvbmVfbnVtYmVyfVwiXSxcbiAgICBsaXN0OiBbXCJHRVQgL2lzc3Vlc1wiXSxcbiAgICBsaXN0QXNzaWduZWVzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Fzc2lnbmVlc1wiXSxcbiAgICBsaXN0Q29tbWVudHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2NvbW1lbnRzXCJdLFxuICAgIGxpc3RDb21tZW50c0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL2NvbW1lbnRzXCJdLFxuICAgIGxpc3RFdmVudHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2V2ZW50c1wiXSxcbiAgICBsaXN0RXZlbnRzRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvZXZlbnRzXCJdLFxuICAgIGxpc3RFdmVudHNGb3JUaW1lbGluZTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS90aW1lbGluZVwiXG4gICAgXSxcbiAgICBsaXN0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9pc3N1ZXNcIl0sXG4gICAgbGlzdEZvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L2lzc3Vlc1wiXSxcbiAgICBsaXN0Rm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXNcIl0sXG4gICAgbGlzdExhYmVsc0Zvck1pbGVzdG9uZTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L21pbGVzdG9uZXMve21pbGVzdG9uZV9udW1iZXJ9L2xhYmVsc1wiXG4gICAgXSxcbiAgICBsaXN0TGFiZWxzRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9sYWJlbHNcIl0sXG4gICAgbGlzdExhYmVsc09uSXNzdWU6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vbGFiZWxzXCJcbiAgICBdLFxuICAgIGxpc3RNaWxlc3RvbmVzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L21pbGVzdG9uZXNcIl0sXG4gICAgbG9jazogW1wiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vbG9ja1wiXSxcbiAgICByZW1vdmVBbGxMYWJlbHM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vbGFiZWxzXCJcbiAgICBdLFxuICAgIHJlbW92ZUFzc2lnbmVlczogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9hc3NpZ25lZXNcIlxuICAgIF0sXG4gICAgcmVtb3ZlTGFiZWw6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vbGFiZWxzL3tuYW1lfVwiXG4gICAgXSxcbiAgICBzZXRMYWJlbHM6IFtcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2xhYmVsc1wiXSxcbiAgICB1bmxvY2s6IFtcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2xvY2tcIl0sXG4gICAgdXBkYXRlOiBbXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9XCJdLFxuICAgIHVwZGF0ZUNvbW1lbnQ6IFtcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvY29tbWVudHMve2NvbW1lbnRfaWR9XCJdLFxuICAgIHVwZGF0ZUxhYmVsOiBbXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vbGFiZWxzL3tuYW1lfVwiXSxcbiAgICB1cGRhdGVNaWxlc3RvbmU6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L21pbGVzdG9uZXMve21pbGVzdG9uZV9udW1iZXJ9XCJcbiAgICBdXG4gIH0sXG4gIGxpY2Vuc2VzOiB7XG4gICAgZ2V0OiBbXCJHRVQgL2xpY2Vuc2VzL3tsaWNlbnNlfVwiXSxcbiAgICBnZXRBbGxDb21tb25seVVzZWQ6IFtcIkdFVCAvbGljZW5zZXNcIl0sXG4gICAgZ2V0Rm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9saWNlbnNlXCJdXG4gIH0sXG4gIG1hcmtkb3duOiB7XG4gICAgcmVuZGVyOiBbXCJQT1NUIC9tYXJrZG93blwiXSxcbiAgICByZW5kZXJSYXc6IFtcbiAgICAgIFwiUE9TVCAvbWFya2Rvd24vcmF3XCIsXG4gICAgICB7IGhlYWRlcnM6IHsgXCJjb250ZW50LXR5cGVcIjogXCJ0ZXh0L3BsYWluOyBjaGFyc2V0PXV0Zi04XCIgfSB9XG4gICAgXVxuICB9LFxuICBtZXRhOiB7XG4gICAgZ2V0OiBbXCJHRVQgL21ldGFcIl0sXG4gICAgZ2V0QWxsVmVyc2lvbnM6IFtcIkdFVCAvdmVyc2lvbnNcIl0sXG4gICAgZ2V0T2N0b2NhdDogW1wiR0VUIC9vY3RvY2F0XCJdLFxuICAgIGdldFplbjogW1wiR0VUIC96ZW5cIl0sXG4gICAgcm9vdDogW1wiR0VUIC9cIl1cbiAgfSxcbiAgbWlncmF0aW9uczoge1xuICAgIGNhbmNlbEltcG9ydDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2ltcG9ydFwiLFxuICAgICAge30sXG4gICAgICB7XG4gICAgICAgIGRlcHJlY2F0ZWQ6IFwib2N0b2tpdC5yZXN0Lm1pZ3JhdGlvbnMuY2FuY2VsSW1wb3J0KCkgaXMgZGVwcmVjYXRlZCwgc2VlIGh0dHBzOi8vZG9jcy5naXRodWIuY29tL3Jlc3QvbWlncmF0aW9ucy9zb3VyY2UtaW1wb3J0cyNjYW5jZWwtYW4taW1wb3J0XCJcbiAgICAgIH1cbiAgICBdLFxuICAgIGRlbGV0ZUFyY2hpdmVGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvbWlncmF0aW9ucy97bWlncmF0aW9uX2lkfS9hcmNoaXZlXCJcbiAgICBdLFxuICAgIGRlbGV0ZUFyY2hpdmVGb3JPcmc6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L21pZ3JhdGlvbnMve21pZ3JhdGlvbl9pZH0vYXJjaGl2ZVwiXG4gICAgXSxcbiAgICBkb3dubG9hZEFyY2hpdmVGb3JPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L21pZ3JhdGlvbnMve21pZ3JhdGlvbl9pZH0vYXJjaGl2ZVwiXG4gICAgXSxcbiAgICBnZXRBcmNoaXZlRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL21pZ3JhdGlvbnMve21pZ3JhdGlvbl9pZH0vYXJjaGl2ZVwiXG4gICAgXSxcbiAgICBnZXRDb21taXRBdXRob3JzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaW1wb3J0L2F1dGhvcnNcIixcbiAgICAgIHt9LFxuICAgICAge1xuICAgICAgICBkZXByZWNhdGVkOiBcIm9jdG9raXQucmVzdC5taWdyYXRpb25zLmdldENvbW1pdEF1dGhvcnMoKSBpcyBkZXByZWNhdGVkLCBzZWUgaHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vcmVzdC9taWdyYXRpb25zL3NvdXJjZS1pbXBvcnRzI2dldC1jb21taXQtYXV0aG9yc1wiXG4gICAgICB9XG4gICAgXSxcbiAgICBnZXRJbXBvcnRTdGF0dXM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbXBvcnRcIixcbiAgICAgIHt9LFxuICAgICAge1xuICAgICAgICBkZXByZWNhdGVkOiBcIm9jdG9raXQucmVzdC5taWdyYXRpb25zLmdldEltcG9ydFN0YXR1cygpIGlzIGRlcHJlY2F0ZWQsIHNlZSBodHRwczovL2RvY3MuZ2l0aHViLmNvbS9yZXN0L21pZ3JhdGlvbnMvc291cmNlLWltcG9ydHMjZ2V0LWFuLWltcG9ydC1zdGF0dXNcIlxuICAgICAgfVxuICAgIF0sXG4gICAgZ2V0TGFyZ2VGaWxlczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2ltcG9ydC9sYXJnZV9maWxlc1wiLFxuICAgICAge30sXG4gICAgICB7XG4gICAgICAgIGRlcHJlY2F0ZWQ6IFwib2N0b2tpdC5yZXN0Lm1pZ3JhdGlvbnMuZ2V0TGFyZ2VGaWxlcygpIGlzIGRlcHJlY2F0ZWQsIHNlZSBodHRwczovL2RvY3MuZ2l0aHViLmNvbS9yZXN0L21pZ3JhdGlvbnMvc291cmNlLWltcG9ydHMjZ2V0LWxhcmdlLWZpbGVzXCJcbiAgICAgIH1cbiAgICBdLFxuICAgIGdldFN0YXR1c0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvbWlncmF0aW9ucy97bWlncmF0aW9uX2lkfVwiXSxcbiAgICBnZXRTdGF0dXNGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9XCJdLFxuICAgIGxpc3RGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL21pZ3JhdGlvbnNcIl0sXG4gICAgbGlzdEZvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L21pZ3JhdGlvbnNcIl0sXG4gICAgbGlzdFJlcG9zRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL21pZ3JhdGlvbnMve21pZ3JhdGlvbl9pZH0vcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIGxpc3RSZXBvc0Zvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L21pZ3JhdGlvbnMve21pZ3JhdGlvbl9pZH0vcmVwb3NpdG9yaWVzXCJdLFxuICAgIGxpc3RSZXBvc0ZvclVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL21pZ3JhdGlvbnMve21pZ3JhdGlvbl9pZH0vcmVwb3NpdG9yaWVzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wibWlncmF0aW9uc1wiLCBcImxpc3RSZXBvc0ZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIG1hcENvbW1pdEF1dGhvcjogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vaW1wb3J0L2F1dGhvcnMve2F1dGhvcl9pZH1cIixcbiAgICAgIHt9LFxuICAgICAge1xuICAgICAgICBkZXByZWNhdGVkOiBcIm9jdG9raXQucmVzdC5taWdyYXRpb25zLm1hcENvbW1pdEF1dGhvcigpIGlzIGRlcHJlY2F0ZWQsIHNlZSBodHRwczovL2RvY3MuZ2l0aHViLmNvbS9yZXN0L21pZ3JhdGlvbnMvc291cmNlLWltcG9ydHMjbWFwLWEtY29tbWl0LWF1dGhvclwiXG4gICAgICB9XG4gICAgXSxcbiAgICBzZXRMZnNQcmVmZXJlbmNlOiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbXBvcnQvbGZzXCIsXG4gICAgICB7fSxcbiAgICAgIHtcbiAgICAgICAgZGVwcmVjYXRlZDogXCJvY3Rva2l0LnJlc3QubWlncmF0aW9ucy5zZXRMZnNQcmVmZXJlbmNlKCkgaXMgZGVwcmVjYXRlZCwgc2VlIGh0dHBzOi8vZG9jcy5naXRodWIuY29tL3Jlc3QvbWlncmF0aW9ucy9zb3VyY2UtaW1wb3J0cyN1cGRhdGUtZ2l0LWxmcy1wcmVmZXJlbmNlXCJcbiAgICAgIH1cbiAgICBdLFxuICAgIHN0YXJ0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBPU1QgL3VzZXIvbWlncmF0aW9uc1wiXSxcbiAgICBzdGFydEZvck9yZzogW1wiUE9TVCAvb3Jncy97b3JnfS9taWdyYXRpb25zXCJdLFxuICAgIHN0YXJ0SW1wb3J0OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vaW1wb3J0XCIsXG4gICAgICB7fSxcbiAgICAgIHtcbiAgICAgICAgZGVwcmVjYXRlZDogXCJvY3Rva2l0LnJlc3QubWlncmF0aW9ucy5zdGFydEltcG9ydCgpIGlzIGRlcHJlY2F0ZWQsIHNlZSBodHRwczovL2RvY3MuZ2l0aHViLmNvbS9yZXN0L21pZ3JhdGlvbnMvc291cmNlLWltcG9ydHMjc3RhcnQtYW4taW1wb3J0XCJcbiAgICAgIH1cbiAgICBdLFxuICAgIHVubG9ja1JlcG9Gb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvbWlncmF0aW9ucy97bWlncmF0aW9uX2lkfS9yZXBvcy97cmVwb19uYW1lfS9sb2NrXCJcbiAgICBdLFxuICAgIHVubG9ja1JlcG9Gb3JPcmc6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L21pZ3JhdGlvbnMve21pZ3JhdGlvbl9pZH0vcmVwb3Mve3JlcG9fbmFtZX0vbG9ja1wiXG4gICAgXSxcbiAgICB1cGRhdGVJbXBvcnQ6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2ltcG9ydFwiLFxuICAgICAge30sXG4gICAgICB7XG4gICAgICAgIGRlcHJlY2F0ZWQ6IFwib2N0b2tpdC5yZXN0Lm1pZ3JhdGlvbnMudXBkYXRlSW1wb3J0KCkgaXMgZGVwcmVjYXRlZCwgc2VlIGh0dHBzOi8vZG9jcy5naXRodWIuY29tL3Jlc3QvbWlncmF0aW9ucy9zb3VyY2UtaW1wb3J0cyN1cGRhdGUtYW4taW1wb3J0XCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIG9pZGM6IHtcbiAgICBnZXRPaWRjQ3VzdG9tU3ViVGVtcGxhdGVGb3JPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvb2lkYy9jdXN0b21pemF0aW9uL3N1YlwiXG4gICAgXSxcbiAgICB1cGRhdGVPaWRjQ3VzdG9tU3ViVGVtcGxhdGVGb3JPcmc6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvb2lkYy9jdXN0b21pemF0aW9uL3N1YlwiXG4gICAgXVxuICB9LFxuICBvcmdzOiB7XG4gICAgYWRkU2VjdXJpdHlNYW5hZ2VyVGVhbTogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vc2VjdXJpdHktbWFuYWdlcnMvdGVhbXMve3RlYW1fc2x1Z31cIlxuICAgIF0sXG4gICAgYXNzaWduVGVhbVRvT3JnUm9sZTogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vb3JnYW5pemF0aW9uLXJvbGVzL3RlYW1zL3t0ZWFtX3NsdWd9L3tyb2xlX2lkfVwiXG4gICAgXSxcbiAgICBhc3NpZ25Vc2VyVG9PcmdSb2xlOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMvdXNlcnMve3VzZXJuYW1lfS97cm9sZV9pZH1cIlxuICAgIF0sXG4gICAgYmxvY2tVc2VyOiBbXCJQVVQgL29yZ3Mve29yZ30vYmxvY2tzL3t1c2VybmFtZX1cIl0sXG4gICAgY2FuY2VsSW52aXRhdGlvbjogW1wiREVMRVRFIC9vcmdzL3tvcmd9L2ludml0YXRpb25zL3tpbnZpdGF0aW9uX2lkfVwiXSxcbiAgICBjaGVja0Jsb2NrZWRVc2VyOiBbXCJHRVQgL29yZ3Mve29yZ30vYmxvY2tzL3t1c2VybmFtZX1cIl0sXG4gICAgY2hlY2tNZW1iZXJzaGlwRm9yVXNlcjogW1wiR0VUIC9vcmdzL3tvcmd9L21lbWJlcnMve3VzZXJuYW1lfVwiXSxcbiAgICBjaGVja1B1YmxpY01lbWJlcnNoaXBGb3JVc2VyOiBbXCJHRVQgL29yZ3Mve29yZ30vcHVibGljX21lbWJlcnMve3VzZXJuYW1lfVwiXSxcbiAgICBjb252ZXJ0TWVtYmVyVG9PdXRzaWRlQ29sbGFib3JhdG9yOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9vdXRzaWRlX2NvbGxhYm9yYXRvcnMve3VzZXJuYW1lfVwiXG4gICAgXSxcbiAgICBjcmVhdGVDdXN0b21Pcmdhbml6YXRpb25Sb2xlOiBbXCJQT1NUIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlc1wiXSxcbiAgICBjcmVhdGVJbnZpdGF0aW9uOiBbXCJQT1NUIC9vcmdzL3tvcmd9L2ludml0YXRpb25zXCJdLFxuICAgIGNyZWF0ZU9yVXBkYXRlQ3VzdG9tUHJvcGVydGllczogW1wiUEFUQ0ggL29yZ3Mve29yZ30vcHJvcGVydGllcy9zY2hlbWFcIl0sXG4gICAgY3JlYXRlT3JVcGRhdGVDdXN0b21Qcm9wZXJ0aWVzVmFsdWVzRm9yUmVwb3M6IFtcbiAgICAgIFwiUEFUQ0ggL29yZ3Mve29yZ30vcHJvcGVydGllcy92YWx1ZXNcIlxuICAgIF0sXG4gICAgY3JlYXRlT3JVcGRhdGVDdXN0b21Qcm9wZXJ0eTogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vcHJvcGVydGllcy9zY2hlbWEve2N1c3RvbV9wcm9wZXJ0eV9uYW1lfVwiXG4gICAgXSxcbiAgICBjcmVhdGVXZWJob29rOiBbXCJQT1NUIC9vcmdzL3tvcmd9L2hvb2tzXCJdLFxuICAgIGRlbGV0ZTogW1wiREVMRVRFIC9vcmdzL3tvcmd9XCJdLFxuICAgIGRlbGV0ZUN1c3RvbU9yZ2FuaXphdGlvblJvbGU6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlcy97cm9sZV9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlV2ViaG9vazogW1wiREVMRVRFIC9vcmdzL3tvcmd9L2hvb2tzL3tob29rX2lkfVwiXSxcbiAgICBlbmFibGVPckRpc2FibGVTZWN1cml0eVByb2R1Y3RPbkFsbE9yZ1JlcG9zOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30ve3NlY3VyaXR5X3Byb2R1Y3R9L3tlbmFibGVtZW50fVwiXG4gICAgXSxcbiAgICBnZXQ6IFtcIkdFVCAvb3Jncy97b3JnfVwiXSxcbiAgICBnZXRBbGxDdXN0b21Qcm9wZXJ0aWVzOiBbXCJHRVQgL29yZ3Mve29yZ30vcHJvcGVydGllcy9zY2hlbWFcIl0sXG4gICAgZ2V0Q3VzdG9tUHJvcGVydHk6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3Byb3BlcnRpZXMvc2NoZW1hL3tjdXN0b21fcHJvcGVydHlfbmFtZX1cIlxuICAgIF0sXG4gICAgZ2V0TWVtYmVyc2hpcEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvbWVtYmVyc2hpcHMvb3Jncy97b3JnfVwiXSxcbiAgICBnZXRNZW1iZXJzaGlwRm9yVXNlcjogW1wiR0VUIC9vcmdzL3tvcmd9L21lbWJlcnNoaXBzL3t1c2VybmFtZX1cIl0sXG4gICAgZ2V0T3JnUm9sZTogW1wiR0VUIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlcy97cm9sZV9pZH1cIl0sXG4gICAgZ2V0V2ViaG9vazogW1wiR0VUIC9vcmdzL3tvcmd9L2hvb2tzL3tob29rX2lkfVwiXSxcbiAgICBnZXRXZWJob29rQ29uZmlnRm9yT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vaG9va3Mve2hvb2tfaWR9L2NvbmZpZ1wiXSxcbiAgICBnZXRXZWJob29rRGVsaXZlcnk6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2hvb2tzL3tob29rX2lkfS9kZWxpdmVyaWVzL3tkZWxpdmVyeV9pZH1cIlxuICAgIF0sXG4gICAgbGlzdDogW1wiR0VUIC9vcmdhbml6YXRpb25zXCJdLFxuICAgIGxpc3RBcHBJbnN0YWxsYXRpb25zOiBbXCJHRVQgL29yZ3Mve29yZ30vaW5zdGFsbGF0aW9uc1wiXSxcbiAgICBsaXN0QmxvY2tlZFVzZXJzOiBbXCJHRVQgL29yZ3Mve29yZ30vYmxvY2tzXCJdLFxuICAgIGxpc3RDdXN0b21Qcm9wZXJ0aWVzVmFsdWVzRm9yUmVwb3M6IFtcIkdFVCAvb3Jncy97b3JnfS9wcm9wZXJ0aWVzL3ZhbHVlc1wiXSxcbiAgICBsaXN0RmFpbGVkSW52aXRhdGlvbnM6IFtcIkdFVCAvb3Jncy97b3JnfS9mYWlsZWRfaW52aXRhdGlvbnNcIl0sXG4gICAgbGlzdEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvb3Jnc1wiXSxcbiAgICBsaXN0Rm9yVXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L29yZ3NcIl0sXG4gICAgbGlzdEludml0YXRpb25UZWFtczogW1wiR0VUIC9vcmdzL3tvcmd9L2ludml0YXRpb25zL3tpbnZpdGF0aW9uX2lkfS90ZWFtc1wiXSxcbiAgICBsaXN0TWVtYmVyczogW1wiR0VUIC9vcmdzL3tvcmd9L21lbWJlcnNcIl0sXG4gICAgbGlzdE1lbWJlcnNoaXBzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9tZW1iZXJzaGlwcy9vcmdzXCJdLFxuICAgIGxpc3RPcmdSb2xlVGVhbXM6IFtcIkdFVCAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMve3JvbGVfaWR9L3RlYW1zXCJdLFxuICAgIGxpc3RPcmdSb2xlVXNlcnM6IFtcIkdFVCAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMve3JvbGVfaWR9L3VzZXJzXCJdLFxuICAgIGxpc3RPcmdSb2xlczogW1wiR0VUIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlc1wiXSxcbiAgICBsaXN0T3JnYW5pemF0aW9uRmluZUdyYWluZWRQZXJtaXNzaW9uczogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vb3JnYW5pemF0aW9uLWZpbmUtZ3JhaW5lZC1wZXJtaXNzaW9uc1wiXG4gICAgXSxcbiAgICBsaXN0T3V0c2lkZUNvbGxhYm9yYXRvcnM6IFtcIkdFVCAvb3Jncy97b3JnfS9vdXRzaWRlX2NvbGxhYm9yYXRvcnNcIl0sXG4gICAgbGlzdFBhdEdyYW50UmVwb3NpdG9yaWVzOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW5zL3twYXRfaWR9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBsaXN0UGF0R3JhbnRSZXF1ZXN0UmVwb3NpdG9yaWVzOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW4tcmVxdWVzdHMve3BhdF9yZXF1ZXN0X2lkfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgbGlzdFBhdEdyYW50UmVxdWVzdHM6IFtcIkdFVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW4tcmVxdWVzdHNcIl0sXG4gICAgbGlzdFBhdEdyYW50czogW1wiR0VUIC9vcmdzL3tvcmd9L3BlcnNvbmFsLWFjY2Vzcy10b2tlbnNcIl0sXG4gICAgbGlzdFBlbmRpbmdJbnZpdGF0aW9uczogW1wiR0VUIC9vcmdzL3tvcmd9L2ludml0YXRpb25zXCJdLFxuICAgIGxpc3RQdWJsaWNNZW1iZXJzOiBbXCJHRVQgL29yZ3Mve29yZ30vcHVibGljX21lbWJlcnNcIl0sXG4gICAgbGlzdFNlY3VyaXR5TWFuYWdlclRlYW1zOiBbXCJHRVQgL29yZ3Mve29yZ30vc2VjdXJpdHktbWFuYWdlcnNcIl0sXG4gICAgbGlzdFdlYmhvb2tEZWxpdmVyaWVzOiBbXCJHRVQgL29yZ3Mve29yZ30vaG9va3Mve2hvb2tfaWR9L2RlbGl2ZXJpZXNcIl0sXG4gICAgbGlzdFdlYmhvb2tzOiBbXCJHRVQgL29yZ3Mve29yZ30vaG9va3NcIl0sXG4gICAgcGF0Y2hDdXN0b21Pcmdhbml6YXRpb25Sb2xlOiBbXG4gICAgICBcIlBBVENIIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlcy97cm9sZV9pZH1cIlxuICAgIF0sXG4gICAgcGluZ1dlYmhvb2s6IFtcIlBPU1QgL29yZ3Mve29yZ30vaG9va3Mve2hvb2tfaWR9L3BpbmdzXCJdLFxuICAgIHJlZGVsaXZlcldlYmhvb2tEZWxpdmVyeTogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L2hvb2tzL3tob29rX2lkfS9kZWxpdmVyaWVzL3tkZWxpdmVyeV9pZH0vYXR0ZW1wdHNcIlxuICAgIF0sXG4gICAgcmVtb3ZlQ3VzdG9tUHJvcGVydHk6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L3Byb3BlcnRpZXMvc2NoZW1hL3tjdXN0b21fcHJvcGVydHlfbmFtZX1cIlxuICAgIF0sXG4gICAgcmVtb3ZlTWVtYmVyOiBbXCJERUxFVEUgL29yZ3Mve29yZ30vbWVtYmVycy97dXNlcm5hbWV9XCJdLFxuICAgIHJlbW92ZU1lbWJlcnNoaXBGb3JVc2VyOiBbXCJERUxFVEUgL29yZ3Mve29yZ30vbWVtYmVyc2hpcHMve3VzZXJuYW1lfVwiXSxcbiAgICByZW1vdmVPdXRzaWRlQ29sbGFib3JhdG9yOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9vdXRzaWRlX2NvbGxhYm9yYXRvcnMve3VzZXJuYW1lfVwiXG4gICAgXSxcbiAgICByZW1vdmVQdWJsaWNNZW1iZXJzaGlwRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L3B1YmxpY19tZW1iZXJzL3t1c2VybmFtZX1cIlxuICAgIF0sXG4gICAgcmVtb3ZlU2VjdXJpdHlNYW5hZ2VyVGVhbTogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vc2VjdXJpdHktbWFuYWdlcnMvdGVhbXMve3RlYW1fc2x1Z31cIlxuICAgIF0sXG4gICAgcmV2aWV3UGF0R3JhbnRSZXF1ZXN0OiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vcGVyc29uYWwtYWNjZXNzLXRva2VuLXJlcXVlc3RzL3twYXRfcmVxdWVzdF9pZH1cIlxuICAgIF0sXG4gICAgcmV2aWV3UGF0R3JhbnRSZXF1ZXN0c0luQnVsazogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L3BlcnNvbmFsLWFjY2Vzcy10b2tlbi1yZXF1ZXN0c1wiXG4gICAgXSxcbiAgICByZXZva2VBbGxPcmdSb2xlc1RlYW06IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlcy90ZWFtcy97dGVhbV9zbHVnfVwiXG4gICAgXSxcbiAgICByZXZva2VBbGxPcmdSb2xlc1VzZXI6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlcy91c2Vycy97dXNlcm5hbWV9XCJcbiAgICBdLFxuICAgIHJldm9rZU9yZ1JvbGVUZWFtOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMvdGVhbXMve3RlYW1fc2x1Z30ve3JvbGVfaWR9XCJcbiAgICBdLFxuICAgIHJldm9rZU9yZ1JvbGVVc2VyOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMvdXNlcnMve3VzZXJuYW1lfS97cm9sZV9pZH1cIlxuICAgIF0sXG4gICAgc2V0TWVtYmVyc2hpcEZvclVzZXI6IFtcIlBVVCAvb3Jncy97b3JnfS9tZW1iZXJzaGlwcy97dXNlcm5hbWV9XCJdLFxuICAgIHNldFB1YmxpY01lbWJlcnNoaXBGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vcHVibGljX21lbWJlcnMve3VzZXJuYW1lfVwiXG4gICAgXSxcbiAgICB1bmJsb2NrVXNlcjogW1wiREVMRVRFIC9vcmdzL3tvcmd9L2Jsb2Nrcy97dXNlcm5hbWV9XCJdLFxuICAgIHVwZGF0ZTogW1wiUEFUQ0ggL29yZ3Mve29yZ31cIl0sXG4gICAgdXBkYXRlTWVtYmVyc2hpcEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBBVENIIC91c2VyL21lbWJlcnNoaXBzL29yZ3Mve29yZ31cIlxuICAgIF0sXG4gICAgdXBkYXRlUGF0QWNjZXNzOiBbXCJQT1NUIC9vcmdzL3tvcmd9L3BlcnNvbmFsLWFjY2Vzcy10b2tlbnMve3BhdF9pZH1cIl0sXG4gICAgdXBkYXRlUGF0QWNjZXNzZXM6IFtcIlBPU1QgL29yZ3Mve29yZ30vcGVyc29uYWwtYWNjZXNzLXRva2Vuc1wiXSxcbiAgICB1cGRhdGVXZWJob29rOiBbXCJQQVRDSCAvb3Jncy97b3JnfS9ob29rcy97aG9va19pZH1cIl0sXG4gICAgdXBkYXRlV2ViaG9va0NvbmZpZ0Zvck9yZzogW1wiUEFUQ0ggL29yZ3Mve29yZ30vaG9va3Mve2hvb2tfaWR9L2NvbmZpZ1wiXVxuICB9LFxuICBwYWNrYWdlczoge1xuICAgIGRlbGV0ZVBhY2thZ2VGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX1cIlxuICAgIF0sXG4gICAgZGVsZXRlUGFja2FnZUZvck9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX1cIlxuICAgIF0sXG4gICAgZGVsZXRlUGFja2FnZUZvclVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2Vycy97dXNlcm5hbWV9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVBhY2thZ2VWZXJzaW9uRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zL3twYWNrYWdlX3ZlcnNpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVBhY2thZ2VWZXJzaW9uRm9yT3JnOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9ucy97cGFja2FnZV92ZXJzaW9uX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVQYWNrYWdlVmVyc2lvbkZvclVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2Vycy97dXNlcm5hbWV9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zL3twYWNrYWdlX3ZlcnNpb25faWR9XCJcbiAgICBdLFxuICAgIGdldEFsbFBhY2thZ2VWZXJzaW9uc0ZvckFQYWNrYWdlT3duZWRCeUFuT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9uc1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInBhY2thZ2VzXCIsIFwiZ2V0QWxsUGFja2FnZVZlcnNpb25zRm9yUGFja2FnZU93bmVkQnlPcmdcIl0gfVxuICAgIF0sXG4gICAgZ2V0QWxsUGFja2FnZVZlcnNpb25zRm9yQVBhY2thZ2VPd25lZEJ5VGhlQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zXCIsXG4gICAgICB7fSxcbiAgICAgIHtcbiAgICAgICAgcmVuYW1lZDogW1xuICAgICAgICAgIFwicGFja2FnZXNcIixcbiAgICAgICAgICBcImdldEFsbFBhY2thZ2VWZXJzaW9uc0ZvclBhY2thZ2VPd25lZEJ5QXV0aGVudGljYXRlZFVzZXJcIlxuICAgICAgICBdXG4gICAgICB9XG4gICAgXSxcbiAgICBnZXRBbGxQYWNrYWdlVmVyc2lvbnNGb3JQYWNrYWdlT3duZWRCeUF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9uc1wiXG4gICAgXSxcbiAgICBnZXRBbGxQYWNrYWdlVmVyc2lvbnNGb3JQYWNrYWdlT3duZWRCeU9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnNcIlxuICAgIF0sXG4gICAgZ2V0QWxsUGFja2FnZVZlcnNpb25zRm9yUGFja2FnZU93bmVkQnlVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9uc1wiXG4gICAgXSxcbiAgICBnZXRQYWNrYWdlRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9XCJcbiAgICBdLFxuICAgIGdldFBhY2thZ2VGb3JPcmdhbml6YXRpb246IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9XCJcbiAgICBdLFxuICAgIGdldFBhY2thZ2VGb3JVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfVwiXG4gICAgXSxcbiAgICBnZXRQYWNrYWdlVmVyc2lvbkZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9ucy97cGFja2FnZV92ZXJzaW9uX2lkfVwiXG4gICAgXSxcbiAgICBnZXRQYWNrYWdlVmVyc2lvbkZvck9yZ2FuaXphdGlvbjogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnMve3BhY2thZ2VfdmVyc2lvbl9pZH1cIlxuICAgIF0sXG4gICAgZ2V0UGFja2FnZVZlcnNpb25Gb3JVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9ucy97cGFja2FnZV92ZXJzaW9uX2lkfVwiXG4gICAgXSxcbiAgICBsaXN0RG9ja2VyTWlncmF0aW9uQ29uZmxpY3RpbmdQYWNrYWdlc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9kb2NrZXIvY29uZmxpY3RzXCJcbiAgICBdLFxuICAgIGxpc3REb2NrZXJNaWdyYXRpb25Db25mbGljdGluZ1BhY2thZ2VzRm9yT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9kb2NrZXIvY29uZmxpY3RzXCJcbiAgICBdLFxuICAgIGxpc3REb2NrZXJNaWdyYXRpb25Db25mbGljdGluZ1BhY2thZ2VzRm9yVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZG9ja2VyL2NvbmZsaWN0c1wiXG4gICAgXSxcbiAgICBsaXN0UGFja2FnZXNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL3BhY2thZ2VzXCJdLFxuICAgIGxpc3RQYWNrYWdlc0Zvck9yZ2FuaXphdGlvbjogW1wiR0VUIC9vcmdzL3tvcmd9L3BhY2thZ2VzXCJdLFxuICAgIGxpc3RQYWNrYWdlc0ZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wYWNrYWdlc1wiXSxcbiAgICByZXN0b3JlUGFja2FnZUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBPU1QgL3VzZXIvcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vcmVzdG9yZXs/dG9rZW59XCJcbiAgICBdLFxuICAgIHJlc3RvcmVQYWNrYWdlRm9yT3JnOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vcmVzdG9yZXs/dG9rZW59XCJcbiAgICBdLFxuICAgIHJlc3RvcmVQYWNrYWdlRm9yVXNlcjogW1xuICAgICAgXCJQT1NUIC91c2Vycy97dXNlcm5hbWV9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3Jlc3RvcmV7P3Rva2VufVwiXG4gICAgXSxcbiAgICByZXN0b3JlUGFja2FnZVZlcnNpb25Gb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQT1NUIC91c2VyL3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zL3twYWNrYWdlX3ZlcnNpb25faWR9L3Jlc3RvcmVcIlxuICAgIF0sXG4gICAgcmVzdG9yZVBhY2thZ2VWZXJzaW9uRm9yT3JnOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnMve3BhY2thZ2VfdmVyc2lvbl9pZH0vcmVzdG9yZVwiXG4gICAgXSxcbiAgICByZXN0b3JlUGFja2FnZVZlcnNpb25Gb3JVc2VyOiBbXG4gICAgICBcIlBPU1QgL3VzZXJzL3t1c2VybmFtZX0vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnMve3BhY2thZ2VfdmVyc2lvbl9pZH0vcmVzdG9yZVwiXG4gICAgXVxuICB9LFxuICBwcm9qZWN0czoge1xuICAgIGFkZENvbGxhYm9yYXRvcjogW1wiUFVUIC9wcm9qZWN0cy97cHJvamVjdF9pZH0vY29sbGFib3JhdG9ycy97dXNlcm5hbWV9XCJdLFxuICAgIGNyZWF0ZUNhcmQ6IFtcIlBPU1QgL3Byb2plY3RzL2NvbHVtbnMve2NvbHVtbl9pZH0vY2FyZHNcIl0sXG4gICAgY3JlYXRlQ29sdW1uOiBbXCJQT1NUIC9wcm9qZWN0cy97cHJvamVjdF9pZH0vY29sdW1uc1wiXSxcbiAgICBjcmVhdGVGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUE9TVCAvdXNlci9wcm9qZWN0c1wiXSxcbiAgICBjcmVhdGVGb3JPcmc6IFtcIlBPU1QgL29yZ3Mve29yZ30vcHJvamVjdHNcIl0sXG4gICAgY3JlYXRlRm9yUmVwbzogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHJvamVjdHNcIl0sXG4gICAgZGVsZXRlOiBbXCJERUxFVEUgL3Byb2plY3RzL3twcm9qZWN0X2lkfVwiXSxcbiAgICBkZWxldGVDYXJkOiBbXCJERUxFVEUgL3Byb2plY3RzL2NvbHVtbnMvY2FyZHMve2NhcmRfaWR9XCJdLFxuICAgIGRlbGV0ZUNvbHVtbjogW1wiREVMRVRFIC9wcm9qZWN0cy9jb2x1bW5zL3tjb2x1bW5faWR9XCJdLFxuICAgIGdldDogW1wiR0VUIC9wcm9qZWN0cy97cHJvamVjdF9pZH1cIl0sXG4gICAgZ2V0Q2FyZDogW1wiR0VUIC9wcm9qZWN0cy9jb2x1bW5zL2NhcmRzL3tjYXJkX2lkfVwiXSxcbiAgICBnZXRDb2x1bW46IFtcIkdFVCAvcHJvamVjdHMvY29sdW1ucy97Y29sdW1uX2lkfVwiXSxcbiAgICBnZXRQZXJtaXNzaW9uRm9yVXNlcjogW1xuICAgICAgXCJHRVQgL3Byb2plY3RzL3twcm9qZWN0X2lkfS9jb2xsYWJvcmF0b3JzL3t1c2VybmFtZX0vcGVybWlzc2lvblwiXG4gICAgXSxcbiAgICBsaXN0Q2FyZHM6IFtcIkdFVCAvcHJvamVjdHMvY29sdW1ucy97Y29sdW1uX2lkfS9jYXJkc1wiXSxcbiAgICBsaXN0Q29sbGFib3JhdG9yczogW1wiR0VUIC9wcm9qZWN0cy97cHJvamVjdF9pZH0vY29sbGFib3JhdG9yc1wiXSxcbiAgICBsaXN0Q29sdW1uczogW1wiR0VUIC9wcm9qZWN0cy97cHJvamVjdF9pZH0vY29sdW1uc1wiXSxcbiAgICBsaXN0Rm9yT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vcHJvamVjdHNcIl0sXG4gICAgbGlzdEZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHJvamVjdHNcIl0sXG4gICAgbGlzdEZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wcm9qZWN0c1wiXSxcbiAgICBtb3ZlQ2FyZDogW1wiUE9TVCAvcHJvamVjdHMvY29sdW1ucy9jYXJkcy97Y2FyZF9pZH0vbW92ZXNcIl0sXG4gICAgbW92ZUNvbHVtbjogW1wiUE9TVCAvcHJvamVjdHMvY29sdW1ucy97Y29sdW1uX2lkfS9tb3Zlc1wiXSxcbiAgICByZW1vdmVDb2xsYWJvcmF0b3I6IFtcbiAgICAgIFwiREVMRVRFIC9wcm9qZWN0cy97cHJvamVjdF9pZH0vY29sbGFib3JhdG9ycy97dXNlcm5hbWV9XCJcbiAgICBdLFxuICAgIHVwZGF0ZTogW1wiUEFUQ0ggL3Byb2plY3RzL3twcm9qZWN0X2lkfVwiXSxcbiAgICB1cGRhdGVDYXJkOiBbXCJQQVRDSCAvcHJvamVjdHMvY29sdW1ucy9jYXJkcy97Y2FyZF9pZH1cIl0sXG4gICAgdXBkYXRlQ29sdW1uOiBbXCJQQVRDSCAvcHJvamVjdHMvY29sdW1ucy97Y29sdW1uX2lkfVwiXVxuICB9LFxuICBwdWxsczoge1xuICAgIGNoZWNrSWZNZXJnZWQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9tZXJnZVwiXSxcbiAgICBjcmVhdGU6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzXCJdLFxuICAgIGNyZWF0ZVJlcGx5Rm9yUmV2aWV3Q29tbWVudDogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L2NvbW1lbnRzL3tjb21tZW50X2lkfS9yZXBsaWVzXCJcbiAgICBdLFxuICAgIGNyZWF0ZVJldmlldzogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9yZXZpZXdzXCJdLFxuICAgIGNyZWF0ZVJldmlld0NvbW1lbnQ6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9jb21tZW50c1wiXG4gICAgXSxcbiAgICBkZWxldGVQZW5kaW5nUmV2aWV3OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9yZXZpZXdzL3tyZXZpZXdfaWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVJldmlld0NvbW1lbnQ6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy9jb21tZW50cy97Y29tbWVudF9pZH1cIlxuICAgIF0sXG4gICAgZGlzbWlzc1JldmlldzogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vcmV2aWV3cy97cmV2aWV3X2lkfS9kaXNtaXNzYWxzXCJcbiAgICBdLFxuICAgIGdldDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9XCJdLFxuICAgIGdldFJldmlldzogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vcmV2aWV3cy97cmV2aWV3X2lkfVwiXG4gICAgXSxcbiAgICBnZXRSZXZpZXdDb21tZW50OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL2NvbW1lbnRzL3tjb21tZW50X2lkfVwiXSxcbiAgICBsaXN0OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzXCJdLFxuICAgIGxpc3RDb21tZW50c0ZvclJldmlldzogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vcmV2aWV3cy97cmV2aWV3X2lkfS9jb21tZW50c1wiXG4gICAgXSxcbiAgICBsaXN0Q29tbWl0czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L2NvbW1pdHNcIl0sXG4gICAgbGlzdEZpbGVzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vZmlsZXNcIl0sXG4gICAgbGlzdFJlcXVlc3RlZFJldmlld2VyczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vcmVxdWVzdGVkX3Jldmlld2Vyc1wiXG4gICAgXSxcbiAgICBsaXN0UmV2aWV3Q29tbWVudHM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L2NvbW1lbnRzXCJcbiAgICBdLFxuICAgIGxpc3RSZXZpZXdDb21tZW50c0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMvY29tbWVudHNcIl0sXG4gICAgbGlzdFJldmlld3M6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9yZXZpZXdzXCJdLFxuICAgIG1lcmdlOiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vbWVyZ2VcIl0sXG4gICAgcmVtb3ZlUmVxdWVzdGVkUmV2aWV3ZXJzOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9yZXF1ZXN0ZWRfcmV2aWV3ZXJzXCJcbiAgICBdLFxuICAgIHJlcXVlc3RSZXZpZXdlcnM6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9yZXF1ZXN0ZWRfcmV2aWV3ZXJzXCJcbiAgICBdLFxuICAgIHN1Ym1pdFJldmlldzogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3Jldmlld3Mve3Jldmlld19pZH0vZXZlbnRzXCJcbiAgICBdLFxuICAgIHVwZGF0ZTogW1wiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn1cIl0sXG4gICAgdXBkYXRlQnJhbmNoOiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS91cGRhdGUtYnJhbmNoXCJcbiAgICBdLFxuICAgIHVwZGF0ZVJldmlldzogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vcmV2aWV3cy97cmV2aWV3X2lkfVwiXG4gICAgXSxcbiAgICB1cGRhdGVSZXZpZXdDb21tZW50OiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy9jb21tZW50cy97Y29tbWVudF9pZH1cIlxuICAgIF1cbiAgfSxcbiAgcmF0ZUxpbWl0OiB7IGdldDogW1wiR0VUIC9yYXRlX2xpbWl0XCJdIH0sXG4gIHJlYWN0aW9uczoge1xuICAgIGNyZWF0ZUZvckNvbW1pdENvbW1lbnQ6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWVudHMve2NvbW1lbnRfaWR9L3JlYWN0aW9uc1wiXG4gICAgXSxcbiAgICBjcmVhdGVGb3JJc3N1ZTogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vcmVhY3Rpb25zXCJcbiAgICBdLFxuICAgIGNyZWF0ZUZvcklzc3VlQ29tbWVudDogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvY29tbWVudHMve2NvbW1lbnRfaWR9L3JlYWN0aW9uc1wiXG4gICAgXSxcbiAgICBjcmVhdGVGb3JQdWxsUmVxdWVzdFJldmlld0NvbW1lbnQ6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMvY29tbWVudHMve2NvbW1lbnRfaWR9L3JlYWN0aW9uc1wiXG4gICAgXSxcbiAgICBjcmVhdGVGb3JSZWxlYXNlOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL3tyZWxlYXNlX2lkfS9yZWFjdGlvbnNcIlxuICAgIF0sXG4gICAgY3JlYXRlRm9yVGVhbURpc2N1c3Npb25Db21tZW50SW5Pcmc6IFtcbiAgICAgIFwiUE9TVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L2NvbW1lbnRzL3tjb21tZW50X251bWJlcn0vcmVhY3Rpb25zXCJcbiAgICBdLFxuICAgIGNyZWF0ZUZvclRlYW1EaXNjdXNzaW9uSW5Pcmc6IFtcbiAgICAgIFwiUE9TVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L3JlYWN0aW9uc1wiXG4gICAgXSxcbiAgICBkZWxldGVGb3JDb21taXRDb21tZW50OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWVudHMve2NvbW1lbnRfaWR9L3JlYWN0aW9ucy97cmVhY3Rpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUZvcklzc3VlOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L3JlYWN0aW9ucy97cmVhY3Rpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUZvcklzc3VlQ29tbWVudDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy9jb21tZW50cy97Y29tbWVudF9pZH0vcmVhY3Rpb25zL3tyZWFjdGlvbl9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlRm9yUHVsbFJlcXVlc3RDb21tZW50OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMvY29tbWVudHMve2NvbW1lbnRfaWR9L3JlYWN0aW9ucy97cmVhY3Rpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUZvclJlbGVhc2U6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy97cmVsZWFzZV9pZH0vcmVhY3Rpb25zL3tyZWFjdGlvbl9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlRm9yVGVhbURpc2N1c3Npb246IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vcmVhY3Rpb25zL3tyZWFjdGlvbl9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlRm9yVGVhbURpc2N1c3Npb25Db21tZW50OiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L2NvbW1lbnRzL3tjb21tZW50X251bWJlcn0vcmVhY3Rpb25zL3tyZWFjdGlvbl9pZH1cIlxuICAgIF0sXG4gICAgbGlzdEZvckNvbW1pdENvbW1lbnQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21tZW50cy97Y29tbWVudF9pZH0vcmVhY3Rpb25zXCJcbiAgICBdLFxuICAgIGxpc3RGb3JJc3N1ZTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vcmVhY3Rpb25zXCJdLFxuICAgIGxpc3RGb3JJc3N1ZUNvbW1lbnQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvY29tbWVudHMve2NvbW1lbnRfaWR9L3JlYWN0aW9uc1wiXG4gICAgXSxcbiAgICBsaXN0Rm9yUHVsbFJlcXVlc3RSZXZpZXdDb21tZW50OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMvY29tbWVudHMve2NvbW1lbnRfaWR9L3JlYWN0aW9uc1wiXG4gICAgXSxcbiAgICBsaXN0Rm9yUmVsZWFzZTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL3tyZWxlYXNlX2lkfS9yZWFjdGlvbnNcIlxuICAgIF0sXG4gICAgbGlzdEZvclRlYW1EaXNjdXNzaW9uQ29tbWVudEluT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L2NvbW1lbnRzL3tjb21tZW50X251bWJlcn0vcmVhY3Rpb25zXCJcbiAgICBdLFxuICAgIGxpc3RGb3JUZWFtRGlzY3Vzc2lvbkluT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L3JlYWN0aW9uc1wiXG4gICAgXVxuICB9LFxuICByZXBvczoge1xuICAgIGFjY2VwdEludml0YXRpb246IFtcbiAgICAgIFwiUEFUQ0ggL3VzZXIvcmVwb3NpdG9yeV9pbnZpdGF0aW9ucy97aW52aXRhdGlvbl9pZH1cIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJyZXBvc1wiLCBcImFjY2VwdEludml0YXRpb25Gb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBhY2NlcHRJbnZpdGF0aW9uRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiUEFUQ0ggL3VzZXIvcmVwb3NpdG9yeV9pbnZpdGF0aW9ucy97aW52aXRhdGlvbl9pZH1cIlxuICAgIF0sXG4gICAgYWRkQXBwQWNjZXNzUmVzdHJpY3Rpb25zOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVzdHJpY3Rpb25zL2FwcHNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwiYXBwc1wiIH1cbiAgICBdLFxuICAgIGFkZENvbGxhYm9yYXRvcjogW1wiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2xsYWJvcmF0b3JzL3t1c2VybmFtZX1cIl0sXG4gICAgYWRkU3RhdHVzQ2hlY2tDb250ZXh0czogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3N0YXR1c19jaGVja3MvY29udGV4dHNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwiY29udGV4dHNcIiB9XG4gICAgXSxcbiAgICBhZGRUZWFtQWNjZXNzUmVzdHJpY3Rpb25zOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVzdHJpY3Rpb25zL3RlYW1zXCIsXG4gICAgICB7fSxcbiAgICAgIHsgbWFwVG9EYXRhOiBcInRlYW1zXCIgfVxuICAgIF0sXG4gICAgYWRkVXNlckFjY2Vzc1Jlc3RyaWN0aW9uczogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3Jlc3RyaWN0aW9ucy91c2Vyc1wiLFxuICAgICAge30sXG4gICAgICB7IG1hcFRvRGF0YTogXCJ1c2Vyc1wiIH1cbiAgICBdLFxuICAgIGNhbmNlbFBhZ2VzRGVwbG95bWVudDogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlcy9kZXBsb3ltZW50cy97cGFnZXNfZGVwbG95bWVudF9pZH0vY2FuY2VsXCJcbiAgICBdLFxuICAgIGNoZWNrQXV0b21hdGVkU2VjdXJpdHlGaXhlczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2F1dG9tYXRlZC1zZWN1cml0eS1maXhlc1wiXG4gICAgXSxcbiAgICBjaGVja0NvbGxhYm9yYXRvcjogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2xsYWJvcmF0b3JzL3t1c2VybmFtZX1cIl0sXG4gICAgY2hlY2tWdWxuZXJhYmlsaXR5QWxlcnRzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdnVsbmVyYWJpbGl0eS1hbGVydHNcIlxuICAgIF0sXG4gICAgY29kZW93bmVyc0Vycm9yczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlb3duZXJzL2Vycm9yc1wiXSxcbiAgICBjb21wYXJlQ29tbWl0czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21wYXJlL3tiYXNlfS4uLntoZWFkfVwiXSxcbiAgICBjb21wYXJlQ29tbWl0c1dpdGhCYXNlaGVhZDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbXBhcmUve2Jhc2VoZWFkfVwiXG4gICAgXSxcbiAgICBjcmVhdGVBdXRvbGluazogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYXV0b2xpbmtzXCJdLFxuICAgIGNyZWF0ZUNvbW1pdENvbW1lbnQ6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97Y29tbWl0X3NoYX0vY29tbWVudHNcIlxuICAgIF0sXG4gICAgY3JlYXRlQ29tbWl0U2lnbmF0dXJlUHJvdGVjdGlvbjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3NpZ25hdHVyZXNcIlxuICAgIF0sXG4gICAgY3JlYXRlQ29tbWl0U3RhdHVzOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zdGF0dXNlcy97c2hhfVwiXSxcbiAgICBjcmVhdGVEZXBsb3lLZXk6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2tleXNcIl0sXG4gICAgY3JlYXRlRGVwbG95bWVudDogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwbG95bWVudHNcIl0sXG4gICAgY3JlYXRlRGVwbG95bWVudEJyYW5jaFBvbGljeTogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L2RlcGxveW1lbnQtYnJhbmNoLXBvbGljaWVzXCJcbiAgICBdLFxuICAgIGNyZWF0ZURlcGxveW1lbnRQcm90ZWN0aW9uUnVsZTogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L2RlcGxveW1lbnRfcHJvdGVjdGlvbl9ydWxlc1wiXG4gICAgXSxcbiAgICBjcmVhdGVEZXBsb3ltZW50U3RhdHVzOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGxveW1lbnRzL3tkZXBsb3ltZW50X2lkfS9zdGF0dXNlc1wiXG4gICAgXSxcbiAgICBjcmVhdGVEaXNwYXRjaEV2ZW50OiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kaXNwYXRjaGVzXCJdLFxuICAgIGNyZWF0ZUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJQT1NUIC91c2VyL3JlcG9zXCJdLFxuICAgIGNyZWF0ZUZvcms6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2ZvcmtzXCJdLFxuICAgIGNyZWF0ZUluT3JnOiBbXCJQT1NUIC9vcmdzL3tvcmd9L3JlcG9zXCJdLFxuICAgIGNyZWF0ZU9yVXBkYXRlQ3VzdG9tUHJvcGVydGllc1ZhbHVlczogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vcHJvcGVydGllcy92YWx1ZXNcIlxuICAgIF0sXG4gICAgY3JlYXRlT3JVcGRhdGVFbnZpcm9ubWVudDogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX1cIlxuICAgIF0sXG4gICAgY3JlYXRlT3JVcGRhdGVGaWxlQ29udGVudHM6IFtcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29udGVudHMve3BhdGh9XCJdLFxuICAgIGNyZWF0ZU9yZ1J1bGVzZXQ6IFtcIlBPU1QgL29yZ3Mve29yZ30vcnVsZXNldHNcIl0sXG4gICAgY3JlYXRlUGFnZXNEZXBsb3ltZW50OiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlcy9kZXBsb3ltZW50c1wiXSxcbiAgICBjcmVhdGVQYWdlc1NpdGU6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzXCJdLFxuICAgIGNyZWF0ZVJlbGVhc2U6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzXCJdLFxuICAgIGNyZWF0ZVJlcG9SdWxlc2V0OiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ydWxlc2V0c1wiXSxcbiAgICBjcmVhdGVUYWdQcm90ZWN0aW9uOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS90YWdzL3Byb3RlY3Rpb25cIl0sXG4gICAgY3JlYXRlVXNpbmdUZW1wbGF0ZTogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97dGVtcGxhdGVfb3duZXJ9L3t0ZW1wbGF0ZV9yZXBvfS9nZW5lcmF0ZVwiXG4gICAgXSxcbiAgICBjcmVhdGVXZWJob29rOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ob29rc1wiXSxcbiAgICBkZWNsaW5lSW52aXRhdGlvbjogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvcmVwb3NpdG9yeV9pbnZpdGF0aW9ucy97aW52aXRhdGlvbl9pZH1cIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJyZXBvc1wiLCBcImRlY2xpbmVJbnZpdGF0aW9uRm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgZGVjbGluZUludml0YXRpb25Gb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvcmVwb3NpdG9yeV9pbnZpdGF0aW9ucy97aW52aXRhdGlvbl9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlOiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99XCJdLFxuICAgIGRlbGV0ZUFjY2Vzc1Jlc3RyaWN0aW9uczogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVzdHJpY3Rpb25zXCJcbiAgICBdLFxuICAgIGRlbGV0ZUFkbWluQnJhbmNoUHJvdGVjdGlvbjogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vZW5mb3JjZV9hZG1pbnNcIlxuICAgIF0sXG4gICAgZGVsZXRlQW5FbnZpcm9ubWVudDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX1cIlxuICAgIF0sXG4gICAgZGVsZXRlQXV0b2xpbms6IFtcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYXV0b2xpbmtzL3thdXRvbGlua19pZH1cIl0sXG4gICAgZGVsZXRlQnJhbmNoUHJvdGVjdGlvbjogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb25cIlxuICAgIF0sXG4gICAgZGVsZXRlQ29tbWl0Q29tbWVudDogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21tZW50cy97Y29tbWVudF9pZH1cIl0sXG4gICAgZGVsZXRlQ29tbWl0U2lnbmF0dXJlUHJvdGVjdGlvbjogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfc2lnbmF0dXJlc1wiXG4gICAgXSxcbiAgICBkZWxldGVEZXBsb3lLZXk6IFtcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30va2V5cy97a2V5X2lkfVwiXSxcbiAgICBkZWxldGVEZXBsb3ltZW50OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwbG95bWVudHMve2RlcGxveW1lbnRfaWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZURlcGxveW1lbnRCcmFuY2hQb2xpY3k6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L2RlcGxveW1lbnQtYnJhbmNoLXBvbGljaWVzL3ticmFuY2hfcG9saWN5X2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVGaWxlOiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbnRlbnRzL3twYXRofVwiXSxcbiAgICBkZWxldGVJbnZpdGF0aW9uOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vaW52aXRhdGlvbnMve2ludml0YXRpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZU9yZ1J1bGVzZXQ6IFtcIkRFTEVURSAvb3Jncy97b3JnfS9ydWxlc2V0cy97cnVsZXNldF9pZH1cIl0sXG4gICAgZGVsZXRlUGFnZXNTaXRlOiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzXCJdLFxuICAgIGRlbGV0ZVB1bGxSZXF1ZXN0UmV2aWV3UHJvdGVjdGlvbjogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfcHVsbF9yZXF1ZXN0X3Jldmlld3NcIlxuICAgIF0sXG4gICAgZGVsZXRlUmVsZWFzZTogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy97cmVsZWFzZV9pZH1cIl0sXG4gICAgZGVsZXRlUmVsZWFzZUFzc2V0OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMvYXNzZXRzL3thc3NldF9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlUmVwb1J1bGVzZXQ6IFtcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXNldHMve3J1bGVzZXRfaWR9XCJdLFxuICAgIGRlbGV0ZVRhZ1Byb3RlY3Rpb246IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS90YWdzL3Byb3RlY3Rpb24ve3RhZ19wcm90ZWN0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVXZWJob29rOiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfVwiXSxcbiAgICBkaXNhYmxlQXV0b21hdGVkU2VjdXJpdHlGaXhlczogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2F1dG9tYXRlZC1zZWN1cml0eS1maXhlc1wiXG4gICAgXSxcbiAgICBkaXNhYmxlRGVwbG95bWVudFByb3RlY3Rpb25SdWxlOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50X3Byb3RlY3Rpb25fcnVsZXMve3Byb3RlY3Rpb25fcnVsZV9pZH1cIlxuICAgIF0sXG4gICAgZGlzYWJsZVByaXZhdGVWdWxuZXJhYmlsaXR5UmVwb3J0aW5nOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vcHJpdmF0ZS12dWxuZXJhYmlsaXR5LXJlcG9ydGluZ1wiXG4gICAgXSxcbiAgICBkaXNhYmxlVnVsbmVyYWJpbGl0eUFsZXJ0czogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3Z1bG5lcmFiaWxpdHktYWxlcnRzXCJcbiAgICBdLFxuICAgIGRvd25sb2FkQXJjaGl2ZTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3ppcGJhbGwve3JlZn1cIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJyZXBvc1wiLCBcImRvd25sb2FkWmlwYmFsbEFyY2hpdmVcIl0gfVxuICAgIF0sXG4gICAgZG93bmxvYWRUYXJiYWxsQXJjaGl2ZTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS90YXJiYWxsL3tyZWZ9XCJdLFxuICAgIGRvd25sb2FkWmlwYmFsbEFyY2hpdmU6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vemlwYmFsbC97cmVmfVwiXSxcbiAgICBlbmFibGVBdXRvbWF0ZWRTZWN1cml0eUZpeGVzOiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYXV0b21hdGVkLXNlY3VyaXR5LWZpeGVzXCJcbiAgICBdLFxuICAgIGVuYWJsZVByaXZhdGVWdWxuZXJhYmlsaXR5UmVwb3J0aW5nOiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHJpdmF0ZS12dWxuZXJhYmlsaXR5LXJlcG9ydGluZ1wiXG4gICAgXSxcbiAgICBlbmFibGVWdWxuZXJhYmlsaXR5QWxlcnRzOiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vdnVsbmVyYWJpbGl0eS1hbGVydHNcIlxuICAgIF0sXG4gICAgZ2VuZXJhdGVSZWxlYXNlTm90ZXM6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMvZ2VuZXJhdGUtbm90ZXNcIlxuICAgIF0sXG4gICAgZ2V0OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99XCJdLFxuICAgIGdldEFjY2Vzc1Jlc3RyaWN0aW9uczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVzdHJpY3Rpb25zXCJcbiAgICBdLFxuICAgIGdldEFkbWluQnJhbmNoUHJvdGVjdGlvbjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vZW5mb3JjZV9hZG1pbnNcIlxuICAgIF0sXG4gICAgZ2V0QWxsRGVwbG95bWVudFByb3RlY3Rpb25SdWxlczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vZGVwbG95bWVudF9wcm90ZWN0aW9uX3J1bGVzXCJcbiAgICBdLFxuICAgIGdldEFsbEVudmlyb25tZW50czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHNcIl0sXG4gICAgZ2V0QWxsU3RhdHVzQ2hlY2tDb250ZXh0czogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfc3RhdHVzX2NoZWNrcy9jb250ZXh0c1wiXG4gICAgXSxcbiAgICBnZXRBbGxUb3BpY3M6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdG9waWNzXCJdLFxuICAgIGdldEFwcHNXaXRoQWNjZXNzVG9Qcm90ZWN0ZWRCcmFuY2g6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3Jlc3RyaWN0aW9ucy9hcHBzXCJcbiAgICBdLFxuICAgIGdldEF1dG9saW5rOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2F1dG9saW5rcy97YXV0b2xpbmtfaWR9XCJdLFxuICAgIGdldEJyYW5jaDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofVwiXSxcbiAgICBnZXRCcmFuY2hQcm90ZWN0aW9uOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvblwiXG4gICAgXSxcbiAgICBnZXRCcmFuY2hSdWxlczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ydWxlcy9icmFuY2hlcy97YnJhbmNofVwiXSxcbiAgICBnZXRDbG9uZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdHJhZmZpYy9jbG9uZXNcIl0sXG4gICAgZ2V0Q29kZUZyZXF1ZW5jeVN0YXRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N0YXRzL2NvZGVfZnJlcXVlbmN5XCJdLFxuICAgIGdldENvbGxhYm9yYXRvclBlcm1pc3Npb25MZXZlbDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbGxhYm9yYXRvcnMve3VzZXJuYW1lfS9wZXJtaXNzaW9uXCJcbiAgICBdLFxuICAgIGdldENvbWJpbmVkU3RhdHVzRm9yUmVmOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve3JlZn0vc3RhdHVzXCJdLFxuICAgIGdldENvbW1pdDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tyZWZ9XCJdLFxuICAgIGdldENvbW1pdEFjdGl2aXR5U3RhdHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3RhdHMvY29tbWl0X2FjdGl2aXR5XCJdLFxuICAgIGdldENvbW1pdENvbW1lbnQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWVudHMve2NvbW1lbnRfaWR9XCJdLFxuICAgIGdldENvbW1pdFNpZ25hdHVyZVByb3RlY3Rpb246IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3NpZ25hdHVyZXNcIlxuICAgIF0sXG4gICAgZ2V0Q29tbXVuaXR5UHJvZmlsZU1ldHJpY3M6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbXVuaXR5L3Byb2ZpbGVcIl0sXG4gICAgZ2V0Q29udGVudDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb250ZW50cy97cGF0aH1cIl0sXG4gICAgZ2V0Q29udHJpYnV0b3JzU3RhdHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3RhdHMvY29udHJpYnV0b3JzXCJdLFxuICAgIGdldEN1c3RvbURlcGxveW1lbnRQcm90ZWN0aW9uUnVsZTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vZGVwbG95bWVudF9wcm90ZWN0aW9uX3J1bGVzL3twcm90ZWN0aW9uX3J1bGVfaWR9XCJcbiAgICBdLFxuICAgIGdldEN1c3RvbVByb3BlcnRpZXNWYWx1ZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHJvcGVydGllcy92YWx1ZXNcIl0sXG4gICAgZ2V0RGVwbG95S2V5OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2tleXMve2tleV9pZH1cIl0sXG4gICAgZ2V0RGVwbG95bWVudDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBsb3ltZW50cy97ZGVwbG95bWVudF9pZH1cIl0sXG4gICAgZ2V0RGVwbG95bWVudEJyYW5jaFBvbGljeTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vZGVwbG95bWVudC1icmFuY2gtcG9saWNpZXMve2JyYW5jaF9wb2xpY3lfaWR9XCJcbiAgICBdLFxuICAgIGdldERlcGxveW1lbnRTdGF0dXM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBsb3ltZW50cy97ZGVwbG95bWVudF9pZH0vc3RhdHVzZXMve3N0YXR1c19pZH1cIlxuICAgIF0sXG4gICAgZ2V0RW52aXJvbm1lbnQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9XCJcbiAgICBdLFxuICAgIGdldExhdGVzdFBhZ2VzQnVpbGQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcGFnZXMvYnVpbGRzL2xhdGVzdFwiXSxcbiAgICBnZXRMYXRlc3RSZWxlYXNlOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL2xhdGVzdFwiXSxcbiAgICBnZXRPcmdSdWxlU3VpdGU6IFtcIkdFVCAvb3Jncy97b3JnfS9ydWxlc2V0cy9ydWxlLXN1aXRlcy97cnVsZV9zdWl0ZV9pZH1cIl0sXG4gICAgZ2V0T3JnUnVsZVN1aXRlczogW1wiR0VUIC9vcmdzL3tvcmd9L3J1bGVzZXRzL3J1bGUtc3VpdGVzXCJdLFxuICAgIGdldE9yZ1J1bGVzZXQ6IFtcIkdFVCAvb3Jncy97b3JnfS9ydWxlc2V0cy97cnVsZXNldF9pZH1cIl0sXG4gICAgZ2V0T3JnUnVsZXNldHM6IFtcIkdFVCAvb3Jncy97b3JnfS9ydWxlc2V0c1wiXSxcbiAgICBnZXRQYWdlczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlc1wiXSxcbiAgICBnZXRQYWdlc0J1aWxkOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzL2J1aWxkcy97YnVpbGRfaWR9XCJdLFxuICAgIGdldFBhZ2VzRGVwbG95bWVudDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzL2RlcGxveW1lbnRzL3twYWdlc19kZXBsb3ltZW50X2lkfVwiXG4gICAgXSxcbiAgICBnZXRQYWdlc0hlYWx0aENoZWNrOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzL2hlYWx0aFwiXSxcbiAgICBnZXRQYXJ0aWNpcGF0aW9uU3RhdHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3RhdHMvcGFydGljaXBhdGlvblwiXSxcbiAgICBnZXRQdWxsUmVxdWVzdFJldmlld1Byb3RlY3Rpb246IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3B1bGxfcmVxdWVzdF9yZXZpZXdzXCJcbiAgICBdLFxuICAgIGdldFB1bmNoQ2FyZFN0YXRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N0YXRzL3B1bmNoX2NhcmRcIl0sXG4gICAgZ2V0UmVhZG1lOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlYWRtZVwiXSxcbiAgICBnZXRSZWFkbWVJbkRpcmVjdG9yeTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWFkbWUve2Rpcn1cIl0sXG4gICAgZ2V0UmVsZWFzZTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy97cmVsZWFzZV9pZH1cIl0sXG4gICAgZ2V0UmVsZWFzZUFzc2V0OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL2Fzc2V0cy97YXNzZXRfaWR9XCJdLFxuICAgIGdldFJlbGVhc2VCeVRhZzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy90YWdzL3t0YWd9XCJdLFxuICAgIGdldFJlcG9SdWxlU3VpdGU6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ydWxlc2V0cy9ydWxlLXN1aXRlcy97cnVsZV9zdWl0ZV9pZH1cIlxuICAgIF0sXG4gICAgZ2V0UmVwb1J1bGVTdWl0ZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXNldHMvcnVsZS1zdWl0ZXNcIl0sXG4gICAgZ2V0UmVwb1J1bGVzZXQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXNldHMve3J1bGVzZXRfaWR9XCJdLFxuICAgIGdldFJlcG9SdWxlc2V0czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ydWxlc2V0c1wiXSxcbiAgICBnZXRTdGF0dXNDaGVja3NQcm90ZWN0aW9uOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXF1aXJlZF9zdGF0dXNfY2hlY2tzXCJcbiAgICBdLFxuICAgIGdldFRlYW1zV2l0aEFjY2Vzc1RvUHJvdGVjdGVkQnJhbmNoOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvdGVhbXNcIlxuICAgIF0sXG4gICAgZ2V0VG9wUGF0aHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdHJhZmZpYy9wb3B1bGFyL3BhdGhzXCJdLFxuICAgIGdldFRvcFJlZmVycmVyczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS90cmFmZmljL3BvcHVsYXIvcmVmZXJyZXJzXCJdLFxuICAgIGdldFVzZXJzV2l0aEFjY2Vzc1RvUHJvdGVjdGVkQnJhbmNoOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvdXNlcnNcIlxuICAgIF0sXG4gICAgZ2V0Vmlld3M6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdHJhZmZpYy92aWV3c1wiXSxcbiAgICBnZXRXZWJob29rOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfVwiXSxcbiAgICBnZXRXZWJob29rQ29uZmlnRm9yUmVwbzogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfS9jb25maWdcIlxuICAgIF0sXG4gICAgZ2V0V2ViaG9va0RlbGl2ZXJ5OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3Mve2hvb2tfaWR9L2RlbGl2ZXJpZXMve2RlbGl2ZXJ5X2lkfVwiXG4gICAgXSxcbiAgICBsaXN0QWN0aXZpdGllczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpdml0eVwiXSxcbiAgICBsaXN0QXV0b2xpbmtzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2F1dG9saW5rc1wiXSxcbiAgICBsaXN0QnJhbmNoZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXNcIl0sXG4gICAgbGlzdEJyYW5jaGVzRm9ySGVhZENvbW1pdDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve2NvbW1pdF9zaGF9L2JyYW5jaGVzLXdoZXJlLWhlYWRcIlxuICAgIF0sXG4gICAgbGlzdENvbGxhYm9yYXRvcnM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29sbGFib3JhdG9yc1wiXSxcbiAgICBsaXN0Q29tbWVudHNGb3JDb21taXQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tjb21taXRfc2hhfS9jb21tZW50c1wiXG4gICAgXSxcbiAgICBsaXN0Q29tbWl0Q29tbWVudHNGb3JSZXBvOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1lbnRzXCJdLFxuICAgIGxpc3RDb21taXRTdGF0dXNlc0ZvclJlZjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve3JlZn0vc3RhdHVzZXNcIlxuICAgIF0sXG4gICAgbGlzdENvbW1pdHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0c1wiXSxcbiAgICBsaXN0Q29udHJpYnV0b3JzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbnRyaWJ1dG9yc1wiXSxcbiAgICBsaXN0Q3VzdG9tRGVwbG95bWVudFJ1bGVJbnRlZ3JhdGlvbnM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L2RlcGxveW1lbnRfcHJvdGVjdGlvbl9ydWxlcy9hcHBzXCJcbiAgICBdLFxuICAgIGxpc3REZXBsb3lLZXlzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2tleXNcIl0sXG4gICAgbGlzdERlcGxveW1lbnRCcmFuY2hQb2xpY2llczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vZGVwbG95bWVudC1icmFuY2gtcG9saWNpZXNcIlxuICAgIF0sXG4gICAgbGlzdERlcGxveW1lbnRTdGF0dXNlczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGxveW1lbnRzL3tkZXBsb3ltZW50X2lkfS9zdGF0dXNlc1wiXG4gICAgXSxcbiAgICBsaXN0RGVwbG95bWVudHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwbG95bWVudHNcIl0sXG4gICAgbGlzdEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvcmVwb3NcIl0sXG4gICAgbGlzdEZvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L3JlcG9zXCJdLFxuICAgIGxpc3RGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcmVwb3NcIl0sXG4gICAgbGlzdEZvcmtzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2ZvcmtzXCJdLFxuICAgIGxpc3RJbnZpdGF0aW9uczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbnZpdGF0aW9uc1wiXSxcbiAgICBsaXN0SW52aXRhdGlvbnNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL3JlcG9zaXRvcnlfaW52aXRhdGlvbnNcIl0sXG4gICAgbGlzdExhbmd1YWdlczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9sYW5ndWFnZXNcIl0sXG4gICAgbGlzdFBhZ2VzQnVpbGRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzL2J1aWxkc1wiXSxcbiAgICBsaXN0UHVibGljOiBbXCJHRVQgL3JlcG9zaXRvcmllc1wiXSxcbiAgICBsaXN0UHVsbFJlcXVlc3RzQXNzb2NpYXRlZFdpdGhDb21taXQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tjb21taXRfc2hhfS9wdWxsc1wiXG4gICAgXSxcbiAgICBsaXN0UmVsZWFzZUFzc2V0czogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL3tyZWxlYXNlX2lkfS9hc3NldHNcIlxuICAgIF0sXG4gICAgbGlzdFJlbGVhc2VzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzXCJdLFxuICAgIGxpc3RUYWdQcm90ZWN0aW9uOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RhZ3MvcHJvdGVjdGlvblwiXSxcbiAgICBsaXN0VGFnczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS90YWdzXCJdLFxuICAgIGxpc3RUZWFtczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS90ZWFtc1wiXSxcbiAgICBsaXN0V2ViaG9va0RlbGl2ZXJpZXM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ob29rcy97aG9va19pZH0vZGVsaXZlcmllc1wiXG4gICAgXSxcbiAgICBsaXN0V2ViaG9va3M6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3NcIl0sXG4gICAgbWVyZ2U6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L21lcmdlc1wiXSxcbiAgICBtZXJnZVVwc3RyZWFtOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9tZXJnZS11cHN0cmVhbVwiXSxcbiAgICBwaW5nV2ViaG9vazogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3Mve2hvb2tfaWR9L3BpbmdzXCJdLFxuICAgIHJlZGVsaXZlcldlYmhvb2tEZWxpdmVyeTogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ob29rcy97aG9va19pZH0vZGVsaXZlcmllcy97ZGVsaXZlcnlfaWR9L2F0dGVtcHRzXCJcbiAgICBdLFxuICAgIHJlbW92ZUFwcEFjY2Vzc1Jlc3RyaWN0aW9uczogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVzdHJpY3Rpb25zL2FwcHNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwiYXBwc1wiIH1cbiAgICBdLFxuICAgIHJlbW92ZUNvbGxhYm9yYXRvcjogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbGxhYm9yYXRvcnMve3VzZXJuYW1lfVwiXG4gICAgXSxcbiAgICByZW1vdmVTdGF0dXNDaGVja0NvbnRleHRzOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXF1aXJlZF9zdGF0dXNfY2hlY2tzL2NvbnRleHRzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgbWFwVG9EYXRhOiBcImNvbnRleHRzXCIgfVxuICAgIF0sXG4gICAgcmVtb3ZlU3RhdHVzQ2hlY2tQcm90ZWN0aW9uOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXF1aXJlZF9zdGF0dXNfY2hlY2tzXCJcbiAgICBdLFxuICAgIHJlbW92ZVRlYW1BY2Nlc3NSZXN0cmljdGlvbnM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3Jlc3RyaWN0aW9ucy90ZWFtc1wiLFxuICAgICAge30sXG4gICAgICB7IG1hcFRvRGF0YTogXCJ0ZWFtc1wiIH1cbiAgICBdLFxuICAgIHJlbW92ZVVzZXJBY2Nlc3NSZXN0cmljdGlvbnM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3Jlc3RyaWN0aW9ucy91c2Vyc1wiLFxuICAgICAge30sXG4gICAgICB7IG1hcFRvRGF0YTogXCJ1c2Vyc1wiIH1cbiAgICBdLFxuICAgIHJlbmFtZUJyYW5jaDogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcmVuYW1lXCJdLFxuICAgIHJlcGxhY2VBbGxUb3BpY3M6IFtcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vdG9waWNzXCJdLFxuICAgIHJlcXVlc3RQYWdlc0J1aWxkOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlcy9idWlsZHNcIl0sXG4gICAgc2V0QWRtaW5CcmFuY2hQcm90ZWN0aW9uOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vZW5mb3JjZV9hZG1pbnNcIlxuICAgIF0sXG4gICAgc2V0QXBwQWNjZXNzUmVzdHJpY3Rpb25zOiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvYXBwc1wiLFxuICAgICAge30sXG4gICAgICB7IG1hcFRvRGF0YTogXCJhcHBzXCIgfVxuICAgIF0sXG4gICAgc2V0U3RhdHVzQ2hlY2tDb250ZXh0czogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfc3RhdHVzX2NoZWNrcy9jb250ZXh0c1wiLFxuICAgICAge30sXG4gICAgICB7IG1hcFRvRGF0YTogXCJjb250ZXh0c1wiIH1cbiAgICBdLFxuICAgIHNldFRlYW1BY2Nlc3NSZXN0cmljdGlvbnM6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3Jlc3RyaWN0aW9ucy90ZWFtc1wiLFxuICAgICAge30sXG4gICAgICB7IG1hcFRvRGF0YTogXCJ0ZWFtc1wiIH1cbiAgICBdLFxuICAgIHNldFVzZXJBY2Nlc3NSZXN0cmljdGlvbnM6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3Jlc3RyaWN0aW9ucy91c2Vyc1wiLFxuICAgICAge30sXG4gICAgICB7IG1hcFRvRGF0YTogXCJ1c2Vyc1wiIH1cbiAgICBdLFxuICAgIHRlc3RQdXNoV2ViaG9vazogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3Mve2hvb2tfaWR9L3Rlc3RzXCJdLFxuICAgIHRyYW5zZmVyOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS90cmFuc2ZlclwiXSxcbiAgICB1cGRhdGU6IFtcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfVwiXSxcbiAgICB1cGRhdGVCcmFuY2hQcm90ZWN0aW9uOiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvblwiXG4gICAgXSxcbiAgICB1cGRhdGVDb21taXRDb21tZW50OiBbXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWVudHMve2NvbW1lbnRfaWR9XCJdLFxuICAgIHVwZGF0ZURlcGxveW1lbnRCcmFuY2hQb2xpY3k6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L2RlcGxveW1lbnQtYnJhbmNoLXBvbGljaWVzL3ticmFuY2hfcG9saWN5X2lkfVwiXG4gICAgXSxcbiAgICB1cGRhdGVJbmZvcm1hdGlvbkFib3V0UGFnZXNTaXRlOiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzXCJdLFxuICAgIHVwZGF0ZUludml0YXRpb246IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2ludml0YXRpb25zL3tpbnZpdGF0aW9uX2lkfVwiXG4gICAgXSxcbiAgICB1cGRhdGVPcmdSdWxlc2V0OiBbXCJQVVQgL29yZ3Mve29yZ30vcnVsZXNldHMve3J1bGVzZXRfaWR9XCJdLFxuICAgIHVwZGF0ZVB1bGxSZXF1ZXN0UmV2aWV3UHJvdGVjdGlvbjogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXF1aXJlZF9wdWxsX3JlcXVlc3RfcmV2aWV3c1wiXG4gICAgXSxcbiAgICB1cGRhdGVSZWxlYXNlOiBbXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMve3JlbGVhc2VfaWR9XCJdLFxuICAgIHVwZGF0ZVJlbGVhc2VBc3NldDogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMvYXNzZXRzL3thc3NldF9pZH1cIlxuICAgIF0sXG4gICAgdXBkYXRlUmVwb1J1bGVzZXQ6IFtcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXNldHMve3J1bGVzZXRfaWR9XCJdLFxuICAgIHVwZGF0ZVN0YXR1c0NoZWNrUG90ZWN0aW9uOiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3N0YXR1c19jaGVja3NcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJyZXBvc1wiLCBcInVwZGF0ZVN0YXR1c0NoZWNrUHJvdGVjdGlvblwiXSB9XG4gICAgXSxcbiAgICB1cGRhdGVTdGF0dXNDaGVja1Byb3RlY3Rpb246IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfc3RhdHVzX2NoZWNrc1wiXG4gICAgXSxcbiAgICB1cGRhdGVXZWJob29rOiBbXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3Mve2hvb2tfaWR9XCJdLFxuICAgIHVwZGF0ZVdlYmhvb2tDb25maWdGb3JSZXBvOiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ob29rcy97aG9va19pZH0vY29uZmlnXCJcbiAgICBdLFxuICAgIHVwbG9hZFJlbGVhc2VBc3NldDogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy97cmVsZWFzZV9pZH0vYXNzZXRzez9uYW1lLGxhYmVsfVwiLFxuICAgICAgeyBiYXNlVXJsOiBcImh0dHBzOi8vdXBsb2Fkcy5naXRodWIuY29tXCIgfVxuICAgIF1cbiAgfSxcbiAgc2VhcmNoOiB7XG4gICAgY29kZTogW1wiR0VUIC9zZWFyY2gvY29kZVwiXSxcbiAgICBjb21taXRzOiBbXCJHRVQgL3NlYXJjaC9jb21taXRzXCJdLFxuICAgIGlzc3Vlc0FuZFB1bGxSZXF1ZXN0czogW1wiR0VUIC9zZWFyY2gvaXNzdWVzXCJdLFxuICAgIGxhYmVsczogW1wiR0VUIC9zZWFyY2gvbGFiZWxzXCJdLFxuICAgIHJlcG9zOiBbXCJHRVQgL3NlYXJjaC9yZXBvc2l0b3JpZXNcIl0sXG4gICAgdG9waWNzOiBbXCJHRVQgL3NlYXJjaC90b3BpY3NcIl0sXG4gICAgdXNlcnM6IFtcIkdFVCAvc2VhcmNoL3VzZXJzXCJdXG4gIH0sXG4gIHNlY3JldFNjYW5uaW5nOiB7XG4gICAgZ2V0QWxlcnQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWNyZXQtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9XCJcbiAgICBdLFxuICAgIGxpc3RBbGVydHNGb3JFbnRlcnByaXNlOiBbXG4gICAgICBcIkdFVCAvZW50ZXJwcmlzZXMve2VudGVycHJpc2V9L3NlY3JldC1zY2FubmluZy9hbGVydHNcIlxuICAgIF0sXG4gICAgbGlzdEFsZXJ0c0Zvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L3NlY3JldC1zY2FubmluZy9hbGVydHNcIl0sXG4gICAgbGlzdEFsZXJ0c0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjcmV0LXNjYW5uaW5nL2FsZXJ0c1wiXSxcbiAgICBsaXN0TG9jYXRpb25zRm9yQWxlcnQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWNyZXQtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9L2xvY2F0aW9uc1wiXG4gICAgXSxcbiAgICB1cGRhdGVBbGVydDogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjcmV0LXNjYW5uaW5nL2FsZXJ0cy97YWxlcnRfbnVtYmVyfVwiXG4gICAgXVxuICB9LFxuICBzZWN1cml0eUFkdmlzb3JpZXM6IHtcbiAgICBjcmVhdGVGb3JrOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3NlY3VyaXR5LWFkdmlzb3JpZXMve2doc2FfaWR9L2ZvcmtzXCJcbiAgICBdLFxuICAgIGNyZWF0ZVByaXZhdGVWdWxuZXJhYmlsaXR5UmVwb3J0OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3NlY3VyaXR5LWFkdmlzb3JpZXMvcmVwb3J0c1wiXG4gICAgXSxcbiAgICBjcmVhdGVSZXBvc2l0b3J5QWR2aXNvcnk6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjdXJpdHktYWR2aXNvcmllc1wiXG4gICAgXSxcbiAgICBjcmVhdGVSZXBvc2l0b3J5QWR2aXNvcnlDdmVSZXF1ZXN0OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3NlY3VyaXR5LWFkdmlzb3JpZXMve2doc2FfaWR9L2N2ZVwiXG4gICAgXSxcbiAgICBnZXRHbG9iYWxBZHZpc29yeTogW1wiR0VUIC9hZHZpc29yaWVzL3tnaHNhX2lkfVwiXSxcbiAgICBnZXRSZXBvc2l0b3J5QWR2aXNvcnk6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWN1cml0eS1hZHZpc29yaWVzL3tnaHNhX2lkfVwiXG4gICAgXSxcbiAgICBsaXN0R2xvYmFsQWR2aXNvcmllczogW1wiR0VUIC9hZHZpc29yaWVzXCJdLFxuICAgIGxpc3RPcmdSZXBvc2l0b3J5QWR2aXNvcmllczogW1wiR0VUIC9vcmdzL3tvcmd9L3NlY3VyaXR5LWFkdmlzb3JpZXNcIl0sXG4gICAgbGlzdFJlcG9zaXRvcnlBZHZpc29yaWVzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3NlY3VyaXR5LWFkdmlzb3JpZXNcIl0sXG4gICAgdXBkYXRlUmVwb3NpdG9yeUFkdmlzb3J5OiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWN1cml0eS1hZHZpc29yaWVzL3tnaHNhX2lkfVwiXG4gICAgXVxuICB9LFxuICB0ZWFtczoge1xuICAgIGFkZE9yVXBkYXRlTWVtYmVyc2hpcEZvclVzZXJJbk9yZzogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vbWVtYmVyc2hpcHMve3VzZXJuYW1lfVwiXG4gICAgXSxcbiAgICBhZGRPclVwZGF0ZVByb2plY3RQZXJtaXNzaW9uc0luT3JnOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9wcm9qZWN0cy97cHJvamVjdF9pZH1cIlxuICAgIF0sXG4gICAgYWRkT3JVcGRhdGVSZXBvUGVybWlzc2lvbnNJbk9yZzogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vcmVwb3Mve293bmVyfS97cmVwb31cIlxuICAgIF0sXG4gICAgY2hlY2tQZXJtaXNzaW9uc0ZvclByb2plY3RJbk9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vcHJvamVjdHMve3Byb2plY3RfaWR9XCJcbiAgICBdLFxuICAgIGNoZWNrUGVybWlzc2lvbnNGb3JSZXBvSW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L3JlcG9zL3tvd25lcn0ve3JlcG99XCJcbiAgICBdLFxuICAgIGNyZWF0ZTogW1wiUE9TVCAvb3Jncy97b3JnfS90ZWFtc1wiXSxcbiAgICBjcmVhdGVEaXNjdXNzaW9uQ29tbWVudEluT3JnOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9jb21tZW50c1wiXG4gICAgXSxcbiAgICBjcmVhdGVEaXNjdXNzaW9uSW5Pcmc6IFtcIlBPU1QgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnNcIl0sXG4gICAgZGVsZXRlRGlzY3Vzc2lvbkNvbW1lbnRJbk9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9jb21tZW50cy97Y29tbWVudF9udW1iZXJ9XCJcbiAgICBdLFxuICAgIGRlbGV0ZURpc2N1c3Npb25Jbk9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfVwiXG4gICAgXSxcbiAgICBkZWxldGVJbk9yZzogW1wiREVMRVRFIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9XCJdLFxuICAgIGdldEJ5TmFtZTogW1wiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9XCJdLFxuICAgIGdldERpc2N1c3Npb25Db21tZW50SW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vY29tbWVudHMve2NvbW1lbnRfbnVtYmVyfVwiXG4gICAgXSxcbiAgICBnZXREaXNjdXNzaW9uSW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn1cIlxuICAgIF0sXG4gICAgZ2V0TWVtYmVyc2hpcEZvclVzZXJJbk9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vbWVtYmVyc2hpcHMve3VzZXJuYW1lfVwiXG4gICAgXSxcbiAgICBsaXN0OiBbXCJHRVQgL29yZ3Mve29yZ30vdGVhbXNcIl0sXG4gICAgbGlzdENoaWxkSW5Pcmc6IFtcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS90ZWFtc1wiXSxcbiAgICBsaXN0RGlzY3Vzc2lvbkNvbW1lbnRzSW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vY29tbWVudHNcIlxuICAgIF0sXG4gICAgbGlzdERpc2N1c3Npb25zSW5Pcmc6IFtcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9uc1wiXSxcbiAgICBsaXN0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci90ZWFtc1wiXSxcbiAgICBsaXN0TWVtYmVyc0luT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vbWVtYmVyc1wiXSxcbiAgICBsaXN0UGVuZGluZ0ludml0YXRpb25zSW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2ludml0YXRpb25zXCJcbiAgICBdLFxuICAgIGxpc3RQcm9qZWN0c0luT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vcHJvamVjdHNcIl0sXG4gICAgbGlzdFJlcG9zSW5Pcmc6IFtcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9yZXBvc1wiXSxcbiAgICByZW1vdmVNZW1iZXJzaGlwRm9yVXNlckluT3JnOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9tZW1iZXJzaGlwcy97dXNlcm5hbWV9XCJcbiAgICBdLFxuICAgIHJlbW92ZVByb2plY3RJbk9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vcHJvamVjdHMve3Byb2plY3RfaWR9XCJcbiAgICBdLFxuICAgIHJlbW92ZVJlcG9Jbk9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vcmVwb3Mve293bmVyfS97cmVwb31cIlxuICAgIF0sXG4gICAgdXBkYXRlRGlzY3Vzc2lvbkNvbW1lbnRJbk9yZzogW1xuICAgICAgXCJQQVRDSCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L2NvbW1lbnRzL3tjb21tZW50X251bWJlcn1cIlxuICAgIF0sXG4gICAgdXBkYXRlRGlzY3Vzc2lvbkluT3JnOiBbXG4gICAgICBcIlBBVENIIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn1cIlxuICAgIF0sXG4gICAgdXBkYXRlSW5Pcmc6IFtcIlBBVENIIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9XCJdXG4gIH0sXG4gIHVzZXJzOiB7XG4gICAgYWRkRW1haWxGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIlBPU1QgL3VzZXIvZW1haWxzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJhZGRFbWFpbEZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGFkZEVtYWlsRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBPU1QgL3VzZXIvZW1haWxzXCJdLFxuICAgIGFkZFNvY2lhbEFjY291bnRGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUE9TVCAvdXNlci9zb2NpYWxfYWNjb3VudHNcIl0sXG4gICAgYmxvY2s6IFtcIlBVVCAvdXNlci9ibG9ja3Mve3VzZXJuYW1lfVwiXSxcbiAgICBjaGVja0Jsb2NrZWQ6IFtcIkdFVCAvdXNlci9ibG9ja3Mve3VzZXJuYW1lfVwiXSxcbiAgICBjaGVja0ZvbGxvd2luZ0ZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9mb2xsb3dpbmcve3RhcmdldF91c2VyfVwiXSxcbiAgICBjaGVja1BlcnNvbklzRm9sbG93ZWRCeUF1dGhlbnRpY2F0ZWQ6IFtcIkdFVCAvdXNlci9mb2xsb3dpbmcve3VzZXJuYW1lfVwiXSxcbiAgICBjcmVhdGVHcGdLZXlGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIlBPU1QgL3VzZXIvZ3BnX2tleXNcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJ1c2Vyc1wiLCBcImNyZWF0ZUdwZ0tleUZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGNyZWF0ZUdwZ0tleUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJQT1NUIC91c2VyL2dwZ19rZXlzXCJdLFxuICAgIGNyZWF0ZVB1YmxpY1NzaEtleUZvckF1dGhlbnRpY2F0ZWQ6IFtcbiAgICAgIFwiUE9TVCAvdXNlci9rZXlzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJjcmVhdGVQdWJsaWNTc2hLZXlGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBjcmVhdGVQdWJsaWNTc2hLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUE9TVCAvdXNlci9rZXlzXCJdLFxuICAgIGNyZWF0ZVNzaFNpZ25pbmdLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUE9TVCAvdXNlci9zc2hfc2lnbmluZ19rZXlzXCJdLFxuICAgIGRlbGV0ZUVtYWlsRm9yQXV0aGVudGljYXRlZDogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvZW1haWxzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJkZWxldGVFbWFpbEZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGRlbGV0ZUVtYWlsRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkRFTEVURSAvdXNlci9lbWFpbHNcIl0sXG4gICAgZGVsZXRlR3BnS2V5Rm9yQXV0aGVudGljYXRlZDogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvZ3BnX2tleXMve2dwZ19rZXlfaWR9XCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJkZWxldGVHcGdLZXlGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBkZWxldGVHcGdLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiREVMRVRFIC91c2VyL2dwZ19rZXlzL3tncGdfa2V5X2lkfVwiXSxcbiAgICBkZWxldGVQdWJsaWNTc2hLZXlGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIkRFTEVURSAvdXNlci9rZXlzL3trZXlfaWR9XCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJkZWxldGVQdWJsaWNTc2hLZXlGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBkZWxldGVQdWJsaWNTc2hLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiREVMRVRFIC91c2VyL2tleXMve2tleV9pZH1cIl0sXG4gICAgZGVsZXRlU29jaWFsQWNjb3VudEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJERUxFVEUgL3VzZXIvc29jaWFsX2FjY291bnRzXCJdLFxuICAgIGRlbGV0ZVNzaFNpZ25pbmdLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvc3NoX3NpZ25pbmdfa2V5cy97c3NoX3NpZ25pbmdfa2V5X2lkfVwiXG4gICAgXSxcbiAgICBmb2xsb3c6IFtcIlBVVCAvdXNlci9mb2xsb3dpbmcve3VzZXJuYW1lfVwiXSxcbiAgICBnZXRBdXRoZW50aWNhdGVkOiBbXCJHRVQgL3VzZXJcIl0sXG4gICAgZ2V0QnlVc2VybmFtZTogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9XCJdLFxuICAgIGdldENvbnRleHRGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vaG92ZXJjYXJkXCJdLFxuICAgIGdldEdwZ0tleUZvckF1dGhlbnRpY2F0ZWQ6IFtcbiAgICAgIFwiR0VUIC91c2VyL2dwZ19rZXlzL3tncGdfa2V5X2lkfVwiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwiZ2V0R3BnS2V5Rm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgZ2V0R3BnS2V5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9ncGdfa2V5cy97Z3BnX2tleV9pZH1cIl0sXG4gICAgZ2V0UHVibGljU3NoS2V5Rm9yQXV0aGVudGljYXRlZDogW1xuICAgICAgXCJHRVQgL3VzZXIva2V5cy97a2V5X2lkfVwiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwiZ2V0UHVibGljU3NoS2V5Rm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgZ2V0UHVibGljU3NoS2V5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9rZXlzL3trZXlfaWR9XCJdLFxuICAgIGdldFNzaFNpZ25pbmdLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXIvc3NoX3NpZ25pbmdfa2V5cy97c3NoX3NpZ25pbmdfa2V5X2lkfVwiXG4gICAgXSxcbiAgICBsaXN0OiBbXCJHRVQgL3VzZXJzXCJdLFxuICAgIGxpc3RCbG9ja2VkQnlBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIkdFVCAvdXNlci9ibG9ja3NcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJ1c2Vyc1wiLCBcImxpc3RCbG9ja2VkQnlBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBsaXN0QmxvY2tlZEJ5QXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9ibG9ja3NcIl0sXG4gICAgbGlzdEVtYWlsc0ZvckF1dGhlbnRpY2F0ZWQ6IFtcbiAgICAgIFwiR0VUIC91c2VyL2VtYWlsc1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwibGlzdEVtYWlsc0ZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGxpc3RFbWFpbHNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL2VtYWlsc1wiXSxcbiAgICBsaXN0Rm9sbG93ZWRCeUF1dGhlbnRpY2F0ZWQ6IFtcbiAgICAgIFwiR0VUIC91c2VyL2ZvbGxvd2luZ1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwibGlzdEZvbGxvd2VkQnlBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBsaXN0Rm9sbG93ZWRCeUF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvZm9sbG93aW5nXCJdLFxuICAgIGxpc3RGb2xsb3dlcnNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL2ZvbGxvd2Vyc1wiXSxcbiAgICBsaXN0Rm9sbG93ZXJzRm9yVXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L2ZvbGxvd2Vyc1wiXSxcbiAgICBsaXN0Rm9sbG93aW5nRm9yVXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L2ZvbGxvd2luZ1wiXSxcbiAgICBsaXN0R3BnS2V5c0ZvckF1dGhlbnRpY2F0ZWQ6IFtcbiAgICAgIFwiR0VUIC91c2VyL2dwZ19rZXlzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJsaXN0R3BnS2V5c0ZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGxpc3RHcGdLZXlzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9ncGdfa2V5c1wiXSxcbiAgICBsaXN0R3BnS2V5c0ZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9ncGdfa2V5c1wiXSxcbiAgICBsaXN0UHVibGljRW1haWxzRm9yQXV0aGVudGljYXRlZDogW1xuICAgICAgXCJHRVQgL3VzZXIvcHVibGljX2VtYWlsc1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwibGlzdFB1YmxpY0VtYWlsc0ZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGxpc3RQdWJsaWNFbWFpbHNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL3B1YmxpY19lbWFpbHNcIl0sXG4gICAgbGlzdFB1YmxpY0tleXNGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0va2V5c1wiXSxcbiAgICBsaXN0UHVibGljU3NoS2V5c0ZvckF1dGhlbnRpY2F0ZWQ6IFtcbiAgICAgIFwiR0VUIC91c2VyL2tleXNcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJ1c2Vyc1wiLCBcImxpc3RQdWJsaWNTc2hLZXlzRm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgbGlzdFB1YmxpY1NzaEtleXNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL2tleXNcIl0sXG4gICAgbGlzdFNvY2lhbEFjY291bnRzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9zb2NpYWxfYWNjb3VudHNcIl0sXG4gICAgbGlzdFNvY2lhbEFjY291bnRzRm9yVXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L3NvY2lhbF9hY2NvdW50c1wiXSxcbiAgICBsaXN0U3NoU2lnbmluZ0tleXNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL3NzaF9zaWduaW5nX2tleXNcIl0sXG4gICAgbGlzdFNzaFNpZ25pbmdLZXlzRm9yVXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L3NzaF9zaWduaW5nX2tleXNcIl0sXG4gICAgc2V0UHJpbWFyeUVtYWlsVmlzaWJpbGl0eUZvckF1dGhlbnRpY2F0ZWQ6IFtcbiAgICAgIFwiUEFUQ0ggL3VzZXIvZW1haWwvdmlzaWJpbGl0eVwiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwic2V0UHJpbWFyeUVtYWlsVmlzaWJpbGl0eUZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIHNldFByaW1hcnlFbWFpbFZpc2liaWxpdHlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQQVRDSCAvdXNlci9lbWFpbC92aXNpYmlsaXR5XCJcbiAgICBdLFxuICAgIHVuYmxvY2s6IFtcIkRFTEVURSAvdXNlci9ibG9ja3Mve3VzZXJuYW1lfVwiXSxcbiAgICB1bmZvbGxvdzogW1wiREVMRVRFIC91c2VyL2ZvbGxvd2luZy97dXNlcm5hbWV9XCJdLFxuICAgIHVwZGF0ZUF1dGhlbnRpY2F0ZWQ6IFtcIlBBVENIIC91c2VyXCJdXG4gIH1cbn07XG52YXIgZW5kcG9pbnRzX2RlZmF1bHQgPSBFbmRwb2ludHM7XG5cbi8vIHBrZy9kaXN0LXNyYy9lbmRwb2ludHMtdG8tbWV0aG9kcy5qc1xudmFyIGVuZHBvaW50TWV0aG9kc01hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG5mb3IgKGNvbnN0IFtzY29wZSwgZW5kcG9pbnRzXSBvZiBPYmplY3QuZW50cmllcyhlbmRwb2ludHNfZGVmYXVsdCkpIHtcbiAgZm9yIChjb25zdCBbbWV0aG9kTmFtZSwgZW5kcG9pbnRdIG9mIE9iamVjdC5lbnRyaWVzKGVuZHBvaW50cykpIHtcbiAgICBjb25zdCBbcm91dGUsIGRlZmF1bHRzLCBkZWNvcmF0aW9uc10gPSBlbmRwb2ludDtcbiAgICBjb25zdCBbbWV0aG9kLCB1cmxdID0gcm91dGUuc3BsaXQoLyAvKTtcbiAgICBjb25zdCBlbmRwb2ludERlZmF1bHRzID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICB1cmxcbiAgICAgIH0sXG4gICAgICBkZWZhdWx0c1xuICAgICk7XG4gICAgaWYgKCFlbmRwb2ludE1ldGhvZHNNYXAuaGFzKHNjb3BlKSkge1xuICAgICAgZW5kcG9pbnRNZXRob2RzTWFwLnNldChzY29wZSwgLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKSk7XG4gICAgfVxuICAgIGVuZHBvaW50TWV0aG9kc01hcC5nZXQoc2NvcGUpLnNldChtZXRob2ROYW1lLCB7XG4gICAgICBzY29wZSxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBlbmRwb2ludERlZmF1bHRzLFxuICAgICAgZGVjb3JhdGlvbnNcbiAgICB9KTtcbiAgfVxufVxudmFyIGhhbmRsZXIgPSB7XG4gIGhhcyh7IHNjb3BlIH0sIG1ldGhvZE5hbWUpIHtcbiAgICByZXR1cm4gZW5kcG9pbnRNZXRob2RzTWFwLmdldChzY29wZSkuaGFzKG1ldGhvZE5hbWUpO1xuICB9LFxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBtZXRob2ROYW1lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB0aGlzLmdldCh0YXJnZXQsIG1ldGhvZE5hbWUpLFxuICAgICAgLy8gZW5zdXJlcyBtZXRob2QgaXMgaW4gdGhlIGNhY2hlXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9O1xuICB9LFxuICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIG1ldGhvZE5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LmNhY2hlLCBtZXRob2ROYW1lLCBkZXNjcmlwdG9yKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBtZXRob2ROYW1lKSB7XG4gICAgZGVsZXRlIHRhcmdldC5jYWNoZVttZXRob2ROYW1lXTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgb3duS2V5cyh7IHNjb3BlIH0pIHtcbiAgICByZXR1cm4gWy4uLmVuZHBvaW50TWV0aG9kc01hcC5nZXQoc2NvcGUpLmtleXMoKV07XG4gIH0sXG4gIHNldCh0YXJnZXQsIG1ldGhvZE5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHRhcmdldC5jYWNoZVttZXRob2ROYW1lXSA9IHZhbHVlO1xuICB9LFxuICBnZXQoeyBvY3Rva2l0LCBzY29wZSwgY2FjaGUgfSwgbWV0aG9kTmFtZSkge1xuICAgIGlmIChjYWNoZVttZXRob2ROYW1lXSkge1xuICAgICAgcmV0dXJuIGNhY2hlW21ldGhvZE5hbWVdO1xuICAgIH1cbiAgICBjb25zdCBtZXRob2QgPSBlbmRwb2ludE1ldGhvZHNNYXAuZ2V0KHNjb3BlKS5nZXQobWV0aG9kTmFtZSk7XG4gICAgaWYgKCFtZXRob2QpIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuICAgIGNvbnN0IHsgZW5kcG9pbnREZWZhdWx0cywgZGVjb3JhdGlvbnMgfSA9IG1ldGhvZDtcbiAgICBpZiAoZGVjb3JhdGlvbnMpIHtcbiAgICAgIGNhY2hlW21ldGhvZE5hbWVdID0gZGVjb3JhdGUoXG4gICAgICAgIG9jdG9raXQsXG4gICAgICAgIHNjb3BlLFxuICAgICAgICBtZXRob2ROYW1lLFxuICAgICAgICBlbmRwb2ludERlZmF1bHRzLFxuICAgICAgICBkZWNvcmF0aW9uc1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVbbWV0aG9kTmFtZV0gPSBvY3Rva2l0LnJlcXVlc3QuZGVmYXVsdHMoZW5kcG9pbnREZWZhdWx0cyk7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZVttZXRob2ROYW1lXTtcbiAgfVxufTtcbmZ1bmN0aW9uIGVuZHBvaW50c1RvTWV0aG9kcyhvY3Rva2l0KSB7XG4gIGNvbnN0IG5ld01ldGhvZHMgPSB7fTtcbiAgZm9yIChjb25zdCBzY29wZSBvZiBlbmRwb2ludE1ldGhvZHNNYXAua2V5cygpKSB7XG4gICAgbmV3TWV0aG9kc1tzY29wZV0gPSBuZXcgUHJveHkoeyBvY3Rva2l0LCBzY29wZSwgY2FjaGU6IHt9IH0sIGhhbmRsZXIpO1xuICB9XG4gIHJldHVybiBuZXdNZXRob2RzO1xufVxuZnVuY3Rpb24gZGVjb3JhdGUob2N0b2tpdCwgc2NvcGUsIG1ldGhvZE5hbWUsIGRlZmF1bHRzLCBkZWNvcmF0aW9ucykge1xuICBjb25zdCByZXF1ZXN0V2l0aERlZmF1bHRzID0gb2N0b2tpdC5yZXF1ZXN0LmRlZmF1bHRzKGRlZmF1bHRzKTtcbiAgZnVuY3Rpb24gd2l0aERlY29yYXRpb25zKC4uLmFyZ3MpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHJlcXVlc3RXaXRoRGVmYXVsdHMuZW5kcG9pbnQubWVyZ2UoLi4uYXJncyk7XG4gICAgaWYgKGRlY29yYXRpb25zLm1hcFRvRGF0YSkge1xuICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHtcbiAgICAgICAgZGF0YTogb3B0aW9uc1tkZWNvcmF0aW9ucy5tYXBUb0RhdGFdLFxuICAgICAgICBbZGVjb3JhdGlvbnMubWFwVG9EYXRhXTogdm9pZCAwXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXF1ZXN0V2l0aERlZmF1bHRzKG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoZGVjb3JhdGlvbnMucmVuYW1lZCkge1xuICAgICAgY29uc3QgW25ld1Njb3BlLCBuZXdNZXRob2ROYW1lXSA9IGRlY29yYXRpb25zLnJlbmFtZWQ7XG4gICAgICBvY3Rva2l0LmxvZy53YXJuKFxuICAgICAgICBgb2N0b2tpdC4ke3Njb3BlfS4ke21ldGhvZE5hbWV9KCkgaGFzIGJlZW4gcmVuYW1lZCB0byBvY3Rva2l0LiR7bmV3U2NvcGV9LiR7bmV3TWV0aG9kTmFtZX0oKWBcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChkZWNvcmF0aW9ucy5kZXByZWNhdGVkKSB7XG4gICAgICBvY3Rva2l0LmxvZy53YXJuKGRlY29yYXRpb25zLmRlcHJlY2F0ZWQpO1xuICAgIH1cbiAgICBpZiAoZGVjb3JhdGlvbnMucmVuYW1lZFBhcmFtZXRlcnMpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMyID0gcmVxdWVzdFdpdGhEZWZhdWx0cy5lbmRwb2ludC5tZXJnZSguLi5hcmdzKTtcbiAgICAgIGZvciAoY29uc3QgW25hbWUsIGFsaWFzXSBvZiBPYmplY3QuZW50cmllcyhcbiAgICAgICAgZGVjb3JhdGlvbnMucmVuYW1lZFBhcmFtZXRlcnNcbiAgICAgICkpIHtcbiAgICAgICAgaWYgKG5hbWUgaW4gb3B0aW9uczIpIHtcbiAgICAgICAgICBvY3Rva2l0LmxvZy53YXJuKFxuICAgICAgICAgICAgYFwiJHtuYW1lfVwiIHBhcmFtZXRlciBpcyBkZXByZWNhdGVkIGZvciBcIm9jdG9raXQuJHtzY29wZX0uJHttZXRob2ROYW1lfSgpXCIuIFVzZSBcIiR7YWxpYXN9XCIgaW5zdGVhZGBcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICghKGFsaWFzIGluIG9wdGlvbnMyKSkge1xuICAgICAgICAgICAgb3B0aW9uczJbYWxpYXNdID0gb3B0aW9uczJbbmFtZV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zMltuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcXVlc3RXaXRoRGVmYXVsdHMob3B0aW9uczIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVxdWVzdFdpdGhEZWZhdWx0cyguLi5hcmdzKTtcbiAgfVxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih3aXRoRGVjb3JhdGlvbnMsIHJlcXVlc3RXaXRoRGVmYXVsdHMpO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbmZ1bmN0aW9uIHJlc3RFbmRwb2ludE1ldGhvZHMob2N0b2tpdCkge1xuICBjb25zdCBhcGkgPSBlbmRwb2ludHNUb01ldGhvZHMob2N0b2tpdCk7XG4gIHJldHVybiB7XG4gICAgcmVzdDogYXBpXG4gIH07XG59XG5yZXN0RW5kcG9pbnRNZXRob2RzLlZFUlNJT04gPSBWRVJTSU9OO1xuZnVuY3Rpb24gbGVnYWN5UmVzdEVuZHBvaW50TWV0aG9kcyhvY3Rva2l0KSB7XG4gIGNvbnN0IGFwaSA9IGVuZHBvaW50c1RvTWV0aG9kcyhvY3Rva2l0KTtcbiAgcmV0dXJuIHtcbiAgICAuLi5hcGksXG4gICAgcmVzdDogYXBpXG4gIH07XG59XG5sZWdhY3lSZXN0RW5kcG9pbnRNZXRob2RzLlZFUlNJT04gPSBWRVJTSU9OO1xuLy8gQW5ub3RhdGUgdGhlIENvbW1vbkpTIGV4cG9ydCBuYW1lcyBmb3IgRVNNIGltcG9ydCBpbiBub2RlOlxuMCAmJiAobW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxlZ2FjeVJlc3RFbmRwb2ludE1ldGhvZHMsXG4gIHJlc3RFbmRwb2ludE1ldGhvZHNcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvQ29tbW9uSlMgPSAobW9kKSA9PiBfX2NvcHlQcm9wcyhfX2RlZlByb3Aoe30sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pLCBtb2QpO1xuXG4vLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbnZhciBkaXN0X3NyY19leHBvcnRzID0ge307XG5fX2V4cG9ydChkaXN0X3NyY19leHBvcnRzLCB7XG4gIGNvbXBvc2VQYWdpbmF0ZVJlc3Q6ICgpID0+IGNvbXBvc2VQYWdpbmF0ZVJlc3QsXG4gIGlzUGFnaW5hdGluZ0VuZHBvaW50OiAoKSA9PiBpc1BhZ2luYXRpbmdFbmRwb2ludCxcbiAgcGFnaW5hdGVSZXN0OiAoKSA9PiBwYWdpbmF0ZVJlc3QsXG4gIHBhZ2luYXRpbmdFbmRwb2ludHM6ICgpID0+IHBhZ2luYXRpbmdFbmRwb2ludHNcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfX3RvQ29tbW9uSlMoZGlzdF9zcmNfZXhwb3J0cyk7XG5cbi8vIHBrZy9kaXN0LXNyYy92ZXJzaW9uLmpzXG52YXIgVkVSU0lPTiA9IFwiOS4yLjJcIjtcblxuLy8gcGtnL2Rpc3Qtc3JjL25vcm1hbGl6ZS1wYWdpbmF0ZWQtbGlzdC1yZXNwb25zZS5qc1xuZnVuY3Rpb24gbm9ybWFsaXplUGFnaW5hdGVkTGlzdFJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gIGlmICghcmVzcG9uc2UuZGF0YSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5yZXNwb25zZSxcbiAgICAgIGRhdGE6IFtdXG4gICAgfTtcbiAgfVxuICBjb25zdCByZXNwb25zZU5lZWRzTm9ybWFsaXphdGlvbiA9IFwidG90YWxfY291bnRcIiBpbiByZXNwb25zZS5kYXRhICYmICEoXCJ1cmxcIiBpbiByZXNwb25zZS5kYXRhKTtcbiAgaWYgKCFyZXNwb25zZU5lZWRzTm9ybWFsaXphdGlvbilcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIGNvbnN0IGluY29tcGxldGVSZXN1bHRzID0gcmVzcG9uc2UuZGF0YS5pbmNvbXBsZXRlX3Jlc3VsdHM7XG4gIGNvbnN0IHJlcG9zaXRvcnlTZWxlY3Rpb24gPSByZXNwb25zZS5kYXRhLnJlcG9zaXRvcnlfc2VsZWN0aW9uO1xuICBjb25zdCB0b3RhbENvdW50ID0gcmVzcG9uc2UuZGF0YS50b3RhbF9jb3VudDtcbiAgZGVsZXRlIHJlc3BvbnNlLmRhdGEuaW5jb21wbGV0ZV9yZXN1bHRzO1xuICBkZWxldGUgcmVzcG9uc2UuZGF0YS5yZXBvc2l0b3J5X3NlbGVjdGlvbjtcbiAgZGVsZXRlIHJlc3BvbnNlLmRhdGEudG90YWxfY291bnQ7XG4gIGNvbnN0IG5hbWVzcGFjZUtleSA9IE9iamVjdC5rZXlzKHJlc3BvbnNlLmRhdGEpWzBdO1xuICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YVtuYW1lc3BhY2VLZXldO1xuICByZXNwb25zZS5kYXRhID0gZGF0YTtcbiAgaWYgKHR5cGVvZiBpbmNvbXBsZXRlUmVzdWx0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJlc3BvbnNlLmRhdGEuaW5jb21wbGV0ZV9yZXN1bHRzID0gaW5jb21wbGV0ZVJlc3VsdHM7XG4gIH1cbiAgaWYgKHR5cGVvZiByZXBvc2l0b3J5U2VsZWN0aW9uICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmVzcG9uc2UuZGF0YS5yZXBvc2l0b3J5X3NlbGVjdGlvbiA9IHJlcG9zaXRvcnlTZWxlY3Rpb247XG4gIH1cbiAgcmVzcG9uc2UuZGF0YS50b3RhbF9jb3VudCA9IHRvdGFsQ291bnQ7XG4gIHJldHVybiByZXNwb25zZTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL2l0ZXJhdG9yLmpzXG5mdW5jdGlvbiBpdGVyYXRvcihvY3Rva2l0LCByb3V0ZSwgcGFyYW1ldGVycykge1xuICBjb25zdCBvcHRpb25zID0gdHlwZW9mIHJvdXRlID09PSBcImZ1bmN0aW9uXCIgPyByb3V0ZS5lbmRwb2ludChwYXJhbWV0ZXJzKSA6IG9jdG9raXQucmVxdWVzdC5lbmRwb2ludChyb3V0ZSwgcGFyYW1ldGVycyk7XG4gIGNvbnN0IHJlcXVlc3RNZXRob2QgPSB0eXBlb2Ygcm91dGUgPT09IFwiZnVuY3Rpb25cIiA/IHJvdXRlIDogb2N0b2tpdC5yZXF1ZXN0O1xuICBjb25zdCBtZXRob2QgPSBvcHRpb25zLm1ldGhvZDtcbiAgY29uc3QgaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycztcbiAgbGV0IHVybCA9IG9wdGlvbnMudXJsO1xuICByZXR1cm4ge1xuICAgIFtTeW1ib2wuYXN5bmNJdGVyYXRvcl06ICgpID0+ICh7XG4gICAgICBhc3luYyBuZXh0KCkge1xuICAgICAgICBpZiAoIXVybClcbiAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0TWV0aG9kKHsgbWV0aG9kLCB1cmwsIGhlYWRlcnMgfSk7XG4gICAgICAgICAgY29uc3Qgbm9ybWFsaXplZFJlc3BvbnNlID0gbm9ybWFsaXplUGFnaW5hdGVkTGlzdFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICB1cmwgPSAoKG5vcm1hbGl6ZWRSZXNwb25zZS5oZWFkZXJzLmxpbmsgfHwgXCJcIikubWF0Y2goXG4gICAgICAgICAgICAvPChbXjw+XSspPjtcXHMqcmVsPVwibmV4dFwiL1xuICAgICAgICAgICkgfHwgW10pWzFdO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBub3JtYWxpemVkUmVzcG9uc2UgfTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzICE9PSA0MDkpXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB1cmwgPSBcIlwiO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICAgIGRhdGE6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH07XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9wYWdpbmF0ZS5qc1xuZnVuY3Rpb24gcGFnaW5hdGUob2N0b2tpdCwgcm91dGUsIHBhcmFtZXRlcnMsIG1hcEZuKSB7XG4gIGlmICh0eXBlb2YgcGFyYW1ldGVycyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbWFwRm4gPSBwYXJhbWV0ZXJzO1xuICAgIHBhcmFtZXRlcnMgPSB2b2lkIDA7XG4gIH1cbiAgcmV0dXJuIGdhdGhlcihcbiAgICBvY3Rva2l0LFxuICAgIFtdLFxuICAgIGl0ZXJhdG9yKG9jdG9raXQsIHJvdXRlLCBwYXJhbWV0ZXJzKVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0oKSxcbiAgICBtYXBGblxuICApO1xufVxuZnVuY3Rpb24gZ2F0aGVyKG9jdG9raXQsIHJlc3VsdHMsIGl0ZXJhdG9yMiwgbWFwRm4pIHtcbiAgcmV0dXJuIGl0ZXJhdG9yMi5uZXh0KCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgaWYgKHJlc3VsdC5kb25lKSB7XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgbGV0IGVhcmx5RXhpdCA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBlYXJseUV4aXQgPSB0cnVlO1xuICAgIH1cbiAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoXG4gICAgICBtYXBGbiA/IG1hcEZuKHJlc3VsdC52YWx1ZSwgZG9uZSkgOiByZXN1bHQudmFsdWUuZGF0YVxuICAgICk7XG4gICAgaWYgKGVhcmx5RXhpdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIHJldHVybiBnYXRoZXIob2N0b2tpdCwgcmVzdWx0cywgaXRlcmF0b3IyLCBtYXBGbik7XG4gIH0pO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvY29tcG9zZS1wYWdpbmF0ZS5qc1xudmFyIGNvbXBvc2VQYWdpbmF0ZVJlc3QgPSBPYmplY3QuYXNzaWduKHBhZ2luYXRlLCB7XG4gIGl0ZXJhdG9yXG59KTtcblxuLy8gcGtnL2Rpc3Qtc3JjL2dlbmVyYXRlZC9wYWdpbmF0aW5nLWVuZHBvaW50cy5qc1xudmFyIHBhZ2luYXRpbmdFbmRwb2ludHMgPSBbXG4gIFwiR0VUIC9hZHZpc29yaWVzXCIsXG4gIFwiR0VUIC9hcHAvaG9vay9kZWxpdmVyaWVzXCIsXG4gIFwiR0VUIC9hcHAvaW5zdGFsbGF0aW9uLXJlcXVlc3RzXCIsXG4gIFwiR0VUIC9hcHAvaW5zdGFsbGF0aW9uc1wiLFxuICBcIkdFVCAvYXNzaWdubWVudHMve2Fzc2lnbm1lbnRfaWR9L2FjY2VwdGVkX2Fzc2lnbm1lbnRzXCIsXG4gIFwiR0VUIC9jbGFzc3Jvb21zXCIsXG4gIFwiR0VUIC9jbGFzc3Jvb21zL3tjbGFzc3Jvb21faWR9L2Fzc2lnbm1lbnRzXCIsXG4gIFwiR0VUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vZGVwZW5kYWJvdC9hbGVydHNcIixcbiAgXCJHRVQgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS9zZWNyZXQtc2Nhbm5pbmcvYWxlcnRzXCIsXG4gIFwiR0VUIC9ldmVudHNcIixcbiAgXCJHRVQgL2dpc3RzXCIsXG4gIFwiR0VUIC9naXN0cy9wdWJsaWNcIixcbiAgXCJHRVQgL2dpc3RzL3N0YXJyZWRcIixcbiAgXCJHRVQgL2dpc3RzL3tnaXN0X2lkfS9jb21tZW50c1wiLFxuICBcIkdFVCAvZ2lzdHMve2dpc3RfaWR9L2NvbW1pdHNcIixcbiAgXCJHRVQgL2dpc3RzL3tnaXN0X2lkfS9mb3Jrc1wiLFxuICBcIkdFVCAvaW5zdGFsbGF0aW9uL3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvaXNzdWVzXCIsXG4gIFwiR0VUIC9saWNlbnNlc1wiLFxuICBcIkdFVCAvbWFya2V0cGxhY2VfbGlzdGluZy9wbGFuc1wiLFxuICBcIkdFVCAvbWFya2V0cGxhY2VfbGlzdGluZy9wbGFucy97cGxhbl9pZH0vYWNjb3VudHNcIixcbiAgXCJHRVQgL21hcmtldHBsYWNlX2xpc3Rpbmcvc3R1YmJlZC9wbGFuc1wiLFxuICBcIkdFVCAvbWFya2V0cGxhY2VfbGlzdGluZy9zdHViYmVkL3BsYW5zL3twbGFuX2lkfS9hY2NvdW50c1wiLFxuICBcIkdFVCAvbmV0d29ya3Mve293bmVyfS97cmVwb30vZXZlbnRzXCIsXG4gIFwiR0VUIC9ub3RpZmljYXRpb25zXCIsXG4gIFwiR0VUIC9vcmdhbml6YXRpb25zXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvY2FjaGUvdXNhZ2UtYnktcmVwb3NpdG9yeVwiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3Blcm1pc3Npb25zL3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9zZWNyZXRzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3ZhcmlhYmxlc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3ZhcmlhYmxlcy97bmFtZX0vcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2Jsb2Nrc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9jb2RlLXNjYW5uaW5nL2FsZXJ0c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9jb2Rlc3BhY2VzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2NvZGVzcGFjZXMvc2VjcmV0c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vY29waWxvdC9iaWxsaW5nL3NlYXRzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2RlcGVuZGFib3QvYWxlcnRzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2RlcGVuZGFib3Qvc2VjcmV0c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9kZXBlbmRhYm90L3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vZXZlbnRzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2ZhaWxlZF9pbnZpdGF0aW9uc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9ob29rc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9ob29rcy97aG9va19pZH0vZGVsaXZlcmllc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9pbnN0YWxsYXRpb25zXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2ludml0YXRpb25zXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2ludml0YXRpb25zL3tpbnZpdGF0aW9uX2lkfS90ZWFtc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9pc3N1ZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vbWVtYmVyc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9tZW1iZXJzL3t1c2VybmFtZX0vY29kZXNwYWNlc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9taWdyYXRpb25zXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L21pZ3JhdGlvbnMve21pZ3JhdGlvbl9pZH0vcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlcy97cm9sZV9pZH0vdGVhbXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vb3JnYW5pemF0aW9uLXJvbGVzL3tyb2xlX2lkfS91c2Vyc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9vdXRzaWRlX2NvbGxhYm9yYXRvcnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcGFja2FnZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcGVyc29uYWwtYWNjZXNzLXRva2VuLXJlcXVlc3RzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3BlcnNvbmFsLWFjY2Vzcy10b2tlbi1yZXF1ZXN0cy97cGF0X3JlcXVlc3RfaWR9L3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW5zXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3BlcnNvbmFsLWFjY2Vzcy10b2tlbnMve3BhdF9pZH0vcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3Byb2plY3RzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3Byb3BlcnRpZXMvdmFsdWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3B1YmxpY19tZW1iZXJzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3JlcG9zXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3J1bGVzZXRzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3J1bGVzZXRzL3J1bGUtc3VpdGVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3NlY3JldC1zY2FubmluZy9hbGVydHNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vc2VjdXJpdHktYWR2aXNvcmllc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9uc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L2NvbW1lbnRzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vY29tbWVudHMve2NvbW1lbnRfbnVtYmVyfS9yZWFjdGlvbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9yZWFjdGlvbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vaW52aXRhdGlvbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vbWVtYmVyc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9wcm9qZWN0c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9yZXBvc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS90ZWFtc1wiLFxuICBcIkdFVCAvcHJvamVjdHMvY29sdW1ucy97Y29sdW1uX2lkfS9jYXJkc1wiLFxuICBcIkdFVCAvcHJvamVjdHMve3Byb2plY3RfaWR9L2NvbGxhYm9yYXRvcnNcIixcbiAgXCJHRVQgL3Byb2plY3RzL3twcm9qZWN0X2lkfS9jb2x1bW5zXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL2FydGlmYWN0c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9jYWNoZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvb3JnYW5pemF0aW9uLXNlY3JldHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvb3JnYW5pemF0aW9uLXZhcmlhYmxlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5uZXJzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9hcnRpZmFjdHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9hdHRlbXB0cy97YXR0ZW1wdF9udW1iZXJ9L2pvYnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9qb2JzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3NlY3JldHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvdmFyaWFibGVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3dvcmtmbG93c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy93b3JrZmxvd3Mve3dvcmtmbG93X2lkfS9ydW5zXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpdml0eVwiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYXNzaWduZWVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stcnVucy97Y2hlY2tfcnVuX2lkfS9hbm5vdGF0aW9uc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stc3VpdGVzL3tjaGVja19zdWl0ZV9pZH0vY2hlY2stcnVuc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbGVydHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9L2luc3RhbmNlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbmFseXNlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlcy9kZXZjb250YWluZXJzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlc3BhY2VzL3NlY3JldHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbGxhYm9yYXRvcnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1lbnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21tZW50cy97Y29tbWVudF9pZH0vcmVhY3Rpb25zXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tjb21taXRfc2hhfS9jb21tZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97Y29tbWl0X3NoYX0vcHVsbHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve3JlZn0vY2hlY2stcnVuc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97cmVmfS9jaGVjay1zdWl0ZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve3JlZn0vc3RhdHVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tyZWZ9L3N0YXR1c2VzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb250cmlidXRvcnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGVuZGFib3QvYWxlcnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRhYm90L3NlY3JldHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGxveW1lbnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBsb3ltZW50cy97ZGVwbG95bWVudF9pZH0vc3RhdHVzZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50LWJyYW5jaC1wb2xpY2llc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50X3Byb3RlY3Rpb25fcnVsZXMvYXBwc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZXZlbnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9mb3Jrc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3NcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfS9kZWxpdmVyaWVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbnZpdGF0aW9uc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvY29tbWVudHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy9jb21tZW50cy97Y29tbWVudF9pZH0vcmVhY3Rpb25zXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvZXZlbnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vY29tbWVudHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9ldmVudHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9sYWJlbHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9yZWFjdGlvbnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS90aW1lbGluZVwiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30va2V5c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vbGFiZWxzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9taWxlc3RvbmVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9taWxlc3RvbmVzL3ttaWxlc3RvbmVfbnVtYmVyfS9sYWJlbHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L25vdGlmaWNhdGlvbnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzL2J1aWxkc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHJvamVjdHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy9jb21tZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMvY29tbWVudHMve2NvbW1lbnRfaWR9L3JlYWN0aW9uc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9jb21tZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9jb21taXRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L2ZpbGVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3Jldmlld3NcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vcmV2aWV3cy97cmV2aWV3X2lkfS9jb21tZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL3tyZWxlYXNlX2lkfS9hc3NldHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL3tyZWxlYXNlX2lkfS9yZWFjdGlvbnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzL2JyYW5jaGVzL3ticmFuY2h9XCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ydWxlc2V0c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXNldHMvcnVsZS1zdWl0ZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3NlY3JldC1zY2FubmluZy9hbGVydHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3NlY3JldC1zY2FubmluZy9hbGVydHMve2FsZXJ0X251bWJlcn0vbG9jYXRpb25zXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWN1cml0eS1hZHZpc29yaWVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zdGFyZ2F6ZXJzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zdWJzY3JpYmVyc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdGFnc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdGVhbXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RvcGljc1wiLFxuICBcIkdFVCAvcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vc2VjcmV0c1wiLFxuICBcIkdFVCAvcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3ZhcmlhYmxlc1wiLFxuICBcIkdFVCAvc2VhcmNoL2NvZGVcIixcbiAgXCJHRVQgL3NlYXJjaC9jb21taXRzXCIsXG4gIFwiR0VUIC9zZWFyY2gvaXNzdWVzXCIsXG4gIFwiR0VUIC9zZWFyY2gvbGFiZWxzXCIsXG4gIFwiR0VUIC9zZWFyY2gvcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9zZWFyY2gvdG9waWNzXCIsXG4gIFwiR0VUIC9zZWFyY2gvdXNlcnNcIixcbiAgXCJHRVQgL3RlYW1zL3t0ZWFtX2lkfS9kaXNjdXNzaW9uc1wiLFxuICBcIkdFVCAvdGVhbXMve3RlYW1faWR9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vY29tbWVudHNcIixcbiAgXCJHRVQgL3RlYW1zL3t0ZWFtX2lkfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L2NvbW1lbnRzL3tjb21tZW50X251bWJlcn0vcmVhY3Rpb25zXCIsXG4gIFwiR0VUIC90ZWFtcy97dGVhbV9pZH0vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9yZWFjdGlvbnNcIixcbiAgXCJHRVQgL3RlYW1zL3t0ZWFtX2lkfS9pbnZpdGF0aW9uc1wiLFxuICBcIkdFVCAvdGVhbXMve3RlYW1faWR9L21lbWJlcnNcIixcbiAgXCJHRVQgL3RlYW1zL3t0ZWFtX2lkfS9wcm9qZWN0c1wiLFxuICBcIkdFVCAvdGVhbXMve3RlYW1faWR9L3JlcG9zXCIsXG4gIFwiR0VUIC90ZWFtcy97dGVhbV9pZH0vdGVhbXNcIixcbiAgXCJHRVQgL3VzZXIvYmxvY2tzXCIsXG4gIFwiR0VUIC91c2VyL2NvZGVzcGFjZXNcIixcbiAgXCJHRVQgL3VzZXIvY29kZXNwYWNlcy9zZWNyZXRzXCIsXG4gIFwiR0VUIC91c2VyL2VtYWlsc1wiLFxuICBcIkdFVCAvdXNlci9mb2xsb3dlcnNcIixcbiAgXCJHRVQgL3VzZXIvZm9sbG93aW5nXCIsXG4gIFwiR0VUIC91c2VyL2dwZ19rZXlzXCIsXG4gIFwiR0VUIC91c2VyL2luc3RhbGxhdGlvbnNcIixcbiAgXCJHRVQgL3VzZXIvaW5zdGFsbGF0aW9ucy97aW5zdGFsbGF0aW9uX2lkfS9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL3VzZXIvaXNzdWVzXCIsXG4gIFwiR0VUIC91c2VyL2tleXNcIixcbiAgXCJHRVQgL3VzZXIvbWFya2V0cGxhY2VfcHVyY2hhc2VzXCIsXG4gIFwiR0VUIC91c2VyL21hcmtldHBsYWNlX3B1cmNoYXNlcy9zdHViYmVkXCIsXG4gIFwiR0VUIC91c2VyL21lbWJlcnNoaXBzL29yZ3NcIixcbiAgXCJHRVQgL3VzZXIvbWlncmF0aW9uc1wiLFxuICBcIkdFVCAvdXNlci9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvdXNlci9vcmdzXCIsXG4gIFwiR0VUIC91c2VyL3BhY2thZ2VzXCIsXG4gIFwiR0VUIC91c2VyL3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zXCIsXG4gIFwiR0VUIC91c2VyL3B1YmxpY19lbWFpbHNcIixcbiAgXCJHRVQgL3VzZXIvcmVwb3NcIixcbiAgXCJHRVQgL3VzZXIvcmVwb3NpdG9yeV9pbnZpdGF0aW9uc1wiLFxuICBcIkdFVCAvdXNlci9zb2NpYWxfYWNjb3VudHNcIixcbiAgXCJHRVQgL3VzZXIvc3NoX3NpZ25pbmdfa2V5c1wiLFxuICBcIkdFVCAvdXNlci9zdGFycmVkXCIsXG4gIFwiR0VUIC91c2VyL3N1YnNjcmlwdGlvbnNcIixcbiAgXCJHRVQgL3VzZXIvdGVhbXNcIixcbiAgXCJHRVQgL3VzZXJzXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L2V2ZW50c1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9ldmVudHMvb3Jncy97b3JnfVwiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9ldmVudHMvcHVibGljXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L2ZvbGxvd2Vyc1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9mb2xsb3dpbmdcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZ2lzdHNcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZ3BnX2tleXNcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0va2V5c1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9vcmdzXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3BhY2thZ2VzXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3Byb2plY3RzXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3JlY2VpdmVkX2V2ZW50c1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9yZWNlaXZlZF9ldmVudHMvcHVibGljXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3JlcG9zXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3NvY2lhbF9hY2NvdW50c1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9zc2hfc2lnbmluZ19rZXlzXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3N0YXJyZWRcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vc3Vic2NyaXB0aW9uc1wiXG5dO1xuXG4vLyBwa2cvZGlzdC1zcmMvcGFnaW5hdGluZy1lbmRwb2ludHMuanNcbmZ1bmN0aW9uIGlzUGFnaW5hdGluZ0VuZHBvaW50KGFyZykge1xuICBpZiAodHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBwYWdpbmF0aW5nRW5kcG9pbnRzLmluY2x1ZGVzKGFyZyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9pbmRleC5qc1xuZnVuY3Rpb24gcGFnaW5hdGVSZXN0KG9jdG9raXQpIHtcbiAgcmV0dXJuIHtcbiAgICBwYWdpbmF0ZTogT2JqZWN0LmFzc2lnbihwYWdpbmF0ZS5iaW5kKG51bGwsIG9jdG9raXQpLCB7XG4gICAgICBpdGVyYXRvcjogaXRlcmF0b3IuYmluZChudWxsLCBvY3Rva2l0KVxuICAgIH0pXG4gIH07XG59XG5wYWdpbmF0ZVJlc3QuVkVSU0lPTiA9IFZFUlNJT047XG4vLyBBbm5vdGF0ZSB0aGUgQ29tbW9uSlMgZXhwb3J0IG5hbWVzIGZvciBFU00gaW1wb3J0IGluIG5vZGU6XG4wICYmIChtb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29tcG9zZVBhZ2luYXRlUmVzdCxcbiAgaXNQYWdpbmF0aW5nRW5kcG9pbnQsXG4gIHBhZ2luYXRlUmVzdCxcbiAgcGFnaW5hdGluZ0VuZHBvaW50c1xufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRPY3Rva2l0T3B0aW9ucyA9IGV4cG9ydHMuR2l0SHViID0gZXhwb3J0cy5kZWZhdWx0cyA9IGV4cG9ydHMuY29udGV4dCA9IHZvaWQgMDtcbmNvbnN0IENvbnRleHQgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vY29udGV4dFwiKSk7XG5jb25zdCBVdGlscyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9pbnRlcm5hbC91dGlsc1wiKSk7XG4vLyBvY3Rva2l0ICsgcGx1Z2luc1xuY29uc3QgY29yZV8xID0gcmVxdWlyZShcIkBvY3Rva2l0L2NvcmVcIik7XG5jb25zdCBwbHVnaW5fcmVzdF9lbmRwb2ludF9tZXRob2RzXzEgPSByZXF1aXJlKFwiQG9jdG9raXQvcGx1Z2luLXJlc3QtZW5kcG9pbnQtbWV0aG9kc1wiKTtcbmNvbnN0IHBsdWdpbl9wYWdpbmF0ZV9yZXN0XzEgPSByZXF1aXJlKFwiQG9jdG9raXQvcGx1Z2luLXBhZ2luYXRlLXJlc3RcIik7XG5leHBvcnRzLmNvbnRleHQgPSBuZXcgQ29udGV4dC5Db250ZXh0KCk7XG5jb25zdCBiYXNlVXJsID0gVXRpbHMuZ2V0QXBpQmFzZVVybCgpO1xuZXhwb3J0cy5kZWZhdWx0cyA9IHtcbiAgICBiYXNlVXJsLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgICAgYWdlbnQ6IFV0aWxzLmdldFByb3h5QWdlbnQoYmFzZVVybCksXG4gICAgICAgIGZldGNoOiBVdGlscy5nZXRQcm94eUZldGNoKGJhc2VVcmwpXG4gICAgfVxufTtcbmV4cG9ydHMuR2l0SHViID0gY29yZV8xLk9jdG9raXQucGx1Z2luKHBsdWdpbl9yZXN0X2VuZHBvaW50X21ldGhvZHNfMS5yZXN0RW5kcG9pbnRNZXRob2RzLCBwbHVnaW5fcGFnaW5hdGVfcmVzdF8xLnBhZ2luYXRlUmVzdCkuZGVmYXVsdHMoZXhwb3J0cy5kZWZhdWx0cyk7XG4vKipcbiAqIENvbnZpZW5jZSBmdW5jdGlvbiB0byBjb3JyZWN0bHkgZm9ybWF0IE9jdG9raXQgT3B0aW9ucyB0byBwYXNzIGludG8gdGhlIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSAgICAgdG9rZW4gICAgdGhlIHJlcG8gUEFUIG9yIEdJVEhVQl9UT0tFTlxuICogQHBhcmFtICAgICBvcHRpb25zICBvdGhlciBvcHRpb25zIHRvIHNldFxuICovXG5mdW5jdGlvbiBnZXRPY3Rva2l0T3B0aW9ucyh0b2tlbiwgb3B0aW9ucykge1xuICAgIGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zIHx8IHt9KTsgLy8gU2hhbGxvdyBjbG9uZSAtIGRvbid0IG11dGF0ZSB0aGUgb2JqZWN0IHByb3ZpZGVkIGJ5IHRoZSBjYWxsZXJcbiAgICAvLyBBdXRoXG4gICAgY29uc3QgYXV0aCA9IFV0aWxzLmdldEF1dGhTdHJpbmcodG9rZW4sIG9wdHMpO1xuICAgIGlmIChhdXRoKSB7XG4gICAgICAgIG9wdHMuYXV0aCA9IGF1dGg7XG4gICAgfVxuICAgIHJldHVybiBvcHRzO1xufVxuZXhwb3J0cy5nZXRPY3Rva2l0T3B0aW9ucyA9IGdldE9jdG9raXRPcHRpb25zO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0T2N0b2tpdCA9IGV4cG9ydHMuY29udGV4dCA9IHZvaWQgMDtcbmNvbnN0IENvbnRleHQgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vY29udGV4dFwiKSk7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5leHBvcnRzLmNvbnRleHQgPSBuZXcgQ29udGV4dC5Db250ZXh0KCk7XG4vKipcbiAqIFJldHVybnMgYSBoeWRyYXRlZCBvY3Rva2l0IHJlYWR5IHRvIHVzZSBmb3IgR2l0SHViIEFjdGlvbnNcbiAqXG4gKiBAcGFyYW0gICAgIHRva2VuICAgIHRoZSByZXBvIFBBVCBvciBHSVRIVUJfVE9LRU5cbiAqIEBwYXJhbSAgICAgb3B0aW9ucyAgb3RoZXIgb3B0aW9ucyB0byBzZXRcbiAqL1xuZnVuY3Rpb24gZ2V0T2N0b2tpdCh0b2tlbiwgb3B0aW9ucywgLi4uYWRkaXRpb25hbFBsdWdpbnMpIHtcbiAgICBjb25zdCBHaXRIdWJXaXRoUGx1Z2lucyA9IHV0aWxzXzEuR2l0SHViLnBsdWdpbiguLi5hZGRpdGlvbmFsUGx1Z2lucyk7XG4gICAgcmV0dXJuIG5ldyBHaXRIdWJXaXRoUGx1Z2lucygoMCwgdXRpbHNfMS5nZXRPY3Rva2l0T3B0aW9ucykodG9rZW4sIG9wdGlvbnMpKTtcbn1cbmV4cG9ydHMuZ2V0T2N0b2tpdCA9IGdldE9jdG9raXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1naXRodWIuanMubWFwIiwiaW1wb3J0IHsgc2V0RmFpbGVkIH0gZnJvbSAnQGFjdGlvbnMvY29yZSdcbmltcG9ydCB7IGNvbnRleHQgfSBmcm9tICdAYWN0aW9ucy9naXRodWInXG5pbXBvcnQgeyBPY3Rva2l0IH0gZnJvbSAnbGliL3R5cGVzL21vZGVscy9naXRodWIvb2N0b2tpdC5qcydcblxuZXhwb3J0IHR5cGUgQ3JlYXRlTmV3R2l0QnJhbmNoUGFyYW1zID0ge1xuICBvd25lcjogc3RyaW5nXG4gIHJlcG86IHN0cmluZ1xuICBicmFuY2hOYW1lOiBzdHJpbmdcbiAgYmFzZUJyYW5jaD86IHN0cmluZ1xufVxuXG4vKipcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIGFzeW5jIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhIG5ldyBHaXQgYnJhbmNoIGluIGEgR2l0SHViIHJlcG9zaXRvcnkgdXNpbmcgT2N0b2tpdC5cbiAqXG4gKiBAcGFyYW0gb2N0b2tpdCAtIEFuIGF1dGhlbnRpY2F0ZWQgT2N0b2tpdCBpbnN0YW5jZSBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgR2l0SHViIEFQSS5cbiAqIEByZXR1cm5zIEFuIGFzeW5jIGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBhIG5ldyBicmFuY2ggZnJvbSBhIHNwZWNpZmllZCBiYXNlIGJyYW5jaC5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBhc3luY1xuICogQHBhcmFtIG93bmVyIC0gVGhlIG93bmVyIG9mIHRoZSByZXBvc2l0b3J5LlxuICogQHBhcmFtIHJlcG8gLSBUaGUgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeS5cbiAqIEBwYXJhbSBicmFuY2hOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIG5ldyBicmFuY2ggdG8gY3JlYXRlLlxuICogQHBhcmFtIGJhc2VCcmFuY2ggLSAoT3B0aW9uYWwpIFRoZSBuYW1lIG9mIHRoZSBiYXNlIGJyYW5jaCB0byBicmFuY2ggZnJvbS4gRGVmYXVsdHMgdG8gdGhlIGN1cnJlbnQgY29udGV4dCByZWYgb3IgJ21haW4nLlxuICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgYnJhbmNoIGRhdGEgaWYgc3VjY2Vzc2Z1bDsgb3RoZXJ3aXNlLCBoYW5kbGVzIGVycm9ycyBhbmQgc2V0cyB0aGUgZmFpbHVyZSBzdGF0ZS5cbiAqXG4gKiBAdGhyb3dzIFdpbGwgY2FsbCBgc2V0RmFpbGVkYCBpZiB0aGUgYnJhbmNoIGNyZWF0aW9uIGZhaWxzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTmV3R2l0QnJhbmNoKG9jdG9raXQ6IE9jdG9raXQpIHtcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU5ld0dpdEJyYW5jaCh7XG4gICAgYmFzZUJyYW5jaCA9IGNvbnRleHQucmVmLnNwbGl0KCcvJykucG9wKCkgfHwgJ21haW4nLFxuICAgIGJyYW5jaE5hbWUsXG4gICAgb3duZXIsXG4gICAgcmVwbyxcbiAgfTogQ3JlYXRlTmV3R2l0QnJhbmNoUGFyYW1zKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIEdldCB0aGUgbGF0ZXN0IGNvbW1pdCBmcm9tIHRoZSBiYXNlIGJyYW5jaFxuICAgICAgY29uc3QgeyBkYXRhOiByZWZEYXRhIH0gPSBhd2FpdCBvY3Rva2l0LnJlc3QuZ2l0LmdldFJlZih7XG4gICAgICAgIG93bmVyLFxuICAgICAgICByZXBvLFxuICAgICAgICByZWY6IGBoZWFkcy8ke2Jhc2VCcmFuY2h9YCxcbiAgICAgIH0pXG5cbiAgICAgIC8vIENyZWF0ZSBhIG5ldyBicmFuY2ggZnJvbSB0aGUgbGF0ZXN0IGNvbW1pdFxuICAgICAgY29uc3QgeyBkYXRhOiBuZXdCcmFuY2ggfSA9IGF3YWl0IG9jdG9raXQucmVzdC5naXQuY3JlYXRlUmVmKHtcbiAgICAgICAgb3duZXIsXG4gICAgICAgIHJlcG8sXG4gICAgICAgIHJlZjogYHJlZnMvaGVhZHMvJHticmFuY2hOYW1lfWAsXG4gICAgICAgIHNoYTogcmVmRGF0YS5vYmplY3Quc2hhLFxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIG5ld0JyYW5jaFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBzZXRGYWlsZWQoYEZhaWxlZCB0byBjcmVhdGUgbmV3IGdpdCBicmFuY2g6ICR7ZXJyb3IubWVzc2FnZX1gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0RmFpbGVkKCdGYWlsZWQgdG8gY3JlYXRlIG5ldyBnaXQgYnJhbmNoOiBVbmtub3duIGVycm9yJylcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOV0sIm1hcHBpbmdzIjoiOzs7O0NBQ0EsT0FBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBTSxFQUFDO0NBQzdELFFBQVEsVUFBVSxLQUFLO0NBQ3ZCLE1BQU0saUJBQWUsS0FBSztDQUMxQixNQUFNLGlCQUFlLEtBQUs7Q0FDMUIsSUFBTUEsWUFBTixNQUFjOzs7O0VBSVYsY0FBYztHQUNWLElBQUksSUFBSSxJQUFJO0dBQ1osS0FBSyxVQUFVLENBQUU7QUFDakIsT0FBSSxRQUFRLElBQUksa0JBQ1osTUFBSyxHQUFHLEtBQUssWUFBWSxRQUFRLElBQUksa0JBQWtCLEVBQ25ELEtBQUssVUFBVSxLQUFLLE9BQU8sR0FBRyxLQUFLLGNBQWMsUUFBUSxJ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Q0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Q0FDRDtDQUdELFNBQVMscUJBQXFCLEtBQUs7QUFDakMsTUFBSSxPQUFPLFFBQVEsU0FDakIsUUFBTyxvQkFBb0IsU0FBUyxJQUFJO01BRXhDLFFBQU87Q0FFVjtDQUdELFNBQVMsYUFBYSxTQUFTO0FBQzdCLFNBQU8sRUFDTCxVQUFVLE9BQU8sT0FBTyxTQUFTLEtBQUssTUFBTSxRQUFRLEVBQUUsRUFDcEQsVUFBVSxTQUFTLEtBQUssTUFBTSxRQUFRLENBQ3ZDLEVBQUMsQ0FDSDtDQUNGO0NBQ0QsYUFBYSxVQUFVOzs7Ozs7Q0NyWXZCLElBQUlFLHVDQUFnQyxvQkFBcUIsT0FBTyxVQUFVLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSTtBQUM1RixNQUFJLE9BQU8sUUFBVyxLQUFLO0VBQzNCLElBQUksT0FBTyxPQUFPLHlCQUF5QixHQUFHLEVBQUU7QUFDaEQsTUFBSSxDQUFDLFNBQVMsU0FBUyxPQUFPLENBQUMsRUFBRSxhQUFhLEtBQUssWUFBWSxLQUFLLGVBQ2xFLE9BQU87R0FBRSxZQUFZO0dBQU0sS0FBSyxXQUFXO0FBQUUsV0FBTyxFQUFFO0dBQUs7RUFBRTtFQUUvRCxPQUFPLGVBQWUsR0FBRyxJQUFJLEtBQUs7Q0FDckMsTUFBSyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUk7QUFDeEIsTUFBSSxPQUFPLFFBQVcsS0FBSztFQUMzQixFQUFFLE1BQU0sRUFBRTtDQUNiO0NBQ0QsSUFBSUMsMENBQW1DLHVCQUF3QixPQUFPLFVBQVUsU0FBUyxHQUFHLEdBQUc7RUFDM0YsT0FBTyxlQUFlLEdBQUcsV0FBVztHQUFFLFlBQVk7R0FBTSxPQUFPO0VBQUcsRUFBQztDQUN0RSxLQUFJLFNBQVMsR0FBRyxHQUFHO0VBQ2hCLEVBQUUsYUFBYTtDQUNsQjtDQUNELElBQUlDLG9DQUE2QixnQkFBaUIsU0FBVSxLQUFLO0FBQzdELE1BQUksT0FBTyxJQUFJLFdBQVksUUFBTztFQUNsQyxJQUFJLFNBQVMsQ0FBRTtBQUNmLE1BQUksT0FBTyxNQUFNO1FBQUssSUFBSSxLQUFLLElBQUssS0FBSSxNQUFNLGFBQWEsT0FBTyxVQUFVLGVBQWUsS0FBSyxLQUFLLEVBQUUsRUFBRUYsa0JBQWdCLFFBQVEsS0FBSyxFQUFFO0VBQUM7RUFDeklDLHFCQUFtQixRQUFRLElBQUk7QUFDL0IsU0FBTztDQUNWO0NBQ0QsT0FBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBTSxFQUFDO0NBQzdELFFBQVEsb0JBQW9CLFFBQVEsU0FBUyxRQUFRLFdBQVcsUUFBUSxVQUFVLEtBQUs7Q0FDdkYsTUFBTUUsWUFBVUQsaUNBQWtDO0NBQ2xELE1BQU0sUUFBUUEsaUNBQXlDO0NBRXZELE1BQU07Q0FDTixNQUFNO0NBQ04sTUFBTTtDQUNOLFFBQVEsVUFBVSxJQUFJQyxVQUFRO0NBQzlCLE1BQU0sVUFBVSxNQUFNLGVBQWU7Q0FDckMsUUFBUSxXQUFXO0VBQ2Y7RUFDQSxTQUFTO0dBQ0wsT0FBTyxNQUFNLGNBQWMsUUFBUTtHQUNuQyxPQUFPLE1BQU0sY0FBYyxRQUFRO0VBQ3RDO0NBQ0o7Q0FDRCxRQUFRLFNBQVMsT0FBTyxRQUFRLE9BQU8sK0JBQStCLHFCQUFxQix1QkFBdUIsYUFBYSxDQUFDLFNBQVMsUUFBUSxTQUFTOzs7Ozs7O0NBTzFKLFNBQVMsa0JBQWtCLE9BQU8sU0FBUztFQUN2QyxNQUFNLE9BQU8sT0FBTyxPQUFPLENBQUUsR0FBRSxXQUFXLENBQUUsRUFBQztFQUU3QyxNQUFNQyxTQUFPLE1BQU0sY0FBYyxPQUFPLEtBQUs7QUFDN0MsTUFBSUEsUUFDQSxLQUFLLE9BQU9BO0FBRWhCLFNBQU87Q0FDVjtDQUNELFFBQVEsb0JBQW9COzs7Ozs7Q0N4RDVCLElBQUkscUNBQWdDLG9CQUFxQixPQUFPLFVBQVUsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJO0FBQzVGLE1BQUksT0FBTyxRQUFXLEtBQUs7RUFDM0IsSUFBSSxPQUFPLE9BQU8seUJBQXlCLEdBQUcsRUFBRTtBQUNoRCxNQUFJLENBQUMsU0FBUyxTQUFTLE9BQU8sQ0FBQyxFQUFFLGFBQWEsS0FBSyxZQUFZLEtBQUssZUFDbEUsT0FBTztHQUFFLFlBQVk7R0FBTSxLQUFLLFdBQVc7QUFBRSxXQUFPLEVBQUU7R0FBSztFQUFFO0VBRS9ELE9BQU8sZUFBZSxHQUFHLElBQUksS0FBSztDQUNyQyxNQUFLLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSTtBQUN4QixNQUFJLE9BQU8sUUFBVyxLQUFLO0VBQzNCLEVBQUUsTUFBTSxFQUFFO0NBQ2I7Q0FDRCxJQUFJLHdDQUFtQyx1QkFBd0IsT0FBTyxVQUFVLFNBQVMsR0FBRyxHQUFHO0VBQzNGLE9BQU8sZUFBZSxHQUFHLFdBQVc7R0FBRSxZQUFZO0dBQU0sT0FBTztFQUFHLEVBQUM7Q0FDdEUsS0FBSSxTQUFTLEdBQUcsR0FBRztFQUNoQixFQUFFLGFBQWE7Q0FDbEI7Q0FDRCxJQUFJLGtDQUE2QixnQkFBaUIsU0FBVSxLQUFLO0FBQzdELE1BQUksT0FBTyxJQUFJLFdBQVksUUFBTztFQUNsQyxJQUFJLFNBQVMsQ0FBRTtBQUNmLE1BQUksT0FBTyxNQUFNO1FBQUssSUFBSSxLQUFLLElBQUssS0FBSSxNQUFNLGFBQWEsT0FBTyxVQUFVLGVBQWUsS0FBSyxLQUFLLEVBQUUsRUFBRSxnQkFBZ0IsUUFBUSxLQUFLLEVBQUU7RUFBQztFQUN6SSxtQkFBbUIsUUFBUSxJQUFJO0FBQy9CLFNBQU87Q0FDVjtDQUNELE9BQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQU0sRUFBQztDQUM3RCxRQUFRLGFBQWEsUUFBUSxVQUFVLEtBQUs7Q0FDNUMsTUFBTSxVQUFVLCtCQUFrQztDQUNsRCxNQUFNO0NBQ04sUUFBUSxVQUFVLElBQUksUUFBUTs7Ozs7OztDQU85QixTQUFTLFdBQVcsT0FBTyxTQUFTLEdBQUcsbUJBQW1CO0VBQ3RELE1BQU0sb0JBQW9CLFFBQVEsT0FBTyxPQUFPLEdBQUcsa0JBQWtCO0FBQ3JFLFNBQU8sSUFBSSxtQkFBbUIsR0FBRyxRQUFRLG1CQUFtQixPQUFPLFFBQVE7Q0FDOUU7Q0FDRCxRQUFRLGFBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWnJCLFNBQWdCLG1CQUFtQkMsU0FBa0I7QUFDbkQsUUFBTyxlQUFlQyxxQkFBbUIsRUFDdkMsYUFBYUMsc0JBQVEsSUFBSSxNQUFNLElBQUksQ0FBQyxLQUFLLElBQUksUUFDN0MsWUFDQSxPQUNBLE1BQ3lCLEVBQUU7QUFDM0IsTUFBSTtHQUVGLE1BQU0sRUFBRSxNQUFNLFNBQVMsR0FBRyxNQUFNLFFBQVEsS0FBSyxJQUFJLE9BQU87SUFDdEQ7SUFDQTtJQUNBLEtBQUssQ0FBQyxNQUFNLEVBQUUsWUFBWTtHQUMzQixFQUFDO0dBR0YsTUFBTSxFQUFFLE1BQU0sV0FBVyxHQUFHLE1BQU0sUUFBUSxLQUFLLElBQUksVUFBVTtJQUMzRDtJQUNBO0lBQ0EsS0FBSyxDQUFDLFdBQVcsRUFBRSxZQUFZO0lBQy9CLEtBQUssUUFBUSxPQUFPO0dBQ3JCLEVBQUM7QUFFRixVQUFPO0VBQ1IsU0FBUSxPQUFPO0FBQ2QsT0FBSSxpQkFBaUIsa0NBQ1QsQ0FBQyxpQ0FBaUMsRUFBRSxNQUFNLFNBQVMsQ0FBQzttQ0FFcEQsaURBQWlEO0VBRTlEO0NBQ0Y7QUFDRiJ9