﻿/* JCE MediaBox - 1.2.3 | 18 May 2016 | http://www.joomlacontenteditor.net | Copyright (C) 2006 - 2016 Ryan Demmer. All rights reserved | GNU/GPL Version 2 - http://www.gnu.org/licenses/gpl-2.0.html */
(function (window) {
    var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (input) {
            var output = ""; var chr1, chr2, chr3, enc1, enc2, enc3, enc4; var i = 0; input = Base64._utf8_encode(input); while (i < input.length) {
                chr1 = input.charCodeAt(i++); chr2 = input.charCodeAt(i++); chr3 = input.charCodeAt(i++); enc1 = chr1 >> 2; enc2 = ((chr1 & 3) << 4) | (chr2 >> 4); enc3 = ((chr2 & 15) << 2) | (chr3 >> 6); enc4 = chr3 & 63; if (isNaN(chr2)) { enc3 = enc4 = 64; } else if (isNaN(chr3)) { enc4 = 64; }
                output = output +
                    Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
                    Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
            }
            return output;
        }, decode: function (input) {
            var output = ""; var chr1, chr2, chr3; var enc1, enc2, enc3, enc4; var i = 0; input = input.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (i < input.length) {
                enc1 = Base64._keyStr.indexOf(input.charAt(i++)); enc2 = Base64._keyStr.indexOf(input.charAt(i++)); enc3 = Base64._keyStr.indexOf(input.charAt(i++)); enc4 = Base64._keyStr.indexOf(input.charAt(i++)); chr1 = (enc1 << 2) | (enc2 >> 4); chr2 = ((enc2 & 15) << 4) | (enc3 >> 2); chr3 = ((enc3 & 3) << 6) | enc4; output = output + String.fromCharCode(chr1); if (enc3 != 64) { output = output + String.fromCharCode(chr2); }
                if (enc4 != 64) { output = output + String.fromCharCode(chr3); }
            }
            output = Base64._utf8_decode(output); return output;
        }, _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, "\n"); var utftext = ""; for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n); if (c < 128) { utftext += String.fromCharCode(c); }
                else if ((c > 127) && (c < 2048)) { utftext += String.fromCharCode((c >> 6) | 192); utftext += String.fromCharCode((c & 63) | 128); }
                else { utftext += String.fromCharCode((c >> 12) | 224); utftext += String.fromCharCode(((c >> 6) & 63) | 128); utftext += String.fromCharCode((c & 63) | 128); }
            }
            return utftext;
        }, _utf8_decode: function (utftext) {
            var string = ""; var i = 0; var c = 0, c1 = 0, c2 = 0; while (i < utftext.length) {
                c = utftext.charCodeAt(i); if (c < 128) { string += String.fromCharCode(c); i++; }
                else if ((c > 191) && (c < 224)) { c1 = utftext.charCodeAt(i + 1); string += String.fromCharCode(((c & 31) << 6) | (c1 & 63)); i += 2; }
                else { c1 = utftext.charCodeAt(i + 1); c2 = utftext.charCodeAt(i + 2); string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63)); i += 3; }
            }
            return string;
        }
    }; if (!window.btoa) { window.btoa = Base64.encode; }
    if (!window.atob) { window.atob = Base64.decode; }
    var support = {}; support.video = (function () {
        var elem = document.createElement('video'), bool = false; try { if (bool = !!elem.canPlayType) { bool = new Boolean(bool); bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ''); bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ''); bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ''); } } catch (e) { }
        return bool;
    })(); var entities = { '\"': '&quot;', "'": '&#39;', '<': '&lt;', '>': '&gt;', '&': '&amp;' }; support.audio = (function () {
        var elem = document.createElement('audio'), bool = false; try { if (bool = !!elem.canPlayType) { bool = new Boolean(bool); bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''); bool.mp3 = elem.canPlayType('audio/mpeg;').replace(/^no$/, ''); bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''); bool.m4a = (elem.canPlayType('audio/x-m4a;') || elem.canPlayType('audio/aac;')).replace(/^no$/, ''); } } catch (e) { }
        return bool;
    })(); window.JCEMediaBox = {
        domLoaded: false, options: { popup: { width: '', height: '', legacy: 0, lightbox: 0, shadowbox: 0, overlay: 1, overlayopacity: 0.8, overlaycolor: '#000000', resize: 0, icons: 1, fadespeed: 500, scalespeed: 500, hideobjects: 1, scrolling: 'fixed', close: 2, labels: { 'close': 'Close', 'next': 'Next', 'previous': 'Previous', 'numbers': '{$current} of {$total}', 'cancel': 'Cancel' }, cookie_expiry: 7, google_viewer: 0, pdfjs: 0 }, tooltip: { speed: 150, offsets: { x: 16, y: 16 }, position: 'br', opacity: 0.8, background: '#000000', color: '#ffffff' }, base: '/', pngfix: false, pngfixclass: '', theme: 'standard', imgpath: 'plugins/system/jcemediabox/img', mediafallback: false, mediaplayer: "", mediaselector: "audio,video" }, init: function (options) {
            this.extend(this.options, options); if (this.isIE6) { try { document.execCommand("BackgroundImageCache", false, true); } catch (e) { } }
            if (!support.video || !support.audio) { document.createElement('source'); }
            this.ready();
        }, ready: function () {
            var win = window, doc = win.document, self = JCEMediaBox; if (self.domLoaded) { return self._init(); }
            function detach() { if (doc.addEventListener) { doc.removeEventListener("DOMContentLoaded", completed, false); win.removeEventListener("load", completed, false); } else { doc.detachEvent("onreadystatechange", completed); win.detachEvent("onload", completed); } }
            function completed(event) { detach(); self.domLoaded = true; self._init(); }
            if (doc.readyState === "complete") { setTimeout(completed); } else if (doc.addEventListener) { doc.addEventListener("DOMContentLoaded", completed, false); win.addEventListener("load", completed, false); } else {
                doc.attachEvent("onreadystatechange", completed); win.attachEvent("onload", completed); var top = false; try { top = win.frameElement == null && doc.documentElement; } catch (e) { }
                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!self.domLoaded) {
                            try { top.doScroll("left"); } catch (e) { return setTimeout(doScrollCheck, 50); }
                            completed();
                        }
                    })();
                }
            }
        }, getSite: function () {
            var base = this.options.base; if (base) {
                var site = document.location.href; var parts = site.split(':\/\/'); var port = parts[0]; var url = parts[1]; if (url.indexOf(base) != -1) { url = url.substr(0, url.indexOf(base)); } else { url = url.substr(0, url.indexOf('/')) || url; }
                return port + '://' + url + base;
            }
            return null;
        }, _init: function () {
            var self = this, na = navigator, ua = na.userAgent; self.isOpera = window.opera && opera.buildNumber; self.isWebKit = /WebKit/.test(ua); self.isChrome = /Chrome\//.test(ua); self.isSafari = /Safari\//.test(ua); self.isIE = !self.isWebKit && !self.isOpera && (/MSIE/gi).test(ua) && (/Explorer/gi).test(na.appName) && !!window.ActiveXObject; self.isIE6 = self.isIE && /MSIE [56]/.test(ua) && !window.XMLHttpRequest; self.isIE7 = self.isIE && /MSIE [7]/.test(ua) && !!window.XMLHttpRequest && !document.querySelector; self.isiOS = /(iPad|iPhone)/.test(ua); self.isAndroid = /Android/.test(ua); self.isMobile = self.isiOS || self.isAndroid; this.site = this.getSite(); if (!this.site) { return false; }
            this.Popup.init(); this.ToolTip.init(); if (this.options.mediafallback) { this.mediaFallback(); }
        }, mediaFallback: function () {
            var self = this, DOM = this.DOM, each = this.each; function toAbsolute(url) { var div = document.createElement('div'); div.innerHTML = '<a href="' + url + '">x</a>'; return div.firstChild.href; }
            function resolveMediaPath(s, absolute) {
                if (s && s.indexOf('://') === -1 && s.charAt(0) !== '/') { s = self.options.base + s; }
                if (absolute) { return toAbsolute(s); }
                return s;
            }
            var selector = this.options.mediaselector; var elms = DOM.select(selector); var swf = this.options.mediaplayer || 'plugins/system/jcemediabox/mediaplayer/mediaplayer.swf'; var supportMap = { 'video': { 'h264': ['video/mp4', 'video/mpeg'], 'webm': ['video/webm'], 'ogg': ['video/ogg'] }, 'audio': { 'mp3': ['audio/mp3', 'audio/mpeg'], 'ogg': ['audio/ogg'], 'webm': ['audio/webm'] } }; function checkSupport(name, type) {
                var hasSupport = false; for (var n in supportMap[name]) { if (supportMap[name][n].indexOf(type) !== -1) { hasSupport = support[name] && !!support[name][n]; } }
                return hasSupport;
            }
            if (elms.length) {
                each(elms, function (el) {
                    var type = el.getAttribute('type'), src = el.getAttribute('src'), name = el.nodeName.toLowerCase(), hasSupport = false; if (!src || !type) {
                        var source = DOM.select('source[type]', el); each(source, function (n) {
                        src = n.getAttribute('src'), type = n.getAttribute('type'); if (type !== "video/x-flv") { hasSupport = checkSupport(name, type); }
                            if (!hasSupport) { return false; }
                        }); if (!hasSupport && name === "video") { source = DOM.select('source[type="video/x-flv"]', el); if (source.length) { src = source[0].getAttribute('src'), type = "video/x-flv"; } }
                    } else { hasSupport = checkSupport(name, type); }
                    if (!src || !type) { return; }
                    if (hasSupport) { return; }
                    var w = el.getAttribute('width'), h = el.getAttribute('height'); var html = '', flashvars = []; if (!self.options.mediaplayer) { flashvars.push('file=' + resolveMediaPath(src, true)); }
                    self.each(['autoplay', 'loop', 'preload', 'controls'], function (at) {
                        var v = el.getAttribute(at); if (typeof v !== "undefined" && v !== null) {
                            if (v === at) { v = true; }
                            flashvars.push(at + '=' + v);
                        }
                    }); var i, attrs = el.attributes; for (i = attrs.length - 1; i >= 0; i--) { var attrName = attrs[i].name; if (attrName && (attrName.indexOf('data-video-') !== -1 || attrName.indexOf('data-audio-') !== -1)) { var name = attrName.replace(/data-(video|audio)-/i, ''); var value = attrs[i].value; if (typeof value !== "undefined" || value !== null) { flashvars.push(name + '=' + value); } } }
                    html += '<object class="wf-mediaplayer-object" data="' + resolveMediaPath(swf) + '" type="application/x-shockwave-flash"'; if (w) { html += ' width="' + w + '"'; }
                    if (h) { html += ' height="' + h + '"'; }
                    html += '>'; html += '<param name="movie" value="' + resolveMediaPath(swf) + '" />'; html += '<param name="flashvars" value="' + flashvars.join('&') + '" />'; html += '<param name="allowfullscreen" value="true" />'; html += '<param name="wmode" value="transparent" />'; var poster = el.getAttribute('poster'); if (poster) { html += '<img src="' + resolveMediaPath(poster) + '" alt="" />'; }
                    html += '<i>Flash is required to play this video. <a href="https://get.adobe.com/flashplayer" target="_blank">Get AdobeÂ® Flash Player</a></i>'; html += '</object>'; var div = document.createElement('span'); div.innerHTML = html; var o = div.firstChild; if (o && o.nodeName === "OBJECT") { el.parentNode.replaceChild(o, el); if (poster) { o.style.backgroundImage = "url('" + resolveMediaPath(poster) + "')"; } }
                });
            }
        }, each: function (o, cb, s) {
            var n, l; if (!o) { return 0; }
            s = s || o; if (o.length !== undefined) { for (n = 0, l = o.length; n < l; n++) { if (cb.call(s, o[n], n, o) === false) { break; } } } else { for (n in o) { if (o.hasOwnProperty(n)) { if (cb.call(s, o[n], n, o) === false) { break; } } } }
            return o;
        }, extend: function (obj, ext) {
            var i, l, name, args = arguments, value; for (i = 1, l = args.length; i < l; i++) { ext = args[i]; for (name in ext) { if (ext.hasOwnProperty(name)) { value = ext[name]; if (value !== undefined) { obj[name] = value; } } } }
            return obj;
        }, trim: function (s) { return (s ? '' + s : '').replace(/^\s*|\s*$/g, ''); }, inArray: function (a, s) {
            var i, l; if (a) { for (i = 0, l = a.length; i < l; i++) { if (a[i] === s) { return i; } } }
            return -1;
        }, DOM: {
            get: function (s) {
                if (typeof (s) == 'string')
                    return document.getElementById(s); return s;
            }, select: function (o, p) {
                var t = this, r = [], s, parts, at, tag, cl, each = JCEMediaBox.each; p = p || document; if (o == '*') { return p.getElementsByTagName(o); }
                if (p.querySelectorAll) { return p.querySelectorAll(o); }
                function inArray(a, v) {
                    var i, l; if (a) {
                        for (i = 0, l = a.length; i < l; i++) {
                            if (a[i] === v)
                                return true;
                        }
                    }
                    return false;
                }
                s = o.split(','); each(s, function (selectors) {
                    parts = JCEMediaBox.trim(selectors).split('.'); tag = parts[0] || '*'; cl = parts[1] || ''; if (/\[(.*?)\]/.test(tag)) { tag = tag.replace(/(.*?)\[(.*?)\]/, function (a, b, c) { at = c; return b; }); }
                    var elements = p.getElementsByTagName(tag); if (cl || at) {
                        each(elements, function (el) {
                            if (cl) { if (t.hasClass(el, cl)) { if (!inArray(r, el)) { r.push(el); } } }
                            if (at) { if (el.getAttribute(at)) { if (!inArray(r, el)) { r.push(el); } } }
                        });
                    } else { r = elements; }
                }); return r;
            }, hasClass: function (el, c) { return new RegExp(c).test(el.className); }, addClass: function (el, c) { if (!this.hasClass(el, c)) { el.className = JCEMediaBox.trim(el.className + ' ' + c); } }, removeClass: function (el, c) { if (this.hasClass(el, c)) { var s = el.className; var re = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g"); var v = s.replace(re, ' '); v = v.replace(/^\s|\s$/g, ''); el.className = v; } }, show: function (el) { el.style.display = 'block'; }, hide: function (el) { el.style.display = 'none'; }, remove: function (el, attrib) { if (attrib) { el.removeAttribute(attrib); } else { var p = el.parentNode || document.body; p.removeChild(el); } }, style: function (n, na, v) {
                var isIE = JCEMediaBox.isIE, r, s; if (!n) { return; }
                na = na.replace(/-(\D)/g, function (a, b) { return b.toUpperCase(); }); s = n.style; if (typeof v == 'undefined') {
                    if (na == 'float')
                        na = isIE ? 'styleFloat' : 'cssFloat'; r = s[na]; if (document.defaultView && !r) {
                            if (/float/i.test(na))
                                na = 'float'; na = na.replace(/[A-Z]/g, function (a) { return '-' + a; }).toLowerCase(); try { r = document.defaultView.getComputedStyle(n, null).getPropertyValue(na); } catch (e) { }
                        }
                    if (n.currentStyle && !r)
                        r = n.currentStyle[na]; return r;
                } else {
                    switch (na) {
                        case 'opacity': v = parseFloat(v); if (isIE) {
                        s.filter = v === '' ? '' : "alpha(opacity=" + (v * 100) + ")"; if (!n.currentStyle || !n.currentStyle.hasLayout)
                            s.display = 'inline-block';
                        }
                            s[na] = v; break; case 'float': na = isIE ? 'styleFloat' : 'cssFloat'; break; default: if (v && /(margin|padding|width|height|top|bottom|left|right)/i.test(na)) { v = /^[\-0-9\.]+$/.test(v) ? v + 'px' : v; }
                            break;
                    }
                    s[na] = v;
                }
            }, styles: function (el, props) { var t = this; JCEMediaBox.each(props, function (v, s) { return t.style(el, s, v); }); }, attribute: function (el, s, v) {
                if (typeof v == 'undefined') {
                    if (s == 'class') { return el.className; }
                    v = el.getAttribute(s); if (v && /^on/.test(s)) { v = v.toString(); v = v.replace(/^function\s+anonymous\(\)\s+\{\s+(.*)\s+\}$/, '$1'); }
                    if (s == 'hspace' && v == -1) { v = ''; }
                    return v;
                }
                if (v === '') { el.removeAttribute(s); }
                switch (s) {
                    case 'style': if (typeof v == 'object') { this.styles(el, v); } else { el.style.cssText = v; }
                        break; case 'class': el.className = v || ''; break; default: el.setAttribute(s, v); break;
                }
            }, attributes: function (el, attribs) { var t = this; JCEMediaBox.each(attribs, function (v, s) { t.attribute(el, s, v); }); }, create: function (el, attribs, html) {
                var o = document.createElement(el); this.attributes(o, attribs); if (typeof html != 'undefined') { o.innerHTML = html; }
                return o;
            }, add: function (n, o, a, h) {
                if (typeof o == 'string') { a = a || {}; o = this.create(o, a, h); }
                n.appendChild(o); return o;
            }, addBefore: function (n, o, c) {
                if (typeof c == 'undefined') { c = n.firstChild; }
                n.insertBefore(o, c);
            }, png: function (el) { var s; if (el.nodeName == 'IMG') { s = el.src; if (/\.png$/i.test(s)) { this.attribute(el, 'src', JCEMediaBox.site + 'plugins/system/jcemediabox/img/blank.gif'); this.style(el, 'filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + s + "')"); } } else { s = this.style(el, 'background-image'); if (/\.png/i.test(s)) { var bg = /url\("(.*)"\)/.exec(s)[1]; this.styles(el, { 'background-image': 'none', 'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + bg + "', sizingMethod='image')" }); } } }, encode: function (s) { return ('' + s).replace(/[<>&\"\']/g, function (c) { return entities[c] || c; }); }, decode: function (s) { var el; s = s.replace(/&lt;/g, '<').replace(/&gt;/g, '>'); el = document.createElement("div"); el.innerHTML = s; return el.innerHTML || s; }
        }, Event: {
            events: [], add: function (o, n, f, s) {
                var t = this; cb = function (e) {
                    if (t.disabled)
                        return; e = e || window.event; if (e && JCEMediaBox.isIE) {
                            if (!e.target) { e.target = e.srcElement || document; }
                            if (!e.relatedTarget && e.fromElement) { e.relatedTarget = e.fromElement == e.target ? e.toElement : e.fromElement; }
                            JCEMediaBox.extend(e, { preventDefault: function () { this.returnValue = false; }, stopPropagation: function () { this.cancelBubble = true; } });
                        }
                    if (e && JCEMediaBox.isWebKit) { if (e.target.nodeType == 3) { e.target = e.target.parentNode; } }
                    if (!s)
                        return f(e); return f.call(s, e);
                }; function _add(o, n, f) { if (o.attachEvent) { o.attachEvent('on' + n, f); } else if (o.addEventListener) { o.addEventListener(n, f, false); } else { o['on' + n] = f; } }
                t.events.push({ obj: o, name: n, func: f, cfunc: cb, scope: s }); _add(o, n, cb);
            }, remove: function (o, n, f) { var t = this, a = t.events, s = false; JCEMediaBox.each(a, function (e, i) { if (e.obj == o && e.name == n && (!f || (e.func == f || e.cfunc == f))) { a.splice(i, 1); t._remove(o, n, e.cfunc); s = true; return false; } }); return s; }, _remove: function (o, n, f) {
                if (o) {
                    try {
                        if (o.detachEvent)
                            o.detachEvent('on' + n, f); else if (o.removeEventListener)
                            o.removeEventListener(n, f, false); else
                            o['on' + n] = null;
                    } catch (ex) { }
                }
            }, cancel: function (e) {
                if (!e)
                    return false; this.stop(e); return this.prevent(e);
            }, stop: function (e) {
                if (e.stopPropagation)
                    e.stopPropagation(); else
                    e.cancelBubble = true; return false;
            }, prevent: function (e) {
                if (e.preventDefault)
                    e.preventDefault(); else
                    e.returnValue = false; return false;
            }, destroy: function () { var t = this; JCEMediaBox.each(t.events, function (e, i) { t._remove(e.obj, e.name, e.cfunc); e.obj = e.cfunc = null; }); t.events = []; t = null; }, addUnload: function (f, s) {
                var t = this; f = { func: f, scope: s || this }; if (!t.unloads) {
                    function unload() {
                        var li = t.unloads, o, n; if (li) {
                            for (n in li) {
                                o = li[n]; if (o && o.func)
                                    o.func.call(o.scope, 1);
                            }
                            if (window.detachEvent) { window.detachEvent('onbeforeunload', fakeUnload); window.detachEvent('onunload', unload); } else if (window.removeEventListener)
                                window.removeEventListener('unload', unload, false); t.unloads = o = li = w = unload = 0; if (window.CollectGarbage)
                                CollectGarbage();
                        }
                    }
                    function fakeUnload() {
                        var d = document; if (d.readyState == 'interactive') {
                            function stop() {
                                d.detachEvent('onstop', stop); if (unload)
                                    unload(); d = 0;
                            }
                            if (d)
                                d.attachEvent('onstop', stop); window.setTimeout(function () {
                                    if (d)
                                        d.detachEvent('onstop', stop);
                                }, 0);
                        }
                    }
                    if (window.attachEvent) { window.attachEvent('onunload', unload); window.attachEvent('onbeforeunload', fakeUnload); } else if (window.addEventListener)
                        window.addEventListener('unload', unload, false); t.unloads = [f];
                } else
                    t.unloads.push(f); return f;
            }, removeUnload: function (f) { var u = this.unloads, r = null; JCEMediaBox.each(u, function (o, i) { if (o && o.func == f) { u.splice(i, 1); r = f; return false; } }); return r; }
        }, Dimensions: {
            getWidth: function () { return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0; }, getHeight: function () {
                if (JCEMediaBox.isiOS || JCEMediaBox.isAndroid) { var zoomLevel = document.documentElement.clientWidth / window.innerWidth; return window.innerHeight * zoomLevel; }
                return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
            }, getScrollHeight: function () { return document.documentElement.scrollHeight || document.body.scrollHeight || 0; }, getScrollWidth: function () { return document.documentElement.scrollWidth || document.body.scrollWidth || 0; }, getScrollTop: function () { return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0; }, getScrollbarWidth: function () {
                var DOM = JCEMediaBox.DOM; if (this.scrollbarWidth) { return this.scrollbarWidth; }
                var outer = DOM.add(document.body, 'div', { 'style': { position: 'absolute', visibility: 'hidden', width: 200, height: 200, border: 0, margin: 0, padding: 0, overflow: 'hidden' } }); var inner = DOM.add(outer, 'div', { 'style': { width: '100%', height: 200, border: 0, margin: 0, padding: 0 } }); var w1 = parseInt(inner.offsetWidth); outer.style.overflow = 'scroll'; var w2 = parseInt(inner.offsetWidth); if (w1 == w2) { w2 = parseInt(outer.clientWidth); }
                document.body.removeChild(outer); this.scrollbarWidth = (w1 - w2); return this.scrollbarWidth;
            }, outerWidth: function (n) {
                var v = 0, x = 0; x = n.offsetWidth; if (!x) { JCEMediaBox.each(['padding-left', 'padding-right', 'border-left', 'border-right', 'width'], function (s) { v = parseFloat(JCEMediaBox.DOM.style(n, s)); v = /[0-9]/.test(v) ? v : 0; x = x + v; }); }
                return x;
            }, outerHeight: function (n) {
                var v = 0, x = 0; x = n.offsetHeight; if (!x) { JCEMediaBox.each(['padding-top', 'padding-bottom', 'border-top', 'border-bottom', 'height'], function (s) { v = parseFloat(JCEMediaBox.DOM.style(n, s)); v = /[0-9]/.test(v) ? v : 0; x = x + v; }); }
                return x;
            }
        }, FX: { animate: function (el, props, speed, cb) { var DOM = JCEMediaBox.DOM; var options = { speed: speed || 100, callback: cb || function () { } }; var styles = {}, sv; JCEMediaBox.each(props, function (v, s) { sv = parseFloat(DOM.style(el, s)); styles[s] = [sv, v]; }); new JCEMediaBox.fx(el, options).custom(styles); return true; } }
    }; JCEMediaBox.XHR = function (options, scope) { this.options = { async: true, headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'text/javascript, text/html, application/xml, text/xml, */*' }, data: null, encoding: 'UTF-8', success: function () { }, error: function () { } }; JCEMediaBox.extend(this.options, options); this.scope = scope || this; }; JCEMediaBox.XHR.prototype = {
        setTransport: function () {
            function get(s) {
                var x = 0; try { x = new ActiveXObject(s); } catch (ex) { }
                return x;
            }
            this.transport = window.XMLHttpRequest ? new XMLHttpRequest() : get('Microsoft.XMLHTTP') || get('Msxml2.XMLHTTP');
        }, onStateChange: function () {
            if (this.transport.readyState != 4 || !this.running) { return; }
            this.running = false; if ((this.transport.status >= 200) && (this.transport.status < 300)) { var s = this.transport.responseText; var x = this.transport.responseXML; this.options.success.call(this.scope, s, x); } else { this.options.error.call(this.scope, this.transport, this.options); }
            this.transport.onreadystatechange = function () { }; this.transport = null;
        }, send: function (url) {
            var t = this, extend = JCEMediaBox.extend; if (this.running) { return this; }
            this.running = true; this.setTransport(); var method = this.options.data ? 'POST' : 'GET'; var encoding = (this.options.encoding) ? '; charset=' + this.options.encoding.toUpperCase() : ''; var contentType = { 'Content-type': 'text/html' + encoding }; if (this.options.data) { contentType = { 'Content-type': 'application/x-www-form-urlencoded' + encoding }; }
            extend(this.options.headers, contentType); this.transport.open(method, url, this.options.async); this.transport.onreadystatechange = function () { return t.onStateChange(); }; for (var type in this.options.headers) { try { this.transport.setRequestHeader(type, this.options.headers[type]); } catch (e) { } }
            this.transport.send(this.options.data);
        }
    }, JCEMediaBox.fx = function (el, options) { this.element = el; this.callback = options.callback; this.speed = options.speed; this.wait = true; this.fps = 50; this.now = {}; }; JCEMediaBox.fx.prototype = {
        step: function () {
            var time = new Date().getTime(); if (time < this.time + this.speed) { this.cTime = time - this.time; this.setNow(); } else { var t = this; this.clearTimer(); this.now = this.to; setTimeout(function () { t.callback.call(t.element, t); }, 10); }
            this.increase();
        }, setNow: function () { var p; for (p in this.from) { this.now[p] = this.compute(this.from[p], this.to[p]); } }, compute: function (from, to) { var change = to - from; return this.transition(this.cTime, from, change, this.speed); }, clearTimer: function () { clearInterval(this.timer); this.timer = null; return this; }, start: function (from, to) {
            var t = this; if (!this.wait)
                this.clearTimer(); if (this.timer)
                return; this.from = from; this.to = to; this.time = new Date().getTime(); this.timer = setInterval(function () { return t.step(); }, Math.round(1000 / this.fps)); return this;
        }, custom: function (o) {
            if (this.timer && this.wait)
                return; var from = {}, to = {}, property; for (property in o) { from[property] = o[property][0]; to[property] = o[property][1]; }
            return this.start(from, to);
        }, increase: function () { for (var p in this.now) { this.setStyle(this.element, p, this.now[p]); } }, transition: function (t, b, c, d) { return -c * Math.cos(t / d * (Math.PI / 2)) + c + b; }, setStyle: function (e, p, v) { JCEMediaBox.DOM.style(e, p, v); }
    }, JCEMediaBox.ToolTip = {
        init: function () {
            var t = this; var theme = JCEMediaBox.options.theme == 'custom' ? JCEMediaBox.options.themecustom : JCEMediaBox.options.theme; this.tooltiptheme = ''; new JCEMediaBox.XHR({
                success: function (text, xml) {
                    var re = /<!-- THEME START -->([\s\S]*?)<!-- THEME END -->/; if (re.test(text)) { text = re.exec(text)[1]; }
                    t.tooltiptheme = text; t.create();
                }
            }).send(JCEMediaBox.site + JCEMediaBox.options.themepath + '/' + theme + '/tooltip.html');
        }, create: function (o) {
            var t = this, each = JCEMediaBox.each, DOM = JCEMediaBox.DOM, Event = JCEMediaBox.Event; function _withinElement(el, e, fn) {
                var p = e.relatedTarget; while (p && p != el) { try { p = p.parentNode; } catch (e) { p = el; } }
                if (p != el) { return fn.call(this); }
                return false;
            }
            each(DOM.select('.jcetooltip, .jce_tooltip', o), function (el) {
                DOM.attribute(el, 'data-title', el.title); DOM.remove(el, 'title'); var n = el; if (el.nodeName == 'IMG' && el.parentNode.className == 'jcemediabox-zoom-span') { n = el.parentNode; }
                Event.add(n, 'mouseover', function (e) { _withinElement(el, e, function () { return t.start(el); }); }); Event.add(n, 'mouseout', function (e) { _withinElement(el, e, function () { return t.end(el); }); }); Event.add(n, 'mousemove', function (e) { return t.locate(e); });
            });
        }, build: function () { if (!this.toolTip) { var DOM = JCEMediaBox.DOM; this.toolTip = DOM.add(document.body, 'div', { 'style': { 'opacity': 0 }, 'class': 'jcemediabox-tooltip' }, this.tooltiptheme); if (JCEMediaBox.isIE6) { DOM.addClass(this.toolTip, 'ie6'); } } }, start: function (el) {
            var t = this, DOM = JCEMediaBox.DOM; if (!this.tooltiptheme)
                return false; this.build(); var text = DOM.attribute(el, 'data-title') || '', title = ''; if (/::/.test(text)) { var parts = text.split('::'); title = JCEMediaBox.trim(parts[0]); text = JCEMediaBox.trim(parts[1]); }
            var h = ''; if (title) { h += '<h4>' + title + '</h4>'; }
            if (text) { h += '<p>' + text + '</p>'; }
            var tn = DOM.get('jcemediabox-tooltip-text'); if (typeof tn == 'undefined') { this.toolTip.className = 'jcemediabox-tooltip-simple'; this.toolTip.innerHTML = h; } else { tn.innerHTML = h; }
            DOM.style(t.toolTip, 'visibility', 'visible'); JCEMediaBox.FX.animate(t.toolTip, { 'opacity': JCEMediaBox.options.tooltip.opacity }, JCEMediaBox.options.tooltip.speed);
        }, end: function (el) {
            if (!this.tooltiptheme)
                return false; JCEMediaBox.DOM.styles(this.toolTip, { 'visibility': 'hidden', 'opacity': 0 });
        }, locate: function (e) {
            if (!this.tooltiptheme)
                return false; this.build(); var o = JCEMediaBox.options.tooltip.offsets; var page = { 'x': e.pageX || e.clientX + document.documentElement.scrollLeft, 'y': e.pageY || e.clientY + document.documentElement.scrollTop }; var tip = { 'x': this.toolTip.offsetWidth, 'y': this.toolTip.offsetHeight }; var pos = { 'x': page.x + o.x, 'y': page.y + o.y }; var ah = 0; switch (JCEMediaBox.options.tooltip.position) { case 'tl': pos.x = (page.x - tip.x) - o.x; pos.y = (page.y - tip.y) - (ah + o.y); break; case 'tr': pos.x = page.x + o.x; pos.y = (page.y - tip.y) - (ah + o.y); break; case 'tc': pos.x = (page.x - Math.round((tip.x / 2))) + o.x; pos.y = (page.y - tip.y) - (ah + o.y); break; case 'bl': pos.x = (page.x - tip.x) - o.x; pos.y = (page.y + Math.round((tip.y / 2))) - (ah + o.y); break; case 'br': pos.x = page.x + o.x; pos.y = page.y + o.y; break; case 'bc': pos.x = (page.x - (tip.x / 2)) + o.x; pos.y = page.y + ah + o.y; break; }
            JCEMediaBox.DOM.styles(this.toolTip, { top: pos.y, left: pos.x });
        }, position: function (element) { }
    }, JCEMediaBox.Popup = {
        addons: { 'flash': {}, 'image': {}, 'iframe': {}, 'html': {}, 'pdf': {} }, setAddons: function (n, o) { JCEMediaBox.extend(this.addons[n], o); }, getAddons: function (n) {
            if (n) { return this.addons[n]; }
            return this.addons;
        }, getAddon: function (v, n) { var cp = false, r, each = JCEMediaBox.each; addons = this.getAddons(n); each(this.addons, function (o, s) { each(o, function (fn) { r = fn.call(this, v); if (typeof r != 'undefined') { cp = r; } }); }); return cp; }, cleanEvent: function (s) { return s.replace(/^function\s+anonymous\(\)\s+\{\s+(.*)\s+\}$/, '$1'); }, parseJSON: function (data) {
            if (typeof data !== "string" || !data) { return null; }
            if (/^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { return window.JSON && window.JSON.parse ? window.JSON.parse(data) : (new Function("return " + data))(); }
        }, params: function (s) {
            var a = [], x = [], self = this, DOM = JCEMediaBox.DOM; function trim(s) { return s = s.replace(/^\s+/, '').replace(/\s+$/, ''); }
            if (typeof s == 'string') {
                if (/^\{[\w\W]+\}$/.test(s)) { return this.parseJSON(s); }
                if (/\w+\[[^\]]+\]/.test(s)) { s = s.replace(/([\w]+)\[([^\]]+)\](;)?/g, function (a, b, c, d) { return '"' + b + '":"' + DOM.encode(trim(c)) + '"' + (d ? ',' : ''); }); return this.parseJSON('{' + s + '}'); }
                if (s.indexOf('&') != -1) { x = s.split(/&(amp;)?/g); } else { x.push(s); }
            }
            if (typeof s == 'object' && s instanceof Array) { x = s; }
            JCEMediaBox.each(x, function (n, i) {
                if (n) {
                    n = n.replace(/^([^\[]+)(\[|=|:)([^\]]*)(\]?)$/, function (a, b, c, d) {
                        if (d) {
                            if (!/[^0-9]/.test(d)) { return '"' + b + '":' + parseInt(d); }
                            return '"' + b + '":"' + DOM.encode(trim(d)) + '"';
                        }
                        return '';
                    }); if (n) { a.push(n); }
                }
            }); return this.parseJSON('{' + a.join(',') + '}');
        }, getCookie: function (n) {
            var c = document.cookie, e, p = n + "=", b; if (!c)
                return; b = c.indexOf("; " + p); if (b == -1) {
                    b = c.indexOf(p); if (b != 0)
                        return null;
                } else { b += 2; }
            e = c.indexOf(";", b); if (e == -1)
                e = c.length; return unescape(c.substring(b + p.length, e));
        }, setCookie: function (n, v, e, p, d, s) {
        document.cookie = n + "=" + escape(v) +
            ((e) ? "; expires=" + e.toGMTString() : "") +
            ((p) ? "; path=" + escape(p) : "") +
            ((d) ? "; domain=" + d : "") +
            ((s) ? "; secure" : "");
        }, convertLegacy: function () {
            var self = this, each = JCEMediaBox.each, DOM = JCEMediaBox.DOM; each(DOM.select('a[href]'), function (el) {
                if (/com_jce/.test(el.href)) {
                    var p, s, img; var oc = DOM.attribute(el, 'onclick'); if (oc) { s = oc.replace(/&#39;/g, "'").split("'"); p = self.params(s[1]); var img = p.img || ''; var title = p.title || ''; }
                    if (img) {
                        if (!/http:\/\//.test(img)) {
                            if (img.charAt(0) == '/') { img = img.substr(1); }
                            img = JCEMediaBox.site.replace(/http:\/\/([^\/]+)/, '') + img;
                        }
                        DOM.attributes(el, { 'href': img, 'title': title.replace(/_/, ' '), 'onclick': '' }); DOM.addClass(el, 'jcepopup');
                    }
                }
            });
        }, convertLightbox: function () {
            var each = JCEMediaBox.each, DOM = JCEMediaBox.DOM; each(DOM.select('a[rel*=lightbox]'), function (el) {
                DOM.addClass(el, 'jcepopup'); r = el.rel.replace(/lightbox\[?([^\]]*)\]?/, function (a, b) {
                    if (b) { return 'group[' + b + ']'; }
                    return '';
                }); DOM.attribute(el, 'rel', r);
            });
        }, convertShadowbox: function () {
            var each = JCEMediaBox.each, DOM = JCEMediaBox.DOM; each(DOM.select('a[rel*=shadowbox]'), function (el) {
                DOM.addClass(el, 'jcepopup'); r = el.rel.replace(/shadowbox\[?([^\]]*)\]?/, function (a, b) {
                    var attribs = '', group = ''; if (b) { group = 'group[' + b + ']'; }
                    if (/;=/.test(a)) { attribs = a.replace(/=([^;"]+)/g, function (x, z) { return '[' + z + ']'; }); }
                    if (group && attribs) { return group + ';' + attribs; }
                    return group || attribs || '';
                }); DOM.attribute(el, 'rel', r);
            });
        }, translate: function (s) {
            if (!s) { s = this.popup.theme; }
            s = s.replace(/\{#(\w+?)\}/g, function (a, b) { return JCEMediaBox.options.popup.labels[b]; }); return s;
        }, styles: function (o) {
            var x = []; if (!o)
                return {}; JCEMediaBox.each(o.split(';'), function (s, i) { s = s.replace(/(.*):(.*)/, function (a, b, c) { return '"' + b + '":"' + c + '"'; }); x.push(s); }); return this.parseJSON('{' + x.join(',') + '}');
        }, getType: function (el) {
            var o = {}, type = ''; if (el.type && /(director|windowsmedia|mplayer|quicktime|real|divx|flash|pdf)/.test(el.type)) { type = /(director|windowsmedia|mplayer|quicktime|real|divx|flash|pdf)/.exec(el.type)[1]; }
            o = this.getAddon(el.src); if (o && o.type) { type = o.type; }
            return type || el.type || 'iframe';
        }, mediatype: function (c) {
            var ci, cb, mt; c = /(director|windowsmedia|mplayer|quicktime|real|divx|flash|pdf)/.exec(c); switch (c[1]) { case 'director': case 'application/x-director': ci = '166b1bca-3f9c-11cf-8075-444553540000'; cb = 'http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0'; mt = 'application/x-director'; break; case 'windowsmedia': case 'mplayer': case 'application/x-mplayer2': ci = '6bf52a52-394a-11d3-b153-00c04f79faa6'; cb = 'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701'; mt = 'application/x-mplayer2'; break; case 'quicktime': case 'video/quicktime': ci = '02bf25d5-8c17-4b23-bc80-d3488abddc6b'; cb = 'http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0'; mt = 'video/quicktime'; break; case 'real': case 'realaudio': case 'audio/x-pn-realaudio-plugin': ci = 'cfcdaa03-8be4-11cf-b84b-0020afbbccfa'; cb = ''; mt = 'audio/x-pn-realaudio-plugin'; break; case 'divx': case 'video/divx': ci = '67dabfbf-d0ab-41fa-9c46-cc0f21721616'; cb = 'http://go.divx.com/plugin/DivXBrowserPlugin.cab'; mt = 'video/divx'; break; case 'pdf': case 'application/pdf': ci = 'ca8a9780-280d-11cf-a24d-444553540000'; cb = ''; mt = 'application/pdf'; break; default: case 'flash': case 'application/x-shockwave-flash': ci = 'd27cdb6e-ae6d-11cf-96b8-444553540000'; cb = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0'; mt = 'application/x-shockwave-flash'; break; }
            return { 'classid': ci, 'codebase': cb, 'mediatype': mt };
        }, islocal: function (s) { if (/^(\w+:)?\/\//.test(s)) { return new RegExp('^(' + JCEMediaBox.site + ')').test(s); } else { return true; } }, protocolRelative: function (url) {
            if (JCEMediaBox.isIE6) { return url; }
            var local = document.location.href; if (url.indexOf('https://') !== -1) { return url; }
            if (local.indexOf('https://') !== -1) { return url.replace(/http(s)?:\/\//i, '//'); }
            return url;
        }, frameWidth: function () { var w = 0, el = this.frame; JCEMediaBox.each(['left', 'right'], function (s) { w = w + parseFloat(JCEMediaBox.DOM.style(el, 'padding-' + s)); }); return parseFloat(this.frame.clientWidth - w); }, frameHeight: function () { var h = 0, el = this.frame, DIM = JCEMediaBox.Dimensions; JCEMediaBox.each(['top', 'bottom'], function (s) { h = h + parseFloat(JCEMediaBox.DOM.style(el, 'padding-' + s)); }); h = h + ((JCEMediaBox.isIE6 || JCEMediaBox.isIE7) ? DIM.getScrollbarWidth() : 0); return parseInt(DIM.getHeight()) - h; }, width: function () { return this.frameWidth() - JCEMediaBox.Dimensions.getScrollbarWidth(); }, height: function () { var h = 0, t = this, each = JCEMediaBox.each, DIM = JCEMediaBox.Dimensions; each(['top', 'bottom'], function (s) { var el = t['info-' + s]; if (el) { h = h + parseInt(DIM.outerHeight(el)); } }); return this.frameHeight() - h; }, printPage: function () { return false; }, zoom: function (el) {
            var self = this; var DOM = JCEMediaBox.DOM, extend = JCEMediaBox.extend, each = JCEMediaBox.each; var children = el.childNodes; var zoom = DOM.create('span'); if (JCEMediaBox.isIE6) { DOM.addClass(el, 'ie6'); }
            var cls = DOM.attribute(el, 'class'); cls = cls.replace('icon-', 'zoom-', 'g'); DOM.attribute(el, 'class', cls); var img = DOM.select('img', el); if (img && img.length) {
                var child = img[0]; var align = child.getAttribute('align'); var vspace = child.getAttribute('vspace'); var hspace = child.getAttribute('hspace'); var styles = {}; each(['top', 'right', 'bottom', 'left'], function (pos) { styles['margin-' + pos] = DOM.style(child, 'margin-' + pos); styles['padding-' + pos] = DOM.style(child, 'padding-' + pos); each(['width', 'style', 'color'], function (prop) { styles['border-' + pos + '-' + prop] = DOM.style(child, 'border-' + pos + '-' + prop); }); }); if (/\w+/.test(align)) { extend(styles, { 'float': /left|right/.test(align) ? align : '', 'text-align': /top|middle|bottom/.test(align) ? align : '' }); }
                if (vspace > 0) { extend(styles, { 'margin-top': parseInt(vspace), 'margin-bottom': parseInt(vspace) }); }
                if (hspace > 0) { extend(styles, { 'margin-left': parseInt(hspace), 'margin-right': parseInt(hspace) }); }
                var w = child.getAttribute('width'); var h = child.getAttribute('height'); var ws = child.style.width; var rh = child.height, rw = child.width; if (!w && !ws && !rw) {
                    if (child.loaded) { return false; }
                    child.onload = function () { child.loaded = true; return self.zoom(el); }; child.onerror = function () { return false; }; return false;
                }
                if (!w && h) { w = h / rh * rw; }
                if (!w) { if (/([0-9]+)(px)?$/.test(ws)) { w = parseFloat(ws); } else { w = rw; } }
                if (w) { child.setAttribute('width', w); styles.width = w; }
                extend(styles, { 'text-align': child.style.textAlign }); var float = DOM.style(child, 'float'); if (float === "left" || float === "right") { styles.float = float; }
                function _buildIcon(el, zoom, child, styles) {
                    var span = DOM.add(el, 'span', { 'class': 'jcemediabox-zoom-span', 'style': child.style.cssText }); DOM.styles(span, styles); if (DOM.hasClass(el.parentNode, 'wf_caption')) { span.style.width = null; DOM.style(span, 'max-width', DOM.style(el.parentNode, 'max-width')); }
                    if (span.style.width) { DOM.style(span, 'max-width', span.style.width); span.style.width = null; }
                    DOM.add(span, child); DOM.add(span, zoom); each(['style', 'align', 'border', 'hspace', 'vspace'], function (v, i) { child.removeAttribute(v); }); DOM.addClass(zoom, 'jcemediabox-zoom-image'); if (JCEMediaBox.isIE6 && /\.png/i.test(DOM.style(zoom, 'background-image'))) { DOM.png(zoom); }
                    DOM.styles(child, { 'margin': 0, 'padding': 0, 'float': 'none', 'border': 'none' });
                }
                _buildIcon(el, zoom, child, styles);
            } else {
                DOM.addClass(zoom, 'jcemediabox-zoom-link'); if (DOM.hasClass(el, 'zoom-left')) { DOM.addBefore(el, zoom); } else { DOM.add(el, zoom); }
                if (JCEMediaBox.isIE7) { DOM.style(zoom, 'display', 'inline-block'); }
            }
            return zoom;
        }, auto: function () {
            var t = this, expires = JCEMediaBox.options.popup.cookie_expiry, dts, key; function makeID(src) { var url = document.location.href; var key = window.btoa(url + src); key = key.replace(/[^\w]/g, ''); key = key.substr(0, 24); return key; }
            JCEMediaBox.each(this.popups, function (el, i) {
                if (el.auto) {
                    if (el.auto == 'single') {
                        key = el.id || makeID(el.src); var cookie = t.getCookie('jcemediabox_' + key + '_' + i); if (!cookie) {
                            if (expires) { dts = new Date(); dts.setHours(expires * 24); }
                            t.setCookie('jcemediabox_' + key + '_' + i, 1, dts); t.start(el);
                        }
                    } else if (el.auto == 'multiple') { t.start(el); }
                }
            });
        }, init: function () { window.jcepopup = this; this.create(); }, getPopups: function (s, p) { var selector = 'a.jcebox, a.jcelightbox, a.jcepopup, area.jcebox, area.jcelightbox, area.jcepopup'; return JCEMediaBox.DOM.select(s || selector, p); }, getData: function (n) {
            var DOM = JCEMediaBox.DOM, each = JCEMediaBox.each, o = {}, data; var re = /\w+\[[^\]]+\]/; data = n.getAttribute('data-mediabox') || n.getAttribute('data-json'); if (!data) {
                var i, attrs = n.attributes, x = 0; for (i = attrs.length - 1; i >= 0; i--) { var attrName = attrs[i].name; if (attrName && attrName.indexOf('data-mediabox-') !== -1) { var attr = attrName.replace('data-mediabox-', ''); o[attr] = attrs[i].value; x++; } }
                if (x) { return o; }
                var title = DOM.attribute(n, 'title'); var rel = DOM.attribute(n, 'rel'); if (title && re.test(title)) { o = this.params(title); DOM.attribute(n, 'title', o.title || ''); return o; }
                if (rel && re.test(rel)) { var args = []; rel = rel.replace(/\b((\w+)\[(.*?)\])(;?)/g, function (a, b, c) { args.push(b); return ''; }); o = this.params(args) || {}; DOM.attribute(n, 'rel', rel || o.rel || ''); return o; }
            } else { n.removeAttribute('data-json'); n.removeAttribute('data-mediabox'); return this.params(data); }
            return o;
        }, process: function (el) {
            var DOM = JCEMediaBox.DOM, data, o = {}, group = '', auto = false; var title = el.title || ''; var rel = el.rel || ''; var src = el.href; src = src.replace(/b(w|h)=([0-9]+)/g, function (s, k, v) { k = (k == 'w') ? 'width' : 'height'; return k + '=' + v; }); data = this.getData(el) || {}; if (!/\w+\[[^\]]+\]/.test(rel)) { var rx = 'alternate|stylesheet|start|next|prev|contents|index|glossary|copyright|chapter|section|subsection|appendix|help|bookmark|nofollow|licence|tag|friend'; var lb = '(lightbox(\[(.*?)\])?)'; var lt = '(lyte(box|frame|show)(\[(.*?)\])?)'; group = JCEMediaBox.trim(rel.replace(new RegExp('\s*(' + rx + '|' + lb + '|' + lt + ')\s*'), '', 'gi')); }
            if (el.nodeName == 'AREA') {
                if (!data) { data = this.params(src); }
                group = group || 'AREA_ELEMENT'; if (!data.type) { if (match = /\b(ajax|iframe|image|flash|director|shockwave|mplayer|windowsmedia|quicktime|realaudio|real|divx|pdf)\b/.exec(el.className)) { data.type = match[0]; } }
            }
            if (/autopopup-(single|multiple)/.test(el.className)) { auto = /(multiple)/.test(el.className) ? 'multiple' : 'single'; }
            group = group || data.group || ''; JCEMediaBox.extend(o, { 'src': src, 'title': data.title || title, 'group': DOM.hasClass(el, 'nogroup') ? '' : group, 'type': data.type || el.type || '', 'params': data, 'auto': auto }); el.href = el.href.replace(/&type=(ajax|text\/html|text\/xml)/, ''); return o;
        }, create: function (elements) {
            var t = this, each = JCEMediaBox.each, Event = JCEMediaBox.Event, DOM = JCEMediaBox.DOM, pageload = false, auto = false; if (!elements) {
                pageload = true; this.popups = []; if (JCEMediaBox.options.popup.legacy == 1) { t.convertLegacy(); }
                if (JCEMediaBox.options.popup.lightbox == 1) { t.convertLightbox(); }
                if (JCEMediaBox.options.popup.shadowbox == 1) { t.convertShadowbox(); }
            }
            this.elements = elements || this.getPopups(); each(this.elements, function (el, i) {
                if (el.childNodes.length === 1 && el.firstChild.nodeName === "IMG") { DOM.addClass(el, 'jcemediabox-image'); }
                if (JCEMediaBox.options.popup.icons == 1 && el.nodeName == 'A' && !/(noicon|icon-none|noshow)/.test(el.className) && el.style.display != 'none') { t.zoom(el); }
                if (/(jcelightbox|jcebox)/.test(el.className)) { DOM.removeClass(el, 'jcelightbox'); DOM.removeClass(el, 'jcebox'); DOM.addClass(el, 'jcepopup'); }
                var o = t.process(el); t.popups.push(o); if (!pageload) { i = t.popups.length - 1; }
                Event.add(el, 'click', function (e) { Event.cancel(e); return t.start(o, i); });
            }); if (pageload) {
            this.popuptheme = ''; var theme = JCEMediaBox.options.theme; new JCEMediaBox.XHR({
                success: function (text, xml) {
                    var re = /<!-- THEME START -->([\s\S]*?)<!-- THEME END -->/; if (re.test(text)) { text = re.exec(text)[1]; }
                    t.popuptheme = text; if (!auto) { t.auto(); auto = true; }
                }
            }).send(JCEMediaBox.site + 'plugins/system/jcemediabox/themes/' + theme + '/popup.html');
            }
        }, open: function (data, title, group, type, params) {
            var i, o = {}; if (typeof data == 'string') { data = { 'src': data, 'title': title, 'group': group, 'type': type, 'params': params }; }
            if (typeof (data == 'object') && data.nodeName && (data.nodeName == 'A' || data.nodeName == 'AREA')) {
                i = JCEMediaBox.inArray(this.elements, data); if (i >= 0) { return this.start(this.popups[i], i); }
                var o = this.process(data); var x = this.popups.push(o); return this.start(o, x - 1);
            }
            return this.start(data);
        }, start: function (p, i) {
            var n = 0, items = [], each = JCEMediaBox.each, len; if (this.build()) {
                if (p.group) { each(this.popups, function (o, x) { if (o.group == p.group) { len = items.push(o); if (i && x == i) { n = len - 1; } } }); if (!p.auto && typeof i == 'undefined') { items.push(p); n = items.length - 1; } } else { items.push(p); }
                return this.show(items, n);
            }
        }, build: function () {
            var t = this, each = JCEMediaBox.each, DOM = JCEMediaBox.DOM, Event = JCEMediaBox.Event; if (!this.page) {
            this.page = DOM.add(document.body, 'div', { id: 'jcemediabox-popup-page' }); if (JCEMediaBox.isIE6) { DOM.addClass(this.page, 'ie6'); }
                if (JCEMediaBox.isIE7) { DOM.addClass(this.page, 'ie7'); }
                if (JCEMediaBox.isiOS) { DOM.addClass(this.page, 'ios'); }
                if (JCEMediaBox.isAndroid) { DOM.addClass(this.page, 'android'); }
                if (JCEMediaBox.options.popup.overlay == 1) { this.overlay = DOM.add(this.page, 'div', { id: 'jcemediabox-popup-overlay', style: { 'opacity': 0, 'background-color': JCEMediaBox.options.popup.overlaycolor } }); }
                if (!this.popuptheme) { return false; }
                this.popuptheme = this.popuptheme.replace(/<!--(.*?)-->/g, ''); this.popuptheme = this.translate(this.popuptheme); this.frame = DOM.add(this.page, 'div', { id: 'jcemediabox-popup-frame' }, '<div id="jcemediabox-popup-body">' + this.popuptheme + '</div>'); each(DOM.select('*[id]', this.frame), function (el) { var s = el.id.replace('jcemediabox-popup-', ''); t[s] = el; DOM.hide(el); }); if ((JCEMediaBox.isiOS || JCEMediaBox.isAndroid) && JCEMediaBox.isWebKit) { DOM.style(this.content, 'webkitOverflowScrolling', 'touch'); }
                if (JCEMediaBox.options.popup.close == 2) { Event.add(this.frame, 'click', function (e) { if (e.target && e.target == t.frame) { t.close(); } }); }
                if (this.closelink) { Event.add(this.closelink, 'click', function () { return t.close(); }); }
                if (this.cancellink) { Event.add(this.cancellink, 'click', function () { return t.close(); }); }
                if (this.next) { Event.add(this.next, 'click', function () { return t.nextItem(); }); }
                if (this.prev) { Event.add(this.prev, 'click', function () { return t.previousItem(); }); }
                if (this.numbers) { this.numbers.tmpHTML = this.numbers.innerHTML; }
                if (this.print) { Event.add(this.print, 'click', function () { return t.printPage(); }); }
                if (JCEMediaBox.isIE6) {
                    DOM.png(this.body); each(DOM.select('*', this.body), function (el) {
                        if (DOM.attribute(el, 'id') == 'jcemediabox-popup-content') { return; }
                        DOM.png(el);
                    });
                }
            }
            return true;
        }, show: function (items, n) {
            var DOM = JCEMediaBox.DOM, DIM = JCEMediaBox.Dimensions, top = 0; this.items = items; this.bind(true); DOM.show(this.body); if (!/\d/.test(this.body.style.top)) { top = (DIM.getHeight() - DIM.outerHeight(this.body)) / 2; }
            DOM.style(this.body, 'top', top); if (JCEMediaBox.isIE6 || JCEMediaBox.options.popup.scrolling == 'scroll') { DOM.addClass(this.page, 'scrolling'); DOM.style(this.overlay, 'height', DIM.getScrollHeight()); DOM.style(this.body, 'top', DIM.getScrollTop() + top); }
            if (JCEMediaBox.options.popup.overlay == 1 && this.overlay) { DOM.show(this.overlay); JCEMediaBox.FX.animate(this.overlay, { 'opacity': JCEMediaBox.options.popup.overlayopacity }, JCEMediaBox.options.popup.fadespeed); }
            return this.change(n);
        }, bind: function (open) {
            var t = this, isIE6 = JCEMediaBox.isIE6, each = JCEMediaBox.each, DOM = JCEMediaBox.DOM, Event = JCEMediaBox.Event, DIM = JCEMediaBox.Dimensions; if (isIE6) {
                each(DOM.select('select'), function (el) {
                    if (open) { el.tmpStyle = el.style.visibility || ''; }
                    el.style.visibility = open ? 'hidden' : el.tmpStyle;
                });
            }
            if (JCEMediaBox.options.popup.hideobjects) {
                each(DOM.select('object, embed'), function (el) {
                    if (el.id == 'jcemediabox-popup-object')
                        return; if (open) { el.tmpStyle = el.style.visibility || ''; }
                    el.style.visibility = open ? 'hidden' : el.tmpStyle;
                });
            }
            var scroll = JCEMediaBox.options.popup.scrollpopup; if (open) { Event.add(document, 'keydown', function (e) { t.listener(e); }); if (isIE6) { Event.add(window, 'scroll', function (e) { DOM.style(t.overlay, 'height', JCEMediaBox.Dimensions.getScrollHeight()); }); Event.add(window, 'scroll', function (e) { DOM.style(t.overlay, 'width', JCEMediaBox.Dimensions.getScrollWidth()); }); } } else {
                if (isIE6 || !scroll) { Event.remove(window, 'scroll'); Event.remove(window, 'resize'); }
                Event.remove(document, 'keydown');
            }
        }, listener: function (e) { switch (e.keyCode) { case 27: this.close(); break; case 37: this.previousItem(); break; case 39: this.nextItem(); break; } }, queue: function (n) { var t = this; var changed = false; JCEMediaBox.each(['top', 'bottom'], function (s) { var el = t['info-' + s]; if (el) { var v = JCEMediaBox.Dimensions.outerHeight(el); var style = {}; style['top'] = (s == 'top') ? v : -v; JCEMediaBox.FX.animate(el, style, JCEMediaBox.options.popup.scalespeed, function () { if (!changed) { changed = true; JCEMediaBox.FX.animate(t.content, { 'opacity': 0 }, JCEMediaBox.options.popup.fadespeed, function () { return t.change(n); }); } }); } }); }, nextItem: function () {
            if (this.items.length == 1)
                return false; var n = this.index + 1; if (n < 0 || n >= this.items.length) { return false; }
            return this.queue(n);
        }, previousItem: function () {
            if (this.items.length == 1)
                return false; var n = this.index - 1; if (n < 0 || n >= this.items.length) { return false; }
            return this.queue(n);
        }, info: function () {
            var each = JCEMediaBox.each, DOM = JCEMediaBox.DOM, Event = JCEMediaBox.Event; if (this.caption) {
                var title = this.active.title || '', text = this.active.caption || '', h = ''; var ex = '([-!#$%&\'\*\+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&\'\*\+\\/0-9=?A-Z^_`a-z{|}~]+\.[-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~]+)'; var ux = '((news|telnet|nttp|file|http|ftp|https)://[-!#$%&\'\*\+\\/0-9=?A-Z^_`a-z{|}~]+\.[-!#$%&\'\*\+\\./0-9=?A-Z^_`a-z{|}~]+)'; function processRe(h) { h = h.replace(new RegExp(ex, 'g'), '<a href="mailto:$1" target="_blank" title="$1">$1</a>'); h = h.replace(new RegExp(ux, 'g'), '<a href="$1" target="_blank" title="$1">$1</a>'); return h; }
                if (title) { h += '<h4>' + DOM.decode(title) + '</h4>'; }
                if (text) { h += '<p>' + DOM.decode(text) + '</p>'; }
                this.caption.innerHTML = h; if (h != '') { each(DOM.select('*', this.caption), function (el) { if (el.nodeName != 'A') { each(el.childNodes, function (n, i) { if (n.nodeType == 3) { var s = n.innerText || n.textContent || n.data || null; if (s && /(@|:\/\/)/.test(s)) { if (s = processRe(s)) { n.parentNode.innerHTML = s; } } } }); } }); }
            }
            var t = this, len = this.items.length; if (this.numbers && len > 1) {
                var html = this.numbers.tmpHTML || '{$numbers}'; if (/\{\$numbers\}/.test(html)) {
                    this.numbers.innerHTML = ''; for (var i = 0; i < len; i++) {
                        var n = i + 1; var title = decodeURIComponent(this.items[i].title || n); var link = DOM.add(this.numbers, 'a', { 'href': 'javascript:;', 'title': title, 'class': (this.index == i) ? 'active' : '' }, n); Event.add(link, 'click', function (e) {
                            var x = parseInt(e.target.innerHTML) - 1; if (t.index == x) { return false; }
                            return t.queue(x);
                        });
                    }
                }
                if (/\{\$(current|total)\}/.test(html)) { this.numbers.innerHTML = html.replace('{$current}', this.index + 1).replace('{$total}', len); }
            } else { if (this.numbers) { this.numbers.innerHTML = ''; } }
            each(['top', 'bottom'], function (v, i) { var el = t['info-' + v]; if (el) { DOM.show(el); each(DOM.select('*[id]', el), function (s) { DOM.show(s); }); DOM.style(el, 'visibility', 'hidden'); } }); DOM.hide(this.next); DOM.hide(this.prev); if (len > 1) {
                if (this.prev) { if (this.index > 0) { DOM.show(this.prev); } else { DOM.hide(this.prev); } }
                if (this.next) { if (this.index < len - 1) { DOM.show(this.next); } else { DOM.hide(this.next); } }
            }
        }, change: function (n) {
            var t = this, extend = JCEMediaBox.extend, each = JCEMediaBox.each, inArray = JCEMediaBox.inArray, DOM = JCEMediaBox.DOM, Event = JCEMediaBox.Event, isIE = JCEMediaBox.isIE, DIM = JCEMediaBox.Dimensions; var p = {}, o, w, h; if (n < 0 || n >= this.items.length) { return false; }
            this.index = n; this.active = {}; DOM.show(this.container); if (this.loader) { DOM.show(this.loader); }
            if (this.cancellink) { DOM.show(this.cancellink); }
            if (this.object) { this.object = null; }
            this.content.innerHTML = ''; o = this.items[n]; extend(p, this.getAddon(o.src, o.type)); delete o.params.src; extend(p, o.params); var width = p.width || JCEMediaBox.options.popup.width || 0; var height = p.height || JCEMediaBox.options.popup.height || 0; if (width && /%/.test(width)) { width = DIM.getWidth() * parseInt(width) / 100; }
            if (height && /%/.test(height)) { height = DIM.getHeight() * parseInt(height) / 100; }
            var title = o.title || p.title || ''; var caption = p.caption || ''; if (/::/.test(title)) { var parts = title.split('::'); title = JCEMediaBox.trim(parts[0]); caption = JCEMediaBox.trim(parts[1]); }
            title = DOM.decode(title); caption = DOM.decode(caption); try { title = decodeURIComponent(title); caption = decodeURIComponent(caption); } catch (e) { }
            extend(this.active, { 'src': p.src || o.src, 'title': title, 'caption': caption, 'type': p.type || this.getType(o), 'params': p || {}, 'width': width, 'height': height }); function toAbsolute(url) { var div = document.createElement('div'); div.innerHTML = '<a href="' + url + '">x</a>'; return div.firstChild.href; }
            function resolveMediaPath(s, absolute) {
                if (s && s.indexOf('://') === -1 && s.charAt(0) !== '/') { s = JCEMediaBox.options.base + s; }
                if (absolute) { return toAbsolute(s); }
                return s;
            }
            switch (this.active.type) {
                case 'image': case 'image/jpeg': case 'image/png': case 'image/gif': case 'image/bmp': if (this.print && this.options.print) { this.print.style.visibility = 'visible'; }
                    this.img = new Image(); this.img.onload = function () { return t.setup(); }; this.img.onerror = function () { t.img.error = true; return t.setup(); }; this.img.src = this.active.src; if (isIE) { DOM.style(this.content, 'background-color', DOM.style(this.content, 'background-color')); }
                    if (p.width && !p.height) { this.active.height = 0; } else if (p.height && !p.width) { this.active.width = 0; }
                    break; case 'flash': case 'director': case 'shockwave': case 'mplayer': case 'windowsmedia': case 'quicktime': case 'realaudio': case 'real': case 'divx': if (this.print) { this.print.style.visibility = 'hidden'; }
                    p.src = this.active.src; var base = /:\/\//.test(p.src) ? '' : this.site; this.object = ''; w = this.width(); h = this.height(); var mt = this.mediatype(this.active.type); if (this.active.type == 'flash') { p.wmode = 'transparent'; p.base = base; }
                    if (/(mplayer|windowsmedia)/i.test(this.active.type)) { p.baseurl = base; if (isIE) { p.url = p.src; delete p.src; } }
                    delete p.title; delete p.group; p.width = this.active.width || this.width(); p.height = this.active.height || this.height(); var flash = /flash/i.test(this.active.type); var pdf = /pdf/i.test(this.active.type); this.active.type = 'media'; this.active.width = p.width; this.active.height = p.height; if (flash || isIE) {
                    this.object = '<object id="jcemediabox-popup-object"'; if (flash && !isIE) { this.object += ' type="' + mt.mediatype + '" data="' + p.src + '"'; } else { this.object += ' classid="clsid:' + mt.classid + '"'; if (mt.codebase) { this.object += ' codebase="' + mt.codebase + '"'; } }
                        for (n in p) { if (p[n] !== '') { if (/^(id|name|style|width|height)$/.test(n)) { t.object += ' ' + n + '="' + decodeURIComponent(DOM.decode(p[n])) + '"'; delete p[n]; } } }
                        delete p.type; this.object += '>'; for (n in p) { t.object += '<param name="' + n + '" value="' + decodeURIComponent(DOM.decode(p[n])) + '" />'; }
                        this.object += '</object>';
                    } else {
                    this.object = '<embed id="jcemediabox-popup-object" type="' + mt.mediatype + '"'; for (n in p) { if (v !== '') { t.object += ' ' + n + '="' + v + '"'; } }
                        this.object += '></embed>';
                    }
                    this.setup(); break; case 'video/x-flv': case 'video/mp4': case 'video/mpeg': case 'video/ogg': case 'audio/ogg': case 'audio/mp3': case 'video/webm': case 'audio/webm': var type = this.active.type, tag = /video/.test(type) ? 'video' : 'audio'; var supportMap = { 'video': { 'h264': ['video/mp4', 'video/mpeg'], 'webm': ['video/webm'], 'ogg': ['video/ogg'] }, 'audio': { 'mp3': ['audio/mp3'], 'ogg': ['audio/ogg'], 'webm': ['audio/webm'] } }; var hasSupport = false; if (type !== "video/x-flv") { for (var n in supportMap[tag]) { if (supportMap[tag][n].indexOf(type) !== -1) { hasSupport = support[tag] && !!support[tag][n]; } } }
                    this.object = ''; var src = resolveMediaPath(this.active.src); if (p.poster) { p.poster = resolveMediaPath(p.poster); }
                    if (hasSupport) {
                    p.width = p.width || this.active.width; p.height = p.height || this.active.height; this.object += '<' + tag + ' type="' + type + '" src="' + this.active.src + '"'; for (n in p) {
                        if (p[n] !== '') {
                            if (/(loop|autoplay|controls|preload)$/.test(n)) { t.object += ' ' + n + '="' + n + '"'; }
                            if (/(id|style|poster|audio)$/.test(n)) { t.object += ' ' + n + '="' + decodeURIComponent(DOM.decode(p[n])) + '"'; }
                        }
                    }
                        this.object += '></' + tag + '>';
                    } else if (/(video|audio)\/(mp4|mpeg|x-flv|mp3)/.test(type)) {
                        var swf = JCEMediaBox.options.base + 'plugins/system/jcemediabox/mediaplayer/mediaplayer.swf'; this.object += '<object type="application/x-shockwave-flash" class="wf-mediaplayer-object" data="' + swf + '"'; p.style = p.style || ""; var flashvars = ['file=' + toAbsolute(src)]; if (p.poster) { p.style += " background-image:url('" + p.poster + "')"; }
                        each(p, function (v, n) {
                            if (v !== "") {
                                n = n.toLowerCase(); if (n === "loop" || n === "autoplay" || n === "controls") { flashvars.push(n + '=' + !!v); }
                                if (n === "preload") { flashvars.push(n + '=' + v); }
                                if (n === "id" || n === "style") { v = decodeURIComponent(DOM.decode(v)); v = JCEMediaBox.trim(v); if (v !== "") { t.object += ' ' + n + '="' + v + '"'; } }
                                if (n === "width" | n === "height") { t.object += ' ' + n + '="' + v + '"'; }
                            }
                        }); this.object += '>'; this.object += '<param name="movie" value="' + swf + '" />'; this.object += '<param name="flashvars" value="' + flashvars.join('&') + '" />'; this.object += '<param name="allowfullscreen" value="true" />'; this.object += '<param name="wmode" value="transparent" />'; this.object += '<i>Flash is required to play this video. <a href="http://get.adobe.com/flashplayer/" target="_blank">Get AdobeÂ® Flash Player</a></i>'; this.object += '</object>';
                    } else { DOM.addClass(this.content, 'broken-media'); }
                    this.active.type = 'media'; this.setup(); break; case 'ajax': case 'text/html': case 'text/xml': if (this.print && this.options.print) { this.print.style.visibility = 'visible'; }
                    this.active.width = this.active.width || this.width(); this.active.height = this.active.height || this.height(); if (this.islocal(this.active.src)) {
                        if (!/tmpl=component/i.test(this.active.src)) { this.active.src += /\?/.test(this.active.src) ? '&tmpl=component' : '?tmpl=component'; }
                        this.active.type = 'ajax';
                    } else { this.active.type = 'iframe'; this.setup(); }
                    styles = extend(this.styles(p.styles), { display: 'none' }); this.active.src = this.active.src.replace(/\&type=(ajax|text\/html|text\/xml)/, ''); if (this.loader) { DOM.show(this.loader); }
                    var iframe = DOM.add(document.body, 'iframe', { src: this.active.src, style: 'display:none;' }); Event.add(iframe, 'load', function () {
                    t.ajax = DOM.add(t.content, 'div', { id: 'jcemediabox-popup-ajax', 'style': styles }); t.ajax.innerHTML = iframe.contentWindow.document.body.innerHTML; if (JCEMediaBox.isIE6) { DOM.style(t.ajax, 'margin-right', JCEMediaBox.Dimensions.getScrollbarWidth()); }
                        if (JCEMediaBox.isIE7) { DOM.style(t.ajax, 'padding-right', JCEMediaBox.Dimensions.getScrollbarWidth()); }
                        window.setTimeout(function () { DOM.remove(iframe); }, 10); t.create(t.getPopups('', t.content)); JCEMediaBox.ToolTip.create(t.content); return t.setup();
                    }); iframe.onerror = function () { DOM.addClass(this.content, 'broken-page'); return t.setup(); }; break; case 'iframe': case 'pdf': case 'video/youtube': case 'video/vimeo': default: if (JCEMediaBox.isMobile && this.active.type === "pdf") { this.close(); return window.open(this.active.src); }
                    if (this.print) { this.print.style.visibility = 'hidden'; }
                    if (this.islocal(this.active.src)) { if (!/tmpl=component/i.test(this.active.src) && !/\.pdf\b/i.test(this.active.src)) { this.active.src += /\?/.test(this.active.src) ? '&tmpl=component' : '?tmpl=component'; } }
                    this.active.src = this.protocolRelative(this.active.src); this.active.width = this.active.width || this.width(); this.active.height = this.active.height || this.height(); this.active.type = 'iframe'; this.setup(); break;
            }
            return false;
        }, resize: function (w, h, x, y) {
            if (w > x) { h = h * (x / w); w = x; if (h > y) { w = w * (y / h); h = y; } } else if (h > y) { w = w * (y / h); h = y; if (w > x) { h = h * (x / w); w = x; } }
            w = Math.round(w); h = Math.round(h); return { width: Math.round(w), height: Math.round(h) };
        }, setup: function () {
            var t = this, DOM = JCEMediaBox.DOM, w, h, o = JCEMediaBox.options.popup; w = this.active.width; h = this.active.height; this.info(); if (this.active.type == 'image') {
                if (t.img.error) { w = 300; h = 300; }
                var x = this.img.width; var y = this.img.height; if (w && !h) { h = y * (w / x); } else if (!w && h) { w = x * (h / y); }
                w = w || x; h = h || y;
            }
            if (parseInt(o.resize) === 1 || (parseInt(o.resize) === 0 && o.scrolling == 'fixed')) { var x = this.width(); var y = this.height(); var dim = this.resize(w, h, x, y); w = dim.width; h = dim.height; }
            DOM.styles(this.content, { width: w, height: h }); DOM.hide(this.content); if (this.active.type == 'image') {
                if (this.img.error) { DOM.addClass(this.content, 'broken-image'); } else { this.content.innerHTML = '<img id="jcemediabox-popup-img" src="' + this.active.src + '" title="' + this.active.title + '" />'; }
                if (JCEMediaBox.isIE) { var img = DOM.get('jcemediabox-popup-img'); if (img) { DOM.style(img, '-ms-interpolation-mode', 'bicubic'); } }
            }
            return this.animate();
        }, showInfo: function () {
            var t = this, each = JCEMediaBox.each, DOM = JCEMediaBox.DOM, FX = JCEMediaBox.FX, DIM = JCEMediaBox.Dimensions, Event = JCEMediaBox.Event; var ss = JCEMediaBox.options.popup.scalespeed, fs = JCEMediaBox.options.popup.fadespeed; var itop = t['info-top']; if (itop) {
                each(DOM.select('*[id]', itop), function (el) {
                    if (/jcemediabox-popup-(next|prev)/.test(DOM.attribute(el, 'id'))) { return; }
                    DOM.show(el);
                }); var h = DIM.outerHeight(itop); DOM.styles(itop, { 'z-index': -1, 'top': h, 'visibility': 'visible' }); FX.animate(itop, { 'top': 0 }, ss);
            }
            if (t.closelink) { DOM.show(t.closelink); }
            var ibottom = t['info-bottom']; if (ibottom) {
                each(DOM.select('*[id]', ibottom), function (el) {
                    if (/jcemediabox-popup-(next|prev)/.test(DOM.attribute(el, 'id'))) { return; }
                    DOM.show(el);
                }); var h = DIM.outerHeight(ibottom); DOM.styles(ibottom, { 'z-index': -1, 'top': -h, 'visibility': 'visible' }); FX.animate(ibottom, { 'top': 0 }, ss);
            }
        }, animate: function () {
            var t = this, each = JCEMediaBox.each, DOM = JCEMediaBox.DOM, FX = JCEMediaBox.FX, DIM = JCEMediaBox.Dimensions, Event = JCEMediaBox.Event; var ss = JCEMediaBox.options.popup.scalespeed, fs = JCEMediaBox.options.popup.fadespeed; var cw = DIM.outerWidth(this.content); var ch = DIM.outerHeight(this.content); var ih = 0; each(['top', 'bottom'], function (v, i) { var el = t['info-' + v]; if (el) { ih = ih + DIM.outerHeight(el); } }); var st = DOM.style(this.page, 'position') == 'fixed' ? 0 : DIM.getScrollTop(); var top = st + (this.frameHeight() / 2) - ((ch + ih) / 2); if (top < 0) { top = 0; }
            DOM.style(this.content, 'opacity', 0); FX.animate(this.body, { 'height': ch, 'top': top, 'width': cw }, ss, function () {
                if (t.active.type == 'iframe') {
                    var iframe = DOM.add(t.content, 'iframe', { id: 'jcemediabox-popup-iframe', frameborder: 0, allowTransparency: true, allowfullscreen: true, scrolling: t.active.params.scrolling || 'auto', width: '100%', height: '100%' }); if (/\.pdf\b/.test(t.active.src)) { if (t.loader) { DOM.hide(t.loader); } } else {
                        var win = iframe.contentWindow, doc = win.document, _timer; if (JCEMediaBox.isiOS && JCEMediaBox.isWebKit) { _timer = setInterval(function () { if (doc.readyState === 'complete') { clearInterval(_timer); if (t.loader) { DOM.hide(t.loader); } } }, 1000); }
                        iframe.onload = function () {
                            if (_timer) { clearInterval(_timer); }
                            if (t.loader) { DOM.hide(t.loader); }
                        };
                    }
                    iframe.setAttribute('src', t.active.src); t.iframe = iframe;
                } else {
                    if (t.loader) { DOM.hide(t.loader); }
                    if (t.active.type == 'media' && t.object) { t.content.innerHTML = t.object; if (/\.pdf\b/.test(t.active.src) && JCEMediaBox.isiOS) { DOM.styles(DOM.get('jcemediabox-popup-object'), { 'height': '1000%', 'width': '150%' }); } }
                    if (t.active.type == 'ajax') { DOM.show(t.ajax); }
                }
                DOM.show(t.content); t.content.focus(); if (t.active.type == 'image' && !JCEMediaBox.isIE6) { FX.animate(t.content, { 'opacity': 1 }, fs, function () { t.showInfo(); }); } else { DOM.style(t.content, 'opacity', 1); t.showInfo(); }
            });
        }, close: function (keepopen) {
            var t = this, each = JCEMediaBox.each, DOM = JCEMediaBox.DOM, DIM = JCEMediaBox.Dimensions, FX = JCEMediaBox.FX; var ss = JCEMediaBox.options.popup.scalespeed; if (this.iframe) { DOM.attribute(this.iframe, 'src', ''); }
            each(['img', 'object', 'iframe', 'ajax'], function (i, v) {
                if (t[v]) { DOM.remove(t[v]); }
                t[v] = null;
            }); if (this.closelink) { DOM.hide(this.closelink); }
            this.content.innerHTML = ''; if (!keepopen) {
                each(['top', 'bottom'], function (v, i) { var el = t['info-' + v]; if (el) { DOM.hide(el); } }); var popups = this.getPopups(); while (this.popups.length > popups.length) { this.popups.pop(); }
                DOM.remove(this.frame); if (this.overlay) { if (JCEMediaBox.isIE6) { this.bind(); DOM.remove(this.page); this.page = null; } else { JCEMediaBox.FX.animate(this.overlay, { 'opacity': 0 }, JCEMediaBox.options.popup.fadespeed, function () { t.bind(); DOM.remove(t.page); t.page = null; }); } } else { DOM.remove(this.page); this.page = null; }
            }
            return false;
        }
    };
})(window); JCEMediaBox.Event.addUnload(function () { JCEMediaBox.Event.destroy(); }); (function (mediabox, undefined) {
    if (mediabox === undefined) { return; }
    var popup = mediabox.Popup, trim = mediabox.trim; popup.setAddons('flash', {
        flash: function (v) { if (/\.swf\b/i.test(v)) { return { type: 'flash' }; } }, flv: function (v) { if (/\.(flv|f4v)\b/i.test(v)) { return { type: 'video/x-flv' }; } }, metacafe: function (v) {
            if (/metacafe(.+)\/(watch|fplayer)\/(.+)/.test(v)) {
                var s = trim(v); if (!/\.swf/i.test(s)) {
                    if (s.charAt(s.length - 1) == '/') { s = s.substring(0, s.length - 1); }
                    s = s + '.swf';
                }
                return { width: 400, height: 345, type: 'flash', attributes: { 'wmode': 'opaque', 'src': s.replace(/watch/i, 'fplayer') } };
            }
        }, dailymotion: function (v) { if (/dailymotion(.+)\/(swf|video)\//.test(v)) { var s = trim(v); s = s.replace(/_(.*)/, ''); return { width: 420, height: 339, type: 'flash', 'wmode': 'opaque', 'src': s.replace(/video/i, 'swf') }; } }, googlevideo: function (v) { if (/google(.+)\/(videoplay|googleplayer\.swf)\?docid=(.+)/.test(v)) { return { width: 425, height: 326, type: 'flash', 'id': 'VideoPlayback', 'wmode': 'opaque', 'src': v.replace(/videoplay/g, 'googleplayer.swf') }; } }
    }); popup.setAddons('iframe', {
        youtube: function (v) {
            if (/youtu(\.)?be([^\/]+)?\/(.+)/.test(v)) {
                return {
                    width: 425, height: 350, type: 'iframe', 'src': v.replace(/youtu(\.)?be([^\/]+)?\/(.+)/, function (a, b, c, d) {
                        var k, query = ''; if (/watch\?/.test(d)) { d = d.replace(/watch\?/, ''); var args = JCEMediaBox.Popup.params(d); query += args.v; delete args.v; for (k in args) { query += (((/\?/.test(query)) ? '&' : '?') + k + '=' + args[k]); } } else { query = d.replace(/embed\//, ''); }
                        if (b && !c) { c = '.com'; }
                        if (!/wmode/.test(query)) { query += /\?/.test(query) ? '&wmode=opaque' : '?wmode=opaque'; }
                        return 'youtube' + c + '/embed/' + query;
                    }).replace(/\/\/youtube/i, '//www.youtube')
                };
            }
        }, vimeo: function (v) {
            if (/vimeo\.com\/(video\/)?([0-9]+)/.test(v)) {
                return {
                    width: 400, height: 225, type: 'iframe', 'src': v.replace(/(player\.)?vimeo\.com\/(video\/)?([0-9]+)/, function (a, b, c, d) {
                        if (b) { return a; }
                        return 'player.vimeo.com/video/' + d;
                    })
                };
            }
        }, twitvid: function (v) {
            if (/twitvid(.+)\/(.+)/.test(v)) {
                var s = 'http://www.twitvid.com/embed.php?guid='; return {
                    width: 480, height: 360, type: 'iframe', 'src': v.replace(/(.+)twitvid([^\/]+)\/(.+)/, function (a, b, c, d) {
                        if (/embed\.php/.test(d)) { return a; }
                        return s + d;
                    })
                };
            }
        }, word: function (v) {
            if (/\.(doc|docx|xls|xlsx|ppt|pptx)$/i.test(v)) {
                var src = v; if (mediabox.options.popup.google_viewer) {
                    if (!/:\/\//.test(v)) { v = mediabox.site + v.replace('?tmpl=component', ''); }
                    src = '//docs.google.com/viewer?url=' + encodeURIComponent(v) + '&embedded=true';
                }
                return { 'type': 'iframe', 'src': src };
            }
        }
    }); popup.setAddons('image', { image: function (v) { if (/\.(jpg|jpeg|png|gif|bmp|tif)$/i.test(v)) { return { type: 'image' }; } }, twitpic: function (v) { if (/twitpic(.+)\/(.+)/.test(v)) { return { type: 'image' }; } } }); popup.setAddons('pdf', {
        pdf: function (v) {
            if (/\.(pdf)$/i.test(v)) {
                var type = 'pdf'; var src = /\?#/.test(v) ? v + '&view=fitH' : v + '#view=fitH'; if (mediabox.options.popup.google_viewer) {
                    type = 'iframe'; if (!/:\/\//.test(v)) { v = mediabox.site + v.replace('?tmpl=component', ''); }
                    src = '//docs.google.com/viewer?url=' + encodeURIComponent(v) + '&embedded=true';
                }
                return { 'type': type, 'src': src };
            }
        }
    });
})(JCEMediaBox);