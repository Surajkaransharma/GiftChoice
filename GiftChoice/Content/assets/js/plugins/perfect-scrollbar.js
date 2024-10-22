!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).PerfectScrollbar = e() }(this, (function () { "use strict"; function t(t) { return getComputedStyle(t) } function e(t, e) { for (var i in e) { var l = e[i]; "number" == typeof l && (l += "px"), t.style[i] = l } return t } function i(t) { var e = document.createElement("div"); return e.className = t, e } var l = "undefined" != typeof Element && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector); function r(t, e) { if (!l) throw Error("No element matching method supported"); return l.call(t, e) } function n(t) { t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t) } function o(t, e) { return Array.prototype.filter.call(t.children, (function (t) { return r(t, e) })) } var s = { main: "ps", rtl: "ps__rtl", element: { thumb: function (t) { return "ps__thumb-" + t }, rail: function (t) { return "ps__rail-" + t }, consuming: "ps__child--consume" }, state: { focus: "ps--focus", clicking: "ps--clicking", active: function (t) { return "ps--active-" + t }, scrolling: function (t) { return "ps--scrolling-" + t } } }, a = { x: null, y: null }; function c(t, e) { var i = t.element.classList, l = s.state.scrolling(e); i.contains(l) ? clearTimeout(a[e]) : i.add(l) } function h(t, e) { a[e] = setTimeout((function () { return t.isAlive && t.element.classList.remove(s.state.scrolling(e)) }), t.settings.scrollingThreshold) } var u = function (t) { this.element = t, this.handlers = {} }, d = { isEmpty: { configurable: !0 } }; u.prototype.bind = function (t, e) { void 0 === this.handlers[t] && (this.handlers[t] = []), this.handlers[t].push(e), this.element.addEventListener(t, e, !1) }, u.prototype.unbind = function (t, e) { var i = this; this.handlers[t] = this.handlers[t].filter((function (l) { return !!e && l !== e || (i.element.removeEventListener(t, l, !1), !1) })) }, u.prototype.unbindAll = function () { for (var t in this.handlers) this.unbind(t) }, d.isEmpty.get = function () { var t = this; return Object.keys(this.handlers).every((function (e) { return 0 === t.handlers[e].length })) }, Object.defineProperties(u.prototype, d); var f = function () { this.eventElements = [] }; function p(t) { if ("function" == typeof window.CustomEvent) return new CustomEvent(t); var e = document.createEvent("CustomEvent"); return e.initCustomEvent(t, !1, !1, void 0), e } function b(t, e, i, l, r) { var n, o, s, a, u, d, f, b, g, v, m, Y, X, w, y; if (void 0 === l && (l = !0), void 0 === r && (r = !1), "top" === e) n = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"]; else { if ("left" !== e) throw Error("A proper axis should be provided"); n = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"] } o = t, s = i, u = l, d = r, g = (a = n)[0], v = a[1], m = a[2], Y = a[3], X = a[4], w = a[5], void 0 === u && (u = !0), void 0 === d && (d = !1), y = o.element, o.reach[Y] = null, y[m] < 1 && (o.reach[Y] = "start"), y[m] > o[g] - o[v] - 1 && (o.reach[Y] = "end"), s && (y.dispatchEvent(p("ps-scroll-" + Y)), s < 0 ? y.dispatchEvent(p("ps-scroll-" + X)) : s > 0 && y.dispatchEvent(p("ps-scroll-" + w)), u) && (c(f = o, b = Y), h(f, b)), o.reach[Y] && (s || d) && y.dispatchEvent(p("ps-" + Y + "-reach-" + o.reach[Y])) } function g(t) { return parseInt(t, 10) || 0 } f.prototype.eventElement = function (t) { var e = this.eventElements.filter((function (e) { return e.element === t }))[0]; return e || (e = new u(t), this.eventElements.push(e)), e }, f.prototype.bind = function (t, e, i) { this.eventElement(t).bind(e, i) }, f.prototype.unbind = function (t, e, i) { var l = this.eventElement(t); l.unbind(e, i), l.isEmpty && this.eventElements.splice(this.eventElements.indexOf(l), 1) }, f.prototype.unbindAll = function () { this.eventElements.forEach((function (t) { return t.unbindAll() })), this.eventElements = [] }, f.prototype.once = function (t, e, i) { var l = this.eventElement(t), r = function (t) { l.unbind(e, r), i(t) }; l.bind(e, r) }; var v = { isWebKit: "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style, supportsTouch: "undefined" != typeof window && ("ontouchstart" in window || "maxTouchPoints" in window.navigator && window.navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch), supportsIePointer: "undefined" != typeof navigator && navigator.msMaxTouchPoints, isChrome: "undefined" != typeof navigator && /Chrome/i.test(navigator && navigator.userAgent) }; function m(t) { var i, l, r, a, c, h = t.element, u = Math.floor(h.scrollTop), d = h.getBoundingClientRect(); t.containerWidth = Math.ceil(d.width), t.containerHeight = Math.ceil(d.height), t.contentWidth = h.scrollWidth, t.contentHeight = h.scrollHeight, h.contains(t.scrollbarXRail) || (o(h, s.element.rail("x")).forEach((function (t) { return n(t) })), h.appendChild(t.scrollbarXRail)), h.contains(t.scrollbarYRail) || (o(h, s.element.rail("y")).forEach((function (t) { return n(t) })), h.appendChild(t.scrollbarYRail)), !t.settings.suppressScrollX && t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth ? (t.scrollbarXActive = !0, t.railXWidth = t.containerWidth - t.railXMarginWidth, t.railXRatio = t.containerWidth / t.railXWidth, t.scrollbarXWidth = Y(t, g(t.railXWidth * t.containerWidth / t.contentWidth)), t.scrollbarXLeft = g((t.negativeScrollAdjustment + h.scrollLeft) * (t.railXWidth - t.scrollbarXWidth) / (t.contentWidth - t.containerWidth))) : t.scrollbarXActive = !1, !t.settings.suppressScrollY && t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight ? (t.scrollbarYActive = !0, t.railYHeight = t.containerHeight - t.railYMarginHeight, t.railYRatio = t.containerHeight / t.railYHeight, t.scrollbarYHeight = Y(t, g(t.railYHeight * t.containerHeight / t.contentHeight)), t.scrollbarYTop = g(u * (t.railYHeight - t.scrollbarYHeight) / (t.contentHeight - t.containerHeight))) : t.scrollbarYActive = !1, t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth && (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth), t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight && (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight), i = h, r = { width: (l = t).railXWidth }, a = Math.floor(i.scrollTop), l.isRtl ? r.left = l.negativeScrollAdjustment + i.scrollLeft + l.containerWidth - l.contentWidth : r.left = i.scrollLeft, l.isScrollbarXUsingBottom ? r.bottom = l.scrollbarXBottom - a : r.top = l.scrollbarXTop + a, e(l.scrollbarXRail, r), c = { top: a, height: l.railYHeight }, l.isScrollbarYUsingRight ? l.isRtl ? c.right = l.contentWidth - (l.negativeScrollAdjustment + i.scrollLeft) - l.scrollbarYRight - l.scrollbarYOuterWidth - 9 : c.right = l.scrollbarYRight - i.scrollLeft : l.isRtl ? c.left = l.negativeScrollAdjustment + i.scrollLeft + 2 * l.containerWidth - l.contentWidth - l.scrollbarYLeft - l.scrollbarYOuterWidth : c.left = l.scrollbarYLeft + i.scrollLeft, e(l.scrollbarYRail, c), e(l.scrollbarX, { left: l.scrollbarXLeft, width: l.scrollbarXWidth - l.railBorderXWidth }), e(l.scrollbarY, { top: l.scrollbarYTop, height: l.scrollbarYHeight - l.railBorderYWidth }), t.scrollbarXActive ? h.classList.add(s.state.active("x")) : (h.classList.remove(s.state.active("x")), t.scrollbarXWidth = 0, t.scrollbarXLeft = 0, h.scrollLeft = !0 === t.isRtl ? t.contentWidth : 0), t.scrollbarYActive ? h.classList.add(s.state.active("y")) : (h.classList.remove(s.state.active("y")), t.scrollbarYHeight = 0, t.scrollbarYTop = 0, h.scrollTop = 0) } function Y(t, e) { return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e } function X(t, e) { var i = e[0], l = e[1], r = e[2], n = e[3], o = e[4], a = e[5], u = e[6], d = e[7], f = e[8], p = t.element, b = null, g = null, v = null; function Y(e) { e.touches && e.touches[0] && (e[r] = e.touches[0].pageY), p[u] = b + v * (e[r] - g), c(t, d), m(t), e.stopPropagation(), e.preventDefault() } function X() { h(t, d), t[f].classList.remove(s.state.clicking), t.event.unbind(t.ownerDocument, "mousemove", Y) } function w(e, o) { b = p[u], o && e.touches && (e[r] = e.touches[0].pageY), g = e[r], v = (t[l] - t[i]) / (t[n] - t[a]), o ? t.event.bind(t.ownerDocument, "touchmove", Y) : (t.event.bind(t.ownerDocument, "mousemove", Y), t.event.once(t.ownerDocument, "mouseup", X), e.preventDefault()), t[f].classList.add(s.state.clicking), e.stopPropagation() } t.event.bind(t[o], "mousedown", (function (t) { w(t) })), t.event.bind(t[o], "touchstart", (function (t) { w(t, !0) })) } var w = { "click-rail": function (t) { t.element, t.event.bind(t.scrollbarY, "mousedown", (function (t) { return t.stopPropagation() })), t.event.bind(t.scrollbarYRail, "mousedown", (function (e) { var i = e.pageY - window.pageYOffset - t.scrollbarYRail.getBoundingClientRect().top > t.scrollbarYTop ? 1 : -1; t.element.scrollTop += i * t.containerHeight, m(t), e.stopPropagation() })), t.event.bind(t.scrollbarX, "mousedown", (function (t) { return t.stopPropagation() })), t.event.bind(t.scrollbarXRail, "mousedown", (function (e) { var i = e.pageX - window.pageXOffset - t.scrollbarXRail.getBoundingClientRect().left > t.scrollbarXLeft ? 1 : -1; t.element.scrollLeft += i * t.containerWidth, m(t), e.stopPropagation() })) }, "drag-thumb": function (t) { X(t, ["containerWidth", "contentWidth", "pageX", "railXWidth", "scrollbarX", "scrollbarXWidth", "scrollLeft", "x", "scrollbarXRail"]), X(t, ["containerHeight", "contentHeight", "pageY", "railYHeight", "scrollbarY", "scrollbarYHeight", "scrollTop", "y", "scrollbarYRail"]) }, keyboard: function (t) { var e = t.element; t.event.bind(t.ownerDocument, "keydown", (function (i) { if ((!i.isDefaultPrevented || !i.isDefaultPrevented()) && !i.defaultPrevented && (r(e, ":hover") || r(t.scrollbarX, ":focus") || r(t.scrollbarY, ":focus"))) { var l, n = document.activeElement ? document.activeElement : t.ownerDocument.activeElement; if (n) { if ("IFRAME" === n.tagName) n = n.contentDocument.activeElement; else for (; n.shadowRoot;)n = n.shadowRoot.activeElement; if (r(l = n, "input,[contenteditable]") || r(l, "select,[contenteditable]") || r(l, "textarea,[contenteditable]") || r(l, "button,[contenteditable]")) return } var o = 0, s = 0; switch (i.which) { case 37: o = i.metaKey ? -t.contentWidth : i.altKey ? -t.containerWidth : -30; break; case 38: s = i.metaKey ? t.contentHeight : i.altKey ? t.containerHeight : 30; break; case 39: o = i.metaKey ? t.contentWidth : i.altKey ? t.containerWidth : 30; break; case 40: s = i.metaKey ? -t.contentHeight : i.altKey ? -t.containerHeight : -30; break; case 32: s = i.shiftKey ? t.containerHeight : -t.containerHeight; break; case 33: s = t.containerHeight; break; case 34: s = -t.containerHeight; break; case 36: s = t.contentHeight; break; case 35: s = -t.contentHeight; break; default: return }(!t.settings.suppressScrollX || 0 === o) && (!t.settings.suppressScrollY || 0 === s) && (e.scrollTop -= s, e.scrollLeft += o, m(t), function (i, l) { var r = Math.floor(e.scrollTop); if (0 === i) { if (!t.scrollbarYActive) return !1; if (0 === r && l > 0 || r >= t.contentHeight - t.containerHeight && l < 0) return !t.settings.wheelPropagation } var n = e.scrollLeft; if (0 === l) { if (!t.scrollbarXActive) return !1; if (0 === n && i < 0 || n >= t.contentWidth - t.containerWidth && i > 0) return !t.settings.wheelPropagation } return !0 }(o, s) && i.preventDefault()) } })) }, wheel: function (e) { var i = e.element; function l(l) { var r, n, o, a = (n = (r = l).deltaX, o = -1 * r.deltaY, (void 0 === n || void 0 === o) && (n = -1 * r.wheelDeltaX / 6, o = r.wheelDeltaY / 6), r.deltaMode && 1 === r.deltaMode && (n *= 10, o *= 10), n != n && o != o && (n = 0, o = r.wheelDelta), r.shiftKey ? [-o, -n] : [n, o]), c = a[0], h = a[1]; if (!function (e, l, r) { if (!v.isWebKit && i.querySelector("select:focus")) return !0; if (!i.contains(e)) return !1; for (var n = e; n && n !== i;) { if (n.classList.contains(s.element.consuming)) return !0; var o = t(n); if (r && o.overflowY.match(/(scroll|auto)/)) { var a = n.scrollHeight - n.clientHeight; if (a > 0 && (n.scrollTop > 0 && r < 0 || n.scrollTop < a && r > 0)) return !0 } if (l && o.overflowX.match(/(scroll|auto)/)) { var c = n.scrollWidth - n.clientWidth; if (c > 0 && (n.scrollLeft > 0 && l < 0 || n.scrollLeft < c && l > 0)) return !0 } n = n.parentNode } return !1 }(l.target, c, h)) { var u, d, f, p, b, g, Y, X = !1; e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (h ? i.scrollTop -= h * e.settings.wheelSpeed : i.scrollTop += c * e.settings.wheelSpeed, X = !0) : e.scrollbarXActive && !e.scrollbarYActive && (c ? i.scrollLeft += c * e.settings.wheelSpeed : i.scrollLeft -= h * e.settings.wheelSpeed, X = !0) : (i.scrollTop -= h * e.settings.wheelSpeed, i.scrollLeft += c * e.settings.wheelSpeed), m(e), (X = X || (u = c, d = h, f = Math.floor(i.scrollTop), p = 0 === i.scrollTop, b = f + i.offsetHeight === i.scrollHeight, g = 0 === i.scrollLeft, Y = i.scrollLeft + i.offsetWidth === i.scrollWidth, !(Math.abs(d) > Math.abs(u) ? p || b : g || Y) || !e.settings.wheelPropagation)) && !l.ctrlKey && (l.stopPropagation(), l.preventDefault()) } } void 0 !== window.onwheel ? e.event.bind(i, "wheel", l) : void 0 !== window.onmousewheel && e.event.bind(i, "mousewheel", l) }, touch: function (e) { if (v.supportsTouch || v.supportsIePointer) { var i = e.element, l = {}, r = 0, n = {}, o = null; v.supportsTouch ? (e.event.bind(i, "touchstart", u), e.event.bind(i, "touchmove", d), e.event.bind(i, "touchend", f)) : v.supportsIePointer && (window.PointerEvent ? (e.event.bind(i, "pointerdown", u), e.event.bind(i, "pointermove", d), e.event.bind(i, "pointerup", f)) : window.MSPointerEvent && (e.event.bind(i, "MSPointerDown", u), e.event.bind(i, "MSPointerMove", d), e.event.bind(i, "MSPointerUp", f))) } function a(t, l) { i.scrollTop -= l, i.scrollLeft -= t, m(e) } function c(t) { return t.targetTouches ? t.targetTouches[0] : t } function h(t) { return (!t.pointerType || "pen" !== t.pointerType || 0 !== t.buttons) && (!!t.targetTouches && 1 === t.targetTouches.length || !!t.pointerType && "mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE) } function u(t) { if (h(t)) { var e = c(t); l.pageX = e.pageX, l.pageY = e.pageY, r = (new Date).getTime(), null !== o && clearInterval(o) } } function d(o) { if (h(o)) { var u = c(o), d = { pageX: u.pageX, pageY: u.pageY }, f = d.pageX - l.pageX, p = d.pageY - l.pageY; if (!function (e, l, r) { if (!i.contains(e)) return !1; for (var n = e; n && n !== i;) { if (n.classList.contains(s.element.consuming)) return !0; var o = t(n); if (r && o.overflowY.match(/(scroll|auto)/)) { var a = n.scrollHeight - n.clientHeight; if (a > 0 && (n.scrollTop > 0 && r < 0 || n.scrollTop < a && r > 0)) return !0 } if (l && o.overflowX.match(/(scroll|auto)/)) { var c = n.scrollWidth - n.clientWidth; if (c > 0 && (n.scrollLeft > 0 && l < 0 || n.scrollLeft < c && l > 0)) return !0 } n = n.parentNode } return !1 }(o.target, f, p)) { a(f, p), l = d; var b = (new Date).getTime(), g = b - r; g > 0 && (n.x = f / g, n.y = p / g, r = b), function (t, l) { var r = Math.floor(i.scrollTop), n = (i.scrollLeft, Math.abs(t)), o = Math.abs(l); if (o > n) { if (l < 0 && r === e.contentHeight - e.containerHeight || l > 0 && 0 === r) return 0 === window.scrollY && l > 0 && v.isChrome } else n > o && t < 0 && (e.contentWidth, e.containerWidth); return !0 }(f, p) && o.preventDefault() } } } function f() { e.settings.swipeEasing && (clearInterval(o), o = setInterval((function () { e.isInitialized || !n.x && !n.y || .01 > Math.abs(n.x) && .01 > Math.abs(n.y) ? clearInterval(o) : (a(30 * n.x, 30 * n.y), n.x *= .8, n.y *= .8) }), 10)) } } }, y = function (l, r) { var n = this; if (void 0 === r && (r = {}), "string" == typeof l && (l = document.querySelector(l)), !l || !l.nodeName) throw Error("no element is specified to initialize PerfectScrollbar"); for (var o in this.element = l, l.classList.add(s.main), this.settings = { handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"], maxScrollbarLength: null, minScrollbarLength: null, scrollingThreshold: 1e3, scrollXMarginOffset: 0, scrollYMarginOffset: 0, suppressScrollX: !1, suppressScrollY: !1, swipeEasing: !0, useBothWheelAxes: !1, wheelPropagation: !0, wheelSpeed: 1 }, r) this.settings[o] = r[o]; this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null; var a, c, h = function () { return l.classList.add(s.state.focus) }, u = function () { return l.classList.remove(s.state.focus) }; this.isRtl = "rtl" === t(l).direction, !0 === this.isRtl && l.classList.add(s.rtl), this.isNegativeScroll = (a = l.scrollLeft, null, l.scrollLeft = -1, c = l.scrollLeft < 0, l.scrollLeft = a, c), this.negativeScrollAdjustment = this.isNegativeScroll ? l.scrollWidth - l.clientWidth : 0, this.event = new f, this.ownerDocument = l.ownerDocument || document, this.scrollbarXRail = i(s.element.rail("x")), l.appendChild(this.scrollbarXRail), this.scrollbarX = i(s.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", h), this.event.bind(this.scrollbarX, "blur", u), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null; var d = t(this.scrollbarXRail); this.scrollbarXBottom = parseInt(d.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = g(d.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = g(d.borderLeftWidth) + g(d.borderRightWidth), e(this.scrollbarXRail, { display: "block" }), this.railXMarginWidth = g(d.marginLeft) + g(d.marginRight), e(this.scrollbarXRail, { display: "" }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = i(s.element.rail("y")), l.appendChild(this.scrollbarYRail), this.scrollbarY = i(s.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", h), this.event.bind(this.scrollbarY, "blur", u), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null; var p, b = t(this.scrollbarYRail); this.scrollbarYRight = parseInt(b.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = g(b.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? g((p = t(this.scrollbarY)).width) + g(p.paddingLeft) + g(p.paddingRight) + g(p.borderLeftWidth) + g(p.borderRightWidth) : null, this.railBorderYWidth = g(b.borderTopWidth) + g(b.borderBottomWidth), e(this.scrollbarYRail, { display: "block" }), this.railYMarginHeight = g(b.marginTop) + g(b.marginBottom), e(this.scrollbarYRail, { display: "" }), this.railYHeight = null, this.railYRatio = null, this.reach = { x: l.scrollLeft <= 0 ? "start" : l.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null, y: l.scrollTop <= 0 ? "start" : l.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null }, this.isAlive = !0, this.settings.handlers.forEach((function (t) { return w[t](n) })), this.lastScrollTop = Math.floor(l.scrollTop), this.lastScrollLeft = l.scrollLeft, this.event.bind(this.element, "scroll", (function (t) { return n.onScroll(t) })), m(this) }; return y.prototype.update = function () { this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, e(this.scrollbarXRail, { display: "block" }), e(this.scrollbarYRail, { display: "block" }), this.railXMarginWidth = g(t(this.scrollbarXRail).marginLeft) + g(t(this.scrollbarXRail).marginRight), this.railYMarginHeight = g(t(this.scrollbarYRail).marginTop) + g(t(this.scrollbarYRail).marginBottom), e(this.scrollbarXRail, { display: "none" }), e(this.scrollbarYRail, { display: "none" }), m(this), b(this, "top", 0, !1, !0), b(this, "left", 0, !1, !0), e(this.scrollbarXRail, { display: "" }), e(this.scrollbarYRail, { display: "" })) }, y.prototype.onScroll = function (t) { this.isAlive && (m(this), b(this, "top", this.element.scrollTop - this.lastScrollTop), b(this, "left", this.element.scrollLeft - this.lastScrollLeft), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft) }, y.prototype.destroy = function () { this.isAlive && (this.event.unbindAll(), n(this.scrollbarX), n(this.scrollbarY), n(this.scrollbarXRail), n(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1) }, y.prototype.removePsClasses = function () { this.element.className = this.element.className.split(" ").filter((function (t) { return !t.match(/^ps([-_].+|)$/) })).join(" ") }, y }));