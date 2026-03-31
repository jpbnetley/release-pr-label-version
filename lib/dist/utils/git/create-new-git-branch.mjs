import { a as require_tunnel, c as __toESM, i as require_undici, o as __commonJSMin, r as setFailed, s as __require } from "../../core-lJ5mRC0h.mjs";
import { EOL } from "os";
import { existsSync, readFileSync } from "fs";
//#region ../node_modules/.pnpm/@actions+github@9.0.0/node_modules/@actions/github/lib/context.js
var Context = class {
	/**
	* Hydrate the context from the environment
	*/
	constructor() {
		var _a, _b, _c;
		this.payload = {};
		if (process.env.GITHUB_EVENT_PATH) if (existsSync(process.env.GITHUB_EVENT_PATH)) this.payload = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: "utf8" }));
		else {
			const path = process.env.GITHUB_EVENT_PATH;
			process.stdout.write(`GITHUB_EVENT_PATH ${path} does not exist${EOL}`);
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
//#endregion
//#region ../node_modules/.pnpm/@actions+http-client@3.0.2/node_modules/@actions/http-client/lib/proxy.js
var require_proxy = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getProxyUrl = getProxyUrl;
	exports.checkBypass = checkBypass;
	function getProxyUrl(reqUrl) {
		const usingSsl = reqUrl.protocol === "https:";
		if (checkBypass(reqUrl)) return;
		const proxyVar = (() => {
			if (usingSsl) return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
			else return process.env["http_proxy"] || process.env["HTTP_PROXY"];
		})();
		if (proxyVar) try {
			return new DecodedURL(proxyVar);
		} catch (_a) {
			if (!proxyVar.startsWith("http://") && !proxyVar.startsWith("https://")) return new DecodedURL(`http://${proxyVar}`);
		}
		else return;
	}
	function checkBypass(reqUrl) {
		if (!reqUrl.hostname) return false;
		const reqHost = reqUrl.hostname;
		if (isLoopbackAddress(reqHost)) return true;
		const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
		if (!noProxy) return false;
		let reqPort;
		if (reqUrl.port) reqPort = Number(reqUrl.port);
		else if (reqUrl.protocol === "http:") reqPort = 80;
		else if (reqUrl.protocol === "https:") reqPort = 443;
		const upperReqHosts = [reqUrl.hostname.toUpperCase()];
		if (typeof reqPort === "number") upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
		for (const upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) if (upperNoProxyItem === "*" || upperReqHosts.some((x) => x === upperNoProxyItem || x.endsWith(`.${upperNoProxyItem}`) || upperNoProxyItem.startsWith(".") && x.endsWith(`${upperNoProxyItem}`))) return true;
		return false;
	}
	function isLoopbackAddress(host) {
		const hostLower = host.toLowerCase();
		return hostLower === "localhost" || hostLower.startsWith("127.") || hostLower.startsWith("[::1]") || hostLower.startsWith("[0:0:0:0:0:0:0:1]");
	}
	var DecodedURL = class extends URL {
		constructor(url, base) {
			super(url, base);
			this._decodedUsername = decodeURIComponent(super.username);
			this._decodedPassword = decodeURIComponent(super.password);
		}
		get username() {
			return this._decodedUsername;
		}
		get password() {
			return this._decodedPassword;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/@actions+github@9.0.0/node_modules/@actions/github/lib/internal/utils.js
var import_lib = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports) => {
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
	var __importStar = exports && exports.__importStar || (function() {
		var ownKeys = function(o) {
			ownKeys = Object.getOwnPropertyNames || function(o) {
				var ar = [];
				for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
				return ar;
			};
			return ownKeys(o);
		};
		return function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
			}
			__setModuleDefault(result, mod);
			return result;
		};
	})();
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
	exports.HttpClient = exports.HttpClientResponse = exports.HttpClientError = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
	exports.getProxyUrl = getProxyUrl;
	exports.isHttps = isHttps;
	const http = __importStar(__require("http"));
	const https = __importStar(__require("https"));
	const pm = __importStar(require_proxy());
	const tunnel = __importStar(require_tunnel());
	const undici_1 = require_undici();
	var HttpCodes;
	(function(HttpCodes) {
		HttpCodes[HttpCodes["OK"] = 200] = "OK";
		HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
		HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
		HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
		HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
		HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
		HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
		HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
		HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
		HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
		HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
		HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
		HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
		HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
		HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
		HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
		HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
		HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
		HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
		HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
		HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
		HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
		HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
		HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
		HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
		HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
		HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
	})(HttpCodes || (exports.HttpCodes = HttpCodes = {}));
	var Headers;
	(function(Headers) {
		Headers["Accept"] = "accept";
		Headers["ContentType"] = "content-type";
	})(Headers || (exports.Headers = Headers = {}));
	var MediaTypes;
	(function(MediaTypes) {
		MediaTypes["ApplicationJson"] = "application/json";
	})(MediaTypes || (exports.MediaTypes = MediaTypes = {}));
	/**
	* Returns the proxy URL, depending upon the supplied url and proxy environment variables.
	* @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
	*/
	function getProxyUrl(serverUrl) {
		const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
		return proxyUrl ? proxyUrl.href : "";
	}
	const HttpRedirectCodes = [
		HttpCodes.MovedPermanently,
		HttpCodes.ResourceMoved,
		HttpCodes.SeeOther,
		HttpCodes.TemporaryRedirect,
		HttpCodes.PermanentRedirect
	];
	const HttpResponseRetryCodes = [
		HttpCodes.BadGateway,
		HttpCodes.ServiceUnavailable,
		HttpCodes.GatewayTimeout
	];
	const RetryableHttpVerbs = [
		"OPTIONS",
		"GET",
		"DELETE",
		"HEAD"
	];
	const ExponentialBackoffCeiling = 10;
	const ExponentialBackoffTimeSlice = 5;
	var HttpClientError = class HttpClientError extends Error {
		constructor(message, statusCode) {
			super(message);
			this.name = "HttpClientError";
			this.statusCode = statusCode;
			Object.setPrototypeOf(this, HttpClientError.prototype);
		}
	};
	exports.HttpClientError = HttpClientError;
	var HttpClientResponse = class {
		constructor(message) {
			this.message = message;
		}
		readBody() {
			return __awaiter(this, void 0, void 0, function* () {
				return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
					let output = Buffer.alloc(0);
					this.message.on("data", (chunk) => {
						output = Buffer.concat([output, chunk]);
					});
					this.message.on("end", () => {
						resolve(output.toString());
					});
				}));
			});
		}
		readBodyBuffer() {
			return __awaiter(this, void 0, void 0, function* () {
				return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
					const chunks = [];
					this.message.on("data", (chunk) => {
						chunks.push(chunk);
					});
					this.message.on("end", () => {
						resolve(Buffer.concat(chunks));
					});
				}));
			});
		}
	};
	exports.HttpClientResponse = HttpClientResponse;
	function isHttps(requestUrl) {
		return new URL(requestUrl).protocol === "https:";
	}
	var HttpClient = class {
		constructor(userAgent, handlers, requestOptions) {
			this._ignoreSslError = false;
			this._allowRedirects = true;
			this._allowRedirectDowngrade = false;
			this._maxRedirects = 50;
			this._allowRetries = false;
			this._maxRetries = 1;
			this._keepAlive = false;
			this._disposed = false;
			this.userAgent = this._getUserAgentWithOrchestrationId(userAgent);
			this.handlers = handlers || [];
			this.requestOptions = requestOptions;
			if (requestOptions) {
				if (requestOptions.ignoreSslError != null) this._ignoreSslError = requestOptions.ignoreSslError;
				this._socketTimeout = requestOptions.socketTimeout;
				if (requestOptions.allowRedirects != null) this._allowRedirects = requestOptions.allowRedirects;
				if (requestOptions.allowRedirectDowngrade != null) this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
				if (requestOptions.maxRedirects != null) this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
				if (requestOptions.keepAlive != null) this._keepAlive = requestOptions.keepAlive;
				if (requestOptions.allowRetries != null) this._allowRetries = requestOptions.allowRetries;
				if (requestOptions.maxRetries != null) this._maxRetries = requestOptions.maxRetries;
			}
		}
		options(requestUrl, additionalHeaders) {
			return __awaiter(this, void 0, void 0, function* () {
				return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
			});
		}
		get(requestUrl, additionalHeaders) {
			return __awaiter(this, void 0, void 0, function* () {
				return this.request("GET", requestUrl, null, additionalHeaders || {});
			});
		}
		del(requestUrl, additionalHeaders) {
			return __awaiter(this, void 0, void 0, function* () {
				return this.request("DELETE", requestUrl, null, additionalHeaders || {});
			});
		}
		post(requestUrl, data, additionalHeaders) {
			return __awaiter(this, void 0, void 0, function* () {
				return this.request("POST", requestUrl, data, additionalHeaders || {});
			});
		}
		patch(requestUrl, data, additionalHeaders) {
			return __awaiter(this, void 0, void 0, function* () {
				return this.request("PATCH", requestUrl, data, additionalHeaders || {});
			});
		}
		put(requestUrl, data, additionalHeaders) {
			return __awaiter(this, void 0, void 0, function* () {
				return this.request("PUT", requestUrl, data, additionalHeaders || {});
			});
		}
		head(requestUrl, additionalHeaders) {
			return __awaiter(this, void 0, void 0, function* () {
				return this.request("HEAD", requestUrl, null, additionalHeaders || {});
			});
		}
		sendStream(verb, requestUrl, stream, additionalHeaders) {
			return __awaiter(this, void 0, void 0, function* () {
				return this.request(verb, requestUrl, stream, additionalHeaders);
			});
		}
		/**
		* Gets a typed object from an endpoint
		* Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
		*/
		getJson(requestUrl_1) {
			return __awaiter(this, arguments, void 0, function* (requestUrl, additionalHeaders = {}) {
				additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
				const res = yield this.get(requestUrl, additionalHeaders);
				return this._processResponse(res, this.requestOptions);
			});
		}
		postJson(requestUrl_1, obj_1) {
			return __awaiter(this, arguments, void 0, function* (requestUrl, obj, additionalHeaders = {}) {
				const data = JSON.stringify(obj, null, 2);
				additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
				additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultContentTypeHeader(additionalHeaders, MediaTypes.ApplicationJson);
				const res = yield this.post(requestUrl, data, additionalHeaders);
				return this._processResponse(res, this.requestOptions);
			});
		}
		putJson(requestUrl_1, obj_1) {
			return __awaiter(this, arguments, void 0, function* (requestUrl, obj, additionalHeaders = {}) {
				const data = JSON.stringify(obj, null, 2);
				additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
				additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultContentTypeHeader(additionalHeaders, MediaTypes.ApplicationJson);
				const res = yield this.put(requestUrl, data, additionalHeaders);
				return this._processResponse(res, this.requestOptions);
			});
		}
		patchJson(requestUrl_1, obj_1) {
			return __awaiter(this, arguments, void 0, function* (requestUrl, obj, additionalHeaders = {}) {
				const data = JSON.stringify(obj, null, 2);
				additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
				additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultContentTypeHeader(additionalHeaders, MediaTypes.ApplicationJson);
				const res = yield this.patch(requestUrl, data, additionalHeaders);
				return this._processResponse(res, this.requestOptions);
			});
		}
		/**
		* Makes a raw http request.
		* All other methods such as get, post, patch, and request ultimately call this.
		* Prefer get, del, post and patch
		*/
		request(verb, requestUrl, data, headers) {
			return __awaiter(this, void 0, void 0, function* () {
				if (this._disposed) throw new Error("Client has already been disposed.");
				const parsedUrl = new URL(requestUrl);
				let info = this._prepareRequest(verb, parsedUrl, headers);
				const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
				let numTries = 0;
				let response;
				do {
					response = yield this.requestRaw(info, data);
					if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
						let authenticationHandler;
						for (const handler of this.handlers) if (handler.canHandleAuthentication(response)) {
							authenticationHandler = handler;
							break;
						}
						if (authenticationHandler) return authenticationHandler.handleAuthentication(this, info, data);
						else return response;
					}
					let redirectsRemaining = this._maxRedirects;
					while (response.message.statusCode && HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0) {
						const redirectUrl = response.message.headers["location"];
						if (!redirectUrl) break;
						const parsedRedirectUrl = new URL(redirectUrl);
						if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
						yield response.readBody();
						if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
							for (const header in headers) if (header.toLowerCase() === "authorization") delete headers[header];
						}
						info = this._prepareRequest(verb, parsedRedirectUrl, headers);
						response = yield this.requestRaw(info, data);
						redirectsRemaining--;
					}
					if (!response.message.statusCode || !HttpResponseRetryCodes.includes(response.message.statusCode)) return response;
					numTries += 1;
					if (numTries < maxTries) {
						yield response.readBody();
						yield this._performExponentialBackoff(numTries);
					}
				} while (numTries < maxTries);
				return response;
			});
		}
		/**
		* Needs to be called if keepAlive is set to true in request options.
		*/
		dispose() {
			if (this._agent) this._agent.destroy();
			this._disposed = true;
		}
		/**
		* Raw request.
		* @param info
		* @param data
		*/
		requestRaw(info, data) {
			return __awaiter(this, void 0, void 0, function* () {
				return new Promise((resolve, reject) => {
					function callbackForResult(err, res) {
						if (err) reject(err);
						else if (!res) reject(/* @__PURE__ */ new Error("Unknown error"));
						else resolve(res);
					}
					this.requestRawWithCallback(info, data, callbackForResult);
				});
			});
		}
		/**
		* Raw request with callback.
		* @param info
		* @param data
		* @param onResult
		*/
		requestRawWithCallback(info, data, onResult) {
			if (typeof data === "string") {
				if (!info.options.headers) info.options.headers = {};
				info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
			}
			let callbackCalled = false;
			function handleResult(err, res) {
				if (!callbackCalled) {
					callbackCalled = true;
					onResult(err, res);
				}
			}
			const req = info.httpModule.request(info.options, (msg) => {
				handleResult(void 0, new HttpClientResponse(msg));
			});
			let socket;
			req.on("socket", (sock) => {
				socket = sock;
			});
			req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
				if (socket) socket.end();
				handleResult(/* @__PURE__ */ new Error(`Request timeout: ${info.options.path}`));
			});
			req.on("error", function(err) {
				handleResult(err);
			});
			if (data && typeof data === "string") req.write(data, "utf8");
			if (data && typeof data !== "string") {
				data.on("close", function() {
					req.end();
				});
				data.pipe(req);
			} else req.end();
		}
		/**
		* Gets an http agent. This function is useful when you need an http agent that handles
		* routing through a proxy server - depending upon the url and proxy environment variables.
		* @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
		*/
		getAgent(serverUrl) {
			const parsedUrl = new URL(serverUrl);
			return this._getAgent(parsedUrl);
		}
		getAgentDispatcher(serverUrl) {
			const parsedUrl = new URL(serverUrl);
			const proxyUrl = pm.getProxyUrl(parsedUrl);
			if (!(proxyUrl && proxyUrl.hostname)) return;
			return this._getProxyAgentDispatcher(parsedUrl, proxyUrl);
		}
		_prepareRequest(method, requestUrl, headers) {
			const info = {};
			info.parsedUrl = requestUrl;
			const usingSsl = info.parsedUrl.protocol === "https:";
			info.httpModule = usingSsl ? https : http;
			const defaultPort = usingSsl ? 443 : 80;
			info.options = {};
			info.options.host = info.parsedUrl.hostname;
			info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
			info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
			info.options.method = method;
			info.options.headers = this._mergeHeaders(headers);
			if (this.userAgent != null) info.options.headers["user-agent"] = this.userAgent;
			info.options.agent = this._getAgent(info.parsedUrl);
			if (this.handlers) for (const handler of this.handlers) handler.prepareRequest(info.options);
			return info;
		}
		_mergeHeaders(headers) {
			if (this.requestOptions && this.requestOptions.headers) return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
			return lowercaseKeys(headers || {});
		}
		/**
		* Gets an existing header value or returns a default.
		* Handles converting number header values to strings since HTTP headers must be strings.
		* Note: This returns string | string[] since some headers can have multiple values.
		* For headers that must always be a single string (like Content-Type), use the
		* specialized _getExistingOrDefaultContentTypeHeader method instead.
		*/
		_getExistingOrDefaultHeader(additionalHeaders, header, _default) {
			let clientHeader;
			if (this.requestOptions && this.requestOptions.headers) {
				const headerValue = lowercaseKeys(this.requestOptions.headers)[header];
				if (headerValue) clientHeader = typeof headerValue === "number" ? headerValue.toString() : headerValue;
			}
			const additionalValue = additionalHeaders[header];
			if (additionalValue !== void 0) return typeof additionalValue === "number" ? additionalValue.toString() : additionalValue;
			if (clientHeader !== void 0) return clientHeader;
			return _default;
		}
		/**
		* Specialized version of _getExistingOrDefaultHeader for Content-Type header.
		* Always returns a single string (not an array) since Content-Type should be a single value.
		* Converts arrays to comma-separated strings and numbers to strings to ensure type safety.
		* This was split from _getExistingOrDefaultHeader to provide stricter typing for callers
		* that assign the result to places expecting a string (e.g., additionalHeaders[Headers.ContentType]).
		*/
		_getExistingOrDefaultContentTypeHeader(additionalHeaders, _default) {
			let clientHeader;
			if (this.requestOptions && this.requestOptions.headers) {
				const headerValue = lowercaseKeys(this.requestOptions.headers)[Headers.ContentType];
				if (headerValue) if (typeof headerValue === "number") clientHeader = String(headerValue);
				else if (Array.isArray(headerValue)) clientHeader = headerValue.join(", ");
				else clientHeader = headerValue;
			}
			const additionalValue = additionalHeaders[Headers.ContentType];
			if (additionalValue !== void 0) if (typeof additionalValue === "number") return String(additionalValue);
			else if (Array.isArray(additionalValue)) return additionalValue.join(", ");
			else return additionalValue;
			if (clientHeader !== void 0) return clientHeader;
			return _default;
		}
		_getAgent(parsedUrl) {
			let agent;
			const proxyUrl = pm.getProxyUrl(parsedUrl);
			const useProxy = proxyUrl && proxyUrl.hostname;
			if (this._keepAlive && useProxy) agent = this._proxyAgent;
			if (!useProxy) agent = this._agent;
			if (agent) return agent;
			const usingSsl = parsedUrl.protocol === "https:";
			let maxSockets = 100;
			if (this.requestOptions) maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
			if (proxyUrl && proxyUrl.hostname) {
				const agentOptions = {
					maxSockets,
					keepAlive: this._keepAlive,
					proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && { proxyAuth: `${proxyUrl.username}:${proxyUrl.password}` }), {
						host: proxyUrl.hostname,
						port: proxyUrl.port
					})
				};
				let tunnelAgent;
				const overHttps = proxyUrl.protocol === "https:";
				if (usingSsl) tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
				else tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
				agent = tunnelAgent(agentOptions);
				this._proxyAgent = agent;
			}
			if (!agent) {
				const options = {
					keepAlive: this._keepAlive,
					maxSockets
				};
				agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
				this._agent = agent;
			}
			if (usingSsl && this._ignoreSslError) agent.options = Object.assign(agent.options || {}, { rejectUnauthorized: false });
			return agent;
		}
		_getProxyAgentDispatcher(parsedUrl, proxyUrl) {
			let proxyAgent;
			if (this._keepAlive) proxyAgent = this._proxyAgentDispatcher;
			if (proxyAgent) return proxyAgent;
			const usingSsl = parsedUrl.protocol === "https:";
			proxyAgent = new undici_1.ProxyAgent(Object.assign({
				uri: proxyUrl.href,
				pipelining: !this._keepAlive ? 0 : 1
			}, (proxyUrl.username || proxyUrl.password) && { token: `Basic ${Buffer.from(`${proxyUrl.username}:${proxyUrl.password}`).toString("base64")}` }));
			this._proxyAgentDispatcher = proxyAgent;
			if (usingSsl && this._ignoreSslError) proxyAgent.options = Object.assign(proxyAgent.options.requestTls || {}, { rejectUnauthorized: false });
			return proxyAgent;
		}
		_getUserAgentWithOrchestrationId(userAgent) {
			const baseUserAgent = userAgent || "actions/http-client";
			const orchId = process.env["ACTIONS_ORCHESTRATION_ID"];
			if (orchId) return `${baseUserAgent} actions_orchestration_id/${orchId.replace(/[^a-z0-9_.-]/gi, "_")}`;
			return baseUserAgent;
		}
		_performExponentialBackoff(retryNumber) {
			return __awaiter(this, void 0, void 0, function* () {
				retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
				const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
				return new Promise((resolve) => setTimeout(() => resolve(), ms));
			});
		}
		_processResponse(res, options) {
			return __awaiter(this, void 0, void 0, function* () {
				return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
					const statusCode = res.message.statusCode || 0;
					const response = {
						statusCode,
						result: null,
						headers: {}
					};
					if (statusCode === HttpCodes.NotFound) resolve(response);
					function dateTimeDeserializer(key, value) {
						if (typeof value === "string") {
							const a = new Date(value);
							if (!isNaN(a.valueOf())) return a;
						}
						return value;
					}
					let obj;
					let contents;
					try {
						contents = yield res.readBody();
						if (contents && contents.length > 0) {
							if (options && options.deserializeDates) obj = JSON.parse(contents, dateTimeDeserializer);
							else obj = JSON.parse(contents);
							response.result = obj;
						}
						response.headers = res.message.headers;
					} catch (err) {}
					if (statusCode > 299) {
						let msg;
						if (obj && obj.message) msg = obj.message;
						else if (contents && contents.length > 0) msg = contents;
						else msg = `Failed request: (${statusCode})`;
						const err = new HttpClientError(msg, statusCode);
						err.result = response.result;
						reject(err);
					} else resolve(response);
				}));
			});
		}
	};
	exports.HttpClient = HttpClient;
	const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
})))(), 1);
var import_undici = require_undici();
var __awaiter = function(thisArg, _arguments, P, generator) {
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
function getProxyAgent(destinationUrl) {
	return new import_lib.HttpClient().getAgent(destinationUrl);
}
function getProxyAgentDispatcher(destinationUrl) {
	return new import_lib.HttpClient().getAgentDispatcher(destinationUrl);
}
function getProxyFetch(destinationUrl) {
	const httpDispatcher = getProxyAgentDispatcher(destinationUrl);
	const proxyFetch = (url, opts) => __awaiter(this, void 0, void 0, function* () {
		return (0, import_undici.fetch)(url, Object.assign(Object.assign({}, opts), { dispatcher: httpDispatcher }));
	});
	return proxyFetch;
}
function getApiBaseUrl() {
	return process.env["GITHUB_API_URL"] || "https://api.github.com";
}
//#endregion
//#region ../node_modules/.pnpm/universal-user-agent@7.0.3/node_modules/universal-user-agent/index.js
function getUserAgent() {
	if (typeof navigator === "object" && "userAgent" in navigator) return navigator.userAgent;
	if (typeof process === "object" && process.version !== void 0) return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
	return "<environment undetectable>";
}
//#endregion
//#region ../node_modules/.pnpm/before-after-hook@4.0.0/node_modules/before-after-hook/lib/register.js
function register(state, name, method, options) {
	if (typeof method !== "function") throw new Error("method for before hook must be a function");
	if (!options) options = {};
	if (Array.isArray(name)) return name.reverse().reduce((callback, name) => {
		return register.bind(null, state, name, callback, options);
	}, method)();
	return Promise.resolve().then(() => {
		if (!state.registry[name]) return method(options);
		return state.registry[name].reduce((method, registered) => {
			return registered.hook.bind(null, method, options);
		}, method)();
	});
}
//#endregion
//#region ../node_modules/.pnpm/before-after-hook@4.0.0/node_modules/before-after-hook/lib/add.js
function addHook(state, kind, name, hook) {
	const orig = hook;
	if (!state.registry[name]) state.registry[name] = [];
	if (kind === "before") hook = (method, options) => {
		return Promise.resolve().then(orig.bind(null, options)).then(method.bind(null, options));
	};
	if (kind === "after") hook = (method, options) => {
		let result;
		return Promise.resolve().then(method.bind(null, options)).then((result_) => {
			result = result_;
			return orig(result, options);
		}).then(() => {
			return result;
		});
	};
	if (kind === "error") hook = (method, options) => {
		return Promise.resolve().then(method.bind(null, options)).catch((error) => {
			return orig(error, options);
		});
	};
	state.registry[name].push({
		hook,
		orig
	});
}
//#endregion
//#region ../node_modules/.pnpm/before-after-hook@4.0.0/node_modules/before-after-hook/lib/remove.js
function removeHook(state, name, method) {
	if (!state.registry[name]) return;
	const index = state.registry[name].map((registered) => {
		return registered.orig;
	}).indexOf(method);
	if (index === -1) return;
	state.registry[name].splice(index, 1);
}
//#endregion
//#region ../node_modules/.pnpm/before-after-hook@4.0.0/node_modules/before-after-hook/index.js
const bind = Function.bind;
const bindable = bind.bind(bind);
function bindApi(hook, state, name) {
	const removeHookRef = bindable(removeHook, null).apply(null, name ? [state, name] : [state]);
	hook.api = { remove: removeHookRef };
	hook.remove = removeHookRef;
	[
		"before",
		"error",
		"after",
		"wrap"
	].forEach((kind) => {
		const args = name ? [
			state,
			kind,
			name
		] : [state, kind];
		hook[kind] = hook.api[kind] = bindable(addHook, null).apply(null, args);
	});
}
function Singular() {
	const singularHookName = Symbol("Singular");
	const singularHookState = { registry: {} };
	const singularHook = register.bind(null, singularHookState, singularHookName);
	bindApi(singularHook, singularHookState, singularHookName);
	return singularHook;
}
function Collection() {
	const state = { registry: {} };
	const hook = register.bind(null, state);
	bindApi(hook, state);
	return hook;
}
var before_after_hook_default = {
	Singular,
	Collection
};
//#endregion
//#region ../node_modules/.pnpm/@octokit+endpoint@11.0.3/node_modules/@octokit/endpoint/dist-bundle/index.js
var userAgent = `octokit-endpoint.js/0.0.0-development ${getUserAgent()}`;
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
function getValues(context, operator, key, modifier) {
	var value = context[key], result = [];
	if (isDefined(value) && value !== "") if (typeof value === "string" || typeof value === "number" || typeof value === "bigint" || typeof value === "boolean") {
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
function expand(template, context) {
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
				values.push(getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
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
	const remainingParameters = omit(parameters, Object.keys(options).filter((option) => urlVariableNames.includes(option)).concat("baseUrl"));
	if (!/application\/octet-stream/i.test(headers.accept)) {
		if (options.mediaType.format) headers.accept = headers.accept.split(/,/).map((format) => format.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${options.mediaType.format}`)).join(",");
		if (url.endsWith("/graphql")) {
			if (options.mediaType.previews?.length) headers.accept = (headers.accept.match(/(?<![\w-])[\w-]+(?=-preview)/g) || []).concat(options.mediaType.previews).map((preview) => {
				return `application/vnd.github.${preview}-preview${options.mediaType.format ? `.${options.mediaType.format}` : "+json"}`;
			}).join(",");
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
//#endregion
//#region ../node_modules/.pnpm/json-with-bigint@3.5.8/node_modules/json-with-bigint/json-with-bigint.js
var import_fast_content_type_parse = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	const NullObject = function NullObject() {};
	NullObject.prototype = Object.create(null);
	/**
	* RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
	*
	* parameter     = token "=" ( token / quoted-string )
	* token         = 1*tchar
	* tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
	*               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
	*               / DIGIT / ALPHA
	*               ; any VCHAR, except delimiters
	* quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
	* qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
	* obs-text      = %x80-FF
	* quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
	*/
	const paramRE = /; *([!#$%&'*+.^\w`|~-]+)=("(?:[\v\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\v\u0020-\u00ff])*"|[!#$%&'*+.^\w`|~-]+) */gu;
	/**
	* RegExp to match quoted-pair in RFC 7230 sec 3.2.6
	*
	* quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
	* obs-text    = %x80-FF
	*/
	const quotedPairRE = /\\([\v\u0020-\u00ff])/gu;
	/**
	* RegExp to match type in RFC 7231 sec 3.1.1.1
	*
	* media-type = type "/" subtype
	* type       = token
	* subtype    = token
	*/
	const mediaTypeRE = /^[!#$%&'*+.^\w|~-]+\/[!#$%&'*+.^\w|~-]+$/u;
	const defaultContentType = {
		type: "",
		parameters: new NullObject()
	};
	Object.freeze(defaultContentType.parameters);
	Object.freeze(defaultContentType);
	/**
	* Parse media type to object.
	*
	* @param {string|object} header
	* @return {Object}
	* @public
	*/
	function parse(header) {
		if (typeof header !== "string") throw new TypeError("argument header is required and must be a string");
		let index = header.indexOf(";");
		const type = index !== -1 ? header.slice(0, index).trim() : header.trim();
		if (mediaTypeRE.test(type) === false) throw new TypeError("invalid media type");
		const result = {
			type: type.toLowerCase(),
			parameters: new NullObject()
		};
		if (index === -1) return result;
		let key;
		let match;
		let value;
		paramRE.lastIndex = index;
		while (match = paramRE.exec(header)) {
			if (match.index !== index) throw new TypeError("invalid parameter format");
			index += match[0].length;
			key = match[1].toLowerCase();
			value = match[2];
			if (value[0] === "\"") {
				value = value.slice(1, value.length - 1);
				quotedPairRE.test(value) && (value = value.replace(quotedPairRE, "$1"));
			}
			result.parameters[key] = value;
		}
		if (index !== header.length) throw new TypeError("invalid parameter format");
		return result;
	}
	function safeParse(header) {
		if (typeof header !== "string") return defaultContentType;
		let index = header.indexOf(";");
		const type = index !== -1 ? header.slice(0, index).trim() : header.trim();
		if (mediaTypeRE.test(type) === false) return defaultContentType;
		const result = {
			type: type.toLowerCase(),
			parameters: new NullObject()
		};
		if (index === -1) return result;
		let key;
		let match;
		let value;
		paramRE.lastIndex = index;
		while (match = paramRE.exec(header)) {
			if (match.index !== index) return defaultContentType;
			index += match[0].length;
			key = match[1].toLowerCase();
			value = match[2];
			if (value[0] === "\"") {
				value = value.slice(1, value.length - 1);
				quotedPairRE.test(value) && (value = value.replace(quotedPairRE, "$1"));
			}
			result.parameters[key] = value;
		}
		if (index !== header.length) return defaultContentType;
		return result;
	}
	module.exports.default = {
		parse,
		safeParse
	};
	module.exports.parse = parse;
	module.exports.safeParse = safeParse;
	module.exports.defaultContentType = defaultContentType;
})))();
const intRegex = /^-?\d+$/;
const noiseValue = /^-?\d+n+$/;
const originalStringify = JSON.stringify;
const originalParse = JSON.parse;
const customFormat = /^-?\d+n$/;
const bigIntsStringify = /([\[:])?"(-?\d+)n"($|([\\n]|\s)*(\s|[\\n])*[,\}\]])/g;
const noiseStringify = /([\[:])?("-?\d+n+)n("$|"([\\n]|\s)*(\s|[\\n])*[,\}\]])/g;
/**
* @typedef {(this: any, key: string | number | undefined, value: any) => any} Replacer
* @typedef {(key: string | number | undefined, value: any, context?: { source: string }) => any} Reviver
*/
/**
* Converts a JavaScript value to a JSON string.
*
* Supports serialization of BigInt values using two strategies:
* 1. Custom format "123n" → "123" (universal fallback)
* 2. Native JSON.rawJSON() (Node.js 22+, fastest) when available
*
* All other values are serialized exactly like native JSON.stringify().
*
* @param {*} value The value to convert to a JSON string.
* @param {Replacer | Array<string | number> | null} [replacer]
*   A function that alters the behavior of the stringification process,
*   or an array of strings/numbers to indicate properties to exclude.
* @param {string | number} [space]
*   A string or number to specify indentation or pretty-printing.
* @returns {string} The JSON string representation.
*/
const JSONStringify = (value, replacer, space) => {
	if ("rawJSON" in JSON) return originalStringify(value, (key, value) => {
		if (typeof value === "bigint") return JSON.rawJSON(value.toString());
		if (typeof replacer === "function") return replacer(key, value);
		if (Array.isArray(replacer) && replacer.includes(key)) return value;
		return value;
	}, space);
	if (!value) return originalStringify(value, replacer, space);
	return originalStringify(value, (key, value) => {
		if (typeof value === "string" && noiseValue.test(value)) return value.toString() + "n";
		if (typeof value === "bigint") return value.toString() + "n";
		if (typeof replacer === "function") return replacer(key, value);
		if (Array.isArray(replacer) && replacer.includes(key)) return value;
		return value;
	}, space).replace(bigIntsStringify, "$1$2$3").replace(noiseStringify, "$1$2$3");
};
const featureCache = /* @__PURE__ */ new Map();
/**
* Detects if the current JSON.parse implementation supports the context.source feature.
*
* Uses toString() fingerprinting to cache results and automatically detect runtime
* replacements of JSON.parse (polyfills, mocks, etc.).
*
* @returns {boolean} true if context.source is supported, false otherwise.
*/
const isContextSourceSupported = () => {
	const parseFingerprint = JSON.parse.toString();
	if (featureCache.has(parseFingerprint)) return featureCache.get(parseFingerprint);
	try {
		const result = JSON.parse("1", (_, __, context) => !!context?.source && context.source === "1");
		featureCache.set(parseFingerprint, result);
		return result;
	} catch {
		featureCache.set(parseFingerprint, false);
		return false;
	}
};
/**
* Reviver function that converts custom-format BigInt strings back to BigInt values.
* Also handles "noise" strings that accidentally match the BigInt format.
*
* @param {string | number | undefined} key The object key.
* @param {*} value The value being parsed.
* @param {object} [context] Parse context (if supported by JSON.parse).
* @param {Reviver} [userReviver] User's custom reviver function.
* @returns {any} The transformed value.
*/
const convertMarkedBigIntsReviver = (key, value, context, userReviver) => {
	if (typeof value === "string" && customFormat.test(value)) return BigInt(value.slice(0, -1));
	if (typeof value === "string" && noiseValue.test(value)) return value.slice(0, -1);
	if (typeof userReviver !== "function") return value;
	return userReviver(key, value, context);
};
/**
* Fast JSON.parse implementation (~2x faster than classic fallback).
* Uses JSON.parse's context.source feature to detect integers and convert
* large numbers directly to BigInt without string manipulation.
*
* Does not support legacy custom format from v1 of this library.
*
* @param {string} text JSON string to parse.
* @param {Reviver} [reviver] Transform function to apply to each value.
* @returns {any} Parsed JavaScript value.
*/
const JSONParseV2 = (text, reviver) => {
	return JSON.parse(text, (key, value, context) => {
		const isBigNumber = typeof value === "number" && (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER);
		const isInt = context && intRegex.test(context.source);
		if (isBigNumber && isInt) return BigInt(context.source);
		if (typeof reviver !== "function") return value;
		return reviver(key, value, context);
	});
};
const MAX_INT = Number.MAX_SAFE_INTEGER.toString();
const MAX_DIGITS = MAX_INT.length;
const stringsOrLargeNumbers = /"(?:\\.|[^"])*"|-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?/g;
const noiseValueWithQuotes = /^"-?\d+n+"$/;
/**
* Converts a JSON string into a JavaScript value.
*
* Supports parsing of large integers using two strategies:
* 1. Classic fallback: Marks large numbers with "123n" format, then converts to BigInt
* 2. Fast path (JSONParseV2): Uses context.source feature (~2x faster) when available
*
* All other JSON values are parsed exactly like native JSON.parse().
*
* @param {string} text A valid JSON string.
* @param {Reviver} [reviver]
*   A function that transforms the results. This function is called for each member
*   of the object. If a member contains nested objects, the nested objects are
*   transformed before the parent object is.
* @returns {any} The parsed JavaScript value.
* @throws {SyntaxError} If text is not valid JSON.
*/
const JSONParse = (text, reviver) => {
	if (!text) return originalParse(text, reviver);
	if (isContextSourceSupported()) return JSONParseV2(text, reviver);
	return originalParse(text.replace(stringsOrLargeNumbers, (text, digits, fractional, exponential) => {
		const isString = text[0] === "\"";
		if (isString && noiseValueWithQuotes.test(text)) return text.substring(0, text.length - 1) + "n\"";
		const isFractionalOrExponential = fractional || exponential;
		const isLessThanMaxSafeInt = digits && (digits.length < MAX_DIGITS || digits.length === MAX_DIGITS && digits <= MAX_INT);
		if (isString || isFractionalOrExponential || isLessThanMaxSafeInt) return text;
		return "\"" + text + "n\"";
	}), (key, value, context) => convertMarkedBigIntsReviver(key, value, context, reviver));
};
//#endregion
//#region ../node_modules/.pnpm/@octokit+request-error@7.1.0/node_modules/@octokit/request-error/dist-src/index.js
var RequestError = class extends Error {
	name;
	/**
	* http status code
	*/
	status;
	/**
	* Request options that lead to the error.
	*/
	request;
	/**
	* Response object if a response was received
	*/
	response;
	constructor(message, statusCode, options) {
		super(message, { cause: options.cause });
		this.name = "HttpError";
		this.status = Number.parseInt(statusCode);
		if (Number.isNaN(this.status)) this.status = 0;
		/* v8 ignore else -- @preserve -- Bug with vitest coverage where it sees an else branch that doesn't exist */
		if ("response" in options) this.response = options.response;
		const requestCopy = Object.assign({}, options.request);
		if (options.request.headers.authorization) requestCopy.headers = Object.assign({}, options.request.headers, { authorization: options.request.headers.authorization.replace(/(?<! ) .*$/, " [REDACTED]") });
		requestCopy.url = requestCopy.url.replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]").replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
		this.request = requestCopy;
	}
};
//#endregion
//#region ../node_modules/.pnpm/@octokit+request@10.0.8/node_modules/@octokit/request/dist-bundle/index.js
var VERSION$4 = "10.0.8";
var defaults_default = { headers: { "user-agent": `octokit-request.js/${VERSION$4} ${getUserAgent()}` } };
function isPlainObject(value) {
	if (typeof value !== "object" || value === null) return false;
	if (Object.prototype.toString.call(value) !== "[object Object]") return false;
	const proto = Object.getPrototypeOf(value);
	if (proto === null) return true;
	const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
	return typeof Ctor === "function" && Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value);
}
var noop$1 = () => "";
async function fetchWrapper(requestOptions) {
	const fetch = requestOptions.request?.fetch || globalThis.fetch;
	if (!fetch) throw new Error("fetch is not set. Please pass a fetch implementation as new Octokit({ request: { fetch }}). Learn more at https://github.com/octokit/octokit.js/#fetch-missing");
	const log = requestOptions.request?.log || console;
	const parseSuccessResponseBody = requestOptions.request?.parseSuccessResponseBody !== false;
	const body = isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body) ? JSONStringify(requestOptions.body) : requestOptions.body;
	const requestHeaders = Object.fromEntries(Object.entries(requestOptions.headers).map(([name, value]) => [name, String(value)]));
	let fetchResponse;
	try {
		fetchResponse = await fetch(requestOptions.url, {
			method: requestOptions.method,
			body,
			redirect: requestOptions.request?.redirect,
			headers: requestHeaders,
			signal: requestOptions.request?.signal,
			...requestOptions.body && { duplex: "half" }
		});
	} catch (error) {
		let message = "Unknown Error";
		if (error instanceof Error) {
			if (error.name === "AbortError") {
				error.status = 500;
				throw error;
			}
			message = error.message;
			if (error.name === "TypeError" && "cause" in error) {
				if (error.cause instanceof Error) message = error.cause.message;
				else if (typeof error.cause === "string") message = error.cause;
			}
		}
		const requestError = new RequestError(message, 500, { request: requestOptions });
		requestError.cause = error;
		throw requestError;
	}
	const status = fetchResponse.status;
	const url = fetchResponse.url;
	const responseHeaders = {};
	for (const [key, value] of fetchResponse.headers) responseHeaders[key] = value;
	const octokitResponse = {
		url,
		status,
		headers: responseHeaders,
		data: ""
	};
	if ("deprecation" in responseHeaders) {
		const matches = responseHeaders.link && responseHeaders.link.match(/<([^<>]+)>; rel="deprecation"/);
		const deprecationLink = matches && matches.pop();
		log.warn(`[@octokit/request] "${requestOptions.method} ${requestOptions.url}" is deprecated. It is scheduled to be removed on ${responseHeaders.sunset}${deprecationLink ? `. See ${deprecationLink}` : ""}`);
	}
	if (status === 204 || status === 205) return octokitResponse;
	if (requestOptions.method === "HEAD") {
		if (status < 400) return octokitResponse;
		throw new RequestError(fetchResponse.statusText, status, {
			response: octokitResponse,
			request: requestOptions
		});
	}
	if (status === 304) {
		octokitResponse.data = await getResponseData(fetchResponse);
		throw new RequestError("Not modified", status, {
			response: octokitResponse,
			request: requestOptions
		});
	}
	if (status >= 400) {
		octokitResponse.data = await getResponseData(fetchResponse);
		throw new RequestError(toErrorMessage(octokitResponse.data), status, {
			response: octokitResponse,
			request: requestOptions
		});
	}
	octokitResponse.data = parseSuccessResponseBody ? await getResponseData(fetchResponse) : fetchResponse.body;
	return octokitResponse;
}
async function getResponseData(response) {
	const contentType = response.headers.get("content-type");
	if (!contentType) return response.text().catch(noop$1);
	const mimetype = (0, import_fast_content_type_parse.safeParse)(contentType);
	if (isJSONResponse(mimetype)) {
		let text = "";
		try {
			text = await response.text();
			return JSONParse(text);
		} catch (err) {
			return text;
		}
	} else if (mimetype.type.startsWith("text/") || mimetype.parameters.charset?.toLowerCase() === "utf-8") return response.text().catch(noop$1);
	else return response.arrayBuffer().catch(
		/* v8 ignore next -- @preserve */
		() => /* @__PURE__ */ new ArrayBuffer(0)
	);
}
function isJSONResponse(mimetype) {
	return mimetype.type === "application/json" || mimetype.type === "application/scim+json";
}
function toErrorMessage(data) {
	if (typeof data === "string") return data;
	if (data instanceof ArrayBuffer) return "Unknown error";
	if ("message" in data) {
		const suffix = "documentation_url" in data ? ` - ${data.documentation_url}` : "";
		return Array.isArray(data.errors) ? `${data.message}: ${data.errors.map((v) => JSON.stringify(v)).join(", ")}${suffix}` : `${data.message}${suffix}`;
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
var request = withDefaults$1(endpoint, defaults_default);
/* v8 ignore next -- @preserve */
/* v8 ignore else -- @preserve */
//#endregion
//#region ../node_modules/.pnpm/@octokit+graphql@9.0.3/node_modules/@octokit/graphql/dist-bundle/index.js
var VERSION$3 = "0.0.0-development";
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
		this.errors = response.errors;
		this.data = response.data;
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
	}
	name = "GraphqlResponseError";
	errors;
	data;
};
var NON_VARIABLE_OPTIONS = [
	"method",
	"baseUrl",
	"url",
	"headers",
	"request",
	"query",
	"mediaType",
	"operationName"
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
	const baseUrl = parsedOptions.baseUrl || request2.endpoint.DEFAULTS.baseUrl;
	if (GHES_V3_SUFFIX_REGEX.test(baseUrl)) requestOptions.url = baseUrl.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
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
withDefaults(request, {
	headers: { "user-agent": `octokit-graphql.js/${VERSION$3} ${getUserAgent()}` },
	method: "POST",
	url: "/graphql"
});
function withCustomRequest(customRequest) {
	return withDefaults(customRequest, {
		method: "POST",
		url: "/graphql"
	});
}
//#endregion
//#region ../node_modules/.pnpm/@octokit+auth-token@6.0.0/node_modules/@octokit/auth-token/dist-bundle/index.js
var b64url = "(?:[a-zA-Z0-9_-]+)";
var sep = "\\.";
var jwtRE = new RegExp(`^${b64url}${sep}${b64url}${sep}${b64url}$`);
var isJWT = jwtRE.test.bind(jwtRE);
async function auth(token) {
	const isApp = isJWT(token);
	const isInstallation = token.startsWith("v1.") || token.startsWith("ghs_");
	const isUserToServer = token.startsWith("ghu_");
	return {
		type: "token",
		token,
		tokenType: isApp ? "app" : isInstallation ? "installation" : isUserToServer ? "user-to-server" : "oauth"
	};
}
function withAuthorizationPrefix(token) {
	if (token.split(/\./).length === 3) return `bearer ${token}`;
	return `token ${token}`;
}
async function hook(token, request, route, parameters) {
	const endpoint = request.endpoint.merge(route, parameters);
	endpoint.headers.authorization = withAuthorizationPrefix(token);
	return request(endpoint);
}
var createTokenAuth = function createTokenAuth2(token) {
	if (!token) throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
	if (typeof token !== "string") throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");
	token = token.replace(/^(token|bearer) +/i, "");
	return Object.assign(auth.bind(null, token), { hook: hook.bind(null, token) });
};
//#endregion
//#region ../node_modules/.pnpm/@octokit+core@7.0.6/node_modules/@octokit/core/dist-src/version.js
const VERSION$2 = "7.0.6";
//#endregion
//#region ../node_modules/.pnpm/@octokit+core@7.0.6/node_modules/@octokit/core/dist-src/index.js
const noop = () => {};
const consoleWarn = console.warn.bind(console);
const consoleError = console.error.bind(console);
function createLogger(logger = {}) {
	if (typeof logger.debug !== "function") logger.debug = noop;
	if (typeof logger.info !== "function") logger.info = noop;
	if (typeof logger.warn !== "function") logger.warn = consoleWarn;
	if (typeof logger.error !== "function") logger.error = consoleError;
	return logger;
}
const userAgentTrail = `octokit-core.js/${VERSION$2} ${getUserAgent()}`;
var Octokit = class {
	static VERSION = VERSION$2;
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
	static plugins = [];
	/**
	* Attach a plugin (or many) to your Octokit instance.
	*
	* @example
	* const API = Octokit.plugin(plugin1, plugin2, plugin3, ...)
	*/
	static plugin(...newPlugins) {
		const currentPlugins = this.plugins;
		const NewOctokit = class extends this {
			static plugins = currentPlugins.concat(newPlugins.filter((plugin) => !currentPlugins.includes(plugin)));
		};
		return NewOctokit;
	}
	constructor(options = {}) {
		const hook = new before_after_hook_default.Collection();
		const requestDefaults = {
			baseUrl: request.endpoint.DEFAULTS.baseUrl,
			headers: {},
			request: Object.assign({}, options.request, { hook: hook.bind(null, "request") }),
			mediaType: {
				previews: [],
				format: ""
			}
		};
		requestDefaults.headers["user-agent"] = options.userAgent ? `${options.userAgent} ${userAgentTrail}` : userAgentTrail;
		if (options.baseUrl) requestDefaults.baseUrl = options.baseUrl;
		if (options.previews) requestDefaults.mediaType.previews = options.previews;
		if (options.timeZone) requestDefaults.headers["time-zone"] = options.timeZone;
		this.request = request.defaults(requestDefaults);
		this.graphql = withCustomRequest(this.request).defaults(requestDefaults);
		this.log = createLogger(options.log);
		this.hook = hook;
		if (!options.authStrategy) if (!options.auth) this.auth = async () => ({ type: "unauthenticated" });
		else {
			const auth = createTokenAuth(options.auth);
			hook.wrap("request", auth.hook);
			this.auth = auth;
		}
		else {
			const { authStrategy, ...otherOptions } = options;
			const auth = authStrategy(Object.assign({
				request: this.request,
				log: this.log,
				octokit: this,
				octokitOptions: otherOptions
			}, options.auth));
			hook.wrap("request", auth.hook);
			this.auth = auth;
		}
		const classConstructor = this.constructor;
		for (let i = 0; i < classConstructor.plugins.length; ++i) Object.assign(this, classConstructor.plugins[i](this, options));
	}
	request;
	graphql;
	log;
	hook;
	auth;
};
//#endregion
//#region ../node_modules/.pnpm/@octokit+plugin-rest-endpoint-methods@17.0.0_@octokit+core@7.0.6/node_modules/@octokit/plugin-rest-endpoint-methods/dist-src/version.js
const VERSION$1 = "17.0.0";
//#endregion
//#region ../node_modules/.pnpm/@octokit+plugin-rest-endpoint-methods@17.0.0_@octokit+core@7.0.6/node_modules/@octokit/plugin-rest-endpoint-methods/dist-src/generated/endpoints.js
var endpoints_default = {
	actions: {
		addCustomLabelsToSelfHostedRunnerForOrg: ["POST /orgs/{org}/actions/runners/{runner_id}/labels"],
		addCustomLabelsToSelfHostedRunnerForRepo: ["POST /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"],
		addRepoAccessToSelfHostedRunnerGroupInOrg: ["PUT /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories/{repository_id}"],
		addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
		addSelectedRepoToOrgVariable: ["PUT /orgs/{org}/actions/variables/{name}/repositories/{repository_id}"],
		approveWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve"],
		cancelWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel"],
		createEnvironmentVariable: ["POST /repos/{owner}/{repo}/environments/{environment_name}/variables"],
		createHostedRunnerForOrg: ["POST /orgs/{org}/actions/hosted-runners"],
		createOrUpdateEnvironmentSecret: ["PUT /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}"],
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
		deleteCustomImageFromOrg: ["DELETE /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}"],
		deleteCustomImageVersionFromOrg: ["DELETE /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions/{version}"],
		deleteEnvironmentSecret: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}"],
		deleteEnvironmentVariable: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}"],
		deleteHostedRunnerForOrg: ["DELETE /orgs/{org}/actions/hosted-runners/{hosted_runner_id}"],
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
		getCustomImageForOrg: ["GET /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}"],
		getCustomImageVersionForOrg: ["GET /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions/{version}"],
		getCustomOidcSubClaimForRepo: ["GET /repos/{owner}/{repo}/actions/oidc/customization/sub"],
		getEnvironmentPublicKey: ["GET /repos/{owner}/{repo}/environments/{environment_name}/secrets/public-key"],
		getEnvironmentSecret: ["GET /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}"],
		getEnvironmentVariable: ["GET /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}"],
		getGithubActionsDefaultWorkflowPermissionsOrganization: ["GET /orgs/{org}/actions/permissions/workflow"],
		getGithubActionsDefaultWorkflowPermissionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions/workflow"],
		getGithubActionsPermissionsOrganization: ["GET /orgs/{org}/actions/permissions"],
		getGithubActionsPermissionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions"],
		getHostedRunnerForOrg: ["GET /orgs/{org}/actions/hosted-runners/{hosted_runner_id}"],
		getHostedRunnersGithubOwnedImagesForOrg: ["GET /orgs/{org}/actions/hosted-runners/images/github-owned"],
		getHostedRunnersLimitsForOrg: ["GET /orgs/{org}/actions/hosted-runners/limits"],
		getHostedRunnersMachineSpecsForOrg: ["GET /orgs/{org}/actions/hosted-runners/machine-sizes"],
		getHostedRunnersPartnerImagesForOrg: ["GET /orgs/{org}/actions/hosted-runners/images/partner"],
		getHostedRunnersPlatformsForOrg: ["GET /orgs/{org}/actions/hosted-runners/platforms"],
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
		listCustomImageVersionsForOrg: ["GET /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions"],
		listCustomImagesForOrg: ["GET /orgs/{org}/actions/hosted-runners/images/custom"],
		listEnvironmentSecrets: ["GET /repos/{owner}/{repo}/environments/{environment_name}/secrets"],
		listEnvironmentVariables: ["GET /repos/{owner}/{repo}/environments/{environment_name}/variables"],
		listGithubHostedRunnersInGroupForOrg: ["GET /orgs/{org}/actions/runner-groups/{runner_group_id}/hosted-runners"],
		listHostedRunnersForOrg: ["GET /orgs/{org}/actions/hosted-runners"],
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
		updateEnvironmentVariable: ["PATCH /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}"],
		updateHostedRunnerForOrg: ["PATCH /orgs/{org}/actions/hosted-runners/{hosted_runner_id}"],
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
		getGithubBillingPremiumRequestUsageReportOrg: ["GET /organizations/{org}/settings/billing/premium_request/usage"],
		getGithubBillingPremiumRequestUsageReportUser: ["GET /users/{username}/settings/billing/premium_request/usage"],
		getGithubBillingUsageReportOrg: ["GET /organizations/{org}/settings/billing/usage"],
		getGithubBillingUsageReportUser: ["GET /users/{username}/settings/billing/usage"],
		getGithubPackagesBillingOrg: ["GET /orgs/{org}/settings/billing/packages"],
		getGithubPackagesBillingUser: ["GET /users/{username}/settings/billing/packages"],
		getSharedStorageBillingOrg: ["GET /orgs/{org}/settings/billing/shared-storage"],
		getSharedStorageBillingUser: ["GET /users/{username}/settings/billing/shared-storage"]
	},
	campaigns: {
		createCampaign: ["POST /orgs/{org}/campaigns"],
		deleteCampaign: ["DELETE /orgs/{org}/campaigns/{campaign_number}"],
		getCampaignSummary: ["GET /orgs/{org}/campaigns/{campaign_number}"],
		listOrgCampaigns: ["GET /orgs/{org}/campaigns"],
		updateCampaign: ["PATCH /orgs/{org}/campaigns/{campaign_number}"]
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
		commitAutofix: ["POST /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix/commits"],
		createAutofix: ["POST /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix"],
		createVariantAnalysis: ["POST /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses"],
		deleteAnalysis: ["DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}"],
		deleteCodeqlDatabase: ["DELETE /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}"],
		getAlert: [
			"GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}",
			{},
			{ renamedParameters: { alert_id: "alert_number" } }
		],
		getAnalysis: ["GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}"],
		getAutofix: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix"],
		getCodeqlDatabase: ["GET /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}"],
		getDefaultSetup: ["GET /repos/{owner}/{repo}/code-scanning/default-setup"],
		getSarif: ["GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}"],
		getVariantAnalysis: ["GET /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}"],
		getVariantAnalysisRepoTask: ["GET /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}/repos/{repo_owner}/{repo_name}"],
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
	codeSecurity: {
		attachConfiguration: ["POST /orgs/{org}/code-security/configurations/{configuration_id}/attach"],
		attachEnterpriseConfiguration: ["POST /enterprises/{enterprise}/code-security/configurations/{configuration_id}/attach"],
		createConfiguration: ["POST /orgs/{org}/code-security/configurations"],
		createConfigurationForEnterprise: ["POST /enterprises/{enterprise}/code-security/configurations"],
		deleteConfiguration: ["DELETE /orgs/{org}/code-security/configurations/{configuration_id}"],
		deleteConfigurationForEnterprise: ["DELETE /enterprises/{enterprise}/code-security/configurations/{configuration_id}"],
		detachConfiguration: ["DELETE /orgs/{org}/code-security/configurations/detach"],
		getConfiguration: ["GET /orgs/{org}/code-security/configurations/{configuration_id}"],
		getConfigurationForRepository: ["GET /repos/{owner}/{repo}/code-security-configuration"],
		getConfigurationsForEnterprise: ["GET /enterprises/{enterprise}/code-security/configurations"],
		getConfigurationsForOrg: ["GET /orgs/{org}/code-security/configurations"],
		getDefaultConfigurations: ["GET /orgs/{org}/code-security/configurations/defaults"],
		getDefaultConfigurationsForEnterprise: ["GET /enterprises/{enterprise}/code-security/configurations/defaults"],
		getRepositoriesForConfiguration: ["GET /orgs/{org}/code-security/configurations/{configuration_id}/repositories"],
		getRepositoriesForEnterpriseConfiguration: ["GET /enterprises/{enterprise}/code-security/configurations/{configuration_id}/repositories"],
		getSingleConfigurationForEnterprise: ["GET /enterprises/{enterprise}/code-security/configurations/{configuration_id}"],
		setConfigurationAsDefault: ["PUT /orgs/{org}/code-security/configurations/{configuration_id}/defaults"],
		setConfigurationAsDefaultForEnterprise: ["PUT /enterprises/{enterprise}/code-security/configurations/{configuration_id}/defaults"],
		updateConfiguration: ["PATCH /orgs/{org}/code-security/configurations/{configuration_id}"],
		updateEnterpriseConfiguration: ["PATCH /enterprises/{enterprise}/code-security/configurations/{configuration_id}"]
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
		copilotMetricsForOrganization: ["GET /orgs/{org}/copilot/metrics"],
		copilotMetricsForTeam: ["GET /orgs/{org}/team/{team_slug}/copilot/metrics"],
		getCopilotOrganizationDetails: ["GET /orgs/{org}/copilot/billing"],
		getCopilotSeatDetailsForUser: ["GET /orgs/{org}/members/{username}/copilot"],
		listCopilotSeats: ["GET /orgs/{org}/copilot/billing/seats"]
	},
	credentials: { revoke: ["POST /credentials/revoke"] },
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
		repositoryAccessForOrg: ["GET /organizations/{org}/dependabot/repository-access"],
		setRepositoryAccessDefaultLevel: ["PUT /organizations/{org}/dependabot/repository-access/default-level"],
		setSelectedReposForOrgSecret: ["PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories"],
		updateAlert: ["PATCH /repos/{owner}/{repo}/dependabot/alerts/{alert_number}"],
		updateRepositoryAccessForOrg: ["PATCH /organizations/{org}/dependabot/repository-access"]
	},
	dependencyGraph: {
		createRepositorySnapshot: ["POST /repos/{owner}/{repo}/dependency-graph/snapshots"],
		diffRange: ["GET /repos/{owner}/{repo}/dependency-graph/compare/{basehead}"],
		exportSbom: ["GET /repos/{owner}/{repo}/dependency-graph/sbom"]
	},
	emojis: { get: ["GET /emojis"] },
	enterpriseTeamMemberships: {
		add: ["PUT /enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}"],
		bulkAdd: ["POST /enterprises/{enterprise}/teams/{enterprise-team}/memberships/add"],
		bulkRemove: ["POST /enterprises/{enterprise}/teams/{enterprise-team}/memberships/remove"],
		get: ["GET /enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}"],
		list: ["GET /enterprises/{enterprise}/teams/{enterprise-team}/memberships"],
		remove: ["DELETE /enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}"]
	},
	enterpriseTeamOrganizations: {
		add: ["PUT /enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}"],
		bulkAdd: ["POST /enterprises/{enterprise}/teams/{enterprise-team}/organizations/add"],
		bulkRemove: ["POST /enterprises/{enterprise}/teams/{enterprise-team}/organizations/remove"],
		delete: ["DELETE /enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}"],
		getAssignment: ["GET /enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}"],
		getAssignments: ["GET /enterprises/{enterprise}/teams/{enterprise-team}/organizations"]
	},
	enterpriseTeams: {
		create: ["POST /enterprises/{enterprise}/teams"],
		delete: ["DELETE /enterprises/{enterprise}/teams/{team_slug}"],
		get: ["GET /enterprises/{enterprise}/teams/{team_slug}"],
		list: ["GET /enterprises/{enterprise}/teams"],
		update: ["PATCH /enterprises/{enterprise}/teams/{team_slug}"]
	},
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
	hostedCompute: {
		createNetworkConfigurationForOrg: ["POST /orgs/{org}/settings/network-configurations"],
		deleteNetworkConfigurationFromOrg: ["DELETE /orgs/{org}/settings/network-configurations/{network_configuration_id}"],
		getNetworkConfigurationForOrg: ["GET /orgs/{org}/settings/network-configurations/{network_configuration_id}"],
		getNetworkSettingsForOrg: ["GET /orgs/{org}/settings/network-settings/{network_settings_id}"],
		listNetworkConfigurationsForOrg: ["GET /orgs/{org}/settings/network-configurations"],
		updateNetworkConfigurationForOrg: ["PATCH /orgs/{org}/settings/network-configurations/{network_configuration_id}"]
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
		addBlockedByDependency: ["POST /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by"],
		addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
		addSubIssue: ["POST /repos/{owner}/{repo}/issues/{issue_number}/sub_issues"],
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
		getParent: ["GET /repos/{owner}/{repo}/issues/{issue_number}/parent"],
		list: ["GET /issues"],
		listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
		listComments: ["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"],
		listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
		listDependenciesBlockedBy: ["GET /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by"],
		listDependenciesBlocking: ["GET /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocking"],
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
		listSubIssues: ["GET /repos/{owner}/{repo}/issues/{issue_number}/sub_issues"],
		lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
		removeAllLabels: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels"],
		removeAssignees: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
		removeDependencyBlockedBy: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by/{issue_id}"],
		removeLabel: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}"],
		removeSubIssue: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/sub_issue"],
		reprioritizeSubIssue: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}/sub_issues/priority"],
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
		deleteArchiveForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/archive"],
		deleteArchiveForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/archive"],
		downloadArchiveForOrg: ["GET /orgs/{org}/migrations/{migration_id}/archive"],
		getArchiveForAuthenticatedUser: ["GET /user/migrations/{migration_id}/archive"],
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
		startForAuthenticatedUser: ["POST /user/migrations"],
		startForOrg: ["POST /orgs/{org}/migrations"],
		unlockRepoForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock"],
		unlockRepoForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock"]
	},
	oidc: {
		getOidcCustomSubTemplateForOrg: ["GET /orgs/{org}/actions/oidc/customization/sub"],
		updateOidcCustomSubTemplateForOrg: ["PUT /orgs/{org}/actions/oidc/customization/sub"]
	},
	orgs: {
		addSecurityManagerTeam: [
			"PUT /orgs/{org}/security-managers/teams/{team_slug}",
			{},
			{ deprecated: "octokit.rest.orgs.addSecurityManagerTeam() is deprecated, see https://docs.github.com/rest/orgs/security-managers#add-a-security-manager-team" }
		],
		assignTeamToOrgRole: ["PUT /orgs/{org}/organization-roles/teams/{team_slug}/{role_id}"],
		assignUserToOrgRole: ["PUT /orgs/{org}/organization-roles/users/{username}/{role_id}"],
		blockUser: ["PUT /orgs/{org}/blocks/{username}"],
		cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
		checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
		checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
		checkPublicMembershipForUser: ["GET /orgs/{org}/public_members/{username}"],
		convertMemberToOutsideCollaborator: ["PUT /orgs/{org}/outside_collaborators/{username}"],
		createArtifactStorageRecord: ["POST /orgs/{org}/artifacts/metadata/storage-record"],
		createInvitation: ["POST /orgs/{org}/invitations"],
		createIssueType: ["POST /orgs/{org}/issue-types"],
		createWebhook: ["POST /orgs/{org}/hooks"],
		customPropertiesForOrgsCreateOrUpdateOrganizationValues: ["PATCH /organizations/{org}/org-properties/values"],
		customPropertiesForOrgsGetOrganizationValues: ["GET /organizations/{org}/org-properties/values"],
		customPropertiesForReposCreateOrUpdateOrganizationDefinition: ["PUT /orgs/{org}/properties/schema/{custom_property_name}"],
		customPropertiesForReposCreateOrUpdateOrganizationDefinitions: ["PATCH /orgs/{org}/properties/schema"],
		customPropertiesForReposCreateOrUpdateOrganizationValues: ["PATCH /orgs/{org}/properties/values"],
		customPropertiesForReposDeleteOrganizationDefinition: ["DELETE /orgs/{org}/properties/schema/{custom_property_name}"],
		customPropertiesForReposGetOrganizationDefinition: ["GET /orgs/{org}/properties/schema/{custom_property_name}"],
		customPropertiesForReposGetOrganizationDefinitions: ["GET /orgs/{org}/properties/schema"],
		customPropertiesForReposGetOrganizationValues: ["GET /orgs/{org}/properties/values"],
		delete: ["DELETE /orgs/{org}"],
		deleteAttestationsBulk: ["POST /orgs/{org}/attestations/delete-request"],
		deleteAttestationsById: ["DELETE /orgs/{org}/attestations/{attestation_id}"],
		deleteAttestationsBySubjectDigest: ["DELETE /orgs/{org}/attestations/digest/{subject_digest}"],
		deleteIssueType: ["DELETE /orgs/{org}/issue-types/{issue_type_id}"],
		deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
		disableSelectedRepositoryImmutableReleasesOrganization: ["DELETE /orgs/{org}/settings/immutable-releases/repositories/{repository_id}"],
		enableSelectedRepositoryImmutableReleasesOrganization: ["PUT /orgs/{org}/settings/immutable-releases/repositories/{repository_id}"],
		get: ["GET /orgs/{org}"],
		getImmutableReleasesSettings: ["GET /orgs/{org}/settings/immutable-releases"],
		getImmutableReleasesSettingsRepositories: ["GET /orgs/{org}/settings/immutable-releases/repositories"],
		getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
		getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
		getOrgRole: ["GET /orgs/{org}/organization-roles/{role_id}"],
		getOrgRulesetHistory: ["GET /orgs/{org}/rulesets/{ruleset_id}/history"],
		getOrgRulesetVersion: ["GET /orgs/{org}/rulesets/{ruleset_id}/history/{version_id}"],
		getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
		getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
		getWebhookDelivery: ["GET /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}"],
		list: ["GET /organizations"],
		listAppInstallations: ["GET /orgs/{org}/installations"],
		listArtifactStorageRecords: ["GET /orgs/{org}/artifacts/{subject_digest}/metadata/storage-records"],
		listAttestationRepositories: ["GET /orgs/{org}/attestations/repositories"],
		listAttestations: ["GET /orgs/{org}/attestations/{subject_digest}"],
		listAttestationsBulk: ["POST /orgs/{org}/attestations/bulk-list{?per_page,before,after}"],
		listBlockedUsers: ["GET /orgs/{org}/blocks"],
		listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
		listForAuthenticatedUser: ["GET /user/orgs"],
		listForUser: ["GET /users/{username}/orgs"],
		listInvitationTeams: ["GET /orgs/{org}/invitations/{invitation_id}/teams"],
		listIssueTypes: ["GET /orgs/{org}/issue-types"],
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
		listSecurityManagerTeams: [
			"GET /orgs/{org}/security-managers",
			{},
			{ deprecated: "octokit.rest.orgs.listSecurityManagerTeams() is deprecated, see https://docs.github.com/rest/orgs/security-managers#list-security-manager-teams" }
		],
		listWebhookDeliveries: ["GET /orgs/{org}/hooks/{hook_id}/deliveries"],
		listWebhooks: ["GET /orgs/{org}/hooks"],
		pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
		redeliverWebhookDelivery: ["POST /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts"],
		removeMember: ["DELETE /orgs/{org}/members/{username}"],
		removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
		removeOutsideCollaborator: ["DELETE /orgs/{org}/outside_collaborators/{username}"],
		removePublicMembershipForAuthenticatedUser: ["DELETE /orgs/{org}/public_members/{username}"],
		removeSecurityManagerTeam: [
			"DELETE /orgs/{org}/security-managers/teams/{team_slug}",
			{},
			{ deprecated: "octokit.rest.orgs.removeSecurityManagerTeam() is deprecated, see https://docs.github.com/rest/orgs/security-managers#remove-a-security-manager-team" }
		],
		reviewPatGrantRequest: ["POST /orgs/{org}/personal-access-token-requests/{pat_request_id}"],
		reviewPatGrantRequestsInBulk: ["POST /orgs/{org}/personal-access-token-requests"],
		revokeAllOrgRolesTeam: ["DELETE /orgs/{org}/organization-roles/teams/{team_slug}"],
		revokeAllOrgRolesUser: ["DELETE /orgs/{org}/organization-roles/users/{username}"],
		revokeOrgRoleTeam: ["DELETE /orgs/{org}/organization-roles/teams/{team_slug}/{role_id}"],
		revokeOrgRoleUser: ["DELETE /orgs/{org}/organization-roles/users/{username}/{role_id}"],
		setImmutableReleasesSettings: ["PUT /orgs/{org}/settings/immutable-releases"],
		setImmutableReleasesSettingsRepositories: ["PUT /orgs/{org}/settings/immutable-releases/repositories"],
		setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
		setPublicMembershipForAuthenticatedUser: ["PUT /orgs/{org}/public_members/{username}"],
		unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
		update: ["PATCH /orgs/{org}"],
		updateIssueType: ["PUT /orgs/{org}/issue-types/{issue_type_id}"],
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
	privateRegistries: {
		createOrgPrivateRegistry: ["POST /orgs/{org}/private-registries"],
		deleteOrgPrivateRegistry: ["DELETE /orgs/{org}/private-registries/{secret_name}"],
		getOrgPrivateRegistry: ["GET /orgs/{org}/private-registries/{secret_name}"],
		getOrgPublicKey: ["GET /orgs/{org}/private-registries/public-key"],
		listOrgPrivateRegistries: ["GET /orgs/{org}/private-registries"],
		updateOrgPrivateRegistry: ["PATCH /orgs/{org}/private-registries/{secret_name}"]
	},
	projects: {
		addItemForOrg: ["POST /orgs/{org}/projectsV2/{project_number}/items"],
		addItemForUser: ["POST /users/{username}/projectsV2/{project_number}/items"],
		deleteItemForOrg: ["DELETE /orgs/{org}/projectsV2/{project_number}/items/{item_id}"],
		deleteItemForUser: ["DELETE /users/{username}/projectsV2/{project_number}/items/{item_id}"],
		getFieldForOrg: ["GET /orgs/{org}/projectsV2/{project_number}/fields/{field_id}"],
		getFieldForUser: ["GET /users/{username}/projectsV2/{project_number}/fields/{field_id}"],
		getForOrg: ["GET /orgs/{org}/projectsV2/{project_number}"],
		getForUser: ["GET /users/{username}/projectsV2/{project_number}"],
		getOrgItem: ["GET /orgs/{org}/projectsV2/{project_number}/items/{item_id}"],
		getUserItem: ["GET /users/{username}/projectsV2/{project_number}/items/{item_id}"],
		listFieldsForOrg: ["GET /orgs/{org}/projectsV2/{project_number}/fields"],
		listFieldsForUser: ["GET /users/{username}/projectsV2/{project_number}/fields"],
		listForOrg: ["GET /orgs/{org}/projectsV2"],
		listForUser: ["GET /users/{username}/projectsV2"],
		listItemsForOrg: ["GET /orgs/{org}/projectsV2/{project_number}/items"],
		listItemsForUser: ["GET /users/{username}/projectsV2/{project_number}/items"],
		updateItemForOrg: ["PATCH /orgs/{org}/projectsV2/{project_number}/items/{item_id}"],
		updateItemForUser: ["PATCH /users/{username}/projectsV2/{project_number}/items/{item_id}"]
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
		checkImmutableReleases: ["GET /repos/{owner}/{repo}/immutable-releases"],
		checkPrivateVulnerabilityReporting: ["GET /repos/{owner}/{repo}/private-vulnerability-reporting"],
		checkVulnerabilityAlerts: ["GET /repos/{owner}/{repo}/vulnerability-alerts"],
		codeownersErrors: ["GET /repos/{owner}/{repo}/codeowners/errors"],
		compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
		compareCommitsWithBasehead: ["GET /repos/{owner}/{repo}/compare/{basehead}"],
		createAttestation: ["POST /repos/{owner}/{repo}/attestations"],
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
		createOrUpdateEnvironment: ["PUT /repos/{owner}/{repo}/environments/{environment_name}"],
		createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
		createOrgRuleset: ["POST /orgs/{org}/rulesets"],
		createPagesDeployment: ["POST /repos/{owner}/{repo}/pages/deployments"],
		createPagesSite: ["POST /repos/{owner}/{repo}/pages"],
		createRelease: ["POST /repos/{owner}/{repo}/releases"],
		createRepoRuleset: ["POST /repos/{owner}/{repo}/rulesets"],
		createUsingTemplate: ["POST /repos/{template_owner}/{template_repo}/generate"],
		createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
		customPropertiesForReposCreateOrUpdateRepositoryValues: ["PATCH /repos/{owner}/{repo}/properties/values"],
		customPropertiesForReposGetRepositoryValues: ["GET /repos/{owner}/{repo}/properties/values"],
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
		deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
		disableAutomatedSecurityFixes: ["DELETE /repos/{owner}/{repo}/automated-security-fixes"],
		disableDeploymentProtectionRule: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}"],
		disableImmutableReleases: ["DELETE /repos/{owner}/{repo}/immutable-releases"],
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
		enableImmutableReleases: ["PUT /repos/{owner}/{repo}/immutable-releases"],
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
		getRepoRulesetHistory: ["GET /repos/{owner}/{repo}/rulesets/{ruleset_id}/history"],
		getRepoRulesetVersion: ["GET /repos/{owner}/{repo}/rulesets/{ruleset_id}/history/{version_id}"],
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
		listAttestations: ["GET /repos/{owner}/{repo}/attestations/{subject_digest}"],
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
		createPushProtectionBypass: ["POST /repos/{owner}/{repo}/secret-scanning/push-protection-bypasses"],
		getAlert: ["GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"],
		getScanHistory: ["GET /repos/{owner}/{repo}/secret-scanning/scan-history"],
		listAlertsForOrg: ["GET /orgs/{org}/secret-scanning/alerts"],
		listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
		listLocationsForAlert: ["GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations"],
		listOrgPatternConfigs: ["GET /orgs/{org}/secret-scanning/pattern-configurations"],
		updateAlert: ["PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"],
		updateOrgPatternConfigs: ["PATCH /orgs/{org}/secret-scanning/pattern-configurations"]
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
		addOrUpdateRepoPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
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
		listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
		removeMembershipForUserInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}"],
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
		deleteAttestationsBulk: ["POST /users/{username}/attestations/delete-request"],
		deleteAttestationsById: ["DELETE /users/{username}/attestations/{attestation_id}"],
		deleteAttestationsBySubjectDigest: ["DELETE /users/{username}/attestations/digest/{subject_digest}"],
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
		getById: ["GET /user/{account_id}"],
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
		listAttestations: ["GET /users/{username}/attestations/{subject_digest}"],
		listAttestationsBulk: ["POST /users/{username}/attestations/bulk-list{?per_page,before,after}"],
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
//#endregion
//#region ../node_modules/.pnpm/@octokit+plugin-rest-endpoint-methods@17.0.0_@octokit+core@7.0.6/node_modules/@octokit/plugin-rest-endpoint-methods/dist-src/endpoints-to-methods.js
const endpointMethodsMap = /* @__PURE__ */ new Map();
for (const [scope, endpoints] of Object.entries(endpoints_default)) for (const [methodName, endpoint] of Object.entries(endpoints)) {
	const [route, defaults, decorations] = endpoint;
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
const handler = {
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
		if (!method) return;
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
//#endregion
//#region ../node_modules/.pnpm/@octokit+plugin-rest-endpoint-methods@17.0.0_@octokit+core@7.0.6/node_modules/@octokit/plugin-rest-endpoint-methods/dist-src/index.js
function restEndpointMethods(octokit) {
	return { rest: endpointsToMethods(octokit) };
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
//#endregion
//#region ../node_modules/.pnpm/@octokit+plugin-paginate-rest@14.0.0_@octokit+core@7.0.6/node_modules/@octokit/plugin-paginate-rest/dist-bundle/index.js
var VERSION = "0.0.0-development";
function normalizePaginatedListResponse(response) {
	if (!response.data) return {
		...response,
		data: []
	};
	if (!(("total_count" in response.data || "total_commits" in response.data) && !("url" in response.data))) return response;
	const incompleteResults = response.data.incomplete_results;
	const repositorySelection = response.data.repository_selection;
	const totalCount = response.data.total_count;
	const totalCommits = response.data.total_commits;
	delete response.data.incomplete_results;
	delete response.data.repository_selection;
	delete response.data.total_count;
	delete response.data.total_commits;
	const namespaceKey = Object.keys(response.data)[0];
	response.data = response.data[namespaceKey];
	if (typeof incompleteResults !== "undefined") response.data.incomplete_results = incompleteResults;
	if (typeof repositorySelection !== "undefined") response.data.repository_selection = repositorySelection;
	response.data.total_count = totalCount;
	response.data.total_commits = totalCommits;
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
			const normalizedResponse = normalizePaginatedListResponse(await requestMethod({
				method,
				url,
				headers
			}));
			url = ((normalizedResponse.headers.link || "").match(/<([^<>]+)>;\s*rel="next"/) || [])[1];
			if (!url && "total_commits" in normalizedResponse.data) {
				const parsedUrl = new URL(normalizedResponse.url);
				const params = parsedUrl.searchParams;
				const page = parseInt(params.get("page") || "1", 10);
				if (page * parseInt(params.get("per_page") || "250", 10) < normalizedResponse.data.total_commits) {
					params.set("page", String(page + 1));
					url = parsedUrl.toString();
				}
			}
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
Object.assign(paginate, { iterator });
function paginateRest(octokit) {
	return { paginate: Object.assign(paginate.bind(null, octokit), { iterator: iterator.bind(null, octokit) }) };
}
paginateRest.VERSION = VERSION;
new Context();
const baseUrl = getApiBaseUrl();
const defaults = {
	baseUrl,
	request: {
		agent: getProxyAgent(baseUrl),
		fetch: getProxyFetch(baseUrl)
	}
};
Octokit.plugin(restEndpointMethods, paginateRest).defaults(defaults);
//#endregion
//#region ../node_modules/.pnpm/@actions+github@9.0.0/node_modules/@actions/github/lib/github.js
const context = new Context();
//#endregion
//#region src/utils/git/create-new-git-branch.ts
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
	return async function createNewGitBranch({ baseBranch = context.ref.split("/").pop() || "main", branchName, owner, repo }) {
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
			if (error instanceof Error) setFailed(`Failed to create new git branch: ${error.message}`);
			else setFailed("Failed to create new git branch: Unknown error");
		}
	};
}
//#endregion
export { createNewGitBranch };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5ldy1naXQtYnJhbmNoLm1qcyIsIm5hbWVzIjpbImh0dHBDbGllbnQiLCJpc1BsYWluT2JqZWN0Iiwid2l0aERlZmF1bHRzIiwiVkVSU0lPTiIsIm5vb3AiLCJ3aXRoRGVmYXVsdHMiLCJWRVJTSU9OIiwiVkVSU0lPTiIsIlZFUlNJT04iLCJIb29rIiwiVkVSU0lPTiIsIkVORFBPSU5UUyIsIlZFUlNJT04iLCJjb250ZXh0IiwiQ29udGV4dC5Db250ZXh0IiwiVXRpbHMuZ2V0QXBpQmFzZVVybCIsIlV0aWxzLmdldFByb3h5QWdlbnQiLCJVdGlscy5nZXRQcm94eUZldGNoIiwiQ29udGV4dC5Db250ZXh0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhY3Rpb25zK2dpdGh1YkA5LjAuMC9ub2RlX21vZHVsZXMvQGFjdGlvbnMvZ2l0aHViL2xpYi9jb250ZXh0LmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhY3Rpb25zK2h0dHAtY2xpZW50QDMuMC4yL25vZGVfbW9kdWxlcy9AYWN0aW9ucy9odHRwLWNsaWVudC9saWIvcHJveHkuanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFjdGlvbnMraHR0cC1jbGllbnRAMy4wLjIvbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2h0dHAtY2xpZW50L2xpYi9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWN0aW9ucytnaXRodWJAOS4wLjAvbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2dpdGh1Yi9saWIvaW50ZXJuYWwvdXRpbHMuanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vdW5pdmVyc2FsLXVzZXItYWdlbnRANy4wLjMvbm9kZV9tb2R1bGVzL3VuaXZlcnNhbC11c2VyLWFnZW50L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2JlZm9yZS1hZnRlci1ob29rQDQuMC4wL25vZGVfbW9kdWxlcy9iZWZvcmUtYWZ0ZXItaG9vay9saWIvcmVnaXN0ZXIuanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vYmVmb3JlLWFmdGVyLWhvb2tANC4wLjAvbm9kZV9tb2R1bGVzL2JlZm9yZS1hZnRlci1ob29rL2xpYi9hZGQuanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vYmVmb3JlLWFmdGVyLWhvb2tANC4wLjAvbm9kZV9tb2R1bGVzL2JlZm9yZS1hZnRlci1ob29rL2xpYi9yZW1vdmUuanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vYmVmb3JlLWFmdGVyLWhvb2tANC4wLjAvbm9kZV9tb2R1bGVzL2JlZm9yZS1hZnRlci1ob29rL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BvY3Rva2l0K2VuZHBvaW50QDExLjAuMy9ub2RlX21vZHVsZXMvQG9jdG9raXQvZW5kcG9pbnQvZGlzdC1idW5kbGUvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZmFzdC1jb250ZW50LXR5cGUtcGFyc2VAMy4wLjAvbm9kZV9tb2R1bGVzL2Zhc3QtY29udGVudC10eXBlLXBhcnNlL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2pzb24td2l0aC1iaWdpbnRAMy41Ljgvbm9kZV9tb2R1bGVzL2pzb24td2l0aC1iaWdpbnQvanNvbi13aXRoLWJpZ2ludC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ab2N0b2tpdCtyZXF1ZXN0LWVycm9yQDcuMS4wL25vZGVfbW9kdWxlcy9Ab2N0b2tpdC9yZXF1ZXN0LWVycm9yL2Rpc3Qtc3JjL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BvY3Rva2l0K3JlcXVlc3RAMTAuMC44L25vZGVfbW9kdWxlcy9Ab2N0b2tpdC9yZXF1ZXN0L2Rpc3QtYnVuZGxlL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BvY3Rva2l0K2dyYXBocWxAOS4wLjMvbm9kZV9tb2R1bGVzL0BvY3Rva2l0L2dyYXBocWwvZGlzdC1idW5kbGUvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQG9jdG9raXQrYXV0aC10b2tlbkA2LjAuMC9ub2RlX21vZHVsZXMvQG9jdG9raXQvYXV0aC10b2tlbi9kaXN0LWJ1bmRsZS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ab2N0b2tpdCtjb3JlQDcuMC42L25vZGVfbW9kdWxlcy9Ab2N0b2tpdC9jb3JlL2Rpc3Qtc3JjL3ZlcnNpb24uanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQG9jdG9raXQrY29yZUA3LjAuNi9ub2RlX21vZHVsZXMvQG9jdG9raXQvY29yZS9kaXN0LXNyYy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ab2N0b2tpdCtwbHVnaW4tcmVzdC1lbmRwb2ludC1tZXRob2RzQDE3LjAuMF9Ab2N0b2tpdCtjb3JlQDcuMC42L25vZGVfbW9kdWxlcy9Ab2N0b2tpdC9wbHVnaW4tcmVzdC1lbmRwb2ludC1tZXRob2RzL2Rpc3Qtc3JjL3ZlcnNpb24uanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQG9jdG9raXQrcGx1Z2luLXJlc3QtZW5kcG9pbnQtbWV0aG9kc0AxNy4wLjBfQG9jdG9raXQrY29yZUA3LjAuNi9ub2RlX21vZHVsZXMvQG9jdG9raXQvcGx1Z2luLXJlc3QtZW5kcG9pbnQtbWV0aG9kcy9kaXN0LXNyYy9nZW5lcmF0ZWQvZW5kcG9pbnRzLmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BvY3Rva2l0K3BsdWdpbi1yZXN0LWVuZHBvaW50LW1ldGhvZHNAMTcuMC4wX0BvY3Rva2l0K2NvcmVANy4wLjYvbm9kZV9tb2R1bGVzL0BvY3Rva2l0L3BsdWdpbi1yZXN0LWVuZHBvaW50LW1ldGhvZHMvZGlzdC1zcmMvZW5kcG9pbnRzLXRvLW1ldGhvZHMuanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQG9jdG9raXQrcGx1Z2luLXJlc3QtZW5kcG9pbnQtbWV0aG9kc0AxNy4wLjBfQG9jdG9raXQrY29yZUA3LjAuNi9ub2RlX21vZHVsZXMvQG9jdG9raXQvcGx1Z2luLXJlc3QtZW5kcG9pbnQtbWV0aG9kcy9kaXN0LXNyYy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ab2N0b2tpdCtwbHVnaW4tcGFnaW5hdGUtcmVzdEAxNC4wLjBfQG9jdG9raXQrY29yZUA3LjAuNi9ub2RlX21vZHVsZXMvQG9jdG9raXQvcGx1Z2luLXBhZ2luYXRlLXJlc3QvZGlzdC1idW5kbGUvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFjdGlvbnMrZ2l0aHViQDkuMC4wL25vZGVfbW9kdWxlcy9AYWN0aW9ucy9naXRodWIvbGliL3V0aWxzLmpzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhY3Rpb25zK2dpdGh1YkA5LjAuMC9ub2RlX21vZHVsZXMvQGFjdGlvbnMvZ2l0aHViL2xpYi9naXRodWIuanMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2NyZWF0ZS1uZXctZ2l0LWJyYW5jaC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWFkRmlsZVN5bmMsIGV4aXN0c1N5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBFT0wgfSBmcm9tICdvcyc7XG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG4gICAgLyoqXG4gICAgICogSHlkcmF0ZSB0aGUgY29udGV4dCBmcm9tIHRoZSBlbnZpcm9ubWVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgdGhpcy5wYXlsb2FkID0ge307XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5HSVRIVUJfRVZFTlRfUEFUSCkge1xuICAgICAgICAgICAgaWYgKGV4aXN0c1N5bmMocHJvY2Vzcy5lbnYuR0lUSFVCX0VWRU5UX1BBVEgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXlsb2FkID0gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMocHJvY2Vzcy5lbnYuR0lUSFVCX0VWRU5UX1BBVEgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gcHJvY2Vzcy5lbnYuR0lUSFVCX0VWRU5UX1BBVEg7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYEdJVEhVQl9FVkVOVF9QQVRIICR7cGF0aH0gZG9lcyBub3QgZXhpc3Qke0VPTH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IHByb2Nlc3MuZW52LkdJVEhVQl9FVkVOVF9OQU1FO1xuICAgICAgICB0aGlzLnNoYSA9IHByb2Nlc3MuZW52LkdJVEhVQl9TSEE7XG4gICAgICAgIHRoaXMucmVmID0gcHJvY2Vzcy5lbnYuR0lUSFVCX1JFRjtcbiAgICAgICAgdGhpcy53b3JrZmxvdyA9IHByb2Nlc3MuZW52LkdJVEhVQl9XT1JLRkxPVztcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBwcm9jZXNzLmVudi5HSVRIVUJfQUNUSU9OO1xuICAgICAgICB0aGlzLmFjdG9yID0gcHJvY2Vzcy5lbnYuR0lUSFVCX0FDVE9SO1xuICAgICAgICB0aGlzLmpvYiA9IHByb2Nlc3MuZW52LkdJVEhVQl9KT0I7XG4gICAgICAgIHRoaXMucnVuQXR0ZW1wdCA9IHBhcnNlSW50KHByb2Nlc3MuZW52LkdJVEhVQl9SVU5fQVRURU1QVCwgMTApO1xuICAgICAgICB0aGlzLnJ1bk51bWJlciA9IHBhcnNlSW50KHByb2Nlc3MuZW52LkdJVEhVQl9SVU5fTlVNQkVSLCAxMCk7XG4gICAgICAgIHRoaXMucnVuSWQgPSBwYXJzZUludChwcm9jZXNzLmVudi5HSVRIVUJfUlVOX0lELCAxMCk7XG4gICAgICAgIHRoaXMuYXBpVXJsID0gKF9hID0gcHJvY2Vzcy5lbnYuR0lUSFVCX0FQSV9VUkwpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGBodHRwczovL2FwaS5naXRodWIuY29tYDtcbiAgICAgICAgdGhpcy5zZXJ2ZXJVcmwgPSAoX2IgPSBwcm9jZXNzLmVudi5HSVRIVUJfU0VSVkVSX1VSTCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogYGh0dHBzOi8vZ2l0aHViLmNvbWA7XG4gICAgICAgIHRoaXMuZ3JhcGhxbFVybCA9XG4gICAgICAgICAgICAoX2MgPSBwcm9jZXNzLmVudi5HSVRIVUJfR1JBUEhRTF9VUkwpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IGBodHRwczovL2FwaS5naXRodWIuY29tL2dyYXBocWxgO1xuICAgIH1cbiAgICBnZXQgaXNzdWUoKSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLnBheWxvYWQ7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMucmVwbyksIHsgbnVtYmVyOiAocGF5bG9hZC5pc3N1ZSB8fCBwYXlsb2FkLnB1bGxfcmVxdWVzdCB8fCBwYXlsb2FkKS5udW1iZXIgfSk7XG4gICAgfVxuICAgIGdldCByZXBvKCkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuR0lUSFVCX1JFUE9TSVRPUlkpIHtcbiAgICAgICAgICAgIGNvbnN0IFtvd25lciwgcmVwb10gPSBwcm9jZXNzLmVudi5HSVRIVUJfUkVQT1NJVE9SWS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgcmV0dXJuIHsgb3duZXIsIHJlcG8gfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXlsb2FkLnJlcG9zaXRvcnkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb3duZXI6IHRoaXMucGF5bG9hZC5yZXBvc2l0b3J5Lm93bmVyLmxvZ2luLFxuICAgICAgICAgICAgICAgIHJlcG86IHRoaXMucGF5bG9hZC5yZXBvc2l0b3J5Lm5hbWVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29udGV4dC5yZXBvIHJlcXVpcmVzIGEgR0lUSFVCX1JFUE9TSVRPUlkgZW52aXJvbm1lbnQgdmFyaWFibGUgbGlrZSAnb3duZXIvcmVwbydcIik7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGV4dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0UHJveHlVcmwgPSBnZXRQcm94eVVybDtcbmV4cG9ydHMuY2hlY2tCeXBhc3MgPSBjaGVja0J5cGFzcztcbmZ1bmN0aW9uIGdldFByb3h5VXJsKHJlcVVybCkge1xuICAgIGNvbnN0IHVzaW5nU3NsID0gcmVxVXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcbiAgICBpZiAoY2hlY2tCeXBhc3MocmVxVXJsKSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBwcm94eVZhciA9ICgoKSA9PiB7XG4gICAgICAgIGlmICh1c2luZ1NzbCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MuZW52WydodHRwc19wcm94eSddIHx8IHByb2Nlc3MuZW52WydIVFRQU19QUk9YWSddO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MuZW52WydodHRwX3Byb3h5J10gfHwgcHJvY2Vzcy5lbnZbJ0hUVFBfUFJPWFknXTtcbiAgICAgICAgfVxuICAgIH0pKCk7XG4gICAgaWYgKHByb3h5VmFyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERlY29kZWRVUkwocHJveHlWYXIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChfYSkge1xuICAgICAgICAgICAgaWYgKCFwcm94eVZhci5zdGFydHNXaXRoKCdodHRwOi8vJykgJiYgIXByb3h5VmFyLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJykpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEZWNvZGVkVVJMKGBodHRwOi8vJHtwcm94eVZhcn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5mdW5jdGlvbiBjaGVja0J5cGFzcyhyZXFVcmwpIHtcbiAgICBpZiAoIXJlcVVybC5ob3N0bmFtZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHJlcUhvc3QgPSByZXFVcmwuaG9zdG5hbWU7XG4gICAgaWYgKGlzTG9vcGJhY2tBZGRyZXNzKHJlcUhvc3QpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBub1Byb3h5ID0gcHJvY2Vzcy5lbnZbJ25vX3Byb3h5J10gfHwgcHJvY2Vzcy5lbnZbJ05PX1BST1hZJ10gfHwgJyc7XG4gICAgaWYgKCFub1Byb3h5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gRGV0ZXJtaW5lIHRoZSByZXF1ZXN0IHBvcnRcbiAgICBsZXQgcmVxUG9ydDtcbiAgICBpZiAocmVxVXJsLnBvcnQpIHtcbiAgICAgICAgcmVxUG9ydCA9IE51bWJlcihyZXFVcmwucG9ydCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlcVVybC5wcm90b2NvbCA9PT0gJ2h0dHA6Jykge1xuICAgICAgICByZXFQb3J0ID0gODA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlcVVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOicpIHtcbiAgICAgICAgcmVxUG9ydCA9IDQ0MztcbiAgICB9XG4gICAgLy8gRm9ybWF0IHRoZSByZXF1ZXN0IGhvc3RuYW1lIGFuZCBob3N0bmFtZSB3aXRoIHBvcnRcbiAgICBjb25zdCB1cHBlclJlcUhvc3RzID0gW3JlcVVybC5ob3N0bmFtZS50b1VwcGVyQ2FzZSgpXTtcbiAgICBpZiAodHlwZW9mIHJlcVBvcnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHVwcGVyUmVxSG9zdHMucHVzaChgJHt1cHBlclJlcUhvc3RzWzBdfToke3JlcVBvcnR9YCk7XG4gICAgfVxuICAgIC8vIENvbXBhcmUgcmVxdWVzdCBob3N0IGFnYWluc3Qgbm9wcm94eVxuICAgIGZvciAoY29uc3QgdXBwZXJOb1Byb3h5SXRlbSBvZiBub1Byb3h5XG4gICAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAgIC5tYXAoeCA9PiB4LnRyaW0oKS50b1VwcGVyQ2FzZSgpKVxuICAgICAgICAuZmlsdGVyKHggPT4geCkpIHtcbiAgICAgICAgaWYgKHVwcGVyTm9Qcm94eUl0ZW0gPT09ICcqJyB8fFxuICAgICAgICAgICAgdXBwZXJSZXFIb3N0cy5zb21lKHggPT4geCA9PT0gdXBwZXJOb1Byb3h5SXRlbSB8fFxuICAgICAgICAgICAgICAgIHguZW5kc1dpdGgoYC4ke3VwcGVyTm9Qcm94eUl0ZW19YCkgfHxcbiAgICAgICAgICAgICAgICAodXBwZXJOb1Byb3h5SXRlbS5zdGFydHNXaXRoKCcuJykgJiZcbiAgICAgICAgICAgICAgICAgICAgeC5lbmRzV2l0aChgJHt1cHBlck5vUHJveHlJdGVtfWApKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzTG9vcGJhY2tBZGRyZXNzKGhvc3QpIHtcbiAgICBjb25zdCBob3N0TG93ZXIgPSBob3N0LnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIChob3N0TG93ZXIgPT09ICdsb2NhbGhvc3QnIHx8XG4gICAgICAgIGhvc3RMb3dlci5zdGFydHNXaXRoKCcxMjcuJykgfHxcbiAgICAgICAgaG9zdExvd2VyLnN0YXJ0c1dpdGgoJ1s6OjFdJykgfHxcbiAgICAgICAgaG9zdExvd2VyLnN0YXJ0c1dpdGgoJ1swOjA6MDowOjA6MDowOjFdJykpO1xufVxuY2xhc3MgRGVjb2RlZFVSTCBleHRlbmRzIFVSTCB7XG4gICAgY29uc3RydWN0b3IodXJsLCBiYXNlKSB7XG4gICAgICAgIHN1cGVyKHVybCwgYmFzZSk7XG4gICAgICAgIHRoaXMuX2RlY29kZWRVc2VybmFtZSA9IGRlY29kZVVSSUNvbXBvbmVudChzdXBlci51c2VybmFtZSk7XG4gICAgICAgIHRoaXMuX2RlY29kZWRQYXNzd29yZCA9IGRlY29kZVVSSUNvbXBvbmVudChzdXBlci5wYXNzd29yZCk7XG4gICAgfVxuICAgIGdldCB1c2VybmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlY29kZWRVc2VybmFtZTtcbiAgICB9XG4gICAgZ2V0IHBhc3N3b3JkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVjb2RlZFBhc3N3b3JkO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3h5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xuICAgICAgICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgIHZhciBhciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcbiAgICAgICAgICAgIHJldHVybiBhcjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG93bktleXMobyk7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1vZCkge1xuICAgICAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XG4gICAgICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSHR0cENsaWVudCA9IGV4cG9ydHMuSHR0cENsaWVudFJlc3BvbnNlID0gZXhwb3J0cy5IdHRwQ2xpZW50RXJyb3IgPSBleHBvcnRzLk1lZGlhVHlwZXMgPSBleHBvcnRzLkhlYWRlcnMgPSBleHBvcnRzLkh0dHBDb2RlcyA9IHZvaWQgMDtcbmV4cG9ydHMuZ2V0UHJveHlVcmwgPSBnZXRQcm94eVVybDtcbmV4cG9ydHMuaXNIdHRwcyA9IGlzSHR0cHM7XG5jb25zdCBodHRwID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJodHRwXCIpKTtcbmNvbnN0IGh0dHBzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJodHRwc1wiKSk7XG5jb25zdCBwbSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9wcm94eVwiKSk7XG5jb25zdCB0dW5uZWwgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInR1bm5lbFwiKSk7XG5jb25zdCB1bmRpY2lfMSA9IHJlcXVpcmUoXCJ1bmRpY2lcIik7XG52YXIgSHR0cENvZGVzO1xuKGZ1bmN0aW9uIChIdHRwQ29kZXMpIHtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiT0tcIl0gPSAyMDBdID0gXCJPS1wiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJNdWx0aXBsZUNob2ljZXNcIl0gPSAzMDBdID0gXCJNdWx0aXBsZUNob2ljZXNcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiTW92ZWRQZXJtYW5lbnRseVwiXSA9IDMwMV0gPSBcIk1vdmVkUGVybWFuZW50bHlcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiUmVzb3VyY2VNb3ZlZFwiXSA9IDMwMl0gPSBcIlJlc291cmNlTW92ZWRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiU2VlT3RoZXJcIl0gPSAzMDNdID0gXCJTZWVPdGhlclwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJOb3RNb2RpZmllZFwiXSA9IDMwNF0gPSBcIk5vdE1vZGlmaWVkXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlVzZVByb3h5XCJdID0gMzA1XSA9IFwiVXNlUHJveHlcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiU3dpdGNoUHJveHlcIl0gPSAzMDZdID0gXCJTd2l0Y2hQcm94eVwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJUZW1wb3JhcnlSZWRpcmVjdFwiXSA9IDMwN10gPSBcIlRlbXBvcmFyeVJlZGlyZWN0XCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlBlcm1hbmVudFJlZGlyZWN0XCJdID0gMzA4XSA9IFwiUGVybWFuZW50UmVkaXJlY3RcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiQmFkUmVxdWVzdFwiXSA9IDQwMF0gPSBcIkJhZFJlcXVlc3RcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiVW5hdXRob3JpemVkXCJdID0gNDAxXSA9IFwiVW5hdXRob3JpemVkXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlBheW1lbnRSZXF1aXJlZFwiXSA9IDQwMl0gPSBcIlBheW1lbnRSZXF1aXJlZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJGb3JiaWRkZW5cIl0gPSA0MDNdID0gXCJGb3JiaWRkZW5cIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiTm90Rm91bmRcIl0gPSA0MDRdID0gXCJOb3RGb3VuZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJNZXRob2ROb3RBbGxvd2VkXCJdID0gNDA1XSA9IFwiTWV0aG9kTm90QWxsb3dlZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJOb3RBY2NlcHRhYmxlXCJdID0gNDA2XSA9IFwiTm90QWNjZXB0YWJsZVwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWRcIl0gPSA0MDddID0gXCJQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiUmVxdWVzdFRpbWVvdXRcIl0gPSA0MDhdID0gXCJSZXF1ZXN0VGltZW91dFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJDb25mbGljdFwiXSA9IDQwOV0gPSBcIkNvbmZsaWN0XCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkdvbmVcIl0gPSA0MTBdID0gXCJHb25lXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlRvb01hbnlSZXF1ZXN0c1wiXSA9IDQyOV0gPSBcIlRvb01hbnlSZXF1ZXN0c1wiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJJbnRlcm5hbFNlcnZlckVycm9yXCJdID0gNTAwXSA9IFwiSW50ZXJuYWxTZXJ2ZXJFcnJvclwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJOb3RJbXBsZW1lbnRlZFwiXSA9IDUwMV0gPSBcIk5vdEltcGxlbWVudGVkXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkJhZEdhdGV3YXlcIl0gPSA1MDJdID0gXCJCYWRHYXRld2F5XCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlNlcnZpY2VVbmF2YWlsYWJsZVwiXSA9IDUwM10gPSBcIlNlcnZpY2VVbmF2YWlsYWJsZVwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJHYXRld2F5VGltZW91dFwiXSA9IDUwNF0gPSBcIkdhdGV3YXlUaW1lb3V0XCI7XG59KShIdHRwQ29kZXMgfHwgKGV4cG9ydHMuSHR0cENvZGVzID0gSHR0cENvZGVzID0ge30pKTtcbnZhciBIZWFkZXJzO1xuKGZ1bmN0aW9uIChIZWFkZXJzKSB7XG4gICAgSGVhZGVyc1tcIkFjY2VwdFwiXSA9IFwiYWNjZXB0XCI7XG4gICAgSGVhZGVyc1tcIkNvbnRlbnRUeXBlXCJdID0gXCJjb250ZW50LXR5cGVcIjtcbn0pKEhlYWRlcnMgfHwgKGV4cG9ydHMuSGVhZGVycyA9IEhlYWRlcnMgPSB7fSkpO1xudmFyIE1lZGlhVHlwZXM7XG4oZnVuY3Rpb24gKE1lZGlhVHlwZXMpIHtcbiAgICBNZWRpYVR5cGVzW1wiQXBwbGljYXRpb25Kc29uXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XG59KShNZWRpYVR5cGVzIHx8IChleHBvcnRzLk1lZGlhVHlwZXMgPSBNZWRpYVR5cGVzID0ge30pKTtcbi8qKlxuICogUmV0dXJucyB0aGUgcHJveHkgVVJMLCBkZXBlbmRpbmcgdXBvbiB0aGUgc3VwcGxpZWQgdXJsIGFuZCBwcm94eSBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG4gKiBAcGFyYW0gc2VydmVyVXJsICBUaGUgc2VydmVyIFVSTCB3aGVyZSB0aGUgcmVxdWVzdCB3aWxsIGJlIHNlbnQuIEZvciBleGFtcGxlLCBodHRwczovL2FwaS5naXRodWIuY29tXG4gKi9cbmZ1bmN0aW9uIGdldFByb3h5VXJsKHNlcnZlclVybCkge1xuICAgIGNvbnN0IHByb3h5VXJsID0gcG0uZ2V0UHJveHlVcmwobmV3IFVSTChzZXJ2ZXJVcmwpKTtcbiAgICByZXR1cm4gcHJveHlVcmwgPyBwcm94eVVybC5ocmVmIDogJyc7XG59XG5jb25zdCBIdHRwUmVkaXJlY3RDb2RlcyA9IFtcbiAgICBIdHRwQ29kZXMuTW92ZWRQZXJtYW5lbnRseSxcbiAgICBIdHRwQ29kZXMuUmVzb3VyY2VNb3ZlZCxcbiAgICBIdHRwQ29kZXMuU2VlT3RoZXIsXG4gICAgSHR0cENvZGVzLlRlbXBvcmFyeVJlZGlyZWN0LFxuICAgIEh0dHBDb2Rlcy5QZXJtYW5lbnRSZWRpcmVjdFxuXTtcbmNvbnN0IEh0dHBSZXNwb25zZVJldHJ5Q29kZXMgPSBbXG4gICAgSHR0cENvZGVzLkJhZEdhdGV3YXksXG4gICAgSHR0cENvZGVzLlNlcnZpY2VVbmF2YWlsYWJsZSxcbiAgICBIdHRwQ29kZXMuR2F0ZXdheVRpbWVvdXRcbl07XG5jb25zdCBSZXRyeWFibGVIdHRwVmVyYnMgPSBbJ09QVElPTlMnLCAnR0VUJywgJ0RFTEVURScsICdIRUFEJ107XG5jb25zdCBFeHBvbmVudGlhbEJhY2tvZmZDZWlsaW5nID0gMTA7XG5jb25zdCBFeHBvbmVudGlhbEJhY2tvZmZUaW1lU2xpY2UgPSA1O1xuY2xhc3MgSHR0cENsaWVudEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHN0YXR1c0NvZGUpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdIdHRwQ2xpZW50RXJyb3InO1xuICAgICAgICB0aGlzLnN0YXR1c0NvZGUgPSBzdGF0dXNDb2RlO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgSHR0cENsaWVudEVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuZXhwb3J0cy5IdHRwQ2xpZW50RXJyb3IgPSBIdHRwQ2xpZW50RXJyb3I7XG5jbGFzcyBIdHRwQ2xpZW50UmVzcG9uc2Uge1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG4gICAgcmVhZEJvZHkoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgb3V0cHV0ID0gQnVmZmVyLmFsbG9jKDApO1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZS5vbignZGF0YScsIChjaHVuaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBCdWZmZXIuY29uY2F0KFtvdXRwdXQsIGNodW5rXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUob3V0cHV0LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVhZEJvZHlCdWZmZXIoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaHVua3MgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2Uub24oJ2RhdGEnLCAoY2h1bmspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2h1bmtzLnB1c2goY2h1bmspO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZS5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEJ1ZmZlci5jb25jYXQoY2h1bmtzKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuSHR0cENsaWVudFJlc3BvbnNlID0gSHR0cENsaWVudFJlc3BvbnNlO1xuZnVuY3Rpb24gaXNIdHRwcyhyZXF1ZXN0VXJsKSB7XG4gICAgY29uc3QgcGFyc2VkVXJsID0gbmV3IFVSTChyZXF1ZXN0VXJsKTtcbiAgICByZXR1cm4gcGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6Jztcbn1cbmNsYXNzIEh0dHBDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKHVzZXJBZ2VudCwgaGFuZGxlcnMsIHJlcXVlc3RPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2lnbm9yZVNzbEVycm9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2FsbG93UmVkaXJlY3RzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fYWxsb3dSZWRpcmVjdERvd25ncmFkZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9tYXhSZWRpcmVjdHMgPSA1MDtcbiAgICAgICAgdGhpcy5fYWxsb3dSZXRyaWVzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX21heFJldHJpZXMgPSAxO1xuICAgICAgICB0aGlzLl9rZWVwQWxpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51c2VyQWdlbnQgPSB0aGlzLl9nZXRVc2VyQWdlbnRXaXRoT3JjaGVzdHJhdGlvbklkKHVzZXJBZ2VudCk7XG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSBoYW5kbGVycyB8fCBbXTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0T3B0aW9ucyA9IHJlcXVlc3RPcHRpb25zO1xuICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5pZ25vcmVTc2xFcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faWdub3JlU3NsRXJyb3IgPSByZXF1ZXN0T3B0aW9ucy5pZ25vcmVTc2xFcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NvY2tldFRpbWVvdXQgPSByZXF1ZXN0T3B0aW9ucy5zb2NrZXRUaW1lb3V0O1xuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLmFsbG93UmVkaXJlY3RzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbGxvd1JlZGlyZWN0cyA9IHJlcXVlc3RPcHRpb25zLmFsbG93UmVkaXJlY3RzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLmFsbG93UmVkaXJlY3REb3duZ3JhZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FsbG93UmVkaXJlY3REb3duZ3JhZGUgPSByZXF1ZXN0T3B0aW9ucy5hbGxvd1JlZGlyZWN0RG93bmdyYWRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLm1heFJlZGlyZWN0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4UmVkaXJlY3RzID0gTWF0aC5tYXgocmVxdWVzdE9wdGlvbnMubWF4UmVkaXJlY3RzLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5rZWVwQWxpdmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2tlZXBBbGl2ZSA9IHJlcXVlc3RPcHRpb25zLmtlZXBBbGl2ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5hbGxvd1JldHJpZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FsbG93UmV0cmllcyA9IHJlcXVlc3RPcHRpb25zLmFsbG93UmV0cmllcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5tYXhSZXRyaWVzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhSZXRyaWVzID0gcmVxdWVzdE9wdGlvbnMubWF4UmV0cmllcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvcHRpb25zKHJlcXVlc3RVcmwsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdPUFRJT05TJywgcmVxdWVzdFVybCwgbnVsbCwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0KHJlcXVlc3RVcmwsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdHRVQnLCByZXF1ZXN0VXJsLCBudWxsLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkZWwocmVxdWVzdFVybCwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0RFTEVURScsIHJlcXVlc3RVcmwsIG51bGwsIGFkZGl0aW9uYWxIZWFkZXJzIHx8IHt9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHBvc3QocmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCByZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwYXRjaChyZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUEFUQ0gnLCByZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdXQocmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BVVCcsIHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzIHx8IHt9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGhlYWQocmVxdWVzdFVybCwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0hFQUQnLCByZXF1ZXN0VXJsLCBudWxsLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZW5kU3RyZWFtKHZlcmIsIHJlcXVlc3RVcmwsIHN0cmVhbSwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QodmVyYiwgcmVxdWVzdFVybCwgc3RyZWFtLCBhZGRpdGlvbmFsSGVhZGVycyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgdHlwZWQgb2JqZWN0IGZyb20gYW4gZW5kcG9pbnRcbiAgICAgKiBCZSBhd2FyZSB0aGF0IG5vdCBmb3VuZCByZXR1cm5zIGEgbnVsbC4gIE90aGVyIGVycm9ycyAoNHh4LCA1eHgpIHJlamVjdCB0aGUgcHJvbWlzZVxuICAgICAqL1xuICAgIGdldEpzb24ocmVxdWVzdFVybF8xKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgYXJndW1lbnRzLCB2b2lkIDAsIGZ1bmN0aW9uKiAocmVxdWVzdFVybCwgYWRkaXRpb25hbEhlYWRlcnMgPSB7fSkge1xuICAgICAgICAgICAgYWRkaXRpb25hbEhlYWRlcnNbSGVhZGVycy5BY2NlcHRdID0gdGhpcy5fZ2V0RXhpc3RpbmdPckRlZmF1bHRIZWFkZXIoYWRkaXRpb25hbEhlYWRlcnMsIEhlYWRlcnMuQWNjZXB0LCBNZWRpYVR5cGVzLkFwcGxpY2F0aW9uSnNvbik7XG4gICAgICAgICAgICBjb25zdCByZXMgPSB5aWVsZCB0aGlzLmdldChyZXF1ZXN0VXJsLCBhZGRpdGlvbmFsSGVhZGVycyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc1Jlc3BvbnNlKHJlcywgdGhpcy5yZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwb3N0SnNvbihyZXF1ZXN0VXJsXzEsIG9ial8xKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgYXJndW1lbnRzLCB2b2lkIDAsIGZ1bmN0aW9uKiAocmVxdWVzdFVybCwgb2JqLCBhZGRpdGlvbmFsSGVhZGVycyA9IHt9KSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAyKTtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxIZWFkZXJzW0hlYWRlcnMuQWNjZXB0XSA9IHRoaXMuX2dldEV4aXN0aW5nT3JEZWZhdWx0SGVhZGVyKGFkZGl0aW9uYWxIZWFkZXJzLCBIZWFkZXJzLkFjY2VwdCwgTWVkaWFUeXBlcy5BcHBsaWNhdGlvbkpzb24pO1xuICAgICAgICAgICAgYWRkaXRpb25hbEhlYWRlcnNbSGVhZGVycy5Db250ZW50VHlwZV0gPVxuICAgICAgICAgICAgICAgIHRoaXMuX2dldEV4aXN0aW5nT3JEZWZhdWx0Q29udGVudFR5cGVIZWFkZXIoYWRkaXRpb25hbEhlYWRlcnMsIE1lZGlhVHlwZXMuQXBwbGljYXRpb25Kc29uKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIHRoaXMucG9zdChyZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc1Jlc3BvbnNlKHJlcywgdGhpcy5yZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdXRKc29uKHJlcXVlc3RVcmxfMSwgb2JqXzEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCBhcmd1bWVudHMsIHZvaWQgMCwgZnVuY3Rpb24qIChyZXF1ZXN0VXJsLCBvYmosIGFkZGl0aW9uYWxIZWFkZXJzID0ge30pIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnN0cmluZ2lmeShvYmosIG51bGwsIDIpO1xuICAgICAgICAgICAgYWRkaXRpb25hbEhlYWRlcnNbSGVhZGVycy5BY2NlcHRdID0gdGhpcy5fZ2V0RXhpc3RpbmdPckRlZmF1bHRIZWFkZXIoYWRkaXRpb25hbEhlYWRlcnMsIEhlYWRlcnMuQWNjZXB0LCBNZWRpYVR5cGVzLkFwcGxpY2F0aW9uSnNvbik7XG4gICAgICAgICAgICBhZGRpdGlvbmFsSGVhZGVyc1tIZWFkZXJzLkNvbnRlbnRUeXBlXSA9XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0RXhpc3RpbmdPckRlZmF1bHRDb250ZW50VHlwZUhlYWRlcihhZGRpdGlvbmFsSGVhZGVycywgTWVkaWFUeXBlcy5BcHBsaWNhdGlvbkpzb24pO1xuICAgICAgICAgICAgY29uc3QgcmVzID0geWllbGQgdGhpcy5wdXQocmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NSZXNwb25zZShyZXMsIHRoaXMucmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcGF0Y2hKc29uKHJlcXVlc3RVcmxfMSwgb2JqXzEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCBhcmd1bWVudHMsIHZvaWQgMCwgZnVuY3Rpb24qIChyZXF1ZXN0VXJsLCBvYmosIGFkZGl0aW9uYWxIZWFkZXJzID0ge30pIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnN0cmluZ2lmeShvYmosIG51bGwsIDIpO1xuICAgICAgICAgICAgYWRkaXRpb25hbEhlYWRlcnNbSGVhZGVycy5BY2NlcHRdID0gdGhpcy5fZ2V0RXhpc3RpbmdPckRlZmF1bHRIZWFkZXIoYWRkaXRpb25hbEhlYWRlcnMsIEhlYWRlcnMuQWNjZXB0LCBNZWRpYVR5cGVzLkFwcGxpY2F0aW9uSnNvbik7XG4gICAgICAgICAgICBhZGRpdGlvbmFsSGVhZGVyc1tIZWFkZXJzLkNvbnRlbnRUeXBlXSA9XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0RXhpc3RpbmdPckRlZmF1bHRDb250ZW50VHlwZUhlYWRlcihhZGRpdGlvbmFsSGVhZGVycywgTWVkaWFUeXBlcy5BcHBsaWNhdGlvbkpzb24pO1xuICAgICAgICAgICAgY29uc3QgcmVzID0geWllbGQgdGhpcy5wYXRjaChyZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc1Jlc3BvbnNlKHJlcywgdGhpcy5yZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIHJhdyBodHRwIHJlcXVlc3QuXG4gICAgICogQWxsIG90aGVyIG1ldGhvZHMgc3VjaCBhcyBnZXQsIHBvc3QsIHBhdGNoLCBhbmQgcmVxdWVzdCB1bHRpbWF0ZWx5IGNhbGwgdGhpcy5cbiAgICAgKiBQcmVmZXIgZ2V0LCBkZWwsIHBvc3QgYW5kIHBhdGNoXG4gICAgICovXG4gICAgcmVxdWVzdCh2ZXJiLCByZXF1ZXN0VXJsLCBkYXRhLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsaWVudCBoYXMgYWxyZWFkeSBiZWVuIGRpc3Bvc2VkLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGFyc2VkVXJsID0gbmV3IFVSTChyZXF1ZXN0VXJsKTtcbiAgICAgICAgICAgIGxldCBpbmZvID0gdGhpcy5fcHJlcGFyZVJlcXVlc3QodmVyYiwgcGFyc2VkVXJsLCBoZWFkZXJzKTtcbiAgICAgICAgICAgIC8vIE9ubHkgcGVyZm9ybSByZXRyaWVzIG9uIHJlYWRzIHNpbmNlIHdyaXRlcyBtYXkgbm90IGJlIGlkZW1wb3RlbnQuXG4gICAgICAgICAgICBjb25zdCBtYXhUcmllcyA9IHRoaXMuX2FsbG93UmV0cmllcyAmJiBSZXRyeWFibGVIdHRwVmVyYnMuaW5jbHVkZXModmVyYilcbiAgICAgICAgICAgICAgICA/IHRoaXMuX21heFJldHJpZXMgKyAxXG4gICAgICAgICAgICAgICAgOiAxO1xuICAgICAgICAgICAgbGV0IG51bVRyaWVzID0gMDtcbiAgICAgICAgICAgIGxldCByZXNwb25zZTtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IHlpZWxkIHRoaXMucmVxdWVzdFJhdyhpbmZvLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBpdCdzIGFuIGF1dGhlbnRpY2F0aW9uIGNoYWxsZW5nZVxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5tZXNzYWdlICYmXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2Uuc3RhdHVzQ29kZSA9PT0gSHR0cENvZGVzLlVuYXV0aG9yaXplZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXV0aGVudGljYXRpb25IYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGhhbmRsZXIgb2YgdGhpcy5oYW5kbGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIuY2FuSGFuZGxlQXV0aGVudGljYXRpb24ocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aGVudGljYXRpb25IYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYXV0aGVudGljYXRpb25IYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aGVudGljYXRpb25IYW5kbGVyLmhhbmRsZUF1dGhlbnRpY2F0aW9uKHRoaXMsIGluZm8sIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSByZWNlaXZlZCBhbiB1bmF1dGhvcml6ZWQgcmVzcG9uc2UgYnV0IGhhdmUgbm8gaGFuZGxlcnMgdG8gaGFuZGxlIGl0LlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGV0IHRoZSByZXNwb25zZSByZXR1cm4gdG8gdGhlIGNhbGxlci5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcmVkaXJlY3RzUmVtYWluaW5nID0gdGhpcy5fbWF4UmVkaXJlY3RzO1xuICAgICAgICAgICAgICAgIHdoaWxlIChyZXNwb25zZS5tZXNzYWdlLnN0YXR1c0NvZGUgJiZcbiAgICAgICAgICAgICAgICAgICAgSHR0cFJlZGlyZWN0Q29kZXMuaW5jbHVkZXMocmVzcG9uc2UubWVzc2FnZS5zdGF0dXNDb2RlKSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbGxvd1JlZGlyZWN0cyAmJlxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdHNSZW1haW5pbmcgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZGlyZWN0VXJsID0gcmVzcG9uc2UubWVzc2FnZS5oZWFkZXJzWydsb2NhdGlvbiddO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlZGlyZWN0VXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSdzIG5vIGxvY2F0aW9uIHRvIHJlZGlyZWN0IHRvLCB3ZSB3b24ndFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkUmVkaXJlY3RVcmwgPSBuZXcgVVJMKHJlZGlyZWN0VXJsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOicgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZFVybC5wcm90b2NvbCAhPT0gcGFyc2VkUmVkaXJlY3RVcmwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICF0aGlzLl9hbGxvd1JlZGlyZWN0RG93bmdyYWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZGlyZWN0IGZyb20gSFRUUFMgdG8gSFRUUCBwcm90b2NvbC4gVGhpcyBkb3duZ3JhZGUgaXMgbm90IGFsbG93ZWQgZm9yIHNlY3VyaXR5IHJlYXNvbnMuIElmIHlvdSB3YW50IHRvIGFsbG93IHRoaXMgYmVoYXZpb3IsIHNldCB0aGUgYWxsb3dSZWRpcmVjdERvd25ncmFkZSBvcHRpb24gdG8gdHJ1ZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGZpbmlzaCByZWFkaW5nIHRoZSByZXNwb25zZSBiZWZvcmUgcmVhc3NpZ25pbmcgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hpY2ggd2lsbCBsZWFrIHRoZSBvcGVuIHNvY2tldC5cbiAgICAgICAgICAgICAgICAgICAgeWllbGQgcmVzcG9uc2UucmVhZEJvZHkoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RyaXAgYXV0aG9yaXphdGlvbiBoZWFkZXIgaWYgcmVkaXJlY3RlZCB0byBhIGRpZmZlcmVudCBob3N0bmFtZVxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VkUmVkaXJlY3RVcmwuaG9zdG5hbWUgIT09IHBhcnNlZFVybC5ob3N0bmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBoZWFkZXIgaW4gaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhlYWRlciBuYW1lcyBhcmUgY2FzZSBpbnNlbnNpdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZWFkZXIudG9Mb3dlckNhc2UoKSA9PT0gJ2F1dGhvcml6YXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBoZWFkZXJzW2hlYWRlcl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCdzIG1ha2UgdGhlIHJlcXVlc3Qgd2l0aCB0aGUgbmV3IHJlZGlyZWN0VXJsXG4gICAgICAgICAgICAgICAgICAgIGluZm8gPSB0aGlzLl9wcmVwYXJlUmVxdWVzdCh2ZXJiLCBwYXJzZWRSZWRpcmVjdFVybCwgaGVhZGVycyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0geWllbGQgdGhpcy5yZXF1ZXN0UmF3KGluZm8sIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdHNSZW1haW5pbmctLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5tZXNzYWdlLnN0YXR1c0NvZGUgfHxcbiAgICAgICAgICAgICAgICAgICAgIUh0dHBSZXNwb25zZVJldHJ5Q29kZXMuaW5jbHVkZXMocmVzcG9uc2UubWVzc2FnZS5zdGF0dXNDb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiBub3QgYSByZXRyeSBjb2RlLCByZXR1cm4gaW1tZWRpYXRlbHkgaW5zdGVhZCBvZiByZXRyeWluZ1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG51bVRyaWVzICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKG51bVRyaWVzIDwgbWF4VHJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgcmVzcG9uc2UucmVhZEJvZHkoKTtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgdGhpcy5fcGVyZm9ybUV4cG9uZW50aWFsQmFja29mZihudW1Ucmllcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAobnVtVHJpZXMgPCBtYXhUcmllcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBOZWVkcyB0byBiZSBjYWxsZWQgaWYga2VlcEFsaXZlIGlzIHNldCB0byB0cnVlIGluIHJlcXVlc3Qgb3B0aW9ucy5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5fYWdlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FnZW50LmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kaXNwb3NlZCA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJhdyByZXF1ZXN0LlxuICAgICAqIEBwYXJhbSBpbmZvXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICByZXF1ZXN0UmF3KGluZm8sIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY2FsbGJhY2tGb3JSZXN1bHQoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgYGVycmAgaXMgbm90IHBhc3NlZCwgdGhlbiBgcmVzYCBtdXN0IGJlIHBhc3NlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1Vua25vd24gZXJyb3InKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0UmF3V2l0aENhbGxiYWNrKGluZm8sIGRhdGEsIGNhbGxiYWNrRm9yUmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmF3IHJlcXVlc3Qgd2l0aCBjYWxsYmFjay5cbiAgICAgKiBAcGFyYW0gaW5mb1xuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHBhcmFtIG9uUmVzdWx0XG4gICAgICovXG4gICAgcmVxdWVzdFJhd1dpdGhDYWxsYmFjayhpbmZvLCBkYXRhLCBvblJlc3VsdCkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoIWluZm8ub3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgaW5mby5vcHRpb25zLmhlYWRlcnMgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZm8ub3B0aW9ucy5oZWFkZXJzWydDb250ZW50LUxlbmd0aCddID0gQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSwgJ3V0ZjgnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FsbGJhY2tDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVzdWx0KGVyciwgcmVzKSB7XG4gICAgICAgICAgICBpZiAoIWNhbGxiYWNrQ2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG9uUmVzdWx0KGVyciwgcmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXEgPSBpbmZvLmh0dHBNb2R1bGUucmVxdWVzdChpbmZvLm9wdGlvbnMsIChtc2cpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IG5ldyBIdHRwQ2xpZW50UmVzcG9uc2UobXNnKTtcbiAgICAgICAgICAgIGhhbmRsZVJlc3VsdCh1bmRlZmluZWQsIHJlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgc29ja2V0O1xuICAgICAgICByZXEub24oJ3NvY2tldCcsIHNvY2sgPT4ge1xuICAgICAgICAgICAgc29ja2V0ID0gc29jaztcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIElmIHdlIGV2ZXIgZ2V0IGRpc2Nvbm5lY3RlZCwgd2Ugd2FudCB0aGUgc29ja2V0IHRvIHRpbWVvdXQgZXZlbnR1YWxseVxuICAgICAgICByZXEuc2V0VGltZW91dCh0aGlzLl9zb2NrZXRUaW1lb3V0IHx8IDMgKiA2MDAwMCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNvY2tldCkge1xuICAgICAgICAgICAgICAgIHNvY2tldC5lbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhhbmRsZVJlc3VsdChuZXcgRXJyb3IoYFJlcXVlc3QgdGltZW91dDogJHtpbmZvLm9wdGlvbnMucGF0aH1gKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgLy8gZXJyIGhhcyBzdGF0dXNDb2RlIHByb3BlcnR5XG4gICAgICAgICAgICAvLyByZXMgc2hvdWxkIGhhdmUgaGVhZGVyc1xuICAgICAgICAgICAgaGFuZGxlUmVzdWx0KGVycik7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZGF0YSAmJiB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJlcS53cml0ZShkYXRhLCAndXRmOCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhICYmIHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGF0YS5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVxLmVuZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkYXRhLnBpcGUocmVxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlcS5lbmQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIGFuIGh0dHAgYWdlbnQuIFRoaXMgZnVuY3Rpb24gaXMgdXNlZnVsIHdoZW4geW91IG5lZWQgYW4gaHR0cCBhZ2VudCB0aGF0IGhhbmRsZXNcbiAgICAgKiByb3V0aW5nIHRocm91Z2ggYSBwcm94eSBzZXJ2ZXIgLSBkZXBlbmRpbmcgdXBvbiB0aGUgdXJsIGFuZCBwcm94eSBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG4gICAgICogQHBhcmFtIHNlcnZlclVybCAgVGhlIHNlcnZlciBVUkwgd2hlcmUgdGhlIHJlcXVlc3Qgd2lsbCBiZSBzZW50LiBGb3IgZXhhbXBsZSwgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbVxuICAgICAqL1xuICAgIGdldEFnZW50KHNlcnZlclVybCkge1xuICAgICAgICBjb25zdCBwYXJzZWRVcmwgPSBuZXcgVVJMKHNlcnZlclVybCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRBZ2VudChwYXJzZWRVcmwpO1xuICAgIH1cbiAgICBnZXRBZ2VudERpc3BhdGNoZXIoc2VydmVyVXJsKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwoc2VydmVyVXJsKTtcbiAgICAgICAgY29uc3QgcHJveHlVcmwgPSBwbS5nZXRQcm94eVVybChwYXJzZWRVcmwpO1xuICAgICAgICBjb25zdCB1c2VQcm94eSA9IHByb3h5VXJsICYmIHByb3h5VXJsLmhvc3RuYW1lO1xuICAgICAgICBpZiAoIXVzZVByb3h5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3h5QWdlbnREaXNwYXRjaGVyKHBhcnNlZFVybCwgcHJveHlVcmwpO1xuICAgIH1cbiAgICBfcHJlcGFyZVJlcXVlc3QobWV0aG9kLCByZXF1ZXN0VXJsLCBoZWFkZXJzKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7fTtcbiAgICAgICAgaW5mby5wYXJzZWRVcmwgPSByZXF1ZXN0VXJsO1xuICAgICAgICBjb25zdCB1c2luZ1NzbCA9IGluZm8ucGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcbiAgICAgICAgaW5mby5odHRwTW9kdWxlID0gdXNpbmdTc2wgPyBodHRwcyA6IGh0dHA7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRQb3J0ID0gdXNpbmdTc2wgPyA0NDMgOiA4MDtcbiAgICAgICAgaW5mby5vcHRpb25zID0ge307XG4gICAgICAgIGluZm8ub3B0aW9ucy5ob3N0ID0gaW5mby5wYXJzZWRVcmwuaG9zdG5hbWU7XG4gICAgICAgIGluZm8ub3B0aW9ucy5wb3J0ID0gaW5mby5wYXJzZWRVcmwucG9ydFxuICAgICAgICAgICAgPyBwYXJzZUludChpbmZvLnBhcnNlZFVybC5wb3J0KVxuICAgICAgICAgICAgOiBkZWZhdWx0UG9ydDtcbiAgICAgICAgaW5mby5vcHRpb25zLnBhdGggPVxuICAgICAgICAgICAgKGluZm8ucGFyc2VkVXJsLnBhdGhuYW1lIHx8ICcnKSArIChpbmZvLnBhcnNlZFVybC5zZWFyY2ggfHwgJycpO1xuICAgICAgICBpbmZvLm9wdGlvbnMubWV0aG9kID0gbWV0aG9kO1xuICAgICAgICBpbmZvLm9wdGlvbnMuaGVhZGVycyA9IHRoaXMuX21lcmdlSGVhZGVycyhoZWFkZXJzKTtcbiAgICAgICAgaWYgKHRoaXMudXNlckFnZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGluZm8ub3B0aW9ucy5oZWFkZXJzWyd1c2VyLWFnZW50J10gPSB0aGlzLnVzZXJBZ2VudDtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLm9wdGlvbnMuYWdlbnQgPSB0aGlzLl9nZXRBZ2VudChpbmZvLnBhcnNlZFVybCk7XG4gICAgICAgIC8vIGdpdmVzIGhhbmRsZXJzIGFuIG9wcG9ydHVuaXR5IHRvIHBhcnRpY2lwYXRlXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZXJzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGhhbmRsZXIgb2YgdGhpcy5oYW5kbGVycykge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIucHJlcGFyZVJlcXVlc3QoaW5mby5vcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5mbztcbiAgICB9XG4gICAgX21lcmdlSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RPcHRpb25zICYmIHRoaXMucmVxdWVzdE9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGxvd2VyY2FzZUtleXModGhpcy5yZXF1ZXN0T3B0aW9ucy5oZWFkZXJzKSwgbG93ZXJjYXNlS2V5cyhoZWFkZXJzIHx8IHt9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvd2VyY2FzZUtleXMoaGVhZGVycyB8fCB7fSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgYW4gZXhpc3RpbmcgaGVhZGVyIHZhbHVlIG9yIHJldHVybnMgYSBkZWZhdWx0LlxuICAgICAqIEhhbmRsZXMgY29udmVydGluZyBudW1iZXIgaGVhZGVyIHZhbHVlcyB0byBzdHJpbmdzIHNpbmNlIEhUVFAgaGVhZGVycyBtdXN0IGJlIHN0cmluZ3MuXG4gICAgICogTm90ZTogVGhpcyByZXR1cm5zIHN0cmluZyB8IHN0cmluZ1tdIHNpbmNlIHNvbWUgaGVhZGVycyBjYW4gaGF2ZSBtdWx0aXBsZSB2YWx1ZXMuXG4gICAgICogRm9yIGhlYWRlcnMgdGhhdCBtdXN0IGFsd2F5cyBiZSBhIHNpbmdsZSBzdHJpbmcgKGxpa2UgQ29udGVudC1UeXBlKSwgdXNlIHRoZVxuICAgICAqIHNwZWNpYWxpemVkIF9nZXRFeGlzdGluZ09yRGVmYXVsdENvbnRlbnRUeXBlSGVhZGVyIG1ldGhvZCBpbnN0ZWFkLlxuICAgICAqL1xuICAgIF9nZXRFeGlzdGluZ09yRGVmYXVsdEhlYWRlcihhZGRpdGlvbmFsSGVhZGVycywgaGVhZGVyLCBfZGVmYXVsdCkge1xuICAgICAgICBsZXQgY2xpZW50SGVhZGVyO1xuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0T3B0aW9ucyAmJiB0aGlzLnJlcXVlc3RPcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlclZhbHVlID0gbG93ZXJjYXNlS2V5cyh0aGlzLnJlcXVlc3RPcHRpb25zLmhlYWRlcnMpW2hlYWRlcl07XG4gICAgICAgICAgICBpZiAoaGVhZGVyVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjbGllbnRIZWFkZXIgPVxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgaGVhZGVyVmFsdWUgPT09ICdudW1iZXInID8gaGVhZGVyVmFsdWUudG9TdHJpbmcoKSA6IGhlYWRlclZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWxWYWx1ZSA9IGFkZGl0aW9uYWxIZWFkZXJzW2hlYWRlcl07XG4gICAgICAgIGlmIChhZGRpdGlvbmFsVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBhZGRpdGlvbmFsVmFsdWUgPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgPyBhZGRpdGlvbmFsVmFsdWUudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIDogYWRkaXRpb25hbFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjbGllbnRIZWFkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNsaWVudEhlYWRlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX2RlZmF1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNwZWNpYWxpemVkIHZlcnNpb24gb2YgX2dldEV4aXN0aW5nT3JEZWZhdWx0SGVhZGVyIGZvciBDb250ZW50LVR5cGUgaGVhZGVyLlxuICAgICAqIEFsd2F5cyByZXR1cm5zIGEgc2luZ2xlIHN0cmluZyAobm90IGFuIGFycmF5KSBzaW5jZSBDb250ZW50LVR5cGUgc2hvdWxkIGJlIGEgc2luZ2xlIHZhbHVlLlxuICAgICAqIENvbnZlcnRzIGFycmF5cyB0byBjb21tYS1zZXBhcmF0ZWQgc3RyaW5ncyBhbmQgbnVtYmVycyB0byBzdHJpbmdzIHRvIGVuc3VyZSB0eXBlIHNhZmV0eS5cbiAgICAgKiBUaGlzIHdhcyBzcGxpdCBmcm9tIF9nZXRFeGlzdGluZ09yRGVmYXVsdEhlYWRlciB0byBwcm92aWRlIHN0cmljdGVyIHR5cGluZyBmb3IgY2FsbGVyc1xuICAgICAqIHRoYXQgYXNzaWduIHRoZSByZXN1bHQgdG8gcGxhY2VzIGV4cGVjdGluZyBhIHN0cmluZyAoZS5nLiwgYWRkaXRpb25hbEhlYWRlcnNbSGVhZGVycy5Db250ZW50VHlwZV0pLlxuICAgICAqL1xuICAgIF9nZXRFeGlzdGluZ09yRGVmYXVsdENvbnRlbnRUeXBlSGVhZGVyKGFkZGl0aW9uYWxIZWFkZXJzLCBfZGVmYXVsdCkge1xuICAgICAgICBsZXQgY2xpZW50SGVhZGVyO1xuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0T3B0aW9ucyAmJiB0aGlzLnJlcXVlc3RPcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlclZhbHVlID0gbG93ZXJjYXNlS2V5cyh0aGlzLnJlcXVlc3RPcHRpb25zLmhlYWRlcnMpW0hlYWRlcnMuQ29udGVudFR5cGVdO1xuICAgICAgICAgICAgaWYgKGhlYWRlclZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBoZWFkZXJWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50SGVhZGVyID0gU3RyaW5nKGhlYWRlclZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50SGVhZGVyID0gaGVhZGVyVmFsdWUuam9pbignLCAnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWVudEhlYWRlciA9IGhlYWRlclZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhZGRpdGlvbmFsVmFsdWUgPSBhZGRpdGlvbmFsSGVhZGVyc1tIZWFkZXJzLkNvbnRlbnRUeXBlXTtcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBmaXJzdCBub24tdW5kZWZpbmVkIHZhbHVlLCBjb252ZXJ0aW5nIG51bWJlcnMgb3IgYXJyYXlzIHRvIHN0cmluZ3MgaWYgbmVjZXNzYXJ5XG4gICAgICAgIGlmIChhZGRpdGlvbmFsVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhZGRpdGlvbmFsVmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhhZGRpdGlvbmFsVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhZGRpdGlvbmFsVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxWYWx1ZS5qb2luKCcsICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2xpZW50SGVhZGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGllbnRIZWFkZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9kZWZhdWx0O1xuICAgIH1cbiAgICBfZ2V0QWdlbnQocGFyc2VkVXJsKSB7XG4gICAgICAgIGxldCBhZ2VudDtcbiAgICAgICAgY29uc3QgcHJveHlVcmwgPSBwbS5nZXRQcm94eVVybChwYXJzZWRVcmwpO1xuICAgICAgICBjb25zdCB1c2VQcm94eSA9IHByb3h5VXJsICYmIHByb3h5VXJsLmhvc3RuYW1lO1xuICAgICAgICBpZiAodGhpcy5fa2VlcEFsaXZlICYmIHVzZVByb3h5KSB7XG4gICAgICAgICAgICBhZ2VudCA9IHRoaXMuX3Byb3h5QWdlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1c2VQcm94eSkge1xuICAgICAgICAgICAgYWdlbnQgPSB0aGlzLl9hZ2VudDtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBhZ2VudCBpcyBhbHJlYWR5IGFzc2lnbmVkIHVzZSB0aGF0IGFnZW50LlxuICAgICAgICBpZiAoYWdlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2luZ1NzbCA9IHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgICAgIGxldCBtYXhTb2NrZXRzID0gMTAwO1xuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0T3B0aW9ucykge1xuICAgICAgICAgICAgbWF4U29ja2V0cyA9IHRoaXMucmVxdWVzdE9wdGlvbnMubWF4U29ja2V0cyB8fCBodHRwLmdsb2JhbEFnZW50Lm1heFNvY2tldHM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBpcyBgdXNlUHJveHlgIGFnYWluLCBidXQgd2UgbmVlZCB0byBjaGVjayBgcHJveHlVUmxgIGRpcmVjdGx5IGZvciBUeXBlU2NyaXB0cydzIGZsb3cgYW5hbHlzaXMuXG4gICAgICAgIGlmIChwcm94eVVybCAmJiBwcm94eVVybC5ob3N0bmFtZSkge1xuICAgICAgICAgICAgY29uc3QgYWdlbnRPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIG1heFNvY2tldHMsXG4gICAgICAgICAgICAgICAga2VlcEFsaXZlOiB0aGlzLl9rZWVwQWxpdmUsXG4gICAgICAgICAgICAgICAgcHJveHk6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgKChwcm94eVVybC51c2VybmFtZSB8fCBwcm94eVVybC5wYXNzd29yZCkgJiYge1xuICAgICAgICAgICAgICAgICAgICBwcm94eUF1dGg6IGAke3Byb3h5VXJsLnVzZXJuYW1lfToke3Byb3h5VXJsLnBhc3N3b3JkfWBcbiAgICAgICAgICAgICAgICB9KSksIHsgaG9zdDogcHJveHlVcmwuaG9zdG5hbWUsIHBvcnQ6IHByb3h5VXJsLnBvcnQgfSlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgdHVubmVsQWdlbnQ7XG4gICAgICAgICAgICBjb25zdCBvdmVySHR0cHMgPSBwcm94eVVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgICAgICAgICBpZiAodXNpbmdTc2wpIHtcbiAgICAgICAgICAgICAgICB0dW5uZWxBZ2VudCA9IG92ZXJIdHRwcyA/IHR1bm5lbC5odHRwc092ZXJIdHRwcyA6IHR1bm5lbC5odHRwc092ZXJIdHRwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHVubmVsQWdlbnQgPSBvdmVySHR0cHMgPyB0dW5uZWwuaHR0cE92ZXJIdHRwcyA6IHR1bm5lbC5odHRwT3Zlckh0dHA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZ2VudCA9IHR1bm5lbEFnZW50KGFnZW50T3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLl9wcm94eUFnZW50ID0gYWdlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdHVubmVsaW5nIGFnZW50IGlzbid0IGFzc2lnbmVkIGNyZWF0ZSBhIG5ldyBhZ2VudFxuICAgICAgICBpZiAoIWFnZW50KSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0geyBrZWVwQWxpdmU6IHRoaXMuX2tlZXBBbGl2ZSwgbWF4U29ja2V0cyB9O1xuICAgICAgICAgICAgYWdlbnQgPSB1c2luZ1NzbCA/IG5ldyBodHRwcy5BZ2VudChvcHRpb25zKSA6IG5ldyBodHRwLkFnZW50KG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5fYWdlbnQgPSBhZ2VudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXNpbmdTc2wgJiYgdGhpcy5faWdub3JlU3NsRXJyb3IpIHtcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gc2V0IE5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQ9MCBzaW5jZSB0aGF0IHdpbGwgYWZmZWN0IHJlcXVlc3QgZm9yIGVudGlyZSBwcm9jZXNzXG4gICAgICAgICAgICAvLyBodHRwLlJlcXVlc3RPcHRpb25zIGRvZXNuJ3QgZXhwb3NlIGEgd2F5IHRvIG1vZGlmeSBSZXF1ZXN0T3B0aW9ucy5hZ2VudC5vcHRpb25zXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIGNhc3QgaXQgdG8gYW55IGFuZCBjaGFuZ2UgaXQgZGlyZWN0bHlcbiAgICAgICAgICAgIGFnZW50Lm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGFnZW50Lm9wdGlvbnMgfHwge30sIHtcbiAgICAgICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWdlbnQ7XG4gICAgfVxuICAgIF9nZXRQcm94eUFnZW50RGlzcGF0Y2hlcihwYXJzZWRVcmwsIHByb3h5VXJsKSB7XG4gICAgICAgIGxldCBwcm94eUFnZW50O1xuICAgICAgICBpZiAodGhpcy5fa2VlcEFsaXZlKSB7XG4gICAgICAgICAgICBwcm94eUFnZW50ID0gdGhpcy5fcHJveHlBZ2VudERpc3BhdGNoZXI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgYWdlbnQgaXMgYWxyZWFkeSBhc3NpZ25lZCB1c2UgdGhhdCBhZ2VudC5cbiAgICAgICAgaWYgKHByb3h5QWdlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm94eUFnZW50O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzaW5nU3NsID0gcGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcbiAgICAgICAgcHJveHlBZ2VudCA9IG5ldyB1bmRpY2lfMS5Qcm94eUFnZW50KE9iamVjdC5hc3NpZ24oeyB1cmk6IHByb3h5VXJsLmhyZWYsIHBpcGVsaW5pbmc6ICF0aGlzLl9rZWVwQWxpdmUgPyAwIDogMSB9LCAoKHByb3h5VXJsLnVzZXJuYW1lIHx8IHByb3h5VXJsLnBhc3N3b3JkKSAmJiB7XG4gICAgICAgICAgICB0b2tlbjogYEJhc2ljICR7QnVmZmVyLmZyb20oYCR7cHJveHlVcmwudXNlcm5hbWV9OiR7cHJveHlVcmwucGFzc3dvcmR9YCkudG9TdHJpbmcoJ2Jhc2U2NCcpfWBcbiAgICAgICAgfSkpKTtcbiAgICAgICAgdGhpcy5fcHJveHlBZ2VudERpc3BhdGNoZXIgPSBwcm94eUFnZW50O1xuICAgICAgICBpZiAodXNpbmdTc2wgJiYgdGhpcy5faWdub3JlU3NsRXJyb3IpIHtcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gc2V0IE5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQ9MCBzaW5jZSB0aGF0IHdpbGwgYWZmZWN0IHJlcXVlc3QgZm9yIGVudGlyZSBwcm9jZXNzXG4gICAgICAgICAgICAvLyBodHRwLlJlcXVlc3RPcHRpb25zIGRvZXNuJ3QgZXhwb3NlIGEgd2F5IHRvIG1vZGlmeSBSZXF1ZXN0T3B0aW9ucy5hZ2VudC5vcHRpb25zXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIGNhc3QgaXQgdG8gYW55IGFuZCBjaGFuZ2UgaXQgZGlyZWN0bHlcbiAgICAgICAgICAgIHByb3h5QWdlbnQub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ocHJveHlBZ2VudC5vcHRpb25zLnJlcXVlc3RUbHMgfHwge30sIHtcbiAgICAgICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJveHlBZ2VudDtcbiAgICB9XG4gICAgX2dldFVzZXJBZ2VudFdpdGhPcmNoZXN0cmF0aW9uSWQodXNlckFnZW50KSB7XG4gICAgICAgIGNvbnN0IGJhc2VVc2VyQWdlbnQgPSB1c2VyQWdlbnQgfHwgJ2FjdGlvbnMvaHR0cC1jbGllbnQnO1xuICAgICAgICBjb25zdCBvcmNoSWQgPSBwcm9jZXNzLmVudlsnQUNUSU9OU19PUkNIRVNUUkFUSU9OX0lEJ107XG4gICAgICAgIGlmIChvcmNoSWQpIHtcbiAgICAgICAgICAgIC8vIFNhbml0aXplIHRoZSBvcmNoZXN0cmF0aW9uIElEIHRvIGVuc3VyZSBpdCBjb250YWlucyBvbmx5IHZhbGlkIGNoYXJhY3RlcnNcbiAgICAgICAgICAgIC8vIFZhbGlkIGNoYXJhY3RlcnM6IDAtOSwgYS16LCBfLCAtLCAuXG4gICAgICAgICAgICBjb25zdCBzYW5pdGl6ZWRJZCA9IG9yY2hJZC5yZXBsYWNlKC9bXmEtejAtOV8uLV0vZ2ksICdfJyk7XG4gICAgICAgICAgICByZXR1cm4gYCR7YmFzZVVzZXJBZ2VudH0gYWN0aW9uc19vcmNoZXN0cmF0aW9uX2lkLyR7c2FuaXRpemVkSWR9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmFzZVVzZXJBZ2VudDtcbiAgICB9XG4gICAgX3BlcmZvcm1FeHBvbmVudGlhbEJhY2tvZmYocmV0cnlOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHJ5TnVtYmVyID0gTWF0aC5taW4oRXhwb25lbnRpYWxCYWNrb2ZmQ2VpbGluZywgcmV0cnlOdW1iZXIpO1xuICAgICAgICAgICAgY29uc3QgbXMgPSBFeHBvbmVudGlhbEJhY2tvZmZUaW1lU2xpY2UgKiBNYXRoLnBvdygyLCByZXRyeU51bWJlcik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoKSwgbXMpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9wcm9jZXNzUmVzcG9uc2UocmVzLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSByZXMubWVzc2FnZS5zdGF0dXNDb2RlIHx8IDA7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge31cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vIG5vdCBmb3VuZCBsZWFkcyB0byBudWxsIG9iaiByZXR1cm5lZFxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXNDb2RlID09PSBIdHRwQ29kZXMuTm90Rm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgcmVzdWx0IGZyb20gdGhlIGJvZHlcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkYXRlVGltZURlc2VyaWFsaXplcihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTihhLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBvYmo7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRzO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzID0geWllbGQgcmVzLnJlYWRCb2R5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50cyAmJiBjb250ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmRlc2VyaWFsaXplRGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmogPSBKU09OLnBhcnNlKGNvbnRlbnRzLCBkYXRlVGltZURlc2VyaWFsaXplcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmogPSBKU09OLnBhcnNlKGNvbnRlbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnJlc3VsdCA9IG9iajtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5oZWFkZXJzID0gcmVzLm1lc3NhZ2UuaGVhZGVycztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbnZhbGlkIHJlc291cmNlIChjb250ZW50cyBub3QganNvbik7ICBsZWF2aW5nIHJlc3VsdCBvYmogbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBub3RlIHRoYXQgM3h4IHJlZGlyZWN0cyBhcmUgaGFuZGxlZCBieSB0aGUgaHR0cCBsYXllci5cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzQ29kZSA+IDI5OSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbXNnO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBleGNlcHRpb24vZXJyb3IgaW4gYm9keSwgYXR0ZW1wdCB0byBnZXQgYmV0dGVyIGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmogJiYgb2JqLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZyA9IG9iai5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbnRlbnRzICYmIGNvbnRlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0IG1heSBiZSB0aGUgY2FzZSB0aGF0IHRoZSBleGNlcHRpb24gaXMgaW4gdGhlIGJvZHkgbWVzc2FnZSBhcyBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZyA9IGNvbnRlbnRzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXNnID0gYEZhaWxlZCByZXF1ZXN0OiAoJHtzdGF0dXNDb2RlfSlgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBIdHRwQ2xpZW50RXJyb3IobXNnLCBzdGF0dXNDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgZXJyLnJlc3VsdCA9IHJlc3BvbnNlLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuSHR0cENsaWVudCA9IEh0dHBDbGllbnQ7XG5jb25zdCBsb3dlcmNhc2VLZXlzID0gKG9iaikgPT4gT2JqZWN0LmtleXMob2JqKS5yZWR1Y2UoKGMsIGspID0+ICgoY1trLnRvTG93ZXJDYXNlKCldID0gb2JqW2tdKSwgYyksIHt9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0ICogYXMgaHR0cENsaWVudCBmcm9tICdAYWN0aW9ucy9odHRwLWNsaWVudCc7XG5pbXBvcnQgeyBmZXRjaCB9IGZyb20gJ3VuZGljaSc7XG5leHBvcnQgZnVuY3Rpb24gZ2V0QXV0aFN0cmluZyh0b2tlbiwgb3B0aW9ucykge1xuICAgIGlmICghdG9rZW4gJiYgIW9wdGlvbnMuYXV0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciB0b2tlbiBvciBvcHRzLmF1dGggaXMgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodG9rZW4gJiYgb3B0aW9ucy5hdXRoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVycyB0b2tlbiBhbmQgb3B0cy5hdXRoIG1heSBub3QgYm90aCBiZSBzcGVjaWZpZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVvZiBvcHRpb25zLmF1dGggPT09ICdzdHJpbmcnID8gb3B0aW9ucy5hdXRoIDogYHRva2VuICR7dG9rZW59YDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm94eUFnZW50KGRlc3RpbmF0aW9uVXJsKSB7XG4gICAgY29uc3QgaGMgPSBuZXcgaHR0cENsaWVudC5IdHRwQ2xpZW50KCk7XG4gICAgcmV0dXJuIGhjLmdldEFnZW50KGRlc3RpbmF0aW9uVXJsKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm94eUFnZW50RGlzcGF0Y2hlcihkZXN0aW5hdGlvblVybCkge1xuICAgIGNvbnN0IGhjID0gbmV3IGh0dHBDbGllbnQuSHR0cENsaWVudCgpO1xuICAgIHJldHVybiBoYy5nZXRBZ2VudERpc3BhdGNoZXIoZGVzdGluYXRpb25VcmwpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3h5RmV0Y2goZGVzdGluYXRpb25VcmwpIHtcbiAgICBjb25zdCBodHRwRGlzcGF0Y2hlciA9IGdldFByb3h5QWdlbnREaXNwYXRjaGVyKGRlc3RpbmF0aW9uVXJsKTtcbiAgICBjb25zdCBwcm94eUZldGNoID0gKHVybCwgb3B0cykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2godXJsLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdHMpLCB7IGRpc3BhdGNoZXI6IGh0dHBEaXNwYXRjaGVyIH0pKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcHJveHlGZXRjaDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcGlCYXNlVXJsKCkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudlsnR0lUSFVCX0FQSV9VUkwnXSB8fCAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSc7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlscy5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gZ2V0VXNlckFnZW50KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciA9PT0gXCJvYmplY3RcIiAmJiBcInVzZXJBZ2VudFwiIGluIG5hdmlnYXRvcikge1xuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHByb2Nlc3MudmVyc2lvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGBOb2RlLmpzLyR7cHJvY2Vzcy52ZXJzaW9uLnN1YnN0cigxKX0gKCR7cHJvY2Vzcy5wbGF0Zm9ybX07ICR7XG4gICAgICBwcm9jZXNzLmFyY2hcbiAgICB9KWA7XG4gIH1cblxuICByZXR1cm4gXCI8ZW52aXJvbm1lbnQgdW5kZXRlY3RhYmxlPlwiO1xufVxuIiwiLy8gQHRzLWNoZWNrXG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlcihzdGF0ZSwgbmFtZSwgbWV0aG9kLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgbWV0aG9kICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJtZXRob2QgZm9yIGJlZm9yZSBob29rIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG5hbWUpKSB7XG4gICAgcmV0dXJuIG5hbWUucmV2ZXJzZSgpLnJlZHVjZSgoY2FsbGJhY2ssIG5hbWUpID0+IHtcbiAgICAgIHJldHVybiByZWdpc3Rlci5iaW5kKG51bGwsIHN0YXRlLCBuYW1lLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgfSwgbWV0aG9kKSgpO1xuICB9XG5cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgIGlmICghc3RhdGUucmVnaXN0cnlbbmFtZV0pIHtcbiAgICAgIHJldHVybiBtZXRob2Qob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlLnJlZ2lzdHJ5W25hbWVdLnJlZHVjZSgobWV0aG9kLCByZWdpc3RlcmVkKSA9PiB7XG4gICAgICByZXR1cm4gcmVnaXN0ZXJlZC5ob29rLmJpbmQobnVsbCwgbWV0aG9kLCBvcHRpb25zKTtcbiAgICB9LCBtZXRob2QpKCk7XG4gIH0pO1xufVxuIiwiLy8gQHRzLWNoZWNrXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRIb29rKHN0YXRlLCBraW5kLCBuYW1lLCBob29rKSB7XG4gIGNvbnN0IG9yaWcgPSBob29rO1xuICBpZiAoIXN0YXRlLnJlZ2lzdHJ5W25hbWVdKSB7XG4gICAgc3RhdGUucmVnaXN0cnlbbmFtZV0gPSBbXTtcbiAgfVxuXG4gIGlmIChraW5kID09PSBcImJlZm9yZVwiKSB7XG4gICAgaG9vayA9IChtZXRob2QsIG9wdGlvbnMpID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAudGhlbihvcmlnLmJpbmQobnVsbCwgb3B0aW9ucykpXG4gICAgICAgIC50aGVuKG1ldGhvZC5iaW5kKG51bGwsIG9wdGlvbnMpKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKGtpbmQgPT09IFwiYWZ0ZXJcIikge1xuICAgIGhvb2sgPSAobWV0aG9kLCBvcHRpb25zKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0O1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgIC50aGVuKG1ldGhvZC5iaW5kKG51bGwsIG9wdGlvbnMpKVxuICAgICAgICAudGhlbigocmVzdWx0XykgPT4ge1xuICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdF87XG4gICAgICAgICAgcmV0dXJuIG9yaWcocmVzdWx0LCBvcHRpb25zKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBpZiAoa2luZCA9PT0gXCJlcnJvclwiKSB7XG4gICAgaG9vayA9IChtZXRob2QsIG9wdGlvbnMpID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAudGhlbihtZXRob2QuYmluZChudWxsLCBvcHRpb25zKSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIHJldHVybiBvcmlnKGVycm9yLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRlLnJlZ2lzdHJ5W25hbWVdLnB1c2goe1xuICAgIGhvb2s6IGhvb2ssXG4gICAgb3JpZzogb3JpZyxcbiAgfSk7XG59XG4iLCIvLyBAdHMtY2hlY2tcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUhvb2soc3RhdGUsIG5hbWUsIG1ldGhvZCkge1xuICBpZiAoIXN0YXRlLnJlZ2lzdHJ5W25hbWVdKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaW5kZXggPSBzdGF0ZS5yZWdpc3RyeVtuYW1lXVxuICAgIC5tYXAoKHJlZ2lzdGVyZWQpID0+IHtcbiAgICAgIHJldHVybiByZWdpc3RlcmVkLm9yaWc7XG4gICAgfSlcbiAgICAuaW5kZXhPZihtZXRob2QpO1xuXG4gIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzdGF0ZS5yZWdpc3RyeVtuYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xufVxuIiwiLy8gQHRzLWNoZWNrXG5cbmltcG9ydCB7IHJlZ2lzdGVyIH0gZnJvbSBcIi4vbGliL3JlZ2lzdGVyLmpzXCI7XG5pbXBvcnQgeyBhZGRIb29rIH0gZnJvbSBcIi4vbGliL2FkZC5qc1wiO1xuaW1wb3J0IHsgcmVtb3ZlSG9vayB9IGZyb20gXCIuL2xpYi9yZW1vdmUuanNcIjtcblxuLy8gYmluZCB3aXRoIGFycmF5IG9mIGFyZ3VtZW50czogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxNzkyOTEzXG5jb25zdCBiaW5kID0gRnVuY3Rpb24uYmluZDtcbmNvbnN0IGJpbmRhYmxlID0gYmluZC5iaW5kKGJpbmQpO1xuXG5mdW5jdGlvbiBiaW5kQXBpKGhvb2ssIHN0YXRlLCBuYW1lKSB7XG4gIGNvbnN0IHJlbW92ZUhvb2tSZWYgPSBiaW5kYWJsZShyZW1vdmVIb29rLCBudWxsKS5hcHBseShcbiAgICBudWxsLFxuICAgIG5hbWUgPyBbc3RhdGUsIG5hbWVdIDogW3N0YXRlXVxuICApO1xuICBob29rLmFwaSA9IHsgcmVtb3ZlOiByZW1vdmVIb29rUmVmIH07XG4gIGhvb2sucmVtb3ZlID0gcmVtb3ZlSG9va1JlZjtcbiAgW1wiYmVmb3JlXCIsIFwiZXJyb3JcIiwgXCJhZnRlclwiLCBcIndyYXBcIl0uZm9yRWFjaCgoa2luZCkgPT4ge1xuICAgIGNvbnN0IGFyZ3MgPSBuYW1lID8gW3N0YXRlLCBraW5kLCBuYW1lXSA6IFtzdGF0ZSwga2luZF07XG4gICAgaG9va1traW5kXSA9IGhvb2suYXBpW2tpbmRdID0gYmluZGFibGUoYWRkSG9vaywgbnVsbCkuYXBwbHkobnVsbCwgYXJncyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBTaW5ndWxhcigpIHtcbiAgY29uc3Qgc2luZ3VsYXJIb29rTmFtZSA9IFN5bWJvbChcIlNpbmd1bGFyXCIpO1xuICBjb25zdCBzaW5ndWxhckhvb2tTdGF0ZSA9IHtcbiAgICByZWdpc3RyeToge30sXG4gIH07XG4gIGNvbnN0IHNpbmd1bGFySG9vayA9IHJlZ2lzdGVyLmJpbmQobnVsbCwgc2luZ3VsYXJIb29rU3RhdGUsIHNpbmd1bGFySG9va05hbWUpO1xuICBiaW5kQXBpKHNpbmd1bGFySG9vaywgc2luZ3VsYXJIb29rU3RhdGUsIHNpbmd1bGFySG9va05hbWUpO1xuICByZXR1cm4gc2luZ3VsYXJIb29rO1xufVxuXG5mdW5jdGlvbiBDb2xsZWN0aW9uKCkge1xuICBjb25zdCBzdGF0ZSA9IHtcbiAgICByZWdpc3RyeToge30sXG4gIH07XG5cbiAgY29uc3QgaG9vayA9IHJlZ2lzdGVyLmJpbmQobnVsbCwgc3RhdGUpO1xuICBiaW5kQXBpKGhvb2ssIHN0YXRlKTtcblxuICByZXR1cm4gaG9vaztcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBTaW5ndWxhciwgQ29sbGVjdGlvbiB9O1xuIiwiLy8gcGtnL2Rpc3Qtc3JjL2RlZmF1bHRzLmpzXG5pbXBvcnQgeyBnZXRVc2VyQWdlbnQgfSBmcm9tIFwidW5pdmVyc2FsLXVzZXItYWdlbnRcIjtcblxuLy8gcGtnL2Rpc3Qtc3JjL3ZlcnNpb24uanNcbnZhciBWRVJTSU9OID0gXCIwLjAuMC1kZXZlbG9wbWVudFwiO1xuXG4vLyBwa2cvZGlzdC1zcmMvZGVmYXVsdHMuanNcbnZhciB1c2VyQWdlbnQgPSBgb2N0b2tpdC1lbmRwb2ludC5qcy8ke1ZFUlNJT059ICR7Z2V0VXNlckFnZW50KCl9YDtcbnZhciBERUZBVUxUUyA9IHtcbiAgbWV0aG9kOiBcIkdFVFwiLFxuICBiYXNlVXJsOiBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb21cIixcbiAgaGVhZGVyczoge1xuICAgIGFjY2VwdDogXCJhcHBsaWNhdGlvbi92bmQuZ2l0aHViLnYzK2pzb25cIixcbiAgICBcInVzZXItYWdlbnRcIjogdXNlckFnZW50XG4gIH0sXG4gIG1lZGlhVHlwZToge1xuICAgIGZvcm1hdDogXCJcIlxuICB9XG59O1xuXG4vLyBwa2cvZGlzdC1zcmMvdXRpbC9sb3dlcmNhc2Uta2V5cy5qc1xuZnVuY3Rpb24gbG93ZXJjYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFvYmplY3QpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdCkucmVkdWNlKChuZXdPYmosIGtleSkgPT4ge1xuICAgIG5ld09ialtrZXkudG9Mb3dlckNhc2UoKV0gPSBvYmplY3Rba2V5XTtcbiAgICByZXR1cm4gbmV3T2JqO1xuICB9LCB7fSk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy91dGlsL2lzLXBsYWluLW9iamVjdC5qc1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IHZhbHVlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICE9PSBcIltvYmplY3QgT2JqZWN0XVwiKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgY29uc3QgQ3RvciA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgXCJjb25zdHJ1Y3RvclwiKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09PSBcImZ1bmN0aW9uXCIgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwoQ3RvcikgPT09IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsKHZhbHVlKTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL3V0aWwvbWVyZ2UtZGVlcC5qc1xuZnVuY3Rpb24gbWVyZ2VEZWVwKGRlZmF1bHRzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzKTtcbiAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKGlzUGxhaW5PYmplY3Qob3B0aW9uc1trZXldKSkge1xuICAgICAgaWYgKCEoa2V5IGluIGRlZmF1bHRzKSkgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgW2tleV06IG9wdGlvbnNba2V5XSB9KTtcbiAgICAgIGVsc2UgcmVzdWx0W2tleV0gPSBtZXJnZURlZXAoZGVmYXVsdHNba2V5XSwgb3B0aW9uc1trZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgW2tleV06IG9wdGlvbnNba2V5XSB9KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvdXRpbC9yZW1vdmUtdW5kZWZpbmVkLXByb3BlcnRpZXMuanNcbmZ1bmN0aW9uIHJlbW92ZVVuZGVmaW5lZFByb3BlcnRpZXMob2JqKSB7XG4gIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgIGlmIChvYmpba2V5XSA9PT0gdm9pZCAwKSB7XG4gICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9tZXJnZS5qc1xuZnVuY3Rpb24gbWVyZ2UoZGVmYXVsdHMsIHJvdXRlLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2Ygcm91dGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBsZXQgW21ldGhvZCwgdXJsXSA9IHJvdXRlLnNwbGl0KFwiIFwiKTtcbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih1cmwgPyB7IG1ldGhvZCwgdXJsIH0gOiB7IHVybDogbWV0aG9kIH0sIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCByb3V0ZSk7XG4gIH1cbiAgb3B0aW9ucy5oZWFkZXJzID0gbG93ZXJjYXNlS2V5cyhvcHRpb25zLmhlYWRlcnMpO1xuICByZW1vdmVVbmRlZmluZWRQcm9wZXJ0aWVzKG9wdGlvbnMpO1xuICByZW1vdmVVbmRlZmluZWRQcm9wZXJ0aWVzKG9wdGlvbnMuaGVhZGVycyk7XG4gIGNvbnN0IG1lcmdlZE9wdGlvbnMgPSBtZXJnZURlZXAoZGVmYXVsdHMgfHwge30sIG9wdGlvbnMpO1xuICBpZiAob3B0aW9ucy51cmwgPT09IFwiL2dyYXBocWxcIikge1xuICAgIGlmIChkZWZhdWx0cyAmJiBkZWZhdWx0cy5tZWRpYVR5cGUucHJldmlld3M/Lmxlbmd0aCkge1xuICAgICAgbWVyZ2VkT3B0aW9ucy5tZWRpYVR5cGUucHJldmlld3MgPSBkZWZhdWx0cy5tZWRpYVR5cGUucHJldmlld3MuZmlsdGVyKFxuICAgICAgICAocHJldmlldykgPT4gIW1lcmdlZE9wdGlvbnMubWVkaWFUeXBlLnByZXZpZXdzLmluY2x1ZGVzKHByZXZpZXcpXG4gICAgICApLmNvbmNhdChtZXJnZWRPcHRpb25zLm1lZGlhVHlwZS5wcmV2aWV3cyk7XG4gICAgfVxuICAgIG1lcmdlZE9wdGlvbnMubWVkaWFUeXBlLnByZXZpZXdzID0gKG1lcmdlZE9wdGlvbnMubWVkaWFUeXBlLnByZXZpZXdzIHx8IFtdKS5tYXAoKHByZXZpZXcpID0+IHByZXZpZXcucmVwbGFjZSgvLXByZXZpZXcvLCBcIlwiKSk7XG4gIH1cbiAgcmV0dXJuIG1lcmdlZE9wdGlvbnM7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy91dGlsL2FkZC1xdWVyeS1wYXJhbWV0ZXJzLmpzXG5mdW5jdGlvbiBhZGRRdWVyeVBhcmFtZXRlcnModXJsLCBwYXJhbWV0ZXJzKSB7XG4gIGNvbnN0IHNlcGFyYXRvciA9IC9cXD8vLnRlc3QodXJsKSA/IFwiJlwiIDogXCI/XCI7XG4gIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXMocGFyYW1ldGVycyk7XG4gIGlmIChuYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHJldHVybiB1cmwgKyBzZXBhcmF0b3IgKyBuYW1lcy5tYXAoKG5hbWUpID0+IHtcbiAgICBpZiAobmFtZSA9PT0gXCJxXCIpIHtcbiAgICAgIHJldHVybiBcInE9XCIgKyBwYXJhbWV0ZXJzLnEuc3BsaXQoXCIrXCIpLm1hcChlbmNvZGVVUklDb21wb25lbnQpLmpvaW4oXCIrXCIpO1xuICAgIH1cbiAgICByZXR1cm4gYCR7bmFtZX09JHtlbmNvZGVVUklDb21wb25lbnQocGFyYW1ldGVyc1tuYW1lXSl9YDtcbiAgfSkuam9pbihcIiZcIik7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy91dGlsL2V4dHJhY3QtdXJsLXZhcmlhYmxlLW5hbWVzLmpzXG52YXIgdXJsVmFyaWFibGVSZWdleCA9IC9cXHtbXnt9fV0rXFx9L2c7XG5mdW5jdGlvbiByZW1vdmVOb25DaGFycyh2YXJpYWJsZU5hbWUpIHtcbiAgcmV0dXJuIHZhcmlhYmxlTmFtZS5yZXBsYWNlKC8oPzpeXFxXKyl8KD86KD88IVxcVylcXFcrJCkvZywgXCJcIikuc3BsaXQoLywvKTtcbn1cbmZ1bmN0aW9uIGV4dHJhY3RVcmxWYXJpYWJsZU5hbWVzKHVybCkge1xuICBjb25zdCBtYXRjaGVzID0gdXJsLm1hdGNoKHVybFZhcmlhYmxlUmVnZXgpO1xuICBpZiAoIW1hdGNoZXMpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgcmV0dXJuIG1hdGNoZXMubWFwKHJlbW92ZU5vbkNoYXJzKS5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpLCBbXSk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy91dGlsL29taXQuanNcbmZ1bmN0aW9uIG9taXQob2JqZWN0LCBrZXlzVG9PbWl0KSB7XG4gIGNvbnN0IHJlc3VsdCA9IHsgX19wcm90b19fOiBudWxsIH07XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iamVjdCkpIHtcbiAgICBpZiAoa2V5c1RvT21pdC5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG9iamVjdFtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvdXRpbC91cmwtdGVtcGxhdGUuanNcbmZ1bmN0aW9uIGVuY29kZVJlc2VydmVkKHN0cikge1xuICByZXR1cm4gc3RyLnNwbGl0KC8oJVswLTlBLUZhLWZdezJ9KS9nKS5tYXAoZnVuY3Rpb24ocGFydCkge1xuICAgIGlmICghLyVbMC05QS1GYS1mXS8udGVzdChwYXJ0KSkge1xuICAgICAgcGFydCA9IGVuY29kZVVSSShwYXJ0KS5yZXBsYWNlKC8lNUIvZywgXCJbXCIpLnJlcGxhY2UoLyU1RC9nLCBcIl1cIik7XG4gICAgfVxuICAgIHJldHVybiBwYXJ0O1xuICB9KS5qb2luKFwiXCIpO1xufVxuZnVuY3Rpb24gZW5jb2RlVW5yZXNlcnZlZChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpKl0vZywgZnVuY3Rpb24oYykge1xuICAgIHJldHVybiBcIiVcIiArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWUsIGtleSkge1xuICB2YWx1ZSA9IG9wZXJhdG9yID09PSBcIitcIiB8fCBvcGVyYXRvciA9PT0gXCIjXCIgPyBlbmNvZGVSZXNlcnZlZCh2YWx1ZSkgOiBlbmNvZGVVbnJlc2VydmVkKHZhbHVlKTtcbiAgaWYgKGtleSkge1xuICAgIHJldHVybiBlbmNvZGVVbnJlc2VydmVkKGtleSkgKyBcIj1cIiArIHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuZnVuY3Rpb24gaXNEZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdm9pZCAwICYmIHZhbHVlICE9PSBudWxsO1xufVxuZnVuY3Rpb24gaXNLZXlPcGVyYXRvcihvcGVyYXRvcikge1xuICByZXR1cm4gb3BlcmF0b3IgPT09IFwiO1wiIHx8IG9wZXJhdG9yID09PSBcIiZcIiB8fCBvcGVyYXRvciA9PT0gXCI/XCI7XG59XG5mdW5jdGlvbiBnZXRWYWx1ZXMoY29udGV4dCwgb3BlcmF0b3IsIGtleSwgbW9kaWZpZXIpIHtcbiAgdmFyIHZhbHVlID0gY29udGV4dFtrZXldLCByZXN1bHQgPSBbXTtcbiAgaWYgKGlzRGVmaW5lZCh2YWx1ZSkgJiYgdmFsdWUgIT09IFwiXCIpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwiYmlnaW50XCIgfHwgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikge1xuICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgaWYgKG1vZGlmaWVyICYmIG1vZGlmaWVyICE9PSBcIipcIikge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygwLCBwYXJzZUludChtb2RpZmllciwgMTApKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICBlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWUsIGlzS2V5T3BlcmF0b3Iob3BlcmF0b3IpID8ga2V5IDogXCJcIilcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtb2RpZmllciA9PT0gXCIqXCIpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWUuZmlsdGVyKGlzRGVmaW5lZCkuZm9yRWFjaChmdW5jdGlvbih2YWx1ZTIpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICBlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWUyLCBpc0tleU9wZXJhdG9yKG9wZXJhdG9yKSA/IGtleSA6IFwiXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcbiAgICAgICAgICAgIGlmIChpc0RlZmluZWQodmFsdWVba10pKSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZVtrXSwgaykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0bXAgPSBbXTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWUuZmlsdGVyKGlzRGVmaW5lZCkuZm9yRWFjaChmdW5jdGlvbih2YWx1ZTIpIHtcbiAgICAgICAgICAgIHRtcC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZTIpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWZpbmVkKHZhbHVlW2tdKSkge1xuICAgICAgICAgICAgICB0bXAucHVzaChlbmNvZGVVbnJlc2VydmVkKGspKTtcbiAgICAgICAgICAgICAgdG1wLnB1c2goZW5jb2RlVmFsdWUob3BlcmF0b3IsIHZhbHVlW2tdLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNLZXlPcGVyYXRvcihvcGVyYXRvcikpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVVbnJlc2VydmVkKGtleSkgKyBcIj1cIiArIHRtcC5qb2luKFwiLFwiKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodG1wLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHRtcC5qb2luKFwiLFwiKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG9wZXJhdG9yID09PSBcIjtcIikge1xuICAgICAgaWYgKGlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZW5jb2RlVW5yZXNlcnZlZChrZXkpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcIlwiICYmIChvcGVyYXRvciA9PT0gXCImXCIgfHwgb3BlcmF0b3IgPT09IFwiP1wiKSkge1xuICAgICAgcmVzdWx0LnB1c2goZW5jb2RlVW5yZXNlcnZlZChrZXkpICsgXCI9XCIpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiXCIpIHtcbiAgICAgIHJlc3VsdC5wdXNoKFwiXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gcGFyc2VVcmwodGVtcGxhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICBleHBhbmQ6IGV4cGFuZC5iaW5kKG51bGwsIHRlbXBsYXRlKVxuICB9O1xufVxuZnVuY3Rpb24gZXhwYW5kKHRlbXBsYXRlLCBjb250ZXh0KSB7XG4gIHZhciBvcGVyYXRvcnMgPSBbXCIrXCIsIFwiI1wiLCBcIi5cIiwgXCIvXCIsIFwiO1wiLCBcIj9cIiwgXCImXCJdO1xuICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoXG4gICAgL1xceyhbXlxce1xcfV0rKVxcfXwoW15cXHtcXH1dKykvZyxcbiAgICBmdW5jdGlvbihfLCBleHByZXNzaW9uLCBsaXRlcmFsKSB7XG4gICAgICBpZiAoZXhwcmVzc2lvbikge1xuICAgICAgICBsZXQgb3BlcmF0b3IgPSBcIlwiO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgaWYgKG9wZXJhdG9ycy5pbmRleE9mKGV4cHJlc3Npb24uY2hhckF0KDApKSAhPT0gLTEpIHtcbiAgICAgICAgICBvcGVyYXRvciA9IGV4cHJlc3Npb24uY2hhckF0KDApO1xuICAgICAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnN1YnN0cigxKTtcbiAgICAgICAgfVxuICAgICAgICBleHByZXNzaW9uLnNwbGl0KC8sL2cpLmZvckVhY2goZnVuY3Rpb24odmFyaWFibGUpIHtcbiAgICAgICAgICB2YXIgdG1wID0gLyhbXjpcXCpdKikoPzo6KFxcZCspfChcXCopKT8vLmV4ZWModmFyaWFibGUpO1xuICAgICAgICAgIHZhbHVlcy5wdXNoKGdldFZhbHVlcyhjb250ZXh0LCBvcGVyYXRvciwgdG1wWzFdLCB0bXBbMl0gfHwgdG1wWzNdKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob3BlcmF0b3IgJiYgb3BlcmF0b3IgIT09IFwiK1wiKSB7XG4gICAgICAgICAgdmFyIHNlcGFyYXRvciA9IFwiLFwiO1xuICAgICAgICAgIGlmIChvcGVyYXRvciA9PT0gXCI/XCIpIHtcbiAgICAgICAgICAgIHNlcGFyYXRvciA9IFwiJlwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgIT09IFwiI1wiKSB7XG4gICAgICAgICAgICBzZXBhcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICh2YWx1ZXMubGVuZ3RoICE9PSAwID8gb3BlcmF0b3IgOiBcIlwiKSArIHZhbHVlcy5qb2luKHNlcGFyYXRvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlcy5qb2luKFwiLFwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZVJlc2VydmVkKGxpdGVyYWwpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbiAgaWYgKHRlbXBsYXRlID09PSBcIi9cIikge1xuICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xuICB9XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9wYXJzZS5qc1xuZnVuY3Rpb24gcGFyc2Uob3B0aW9ucykge1xuICBsZXQgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QudG9VcHBlckNhc2UoKTtcbiAgbGV0IHVybCA9IChvcHRpb25zLnVybCB8fCBcIi9cIikucmVwbGFjZSgvOihbYS16XVxcdyspL2csIFwieyQxfVwiKTtcbiAgbGV0IGhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLmhlYWRlcnMpO1xuICBsZXQgYm9keTtcbiAgbGV0IHBhcmFtZXRlcnMgPSBvbWl0KG9wdGlvbnMsIFtcbiAgICBcIm1ldGhvZFwiLFxuICAgIFwiYmFzZVVybFwiLFxuICAgIFwidXJsXCIsXG4gICAgXCJoZWFkZXJzXCIsXG4gICAgXCJyZXF1ZXN0XCIsXG4gICAgXCJtZWRpYVR5cGVcIlxuICBdKTtcbiAgY29uc3QgdXJsVmFyaWFibGVOYW1lcyA9IGV4dHJhY3RVcmxWYXJpYWJsZU5hbWVzKHVybCk7XG4gIHVybCA9IHBhcnNlVXJsKHVybCkuZXhwYW5kKHBhcmFtZXRlcnMpO1xuICBpZiAoIS9eaHR0cC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gb3B0aW9ucy5iYXNlVXJsICsgdXJsO1xuICB9XG4gIGNvbnN0IG9taXR0ZWRQYXJhbWV0ZXJzID0gT2JqZWN0LmtleXMob3B0aW9ucykuZmlsdGVyKChvcHRpb24pID0+IHVybFZhcmlhYmxlTmFtZXMuaW5jbHVkZXMob3B0aW9uKSkuY29uY2F0KFwiYmFzZVVybFwiKTtcbiAgY29uc3QgcmVtYWluaW5nUGFyYW1ldGVycyA9IG9taXQocGFyYW1ldGVycywgb21pdHRlZFBhcmFtZXRlcnMpO1xuICBjb25zdCBpc0JpbmFyeVJlcXVlc3QgPSAvYXBwbGljYXRpb25cXC9vY3RldC1zdHJlYW0vaS50ZXN0KGhlYWRlcnMuYWNjZXB0KTtcbiAgaWYgKCFpc0JpbmFyeVJlcXVlc3QpIHtcbiAgICBpZiAob3B0aW9ucy5tZWRpYVR5cGUuZm9ybWF0KSB7XG4gICAgICBoZWFkZXJzLmFjY2VwdCA9IGhlYWRlcnMuYWNjZXB0LnNwbGl0KC8sLykubWFwKFxuICAgICAgICAoZm9ybWF0KSA9PiBmb3JtYXQucmVwbGFjZShcbiAgICAgICAgICAvYXBwbGljYXRpb25cXC92bmQoXFwuXFx3KykoXFwudjMpPyhcXC5cXHcrKT8oXFwranNvbik/JC8sXG4gICAgICAgICAgYGFwcGxpY2F0aW9uL3ZuZCQxJDIuJHtvcHRpb25zLm1lZGlhVHlwZS5mb3JtYXR9YFxuICAgICAgICApXG4gICAgICApLmpvaW4oXCIsXCIpO1xuICAgIH1cbiAgICBpZiAodXJsLmVuZHNXaXRoKFwiL2dyYXBocWxcIikpIHtcbiAgICAgIGlmIChvcHRpb25zLm1lZGlhVHlwZS5wcmV2aWV3cz8ubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHByZXZpZXdzRnJvbUFjY2VwdEhlYWRlciA9IGhlYWRlcnMuYWNjZXB0Lm1hdGNoKC8oPzwhW1xcdy1dKVtcXHctXSsoPz0tcHJldmlldykvZykgfHwgW107XG4gICAgICAgIGhlYWRlcnMuYWNjZXB0ID0gcHJldmlld3NGcm9tQWNjZXB0SGVhZGVyLmNvbmNhdChvcHRpb25zLm1lZGlhVHlwZS5wcmV2aWV3cykubWFwKChwcmV2aWV3KSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybWF0ID0gb3B0aW9ucy5tZWRpYVR5cGUuZm9ybWF0ID8gYC4ke29wdGlvbnMubWVkaWFUeXBlLmZvcm1hdH1gIDogXCIranNvblwiO1xuICAgICAgICAgIHJldHVybiBgYXBwbGljYXRpb24vdm5kLmdpdGh1Yi4ke3ByZXZpZXd9LXByZXZpZXcke2Zvcm1hdH1gO1xuICAgICAgICB9KS5qb2luKFwiLFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKFtcIkdFVFwiLCBcIkhFQURcIl0uaW5jbHVkZXMobWV0aG9kKSkge1xuICAgIHVybCA9IGFkZFF1ZXJ5UGFyYW1ldGVycyh1cmwsIHJlbWFpbmluZ1BhcmFtZXRlcnMpO1xuICB9IGVsc2Uge1xuICAgIGlmIChcImRhdGFcIiBpbiByZW1haW5pbmdQYXJhbWV0ZXJzKSB7XG4gICAgICBib2R5ID0gcmVtYWluaW5nUGFyYW1ldGVycy5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXMocmVtYWluaW5nUGFyYW1ldGVycykubGVuZ3RoKSB7XG4gICAgICAgIGJvZHkgPSByZW1haW5pbmdQYXJhbWV0ZXJzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoIWhlYWRlcnNbXCJjb250ZW50LXR5cGVcIl0gJiYgdHlwZW9mIGJvZHkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBoZWFkZXJzW1wiY29udGVudC10eXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCI7XG4gIH1cbiAgaWYgKFtcIlBBVENIXCIsIFwiUFVUXCJdLmluY2x1ZGVzKG1ldGhvZCkgJiYgdHlwZW9mIGJvZHkgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBib2R5ID0gXCJcIjtcbiAgfVxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICB7IG1ldGhvZCwgdXJsLCBoZWFkZXJzIH0sXG4gICAgdHlwZW9mIGJvZHkgIT09IFwidW5kZWZpbmVkXCIgPyB7IGJvZHkgfSA6IG51bGwsXG4gICAgb3B0aW9ucy5yZXF1ZXN0ID8geyByZXF1ZXN0OiBvcHRpb25zLnJlcXVlc3QgfSA6IG51bGxcbiAgKTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL2VuZHBvaW50LXdpdGgtZGVmYXVsdHMuanNcbmZ1bmN0aW9uIGVuZHBvaW50V2l0aERlZmF1bHRzKGRlZmF1bHRzLCByb3V0ZSwgb3B0aW9ucykge1xuICByZXR1cm4gcGFyc2UobWVyZ2UoZGVmYXVsdHMsIHJvdXRlLCBvcHRpb25zKSk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy93aXRoLWRlZmF1bHRzLmpzXG5mdW5jdGlvbiB3aXRoRGVmYXVsdHMob2xkRGVmYXVsdHMsIG5ld0RlZmF1bHRzKSB7XG4gIGNvbnN0IERFRkFVTFRTMiA9IG1lcmdlKG9sZERlZmF1bHRzLCBuZXdEZWZhdWx0cyk7XG4gIGNvbnN0IGVuZHBvaW50MiA9IGVuZHBvaW50V2l0aERlZmF1bHRzLmJpbmQobnVsbCwgREVGQVVMVFMyKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZW5kcG9pbnQyLCB7XG4gICAgREVGQVVMVFM6IERFRkFVTFRTMixcbiAgICBkZWZhdWx0czogd2l0aERlZmF1bHRzLmJpbmQobnVsbCwgREVGQVVMVFMyKSxcbiAgICBtZXJnZTogbWVyZ2UuYmluZChudWxsLCBERUZBVUxUUzIpLFxuICAgIHBhcnNlXG4gIH0pO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbnZhciBlbmRwb2ludCA9IHdpdGhEZWZhdWx0cyhudWxsLCBERUZBVUxUUyk7XG5leHBvcnQge1xuICBlbmRwb2ludFxufTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBOdWxsT2JqZWN0ID0gZnVuY3Rpb24gTnVsbE9iamVjdCAoKSB7IH1cbk51bGxPYmplY3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCAqKCBcIjtcIiBwYXJhbWV0ZXIgKSBpbiBSRkMgNzIzMSBzZWMgMy4xLjEuMVxuICpcbiAqIHBhcmFtZXRlciAgICAgPSB0b2tlbiBcIj1cIiAoIHRva2VuIC8gcXVvdGVkLXN0cmluZyApXG4gKiB0b2tlbiAgICAgICAgID0gMSp0Y2hhclxuICogdGNoYXIgICAgICAgICA9IFwiIVwiIC8gXCIjXCIgLyBcIiRcIiAvIFwiJVwiIC8gXCImXCIgLyBcIidcIiAvIFwiKlwiXG4gKiAgICAgICAgICAgICAgIC8gXCIrXCIgLyBcIi1cIiAvIFwiLlwiIC8gXCJeXCIgLyBcIl9cIiAvIFwiYFwiIC8gXCJ8XCIgLyBcIn5cIlxuICogICAgICAgICAgICAgICAvIERJR0lUIC8gQUxQSEFcbiAqICAgICAgICAgICAgICAgOyBhbnkgVkNIQVIsIGV4Y2VwdCBkZWxpbWl0ZXJzXG4gKiBxdW90ZWQtc3RyaW5nID0gRFFVT1RFICooIHFkdGV4dCAvIHF1b3RlZC1wYWlyICkgRFFVT1RFXG4gKiBxZHRleHQgICAgICAgID0gSFRBQiAvIFNQIC8gJXgyMSAvICV4MjMtNUIgLyAleDVELTdFIC8gb2JzLXRleHRcbiAqIG9icy10ZXh0ICAgICAgPSAleDgwLUZGXG4gKiBxdW90ZWQtcGFpciAgID0gXCJcXFwiICggSFRBQiAvIFNQIC8gVkNIQVIgLyBvYnMtdGV4dCApXG4gKi9cbmNvbnN0IHBhcmFtUkUgPSAvOyAqKFshIyQlJicqKy5eXFx3YHx+LV0rKT0oXCIoPzpbXFx2XFx1MDAyMFxcdTAwMjFcXHUwMDIzLVxcdTAwNWJcXHUwMDVkLVxcdTAwN2VcXHUwMDgwLVxcdTAwZmZdfFxcXFxbXFx2XFx1MDAyMC1cXHUwMGZmXSkqXCJ8WyEjJCUmJyorLl5cXHdgfH4tXSspICovZ3VcblxuLyoqXG4gKiBSZWdFeHAgdG8gbWF0Y2ggcXVvdGVkLXBhaXIgaW4gUkZDIDcyMzAgc2VjIDMuMi42XG4gKlxuICogcXVvdGVkLXBhaXIgPSBcIlxcXCIgKCBIVEFCIC8gU1AgLyBWQ0hBUiAvIG9icy10ZXh0IClcbiAqIG9icy10ZXh0ICAgID0gJXg4MC1GRlxuICovXG5jb25zdCBxdW90ZWRQYWlyUkUgPSAvXFxcXChbXFx2XFx1MDAyMC1cXHUwMGZmXSkvZ3VcblxuLyoqXG4gKiBSZWdFeHAgdG8gbWF0Y2ggdHlwZSBpbiBSRkMgNzIzMSBzZWMgMy4xLjEuMVxuICpcbiAqIG1lZGlhLXR5cGUgPSB0eXBlIFwiL1wiIHN1YnR5cGVcbiAqIHR5cGUgICAgICAgPSB0b2tlblxuICogc3VidHlwZSAgICA9IHRva2VuXG4gKi9cbmNvbnN0IG1lZGlhVHlwZVJFID0gL15bISMkJSYnKisuXlxcd3x+LV0rXFwvWyEjJCUmJyorLl5cXHd8fi1dKyQvdVxuXG4vLyBkZWZhdWx0IENvbnRlbnRUeXBlIHRvIHByZXZlbnQgcmVwZWF0ZWQgb2JqZWN0IGNyZWF0aW9uXG5jb25zdCBkZWZhdWx0Q29udGVudFR5cGUgPSB7IHR5cGU6ICcnLCBwYXJhbWV0ZXJzOiBuZXcgTnVsbE9iamVjdCgpIH1cbk9iamVjdC5mcmVlemUoZGVmYXVsdENvbnRlbnRUeXBlLnBhcmFtZXRlcnMpXG5PYmplY3QuZnJlZXplKGRlZmF1bHRDb250ZW50VHlwZSlcblxuLyoqXG4gKiBQYXJzZSBtZWRpYSB0eXBlIHRvIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IGhlYWRlclxuICogQHJldHVybiB7T2JqZWN0fVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHBhcnNlIChoZWFkZXIpIHtcbiAgaWYgKHR5cGVvZiBoZWFkZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgaGVhZGVyIGlzIHJlcXVpcmVkIGFuZCBtdXN0IGJlIGEgc3RyaW5nJylcbiAgfVxuXG4gIGxldCBpbmRleCA9IGhlYWRlci5pbmRleE9mKCc7JylcbiAgY29uc3QgdHlwZSA9IGluZGV4ICE9PSAtMVxuICAgID8gaGVhZGVyLnNsaWNlKDAsIGluZGV4KS50cmltKClcbiAgICA6IGhlYWRlci50cmltKClcblxuICBpZiAobWVkaWFUeXBlUkUudGVzdCh0eXBlKSA9PT0gZmFsc2UpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIG1lZGlhIHR5cGUnKVxuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHR5cGU6IHR5cGUudG9Mb3dlckNhc2UoKSxcbiAgICBwYXJhbWV0ZXJzOiBuZXcgTnVsbE9iamVjdCgpXG4gIH1cblxuICAvLyBwYXJzZSBwYXJhbWV0ZXJzXG4gIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBsZXQga2V5XG4gIGxldCBtYXRjaFxuICBsZXQgdmFsdWVcblxuICBwYXJhbVJFLmxhc3RJbmRleCA9IGluZGV4XG5cbiAgd2hpbGUgKChtYXRjaCA9IHBhcmFtUkUuZXhlYyhoZWFkZXIpKSkge1xuICAgIGlmIChtYXRjaC5pbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIGZvcm1hdCcpXG4gICAgfVxuXG4gICAgaW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoXG4gICAga2V5ID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKVxuICAgIHZhbHVlID0gbWF0Y2hbMl1cblxuICAgIGlmICh2YWx1ZVswXSA9PT0gJ1wiJykge1xuICAgICAgLy8gcmVtb3ZlIHF1b3RlcyBhbmQgZXNjYXBlc1xuICAgICAgdmFsdWUgPSB2YWx1ZVxuICAgICAgICAuc2xpY2UoMSwgdmFsdWUubGVuZ3RoIC0gMSlcblxuICAgICAgcXVvdGVkUGFpclJFLnRlc3QodmFsdWUpICYmICh2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocXVvdGVkUGFpclJFLCAnJDEnKSlcbiAgICB9XG5cbiAgICByZXN1bHQucGFyYW1ldGVyc1trZXldID0gdmFsdWVcbiAgfVxuXG4gIGlmIChpbmRleCAhPT0gaGVhZGVyLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIGZvcm1hdCcpXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIHNhZmVQYXJzZSAoaGVhZGVyKSB7XG4gIGlmICh0eXBlb2YgaGVhZGVyICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBkZWZhdWx0Q29udGVudFR5cGVcbiAgfVxuXG4gIGxldCBpbmRleCA9IGhlYWRlci5pbmRleE9mKCc7JylcbiAgY29uc3QgdHlwZSA9IGluZGV4ICE9PSAtMVxuICAgID8gaGVhZGVyLnNsaWNlKDAsIGluZGV4KS50cmltKClcbiAgICA6IGhlYWRlci50cmltKClcblxuICBpZiAobWVkaWFUeXBlUkUudGVzdCh0eXBlKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gZGVmYXVsdENvbnRlbnRUeXBlXG4gIH1cblxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgdHlwZTogdHlwZS50b0xvd2VyQ2FzZSgpLFxuICAgIHBhcmFtZXRlcnM6IG5ldyBOdWxsT2JqZWN0KClcbiAgfVxuXG4gIC8vIHBhcnNlIHBhcmFtZXRlcnNcbiAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGxldCBrZXlcbiAgbGV0IG1hdGNoXG4gIGxldCB2YWx1ZVxuXG4gIHBhcmFtUkUubGFzdEluZGV4ID0gaW5kZXhcblxuICB3aGlsZSAoKG1hdGNoID0gcGFyYW1SRS5leGVjKGhlYWRlcikpKSB7XG4gICAgaWYgKG1hdGNoLmluZGV4ICE9PSBpbmRleCkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRDb250ZW50VHlwZVxuICAgIH1cblxuICAgIGluZGV4ICs9IG1hdGNoWzBdLmxlbmd0aFxuICAgIGtleSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKClcbiAgICB2YWx1ZSA9IG1hdGNoWzJdXG5cbiAgICBpZiAodmFsdWVbMF0gPT09ICdcIicpIHtcbiAgICAgIC8vIHJlbW92ZSBxdW90ZXMgYW5kIGVzY2FwZXNcbiAgICAgIHZhbHVlID0gdmFsdWVcbiAgICAgICAgLnNsaWNlKDEsIHZhbHVlLmxlbmd0aCAtIDEpXG5cbiAgICAgIHF1b3RlZFBhaXJSRS50ZXN0KHZhbHVlKSAmJiAodmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHF1b3RlZFBhaXJSRSwgJyQxJykpXG4gICAgfVxuXG4gICAgcmVzdWx0LnBhcmFtZXRlcnNba2V5XSA9IHZhbHVlXG4gIH1cblxuICBpZiAoaW5kZXggIT09IGhlYWRlci5sZW5ndGgpIHtcbiAgICByZXR1cm4gZGVmYXVsdENvbnRlbnRUeXBlXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSB7IHBhcnNlLCBzYWZlUGFyc2UgfVxubW9kdWxlLmV4cG9ydHMucGFyc2UgPSBwYXJzZVxubW9kdWxlLmV4cG9ydHMuc2FmZVBhcnNlID0gc2FmZVBhcnNlXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0Q29udGVudFR5cGUgPSBkZWZhdWx0Q29udGVudFR5cGVcbiIsImNvbnN0IGludFJlZ2V4ID0gL14tP1xcZCskLztcbmNvbnN0IG5vaXNlVmFsdWUgPSAvXi0/XFxkK24rJC87IC8vIE5vaXNlIC0gc3RyaW5ncyB0aGF0IG1hdGNoIHRoZSBjdXN0b20gZm9ybWF0IGJlZm9yZSBiZWluZyBjb252ZXJ0ZWQgdG8gaXRcbmNvbnN0IG9yaWdpbmFsU3RyaW5naWZ5ID0gSlNPTi5zdHJpbmdpZnk7XG5jb25zdCBvcmlnaW5hbFBhcnNlID0gSlNPTi5wYXJzZTtcbmNvbnN0IGN1c3RvbUZvcm1hdCA9IC9eLT9cXGQrbiQvO1xuXG5jb25zdCBiaWdJbnRzU3RyaW5naWZ5ID0gLyhbXFxbOl0pP1wiKC0/XFxkKyluXCIoJHwoW1xcXFxuXXxcXHMpKihcXHN8W1xcXFxuXSkqWyxcXH1cXF1dKS9nO1xuY29uc3Qgbm9pc2VTdHJpbmdpZnkgPVxuICAvKFtcXFs6XSk/KFwiLT9cXGQrbispbihcIiR8XCIoW1xcXFxuXXxcXHMpKihcXHN8W1xcXFxuXSkqWyxcXH1cXF1dKS9nO1xuXG4vKipcbiAqIEB0eXBlZGVmIHsodGhpczogYW55LCBrZXk6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCwgdmFsdWU6IGFueSkgPT4gYW55fSBSZXBsYWNlclxuICogQHR5cGVkZWYgeyhrZXk6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCwgdmFsdWU6IGFueSwgY29udGV4dD86IHsgc291cmNlOiBzdHJpbmcgfSkgPT4gYW55fSBSZXZpdmVyXG4gKi9cblxuLyoqXG4gKiBDb252ZXJ0cyBhIEphdmFTY3JpcHQgdmFsdWUgdG8gYSBKU09OIHN0cmluZy5cbiAqXG4gKiBTdXBwb3J0cyBzZXJpYWxpemF0aW9uIG9mIEJpZ0ludCB2YWx1ZXMgdXNpbmcgdHdvIHN0cmF0ZWdpZXM6XG4gKiAxLiBDdXN0b20gZm9ybWF0IFwiMTIzblwiIOKGkiBcIjEyM1wiICh1bml2ZXJzYWwgZmFsbGJhY2spXG4gKiAyLiBOYXRpdmUgSlNPTi5yYXdKU09OKCkgKE5vZGUuanMgMjIrLCBmYXN0ZXN0KSB3aGVuIGF2YWlsYWJsZVxuICpcbiAqIEFsbCBvdGhlciB2YWx1ZXMgYXJlIHNlcmlhbGl6ZWQgZXhhY3RseSBsaWtlIG5hdGl2ZSBKU09OLnN0cmluZ2lmeSgpLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBKU09OIHN0cmluZy5cbiAqIEBwYXJhbSB7UmVwbGFjZXIgfCBBcnJheTxzdHJpbmcgfCBudW1iZXI+IHwgbnVsbH0gW3JlcGxhY2VyXVxuICogICBBIGZ1bmN0aW9uIHRoYXQgYWx0ZXJzIHRoZSBiZWhhdmlvciBvZiB0aGUgc3RyaW5naWZpY2F0aW9uIHByb2Nlc3MsXG4gKiAgIG9yIGFuIGFycmF5IG9mIHN0cmluZ3MvbnVtYmVycyB0byBpbmRpY2F0ZSBwcm9wZXJ0aWVzIHRvIGV4Y2x1ZGUuXG4gKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlcn0gW3NwYWNlXVxuICogICBBIHN0cmluZyBvciBudW1iZXIgdG8gc3BlY2lmeSBpbmRlbnRhdGlvbiBvciBwcmV0dHktcHJpbnRpbmcuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgSlNPTiBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gKi9cbmNvbnN0IEpTT05TdHJpbmdpZnkgPSAodmFsdWUsIHJlcGxhY2VyLCBzcGFjZSkgPT4ge1xuICBpZiAoXCJyYXdKU09OXCIgaW4gSlNPTikge1xuICAgIHJldHVybiBvcmlnaW5hbFN0cmluZ2lmeShcbiAgICAgIHZhbHVlLFxuICAgICAgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJiaWdpbnRcIikgcmV0dXJuIEpTT04ucmF3SlNPTih2YWx1ZS50b1N0cmluZygpKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlcGxhY2VyID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiByZXBsYWNlcihrZXksIHZhbHVlKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXBsYWNlcikgJiYgcmVwbGFjZXIuaW5jbHVkZXMoa2V5KSkgcmV0dXJuIHZhbHVlO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0sXG4gICAgICBzcGFjZSxcbiAgICApO1xuICB9XG5cbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG9yaWdpbmFsU3RyaW5naWZ5KHZhbHVlLCByZXBsYWNlciwgc3BhY2UpO1xuXG4gIGNvbnN0IGNvbnZlcnRlZFRvQ3VzdG9tSlNPTiA9IG9yaWdpbmFsU3RyaW5naWZ5KFxuICAgIHZhbHVlLFxuICAgIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBpc05vaXNlID0gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIG5vaXNlVmFsdWUudGVzdCh2YWx1ZSk7XG5cbiAgICAgIGlmIChpc05vaXNlKSByZXR1cm4gdmFsdWUudG9TdHJpbmcoKSArIFwiblwiOyAvLyBNYXJrIG5vaXNlIHZhbHVlcyB3aXRoIGFkZGl0aW9uYWwgXCJuXCIgdG8gb2Zmc2V0IHRoZSBkZWxldGlvbiBvZiBvbmUgXCJuXCIgZHVyaW5nIHRoZSBwcm9jZXNzaW5nXG5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYmlnaW50XCIpIHJldHVybiB2YWx1ZS50b1N0cmluZygpICsgXCJuXCI7XG5cbiAgICAgIGlmICh0eXBlb2YgcmVwbGFjZXIgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHJlcGxhY2VyKGtleSwgdmFsdWUpO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXBsYWNlcikgJiYgcmVwbGFjZXIuaW5jbHVkZXMoa2V5KSkgcmV0dXJuIHZhbHVlO1xuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBzcGFjZSxcbiAgKTtcbiAgY29uc3QgcHJvY2Vzc2VkSlNPTiA9IGNvbnZlcnRlZFRvQ3VzdG9tSlNPTi5yZXBsYWNlKFxuICAgIGJpZ0ludHNTdHJpbmdpZnksXG4gICAgXCIkMSQyJDNcIixcbiAgKTsgLy8gRGVsZXRlIG9uZSBcIm5cIiBvZmYgdGhlIGVuZCBvZiBldmVyeSBCaWdJbnQgdmFsdWVcbiAgY29uc3QgZGVub2lzZWRKU09OID0gcHJvY2Vzc2VkSlNPTi5yZXBsYWNlKG5vaXNlU3RyaW5naWZ5LCBcIiQxJDIkM1wiKTsgLy8gUmVtb3ZlIG9uZSBcIm5cIiBvZmYgdGhlIGVuZCBvZiBldmVyeSBub2lzeSBzdHJpbmdcblxuICByZXR1cm4gZGVub2lzZWRKU09OO1xufTtcblxuY29uc3QgZmVhdHVyZUNhY2hlID0gbmV3IE1hcCgpO1xuXG4vKipcbiAqIERldGVjdHMgaWYgdGhlIGN1cnJlbnQgSlNPTi5wYXJzZSBpbXBsZW1lbnRhdGlvbiBzdXBwb3J0cyB0aGUgY29udGV4dC5zb3VyY2UgZmVhdHVyZS5cbiAqXG4gKiBVc2VzIHRvU3RyaW5nKCkgZmluZ2VycHJpbnRpbmcgdG8gY2FjaGUgcmVzdWx0cyBhbmQgYXV0b21hdGljYWxseSBkZXRlY3QgcnVudGltZVxuICogcmVwbGFjZW1lbnRzIG9mIEpTT04ucGFyc2UgKHBvbHlmaWxscywgbW9ja3MsIGV0Yy4pLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIGNvbnRleHQuc291cmNlIGlzIHN1cHBvcnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5jb25zdCBpc0NvbnRleHRTb3VyY2VTdXBwb3J0ZWQgPSAoKSA9PiB7XG4gIGNvbnN0IHBhcnNlRmluZ2VycHJpbnQgPSBKU09OLnBhcnNlLnRvU3RyaW5nKCk7XG5cbiAgaWYgKGZlYXR1cmVDYWNoZS5oYXMocGFyc2VGaW5nZXJwcmludCkpIHtcbiAgICByZXR1cm4gZmVhdHVyZUNhY2hlLmdldChwYXJzZUZpbmdlcnByaW50KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gSlNPTi5wYXJzZShcbiAgICAgIFwiMVwiLFxuICAgICAgKF8sIF9fLCBjb250ZXh0KSA9PiAhIWNvbnRleHQ/LnNvdXJjZSAmJiBjb250ZXh0LnNvdXJjZSA9PT0gXCIxXCIsXG4gICAgKTtcbiAgICBmZWF0dXJlQ2FjaGUuc2V0KHBhcnNlRmluZ2VycHJpbnQsIHJlc3VsdCk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGNhdGNoIHtcbiAgICBmZWF0dXJlQ2FjaGUuc2V0KHBhcnNlRmluZ2VycHJpbnQsIGZhbHNlKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXZpdmVyIGZ1bmN0aW9uIHRoYXQgY29udmVydHMgY3VzdG9tLWZvcm1hdCBCaWdJbnQgc3RyaW5ncyBiYWNrIHRvIEJpZ0ludCB2YWx1ZXMuXG4gKiBBbHNvIGhhbmRsZXMgXCJub2lzZVwiIHN0cmluZ3MgdGhhdCBhY2NpZGVudGFsbHkgbWF0Y2ggdGhlIEJpZ0ludCBmb3JtYXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWR9IGtleSBUaGUgb2JqZWN0IGtleS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIGJlaW5nIHBhcnNlZC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBbY29udGV4dF0gUGFyc2UgY29udGV4dCAoaWYgc3VwcG9ydGVkIGJ5IEpTT04ucGFyc2UpLlxuICogQHBhcmFtIHtSZXZpdmVyfSBbdXNlclJldml2ZXJdIFVzZXIncyBjdXN0b20gcmV2aXZlciBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHthbnl9IFRoZSB0cmFuc2Zvcm1lZCB2YWx1ZS5cbiAqL1xuY29uc3QgY29udmVydE1hcmtlZEJpZ0ludHNSZXZpdmVyID0gKGtleSwgdmFsdWUsIGNvbnRleHQsIHVzZXJSZXZpdmVyKSA9PiB7XG4gIGNvbnN0IGlzQ3VzdG9tRm9ybWF0QmlnSW50ID1cbiAgICB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgY3VzdG9tRm9ybWF0LnRlc3QodmFsdWUpO1xuICBpZiAoaXNDdXN0b21Gb3JtYXRCaWdJbnQpIHJldHVybiBCaWdJbnQodmFsdWUuc2xpY2UoMCwgLTEpKTtcblxuICBjb25zdCBpc05vaXNlVmFsdWUgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgbm9pc2VWYWx1ZS50ZXN0KHZhbHVlKTtcbiAgaWYgKGlzTm9pc2VWYWx1ZSkgcmV0dXJuIHZhbHVlLnNsaWNlKDAsIC0xKTtcblxuICBpZiAodHlwZW9mIHVzZXJSZXZpdmVyICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiB2YWx1ZTtcblxuICByZXR1cm4gdXNlclJldml2ZXIoa2V5LCB2YWx1ZSwgY29udGV4dCk7XG59O1xuXG4vKipcbiAqIEZhc3QgSlNPTi5wYXJzZSBpbXBsZW1lbnRhdGlvbiAofjJ4IGZhc3RlciB0aGFuIGNsYXNzaWMgZmFsbGJhY2spLlxuICogVXNlcyBKU09OLnBhcnNlJ3MgY29udGV4dC5zb3VyY2UgZmVhdHVyZSB0byBkZXRlY3QgaW50ZWdlcnMgYW5kIGNvbnZlcnRcbiAqIGxhcmdlIG51bWJlcnMgZGlyZWN0bHkgdG8gQmlnSW50IHdpdGhvdXQgc3RyaW5nIG1hbmlwdWxhdGlvbi5cbiAqXG4gKiBEb2VzIG5vdCBzdXBwb3J0IGxlZ2FjeSBjdXN0b20gZm9ybWF0IGZyb20gdjEgb2YgdGhpcyBsaWJyYXJ5LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IEpTT04gc3RyaW5nIHRvIHBhcnNlLlxuICogQHBhcmFtIHtSZXZpdmVyfSBbcmV2aXZlcl0gVHJhbnNmb3JtIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggdmFsdWUuXG4gKiBAcmV0dXJucyB7YW55fSBQYXJzZWQgSmF2YVNjcmlwdCB2YWx1ZS5cbiAqL1xuY29uc3QgSlNPTlBhcnNlVjIgPSAodGV4dCwgcmV2aXZlcikgPT4ge1xuICByZXR1cm4gSlNPTi5wYXJzZSh0ZXh0LCAoa2V5LCB2YWx1ZSwgY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IGlzQmlnTnVtYmVyID1cbiAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJlxuICAgICAgKHZhbHVlID4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHwgdmFsdWUgPCBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUik7XG4gICAgY29uc3QgaXNJbnQgPSBjb250ZXh0ICYmIGludFJlZ2V4LnRlc3QoY29udGV4dC5zb3VyY2UpO1xuICAgIGNvbnN0IGlzQmlnSW50ID0gaXNCaWdOdW1iZXIgJiYgaXNJbnQ7XG5cbiAgICBpZiAoaXNCaWdJbnQpIHJldHVybiBCaWdJbnQoY29udGV4dC5zb3VyY2UpO1xuXG4gICAgaWYgKHR5cGVvZiByZXZpdmVyICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiB2YWx1ZTtcblxuICAgIHJldHVybiByZXZpdmVyKGtleSwgdmFsdWUsIGNvbnRleHQpO1xuICB9KTtcbn07XG5cbmNvbnN0IE1BWF9JTlQgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUi50b1N0cmluZygpO1xuY29uc3QgTUFYX0RJR0lUUyA9IE1BWF9JTlQubGVuZ3RoO1xuY29uc3Qgc3RyaW5nc09yTGFyZ2VOdW1iZXJzID1cbiAgL1wiKD86XFxcXC58W15cIl0pKlwifC0/KDB8WzEtOV1bMC05XSopKFxcLlswLTldKyk/KFtlRV1bKy1dP1swLTldKyk/L2c7XG5jb25zdCBub2lzZVZhbHVlV2l0aFF1b3RlcyA9IC9eXCItP1xcZCtuK1wiJC87IC8vIE5vaXNlIC0gc3RyaW5ncyB0aGF0IG1hdGNoIHRoZSBjdXN0b20gZm9ybWF0IGJlZm9yZSBiZWluZyBjb252ZXJ0ZWQgdG8gaXRcblxuLyoqXG4gKiBDb252ZXJ0cyBhIEpTT04gc3RyaW5nIGludG8gYSBKYXZhU2NyaXB0IHZhbHVlLlxuICpcbiAqIFN1cHBvcnRzIHBhcnNpbmcgb2YgbGFyZ2UgaW50ZWdlcnMgdXNpbmcgdHdvIHN0cmF0ZWdpZXM6XG4gKiAxLiBDbGFzc2ljIGZhbGxiYWNrOiBNYXJrcyBsYXJnZSBudW1iZXJzIHdpdGggXCIxMjNuXCIgZm9ybWF0LCB0aGVuIGNvbnZlcnRzIHRvIEJpZ0ludFxuICogMi4gRmFzdCBwYXRoIChKU09OUGFyc2VWMik6IFVzZXMgY29udGV4dC5zb3VyY2UgZmVhdHVyZSAofjJ4IGZhc3Rlcikgd2hlbiBhdmFpbGFibGVcbiAqXG4gKiBBbGwgb3RoZXIgSlNPTiB2YWx1ZXMgYXJlIHBhcnNlZCBleGFjdGx5IGxpa2UgbmF0aXZlIEpTT04ucGFyc2UoKS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBBIHZhbGlkIEpTT04gc3RyaW5nLlxuICogQHBhcmFtIHtSZXZpdmVyfSBbcmV2aXZlcl1cbiAqICAgQSBmdW5jdGlvbiB0aGF0IHRyYW5zZm9ybXMgdGhlIHJlc3VsdHMuIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGZvciBlYWNoIG1lbWJlclxuICogICBvZiB0aGUgb2JqZWN0LiBJZiBhIG1lbWJlciBjb250YWlucyBuZXN0ZWQgb2JqZWN0cywgdGhlIG5lc3RlZCBvYmplY3RzIGFyZVxuICogICB0cmFuc2Zvcm1lZCBiZWZvcmUgdGhlIHBhcmVudCBvYmplY3QgaXMuXG4gKiBAcmV0dXJucyB7YW55fSBUaGUgcGFyc2VkIEphdmFTY3JpcHQgdmFsdWUuXG4gKiBAdGhyb3dzIHtTeW50YXhFcnJvcn0gSWYgdGV4dCBpcyBub3QgdmFsaWQgSlNPTi5cbiAqL1xuY29uc3QgSlNPTlBhcnNlID0gKHRleHQsIHJldml2ZXIpID0+IHtcbiAgaWYgKCF0ZXh0KSByZXR1cm4gb3JpZ2luYWxQYXJzZSh0ZXh0LCByZXZpdmVyKTtcblxuICBpZiAoaXNDb250ZXh0U291cmNlU3VwcG9ydGVkKCkpIHJldHVybiBKU09OUGFyc2VWMih0ZXh0LCByZXZpdmVyKTsgLy8gU2hvcnRjdXQgdG8gYSBmYXN0ZXIgKDJ4KSBhbmQgc2ltcGxlciB2ZXJzaW9uXG5cbiAgLy8gRmluZCBhbmQgbWFyayBiaWcgbnVtYmVycyB3aXRoIFwiblwiXG4gIGNvbnN0IHNlcmlhbGl6ZWREYXRhID0gdGV4dC5yZXBsYWNlKFxuICAgIHN0cmluZ3NPckxhcmdlTnVtYmVycyxcbiAgICAodGV4dCwgZGlnaXRzLCBmcmFjdGlvbmFsLCBleHBvbmVudGlhbCkgPT4ge1xuICAgICAgY29uc3QgaXNTdHJpbmcgPSB0ZXh0WzBdID09PSAnXCInO1xuICAgICAgY29uc3QgaXNOb2lzZSA9IGlzU3RyaW5nICYmIG5vaXNlVmFsdWVXaXRoUXVvdGVzLnRlc3QodGV4dCk7XG5cbiAgICAgIGlmIChpc05vaXNlKSByZXR1cm4gdGV4dC5zdWJzdHJpbmcoMCwgdGV4dC5sZW5ndGggLSAxKSArICduXCInOyAvLyBNYXJrIG5vaXNlIHZhbHVlcyB3aXRoIGFkZGl0aW9uYWwgXCJuXCIgdG8gb2Zmc2V0IHRoZSBkZWxldGlvbiBvZiBvbmUgXCJuXCIgZHVyaW5nIHRoZSBwcm9jZXNzaW5nXG5cbiAgICAgIGNvbnN0IGlzRnJhY3Rpb25hbE9yRXhwb25lbnRpYWwgPSBmcmFjdGlvbmFsIHx8IGV4cG9uZW50aWFsO1xuICAgICAgY29uc3QgaXNMZXNzVGhhbk1heFNhZmVJbnQgPVxuICAgICAgICBkaWdpdHMgJiZcbiAgICAgICAgKGRpZ2l0cy5sZW5ndGggPCBNQVhfRElHSVRTIHx8XG4gICAgICAgICAgKGRpZ2l0cy5sZW5ndGggPT09IE1BWF9ESUdJVFMgJiYgZGlnaXRzIDw9IE1BWF9JTlQpKTsgLy8gV2l0aCBhIGZpeGVkIG51bWJlciBvZiBkaWdpdHMsIHdlIGNhbiBjb3JyZWN0bHkgdXNlIGxleGljb2dyYXBoaWNhbCBjb21wYXJpc29uIHRvIGRvIGEgbnVtZXJpYyBjb21wYXJpc29uXG5cbiAgICAgIGlmIChpc1N0cmluZyB8fCBpc0ZyYWN0aW9uYWxPckV4cG9uZW50aWFsIHx8IGlzTGVzc1RoYW5NYXhTYWZlSW50KVxuICAgICAgICByZXR1cm4gdGV4dDtcblxuICAgICAgcmV0dXJuICdcIicgKyB0ZXh0ICsgJ25cIic7XG4gICAgfSxcbiAgKTtcblxuICByZXR1cm4gb3JpZ2luYWxQYXJzZShzZXJpYWxpemVkRGF0YSwgKGtleSwgdmFsdWUsIGNvbnRleHQpID0+XG4gICAgY29udmVydE1hcmtlZEJpZ0ludHNSZXZpdmVyKGtleSwgdmFsdWUsIGNvbnRleHQsIHJldml2ZXIpLFxuICApO1xufTtcblxuZXhwb3J0IHsgSlNPTlN0cmluZ2lmeSwgSlNPTlBhcnNlIH07XG4iLCJjbGFzcyBSZXF1ZXN0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIG5hbWU7XG4gIC8qKlxuICAgKiBodHRwIHN0YXR1cyBjb2RlXG4gICAqL1xuICBzdGF0dXM7XG4gIC8qKlxuICAgKiBSZXF1ZXN0IG9wdGlvbnMgdGhhdCBsZWFkIHRvIHRoZSBlcnJvci5cbiAgICovXG4gIHJlcXVlc3Q7XG4gIC8qKlxuICAgKiBSZXNwb25zZSBvYmplY3QgaWYgYSByZXNwb25zZSB3YXMgcmVjZWl2ZWRcbiAgICovXG4gIHJlc3BvbnNlO1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXNDb2RlLCBvcHRpb25zKSB7XG4gICAgc3VwZXIobWVzc2FnZSwgeyBjYXVzZTogb3B0aW9ucy5jYXVzZSB9KTtcbiAgICB0aGlzLm5hbWUgPSBcIkh0dHBFcnJvclwiO1xuICAgIHRoaXMuc3RhdHVzID0gTnVtYmVyLnBhcnNlSW50KHN0YXR1c0NvZGUpO1xuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5zdGF0dXMpKSB7XG4gICAgICB0aGlzLnN0YXR1cyA9IDA7XG4gICAgfVxuICAgIC8qIHY4IGlnbm9yZSBlbHNlIC0tIEBwcmVzZXJ2ZSAtLSBCdWcgd2l0aCB2aXRlc3QgY292ZXJhZ2Ugd2hlcmUgaXQgc2VlcyBhbiBlbHNlIGJyYW5jaCB0aGF0IGRvZXNuJ3QgZXhpc3QgKi9cbiAgICBpZiAoXCJyZXNwb25zZVwiIGluIG9wdGlvbnMpIHtcbiAgICAgIHRoaXMucmVzcG9uc2UgPSBvcHRpb25zLnJlc3BvbnNlO1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0Q29weSA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMucmVxdWVzdCk7XG4gICAgaWYgKG9wdGlvbnMucmVxdWVzdC5oZWFkZXJzLmF1dGhvcml6YXRpb24pIHtcbiAgICAgIHJlcXVlc3RDb3B5LmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLnJlcXVlc3QuaGVhZGVycywge1xuICAgICAgICBhdXRob3JpemF0aW9uOiBvcHRpb25zLnJlcXVlc3QuaGVhZGVycy5hdXRob3JpemF0aW9uLnJlcGxhY2UoXG4gICAgICAgICAgLyg/PCEgKSAuKiQvLFxuICAgICAgICAgIFwiIFtSRURBQ1RFRF1cIlxuICAgICAgICApXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVxdWVzdENvcHkudXJsID0gcmVxdWVzdENvcHkudXJsLnJlcGxhY2UoL1xcYmNsaWVudF9zZWNyZXQ9XFx3Ky9nLCBcImNsaWVudF9zZWNyZXQ9W1JFREFDVEVEXVwiKS5yZXBsYWNlKC9cXGJhY2Nlc3NfdG9rZW49XFx3Ky9nLCBcImFjY2Vzc190b2tlbj1bUkVEQUNURURdXCIpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3RDb3B5O1xuICB9XG59XG5leHBvcnQge1xuICBSZXF1ZXN0RXJyb3Jcbn07XG4iLCIvLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbmltcG9ydCB7IGVuZHBvaW50IH0gZnJvbSBcIkBvY3Rva2l0L2VuZHBvaW50XCI7XG5cbi8vIHBrZy9kaXN0LXNyYy9kZWZhdWx0cy5qc1xuaW1wb3J0IHsgZ2V0VXNlckFnZW50IH0gZnJvbSBcInVuaXZlcnNhbC11c2VyLWFnZW50XCI7XG5cbi8vIHBrZy9kaXN0LXNyYy92ZXJzaW9uLmpzXG52YXIgVkVSU0lPTiA9IFwiMTAuMC44XCI7XG5cbi8vIHBrZy9kaXN0LXNyYy9kZWZhdWx0cy5qc1xudmFyIGRlZmF1bHRzX2RlZmF1bHQgPSB7XG4gIGhlYWRlcnM6IHtcbiAgICBcInVzZXItYWdlbnRcIjogYG9jdG9raXQtcmVxdWVzdC5qcy8ke1ZFUlNJT059ICR7Z2V0VXNlckFnZW50KCl9YFxuICB9XG59O1xuXG4vLyBwa2cvZGlzdC1zcmMvZmV0Y2gtd3JhcHBlci5qc1xuaW1wb3J0IHsgc2FmZVBhcnNlIH0gZnJvbSBcImZhc3QtY29udGVudC10eXBlLXBhcnNlXCI7XG5pbXBvcnQgeyBKU09OUGFyc2UsIEpTT05TdHJpbmdpZnkgfSBmcm9tIFwianNvbi13aXRoLWJpZ2ludFwiO1xuXG4vLyBwa2cvZGlzdC1zcmMvaXMtcGxhaW4tb2JqZWN0LmpzXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgdmFsdWUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgIT09IFwiW29iamVjdCBPYmplY3RdXCIpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHJldHVybiB0cnVlO1xuICBjb25zdCBDdG9yID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCBcImNvbnN0cnVjdG9yXCIpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gdHlwZW9mIEN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbChDdG9yKSA9PT0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwodmFsdWUpO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvZmV0Y2gtd3JhcHBlci5qc1xuaW1wb3J0IHsgUmVxdWVzdEVycm9yIH0gZnJvbSBcIkBvY3Rva2l0L3JlcXVlc3QtZXJyb3JcIjtcbnZhciBub29wID0gKCkgPT4gXCJcIjtcbmFzeW5jIGZ1bmN0aW9uIGZldGNoV3JhcHBlcihyZXF1ZXN0T3B0aW9ucykge1xuICBjb25zdCBmZXRjaCA9IHJlcXVlc3RPcHRpb25zLnJlcXVlc3Q/LmZldGNoIHx8IGdsb2JhbFRoaXMuZmV0Y2g7XG4gIGlmICghZmV0Y2gpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBcImZldGNoIGlzIG5vdCBzZXQuIFBsZWFzZSBwYXNzIGEgZmV0Y2ggaW1wbGVtZW50YXRpb24gYXMgbmV3IE9jdG9raXQoeyByZXF1ZXN0OiB7IGZldGNoIH19KS4gTGVhcm4gbW9yZSBhdCBodHRwczovL2dpdGh1Yi5jb20vb2N0b2tpdC9vY3Rva2l0LmpzLyNmZXRjaC1taXNzaW5nXCJcbiAgICApO1xuICB9XG4gIGNvbnN0IGxvZyA9IHJlcXVlc3RPcHRpb25zLnJlcXVlc3Q/LmxvZyB8fCBjb25zb2xlO1xuICBjb25zdCBwYXJzZVN1Y2Nlc3NSZXNwb25zZUJvZHkgPSByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0Py5wYXJzZVN1Y2Nlc3NSZXNwb25zZUJvZHkgIT09IGZhbHNlO1xuICBjb25zdCBib2R5ID0gaXNQbGFpbk9iamVjdChyZXF1ZXN0T3B0aW9ucy5ib2R5KSB8fCBBcnJheS5pc0FycmF5KHJlcXVlc3RPcHRpb25zLmJvZHkpID8gSlNPTlN0cmluZ2lmeShyZXF1ZXN0T3B0aW9ucy5ib2R5KSA6IHJlcXVlc3RPcHRpb25zLmJvZHk7XG4gIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgIE9iamVjdC5lbnRyaWVzKHJlcXVlc3RPcHRpb25zLmhlYWRlcnMpLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gW1xuICAgICAgbmFtZSxcbiAgICAgIFN0cmluZyh2YWx1ZSlcbiAgICBdKVxuICApO1xuICBsZXQgZmV0Y2hSZXNwb25zZTtcbiAgdHJ5IHtcbiAgICBmZXRjaFJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdE9wdGlvbnMudXJsLCB7XG4gICAgICBtZXRob2Q6IHJlcXVlc3RPcHRpb25zLm1ldGhvZCxcbiAgICAgIGJvZHksXG4gICAgICByZWRpcmVjdDogcmVxdWVzdE9wdGlvbnMucmVxdWVzdD8ucmVkaXJlY3QsXG4gICAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICAgIHNpZ25hbDogcmVxdWVzdE9wdGlvbnMucmVxdWVzdD8uc2lnbmFsLFxuICAgICAgLy8gZHVwbGV4IG11c3QgYmUgc2V0IGlmIHJlcXVlc3QuYm9keSBpcyBSZWFkYWJsZVN0cmVhbSBvciBBc3luYyBJdGVyYWJsZXMuXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2RvbS1yZXF1ZXN0aW5pdC1kdXBsZXguXG4gICAgICAuLi5yZXF1ZXN0T3B0aW9ucy5ib2R5ICYmIHsgZHVwbGV4OiBcImhhbGZcIiB9XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSBcIlVua25vd24gRXJyb3JcIjtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgaWYgKGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XG4gICAgICAgIGVycm9yLnN0YXR1cyA9IDUwMDtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgIGlmIChlcnJvci5uYW1lID09PSBcIlR5cGVFcnJvclwiICYmIFwiY2F1c2VcIiBpbiBlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IuY2F1c2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5jYXVzZS5tZXNzYWdlO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvci5jYXVzZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5jYXVzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0RXJyb3IgPSBuZXcgUmVxdWVzdEVycm9yKG1lc3NhZ2UsIDUwMCwge1xuICAgICAgcmVxdWVzdDogcmVxdWVzdE9wdGlvbnNcbiAgICB9KTtcbiAgICByZXF1ZXN0RXJyb3IuY2F1c2UgPSBlcnJvcjtcbiAgICB0aHJvdyByZXF1ZXN0RXJyb3I7XG4gIH1cbiAgY29uc3Qgc3RhdHVzID0gZmV0Y2hSZXNwb25zZS5zdGF0dXM7XG4gIGNvbnN0IHVybCA9IGZldGNoUmVzcG9uc2UudXJsO1xuICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZmV0Y2hSZXNwb25zZS5oZWFkZXJzKSB7XG4gICAgcmVzcG9uc2VIZWFkZXJzW2tleV0gPSB2YWx1ZTtcbiAgfVxuICBjb25zdCBvY3Rva2l0UmVzcG9uc2UgPSB7XG4gICAgdXJsLFxuICAgIHN0YXR1cyxcbiAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgZGF0YTogXCJcIlxuICB9O1xuICBpZiAoXCJkZXByZWNhdGlvblwiIGluIHJlc3BvbnNlSGVhZGVycykge1xuICAgIGNvbnN0IG1hdGNoZXMgPSByZXNwb25zZUhlYWRlcnMubGluayAmJiByZXNwb25zZUhlYWRlcnMubGluay5tYXRjaCgvPChbXjw+XSspPjsgcmVsPVwiZGVwcmVjYXRpb25cIi8pO1xuICAgIGNvbnN0IGRlcHJlY2F0aW9uTGluayA9IG1hdGNoZXMgJiYgbWF0Y2hlcy5wb3AoKTtcbiAgICBsb2cud2FybihcbiAgICAgIGBbQG9jdG9raXQvcmVxdWVzdF0gXCIke3JlcXVlc3RPcHRpb25zLm1ldGhvZH0gJHtyZXF1ZXN0T3B0aW9ucy51cmx9XCIgaXMgZGVwcmVjYXRlZC4gSXQgaXMgc2NoZWR1bGVkIHRvIGJlIHJlbW92ZWQgb24gJHtyZXNwb25zZUhlYWRlcnMuc3Vuc2V0fSR7ZGVwcmVjYXRpb25MaW5rID8gYC4gU2VlICR7ZGVwcmVjYXRpb25MaW5rfWAgOiBcIlwifWBcbiAgICApO1xuICB9XG4gIGlmIChzdGF0dXMgPT09IDIwNCB8fCBzdGF0dXMgPT09IDIwNSkge1xuICAgIHJldHVybiBvY3Rva2l0UmVzcG9uc2U7XG4gIH1cbiAgaWYgKHJlcXVlc3RPcHRpb25zLm1ldGhvZCA9PT0gXCJIRUFEXCIpIHtcbiAgICBpZiAoc3RhdHVzIDwgNDAwKSB7XG4gICAgICByZXR1cm4gb2N0b2tpdFJlc3BvbnNlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKGZldGNoUmVzcG9uc2Uuc3RhdHVzVGV4dCwgc3RhdHVzLCB7XG4gICAgICByZXNwb25zZTogb2N0b2tpdFJlc3BvbnNlLFxuICAgICAgcmVxdWVzdDogcmVxdWVzdE9wdGlvbnNcbiAgICB9KTtcbiAgfVxuICBpZiAoc3RhdHVzID09PSAzMDQpIHtcbiAgICBvY3Rva2l0UmVzcG9uc2UuZGF0YSA9IGF3YWl0IGdldFJlc3BvbnNlRGF0YShmZXRjaFJlc3BvbnNlKTtcbiAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiTm90IG1vZGlmaWVkXCIsIHN0YXR1cywge1xuICAgICAgcmVzcG9uc2U6IG9jdG9raXRSZXNwb25zZSxcbiAgICAgIHJlcXVlc3Q6IHJlcXVlc3RPcHRpb25zXG4gICAgfSk7XG4gIH1cbiAgaWYgKHN0YXR1cyA+PSA0MDApIHtcbiAgICBvY3Rva2l0UmVzcG9uc2UuZGF0YSA9IGF3YWl0IGdldFJlc3BvbnNlRGF0YShmZXRjaFJlc3BvbnNlKTtcbiAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKHRvRXJyb3JNZXNzYWdlKG9jdG9raXRSZXNwb25zZS5kYXRhKSwgc3RhdHVzLCB7XG4gICAgICByZXNwb25zZTogb2N0b2tpdFJlc3BvbnNlLFxuICAgICAgcmVxdWVzdDogcmVxdWVzdE9wdGlvbnNcbiAgICB9KTtcbiAgfVxuICBvY3Rva2l0UmVzcG9uc2UuZGF0YSA9IHBhcnNlU3VjY2Vzc1Jlc3BvbnNlQm9keSA/IGF3YWl0IGdldFJlc3BvbnNlRGF0YShmZXRjaFJlc3BvbnNlKSA6IGZldGNoUmVzcG9uc2UuYm9keTtcbiAgcmV0dXJuIG9jdG9raXRSZXNwb25zZTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldFJlc3BvbnNlRGF0YShyZXNwb25zZSkge1xuICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpO1xuICBpZiAoIWNvbnRlbnRUeXBlKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKS5jYXRjaChub29wKTtcbiAgfVxuICBjb25zdCBtaW1ldHlwZSA9IHNhZmVQYXJzZShjb250ZW50VHlwZSk7XG4gIGlmIChpc0pTT05SZXNwb25zZShtaW1ldHlwZSkpIHtcbiAgICBsZXQgdGV4dCA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgIHRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICByZXR1cm4gSlNPTlBhcnNlKHRleHQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuICB9IGVsc2UgaWYgKG1pbWV0eXBlLnR5cGUuc3RhcnRzV2l0aChcInRleHQvXCIpIHx8IG1pbWV0eXBlLnBhcmFtZXRlcnMuY2hhcnNldD8udG9Mb3dlckNhc2UoKSA9PT0gXCJ1dGYtOFwiKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKS5jYXRjaChub29wKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKS5jYXRjaChcbiAgICAgIC8qIHY4IGlnbm9yZSBuZXh0IC0tIEBwcmVzZXJ2ZSAqL1xuICAgICAgKCkgPT4gbmV3IEFycmF5QnVmZmVyKDApXG4gICAgKTtcbiAgfVxufVxuZnVuY3Rpb24gaXNKU09OUmVzcG9uc2UobWltZXR5cGUpIHtcbiAgcmV0dXJuIG1pbWV0eXBlLnR5cGUgPT09IFwiYXBwbGljYXRpb24vanNvblwiIHx8IG1pbWV0eXBlLnR5cGUgPT09IFwiYXBwbGljYXRpb24vc2NpbStqc29uXCI7XG59XG5mdW5jdGlvbiB0b0Vycm9yTWVzc2FnZShkYXRhKSB7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG4gIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gXCJVbmtub3duIGVycm9yXCI7XG4gIH1cbiAgaWYgKFwibWVzc2FnZVwiIGluIGRhdGEpIHtcbiAgICBjb25zdCBzdWZmaXggPSBcImRvY3VtZW50YXRpb25fdXJsXCIgaW4gZGF0YSA/IGAgLSAke2RhdGEuZG9jdW1lbnRhdGlvbl91cmx9YCA6IFwiXCI7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZGF0YS5lcnJvcnMpID8gYCR7ZGF0YS5tZXNzYWdlfTogJHtkYXRhLmVycm9ycy5tYXAoKHYpID0+IEpTT04uc3RyaW5naWZ5KHYpKS5qb2luKFwiLCBcIil9JHtzdWZmaXh9YCA6IGAke2RhdGEubWVzc2FnZX0ke3N1ZmZpeH1gO1xuICB9XG4gIHJldHVybiBgVW5rbm93biBlcnJvcjogJHtKU09OLnN0cmluZ2lmeShkYXRhKX1gO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvd2l0aC1kZWZhdWx0cy5qc1xuZnVuY3Rpb24gd2l0aERlZmF1bHRzKG9sZEVuZHBvaW50LCBuZXdEZWZhdWx0cykge1xuICBjb25zdCBlbmRwb2ludDIgPSBvbGRFbmRwb2ludC5kZWZhdWx0cyhuZXdEZWZhdWx0cyk7XG4gIGNvbnN0IG5ld0FwaSA9IGZ1bmN0aW9uKHJvdXRlLCBwYXJhbWV0ZXJzKSB7XG4gICAgY29uc3QgZW5kcG9pbnRPcHRpb25zID0gZW5kcG9pbnQyLm1lcmdlKHJvdXRlLCBwYXJhbWV0ZXJzKTtcbiAgICBpZiAoIWVuZHBvaW50T3B0aW9ucy5yZXF1ZXN0IHx8ICFlbmRwb2ludE9wdGlvbnMucmVxdWVzdC5ob29rKSB7XG4gICAgICByZXR1cm4gZmV0Y2hXcmFwcGVyKGVuZHBvaW50Mi5wYXJzZShlbmRwb2ludE9wdGlvbnMpKTtcbiAgICB9XG4gICAgY29uc3QgcmVxdWVzdDIgPSAocm91dGUyLCBwYXJhbWV0ZXJzMikgPT4ge1xuICAgICAgcmV0dXJuIGZldGNoV3JhcHBlcihcbiAgICAgICAgZW5kcG9pbnQyLnBhcnNlKGVuZHBvaW50Mi5tZXJnZShyb3V0ZTIsIHBhcmFtZXRlcnMyKSlcbiAgICAgICk7XG4gICAgfTtcbiAgICBPYmplY3QuYXNzaWduKHJlcXVlc3QyLCB7XG4gICAgICBlbmRwb2ludDogZW5kcG9pbnQyLFxuICAgICAgZGVmYXVsdHM6IHdpdGhEZWZhdWx0cy5iaW5kKG51bGwsIGVuZHBvaW50MilcbiAgICB9KTtcbiAgICByZXR1cm4gZW5kcG9pbnRPcHRpb25zLnJlcXVlc3QuaG9vayhyZXF1ZXN0MiwgZW5kcG9pbnRPcHRpb25zKTtcbiAgfTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3QXBpLCB7XG4gICAgZW5kcG9pbnQ6IGVuZHBvaW50MixcbiAgICBkZWZhdWx0czogd2l0aERlZmF1bHRzLmJpbmQobnVsbCwgZW5kcG9pbnQyKVxuICB9KTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL2luZGV4LmpzXG52YXIgcmVxdWVzdCA9IHdpdGhEZWZhdWx0cyhlbmRwb2ludCwgZGVmYXVsdHNfZGVmYXVsdCk7XG5leHBvcnQge1xuICByZXF1ZXN0XG59O1xuLyogdjggaWdub3JlIG5leHQgLS0gQHByZXNlcnZlICovXG4vKiB2OCBpZ25vcmUgZWxzZSAtLSBAcHJlc2VydmUgKi9cbiIsIi8vIHBrZy9kaXN0LXNyYy9pbmRleC5qc1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gXCJAb2N0b2tpdC9yZXF1ZXN0XCI7XG5pbXBvcnQgeyBnZXRVc2VyQWdlbnQgfSBmcm9tIFwidW5pdmVyc2FsLXVzZXItYWdlbnRcIjtcblxuLy8gcGtnL2Rpc3Qtc3JjL3ZlcnNpb24uanNcbnZhciBWRVJTSU9OID0gXCIwLjAuMC1kZXZlbG9wbWVudFwiO1xuXG4vLyBwa2cvZGlzdC1zcmMvd2l0aC1kZWZhdWx0cy5qc1xuaW1wb3J0IHsgcmVxdWVzdCBhcyBSZXF1ZXN0MiB9IGZyb20gXCJAb2N0b2tpdC9yZXF1ZXN0XCI7XG5cbi8vIHBrZy9kaXN0LXNyYy9ncmFwaHFsLmpzXG5pbXBvcnQgeyByZXF1ZXN0IGFzIFJlcXVlc3QgfSBmcm9tIFwiQG9jdG9raXQvcmVxdWVzdFwiO1xuXG4vLyBwa2cvZGlzdC1zcmMvZXJyb3IuanNcbmZ1bmN0aW9uIF9idWlsZE1lc3NhZ2VGb3JSZXNwb25zZUVycm9ycyhkYXRhKSB7XG4gIHJldHVybiBgUmVxdWVzdCBmYWlsZWQgZHVlIHRvIGZvbGxvd2luZyByZXNwb25zZSBlcnJvcnM6XG5gICsgZGF0YS5lcnJvcnMubWFwKChlKSA9PiBgIC0gJHtlLm1lc3NhZ2V9YCkuam9pbihcIlxcblwiKTtcbn1cbnZhciBHcmFwaHFsUmVzcG9uc2VFcnJvciA9IGNsYXNzIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihyZXF1ZXN0MiwgaGVhZGVycywgcmVzcG9uc2UpIHtcbiAgICBzdXBlcihfYnVpbGRNZXNzYWdlRm9yUmVzcG9uc2VFcnJvcnMocmVzcG9uc2UpKTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0MjtcbiAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICB0aGlzLmVycm9ycyA9IHJlc3BvbnNlLmVycm9ycztcbiAgICB0aGlzLmRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuICB9XG4gIG5hbWUgPSBcIkdyYXBocWxSZXNwb25zZUVycm9yXCI7XG4gIGVycm9ycztcbiAgZGF0YTtcbn07XG5cbi8vIHBrZy9kaXN0LXNyYy9ncmFwaHFsLmpzXG52YXIgTk9OX1ZBUklBQkxFX09QVElPTlMgPSBbXG4gIFwibWV0aG9kXCIsXG4gIFwiYmFzZVVybFwiLFxuICBcInVybFwiLFxuICBcImhlYWRlcnNcIixcbiAgXCJyZXF1ZXN0XCIsXG4gIFwicXVlcnlcIixcbiAgXCJtZWRpYVR5cGVcIixcbiAgXCJvcGVyYXRpb25OYW1lXCJcbl07XG52YXIgRk9SQklEREVOX1ZBUklBQkxFX09QVElPTlMgPSBbXCJxdWVyeVwiLCBcIm1ldGhvZFwiLCBcInVybFwiXTtcbnZhciBHSEVTX1YzX1NVRkZJWF9SRUdFWCA9IC9cXC9hcGlcXC92M1xcLz8kLztcbmZ1bmN0aW9uIGdyYXBocWwocmVxdWVzdDIsIHF1ZXJ5LCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gXCJzdHJpbmdcIiAmJiBcInF1ZXJ5XCIgaW4gb3B0aW9ucykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICBuZXcgRXJyb3IoYFtAb2N0b2tpdC9ncmFwaHFsXSBcInF1ZXJ5XCIgY2Fubm90IGJlIHVzZWQgYXMgdmFyaWFibGUgbmFtZWApXG4gICAgICApO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRpb25zKSB7XG4gICAgICBpZiAoIUZPUkJJRERFTl9WQVJJQUJMRV9PUFRJT05TLmluY2x1ZGVzKGtleSkpIGNvbnRpbnVlO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgYFtAb2N0b2tpdC9ncmFwaHFsXSBcIiR7a2V5fVwiIGNhbm5vdCBiZSB1c2VkIGFzIHZhcmlhYmxlIG5hbWVgXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGNvbnN0IHBhcnNlZE9wdGlvbnMgPSB0eXBlb2YgcXVlcnkgPT09IFwic3RyaW5nXCIgPyBPYmplY3QuYXNzaWduKHsgcXVlcnkgfSwgb3B0aW9ucykgOiBxdWVyeTtcbiAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBPYmplY3Qua2V5cyhcbiAgICBwYXJzZWRPcHRpb25zXG4gICkucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuICAgIGlmIChOT05fVkFSSUFCTEVfT1BUSU9OUy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHBhcnNlZE9wdGlvbnNba2V5XTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmICghcmVzdWx0LnZhcmlhYmxlcykge1xuICAgICAgcmVzdWx0LnZhcmlhYmxlcyA9IHt9O1xuICAgIH1cbiAgICByZXN1bHQudmFyaWFibGVzW2tleV0gPSBwYXJzZWRPcHRpb25zW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSwge30pO1xuICBjb25zdCBiYXNlVXJsID0gcGFyc2VkT3B0aW9ucy5iYXNlVXJsIHx8IHJlcXVlc3QyLmVuZHBvaW50LkRFRkFVTFRTLmJhc2VVcmw7XG4gIGlmIChHSEVTX1YzX1NVRkZJWF9SRUdFWC50ZXN0KGJhc2VVcmwpKSB7XG4gICAgcmVxdWVzdE9wdGlvbnMudXJsID0gYmFzZVVybC5yZXBsYWNlKEdIRVNfVjNfU1VGRklYX1JFR0VYLCBcIi9hcGkvZ3JhcGhxbFwiKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdDIocmVxdWVzdE9wdGlvbnMpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLmRhdGEuZXJyb3JzKSB7XG4gICAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZXNwb25zZS5oZWFkZXJzKSkge1xuICAgICAgICBoZWFkZXJzW2tleV0gPSByZXNwb25zZS5oZWFkZXJzW2tleV07XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgR3JhcGhxbFJlc3BvbnNlRXJyb3IoXG4gICAgICAgIHJlcXVlc3RPcHRpb25zLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICByZXNwb25zZS5kYXRhXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICB9KTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL3dpdGgtZGVmYXVsdHMuanNcbmZ1bmN0aW9uIHdpdGhEZWZhdWx0cyhyZXF1ZXN0MiwgbmV3RGVmYXVsdHMpIHtcbiAgY29uc3QgbmV3UmVxdWVzdCA9IHJlcXVlc3QyLmRlZmF1bHRzKG5ld0RlZmF1bHRzKTtcbiAgY29uc3QgbmV3QXBpID0gKHF1ZXJ5LCBvcHRpb25zKSA9PiB7XG4gICAgcmV0dXJuIGdyYXBocWwobmV3UmVxdWVzdCwgcXVlcnksIG9wdGlvbnMpO1xuICB9O1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXdBcGksIHtcbiAgICBkZWZhdWx0czogd2l0aERlZmF1bHRzLmJpbmQobnVsbCwgbmV3UmVxdWVzdCksXG4gICAgZW5kcG9pbnQ6IG5ld1JlcXVlc3QuZW5kcG9pbnRcbiAgfSk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9pbmRleC5qc1xudmFyIGdyYXBocWwyID0gd2l0aERlZmF1bHRzKHJlcXVlc3QsIHtcbiAgaGVhZGVyczoge1xuICAgIFwidXNlci1hZ2VudFwiOiBgb2N0b2tpdC1ncmFwaHFsLmpzLyR7VkVSU0lPTn0gJHtnZXRVc2VyQWdlbnQoKX1gXG4gIH0sXG4gIG1ldGhvZDogXCJQT1NUXCIsXG4gIHVybDogXCIvZ3JhcGhxbFwiXG59KTtcbmZ1bmN0aW9uIHdpdGhDdXN0b21SZXF1ZXN0KGN1c3RvbVJlcXVlc3QpIHtcbiAgcmV0dXJuIHdpdGhEZWZhdWx0cyhjdXN0b21SZXF1ZXN0LCB7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IFwiL2dyYXBocWxcIlxuICB9KTtcbn1cbmV4cG9ydCB7XG4gIEdyYXBocWxSZXNwb25zZUVycm9yLFxuICBncmFwaHFsMiBhcyBncmFwaHFsLFxuICB3aXRoQ3VzdG9tUmVxdWVzdFxufTtcbiIsIi8vIHBrZy9kaXN0LXNyYy9pcy1qd3QuanNcbnZhciBiNjR1cmwgPSBcIig/OlthLXpBLVowLTlfLV0rKVwiO1xudmFyIHNlcCA9IFwiXFxcXC5cIjtcbnZhciBqd3RSRSA9IG5ldyBSZWdFeHAoYF4ke2I2NHVybH0ke3NlcH0ke2I2NHVybH0ke3NlcH0ke2I2NHVybH0kYCk7XG52YXIgaXNKV1QgPSBqd3RSRS50ZXN0LmJpbmQoand0UkUpO1xuXG4vLyBwa2cvZGlzdC1zcmMvYXV0aC5qc1xuYXN5bmMgZnVuY3Rpb24gYXV0aCh0b2tlbikge1xuICBjb25zdCBpc0FwcCA9IGlzSldUKHRva2VuKTtcbiAgY29uc3QgaXNJbnN0YWxsYXRpb24gPSB0b2tlbi5zdGFydHNXaXRoKFwidjEuXCIpIHx8IHRva2VuLnN0YXJ0c1dpdGgoXCJnaHNfXCIpO1xuICBjb25zdCBpc1VzZXJUb1NlcnZlciA9IHRva2VuLnN0YXJ0c1dpdGgoXCJnaHVfXCIpO1xuICBjb25zdCB0b2tlblR5cGUgPSBpc0FwcCA/IFwiYXBwXCIgOiBpc0luc3RhbGxhdGlvbiA/IFwiaW5zdGFsbGF0aW9uXCIgOiBpc1VzZXJUb1NlcnZlciA/IFwidXNlci10by1zZXJ2ZXJcIiA6IFwib2F1dGhcIjtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBcInRva2VuXCIsXG4gICAgdG9rZW4sXG4gICAgdG9rZW5UeXBlXG4gIH07XG59XG5cbi8vIHBrZy9kaXN0LXNyYy93aXRoLWF1dGhvcml6YXRpb24tcHJlZml4LmpzXG5mdW5jdGlvbiB3aXRoQXV0aG9yaXphdGlvblByZWZpeCh0b2tlbikge1xuICBpZiAodG9rZW4uc3BsaXQoL1xcLi8pLmxlbmd0aCA9PT0gMykge1xuICAgIHJldHVybiBgYmVhcmVyICR7dG9rZW59YDtcbiAgfVxuICByZXR1cm4gYHRva2VuICR7dG9rZW59YDtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL2hvb2suanNcbmFzeW5jIGZ1bmN0aW9uIGhvb2sodG9rZW4sIHJlcXVlc3QsIHJvdXRlLCBwYXJhbWV0ZXJzKSB7XG4gIGNvbnN0IGVuZHBvaW50ID0gcmVxdWVzdC5lbmRwb2ludC5tZXJnZShcbiAgICByb3V0ZSxcbiAgICBwYXJhbWV0ZXJzXG4gICk7XG4gIGVuZHBvaW50LmhlYWRlcnMuYXV0aG9yaXphdGlvbiA9IHdpdGhBdXRob3JpemF0aW9uUHJlZml4KHRva2VuKTtcbiAgcmV0dXJuIHJlcXVlc3QoZW5kcG9pbnQpO1xufVxuXG4vLyBwa2cvZGlzdC1zcmMvaW5kZXguanNcbnZhciBjcmVhdGVUb2tlbkF1dGggPSBmdW5jdGlvbiBjcmVhdGVUb2tlbkF1dGgyKHRva2VuKSB7XG4gIGlmICghdG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJbQG9jdG9raXQvYXV0aC10b2tlbl0gTm8gdG9rZW4gcGFzc2VkIHRvIGNyZWF0ZVRva2VuQXV0aFwiKTtcbiAgfVxuICBpZiAodHlwZW9mIHRva2VuICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJbQG9jdG9raXQvYXV0aC10b2tlbl0gVG9rZW4gcGFzc2VkIHRvIGNyZWF0ZVRva2VuQXV0aCBpcyBub3QgYSBzdHJpbmdcIlxuICAgICk7XG4gIH1cbiAgdG9rZW4gPSB0b2tlbi5yZXBsYWNlKC9eKHRva2VufGJlYXJlcikgKy9pLCBcIlwiKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oYXV0aC5iaW5kKG51bGwsIHRva2VuKSwge1xuICAgIGhvb2s6IGhvb2suYmluZChudWxsLCB0b2tlbilcbiAgfSk7XG59O1xuZXhwb3J0IHtcbiAgY3JlYXRlVG9rZW5BdXRoXG59O1xuIiwiY29uc3QgVkVSU0lPTiA9IFwiNy4wLjZcIjtcbmV4cG9ydCB7XG4gIFZFUlNJT05cbn07XG4iLCJpbXBvcnQgeyBnZXRVc2VyQWdlbnQgfSBmcm9tIFwidW5pdmVyc2FsLXVzZXItYWdlbnRcIjtcbmltcG9ydCBIb29rIGZyb20gXCJiZWZvcmUtYWZ0ZXItaG9va1wiO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gXCJAb2N0b2tpdC9yZXF1ZXN0XCI7XG5pbXBvcnQgeyB3aXRoQ3VzdG9tUmVxdWVzdCB9IGZyb20gXCJAb2N0b2tpdC9ncmFwaHFsXCI7XG5pbXBvcnQgeyBjcmVhdGVUb2tlbkF1dGggfSBmcm9tIFwiQG9jdG9raXQvYXV0aC10b2tlblwiO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gXCIuL3ZlcnNpb24uanNcIjtcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuY29uc3QgY29uc29sZVdhcm4gPSBjb25zb2xlLndhcm4uYmluZChjb25zb2xlKTtcbmNvbnN0IGNvbnNvbGVFcnJvciA9IGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlKTtcbmZ1bmN0aW9uIGNyZWF0ZUxvZ2dlcihsb2dnZXIgPSB7fSkge1xuICBpZiAodHlwZW9mIGxvZ2dlci5kZWJ1ZyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbG9nZ2VyLmRlYnVnID0gbm9vcDtcbiAgfVxuICBpZiAodHlwZW9mIGxvZ2dlci5pbmZvICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBsb2dnZXIuaW5mbyA9IG5vb3A7XG4gIH1cbiAgaWYgKHR5cGVvZiBsb2dnZXIud2FybiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbG9nZ2VyLndhcm4gPSBjb25zb2xlV2FybjtcbiAgfVxuICBpZiAodHlwZW9mIGxvZ2dlci5lcnJvciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbG9nZ2VyLmVycm9yID0gY29uc29sZUVycm9yO1xuICB9XG4gIHJldHVybiBsb2dnZXI7XG59XG5jb25zdCB1c2VyQWdlbnRUcmFpbCA9IGBvY3Rva2l0LWNvcmUuanMvJHtWRVJTSU9OfSAke2dldFVzZXJBZ2VudCgpfWA7XG5jbGFzcyBPY3Rva2l0IHtcbiAgc3RhdGljIFZFUlNJT04gPSBWRVJTSU9OO1xuICBzdGF0aWMgZGVmYXVsdHMoZGVmYXVsdHMpIHtcbiAgICBjb25zdCBPY3Rva2l0V2l0aERlZmF1bHRzID0gY2xhc3MgZXh0ZW5kcyB0aGlzIHtcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3NbMF0gfHwge307XG4gICAgICAgIGlmICh0eXBlb2YgZGVmYXVsdHMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHN1cGVyKGRlZmF1bHRzKG9wdGlvbnMpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgZGVmYXVsdHMsXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgb3B0aW9ucy51c2VyQWdlbnQgJiYgZGVmYXVsdHMudXNlckFnZW50ID8ge1xuICAgICAgICAgICAgICB1c2VyQWdlbnQ6IGAke29wdGlvbnMudXNlckFnZW50fSAke2RlZmF1bHRzLnVzZXJBZ2VudH1gXG4gICAgICAgICAgICB9IDogbnVsbFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPY3Rva2l0V2l0aERlZmF1bHRzO1xuICB9XG4gIHN0YXRpYyBwbHVnaW5zID0gW107XG4gIC8qKlxuICAgKiBBdHRhY2ggYSBwbHVnaW4gKG9yIG1hbnkpIHRvIHlvdXIgT2N0b2tpdCBpbnN0YW5jZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgQVBJID0gT2N0b2tpdC5wbHVnaW4ocGx1Z2luMSwgcGx1Z2luMiwgcGx1Z2luMywgLi4uKVxuICAgKi9cbiAgc3RhdGljIHBsdWdpbiguLi5uZXdQbHVnaW5zKSB7XG4gICAgY29uc3QgY3VycmVudFBsdWdpbnMgPSB0aGlzLnBsdWdpbnM7XG4gICAgY29uc3QgTmV3T2N0b2tpdCA9IGNsYXNzIGV4dGVuZHMgdGhpcyB7XG4gICAgICBzdGF0aWMgcGx1Z2lucyA9IGN1cnJlbnRQbHVnaW5zLmNvbmNhdChcbiAgICAgICAgbmV3UGx1Z2lucy5maWx0ZXIoKHBsdWdpbikgPT4gIWN1cnJlbnRQbHVnaW5zLmluY2x1ZGVzKHBsdWdpbikpXG4gICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIE5ld09jdG9raXQ7XG4gIH1cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgaG9vayA9IG5ldyBIb29rLkNvbGxlY3Rpb24oKTtcbiAgICBjb25zdCByZXF1ZXN0RGVmYXVsdHMgPSB7XG4gICAgICBiYXNlVXJsOiByZXF1ZXN0LmVuZHBvaW50LkRFRkFVTFRTLmJhc2VVcmwsXG4gICAgICBoZWFkZXJzOiB7fSxcbiAgICAgIHJlcXVlc3Q6IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMucmVxdWVzdCwge1xuICAgICAgICAvLyBAdHMtaWdub3JlIGludGVybmFsIHVzYWdlIG9ubHksIG5vIG5lZWQgdG8gdHlwZVxuICAgICAgICBob29rOiBob29rLmJpbmQobnVsbCwgXCJyZXF1ZXN0XCIpXG4gICAgICB9KSxcbiAgICAgIG1lZGlhVHlwZToge1xuICAgICAgICBwcmV2aWV3czogW10sXG4gICAgICAgIGZvcm1hdDogXCJcIlxuICAgICAgfVxuICAgIH07XG4gICAgcmVxdWVzdERlZmF1bHRzLmhlYWRlcnNbXCJ1c2VyLWFnZW50XCJdID0gb3B0aW9ucy51c2VyQWdlbnQgPyBgJHtvcHRpb25zLnVzZXJBZ2VudH0gJHt1c2VyQWdlbnRUcmFpbH1gIDogdXNlckFnZW50VHJhaWw7XG4gICAgaWYgKG9wdGlvbnMuYmFzZVVybCkge1xuICAgICAgcmVxdWVzdERlZmF1bHRzLmJhc2VVcmwgPSBvcHRpb25zLmJhc2VVcmw7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnByZXZpZXdzKSB7XG4gICAgICByZXF1ZXN0RGVmYXVsdHMubWVkaWFUeXBlLnByZXZpZXdzID0gb3B0aW9ucy5wcmV2aWV3cztcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudGltZVpvbmUpIHtcbiAgICAgIHJlcXVlc3REZWZhdWx0cy5oZWFkZXJzW1widGltZS16b25lXCJdID0gb3B0aW9ucy50aW1lWm9uZTtcbiAgICB9XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdC5kZWZhdWx0cyhyZXF1ZXN0RGVmYXVsdHMpO1xuICAgIHRoaXMuZ3JhcGhxbCA9IHdpdGhDdXN0b21SZXF1ZXN0KHRoaXMucmVxdWVzdCkuZGVmYXVsdHMocmVxdWVzdERlZmF1bHRzKTtcbiAgICB0aGlzLmxvZyA9IGNyZWF0ZUxvZ2dlcihvcHRpb25zLmxvZyk7XG4gICAgdGhpcy5ob29rID0gaG9vaztcbiAgICBpZiAoIW9wdGlvbnMuYXV0aFN0cmF0ZWd5KSB7XG4gICAgICBpZiAoIW9wdGlvbnMuYXV0aCkge1xuICAgICAgICB0aGlzLmF1dGggPSBhc3luYyAoKSA9PiAoe1xuICAgICAgICAgIHR5cGU6IFwidW5hdXRoZW50aWNhdGVkXCJcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBhdXRoID0gY3JlYXRlVG9rZW5BdXRoKG9wdGlvbnMuYXV0aCk7XG4gICAgICAgIGhvb2sud3JhcChcInJlcXVlc3RcIiwgYXV0aC5ob29rKTtcbiAgICAgICAgdGhpcy5hdXRoID0gYXV0aDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyBhdXRoU3RyYXRlZ3ksIC4uLm90aGVyT3B0aW9ucyB9ID0gb3B0aW9ucztcbiAgICAgIGNvbnN0IGF1dGggPSBhdXRoU3RyYXRlZ3koXG4gICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAge1xuICAgICAgICAgICAgcmVxdWVzdDogdGhpcy5yZXF1ZXN0LFxuICAgICAgICAgICAgbG9nOiB0aGlzLmxvZyxcbiAgICAgICAgICAgIC8vIHdlIHBhc3MgdGhlIGN1cnJlbnQgb2N0b2tpdCBpbnN0YW5jZSBhcyB3ZWxsIGFzIGl0cyBjb25zdHJ1Y3RvciBvcHRpb25zXG4gICAgICAgICAgICAvLyB0byBhbGxvdyBmb3IgYXV0aGVudGljYXRpb24gc3RyYXRlZ2llcyB0aGF0IHJldHVybiBhIG5ldyBvY3Rva2l0IGluc3RhbmNlXG4gICAgICAgICAgICAvLyB0aGF0IHNoYXJlcyB0aGUgc2FtZSBpbnRlcm5hbCBzdGF0ZSBhcyB0aGUgY3VycmVudCBvbmUuIFRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgLy8gcmVxdWlyZW1lbnQgZm9yIHRoaXMgd2FzIHRoZSBcImV2ZW50LW9jdG9raXRcIiBhdXRoZW50aWNhdGlvbiBzdHJhdGVneVxuICAgICAgICAgICAgLy8gb2YgaHR0cHM6Ly9naXRodWIuY29tL3Byb2JvdC9vY3Rva2l0LWF1dGgtcHJvYm90LlxuICAgICAgICAgICAgb2N0b2tpdDogdGhpcyxcbiAgICAgICAgICAgIG9jdG9raXRPcHRpb25zOiBvdGhlck9wdGlvbnNcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9wdGlvbnMuYXV0aFxuICAgICAgICApXG4gICAgICApO1xuICAgICAgaG9vay53cmFwKFwicmVxdWVzdFwiLCBhdXRoLmhvb2spO1xuICAgICAgdGhpcy5hdXRoID0gYXV0aDtcbiAgICB9XG4gICAgY29uc3QgY2xhc3NDb25zdHJ1Y3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGFzc0NvbnN0cnVjdG9yLnBsdWdpbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgY2xhc3NDb25zdHJ1Y3Rvci5wbHVnaW5zW2ldKHRoaXMsIG9wdGlvbnMpKTtcbiAgICB9XG4gIH1cbiAgLy8gYXNzaWduZWQgZHVyaW5nIGNvbnN0cnVjdG9yXG4gIHJlcXVlc3Q7XG4gIGdyYXBocWw7XG4gIGxvZztcbiAgaG9vaztcbiAgLy8gVE9ETzogdHlwZSBgb2N0b2tpdC5hdXRoYCBiYXNlZCBvbiBwYXNzZWQgb3B0aW9ucy5hdXRoU3RyYXRlZ3lcbiAgYXV0aDtcbn1cbmV4cG9ydCB7XG4gIE9jdG9raXRcbn07XG4iLCJjb25zdCBWRVJTSU9OID0gXCIxNy4wLjBcIjtcbmV4cG9ydCB7XG4gIFZFUlNJT05cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZXJzaW9uLmpzLm1hcFxuIiwiY29uc3QgRW5kcG9pbnRzID0ge1xuICBhY3Rpb25zOiB7XG4gICAgYWRkQ3VzdG9tTGFiZWxzVG9TZWxmSG9zdGVkUnVubmVyRm9yT3JnOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vYWN0aW9ucy9ydW5uZXJzL3tydW5uZXJfaWR9L2xhYmVsc1wiXG4gICAgXSxcbiAgICBhZGRDdXN0b21MYWJlbHNUb1NlbGZIb3N0ZWRSdW5uZXJGb3JSZXBvOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfS9sYWJlbHNcIlxuICAgIF0sXG4gICAgYWRkUmVwb0FjY2Vzc1RvU2VsZkhvc3RlZFJ1bm5lckdyb3VwSW5Pcmc6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVyLWdyb3Vwcy97cnVubmVyX2dyb3VwX2lkfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIGFkZFNlbGVjdGVkUmVwb1RvT3JnU2VjcmV0OiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9hY3Rpb25zL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIGFkZFNlbGVjdGVkUmVwb1RvT3JnVmFyaWFibGU6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvdmFyaWFibGVzL3tuYW1lfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIGFwcHJvdmVXb3JrZmxvd1J1bjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vYXBwcm92ZVwiXG4gICAgXSxcbiAgICBjYW5jZWxXb3JrZmxvd1J1bjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vY2FuY2VsXCJcbiAgICBdLFxuICAgIGNyZWF0ZUVudmlyb25tZW50VmFyaWFibGU6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS92YXJpYWJsZXNcIlxuICAgIF0sXG4gICAgY3JlYXRlSG9zdGVkUnVubmVyRm9yT3JnOiBbXCJQT1NUIC9vcmdzL3tvcmd9L2FjdGlvbnMvaG9zdGVkLXJ1bm5lcnNcIl0sXG4gICAgY3JlYXRlT3JVcGRhdGVFbnZpcm9ubWVudFNlY3JldDogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGNyZWF0ZU9yVXBkYXRlT3JnU2VjcmV0OiBbXCJQVVQgL29yZ3Mve29yZ30vYWN0aW9ucy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIl0sXG4gICAgY3JlYXRlT3JVcGRhdGVSZXBvU2VjcmV0OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgY3JlYXRlT3JnVmFyaWFibGU6IFtcIlBPU1QgL29yZ3Mve29yZ30vYWN0aW9ucy92YXJpYWJsZXNcIl0sXG4gICAgY3JlYXRlUmVnaXN0cmF0aW9uVG9rZW5Gb3JPcmc6IFtcbiAgICAgIFwiUE9TVCAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnMvcmVnaXN0cmF0aW9uLXRva2VuXCJcbiAgICBdLFxuICAgIGNyZWF0ZVJlZ2lzdHJhdGlvblRva2VuRm9yUmVwbzogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnMvcmVnaXN0cmF0aW9uLXRva2VuXCJcbiAgICBdLFxuICAgIGNyZWF0ZVJlbW92ZVRva2VuRm9yT3JnOiBbXCJQT1NUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVycy9yZW1vdmUtdG9rZW5cIl0sXG4gICAgY3JlYXRlUmVtb3ZlVG9rZW5Gb3JSZXBvOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVycy9yZW1vdmUtdG9rZW5cIlxuICAgIF0sXG4gICAgY3JlYXRlUmVwb1ZhcmlhYmxlOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3ZhcmlhYmxlc1wiXSxcbiAgICBjcmVhdGVXb3JrZmxvd0Rpc3BhdGNoOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvd29ya2Zsb3dzL3t3b3JrZmxvd19pZH0vZGlzcGF0Y2hlc1wiXG4gICAgXSxcbiAgICBkZWxldGVBY3Rpb25zQ2FjaGVCeUlkOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9jYWNoZXMve2NhY2hlX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVBY3Rpb25zQ2FjaGVCeUtleTogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvY2FjaGVzez9rZXkscmVmfVwiXG4gICAgXSxcbiAgICBkZWxldGVBcnRpZmFjdDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvYXJ0aWZhY3RzL3thcnRpZmFjdF9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlQ3VzdG9tSW1hZ2VGcm9tT3JnOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9hY3Rpb25zL2hvc3RlZC1ydW5uZXJzL2ltYWdlcy9jdXN0b20ve2ltYWdlX2RlZmluaXRpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUN1c3RvbUltYWdlVmVyc2lvbkZyb21Pcmc6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2FjdGlvbnMvaG9zdGVkLXJ1bm5lcnMvaW1hZ2VzL2N1c3RvbS97aW1hZ2VfZGVmaW5pdGlvbl9pZH0vdmVyc2lvbnMve3ZlcnNpb259XCJcbiAgICBdLFxuICAgIGRlbGV0ZUVudmlyb25tZW50U2VjcmV0OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgZGVsZXRlRW52aXJvbm1lbnRWYXJpYWJsZTogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vdmFyaWFibGVzL3tuYW1lfVwiXG4gICAgXSxcbiAgICBkZWxldGVIb3N0ZWRSdW5uZXJGb3JPcmc6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2FjdGlvbnMvaG9zdGVkLXJ1bm5lcnMve2hvc3RlZF9ydW5uZXJfaWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZU9yZ1NlY3JldDogW1wiREVMRVRFIC9vcmdzL3tvcmd9L2FjdGlvbnMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJdLFxuICAgIGRlbGV0ZU9yZ1ZhcmlhYmxlOiBbXCJERUxFVEUgL29yZ3Mve29yZ30vYWN0aW9ucy92YXJpYWJsZXMve25hbWV9XCJdLFxuICAgIGRlbGV0ZVJlcG9TZWNyZXQ6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBkZWxldGVSZXBvVmFyaWFibGU6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3ZhcmlhYmxlcy97bmFtZX1cIlxuICAgIF0sXG4gICAgZGVsZXRlU2VsZkhvc3RlZFJ1bm5lckZyb21Pcmc6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVTZWxmSG9zdGVkUnVubmVyRnJvbVJlcG86IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlV29ya2Zsb3dSdW46IFtcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9XCJdLFxuICAgIGRlbGV0ZVdvcmtmbG93UnVuTG9nczogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9sb2dzXCJcbiAgICBdLFxuICAgIGRpc2FibGVTZWxlY3RlZFJlcG9zaXRvcnlHaXRodWJBY3Rpb25zT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9hY3Rpb25zL3Blcm1pc3Npb25zL3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgZGlzYWJsZVdvcmtmbG93OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy93b3JrZmxvd3Mve3dvcmtmbG93X2lkfS9kaXNhYmxlXCJcbiAgICBdLFxuICAgIGRvd25sb2FkQXJ0aWZhY3Q6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL2FydGlmYWN0cy97YXJ0aWZhY3RfaWR9L3thcmNoaXZlX2Zvcm1hdH1cIlxuICAgIF0sXG4gICAgZG93bmxvYWRKb2JMb2dzRm9yV29ya2Zsb3dSdW46IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL2pvYnMve2pvYl9pZH0vbG9nc1wiXG4gICAgXSxcbiAgICBkb3dubG9hZFdvcmtmbG93UnVuQXR0ZW1wdExvZ3M6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vYXR0ZW1wdHMve2F0dGVtcHRfbnVtYmVyfS9sb2dzXCJcbiAgICBdLFxuICAgIGRvd25sb2FkV29ya2Zsb3dSdW5Mb2dzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L2xvZ3NcIlxuICAgIF0sXG4gICAgZW5hYmxlU2VsZWN0ZWRSZXBvc2l0b3J5R2l0aHViQWN0aW9uc09yZ2FuaXphdGlvbjogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vYWN0aW9ucy9wZXJtaXNzaW9ucy9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIGVuYWJsZVdvcmtmbG93OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy93b3JrZmxvd3Mve3dvcmtmbG93X2lkfS9lbmFibGVcIlxuICAgIF0sXG4gICAgZm9yY2VDYW5jZWxXb3JrZmxvd1J1bjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vZm9yY2UtY2FuY2VsXCJcbiAgICBdLFxuICAgIGdlbmVyYXRlUnVubmVySml0Y29uZmlnRm9yT3JnOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vYWN0aW9ucy9ydW5uZXJzL2dlbmVyYXRlLWppdGNvbmZpZ1wiXG4gICAgXSxcbiAgICBnZW5lcmF0ZVJ1bm5lckppdGNvbmZpZ0ZvclJlcG86IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5uZXJzL2dlbmVyYXRlLWppdGNvbmZpZ1wiXG4gICAgXSxcbiAgICBnZXRBY3Rpb25zQ2FjaGVMaXN0OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvY2FjaGVzXCJdLFxuICAgIGdldEFjdGlvbnNDYWNoZVVzYWdlOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvY2FjaGUvdXNhZ2VcIl0sXG4gICAgZ2V0QWN0aW9uc0NhY2hlVXNhZ2VCeVJlcG9Gb3JPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvY2FjaGUvdXNhZ2UtYnktcmVwb3NpdG9yeVwiXG4gICAgXSxcbiAgICBnZXRBY3Rpb25zQ2FjaGVVc2FnZUZvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvY2FjaGUvdXNhZ2VcIl0sXG4gICAgZ2V0QWxsb3dlZEFjdGlvbnNPcmdhbml6YXRpb246IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcGVybWlzc2lvbnMvc2VsZWN0ZWQtYWN0aW9uc1wiXG4gICAgXSxcbiAgICBnZXRBbGxvd2VkQWN0aW9uc1JlcG9zaXRvcnk6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3Blcm1pc3Npb25zL3NlbGVjdGVkLWFjdGlvbnNcIlxuICAgIF0sXG4gICAgZ2V0QXJ0aWZhY3Q6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9hcnRpZmFjdHMve2FydGlmYWN0X2lkfVwiXSxcbiAgICBnZXRDdXN0b21JbWFnZUZvck9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9ob3N0ZWQtcnVubmVycy9pbWFnZXMvY3VzdG9tL3tpbWFnZV9kZWZpbml0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBnZXRDdXN0b21JbWFnZVZlcnNpb25Gb3JPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvaG9zdGVkLXJ1bm5lcnMvaW1hZ2VzL2N1c3RvbS97aW1hZ2VfZGVmaW5pdGlvbl9pZH0vdmVyc2lvbnMve3ZlcnNpb259XCJcbiAgICBdLFxuICAgIGdldEN1c3RvbU9pZGNTdWJDbGFpbUZvclJlcG86IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL29pZGMvY3VzdG9taXphdGlvbi9zdWJcIlxuICAgIF0sXG4gICAgZ2V0RW52aXJvbm1lbnRQdWJsaWNLZXk6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3NlY3JldHMvcHVibGljLWtleVwiXG4gICAgXSxcbiAgICBnZXRFbnZpcm9ubWVudFNlY3JldDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGdldEVudmlyb25tZW50VmFyaWFibGU6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3ZhcmlhYmxlcy97bmFtZX1cIlxuICAgIF0sXG4gICAgZ2V0R2l0aHViQWN0aW9uc0RlZmF1bHRXb3JrZmxvd1Blcm1pc3Npb25zT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3Blcm1pc3Npb25zL3dvcmtmbG93XCJcbiAgICBdLFxuICAgIGdldEdpdGh1YkFjdGlvbnNEZWZhdWx0V29ya2Zsb3dQZXJtaXNzaW9uc1JlcG9zaXRvcnk6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3Blcm1pc3Npb25zL3dvcmtmbG93XCJcbiAgICBdLFxuICAgIGdldEdpdGh1YkFjdGlvbnNQZXJtaXNzaW9uc09yZ2FuaXphdGlvbjogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9wZXJtaXNzaW9uc1wiXG4gICAgXSxcbiAgICBnZXRHaXRodWJBY3Rpb25zUGVybWlzc2lvbnNSZXBvc2l0b3J5OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9wZXJtaXNzaW9uc1wiXG4gICAgXSxcbiAgICBnZXRIb3N0ZWRSdW5uZXJGb3JPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvaG9zdGVkLXJ1bm5lcnMve2hvc3RlZF9ydW5uZXJfaWR9XCJcbiAgICBdLFxuICAgIGdldEhvc3RlZFJ1bm5lcnNHaXRodWJPd25lZEltYWdlc0Zvck9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9ob3N0ZWQtcnVubmVycy9pbWFnZXMvZ2l0aHViLW93bmVkXCJcbiAgICBdLFxuICAgIGdldEhvc3RlZFJ1bm5lcnNMaW1pdHNGb3JPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvaG9zdGVkLXJ1bm5lcnMvbGltaXRzXCJcbiAgICBdLFxuICAgIGdldEhvc3RlZFJ1bm5lcnNNYWNoaW5lU3BlY3NGb3JPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvaG9zdGVkLXJ1bm5lcnMvbWFjaGluZS1zaXplc1wiXG4gICAgXSxcbiAgICBnZXRIb3N0ZWRSdW5uZXJzUGFydG5lckltYWdlc0Zvck9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9ob3N0ZWQtcnVubmVycy9pbWFnZXMvcGFydG5lclwiXG4gICAgXSxcbiAgICBnZXRIb3N0ZWRSdW5uZXJzUGxhdGZvcm1zRm9yT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL2hvc3RlZC1ydW5uZXJzL3BsYXRmb3Jtc1wiXG4gICAgXSxcbiAgICBnZXRKb2JGb3JXb3JrZmxvd1J1bjogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL2pvYnMve2pvYl9pZH1cIl0sXG4gICAgZ2V0T3JnUHVibGljS2V5OiBbXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9zZWNyZXRzL3B1YmxpYy1rZXlcIl0sXG4gICAgZ2V0T3JnU2VjcmV0OiBbXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIl0sXG4gICAgZ2V0T3JnVmFyaWFibGU6IFtcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3ZhcmlhYmxlcy97bmFtZX1cIl0sXG4gICAgZ2V0UGVuZGluZ0RlcGxveW1lbnRzRm9yUnVuOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L3BlbmRpbmdfZGVwbG95bWVudHNcIlxuICAgIF0sXG4gICAgZ2V0UmVwb1Blcm1pc3Npb25zOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9wZXJtaXNzaW9uc1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcImFjdGlvbnNcIiwgXCJnZXRHaXRodWJBY3Rpb25zUGVybWlzc2lvbnNSZXBvc2l0b3J5XCJdIH1cbiAgICBdLFxuICAgIGdldFJlcG9QdWJsaWNLZXk6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9zZWNyZXRzL3B1YmxpYy1rZXlcIl0sXG4gICAgZ2V0UmVwb1NlY3JldDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXSxcbiAgICBnZXRSZXBvVmFyaWFibGU6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy92YXJpYWJsZXMve25hbWV9XCJdLFxuICAgIGdldFJldmlld3NGb3JSdW46IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vYXBwcm92YWxzXCJcbiAgICBdLFxuICAgIGdldFNlbGZIb3N0ZWRSdW5uZXJGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH1cIl0sXG4gICAgZ2V0U2VsZkhvc3RlZFJ1bm5lckZvclJlcG86IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH1cIlxuICAgIF0sXG4gICAgZ2V0V29ya2Zsb3c6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy93b3JrZmxvd3Mve3dvcmtmbG93X2lkfVwiXSxcbiAgICBnZXRXb3JrZmxvd0FjY2Vzc1RvUmVwb3NpdG9yeTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcGVybWlzc2lvbnMvYWNjZXNzXCJcbiAgICBdLFxuICAgIGdldFdvcmtmbG93UnVuOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfVwiXSxcbiAgICBnZXRXb3JrZmxvd1J1bkF0dGVtcHQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vYXR0ZW1wdHMve2F0dGVtcHRfbnVtYmVyfVwiXG4gICAgXSxcbiAgICBnZXRXb3JrZmxvd1J1blVzYWdlOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L3RpbWluZ1wiXG4gICAgXSxcbiAgICBnZXRXb3JrZmxvd1VzYWdlOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy93b3JrZmxvd3Mve3dvcmtmbG93X2lkfS90aW1pbmdcIlxuICAgIF0sXG4gICAgbGlzdEFydGlmYWN0c0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9hcnRpZmFjdHNcIl0sXG4gICAgbGlzdEN1c3RvbUltYWdlVmVyc2lvbnNGb3JPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvaG9zdGVkLXJ1bm5lcnMvaW1hZ2VzL2N1c3RvbS97aW1hZ2VfZGVmaW5pdGlvbl9pZH0vdmVyc2lvbnNcIlxuICAgIF0sXG4gICAgbGlzdEN1c3RvbUltYWdlc0Zvck9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9ob3N0ZWQtcnVubmVycy9pbWFnZXMvY3VzdG9tXCJcbiAgICBdLFxuICAgIGxpc3RFbnZpcm9ubWVudFNlY3JldHM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3NlY3JldHNcIlxuICAgIF0sXG4gICAgbGlzdEVudmlyb25tZW50VmFyaWFibGVzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS92YXJpYWJsZXNcIlxuICAgIF0sXG4gICAgbGlzdEdpdGh1Ykhvc3RlZFJ1bm5lcnNJbkdyb3VwRm9yT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lci1ncm91cHMve3J1bm5lcl9ncm91cF9pZH0vaG9zdGVkLXJ1bm5lcnNcIlxuICAgIF0sXG4gICAgbGlzdEhvc3RlZFJ1bm5lcnNGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL2hvc3RlZC1ydW5uZXJzXCJdLFxuICAgIGxpc3RKb2JzRm9yV29ya2Zsb3dSdW46IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vam9ic1wiXG4gICAgXSxcbiAgICBsaXN0Sm9ic0ZvcldvcmtmbG93UnVuQXR0ZW1wdDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9hdHRlbXB0cy97YXR0ZW1wdF9udW1iZXJ9L2pvYnNcIlxuICAgIF0sXG4gICAgbGlzdExhYmVsc0ZvclNlbGZIb3N0ZWRSdW5uZXJGb3JPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfS9sYWJlbHNcIlxuICAgIF0sXG4gICAgbGlzdExhYmVsc0ZvclNlbGZIb3N0ZWRSdW5uZXJGb3JSZXBvOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5uZXJzL3tydW5uZXJfaWR9L2xhYmVsc1wiXG4gICAgXSxcbiAgICBsaXN0T3JnU2VjcmV0czogW1wiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvc2VjcmV0c1wiXSxcbiAgICBsaXN0T3JnVmFyaWFibGVzOiBbXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy92YXJpYWJsZXNcIl0sXG4gICAgbGlzdFJlcG9Pcmdhbml6YXRpb25TZWNyZXRzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9vcmdhbml6YXRpb24tc2VjcmV0c1wiXG4gICAgXSxcbiAgICBsaXN0UmVwb09yZ2FuaXphdGlvblZhcmlhYmxlczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvb3JnYW5pemF0aW9uLXZhcmlhYmxlc1wiXG4gICAgXSxcbiAgICBsaXN0UmVwb1NlY3JldHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9zZWNyZXRzXCJdLFxuICAgIGxpc3RSZXBvVmFyaWFibGVzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvdmFyaWFibGVzXCJdLFxuICAgIGxpc3RSZXBvV29ya2Zsb3dzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvd29ya2Zsb3dzXCJdLFxuICAgIGxpc3RSdW5uZXJBcHBsaWNhdGlvbnNGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnMvZG93bmxvYWRzXCJdLFxuICAgIGxpc3RSdW5uZXJBcHBsaWNhdGlvbnNGb3JSZXBvOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5uZXJzL2Rvd25sb2Fkc1wiXG4gICAgXSxcbiAgICBsaXN0U2VsZWN0ZWRSZXBvc0Zvck9yZ1NlY3JldDogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIGxpc3RTZWxlY3RlZFJlcG9zRm9yT3JnVmFyaWFibGU6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvdmFyaWFibGVzL3tuYW1lfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgbGlzdFNlbGVjdGVkUmVwb3NpdG9yaWVzRW5hYmxlZEdpdGh1YkFjdGlvbnNPcmdhbml6YXRpb246IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcGVybWlzc2lvbnMvcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIGxpc3RTZWxmSG9zdGVkUnVubmVyc0Zvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVyc1wiXSxcbiAgICBsaXN0U2VsZkhvc3RlZFJ1bm5lcnNGb3JSZXBvOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVyc1wiXSxcbiAgICBsaXN0V29ya2Zsb3dSdW5BcnRpZmFjdHM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vYXJ0aWZhY3RzXCJcbiAgICBdLFxuICAgIGxpc3RXb3JrZmxvd1J1bnM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3dvcmtmbG93cy97d29ya2Zsb3dfaWR9L3J1bnNcIlxuICAgIF0sXG4gICAgbGlzdFdvcmtmbG93UnVuc0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zXCJdLFxuICAgIHJlUnVuSm9iRm9yV29ya2Zsb3dSdW46IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9qb2JzL3tqb2JfaWR9L3JlcnVuXCJcbiAgICBdLFxuICAgIHJlUnVuV29ya2Zsb3c6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9yZXJ1blwiXSxcbiAgICByZVJ1bldvcmtmbG93RmFpbGVkSm9iczogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vcmVydW4tZmFpbGVkLWpvYnNcIlxuICAgIF0sXG4gICAgcmVtb3ZlQWxsQ3VzdG9tTGFiZWxzRnJvbVNlbGZIb3N0ZWRSdW5uZXJGb3JPcmc6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfS9sYWJlbHNcIlxuICAgIF0sXG4gICAgcmVtb3ZlQWxsQ3VzdG9tTGFiZWxzRnJvbVNlbGZIb3N0ZWRSdW5uZXJGb3JSZXBvOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5uZXJzL3tydW5uZXJfaWR9L2xhYmVsc1wiXG4gICAgXSxcbiAgICByZW1vdmVDdXN0b21MYWJlbEZyb21TZWxmSG9zdGVkUnVubmVyRm9yT3JnOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH0vbGFiZWxzL3tuYW1lfVwiXG4gICAgXSxcbiAgICByZW1vdmVDdXN0b21MYWJlbEZyb21TZWxmSG9zdGVkUnVubmVyRm9yUmVwbzogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfS9sYWJlbHMve25hbWV9XCJcbiAgICBdLFxuICAgIHJlbW92ZVNlbGVjdGVkUmVwb0Zyb21PcmdTZWNyZXQ6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2FjdGlvbnMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgcmVtb3ZlU2VsZWN0ZWRSZXBvRnJvbU9yZ1ZhcmlhYmxlOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9hY3Rpb25zL3ZhcmlhYmxlcy97bmFtZX0vcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfVwiXG4gICAgXSxcbiAgICByZXZpZXdDdXN0b21HYXRlc0ZvclJ1bjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bnMve3J1bl9pZH0vZGVwbG95bWVudF9wcm90ZWN0aW9uX3J1bGVcIlxuICAgIF0sXG4gICAgcmV2aWV3UGVuZGluZ0RlcGxveW1lbnRzRm9yUnVuOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVucy97cnVuX2lkfS9wZW5kaW5nX2RlcGxveW1lbnRzXCJcbiAgICBdLFxuICAgIHNldEFsbG93ZWRBY3Rpb25zT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9hY3Rpb25zL3Blcm1pc3Npb25zL3NlbGVjdGVkLWFjdGlvbnNcIlxuICAgIF0sXG4gICAgc2V0QWxsb3dlZEFjdGlvbnNSZXBvc2l0b3J5OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9wZXJtaXNzaW9ucy9zZWxlY3RlZC1hY3Rpb25zXCJcbiAgICBdLFxuICAgIHNldEN1c3RvbUxhYmVsc0ZvclNlbGZIb3N0ZWRSdW5uZXJGb3JPcmc6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVycy97cnVubmVyX2lkfS9sYWJlbHNcIlxuICAgIF0sXG4gICAgc2V0Q3VzdG9tTGFiZWxzRm9yU2VsZkhvc3RlZFJ1bm5lckZvclJlcG86IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnMve3J1bm5lcl9pZH0vbGFiZWxzXCJcbiAgICBdLFxuICAgIHNldEN1c3RvbU9pZGNTdWJDbGFpbUZvclJlcG86IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL29pZGMvY3VzdG9taXphdGlvbi9zdWJcIlxuICAgIF0sXG4gICAgc2V0R2l0aHViQWN0aW9uc0RlZmF1bHRXb3JrZmxvd1Blcm1pc3Npb25zT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9hY3Rpb25zL3Blcm1pc3Npb25zL3dvcmtmbG93XCJcbiAgICBdLFxuICAgIHNldEdpdGh1YkFjdGlvbnNEZWZhdWx0V29ya2Zsb3dQZXJtaXNzaW9uc1JlcG9zaXRvcnk6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3Blcm1pc3Npb25zL3dvcmtmbG93XCJcbiAgICBdLFxuICAgIHNldEdpdGh1YkFjdGlvbnNQZXJtaXNzaW9uc09yZ2FuaXphdGlvbjogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vYWN0aW9ucy9wZXJtaXNzaW9uc1wiXG4gICAgXSxcbiAgICBzZXRHaXRodWJBY3Rpb25zUGVybWlzc2lvbnNSZXBvc2l0b3J5OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9wZXJtaXNzaW9uc1wiXG4gICAgXSxcbiAgICBzZXRTZWxlY3RlZFJlcG9zRm9yT3JnU2VjcmV0OiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9hY3Rpb25zL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgc2V0U2VsZWN0ZWRSZXBvc0Zvck9yZ1ZhcmlhYmxlOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9hY3Rpb25zL3ZhcmlhYmxlcy97bmFtZX0vcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIHNldFNlbGVjdGVkUmVwb3NpdG9yaWVzRW5hYmxlZEdpdGh1YkFjdGlvbnNPcmdhbml6YXRpb246IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcGVybWlzc2lvbnMvcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIHNldFdvcmtmbG93QWNjZXNzVG9SZXBvc2l0b3J5OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9wZXJtaXNzaW9ucy9hY2Nlc3NcIlxuICAgIF0sXG4gICAgdXBkYXRlRW52aXJvbm1lbnRWYXJpYWJsZTogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS92YXJpYWJsZXMve25hbWV9XCJcbiAgICBdLFxuICAgIHVwZGF0ZUhvc3RlZFJ1bm5lckZvck9yZzogW1xuICAgICAgXCJQQVRDSCAvb3Jncy97b3JnfS9hY3Rpb25zL2hvc3RlZC1ydW5uZXJzL3tob3N0ZWRfcnVubmVyX2lkfVwiXG4gICAgXSxcbiAgICB1cGRhdGVPcmdWYXJpYWJsZTogW1wiUEFUQ0ggL29yZ3Mve29yZ30vYWN0aW9ucy92YXJpYWJsZXMve25hbWV9XCJdLFxuICAgIHVwZGF0ZVJlcG9WYXJpYWJsZTogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy92YXJpYWJsZXMve25hbWV9XCJcbiAgICBdXG4gIH0sXG4gIGFjdGl2aXR5OiB7XG4gICAgY2hlY2tSZXBvSXNTdGFycmVkQnlBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL3N0YXJyZWQve293bmVyfS97cmVwb31cIl0sXG4gICAgZGVsZXRlUmVwb1N1YnNjcmlwdGlvbjogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zdWJzY3JpcHRpb25cIl0sXG4gICAgZGVsZXRlVGhyZWFkU3Vic2NyaXB0aW9uOiBbXG4gICAgICBcIkRFTEVURSAvbm90aWZpY2F0aW9ucy90aHJlYWRzL3t0aHJlYWRfaWR9L3N1YnNjcmlwdGlvblwiXG4gICAgXSxcbiAgICBnZXRGZWVkczogW1wiR0VUIC9mZWVkc1wiXSxcbiAgICBnZXRSZXBvU3Vic2NyaXB0aW9uOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N1YnNjcmlwdGlvblwiXSxcbiAgICBnZXRUaHJlYWQ6IFtcIkdFVCAvbm90aWZpY2F0aW9ucy90aHJlYWRzL3t0aHJlYWRfaWR9XCJdLFxuICAgIGdldFRocmVhZFN1YnNjcmlwdGlvbkZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvbm90aWZpY2F0aW9ucy90aHJlYWRzL3t0aHJlYWRfaWR9L3N1YnNjcmlwdGlvblwiXG4gICAgXSxcbiAgICBsaXN0RXZlbnRzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9ldmVudHNcIl0sXG4gICAgbGlzdE5vdGlmaWNhdGlvbnNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC9ub3RpZmljYXRpb25zXCJdLFxuICAgIGxpc3RPcmdFdmVudHNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZXZlbnRzL29yZ3Mve29yZ31cIlxuICAgIF0sXG4gICAgbGlzdFB1YmxpY0V2ZW50czogW1wiR0VUIC9ldmVudHNcIl0sXG4gICAgbGlzdFB1YmxpY0V2ZW50c0ZvclJlcG9OZXR3b3JrOiBbXCJHRVQgL25ldHdvcmtzL3tvd25lcn0ve3JlcG99L2V2ZW50c1wiXSxcbiAgICBsaXN0UHVibGljRXZlbnRzRm9yVXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L2V2ZW50cy9wdWJsaWNcIl0sXG4gICAgbGlzdFB1YmxpY09yZ0V2ZW50czogW1wiR0VUIC9vcmdzL3tvcmd9L2V2ZW50c1wiXSxcbiAgICBsaXN0UmVjZWl2ZWRFdmVudHNGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcmVjZWl2ZWRfZXZlbnRzXCJdLFxuICAgIGxpc3RSZWNlaXZlZFB1YmxpY0V2ZW50c0ZvclVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3JlY2VpdmVkX2V2ZW50cy9wdWJsaWNcIlxuICAgIF0sXG4gICAgbGlzdFJlcG9FdmVudHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZXZlbnRzXCJdLFxuICAgIGxpc3RSZXBvTm90aWZpY2F0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vbm90aWZpY2F0aW9uc1wiXG4gICAgXSxcbiAgICBsaXN0UmVwb3NTdGFycmVkQnlBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL3N0YXJyZWRcIl0sXG4gICAgbGlzdFJlcG9zU3RhcnJlZEJ5VXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L3N0YXJyZWRcIl0sXG4gICAgbGlzdFJlcG9zV2F0Y2hlZEJ5VXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L3N1YnNjcmlwdGlvbnNcIl0sXG4gICAgbGlzdFN0YXJnYXplcnNGb3JSZXBvOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N0YXJnYXplcnNcIl0sXG4gICAgbGlzdFdhdGNoZWRSZXBvc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvc3Vic2NyaXB0aW9uc1wiXSxcbiAgICBsaXN0V2F0Y2hlcnNGb3JSZXBvOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N1YnNjcmliZXJzXCJdLFxuICAgIG1hcmtOb3RpZmljYXRpb25zQXNSZWFkOiBbXCJQVVQgL25vdGlmaWNhdGlvbnNcIl0sXG4gICAgbWFya1JlcG9Ob3RpZmljYXRpb25zQXNSZWFkOiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L25vdGlmaWNhdGlvbnNcIl0sXG4gICAgbWFya1RocmVhZEFzRG9uZTogW1wiREVMRVRFIC9ub3RpZmljYXRpb25zL3RocmVhZHMve3RocmVhZF9pZH1cIl0sXG4gICAgbWFya1RocmVhZEFzUmVhZDogW1wiUEFUQ0ggL25vdGlmaWNhdGlvbnMvdGhyZWFkcy97dGhyZWFkX2lkfVwiXSxcbiAgICBzZXRSZXBvU3Vic2NyaXB0aW9uOiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N1YnNjcmlwdGlvblwiXSxcbiAgICBzZXRUaHJlYWRTdWJzY3JpcHRpb246IFtcbiAgICAgIFwiUFVUIC9ub3RpZmljYXRpb25zL3RocmVhZHMve3RocmVhZF9pZH0vc3Vic2NyaXB0aW9uXCJcbiAgICBdLFxuICAgIHN0YXJSZXBvRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBVVCAvdXNlci9zdGFycmVkL3tvd25lcn0ve3JlcG99XCJdLFxuICAgIHVuc3RhclJlcG9Gb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiREVMRVRFIC91c2VyL3N0YXJyZWQve293bmVyfS97cmVwb31cIl1cbiAgfSxcbiAgYXBwczoge1xuICAgIGFkZFJlcG9Ub0luc3RhbGxhdGlvbjogW1xuICAgICAgXCJQVVQgL3VzZXIvaW5zdGFsbGF0aW9ucy97aW5zdGFsbGF0aW9uX2lkfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wiYXBwc1wiLCBcImFkZFJlcG9Ub0luc3RhbGxhdGlvbkZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGFkZFJlcG9Ub0luc3RhbGxhdGlvbkZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBVVCAvdXNlci9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgY2hlY2tUb2tlbjogW1wiUE9TVCAvYXBwbGljYXRpb25zL3tjbGllbnRfaWR9L3Rva2VuXCJdLFxuICAgIGNyZWF0ZUZyb21NYW5pZmVzdDogW1wiUE9TVCAvYXBwLW1hbmlmZXN0cy97Y29kZX0vY29udmVyc2lvbnNcIl0sXG4gICAgY3JlYXRlSW5zdGFsbGF0aW9uQWNjZXNzVG9rZW46IFtcbiAgICAgIFwiUE9TVCAvYXBwL2luc3RhbGxhdGlvbnMve2luc3RhbGxhdGlvbl9pZH0vYWNjZXNzX3Rva2Vuc1wiXG4gICAgXSxcbiAgICBkZWxldGVBdXRob3JpemF0aW9uOiBbXCJERUxFVEUgL2FwcGxpY2F0aW9ucy97Y2xpZW50X2lkfS9ncmFudFwiXSxcbiAgICBkZWxldGVJbnN0YWxsYXRpb246IFtcIkRFTEVURSAvYXBwL2luc3RhbGxhdGlvbnMve2luc3RhbGxhdGlvbl9pZH1cIl0sXG4gICAgZGVsZXRlVG9rZW46IFtcIkRFTEVURSAvYXBwbGljYXRpb25zL3tjbGllbnRfaWR9L3Rva2VuXCJdLFxuICAgIGdldEF1dGhlbnRpY2F0ZWQ6IFtcIkdFVCAvYXBwXCJdLFxuICAgIGdldEJ5U2x1ZzogW1wiR0VUIC9hcHBzL3thcHBfc2x1Z31cIl0sXG4gICAgZ2V0SW5zdGFsbGF0aW9uOiBbXCJHRVQgL2FwcC9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9XCJdLFxuICAgIGdldE9yZ0luc3RhbGxhdGlvbjogW1wiR0VUIC9vcmdzL3tvcmd9L2luc3RhbGxhdGlvblwiXSxcbiAgICBnZXRSZXBvSW5zdGFsbGF0aW9uOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2luc3RhbGxhdGlvblwiXSxcbiAgICBnZXRTdWJzY3JpcHRpb25QbGFuRm9yQWNjb3VudDogW1xuICAgICAgXCJHRVQgL21hcmtldHBsYWNlX2xpc3RpbmcvYWNjb3VudHMve2FjY291bnRfaWR9XCJcbiAgICBdLFxuICAgIGdldFN1YnNjcmlwdGlvblBsYW5Gb3JBY2NvdW50U3R1YmJlZDogW1xuICAgICAgXCJHRVQgL21hcmtldHBsYWNlX2xpc3Rpbmcvc3R1YmJlZC9hY2NvdW50cy97YWNjb3VudF9pZH1cIlxuICAgIF0sXG4gICAgZ2V0VXNlckluc3RhbGxhdGlvbjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L2luc3RhbGxhdGlvblwiXSxcbiAgICBnZXRXZWJob29rQ29uZmlnRm9yQXBwOiBbXCJHRVQgL2FwcC9ob29rL2NvbmZpZ1wiXSxcbiAgICBnZXRXZWJob29rRGVsaXZlcnk6IFtcIkdFVCAvYXBwL2hvb2svZGVsaXZlcmllcy97ZGVsaXZlcnlfaWR9XCJdLFxuICAgIGxpc3RBY2NvdW50c0ZvclBsYW46IFtcIkdFVCAvbWFya2V0cGxhY2VfbGlzdGluZy9wbGFucy97cGxhbl9pZH0vYWNjb3VudHNcIl0sXG4gICAgbGlzdEFjY291bnRzRm9yUGxhblN0dWJiZWQ6IFtcbiAgICAgIFwiR0VUIC9tYXJrZXRwbGFjZV9saXN0aW5nL3N0dWJiZWQvcGxhbnMve3BsYW5faWR9L2FjY291bnRzXCJcbiAgICBdLFxuICAgIGxpc3RJbnN0YWxsYXRpb25SZXBvc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBsaXN0SW5zdGFsbGF0aW9uUmVxdWVzdHNGb3JBdXRoZW50aWNhdGVkQXBwOiBbXG4gICAgICBcIkdFVCAvYXBwL2luc3RhbGxhdGlvbi1yZXF1ZXN0c1wiXG4gICAgXSxcbiAgICBsaXN0SW5zdGFsbGF0aW9uczogW1wiR0VUIC9hcHAvaW5zdGFsbGF0aW9uc1wiXSxcbiAgICBsaXN0SW5zdGFsbGF0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvaW5zdGFsbGF0aW9uc1wiXSxcbiAgICBsaXN0UGxhbnM6IFtcIkdFVCAvbWFya2V0cGxhY2VfbGlzdGluZy9wbGFuc1wiXSxcbiAgICBsaXN0UGxhbnNTdHViYmVkOiBbXCJHRVQgL21hcmtldHBsYWNlX2xpc3Rpbmcvc3R1YmJlZC9wbGFuc1wiXSxcbiAgICBsaXN0UmVwb3NBY2Nlc3NpYmxlVG9JbnN0YWxsYXRpb246IFtcIkdFVCAvaW5zdGFsbGF0aW9uL3JlcG9zaXRvcmllc1wiXSxcbiAgICBsaXN0U3Vic2NyaXB0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvbWFya2V0cGxhY2VfcHVyY2hhc2VzXCJdLFxuICAgIGxpc3RTdWJzY3JpcHRpb25zRm9yQXV0aGVudGljYXRlZFVzZXJTdHViYmVkOiBbXG4gICAgICBcIkdFVCAvdXNlci9tYXJrZXRwbGFjZV9wdXJjaGFzZXMvc3R1YmJlZFwiXG4gICAgXSxcbiAgICBsaXN0V2ViaG9va0RlbGl2ZXJpZXM6IFtcIkdFVCAvYXBwL2hvb2svZGVsaXZlcmllc1wiXSxcbiAgICByZWRlbGl2ZXJXZWJob29rRGVsaXZlcnk6IFtcbiAgICAgIFwiUE9TVCAvYXBwL2hvb2svZGVsaXZlcmllcy97ZGVsaXZlcnlfaWR9L2F0dGVtcHRzXCJcbiAgICBdLFxuICAgIHJlbW92ZVJlcG9Gcm9tSW5zdGFsbGF0aW9uOiBbXG4gICAgICBcIkRFTEVURSAvdXNlci9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJhcHBzXCIsIFwicmVtb3ZlUmVwb0Zyb21JbnN0YWxsYXRpb25Gb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICByZW1vdmVSZXBvRnJvbUluc3RhbGxhdGlvbkZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkRFTEVURSAvdXNlci9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgcmVzZXRUb2tlbjogW1wiUEFUQ0ggL2FwcGxpY2F0aW9ucy97Y2xpZW50X2lkfS90b2tlblwiXSxcbiAgICByZXZva2VJbnN0YWxsYXRpb25BY2Nlc3NUb2tlbjogW1wiREVMRVRFIC9pbnN0YWxsYXRpb24vdG9rZW5cIl0sXG4gICAgc2NvcGVUb2tlbjogW1wiUE9TVCAvYXBwbGljYXRpb25zL3tjbGllbnRfaWR9L3Rva2VuL3Njb3BlZFwiXSxcbiAgICBzdXNwZW5kSW5zdGFsbGF0aW9uOiBbXCJQVVQgL2FwcC9pbnN0YWxsYXRpb25zL3tpbnN0YWxsYXRpb25faWR9L3N1c3BlbmRlZFwiXSxcbiAgICB1bnN1c3BlbmRJbnN0YWxsYXRpb246IFtcbiAgICAgIFwiREVMRVRFIC9hcHAvaW5zdGFsbGF0aW9ucy97aW5zdGFsbGF0aW9uX2lkfS9zdXNwZW5kZWRcIlxuICAgIF0sXG4gICAgdXBkYXRlV2ViaG9va0NvbmZpZ0ZvckFwcDogW1wiUEFUQ0ggL2FwcC9ob29rL2NvbmZpZ1wiXVxuICB9LFxuICBiaWxsaW5nOiB7XG4gICAgZ2V0R2l0aHViQWN0aW9uc0JpbGxpbmdPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9zZXR0aW5ncy9iaWxsaW5nL2FjdGlvbnNcIl0sXG4gICAgZ2V0R2l0aHViQWN0aW9uc0JpbGxpbmdVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9zZXR0aW5ncy9iaWxsaW5nL2FjdGlvbnNcIlxuICAgIF0sXG4gICAgZ2V0R2l0aHViQmlsbGluZ1ByZW1pdW1SZXF1ZXN0VXNhZ2VSZXBvcnRPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdhbml6YXRpb25zL3tvcmd9L3NldHRpbmdzL2JpbGxpbmcvcHJlbWl1bV9yZXF1ZXN0L3VzYWdlXCJcbiAgICBdLFxuICAgIGdldEdpdGh1YkJpbGxpbmdQcmVtaXVtUmVxdWVzdFVzYWdlUmVwb3J0VXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vc2V0dGluZ3MvYmlsbGluZy9wcmVtaXVtX3JlcXVlc3QvdXNhZ2VcIlxuICAgIF0sXG4gICAgZ2V0R2l0aHViQmlsbGluZ1VzYWdlUmVwb3J0T3JnOiBbXG4gICAgICBcIkdFVCAvb3JnYW5pemF0aW9ucy97b3JnfS9zZXR0aW5ncy9iaWxsaW5nL3VzYWdlXCJcbiAgICBdLFxuICAgIGdldEdpdGh1YkJpbGxpbmdVc2FnZVJlcG9ydFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3NldHRpbmdzL2JpbGxpbmcvdXNhZ2VcIlxuICAgIF0sXG4gICAgZ2V0R2l0aHViUGFja2FnZXNCaWxsaW5nT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vc2V0dGluZ3MvYmlsbGluZy9wYWNrYWdlc1wiXSxcbiAgICBnZXRHaXRodWJQYWNrYWdlc0JpbGxpbmdVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9zZXR0aW5ncy9iaWxsaW5nL3BhY2thZ2VzXCJcbiAgICBdLFxuICAgIGdldFNoYXJlZFN0b3JhZ2VCaWxsaW5nT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9zZXR0aW5ncy9iaWxsaW5nL3NoYXJlZC1zdG9yYWdlXCJcbiAgICBdLFxuICAgIGdldFNoYXJlZFN0b3JhZ2VCaWxsaW5nVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vc2V0dGluZ3MvYmlsbGluZy9zaGFyZWQtc3RvcmFnZVwiXG4gICAgXVxuICB9LFxuICBjYW1wYWlnbnM6IHtcbiAgICBjcmVhdGVDYW1wYWlnbjogW1wiUE9TVCAvb3Jncy97b3JnfS9jYW1wYWlnbnNcIl0sXG4gICAgZGVsZXRlQ2FtcGFpZ246IFtcIkRFTEVURSAvb3Jncy97b3JnfS9jYW1wYWlnbnMve2NhbXBhaWduX251bWJlcn1cIl0sXG4gICAgZ2V0Q2FtcGFpZ25TdW1tYXJ5OiBbXCJHRVQgL29yZ3Mve29yZ30vY2FtcGFpZ25zL3tjYW1wYWlnbl9udW1iZXJ9XCJdLFxuICAgIGxpc3RPcmdDYW1wYWlnbnM6IFtcIkdFVCAvb3Jncy97b3JnfS9jYW1wYWlnbnNcIl0sXG4gICAgdXBkYXRlQ2FtcGFpZ246IFtcIlBBVENIIC9vcmdzL3tvcmd9L2NhbXBhaWducy97Y2FtcGFpZ25fbnVtYmVyfVwiXVxuICB9LFxuICBjaGVja3M6IHtcbiAgICBjcmVhdGU6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NoZWNrLXJ1bnNcIl0sXG4gICAgY3JlYXRlU3VpdGU6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NoZWNrLXN1aXRlc1wiXSxcbiAgICBnZXQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stcnVucy97Y2hlY2tfcnVuX2lkfVwiXSxcbiAgICBnZXRTdWl0ZTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jaGVjay1zdWl0ZXMve2NoZWNrX3N1aXRlX2lkfVwiXSxcbiAgICBsaXN0QW5ub3RhdGlvbnM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jaGVjay1ydW5zL3tjaGVja19ydW5faWR9L2Fubm90YXRpb25zXCJcbiAgICBdLFxuICAgIGxpc3RGb3JSZWY6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97cmVmfS9jaGVjay1ydW5zXCJdLFxuICAgIGxpc3RGb3JTdWl0ZTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NoZWNrLXN1aXRlcy97Y2hlY2tfc3VpdGVfaWR9L2NoZWNrLXJ1bnNcIlxuICAgIF0sXG4gICAgbGlzdFN1aXRlc0ZvclJlZjogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tyZWZ9L2NoZWNrLXN1aXRlc1wiXSxcbiAgICByZXJlcXVlc3RSdW46IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stcnVucy97Y2hlY2tfcnVuX2lkfS9yZXJlcXVlc3RcIlxuICAgIF0sXG4gICAgcmVyZXF1ZXN0U3VpdGU6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stc3VpdGVzL3tjaGVja19zdWl0ZV9pZH0vcmVyZXF1ZXN0XCJcbiAgICBdLFxuICAgIHNldFN1aXRlc1ByZWZlcmVuY2VzOiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jaGVjay1zdWl0ZXMvcHJlZmVyZW5jZXNcIlxuICAgIF0sXG4gICAgdXBkYXRlOiBbXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stcnVucy97Y2hlY2tfcnVuX2lkfVwiXVxuICB9LFxuICBjb2RlU2Nhbm5pbmc6IHtcbiAgICBjb21taXRBdXRvZml4OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9L2F1dG9maXgvY29tbWl0c1wiXG4gICAgXSxcbiAgICBjcmVhdGVBdXRvZml4OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9L2F1dG9maXhcIlxuICAgIF0sXG4gICAgY3JlYXRlVmFyaWFudEFuYWx5c2lzOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvY29kZXFsL3ZhcmlhbnQtYW5hbHlzZXNcIlxuICAgIF0sXG4gICAgZGVsZXRlQW5hbHlzaXM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL2FuYWx5c2VzL3thbmFseXNpc19pZH17P2NvbmZpcm1fZGVsZXRlfVwiXG4gICAgXSxcbiAgICBkZWxldGVDb2RlcWxEYXRhYmFzZTogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvY29kZXFsL2RhdGFiYXNlcy97bGFuZ3VhZ2V9XCJcbiAgICBdLFxuICAgIGdldEFsZXJ0OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbGVydHMve2FsZXJ0X251bWJlcn1cIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkUGFyYW1ldGVyczogeyBhbGVydF9pZDogXCJhbGVydF9udW1iZXJcIiB9IH1cbiAgICBdLFxuICAgIGdldEFuYWx5c2lzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbmFseXNlcy97YW5hbHlzaXNfaWR9XCJcbiAgICBdLFxuICAgIGdldEF1dG9maXg6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL2FsZXJ0cy97YWxlcnRfbnVtYmVyfS9hdXRvZml4XCJcbiAgICBdLFxuICAgIGdldENvZGVxbERhdGFiYXNlOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9jb2RlcWwvZGF0YWJhc2VzL3tsYW5ndWFnZX1cIlxuICAgIF0sXG4gICAgZ2V0RGVmYXVsdFNldHVwOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvZGVmYXVsdC1zZXR1cFwiXSxcbiAgICBnZXRTYXJpZjogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL3Nhcmlmcy97c2FyaWZfaWR9XCJdLFxuICAgIGdldFZhcmlhbnRBbmFseXNpczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvY29kZXFsL3ZhcmlhbnQtYW5hbHlzZXMve2NvZGVxbF92YXJpYW50X2FuYWx5c2lzX2lkfVwiXG4gICAgXSxcbiAgICBnZXRWYXJpYW50QW5hbHlzaXNSZXBvVGFzazogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvY29kZXFsL3ZhcmlhbnQtYW5hbHlzZXMve2NvZGVxbF92YXJpYW50X2FuYWx5c2lzX2lkfS9yZXBvcy97cmVwb19vd25lcn0ve3JlcG9fbmFtZX1cIlxuICAgIF0sXG4gICAgbGlzdEFsZXJ0SW5zdGFuY2VzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbGVydHMve2FsZXJ0X251bWJlcn0vaW5zdGFuY2VzXCJcbiAgICBdLFxuICAgIGxpc3RBbGVydHNGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9jb2RlLXNjYW5uaW5nL2FsZXJ0c1wiXSxcbiAgICBsaXN0QWxlcnRzRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL2FsZXJ0c1wiXSxcbiAgICBsaXN0QWxlcnRzSW5zdGFuY2VzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbGVydHMve2FsZXJ0X251bWJlcn0vaW5zdGFuY2VzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wiY29kZVNjYW5uaW5nXCIsIFwibGlzdEFsZXJ0SW5zdGFuY2VzXCJdIH1cbiAgICBdLFxuICAgIGxpc3RDb2RlcWxEYXRhYmFzZXM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL2NvZGVxbC9kYXRhYmFzZXNcIlxuICAgIF0sXG4gICAgbGlzdFJlY2VudEFuYWx5c2VzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvYW5hbHlzZXNcIl0sXG4gICAgdXBkYXRlQWxlcnQ6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9XCJcbiAgICBdLFxuICAgIHVwZGF0ZURlZmF1bHRTZXR1cDogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9kZWZhdWx0LXNldHVwXCJcbiAgICBdLFxuICAgIHVwbG9hZFNhcmlmOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2RlLXNjYW5uaW5nL3Nhcmlmc1wiXVxuICB9LFxuICBjb2RlU2VjdXJpdHk6IHtcbiAgICBhdHRhY2hDb25maWd1cmF0aW9uOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vY29kZS1zZWN1cml0eS9jb25maWd1cmF0aW9ucy97Y29uZmlndXJhdGlvbl9pZH0vYXR0YWNoXCJcbiAgICBdLFxuICAgIGF0dGFjaEVudGVycHJpc2VDb25maWd1cmF0aW9uOiBbXG4gICAgICBcIlBPU1QgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS9jb2RlLXNlY3VyaXR5L2NvbmZpZ3VyYXRpb25zL3tjb25maWd1cmF0aW9uX2lkfS9hdHRhY2hcIlxuICAgIF0sXG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbjogW1wiUE9TVCAvb3Jncy97b3JnfS9jb2RlLXNlY3VyaXR5L2NvbmZpZ3VyYXRpb25zXCJdLFxuICAgIGNyZWF0ZUNvbmZpZ3VyYXRpb25Gb3JFbnRlcnByaXNlOiBbXG4gICAgICBcIlBPU1QgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS9jb2RlLXNlY3VyaXR5L2NvbmZpZ3VyYXRpb25zXCJcbiAgICBdLFxuICAgIGRlbGV0ZUNvbmZpZ3VyYXRpb246IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2NvZGUtc2VjdXJpdHkvY29uZmlndXJhdGlvbnMve2NvbmZpZ3VyYXRpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUNvbmZpZ3VyYXRpb25Gb3JFbnRlcnByaXNlOiBbXG4gICAgICBcIkRFTEVURSAvZW50ZXJwcmlzZXMve2VudGVycHJpc2V9L2NvZGUtc2VjdXJpdHkvY29uZmlndXJhdGlvbnMve2NvbmZpZ3VyYXRpb25faWR9XCJcbiAgICBdLFxuICAgIGRldGFjaENvbmZpZ3VyYXRpb246IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2NvZGUtc2VjdXJpdHkvY29uZmlndXJhdGlvbnMvZGV0YWNoXCJcbiAgICBdLFxuICAgIGdldENvbmZpZ3VyYXRpb246IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2NvZGUtc2VjdXJpdHkvY29uZmlndXJhdGlvbnMve2NvbmZpZ3VyYXRpb25faWR9XCJcbiAgICBdLFxuICAgIGdldENvbmZpZ3VyYXRpb25Gb3JSZXBvc2l0b3J5OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zZWN1cml0eS1jb25maWd1cmF0aW9uXCJcbiAgICBdLFxuICAgIGdldENvbmZpZ3VyYXRpb25zRm9yRW50ZXJwcmlzZTogW1xuICAgICAgXCJHRVQgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS9jb2RlLXNlY3VyaXR5L2NvbmZpZ3VyYXRpb25zXCJcbiAgICBdLFxuICAgIGdldENvbmZpZ3VyYXRpb25zRm9yT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vY29kZS1zZWN1cml0eS9jb25maWd1cmF0aW9uc1wiXSxcbiAgICBnZXREZWZhdWx0Q29uZmlndXJhdGlvbnM6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2NvZGUtc2VjdXJpdHkvY29uZmlndXJhdGlvbnMvZGVmYXVsdHNcIlxuICAgIF0sXG4gICAgZ2V0RGVmYXVsdENvbmZpZ3VyYXRpb25zRm9yRW50ZXJwcmlzZTogW1xuICAgICAgXCJHRVQgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS9jb2RlLXNlY3VyaXR5L2NvbmZpZ3VyYXRpb25zL2RlZmF1bHRzXCJcbiAgICBdLFxuICAgIGdldFJlcG9zaXRvcmllc0ZvckNvbmZpZ3VyYXRpb246IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2NvZGUtc2VjdXJpdHkvY29uZmlndXJhdGlvbnMve2NvbmZpZ3VyYXRpb25faWR9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBnZXRSZXBvc2l0b3JpZXNGb3JFbnRlcnByaXNlQ29uZmlndXJhdGlvbjogW1xuICAgICAgXCJHRVQgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS9jb2RlLXNlY3VyaXR5L2NvbmZpZ3VyYXRpb25zL3tjb25maWd1cmF0aW9uX2lkfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgZ2V0U2luZ2xlQ29uZmlndXJhdGlvbkZvckVudGVycHJpc2U6IFtcbiAgICAgIFwiR0VUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vY29kZS1zZWN1cml0eS9jb25maWd1cmF0aW9ucy97Y29uZmlndXJhdGlvbl9pZH1cIlxuICAgIF0sXG4gICAgc2V0Q29uZmlndXJhdGlvbkFzRGVmYXVsdDogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vY29kZS1zZWN1cml0eS9jb25maWd1cmF0aW9ucy97Y29uZmlndXJhdGlvbl9pZH0vZGVmYXVsdHNcIlxuICAgIF0sXG4gICAgc2V0Q29uZmlndXJhdGlvbkFzRGVmYXVsdEZvckVudGVycHJpc2U6IFtcbiAgICAgIFwiUFVUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vY29kZS1zZWN1cml0eS9jb25maWd1cmF0aW9ucy97Y29uZmlndXJhdGlvbl9pZH0vZGVmYXVsdHNcIlxuICAgIF0sXG4gICAgdXBkYXRlQ29uZmlndXJhdGlvbjogW1xuICAgICAgXCJQQVRDSCAvb3Jncy97b3JnfS9jb2RlLXNlY3VyaXR5L2NvbmZpZ3VyYXRpb25zL3tjb25maWd1cmF0aW9uX2lkfVwiXG4gICAgXSxcbiAgICB1cGRhdGVFbnRlcnByaXNlQ29uZmlndXJhdGlvbjogW1xuICAgICAgXCJQQVRDSCAvZW50ZXJwcmlzZXMve2VudGVycHJpc2V9L2NvZGUtc2VjdXJpdHkvY29uZmlndXJhdGlvbnMve2NvbmZpZ3VyYXRpb25faWR9XCJcbiAgICBdXG4gIH0sXG4gIGNvZGVzT2ZDb25kdWN0OiB7XG4gICAgZ2V0QWxsQ29kZXNPZkNvbmR1Y3Q6IFtcIkdFVCAvY29kZXNfb2ZfY29uZHVjdFwiXSxcbiAgICBnZXRDb25kdWN0Q29kZTogW1wiR0VUIC9jb2Rlc19vZl9jb25kdWN0L3trZXl9XCJdXG4gIH0sXG4gIGNvZGVzcGFjZXM6IHtcbiAgICBhZGRSZXBvc2l0b3J5Rm9yU2VjcmV0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiUFVUIC91c2VyL2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgYWRkU2VsZWN0ZWRSZXBvVG9PcmdTZWNyZXQ6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgY2hlY2tQZXJtaXNzaW9uc0ZvckRldmNvbnRhaW5lcjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVzcGFjZXMvcGVybWlzc2lvbnNfY2hlY2tcIlxuICAgIF0sXG4gICAgY29kZXNwYWNlTWFjaGluZXNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXIvY29kZXNwYWNlcy97Y29kZXNwYWNlX25hbWV9L21hY2hpbmVzXCJcbiAgICBdLFxuICAgIGNyZWF0ZUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJQT1NUIC91c2VyL2NvZGVzcGFjZXNcIl0sXG4gICAgY3JlYXRlT3JVcGRhdGVPcmdTZWNyZXQ6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGNyZWF0ZU9yVXBkYXRlUmVwb1NlY3JldDogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGNyZWF0ZU9yVXBkYXRlU2VjcmV0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiUFVUIC91c2VyL2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGNyZWF0ZVdpdGhQckZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vY29kZXNwYWNlc1wiXG4gICAgXSxcbiAgICBjcmVhdGVXaXRoUmVwb0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVzcGFjZXNcIlxuICAgIF0sXG4gICAgZGVsZXRlRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkRFTEVURSAvdXNlci9jb2Rlc3BhY2VzL3tjb2Rlc3BhY2VfbmFtZX1cIl0sXG4gICAgZGVsZXRlRnJvbU9yZ2FuaXphdGlvbjogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vbWVtYmVycy97dXNlcm5hbWV9L2NvZGVzcGFjZXMve2NvZGVzcGFjZV9uYW1lfVwiXG4gICAgXSxcbiAgICBkZWxldGVPcmdTZWNyZXQ6IFtcIkRFTEVURSAvb3Jncy97b3JnfS9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXSxcbiAgICBkZWxldGVSZXBvU2VjcmV0OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgZGVsZXRlU2VjcmV0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGV4cG9ydEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBPU1QgL3VzZXIvY29kZXNwYWNlcy97Y29kZXNwYWNlX25hbWV9L2V4cG9ydHNcIlxuICAgIF0sXG4gICAgZ2V0Q29kZXNwYWNlc0ZvclVzZXJJbk9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vbWVtYmVycy97dXNlcm5hbWV9L2NvZGVzcGFjZXNcIlxuICAgIF0sXG4gICAgZ2V0RXhwb3J0RGV0YWlsc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9jb2Rlc3BhY2VzL3tjb2Rlc3BhY2VfbmFtZX0vZXhwb3J0cy97ZXhwb3J0X2lkfVwiXG4gICAgXSxcbiAgICBnZXRGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL2NvZGVzcGFjZXMve2NvZGVzcGFjZV9uYW1lfVwiXSxcbiAgICBnZXRPcmdQdWJsaWNLZXk6IFtcIkdFVCAvb3Jncy97b3JnfS9jb2Rlc3BhY2VzL3NlY3JldHMvcHVibGljLWtleVwiXSxcbiAgICBnZXRPcmdTZWNyZXQ6IFtcIkdFVCAvb3Jncy97b3JnfS9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXSxcbiAgICBnZXRQdWJsaWNLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXIvY29kZXNwYWNlcy9zZWNyZXRzL3B1YmxpYy1rZXlcIlxuICAgIF0sXG4gICAgZ2V0UmVwb1B1YmxpY0tleTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVzcGFjZXMvc2VjcmV0cy9wdWJsaWMta2V5XCJcbiAgICBdLFxuICAgIGdldFJlcG9TZWNyZXQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBnZXRTZWNyZXRGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXIvY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgbGlzdERldmNvbnRhaW5lcnNJblJlcG9zaXRvcnlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVzcGFjZXMvZGV2Y29udGFpbmVyc1wiXG4gICAgXSxcbiAgICBsaXN0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9jb2Rlc3BhY2VzXCJdLFxuICAgIGxpc3RJbk9yZ2FuaXphdGlvbjogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vY29kZXNwYWNlc1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWRQYXJhbWV0ZXJzOiB7IG9yZ19pZDogXCJvcmdcIiB9IH1cbiAgICBdLFxuICAgIGxpc3RJblJlcG9zaXRvcnlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVzcGFjZXNcIlxuICAgIF0sXG4gICAgbGlzdE9yZ1NlY3JldHM6IFtcIkdFVCAvb3Jncy97b3JnfS9jb2Rlc3BhY2VzL3NlY3JldHNcIl0sXG4gICAgbGlzdFJlcG9TZWNyZXRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVzcGFjZXMvc2VjcmV0c1wiXSxcbiAgICBsaXN0UmVwb3NpdG9yaWVzRm9yU2VjcmV0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBsaXN0U2VjcmV0c0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvY29kZXNwYWNlcy9zZWNyZXRzXCJdLFxuICAgIGxpc3RTZWxlY3RlZFJlcG9zRm9yT3JnU2VjcmV0OiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgcHJlRmxpZ2h0V2l0aFJlcG9Gb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVzcGFjZXMvbmV3XCJcbiAgICBdLFxuICAgIHB1Ymxpc2hGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQT1NUIC91c2VyL2NvZGVzcGFjZXMve2NvZGVzcGFjZV9uYW1lfS9wdWJsaXNoXCJcbiAgICBdLFxuICAgIHJlbW92ZVJlcG9zaXRvcnlGb3JTZWNyZXRGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfVwiXG4gICAgXSxcbiAgICByZW1vdmVTZWxlY3RlZFJlcG9Gcm9tT3JnU2VjcmV0OiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9jb2Rlc3BhY2VzL3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIHJlcG9NYWNoaW5lc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlcy9tYWNoaW5lc1wiXG4gICAgXSxcbiAgICBzZXRSZXBvc2l0b3JpZXNGb3JTZWNyZXRGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQVVQgL3VzZXIvY29kZXNwYWNlcy9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIHNldFNlbGVjdGVkUmVwb3NGb3JPcmdTZWNyZXQ6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBzdGFydEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJQT1NUIC91c2VyL2NvZGVzcGFjZXMve2NvZGVzcGFjZV9uYW1lfS9zdGFydFwiXSxcbiAgICBzdG9wRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBPU1QgL3VzZXIvY29kZXNwYWNlcy97Y29kZXNwYWNlX25hbWV9L3N0b3BcIl0sXG4gICAgc3RvcEluT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vbWVtYmVycy97dXNlcm5hbWV9L2NvZGVzcGFjZXMve2NvZGVzcGFjZV9uYW1lfS9zdG9wXCJcbiAgICBdLFxuICAgIHVwZGF0ZUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJQQVRDSCAvdXNlci9jb2Rlc3BhY2VzL3tjb2Rlc3BhY2VfbmFtZX1cIl1cbiAgfSxcbiAgY29waWxvdDoge1xuICAgIGFkZENvcGlsb3RTZWF0c0ZvclRlYW1zOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vY29waWxvdC9iaWxsaW5nL3NlbGVjdGVkX3RlYW1zXCJcbiAgICBdLFxuICAgIGFkZENvcGlsb3RTZWF0c0ZvclVzZXJzOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vY29waWxvdC9iaWxsaW5nL3NlbGVjdGVkX3VzZXJzXCJcbiAgICBdLFxuICAgIGNhbmNlbENvcGlsb3RTZWF0QXNzaWdubWVudEZvclRlYW1zOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9jb3BpbG90L2JpbGxpbmcvc2VsZWN0ZWRfdGVhbXNcIlxuICAgIF0sXG4gICAgY2FuY2VsQ29waWxvdFNlYXRBc3NpZ25tZW50Rm9yVXNlcnM6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2NvcGlsb3QvYmlsbGluZy9zZWxlY3RlZF91c2Vyc1wiXG4gICAgXSxcbiAgICBjb3BpbG90TWV0cmljc0Zvck9yZ2FuaXphdGlvbjogW1wiR0VUIC9vcmdzL3tvcmd9L2NvcGlsb3QvbWV0cmljc1wiXSxcbiAgICBjb3BpbG90TWV0cmljc0ZvclRlYW06IFtcIkdFVCAvb3Jncy97b3JnfS90ZWFtL3t0ZWFtX3NsdWd9L2NvcGlsb3QvbWV0cmljc1wiXSxcbiAgICBnZXRDb3BpbG90T3JnYW5pemF0aW9uRGV0YWlsczogW1wiR0VUIC9vcmdzL3tvcmd9L2NvcGlsb3QvYmlsbGluZ1wiXSxcbiAgICBnZXRDb3BpbG90U2VhdERldGFpbHNGb3JVc2VyOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9tZW1iZXJzL3t1c2VybmFtZX0vY29waWxvdFwiXG4gICAgXSxcbiAgICBsaXN0Q29waWxvdFNlYXRzOiBbXCJHRVQgL29yZ3Mve29yZ30vY29waWxvdC9iaWxsaW5nL3NlYXRzXCJdXG4gIH0sXG4gIGNyZWRlbnRpYWxzOiB7IHJldm9rZTogW1wiUE9TVCAvY3JlZGVudGlhbHMvcmV2b2tlXCJdIH0sXG4gIGRlcGVuZGFib3Q6IHtcbiAgICBhZGRTZWxlY3RlZFJlcG9Ub09yZ1NlY3JldDogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vZGVwZW5kYWJvdC9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzL3tyZXBvc2l0b3J5X2lkfVwiXG4gICAgXSxcbiAgICBjcmVhdGVPclVwZGF0ZU9yZ1NlY3JldDogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vZGVwZW5kYWJvdC9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgY3JlYXRlT3JVcGRhdGVSZXBvU2VjcmV0OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwZW5kYWJvdC9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgZGVsZXRlT3JnU2VjcmV0OiBbXCJERUxFVEUgL29yZ3Mve29yZ30vZGVwZW5kYWJvdC9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIl0sXG4gICAgZGVsZXRlUmVwb1NlY3JldDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGVuZGFib3Qvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJcbiAgICBdLFxuICAgIGdldEFsZXJ0OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGVuZGFib3QvYWxlcnRzL3thbGVydF9udW1iZXJ9XCJdLFxuICAgIGdldE9yZ1B1YmxpY0tleTogW1wiR0VUIC9vcmdzL3tvcmd9L2RlcGVuZGFib3Qvc2VjcmV0cy9wdWJsaWMta2V5XCJdLFxuICAgIGdldE9yZ1NlY3JldDogW1wiR0VUIC9vcmdzL3tvcmd9L2RlcGVuZGFib3Qvc2VjcmV0cy97c2VjcmV0X25hbWV9XCJdLFxuICAgIGdldFJlcG9QdWJsaWNLZXk6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRhYm90L3NlY3JldHMvcHVibGljLWtleVwiXG4gICAgXSxcbiAgICBnZXRSZXBvU2VjcmV0OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwZW5kYWJvdC9zZWNyZXRzL3tzZWNyZXRfbmFtZX1cIlxuICAgIF0sXG4gICAgbGlzdEFsZXJ0c0ZvckVudGVycHJpc2U6IFtcbiAgICAgIFwiR0VUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vZGVwZW5kYWJvdC9hbGVydHNcIlxuICAgIF0sXG4gICAgbGlzdEFsZXJ0c0Zvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L2RlcGVuZGFib3QvYWxlcnRzXCJdLFxuICAgIGxpc3RBbGVydHNGb3JSZXBvOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGVuZGFib3QvYWxlcnRzXCJdLFxuICAgIGxpc3RPcmdTZWNyZXRzOiBbXCJHRVQgL29yZ3Mve29yZ30vZGVwZW5kYWJvdC9zZWNyZXRzXCJdLFxuICAgIGxpc3RSZXBvU2VjcmV0czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRhYm90L3NlY3JldHNcIl0sXG4gICAgbGlzdFNlbGVjdGVkUmVwb3NGb3JPcmdTZWNyZXQ6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2RlcGVuZGFib3Qvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICByZW1vdmVTZWxlY3RlZFJlcG9Gcm9tT3JnU2VjcmV0OiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9kZXBlbmRhYm90L3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIHJlcG9zaXRvcnlBY2Nlc3NGb3JPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdhbml6YXRpb25zL3tvcmd9L2RlcGVuZGFib3QvcmVwb3NpdG9yeS1hY2Nlc3NcIlxuICAgIF0sXG4gICAgc2V0UmVwb3NpdG9yeUFjY2Vzc0RlZmF1bHRMZXZlbDogW1xuICAgICAgXCJQVVQgL29yZ2FuaXphdGlvbnMve29yZ30vZGVwZW5kYWJvdC9yZXBvc2l0b3J5LWFjY2Vzcy9kZWZhdWx0LWxldmVsXCJcbiAgICBdLFxuICAgIHNldFNlbGVjdGVkUmVwb3NGb3JPcmdTZWNyZXQ6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2RlcGVuZGFib3Qvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICB1cGRhdGVBbGVydDogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwZW5kYWJvdC9hbGVydHMve2FsZXJ0X251bWJlcn1cIlxuICAgIF0sXG4gICAgdXBkYXRlUmVwb3NpdG9yeUFjY2Vzc0Zvck9yZzogW1xuICAgICAgXCJQQVRDSCAvb3JnYW5pemF0aW9ucy97b3JnfS9kZXBlbmRhYm90L3JlcG9zaXRvcnktYWNjZXNzXCJcbiAgICBdXG4gIH0sXG4gIGRlcGVuZGVuY3lHcmFwaDoge1xuICAgIGNyZWF0ZVJlcG9zaXRvcnlTbmFwc2hvdDogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRlbmN5LWdyYXBoL3NuYXBzaG90c1wiXG4gICAgXSxcbiAgICBkaWZmUmFuZ2U6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRlbmN5LWdyYXBoL2NvbXBhcmUve2Jhc2VoZWFkfVwiXG4gICAgXSxcbiAgICBleHBvcnRTYm9tOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGVuZGVuY3ktZ3JhcGgvc2JvbVwiXVxuICB9LFxuICBlbW9qaXM6IHsgZ2V0OiBbXCJHRVQgL2Vtb2ppc1wiXSB9LFxuICBlbnRlcnByaXNlVGVhbU1lbWJlcnNoaXBzOiB7XG4gICAgYWRkOiBbXG4gICAgICBcIlBVVCAvZW50ZXJwcmlzZXMve2VudGVycHJpc2V9L3RlYW1zL3tlbnRlcnByaXNlLXRlYW19L21lbWJlcnNoaXBzL3t1c2VybmFtZX1cIlxuICAgIF0sXG4gICAgYnVsa0FkZDogW1xuICAgICAgXCJQT1NUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vdGVhbXMve2VudGVycHJpc2UtdGVhbX0vbWVtYmVyc2hpcHMvYWRkXCJcbiAgICBdLFxuICAgIGJ1bGtSZW1vdmU6IFtcbiAgICAgIFwiUE9TVCAvZW50ZXJwcmlzZXMve2VudGVycHJpc2V9L3RlYW1zL3tlbnRlcnByaXNlLXRlYW19L21lbWJlcnNoaXBzL3JlbW92ZVwiXG4gICAgXSxcbiAgICBnZXQ6IFtcbiAgICAgIFwiR0VUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vdGVhbXMve2VudGVycHJpc2UtdGVhbX0vbWVtYmVyc2hpcHMve3VzZXJuYW1lfVwiXG4gICAgXSxcbiAgICBsaXN0OiBbXCJHRVQgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS90ZWFtcy97ZW50ZXJwcmlzZS10ZWFtfS9tZW1iZXJzaGlwc1wiXSxcbiAgICByZW1vdmU6IFtcbiAgICAgIFwiREVMRVRFIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vdGVhbXMve2VudGVycHJpc2UtdGVhbX0vbWVtYmVyc2hpcHMve3VzZXJuYW1lfVwiXG4gICAgXVxuICB9LFxuICBlbnRlcnByaXNlVGVhbU9yZ2FuaXphdGlvbnM6IHtcbiAgICBhZGQ6IFtcbiAgICAgIFwiUFVUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vdGVhbXMve2VudGVycHJpc2UtdGVhbX0vb3JnYW5pemF0aW9ucy97b3JnfVwiXG4gICAgXSxcbiAgICBidWxrQWRkOiBbXG4gICAgICBcIlBPU1QgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS90ZWFtcy97ZW50ZXJwcmlzZS10ZWFtfS9vcmdhbml6YXRpb25zL2FkZFwiXG4gICAgXSxcbiAgICBidWxrUmVtb3ZlOiBbXG4gICAgICBcIlBPU1QgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS90ZWFtcy97ZW50ZXJwcmlzZS10ZWFtfS9vcmdhbml6YXRpb25zL3JlbW92ZVwiXG4gICAgXSxcbiAgICBkZWxldGU6IFtcbiAgICAgIFwiREVMRVRFIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vdGVhbXMve2VudGVycHJpc2UtdGVhbX0vb3JnYW5pemF0aW9ucy97b3JnfVwiXG4gICAgXSxcbiAgICBnZXRBc3NpZ25tZW50OiBbXG4gICAgICBcIkdFVCAvZW50ZXJwcmlzZXMve2VudGVycHJpc2V9L3RlYW1zL3tlbnRlcnByaXNlLXRlYW19L29yZ2FuaXphdGlvbnMve29yZ31cIlxuICAgIF0sXG4gICAgZ2V0QXNzaWdubWVudHM6IFtcbiAgICAgIFwiR0VUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vdGVhbXMve2VudGVycHJpc2UtdGVhbX0vb3JnYW5pemF0aW9uc1wiXG4gICAgXVxuICB9LFxuICBlbnRlcnByaXNlVGVhbXM6IHtcbiAgICBjcmVhdGU6IFtcIlBPU1QgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS90ZWFtc1wiXSxcbiAgICBkZWxldGU6IFtcIkRFTEVURSAvZW50ZXJwcmlzZXMve2VudGVycHJpc2V9L3RlYW1zL3t0ZWFtX3NsdWd9XCJdLFxuICAgIGdldDogW1wiR0VUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vdGVhbXMve3RlYW1fc2x1Z31cIl0sXG4gICAgbGlzdDogW1wiR0VUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vdGVhbXNcIl0sXG4gICAgdXBkYXRlOiBbXCJQQVRDSCAvZW50ZXJwcmlzZXMve2VudGVycHJpc2V9L3RlYW1zL3t0ZWFtX3NsdWd9XCJdXG4gIH0sXG4gIGdpc3RzOiB7XG4gICAgY2hlY2tJc1N0YXJyZWQ6IFtcIkdFVCAvZ2lzdHMve2dpc3RfaWR9L3N0YXJcIl0sXG4gICAgY3JlYXRlOiBbXCJQT1NUIC9naXN0c1wiXSxcbiAgICBjcmVhdGVDb21tZW50OiBbXCJQT1NUIC9naXN0cy97Z2lzdF9pZH0vY29tbWVudHNcIl0sXG4gICAgZGVsZXRlOiBbXCJERUxFVEUgL2dpc3RzL3tnaXN0X2lkfVwiXSxcbiAgICBkZWxldGVDb21tZW50OiBbXCJERUxFVEUgL2dpc3RzL3tnaXN0X2lkfS9jb21tZW50cy97Y29tbWVudF9pZH1cIl0sXG4gICAgZm9yazogW1wiUE9TVCAvZ2lzdHMve2dpc3RfaWR9L2ZvcmtzXCJdLFxuICAgIGdldDogW1wiR0VUIC9naXN0cy97Z2lzdF9pZH1cIl0sXG4gICAgZ2V0Q29tbWVudDogW1wiR0VUIC9naXN0cy97Z2lzdF9pZH0vY29tbWVudHMve2NvbW1lbnRfaWR9XCJdLFxuICAgIGdldFJldmlzaW9uOiBbXCJHRVQgL2dpc3RzL3tnaXN0X2lkfS97c2hhfVwiXSxcbiAgICBsaXN0OiBbXCJHRVQgL2dpc3RzXCJdLFxuICAgIGxpc3RDb21tZW50czogW1wiR0VUIC9naXN0cy97Z2lzdF9pZH0vY29tbWVudHNcIl0sXG4gICAgbGlzdENvbW1pdHM6IFtcIkdFVCAvZ2lzdHMve2dpc3RfaWR9L2NvbW1pdHNcIl0sXG4gICAgbGlzdEZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9naXN0c1wiXSxcbiAgICBsaXN0Rm9ya3M6IFtcIkdFVCAvZ2lzdHMve2dpc3RfaWR9L2ZvcmtzXCJdLFxuICAgIGxpc3RQdWJsaWM6IFtcIkdFVCAvZ2lzdHMvcHVibGljXCJdLFxuICAgIGxpc3RTdGFycmVkOiBbXCJHRVQgL2dpc3RzL3N0YXJyZWRcIl0sXG4gICAgc3RhcjogW1wiUFVUIC9naXN0cy97Z2lzdF9pZH0vc3RhclwiXSxcbiAgICB1bnN0YXI6IFtcIkRFTEVURSAvZ2lzdHMve2dpc3RfaWR9L3N0YXJcIl0sXG4gICAgdXBkYXRlOiBbXCJQQVRDSCAvZ2lzdHMve2dpc3RfaWR9XCJdLFxuICAgIHVwZGF0ZUNvbW1lbnQ6IFtcIlBBVENIIC9naXN0cy97Z2lzdF9pZH0vY29tbWVudHMve2NvbW1lbnRfaWR9XCJdXG4gIH0sXG4gIGdpdDoge1xuICAgIGNyZWF0ZUJsb2I6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2dpdC9ibG9ic1wiXSxcbiAgICBjcmVhdGVDb21taXQ6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2dpdC9jb21taXRzXCJdLFxuICAgIGNyZWF0ZVJlZjogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZ2l0L3JlZnNcIl0sXG4gICAgY3JlYXRlVGFnOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvdGFnc1wiXSxcbiAgICBjcmVhdGVUcmVlOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvdHJlZXNcIl0sXG4gICAgZGVsZXRlUmVmOiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2dpdC9yZWZzL3tyZWZ9XCJdLFxuICAgIGdldEJsb2I6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZ2l0L2Jsb2JzL3tmaWxlX3NoYX1cIl0sXG4gICAgZ2V0Q29tbWl0OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2dpdC9jb21taXRzL3tjb21taXRfc2hhfVwiXSxcbiAgICBnZXRSZWY6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZ2l0L3JlZi97cmVmfVwiXSxcbiAgICBnZXRUYWc6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZ2l0L3RhZ3Mve3RhZ19zaGF9XCJdLFxuICAgIGdldFRyZWU6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZ2l0L3RyZWVzL3t0cmVlX3NoYX1cIl0sXG4gICAgbGlzdE1hdGNoaW5nUmVmczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvbWF0Y2hpbmctcmVmcy97cmVmfVwiXSxcbiAgICB1cGRhdGVSZWY6IFtcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvcmVmcy97cmVmfVwiXVxuICB9LFxuICBnaXRpZ25vcmU6IHtcbiAgICBnZXRBbGxUZW1wbGF0ZXM6IFtcIkdFVCAvZ2l0aWdub3JlL3RlbXBsYXRlc1wiXSxcbiAgICBnZXRUZW1wbGF0ZTogW1wiR0VUIC9naXRpZ25vcmUvdGVtcGxhdGVzL3tuYW1lfVwiXVxuICB9LFxuICBob3N0ZWRDb21wdXRlOiB7XG4gICAgY3JlYXRlTmV0d29ya0NvbmZpZ3VyYXRpb25Gb3JPcmc6IFtcbiAgICAgIFwiUE9TVCAvb3Jncy97b3JnfS9zZXR0aW5ncy9uZXR3b3JrLWNvbmZpZ3VyYXRpb25zXCJcbiAgICBdLFxuICAgIGRlbGV0ZU5ldHdvcmtDb25maWd1cmF0aW9uRnJvbU9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vc2V0dGluZ3MvbmV0d29yay1jb25maWd1cmF0aW9ucy97bmV0d29ya19jb25maWd1cmF0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBnZXROZXR3b3JrQ29uZmlndXJhdGlvbkZvck9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vc2V0dGluZ3MvbmV0d29yay1jb25maWd1cmF0aW9ucy97bmV0d29ya19jb25maWd1cmF0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBnZXROZXR3b3JrU2V0dGluZ3NGb3JPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3NldHRpbmdzL25ldHdvcmstc2V0dGluZ3Mve25ldHdvcmtfc2V0dGluZ3NfaWR9XCJcbiAgICBdLFxuICAgIGxpc3ROZXR3b3JrQ29uZmlndXJhdGlvbnNGb3JPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3NldHRpbmdzL25ldHdvcmstY29uZmlndXJhdGlvbnNcIlxuICAgIF0sXG4gICAgdXBkYXRlTmV0d29ya0NvbmZpZ3VyYXRpb25Gb3JPcmc6IFtcbiAgICAgIFwiUEFUQ0ggL29yZ3Mve29yZ30vc2V0dGluZ3MvbmV0d29yay1jb25maWd1cmF0aW9ucy97bmV0d29ya19jb25maWd1cmF0aW9uX2lkfVwiXG4gICAgXVxuICB9LFxuICBpbnRlcmFjdGlvbnM6IHtcbiAgICBnZXRSZXN0cmljdGlvbnNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL2ludGVyYWN0aW9uLWxpbWl0c1wiXSxcbiAgICBnZXRSZXN0cmljdGlvbnNGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9pbnRlcmFjdGlvbi1saW1pdHNcIl0sXG4gICAgZ2V0UmVzdHJpY3Rpb25zRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbnRlcmFjdGlvbi1saW1pdHNcIl0sXG4gICAgZ2V0UmVzdHJpY3Rpb25zRm9yWW91clB1YmxpY1JlcG9zOiBbXG4gICAgICBcIkdFVCAvdXNlci9pbnRlcmFjdGlvbi1saW1pdHNcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJpbnRlcmFjdGlvbnNcIiwgXCJnZXRSZXN0cmljdGlvbnNGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICByZW1vdmVSZXN0cmljdGlvbnNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiREVMRVRFIC91c2VyL2ludGVyYWN0aW9uLWxpbWl0c1wiXSxcbiAgICByZW1vdmVSZXN0cmljdGlvbnNGb3JPcmc6IFtcIkRFTEVURSAvb3Jncy97b3JnfS9pbnRlcmFjdGlvbi1saW1pdHNcIl0sXG4gICAgcmVtb3ZlUmVzdHJpY3Rpb25zRm9yUmVwbzogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2ludGVyYWN0aW9uLWxpbWl0c1wiXG4gICAgXSxcbiAgICByZW1vdmVSZXN0cmljdGlvbnNGb3JZb3VyUHVibGljUmVwb3M6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL2ludGVyYWN0aW9uLWxpbWl0c1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcImludGVyYWN0aW9uc1wiLCBcInJlbW92ZVJlc3RyaWN0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIHNldFJlc3RyaWN0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJQVVQgL3VzZXIvaW50ZXJhY3Rpb24tbGltaXRzXCJdLFxuICAgIHNldFJlc3RyaWN0aW9uc0Zvck9yZzogW1wiUFVUIC9vcmdzL3tvcmd9L2ludGVyYWN0aW9uLWxpbWl0c1wiXSxcbiAgICBzZXRSZXN0cmljdGlvbnNGb3JSZXBvOiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2ludGVyYWN0aW9uLWxpbWl0c1wiXSxcbiAgICBzZXRSZXN0cmljdGlvbnNGb3JZb3VyUHVibGljUmVwb3M6IFtcbiAgICAgIFwiUFVUIC91c2VyL2ludGVyYWN0aW9uLWxpbWl0c1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcImludGVyYWN0aW9uc1wiLCBcInNldFJlc3RyaWN0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdXG4gIH0sXG4gIGlzc3Vlczoge1xuICAgIGFkZEFzc2lnbmVlczogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vYXNzaWduZWVzXCJcbiAgICBdLFxuICAgIGFkZEJsb2NrZWRCeURlcGVuZGVuY3k6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2RlcGVuZGVuY2llcy9ibG9ja2VkX2J5XCJcbiAgICBdLFxuICAgIGFkZExhYmVsczogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2xhYmVsc1wiXSxcbiAgICBhZGRTdWJJc3N1ZTogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vc3ViX2lzc3Vlc1wiXG4gICAgXSxcbiAgICBjaGVja1VzZXJDYW5CZUFzc2lnbmVkOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Fzc2lnbmVlcy97YXNzaWduZWV9XCJdLFxuICAgIGNoZWNrVXNlckNhbkJlQXNzaWduZWRUb0lzc3VlOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2Fzc2lnbmVlcy97YXNzaWduZWV9XCJcbiAgICBdLFxuICAgIGNyZWF0ZTogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzXCJdLFxuICAgIGNyZWF0ZUNvbW1lbnQ6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2NvbW1lbnRzXCJcbiAgICBdLFxuICAgIGNyZWF0ZUxhYmVsOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9sYWJlbHNcIl0sXG4gICAgY3JlYXRlTWlsZXN0b25lOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9taWxlc3RvbmVzXCJdLFxuICAgIGRlbGV0ZUNvbW1lbnQ6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvY29tbWVudHMve2NvbW1lbnRfaWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUxhYmVsOiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2xhYmVscy97bmFtZX1cIl0sXG4gICAgZGVsZXRlTWlsZXN0b25lOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vbWlsZXN0b25lcy97bWlsZXN0b25lX251bWJlcn1cIlxuICAgIF0sXG4gICAgZ2V0OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfVwiXSxcbiAgICBnZXRDb21tZW50OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy9jb21tZW50cy97Y29tbWVudF9pZH1cIl0sXG4gICAgZ2V0RXZlbnQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL2V2ZW50cy97ZXZlbnRfaWR9XCJdLFxuICAgIGdldExhYmVsOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2xhYmVscy97bmFtZX1cIl0sXG4gICAgZ2V0TWlsZXN0b25lOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L21pbGVzdG9uZXMve21pbGVzdG9uZV9udW1iZXJ9XCJdLFxuICAgIGdldFBhcmVudDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vcGFyZW50XCJdLFxuICAgIGxpc3Q6IFtcIkdFVCAvaXNzdWVzXCJdLFxuICAgIGxpc3RBc3NpZ25lZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYXNzaWduZWVzXCJdLFxuICAgIGxpc3RDb21tZW50czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vY29tbWVudHNcIl0sXG4gICAgbGlzdENvbW1lbnRzRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvY29tbWVudHNcIl0sXG4gICAgbGlzdERlcGVuZGVuY2llc0Jsb2NrZWRCeTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9kZXBlbmRlbmNpZXMvYmxvY2tlZF9ieVwiXG4gICAgXSxcbiAgICBsaXN0RGVwZW5kZW5jaWVzQmxvY2tpbmc6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vZGVwZW5kZW5jaWVzL2Jsb2NraW5nXCJcbiAgICBdLFxuICAgIGxpc3RFdmVudHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2V2ZW50c1wiXSxcbiAgICBsaXN0RXZlbnRzRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvZXZlbnRzXCJdLFxuICAgIGxpc3RFdmVudHNGb3JUaW1lbGluZTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS90aW1lbGluZVwiXG4gICAgXSxcbiAgICBsaXN0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9pc3N1ZXNcIl0sXG4gICAgbGlzdEZvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L2lzc3Vlc1wiXSxcbiAgICBsaXN0Rm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXNcIl0sXG4gICAgbGlzdExhYmVsc0Zvck1pbGVzdG9uZTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L21pbGVzdG9uZXMve21pbGVzdG9uZV9udW1iZXJ9L2xhYmVsc1wiXG4gICAgXSxcbiAgICBsaXN0TGFiZWxzRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9sYWJlbHNcIl0sXG4gICAgbGlzdExhYmVsc09uSXNzdWU6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vbGFiZWxzXCJcbiAgICBdLFxuICAgIGxpc3RNaWxlc3RvbmVzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L21pbGVzdG9uZXNcIl0sXG4gICAgbGlzdFN1Yklzc3VlczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9zdWJfaXNzdWVzXCJcbiAgICBdLFxuICAgIGxvY2s6IFtcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2xvY2tcIl0sXG4gICAgcmVtb3ZlQWxsTGFiZWxzOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2xhYmVsc1wiXG4gICAgXSxcbiAgICByZW1vdmVBc3NpZ25lZXM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vYXNzaWduZWVzXCJcbiAgICBdLFxuICAgIHJlbW92ZURlcGVuZGVuY3lCbG9ja2VkQnk6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vZGVwZW5kZW5jaWVzL2Jsb2NrZWRfYnkve2lzc3VlX2lkfVwiXG4gICAgXSxcbiAgICByZW1vdmVMYWJlbDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9sYWJlbHMve25hbWV9XCJcbiAgICBdLFxuICAgIHJlbW92ZVN1Yklzc3VlOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L3N1Yl9pc3N1ZVwiXG4gICAgXSxcbiAgICByZXByaW9yaXRpemVTdWJJc3N1ZTogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L3N1Yl9pc3N1ZXMvcHJpb3JpdHlcIlxuICAgIF0sXG4gICAgc2V0TGFiZWxzOiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9sYWJlbHNcIl0sXG4gICAgdW5sb2NrOiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9sb2NrXCJdLFxuICAgIHVwZGF0ZTogW1wiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfVwiXSxcbiAgICB1cGRhdGVDb21tZW50OiBbXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL2NvbW1lbnRzL3tjb21tZW50X2lkfVwiXSxcbiAgICB1cGRhdGVMYWJlbDogW1wiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2xhYmVscy97bmFtZX1cIl0sXG4gICAgdXBkYXRlTWlsZXN0b25lOiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9taWxlc3RvbmVzL3ttaWxlc3RvbmVfbnVtYmVyfVwiXG4gICAgXVxuICB9LFxuICBsaWNlbnNlczoge1xuICAgIGdldDogW1wiR0VUIC9saWNlbnNlcy97bGljZW5zZX1cIl0sXG4gICAgZ2V0QWxsQ29tbW9ubHlVc2VkOiBbXCJHRVQgL2xpY2Vuc2VzXCJdLFxuICAgIGdldEZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vbGljZW5zZVwiXVxuICB9LFxuICBtYXJrZG93bjoge1xuICAgIHJlbmRlcjogW1wiUE9TVCAvbWFya2Rvd25cIl0sXG4gICAgcmVuZGVyUmF3OiBbXG4gICAgICBcIlBPU1QgL21hcmtkb3duL3Jhd1wiLFxuICAgICAgeyBoZWFkZXJzOiB7IFwiY29udGVudC10eXBlXCI6IFwidGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOFwiIH0gfVxuICAgIF1cbiAgfSxcbiAgbWV0YToge1xuICAgIGdldDogW1wiR0VUIC9tZXRhXCJdLFxuICAgIGdldEFsbFZlcnNpb25zOiBbXCJHRVQgL3ZlcnNpb25zXCJdLFxuICAgIGdldE9jdG9jYXQ6IFtcIkdFVCAvb2N0b2NhdFwiXSxcbiAgICBnZXRaZW46IFtcIkdFVCAvemVuXCJdLFxuICAgIHJvb3Q6IFtcIkdFVCAvXCJdXG4gIH0sXG4gIG1pZ3JhdGlvbnM6IHtcbiAgICBkZWxldGVBcmNoaXZlRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL21pZ3JhdGlvbnMve21pZ3JhdGlvbl9pZH0vYXJjaGl2ZVwiXG4gICAgXSxcbiAgICBkZWxldGVBcmNoaXZlRm9yT3JnOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L2FyY2hpdmVcIlxuICAgIF0sXG4gICAgZG93bmxvYWRBcmNoaXZlRm9yT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L2FyY2hpdmVcIlxuICAgIF0sXG4gICAgZ2V0QXJjaGl2ZUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L2FyY2hpdmVcIlxuICAgIF0sXG4gICAgZ2V0U3RhdHVzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9XCJdLFxuICAgIGdldFN0YXR1c0Zvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L21pZ3JhdGlvbnMve21pZ3JhdGlvbl9pZH1cIl0sXG4gICAgbGlzdEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvbWlncmF0aW9uc1wiXSxcbiAgICBsaXN0Rm9yT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vbWlncmF0aW9uc1wiXSxcbiAgICBsaXN0UmVwb3NGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXIvbWlncmF0aW9ucy97bWlncmF0aW9uX2lkfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgbGlzdFJlcG9zRm9yT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vbWlncmF0aW9ucy97bWlncmF0aW9uX2lkfS9yZXBvc2l0b3JpZXNcIl0sXG4gICAgbGlzdFJlcG9zRm9yVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXIvbWlncmF0aW9ucy97bWlncmF0aW9uX2lkfS9yZXBvc2l0b3JpZXNcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJtaWdyYXRpb25zXCIsIFwibGlzdFJlcG9zRm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgc3RhcnRGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUE9TVCAvdXNlci9taWdyYXRpb25zXCJdLFxuICAgIHN0YXJ0Rm9yT3JnOiBbXCJQT1NUIC9vcmdzL3tvcmd9L21pZ3JhdGlvbnNcIl0sXG4gICAgdW5sb2NrUmVwb0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkRFTEVURSAvdXNlci9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L3JlcG9zL3tyZXBvX25hbWV9L2xvY2tcIlxuICAgIF0sXG4gICAgdW5sb2NrUmVwb0Zvck9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vbWlncmF0aW9ucy97bWlncmF0aW9uX2lkfS9yZXBvcy97cmVwb19uYW1lfS9sb2NrXCJcbiAgICBdXG4gIH0sXG4gIG9pZGM6IHtcbiAgICBnZXRPaWRjQ3VzdG9tU3ViVGVtcGxhdGVGb3JPcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvb2lkYy9jdXN0b21pemF0aW9uL3N1YlwiXG4gICAgXSxcbiAgICB1cGRhdGVPaWRjQ3VzdG9tU3ViVGVtcGxhdGVGb3JPcmc6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L2FjdGlvbnMvb2lkYy9jdXN0b21pemF0aW9uL3N1YlwiXG4gICAgXVxuICB9LFxuICBvcmdzOiB7XG4gICAgYWRkU2VjdXJpdHlNYW5hZ2VyVGVhbTogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vc2VjdXJpdHktbWFuYWdlcnMvdGVhbXMve3RlYW1fc2x1Z31cIixcbiAgICAgIHt9LFxuICAgICAge1xuICAgICAgICBkZXByZWNhdGVkOiBcIm9jdG9raXQucmVzdC5vcmdzLmFkZFNlY3VyaXR5TWFuYWdlclRlYW0oKSBpcyBkZXByZWNhdGVkLCBzZWUgaHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vcmVzdC9vcmdzL3NlY3VyaXR5LW1hbmFnZXJzI2FkZC1hLXNlY3VyaXR5LW1hbmFnZXItdGVhbVwiXG4gICAgICB9XG4gICAgXSxcbiAgICBhc3NpZ25UZWFtVG9PcmdSb2xlOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMvdGVhbXMve3RlYW1fc2x1Z30ve3JvbGVfaWR9XCJcbiAgICBdLFxuICAgIGFzc2lnblVzZXJUb09yZ1JvbGU6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlcy91c2Vycy97dXNlcm5hbWV9L3tyb2xlX2lkfVwiXG4gICAgXSxcbiAgICBibG9ja1VzZXI6IFtcIlBVVCAvb3Jncy97b3JnfS9ibG9ja3Mve3VzZXJuYW1lfVwiXSxcbiAgICBjYW5jZWxJbnZpdGF0aW9uOiBbXCJERUxFVEUgL29yZ3Mve29yZ30vaW52aXRhdGlvbnMve2ludml0YXRpb25faWR9XCJdLFxuICAgIGNoZWNrQmxvY2tlZFVzZXI6IFtcIkdFVCAvb3Jncy97b3JnfS9ibG9ja3Mve3VzZXJuYW1lfVwiXSxcbiAgICBjaGVja01lbWJlcnNoaXBGb3JVc2VyOiBbXCJHRVQgL29yZ3Mve29yZ30vbWVtYmVycy97dXNlcm5hbWV9XCJdLFxuICAgIGNoZWNrUHVibGljTWVtYmVyc2hpcEZvclVzZXI6IFtcIkdFVCAvb3Jncy97b3JnfS9wdWJsaWNfbWVtYmVycy97dXNlcm5hbWV9XCJdLFxuICAgIGNvbnZlcnRNZW1iZXJUb091dHNpZGVDb2xsYWJvcmF0b3I6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L291dHNpZGVfY29sbGFib3JhdG9ycy97dXNlcm5hbWV9XCJcbiAgICBdLFxuICAgIGNyZWF0ZUFydGlmYWN0U3RvcmFnZVJlY29yZDogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L2FydGlmYWN0cy9tZXRhZGF0YS9zdG9yYWdlLXJlY29yZFwiXG4gICAgXSxcbiAgICBjcmVhdGVJbnZpdGF0aW9uOiBbXCJQT1NUIC9vcmdzL3tvcmd9L2ludml0YXRpb25zXCJdLFxuICAgIGNyZWF0ZUlzc3VlVHlwZTogW1wiUE9TVCAvb3Jncy97b3JnfS9pc3N1ZS10eXBlc1wiXSxcbiAgICBjcmVhdGVXZWJob29rOiBbXCJQT1NUIC9vcmdzL3tvcmd9L2hvb2tzXCJdLFxuICAgIGN1c3RvbVByb3BlcnRpZXNGb3JPcmdzQ3JlYXRlT3JVcGRhdGVPcmdhbml6YXRpb25WYWx1ZXM6IFtcbiAgICAgIFwiUEFUQ0ggL29yZ2FuaXphdGlvbnMve29yZ30vb3JnLXByb3BlcnRpZXMvdmFsdWVzXCJcbiAgICBdLFxuICAgIGN1c3RvbVByb3BlcnRpZXNGb3JPcmdzR2V0T3JnYW5pemF0aW9uVmFsdWVzOiBbXG4gICAgICBcIkdFVCAvb3JnYW5pemF0aW9ucy97b3JnfS9vcmctcHJvcGVydGllcy92YWx1ZXNcIlxuICAgIF0sXG4gICAgY3VzdG9tUHJvcGVydGllc0ZvclJlcG9zQ3JlYXRlT3JVcGRhdGVPcmdhbml6YXRpb25EZWZpbml0aW9uOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9wcm9wZXJ0aWVzL3NjaGVtYS97Y3VzdG9tX3Byb3BlcnR5X25hbWV9XCJcbiAgICBdLFxuICAgIGN1c3RvbVByb3BlcnRpZXNGb3JSZXBvc0NyZWF0ZU9yVXBkYXRlT3JnYW5pemF0aW9uRGVmaW5pdGlvbnM6IFtcbiAgICAgIFwiUEFUQ0ggL29yZ3Mve29yZ30vcHJvcGVydGllcy9zY2hlbWFcIlxuICAgIF0sXG4gICAgY3VzdG9tUHJvcGVydGllc0ZvclJlcG9zQ3JlYXRlT3JVcGRhdGVPcmdhbml6YXRpb25WYWx1ZXM6IFtcbiAgICAgIFwiUEFUQ0ggL29yZ3Mve29yZ30vcHJvcGVydGllcy92YWx1ZXNcIlxuICAgIF0sXG4gICAgY3VzdG9tUHJvcGVydGllc0ZvclJlcG9zRGVsZXRlT3JnYW5pemF0aW9uRGVmaW5pdGlvbjogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vcHJvcGVydGllcy9zY2hlbWEve2N1c3RvbV9wcm9wZXJ0eV9uYW1lfVwiXG4gICAgXSxcbiAgICBjdXN0b21Qcm9wZXJ0aWVzRm9yUmVwb3NHZXRPcmdhbml6YXRpb25EZWZpbml0aW9uOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9wcm9wZXJ0aWVzL3NjaGVtYS97Y3VzdG9tX3Byb3BlcnR5X25hbWV9XCJcbiAgICBdLFxuICAgIGN1c3RvbVByb3BlcnRpZXNGb3JSZXBvc0dldE9yZ2FuaXphdGlvbkRlZmluaXRpb25zOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9wcm9wZXJ0aWVzL3NjaGVtYVwiXG4gICAgXSxcbiAgICBjdXN0b21Qcm9wZXJ0aWVzRm9yUmVwb3NHZXRPcmdhbml6YXRpb25WYWx1ZXM6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3Byb3BlcnRpZXMvdmFsdWVzXCJcbiAgICBdLFxuICAgIGRlbGV0ZTogW1wiREVMRVRFIC9vcmdzL3tvcmd9XCJdLFxuICAgIGRlbGV0ZUF0dGVzdGF0aW9uc0J1bGs6IFtcIlBPU1QgL29yZ3Mve29yZ30vYXR0ZXN0YXRpb25zL2RlbGV0ZS1yZXF1ZXN0XCJdLFxuICAgIGRlbGV0ZUF0dGVzdGF0aW9uc0J5SWQ6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L2F0dGVzdGF0aW9ucy97YXR0ZXN0YXRpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUF0dGVzdGF0aW9uc0J5U3ViamVjdERpZ2VzdDogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vYXR0ZXN0YXRpb25zL2RpZ2VzdC97c3ViamVjdF9kaWdlc3R9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUlzc3VlVHlwZTogW1wiREVMRVRFIC9vcmdzL3tvcmd9L2lzc3VlLXR5cGVzL3tpc3N1ZV90eXBlX2lkfVwiXSxcbiAgICBkZWxldGVXZWJob29rOiBbXCJERUxFVEUgL29yZ3Mve29yZ30vaG9va3Mve2hvb2tfaWR9XCJdLFxuICAgIGRpc2FibGVTZWxlY3RlZFJlcG9zaXRvcnlJbW11dGFibGVSZWxlYXNlc09yZ2FuaXphdGlvbjogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vc2V0dGluZ3MvaW1tdXRhYmxlLXJlbGVhc2VzL3JlcG9zaXRvcmllcy97cmVwb3NpdG9yeV9pZH1cIlxuICAgIF0sXG4gICAgZW5hYmxlU2VsZWN0ZWRSZXBvc2l0b3J5SW1tdXRhYmxlUmVsZWFzZXNPcmdhbml6YXRpb246IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L3NldHRpbmdzL2ltbXV0YWJsZS1yZWxlYXNlcy9yZXBvc2l0b3JpZXMve3JlcG9zaXRvcnlfaWR9XCJcbiAgICBdLFxuICAgIGdldDogW1wiR0VUIC9vcmdzL3tvcmd9XCJdLFxuICAgIGdldEltbXV0YWJsZVJlbGVhc2VzU2V0dGluZ3M6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3NldHRpbmdzL2ltbXV0YWJsZS1yZWxlYXNlc1wiXG4gICAgXSxcbiAgICBnZXRJbW11dGFibGVSZWxlYXNlc1NldHRpbmdzUmVwb3NpdG9yaWVzOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9zZXR0aW5ncy9pbW11dGFibGUtcmVsZWFzZXMvcmVwb3NpdG9yaWVzXCJcbiAgICBdLFxuICAgIGdldE1lbWJlcnNoaXBGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL21lbWJlcnNoaXBzL29yZ3Mve29yZ31cIl0sXG4gICAgZ2V0TWVtYmVyc2hpcEZvclVzZXI6IFtcIkdFVCAvb3Jncy97b3JnfS9tZW1iZXJzaGlwcy97dXNlcm5hbWV9XCJdLFxuICAgIGdldE9yZ1JvbGU6IFtcIkdFVCAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMve3JvbGVfaWR9XCJdLFxuICAgIGdldE9yZ1J1bGVzZXRIaXN0b3J5OiBbXCJHRVQgL29yZ3Mve29yZ30vcnVsZXNldHMve3J1bGVzZXRfaWR9L2hpc3RvcnlcIl0sXG4gICAgZ2V0T3JnUnVsZXNldFZlcnNpb246IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3J1bGVzZXRzL3tydWxlc2V0X2lkfS9oaXN0b3J5L3t2ZXJzaW9uX2lkfVwiXG4gICAgXSxcbiAgICBnZXRXZWJob29rOiBbXCJHRVQgL29yZ3Mve29yZ30vaG9va3Mve2hvb2tfaWR9XCJdLFxuICAgIGdldFdlYmhvb2tDb25maWdGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9ob29rcy97aG9va19pZH0vY29uZmlnXCJdLFxuICAgIGdldFdlYmhvb2tEZWxpdmVyeTogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vaG9va3Mve2hvb2tfaWR9L2RlbGl2ZXJpZXMve2RlbGl2ZXJ5X2lkfVwiXG4gICAgXSxcbiAgICBsaXN0OiBbXCJHRVQgL29yZ2FuaXphdGlvbnNcIl0sXG4gICAgbGlzdEFwcEluc3RhbGxhdGlvbnM6IFtcIkdFVCAvb3Jncy97b3JnfS9pbnN0YWxsYXRpb25zXCJdLFxuICAgIGxpc3RBcnRpZmFjdFN0b3JhZ2VSZWNvcmRzOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9hcnRpZmFjdHMve3N1YmplY3RfZGlnZXN0fS9tZXRhZGF0YS9zdG9yYWdlLXJlY29yZHNcIlxuICAgIF0sXG4gICAgbGlzdEF0dGVzdGF0aW9uUmVwb3NpdG9yaWVzOiBbXCJHRVQgL29yZ3Mve29yZ30vYXR0ZXN0YXRpb25zL3JlcG9zaXRvcmllc1wiXSxcbiAgICBsaXN0QXR0ZXN0YXRpb25zOiBbXCJHRVQgL29yZ3Mve29yZ30vYXR0ZXN0YXRpb25zL3tzdWJqZWN0X2RpZ2VzdH1cIl0sXG4gICAgbGlzdEF0dGVzdGF0aW9uc0J1bGs6IFtcbiAgICAgIFwiUE9TVCAvb3Jncy97b3JnfS9hdHRlc3RhdGlvbnMvYnVsay1saXN0ez9wZXJfcGFnZSxiZWZvcmUsYWZ0ZXJ9XCJcbiAgICBdLFxuICAgIGxpc3RCbG9ja2VkVXNlcnM6IFtcIkdFVCAvb3Jncy97b3JnfS9ibG9ja3NcIl0sXG4gICAgbGlzdEZhaWxlZEludml0YXRpb25zOiBbXCJHRVQgL29yZ3Mve29yZ30vZmFpbGVkX2ludml0YXRpb25zXCJdLFxuICAgIGxpc3RGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL29yZ3NcIl0sXG4gICAgbGlzdEZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9vcmdzXCJdLFxuICAgIGxpc3RJbnZpdGF0aW9uVGVhbXM6IFtcIkdFVCAvb3Jncy97b3JnfS9pbnZpdGF0aW9ucy97aW52aXRhdGlvbl9pZH0vdGVhbXNcIl0sXG4gICAgbGlzdElzc3VlVHlwZXM6IFtcIkdFVCAvb3Jncy97b3JnfS9pc3N1ZS10eXBlc1wiXSxcbiAgICBsaXN0TWVtYmVyczogW1wiR0VUIC9vcmdzL3tvcmd9L21lbWJlcnNcIl0sXG4gICAgbGlzdE1lbWJlcnNoaXBzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9tZW1iZXJzaGlwcy9vcmdzXCJdLFxuICAgIGxpc3RPcmdSb2xlVGVhbXM6IFtcIkdFVCAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMve3JvbGVfaWR9L3RlYW1zXCJdLFxuICAgIGxpc3RPcmdSb2xlVXNlcnM6IFtcIkdFVCAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMve3JvbGVfaWR9L3VzZXJzXCJdLFxuICAgIGxpc3RPcmdSb2xlczogW1wiR0VUIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlc1wiXSxcbiAgICBsaXN0T3JnYW5pemF0aW9uRmluZUdyYWluZWRQZXJtaXNzaW9uczogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vb3JnYW5pemF0aW9uLWZpbmUtZ3JhaW5lZC1wZXJtaXNzaW9uc1wiXG4gICAgXSxcbiAgICBsaXN0T3V0c2lkZUNvbGxhYm9yYXRvcnM6IFtcIkdFVCAvb3Jncy97b3JnfS9vdXRzaWRlX2NvbGxhYm9yYXRvcnNcIl0sXG4gICAgbGlzdFBhdEdyYW50UmVwb3NpdG9yaWVzOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW5zL3twYXRfaWR9L3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBsaXN0UGF0R3JhbnRSZXF1ZXN0UmVwb3NpdG9yaWVzOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW4tcmVxdWVzdHMve3BhdF9yZXF1ZXN0X2lkfS9yZXBvc2l0b3JpZXNcIlxuICAgIF0sXG4gICAgbGlzdFBhdEdyYW50UmVxdWVzdHM6IFtcIkdFVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW4tcmVxdWVzdHNcIl0sXG4gICAgbGlzdFBhdEdyYW50czogW1wiR0VUIC9vcmdzL3tvcmd9L3BlcnNvbmFsLWFjY2Vzcy10b2tlbnNcIl0sXG4gICAgbGlzdFBlbmRpbmdJbnZpdGF0aW9uczogW1wiR0VUIC9vcmdzL3tvcmd9L2ludml0YXRpb25zXCJdLFxuICAgIGxpc3RQdWJsaWNNZW1iZXJzOiBbXCJHRVQgL29yZ3Mve29yZ30vcHVibGljX21lbWJlcnNcIl0sXG4gICAgbGlzdFNlY3VyaXR5TWFuYWdlclRlYW1zOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9zZWN1cml0eS1tYW5hZ2Vyc1wiLFxuICAgICAge30sXG4gICAgICB7XG4gICAgICAgIGRlcHJlY2F0ZWQ6IFwib2N0b2tpdC5yZXN0Lm9yZ3MubGlzdFNlY3VyaXR5TWFuYWdlclRlYW1zKCkgaXMgZGVwcmVjYXRlZCwgc2VlIGh0dHBzOi8vZG9jcy5naXRodWIuY29tL3Jlc3Qvb3Jncy9zZWN1cml0eS1tYW5hZ2VycyNsaXN0LXNlY3VyaXR5LW1hbmFnZXItdGVhbXNcIlxuICAgICAgfVxuICAgIF0sXG4gICAgbGlzdFdlYmhvb2tEZWxpdmVyaWVzOiBbXCJHRVQgL29yZ3Mve29yZ30vaG9va3Mve2hvb2tfaWR9L2RlbGl2ZXJpZXNcIl0sXG4gICAgbGlzdFdlYmhvb2tzOiBbXCJHRVQgL29yZ3Mve29yZ30vaG9va3NcIl0sXG4gICAgcGluZ1dlYmhvb2s6IFtcIlBPU1QgL29yZ3Mve29yZ30vaG9va3Mve2hvb2tfaWR9L3BpbmdzXCJdLFxuICAgIHJlZGVsaXZlcldlYmhvb2tEZWxpdmVyeTogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L2hvb2tzL3tob29rX2lkfS9kZWxpdmVyaWVzL3tkZWxpdmVyeV9pZH0vYXR0ZW1wdHNcIlxuICAgIF0sXG4gICAgcmVtb3ZlTWVtYmVyOiBbXCJERUxFVEUgL29yZ3Mve29yZ30vbWVtYmVycy97dXNlcm5hbWV9XCJdLFxuICAgIHJlbW92ZU1lbWJlcnNoaXBGb3JVc2VyOiBbXCJERUxFVEUgL29yZ3Mve29yZ30vbWVtYmVyc2hpcHMve3VzZXJuYW1lfVwiXSxcbiAgICByZW1vdmVPdXRzaWRlQ29sbGFib3JhdG9yOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9vdXRzaWRlX2NvbGxhYm9yYXRvcnMve3VzZXJuYW1lfVwiXG4gICAgXSxcbiAgICByZW1vdmVQdWJsaWNNZW1iZXJzaGlwRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L3B1YmxpY19tZW1iZXJzL3t1c2VybmFtZX1cIlxuICAgIF0sXG4gICAgcmVtb3ZlU2VjdXJpdHlNYW5hZ2VyVGVhbTogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vc2VjdXJpdHktbWFuYWdlcnMvdGVhbXMve3RlYW1fc2x1Z31cIixcbiAgICAgIHt9LFxuICAgICAge1xuICAgICAgICBkZXByZWNhdGVkOiBcIm9jdG9raXQucmVzdC5vcmdzLnJlbW92ZVNlY3VyaXR5TWFuYWdlclRlYW0oKSBpcyBkZXByZWNhdGVkLCBzZWUgaHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vcmVzdC9vcmdzL3NlY3VyaXR5LW1hbmFnZXJzI3JlbW92ZS1hLXNlY3VyaXR5LW1hbmFnZXItdGVhbVwiXG4gICAgICB9XG4gICAgXSxcbiAgICByZXZpZXdQYXRHcmFudFJlcXVlc3Q6IFtcbiAgICAgIFwiUE9TVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW4tcmVxdWVzdHMve3BhdF9yZXF1ZXN0X2lkfVwiXG4gICAgXSxcbiAgICByZXZpZXdQYXRHcmFudFJlcXVlc3RzSW5CdWxrOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vcGVyc29uYWwtYWNjZXNzLXRva2VuLXJlcXVlc3RzXCJcbiAgICBdLFxuICAgIHJldm9rZUFsbE9yZ1JvbGVzVGVhbTogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vb3JnYW5pemF0aW9uLXJvbGVzL3RlYW1zL3t0ZWFtX3NsdWd9XCJcbiAgICBdLFxuICAgIHJldm9rZUFsbE9yZ1JvbGVzVXNlcjogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vb3JnYW5pemF0aW9uLXJvbGVzL3VzZXJzL3t1c2VybmFtZX1cIlxuICAgIF0sXG4gICAgcmV2b2tlT3JnUm9sZVRlYW06IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlcy90ZWFtcy97dGVhbV9zbHVnfS97cm9sZV9pZH1cIlxuICAgIF0sXG4gICAgcmV2b2tlT3JnUm9sZVVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L29yZ2FuaXphdGlvbi1yb2xlcy91c2Vycy97dXNlcm5hbWV9L3tyb2xlX2lkfVwiXG4gICAgXSxcbiAgICBzZXRJbW11dGFibGVSZWxlYXNlc1NldHRpbmdzOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9zZXR0aW5ncy9pbW11dGFibGUtcmVsZWFzZXNcIlxuICAgIF0sXG4gICAgc2V0SW1tdXRhYmxlUmVsZWFzZXNTZXR0aW5nc1JlcG9zaXRvcmllczogW1xuICAgICAgXCJQVVQgL29yZ3Mve29yZ30vc2V0dGluZ3MvaW1tdXRhYmxlLXJlbGVhc2VzL3JlcG9zaXRvcmllc1wiXG4gICAgXSxcbiAgICBzZXRNZW1iZXJzaGlwRm9yVXNlcjogW1wiUFVUIC9vcmdzL3tvcmd9L21lbWJlcnNoaXBzL3t1c2VybmFtZX1cIl0sXG4gICAgc2V0UHVibGljTWVtYmVyc2hpcEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS9wdWJsaWNfbWVtYmVycy97dXNlcm5hbWV9XCJcbiAgICBdLFxuICAgIHVuYmxvY2tVc2VyOiBbXCJERUxFVEUgL29yZ3Mve29yZ30vYmxvY2tzL3t1c2VybmFtZX1cIl0sXG4gICAgdXBkYXRlOiBbXCJQQVRDSCAvb3Jncy97b3JnfVwiXSxcbiAgICB1cGRhdGVJc3N1ZVR5cGU6IFtcIlBVVCAvb3Jncy97b3JnfS9pc3N1ZS10eXBlcy97aXNzdWVfdHlwZV9pZH1cIl0sXG4gICAgdXBkYXRlTWVtYmVyc2hpcEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBBVENIIC91c2VyL21lbWJlcnNoaXBzL29yZ3Mve29yZ31cIlxuICAgIF0sXG4gICAgdXBkYXRlUGF0QWNjZXNzOiBbXCJQT1NUIC9vcmdzL3tvcmd9L3BlcnNvbmFsLWFjY2Vzcy10b2tlbnMve3BhdF9pZH1cIl0sXG4gICAgdXBkYXRlUGF0QWNjZXNzZXM6IFtcIlBPU1QgL29yZ3Mve29yZ30vcGVyc29uYWwtYWNjZXNzLXRva2Vuc1wiXSxcbiAgICB1cGRhdGVXZWJob29rOiBbXCJQQVRDSCAvb3Jncy97b3JnfS9ob29rcy97aG9va19pZH1cIl0sXG4gICAgdXBkYXRlV2ViaG9va0NvbmZpZ0Zvck9yZzogW1wiUEFUQ0ggL29yZ3Mve29yZ30vaG9va3Mve2hvb2tfaWR9L2NvbmZpZ1wiXVxuICB9LFxuICBwYWNrYWdlczoge1xuICAgIGRlbGV0ZVBhY2thZ2VGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX1cIlxuICAgIF0sXG4gICAgZGVsZXRlUGFja2FnZUZvck9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX1cIlxuICAgIF0sXG4gICAgZGVsZXRlUGFja2FnZUZvclVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2Vycy97dXNlcm5hbWV9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVBhY2thZ2VWZXJzaW9uRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zL3twYWNrYWdlX3ZlcnNpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVBhY2thZ2VWZXJzaW9uRm9yT3JnOiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9ucy97cGFja2FnZV92ZXJzaW9uX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVQYWNrYWdlVmVyc2lvbkZvclVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2Vycy97dXNlcm5hbWV9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zL3twYWNrYWdlX3ZlcnNpb25faWR9XCJcbiAgICBdLFxuICAgIGdldEFsbFBhY2thZ2VWZXJzaW9uc0ZvckFQYWNrYWdlT3duZWRCeUFuT3JnOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9uc1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInBhY2thZ2VzXCIsIFwiZ2V0QWxsUGFja2FnZVZlcnNpb25zRm9yUGFja2FnZU93bmVkQnlPcmdcIl0gfVxuICAgIF0sXG4gICAgZ2V0QWxsUGFja2FnZVZlcnNpb25zRm9yQVBhY2thZ2VPd25lZEJ5VGhlQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zXCIsXG4gICAgICB7fSxcbiAgICAgIHtcbiAgICAgICAgcmVuYW1lZDogW1xuICAgICAgICAgIFwicGFja2FnZXNcIixcbiAgICAgICAgICBcImdldEFsbFBhY2thZ2VWZXJzaW9uc0ZvclBhY2thZ2VPd25lZEJ5QXV0aGVudGljYXRlZFVzZXJcIlxuICAgICAgICBdXG4gICAgICB9XG4gICAgXSxcbiAgICBnZXRBbGxQYWNrYWdlVmVyc2lvbnNGb3JQYWNrYWdlT3duZWRCeUF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9uc1wiXG4gICAgXSxcbiAgICBnZXRBbGxQYWNrYWdlVmVyc2lvbnNGb3JQYWNrYWdlT3duZWRCeU9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnNcIlxuICAgIF0sXG4gICAgZ2V0QWxsUGFja2FnZVZlcnNpb25zRm9yUGFja2FnZU93bmVkQnlVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9uc1wiXG4gICAgXSxcbiAgICBnZXRQYWNrYWdlRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiR0VUIC91c2VyL3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9XCJcbiAgICBdLFxuICAgIGdldFBhY2thZ2VGb3JPcmdhbml6YXRpb246IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9XCJcbiAgICBdLFxuICAgIGdldFBhY2thZ2VGb3JVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfVwiXG4gICAgXSxcbiAgICBnZXRQYWNrYWdlVmVyc2lvbkZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9ucy97cGFja2FnZV92ZXJzaW9uX2lkfVwiXG4gICAgXSxcbiAgICBnZXRQYWNrYWdlVmVyc2lvbkZvck9yZ2FuaXphdGlvbjogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnMve3BhY2thZ2VfdmVyc2lvbl9pZH1cIlxuICAgIF0sXG4gICAgZ2V0UGFja2FnZVZlcnNpb25Gb3JVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9ucy97cGFja2FnZV92ZXJzaW9uX2lkfVwiXG4gICAgXSxcbiAgICBsaXN0RG9ja2VyTWlncmF0aW9uQ29uZmxpY3RpbmdQYWNrYWdlc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9kb2NrZXIvY29uZmxpY3RzXCJcbiAgICBdLFxuICAgIGxpc3REb2NrZXJNaWdyYXRpb25Db25mbGljdGluZ1BhY2thZ2VzRm9yT3JnYW5pemF0aW9uOiBbXG4gICAgICBcIkdFVCAvb3Jncy97b3JnfS9kb2NrZXIvY29uZmxpY3RzXCJcbiAgICBdLFxuICAgIGxpc3REb2NrZXJNaWdyYXRpb25Db25mbGljdGluZ1BhY2thZ2VzRm9yVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZG9ja2VyL2NvbmZsaWN0c1wiXG4gICAgXSxcbiAgICBsaXN0UGFja2FnZXNGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL3BhY2thZ2VzXCJdLFxuICAgIGxpc3RQYWNrYWdlc0Zvck9yZ2FuaXphdGlvbjogW1wiR0VUIC9vcmdzL3tvcmd9L3BhY2thZ2VzXCJdLFxuICAgIGxpc3RQYWNrYWdlc0ZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wYWNrYWdlc1wiXSxcbiAgICByZXN0b3JlUGFja2FnZUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIlBPU1QgL3VzZXIvcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vcmVzdG9yZXs/dG9rZW59XCJcbiAgICBdLFxuICAgIHJlc3RvcmVQYWNrYWdlRm9yT3JnOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vcmVzdG9yZXs/dG9rZW59XCJcbiAgICBdLFxuICAgIHJlc3RvcmVQYWNrYWdlRm9yVXNlcjogW1xuICAgICAgXCJQT1NUIC91c2Vycy97dXNlcm5hbWV9L3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3Jlc3RvcmV7P3Rva2VufVwiXG4gICAgXSxcbiAgICByZXN0b3JlUGFja2FnZVZlcnNpb25Gb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQT1NUIC91c2VyL3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zL3twYWNrYWdlX3ZlcnNpb25faWR9L3Jlc3RvcmVcIlxuICAgIF0sXG4gICAgcmVzdG9yZVBhY2thZ2VWZXJzaW9uRm9yT3JnOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnMve3BhY2thZ2VfdmVyc2lvbl9pZH0vcmVzdG9yZVwiXG4gICAgXSxcbiAgICByZXN0b3JlUGFja2FnZVZlcnNpb25Gb3JVc2VyOiBbXG4gICAgICBcIlBPU1QgL3VzZXJzL3t1c2VybmFtZX0vcGFja2FnZXMve3BhY2thZ2VfdHlwZX0ve3BhY2thZ2VfbmFtZX0vdmVyc2lvbnMve3BhY2thZ2VfdmVyc2lvbl9pZH0vcmVzdG9yZVwiXG4gICAgXVxuICB9LFxuICBwcml2YXRlUmVnaXN0cmllczoge1xuICAgIGNyZWF0ZU9yZ1ByaXZhdGVSZWdpc3RyeTogW1wiUE9TVCAvb3Jncy97b3JnfS9wcml2YXRlLXJlZ2lzdHJpZXNcIl0sXG4gICAgZGVsZXRlT3JnUHJpdmF0ZVJlZ2lzdHJ5OiBbXG4gICAgICBcIkRFTEVURSAvb3Jncy97b3JnfS9wcml2YXRlLXJlZ2lzdHJpZXMve3NlY3JldF9uYW1lfVwiXG4gICAgXSxcbiAgICBnZXRPcmdQcml2YXRlUmVnaXN0cnk6IFtcIkdFVCAvb3Jncy97b3JnfS9wcml2YXRlLXJlZ2lzdHJpZXMve3NlY3JldF9uYW1lfVwiXSxcbiAgICBnZXRPcmdQdWJsaWNLZXk6IFtcIkdFVCAvb3Jncy97b3JnfS9wcml2YXRlLXJlZ2lzdHJpZXMvcHVibGljLWtleVwiXSxcbiAgICBsaXN0T3JnUHJpdmF0ZVJlZ2lzdHJpZXM6IFtcIkdFVCAvb3Jncy97b3JnfS9wcml2YXRlLXJlZ2lzdHJpZXNcIl0sXG4gICAgdXBkYXRlT3JnUHJpdmF0ZVJlZ2lzdHJ5OiBbXG4gICAgICBcIlBBVENIIC9vcmdzL3tvcmd9L3ByaXZhdGUtcmVnaXN0cmllcy97c2VjcmV0X25hbWV9XCJcbiAgICBdXG4gIH0sXG4gIHByb2plY3RzOiB7XG4gICAgYWRkSXRlbUZvck9yZzogW1wiUE9TVCAvb3Jncy97b3JnfS9wcm9qZWN0c1YyL3twcm9qZWN0X251bWJlcn0vaXRlbXNcIl0sXG4gICAgYWRkSXRlbUZvclVzZXI6IFtcbiAgICAgIFwiUE9TVCAvdXNlcnMve3VzZXJuYW1lfS9wcm9qZWN0c1YyL3twcm9qZWN0X251bWJlcn0vaXRlbXNcIlxuICAgIF0sXG4gICAgZGVsZXRlSXRlbUZvck9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vcHJvamVjdHNWMi97cHJvamVjdF9udW1iZXJ9L2l0ZW1zL3tpdGVtX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVJdGVtRm9yVXNlcjogW1xuICAgICAgXCJERUxFVEUgL3VzZXJzL3t1c2VybmFtZX0vcHJvamVjdHNWMi97cHJvamVjdF9udW1iZXJ9L2l0ZW1zL3tpdGVtX2lkfVwiXG4gICAgXSxcbiAgICBnZXRGaWVsZEZvck9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vcHJvamVjdHNWMi97cHJvamVjdF9udW1iZXJ9L2ZpZWxkcy97ZmllbGRfaWR9XCJcbiAgICBdLFxuICAgIGdldEZpZWxkRm9yVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcHJvamVjdHNWMi97cHJvamVjdF9udW1iZXJ9L2ZpZWxkcy97ZmllbGRfaWR9XCJcbiAgICBdLFxuICAgIGdldEZvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L3Byb2plY3RzVjIve3Byb2plY3RfbnVtYmVyfVwiXSxcbiAgICBnZXRGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcHJvamVjdHNWMi97cHJvamVjdF9udW1iZXJ9XCJdLFxuICAgIGdldE9yZ0l0ZW06IFtcIkdFVCAvb3Jncy97b3JnfS9wcm9qZWN0c1YyL3twcm9qZWN0X251bWJlcn0vaXRlbXMve2l0ZW1faWR9XCJdLFxuICAgIGdldFVzZXJJdGVtOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wcm9qZWN0c1YyL3twcm9qZWN0X251bWJlcn0vaXRlbXMve2l0ZW1faWR9XCJcbiAgICBdLFxuICAgIGxpc3RGaWVsZHNGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9wcm9qZWN0c1YyL3twcm9qZWN0X251bWJlcn0vZmllbGRzXCJdLFxuICAgIGxpc3RGaWVsZHNGb3JVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wcm9qZWN0c1YyL3twcm9qZWN0X251bWJlcn0vZmllbGRzXCJcbiAgICBdLFxuICAgIGxpc3RGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9wcm9qZWN0c1YyXCJdLFxuICAgIGxpc3RGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcHJvamVjdHNWMlwiXSxcbiAgICBsaXN0SXRlbXNGb3JPcmc6IFtcIkdFVCAvb3Jncy97b3JnfS9wcm9qZWN0c1YyL3twcm9qZWN0X251bWJlcn0vaXRlbXNcIl0sXG4gICAgbGlzdEl0ZW1zRm9yVXNlcjogW1xuICAgICAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcHJvamVjdHNWMi97cHJvamVjdF9udW1iZXJ9L2l0ZW1zXCJcbiAgICBdLFxuICAgIHVwZGF0ZUl0ZW1Gb3JPcmc6IFtcbiAgICAgIFwiUEFUQ0ggL29yZ3Mve29yZ30vcHJvamVjdHNWMi97cHJvamVjdF9udW1iZXJ9L2l0ZW1zL3tpdGVtX2lkfVwiXG4gICAgXSxcbiAgICB1cGRhdGVJdGVtRm9yVXNlcjogW1xuICAgICAgXCJQQVRDSCAvdXNlcnMve3VzZXJuYW1lfS9wcm9qZWN0c1YyL3twcm9qZWN0X251bWJlcn0vaXRlbXMve2l0ZW1faWR9XCJcbiAgICBdXG4gIH0sXG4gIHB1bGxzOiB7XG4gICAgY2hlY2tJZk1lcmdlZDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L21lcmdlXCJdLFxuICAgIGNyZWF0ZTogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHNcIl0sXG4gICAgY3JlYXRlUmVwbHlGb3JSZXZpZXdDb21tZW50OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vY29tbWVudHMve2NvbW1lbnRfaWR9L3JlcGxpZXNcIlxuICAgIF0sXG4gICAgY3JlYXRlUmV2aWV3OiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3Jldmlld3NcIl0sXG4gICAgY3JlYXRlUmV2aWV3Q29tbWVudDogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L2NvbW1lbnRzXCJcbiAgICBdLFxuICAgIGRlbGV0ZVBlbmRpbmdSZXZpZXc6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3Jldmlld3Mve3Jldmlld19pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlUmV2aWV3Q29tbWVudDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL2NvbW1lbnRzL3tjb21tZW50X2lkfVwiXG4gICAgXSxcbiAgICBkaXNtaXNzUmV2aWV3OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9yZXZpZXdzL3tyZXZpZXdfaWR9L2Rpc21pc3NhbHNcIlxuICAgIF0sXG4gICAgZ2V0OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn1cIl0sXG4gICAgZ2V0UmV2aWV3OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9yZXZpZXdzL3tyZXZpZXdfaWR9XCJcbiAgICBdLFxuICAgIGdldFJldmlld0NvbW1lbnQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMvY29tbWVudHMve2NvbW1lbnRfaWR9XCJdLFxuICAgIGxpc3Q6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHNcIl0sXG4gICAgbGlzdENvbW1lbnRzRm9yUmV2aWV3OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9yZXZpZXdzL3tyZXZpZXdfaWR9L2NvbW1lbnRzXCJcbiAgICBdLFxuICAgIGxpc3RDb21taXRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vY29tbWl0c1wiXSxcbiAgICBsaXN0RmlsZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9maWxlc1wiXSxcbiAgICBsaXN0UmVxdWVzdGVkUmV2aWV3ZXJzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9yZXF1ZXN0ZWRfcmV2aWV3ZXJzXCJcbiAgICBdLFxuICAgIGxpc3RSZXZpZXdDb21tZW50czogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vY29tbWVudHNcIlxuICAgIF0sXG4gICAgbGlzdFJldmlld0NvbW1lbnRzRm9yUmVwbzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy9jb21tZW50c1wiXSxcbiAgICBsaXN0UmV2aWV3czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3Jldmlld3NcIl0sXG4gICAgbWVyZ2U6IFtcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9tZXJnZVwiXSxcbiAgICByZW1vdmVSZXF1ZXN0ZWRSZXZpZXdlcnM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3JlcXVlc3RlZF9yZXZpZXdlcnNcIlxuICAgIF0sXG4gICAgcmVxdWVzdFJldmlld2VyczogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3JlcXVlc3RlZF9yZXZpZXdlcnNcIlxuICAgIF0sXG4gICAgc3VibWl0UmV2aWV3OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vcmV2aWV3cy97cmV2aWV3X2lkfS9ldmVudHNcIlxuICAgIF0sXG4gICAgdXBkYXRlOiBbXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfVwiXSxcbiAgICB1cGRhdGVCcmFuY2g6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3VwZGF0ZS1icmFuY2hcIlxuICAgIF0sXG4gICAgdXBkYXRlUmV2aWV3OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9yZXZpZXdzL3tyZXZpZXdfaWR9XCJcbiAgICBdLFxuICAgIHVwZGF0ZVJldmlld0NvbW1lbnQ6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL2NvbW1lbnRzL3tjb21tZW50X2lkfVwiXG4gICAgXVxuICB9LFxuICByYXRlTGltaXQ6IHsgZ2V0OiBbXCJHRVQgL3JhdGVfbGltaXRcIl0gfSxcbiAgcmVhY3Rpb25zOiB7XG4gICAgY3JlYXRlRm9yQ29tbWl0Q29tbWVudDogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21tZW50cy97Y29tbWVudF9pZH0vcmVhY3Rpb25zXCJcbiAgICBdLFxuICAgIGNyZWF0ZUZvcklzc3VlOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9yZWFjdGlvbnNcIlxuICAgIF0sXG4gICAgY3JlYXRlRm9ySXNzdWVDb21tZW50OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy9jb21tZW50cy97Y29tbWVudF9pZH0vcmVhY3Rpb25zXCJcbiAgICBdLFxuICAgIGNyZWF0ZUZvclB1bGxSZXF1ZXN0UmV2aWV3Q29tbWVudDogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy9jb21tZW50cy97Y29tbWVudF9pZH0vcmVhY3Rpb25zXCJcbiAgICBdLFxuICAgIGNyZWF0ZUZvclJlbGVhc2U6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMve3JlbGVhc2VfaWR9L3JlYWN0aW9uc1wiXG4gICAgXSxcbiAgICBjcmVhdGVGb3JUZWFtRGlzY3Vzc2lvbkNvbW1lbnRJbk9yZzogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vY29tbWVudHMve2NvbW1lbnRfbnVtYmVyfS9yZWFjdGlvbnNcIlxuICAgIF0sXG4gICAgY3JlYXRlRm9yVGVhbURpc2N1c3Npb25Jbk9yZzogW1xuICAgICAgXCJQT1NUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vcmVhY3Rpb25zXCJcbiAgICBdLFxuICAgIGRlbGV0ZUZvckNvbW1pdENvbW1lbnQ6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21tZW50cy97Y29tbWVudF9pZH0vcmVhY3Rpb25zL3tyZWFjdGlvbl9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlRm9ySXNzdWU6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vcmVhY3Rpb25zL3tyZWFjdGlvbl9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlRm9ySXNzdWVDb21tZW50OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL2NvbW1lbnRzL3tjb21tZW50X2lkfS9yZWFjdGlvbnMve3JlYWN0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVGb3JQdWxsUmVxdWVzdENvbW1lbnQ6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy9jb21tZW50cy97Y29tbWVudF9pZH0vcmVhY3Rpb25zL3tyZWFjdGlvbl9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlRm9yUmVsZWFzZTogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL3tyZWxlYXNlX2lkfS9yZWFjdGlvbnMve3JlYWN0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVGb3JUZWFtRGlzY3Vzc2lvbjogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9yZWFjdGlvbnMve3JlYWN0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVGb3JUZWFtRGlzY3Vzc2lvbkNvbW1lbnQ6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vY29tbWVudHMve2NvbW1lbnRfbnVtYmVyfS9yZWFjdGlvbnMve3JlYWN0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBsaXN0Rm9yQ29tbWl0Q29tbWVudDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1lbnRzL3tjb21tZW50X2lkfS9yZWFjdGlvbnNcIlxuICAgIF0sXG4gICAgbGlzdEZvcklzc3VlOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9yZWFjdGlvbnNcIl0sXG4gICAgbGlzdEZvcklzc3VlQ29tbWVudDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy9jb21tZW50cy97Y29tbWVudF9pZH0vcmVhY3Rpb25zXCJcbiAgICBdLFxuICAgIGxpc3RGb3JQdWxsUmVxdWVzdFJldmlld0NvbW1lbnQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy9jb21tZW50cy97Y29tbWVudF9pZH0vcmVhY3Rpb25zXCJcbiAgICBdLFxuICAgIGxpc3RGb3JSZWxlYXNlOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMve3JlbGVhc2VfaWR9L3JlYWN0aW9uc1wiXG4gICAgXSxcbiAgICBsaXN0Rm9yVGVhbURpc2N1c3Npb25Db21tZW50SW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vY29tbWVudHMve2NvbW1lbnRfbnVtYmVyfS9yZWFjdGlvbnNcIlxuICAgIF0sXG4gICAgbGlzdEZvclRlYW1EaXNjdXNzaW9uSW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vcmVhY3Rpb25zXCJcbiAgICBdXG4gIH0sXG4gIHJlcG9zOiB7XG4gICAgYWNjZXB0SW52aXRhdGlvbjogW1xuICAgICAgXCJQQVRDSCAvdXNlci9yZXBvc2l0b3J5X2ludml0YXRpb25zL3tpbnZpdGF0aW9uX2lkfVwiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInJlcG9zXCIsIFwiYWNjZXB0SW52aXRhdGlvbkZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGFjY2VwdEludml0YXRpb25Gb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJQQVRDSCAvdXNlci9yZXBvc2l0b3J5X2ludml0YXRpb25zL3tpbnZpdGF0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBhZGRBcHBBY2Nlc3NSZXN0cmljdGlvbnM6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvYXBwc1wiLFxuICAgICAge30sXG4gICAgICB7IG1hcFRvRGF0YTogXCJhcHBzXCIgfVxuICAgIF0sXG4gICAgYWRkQ29sbGFib3JhdG9yOiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbGxhYm9yYXRvcnMve3VzZXJuYW1lfVwiXSxcbiAgICBhZGRTdGF0dXNDaGVja0NvbnRleHRzOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfc3RhdHVzX2NoZWNrcy9jb250ZXh0c1wiLFxuICAgICAge30sXG4gICAgICB7IG1hcFRvRGF0YTogXCJjb250ZXh0c1wiIH1cbiAgICBdLFxuICAgIGFkZFRlYW1BY2Nlc3NSZXN0cmljdGlvbnM6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvdGVhbXNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwidGVhbXNcIiB9XG4gICAgXSxcbiAgICBhZGRVc2VyQWNjZXNzUmVzdHJpY3Rpb25zOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVzdHJpY3Rpb25zL3VzZXJzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgbWFwVG9EYXRhOiBcInVzZXJzXCIgfVxuICAgIF0sXG4gICAgY2FuY2VsUGFnZXNEZXBsb3ltZW50OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzL2RlcGxveW1lbnRzL3twYWdlc19kZXBsb3ltZW50X2lkfS9jYW5jZWxcIlxuICAgIF0sXG4gICAgY2hlY2tBdXRvbWF0ZWRTZWN1cml0eUZpeGVzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYXV0b21hdGVkLXNlY3VyaXR5LWZpeGVzXCJcbiAgICBdLFxuICAgIGNoZWNrQ29sbGFib3JhdG9yOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbGxhYm9yYXRvcnMve3VzZXJuYW1lfVwiXSxcbiAgICBjaGVja0ltbXV0YWJsZVJlbGVhc2VzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2ltbXV0YWJsZS1yZWxlYXNlc1wiXSxcbiAgICBjaGVja1ByaXZhdGVWdWxuZXJhYmlsaXR5UmVwb3J0aW5nOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHJpdmF0ZS12dWxuZXJhYmlsaXR5LXJlcG9ydGluZ1wiXG4gICAgXSxcbiAgICBjaGVja1Z1bG5lcmFiaWxpdHlBbGVydHM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS92dWxuZXJhYmlsaXR5LWFsZXJ0c1wiXG4gICAgXSxcbiAgICBjb2Rlb3duZXJzRXJyb3JzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGVvd25lcnMvZXJyb3JzXCJdLFxuICAgIGNvbXBhcmVDb21taXRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbXBhcmUve2Jhc2V9Li4ue2hlYWR9XCJdLFxuICAgIGNvbXBhcmVDb21taXRzV2l0aEJhc2VoZWFkOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tcGFyZS97YmFzZWhlYWR9XCJcbiAgICBdLFxuICAgIGNyZWF0ZUF0dGVzdGF0aW9uOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hdHRlc3RhdGlvbnNcIl0sXG4gICAgY3JlYXRlQXV0b2xpbms6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2F1dG9saW5rc1wiXSxcbiAgICBjcmVhdGVDb21taXRDb21tZW50OiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve2NvbW1pdF9zaGF9L2NvbW1lbnRzXCJcbiAgICBdLFxuICAgIGNyZWF0ZUNvbW1pdFNpZ25hdHVyZVByb3RlY3Rpb246IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXF1aXJlZF9zaWduYXR1cmVzXCJcbiAgICBdLFxuICAgIGNyZWF0ZUNvbW1pdFN0YXR1czogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3RhdHVzZXMve3NoYX1cIl0sXG4gICAgY3JlYXRlRGVwbG95S2V5OiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9rZXlzXCJdLFxuICAgIGNyZWF0ZURlcGxveW1lbnQ6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGxveW1lbnRzXCJdLFxuICAgIGNyZWF0ZURlcGxveW1lbnRCcmFuY2hQb2xpY3k6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50LWJyYW5jaC1wb2xpY2llc1wiXG4gICAgXSxcbiAgICBjcmVhdGVEZXBsb3ltZW50UHJvdGVjdGlvblJ1bGU6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50X3Byb3RlY3Rpb25fcnVsZXNcIlxuICAgIF0sXG4gICAgY3JlYXRlRGVwbG95bWVudFN0YXR1czogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBsb3ltZW50cy97ZGVwbG95bWVudF9pZH0vc3RhdHVzZXNcIlxuICAgIF0sXG4gICAgY3JlYXRlRGlzcGF0Y2hFdmVudDogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGlzcGF0Y2hlc1wiXSxcbiAgICBjcmVhdGVGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUE9TVCAvdXNlci9yZXBvc1wiXSxcbiAgICBjcmVhdGVGb3JrOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9mb3Jrc1wiXSxcbiAgICBjcmVhdGVJbk9yZzogW1wiUE9TVCAvb3Jncy97b3JnfS9yZXBvc1wiXSxcbiAgICBjcmVhdGVPclVwZGF0ZUVudmlyb25tZW50OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfVwiXG4gICAgXSxcbiAgICBjcmVhdGVPclVwZGF0ZUZpbGVDb250ZW50czogW1wiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb250ZW50cy97cGF0aH1cIl0sXG4gICAgY3JlYXRlT3JnUnVsZXNldDogW1wiUE9TVCAvb3Jncy97b3JnfS9ydWxlc2V0c1wiXSxcbiAgICBjcmVhdGVQYWdlc0RlcGxveW1lbnQ6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzL2RlcGxveW1lbnRzXCJdLFxuICAgIGNyZWF0ZVBhZ2VzU2l0ZTogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcGFnZXNcIl0sXG4gICAgY3JlYXRlUmVsZWFzZTogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXNcIl0sXG4gICAgY3JlYXRlUmVwb1J1bGVzZXQ6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzZXRzXCJdLFxuICAgIGNyZWF0ZVVzaW5nVGVtcGxhdGU6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve3RlbXBsYXRlX293bmVyfS97dGVtcGxhdGVfcmVwb30vZ2VuZXJhdGVcIlxuICAgIF0sXG4gICAgY3JlYXRlV2ViaG9vazogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3NcIl0sXG4gICAgY3VzdG9tUHJvcGVydGllc0ZvclJlcG9zQ3JlYXRlT3JVcGRhdGVSZXBvc2l0b3J5VmFsdWVzOiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wcm9wZXJ0aWVzL3ZhbHVlc1wiXG4gICAgXSxcbiAgICBjdXN0b21Qcm9wZXJ0aWVzRm9yUmVwb3NHZXRSZXBvc2l0b3J5VmFsdWVzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHJvcGVydGllcy92YWx1ZXNcIlxuICAgIF0sXG4gICAgZGVjbGluZUludml0YXRpb246IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL3JlcG9zaXRvcnlfaW52aXRhdGlvbnMve2ludml0YXRpb25faWR9XCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wicmVwb3NcIiwgXCJkZWNsaW5lSW52aXRhdGlvbkZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGRlY2xpbmVJbnZpdGF0aW9uRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiREVMRVRFIC91c2VyL3JlcG9zaXRvcnlfaW52aXRhdGlvbnMve2ludml0YXRpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZTogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfVwiXSxcbiAgICBkZWxldGVBY2Nlc3NSZXN0cmljdGlvbnM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3Jlc3RyaWN0aW9uc1wiXG4gICAgXSxcbiAgICBkZWxldGVBZG1pbkJyYW5jaFByb3RlY3Rpb246IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL2VuZm9yY2VfYWRtaW5zXCJcbiAgICBdLFxuICAgIGRlbGV0ZUFuRW52aXJvbm1lbnQ6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUF1dG9saW5rOiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2F1dG9saW5rcy97YXV0b2xpbmtfaWR9XCJdLFxuICAgIGRlbGV0ZUJyYW5jaFByb3RlY3Rpb246IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uXCJcbiAgICBdLFxuICAgIGRlbGV0ZUNvbW1pdENvbW1lbnQ6IFtcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWVudHMve2NvbW1lbnRfaWR9XCJdLFxuICAgIGRlbGV0ZUNvbW1pdFNpZ25hdHVyZVByb3RlY3Rpb246IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3NpZ25hdHVyZXNcIlxuICAgIF0sXG4gICAgZGVsZXRlRGVwbG95S2V5OiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2tleXMve2tleV9pZH1cIl0sXG4gICAgZGVsZXRlRGVwbG95bWVudDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGxveW1lbnRzL3tkZXBsb3ltZW50X2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVEZXBsb3ltZW50QnJhbmNoUG9saWN5OiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50LWJyYW5jaC1wb2xpY2llcy97YnJhbmNoX3BvbGljeV9pZH1cIlxuICAgIF0sXG4gICAgZGVsZXRlRmlsZTogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb250ZW50cy97cGF0aH1cIl0sXG4gICAgZGVsZXRlSW52aXRhdGlvbjogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2ludml0YXRpb25zL3tpbnZpdGF0aW9uX2lkfVwiXG4gICAgXSxcbiAgICBkZWxldGVPcmdSdWxlc2V0OiBbXCJERUxFVEUgL29yZ3Mve29yZ30vcnVsZXNldHMve3J1bGVzZXRfaWR9XCJdLFxuICAgIGRlbGV0ZVBhZ2VzU2l0ZTogW1wiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlc1wiXSxcbiAgICBkZWxldGVQdWxsUmVxdWVzdFJldmlld1Byb3RlY3Rpb246IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3B1bGxfcmVxdWVzdF9yZXZpZXdzXCJcbiAgICBdLFxuICAgIGRlbGV0ZVJlbGVhc2U6IFtcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMve3JlbGVhc2VfaWR9XCJdLFxuICAgIGRlbGV0ZVJlbGVhc2VBc3NldDogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL2Fzc2V0cy97YXNzZXRfaWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZVJlcG9SdWxlc2V0OiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzZXRzL3tydWxlc2V0X2lkfVwiXSxcbiAgICBkZWxldGVXZWJob29rOiBbXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfVwiXSxcbiAgICBkaXNhYmxlQXV0b21hdGVkU2VjdXJpdHlGaXhlczogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2F1dG9tYXRlZC1zZWN1cml0eS1maXhlc1wiXG4gICAgXSxcbiAgICBkaXNhYmxlRGVwbG95bWVudFByb3RlY3Rpb25SdWxlOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50X3Byb3RlY3Rpb25fcnVsZXMve3Byb3RlY3Rpb25fcnVsZV9pZH1cIlxuICAgIF0sXG4gICAgZGlzYWJsZUltbXV0YWJsZVJlbGVhc2VzOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vaW1tdXRhYmxlLXJlbGVhc2VzXCJcbiAgICBdLFxuICAgIGRpc2FibGVQcml2YXRlVnVsbmVyYWJpbGl0eVJlcG9ydGluZzogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L3ByaXZhdGUtdnVsbmVyYWJpbGl0eS1yZXBvcnRpbmdcIlxuICAgIF0sXG4gICAgZGlzYWJsZVZ1bG5lcmFiaWxpdHlBbGVydHM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS92dWxuZXJhYmlsaXR5LWFsZXJ0c1wiXG4gICAgXSxcbiAgICBkb3dubG9hZEFyY2hpdmU6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS96aXBiYWxsL3tyZWZ9XCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wicmVwb3NcIiwgXCJkb3dubG9hZFppcGJhbGxBcmNoaXZlXCJdIH1cbiAgICBdLFxuICAgIGRvd25sb2FkVGFyYmFsbEFyY2hpdmU6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdGFyYmFsbC97cmVmfVwiXSxcbiAgICBkb3dubG9hZFppcGJhbGxBcmNoaXZlOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3ppcGJhbGwve3JlZn1cIl0sXG4gICAgZW5hYmxlQXV0b21hdGVkU2VjdXJpdHlGaXhlczogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2F1dG9tYXRlZC1zZWN1cml0eS1maXhlc1wiXG4gICAgXSxcbiAgICBlbmFibGVJbW11dGFibGVSZWxlYXNlczogW1wiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbW11dGFibGUtcmVsZWFzZXNcIl0sXG4gICAgZW5hYmxlUHJpdmF0ZVZ1bG5lcmFiaWxpdHlSZXBvcnRpbmc6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wcml2YXRlLXZ1bG5lcmFiaWxpdHktcmVwb3J0aW5nXCJcbiAgICBdLFxuICAgIGVuYWJsZVZ1bG5lcmFiaWxpdHlBbGVydHM6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS92dWxuZXJhYmlsaXR5LWFsZXJ0c1wiXG4gICAgXSxcbiAgICBnZW5lcmF0ZVJlbGVhc2VOb3RlczogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy9nZW5lcmF0ZS1ub3Rlc1wiXG4gICAgXSxcbiAgICBnZXQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb31cIl0sXG4gICAgZ2V0QWNjZXNzUmVzdHJpY3Rpb25zOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnNcIlxuICAgIF0sXG4gICAgZ2V0QWRtaW5CcmFuY2hQcm90ZWN0aW9uOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9lbmZvcmNlX2FkbWluc1wiXG4gICAgXSxcbiAgICBnZXRBbGxEZXBsb3ltZW50UHJvdGVjdGlvblJ1bGVzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50X3Byb3RlY3Rpb25fcnVsZXNcIlxuICAgIF0sXG4gICAgZ2V0QWxsRW52aXJvbm1lbnRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50c1wiXSxcbiAgICBnZXRBbGxTdGF0dXNDaGVja0NvbnRleHRzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXF1aXJlZF9zdGF0dXNfY2hlY2tzL2NvbnRleHRzXCJcbiAgICBdLFxuICAgIGdldEFsbFRvcGljczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS90b3BpY3NcIl0sXG4gICAgZ2V0QXBwc1dpdGhBY2Nlc3NUb1Byb3RlY3RlZEJyYW5jaDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVzdHJpY3Rpb25zL2FwcHNcIlxuICAgIF0sXG4gICAgZ2V0QXV0b2xpbms6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYXV0b2xpbmtzL3thdXRvbGlua19pZH1cIl0sXG4gICAgZ2V0QnJhbmNoOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9XCJdLFxuICAgIGdldEJyYW5jaFByb3RlY3Rpb246IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uXCJcbiAgICBdLFxuICAgIGdldEJyYW5jaFJ1bGVzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzL2JyYW5jaGVzL3ticmFuY2h9XCJdLFxuICAgIGdldENsb25lczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS90cmFmZmljL2Nsb25lc1wiXSxcbiAgICBnZXRDb2RlRnJlcXVlbmN5U3RhdHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3RhdHMvY29kZV9mcmVxdWVuY3lcIl0sXG4gICAgZ2V0Q29sbGFib3JhdG9yUGVybWlzc2lvbkxldmVsOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29sbGFib3JhdG9ycy97dXNlcm5hbWV9L3Blcm1pc3Npb25cIlxuICAgIF0sXG4gICAgZ2V0Q29tYmluZWRTdGF0dXNGb3JSZWY6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97cmVmfS9zdGF0dXNcIl0sXG4gICAgZ2V0Q29tbWl0OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve3JlZn1cIl0sXG4gICAgZ2V0Q29tbWl0QWN0aXZpdHlTdGF0czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zdGF0cy9jb21taXRfYWN0aXZpdHlcIl0sXG4gICAgZ2V0Q29tbWl0Q29tbWVudDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21tZW50cy97Y29tbWVudF9pZH1cIl0sXG4gICAgZ2V0Q29tbWl0U2lnbmF0dXJlUHJvdGVjdGlvbjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfc2lnbmF0dXJlc1wiXG4gICAgXSxcbiAgICBnZXRDb21tdW5pdHlQcm9maWxlTWV0cmljczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21tdW5pdHkvcHJvZmlsZVwiXSxcbiAgICBnZXRDb250ZW50OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbnRlbnRzL3twYXRofVwiXSxcbiAgICBnZXRDb250cmlidXRvcnNTdGF0czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zdGF0cy9jb250cmlidXRvcnNcIl0sXG4gICAgZ2V0Q3VzdG9tRGVwbG95bWVudFByb3RlY3Rpb25SdWxlOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50X3Byb3RlY3Rpb25fcnVsZXMve3Byb3RlY3Rpb25fcnVsZV9pZH1cIlxuICAgIF0sXG4gICAgZ2V0RGVwbG95S2V5OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2tleXMve2tleV9pZH1cIl0sXG4gICAgZ2V0RGVwbG95bWVudDogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBsb3ltZW50cy97ZGVwbG95bWVudF9pZH1cIl0sXG4gICAgZ2V0RGVwbG95bWVudEJyYW5jaFBvbGljeTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vZGVwbG95bWVudC1icmFuY2gtcG9saWNpZXMve2JyYW5jaF9wb2xpY3lfaWR9XCJcbiAgICBdLFxuICAgIGdldERlcGxveW1lbnRTdGF0dXM6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBsb3ltZW50cy97ZGVwbG95bWVudF9pZH0vc3RhdHVzZXMve3N0YXR1c19pZH1cIlxuICAgIF0sXG4gICAgZ2V0RW52aXJvbm1lbnQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9XCJcbiAgICBdLFxuICAgIGdldExhdGVzdFBhZ2VzQnVpbGQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcGFnZXMvYnVpbGRzL2xhdGVzdFwiXSxcbiAgICBnZXRMYXRlc3RSZWxlYXNlOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL2xhdGVzdFwiXSxcbiAgICBnZXRPcmdSdWxlU3VpdGU6IFtcIkdFVCAvb3Jncy97b3JnfS9ydWxlc2V0cy9ydWxlLXN1aXRlcy97cnVsZV9zdWl0ZV9pZH1cIl0sXG4gICAgZ2V0T3JnUnVsZVN1aXRlczogW1wiR0VUIC9vcmdzL3tvcmd9L3J1bGVzZXRzL3J1bGUtc3VpdGVzXCJdLFxuICAgIGdldE9yZ1J1bGVzZXQ6IFtcIkdFVCAvb3Jncy97b3JnfS9ydWxlc2V0cy97cnVsZXNldF9pZH1cIl0sXG4gICAgZ2V0T3JnUnVsZXNldHM6IFtcIkdFVCAvb3Jncy97b3JnfS9ydWxlc2V0c1wiXSxcbiAgICBnZXRQYWdlczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlc1wiXSxcbiAgICBnZXRQYWdlc0J1aWxkOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzL2J1aWxkcy97YnVpbGRfaWR9XCJdLFxuICAgIGdldFBhZ2VzRGVwbG95bWVudDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzL2RlcGxveW1lbnRzL3twYWdlc19kZXBsb3ltZW50X2lkfVwiXG4gICAgXSxcbiAgICBnZXRQYWdlc0hlYWx0aENoZWNrOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzL2hlYWx0aFwiXSxcbiAgICBnZXRQYXJ0aWNpcGF0aW9uU3RhdHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3RhdHMvcGFydGljaXBhdGlvblwiXSxcbiAgICBnZXRQdWxsUmVxdWVzdFJldmlld1Byb3RlY3Rpb246IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3B1bGxfcmVxdWVzdF9yZXZpZXdzXCJcbiAgICBdLFxuICAgIGdldFB1bmNoQ2FyZFN0YXRzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3N0YXRzL3B1bmNoX2NhcmRcIl0sXG4gICAgZ2V0UmVhZG1lOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlYWRtZVwiXSxcbiAgICBnZXRSZWFkbWVJbkRpcmVjdG9yeTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWFkbWUve2Rpcn1cIl0sXG4gICAgZ2V0UmVsZWFzZTogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy97cmVsZWFzZV9pZH1cIl0sXG4gICAgZ2V0UmVsZWFzZUFzc2V0OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL2Fzc2V0cy97YXNzZXRfaWR9XCJdLFxuICAgIGdldFJlbGVhc2VCeVRhZzogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9yZWxlYXNlcy90YWdzL3t0YWd9XCJdLFxuICAgIGdldFJlcG9SdWxlU3VpdGU6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ydWxlc2V0cy9ydWxlLXN1aXRlcy97cnVsZV9zdWl0ZV9pZH1cIlxuICAgIF0sXG4gICAgZ2V0UmVwb1J1bGVTdWl0ZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXNldHMvcnVsZS1zdWl0ZXNcIl0sXG4gICAgZ2V0UmVwb1J1bGVzZXQ6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXNldHMve3J1bGVzZXRfaWR9XCJdLFxuICAgIGdldFJlcG9SdWxlc2V0SGlzdG9yeTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzZXRzL3tydWxlc2V0X2lkfS9oaXN0b3J5XCJcbiAgICBdLFxuICAgIGdldFJlcG9SdWxlc2V0VmVyc2lvbjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzZXRzL3tydWxlc2V0X2lkfS9oaXN0b3J5L3t2ZXJzaW9uX2lkfVwiXG4gICAgXSxcbiAgICBnZXRSZXBvUnVsZXNldHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXNldHNcIl0sXG4gICAgZ2V0U3RhdHVzQ2hlY2tzUHJvdGVjdGlvbjogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfc3RhdHVzX2NoZWNrc1wiXG4gICAgXSxcbiAgICBnZXRUZWFtc1dpdGhBY2Nlc3NUb1Byb3RlY3RlZEJyYW5jaDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVzdHJpY3Rpb25zL3RlYW1zXCJcbiAgICBdLFxuICAgIGdldFRvcFBhdGhzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RyYWZmaWMvcG9wdWxhci9wYXRoc1wiXSxcbiAgICBnZXRUb3BSZWZlcnJlcnM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdHJhZmZpYy9wb3B1bGFyL3JlZmVycmVyc1wiXSxcbiAgICBnZXRVc2Vyc1dpdGhBY2Nlc3NUb1Byb3RlY3RlZEJyYW5jaDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVzdHJpY3Rpb25zL3VzZXJzXCJcbiAgICBdLFxuICAgIGdldFZpZXdzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RyYWZmaWMvdmlld3NcIl0sXG4gICAgZ2V0V2ViaG9vazogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ob29rcy97aG9va19pZH1cIl0sXG4gICAgZ2V0V2ViaG9va0NvbmZpZ0ZvclJlcG86IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ob29rcy97aG9va19pZH0vY29uZmlnXCJcbiAgICBdLFxuICAgIGdldFdlYmhvb2tEZWxpdmVyeTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfS9kZWxpdmVyaWVzL3tkZWxpdmVyeV9pZH1cIlxuICAgIF0sXG4gICAgbGlzdEFjdGl2aXRpZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aXZpdHlcIl0sXG4gICAgbGlzdEF0dGVzdGF0aW9uczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2F0dGVzdGF0aW9ucy97c3ViamVjdF9kaWdlc3R9XCJcbiAgICBdLFxuICAgIGxpc3RBdXRvbGlua3M6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYXV0b2xpbmtzXCJdLFxuICAgIGxpc3RCcmFuY2hlczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlc1wiXSxcbiAgICBsaXN0QnJhbmNoZXNGb3JIZWFkQ29tbWl0OiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97Y29tbWl0X3NoYX0vYnJhbmNoZXMtd2hlcmUtaGVhZFwiXG4gICAgXSxcbiAgICBsaXN0Q29sbGFib3JhdG9yczogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2xsYWJvcmF0b3JzXCJdLFxuICAgIGxpc3RDb21tZW50c0ZvckNvbW1pdDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve2NvbW1pdF9zaGF9L2NvbW1lbnRzXCJcbiAgICBdLFxuICAgIGxpc3RDb21taXRDb21tZW50c0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWVudHNcIl0sXG4gICAgbGlzdENvbW1pdFN0YXR1c2VzRm9yUmVmOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97cmVmfS9zdGF0dXNlc1wiXG4gICAgXSxcbiAgICBsaXN0Q29tbWl0czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzXCJdLFxuICAgIGxpc3RDb250cmlidXRvcnM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29udHJpYnV0b3JzXCJdLFxuICAgIGxpc3RDdXN0b21EZXBsb3ltZW50UnVsZUludGVncmF0aW9uczogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50cy97ZW52aXJvbm1lbnRfbmFtZX0vZGVwbG95bWVudF9wcm90ZWN0aW9uX3J1bGVzL2FwcHNcIlxuICAgIF0sXG4gICAgbGlzdERlcGxveUtleXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30va2V5c1wiXSxcbiAgICBsaXN0RGVwbG95bWVudEJyYW5jaFBvbGljaWVzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50LWJyYW5jaC1wb2xpY2llc1wiXG4gICAgXSxcbiAgICBsaXN0RGVwbG95bWVudFN0YXR1c2VzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZGVwbG95bWVudHMve2RlcGxveW1lbnRfaWR9L3N0YXR1c2VzXCJcbiAgICBdLFxuICAgIGxpc3REZXBsb3ltZW50czogW1wiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBsb3ltZW50c1wiXSxcbiAgICBsaXN0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9yZXBvc1wiXSxcbiAgICBsaXN0Rm9yT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vcmVwb3NcIl0sXG4gICAgbGlzdEZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9yZXBvc1wiXSxcbiAgICBsaXN0Rm9ya3M6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZm9ya3NcIl0sXG4gICAgbGlzdEludml0YXRpb25zOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2ludml0YXRpb25zXCJdLFxuICAgIGxpc3RJbnZpdGF0aW9uc0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvcmVwb3NpdG9yeV9pbnZpdGF0aW9uc1wiXSxcbiAgICBsaXN0TGFuZ3VhZ2VzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2xhbmd1YWdlc1wiXSxcbiAgICBsaXN0UGFnZXNCdWlsZHM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcGFnZXMvYnVpbGRzXCJdLFxuICAgIGxpc3RQdWJsaWM6IFtcIkdFVCAvcmVwb3NpdG9yaWVzXCJdLFxuICAgIGxpc3RQdWxsUmVxdWVzdHNBc3NvY2lhdGVkV2l0aENvbW1pdDogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve2NvbW1pdF9zaGF9L3B1bGxzXCJcbiAgICBdLFxuICAgIGxpc3RSZWxlYXNlQXNzZXRzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMve3JlbGVhc2VfaWR9L2Fzc2V0c1wiXG4gICAgXSxcbiAgICBsaXN0UmVsZWFzZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXNcIl0sXG4gICAgbGlzdFRhZ3M6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdGFnc1wiXSxcbiAgICBsaXN0VGVhbXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vdGVhbXNcIl0sXG4gICAgbGlzdFdlYmhvb2tEZWxpdmVyaWVzOiBbXG4gICAgICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3Mve2hvb2tfaWR9L2RlbGl2ZXJpZXNcIlxuICAgIF0sXG4gICAgbGlzdFdlYmhvb2tzOiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzXCJdLFxuICAgIG1lcmdlOiBbXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9tZXJnZXNcIl0sXG4gICAgbWVyZ2VVcHN0cmVhbTogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vbWVyZ2UtdXBzdHJlYW1cIl0sXG4gICAgcGluZ1dlYmhvb2s6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfS9waW5nc1wiXSxcbiAgICByZWRlbGl2ZXJXZWJob29rRGVsaXZlcnk6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3Mve2hvb2tfaWR9L2RlbGl2ZXJpZXMve2RlbGl2ZXJ5X2lkfS9hdHRlbXB0c1wiXG4gICAgXSxcbiAgICByZW1vdmVBcHBBY2Nlc3NSZXN0cmljdGlvbnM6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3Jlc3RyaWN0aW9ucy9hcHBzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgbWFwVG9EYXRhOiBcImFwcHNcIiB9XG4gICAgXSxcbiAgICByZW1vdmVDb2xsYWJvcmF0b3I6IFtcbiAgICAgIFwiREVMRVRFIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2xsYWJvcmF0b3JzL3t1c2VybmFtZX1cIlxuICAgIF0sXG4gICAgcmVtb3ZlU3RhdHVzQ2hlY2tDb250ZXh0czogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfc3RhdHVzX2NoZWNrcy9jb250ZXh0c1wiLFxuICAgICAge30sXG4gICAgICB7IG1hcFRvRGF0YTogXCJjb250ZXh0c1wiIH1cbiAgICBdLFxuICAgIHJlbW92ZVN0YXR1c0NoZWNrUHJvdGVjdGlvbjogW1xuICAgICAgXCJERUxFVEUgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfc3RhdHVzX2NoZWNrc1wiXG4gICAgXSxcbiAgICByZW1vdmVUZWFtQWNjZXNzUmVzdHJpY3Rpb25zOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvdGVhbXNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwidGVhbXNcIiB9XG4gICAgXSxcbiAgICByZW1vdmVVc2VyQWNjZXNzUmVzdHJpY3Rpb25zOiBbXG4gICAgICBcIkRFTEVURSAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvdXNlcnNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwidXNlcnNcIiB9XG4gICAgXSxcbiAgICByZW5hbWVCcmFuY2g6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3JlbmFtZVwiXSxcbiAgICByZXBsYWNlQWxsVG9waWNzOiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RvcGljc1wiXSxcbiAgICByZXF1ZXN0UGFnZXNCdWlsZDogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcGFnZXMvYnVpbGRzXCJdLFxuICAgIHNldEFkbWluQnJhbmNoUHJvdGVjdGlvbjogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL2VuZm9yY2VfYWRtaW5zXCJcbiAgICBdLFxuICAgIHNldEFwcEFjY2Vzc1Jlc3RyaWN0aW9uczogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVzdHJpY3Rpb25zL2FwcHNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwiYXBwc1wiIH1cbiAgICBdLFxuICAgIHNldFN0YXR1c0NoZWNrQ29udGV4dHM6IFtcbiAgICAgIFwiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3N0YXR1c19jaGVja3MvY29udGV4dHNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwiY29udGV4dHNcIiB9XG4gICAgXSxcbiAgICBzZXRUZWFtQWNjZXNzUmVzdHJpY3Rpb25zOiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvdGVhbXNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwidGVhbXNcIiB9XG4gICAgXSxcbiAgICBzZXRVc2VyQWNjZXNzUmVzdHJpY3Rpb25zOiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXN0cmljdGlvbnMvdXNlcnNcIixcbiAgICAgIHt9LFxuICAgICAgeyBtYXBUb0RhdGE6IFwidXNlcnNcIiB9XG4gICAgXSxcbiAgICB0ZXN0UHVzaFdlYmhvb2s6IFtcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfS90ZXN0c1wiXSxcbiAgICB0cmFuc2ZlcjogW1wiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vdHJhbnNmZXJcIl0sXG4gICAgdXBkYXRlOiBbXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb31cIl0sXG4gICAgdXBkYXRlQnJhbmNoUHJvdGVjdGlvbjogW1xuICAgICAgXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb25cIlxuICAgIF0sXG4gICAgdXBkYXRlQ29tbWl0Q29tbWVudDogW1wiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1lbnRzL3tjb21tZW50X2lkfVwiXSxcbiAgICB1cGRhdGVEZXBsb3ltZW50QnJhbmNoUG9saWN5OiBbXG4gICAgICBcIlBVVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50LWJyYW5jaC1wb2xpY2llcy97YnJhbmNoX3BvbGljeV9pZH1cIlxuICAgIF0sXG4gICAgdXBkYXRlSW5mb3JtYXRpb25BYm91dFBhZ2VzU2l0ZTogW1wiUFVUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wYWdlc1wiXSxcbiAgICB1cGRhdGVJbnZpdGF0aW9uOiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbnZpdGF0aW9ucy97aW52aXRhdGlvbl9pZH1cIlxuICAgIF0sXG4gICAgdXBkYXRlT3JnUnVsZXNldDogW1wiUFVUIC9vcmdzL3tvcmd9L3J1bGVzZXRzL3tydWxlc2V0X2lkfVwiXSxcbiAgICB1cGRhdGVQdWxsUmVxdWVzdFJldmlld1Byb3RlY3Rpb246IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2JyYW5jaGVzL3ticmFuY2h9L3Byb3RlY3Rpb24vcmVxdWlyZWRfcHVsbF9yZXF1ZXN0X3Jldmlld3NcIlxuICAgIF0sXG4gICAgdXBkYXRlUmVsZWFzZTogW1wiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL3tyZWxlYXNlX2lkfVwiXSxcbiAgICB1cGRhdGVSZWxlYXNlQXNzZXQ6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL2Fzc2V0cy97YXNzZXRfaWR9XCJcbiAgICBdLFxuICAgIHVwZGF0ZVJlcG9SdWxlc2V0OiBbXCJQVVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzZXRzL3tydWxlc2V0X2lkfVwiXSxcbiAgICB1cGRhdGVTdGF0dXNDaGVja1BvdGVjdGlvbjogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vYnJhbmNoZXMve2JyYW5jaH0vcHJvdGVjdGlvbi9yZXF1aXJlZF9zdGF0dXNfY2hlY2tzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1wicmVwb3NcIiwgXCJ1cGRhdGVTdGF0dXNDaGVja1Byb3RlY3Rpb25cIl0gfVxuICAgIF0sXG4gICAgdXBkYXRlU3RhdHVzQ2hlY2tQcm90ZWN0aW9uOiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlcy97YnJhbmNofS9wcm90ZWN0aW9uL3JlcXVpcmVkX3N0YXR1c19jaGVja3NcIlxuICAgIF0sXG4gICAgdXBkYXRlV2ViaG9vazogW1wiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfVwiXSxcbiAgICB1cGRhdGVXZWJob29rQ29uZmlnRm9yUmVwbzogW1xuICAgICAgXCJQQVRDSCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3Mve2hvb2tfaWR9L2NvbmZpZ1wiXG4gICAgXSxcbiAgICB1cGxvYWRSZWxlYXNlQXNzZXQ6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXMve3JlbGVhc2VfaWR9L2Fzc2V0c3s/bmFtZSxsYWJlbH1cIixcbiAgICAgIHsgYmFzZVVybDogXCJodHRwczovL3VwbG9hZHMuZ2l0aHViLmNvbVwiIH1cbiAgICBdXG4gIH0sXG4gIHNlYXJjaDoge1xuICAgIGNvZGU6IFtcIkdFVCAvc2VhcmNoL2NvZGVcIl0sXG4gICAgY29tbWl0czogW1wiR0VUIC9zZWFyY2gvY29tbWl0c1wiXSxcbiAgICBpc3N1ZXNBbmRQdWxsUmVxdWVzdHM6IFtcIkdFVCAvc2VhcmNoL2lzc3Vlc1wiXSxcbiAgICBsYWJlbHM6IFtcIkdFVCAvc2VhcmNoL2xhYmVsc1wiXSxcbiAgICByZXBvczogW1wiR0VUIC9zZWFyY2gvcmVwb3NpdG9yaWVzXCJdLFxuICAgIHRvcGljczogW1wiR0VUIC9zZWFyY2gvdG9waWNzXCJdLFxuICAgIHVzZXJzOiBbXCJHRVQgL3NlYXJjaC91c2Vyc1wiXVxuICB9LFxuICBzZWNyZXRTY2FubmluZzoge1xuICAgIGNyZWF0ZVB1c2hQcm90ZWN0aW9uQnlwYXNzOiBbXG4gICAgICBcIlBPU1QgL3JlcG9zL3tvd25lcn0ve3JlcG99L3NlY3JldC1zY2FubmluZy9wdXNoLXByb3RlY3Rpb24tYnlwYXNzZXNcIlxuICAgIF0sXG4gICAgZ2V0QWxlcnQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWNyZXQtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9XCJcbiAgICBdLFxuICAgIGdldFNjYW5IaXN0b3J5OiBbXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3NlY3JldC1zY2FubmluZy9zY2FuLWhpc3RvcnlcIl0sXG4gICAgbGlzdEFsZXJ0c0Zvck9yZzogW1wiR0VUIC9vcmdzL3tvcmd9L3NlY3JldC1zY2FubmluZy9hbGVydHNcIl0sXG4gICAgbGlzdEFsZXJ0c0ZvclJlcG86IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjcmV0LXNjYW5uaW5nL2FsZXJ0c1wiXSxcbiAgICBsaXN0TG9jYXRpb25zRm9yQWxlcnQ6IFtcbiAgICAgIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWNyZXQtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9L2xvY2F0aW9uc1wiXG4gICAgXSxcbiAgICBsaXN0T3JnUGF0dGVybkNvbmZpZ3M6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3NlY3JldC1zY2FubmluZy9wYXR0ZXJuLWNvbmZpZ3VyYXRpb25zXCJcbiAgICBdLFxuICAgIHVwZGF0ZUFsZXJ0OiBbXG4gICAgICBcIlBBVENIIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWNyZXQtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9XCJcbiAgICBdLFxuICAgIHVwZGF0ZU9yZ1BhdHRlcm5Db25maWdzOiBbXG4gICAgICBcIlBBVENIIC9vcmdzL3tvcmd9L3NlY3JldC1zY2FubmluZy9wYXR0ZXJuLWNvbmZpZ3VyYXRpb25zXCJcbiAgICBdXG4gIH0sXG4gIHNlY3VyaXR5QWR2aXNvcmllczoge1xuICAgIGNyZWF0ZUZvcms6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjdXJpdHktYWR2aXNvcmllcy97Z2hzYV9pZH0vZm9ya3NcIlxuICAgIF0sXG4gICAgY3JlYXRlUHJpdmF0ZVZ1bG5lcmFiaWxpdHlSZXBvcnQ6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjdXJpdHktYWR2aXNvcmllcy9yZXBvcnRzXCJcbiAgICBdLFxuICAgIGNyZWF0ZVJlcG9zaXRvcnlBZHZpc29yeTogW1xuICAgICAgXCJQT1NUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWN1cml0eS1hZHZpc29yaWVzXCJcbiAgICBdLFxuICAgIGNyZWF0ZVJlcG9zaXRvcnlBZHZpc29yeUN2ZVJlcXVlc3Q6IFtcbiAgICAgIFwiUE9TVCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjdXJpdHktYWR2aXNvcmllcy97Z2hzYV9pZH0vY3ZlXCJcbiAgICBdLFxuICAgIGdldEdsb2JhbEFkdmlzb3J5OiBbXCJHRVQgL2Fkdmlzb3JpZXMve2doc2FfaWR9XCJdLFxuICAgIGdldFJlcG9zaXRvcnlBZHZpc29yeTogW1xuICAgICAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3NlY3VyaXR5LWFkdmlzb3JpZXMve2doc2FfaWR9XCJcbiAgICBdLFxuICAgIGxpc3RHbG9iYWxBZHZpc29yaWVzOiBbXCJHRVQgL2Fkdmlzb3JpZXNcIl0sXG4gICAgbGlzdE9yZ1JlcG9zaXRvcnlBZHZpc29yaWVzOiBbXCJHRVQgL29yZ3Mve29yZ30vc2VjdXJpdHktYWR2aXNvcmllc1wiXSxcbiAgICBsaXN0UmVwb3NpdG9yeUFkdmlzb3JpZXM6IFtcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjdXJpdHktYWR2aXNvcmllc1wiXSxcbiAgICB1cGRhdGVSZXBvc2l0b3J5QWR2aXNvcnk6IFtcbiAgICAgIFwiUEFUQ0ggL3JlcG9zL3tvd25lcn0ve3JlcG99L3NlY3VyaXR5LWFkdmlzb3JpZXMve2doc2FfaWR9XCJcbiAgICBdXG4gIH0sXG4gIHRlYW1zOiB7XG4gICAgYWRkT3JVcGRhdGVNZW1iZXJzaGlwRm9yVXNlckluT3JnOiBbXG4gICAgICBcIlBVVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9tZW1iZXJzaGlwcy97dXNlcm5hbWV9XCJcbiAgICBdLFxuICAgIGFkZE9yVXBkYXRlUmVwb1Blcm1pc3Npb25zSW5Pcmc6IFtcbiAgICAgIFwiUFVUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L3JlcG9zL3tvd25lcn0ve3JlcG99XCJcbiAgICBdLFxuICAgIGNoZWNrUGVybWlzc2lvbnNGb3JSZXBvSW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L3JlcG9zL3tvd25lcn0ve3JlcG99XCJcbiAgICBdLFxuICAgIGNyZWF0ZTogW1wiUE9TVCAvb3Jncy97b3JnfS90ZWFtc1wiXSxcbiAgICBjcmVhdGVEaXNjdXNzaW9uQ29tbWVudEluT3JnOiBbXG4gICAgICBcIlBPU1QgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9jb21tZW50c1wiXG4gICAgXSxcbiAgICBjcmVhdGVEaXNjdXNzaW9uSW5Pcmc6IFtcIlBPU1QgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnNcIl0sXG4gICAgZGVsZXRlRGlzY3Vzc2lvbkNvbW1lbnRJbk9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9jb21tZW50cy97Y29tbWVudF9udW1iZXJ9XCJcbiAgICBdLFxuICAgIGRlbGV0ZURpc2N1c3Npb25Jbk9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfVwiXG4gICAgXSxcbiAgICBkZWxldGVJbk9yZzogW1wiREVMRVRFIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9XCJdLFxuICAgIGdldEJ5TmFtZTogW1wiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9XCJdLFxuICAgIGdldERpc2N1c3Npb25Db21tZW50SW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vY29tbWVudHMve2NvbW1lbnRfbnVtYmVyfVwiXG4gICAgXSxcbiAgICBnZXREaXNjdXNzaW9uSW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn1cIlxuICAgIF0sXG4gICAgZ2V0TWVtYmVyc2hpcEZvclVzZXJJbk9yZzogW1xuICAgICAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vbWVtYmVyc2hpcHMve3VzZXJuYW1lfVwiXG4gICAgXSxcbiAgICBsaXN0OiBbXCJHRVQgL29yZ3Mve29yZ30vdGVhbXNcIl0sXG4gICAgbGlzdENoaWxkSW5Pcmc6IFtcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS90ZWFtc1wiXSxcbiAgICBsaXN0RGlzY3Vzc2lvbkNvbW1lbnRzSW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vY29tbWVudHNcIlxuICAgIF0sXG4gICAgbGlzdERpc2N1c3Npb25zSW5Pcmc6IFtcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9uc1wiXSxcbiAgICBsaXN0Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci90ZWFtc1wiXSxcbiAgICBsaXN0TWVtYmVyc0luT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vbWVtYmVyc1wiXSxcbiAgICBsaXN0UGVuZGluZ0ludml0YXRpb25zSW5Pcmc6IFtcbiAgICAgIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2ludml0YXRpb25zXCJcbiAgICBdLFxuICAgIGxpc3RSZXBvc0luT3JnOiBbXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vcmVwb3NcIl0sXG4gICAgcmVtb3ZlTWVtYmVyc2hpcEZvclVzZXJJbk9yZzogW1xuICAgICAgXCJERUxFVEUgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vbWVtYmVyc2hpcHMve3VzZXJuYW1lfVwiXG4gICAgXSxcbiAgICByZW1vdmVSZXBvSW5Pcmc6IFtcbiAgICAgIFwiREVMRVRFIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L3JlcG9zL3tvd25lcn0ve3JlcG99XCJcbiAgICBdLFxuICAgIHVwZGF0ZURpc2N1c3Npb25Db21tZW50SW5Pcmc6IFtcbiAgICAgIFwiUEFUQ0ggL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9jb21tZW50cy97Y29tbWVudF9udW1iZXJ9XCJcbiAgICBdLFxuICAgIHVwZGF0ZURpc2N1c3Npb25Jbk9yZzogW1xuICAgICAgXCJQQVRDSCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9XCJcbiAgICBdLFxuICAgIHVwZGF0ZUluT3JnOiBbXCJQQVRDSCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfVwiXVxuICB9LFxuICB1c2Vyczoge1xuICAgIGFkZEVtYWlsRm9yQXV0aGVudGljYXRlZDogW1xuICAgICAgXCJQT1NUIC91c2VyL2VtYWlsc1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwiYWRkRW1haWxGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBhZGRFbWFpbEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJQT1NUIC91c2VyL2VtYWlsc1wiXSxcbiAgICBhZGRTb2NpYWxBY2NvdW50Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBPU1QgL3VzZXIvc29jaWFsX2FjY291bnRzXCJdLFxuICAgIGJsb2NrOiBbXCJQVVQgL3VzZXIvYmxvY2tzL3t1c2VybmFtZX1cIl0sXG4gICAgY2hlY2tCbG9ja2VkOiBbXCJHRVQgL3VzZXIvYmxvY2tzL3t1c2VybmFtZX1cIl0sXG4gICAgY2hlY2tGb2xsb3dpbmdGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZm9sbG93aW5nL3t0YXJnZXRfdXNlcn1cIl0sXG4gICAgY2hlY2tQZXJzb25Jc0ZvbGxvd2VkQnlBdXRoZW50aWNhdGVkOiBbXCJHRVQgL3VzZXIvZm9sbG93aW5nL3t1c2VybmFtZX1cIl0sXG4gICAgY3JlYXRlR3BnS2V5Rm9yQXV0aGVudGljYXRlZDogW1xuICAgICAgXCJQT1NUIC91c2VyL2dwZ19rZXlzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJjcmVhdGVHcGdLZXlGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBjcmVhdGVHcGdLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiUE9TVCAvdXNlci9ncGdfa2V5c1wiXSxcbiAgICBjcmVhdGVQdWJsaWNTc2hLZXlGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIlBPU1QgL3VzZXIva2V5c1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwiY3JlYXRlUHVibGljU3NoS2V5Rm9yQXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgY3JlYXRlUHVibGljU3NoS2V5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBPU1QgL3VzZXIva2V5c1wiXSxcbiAgICBjcmVhdGVTc2hTaWduaW5nS2V5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIlBPU1QgL3VzZXIvc3NoX3NpZ25pbmdfa2V5c1wiXSxcbiAgICBkZWxldGVBdHRlc3RhdGlvbnNCdWxrOiBbXG4gICAgICBcIlBPU1QgL3VzZXJzL3t1c2VybmFtZX0vYXR0ZXN0YXRpb25zL2RlbGV0ZS1yZXF1ZXN0XCJcbiAgICBdLFxuICAgIGRlbGV0ZUF0dGVzdGF0aW9uc0J5SWQ6IFtcbiAgICAgIFwiREVMRVRFIC91c2Vycy97dXNlcm5hbWV9L2F0dGVzdGF0aW9ucy97YXR0ZXN0YXRpb25faWR9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUF0dGVzdGF0aW9uc0J5U3ViamVjdERpZ2VzdDogW1xuICAgICAgXCJERUxFVEUgL3VzZXJzL3t1c2VybmFtZX0vYXR0ZXN0YXRpb25zL2RpZ2VzdC97c3ViamVjdF9kaWdlc3R9XCJcbiAgICBdLFxuICAgIGRlbGV0ZUVtYWlsRm9yQXV0aGVudGljYXRlZDogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvZW1haWxzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJkZWxldGVFbWFpbEZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGRlbGV0ZUVtYWlsRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkRFTEVURSAvdXNlci9lbWFpbHNcIl0sXG4gICAgZGVsZXRlR3BnS2V5Rm9yQXV0aGVudGljYXRlZDogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvZ3BnX2tleXMve2dwZ19rZXlfaWR9XCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJkZWxldGVHcGdLZXlGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBkZWxldGVHcGdLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiREVMRVRFIC91c2VyL2dwZ19rZXlzL3tncGdfa2V5X2lkfVwiXSxcbiAgICBkZWxldGVQdWJsaWNTc2hLZXlGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIkRFTEVURSAvdXNlci9rZXlzL3trZXlfaWR9XCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJkZWxldGVQdWJsaWNTc2hLZXlGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBkZWxldGVQdWJsaWNTc2hLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiREVMRVRFIC91c2VyL2tleXMve2tleV9pZH1cIl0sXG4gICAgZGVsZXRlU29jaWFsQWNjb3VudEZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJERUxFVEUgL3VzZXIvc29jaWFsX2FjY291bnRzXCJdLFxuICAgIGRlbGV0ZVNzaFNpZ25pbmdLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1xuICAgICAgXCJERUxFVEUgL3VzZXIvc3NoX3NpZ25pbmdfa2V5cy97c3NoX3NpZ25pbmdfa2V5X2lkfVwiXG4gICAgXSxcbiAgICBmb2xsb3c6IFtcIlBVVCAvdXNlci9mb2xsb3dpbmcve3VzZXJuYW1lfVwiXSxcbiAgICBnZXRBdXRoZW50aWNhdGVkOiBbXCJHRVQgL3VzZXJcIl0sXG4gICAgZ2V0QnlJZDogW1wiR0VUIC91c2VyL3thY2NvdW50X2lkfVwiXSxcbiAgICBnZXRCeVVzZXJuYW1lOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX1cIl0sXG4gICAgZ2V0Q29udGV4dEZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9ob3ZlcmNhcmRcIl0sXG4gICAgZ2V0R3BnS2V5Rm9yQXV0aGVudGljYXRlZDogW1xuICAgICAgXCJHRVQgL3VzZXIvZ3BnX2tleXMve2dwZ19rZXlfaWR9XCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJnZXRHcGdLZXlGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBnZXRHcGdLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL2dwZ19rZXlzL3tncGdfa2V5X2lkfVwiXSxcbiAgICBnZXRQdWJsaWNTc2hLZXlGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIkdFVCAvdXNlci9rZXlzL3trZXlfaWR9XCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJnZXRQdWJsaWNTc2hLZXlGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBnZXRQdWJsaWNTc2hLZXlGb3JBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL2tleXMve2tleV9pZH1cIl0sXG4gICAgZ2V0U3NoU2lnbmluZ0tleUZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXG4gICAgICBcIkdFVCAvdXNlci9zc2hfc2lnbmluZ19rZXlzL3tzc2hfc2lnbmluZ19rZXlfaWR9XCJcbiAgICBdLFxuICAgIGxpc3Q6IFtcIkdFVCAvdXNlcnNcIl0sXG4gICAgbGlzdEF0dGVzdGF0aW9uczogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L2F0dGVzdGF0aW9ucy97c3ViamVjdF9kaWdlc3R9XCJdLFxuICAgIGxpc3RBdHRlc3RhdGlvbnNCdWxrOiBbXG4gICAgICBcIlBPU1QgL3VzZXJzL3t1c2VybmFtZX0vYXR0ZXN0YXRpb25zL2J1bGstbGlzdHs/cGVyX3BhZ2UsYmVmb3JlLGFmdGVyfVwiXG4gICAgXSxcbiAgICBsaXN0QmxvY2tlZEJ5QXV0aGVudGljYXRlZDogW1xuICAgICAgXCJHRVQgL3VzZXIvYmxvY2tzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJsaXN0QmxvY2tlZEJ5QXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgbGlzdEJsb2NrZWRCeUF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvYmxvY2tzXCJdLFxuICAgIGxpc3RFbWFpbHNGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIkdFVCAvdXNlci9lbWFpbHNcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJ1c2Vyc1wiLCBcImxpc3RFbWFpbHNGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBsaXN0RW1haWxzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9lbWFpbHNcIl0sXG4gICAgbGlzdEZvbGxvd2VkQnlBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIkdFVCAvdXNlci9mb2xsb3dpbmdcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJ1c2Vyc1wiLCBcImxpc3RGb2xsb3dlZEJ5QXV0aGVudGljYXRlZFVzZXJcIl0gfVxuICAgIF0sXG4gICAgbGlzdEZvbGxvd2VkQnlBdXRoZW50aWNhdGVkVXNlcjogW1wiR0VUIC91c2VyL2ZvbGxvd2luZ1wiXSxcbiAgICBsaXN0Rm9sbG93ZXJzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9mb2xsb3dlcnNcIl0sXG4gICAgbGlzdEZvbGxvd2Vyc0ZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9mb2xsb3dlcnNcIl0sXG4gICAgbGlzdEZvbGxvd2luZ0ZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9mb2xsb3dpbmdcIl0sXG4gICAgbGlzdEdwZ0tleXNGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIkdFVCAvdXNlci9ncGdfa2V5c1wiLFxuICAgICAge30sXG4gICAgICB7IHJlbmFtZWQ6IFtcInVzZXJzXCIsIFwibGlzdEdwZ0tleXNGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBsaXN0R3BnS2V5c0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvZ3BnX2tleXNcIl0sXG4gICAgbGlzdEdwZ0tleXNGb3JVc2VyOiBbXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZ3BnX2tleXNcIl0sXG4gICAgbGlzdFB1YmxpY0VtYWlsc0ZvckF1dGhlbnRpY2F0ZWQ6IFtcbiAgICAgIFwiR0VUIC91c2VyL3B1YmxpY19lbWFpbHNcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJ1c2Vyc1wiLCBcImxpc3RQdWJsaWNFbWFpbHNGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBsaXN0UHVibGljRW1haWxzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9wdWJsaWNfZW1haWxzXCJdLFxuICAgIGxpc3RQdWJsaWNLZXlzRm9yVXNlcjogW1wiR0VUIC91c2Vycy97dXNlcm5hbWV9L2tleXNcIl0sXG4gICAgbGlzdFB1YmxpY1NzaEtleXNGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIkdFVCAvdXNlci9rZXlzXCIsXG4gICAgICB7fSxcbiAgICAgIHsgcmVuYW1lZDogW1widXNlcnNcIiwgXCJsaXN0UHVibGljU3NoS2V5c0ZvckF1dGhlbnRpY2F0ZWRVc2VyXCJdIH1cbiAgICBdLFxuICAgIGxpc3RQdWJsaWNTc2hLZXlzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9rZXlzXCJdLFxuICAgIGxpc3RTb2NpYWxBY2NvdW50c0ZvckF1dGhlbnRpY2F0ZWRVc2VyOiBbXCJHRVQgL3VzZXIvc29jaWFsX2FjY291bnRzXCJdLFxuICAgIGxpc3RTb2NpYWxBY2NvdW50c0ZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9zb2NpYWxfYWNjb3VudHNcIl0sXG4gICAgbGlzdFNzaFNpZ25pbmdLZXlzRm9yQXV0aGVudGljYXRlZFVzZXI6IFtcIkdFVCAvdXNlci9zc2hfc2lnbmluZ19rZXlzXCJdLFxuICAgIGxpc3RTc2hTaWduaW5nS2V5c0ZvclVzZXI6IFtcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9zc2hfc2lnbmluZ19rZXlzXCJdLFxuICAgIHNldFByaW1hcnlFbWFpbFZpc2liaWxpdHlGb3JBdXRoZW50aWNhdGVkOiBbXG4gICAgICBcIlBBVENIIC91c2VyL2VtYWlsL3Zpc2liaWxpdHlcIixcbiAgICAgIHt9LFxuICAgICAgeyByZW5hbWVkOiBbXCJ1c2Vyc1wiLCBcInNldFByaW1hcnlFbWFpbFZpc2liaWxpdHlGb3JBdXRoZW50aWNhdGVkVXNlclwiXSB9XG4gICAgXSxcbiAgICBzZXRQcmltYXJ5RW1haWxWaXNpYmlsaXR5Rm9yQXV0aGVudGljYXRlZFVzZXI6IFtcbiAgICAgIFwiUEFUQ0ggL3VzZXIvZW1haWwvdmlzaWJpbGl0eVwiXG4gICAgXSxcbiAgICB1bmJsb2NrOiBbXCJERUxFVEUgL3VzZXIvYmxvY2tzL3t1c2VybmFtZX1cIl0sXG4gICAgdW5mb2xsb3c6IFtcIkRFTEVURSAvdXNlci9mb2xsb3dpbmcve3VzZXJuYW1lfVwiXSxcbiAgICB1cGRhdGVBdXRoZW50aWNhdGVkOiBbXCJQQVRDSCAvdXNlclwiXVxuICB9XG59O1xudmFyIGVuZHBvaW50c19kZWZhdWx0ID0gRW5kcG9pbnRzO1xuZXhwb3J0IHtcbiAgZW5kcG9pbnRzX2RlZmF1bHQgYXMgZGVmYXVsdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVuZHBvaW50cy5qcy5tYXBcbiIsImltcG9ydCBFTkRQT0lOVFMgZnJvbSBcIi4vZ2VuZXJhdGVkL2VuZHBvaW50cy5qc1wiO1xuY29uc3QgZW5kcG9pbnRNZXRob2RzTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbmZvciAoY29uc3QgW3Njb3BlLCBlbmRwb2ludHNdIG9mIE9iamVjdC5lbnRyaWVzKEVORFBPSU5UUykpIHtcbiAgZm9yIChjb25zdCBbbWV0aG9kTmFtZSwgZW5kcG9pbnRdIG9mIE9iamVjdC5lbnRyaWVzKGVuZHBvaW50cykpIHtcbiAgICBjb25zdCBbcm91dGUsIGRlZmF1bHRzLCBkZWNvcmF0aW9uc10gPSBlbmRwb2ludDtcbiAgICBjb25zdCBbbWV0aG9kLCB1cmxdID0gcm91dGUuc3BsaXQoLyAvKTtcbiAgICBjb25zdCBlbmRwb2ludERlZmF1bHRzID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICB1cmxcbiAgICAgIH0sXG4gICAgICBkZWZhdWx0c1xuICAgICk7XG4gICAgaWYgKCFlbmRwb2ludE1ldGhvZHNNYXAuaGFzKHNjb3BlKSkge1xuICAgICAgZW5kcG9pbnRNZXRob2RzTWFwLnNldChzY29wZSwgLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKSk7XG4gICAgfVxuICAgIGVuZHBvaW50TWV0aG9kc01hcC5nZXQoc2NvcGUpLnNldChtZXRob2ROYW1lLCB7XG4gICAgICBzY29wZSxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBlbmRwb2ludERlZmF1bHRzLFxuICAgICAgZGVjb3JhdGlvbnNcbiAgICB9KTtcbiAgfVxufVxuY29uc3QgaGFuZGxlciA9IHtcbiAgaGFzKHsgc2NvcGUgfSwgbWV0aG9kTmFtZSkge1xuICAgIHJldHVybiBlbmRwb2ludE1ldGhvZHNNYXAuZ2V0KHNjb3BlKS5oYXMobWV0aG9kTmFtZSk7XG4gIH0sXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIG1ldGhvZE5hbWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHRoaXMuZ2V0KHRhcmdldCwgbWV0aG9kTmFtZSksXG4gICAgICAvLyBlbnN1cmVzIG1ldGhvZCBpcyBpbiB0aGUgY2FjaGVcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH07XG4gIH0sXG4gIGRlZmluZVByb3BlcnR5KHRhcmdldCwgbWV0aG9kTmFtZSwgZGVzY3JpcHRvcikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQuY2FjaGUsIG1ldGhvZE5hbWUsIGRlc2NyaXB0b3IpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIG1ldGhvZE5hbWUpIHtcbiAgICBkZWxldGUgdGFyZ2V0LmNhY2hlW21ldGhvZE5hbWVdO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBvd25LZXlzKHsgc2NvcGUgfSkge1xuICAgIHJldHVybiBbLi4uZW5kcG9pbnRNZXRob2RzTWFwLmdldChzY29wZSkua2V5cygpXTtcbiAgfSxcbiAgc2V0KHRhcmdldCwgbWV0aG9kTmFtZSwgdmFsdWUpIHtcbiAgICByZXR1cm4gdGFyZ2V0LmNhY2hlW21ldGhvZE5hbWVdID0gdmFsdWU7XG4gIH0sXG4gIGdldCh7IG9jdG9raXQsIHNjb3BlLCBjYWNoZSB9LCBtZXRob2ROYW1lKSB7XG4gICAgaWYgKGNhY2hlW21ldGhvZE5hbWVdKSB7XG4gICAgICByZXR1cm4gY2FjaGVbbWV0aG9kTmFtZV07XG4gICAgfVxuICAgIGNvbnN0IG1ldGhvZCA9IGVuZHBvaW50TWV0aG9kc01hcC5nZXQoc2NvcGUpLmdldChtZXRob2ROYW1lKTtcbiAgICBpZiAoIW1ldGhvZCkge1xuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgY29uc3QgeyBlbmRwb2ludERlZmF1bHRzLCBkZWNvcmF0aW9ucyB9ID0gbWV0aG9kO1xuICAgIGlmIChkZWNvcmF0aW9ucykge1xuICAgICAgY2FjaGVbbWV0aG9kTmFtZV0gPSBkZWNvcmF0ZShcbiAgICAgICAgb2N0b2tpdCxcbiAgICAgICAgc2NvcGUsXG4gICAgICAgIG1ldGhvZE5hbWUsXG4gICAgICAgIGVuZHBvaW50RGVmYXVsdHMsXG4gICAgICAgIGRlY29yYXRpb25zXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZVttZXRob2ROYW1lXSA9IG9jdG9raXQucmVxdWVzdC5kZWZhdWx0cyhlbmRwb2ludERlZmF1bHRzKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlW21ldGhvZE5hbWVdO1xuICB9XG59O1xuZnVuY3Rpb24gZW5kcG9pbnRzVG9NZXRob2RzKG9jdG9raXQpIHtcbiAgY29uc3QgbmV3TWV0aG9kcyA9IHt9O1xuICBmb3IgKGNvbnN0IHNjb3BlIG9mIGVuZHBvaW50TWV0aG9kc01hcC5rZXlzKCkpIHtcbiAgICBuZXdNZXRob2RzW3Njb3BlXSA9IG5ldyBQcm94eSh7IG9jdG9raXQsIHNjb3BlLCBjYWNoZToge30gfSwgaGFuZGxlcik7XG4gIH1cbiAgcmV0dXJuIG5ld01ldGhvZHM7XG59XG5mdW5jdGlvbiBkZWNvcmF0ZShvY3Rva2l0LCBzY29wZSwgbWV0aG9kTmFtZSwgZGVmYXVsdHMsIGRlY29yYXRpb25zKSB7XG4gIGNvbnN0IHJlcXVlc3RXaXRoRGVmYXVsdHMgPSBvY3Rva2l0LnJlcXVlc3QuZGVmYXVsdHMoZGVmYXVsdHMpO1xuICBmdW5jdGlvbiB3aXRoRGVjb3JhdGlvbnMoLi4uYXJncykge1xuICAgIGxldCBvcHRpb25zID0gcmVxdWVzdFdpdGhEZWZhdWx0cy5lbmRwb2ludC5tZXJnZSguLi5hcmdzKTtcbiAgICBpZiAoZGVjb3JhdGlvbnMubWFwVG9EYXRhKSB7XG4gICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuICAgICAgICBkYXRhOiBvcHRpb25zW2RlY29yYXRpb25zLm1hcFRvRGF0YV0sXG4gICAgICAgIFtkZWNvcmF0aW9ucy5tYXBUb0RhdGFdOiB2b2lkIDBcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlcXVlc3RXaXRoRGVmYXVsdHMob3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChkZWNvcmF0aW9ucy5yZW5hbWVkKSB7XG4gICAgICBjb25zdCBbbmV3U2NvcGUsIG5ld01ldGhvZE5hbWVdID0gZGVjb3JhdGlvbnMucmVuYW1lZDtcbiAgICAgIG9jdG9raXQubG9nLndhcm4oXG4gICAgICAgIGBvY3Rva2l0LiR7c2NvcGV9LiR7bWV0aG9kTmFtZX0oKSBoYXMgYmVlbiByZW5hbWVkIHRvIG9jdG9raXQuJHtuZXdTY29wZX0uJHtuZXdNZXRob2ROYW1lfSgpYFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGRlY29yYXRpb25zLmRlcHJlY2F0ZWQpIHtcbiAgICAgIG9jdG9raXQubG9nLndhcm4oZGVjb3JhdGlvbnMuZGVwcmVjYXRlZCk7XG4gICAgfVxuICAgIGlmIChkZWNvcmF0aW9ucy5yZW5hbWVkUGFyYW1ldGVycykge1xuICAgICAgY29uc3Qgb3B0aW9uczIgPSByZXF1ZXN0V2l0aERlZmF1bHRzLmVuZHBvaW50Lm1lcmdlKC4uLmFyZ3MpO1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgYWxpYXNdIG9mIE9iamVjdC5lbnRyaWVzKFxuICAgICAgICBkZWNvcmF0aW9ucy5yZW5hbWVkUGFyYW1ldGVyc1xuICAgICAgKSkge1xuICAgICAgICBpZiAobmFtZSBpbiBvcHRpb25zMikge1xuICAgICAgICAgIG9jdG9raXQubG9nLndhcm4oXG4gICAgICAgICAgICBgXCIke25hbWV9XCIgcGFyYW1ldGVyIGlzIGRlcHJlY2F0ZWQgZm9yIFwib2N0b2tpdC4ke3Njb3BlfS4ke21ldGhvZE5hbWV9KClcIi4gVXNlIFwiJHthbGlhc31cIiBpbnN0ZWFkYFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKCEoYWxpYXMgaW4gb3B0aW9uczIpKSB7XG4gICAgICAgICAgICBvcHRpb25zMlthbGlhc10gPSBvcHRpb25zMltuYW1lXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVsZXRlIG9wdGlvbnMyW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVxdWVzdFdpdGhEZWZhdWx0cyhvcHRpb25zMik7XG4gICAgfVxuICAgIHJldHVybiByZXF1ZXN0V2l0aERlZmF1bHRzKC4uLmFyZ3MpO1xuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHdpdGhEZWNvcmF0aW9ucywgcmVxdWVzdFdpdGhEZWZhdWx0cyk7XG59XG5leHBvcnQge1xuICBlbmRwb2ludHNUb01ldGhvZHNcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbmRwb2ludHMtdG8tbWV0aG9kcy5qcy5tYXBcbiIsImltcG9ydCB7IFZFUlNJT04gfSBmcm9tIFwiLi92ZXJzaW9uLmpzXCI7XG5pbXBvcnQgeyBlbmRwb2ludHNUb01ldGhvZHMgfSBmcm9tIFwiLi9lbmRwb2ludHMtdG8tbWV0aG9kcy5qc1wiO1xuZnVuY3Rpb24gcmVzdEVuZHBvaW50TWV0aG9kcyhvY3Rva2l0KSB7XG4gIGNvbnN0IGFwaSA9IGVuZHBvaW50c1RvTWV0aG9kcyhvY3Rva2l0KTtcbiAgcmV0dXJuIHtcbiAgICByZXN0OiBhcGlcbiAgfTtcbn1cbnJlc3RFbmRwb2ludE1ldGhvZHMuVkVSU0lPTiA9IFZFUlNJT047XG5mdW5jdGlvbiBsZWdhY3lSZXN0RW5kcG9pbnRNZXRob2RzKG9jdG9raXQpIHtcbiAgY29uc3QgYXBpID0gZW5kcG9pbnRzVG9NZXRob2RzKG9jdG9raXQpO1xuICByZXR1cm4ge1xuICAgIC4uLmFwaSxcbiAgICByZXN0OiBhcGlcbiAgfTtcbn1cbmxlZ2FjeVJlc3RFbmRwb2ludE1ldGhvZHMuVkVSU0lPTiA9IFZFUlNJT047XG5leHBvcnQge1xuICBsZWdhY3lSZXN0RW5kcG9pbnRNZXRob2RzLFxuICByZXN0RW5kcG9pbnRNZXRob2RzXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIvLyBwa2cvZGlzdC1zcmMvdmVyc2lvbi5qc1xudmFyIFZFUlNJT04gPSBcIjAuMC4wLWRldmVsb3BtZW50XCI7XG5cbi8vIHBrZy9kaXN0LXNyYy9ub3JtYWxpemUtcGFnaW5hdGVkLWxpc3QtcmVzcG9uc2UuanNcbmZ1bmN0aW9uIG5vcm1hbGl6ZVBhZ2luYXRlZExpc3RSZXNwb25zZShyZXNwb25zZSkge1xuICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4ucmVzcG9uc2UsXG4gICAgICBkYXRhOiBbXVxuICAgIH07XG4gIH1cbiAgY29uc3QgcmVzcG9uc2VOZWVkc05vcm1hbGl6YXRpb24gPSAoXCJ0b3RhbF9jb3VudFwiIGluIHJlc3BvbnNlLmRhdGEgfHwgXCJ0b3RhbF9jb21taXRzXCIgaW4gcmVzcG9uc2UuZGF0YSkgJiYgIShcInVybFwiIGluIHJlc3BvbnNlLmRhdGEpO1xuICBpZiAoIXJlc3BvbnNlTmVlZHNOb3JtYWxpemF0aW9uKSByZXR1cm4gcmVzcG9uc2U7XG4gIGNvbnN0IGluY29tcGxldGVSZXN1bHRzID0gcmVzcG9uc2UuZGF0YS5pbmNvbXBsZXRlX3Jlc3VsdHM7XG4gIGNvbnN0IHJlcG9zaXRvcnlTZWxlY3Rpb24gPSByZXNwb25zZS5kYXRhLnJlcG9zaXRvcnlfc2VsZWN0aW9uO1xuICBjb25zdCB0b3RhbENvdW50ID0gcmVzcG9uc2UuZGF0YS50b3RhbF9jb3VudDtcbiAgY29uc3QgdG90YWxDb21taXRzID0gcmVzcG9uc2UuZGF0YS50b3RhbF9jb21taXRzO1xuICBkZWxldGUgcmVzcG9uc2UuZGF0YS5pbmNvbXBsZXRlX3Jlc3VsdHM7XG4gIGRlbGV0ZSByZXNwb25zZS5kYXRhLnJlcG9zaXRvcnlfc2VsZWN0aW9uO1xuICBkZWxldGUgcmVzcG9uc2UuZGF0YS50b3RhbF9jb3VudDtcbiAgZGVsZXRlIHJlc3BvbnNlLmRhdGEudG90YWxfY29tbWl0cztcbiAgY29uc3QgbmFtZXNwYWNlS2V5ID0gT2JqZWN0LmtleXMocmVzcG9uc2UuZGF0YSlbMF07XG4gIGNvbnN0IGRhdGEgPSByZXNwb25zZS5kYXRhW25hbWVzcGFjZUtleV07XG4gIHJlc3BvbnNlLmRhdGEgPSBkYXRhO1xuICBpZiAodHlwZW9mIGluY29tcGxldGVSZXN1bHRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmVzcG9uc2UuZGF0YS5pbmNvbXBsZXRlX3Jlc3VsdHMgPSBpbmNvbXBsZXRlUmVzdWx0cztcbiAgfVxuICBpZiAodHlwZW9mIHJlcG9zaXRvcnlTZWxlY3Rpb24gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXNwb25zZS5kYXRhLnJlcG9zaXRvcnlfc2VsZWN0aW9uID0gcmVwb3NpdG9yeVNlbGVjdGlvbjtcbiAgfVxuICByZXNwb25zZS5kYXRhLnRvdGFsX2NvdW50ID0gdG90YWxDb3VudDtcbiAgcmVzcG9uc2UuZGF0YS50b3RhbF9jb21taXRzID0gdG90YWxDb21taXRzO1xuICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9pdGVyYXRvci5qc1xuZnVuY3Rpb24gaXRlcmF0b3Iob2N0b2tpdCwgcm91dGUsIHBhcmFtZXRlcnMpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IHR5cGVvZiByb3V0ZSA9PT0gXCJmdW5jdGlvblwiID8gcm91dGUuZW5kcG9pbnQocGFyYW1ldGVycykgOiBvY3Rva2l0LnJlcXVlc3QuZW5kcG9pbnQocm91dGUsIHBhcmFtZXRlcnMpO1xuICBjb25zdCByZXF1ZXN0TWV0aG9kID0gdHlwZW9mIHJvdXRlID09PSBcImZ1bmN0aW9uXCIgPyByb3V0ZSA6IG9jdG9raXQucmVxdWVzdDtcbiAgY29uc3QgbWV0aG9kID0gb3B0aW9ucy5tZXRob2Q7XG4gIGNvbnN0IGhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnM7XG4gIGxldCB1cmwgPSBvcHRpb25zLnVybDtcbiAgcmV0dXJuIHtcbiAgICBbU3ltYm9sLmFzeW5jSXRlcmF0b3JdOiAoKSA9PiAoe1xuICAgICAgYXN5bmMgbmV4dCgpIHtcbiAgICAgICAgaWYgKCF1cmwpIHJldHVybiB7IGRvbmU6IHRydWUgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RNZXRob2QoeyBtZXRob2QsIHVybCwgaGVhZGVycyB9KTtcbiAgICAgICAgICBjb25zdCBub3JtYWxpemVkUmVzcG9uc2UgPSBub3JtYWxpemVQYWdpbmF0ZWRMaXN0UmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgIHVybCA9ICgobm9ybWFsaXplZFJlc3BvbnNlLmhlYWRlcnMubGluayB8fCBcIlwiKS5tYXRjaChcbiAgICAgICAgICAgIC88KFtePD5dKyk+O1xccypyZWw9XCJuZXh0XCIvXG4gICAgICAgICAgKSB8fCBbXSlbMV07XG4gICAgICAgICAgaWYgKCF1cmwgJiYgXCJ0b3RhbF9jb21taXRzXCIgaW4gbm9ybWFsaXplZFJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwobm9ybWFsaXplZFJlc3BvbnNlLnVybCk7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBwYXJzZWRVcmwuc2VhcmNoUGFyYW1zO1xuICAgICAgICAgICAgY29uc3QgcGFnZSA9IHBhcnNlSW50KHBhcmFtcy5nZXQoXCJwYWdlXCIpIHx8IFwiMVwiLCAxMCk7XG4gICAgICAgICAgICBjb25zdCBwZXJfcGFnZSA9IHBhcnNlSW50KHBhcmFtcy5nZXQoXCJwZXJfcGFnZVwiKSB8fCBcIjI1MFwiLCAxMCk7XG4gICAgICAgICAgICBpZiAocGFnZSAqIHBlcl9wYWdlIDwgbm9ybWFsaXplZFJlc3BvbnNlLmRhdGEudG90YWxfY29tbWl0cykge1xuICAgICAgICAgICAgICBwYXJhbXMuc2V0KFwicGFnZVwiLCBTdHJpbmcocGFnZSArIDEpKTtcbiAgICAgICAgICAgICAgdXJsID0gcGFyc2VkVXJsLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBub3JtYWxpemVkUmVzcG9uc2UgfTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzICE9PSA0MDkpIHRocm93IGVycm9yO1xuICAgICAgICAgIHVybCA9IFwiXCI7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfTtcbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL3BhZ2luYXRlLmpzXG5mdW5jdGlvbiBwYWdpbmF0ZShvY3Rva2l0LCByb3V0ZSwgcGFyYW1ldGVycywgbWFwRm4pIHtcbiAgaWYgKHR5cGVvZiBwYXJhbWV0ZXJzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBtYXBGbiA9IHBhcmFtZXRlcnM7XG4gICAgcGFyYW1ldGVycyA9IHZvaWQgMDtcbiAgfVxuICByZXR1cm4gZ2F0aGVyKFxuICAgIG9jdG9raXQsXG4gICAgW10sXG4gICAgaXRlcmF0b3Iob2N0b2tpdCwgcm91dGUsIHBhcmFtZXRlcnMpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpLFxuICAgIG1hcEZuXG4gICk7XG59XG5mdW5jdGlvbiBnYXRoZXIob2N0b2tpdCwgcmVzdWx0cywgaXRlcmF0b3IyLCBtYXBGbikge1xuICByZXR1cm4gaXRlcmF0b3IyLm5leHQoKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICBpZiAocmVzdWx0LmRvbmUpIHtcbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICBsZXQgZWFybHlFeGl0ID0gZmFsc2U7XG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIGVhcmx5RXhpdCA9IHRydWU7XG4gICAgfVxuICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChcbiAgICAgIG1hcEZuID8gbWFwRm4ocmVzdWx0LnZhbHVlLCBkb25lKSA6IHJlc3VsdC52YWx1ZS5kYXRhXG4gICAgKTtcbiAgICBpZiAoZWFybHlFeGl0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgcmV0dXJuIGdhdGhlcihvY3Rva2l0LCByZXN1bHRzLCBpdGVyYXRvcjIsIG1hcEZuKTtcbiAgfSk7XG59XG5cbi8vIHBrZy9kaXN0LXNyYy9jb21wb3NlLXBhZ2luYXRlLmpzXG52YXIgY29tcG9zZVBhZ2luYXRlUmVzdCA9IE9iamVjdC5hc3NpZ24ocGFnaW5hdGUsIHtcbiAgaXRlcmF0b3Jcbn0pO1xuXG4vLyBwa2cvZGlzdC1zcmMvZ2VuZXJhdGVkL3BhZ2luYXRpbmctZW5kcG9pbnRzLmpzXG52YXIgcGFnaW5hdGluZ0VuZHBvaW50cyA9IFtcbiAgXCJHRVQgL2Fkdmlzb3JpZXNcIixcbiAgXCJHRVQgL2FwcC9ob29rL2RlbGl2ZXJpZXNcIixcbiAgXCJHRVQgL2FwcC9pbnN0YWxsYXRpb24tcmVxdWVzdHNcIixcbiAgXCJHRVQgL2FwcC9pbnN0YWxsYXRpb25zXCIsXG4gIFwiR0VUIC9hc3NpZ25tZW50cy97YXNzaWdubWVudF9pZH0vYWNjZXB0ZWRfYXNzaWdubWVudHNcIixcbiAgXCJHRVQgL2NsYXNzcm9vbXNcIixcbiAgXCJHRVQgL2NsYXNzcm9vbXMve2NsYXNzcm9vbV9pZH0vYXNzaWdubWVudHNcIixcbiAgXCJHRVQgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS9jb2RlLXNlY3VyaXR5L2NvbmZpZ3VyYXRpb25zXCIsXG4gIFwiR0VUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vY29kZS1zZWN1cml0eS9jb25maWd1cmF0aW9ucy97Y29uZmlndXJhdGlvbl9pZH0vcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vZGVwZW5kYWJvdC9hbGVydHNcIixcbiAgXCJHRVQgL2VudGVycHJpc2VzL3tlbnRlcnByaXNlfS90ZWFtc1wiLFxuICBcIkdFVCAvZW50ZXJwcmlzZXMve2VudGVycHJpc2V9L3RlYW1zL3tlbnRlcnByaXNlLXRlYW19L21lbWJlcnNoaXBzXCIsXG4gIFwiR0VUIC9lbnRlcnByaXNlcy97ZW50ZXJwcmlzZX0vdGVhbXMve2VudGVycHJpc2UtdGVhbX0vb3JnYW5pemF0aW9uc1wiLFxuICBcIkdFVCAvZXZlbnRzXCIsXG4gIFwiR0VUIC9naXN0c1wiLFxuICBcIkdFVCAvZ2lzdHMvcHVibGljXCIsXG4gIFwiR0VUIC9naXN0cy9zdGFycmVkXCIsXG4gIFwiR0VUIC9naXN0cy97Z2lzdF9pZH0vY29tbWVudHNcIixcbiAgXCJHRVQgL2dpc3RzL3tnaXN0X2lkfS9jb21taXRzXCIsXG4gIFwiR0VUIC9naXN0cy97Z2lzdF9pZH0vZm9ya3NcIixcbiAgXCJHRVQgL2luc3RhbGxhdGlvbi9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL2lzc3Vlc1wiLFxuICBcIkdFVCAvbGljZW5zZXNcIixcbiAgXCJHRVQgL21hcmtldHBsYWNlX2xpc3RpbmcvcGxhbnNcIixcbiAgXCJHRVQgL21hcmtldHBsYWNlX2xpc3RpbmcvcGxhbnMve3BsYW5faWR9L2FjY291bnRzXCIsXG4gIFwiR0VUIC9tYXJrZXRwbGFjZV9saXN0aW5nL3N0dWJiZWQvcGxhbnNcIixcbiAgXCJHRVQgL21hcmtldHBsYWNlX2xpc3Rpbmcvc3R1YmJlZC9wbGFucy97cGxhbl9pZH0vYWNjb3VudHNcIixcbiAgXCJHRVQgL25ldHdvcmtzL3tvd25lcn0ve3JlcG99L2V2ZW50c1wiLFxuICBcIkdFVCAvbm90aWZpY2F0aW9uc1wiLFxuICBcIkdFVCAvb3JnYW5pemF0aW9uc1wiLFxuICBcIkdFVCAvb3JnYW5pemF0aW9ucy97b3JnfS9kZXBlbmRhYm90L3JlcG9zaXRvcnktYWNjZXNzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvY2FjaGUvdXNhZ2UtYnktcmVwb3NpdG9yeVwiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL2hvc3RlZC1ydW5uZXJzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcGVybWlzc2lvbnMvcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcGVybWlzc2lvbnMvc2VsZi1ob3N0ZWQtcnVubmVycy9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9ydW5uZXItZ3JvdXBzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVyLWdyb3Vwcy97cnVubmVyX2dyb3VwX2lkfS9ob3N0ZWQtcnVubmVyc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3J1bm5lci1ncm91cHMve3J1bm5lcl9ncm91cF9pZH0vcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVyLWdyb3Vwcy97cnVubmVyX2dyb3VwX2lkfS9ydW5uZXJzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvcnVubmVyc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9hY3Rpb25zL3NlY3JldHNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vYWN0aW9ucy9zZWNyZXRzL3tzZWNyZXRfbmFtZX0vcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvdmFyaWFibGVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2FjdGlvbnMvdmFyaWFibGVzL3tuYW1lfS9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vYXR0ZXN0YXRpb25zL3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9hdHRlc3RhdGlvbnMve3N1YmplY3RfZGlnZXN0fVwiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9ibG9ja3NcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vY2FtcGFpZ25zXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2NvZGUtc2Nhbm5pbmcvYWxlcnRzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2NvZGUtc2VjdXJpdHkvY29uZmlndXJhdGlvbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vY29kZS1zZWN1cml0eS9jb25maWd1cmF0aW9ucy97Y29uZmlndXJhdGlvbl9pZH0vcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2NvZGVzcGFjZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vY29kZXNwYWNlcy9zZWNyZXRzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2NvZGVzcGFjZXMvc2VjcmV0cy97c2VjcmV0X25hbWV9L3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9jb3BpbG90L2JpbGxpbmcvc2VhdHNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vY29waWxvdC9tZXRyaWNzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2RlcGVuZGFib3QvYWxlcnRzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2RlcGVuZGFib3Qvc2VjcmV0c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9kZXBlbmRhYm90L3NlY3JldHMve3NlY3JldF9uYW1lfS9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vZXZlbnRzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2ZhaWxlZF9pbnZpdGF0aW9uc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9ob29rc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9ob29rcy97aG9va19pZH0vZGVsaXZlcmllc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9pbnNpZ2h0cy9hcGkvcm91dGUtc3RhdHMve2FjdG9yX3R5cGV9L3thY3Rvcl9pZH1cIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vaW5zaWdodHMvYXBpL3N1YmplY3Qtc3RhdHNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vaW5zaWdodHMvYXBpL3VzZXItc3RhdHMve3VzZXJfaWR9XCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2luc3RhbGxhdGlvbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vaW52aXRhdGlvbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vaW52aXRhdGlvbnMve2ludml0YXRpb25faWR9L3RlYW1zXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L2lzc3Vlc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9tZW1iZXJzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L21lbWJlcnMve3VzZXJuYW1lfS9jb2Rlc3BhY2VzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L21pZ3JhdGlvbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vbWlncmF0aW9ucy97bWlncmF0aW9uX2lkfS9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vb3JnYW5pemF0aW9uLXJvbGVzL3tyb2xlX2lkfS90ZWFtc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9vcmdhbml6YXRpb24tcm9sZXMve3JvbGVfaWR9L3VzZXJzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L291dHNpZGVfY29sbGFib3JhdG9yc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9wYWNrYWdlc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9wYWNrYWdlcy97cGFja2FnZV90eXBlfS97cGFja2FnZV9uYW1lfS92ZXJzaW9uc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9wZXJzb25hbC1hY2Nlc3MtdG9rZW4tcmVxdWVzdHNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcGVyc29uYWwtYWNjZXNzLXRva2VuLXJlcXVlc3RzL3twYXRfcmVxdWVzdF9pZH0vcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3BlcnNvbmFsLWFjY2Vzcy10b2tlbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcGVyc29uYWwtYWNjZXNzLXRva2Vucy97cGF0X2lkfS9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcHJpdmF0ZS1yZWdpc3RyaWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3Byb2plY3RzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3Byb2plY3RzVjJcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcHJvamVjdHNWMi97cHJvamVjdF9udW1iZXJ9L2ZpZWxkc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9wcm9qZWN0c1YyL3twcm9qZWN0X251bWJlcn0vaXRlbXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcHJvcGVydGllcy92YWx1ZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcHVibGljX21lbWJlcnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcmVwb3NcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcnVsZXNldHNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcnVsZXNldHMvcnVsZS1zdWl0ZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vcnVsZXNldHMve3J1bGVzZXRfaWR9L2hpc3RvcnlcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vc2VjcmV0LXNjYW5uaW5nL2FsZXJ0c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS9zZWN1cml0eS1hZHZpc29yaWVzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3NldHRpbmdzL2ltbXV0YWJsZS1yZWxlYXNlcy9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vc2V0dGluZ3MvbmV0d29yay1jb25maWd1cmF0aW9uc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtL3t0ZWFtX3NsdWd9L2NvcGlsb3QvbWV0cmljc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9uc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L2NvbW1lbnRzXCIsXG4gIFwiR0VUIC9vcmdzL3tvcmd9L3RlYW1zL3t0ZWFtX3NsdWd9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vY29tbWVudHMve2NvbW1lbnRfbnVtYmVyfS9yZWFjdGlvbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9yZWFjdGlvbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vaW52aXRhdGlvbnNcIixcbiAgXCJHRVQgL29yZ3Mve29yZ30vdGVhbXMve3RlYW1fc2x1Z30vbWVtYmVyc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9wcm9qZWN0c1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS9yZXBvc1wiLFxuICBcIkdFVCAvb3Jncy97b3JnfS90ZWFtcy97dGVhbV9zbHVnfS90ZWFtc1wiLFxuICBcIkdFVCAvcHJvamVjdHMve3Byb2plY3RfaWR9L2NvbGxhYm9yYXRvcnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvYXJ0aWZhY3RzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL2NhY2hlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9vcmdhbml6YXRpb24tc2VjcmV0c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9vcmdhbml6YXRpb24tdmFyaWFibGVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3J1bm5lcnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvcnVuc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L2FydGlmYWN0c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L2F0dGVtcHRzL3thdHRlbXB0X251bWJlcn0vam9ic1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy9ydW5zL3tydW5faWR9L2pvYnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvc2VjcmV0c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vYWN0aW9ucy92YXJpYWJsZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGlvbnMvd29ya2Zsb3dzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hY3Rpb25zL3dvcmtmbG93cy97d29ya2Zsb3dfaWR9L3J1bnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2FjdGl2aXR5XCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9hc3NpZ25lZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2F0dGVzdGF0aW9ucy97c3ViamVjdF9kaWdlc3R9XCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9icmFuY2hlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stcnVucy97Y2hlY2tfcnVuX2lkfS9hbm5vdGF0aW9uc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY2hlY2stc3VpdGVzL3tjaGVja19zdWl0ZV9pZH0vY2hlY2stcnVuc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbGVydHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvZGUtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9L2luc3RhbmNlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZS1zY2FubmluZy9hbmFseXNlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29kZXNwYWNlcy9kZXZjb250YWluZXJzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb2Rlc3BhY2VzL3NlY3JldHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbGxhYm9yYXRvcnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1lbnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21tZW50cy97Y29tbWVudF9pZH0vcmVhY3Rpb25zXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tjb21taXRfc2hhfS9jb21tZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97Y29tbWl0X3NoYX0vcHVsbHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve3JlZn0vY2hlY2stcnVuc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vY29tbWl0cy97cmVmfS9jaGVjay1zdWl0ZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbW1pdHMve3JlZn0vc3RhdHVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21taXRzL3tyZWZ9L3N0YXR1c2VzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb21wYXJlL3tiYXNlaGVhZH1cIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2NvbXBhcmUve2Jhc2V9Li4ue2hlYWR9XCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb250cmlidXRvcnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGVuZGFib3QvYWxlcnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBlbmRhYm90L3NlY3JldHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2RlcGxveW1lbnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9kZXBsb3ltZW50cy97ZGVwbG95bWVudF9pZH0vc3RhdHVzZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2Vudmlyb25tZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50LWJyYW5jaC1wb2xpY2llc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9kZXBsb3ltZW50X3Byb3RlY3Rpb25fcnVsZXMvYXBwc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZW52aXJvbm1lbnRzL3tlbnZpcm9ubWVudF9uYW1lfS9zZWNyZXRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9lbnZpcm9ubWVudHMve2Vudmlyb25tZW50X25hbWV9L3ZhcmlhYmxlc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vZXZlbnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9mb3Jrc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaG9va3NcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2hvb2tzL3tob29rX2lkfS9kZWxpdmVyaWVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pbnZpdGF0aW9uc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvY29tbWVudHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy9jb21tZW50cy97Y29tbWVudF9pZH0vcmVhY3Rpb25zXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMvZXZlbnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9pc3N1ZXMve2lzc3VlX251bWJlcn0vY29tbWVudHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS9kZXBlbmRlbmNpZXMvYmxvY2tlZF9ieVwiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2RlcGVuZGVuY2llcy9ibG9ja2luZ1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2V2ZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L2xhYmVsc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L3JlYWN0aW9uc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vaXNzdWVzL3tpc3N1ZV9udW1iZXJ9L3N1Yl9pc3N1ZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L2lzc3Vlcy97aXNzdWVfbnVtYmVyfS90aW1lbGluZVwiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30va2V5c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vbGFiZWxzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9taWxlc3RvbmVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9taWxlc3RvbmVzL3ttaWxlc3RvbmVfbnVtYmVyfS9sYWJlbHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L25vdGlmaWNhdGlvbnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3BhZ2VzL2J1aWxkc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHJvamVjdHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy9jb21tZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMvY29tbWVudHMve2NvbW1lbnRfaWR9L3JlYWN0aW9uc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9jb21tZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcHVsbHMve3B1bGxfbnVtYmVyfS9jb21taXRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L2ZpbGVzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9wdWxscy97cHVsbF9udW1iZXJ9L3Jldmlld3NcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3B1bGxzL3twdWxsX251bWJlcn0vcmV2aWV3cy97cmV2aWV3X2lkfS9jb21tZW50c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcmVsZWFzZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL3tyZWxlYXNlX2lkfS9hc3NldHNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3JlbGVhc2VzL3tyZWxlYXNlX2lkfS9yZWFjdGlvbnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzL2JyYW5jaGVzL3ticmFuY2h9XCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9ydWxlc2V0c1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vcnVsZXNldHMvcnVsZS1zdWl0ZXNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3J1bGVzZXRzL3tydWxlc2V0X2lkfS9oaXN0b3J5XCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWNyZXQtc2Nhbm5pbmcvYWxlcnRzXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9zZWNyZXQtc2Nhbm5pbmcvYWxlcnRzL3thbGVydF9udW1iZXJ9L2xvY2F0aW9uc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc2VjdXJpdHktYWR2aXNvcmllc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3RhcmdhemVyc1wiLFxuICBcIkdFVCAvcmVwb3Mve293bmVyfS97cmVwb30vc3Vic2NyaWJlcnNcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RhZ3NcIixcbiAgXCJHRVQgL3JlcG9zL3tvd25lcn0ve3JlcG99L3RlYW1zXCIsXG4gIFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS90b3BpY3NcIixcbiAgXCJHRVQgL3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvc2VhcmNoL2NvZGVcIixcbiAgXCJHRVQgL3NlYXJjaC9jb21taXRzXCIsXG4gIFwiR0VUIC9zZWFyY2gvaXNzdWVzXCIsXG4gIFwiR0VUIC9zZWFyY2gvbGFiZWxzXCIsXG4gIFwiR0VUIC9zZWFyY2gvcmVwb3NpdG9yaWVzXCIsXG4gIFwiR0VUIC9zZWFyY2gvdG9waWNzXCIsXG4gIFwiR0VUIC9zZWFyY2gvdXNlcnNcIixcbiAgXCJHRVQgL3RlYW1zL3t0ZWFtX2lkfS9kaXNjdXNzaW9uc1wiLFxuICBcIkdFVCAvdGVhbXMve3RlYW1faWR9L2Rpc2N1c3Npb25zL3tkaXNjdXNzaW9uX251bWJlcn0vY29tbWVudHNcIixcbiAgXCJHRVQgL3RlYW1zL3t0ZWFtX2lkfS9kaXNjdXNzaW9ucy97ZGlzY3Vzc2lvbl9udW1iZXJ9L2NvbW1lbnRzL3tjb21tZW50X251bWJlcn0vcmVhY3Rpb25zXCIsXG4gIFwiR0VUIC90ZWFtcy97dGVhbV9pZH0vZGlzY3Vzc2lvbnMve2Rpc2N1c3Npb25fbnVtYmVyfS9yZWFjdGlvbnNcIixcbiAgXCJHRVQgL3RlYW1zL3t0ZWFtX2lkfS9pbnZpdGF0aW9uc1wiLFxuICBcIkdFVCAvdGVhbXMve3RlYW1faWR9L21lbWJlcnNcIixcbiAgXCJHRVQgL3RlYW1zL3t0ZWFtX2lkfS9wcm9qZWN0c1wiLFxuICBcIkdFVCAvdGVhbXMve3RlYW1faWR9L3JlcG9zXCIsXG4gIFwiR0VUIC90ZWFtcy97dGVhbV9pZH0vdGVhbXNcIixcbiAgXCJHRVQgL3VzZXIvYmxvY2tzXCIsXG4gIFwiR0VUIC91c2VyL2NvZGVzcGFjZXNcIixcbiAgXCJHRVQgL3VzZXIvY29kZXNwYWNlcy9zZWNyZXRzXCIsXG4gIFwiR0VUIC91c2VyL2VtYWlsc1wiLFxuICBcIkdFVCAvdXNlci9mb2xsb3dlcnNcIixcbiAgXCJHRVQgL3VzZXIvZm9sbG93aW5nXCIsXG4gIFwiR0VUIC91c2VyL2dwZ19rZXlzXCIsXG4gIFwiR0VUIC91c2VyL2luc3RhbGxhdGlvbnNcIixcbiAgXCJHRVQgL3VzZXIvaW5zdGFsbGF0aW9ucy97aW5zdGFsbGF0aW9uX2lkfS9yZXBvc2l0b3JpZXNcIixcbiAgXCJHRVQgL3VzZXIvaXNzdWVzXCIsXG4gIFwiR0VUIC91c2VyL2tleXNcIixcbiAgXCJHRVQgL3VzZXIvbWFya2V0cGxhY2VfcHVyY2hhc2VzXCIsXG4gIFwiR0VUIC91c2VyL21hcmtldHBsYWNlX3B1cmNoYXNlcy9zdHViYmVkXCIsXG4gIFwiR0VUIC91c2VyL21lbWJlcnNoaXBzL29yZ3NcIixcbiAgXCJHRVQgL3VzZXIvbWlncmF0aW9uc1wiLFxuICBcIkdFVCAvdXNlci9taWdyYXRpb25zL3ttaWdyYXRpb25faWR9L3JlcG9zaXRvcmllc1wiLFxuICBcIkdFVCAvdXNlci9vcmdzXCIsXG4gIFwiR0VUIC91c2VyL3BhY2thZ2VzXCIsXG4gIFwiR0VUIC91c2VyL3BhY2thZ2VzL3twYWNrYWdlX3R5cGV9L3twYWNrYWdlX25hbWV9L3ZlcnNpb25zXCIsXG4gIFwiR0VUIC91c2VyL3B1YmxpY19lbWFpbHNcIixcbiAgXCJHRVQgL3VzZXIvcmVwb3NcIixcbiAgXCJHRVQgL3VzZXIvcmVwb3NpdG9yeV9pbnZpdGF0aW9uc1wiLFxuICBcIkdFVCAvdXNlci9zb2NpYWxfYWNjb3VudHNcIixcbiAgXCJHRVQgL3VzZXIvc3NoX3NpZ25pbmdfa2V5c1wiLFxuICBcIkdFVCAvdXNlci9zdGFycmVkXCIsXG4gIFwiR0VUIC91c2VyL3N1YnNjcmlwdGlvbnNcIixcbiAgXCJHRVQgL3VzZXIvdGVhbXNcIixcbiAgXCJHRVQgL3VzZXJzXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L2F0dGVzdGF0aW9ucy97c3ViamVjdF9kaWdlc3R9XCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L2V2ZW50c1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9ldmVudHMvb3Jncy97b3JnfVwiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9ldmVudHMvcHVibGljXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L2ZvbGxvd2Vyc1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9mb2xsb3dpbmdcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZ2lzdHNcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vZ3BnX2tleXNcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0va2V5c1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9vcmdzXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3BhY2thZ2VzXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3Byb2plY3RzXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3Byb2plY3RzVjJcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcHJvamVjdHNWMi97cHJvamVjdF9udW1iZXJ9L2ZpZWxkc1wiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9wcm9qZWN0c1YyL3twcm9qZWN0X251bWJlcn0vaXRlbXNcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcmVjZWl2ZWRfZXZlbnRzXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3JlY2VpdmVkX2V2ZW50cy9wdWJsaWNcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vcmVwb3NcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vc29jaWFsX2FjY291bnRzXCIsXG4gIFwiR0VUIC91c2Vycy97dXNlcm5hbWV9L3NzaF9zaWduaW5nX2tleXNcIixcbiAgXCJHRVQgL3VzZXJzL3t1c2VybmFtZX0vc3RhcnJlZFwiLFxuICBcIkdFVCAvdXNlcnMve3VzZXJuYW1lfS9zdWJzY3JpcHRpb25zXCJcbl07XG5cbi8vIHBrZy9kaXN0LXNyYy9wYWdpbmF0aW5nLWVuZHBvaW50cy5qc1xuZnVuY3Rpb24gaXNQYWdpbmF0aW5nRW5kcG9pbnQoYXJnKSB7XG4gIGlmICh0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIHBhZ2luYXRpbmdFbmRwb2ludHMuaW5jbHVkZXMoYXJnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gcGtnL2Rpc3Qtc3JjL2luZGV4LmpzXG5mdW5jdGlvbiBwYWdpbmF0ZVJlc3Qob2N0b2tpdCkge1xuICByZXR1cm4ge1xuICAgIHBhZ2luYXRlOiBPYmplY3QuYXNzaWduKHBhZ2luYXRlLmJpbmQobnVsbCwgb2N0b2tpdCksIHtcbiAgICAgIGl0ZXJhdG9yOiBpdGVyYXRvci5iaW5kKG51bGwsIG9jdG9raXQpXG4gICAgfSlcbiAgfTtcbn1cbnBhZ2luYXRlUmVzdC5WRVJTSU9OID0gVkVSU0lPTjtcbmV4cG9ydCB7XG4gIGNvbXBvc2VQYWdpbmF0ZVJlc3QsXG4gIGlzUGFnaW5hdGluZ0VuZHBvaW50LFxuICBwYWdpbmF0ZVJlc3QsXG4gIHBhZ2luYXRpbmdFbmRwb2ludHNcbn07XG4iLCJpbXBvcnQgKiBhcyBDb250ZXh0IGZyb20gJy4vY29udGV4dC5qcyc7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL2ludGVybmFsL3V0aWxzLmpzJztcbi8vIG9jdG9raXQgKyBwbHVnaW5zXG5pbXBvcnQgeyBPY3Rva2l0IH0gZnJvbSAnQG9jdG9raXQvY29yZSc7XG5pbXBvcnQgeyByZXN0RW5kcG9pbnRNZXRob2RzIH0gZnJvbSAnQG9jdG9raXQvcGx1Z2luLXJlc3QtZW5kcG9pbnQtbWV0aG9kcyc7XG5pbXBvcnQgeyBwYWdpbmF0ZVJlc3QgfSBmcm9tICdAb2N0b2tpdC9wbHVnaW4tcGFnaW5hdGUtcmVzdCc7XG5leHBvcnQgY29uc3QgY29udGV4dCA9IG5ldyBDb250ZXh0LkNvbnRleHQoKTtcbmNvbnN0IGJhc2VVcmwgPSBVdGlscy5nZXRBcGlCYXNlVXJsKCk7XG5leHBvcnQgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgYmFzZVVybCxcbiAgICByZXF1ZXN0OiB7XG4gICAgICAgIGFnZW50OiBVdGlscy5nZXRQcm94eUFnZW50KGJhc2VVcmwpLFxuICAgICAgICBmZXRjaDogVXRpbHMuZ2V0UHJveHlGZXRjaChiYXNlVXJsKVxuICAgIH1cbn07XG5leHBvcnQgY29uc3QgR2l0SHViID0gT2N0b2tpdC5wbHVnaW4ocmVzdEVuZHBvaW50TWV0aG9kcywgcGFnaW5hdGVSZXN0KS5kZWZhdWx0cyhkZWZhdWx0cyk7XG4vKipcbiAqIENvbnZpZW5jZSBmdW5jdGlvbiB0byBjb3JyZWN0bHkgZm9ybWF0IE9jdG9raXQgT3B0aW9ucyB0byBwYXNzIGludG8gdGhlIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSAgICAgdG9rZW4gICAgdGhlIHJlcG8gUEFUIG9yIEdJVEhVQl9UT0tFTlxuICogQHBhcmFtICAgICBvcHRpb25zICBvdGhlciBvcHRpb25zIHRvIHNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2N0b2tpdE9wdGlvbnModG9rZW4sIG9wdGlvbnMpIHtcbiAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyB8fCB7fSk7IC8vIFNoYWxsb3cgY2xvbmUgLSBkb24ndCBtdXRhdGUgdGhlIG9iamVjdCBwcm92aWRlZCBieSB0aGUgY2FsbGVyXG4gICAgLy8gQXV0aFxuICAgIGNvbnN0IGF1dGggPSBVdGlscy5nZXRBdXRoU3RyaW5nKHRva2VuLCBvcHRzKTtcbiAgICBpZiAoYXV0aCkge1xuICAgICAgICBvcHRzLmF1dGggPSBhdXRoO1xuICAgIH1cbiAgICByZXR1cm4gb3B0cztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWxzLmpzLm1hcCIsImltcG9ydCAqIGFzIENvbnRleHQgZnJvbSAnLi9jb250ZXh0LmpzJztcbmltcG9ydCB7IEdpdEh1YiwgZ2V0T2N0b2tpdE9wdGlvbnMgfSBmcm9tICcuL3V0aWxzLmpzJztcbmV4cG9ydCBjb25zdCBjb250ZXh0ID0gbmV3IENvbnRleHQuQ29udGV4dCgpO1xuLyoqXG4gKiBSZXR1cm5zIGEgaHlkcmF0ZWQgb2N0b2tpdCByZWFkeSB0byB1c2UgZm9yIEdpdEh1YiBBY3Rpb25zXG4gKlxuICogQHBhcmFtICAgICB0b2tlbiAgICB0aGUgcmVwbyBQQVQgb3IgR0lUSFVCX1RPS0VOXG4gKiBAcGFyYW0gICAgIG9wdGlvbnMgIG90aGVyIG9wdGlvbnMgdG8gc2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPY3Rva2l0KHRva2VuLCBvcHRpb25zLCAuLi5hZGRpdGlvbmFsUGx1Z2lucykge1xuICAgIGNvbnN0IEdpdEh1YldpdGhQbHVnaW5zID0gR2l0SHViLnBsdWdpbiguLi5hZGRpdGlvbmFsUGx1Z2lucyk7XG4gICAgcmV0dXJuIG5ldyBHaXRIdWJXaXRoUGx1Z2lucyhnZXRPY3Rva2l0T3B0aW9ucyh0b2tlbiwgb3B0aW9ucykpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2l0aHViLmpzLm1hcCIsImltcG9ydCB7IHNldEZhaWxlZCB9IGZyb20gJ0BhY3Rpb25zL2NvcmUnO1xuaW1wb3J0IHsgY29udGV4dCB9IGZyb20gJ0BhY3Rpb25zL2dpdGh1Yic7XG5pbXBvcnQgeyBPY3Rva2l0IH0gZnJvbSAnLi4vLi4vdHlwZXMvbW9kZWxzL2dpdGh1Yi9vY3Rva2l0LmpzJztcblxuZXhwb3J0IHR5cGUgQ3JlYXRlTmV3R2l0QnJhbmNoUGFyYW1zID0ge1xuICBvd25lcjogc3RyaW5nO1xuICByZXBvOiBzdHJpbmc7XG4gIGJyYW5jaE5hbWU6IHN0cmluZztcbiAgYmFzZUJyYW5jaD86IHN0cmluZztcbn07XG5cbi8qKlxuICogRmFjdG9yeSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gYXN5bmMgZnVuY3Rpb24gdG8gY3JlYXRlIGEgbmV3IEdpdCBicmFuY2ggaW4gYSBHaXRIdWIgcmVwb3NpdG9yeSB1c2luZyBPY3Rva2l0LlxuICpcbiAqIEBwYXJhbSBvY3Rva2l0IC0gQW4gYXV0aGVudGljYXRlZCBPY3Rva2l0IGluc3RhbmNlIGZvciBpbnRlcmFjdGluZyB3aXRoIHRoZSBHaXRIdWIgQVBJLlxuICogQHJldHVybnMgQW4gYXN5bmMgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgbmV3IGJyYW5jaCBmcm9tIGEgc3BlY2lmaWVkIGJhc2UgYnJhbmNoLlxuICpcbiAqIEBmdW5jdGlvblxuICogQGFzeW5jXG4gKiBAcGFyYW0gb3duZXIgLSBUaGUgb3duZXIgb2YgdGhlIHJlcG9zaXRvcnkuXG4gKiBAcGFyYW0gcmVwbyAtIFRoZSBuYW1lIG9mIHRoZSByZXBvc2l0b3J5LlxuICogQHBhcmFtIGJyYW5jaE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgbmV3IGJyYW5jaCB0byBjcmVhdGUuXG4gKiBAcGFyYW0gYmFzZUJyYW5jaCAtIChPcHRpb25hbCkgVGhlIG5hbWUgb2YgdGhlIGJhc2UgYnJhbmNoIHRvIGJyYW5jaCBmcm9tLiBEZWZhdWx0cyB0byB0aGUgY3VycmVudCBjb250ZXh0IHJlZiBvciAnbWFpbicuXG4gKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBicmFuY2ggZGF0YSBpZiBzdWNjZXNzZnVsOyBvdGhlcndpc2UsIGhhbmRsZXMgZXJyb3JzIGFuZCBzZXRzIHRoZSBmYWlsdXJlIHN0YXRlLlxuICpcbiAqIEB0aHJvd3MgV2lsbCBjYWxsIGBzZXRGYWlsZWRgIGlmIHRoZSBicmFuY2ggY3JlYXRpb24gZmFpbHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOZXdHaXRCcmFuY2gob2N0b2tpdDogT2N0b2tpdCkge1xuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gY3JlYXRlTmV3R2l0QnJhbmNoKHtcbiAgICBiYXNlQnJhbmNoID0gY29udGV4dC5yZWYuc3BsaXQoJy8nKS5wb3AoKSB8fCAnbWFpbicsXG4gICAgYnJhbmNoTmFtZSxcbiAgICBvd25lcixcbiAgICByZXBvLFxuICB9OiBDcmVhdGVOZXdHaXRCcmFuY2hQYXJhbXMpIHtcbiAgICB0cnkge1xuICAgICAgLy8gR2V0IHRoZSBsYXRlc3QgY29tbWl0IGZyb20gdGhlIGJhc2UgYnJhbmNoXG4gICAgICBjb25zdCB7IGRhdGE6IHJlZkRhdGEgfSA9IGF3YWl0IG9jdG9raXQucmVzdC5naXQuZ2V0UmVmKHtcbiAgICAgICAgb3duZXIsXG4gICAgICAgIHJlcG8sXG4gICAgICAgIHJlZjogYGhlYWRzLyR7YmFzZUJyYW5jaH1gLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIENyZWF0ZSBhIG5ldyBicmFuY2ggZnJvbSB0aGUgbGF0ZXN0IGNvbW1pdFxuICAgICAgY29uc3QgeyBkYXRhOiBuZXdCcmFuY2ggfSA9IGF3YWl0IG9jdG9raXQucmVzdC5naXQuY3JlYXRlUmVmKHtcbiAgICAgICAgb3duZXIsXG4gICAgICAgIHJlcG8sXG4gICAgICAgIHJlZjogYHJlZnMvaGVhZHMvJHticmFuY2hOYW1lfWAsXG4gICAgICAgIHNoYTogcmVmRGF0YS5vYmplY3Quc2hhLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBuZXdCcmFuY2g7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHNldEZhaWxlZChgRmFpbGVkIHRvIGNyZWF0ZSBuZXcgZ2l0IGJyYW5jaDogJHtlcnJvci5tZXNzYWdlfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0RmFpbGVkKCdGYWlsZWQgdG8gY3JlYXRlIG5ldyBnaXQgYnJhbmNoOiBVbmtub3duIGVycm9yJyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl0sInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0XSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxJQUFhLFVBQWIsTUFBcUI7Ozs7Q0FJakIsY0FBYztFQUNWLElBQUksSUFBSSxJQUFJO0FBQ1osT0FBSyxVQUFVLEVBQUU7QUFDakIsTUFBSSxRQUFRLElBQUksa0JBQ1osS0FBSSxXQUFXLFFBQVEsSUFBSSxrQkFBa0IsQ0FDekMsTUFBSyxVQUFVLEtBQUssTUFBTSxhQUFhLFFBQVEsSUFBSSxtQkFBbUIsRUFBRSxVQUFVLFFBQVEsQ0FBQyxDQUFDO09BRTNGO0dBQ0QsTUFBTSxPQUFPLFFBQVEsSUFBSTtBQUN6QixXQUFRLE9BQU8sTUFBTSxxQkFBcUIsS0FBSyxpQkFBaUIsTUFBTTs7QUFHOUUsT0FBSyxZQUFZLFFBQVEsSUFBSTtBQUM3QixPQUFLLE1BQU0sUUFBUSxJQUFJO0FBQ3ZCLE9BQUssTUFBTSxRQUFRLElBQUk7QUFDdkIsT0FBSyxXQUFXLFFBQVEsSUFBSTtBQUM1QixP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