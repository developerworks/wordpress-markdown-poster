Namespace.register("info.webtoolkit");

/**
 * 
 * Base64 encode / decode http://www.webtoolkit.info/
 * 
 */

info.webtoolkit.Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = info.webtoolkit.Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = info.webtoolkit.Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for ( var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while (i < utftext.length) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

};


Namespace.register("com.github.dankogai");

(function(global) {

	var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	var b64tab = function(bin) {
		var t = {};
		for ( var i = 0, l = bin.length; i < l; i++)
			t[bin.charAt(i)] = i;
		return t;
	}(b64chars);

	var sub_toBase64 = function(m) {
		var n = (m.charCodeAt(0) << 16) | (m.charCodeAt(1) << 8) | (m.charCodeAt(2));
		return b64chars.charAt(n >>> 18) + b64chars.charAt((n >>> 12) & 63) + b64chars.charAt((n >>> 6) & 63) + b64chars.charAt(n & 63);
	};

	var toBase64 = function(bin) {
		if (bin.match(/[^\x00-\xFF]/))
			throw 'unsupported character found';
		var padlen = 0;
		while (bin.length % 3) {
			bin += '\0';
			padlen++;
		}
		;
		var b64 = bin.replace(/[\x00-\xFF]{3}/g, sub_toBase64);
		if (!padlen)
			return b64;
		b64 = b64.substr(0, b64.length - padlen);
		while (padlen--)
			b64 += '=';
		return b64;
	};

	var btoa = global.btoa || toBase64;

	var sub_fromBase64 = function(m) {
		var n = (b64tab[m.charAt(0)] << 18) | (b64tab[m.charAt(1)] << 12) | (b64tab[m.charAt(2)] << 6) | (b64tab[m.charAt(3)]);
		return String.fromCharCode(n >> 16) + String.fromCharCode((n >> 8) & 0xff) + String.fromCharCode(n & 0xff);
	};

	var fromBase64 = function(b64) {
		b64 = b64.replace(/[^A-Za-z0-9\+\/]/g, '');
		var padlen = 0;
		while (b64.length % 4) {
			b64 += 'A';
			padlen++;
		}
		var bin = b64.replace(/[A-Za-z0-9\+\/]{4}/g, sub_fromBase64);
		if (padlen >= 2)
			bin = bin.substring(0, bin.length - [ 0, 0, 2, 1 ][padlen]);
		return bin;
	};

	var atob = global.atob || fromBase64;

	var re_char_nonascii = /[^\x00-\x7F]/g;

	var sub_char_nonascii = function(m) {
		var n = m.charCodeAt(0);
		return n < 0x800 ? String.fromCharCode(0xc0 | (n >>> 6)) + String.fromCharCode(0x80 | (n & 0x3f)) : String.fromCharCode(0xe0 | ((n >>> 12) & 0x0f))
				+ String.fromCharCode(0x80 | ((n >>> 6) & 0x3f)) + String.fromCharCode(0x80 | (n & 0x3f));
	};

	var utob = function(uni) {
		return uni.replace(re_char_nonascii, sub_char_nonascii);
	};

	var re_bytes_nonascii = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;

	var sub_bytes_nonascii = function(m) {
		var c0 = m.charCodeAt(0);
		var c1 = m.charCodeAt(1);
		if (c0 < 0xe0) {
			return String.fromCharCode(((c0 & 0x1f) << 6) | (c1 & 0x3f));
		} else {
			var c2 = m.charCodeAt(2);
			return String.fromCharCode(((c0 & 0x0f) << 12) | ((c1 & 0x3f) << 6) | (c2 & 0x3f));
		}
	};

	var btou = function(bin) {
		return bin.replace(re_bytes_nonascii, sub_bytes_nonascii);
	};

	com.github.dankogai.Base64 = {
		fromBase64 : fromBase64, toBase64 : toBase64, atob : atob, btoa : btoa, utob : utob, btou : btou, encode : function(u) {
			return btoa(utob(u))
		}, encodeURI : function(u) {
			return btoa(utob(u)).replace(/[+\/]/g, function(m0) {
				return m0 == '+' ? '-' : '_';
			}).replace(/=+$/, '');
		}, decode : function(a) {
			return btou(atob(a.replace(/[-_]/g, function(m0) {
				return m0 == '-' ? '+' : '/';
			})));
		}
	};

})(this);
