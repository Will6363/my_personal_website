import { it as __commonJSMin, lt as __toESM, st as __require } from "./assets/context-D493w4sh.js";
import { a as require_bytes, i as require_ee_first, n as require_vary, o as require_depd, r as require_mime_db, s as createRequestHandler, t as require_express } from "./assets/express-B0J7KBMI.js";
import { t as server_build_exports } from "./assets/server-build-CamuQEjY.js";
//#region node_modules/negotiator/lib/charset.js
/**
* negotiator
* Copyright(c) 2012 Isaac Z. Schlueter
* Copyright(c) 2014 Federico Romero
* Copyright(c) 2014-2015 Douglas Christopher Wilson
* MIT Licensed
*/
var require_charset = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module exports.
	* @public
	*/
	module.exports = preferredCharsets;
	module.exports.preferredCharsets = preferredCharsets;
	/**
	* Module variables.
	* @private
	*/
	var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
	/**
	* Parse the Accept-Charset header.
	* @private
	*/
	function parseAcceptCharset(accept) {
		var accepts = accept.split(",");
		for (var i = 0, j = 0; i < accepts.length; i++) {
			var charset = parseCharset(accepts[i].trim(), i);
			if (charset) accepts[j++] = charset;
		}
		accepts.length = j;
		return accepts;
	}
	/**
	* Parse a charset from the Accept-Charset header.
	* @private
	*/
	function parseCharset(str, i) {
		var match = simpleCharsetRegExp.exec(str);
		if (!match) return null;
		var charset = match[1];
		var q = 1;
		if (match[2]) {
			var params = match[2].split(";");
			for (var j = 0; j < params.length; j++) {
				var p = params[j].trim().split("=");
				if (p[0] === "q") {
					q = parseFloat(p[1]);
					break;
				}
			}
		}
		return {
			charset,
			q,
			i
		};
	}
	/**
	* Get the priority of a charset.
	* @private
	*/
	function getCharsetPriority(charset, accepted, index) {
		var priority = {
			o: -1,
			q: 0,
			s: 0
		};
		for (var i = 0; i < accepted.length; i++) {
			var spec = specify(charset, accepted[i], index);
			if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) priority = spec;
		}
		return priority;
	}
	/**
	* Get the specificity of the charset.
	* @private
	*/
	function specify(charset, spec, index) {
		var s = 0;
		if (spec.charset.toLowerCase() === charset.toLowerCase()) s |= 1;
		else if (spec.charset !== "*") return null;
		return {
			i: index,
			o: spec.i,
			q: spec.q,
			s
		};
	}
	/**
	* Get the preferred charsets from an Accept-Charset header.
	* @public
	*/
	function preferredCharsets(accept, provided) {
		var accepts = parseAcceptCharset(accept === void 0 ? "*" : accept || "");
		if (!provided) return accepts.filter(isQuality).sort(compareSpecs).map(getFullCharset);
		var priorities = provided.map(function getPriority(type, index) {
			return getCharsetPriority(type, accepts, index);
		});
		return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
			return provided[priorities.indexOf(priority)];
		});
	}
	/**
	* Compare two specs.
	* @private
	*/
	function compareSpecs(a, b) {
		return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
	}
	/**
	* Get full charset string.
	* @private
	*/
	function getFullCharset(spec) {
		return spec.charset;
	}
	/**
	* Check if a spec has any quality.
	* @private
	*/
	function isQuality(spec) {
		return spec.q > 0;
	}
}));
//#endregion
//#region node_modules/negotiator/lib/encoding.js
/**
* negotiator
* Copyright(c) 2012 Isaac Z. Schlueter
* Copyright(c) 2014 Federico Romero
* Copyright(c) 2014-2015 Douglas Christopher Wilson
* MIT Licensed
*/
var require_encoding = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module exports.
	* @public
	*/
	module.exports = preferredEncodings;
	module.exports.preferredEncodings = preferredEncodings;
	/**
	* Module variables.
	* @private
	*/
	var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
	/**
	* Parse the Accept-Encoding header.
	* @private
	*/
	function parseAcceptEncoding(accept) {
		var accepts = accept.split(",");
		var hasIdentity = false;
		var minQuality = 1;
		for (var i = 0, j = 0; i < accepts.length; i++) {
			var encoding = parseEncoding(accepts[i].trim(), i);
			if (encoding) {
				accepts[j++] = encoding;
				hasIdentity = hasIdentity || specify("identity", encoding);
				minQuality = Math.min(minQuality, encoding.q || 1);
			}
		}
		if (!hasIdentity) accepts[j++] = {
			encoding: "identity",
			q: minQuality,
			i
		};
		accepts.length = j;
		return accepts;
	}
	/**
	* Parse an encoding from the Accept-Encoding header.
	* @private
	*/
	function parseEncoding(str, i) {
		var match = simpleEncodingRegExp.exec(str);
		if (!match) return null;
		var encoding = match[1];
		var q = 1;
		if (match[2]) {
			var params = match[2].split(";");
			for (var j = 0; j < params.length; j++) {
				var p = params[j].trim().split("=");
				if (p[0] === "q") {
					q = parseFloat(p[1]);
					break;
				}
			}
		}
		return {
			encoding,
			q,
			i
		};
	}
	/**
	* Get the priority of an encoding.
	* @private
	*/
	function getEncodingPriority(encoding, accepted, index) {
		var priority = {
			encoding,
			o: -1,
			q: 0,
			s: 0
		};
		for (var i = 0; i < accepted.length; i++) {
			var spec = specify(encoding, accepted[i], index);
			if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) priority = spec;
		}
		return priority;
	}
	/**
	* Get the specificity of the encoding.
	* @private
	*/
	function specify(encoding, spec, index) {
		var s = 0;
		if (spec.encoding.toLowerCase() === encoding.toLowerCase()) s |= 1;
		else if (spec.encoding !== "*") return null;
		return {
			encoding,
			i: index,
			o: spec.i,
			q: spec.q,
			s
		};
	}
	/**
	* Get the preferred encodings from an Accept-Encoding header.
	* @public
	*/
	function preferredEncodings(accept, provided, preferred) {
		var accepts = parseAcceptEncoding(accept || "");
		var comparator = preferred ? function comparator(a, b) {
			if (a.q !== b.q) return b.q - a.q;
			var aPreferred = preferred.indexOf(a.encoding);
			var bPreferred = preferred.indexOf(b.encoding);
			if (aPreferred === -1 && bPreferred === -1) return b.s - a.s || a.o - b.o || a.i - b.i;
			if (aPreferred !== -1 && bPreferred !== -1) return aPreferred - bPreferred;
			return aPreferred === -1 ? 1 : -1;
		} : compareSpecs;
		if (!provided) return accepts.filter(isQuality).sort(comparator).map(getFullEncoding);
		var priorities = provided.map(function getPriority(type, index) {
			return getEncodingPriority(type, accepts, index);
		});
		return priorities.filter(isQuality).sort(comparator).map(function getEncoding(priority) {
			return provided[priorities.indexOf(priority)];
		});
	}
	/**
	* Compare two specs.
	* @private
	*/
	function compareSpecs(a, b) {
		return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i;
	}
	/**
	* Get full encoding string.
	* @private
	*/
	function getFullEncoding(spec) {
		return spec.encoding;
	}
	/**
	* Check if a spec has any quality.
	* @private
	*/
	function isQuality(spec) {
		return spec.q > 0;
	}
}));
//#endregion
//#region node_modules/negotiator/lib/language.js
/**
* negotiator
* Copyright(c) 2012 Isaac Z. Schlueter
* Copyright(c) 2014 Federico Romero
* Copyright(c) 2014-2015 Douglas Christopher Wilson
* MIT Licensed
*/
var require_language = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module exports.
	* @public
	*/
	module.exports = preferredLanguages;
	module.exports.preferredLanguages = preferredLanguages;
	/**
	* Module variables.
	* @private
	*/
	var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
	/**
	* Parse the Accept-Language header.
	* @private
	*/
	function parseAcceptLanguage(accept) {
		var accepts = accept.split(",");
		for (var i = 0, j = 0; i < accepts.length; i++) {
			var language = parseLanguage(accepts[i].trim(), i);
			if (language) accepts[j++] = language;
		}
		accepts.length = j;
		return accepts;
	}
	/**
	* Parse a language from the Accept-Language header.
	* @private
	*/
	function parseLanguage(str, i) {
		var match = simpleLanguageRegExp.exec(str);
		if (!match) return null;
		var prefix = match[1];
		var suffix = match[2];
		var full = prefix;
		if (suffix) full += "-" + suffix;
		var q = 1;
		if (match[3]) {
			var params = match[3].split(";");
			for (var j = 0; j < params.length; j++) {
				var p = params[j].split("=");
				if (p[0] === "q") q = parseFloat(p[1]);
			}
		}
		return {
			prefix,
			suffix,
			q,
			i,
			full
		};
	}
	/**
	* Get the priority of a language.
	* @private
	*/
	function getLanguagePriority(language, accepted, index) {
		var priority = {
			o: -1,
			q: 0,
			s: 0
		};
		for (var i = 0; i < accepted.length; i++) {
			var spec = specify(language, accepted[i], index);
			if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) priority = spec;
		}
		return priority;
	}
	/**
	* Get the specificity of the language.
	* @private
	*/
	function specify(language, spec, index) {
		var p = parseLanguage(language);
		if (!p) return null;
		var s = 0;
		if (spec.full.toLowerCase() === p.full.toLowerCase()) s |= 4;
		else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) s |= 2;
		else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) s |= 1;
		else if (spec.full !== "*") return null;
		return {
			i: index,
			o: spec.i,
			q: spec.q,
			s
		};
	}
	/**
	* Get the preferred languages from an Accept-Language header.
	* @public
	*/
	function preferredLanguages(accept, provided) {
		var accepts = parseAcceptLanguage(accept === void 0 ? "*" : accept || "");
		if (!provided) return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
		var priorities = provided.map(function getPriority(type, index) {
			return getLanguagePriority(type, accepts, index);
		});
		return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
			return provided[priorities.indexOf(priority)];
		});
	}
	/**
	* Compare two specs.
	* @private
	*/
	function compareSpecs(a, b) {
		return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
	}
	/**
	* Get full language string.
	* @private
	*/
	function getFullLanguage(spec) {
		return spec.full;
	}
	/**
	* Check if a spec has any quality.
	* @private
	*/
	function isQuality(spec) {
		return spec.q > 0;
	}
}));
//#endregion
//#region node_modules/negotiator/lib/mediaType.js
/**
* negotiator
* Copyright(c) 2012 Isaac Z. Schlueter
* Copyright(c) 2014 Federico Romero
* Copyright(c) 2014-2015 Douglas Christopher Wilson
* MIT Licensed
*/
var require_mediaType = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module exports.
	* @public
	*/
	module.exports = preferredMediaTypes;
	module.exports.preferredMediaTypes = preferredMediaTypes;
	/**
	* Module variables.
	* @private
	*/
	var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
	/**
	* Parse the Accept header.
	* @private
	*/
	function parseAccept(accept) {
		var accepts = splitMediaTypes(accept);
		for (var i = 0, j = 0; i < accepts.length; i++) {
			var mediaType = parseMediaType(accepts[i].trim(), i);
			if (mediaType) accepts[j++] = mediaType;
		}
		accepts.length = j;
		return accepts;
	}
	/**
	* Parse a media type from the Accept header.
	* @private
	*/
	function parseMediaType(str, i) {
		var match = simpleMediaTypeRegExp.exec(str);
		if (!match) return null;
		var params = Object.create(null);
		var q = 1;
		var subtype = match[2];
		var type = match[1];
		if (match[3]) {
			var kvps = splitParameters(match[3]).map(splitKeyValuePair);
			for (var j = 0; j < kvps.length; j++) {
				var pair = kvps[j];
				var key = pair[0].toLowerCase();
				var val = pair[1];
				var value = val && val[0] === "\"" && val[val.length - 1] === "\"" ? val.slice(1, -1) : val;
				if (key === "q") {
					q = parseFloat(value);
					break;
				}
				params[key] = value;
			}
		}
		return {
			type,
			subtype,
			params,
			q,
			i
		};
	}
	/**
	* Get the priority of a media type.
	* @private
	*/
	function getMediaTypePriority(type, accepted, index) {
		var priority = {
			o: -1,
			q: 0,
			s: 0
		};
		for (var i = 0; i < accepted.length; i++) {
			var spec = specify(type, accepted[i], index);
			if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) priority = spec;
		}
		return priority;
	}
	/**
	* Get the specificity of the media type.
	* @private
	*/
	function specify(type, spec, index) {
		var p = parseMediaType(type);
		var s = 0;
		if (!p) return null;
		if (spec.type.toLowerCase() == p.type.toLowerCase()) s |= 4;
		else if (spec.type != "*") return null;
		if (spec.subtype.toLowerCase() == p.subtype.toLowerCase()) s |= 2;
		else if (spec.subtype != "*") return null;
		var keys = Object.keys(spec.params);
		if (keys.length > 0) if (keys.every(function(k) {
			return spec.params[k] == "*" || (spec.params[k] || "").toLowerCase() == (p.params[k] || "").toLowerCase();
		})) s |= 1;
		else return null;
		return {
			i: index,
			o: spec.i,
			q: spec.q,
			s
		};
	}
	/**
	* Get the preferred media types from an Accept header.
	* @public
	*/
	function preferredMediaTypes(accept, provided) {
		var accepts = parseAccept(accept === void 0 ? "*/*" : accept || "");
		if (!provided) return accepts.filter(isQuality).sort(compareSpecs).map(getFullType);
		var priorities = provided.map(function getPriority(type, index) {
			return getMediaTypePriority(type, accepts, index);
		});
		return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
			return provided[priorities.indexOf(priority)];
		});
	}
	/**
	* Compare two specs.
	* @private
	*/
	function compareSpecs(a, b) {
		return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
	}
	/**
	* Get full type string.
	* @private
	*/
	function getFullType(spec) {
		return spec.type + "/" + spec.subtype;
	}
	/**
	* Check if a spec has any quality.
	* @private
	*/
	function isQuality(spec) {
		return spec.q > 0;
	}
	/**
	* Count the number of quotes in a string.
	* @private
	*/
	function quoteCount(string) {
		var count = 0;
		var index = 0;
		while ((index = string.indexOf("\"", index)) !== -1) {
			count++;
			index++;
		}
		return count;
	}
	/**
	* Split a key value pair.
	* @private
	*/
	function splitKeyValuePair(str) {
		var index = str.indexOf("=");
		var key;
		var val;
		if (index === -1) key = str;
		else {
			key = str.slice(0, index);
			val = str.slice(index + 1);
		}
		return [key, val];
	}
	/**
	* Split an Accept header into media types.
	* @private
	*/
	function splitMediaTypes(accept) {
		var accepts = accept.split(",");
		for (var i = 1, j = 0; i < accepts.length; i++) if (quoteCount(accepts[j]) % 2 == 0) accepts[++j] = accepts[i];
		else accepts[j] += "," + accepts[i];
		accepts.length = j + 1;
		return accepts;
	}
	/**
	* Split a string of parameters.
	* @private
	*/
	function splitParameters(str) {
		var parameters = str.split(";");
		for (var i = 1, j = 0; i < parameters.length; i++) if (quoteCount(parameters[j]) % 2 == 0) parameters[++j] = parameters[i];
		else parameters[j] += ";" + parameters[i];
		parameters.length = j + 1;
		for (var i = 0; i < parameters.length; i++) parameters[i] = parameters[i].trim();
		return parameters;
	}
}));
//#endregion
//#region node_modules/negotiator/index.js
/*!
* negotiator
* Copyright(c) 2012 Federico Romero
* Copyright(c) 2012-2014 Isaac Z. Schlueter
* Copyright(c) 2015 Douglas Christopher Wilson
* MIT Licensed
*/
var require_negotiator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var preferredCharsets = require_charset();
	var preferredEncodings = require_encoding();
	var preferredLanguages = require_language();
	var preferredMediaTypes = require_mediaType();
	/**
	* Module exports.
	* @public
	*/
	module.exports = Negotiator;
	module.exports.Negotiator = Negotiator;
	/**
	* Create a Negotiator instance from a request.
	* @param {object} request
	* @public
	*/
	function Negotiator(request) {
		if (!(this instanceof Negotiator)) return new Negotiator(request);
		this.request = request;
	}
	Negotiator.prototype.charset = function charset(available) {
		var set = this.charsets(available);
		return set && set[0];
	};
	Negotiator.prototype.charsets = function charsets(available) {
		return preferredCharsets(this.request.headers["accept-charset"], available);
	};
	Negotiator.prototype.encoding = function encoding(available, preferred) {
		var set = this.encodings(available, preferred);
		return set && set[0];
	};
	Negotiator.prototype.encodings = function encodings(available, preferred) {
		return preferredEncodings(this.request.headers["accept-encoding"], available, preferred);
	};
	Negotiator.prototype.language = function language(available) {
		var set = this.languages(available);
		return set && set[0];
	};
	Negotiator.prototype.languages = function languages(available) {
		return preferredLanguages(this.request.headers["accept-language"], available);
	};
	Negotiator.prototype.mediaType = function mediaType(available) {
		var set = this.mediaTypes(available);
		return set && set[0];
	};
	Negotiator.prototype.mediaTypes = function mediaTypes(available) {
		return preferredMediaTypes(this.request.headers.accept, available);
	};
	Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
	Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
	Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
	Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
	Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
	Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
	Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
	Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;
}));
//#endregion
//#region node_modules/safe-buffer/index.js
var require_safe_buffer$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	var buffer$1 = __require("buffer");
	var Buffer = buffer$1.Buffer;
	function copyProps(src, dst) {
		for (var key in src) dst[key] = src[key];
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) module.exports = buffer$1;
	else {
		copyProps(buffer$1, exports);
		exports.Buffer = SafeBuffer;
	}
	function SafeBuffer(arg, encodingOrOffset, length) {
		return Buffer(arg, encodingOrOffset, length);
	}
	SafeBuffer.prototype = Object.create(Buffer.prototype);
	copyProps(Buffer, SafeBuffer);
	SafeBuffer.from = function(arg, encodingOrOffset, length) {
		if (typeof arg === "number") throw new TypeError("Argument must not be a number");
		return Buffer(arg, encodingOrOffset, length);
	};
	SafeBuffer.alloc = function(size, fill, encoding) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		var buf = Buffer(size);
		if (fill !== void 0) if (typeof encoding === "string") buf.fill(fill, encoding);
		else buf.fill(fill);
		else buf.fill(0);
		return buf;
	};
	SafeBuffer.allocUnsafe = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return Buffer(size);
	};
	SafeBuffer.allocUnsafeSlow = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return buffer$1.SlowBuffer(size);
	};
}));
//#endregion
//#region node_modules/compressible/index.js
/*!
* compressible
* Copyright(c) 2013 Jonathan Ong
* Copyright(c) 2014 Jeremiah Senkpiel
* Copyright(c) 2015 Douglas Christopher Wilson
* MIT Licensed
*/
var require_compressible = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module dependencies.
	* @private
	*/
	var db = require_mime_db();
	/**
	* Module variables.
	* @private
	*/
	var COMPRESSIBLE_TYPE_REGEXP = /^text\/|\+(?:json|text|xml)$/i;
	var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
	/**
	* Module exports.
	* @public
	*/
	module.exports = compressible;
	/**
	* Checks if a type is compressible.
	*
	* @param {string} type
	* @return {Boolean} compressible
	* @public
	*/
	function compressible(type) {
		if (!type || typeof type !== "string") return false;
		var match = EXTRACT_TYPE_REGEXP.exec(type);
		var mime = match && match[1].toLowerCase();
		var data = db[mime];
		if (data && data.compressible !== void 0) return data.compressible;
		return COMPRESSIBLE_TYPE_REGEXP.test(mime) || void 0;
	}
}));
//#endregion
//#region node_modules/compression/node_modules/ms/index.js
var require_ms$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Helpers.
	*/
	var s = 1e3;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	/**
	* Parse or format the given `val`.
	*
	* Options:
	*
	*  - `long` verbose formatting [false]
	*
	* @param {String|Number} val
	* @param {Object} [options]
	* @throws {Error} throw an error if val is not a non-empty string or a number
	* @return {String|Number}
	* @api public
	*/
	module.exports = function(val, options) {
		options = options || {};
		var type = typeof val;
		if (type === "string" && val.length > 0) return parse(val);
		else if (type === "number" && isNaN(val) === false) return options.long ? fmtLong(val) : fmtShort(val);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
	};
	/**
	* Parse the given `str` and return milliseconds.
	*
	* @param {String} str
	* @return {Number}
	* @api private
	*/
	function parse(str) {
		str = String(str);
		if (str.length > 100) return;
		var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
		if (!match) return;
		var n = parseFloat(match[1]);
		switch ((match[2] || "ms").toLowerCase()) {
			case "years":
			case "year":
			case "yrs":
			case "yr":
			case "y": return n * y;
			case "days":
			case "day":
			case "d": return n * d;
			case "hours":
			case "hour":
			case "hrs":
			case "hr":
			case "h": return n * h;
			case "minutes":
			case "minute":
			case "mins":
			case "min":
			case "m": return n * m;
			case "seconds":
			case "second":
			case "secs":
			case "sec":
			case "s": return n * s;
			case "milliseconds":
			case "millisecond":
			case "msecs":
			case "msec":
			case "ms": return n;
			default: return;
		}
	}
	/**
	* Short format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtShort(ms) {
		if (ms >= d) return Math.round(ms / d) + "d";
		if (ms >= h) return Math.round(ms / h) + "h";
		if (ms >= m) return Math.round(ms / m) + "m";
		if (ms >= s) return Math.round(ms / s) + "s";
		return ms + "ms";
	}
	/**
	* Long format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtLong(ms) {
		return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
	}
	/**
	* Pluralization helper.
	*/
	function plural(ms, n, name) {
		if (ms < n) return;
		if (ms < n * 1.5) return Math.floor(ms / n) + " " + name;
		return Math.ceil(ms / n) + " " + name + "s";
	}
}));
//#endregion
//#region node_modules/compression/node_modules/debug/src/debug.js
var require_debug$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the common logic for both the Node.js and web browser
	* implementations of `debug()`.
	*
	* Expose `debug()` as the module.
	*/
	exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = require_ms$1();
	/**
	* The currently active debug mode names, and names to skip.
	*/
	exports.names = [];
	exports.skips = [];
	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	exports.formatters = {};
	/**
	* Previous log timestamp.
	*/
	var prevTime;
	/**
	* Select a color.
	* @param {String} namespace
	* @return {Number}
	* @api private
	*/
	function selectColor(namespace) {
		var hash = 0, i;
		for (i in namespace) {
			hash = (hash << 5) - hash + namespace.charCodeAt(i);
			hash |= 0;
		}
		return exports.colors[Math.abs(hash) % exports.colors.length];
	}
	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		function debug() {
			if (!debug.enabled) return;
			var self = debug;
			var curr = +/* @__PURE__ */ new Date();
			self.diff = curr - (prevTime || curr);
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;
			var args = new Array(arguments.length);
			for (var i = 0; i < args.length; i++) args[i] = arguments[i];
			args[0] = exports.coerce(args[0]);
			if ("string" !== typeof args[0]) args.unshift("%O");
			var index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
				if (match === "%%") return match;
				index++;
				var formatter = exports.formatters[format];
				if ("function" === typeof formatter) {
					var val = args[index];
					match = formatter.call(self, val);
					args.splice(index, 1);
					index--;
				}
				return match;
			});
			exports.formatArgs.call(self, args);
			(debug.log || exports.log || console.log.bind(console)).apply(self, args);
		}
		debug.namespace = namespace;
		debug.enabled = exports.enabled(namespace);
		debug.useColors = exports.useColors();
		debug.color = selectColor(namespace);
		if ("function" === typeof exports.init) exports.init(debug);
		return debug;
	}
	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		exports.save(namespaces);
		exports.names = [];
		exports.skips = [];
		var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
		var len = split.length;
		for (var i = 0; i < len; i++) {
			if (!split[i]) continue;
			namespaces = split[i].replace(/\*/g, ".*?");
			if (namespaces[0] === "-") exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
			else exports.names.push(new RegExp("^" + namespaces + "$"));
		}
	}
	/**
	* Disable debug output.
	*
	* @api public
	*/
	function disable() {
		exports.enable("");
	}
	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		var i, len;
		for (i = 0, len = exports.skips.length; i < len; i++) if (exports.skips[i].test(name)) return false;
		for (i = 0, len = exports.names.length; i < len; i++) if (exports.names[i].test(name)) return true;
		return false;
	}
	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) return val.stack || val.message;
		return val;
	}
}));
//#endregion
//#region node_modules/compression/node_modules/debug/src/browser.js
var require_browser$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the web browser implementation of `debug()`.
	*
	* Expose `debug()` as the module.
	*/
	exports = module.exports = require_debug$1();
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
	/**
	* Colors.
	*/
	exports.colors = [
		"lightseagreen",
		"forestgreen",
		"goldenrod",
		"dodgerblue",
		"darkorchid",
		"crimson"
	];
	/**
	* Currently only WebKit-based Web Inspectors, Firefox >= v31,
	* and the Firebug extension (any Firefox version) are known
	* to support "%c" CSS customizations.
	*
	* TODO: add a `localStorage` variable to explicitly enable/disable colors
	*/
	function useColors() {
		if (typeof window !== "undefined" && window.process && window.process.type === "renderer") return true;
		return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	/**
	* Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	*/
	exports.formatters.j = function(v) {
		try {
			return JSON.stringify(v);
		} catch (err) {
			return "[UnexpectedJSONParseError]: " + err.message;
		}
	};
	/**
	* Colorize log arguments if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		var useColors = this.useColors;
		args[0] = (useColors ? "%c" : "") + this.namespace + (useColors ? " %c" : " ") + args[0] + (useColors ? "%c " : " ") + "+" + exports.humanize(this.diff);
		if (!useColors) return;
		var c = "color: " + this.color;
		args.splice(1, 0, c, "color: inherit");
		var index = 0;
		var lastC = 0;
		args[0].replace(/%[a-zA-Z%]/g, function(match) {
			if ("%%" === match) return;
			index++;
			if ("%c" === match) lastC = index;
		});
		args.splice(lastC, 0, c);
	}
	/**
	* Invokes `console.log()` when available.
	* No-op when `console.log` is not a "function".
	*
	* @api public
	*/
	function log() {
		return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
	}
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		try {
			if (null == namespaces) exports.storage.removeItem("debug");
			else exports.storage.debug = namespaces;
		} catch (e) {}
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		var r;
		try {
			r = exports.storage.debug;
		} catch (e) {}
		if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
		return r;
	}
	/**
	* Enable namespaces listed in `localStorage.debug` initially.
	*/
	exports.enable(load());
	/**
	* Localstorage attempts to return the localstorage.
	*
	* This is necessary because safari throws
	* when a user disables cookies/localstorage
	* and you attempt to access it.
	*
	* @return {LocalStorage}
	* @api private
	*/
	function localstorage() {
		try {
			return window.localStorage;
		} catch (e) {}
	}
}));
//#endregion
//#region node_modules/compression/node_modules/debug/src/node.js
var require_node$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module dependencies.
	*/
	var tty$1 = __require("tty");
	var util$1 = __require("util");
	/**
	* This is the Node.js implementation of `debug()`.
	*
	* Expose `debug()` as the module.
	*/
	exports = module.exports = require_debug$1();
	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	/**
	* Colors.
	*/
	exports.colors = [
		6,
		2,
		3,
		4,
		5,
		1
	];
	/**
	* Build up the default `inspectOpts` object from the environment variables.
	*
	*   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
	*/
	exports.inspectOpts = Object.keys(process.env).filter(function(key) {
		return /^debug_/i.test(key);
	}).reduce(function(obj, key) {
		var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
			return k.toUpperCase();
		});
		var val = process.env[key];
		if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
		else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
		else if (val === "null") val = null;
		else val = Number(val);
		obj[prop] = val;
		return obj;
	}, {});
	/**
	* The file descriptor to write the `debug()` calls to.
	* Set the `DEBUG_FD` env variable to override with another value. i.e.:
	*
	*   $ DEBUG_FD=3 node script.js 3>debug.log
	*/
	var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
	if (1 !== fd && 2 !== fd) util$1.deprecate(function() {}, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
	var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream$1(fd);
	/**
	* Is stdout a TTY? Colored output is enabled when `true`.
	*/
	function useColors() {
		return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty$1.isatty(fd);
	}
	/**
	* Map %o to `util.inspect()`, all on a single line.
	*/
	exports.formatters.o = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util$1.inspect(v, this.inspectOpts).split("\n").map(function(str) {
			return str.trim();
		}).join(" ");
	};
	/**
	* Map %o to `util.inspect()`, allowing multiple lines if needed.
	*/
	exports.formatters.O = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util$1.inspect(v, this.inspectOpts);
	};
	/**
	* Adds ANSI color escape codes if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		var name = this.namespace;
		if (this.useColors) {
			var c = this.color;
			var prefix = "  \x1B[3" + c + ";1m" + name + " \x1B[0m";
			args[0] = prefix + args[0].split("\n").join("\n" + prefix);
			args.push("\x1B[3" + c + "m+" + exports.humanize(this.diff) + "\x1B[0m");
		} else args[0] = (/* @__PURE__ */ new Date()).toUTCString() + " " + name + " " + args[0];
	}
	/**
	* Invokes `util.format()` with the specified arguments and writes to `stream`.
	*/
	function log() {
		return stream.write(util$1.format.apply(util$1, arguments) + "\n");
	}
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		if (null == namespaces) delete process.env.DEBUG;
		else process.env.DEBUG = namespaces;
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		return process.env.DEBUG;
	}
	/**
	* Copied from `node/src/node.js`.
	*
	* XXX: It's lame that node doesn't expose this API out-of-the-box. It also
	* relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
	*/
	function createWritableStdioStream$1(fd) {
		var stream;
		switch (process.binding("tty_wrap").guessHandleType(fd)) {
			case "TTY":
				stream = new tty$1.WriteStream(fd);
				stream._type = "tty";
				if (stream._handle && stream._handle.unref) stream._handle.unref();
				break;
			case "FILE":
				stream = new (__require("fs")).SyncWriteStream(fd, { autoClose: false });
				stream._type = "fs";
				break;
			case "PIPE":
			case "TCP":
				stream = new (__require("net")).Socket({
					fd,
					readable: false,
					writable: true
				});
				stream.readable = false;
				stream.read = null;
				stream._type = "pipe";
				if (stream._handle && stream._handle.unref) stream._handle.unref();
				break;
			default: throw new Error("Implement me. Unknown stream file type!");
		}
		stream.fd = fd;
		stream._isStdio = true;
		return stream;
	}
	/**
	* Init logic for `debug` instances.
	*
	* Create a new `inspectOpts` object in case `useColors` is set
	* differently for a particular `debug` instance.
	*/
	function init(debug) {
		debug.inspectOpts = {};
		var keys = Object.keys(exports.inspectOpts);
		for (var i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
	/**
	* Enable namespaces listed in `process.env.DEBUG` initially.
	*/
	exports.enable(load());
}));
//#endregion
//#region node_modules/compression/node_modules/debug/src/index.js
var require_src$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Detect Electron renderer process, which is node, but we should
	* treat as a browser.
	*/
	if (typeof process !== "undefined" && process.type === "renderer") module.exports = require_browser$1();
	else module.exports = require_node$1();
}));
//#endregion
//#region node_modules/on-headers/index.js
/*!
* on-headers
* Copyright(c) 2014 Douglas Christopher Wilson
* MIT Licensed
*/
var require_on_headers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module exports.
	* @public
	*/
	module.exports = onHeaders;
	var set1dArray = typeof __require("http").ServerResponse.prototype.appendHeader === "function" ? set1dArrayWithAppend : set1dArrayWithSet;
	/**
	* Create a replacement writeHead method.
	*
	* @param {function} prevWriteHead
	* @param {function} listener
	* @private
	*/
	function createWriteHead(prevWriteHead, listener) {
		var fired = false;
		return function writeHead(statusCode) {
			var args = setWriteHeadHeaders.apply(this, arguments);
			if (!fired) {
				fired = true;
				listener.call(this);
				if (typeof args[0] === "number" && this.statusCode !== args[0]) {
					args[0] = this.statusCode;
					args.length = 1;
				}
			}
			return prevWriteHead.apply(this, args);
		};
	}
	/**
	* Execute a listener when a response is about to write headers.
	*
	* @param {object} res
	* @return {function} listener
	* @public
	*/
	function onHeaders(res, listener) {
		if (!res) throw new TypeError("argument res is required");
		if (typeof listener !== "function") throw new TypeError("argument listener must be a function");
		res.writeHead = createWriteHead(res.writeHead, listener);
	}
	/**
	* Set headers contained in array on the response object.
	*
	* @param {object} res
	* @param {array} headers
	* @private
	*/
	function setHeadersFromArray(res, headers) {
		if (headers.length && Array.isArray(headers[0])) set2dArray(res, headers);
		else {
			if (headers.length % 2 !== 0) throw new TypeError("headers array is malformed");
			set1dArray(res, headers);
		}
	}
	/**
	* Set headers contained in object on the response object.
	*
	* @param {object} res
	* @param {object} headers
	* @private
	*/
	function setHeadersFromObject(res, headers) {
		var keys = Object.keys(headers);
		for (var i = 0; i < keys.length; i++) {
			var k = keys[i];
			if (k) res.setHeader(k, headers[k]);
		}
	}
	/**
	* Set headers and other properties on the response object.
	*
	* @param {number} statusCode
	* @private
	*/
	function setWriteHeadHeaders(statusCode) {
		var length = arguments.length;
		var headerIndex = length > 1 && typeof arguments[1] === "string" ? 2 : 1;
		var headers = length >= headerIndex + 1 ? arguments[headerIndex] : void 0;
		this.statusCode = statusCode;
		if (Array.isArray(headers)) setHeadersFromArray(this, headers);
		else if (headers) setHeadersFromObject(this, headers);
		var args = new Array(Math.min(length, headerIndex));
		for (var i = 0; i < args.length; i++) args[i] = arguments[i];
		return args;
	}
	function set2dArray(res, headers) {
		var key;
		for (var i = 0; i < headers.length; i++) {
			key = headers[i][0];
			if (key) res.setHeader(key, headers[i][1]);
		}
	}
	function set1dArrayWithAppend(res, headers) {
		for (var i = 0; i < headers.length; i += 2) res.removeHeader(headers[i]);
		var key;
		for (var j = 0; j < headers.length; j += 2) {
			key = headers[j];
			if (key) res.appendHeader(key, headers[j + 1]);
		}
	}
	function set1dArrayWithSet(res, headers) {
		var key;
		for (var i = 0; i < headers.length; i += 2) {
			key = headers[i];
			if (key) res.setHeader(key, headers[i + 1]);
		}
	}
}));
//#endregion
//#region node_modules/compression/index.js
/*!
* compression
* Copyright(c) 2010 Sencha Inc.
* Copyright(c) 2011 TJ Holowaychuk
* Copyright(c) 2014 Jonathan Ong
* Copyright(c) 2014-2015 Douglas Christopher Wilson
* MIT Licensed
*/
var require_compression = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module dependencies.
	* @private
	*/
	var Negotiator = require_negotiator();
	var Buffer = require_safe_buffer$1().Buffer;
	var bytes = require_bytes();
	var compressible = require_compressible();
	var debug = require_src$1()("compression");
	var onHeaders = require_on_headers();
	var vary = require_vary();
	var zlib = __require("zlib");
	/**
	* Module exports.
	*/
	module.exports = compression;
	module.exports.filter = shouldCompress;
	/**
	* @const
	* whether current node version has brotli support
	*/
	var hasBrotliSupport = "createBrotliCompress" in zlib;
	/**
	* Module variables.
	* @private
	*/
	var cacheControlNoTransformRegExp = /(?:^|,)\s*?no-transform\s*?(?:,|$)/;
	var SUPPORTED_ENCODING = hasBrotliSupport ? [
		"br",
		"gzip",
		"deflate",
		"identity"
	] : [
		"gzip",
		"deflate",
		"identity"
	];
	var PREFERRED_ENCODING = hasBrotliSupport ? ["br", "gzip"] : ["gzip"];
	var encodingSupported = [
		"gzip",
		"deflate",
		"identity",
		"br"
	];
	/**
	* Compress response data with gzip / deflate.
	*
	* @param {Object} [options]
	* @return {Function} middleware
	* @public
	*/
	function compression(options) {
		var opts = options || {};
		var optsBrotli = {};
		if (hasBrotliSupport) {
			Object.assign(optsBrotli, opts.brotli);
			var brotliParams = {};
			brotliParams[zlib.constants.BROTLI_PARAM_QUALITY] = 4;
			optsBrotli.params = Object.assign(brotliParams, optsBrotli.params);
		}
		var filter = opts.filter || shouldCompress;
		var threshold = bytes.parse(opts.threshold);
		var enforceEncoding = opts.enforceEncoding || "identity";
		if (threshold == null) threshold = 1024;
		return function compression(req, res, next) {
			var ended = false;
			var length;
			var listeners = [];
			var stream;
			var _end = res.end;
			var _on = res.on;
			var _write = res.write;
			res.flush = function flush() {
				if (stream) stream.flush();
			};
			res.write = function write(chunk, encoding) {
				if (ended) return false;
				if (!headersSent(res)) this.writeHead(this.statusCode);
				return stream ? stream.write(toBuffer(chunk, encoding)) : _write.call(this, chunk, encoding);
			};
			res.end = function end(chunk, encoding) {
				if (ended) return false;
				if (!headersSent(res)) {
					if (!this.getHeader("Content-Length")) length = chunkLength(chunk, encoding);
					this.writeHead(this.statusCode);
				}
				if (!stream) return _end.call(this, chunk, encoding);
				ended = true;
				return chunk ? stream.end(toBuffer(chunk, encoding)) : stream.end();
			};
			res.on = function on(type, listener) {
				if (!listeners || type !== "drain") return _on.call(this, type, listener);
				if (stream) return stream.on(type, listener);
				listeners.push([type, listener]);
				return this;
			};
			function nocompress(msg) {
				debug("no compression: %s", msg);
				addListeners(res, _on, listeners);
				listeners = null;
			}
			onHeaders(res, function onResponseHeaders() {
				if (!filter(req, res)) {
					nocompress("filtered");
					return;
				}
				if (!shouldTransform(req, res)) {
					nocompress("no transform");
					return;
				}
				vary(res, "Accept-Encoding");
				if (Number(res.getHeader("Content-Length")) < threshold || length < threshold) {
					nocompress("size below threshold");
					return;
				}
				if ((res.getHeader("Content-Encoding") || "identity") !== "identity") {
					nocompress("already encoded");
					return;
				}
				if (req.method === "HEAD") {
					nocompress("HEAD request");
					return;
				}
				var method = new Negotiator(req).encoding(SUPPORTED_ENCODING, PREFERRED_ENCODING);
				if (!req.headers["accept-encoding"] && encodingSupported.indexOf(enforceEncoding) !== -1) method = enforceEncoding;
				if (!method || method === "identity") {
					nocompress("not acceptable");
					return;
				}
				debug("%s compression", method);
				stream = method === "gzip" ? zlib.createGzip(opts) : method === "br" ? zlib.createBrotliCompress(optsBrotli) : zlib.createDeflate(opts);
				addListeners(stream, stream.on, listeners);
				res.setHeader("Content-Encoding", method);
				res.removeHeader("Content-Length");
				stream.on("data", function onStreamData(chunk) {
					if (_write.call(res, chunk) === false) stream.pause();
				});
				stream.on("end", function onStreamEnd() {
					_end.call(res);
				});
				_on.call(res, "drain", function onResponseDrain() {
					stream.resume();
				});
			});
			next();
		};
	}
	/**
	* Add bufferred listeners to stream
	* @private
	*/
	function addListeners(stream, on, listeners) {
		for (var i = 0; i < listeners.length; i++) on.apply(stream, listeners[i]);
	}
	/**
	* Get the length of a given chunk
	*/
	function chunkLength(chunk, encoding) {
		if (!chunk) return 0;
		return Buffer.isBuffer(chunk) ? chunk.length : Buffer.byteLength(chunk, encoding);
	}
	/**
	* Default filter function.
	* @private
	*/
	function shouldCompress(req, res) {
		var type = res.getHeader("Content-Type");
		if (type === void 0 || !compressible(type)) {
			debug("%s not compressible", type);
			return false;
		}
		return true;
	}
	/**
	* Determine if the entity should be transformed.
	* @private
	*/
	function shouldTransform(req, res) {
		var cacheControl = res.getHeader("Cache-Control");
		return !cacheControl || !cacheControlNoTransformRegExp.test(cacheControl);
	}
	/**
	* Coerce arguments to Buffer
	* @private
	*/
	function toBuffer(chunk, encoding) {
		return Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding);
	}
	/**
	* Determine if the response headers have been sent.
	*
	* @param {object} res
	* @returns {boolean}
	* @private
	*/
	function headersSent(res) {
		return typeof res.headersSent !== "boolean" ? Boolean(res._header) : res.headersSent;
	}
}));
//#endregion
//#region node_modules/basic-auth/node_modules/safe-buffer/index.js
var require_safe_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var buffer = __require("buffer");
	var Buffer = buffer.Buffer;
	function copyProps(src, dst) {
		for (var key in src) dst[key] = src[key];
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) module.exports = buffer;
	else {
		copyProps(buffer, exports);
		exports.Buffer = SafeBuffer;
	}
	function SafeBuffer(arg, encodingOrOffset, length) {
		return Buffer(arg, encodingOrOffset, length);
	}
	copyProps(Buffer, SafeBuffer);
	SafeBuffer.from = function(arg, encodingOrOffset, length) {
		if (typeof arg === "number") throw new TypeError("Argument must not be a number");
		return Buffer(arg, encodingOrOffset, length);
	};
	SafeBuffer.alloc = function(size, fill, encoding) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		var buf = Buffer(size);
		if (fill !== void 0) if (typeof encoding === "string") buf.fill(fill, encoding);
		else buf.fill(fill);
		else buf.fill(0);
		return buf;
	};
	SafeBuffer.allocUnsafe = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return Buffer(size);
	};
	SafeBuffer.allocUnsafeSlow = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return buffer.SlowBuffer(size);
	};
}));
//#endregion
//#region node_modules/basic-auth/index.js
/*!
* basic-auth
* Copyright(c) 2013 TJ Holowaychuk
* Copyright(c) 2014 Jonathan Ong
* Copyright(c) 2015-2016 Douglas Christopher Wilson
* MIT Licensed
*/
var require_basic_auth = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module dependencies.
	* @private
	*/
	var Buffer = require_safe_buffer().Buffer;
	/**
	* Module exports.
	* @public
	*/
	module.exports = auth;
	module.exports.parse = parse;
	/**
	* RegExp for basic auth credentials
	*
	* credentials = auth-scheme 1*SP token68
	* auth-scheme = "Basic" ; case insensitive
	* token68     = 1*( ALPHA / DIGIT / "-" / "." / "_" / "~" / "+" / "/" ) *"="
	* @private
	*/
	var CREDENTIALS_REGEXP = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/;
	/**
	* RegExp for basic auth user/pass
	*
	* user-pass   = userid ":" password
	* userid      = *<TEXT excluding ":">
	* password    = *TEXT
	* @private
	*/
	var USER_PASS_REGEXP = /^([^:]*):(.*)$/;
	/**
	* Parse the Authorization header field of a request.
	*
	* @param {object} req
	* @return {object} with .name and .pass
	* @public
	*/
	function auth(req) {
		if (!req) throw new TypeError("argument req is required");
		if (typeof req !== "object") throw new TypeError("argument req is required to be an object");
		return parse(getAuthorization(req));
	}
	/**
	* Decode base64 string.
	* @private
	*/
	function decodeBase64(str) {
		return Buffer.from(str, "base64").toString();
	}
	/**
	* Get the Authorization header from request object.
	* @private
	*/
	function getAuthorization(req) {
		if (!req.headers || typeof req.headers !== "object") throw new TypeError("argument req is required to have headers property");
		return req.headers.authorization;
	}
	/**
	* Parse basic auth to object.
	*
	* @param {string} string
	* @return {object}
	* @public
	*/
	function parse(string) {
		if (typeof string !== "string") return;
		var match = CREDENTIALS_REGEXP.exec(string);
		if (!match) return;
		var userPass = USER_PASS_REGEXP.exec(decodeBase64(match[1]));
		if (!userPass) return;
		return new Credentials(userPass[1], userPass[2]);
	}
	/**
	* Object to represent user credentials.
	* @private
	*/
	function Credentials(name, pass) {
		this.name = name;
		this.pass = pass;
	}
}));
//#endregion
//#region node_modules/morgan/node_modules/ms/index.js
var require_ms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Helpers.
	*/
	var s = 1e3;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	/**
	* Parse or format the given `val`.
	*
	* Options:
	*
	*  - `long` verbose formatting [false]
	*
	* @param {String|Number} val
	* @param {Object} [options]
	* @throws {Error} throw an error if val is not a non-empty string or a number
	* @return {String|Number}
	* @api public
	*/
	module.exports = function(val, options) {
		options = options || {};
		var type = typeof val;
		if (type === "string" && val.length > 0) return parse(val);
		else if (type === "number" && isNaN(val) === false) return options.long ? fmtLong(val) : fmtShort(val);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
	};
	/**
	* Parse the given `str` and return milliseconds.
	*
	* @param {String} str
	* @return {Number}
	* @api private
	*/
	function parse(str) {
		str = String(str);
		if (str.length > 100) return;
		var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
		if (!match) return;
		var n = parseFloat(match[1]);
		switch ((match[2] || "ms").toLowerCase()) {
			case "years":
			case "year":
			case "yrs":
			case "yr":
			case "y": return n * y;
			case "days":
			case "day":
			case "d": return n * d;
			case "hours":
			case "hour":
			case "hrs":
			case "hr":
			case "h": return n * h;
			case "minutes":
			case "minute":
			case "mins":
			case "min":
			case "m": return n * m;
			case "seconds":
			case "second":
			case "secs":
			case "sec":
			case "s": return n * s;
			case "milliseconds":
			case "millisecond":
			case "msecs":
			case "msec":
			case "ms": return n;
			default: return;
		}
	}
	/**
	* Short format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtShort(ms) {
		if (ms >= d) return Math.round(ms / d) + "d";
		if (ms >= h) return Math.round(ms / h) + "h";
		if (ms >= m) return Math.round(ms / m) + "m";
		if (ms >= s) return Math.round(ms / s) + "s";
		return ms + "ms";
	}
	/**
	* Long format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtLong(ms) {
		return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
	}
	/**
	* Pluralization helper.
	*/
	function plural(ms, n, name) {
		if (ms < n) return;
		if (ms < n * 1.5) return Math.floor(ms / n) + " " + name;
		return Math.ceil(ms / n) + " " + name + "s";
	}
}));
//#endregion
//#region node_modules/morgan/node_modules/debug/src/debug.js
var require_debug = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the common logic for both the Node.js and web browser
	* implementations of `debug()`.
	*
	* Expose `debug()` as the module.
	*/
	exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = require_ms();
	/**
	* The currently active debug mode names, and names to skip.
	*/
	exports.names = [];
	exports.skips = [];
	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	exports.formatters = {};
	/**
	* Previous log timestamp.
	*/
	var prevTime;
	/**
	* Select a color.
	* @param {String} namespace
	* @return {Number}
	* @api private
	*/
	function selectColor(namespace) {
		var hash = 0, i;
		for (i in namespace) {
			hash = (hash << 5) - hash + namespace.charCodeAt(i);
			hash |= 0;
		}
		return exports.colors[Math.abs(hash) % exports.colors.length];
	}
	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		function debug() {
			if (!debug.enabled) return;
			var self = debug;
			var curr = +/* @__PURE__ */ new Date();
			self.diff = curr - (prevTime || curr);
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;
			var args = new Array(arguments.length);
			for (var i = 0; i < args.length; i++) args[i] = arguments[i];
			args[0] = exports.coerce(args[0]);
			if ("string" !== typeof args[0]) args.unshift("%O");
			var index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
				if (match === "%%") return match;
				index++;
				var formatter = exports.formatters[format];
				if ("function" === typeof formatter) {
					var val = args[index];
					match = formatter.call(self, val);
					args.splice(index, 1);
					index--;
				}
				return match;
			});
			exports.formatArgs.call(self, args);
			(debug.log || exports.log || console.log.bind(console)).apply(self, args);
		}
		debug.namespace = namespace;
		debug.enabled = exports.enabled(namespace);
		debug.useColors = exports.useColors();
		debug.color = selectColor(namespace);
		if ("function" === typeof exports.init) exports.init(debug);
		return debug;
	}
	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		exports.save(namespaces);
		exports.names = [];
		exports.skips = [];
		var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
		var len = split.length;
		for (var i = 0; i < len; i++) {
			if (!split[i]) continue;
			namespaces = split[i].replace(/\*/g, ".*?");
			if (namespaces[0] === "-") exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
			else exports.names.push(new RegExp("^" + namespaces + "$"));
		}
	}
	/**
	* Disable debug output.
	*
	* @api public
	*/
	function disable() {
		exports.enable("");
	}
	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		var i, len;
		for (i = 0, len = exports.skips.length; i < len; i++) if (exports.skips[i].test(name)) return false;
		for (i = 0, len = exports.names.length; i < len; i++) if (exports.names[i].test(name)) return true;
		return false;
	}
	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) return val.stack || val.message;
		return val;
	}
}));
//#endregion
//#region node_modules/morgan/node_modules/debug/src/browser.js
var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the web browser implementation of `debug()`.
	*
	* Expose `debug()` as the module.
	*/
	exports = module.exports = require_debug();
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
	/**
	* Colors.
	*/
	exports.colors = [
		"lightseagreen",
		"forestgreen",
		"goldenrod",
		"dodgerblue",
		"darkorchid",
		"crimson"
	];
	/**
	* Currently only WebKit-based Web Inspectors, Firefox >= v31,
	* and the Firebug extension (any Firefox version) are known
	* to support "%c" CSS customizations.
	*
	* TODO: add a `localStorage` variable to explicitly enable/disable colors
	*/
	function useColors() {
		if (typeof window !== "undefined" && window.process && window.process.type === "renderer") return true;
		return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	/**
	* Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	*/
	exports.formatters.j = function(v) {
		try {
			return JSON.stringify(v);
		} catch (err) {
			return "[UnexpectedJSONParseError]: " + err.message;
		}
	};
	/**
	* Colorize log arguments if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		var useColors = this.useColors;
		args[0] = (useColors ? "%c" : "") + this.namespace + (useColors ? " %c" : " ") + args[0] + (useColors ? "%c " : " ") + "+" + exports.humanize(this.diff);
		if (!useColors) return;
		var c = "color: " + this.color;
		args.splice(1, 0, c, "color: inherit");
		var index = 0;
		var lastC = 0;
		args[0].replace(/%[a-zA-Z%]/g, function(match) {
			if ("%%" === match) return;
			index++;
			if ("%c" === match) lastC = index;
		});
		args.splice(lastC, 0, c);
	}
	/**
	* Invokes `console.log()` when available.
	* No-op when `console.log` is not a "function".
	*
	* @api public
	*/
	function log() {
		return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
	}
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		try {
			if (null == namespaces) exports.storage.removeItem("debug");
			else exports.storage.debug = namespaces;
		} catch (e) {}
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		var r;
		try {
			r = exports.storage.debug;
		} catch (e) {}
		if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
		return r;
	}
	/**
	* Enable namespaces listed in `localStorage.debug` initially.
	*/
	exports.enable(load());
	/**
	* Localstorage attempts to return the localstorage.
	*
	* This is necessary because safari throws
	* when a user disables cookies/localstorage
	* and you attempt to access it.
	*
	* @return {LocalStorage}
	* @api private
	*/
	function localstorage() {
		try {
			return window.localStorage;
		} catch (e) {}
	}
}));
//#endregion
//#region node_modules/morgan/node_modules/debug/src/node.js
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module dependencies.
	*/
	var tty = __require("tty");
	var util = __require("util");
	/**
	* This is the Node.js implementation of `debug()`.
	*
	* Expose `debug()` as the module.
	*/
	exports = module.exports = require_debug();
	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	/**
	* Colors.
	*/
	exports.colors = [
		6,
		2,
		3,
		4,
		5,
		1
	];
	/**
	* Build up the default `inspectOpts` object from the environment variables.
	*
	*   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
	*/
	exports.inspectOpts = Object.keys(process.env).filter(function(key) {
		return /^debug_/i.test(key);
	}).reduce(function(obj, key) {
		var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
			return k.toUpperCase();
		});
		var val = process.env[key];
		if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
		else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
		else if (val === "null") val = null;
		else val = Number(val);
		obj[prop] = val;
		return obj;
	}, {});
	/**
	* The file descriptor to write the `debug()` calls to.
	* Set the `DEBUG_FD` env variable to override with another value. i.e.:
	*
	*   $ DEBUG_FD=3 node script.js 3>debug.log
	*/
	var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
	if (1 !== fd && 2 !== fd) util.deprecate(function() {}, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
	var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);
	/**
	* Is stdout a TTY? Colored output is enabled when `true`.
	*/
	function useColors() {
		return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
	}
	/**
	* Map %o to `util.inspect()`, all on a single line.
	*/
	exports.formatters.o = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
			return str.trim();
		}).join(" ");
	};
	/**
	* Map %o to `util.inspect()`, allowing multiple lines if needed.
	*/
	exports.formatters.O = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts);
	};
	/**
	* Adds ANSI color escape codes if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		var name = this.namespace;
		if (this.useColors) {
			var c = this.color;
			var prefix = "  \x1B[3" + c + ";1m" + name + " \x1B[0m";
			args[0] = prefix + args[0].split("\n").join("\n" + prefix);
			args.push("\x1B[3" + c + "m+" + exports.humanize(this.diff) + "\x1B[0m");
		} else args[0] = (/* @__PURE__ */ new Date()).toUTCString() + " " + name + " " + args[0];
	}
	/**
	* Invokes `util.format()` with the specified arguments and writes to `stream`.
	*/
	function log() {
		return stream.write(util.format.apply(util, arguments) + "\n");
	}
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		if (null == namespaces) delete process.env.DEBUG;
		else process.env.DEBUG = namespaces;
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		return process.env.DEBUG;
	}
	/**
	* Copied from `node/src/node.js`.
	*
	* XXX: It's lame that node doesn't expose this API out-of-the-box. It also
	* relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
	*/
	function createWritableStdioStream(fd) {
		var stream;
		switch (process.binding("tty_wrap").guessHandleType(fd)) {
			case "TTY":
				stream = new tty.WriteStream(fd);
				stream._type = "tty";
				if (stream._handle && stream._handle.unref) stream._handle.unref();
				break;
			case "FILE":
				stream = new (__require("fs")).SyncWriteStream(fd, { autoClose: false });
				stream._type = "fs";
				break;
			case "PIPE":
			case "TCP":
				stream = new (__require("net")).Socket({
					fd,
					readable: false,
					writable: true
				});
				stream.readable = false;
				stream.read = null;
				stream._type = "pipe";
				if (stream._handle && stream._handle.unref) stream._handle.unref();
				break;
			default: throw new Error("Implement me. Unknown stream file type!");
		}
		stream.fd = fd;
		stream._isStdio = true;
		return stream;
	}
	/**
	* Init logic for `debug` instances.
	*
	* Create a new `inspectOpts` object in case `useColors` is set
	* differently for a particular `debug` instance.
	*/
	function init(debug) {
		debug.inspectOpts = {};
		var keys = Object.keys(exports.inspectOpts);
		for (var i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
	/**
	* Enable namespaces listed in `process.env.DEBUG` initially.
	*/
	exports.enable(load());
}));
//#endregion
//#region node_modules/morgan/node_modules/debug/src/index.js
var require_src = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Detect Electron renderer process, which is node, but we should
	* treat as a browser.
	*/
	if (typeof process !== "undefined" && process.type === "renderer") module.exports = require_browser();
	else module.exports = require_node();
}));
//#endregion
//#region node_modules/morgan/node_modules/on-finished/index.js
/*!
* on-finished
* Copyright(c) 2013 Jonathan Ong
* Copyright(c) 2014 Douglas Christopher Wilson
* MIT Licensed
*/
var require_on_finished = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module exports.
	* @public
	*/
	module.exports = onFinished;
	module.exports.isFinished = isFinished;
	/**
	* Module dependencies.
	* @private
	*/
	var first = require_ee_first();
	/**
	* Variables.
	* @private
	*/
	/* istanbul ignore next */
	var defer = typeof setImmediate === "function" ? setImmediate : function(fn) {
		process.nextTick(fn.bind.apply(fn, arguments));
	};
	/**
	* Invoke callback when the response has finished, useful for
	* cleaning up resources afterwards.
	*
	* @param {object} msg
	* @param {function} listener
	* @return {object}
	* @public
	*/
	function onFinished(msg, listener) {
		if (isFinished(msg) !== false) {
			defer(listener, null, msg);
			return msg;
		}
		attachListener(msg, listener);
		return msg;
	}
	/**
	* Determine if message is already finished.
	*
	* @param {object} msg
	* @return {boolean}
	* @public
	*/
	function isFinished(msg) {
		var socket = msg.socket;
		if (typeof msg.finished === "boolean") return Boolean(msg.finished || socket && !socket.writable);
		if (typeof msg.complete === "boolean") return Boolean(msg.upgrade || !socket || !socket.readable || msg.complete && !msg.readable);
	}
	/**
	* Attach a finished listener to the message.
	*
	* @param {object} msg
	* @param {function} callback
	* @private
	*/
	function attachFinishedListener(msg, callback) {
		var eeMsg;
		var eeSocket;
		var finished = false;
		function onFinish(error) {
			eeMsg.cancel();
			eeSocket.cancel();
			finished = true;
			callback(error);
		}
		eeMsg = eeSocket = first([[
			msg,
			"end",
			"finish"
		]], onFinish);
		function onSocket(socket) {
			msg.removeListener("socket", onSocket);
			if (finished) return;
			if (eeMsg !== eeSocket) return;
			eeSocket = first([[
				socket,
				"error",
				"close"
			]], onFinish);
		}
		if (msg.socket) {
			onSocket(msg.socket);
			return;
		}
		msg.on("socket", onSocket);
		if (msg.socket === void 0) patchAssignSocket(msg, onSocket);
	}
	/**
	* Attach the listener to the message.
	*
	* @param {object} msg
	* @return {function}
	* @private
	*/
	function attachListener(msg, listener) {
		var attached = msg.__onFinished;
		if (!attached || !attached.queue) {
			attached = msg.__onFinished = createListener(msg);
			attachFinishedListener(msg, attached);
		}
		attached.queue.push(listener);
	}
	/**
	* Create listener on message.
	*
	* @param {object} msg
	* @return {function}
	* @private
	*/
	function createListener(msg) {
		function listener(err) {
			if (msg.__onFinished === listener) msg.__onFinished = null;
			if (!listener.queue) return;
			var queue = listener.queue;
			listener.queue = null;
			for (var i = 0; i < queue.length; i++) queue[i](err, msg);
		}
		listener.queue = [];
		return listener;
	}
	/**
	* Patch ServerResponse.prototype.assignSocket for node.js 0.8.
	*
	* @param {ServerResponse} res
	* @param {function} callback
	* @private
	*/
	function patchAssignSocket(res, callback) {
		var assignSocket = res.assignSocket;
		if (typeof assignSocket !== "function") return;
		res.assignSocket = function _assignSocket(socket) {
			assignSocket.call(this, socket);
			callback(socket);
		};
	}
}));
//#endregion
//#region node_modules/morgan/index.js
/*!
* morgan
* Copyright(c) 2010 Sencha Inc.
* Copyright(c) 2011 TJ Holowaychuk
* Copyright(c) 2014 Jonathan Ong
* Copyright(c) 2014-2017 Douglas Christopher Wilson
* MIT Licensed
*/
var require_morgan = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module exports.
	* @public
	*/
	module.exports = morgan;
	module.exports.compile = compile;
	module.exports.format = format;
	module.exports.token = token;
	/**
	* Module dependencies.
	* @private
	*/
	var auth = require_basic_auth();
	var debug = require_src()("morgan");
	var deprecate = require_depd()("morgan");
	var onFinished = require_on_finished();
	var onHeaders = require_on_headers();
	/**
	* Array of CLF month names.
	* @private
	*/
	var CLF_MONTH = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	/**
	* Default log buffer duration.
	* @private
	*/
	var DEFAULT_BUFFER_DURATION = 1e3;
	/**
	* Create a logger middleware.
	*
	* @public
	* @param {String|Function} format
	* @param {Object} [options]
	* @return {Function} middleware
	*/
	function morgan(format, options) {
		var fmt = format;
		var opts = options || {};
		if (format && typeof format === "object") {
			opts = format;
			fmt = opts.format || "default";
			deprecate("morgan(options): use morgan(" + (typeof fmt === "string" ? JSON.stringify(fmt) : "format") + ", options) instead");
		}
		if (fmt === void 0) deprecate("undefined format: specify a format");
		var immediate = opts.immediate;
		var skip = opts.skip || false;
		var formatLine = typeof fmt !== "function" ? getFormatFunction(fmt) : fmt;
		var buffer = opts.buffer;
		var stream = opts.stream || process.stdout;
		if (buffer) {
			deprecate("buffer option");
			stream = createBufferStream(stream, typeof buffer !== "number" ? DEFAULT_BUFFER_DURATION : buffer);
		}
		return function logger(req, res, next) {
			req._startAt = void 0;
			req._startTime = void 0;
			req._remoteAddress = getip(req);
			res._startAt = void 0;
			res._startTime = void 0;
			recordStartTime.call(req);
			function logRequest() {
				if (skip !== false && skip(req, res)) {
					debug("skip request");
					return;
				}
				var line = formatLine(morgan, req, res);
				if (line == null) {
					debug("skip line");
					return;
				}
				debug("log request");
				stream.write(line + "\n");
			}
			if (immediate) logRequest();
			else {
				onHeaders(res, recordStartTime);
				onFinished(res, logRequest);
			}
			next();
		};
	}
	/**
	* Apache combined log format.
	*/
	morgan.format("combined", ":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\"");
	/**
	* Apache common log format.
	*/
	morgan.format("common", ":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length]");
	/**
	* Default format.
	*/
	morgan.format("default", ":remote-addr - :remote-user [:date] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\"");
	deprecate.property(morgan, "default", "default format: use combined format");
	/**
	* Short format.
	*/
	morgan.format("short", ":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms");
	/**
	* Tiny format.
	*/
	morgan.format("tiny", ":method :url :status :res[content-length] - :response-time ms");
	/**
	* dev (colored)
	*/
	morgan.format("dev", function developmentFormatLine(tokens, req, res) {
		var status = headersSent(res) ? res.statusCode : void 0;
		var color = status >= 500 ? 31 : status >= 400 ? 33 : status >= 300 ? 36 : status >= 200 ? 32 : 0;
		var fn = developmentFormatLine[color];
		if (!fn) fn = developmentFormatLine[color] = compile("\x1B[0m:method :url \x1B[" + color + "m:status\x1B[0m :response-time ms - :res[content-length]\x1B[0m");
		return fn(tokens, req, res);
	});
	/**
	* request url
	*/
	morgan.token("url", function getUrlToken(req) {
		return req.originalUrl || req.url;
	});
	/**
	* request method
	*/
	morgan.token("method", function getMethodToken(req) {
		return req.method;
	});
	/**
	* response time in milliseconds
	*/
	morgan.token("response-time", function getResponseTimeToken(req, res, digits) {
		if (!req._startAt || !res._startAt) return;
		return ((res._startAt[0] - req._startAt[0]) * 1e3 + (res._startAt[1] - req._startAt[1]) * 1e-6).toFixed(digits === void 0 ? 3 : digits);
	});
	/**
	* total time in milliseconds
	*/
	morgan.token("total-time", function getTotalTimeToken(req, res, digits) {
		if (!req._startAt || !res._startAt) return;
		var elapsed = process.hrtime(req._startAt);
		return (elapsed[0] * 1e3 + elapsed[1] * 1e-6).toFixed(digits === void 0 ? 3 : digits);
	});
	/**
	* current date
	*/
	morgan.token("date", function getDateToken(req, res, format) {
		var date = /* @__PURE__ */ new Date();
		switch (format || "web") {
			case "clf": return clfdate(date);
			case "iso": return date.toISOString();
			case "web": return date.toUTCString();
		}
	});
	/**
	* response status code
	*/
	morgan.token("status", function getStatusToken(req, res) {
		return headersSent(res) ? String(res.statusCode) : void 0;
	});
	/**
	* normalized referrer
	*/
	morgan.token("referrer", function getReferrerToken(req) {
		return req.headers.referer || req.headers.referrer;
	});
	/**
	* remote address
	*/
	morgan.token("remote-addr", getip);
	/**
	* remote user
	*/
	morgan.token("remote-user", function getRemoteUserToken(req) {
		var credentials = auth(req);
		return credentials ? credentials.name : void 0;
	});
	/**
	* HTTP version
	*/
	morgan.token("http-version", function getHttpVersionToken(req) {
		return req.httpVersionMajor + "." + req.httpVersionMinor;
	});
	/**
	* UA string
	*/
	morgan.token("user-agent", function getUserAgentToken(req) {
		return req.headers["user-agent"];
	});
	/**
	* request header
	*/
	morgan.token("req", function getRequestToken(req, res, field) {
		var header = req.headers[field.toLowerCase()];
		return Array.isArray(header) ? header.join(", ") : header;
	});
	/**
	* response header
	*/
	morgan.token("res", function getResponseHeader(req, res, field) {
		if (!headersSent(res)) return;
		var header = res.getHeader(field);
		return Array.isArray(header) ? header.join(", ") : header;
	});
	/**
	* Format a Date in the common log format.
	*
	* @private
	* @param {Date} dateTime
	* @return {string}
	*/
	function clfdate(dateTime) {
		var date = dateTime.getUTCDate();
		var hour = dateTime.getUTCHours();
		var mins = dateTime.getUTCMinutes();
		var secs = dateTime.getUTCSeconds();
		var year = dateTime.getUTCFullYear();
		var month = CLF_MONTH[dateTime.getUTCMonth()];
		return pad2(date) + "/" + month + "/" + year + ":" + pad2(hour) + ":" + pad2(mins) + ":" + pad2(secs) + " +0000";
	}
	/**
	* Compile a format string into a function.
	*
	* @param {string} format
	* @return {function}
	* @public
	*/
	function compile(format) {
		if (typeof format !== "string") throw new TypeError("argument format must be a string");
		var js = "  \"use strict\"\n  return " + String(JSON.stringify(format)).replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function(_, name, arg) {
			var tokenArguments = "req, res";
			var tokenFunction = "tokens[" + String(JSON.stringify(name)) + "]";
			if (arg !== void 0) tokenArguments += ", " + String(JSON.stringify(arg));
			return "\" +\n    (" + tokenFunction + "(" + tokenArguments + ") || \"-\") + \"";
		});
		return new Function("tokens, req, res", js);
	}
	/**
	* Create a basic buffering stream.
	*
	* @param {object} stream
	* @param {number} interval
	* @public
	*/
	function createBufferStream(stream, interval) {
		var buf = [];
		var timer = null;
		function flush() {
			timer = null;
			stream.write(buf.join(""));
			buf.length = 0;
		}
		function write(str) {
			if (timer === null) timer = setTimeout(flush, interval);
			buf.push(str);
		}
		return { write };
	}
	/**
	* Define a format with the given name.
	*
	* @param {string} name
	* @param {string|function} fmt
	* @public
	*/
	function format(name, fmt) {
		morgan[name] = fmt;
		return this;
	}
	/**
	* Lookup and compile a named format function.
	*
	* @param {string} name
	* @return {function}
	* @public
	*/
	function getFormatFunction(name) {
		var fmt = morgan[name] || name || morgan.default;
		return typeof fmt !== "function" ? compile(fmt) : fmt;
	}
	/**
	* Get request IP address.
	*
	* @private
	* @param {IncomingMessage} req
	* @return {string}
	*/
	function getip(req) {
		return req.ip || req._remoteAddress || req.connection && req.connection.remoteAddress || void 0;
	}
	/**
	* Determine if the response headers have been sent.
	*
	* @param {object} res
	* @returns {boolean}
	* @private
	*/
	function headersSent(res) {
		// istanbul ignore next: node.js 0.8 support
		return typeof res.headersSent !== "boolean" ? Boolean(res._header) : res.headersSent;
	}
	/**
	* Pad number to two digits.
	*
	* @private
	* @param {number} num
	* @return {string}
	*/
	function pad2(num) {
		var str = String(num);
		// istanbul ignore next: num is current datetime
		return (str.length === 1 ? "0" : "") + str;
	}
	/**
	* Record the start time.
	* @private
	*/
	function recordStartTime() {
		this._startAt = process.hrtime();
		this._startTime = /* @__PURE__ */ new Date();
	}
	/**
	* Define a token function with the given name,
	* and callback fn(req, res).
	*
	* @param {string} name
	* @param {function} fn
	* @public
	*/
	function token(name, fn) {
		morgan[name] = fn;
		return this;
	}
}));
//#endregion
//#region \0virtual:react-router-amplify-hosting
var import_express = /* @__PURE__ */ __toESM(require_express());
var import_compression = /* @__PURE__ */ __toESM(require_compression());
var import_morgan = /* @__PURE__ */ __toESM(require_morgan());
var app = (0, import_express.default)();
app.disable("x-powered-by");
app.use((0, import_compression.default)());
app.use(import_express.static("build/client"));
app.use((0, import_morgan.default)("tiny"));
app.all("*splat", createRequestHandler({ build: server_build_exports }));
app.listen(3e3, () => {
	console.log("App listening on http://localhost:3000");
});
//#endregion
export {};
