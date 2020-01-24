/* (c) Mathigon */
var App = function(exports) {
  "use strict";

  function __decorate(t, e, s, i) { var n, r = arguments.length,
      o = r < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, s) : i; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, s, i);
    else
      for (var a = t.length - 1; a >= 0; a--)(n = t[a]) && (o = (r < 3 ? n(o) : r > 3 ? n(e, s, o) : n(e, s)) || o); return r > 3 && o && Object.defineProperty(e, s, o), o }

  function __awaiter(t, e, s, i) { return new(s || (s = Promise))((function(n, r) {
      function o(t) { try { h(i.next(t)) } catch (t) { r(t) } }

      function a(t) { try { h(i.throw(t)) } catch (t) { r(t) } }

      function h(t) { t.done ? n(t.value) : new s((function(e) { e(t.value) })).then(o, a) } h((i = i.apply(t, e || [])).next()) })) }

  function uid(t = 10) { return Math.random().toString(36).substr(2, t) }

  function isOneOf(t, ...e) { return e.includes(t) }

  function applyDefaults(t, e) { for (let s of Object.keys(e)) t.hasOwnProperty(s) || (t[s] = e[s]); return t }
  const defaultMerge = (t, e) => t.concat(e);

  function deepExtend(t, e, s = defaultMerge) { for (const i of Object.keys(e)) i in t && Array.isArray(t[i]) && Array.isArray(e[i]) ? t[i] = s(t[i], e[i]) : i in t && t[i] instanceof Object && e[i] instanceof Object ? deepExtend(t[i], e[i]) : t[i] = e[i] }

  function delay(t, e = 0) { return e ? +setTimeout(t, e) : (t(), 0) }

  function wait(t) { return new Promise(e => setTimeout(e, t)) }

  function defer() { let t = t => {},
      e = t => {}; const s = new Promise((s, i) => { t = s, e = i }); return s.catch(t => t), { promise: s, resolve: t, reject: e } }

  function cache(t) { let e = new Map; return function(...s) { let i = s.join("--"); return e.has(i) || e.set(i, t(...s)), e.get(i) } }

  function throttle(t, e = 0) { let s = !1,
      i = !1; return function(...n) { s ? i = !0 : (t(...n), s = !0, setTimeout((function() { i && t(...n), s = !1, i = !1 }), e)) } }

  function safeToJSON(t, e = {}) { if (!t) return e; try { return JSON.parse(t) || e } catch (t) { return e } }

  function repeat(t, e) { return new Array(e).fill(t) }

  function repeat2D(t, e, s) { const i = []; for (let n = 0; n < e; ++n) i.push(repeat(t, s)); return i }

  function tabulate(t, e) { const s = []; for (let i = 0; i < e; ++i) s.push(t(i)); return s }

  function tabulate2D(t, e, s) { const i = []; for (let n = 0; n < e; ++n) { const e = []; for (let i = 0; i < s; ++i) e.push(t(n, i));
      i.push(e) } return i }

  function list(t, e, s = 1) { const i = []; if (void 0 === e && t >= 0)
      for (let e = 0; e < t; e += s) i.push(e);
    else if (void 0 === e)
      for (let e = 0; e > t; e -= s) i.push(e);
    else if (t <= e)
      for (let n = t; n <= e; n += s) i.push(n);
    else
      for (let n = t; n >= e; n -= s) i.push(n); return i }

  function last(t, e = 0) { return t[t.length - 1 - e] }

  function total(t) { return t.reduce((t, e) => t + e, 0) }

  function sortBy(t, e, s = !1) { return t.slice(0).sort((t, i) => { const n = e(t),
        r = e(i); return n < r ? s ? 1 : -1 : n > r ? s ? -1 : 1 : 0 }) }

  function loop(t) { let e = 0; return () => t[e++ % t.length] }

  function unique(t) { return t.filter((e, s) => t.indexOf(e) === s) }

  function flatten(t) { return t.reduce((t, e) => t.concat(Array.isArray(e) ? flatten(e) : e), []) }

  function cumulative(t) { let e = 0; return t.map(t => e += t) }

  function join(...t) { return t.reduce((t, e) => t.concat(e), []) }

  function toLinkedList(t) { const e = t.map(t => ({ val: t, next: void 0 })),
      s = e.length; for (let t = 0; t < s - 1; ++t) e[t].next = e[t + 1]; return e[s - 1].next = e[0], e }

  function words(t, e = /\s+/) { return t ? t.trim().split(e) : [] }

  function toCamelCase(t) { return t.toLowerCase().replace(/^-/, "").replace(/-(.)/g, (t, e) => e.toUpperCase()) }

  function stringDistance(t, e) { let s = repeat2D(0, t.length + 1, e.length + 1); for (let e = 0; e <= t.length; e++) s[e][0] = e; for (let t = 0; t <= e.length; t++) s[0][t] = t; for (let i = 1; i <= t.length; i++)
      for (let n = 1; n <= e.length; n++) s[i][n] = Math.min(s[i - 1][n - 1] + (t.charAt(i - 1) === e.charAt(n - 1) ? 0 : 1), s[i - 1][n] + 1, s[i][n - 1] + 1); return s[t.length][e.length] }

  function autoCorrect(t, e) { let s = t.length / 2,
      i = sortBy(e.map(e => ({ w: e, d: stringDistance(t, e) })).filter(({ d: t }) => t < s), t => t.d)[0]; return i ? i.w : void 0 } class EventTarget { constructor() { this.events = new Map } on(t, e) { for (let s of words(t)) this.events.has(s) || this.events.set(s, []), this.events.get(s).push(e) } one(t, e) { this.on(t, s => { this.off(t, e), e(s) }) } off(t, e) { for (let s of words(t)) this.events.has(s) && this.events.set(s, this.events.get(s).filter(t => t !== e)) } trigger(t, e) { for (let s of words(t))
        if (this.events.has(s))
          for (const t of this.events.get(s)) t(e) } }
  const shortHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    longHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
    rainbow = ["#22ab24", "#0f82f2", "#cd0e66", "#fd8c00"];

  function pad2(t) { return 1 === t.length ? "0" + t : t }

  function getColourAt(t, e) { if (e <= 0) return t[0]; if (e >= 1) return last(t); const s = Math.floor(e * (t.length - 1)),
      i = e * (t.length - 1) - s; return Color.mix(t[s + 1], t[s], i) } class Color { constructor(t, e, s, i = 1) { this.r = t, this.g = e, this.b = s, this.a = i } get hex() { return "#" + [this.r, this.g, this.b].map(t => pad2(Math.round(t).toString(16))).join("") } get rgb() { return "rgba(" + [this.r, this.g, this.b].map(t => Math.round(t)).join(",") + "," + this.a + ")" } get hsl() { const t = this.r / 255,
        e = this.g / 255,
        s = this.b / 255,
        i = Math.max(t, e, s),
        n = Math.min(t, e, s); let r, o; const a = (i + n) / 2; if (i === n) r = o = 0;
      else { const h = i - n; switch (o = a > .5 ? h / (2 - i - n) : h / (i + n), i) {
          case t:
            r = (e - s) / h + (e < s ? 6 : 0); break;
          case e:
            r = (s - t) / h + 2; break;
          default:
            r = (t - e) / h + 4 } r /= 6 } return "hsl(" + [r, o, a].join(",") + ")" } toString() { return this.rgb } copy() { return new Color(this.r, this.g, this.b, this.a) } static fromHex(t) { t = t.replace(shortHexRegex, (function(t, e, s, i) { return e + e + s + s + i + i })); const e = longHexRegex.exec(t); return e ? new Color(parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)) : new Color(0, 0, 0) } static rainbow(t) { return tabulate(e => getColourAt(rainbow, e / (t - 1)), t) } static mix(t, e, s = .5) { return t instanceof Color || (t = Color.fromHex(t)), e instanceof Color || (e = Color.fromHex(e)), new Color(s * t.r + (1 - s) * e.r, s * t.g + (1 - s) * e.g, s * t.b + (1 - s) * e.b, s * t.a + (1 - s) * e.a) } }

  function toQueryString(t) { const e = []; for (let s of Object.keys(t)) { let i = t[s];
      s = encodeURIComponent(s), null != i ? (i = (i = Array.isArray(i) ? i.join(",") : "" + i).replace(/(\r)?\n/g, "\r\n"), i = (i = encodeURIComponent(i)).replace(/%20/g, "+"), e.push(s + "=" + i)) : e.push(s) } return e.join("&") }

  function post(t, e) { const s = { method: "POST", body: e ? "string" == typeof e ? e : toQueryString(e) : void 0, headers: { "Content-Type": "application/x-www-form-urlencoded", "X-CSRF-Token": window.csrfToken || "" } }; return fetch(t, s).then(t => t.text()) }

  function loadImage(t) { return new Promise(e => { const s = new Image;
      s.onload = () => e(s), s.src = t }) }
  const POST_DATA = new Map;

  function savePostData(t, e) { POST_DATA.has(t) ? deepExtend(POST_DATA.get(t), e, (t, e) => unique(t.concat(e))) : POST_DATA.set(t, e) }

  function sendPostData() { if (window.navigator.onLine)
      for (const [t, e] of POST_DATA) POST_DATA.delete(t), post(t, { data: JSON.stringify(e) }).catch(s => { console.error("Failed to send POST request:", s), savePostData(t, e) }) }
  const doDeferredPost = throttle(sendPostData, 5e3);

  function deferredPost(t, e) { savePostData(t, e), doDeferredPost() }

  function __awaiter$1(t, e, s, i) { return new(s || (s = Promise))((function(n, r) {
      function o(t) { try { h(i.next(t)) } catch (t) { r(t) } }

      function a(t) { try { h(i.throw(t)) } catch (t) { r(t) } }

      function h(t) { t.done ? n(t.value) : new s((function(e) { e(t.value) })).then(o, a) } h((i = i.apply(t, e || [])).next()) })) } window.addEventListener("online", doDeferredPost), window.onbeforeunload = sendPostData;
  const PRECISION = 1e-6;

  function nearlyEquals(t, e, s = PRECISION) { return !isNaN(t) && !isNaN(e) && Math.abs(t - e) < s }

  function isInteger(t, e = PRECISION) { return nearlyEquals(t % 1, 0, e) }

  function isBetween(t, e, s, i = PRECISION) { return e > s && ([e, s] = [s, e]), t > e + i && t < s - i }
  const NUM_REGEX = /(\d+)(\d{3})/,
    POWER_SUFFIX = ["", "k", "m", "b", "t", "q"];

  function addThousandSeparators(t) { let [e, s] = t.split("."); for (; NUM_REGEX.test(e);) e = e.replace(NUM_REGEX, "$1,$2"); return e + (s ? "." + s : "") }

  function addPowerSuffix(t, e = 6) { if (!e) return "" + t; const s = ("" + Math.abs(Math.floor(t))).length,
      i = t < 0 ? 1 : 0; if (s <= e - i) return "" + round(t, e - s - i - 1); const n = Math.floor(Math.log10(Math.abs(t)) / 3); return round(t / Math.pow(10, 3 * n), e - (s % 3 || 3) - i - 1) + POWER_SUFFIX[n] }

  function numberFormat(t, e = 0, s = !0) { const i = addPowerSuffix(t, e).replace("-", "–"); return s ? addThousandSeparators(i) : i }
  const SPECIAL_DECIMAL = /^-?0,[0-9]+$/,
    POINT_DECIMAL = /^-?([0-9]+(,[0-9]{3})*)?\.?[0-9]*$/,
    COMMA_DECIMAL = /^-?[0-9]+(\.[0-9]{3})*,?[0-9]*$/;

  function parseNumber(t) { return !(t = t.replace(/^–/, "-").trim()) || t.match(/[^0-9.,-]/) ? NaN : SPECIAL_DECIMAL.test(t) ? parseFloat(t.replace(/,/, ".")) : POINT_DECIMAL.test(t) ? parseFloat(t.replace(/,/g, "")) : COMMA_DECIMAL.test(t) ? parseFloat(t.replace(/\./g, "").replace(/,/, ".")) : NaN }
  const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
    TENS = ["", "", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety"],
    MULTIPLIERS = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion"];

  function fmt(t) { let [e, s, i] = ("00" + t).substr(-3).split(""); return [0 == +e ? "" : ONES[+e] + " hundred ", 0 == +i ? TENS[+s] : TENS[+s] && TENS[+s] + "-" || "", ONES[+s + +i] || ONES[+i]].join("") }

  function cons(t, e, s) { return e ? [e, s && " " + s || "", " ", t].join("") : t }

  function toWord(t) { if (0 === t) return "zero"; let e = "",
      s = 0; for (; t;) e = cons(e, fmt(t % 1e3), MULTIPLIERS[s]), s += 1, t = t / 1e3 | 0; return e.trim() }

  function round(t, e = 0) { let s = Math.pow(10, e); return Math.round(t * s) / s }

  function roundTo(t, e = 1) { return Math.round(t / e) * e }

  function clamp(t, e = -1 / 0, s = 1 / 0) { return Math.min(s, Math.max(e, t)) }

  function lerp(t, e, s = .5) { return t + (e - t) * s }

  function square(t) { return t * t }

  function subsets(t, e = 0) { const s = subsetsHelper(t.slice(0)); return e ? s.filter(t => t.length === e) : s }

  function subsetsHelper(t) { if (1 === t.length) return [
      [], t
    ]; const e = t.pop(),
      s = subsetsHelper(t),
      i = []; for (const t of s) i.push(t, [...t, e]); return i } class Point { constructor(t = 0, e = 0) { this.x = t, this.y = e, this.type = "point" } get unitVector() { return nearlyEquals(this.length, 0) ? new Point(1, 0) : this.scale(1 / this.length) } get length() { return Math.sqrt(this.x ** 2 + this.y ** 2) } get inverse() { return new Point(-this.x, -this.y) } get flip() { return new Point(this.y, this.x) } get perpendicular() { return new Point(-this.y, this.x) } get array() { return [this.x, this.y] } distanceFromLine(t) { return Point.distance(this, t.project(this)) } clamp(t, e, s, i) { return new Point(clamp(this.x, t, e), clamp(this.y, s, i)) } transform(t) { const e = t[0][0] * this.x + t[0][1] * this.y + t[0][2],
        s = t[1][0] * this.x + t[1][1] * this.y + t[1][2]; return new Point(e, s) } rotate(t, e = ORIGIN) { const s = this.x - e.x,
        i = this.y - e.y,
        n = Math.cos(t),
        r = Math.sin(t),
        o = s * n - i * r + e.x,
        a = s * r + i * n + e.y; return new Point(o, a) } reflect(t) { let e = t.p2.x - t.p1.x,
        s = t.p2.y - t.p1.y,
        i = this.x - t.p1.x,
        n = (e * (this.y - t.p1.y) - s * i) / (e * e + s * s),
        r = this.x + 2 * n * s,
        o = this.y - 2 * n * e; return new Point(r, o) } scale(t, e = t) { return new Point(this.x * t, this.y * e) } shift(t, e = t) { return new Point(this.x + t, this.y + e) } translate(t) { return this.shift(t.x, t.y) } changeCoordinates(t, e) { const s = e.xMin + (this.x - t.xMin) / t.dx * e.dx,
        i = e.yMin + (this.y - t.yMin) / t.dy * e.dy; return new Point(s, i) } add(t) { return Point.sum(this, t) } subtract(t) { return Point.difference(this, t) } equals(t) { return nearlyEquals(this.x, t.x) && nearlyEquals(this.y, t.y) } round(t = 1) { return new Point(roundTo(this.x, t), roundTo(this.y, t)) } floor() { return new Point(Math.floor(this.x), Math.floor(this.y)) } mod(t, e = t) { return new Point(this.x % t, this.y % e) } angle(t = ORIGIN) { return rad(this, t) } static average(...t) { let e = total(t.map(t => t.x)) / t.length,
        s = total(t.map(t => t.y)) / t.length; return new Point(e, s) } static dot(t, e) { return t.x * e.x + t.y * e.y } static sum(t, e) { return new Point(t.x + e.x, t.y + e.y) } static difference(t, e) { return new Point(t.x - e.x, t.y - e.y) } static distance(t, e) { return Math.sqrt(square(t.x - e.x) + square(t.y - e.y)) } static manhattan(t, e) { return Math.abs(t.x - e.x) + Math.abs(t.y - e.y) } static interpolate(t, e, s = .5) { return new Point(lerp(t.x, e.x, s), lerp(t.y, e.y, s)) } static interpolateList(t, e = .5) { const s = t.length - 1,
        i = Math.floor(clamp(e, 0, 1) * s); return Point.interpolate(t[i], t[i + 1], s * e - i) } static fromPolar(t, e = 1) { return new Point(e * Math.cos(t), e * Math.sin(t)) } }
  const ORIGIN = new Point(0, 0);
  class Bounds { constructor(t, e, s, i) { this.xMin = t, this.xMax = e, this.yMin = s, this.yMax = i } get dx() { return this.xMax - this.xMin } get dy() { return this.yMax - this.yMin } }
  const TWO_PI = 2 * Math.PI;
  class Angle { constructor(t, e, s) { this.a = t, this.b = e, this.c = s, this.type = "angle" } transform(t) { return new Angle(this.a.transform(t), this.b.transform(t), this.c.transform(t)) } get rad() { let t = Math.atan2(this.a.y - this.b.y, this.a.x - this.b.x),
        e = Math.atan2(this.c.y - this.b.y, this.c.x - this.b.x) - t; return e < 0 && (e += TWO_PI), e } get deg() { return 180 * this.rad / Math.PI } get isRight() { return nearlyEquals(this.rad, Math.PI / 2, .01) } get bisector() { let t = Math.atan2(this.a.y - this.b.y, this.a.x - this.b.x),
        e = Math.atan2(this.c.y - this.b.y, this.c.x - this.b.x),
        s = (t + e) / 2;
      t > e && (s += Math.PI); let i = Math.cos(s) + this.b.x,
        n = Math.sin(s) + this.b.y; return new Line(this.b, new Point(i, n)) } get sup() { return this.rad < Math.PI ? this : new Angle(this.c, this.b, this.a) } get arc() { return new Arc(this.b, this.a, this.rad) } equals(t) { return !1 } }

  function rad(t, e = ORIGIN) { return (Math.atan2(t.y - e.y, t.x - e.x) + TWO_PI) % TWO_PI } class Line { constructor(t, e) { this.p1 = t, this.p2 = e, this.type = "line" } make(t, e) { return new Line(t, e) } get length() { return Point.distance(this.p1, this.p2) } get midpoint() { return Point.average(this.p1, this.p2) } get slope() { return (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x) } get intercept() { return this.p1.y + this.slope * this.p1.x } get angle() { return rad(this.p2, this.p1) } get unitVector() { return this.p2.subtract(this.p1).unitVector } get perpendicularVector() { return new Point(this.p2.y - this.p1.y, this.p1.x - this.p2.x).unitVector } parallel(t) { const e = Point.sum(t, Point.difference(this.p2, this.p1)); return new Line(t, e) } perpendicular(t) { return new Line(t, Point.sum(t, this.perpendicularVector)) } get perpendicularBisector() { return this.perpendicular(this.midpoint) } project(t) { const e = Point.difference(this.p2, this.p1),
        s = Point.difference(t, this.p1),
        i = e.scale(Point.dot(e, s) / this.length ** 2); return Point.sum(this.p1, i) } contains(t) { return nearlyEquals(t.x * (this.p1.y - this.p2.y) + this.p1.x * (this.p2.y - t.y) + this.p2.x * (t.y - this.p1.y), 0) } at(t) { return Point.interpolate(this.p1, this.p2, t) } transform(t) { return new this.constructor(this.p1.transform(t), this.p2.transform(t)) } rotate(t, e = ORIGIN) { return new this.constructor(this.p1.rotate(t, e), this.p2.rotate(t, e)) } reflect(t) { return new this.constructor(this.p1.reflect(t), this.p2.reflect(t)) } scale(t, e = t) { return this.make(this.p1.scale(t, e), this.p2.scale(t, e)) } shift(t, e = t) { return this.make(this.p1.shift(t, e), this.p2.shift(t, e)) } translate(t) { return this.shift(t.x, t.y) } equals(t) { return this.contains(t.p1) && this.contains(t.p2) } } class Ray extends Line { constructor() { super(...arguments), this.type = "ray" } make(t, e) { return new Ray(t, e) } equals(t) { return "ray" === t.type && (this.p1.equals(t.p1) && this.contains(t.p2)) } } class Segment extends Line { constructor() { super(...arguments), this.type = "segment" } contains(t) { return !!Line.prototype.contains.call(this, t) && (nearlyEquals(this.p1.x, this.p2.x) ? isBetween(t.y, this.p1.y, this.p2.y) : isBetween(t.x, this.p1.x, this.p2.x)) } make(t, e) { return new Segment(t, e) } project(t) { const e = Point.difference(this.p2, this.p1),
        s = Point.difference(t, this.p1),
        i = clamp(Point.dot(e, s) / square(this.length), 0, 1); return Point.sum(this.p1, e.scale(i)) } contract(t) { return new Segment(this.at(t), this.at(1 - t)) } equals(t, e = !1) { return "segment" === t.type && (this.p1.equals(t.p1) && this.p2.equals(t.p2) || !e && this.p1.equals(t.p2) && this.p2.equals(t.p1)) } static intersect(t, e) { return intersections(t, e)[0] || void 0 } } class Circle { constructor(t = ORIGIN, e = 1) { this.c = t, this.r = e, this.type = "circle" } get circumference() { return TWO_PI * this.r } get area() { return Math.PI * this.r ** 2 } get arc() { let t = this.c.shift(this.r, 0); return new Arc(this.c, t, TWO_PI) } transform(t) { return new Circle(this.c.transform(t), this.r * (t[0][0] + t[1][1]) / 2) } rotate(t, e = ORIGIN) { return new Circle(this.c.rotate(t, e), this.r) } reflect(t) { return new Circle(this.c.reflect(t), this.r) } scale(t, e = t) { return new Circle(this.c.scale(t, e), this.r * (t + e) / 2) } shift(t, e = t) { return new Circle(this.c.shift(t, e), this.r) } translate(t) { return this.shift(t.x, t.y) } contains(t) { return Point.distance(t, this.c) <= this.r } equals(t) { return nearlyEquals(this.r, t.r) && this.c.equals(t.c) } project(t) { const e = t.subtract(this.c).unitVector.scale(this.r); return Point.sum(this.c, e) } at(t) { const e = 2 * Math.PI * t; return this.c.shift(this.r * Math.cos(e), this.r * Math.sin(e)) } tangentAt(t) { const e = this.at(t),
        s = this.c.rotate(Math.PI / 2, e); return new Line(e, s) } } class Arc { constructor(t, e, s) { this.c = t, this.start = e, this.angle = s, this.type = "arc" } get radius() { return Point.distance(this.c, this.start) } get end() { return this.start.rotate(this.angle, this.c) } transform(t) { return new this.constructor(this.c.transform(t), this.start.transform(t), this.angle) } get startAngle() { return rad(this.start, this.c) } project(t) { let e = this.startAngle,
        s = e + this.angle,
        i = rad(t, this.c); return s > TWO_PI && i < s - TWO_PI && (i += TWO_PI), i = clamp(i, e, s), this.c.shift(this.radius, 0).rotate(i, this.c) } at(t) { return this.start.rotate(this.angle * t, this.c) } contract(t) { return new this.constructor(this.c, this.at(t / 2), this.angle * (1 - t)) } get minor() { return this.angle <= Math.PI ? this : new this.constructor(this.c, this.end, 2 * Math.PI - this.angle) } get major() { return this.angle >= Math.PI ? this : new this.constructor(this.c, this.end, 2 * Math.PI - this.angle) } get center() { return this.at(.5) } equals() { return !1 } } class Sector extends Arc { constructor() { super(...arguments), this.type = "sector" } } class Polygon { constructor(...t) { this.type = "polygon", this.points = t } get circumference() { let t = 0; for (let e = 1; e < this.points.length; ++e) t += Point.distance(this.points[e - 1], this.points[e]); return t } get signedArea() { let t = this.points,
        e = t.length,
        s = t[e - 1].x * t[0].y - t[0].x * t[e - 1].y; for (let i = 1; i < e; ++i) s += t[i - 1].x * t[i].y - t[i].x * t[i - 1].y; return s / 2 } get area() { return Math.abs(this.signedArea) } get centroid() { let t = this.points,
        e = t.length,
        s = 0; for (let i = 0; i < e; ++i) s += t[i].x; let i = 0; for (let s = 0; s < e; ++s) i += t[s].y; return new Point(s / e, i / e) } get edges() { let t = this.points,
        e = t.length,
        s = []; for (let i = 0; i < e; ++i) s.push(new Segment(t[i], t[(i + 1) % e])); return s } get radius() { const t = this.centroid,
        e = this.points.map(e => Point.distance(e, t)); return Math.max(...e) } transform(t) { return new this.constructor(...this.points.map(e => e.transform(t))) } rotate(t, e = ORIGIN) { const s = this.points.map(s => s.rotate(t, e)); return new this.constructor(...s) } reflect(t) { const e = this.points.map(e => e.reflect(t)); return new this.constructor(...e) } scale(t, e = t) { const s = this.points.map(s => s.scale(t, e)); return new this.constructor(...s) } shift(t, e = t) { const s = this.points.map(s => s.shift(t, e)); return new this.constructor(...s) } translate(t) { return this.shift(t.x, t.y) } contains(t) { let e = this.points.length,
        s = !1; for (let i = 0; i < e; ++i) { const n = this.points[i],
          r = this.points[(i + 1) % e],
          o = n.y > t.y != r.y > t.y,
          a = t.x < (r.x - n.x) * (t.y - n.y) / (r.y - n.y) + n.x;
        o && a && (s = !s) } return s } equals(t) { return !1 } project(t) { return ORIGIN } at(t) { return Point.interpolateList([...this.points, this.points[0]], t) } get oriented() { if (this.signedArea >= 0) return this; const t = [...this.points].reverse(); return new this.constructor(...t) } intersect(t) { const e = [toLinkedList(this.oriented.points), toLinkedList(t.oriented.points)],
        s = this.points.length + t.points.length,
        i = []; let n = 0,
        r = e[n].find(e => t.contains(e.val)); if (r) { for (; r.val !== i[0] && i.length < s;) { i.push(r.val); const t = new Segment(r.val, r.next.val);
          r = r.next; for (let s of e[1 - n]) { const e = intersections(t, new Segment(s.val, s.next.val))[0]; if (e) { n = 1 - n, r = { val: e, next: s.next }; break } } } return new Polygon(...i) } } static collision(t, e) { for (let s of t.edges)
        for (let t of e.edges)
          if (Segment.intersect(s, t)) return !0; for (let s of t.points)
        if (e.contains(s)) return !0; for (let s of e.points)
        if (t.contains(s)) return !0; return !1 } static regular(t, e = 1) { const s = 2 * Math.PI / t,
        i = Math.PI / 2 - s / 2,
        n = tabulate(t => Point.fromPolar(i + s * t, e), t); return new Polygon(...n) } static interpolate(t, e, s = .5) { const i = t.points.map((t, i) => Point.interpolate(t, e.points[i], s)); return new Polygon(...i) } } class Polyline extends Polygon { constructor() { super(...arguments), this.type = "polyline" } get edges() { let t = []; for (let e = 0; e < this.points.length - 1; ++e) t.push(new Segment(this.points[e], this.points[e + 1])); return t } } class Triangle extends Polygon { constructor() { super(...arguments), this.type = "triangle" } get circumcircle() { const [t, e, s] = this.points, i = 2 * (t.x * (e.y - s.y) + e.x * (s.y - t.y) + s.x * (t.y - e.y)), n = (t.x ** 2 + t.y ** 2) * (e.y - s.y) + (e.x ** 2 + e.y ** 2) * (s.y - t.y) + (s.x ** 2 + s.y ** 2) * (t.y - e.y), r = (t.x ** 2 + t.y ** 2) * (s.x - e.x) + (e.x ** 2 + e.y ** 2) * (t.x - s.x) + (s.x ** 2 + s.y ** 2) * (e.x - t.x), o = new Point(n / i, r / i), a = Point.distance(o, this.points[0]); return new Circle(o, a) } get incircle() { const t = this.edges,
        e = t.map(t => t.length),
        s = e[0] + e[1] + e[2],
        [i, n, r] = this.points,
        o = e[1] * i.x + e[2] * n.x + e[0] * r.x,
        a = e[1] * i.y + e[2] * n.y + e[0] * r.y,
        h = new Point(o / s, a / s),
        l = h.distanceFromLine(t[0]); return new Circle(h, l) } get orthocenter() { const [t, e, s] = this.points; return intersections(new Line(t, e).perpendicular(s), new Line(t, s).perpendicular(e))[0] } } class Rectangle { constructor(t, e = 1, s = e) { this.p = t, this.w = e, this.h = s, this.type = "rectangle" } static aroundPoints(...t) { const e = t.map(t => t.x),
        s = t.map(t => t.y),
        i = Math.min(...e),
        n = Math.max(...e) - i,
        r = Math.min(...s),
        o = Math.max(...s) - r; return new Rectangle(new Point(i, r), n, o) } get center() { return new Point(this.p.x + this.w / 2, this.p.y + this.h / 2) } get circumference() { return 2 * Math.abs(this.w) + 2 * Math.abs(this.h) } get area() { return Math.abs(this.w * this.h) } get edges() { return this.polygon.edges } get points() { return this.polygon.points } get polygon() { let t = new Point(this.p.x + this.w, this.p.y),
        e = new Point(this.p.x + this.w, this.p.y + this.h),
        s = new Point(this.p.x, this.p.y + this.h); return new Polygon(this.p, t, e, s) } transform(t) { return this.polygon.transform(t) } rotate(t, e = ORIGIN) { return this.polygon.rotate(t, e) } reflect(t) { return this.polygon.reflect(t) } scale(t, e = t) { return new Rectangle(this.p.scale(t, e), this.w * t, this.h * e) } shift(t, e = t) { return new Rectangle(this.p.shift(t, e), this.w, this.h) } translate(t) { return this.shift(t.x, t.y) } contains(t) { return isBetween(t.x, this.p.x, this.p.x + this.w) && isBetween(t.y, this.p.y, this.p.y + this.h) } equals(t) { return !1 } project(t) { let e = { x: this.p.x + this.w, y: this.p.y + this.h },
        s = this.p.x + this.w / 2,
        i = this.p.y + this.h / 2,
        n = (i - t.y) / (s - t.x); if (t.x <= s) { let s = n * (this.p.x - t.x) + t.y; if (this.p.y < s && s < e.y) return new Point(this.p.x, s) } if (t.x >= s) { let s = n * (e.x - t.x) + t.y; if (this.p.y < s && s < e.y) return new Point(e.x, s) } if (t.y <= i) { let s = (this.p.y - t.y) / n + t.x; if (this.p.x < s && s < e.x) return new Point(s, this.p.y) } if (t.y >= i) { let s = (e.y - t.y) / n + t.x; if (this.p.x < s && s < e.x) return new Point(s, e.y) } } at(t) {} }

  function liesOnSegment(t, e) { return nearlyEquals(t.p1.x, t.p2.x) ? isBetween(e.y, t.p1.y, t.p2.y) : isBetween(e.x, t.p1.x, t.p2.x) }

  function liesOnRay(t, e) { return nearlyEquals(t.p1.x, t.p2.x) ? (e.y - t.p1.y) / (t.p2.y - t.p1.y) > 0 : (e.x - t.p1.x) / (t.p2.x - t.p1.x) > 0 }

  function lineLineIntersection(t, e) { const s = t.p1.x - t.p2.x,
      i = t.p1.y - t.p2.y,
      n = e.p1.x - e.p2.x,
      r = e.p1.y - e.p2.y,
      o = s * r - i * n; if (nearlyEquals(o, 0)) return []; const a = t.p1.x * t.p2.y - t.p1.y * t.p2.x,
      h = e.p1.x * e.p2.y - e.p1.y * e.p2.x; return [new Point((a * n - s * h) / o, (a * r - i * h) / o)] }

  function circleCircleIntersection(t, e) { const s = Point.distance(t.c, e.c); if (s > t.r + e.r) return []; if (s < Math.abs(t.r - e.r)) return []; if (nearlyEquals(s, 0) && nearlyEquals(t.r, e.r)) return []; if (nearlyEquals(s, t.r + e.r)) return [new Line(t.c, e.c).midpoint]; const i = (square(t.r) - square(e.r) + square(s)) / (2 * s),
      n = Math.sqrt(square(t.r) - square(i)),
      r = (e.c.x - t.c.x) * i / s + (e.c.y - t.c.y) * n / s + t.c.x,
      o = (e.c.y - t.c.y) * i / s - (e.c.x - t.c.x) * n / s + t.c.y,
      a = (e.c.x - t.c.x) * i / s - (e.c.y - t.c.y) * n / s + t.c.x,
      h = (e.c.y - t.c.y) * i / s + (e.c.x - t.c.x) * n / s + t.c.y; return [new Point(r, o), new Point(a, h)] }

  function lineCircleIntersection(t, e) { const s = t.p2.x - t.p1.x,
      i = t.p2.y - t.p1.y,
      n = square(s) + square(i),
      r = e.c.x,
      o = e.c.y,
      a = (t.p1.x - r) * (t.p2.y - o) - (t.p2.x - r) * (t.p1.y - o),
      h = square(e.r) * n - square(a); if (h < 0) return []; const l = a * i / n,
      c = -a * s / n; if (nearlyEquals(h, 0)) return [e.c.shift(l, c)]; const d = s * (i < 0 ? -1 : 1) * Math.sqrt(h) / n,
      u = Math.abs(i) * Math.sqrt(h) / n; return [e.c.shift(l + d, c + u), e.c.shift(l - d, c - u)] }

  function isPolygonLike(t) { return isOneOf(t.type, "polygon", "polyline", "rectangle") }

  function isLineLike(t) { return isOneOf(t.type, "line", "ray", "segment") }

  function isCircle(t) { return "circle" === t.type }

  function intersections(...t) { if (t.length < 2) return []; if (t.length > 2) return flatten(subsets(t, 2).map(t => intersections(...t))); let [e, s] = t; if (isPolygonLike(s) && ([e, s] = [s, e]), isPolygonLike(e)) { return [...isLineLike(s) ? e.points.filter(t => s.contains(t)) : [], ...intersections(s, ...e.edges)] } return simpleIntersection(e, s) }

  function simpleIntersection(t, e) { let s = [];
    isLineLike(t) && isLineLike(e) ? s = lineLineIntersection(t, e) : isLineLike(t) && isCircle(e) ? s = lineCircleIntersection(t, e) : isCircle(t) && isLineLike(e) ? s = lineCircleIntersection(e, t) : isCircle(t) && isCircle(e) && (s = circleCircleIntersection(t, e)); for (const i of [t, e]) "segment" === i.type && (s = s.filter(t => liesOnSegment(i, t))), "ray" === i.type && (s = s.filter(t => liesOnRay(i, t))); return s }
  var Matrix, Random, Regression;
  ! function(t) {
    function e(t, e, s) { return repeat2D(t, e, s) }

    function s(t = 2) { const s = e(0, t, t); for (let e = 0; e < t; ++e) s[e][e] = 1; return s } t.fill = e, t.identity = s, t.rotation = function(t) { const e = Math.sin(t),
        s = Math.cos(t); return [
        [s, -e],
        [e, s]
      ] }, t.shear = function(t) { return [
        [1, t],
        [0, 1]
      ] }, t.reflection = function(t) { const e = Math.sin(2 * t),
        s = Math.cos(2 * t); return [
        [s, e],
        [e, -s]
      ] }, t.sum = function t(...e) { const [s, ...i] = e, n = i.length > 1 ? t(...i) : i[0]; if (s.length !== n.length || s[0].length !== n[0].length) throw new Error("Matrix sizes don’t match"); const r = []; for (let t = 0; t < s.length; ++t) { const e = []; for (let i = 0; i < s[t].length; ++i) e.push(s[t][i] + n[t][i]);
        r.push(e) } return r }, t.scalarProduct = function(t, e) { return t.map(t => t.map((t, s) => t * e)) }, t.product = function t(...e) { let [s, ...i] = e, n = i.length > 1 ? t(...i) : i[0]; if (s[0].length !== n.length) throw new Error("Matrix sizes don’t match."); let r = []; for (let t = 0; t < s.length; ++t) { let e = []; for (let i = 0; i < n[0].length; ++i) { let r = 0; for (let e = 0; e < n.length; ++e) r += s[t][e] * n[e][i];
          e.push(r) } r.push(e) } return r }, t.transpose = function(t) { let e = []; for (let s = 0; s < t[0].length; ++s) { let i = []; for (let e = 0; e < t.length; ++e) i.push(t[e][s]);
        e.push(i) } return e }, t.determinant = function(t) { if (t.length !== t[0].length) throw new Error("Not a square matrix."); let e = t.length; if (1 === e) return t[0][0]; if (2 === e) return t[0][0] * t[1][1] - t[0][1] * t[1][0]; let s = 0; for (let i = 0; i < e; ++i) { let n = t[0][i],
          r = t[0][i]; for (let s = 1; s < e; ++s) r *= t[s][i + s % e], n *= t[s][i - s % e];
        s += r - n } return s }, t.inverse = function(t) { let e = t.length; if (e !== t[0].length) throw new Error("Not a square matrix."); let i = s(e),
        n = tabulate2D((e, s) => t[e][s], e, e); for (let t = 0; t < e; ++t) { let s = n[t][t]; if (!s) { for (let s = t + 1; s < e; ++s)
            if (0 !== n[s][t]) { for (let r = 0; r < e; ++r)[n[s][r], n[t][r]] = [n[t][r], n[s][r]], [i[s][r], i[t][r]] = [i[t][r], i[s][r]]; break } if (!(s = n[t][t])) throw new Error("Matrix not invertible.") } for (let r = 0; r < e; ++r) n[t][r] = n[t][r] / s, i[t][r] = i[t][r] / s; for (let s = 0; s < e; ++s) { if (s === t) continue; let r = n[s][t]; for (let o = 0; o < e; ++o) n[s][o] -= r * n[t][o], i[s][o] -= r * i[t][o] } } return i } }(Matrix || (Matrix = {})),
  function(t) {
    function e(t) { const e = Math.random() * total(t); let s = 0; return t.findIndex(t => (s += t) >= e) } t.shuffle = function(t) { for (let e = (t = t.slice(0)).length - 1; e > 0; --e) { let s = Math.floor(Math.random() * (e + 1));
        [t[e], t[s]] = [t[s], t[e]] } return t }, t.integer = function(t, e) { let s = void 0 === e ? t : e - t + 1; return (void 0 === e ? 0 : t) + Math.floor(s * Math.random()) }, t.weighted = e; const s = new Map;

    function i(t = .5) { return Math.random() < t ? 1 : 0 } t.smart = function(t, i) { i || (i = uid()), s.has(i) || s.set(i, repeat(1, t)); const n = s.get(i),
        r = e(n.map(t => t * t)); return n[r] -= 1, n[r] <= 0 && s.set(i, n.map(t => t + 1)), r }, t.bernoulli = i, t.binomial = function(t = 1, e = .5) { let s = 0; for (let n = 0; n < t; ++n) s += i(e); return s }, t.poisson = function(t = 1) { if (t <= 0) return 0; const e = Math.exp(-t); let s = 1,
        i = 0; for (; s > e; ++i) s *= Math.random(); return i - 1 }, t.uniform = function(t = 0, e = 1) { return t + (e - t) * Math.random() }, t.normal = function(t = 0, e = 1) { const s = Math.random(),
        i = Math.random(); return Math.sqrt(-2 * Math.log(s)) * Math.cos(2 * Math.PI * i) * Math.sqrt(e) + t }, t.exponential = function(t = 1) { return t <= 0 ? 0 : -Math.log(Math.random()) / t }, t.geometric = function(t = .5) { if (!(t <= 0 || t > 1)) return Math.floor(Math.log(Math.random()) / Math.log(1 - t)) }, t.cauchy = function() { let t, e, s;
      do { t = (e = 2 * Math.random() - 1) * e + (s = 2 * Math.random() - 1) * s } while (t >= 1); return e / s }, t.normalPDF = function(t, e = 1, s = 0) { return Math.exp(-((t - e) ** 2) / (2 * s)) / Math.sqrt(2 * Math.PI * s) }; const n = 7,
      r = [.9999999999998099, 676.5203681218851, -1259.1392167224028, 771.3234287776531, -176.6150291621406, 12.507343278686905, -.13857109526572012, 9984369578019572e-21, 1.5056327351493116e-7];

    function o(t, e, s, i = 1) { let n = 0; for (let r = e; r < s; r += i) n += t(r) * i || 0; return n } t.integrate = o, t.chiCDF = function(t, e) { return 1 - o(t => Math.pow(t, (e - 2) / 2) * Math.exp(-t / 2), 0, t) / Math.pow(2, e / 2) / function t(e) { if (e < .5) return Math.PI / (Math.sin(Math.PI * e) * t(1 - e));
        e -= 1; let s = r[0]; for (let t = 1; t < n + 2; t++) s += r[t] / (e + t); let i = e + n + .5; return Math.sqrt(2 * Math.PI) * Math.pow(i, e + .5) * Math.exp(-i) * s }(e / 2) } }(Random || (Random = {})),
  function(t) {
    function e(t, e = !1) { let s = 0,
        i = 0,
        n = 0,
        r = 0; const o = t.length; for (let e = 0; e < o; e++) s += t[e][0], i += t[e][1], n += t[e][0] * t[e][0], r += t[e][0] * t[e][1]; if (e) { return [0, r / n] } const a = (o * r - s * i) / (o * n - s * s); return [i / o - a * s / o, a] }

    function s(t) { const e = [0, 0, 0, 0, 0, 0]; for (const s of t) e[0] += s[0], e[1] += s[1], e[2] += s[0] * s[0] * s[1], e[3] += s[1] * Math.log(s[1]), e[4] += s[0] * s[1] * Math.log(s[1]), e[5] += s[0] * s[1]; const s = e[1] * e[2] - e[5] * e[5]; return [Math.exp((e[2] * e[3] - e[5] * e[4]) / s), (e[1] * e[4] - e[5] * e[3]) / s] }

    function i(t, e = 2) { let s = t.map(t => list(e + 1).map(e => Math.pow(t[0], e))),
        i = Matrix.transpose(s),
        n = t.map(t => [t[1]]),
        r = Matrix.product(i, s),
        o = Matrix.inverse(r); return Matrix.product(o, i, n).map(t => t[0]) }

    function n(t, e) { let s = t.reduce((t, e) => t + e[1], 0) / t.length,
        i = t.reduce((t, e) => t + (e[1] - s) ** 2, 0); return 1 - t.reduce((t, s) => t + (s[1] - e(s[0])) ** 2, 0) / i } t.linear = e, t.exponential = s, t.logarithmic = function(t) { const e = [0, 0, 0, 0],
        s = t.length; for (const s of t) e[0] += Math.log(s[0]), e[1] += s[1] * Math.log(s[0]), e[2] += s[1], e[3] += Math.pow(Math.log(s[0]), 2); const i = (s * e[1] - e[2] * e[0]) / (s * e[3] - e[0] * e[0]); return [(e[2] - i * e[0]) / s, i] }, t.power = function(t) { const e = [0, 0, 0, 0],
        s = t.length; for (const s of t) e[0] += Math.log(s[0]), e[1] += Math.log(s[1]) * Math.log(s[0]), e[2] += Math.log(s[1]), e[3] += Math.pow(Math.log(s[0]), 2); const i = (s * e[1] - e[2] * e[0]) / (s * e[3] - e[0] * e[0]); return [Math.exp((e[2] - i * e[0]) / s), i] }, t.polynomial = i, t.coefficient = n; const r = [{ name: "linear", regression: e, fn: (t, e) => t[0] + e * t[1] }, { name: "quadratic", regression: i, fn: (t, e) => t[0] + e * t[1] + e * e * t[2] }, { name: "cubic", regression: t => i(t, 3), fn: (t, e) => t[0] + e * t[1] + e * e * t[2] + e * e * e * t[3] }, { name: "exponential", regression: s, fn: (t, e) => t[0] * Math.pow(Math.E, t[1] * e) }];
    t.find = function(t, e = .9) { if (t.length > 1)
        for (const s of r) { const i = s.regression(t),
            r = s.fn.bind(void 0, i),
            o = n(t, r); if (o > e) return { type: s.name, fn: r, params: i, coeff: o } }
      return { type: void 0, fn: () => {}, params: [], coeff: void 0 } } }(Regression || (Regression = {}));
  const touchSupport = "ontouchstart" in window,
    pointerSupport = "onpointerdown" in window;

  function pointerPosition(t) { if (t.touches) { const e = t.targetTouches.length ? t.targetTouches : t.changedTouches; return new Point(e[0].clientX, e[0].clientY) } return new Point(t.clientX, t.clientY) }

  function getTouches(t) { return t.touches || [] }

  function svgPointerPosn(t, e) { return pointerPosition(t).transform(e.inverseTransformMatrix) }

  function canvasPointerPosition(t, e) { const s = pointerPosition(t),
      i = e.bounds,
      n = (s.x - i.left) * e.canvasWidth / i.width,
      r = (s.y - i.top) * e.canvasHeight / i.height; return new Point(n, r) }

  function getEventTarget(t) { if (t instanceof PointerEvent && "mouse" === t.pointerType) return $(t.target); const e = pointerPosition(t); return $(document.elementFromPoint(e.x, e.y) || void 0) }

  function makeTapEvent(t) { if (t._data.tapEvent) return;
    t._data.tapEvent = !0; let e = void 0;
    t.on("pointerdown", t => e = pointerPosition(t)), t.on("pointerup", s => { if (!e) return; const i = pointerPosition(s);
      Point.distance(e, i) < 6 && t.trigger("tap", s), e = void 0 }), t.on("pointercancel", () => e = void 0) }

  function makeClickOutsideEvent(t) { t._data.clickOutsideEvent || (t._data.clickOutsideEvent = !0, $body.on("pointerdown", e => { const s = $(e.target);
      s && (s.equals(t) || s.hasParent(t)) || t.trigger("clickOutside", e) })) }

  function slide(t, e) { let s = !1,
      i = pointerPosition; "svg" === t.type ? i = e => svgPointerPosn(e, t.$ownerSVG) : "canvas" === t.type && (i = e => canvasPointerPosition(e, t)); const n = e.justInside ? t : $body; let r = void 0,
      o = void 0;

    function a(t) { t.preventDefault(), s || (s = !0, window.requestAnimationFrame((function() { if (!s) return; const n = i(t);
        e.move && e.move(n, r, o), o = n, s = !1 }))) }

    function h(t) { t.preventDefault(), getTouches(t).length > 0 || (s = !1, e.move && n.off("pointermove", a), n.off("pointerstop", h), e.end && e.end(o, r)) } "auto" === t.css("touch-action") && t.css("touch-action", "none"), t.on("pointerdown", (function(t) { t.preventDefault(), t.handled || getTouches(t).length > 1 || (t.handled = !0, "move" in e && n.on("pointermove", a), n.on("pointerstop", h), r = o = i(t), e.start && e.start(r)) })), e.justInside && t.on("mouseleave", h) }

  function makeScrollEvents(t) { if (t._data.scrollEvents) return;
    t._data.scrollEvents = !0; let e = !1,
      s = void 0;

    function i() { const n = t.scrollTop;
      n !== s ? (s = n, t.trigger("scroll", { top: s }), window.requestAnimationFrame(i)) : e = !1 }

    function n() { e || window.requestAnimationFrame(i), e = !0 }

    function r() { window.removeEventListener("touchmove", n), window.removeEventListener("touchend", r) }("window" === t.type ? window : t._el).addEventListener("scroll", n), t._el.addEventListener("touchstart", (function(t) { t.handled || (window.addEventListener("touchmove", n), window.addEventListener("touchend", r)) })) }

  function hover(t, e) { let s = 0,
      i = !1,
      n = !1;
    t.on("mouseover", () => { e.preventMouseover && e.preventMouseover() || (clearTimeout(s), s = delay(() => { i || (e.enter && e.enter(), n = !0, i = !0) }, e.delay)) }), t.on("mouseout", () => { n && (clearTimeout(s), s = delay(() => { i && (e.exit && e.exit(), i = !1) }, e.exitDelay || e.delay)) }), (e.$clickTarget || t).on("click", () => { i && !n ? (e.exit && e.exit(), i = !1) : i || (e.enter && e.enter(), n = !1, i = !0) }), t.on("clickOutside", () => { i && (e.exit && e.exit(), i = !1) }) }
  let observer;

  function intersectionCallback(t) { for (const e of t) { const t = e.isIntersecting ? "enterViewport" : "exitViewport";
      setTimeout(() => $(e.target).trigger(t)) } }

  function makeIntersectionEvents(t) { if (!t._data.intersectionEvents)
      if (t._data.intersectionEvents = !0, window.IntersectionObserver) observer || (observer = new IntersectionObserver(intersectionCallback)), observer.observe(t._el);
      else { let e = !1;
        $body.on("scroll", () => { const s = t.isInViewport;
          e && !s ? (t.trigger("exitViewport"), e = !1) : s && !e && (t.trigger("enterViewport"), e = !0) }) } }

  function makeResizeEvents(t, e = !1) { if (e && (t._data.resizeObserver && t._data.resizeObserver.disconnect(), t._data.resizeObserver = void 0), !t._data.resizeObserver)
      if (window.ResizeObserver) { const e = new window.ResizeObserver(() => t.trigger("resize"));
        e.observe(t._el), t._data.resizeObserver = e } else if (window.MutationObserver) { const e = new MutationObserver(() => t.trigger("resize"));
      e.observe(t._el, { attributes: !0, childList: !0, characterData: !0, subtree: !0 }), t._data.resizeObserver = e } }

  function makePointerPositionEvents(t) { if (t._data.pointerPositionEvents) return;
    t._data.pointerPositionEvents = !0; const e = t.parent; let s = void 0;
    e.on("pointerend", () => s = void 0), e.on("pointermove", e => { const i = s,
        n = getEventTarget(e);
      s = n.equals(t) || n.hasParent(t), null != i && s && !i && t.trigger("pointerenter", e), !s && i && t.trigger("pointerleave", e) }) }

  function makeMouseEvent(t, e) { e._data["_" + t] || (e._data["_" + t] = !0, pointerSupport ? e.on(t.replace("mouse", "pointer"), s => { "mouse" === s.pointerType && e.trigger(t, s) }) : touchSupport || e._el.addEventListener(t, s => e.trigger(t, s))) }

  function makeKeyEvent(t) { t.on("keydown", e => { if (e.metaKey || e.ctrlKey) return; if (Browser.isAndroid && 229 === e.keyCode) return; const s = (e.key || String.fromCharCode(e.which)).toLowerCase();
      t.trigger("key", { code: e.keyCode, key: s }) }), Browser.isAndroid && "input" === t.type && t.on("input", e => { const s = e.data[e.data.length - 1].toLowerCase();
      t.trigger("key", { code: void 0, key: s }), t.value = "" }) }
  const aliases = { change: "propertychange keyup input paste", scrollwheel: "DOMMouseScroll mousewheel", pointerdown: pointerSupport ? "pointerdown" : touchSupport ? "touchstart" : "mousedown", pointermove: pointerSupport ? "pointermove" : touchSupport ? "touchmove" : "mousemove", pointerup: pointerSupport ? "pointerup" : touchSupport ? "touchend" : "mouseup", pointercancel: pointerSupport ? "pointercancel" : "touchcancel", pointerstop: pointerSupport ? "pointerup pointercancel" : touchSupport ? "touchend touchcancel" : "mouseup" },
    customEvents = { scroll: makeScrollEvents, tap: makeTapEvent, clickOutside: makeClickOutsideEvent, key: makeKeyEvent, mousedown: makeMouseEvent.bind(void 0, "mousedown"), mousemove: makeMouseEvent.bind(void 0, "mousemove"), mouseup: makeMouseEvent.bind(void 0, "mouseup"), pointerenter: makePointerPositionEvents, pointerleave: makePointerPositionEvents, enterViewport: makeIntersectionEvents, exitViewport: makeIntersectionEvents, resize: makeResizeEvents };

  function bindEvent(t, e, s, i) { if (e in customEvents) customEvents[e](t, !1);
    else if (e in aliases) { const n = words(aliases[e]); for (const e of n) t._el.addEventListener(e, s, i) } else t._el.addEventListener(e, s, i) }

  function unbindEvent(t, e, s) { if (e in customEvents) t._events[e] && t._events[e].length || customEvents[e](t, !0);
    else if (s && e in aliases) { const i = words(aliases[e]); for (const e of i) t._el.removeEventListener(e, s) } else s && t._el.removeEventListener(e, s) }

  function drawArc(t, e, s) { const i = e.x * (s.y - t.y) + t.x * (e.y - s.y) + s.x * (t.y - e.y) > 0 ? 1 : 0,
      n = Point.distance(e, t); return [t.x, t.y + "A" + n, n, 0, i, 1, s.x, s.y].join(",") }

  function angleSize(t, e = {}) { return t.isRight && !e.round ? 20 : 24 + 20 * (1 - clamp(t.rad, 0, Math.PI) / Math.PI) }

  function drawAngle(t, e = {}) { let s = t.a; const i = t.b; let n = t.c; const r = e.size || angleSize(t, e),
      o = Point.difference(s, i).unitVector,
      a = Point.difference(n, i).unitVector;
    s = Point.sum(i, o.scale(r)), n = Point.sum(i, a.scale(r)); let h = e.fill ? `M${i.x},${i.y}L` : "M"; if (t.isRight && !e.round) { const t = Point.sum(s, a.scale(r));
      h += `${s.x},${s.y}L${t.x},${t.y}L${n.x},${n.y}` } else h += drawArc(s, i, n); return e.fill && (h += "Z"), h }

  function drawPath(...t) { return "M" + t.map(t => t.x + "," + t.y).join("L") }

  function drawLineMark(t, e) { const s = t.perpendicularVector.scale(6),
      i = t.unitVector.scale(3),
      n = t.midpoint; switch (e) {
      case "bar":
        return drawPath(n.add(s), n.add(s.inverse));
      case "bar2":
        return drawPath(n.add(i).add(s), n.add(i).add(s.inverse)) + drawPath(n.add(i.inverse).add(s), n.add(i.inverse).add(s.inverse));
      case "arrow":
        return drawPath(n.add(i.inverse).add(s), n.add(i), n.add(i.inverse).add(s.inverse));
      case "arrow2":
        return drawPath(n.add(i.scale(-2)).add(s), n, n.add(i.scale(-2)).add(s.inverse)) + drawPath(n.add(s), n.add(i.scale(2)), n.add(s.inverse));
      default:
        return "" } }

  function arrowPath(t, e) { if (!t || !e) return ""; const s = e.perpendicular,
      i = t.add(e.scale(9)).add(s.scale(9)),
      n = t.add(e.scale(9)).add(s.scale(-9)); return drawPath(i, t, n) }

  function drawLineArrows(t, e) { let s = ""; return isOneOf(e, "start", "both") && (s += arrowPath(t.p1, t.unitVector)), isOneOf(e, "end", "both") && (s += arrowPath(t.p2, t.unitVector.inverse)), s }

  function drawArcArrows(t, e) { let s = ""; if (isOneOf(e, "start", "both")) { const e = new Line(t.c, t.start).perpendicularVector.inverse;
      s += arrowPath(t.start, e) } if (isOneOf(e, "end", "both")) { const e = new Line(t.c, t.end).perpendicularVector;
      s += arrowPath(t.end, e) } return s }

  function drawSVG(t, e = {}) { if ("angle" === t.type) return drawAngle(t = t, e); if ("segment" === t.type) { if ((t = t).p1.equals(t.p2)) return ""; let s = drawPath(t.p1, t.p2); return e.mark && (s += drawLineMark(t, e.mark)), e.arrows && (s += drawLineArrows(t, e.arrows)), s } if ("ray" === t.type) { if (t = t, !e.box) return ""; const s = intersections(t, e.box)[0]; return s ? drawPath(t.p1, s) : "" } if ("line" === t.type) { if (t = t, !e.box) return ""; const s = intersections(t, e.box); if (s.length < 2) return ""; let i = drawPath(s[0], s[1]); return e.mark && (i += drawLineMark(t, e.mark)), i } if ("circle" === t.type) return `M ${(t=t).c.x-t.r} ${t.c.y} a ${t.r},${t.r} 0 1 0 ` + `${2*t.r} 0 a ${t.r} ${t.r} 0 1 0 ${-2*t.r} 0`; if ("arc" === t.type) { let s = "M" + drawArc((t = t).start, t.c, t.end); return e.arrows && (s += drawArcArrows(t, e.arrows)), s } return "sector" === t.type ? `M ${(t=t).c.x} ${t.c.y} L ${drawArc(t.start,t.c,t.end)} Z` : "polyline" === t.type ? drawPath(...(t = t).points) : "polygon" === t.type || "triangle" === t.type ? drawPath(...(t = t).points) + "Z" : "rectangle" === t.type ? drawPath(...(t = t).polygon.points) + "Z" : "" }

  function drawCanvas(t, e, s = {}) { if (s.fill && (t.fillStyle = s.fill), s.opacity && (t.globalAlpha = s.opacity), s.stroke && (t.strokeStyle = s.stroke, t.lineWidth = s.strokeWidth || 1, s.lineCap && (t.lineCap = s.lineCap), s.lineJoin && (t.lineJoin = s.lineJoin)), t.beginPath(), "segment" === e.type) e = e, t.moveTo(e.p1.x, e.p1.y), t.lineTo(e.p2.x, e.p2.y);
    else if ("circle" === e.type) e = e, t.arc(e.c.x, e.c.y, e.r, 0, 2 * Math.PI);
    else if ("polygon" === e.type || "triangle" === e.type) { e = e, t.moveTo(e.points[0].x, e.points[0].y); for (const s of e.points.slice(1)) t.lineTo(s.x, s.y);
      t.closePath() } else if ("polyline" === e.type) { e = e, t.moveTo(e.points[0].x, e.points[0].y); for (const s of e.points.slice(1)) t.lineTo(s.x, s.y) } s.fill && t.fill(), s.stroke && t.stroke() }
  const ALPHABETH = "zyxwvutsrqponmlkjihgfedcba";

  function observable(t = {}) { const e = [],
      s = {}; let i = 1,
      n = ALPHABETH.split("").map(t => "_" + t);

    function r(e, i) { s[e] = i, e in t || Object.defineProperty(t, e, { get: () => s[e], set(i) { s[e] = i, t.update() } }) } for (const e of Object.keys(t)) r(e, t[e]); return t.update = () => { for (const t of e) t(s) }, t.watch = (t, i) => { e.push(t), i || t(s) }, t.set = (e, i) => { s[e] !== i && (r(e, i), t.update()) }, t.assign = e => { for (const t of Object.keys(e)) r(t, e[t]);
      t.update() }, t.name = () => (n.length || (i += 1, n = ALPHABETH.split("").map(t => repeat("_", i) + t)), n.pop()), t }

  function parse(t, e = !0) { let s = t.replace(/×/g, "*");
    e && (s = '"' + (s = s.replace(/"/g, '"').replace(/\${([^}]+)}/g, (t, e) => `" + (${e}) + "`)) + '"'); try { return new Function("_vars", `try {\n      with(_vars) { return ${s} }\n    } catch(_error) {\n      if (!(_error instanceof ReferenceError)) console.warn(_error);\n      return "";\n    }`) } catch (e) { return console.warn("WHILE PARSING: ", t, "\n", e), () => void 0 } }

  function makeTemplate(t, e, s, i = s) { if (s[e].indexOf("${") < 0) return; const n = parse(s[e]);
    t.watch(() => i[e] = n(t) || ""), i[e] = n(t) || "" }

  function bindObservable(t, e, s = !0) { for (const s of t.attributes) { const i = s.name.startsWith("x-") ? document.createAttribute(s.name.slice(2)) : s;
      makeTemplate(e, "value", s, i), i !== s && t._el.setAttributeNode(i) } if (t.children.length)
      for (const i of t.childNodes) i instanceof Text ? makeTemplate(e, "textContent", i) : s && bindObservable(i, e);
    else t.html.trim() && makeTemplate(e, "html", t) } class BaseView { constructor(t) { this._el = t, this._data = {}, this._events = {}, this.type = "default", t._view = this } get id() { return this._el.id } get data() { return this._el.dataset } get tagName() { return this._el.tagName.toUpperCase() } equals(t) { return this._el === t._el } getModel() { const t = this.parent; return t ? t.model || t.getModel() : observable() } bindObservable(t, e = !0) { return bindObservable(this, t, e), this.model = t, t } addClass(t) { for (const e of words(t)) this._el.classList.add(e) } removeClass(t) { for (const e of words(t)) this._el.classList.remove(e) } hasClass(t) { return this._el.classList.contains(t) } toggleClass(t) { return this._el.classList.toggle(t) } setClass(t, e) { e ? this.addClass(t) : this.removeClass(t) } attr(t) { return this._el.getAttribute(t) || "" } hasAttr(t) { return this._el.hasAttribute(t) } setAttr(t, e) { this._el.setAttribute(t, e.toString()) } removeAttr(t) { this._el.removeAttribute(t) } get attributes() { return Array.from(this._el.attributes || []) } get html() { return this._el.innerHTML || "" } set html(t) { this._el.innerHTML = t } set htmlStr(t) { this._el.textContent = "" + t } get text() { return this._el.textContent || "" } set text(t) { this._el.textContent = t } set textStr(t) { this._el.textContent = "" + t } blur() { this._el.blur() } focus() { this._el.focus() } get bounds() { return this._el.getBoundingClientRect() } get isInViewport() { if (0 === this.height) return !1; const t = this.bounds; return isBetween(t.top, -t.height, Browser.height) } get topLeftPosition() { const t = this.bounds; return new Point(t.left, t.top) } get boxCenter() { const t = this.bounds; return new Point(t.left + t.width / 2, t.top + t.height / 2) } get scrollWidth() { return this._el.scrollWidth } get scrollHeight() { return this._el.scrollHeight } get scrollTop() { return this._el.scrollTop } get scrollLeft() { return this._el.scrollLeft } set scrollTop(t) { this._el.scrollTop = t, this.trigger("scroll", { top: t, left: this.scrollLeft }) } set scrollLeft(t) { this._el.scrollLeft = t, this.trigger("scroll", { top: this.scrollTop, left: t }) } scrollTo(t, e = 1e3, s = "cubic") { t < 0 && (t = 0); const i = this.scrollTop,
        n = t - i;
      this._data.scrollAnimation && this._data.scrollAnimation.cancel(), this._data.scrollAnimation = animate(t => { const e = i + n * ease(s, t);
        this.scrollTop = e, this.trigger("scroll", { top: e }) }, e) } scrollBy(t, e = 1e3, s = "cubic") { t && this.scrollTo(this.scrollTop + t, e, s) } css(t, e) { if (void 0 === e) { if ("string" == typeof t) return window.getComputedStyle(this._el).getPropertyValue(t); { const e = Object.keys(t); for (const s of e) this._el.style.setProperty(s, "" + t[s]) } } else "string" == typeof t && this._el.style.setProperty(t, "" + e) } get transform() { return this.css("transform").replace("none", "") } get transformMatrix() { const t = this.transform; if (!t) return [
        [1, 0, 0],
        [0, 1, 0]
      ]; const e = t.match(/matrix\(([0-9,.\s\-]*)\)/); if (!e || !e[1]) return [
        [1, 0, 0],
        [0, 1, 0]
      ]; const s = e[1].split(","); return [
        [+s[0], +s[2], +s[4]],
        [+s[1], +s[3], +s[5]]
      ] } get scale() { const t = this.transformMatrix; return [t[0][0], t[1][1]] } setTransform(t, e = 0, s = 1) { let i = "";
      t && (i += `translate(${roundTo(t.x,.1)}px,${roundTo(t.y,.1)}px)`), e && (i += ` rotate(${e}rad)`), s && (i += ` scale(${s})`), this._el.style.transform = i } translate(t, e) { this.setTransform(new Point(t, e)) } show() { this.hasAttr("hidden") && this.removeAttr("hidden"), "visibility" === this.data.display ? this._el.style.visibility = "visible" : this._el.style.display = this.data.display || "block" } hide() { "visibility" === this.data.display ? this._el.style.visibility = "hidden" : this._el.style.display = "none" } toggle(t) { t ? this.show() : this.hide() } is(t) { return this._el.matches ? this._el.matches(t) : Array.from(document.querySelectorAll(t)).includes(this._el) } index() { let t = 0,
        e = this._el; for (; void 0 !== (e = e.previousSibling || void 0);) ++t; return t } prepend(t) { const e = this._el.childNodes;
      e.length ? this._el.insertBefore(t._el, e[0]) : this._el.appendChild(t._el) } append(t) { this._el.appendChild(t._el) } insertBefore(t) { this.parent._el.insertBefore(t._el, this._el) } insertAfter(t) { const e = this._el.nextSibling;
      e ? this.parent._el.insertBefore(t._el, e) : this.parent._el.appendChild(t._el) } get next() { return $(this._el.nextSibling) } get prev() { return $(this._el.previousSibling) } $(t) { return $(t, this) } $$(t) { return $$(t, this) } get parent() { return $(this._el.parentElement || void 0) } parents(t) { const e = []; let s = this.parent; for (; s;) t && !s.is(t) || e.push(s), s = s.parent; return e } hasParent(...t) { const e = t.map(t => t._el); let s = this._el.parentNode; for (; s;) { if (isOneOf(s, ...e)) return !0;
        s = s.parentNode } return !1 } get children() { return Array.from(this._el.children || [], t => $(t)) } get childNodes() { return Array.from(this._el.childNodes, t => t instanceof Text ? t : $(t)) } remove() { this._el && this._el.parentNode && this._el.parentNode.removeChild(this._el) } removeChildren() { for (; this._el.firstChild;) this._el.removeChild(this._el.firstChild) } on(t, e, s) { for (const i of words(t)) i in this._events ? this._events[i].includes(e) || this._events[i].push(e) : this._events[i] = [e], bindEvent(this, i, e, s) } one(t, e, s) { const i = s => { this.off(t, i), e(s) };
      this.on(t, i, s) } off(t, e) { for (const s of words(t)) s in this._events && (this._events[s] = e ? this._events[s].filter(t => t !== e) : []), unbindEvent(this, s, e) } trigger(t, e = {}) { for (const s of words(t)) { if (!this._events[s]) return; for (const t of this._events[s]) t.call(this, e) } } onKeyDown(t, e) { const s = words(t).map(t => KEY_CODES[t] || t);
      this._el.addEventListener("keydown", t => { s.indexOf(t.keyCode) >= 0 && e(t) }) } onPromise(t, e = !1) { return e ? Promise.resolve() : new Promise(t => this.one("solve", () => t())) } animate(t, e = 400, s = 0, i = "ease-in-out") { return transition(this, t, e, s, i) } enter(t = "fade", e = 500, s = 0) { return enter(this, t, e, s) } exit(t = "fade", e = 500, s = 0, i = !1) { return exit(this, t, e, s, i) } effect(t) { this.one("animationend", () => this.removeClass("effects-" + t)), this.addClass("effects-" + t) } copy(t = !0, e = !0) { const s = $(this._el.cloneNode(t)); return e && s.copyInlineStyles(this, t), s } copyInlineStyles(t, e = !0) { const s = window.getComputedStyle(t._el); for (const t of Array.from(s)) this.css(t, s.getPropertyValue(t)); if (e) { const e = this.children,
          s = t.children; for (let t = 0; t < e.length; ++t) e[t].copyInlineStyles(s[t], !0) } } } class HTMLBaseView extends BaseView { get offsetTop() { return this._el.offsetTop } get offsetLeft() { return this._el.offsetLeft } get offsetParent() { return $(this._el.offsetParent || void 0) } get width() { return this._el.offsetWidth } get height() { return this._el.offsetHeight } get innerWidth() { const t = parseFloat(this.css("padding-left")),
        e = parseFloat(this.css("padding-right")); return this._el.clientWidth - t - e } get innerHeight() { const t = parseFloat(this.css("padding-bottom")),
        e = parseFloat(this.css("padding-top")); return this._el.clientHeight - t - e } get outerWidth() { const t = parseFloat(this.css("margin-left")),
        e = parseFloat(this.css("margin-right")); return this.width + t + e } get outerHeight() { const t = parseFloat(this.css("margin-bottom")),
        e = parseFloat(this.css("margin-top")); return this.height + t + e } get positionTop() { let t = this._el,
        e = 0; for (; t;) e += t.offsetTop, t = t.offsetParent; return e } get positionLeft() { let t = this._el,
        e = 0; for (; t;) e += t.offsetLeft, t = t.offsetParent; return e } offset(t) { if (t._el === this._el.offsetParent) { const e = this.offsetTop + t._el.clientTop,
          s = this.offsetLeft + t._el.clientLeft; return { top: e, left: s, bottom: e + this.height, right: s + this.width } } { const e = t._el.getBoundingClientRect(),
          s = this._el.getBoundingClientRect(); return { top: s.top - e.top, left: s.left - e.left, bottom: s.bottom - e.top, right: s.right - e.left } } } } class SVGBaseView extends BaseView { constructor() { super(...arguments), this.type = "svg" } get $ownerSVG() { return $(this._el.ownerSVGElement || void 0) } get width() { return this.bounds.width } get height() { return this.bounds.height } get positionLeft() { const t = this._el.getBBox().x + this._el.getCTM().e; return this.$ownerSVG.positionLeft + t } get positionTop() { const t = this._el.getBBox().y + this._el.getCTM().f; return this.$ownerSVG.positionTop + t } get inverseTransformMatrix() { const t = this._el.getScreenCTM().inverse(),
        e = [
          [t.a, t.c, t.e],
          [t.b, t.d, t.f]
        ]; if (Browser.isFirefox) { const t = this.transformMatrix;
        e[0][2] -= t[0][2], e[1][2] -= t[1][2] } return e } setTransform(t, e = 0, s = 1) { const i = t ? `translate(${roundTo(t.x,.1)} ${roundTo(t.y,.1)})` : "",
        n = nearlyEquals(e, 0) ? "" : `rotate(${180*e/Math.PI})`,
        r = nearlyEquals(s, 1) ? "" : `scale(${s})`;
      this.setAttr("transform", [i, n, r].join(" ")) } get strokeLength() { if (this._el instanceof SVGGeometryElement) return this._el.getTotalLength(); { const t = this.bounds; return 2 * t.height + 2 * t.width } } getPointAt(t) { if (this._el instanceof SVGGeometryElement) { const e = this._el.getPointAtLength(t * this.strokeLength); return new Point(e.x, e.y) } return new Point(0, 0) } get points() { const t = this.attr("d"); return t ? t.replace(/[MZ]/g, "").split(/[LA]/).map(t => { const e = t.split(","); return new Point(+last(e, 1), +last(e)) }) : [] } set points(t) { const e = t.length ? "M" + t.map(t => t.x + "," + t.y).join("L") : "";
      this.setAttr("d", e) } addPoint(t) { const e = this.attr("d") + " L " + t.x + "," + t.y;
      this.setAttr("d", e) } get center() { const t = +this.attr("TEXT" === this.tagName ? "x" : "cx"),
        e = +this.attr("TEXT" === this.tagName ? "y" : "cy"); return new Point(t, e) } setCenter(t) { this.setAttr("TEXT" === this.tagName ? "x" : "cx", t.x), this.setAttr("TEXT" === this.tagName ? "y" : "cy", t.y) } setLine(t, e) { this.setAttr("x1", t.x), this.setAttr("y1", t.y), this.setAttr("x2", e.x), this.setAttr("y2", e.y) } setRect(t) { this.setAttr("x", t.p.x), this.setAttr("y", t.p.y), this.setAttr("width", t.w), this.setAttr("height", t.h) } draw(t, e = {}) { const s = { mark: this.attr("mark"), arrows: this.attr("arrows"), size: +this.attr("size") || void 0, fill: this.hasClass("fill"), round: this.hasAttr("round") };
      this.setAttr("d", drawSVG(t, applyDefaults(e, s))) } } class SVGParentView extends SVGBaseView { get viewBox() { return this._el.viewBox.baseVal || { width: 0, height: 0 } } get $ownerSVG() { return this } get positionLeft() { return parseInt(this.css("margin-left")) + this.parent.positionLeft } get positionTop() { return parseInt(this.css("margin-top")) + this.parent.positionTop } get svgWidth() { return this.viewBox.width || this.width } get svgHeight() { return this.viewBox.height || this.height } pngImage(t) { return __awaiter$1(this, void 0, void 0, (function*() { const e = this.copy(!0, !0),
          s = t || this.svgWidth,
          i = t || this.svgHeight;
        e.setAttr("width", s), e.setAttr("height", i); const n = (new XMLSerializer).serializeToString(e._el); let r = "data:image/svg+xml;utf8," + encodeURIComponent(n);
        r = r.replace("svg ", 'svg xmlns="http://www.w3.org/2000/svg" '); const o = $N("canvas", { width: s, height: i });
        o.ctx.fillStyle = "#fff", o.ctx.fillRect(0, 0, s, i); const a = yield loadImage(r); return o.ctx.drawImage(a, 0, 0, s, i), o.pngImage })) } } class WindowView extends HTMLBaseView { constructor() { super(...arguments), this.type = "window" } get width() { return window.innerWidth } get height() { return window.innerHeight } get innerWidth() { return window.innerWidth } get innerHeight() { return window.innerHeight } get outerWidth() { return window.outerWidth } get outerHeight() { return window.outerHeight } get scrollWidth() { return document.body.scrollWidth } get scrollHeight() { return document.body.scrollHeight } get scrollTop() { return window.pageYOffset } get scrollLeft() { return window.pageXOffset } set scrollTop(t) { document.body.scrollTop = document.documentElement.scrollTop = t, this.trigger("scroll", { top: t, left: this.scrollLeft }) } set scrollLeft(t) { document.body.scrollLeft = document.documentElement.scrollLeft = t, this.trigger("scroll", { top: this.scrollTop, left: t }) } } class FormView extends HTMLBaseView { constructor() { super(...arguments), this.type = "form" } get action() { return this._el.action } get formData() { const t = {}; for (const e of Array.from(this._el.elements)) { const s = e.name || e.id;
        s && (t[s] = e.value) } return t } get isValid() { return this._el.checkValidity() } } class InputView extends HTMLBaseView { constructor() { super(...arguments), this.type = "input" } get checked() { return this._el instanceof HTMLInputElement && this._el.checked } get value() { return this._el.value } set value(t) { this._el.value = t } change(t) { let e = "";
      this.on("change", () => { this.value !== e && (e = this.value.trim(), t(e)) }) } validate(t) { this.change(e => this.setValidity(t(e))) } setValidity(t) { this._el.setCustomValidity(t) } get isValid() { return this._el.checkValidity() } } class CanvasView extends HTMLBaseView { constructor() { super(...arguments), this.type = "canvas" } getContext(t = "2d", e = {}) { return this._el.getContext(t, e) } get pngImage() { return this._el.toDataURL("image/png") } get canvasWidth() { return this._el.width } get canvasHeight() { return this._el.height } get ctx() { return this._ctx || (this._ctx = this.getContext()), this._ctx } draw(t, e = {}) { this.ctx.save(), drawCanvas(this.ctx, t, e), this.ctx.restore() } clear() { this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight) } } class MediaView extends HTMLBaseView { play() { return this._el.play() || Promise.resolve() } pause() { return this._el.pause() } }
  const SVG_TAGS = ["path", "rect", "circle", "ellipse", "polygon", "polyline", "g", "defs", "marker", "line", "text", "pattern", "mask", "svg", "foreignObject"];

  function $(t, e) { if (!t) return; const s = e ? e._el : document.documentElement,
      i = "string" == typeof t ? s.querySelector(t) : t; if (!i) return; if (i._view) return i._view; const n = (i.tagName || "").toLowerCase(); return "svg" === n ? new SVGParentView(i) : "canvas" === n ? new CanvasView(i) : "form" === n ? new FormView(i) : "input" === n || "select" === n ? new InputView(i) : "video" === n || "audio" === n ? new MediaView(i) : SVG_TAGS.includes(n) ? new SVGBaseView(i) : new HTMLBaseView(i) }

  function $$(t, e) { const s = e ? e._el : document.documentElement,
      i = t ? s.querySelectorAll(t) : []; return Array.from(i, t => $(t)) }

  function $N(t, e = {}, s) { const i = SVG_TAGS.includes(t) ? document.createElementNS("http://www.w3.org/2000/svg", t) : document.createElement(t); for (const [t, s] of Object.entries(e)) void 0 !== s && ("id" === t ? i.id = s : "html" === t ? i.innerHTML = s : "text" === t ? i.textContent = s : "path" === t ? i.setAttribute("d", drawSVG(s)) : i.setAttribute(t, s)); const n = $(i); return s && s.append(n), n }
  const $body = new WindowView(document.body),
    $html = new WindowView(document.documentElement),
    KEY_CODES = { backspace: 8, tab: 9, enter: 13, shift: 16, ctrl: 17, alt: 18, pause: 19, capslock: 20, escape: 27, space: 32, pageup: 33, pagedown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40, insert: 45, delete: 46 };
  var Browser;
  ! function(t) { const e = window.navigator.userAgent.toLowerCase();
    t.isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(e), t.isRetina = (window.devicePixelRatio || 1) > 1, t.isTouch = window.Touch || "ontouchstart" in window, t.isChrome = !!window.chrome, t.isFirefox = e.indexOf("firefox") >= 0, t.isAndroid = e.indexOf("android") >= 0, t.isIOS = /iphone|ipad|ipod/i.test(e), t.isSafari = /^((?!chrome|android).)*safari/i.test(e), t.redraw = function() { document.body.offsetHeight }; const s = []; let i = !1;

    function n() { if (!i) { i = !0; for (const t of s) t();
        setTimeout(a) } } window.onload = n, document.addEventListener("DOMContentLoaded", n), t.ready = function(t) { i ? t() : s.push(t) }; const r = [];
    t.width = window.innerWidth, t.height = window.innerHeight; const o = throttle(() => { t.width = window.innerWidth, t.height = window.innerHeight; for (const e of r) e({ width: t.width, height: t.height });
      $body.trigger("scroll", { top: $body.scrollTop }) });

    function a() { o() }

    function h(t, e, s = 31536e3) { document.cookie = `${t}=${e};path=/;max-age=${s}` } t.onResize = function(e) { e({ width: t.width, height: t.height }), r.push(e) }, t.offResize = function(t) { const e = r.indexOf(t);
      e >= 0 && r.splice(e, 1) }, t.resize = a, window.addEventListener("resize", () => { const e = window.innerWidth,
        s = window.innerHeight;
      t.width === e && t.height === s || (t.width = e, t.height = s, o()) }), t.getHash = function() { return window.location.hash.slice(1) }, t.setHash = function(t) { const e = document.body.scrollTop;
      window.location.hash = t, document.body.scrollTop = e }, t.getCookies = function() { const t = document.cookie.split(";"),
        e = {}; for (let s = 0, i = t.length; s < i; ++s) { const i = t[s].split("=");
        i[0] = i[0].replace(/^\s+|\s+$/, ""), e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]) } return e }, t.getCookie = function(t) { const e = document.cookie.match(new RegExp(`(^|;) ?${t}=([^;]*)(;|$)`)); return e ? e[2] : void 0 }, t.setCookie = h, t.deleteCookie = function(t) { h(t, "", -1) }; const l = "_M";

    function c(t, e) { const s = (t || "").split("."),
        i = safeToJSON(window.localStorage.getItem(l) || void 0); let n = i; for (let t = 0; t < s.length - 1; ++t) null == n[s[t]] && (n[s[t]] = {}), n = n[s[t]];
      n[s[s.length - 1]] = e, window.localStorage.setItem(l, JSON.stringify(i)) }

    function d() { const t = document.activeElement; return t === document.body ? void 0 : $(t) } t.setStorage = c, t.getStorage = function(t) { let e = safeToJSON(window.localStorage.getItem(l) || void 0); if (!t) return e; const s = (t || "").split("."),
        i = s.pop(); for (const t of s) { if (!(t in e)) return;
        e = e[t] } return e[i] }, t.deleteStorage = function(t) { t ? c(t, void 0) : window.localStorage.setItem(l, "") }, t.getActiveInput = d, t.onKey = function(t, e, s = !1) { const i = words(t),
        n = i.map(t => KEY_CODES[t] || t),
        r = s ? "keyup" : "keydown";
      document.addEventListener(r, (function(t) { const s = d(); if (s && s.is("input, textarea, [contenteditable]")) return; const r = n.indexOf(t.keyCode);
        r >= 0 && e(t, i[r]) })) } }(Browser || (Browser = {}));
  const IEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
    webkitUA = /\bAppleWebKit\/(\d+)\b/,
    EdgeUA = /\bEdge\/12\.(\d+)\b/,
    polyfill = IEUA.test(navigator.userAgent) || +(navigator.userAgent.match(EdgeUA) || [])[1] < 10547 || +(navigator.userAgent.match(webkitUA) || [])[1] < 537,
    requests = {};

  function replaceSvgImports() { if (!polyfill) return;
    Array.from(document.querySelectorAll("svg > use")).forEach((function(t) { const e = t.getAttribute("xlink:href"),
        [s, i] = e.split("#"); if (!s.length || !i) return; const n = t.parentNode;
      n.removeChild(t), s in requests || (requests[s] = fetch(s).then(t => t.text())), requests[s].then(t => { const e = document.implementation.createHTMLDocument("");
        e.documentElement.innerHTML = t; const s = e.getElementById(i).cloneNode(!0),
          r = document.createDocumentFragment(); for (; s.childNodes.length;) r.appendChild(s.firstChild);
        n.appendChild(r) }) })) }
  let isReady = !1;
  setTimeout(() => isReady = !0);
  const BOUNCE_IN = "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    BOUNCE_OUT = "cubic-bezier(0.68, -0.275, 0.825, 0.115)",
    ResolvedAnimation = { cancel: () => {}, promise: Promise.resolve() };

  function animate(t, e) { if (0 === e) return t(1, 0, () => {}), ResolvedAnimation; const s = Date.now(),
      i = defer(); let n = 0,
      r = !0; const o = () => { r = !1, i.reject() }; return function a() { r && (!e || n <= e) && window.requestAnimationFrame(a); const h = Date.now() - s;
      t(e ? Math.min(1, h / e) : h, h - n, o), e && h >= e && i.resolve(), n = h }(), { cancel: o, promise: i.promise } }

  function easeIn(t, e = 0, s = 0) { switch (t) {
      case "quad":
        return e ** 2;
      case "cubic":
        return e ** 3;
      case "quart":
        return e ** 4;
      case "quint":
        return e ** 5;
      case "circ":
        return 1 - Math.sqrt(1 - e ** 2);
      case "sine":
        return 1 - Math.cos(e * Math.PI / 2);
      case "exp":
        return e <= 0 ? 0 : Math.pow(2, 10 * (e - 1));
      case "back":
        return s || (s = 1.70158), e * e * ((s + 1) * e - s);
      case "elastic":
        return s || (s = .3), -Math.pow(2, 10 * (e - 1)) * Math.sin((2 * (e - 1) / s - .5) * Math.PI);
      case "swing":
        return .5 - Math.cos(e * Math.PI) / 2;
      case "spring":
        return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e);
      case "bounce":
        return e < 1 / 11 ? 1 / 64 - 7.5625 * (.5 / 11 - e) * (.5 / 11 - e) : e < 3 / 11 ? 1 / 16 - 7.5625 * (2 / 11 - e) * (2 / 11 - e) : e < 7 / 11 ? .25 - 7.5625 * (5 / 11 - e) * (5 / 11 - e) : 1 - 7.5625 * (1 - e) * (1 - e);
      default:
        return e } }

  function ease(t, e = 0, s = 0) { if (0 === e) return 0; if (1 === e) return 1; const [i, n] = t.split("-"); return "in" === n ? easeIn(i, e, s) : "out" === n ? 1 - easeIn(i, 1 - e, s) : e <= .5 ? easeIn(i, 2 * e, s) / 2 : 1 - easeIn(i, 2 * (1 - e), s) / 2 }

  function transition(t, e, s = 400, i = 0, n = "ease-in-out") { if (!isReady) return Object.keys(e).forEach(s => { const i = e[s];
      t.css(s, Array.isArray(i) ? i[1] : i) }), ResolvedAnimation; "bounce-in" === n && (n = BOUNCE_IN), "bounce-out" === n && (n = BOUNCE_OUT); let r = "";
    Browser.isSafari && (r = t._el.style.transition, t.css("transition", "none"), Browser.redraw()); const o = t._data.animation;
    o && o.cancel(); const a = {},
      h = {},
      l = defer(),
      c = window.getComputedStyle(t._el);
    Object.keys(e).forEach(s => { const n = e[s],
        r = toCamelCase(s);
      h[r] = Array.isArray(n) ? n[0] : c.getPropertyValue(s), a[r] = Array.isArray(n) ? n[1] : n, i && t.css(s, h[r]) }); const d = a.height; let u; "auto" === a.height && (a.height = total(t.children.map(t => t.outerHeight)) + "px"); let p = !1;
    delay(() => { p || ((u = t._el.animate([h, a], { duration: s, easing: n, fill: "forwards" })).onfinish = () => { t._el && Object.keys(e).forEach(e => t.css(e, "height" === e ? d : a[e])), Browser.isSafari && t.css("transition", r), l.resolve(), u.cancel() }) }, i); const f = { cancel() { p = !0, t._el && Object.keys(e).forEach(e => t.css(e, t.css(e))), u && u.cancel() }, promise: l.promise }; return setTimeout(() => t._data.animation = f), f }
  const CSS_MATRIX = /matrix\([0-9.\-\s]+,[0-9.\-\s]+,[0-9.\-\s]+,[0-9.\-\s]+,([0-9.\-\s]+),([0-9.\-\s]+)\)/;

  function enter(t, e = "fade", s = 500, i = 0) { if (t.show(), !isReady) return ResolvedAnimation; if ("fade" === e) return transition(t, { opacity: [0, 1] }, s, i); if ("pop" === e) { const e = t.transform.replace(/scale\([0-9.]*\)/, "").replace(CSS_MATRIX, "translate($1px,$2px)"); return transition(t, { opacity: [0, 1] }, s, i), transition(t, { transform: [e + " scale(0.5)", e + " scale(1)"] }, s, i, "bounce-in") } if ("descend" === e) { return transition(t, { opacity: [0, 1], transform: ["translateY(-50%)", "none"] }, s, i) } if (e.startsWith("draw")) { const n = t.strokeLength;
      t.css({ opacity: 1, "stroke-dasharray": n + "px" }); const r = transition(t, { "stroke-dashoffset": [n + "px", "draw-reverse" === e ? 2 * n + "px" : 0] }, s, i, "linear"); return r.promise.then(() => t.css("stroke-dasharray", "")), r } if (e.startsWith("slide")) { const n = { opacity: [0, 1], transform: ["translateY(50px)", "none"] }; return e.includes("down") && (n.transform[0] = "translateY(-50px)"), e.includes("right") && (n.transform[0] = "translateX(-50px)"), e.includes("left") && (n.transform[0] = "translateX(50px)"), transition(t, n, s, i) } if (e.startsWith("reveal")) { const n = { opacity: [0, 1], height: [0, "auto"] }; return e.includes("left") && (n.transform = ["translateX(-50%)", "none"]), e.includes("right") && (n.transform = ["translateX(50%)", "none"]), transition(t, n, s, i) } return ResolvedAnimation }

  function exit(t, e = "fade", s = 400, i = 0, n = !1) { if (!t._el) return ResolvedAnimation; if (!isReady) return t.hide(), ResolvedAnimation; if ("none" === t.css("display")) return ResolvedAnimation; let r; if ("fade" === e) r = transition(t, { opacity: [1, 0] }, s, i);
    else if ("pop" === e) { const e = t.transform.replace(/scale\([0-9.]*\)/, "");
      transition(t, { opacity: [1, 0] }, s, i), r = transition(t, { transform: [e + " scale(1)", e + " scale(0.5)"] }, s, i, "bounce-out") } else if ("ascend" === e) { r = transition(t, { opacity: [1, 0], transform: ["none", "translateY(-50%)"] }, s, i) } else if (e.startsWith("draw")) { const n = t.strokeLength;
      t.css("stroke-dasharray", n), r = transition(t, { "stroke-dashoffset": ["draw-reverse" === e ? 2 * n + "px" : 0, n + "px"] }, s, i, "linear") } else if (e.startsWith("slide")) { const n = { opacity: 0, transform: "translateY(50px)" };
      e.includes("up") && (n.transform = "translateY(-50px)"), r = transition(t, n, s, i) } else if (e.startsWith("reveal")) { const n = { opacity: 0, height: 0 };
      e.includes("left") && (n.transform = "translateX(-50%)"), e.includes("right") && (n.transform = "translateX(50%)"), r = transition(t, n, s, i) } return r.promise.then(() => n ? t.remove() : t.hide()), r } class Draggable extends EventTarget { constructor(t, e, s = {}) { let i;
      super(), this.$el = t, this.position = new Point(0, 0), this.disabled = !1, this.width = 0, this.height = 0, this.options = applyDefaults(s, { moveX: !0, moveY: !0 }), this.setDimensions(e), slide(t, { start: () => { this.disabled || (i = this.position, this.trigger("start")) }, move: (t, e) => { this.disabled || (this.setPosition(i.x + t.x - e.x, i.y + t.y - e.y), this.trigger("drag", this.position)) }, end: (t, e) => { this.disabled || this.trigger(t.equals(e) ? "click" : "end") } }), Browser.onResize(() => { const t = this.width,
          s = this.height;
        this.setDimensions(e), this.setPosition(this.position.x * this.width / t || 0, this.position.y * this.height / s || 0) }) } setDimensions(t) { "svg" === t.type ? (this.width = this.options.width || t.svgWidth, this.height = this.options.height || t.svgHeight) : (this.width = this.options.width || t.width, this.height = this.options.height || t.height) } setPosition(t, e) { const s = this.options.margin || 0; let i = new Point(this.options.moveX ? t : 0, this.options.moveY ? e : 0).clamp(s, this.width - s, s, this.height - s).round(this.options.snap || 1);
      this.options.round && (i = this.options.round(i)), i.equals(this.position) || (this.position = i, this.options.useTransform ? this.$el.translate(i.x, i.y) : (this.options.moveX && this.$el.css("left", i.x + "px"), this.options.moveY && this.$el.css("top", i.y + "px")), this.trigger("move", i)) } }

  function getViewParams(t, e) { const s = e.regex.exec(t); if (s) { s.shift(); const t = {}; for (const [i, n] of e.params.entries()) t[n] = s[i]; return t } }

  function getTemplate(t, e, s) { return __awaiter$1(this, void 0, void 0, (function*() { if (t.template) return "string" == typeof t.template ? t.template : t.template(e); return (yield fetch(s + (s.indexOf("?") >= 0 ? "&xhr=1" : "?xhr=1"))).text() })) }
  let isReady$1 = "complete" === document.readyState;
  window.addEventListener("load", () => setTimeout(() => isReady$1 = !0)), "scrollRestoration" in window.history && (window.history.scrollRestoration = "manual");
  class Router extends EventTarget { constructor() { super(...arguments), this.$viewport = $body, this.views = [], this.active = { path: "", hash: "", index: 0 }, this.search = window.location.search, this.preloaded = !1, this.transition = !1, this.noLoad = !1, this.initialise = () => {} } setup(t = {}) { t.$viewport && (this.$viewport = t.$viewport), t.initialise && (t.initialise = this.initialise), t.preloaded && (this.preloaded = t.preloaded), t.transition && (this.transition = t.transition), t.noLoad && (this.noLoad = t.noLoad), t.click && $body.on("click", t => this.onLinkClick(t)), t.history && window.addEventListener("popstate", t => { isReady$1 && t.state && this.goToState(t.state) }) } view(t, { enter: e, exit: s, template: i } = {}) { const n = (t.match(/:\w+/g) || []).map(t => t.substr(1)),
        r = t.replace(/:\w+/g, "([\\w-]+)").replace("/", "\\/") + "\\/?",
        o = t.includes("?") ? "" : "(\\?.*)?",
        a = { regex: new RegExp("^" + r + o + "$", "i"), params: n, enter: e, exit: s, template: i };
      this.views.push(a); const h = getViewParams(window.location.pathname, a);
      h && (this.active = { path: window.location.pathname + this.search, hash: window.location.hash, index: 0 }, window.history.replaceState(this.active, "", this.active.path + this.active.hash), Browser.ready(() => { setTimeout(() => { this.preloaded ? (this.initialise(this.$viewport, h), a.enter && a.enter(this.$viewport, h)) : this.loadView(a, h, window.location.pathname) }) })) } paths(...t) { for (const e of t) this.view(e) } getView(t) { for (const e of this.views) { const s = getViewParams(t, e); if (s) return { view: e, params: s } } } load(t, e = "") { const s = this.getView(t); return t === this.active.path && e !== this.active.hash ? (console.info("[boost] Routing to " + t + e), this.trigger("hashChange", e.slice(1)), this.trigger("change", t + e), !0) : !(!s || t === this.active.path) && (console.info("[boost] Routing to " + t + e), this.trigger("change", t + e), window.ga && window.ga("send", "pageview", t + e), this.noLoad ? s.view.enter && s.view.enter(this.$viewport, s.params) : this.loadView(s.view, s.params, t), !0) } loadView(t, e = {}, s = "") { return __awaiter$1(this, void 0, void 0, (function*() { this.$viewport.css({ opacity: .4, "pointer-events": "none" }); const i = yield getTemplate(t, e, s);
        this.$viewport.css("opacity", 0), setTimeout(() => { this.$viewport.removeChildren(), $body.scrollTop = 0, this.$viewport.html = i, Browser.resize(), replaceSvgImports(), this.$viewport.css({ opacity: 1, "pointer-events": "all" }); const s = this.$viewport.$("title");
          s && (document.title = s.text), this.initialise(this.$viewport, e), t.enter && t.enter(this.$viewport, e), this.trigger("afterChange", { $viewport: this.$viewport }) }, 350) })) } onLinkClick(t) { if (t.metaKey || t.ctrlKey || t.shiftKey) return; if (t.defaultPrevented) return; let e = t.target; for (; e && "A" !== e.nodeName;) e = e.parentNode; if (!e || "A" !== e.nodeName) return; const s = e; if (s.target) return; if (s.origin !== window.location.origin) return; if (s.hasAttribute("download") || "external" === s.getAttribute("rel")) return; const i = s.getAttribute("href");
      i && i.indexOf("mailto:") > -1 || this.goTo(s.pathname + s.search, s.hash) && t.preventDefault() } goToState(t) { if (!t || !t.path) return; const e = this.load(t.path + this.search, t.hash);
      e && t.index < this.active.index && this.trigger("back"), e && t.index > this.active.index && this.trigger("forward"), this.active = t } goTo(t, e = "") { const s = this.load(t, e); if (s) { const s = this.active ? this.active.index + 1 : 0;
        this.active = { path: t, hash: e, index: s }, window.history.pushState(this.active, "", t + e) } return s } back() { window.history.back() } forward() { window.history.forward() } }
  const RouterInstance = new Router;

  function applyTemplate(t, e) { const s = Array.from(t.childNodes); if (e.template) t.innerHTML = e.template;
    else if (e.templateId) { const s = document.querySelector(e.templateId); if (!s) throw new Error(`Template not found: ${e.templateId}`); for (; t.firstChild;) t.removeChild(t.firstChild); const i = s.content,
        n = document.importNode(i, !0);
      t.appendChild(n) } if (!s.length) return; const i = t.querySelector("slot:not([name])"); for (const e of s) { const s = e.getAttribute ? e.getAttribute("slot") : void 0,
        n = s ? t.querySelector(`slot[name="${s}"]`) : i;
      n && n.parentNode.insertBefore(e, n) } for (const e of Array.from(t.querySelectorAll("slot"))) e.parentNode.removeChild(e) }

  function customElementChildren(t) { const e = []; for (const s of Array.from(t.children)) s.tagName.startsWith("X-") ? e.push(s) : e.push(...customElementChildren(s)); return e }
  const customElementOptions = new Map;
  class CustomHTMLElement extends HTMLElement { constructor() { super(...arguments), this.wasConnected = !1, this.isReady = !1 } connectedCallback() { return __awaiter$1(this, void 0, void 0, (function*() { if (this.wasConnected) return void this._view.trigger("connected");
        this.wasConnected = !0, this.isReady = !1, this._view.created(); const t = customElementOptions.get(this._view.tagName) || {};
        (t.template || t.templateId) && applyTemplate(this, t); const e = customElementChildren(this).filter(t => !t.isReady).map(t => new Promise(e => t.addEventListener("ready", e)));
        yield Promise.all(e), this._view.ready(), this.dispatchEvent(new CustomEvent("ready")), this.isReady = !0 })) } disconnectedCallback() { this._view.trigger("disconnected") } attributeChangedCallback(t, e, s) { this._view.trigger("attr:" + t, { newVal: s, oldVal: e }) } } class CustomElementView extends HTMLBaseView { created() {} ready() {} }

  function register(t, e = {}) { return function(s) { class i extends CustomHTMLElement { constructor() { super(), this._view = new s(this) } } i.observedAttributes = e.attributes || [], customElementOptions.set(t.toUpperCase(), e), window.customElements.define(t, i) } } class ExprError extends Error { constructor(t, e) { super(e), this.name = t } static undefinedVariable(t) { return new ExprError("EvalError", `Undefined variable “${t}”.`) } static undefinedFunction(t) { return new ExprError("EvalError", `Undefined function “${t}”.`) } static invalidCharacter(t) { return new ExprError("SyntaxError", `Unknown symbol “${t}”.`) } static conflictingBrackets(t) { return new ExprError("SyntaxError", `Conflicting brackets “${t}”.`) } static unclosedBracket(t) { return new ExprError("SyntaxError", `Unclosed bracket “${t}”.`) } static startOperator(t) { return new ExprError("SyntaxError", `A term cannot start with a “${t}”.`) } static endOperator(t) { return new ExprError("SyntaxError", `A term cannot end with a “${t}”.`) } static consecutiveOperators(t, e) { return new ExprError("SyntaxError", `A “${t}” cannot be followed by a “${e}”.`) } static invalidExpression() { return new ExprError("SyntaxError", "This expression is invalid.") } }
  const CONSTANTS = { pi: Math.PI, "π": Math.PI, e: Math.E },
    BRACKETS = { "(": ")", "[": "]", "{": "}", "|": "|" },
    SPECIAL_OPERATORS = { "*": "·", "**": "∗", "//": "//", "+-": "±", "–": "−", "-": "−", xx: "×", sum: "∑", prod: "∏", int: "∫", del: "∂", grad: "∇", aleph: "ℵ", not: "¬", AA: "∀", EE: "∃", "'": "’", "!=": "≠", "<=": "≤", ">=": "≥", in : "∈", "!in": "∉", "==": "≡", "~=": "≅", "~~": "≈", sub: "⊂", sube: "⊆", prop: "∝", oo: "∞", "<-": "←", "->": "→", "=>": "⇒", "<=>": "⇔", "|->": "↦", uarr: "↑", darr: "↓", lArr: "⇐", CC: "ℂ", NN: "ℕ", QQ: "ℚ", RR: "ℝ", ZZ: "ℤ" },
    SPECIAL_IDENTIFIERS = { Gamma: "Γ", Delta: "Δ", Theta: "Θ", Lambda: "Λ", Xi: "Ξ", Pi: "Π", Sigma: "Σ", Phi: "Φ", Psi: "Ψ", Omega: "Ω", alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ɛ", zeta: "ζ", eta: "η", theta: "θ", iota: "ι", kappa: "κ", lambda: "λ", mu: "μ", nu: "ν", xi: "ξ", pi: "π", rho: "ρ", sigma: "σ", tau: "τ", upsilon: "υ", phi: "φ", chi: "χ", psi: "ψ", omega: "ω" },
    ALPHABET = "abcdefghijklmnopqrstuvwxyz",
    LOWERCASE = ALPHABET.split(""),
    UPPERCASE = ALPHABET.toUpperCase().split(""),
    GREEK = Object.values(SPECIAL_IDENTIFIERS),
    IDENTIFIER_SYMBOLS = [...LOWERCASE, ...UPPERCASE, ...GREEK, "$"],
    SIMPLE_SYMBOLS = "|()[]{}÷,!<>=*/+-–−~^_…°•∥⊥'∠:%∼△",
    COMPLEX_SYMBOLS = Object.values(SPECIAL_OPERATORS),
    OPERATOR_SYMBOLS = [...SIMPLE_SYMBOLS, ...COMPLEX_SYMBOLS],
    ESCAPES = { "<": "&lt;", ">": "&gt;" };

  function escape(t) { return t in ESCAPES ? ESCAPES[t] : t }
  const SPECIAL = new Set(["sin", "cos", "tan", "sec", "csc", "cot", "arcsin", "arccos", "arctan", "sinh", "cosh", "tanh", "sech", "csch", "coth", "exp", "log", "ln", "det", "dim", "mod", "gcd", "lcm", "min", "max"]);

  function isSpecialFunction(t) { return SPECIAL.has(t) } class ExprElement { evaluate(t = {}) { return NaN } substitute(t = {}) { return this } get simplified() { return this } get variables() { return [] } get functions() { return [] } collapse() { return this } toString() { return "" } toMathML(t = {}) { return "" } } class ExprNumber extends ExprElement { constructor(t) { super(), this.n = t } evaluate() { return this.n } toString() { return "" + this.n } toMathML() { return `<mn>${this.n}</mn>` } } class ExprIdentifier extends ExprElement { constructor(t) { super(), this.i = t } evaluate(t = {}) { if (this.i in t) return t[this.i]; if (this.i in CONSTANTS) return CONSTANTS[this.i]; throw ExprError.undefinedVariable(this.i) } toMathML() { return `<mi${isSpecialFunction(this.i)?' mathvariant="normal"':""}>${this.i}</mi>` } substitute(t = {}) { return t[this.i] || this } get variables() { return [this.i] } toString() { return this.i } } class ExprString extends ExprElement { constructor(t) { super(), this.s = t } evaluate(t = {}) { if (this.s in t) return t[this.s]; throw ExprError.undefinedVariable(this.s) } toString() { return '"' + this.s + '"' } toMathML() { return `<mtext>${this.s}</mtext>` } } class ExprSpace extends ExprElement { toString() { return " " } toMathML() { return "<mspace/>" } } class ExprOperator extends ExprElement { constructor(t) { super(), this.o = t } toString() { return this.o.replace("//", "/") } get functions() { return [this.o] } toMathML() { const t = escape(this.toString()); return `<mo value="${t}">${t}</mo>` } }
  const PRECEDENCE = words("+ − * × · / ÷ // sup sub"),
    COMMA = '<mo value="," lspace="0">,</mo>';

  function needsBrackets(t, e) { return !!PRECEDENCE.includes(e) && (t instanceof ExprTerm || t instanceof ExprFunction && (!!PRECEDENCE.includes(t.fn) && PRECEDENCE.indexOf(e) > PRECEDENCE.indexOf(t.fn))) }

  function addMFence(t, e, s) { return needsBrackets(t, e) ? `<mfenced>${s}</mfenced>` : s }

  function addMRow(t, e) { return t instanceof ExprTerm || t instanceof ExprFunction ? `<mrow>${e}</mrow>` : e } class ExprFunction extends ExprElement { constructor(t, e = []) { super(), this.fn = t, this.args = e } evaluate(t = {}) { const e = this.args.map(e => e.evaluate(t)); if (this.fn in t) return t[this.fn](...e); switch (this.fn) {
        case "+":
          return e.reduce((t, e) => t + e, 0);
        case "−":
          return e.length > 1 ? e[0] - e[1] : -e[0];
        case "*":
        case "·":
        case "×":
          return e.reduce((t, e) => t * e, 1);
        case "/":
          return e[0] / e[1];
        case "sin":
        case "cos":
        case "tan":
          return Math.sin(e[0]);
        case "log":
          return Math.log(e[0]) / Math.log(e[1] || Math.E);
        case "sup":
          return Math.pow(e[0], e[1]);
        case "sqrt":
          return Math.sqrt(e[0]);
        case "root":
          return Math.pow(e[0], 1 / e[1]);
        case "(":
          return e[0] } throw ExprError.undefinedFunction(this.fn) } substitute(t = {}) { return new ExprFunction(this.fn, this.args.map(e => e.substitute(t))) } collapse() { return "(" === this.fn ? this.args[0].collapse() : new ExprFunction(this.fn, this.args.map(t => t.collapse())) } get simplified() { return this } get variables() { return unique(flatten(this.args.map(t => t.variables))) } get functions() { return unique([this.fn, ...flatten(this.args.map(t => t.functions))]) } toString() { const t = this.args.map(t => needsBrackets(t, this.fn) ? "(" + t.toString() + ")" : t.toString()); return "−" === this.fn ? t.length > 1 ? t.join(" − ") : "−" + t[0] : "sup" === this.fn ? t.join("^") : "sub" === this.fn ? t.join("_") : words("+ * × · / = < > ≤ ≥ ≈").includes(this.fn) ? t.join(" " + this.fn + " ") : isOneOf(this.fn, "(", "[", "{") ? this.fn + this.args.join(", ") + BRACKETS[this.fn] : isOneOf(this.fn, "!", "%") ? t[0] + this.fn : `${this.fn}(${t.join(", ")})` } toMathML(t = {}) { const e = this.args.map(e => e.toMathML(t)),
        s = this.args.map((t, s) => addMFence(t, this.fn, e[s])); if (this.fn in t) { const s = e.map((t, e) => ({ toString: () => t, val: this.args[e] })); return t[this.fn](...s) } if ("−" === this.fn) return s.length > 1 ? s.join('<mo value="−">−</mo>') : '<mo rspace="0" value="−">−</mo>' + s[0]; if (isOneOf(this.fn, "+", "=", "<", ">", "≤", "≥", "≈")) { const t = escape(this.fn); return s.join(`<mo value="${t}">${t}</mo>`) } if (isOneOf(this.fn, "*", "×", "·")) { let t = s[0]; for (let e = 1; e < s.length - 1; ++e) { t += (this.args[0] instanceof ExprNumber && this.args[1] instanceof ExprNumber ? '<mo value="×">×</mo>' : "") + s[1] } return t } if ("//" === this.fn) return s.join('<mo value="/">/</mo>'); if ("sqrt" === this.fn) return `<msqrt>${s[0]}</msqrt>`; if (isOneOf(this.fn, "/", "root")) { const t = "/" === this.fn ? "mfrac" : "mroot"; return `<${t}>${this.args.map((t,s)=>addMRow(t,e[s])).join("")}</${t}>` } if (isOneOf(this.fn, "sup", "sub")) { const t = [addMRow(this.args[0], s[0]), addMRow(this.args[1], e[1])]; return `<m${this.fn}>${t.join("")}</m${this.fn}>` } return isOneOf(this.fn, "(", "[", "{") ? `<mfenced open="${this.fn}" close="${BRACKETS[this.fn]}">${s.join(COMMA)}</mfenced>` : isOneOf(this.fn, "!", "%") ? s[0] + `<mo value="${this.fn}" lspace="0">${this.fn}</mo>` : "abs" === this.fn ? `<mfenced open="|" close="|">${s.join(COMMA)}</mfenced>` : "bar" === this.fn ? `<mover>${addMRow(this.args[0],s[0])}<mo value="‾">‾</mo></mover>` : "vec" === this.fn ? `<mover>${addMRow(this.args[0],s[0])}<mo value="→">→</mo></mover>` : `<mi${isSpecialFunction(this.fn)?' mathvariant="normal"':""}>${this.fn}</mi><mfenced>${s.join(COMMA)}</mfenced>` } } class ExprTerm extends ExprElement { constructor(t) { super(), this.items = t } evaluate(t = {}) { return this.collapse().evaluate(t) } substitute(t = {}) { return this.collapse().substitute(t) } get simplified() { return this.collapse().simplified } get variables() { return unique(join(...this.items.map(t => t.variables))) } get functions() { return this.collapse().functions } toString() { return this.items.map(t => t.toString()).join(" ") } toMathML(t = {}) { return this.items.map(e => e.toMathML(t)).join("") } collapse() { return collapseTerm(this.items).collapse() } }
  var TokenType;

  function createToken(t, e) { if (t && e) { if (e === TokenType.SPACE && t.length > 1) return new ExprSpace; if (e === TokenType.STR) return new ExprString(t); if (e === TokenType.NUM) { if (isNaN(+t)) throw ExprError.invalidExpression(); return new ExprNumber(+t) } return e === TokenType.VAR ? t in SPECIAL_IDENTIFIERS ? new ExprIdentifier(SPECIAL_IDENTIFIERS[t]) : t in SPECIAL_OPERATORS ? new ExprOperator(SPECIAL_OPERATORS[t]) : new ExprIdentifier(t) : e === TokenType.OP ? new ExprOperator(t in SPECIAL_OPERATORS ? SPECIAL_OPERATORS[t] : t) : void 0 } }

  function tokenize(t) { const e = []; let s = "",
      i = TokenType.UNKNOWN; for (let n of t) { if ('"' === n) { const t = i === TokenType.STR ? TokenType.UNKNOWN : TokenType.STR,
          n = createToken(s, i);
        n && e.push(n), s = "", i = t; continue } if (i === TokenType.STR) { s += n; continue } const t = n.match(/[0-9.]/) ? TokenType.NUM : IDENTIFIER_SYMBOLS.includes(n) ? TokenType.VAR : OPERATOR_SYMBOLS.includes(n) ? TokenType.OP : n.match(/\s/) ? TokenType.SPACE : TokenType.UNKNOWN; if (!t) throw ExprError.invalidCharacter(n); if (!i || i === TokenType.NUM && t !== TokenType.NUM || i === TokenType.VAR && t !== TokenType.VAR && t !== TokenType.NUM || i === TokenType.OP && !(s + n in SPECIAL_OPERATORS) || i === TokenType.SPACE && t !== TokenType.SPACE) { const n = createToken(s, i);
        n && e.push(n), s = "", i = t } s += n } const n = createToken(s, i); return n && e.push(n), e }

  function makeTerm(t) { return t.length > 1 ? new ExprTerm(t) : t[0] instanceof ExprOperator ? new ExprTerm(t) : t[0] }

  function splitArray(t, e) { const s = [
      []
    ]; for (let i of t) e(i) ? s.push([]) : last(s).push(i); return s }

  function isOperator(t, e) { return t instanceof ExprOperator && words(e).includes(t.o) }

  function removeBrackets(t) { return t instanceof ExprFunction && "(" === t.fn ? t.args[0] : t }

  function findBinaryFunction(t, e, s) { if (isOperator(t[0], e)) throw ExprError.startOperator(t[0]); if (isOperator(last(t), e)) throw ExprError.endOperator(last(t)); for (let i = 1; i < t.length - 1; ++i) { if (!isOperator(t[i], e)) continue; const n = t[i],
        r = t[i - 1],
        o = t[i + 1]; if (r instanceof ExprOperator) throw ExprError.consecutiveOperators(r.o, n.o); if (o instanceof ExprOperator) throw ExprError.consecutiveOperators(n.o, o.o); const a = [removeBrackets(r), removeBrackets(o)];
      t.splice(i - 1, 3, new ExprFunction(s || n.o, a)), i -= 2 } }

  function prepareTerm(t) { return findBinaryFunction(t, "^", "sup"), findBinaryFunction(t, "_", "sub"), findBinaryFunction(t, "/"), makeTerm(t) }

  function matchBrackets(t) { const e = [
      []
    ]; for (let s of t) { const t = last(e).length ? last(e)[0].o : void 0; if (isOperator(s, ") ] }") || isOperator(s, "|") && "|" === t) { if (!isOperator(s, BRACKETS[t])) throw ExprError.conflictingBrackets(s.o); const i = e.pop(),
          n = last(e),
          r = isOperator(s, ")") && last(n) instanceof ExprIdentifier && "π" !== last(n).i ? n.pop().i : isOperator(s, "|") ? "abs" : i[0].o,
          o = splitArray(i.slice(1), t => isOperator(t, ","));
        n.push(new ExprFunction(r, o.map(prepareTerm))) } else isOperator(s, "( [ { |") ? e.push([s]) : last(e).push(s) } if (e.length > 1) throw ExprError.unclosedBracket(last(e)[0].o); return prepareTerm(e[0]) }

  function findAssociativeFunction(t, e, s = !1) { const i = []; let n = [],
      r = !1;

    function o() { if (r) throw ExprError.invalidExpression();
      n.length && (i.push(n.length > 1 ? new ExprFunction(e[0], n) : n[0]), n = []) } for (let a of t)
      if (isOperator(a, e)) { if (r || !n.length) throw ExprError.invalidExpression();
        r = !0 } else if (a instanceof ExprOperator) o(), i.push(a), r = !1;
    else { const t = !s || a instanceof ExprNumber; if (n.length && !r && t) throw ExprError.invalidExpression();
      n.push(a), r = !1 } return o(), i }

  function collapseTerm(t) { if (!(t = t.filter(t => !(t instanceof ExprSpace))).length) throw ExprError.invalidExpression(); if (isOperator(t[0], "%!")) throw ExprError.startOperator(t[0]); for (let e = 0; e < t.length; ++e) isOperator(t[e], "%!") && (t.splice(e - 1, 2, new ExprFunction(t[e].o, [t[e - 1]])), e -= 1); if (findBinaryFunction(t, "= < > ≤ ≥"), findBinaryFunction(t, "// ÷", "/"), isOperator((t = findAssociativeFunction(t, "× * ·", !0))[0], "− ±") && t.splice(0, 2, new ExprFunction(t[0].o, [t[1]])), findBinaryFunction(t, "− ±"), isOperator(t[0], "+") && (t = t.slice(1)), (t = findAssociativeFunction(t, "+")).length > 1) throw ExprError.invalidExpression(); return t[0] }

  function parse$1(t, e = !1) { const s = matchBrackets(tokenize(t)); return e ? s.collapse() : s }

  function numEquals(t, e) { try { const s = unique([...t.variables, ...e.variables]),
        i = t.collapse(),
        n = e.collapse(); for (let t = 0; t < 5; ++t) { const t = {}; for (let e of s) t[e] = CONSTANTS[e] || 5 * Math.random(); const e = i.evaluate(t),
          r = n.evaluate(t); if (!isNaN(e) && !isNaN(r) && !nearlyEquals(e, r)) return !1 } return !0 } catch (t) { return !1 } }! function(t) { t[t.UNKNOWN = 0] = "UNKNOWN", t[t.SPACE = 1] = "SPACE", t[t.STR = 2] = "STR", t[t.NUM = 3] = "NUM", t[t.VAR = 4] = "VAR", t[t.OP = 5] = "OP" }(TokenType || (TokenType = {}));
  const Expression = { numEquals: numEquals, parse: cache(parse$1) };
  class Ticker { constructor() { this.callbacks = [] } add(t) { this.callbacks.push(t) } start(t = 1e3) { return animate(t => { for (const e of this.callbacks) e(t) }, t).promise } }

  function arrayEquals(t, e) { return t.every((t, s) => nearlyEquals(t, e[s])) }

  function applyTransform(t, e) { t.scale *= e.scale, t.x = t.x * e.scale + e.x, t.y = t.y * e.scale + e.y }

  function transformEquals(t, e) { return nearlyEquals(t.x, e.x) && nearlyEquals(t.y, e.y) && nearlyEquals(t.scale, e.scale) }

  function drawStroke(t, e, s) { const i = t.strokeLength; if ("adding" === s) { const s = e < .5 ? 0 : ease("cubic-in", 2 * e - 1);
      t.css({ "stroke-dasharray": i + "px", "stroke-dashoffset": i * (1 - s) + "px" }) } else if ("deleting" === s) { const s = e < .5 ? ease("cubic-in", 2 * e) : 1;
      t.css({ "stroke-dasharray": i + "px", "stroke-dashoffset": i * (2 - s) + "px" }) } }

  function matchNodes(t, e) { const s = [t]; let i = t.expr; for (; e.startsWith(i);) { if (e === i) return s; const t = last(s).next; if (!t) return;
      s.push(t), i += t.expr } }

  function bezier(t, e, s = 1) { const i = s * Math.abs(e.x - t.x) / 3,
      n = Point.average(t, e).shift(0, i); return function(s) { return { x: (1 - s) ** 2 * t.x + 2 * s * (1 - s) * n.x + s * s * e.x, y: (1 - s) ** 2 * t.y + 2 * s * (1 - s) * n.y + s * s * e.y } } }

  function wrapInRow(t, e) { return 1 === e.length && "mrow" === e[0].type ? e[0] : new DisplayNodeRow(e, t) } class DisplayNode { constructor(t, e, s, i) { this.type = t, this.equation = s, this.$element = i, this.children = [], this.status = "", this.value = "", this.customColor = "", this.roundedMotion = !1, this.width = 0, this.height = 0, this.baseline = 0, this.transform = { x: 0, y: 0, scale: 1 }, this.currentDimensions = [0, 0, 0], this.currentWorldTransform = { x: 0, y: 0, scale: 1 }, this.addChildren(e), i && s.$row.append(i) } get expr() { return "" } get log() { const t = this.children.map(t => t.log); return `<${this.type}>${t.join("")}</${this.type}>` } get color() { return this.customColor || (this.parent ? this.parent.color : "") } static create(t, e) { const s = t.nodeName.toLowerCase(); if (isOneOf(s, "mn", "mi", "mo", "mtext")) return new DisplayNodeText(s, t, e); if (!isOneOf(s, "mrow", "mfrac", "mfenced", "msqrt", "mroot", "msub", "msup", "msubsup")) return new DisplayNodeForeign(t, e); let i = Array.from(t.children, t => DisplayNode.create(t, e)); switch (s) {
        case "mrow":
          return new DisplayNodeRow(i, e);
        case "mfrac":
          return i = i.map(t => wrapInRow(e, [t])), new DisplayNodeFraction(i, e);
        case "mfenced":
          return i = [wrapInRow(e, i)], new DisplayNodeFenced(i, e);
        case "msqrt":
          return i = [wrapInRow(e, i)], new DisplayNodeRoot(s, i, e);
        case "mroot":
          return i = i.map(t => wrapInRow(e, [t])), new DisplayNodeRoot(s, i, e);
        case "msub":
        case "msup":
        case "msubsup":
          return i = i.map(t => wrapInRow(e, [t])), new DisplayNodeSubSup(s, i, e) } throw new Error(`Unknown element type tag ${t.nodeName}`) } get marginLeft() { return .1 } get marginRight() { return .1 } setTransform(t = 0, e = 0, s = 1) { this.transform.x = t, this.transform.y = e, this.transform.scale = s } get worldTransform() { let t = this; const e = Object.assign({}, this.transform); for (; t = t.parent;) applyTransform(e, t.transform); return e } get next() { if (!this.parent) return; const t = this.parent.children.indexOf(this); return this.parent.children[t + 1] } get prev() { if (!this.parent) return; const t = this.parent.children.indexOf(this); return this.parent.children[t - 1] } addChildren(t, e = this.children.length) { for (const e of t) e.detach(), e.parent = this;
      this.children.splice(e, 0, ...t) } insertAfter(t) { const e = this.parent.children.indexOf(this);
      this.parent.addChildren(t, e + 1) } insertBefore(t) { const e = this.parent.children.indexOf(this);
      this.parent.addChildren(t, e) } detach() { if (this.parent) { const t = this.parent.children.indexOf(this);
        t >= 0 && this.parent.children.splice(t, 1) } } deleteFromDom() { this.$element && this.$element.remove(), this.$element = void 0; for (const t of this.children) t.deleteFromDom() } hasParent(t) { let e = this; for (; e = e.parent;)
        if (e.type === t) return !0; return !1 } measure() { for (const t of this.children) t.measure() } clean() { for (const t of this.children) t.clean() } setStatus(t) { this.status = t; for (const e of this.children) e.setStatus(t) } render(t) { for (const e of this.children) e.render(t); if (!this.$element) return; const e = this.currentWorldTransform,
        s = this.currentWorldTransform = this.worldTransform,
        i = this.currentDimensions,
        n = this.currentDimensions = [this.width, this.height, this.baseline]; if (transformEquals(e, s) && arrayEquals(i, n) && !this.status) return; if (!t) return this.positionElement(s), void this.drawElement(1, n[0], n[1], n[2], s.scale); "adding" === this.status && this.positionElement(s); const r = s.y + this.baseline < this.equation.root.baseline ? -1 : 1,
        o = this.roundedMotion ? bezier(e, s, r) : void 0;
      this.roundedMotion = !1, t.add(t => { if (!this.$element) return; const r = ease("cubic", t),
          a = isOneOf(this.status, "adding", "deleting"),
          h = a ? n[0] : lerp(i[0], n[0], r),
          l = a ? n[1] : lerp(i[1], n[1], r),
          c = a ? n[2] : lerp(i[2], n[2], r),
          d = a ? s.scale : lerp(e.scale, s.scale, r); if (this.drawElement(t, h, l, c, d), !this.status) { const t = o ? o(r) : Point.interpolate(e, s, r);
          this.positionElement({ x: t.x, y: t.y, scale: d }) } }) } positionElement(t) { this.$element.setTransform(t, 0, t.scale) } drawElement(t, e, s, i, n) {} }
  const ASCENDERS = "acegmnopqrsuvwxyz",
    LINE_HEIGHT = 1.1,
    BASELINE_SHIFT = .2;
  class DisplayNodeText extends DisplayNode { constructor(t, e, s) { const i = $N("text", { text: e.textContent });
      super(t, [], s, i), this.value = e.textContent || ""; const n = this.value.split("").every(t => ASCENDERS.includes(t));
      this.height = (LINE_HEIGHT - (n ? .15 : 0)) * this.equation.fontSize, this.baseline = this.height - BASELINE_SHIFT * this.equation.fontSize, "mtext" !== t && "normal" !== e.getAttribute("mathvariant") || i.addClass("font-normal") } measure() { this.width = this.width || this.$element.width } get expr() { return "mtext" === this.type ? `"${this.value}"` : this.value } get log() { return `<${this.type}>${this.value}</${this.type}>` } get marginLeft() { if ("mo" === this.type) return this.equation.isDisplay && isOneOf(this.value, "=", "≈") ? .6 : isOneOf(this.value, "∡", "△", "!", "%", "’") ? 0 : isOneOf(this.value, "…", "°") && this.prev && "mn" === this.prev.type ? 0 : .25; if ("mi" === this.type) { if (this.prev && "mn" === this.prev.type) return .1; if (this.prev && "mi" === this.prev.type) return .05; if (this.prev && "mfrac" === this.prev.type) return .15 } return 0 } get marginRight() { return "mo" === this.type ? this.equation.isDisplay && isOneOf(this.value, "=", "≈") ? .6 : isOneOf(this.value, "∡", "△") ? 0 : "−" !== this.value || this.prev && "=" !== this.prev.value ? .25 : .1 : 0 } positionElement(t) { if (!this.$element) return; const e = (this.equation.fontSize - this.baseline) * t.scale;
      this.$element.setTransform({ x: t.x, y: t.y - e }, 0, t.scale) } drawElement(t, e, s, i, n) { "adding" === this.status ? this.$element.setAttr("opacity", t < .5 ? 0 : ease("cubic-in", 2 * t - 1)) : "deleting" === this.status && this.$element.setAttr("opacity", t < .5 ? 1 - ease("cubic-in", 2 * t) : 0), this.$element.css("stroke-width", 1.5 * (1 - n) + "px"), this.$element.css("color", this.color || "currentColor") } } class DisplayNodeRow extends DisplayNode { constructor(t, e, s, i = 0) { super("mrow", t, e), this.align = s, this.dx = i } addChildren(t, e = this.children.length) { const s = []; for (const e of t) "mrow" === e.type ? (s.push(...e.children), e.detach()) : s.push(e);
      DisplayNode.prototype.addChildren.call(this, s, e) } get expr() { return this.children.map(t => t.expr).join("") } measure() { if (DisplayNode.prototype.measure.call(this), !this.children.length) return void(this.height = this.width = this.baseline = 0);
      this.baseline = Math.max(...this.children.map(t => t.baseline)), this.height = this.baseline + Math.max(...this.children.map(t => t.height - t.baseline)); let t = 0; for (const [e, s] of this.children.entries()) s.setTransform(t, this.baseline - s.baseline), t += s.width, e < this.children.length - 1 && (t += Math.max(s.marginRight, this.children[e + 1].marginLeft) * this.equation.fontSize); if (this.align) { const t = this.children.find(t => t.expr === this.align);
        t && (this.transform.x = this.dx - t.transform.x - t.width / 2) } this.width = t } } class DisplayNodeFraction extends DisplayNode { constructor(t, e) { super("mfrac", t, e, $N("line")) } get expr() { return this.children.map(t => t.expr).join("/") } measure() { DisplayNode.prototype.measure.call(this); const t = .1 * this.equation.fontSize,
        e = !this.equation.isDisplay || this.hasParent("mfrac") ? .66 : 1,
        [s, i] = this.children;
      this.width = (Math.max(s.width, i.width) + 2 * t) * e, this.height = (s.height + i.height) * e, this.baseline = s.height * e + this.equation.fontSize * (LINE_HEIGHT / 2 - BASELINE_SHIFT), s.setTransform((this.width - s.width * e) / 2, 0, e), i.setTransform((this.width - i.width * e) / 2, s.height * e, e) } drawElement(t, e, s, i) { const n = i - this.equation.fontSize * (LINE_HEIGHT / 2 - BASELINE_SHIFT);
      this.$element.setLine({ x: 0, y: n }, { x: e, y: n }), this.$element.setAttr("stroke", this.color || "currentColor"), drawStroke(this.$element, t, this.status) } } class DisplayNodeSubSup extends DisplayNode { get expr() { let t = this.children[0].expr; return "msup" !== this.type && (t += "_" + this.children[1].expr), "msup" === this.type && (t += "^" + this.children[1].expr), "msubsup" === this.type && (t += "^" + this.children[2].expr), t } measure() { DisplayNode.prototype.measure.call(this); const [t, e, s] = this.children, i = "msup" === this.type ? void 0 : e, n = "msubsup" === this.type ? s : "msup" === this.type ? e : void 0, r = .05 * this.equation.fontSize, o = n ? .65 * n.height - .4 * this.equation.fontSize : 0, a = i ? .65 * i.height - .5 * this.equation.fontSize : 0, h = n ? n.width : 0, l = i ? i.width : 0;
      this.width = t.width + r + .65 * Math.max(h, l), this.height = t.height + o + a, this.baseline = t.baseline + o, t.setTransform(0, this.baseline - t.baseline), n && n.setTransform(t.width + r, 0, .65), i && i.setTransform(t.width + r, this.height - .65 * i.height, .65) } clean() { if (DisplayNode.prototype.clean.call(this), this.children = this.children.filter(t => "mrow" !== t.type || t.children.length), 0 === this.children.length) return this.detach();
      1 === this.children.length && (this.insertAfter(this.children), this.detach()) } } class DisplayNodeFenced extends DisplayNode { constructor(t, e) { super("mfenced", t, e, $N("path")) } get expr() { return `(${this.children.map(t=>t.expr).join()})` } get marginLeft() { return .2 } get marginRight() { return .2 } measure() { DisplayNode.prototype.measure.call(this); const t = this.children[0];
      this.height = t.height + 2, this.baseline = t.baseline + 1; const e = 1 + this.height / this.equation.fontSize,
        s = .1 * this.equation.fontSize;
      this.width = t.width + 2 * (e + s), t.setTransform(e + s, 1) } drawElement(t, e, s) { const i = Math.min(2 + s / this.equation.fontSize, 5),
        n = s - 4,
        r = `M${i},2c${-2*i/3},${.15*n},${-i},${.32*n},${-i},${n/2}s${i/3},${.35*n},${i},${n/2}` + `M${e-i},2c${2*i/3},${.15*n},${i},${.32*n},${i},${n/2}s${-i/3},${.35*n},${-i},${n/2}`;
      this.$element.setAttr("d", r), this.$element.css("stroke", this.color || "currentColor"), drawStroke(this.$element, t, this.status) } clean() { DisplayNode.prototype.clean.call(this), this.children.length || this.detach() } } class DisplayNodeRoot extends DisplayNode { constructor(t, e, s) { super(t, e, s, $N("path")) } get expr() { return `sqrt(${this.children.map(t=>t.expr).join()})` } get marginLeft() { return .2 } get marginRight() { return .2 } measure() { DisplayNode.prototype.measure.call(this); const t = this.children[0];
      this.height = t.height + 2, this.baseline = t.baseline + 2; const e = Math.min(16, 3 + 5 * this.height / this.equation.fontSize),
        s = .05 * this.equation.fontSize;
      this.width = t.width + e + 2 * s, t.setTransform(e + s, 2) } drawElement(t, e, s) { const i = Math.min(16, 3 + 5 * s / this.equation.fontSize),
        n = s - 2,
        r = `M0,${.55*n}L${.18*i},${.51*n}L${.45*i},${n}L${i},2L${e},2`;
      this.$element.setAttr("d", r), this.$element.css("stroke", this.color || "currentColor"), drawStroke(this.$element, t, this.status) } clean() { DisplayNode.prototype.clean.call(this), this.children.length || this.detach() } } class DisplayNodeForeign extends DisplayNode { constructor(t, e) { var s;
      super("foreign", [], e, $N("g")), this.$body = $N("div", {}, e.$overlay), this.$body._el.appendChild(t), this.$measure = $N("span", { text: ".", style: "font-size: 0" }, this.$body), this.checkForResize(), this.$body.on("resize", () => { this.checkForResize() && this.equation.resize() }), null === (s = this.$body.$("x-blank, x-blank-input")) || void 0 === s || s.on("solve", t => { delay(() => this.replace(t.solution, "#0f82f2"), t.restore ? 0 : 200) }) } deleteFromDom() { var t;
      null === (t = this.$body) || void 0 === t || t.remove(), this.$body = void 0, this.$measure = void 0 } replace(t, e) { var s; const i = isNaN(+t) ? "mtext" : "mn",
        n = document.createElement(i);
      n.textContent = t; const r = new DisplayNodeText(i, n, this.equation);
      r.customColor = e, this.insertAfter([r]), null === (s = this.$body) || void 0 === s || s.off("resize"), this.detach(), this.deleteFromDom(), this.equation.resize() } checkForResize() { var t, e; const s = this.height,
        i = this.width,
        n = this.baseline; return this.height = (null === (t = this.$body) || void 0 === t ? void 0 : t.height) || 0, this.width = (null === (e = this.$body) || void 0 === e ? void 0 : e.width) || 0, this.baseline = this.$measure.bounds.top - this.$body.bounds.top, !(nearlyEquals(s, this.height) && nearlyEquals(i, this.width) && nearlyEquals(n, this.baseline)) } positionElement(t) { console.log("position", this.$body._el, t.x, t.y, t.scale), this.$body.css({ left: t.x + "px", top: t.y + "px" }), nearlyEquals(t.scale, 1) || this.$body.css("transform", `scale(${t.scale})`) } get expr() { return this.$body.text } get log() { return `<foreign>${this.expr}</foreign>` } } class DisplayEquation extends EventTarget { constructor(t, e, s = 0, i = "=", n = 18, r = !0) { super(), this.$row = t, this.$overlay = e, this.fontSize = n, this.isDisplay = r, this.isReady = !0, this.deletedNodes = new Set, this.desc = $N("desc", {}, t), this.root = new DisplayNodeRow([], this, i, s) } setValue(t) { const e = Array.isArray(t) ? t.map(t => DisplayNode.create(t, this)) : this.parse(t); for (const t of this.root.children) t.deleteFromDom();
      this.root.addChildren(e), this.updateDescription(), this.resize() } updateDescription() { this.desc.text = this.root.expr } resize() { this.root.measure(), this.root.render() } parse(t) { var e, s; const i = new DOMParser,
        n = Expression.parse(t).toMathML(),
        r = i.parseFromString(`<math>${n}</math>`, "text/xml"); if ("parsererror" === (null === (e = r.firstChild) || void 0 === e ? void 0 : e.nodeName)) throw new Error(null === (s = r.firstChild) || void 0 === s ? void 0 : s.textContent); let o = r.firstChild.childNodes; return Array.from(o, t => DisplayNode.create(t, this)) } find(t) { let [e, s] = t.split("`");
      e = e.replace(/[–-]/g, "−"); const i = +s || 1,
        n = this.root.children.slice(0); let r = 0; for (; n.length;) { const t = n.shift(),
          s = t instanceof DisplayNodeRow ? void 0 : matchNodes(t, e); if (s && (r += 1) === i) return s;
        n.unshift(...t.children) } throw new Error(`Can't find element ${e}.`) } animate(t = 1200) { return __awaiter(this, void 0, void 0, (function*() { this.isReady = !1, this.root.clean(), this.root.measure(); const e = new Ticker;
        this.root.render(e), this.trigger("resize", { height: this.root.height }); for (const t of this.deletedNodes) t.render(e);
        yield e.start(t); for (const t of this.deletedNodes) t.deleteFromDom();
        this.root.setStatus(""), this.deletedNodes.clear(), this.isReady = !0 })) } addTermAfter(t, e) { const s = last(e ? this.find(e) : this.root.children),
        i = this.parse(t);
      s.insertAfter(i); for (const t of i) t.setStatus("adding");
      this.updateDescription() } addTermBefore(t, e) { const s = e ? this.find(e)[0] : this.root.children[0],
        i = this.parse(t);
      s.insertBefore(i); for (const t of i) t.setStatus("adding");
      this.updateDescription() } deleteTerm(t) { for (const e of this.find(t)) e.setStatus("deleting"), e.detach(), this.deletedNodes.add(e);
      this.updateDescription() } replaceTerm(t, e) { const s = this.find(t),
        i = this.parse(e);
      s[0].insertBefore(i); for (const t of i) t.setStatus("adding"); for (const t of s) t.setStatus("deleting"), t.detach(), this.deletedNodes.add(t);
      this.updateDescription() } moveTermAfter(t, e) { const s = this.find(t); for (const t of s) t.roundedMotion = !0;
      last(e ? this.find(e) : this.root.children).insertAfter(s), this.updateDescription() } moveTermBefore(t, e) { const s = this.find(t); for (const t of s) t.roundedMotion = !0;
      (e ? this.find(e)[0] : this.root.children[0]).insertBefore(s), this.updateDescription() } moveTermToStart(t) { const e = this.find(t); for (const t of e) t.roundedMotion = !0;
      this.root.children[0].insertBefore(e), this.updateDescription() } wrapTerms(t, ...e) { const s = e.map(t => this.find(t)); for (const t of s)
        for (const e of t) e.roundedMotion = !0; const i = this.parse(t); for (const t of i) t.setStatus("adding");
      s[0][0].insertBefore(i); for (const [t, e] of s.entries()) { const s = this.find("$" + (t + 1))[0];
        s.insertAfter(e), s.detach(), s.deleteFromDom() } this.updateDescription() } unwrapTerm(t, e = 1) { const s = this.find(t); let i = s[0],
        n = 1; for (; n <= e;)(i = i.parent) instanceof DisplayNodeRow && (i = i.parent), n += 1;
      i.insertAfter(s), i.setStatus("deleting"), i.detach(), this.deletedNodes.add(i), this.updateDescription() } get leftSide() { const t = this.root.children.findIndex(t => "=" === t.expr); return this.root.children.slice(0, t - 1) } get rightSide() { const t = this.root.children.findIndex(t => "=" === t.expr); return this.root.children.slice(t + 1) } }
  const NEXT_STEP_DELAY = 1200,
    NEW_ROW_DELAY = 400,
    TRANSFORM_DURATION = 1200,
    NEW_ROW_DURATION = 600,
    ROW_SPACING = 16;
  let AlgebraFlow = class extends CustomElementView { constructor() { super(...arguments), this.rows = [], this.isReady = !0, this.topOffset = 4, this.currentHeight = 0, this.currentStep = 0, this.nextEvents = {}, this.backEvents = {} } ready() { this.$svg = this.$("svg"), this.$lastRow = this.$svg.$("g"), this.$overlay = this.$(".overlay"), this.$legend = this.$(".legend-box"), this.$steps = this.$legend.$$("li"), this.$back = this.$(".back"), this.$next = this.$(".next"); const t = +this.attr("dx") || 0;
      this.equation = new DisplayEquation(this.$lastRow, this.$overlay, t); const e = this.$(".math"),
        s = e ? Array.from(e._el.children) : [];
      this.equation.setValue(this.attr("expr") || s), this.currentHeight = this.topOffset + this.$lastRow.height + 16, this.$svg.css("height", this.currentHeight + "px"), this.equation.on("resize", ({ height: t }) => { const e = this.topOffset + t + ROW_SPACING;
        Math.abs(e - this.currentHeight) < ROW_SPACING / 2 || (this.currentHeight = e, this.$svg.animate({ height: e + "px" }, TRANSFORM_DURATION)) }), this.$back.on("click", () => this.goBack()), this.$next.on("click", () => this.goNext()), this.$steps[0].show(), Browser.onResize(() => { const t = this.$svg.width / 2; for (const e of [this.$lastRow, this.$overlay]) e.css("transform", `translate(${t}px, ${this.topOffset}px)`); for (const e of this.rows) e.$el.css("transform", `translate(${t}px, ${e.top}px)`) }); const i = this.$overlay.$$("x-blank, x-blank-input");
      i.length && (this.$next.addClass("hide"), Promise.all(i.map(t => t.onPromise("solve"))).then(() => setTimeout(() => this.goNext(), NEXT_STEP_DELAY))) } newRow() { return __awaiter(this, void 0, void 0, (function*() { const t = this.$lastRow.copy(!0, !1),
          e = this.equation.root.height;
        this.rows.push({ $el: t, height: e, top: this.topOffset }), this.$lastRow.insertBefore(t), Browser.redraw(), this.topOffset += e + ROW_SPACING, this.currentHeight = this.topOffset + e + ROW_SPACING; for (const t of [this.$lastRow, this.$overlay]) t.animate({ transform: `translate(${this.$svg.width/2}px, ${this.topOffset}px)` }, NEW_ROW_DURATION);
        yield this.$svg.animate({ height: this.currentHeight + "px" }, NEW_ROW_DURATION).promise })) } hideLastRow() { return __awaiter(this, void 0, void 0, (function*() { if (!this.rows.length) return; const t = this.rows.pop();
        this.topOffset = t.top; for (const e of [this.$lastRow, this.$overlay]) e.animate({ transform: `translate(${this.$svg.width/2}px, ${t.top}px)` }, NEW_ROW_DURATION);
        this.currentHeight = t.top + this.$lastRow.height + ROW_SPACING, this.$svg.animate({ height: this.currentHeight + "px" }, NEW_ROW_DURATION), yield t.$el.exit("fade", NEW_ROW_DURATION / 2, NEW_ROW_DURATION / 2).promise, t.$el.remove() })) } onNextStep(t) { this.nextEvents = t } onBackStep(t) { this.backEvents = t } goNext() { return __awaiter(this, void 0, void 0, (function*() { if (!this.isReady || !this.equation.isReady || this.currentStep >= this.$steps.length - 1) return;
        this.isReady = !1; const t = this.currentStep + 1;
        this.$steps[t].hasClass("new-row") && (yield this.newRow(), yield wait(NEW_ROW_DELAY)), t in this.nextEvents && (yield this.nextEvents[t](this.equation), yield this.equation.animate(TRANSFORM_DURATION), yield wait(NEXT_STEP_DELAY)), yield this.go(t), this.trigger("next", { step: t }), this.isReady = !0 })) } goBack() { return __awaiter(this, void 0, void 0, (function*() { if (!this.isReady || !this.equation.isReady || this.currentStep <= 0) return; const t = this.currentStep - 1;
        this.isReady = !1, this.currentStep in this.backEvents && (yield this.backEvents[this.currentStep](this.equation), yield this.equation.animate()), this.$steps[this.currentStep].hasClass("new-row") && this.hideLastRow(), yield this.go(t), this.trigger("back", { step: t }), this.isReady = !0 })) } go(t) { return __awaiter(this, void 0, void 0, (function*() { this.$steps[t].show(); const e = this.$steps[t].height + "px";
        this.$steps[t].hide(), this.$legend.animate({ height: e }, 800).promise.then(() => this.$legend.css("height", "auto")); const s = this.currentStep;
        this.currentStep = t, this.trigger("step", t), yield this.$steps[s].exit("fade", 400).promise, this.$back.setClass("hide", t <= 0), this.$next.setClass("hide", t >= this.$steps.length - 1), yield this.$steps[t].enter("fade", 400).promise })) } };
  AlgebraFlow = __decorate([register("x-algebra-flow", { templateId: "#algebra-flow" })], AlgebraFlow);
  let Math$1 = class extends CustomElementView { ready() { let t = Array.from(this._el.children);
      this.removeChildren(); const e = $N("svg", { class: "equation" }, this),
        s = $N("g", { transform: "translate(2 0)" }, e),
        i = parseFloat(this.css("font-size")),
        n = this.parents(".text-center").length || this.hasClass("display"),
        r = new DisplayEquation(s, void 0, 0, "", i, !!n);
      r.setValue(this.attr("expr") || t), this.css({ width: s.width + 4 + "px", height: s.height + "px", "vertical-align": `-${s.height-r.root.baseline}px` }) } };
  Math$1 = __decorate([register("x-math")], Math$1);
  let Blank = class extends CustomElementView { constructor() { super(...arguments), this.done = !1 } ready() { this.$target = this.$(".target"); const t = this.$(".popup"),
        e = t.$$(".choice");
      this.solution = e[0].html, Random.shuffle(list(e.length)).forEach(s => { t.append(e[s]), e[s].on("click", () => { this.removeClass("on"), s ? (this.$target.html = e[s].html, this.addClass("invalid"), this.trigger("invalid")) : (this.solve(), this.trigger("valid", this.solution)) }) }); const s = this.$target.bounds.left + t.width > Browser.width - 15;
      this.setClass("left", s), hover(this, { enter: () => { if (this.done) return;
          this.addClass("on"); const e = this.$target.bounds,
            s = t.width,
            i = t.height,
            n = Browser.width - 10 - e.left,
            r = s < n,
            o = e.right - s > 10,
            a = e.top + e.height + i > Browser.height - 10;
          this.setClass("left", o && !r), this.setClass("top", a), t.css("max-width", o || r ? "none" : `${n}px`) }, exit: () => { this.removeClass("on") }, delay: 100, exitDelay: 400, $clickTarget: this.$target }) } solve(t = !1) { this.done = !0, this.$target.html = this.solution, this.removeClass("on invalid"), this.addClass("done"), this.trigger("solve", { solution: this.solution, restore: t }) } };

  function parseInput(t) { if (t.match("^[0-9]+/[0-9]+$")) { const e = t.split("/"); return +e[0] / +e[1] } return parseNumber(t) }

  function setInputPattern(t, e) { const s = isInteger(e) && e >= 0;
    Browser.isAndroid && s || Browser.isIOS && !s ? t.setAttr("type", "number") : Browser.isIOS && t.setAttr("pattern", "[0-9]*") } Blank = __decorate([register("x-blank", { templateId: "#blank" })], Blank);
  let BlankInput = class extends CustomElementView { constructor() { super(...arguments), this.solution = "", this.solutionNum = NaN, this.range = 0, this.input = "", this.attempts = 0, this.placeholder = "???", this.done = !1 } ready() { if (this.$input = this.$("input"), this.$target = this.$(".target"), this.solution = this.attr("solution"), this.solution.indexOf("±") >= 0) { const t = this.solution.split("±");
        this.solution = t[0].trim(), this.solutionNum = +this.solution, this.range = +t[1] } else this.solutionNum = parseInput(this.solution);
      this.removeAttr("solution"), setInputPattern(this.$input, this.solutionNum), this.hasAttr("placeholder") && (this.placeholder = this.attr("placeholder")), this.$input.setAttr("placeholder", this.placeholder), this.removeAttr("placeholder"), this.$input.change(t => { this.input = t, this.isCorrect && (this.solve(), this.trigger("valid", t), this.moveCursor()) }), this.$input.onKeyDown("enter", () => this.$input.blur()), this.$input.on("focus", () => { this.addClass("on"), this.removeClass("invalid"), this.$input.setAttr("placeholder", " ") }), this.$input.on("blur", () => { this.removeClass("on"), this.setClass("invalid", !!this.input && !this.done), this.$input.setAttr("placeholder", this.placeholder), this.input && !this.done && (this.attempts += 1, this.attempts >= 3 ? this.trigger("hint", this.solution) : this.trigger("invalid")) }) } get isCorrect() { if (this.done) return !0; const t = parseInput(this.input); return this.input.toLowerCase() === this.solution.toLowerCase() || (this.range && Math.abs(+this.input - this.solutionNum) <= this.range ? (this.solution = this.input, !0) : nearlyEquals(t, this.solutionNum) || toWord(t) === this.solution || this.input === toWord(this.solutionNum)) } moveCursor() { const t = this.getModel().$step; if (!t) return; const e = t.$blanks[t.$blanks.indexOf(this) + 1];
      e && !e.done && "X-BLANK" !== e.tagName && "hidden" !== e.css("visibility") && e.bounds.width && e.focus() } solve(t = !1) { this.done = !0, this.$input.remove(), this.$target.html = this.solution, this.addClass("done"), this.trigger("solve", { solution: this.solution, restore: t }) } focus() { this.$input.focus() } blur() { this.$input.blur() } };
  BlankInput = __decorate([register("x-blank-input", { templateId: "#blank-input" })], BlankInput);
  const FUNCTION_STEP = 2,
    GRID_SPACING = 80,
    GRID_STEPS = [5, 2, 1],
    TICK_LENGTH = 4,
    ANIMATION = 5e3;

  function getOrigin(t) { const e = t.xMin > 0 ? t.xMin : t.xMax < 0 ? t.xMax : 0,
      s = t.yMin > 0 ? t.yMin : t.yMax < 0 ? t.yMax : 0; return new Point(e, s) }

  function defaultSteps(t, e, s) { const i = (e - t) / s,
      n = Math.floor(Math.log10(i)),
      r = Math.pow(10, n),
      o = GRID_STEPS.find(t => r * t <= i) * r; return e = o * Math.ceil(e / o), [t = o * Math.floor(t / o), e, o] }

  function computeAxis(t, e, s) { let [i, n, r] = t, o = i ? +i : s[0], a = n ? +n : s[1]; if (o > 0 && (o = 0), a < 0 && (a = 0), nearlyEquals(o, a)) return [o - 2, a + 2, 1]; if (t[1] || (a += .01 * (a - o)), r) return [o, a, +r]; return defaultSteps(o, a, Math.floor(Math.abs(e) / GRID_SPACING)) }

  function getDataBounds(t) { return [Math.min(...t.map(t => Math.min(...t.map(t => t.y)))), Math.max(...t.map(t => Math.max(...t.map(t => t.y))))] }
  let CoordinateSystem = class extends CustomElementView { constructor() { super(...arguments), this.mathBounds = new Bounds(-5, 5, 0, 10), this.plotOrigin = new Point(0, 0), this.animated = this.hasAttr("animate"), this.noLabels = this.hasAttr("no-labels"), this.xLabel = this.attr("x-label"), this.yLabel = this.attr("y-label"), this.crosshairGrid = 10, this.getCrosshairPosn = t => t } ready() { const t = +this.attr("width") || 600,
        e = +this.attr("height") || 400;
      this.css("width", t + "px"); const s = this.$("svg");
      s.setAttr("width", t), s.setAttr("height", e), s.setAttr("viewBox", `0 0 ${t} ${e}`), this.$grid = $N("g", { class: "grid" }, s), this.$xAxis = $N("line", { class: "axis" }, s), this.$yAxis = $N("line", { class: "axis" }, s), this.$plot = $N("g", { class: "plot" }, s), this.$labels = $N("g", { class: "labels" }, s), this.$overlay = $N("g", {}, s); const i = this.hasAttr("margins") ? words(this.attr("margins")) : [20, 20, 20, 20]; if (this.plotBounds = new Bounds(+i[3], t - +i[1], e - +i[2], +i[0]), this.xAxisOptions = this.attr("x-axis").split("|"), this.yAxisOptions = this.attr("y-axis").split("|"), this.xSuffix = this.attr("x-suffix"), this.ySuffix = this.attr("y-suffix"), this.animated = this.hasAttr("animate"), this.noLabels = this.hasAttr("no-labels"), this.xLabel = this.attr("x-label"), this.yLabel = this.attr("y-label"), this.hasAttr("fns")) { const t = this.attr("fns").split("|").map(t => Expression.parse(t, !0)).map(t => e => t.evaluate({ x: e }));
        this.setFunctions(...t) } this.hasAttr("crosshair-grid") && (this.crosshairGrid = +this.attr("crosshair-grid")), this.hasAttr("no-crosshairs") || this.setupCrosshairs(s, t) } setupCrosshairs(t, e) { const s = $N("g", { class: "crosshair" }, t),
        i = $N("path", {}, s),
        n = $N("circle", { r: 4 }, s),
        r = $N("text", {}, s); let o = new Point(0, 0); const a = s => { const a = this.plotToMathCoords(svgPointerPosn(s, t)),
          h = this.getCrosshairPosn(a); if (h.equals(o)) return;
        o = h; const l = this.mathToPlotCoords(h);
        n.setCenter(l), i.points = [new Point(this.plotOrigin.x, l.y), l, new Point(l.x, this.plotOrigin.y)], r.text = `(${numberFormat(h.x,5,!1)}, ${numberFormat(h.y,5,!1)})`; const c = r.width;
        r.setAttr("x", l.x + 8 + c < e ? l.x + 5 : l.x - c - 5), r.setAttr("y", l.y > 20 ? l.y - 7 : l.y + 18) };
      t.on("touchstart mouseover", t => { s.show(), a(t) }, { passive: !0 }), t.on("touchend mouseout", () => s.hide(), { passive: !0 }), t.on("pointermove", a) } mathToPlotCoords(t) { return t.changeCoordinates(this.mathBounds, this.plotBounds) } plotToMathCoords(t) { return t.changeCoordinates(this.plotBounds, this.mathBounds) } setPoints(t, e = 1) { const s = t.map((t, s) => new Point(s + e, t));
      this.setSeries(s) } setSeries(...t) { const [e, s, i] = computeAxis(this.xAxisOptions, this.plotBounds.dx, [0, Math.max(...t.map(t => last(t).x))]);
      this.mathBounds.xMin = e, this.mathBounds.xMax = s; const [n, r, o] = computeAxis(this.yAxisOptions, this.plotBounds.dy, getDataBounds(t));
      this.mathBounds.yMin = n, this.mathBounds.yMax = r, this.drawAxes(i, o), this.$plot.removeChildren(); for (let e of t) this.drawLinePlot(e);
      this.getCrosshairPosn = e => t[0].reduce((t, s) => Math.abs(s.x - e.x) <= Math.abs(t.x - e.x) ? s : t) } setFunctions(...t) { const [e, s, i] = computeAxis(this.xAxisOptions, this.plotBounds.dx, [-5, 5]);
      this.mathBounds.xMin = e, this.mathBounds.xMax = s; const n = t.map(() => []); for (let e = this.plotBounds.xMin; e < this.plotBounds.xMax; e += FUNCTION_STEP) { let s = this.plotToMathCoords(new Point(e, 0)).x; for (let e = 0; e < t.length; ++e) n[e].push(new Point(s, t[e](s))) } const [r, o, a] = computeAxis(this.yAxisOptions, this.plotBounds.dy, getDataBounds(n));
      this.mathBounds.yMin = r, this.mathBounds.yMax = o, this.drawAxes(i, a), this.$plot.removeChildren(); for (let t of n) this.drawLinePlot(t);
      this.getCrosshairPosn = n => { const r = roundTo(clamp(n.x, e, s), i / this.crosshairGrid); return new Point(round(r, 3), t[0](r)) } } drawAxes(t, e) { const [s, i] = [this.mathBounds, this.plotBounds], n = getOrigin(this.mathBounds);
      this.plotOrigin = this.mathToPlotCoords(n), this.$xAxis.setLine({ x: i.xMin, y: this.plotOrigin.y }, { x: i.xMax, y: this.plotOrigin.y }), this.$yAxis.setLine({ x: this.plotOrigin.x, y: i.yMin }, { x: this.plotOrigin.x, y: i.yMax }), this.$grid.removeChildren(), this.$labels.removeChildren(), this.xLabel && $N("text", { text: this.xLabel, x: this.plotBounds.xMax - 2, y: this.plotOrigin.y - 12, "text-anchor": "end" }, this.$labels), this.yLabel && $N("text", { text: this.yLabel, x: this.plotOrigin.x + 10, y: this.plotBounds.yMax + 5 }, this.$labels); for (let e = s.xMin + t; e < s.xMax; e += t) { if (e === n.x) continue; const t = this.mathToPlotCoords(new Point(e, 0)).x;
        $N("line", { x1: t, y1: i.yMin, x2: t, y2: i.yMax }, this.$grid), this.noLabels || ($N("text", { text: numberFormat(e, 4) + this.xSuffix, x: t, y: this.plotOrigin.y + 18, "text-anchor": "middle" }, this.$labels), $N("line", { class: "tick", x1: t, y1: this.plotOrigin.y, x2: t, y2: this.plotOrigin.y + TICK_LENGTH }, this.$grid)) } for (let t = s.yMin + e; t < s.yMax; t += e) { if (t === n.y) continue; const e = this.mathToPlotCoords(new Point(0, t)).y;
        $N("line", { x1: i.xMin, y1: e, x2: i.xMax, y2: e }, this.$grid), this.noLabels || ($N("text", { text: numberFormat(t, 4) + this.ySuffix, x: this.plotOrigin.x - 8, y: e + 4, "text-anchor": "end" }, this.$labels), $N("line", { class: "tick", x1: this.plotOrigin.x, y1: e, x2: this.plotOrigin.x - TICK_LENGTH, y2: e }, this.$grid)) } this.noLabels || (0 !== s.xMin || 0 !== s.yMin || this.ySuffix || this.ySuffix ? 0 === s.yMin ? $N("text", { text: numberFormat(n.x, 4) + this.xSuffix, x: this.plotOrigin.x, y: this.plotOrigin.y + 18, "text-anchor": "middle" }, this.$labels) : $N("text", { text: numberFormat(n.y, 4) + this.ySuffix, x: this.plotOrigin.x - 8, y: this.plotOrigin.y + 4, "text-anchor": "end" }, this.$labels) : $N("text", { text: 0, x: this.plotOrigin.x - 5, y: this.plotOrigin.y + 15, "text-anchor": "end" }, this.$labels)) } drawLinePlot(t) { const e = $N("g", {}, this.$plot),
        s = $N("path", {}, e),
        i = this.mathBounds,
        n = (t = t.filter(t => t.y >= i.yMin && t.y <= i.yMax)).map(t => this.mathToPlotCoords(t));
      this.animated ? animate(e => { const r = i.xMin + e * (i.xMax - i.xMin),
          o = t.findIndex(t => t.x > r);
        s.points = n.slice(0, o) }, ANIMATION) : s.points = n } drawPoints(t) { const e = $N("g", {}, this.$plot),
        s = this.mathBounds; for (let i of t) { const t = this.mathToPlotCoords(i),
          n = $N("circle", { r: 4, cx: t.x, cy: t.y }, e); if (this.animated) { n.hide(); const t = ANIMATION * (i.x - s.xMin) / (s.xMax - s.xMin);
          setTimeout(() => n.show(), t) } } } };
  CoordinateSystem = __decorate([register("x-coordinate-system", { templateId: "#coordinate-system" })], CoordinateSystem);
  const keys = KEY_CODES;

  function goLeft(t) { const e = t.prev;
    e && isOneOf(e.tagName, "MO", "MI", "MN") ? e.insertBefore(t) : e ? last(e.children).append(t) : t.parent.hasClass("math") || (t.parent.prev ? t.parent.prev.append(t) : t.parent.parent.insertBefore(t)) }

  function goRight(t) { const e = t.next; if (e && isOneOf(e.tagName, "MO", "MI", "MN")) return e.insertAfter(t);
    e ? e.children[0].prepend(t) : t.parent.hasClass("math") || (t.parent.next ? t.parent.next.prepend(t) : t.parent.parent.insertAfter(t)) }

  function goUp(t) { let e = t.parent; for (;
      "MFRAC" !== e.parent.tagName || !e.prev;) { if (e.hasClass("math")) return;
      e = e.parent } e.prev.append(t) }

  function goDown(t) { let e = t.parent; for (;
      "MFRAC" !== e.parent.tagName || !e.next;) { if (e.hasClass("math")) return;
      e = e.parent } e.next.prepend(t) }

  function backspace(t) { const e = t.prev,
      s = t.parent; if (e && isOneOf(e.tagName, "MO", "MI", "MN")) e.remove(), s.children.length <= 1 && s.addClass("empty");
    else if (e || s.prev || s.hasClass("math")) goLeft(t);
    else { const e = s.parent;
      e.insertBefore(t); for (let t of e.children)
        for (let s of t.children) e.insertBefore(s);
      e.remove(), t.parent.children.length <= 1 && t.parent.addClass("empty") } }

  function insertText(t, e) { e.insertBefore(t), e.parent.removeClass("empty"), t.children.length && t.children[0].append(e) }

  function type(t, e) { "abcdefghijklmnopqrstuvwxyzπ".includes(e) ? insertText($N("mi", { text: e }), t) : "0123456789.".includes(e) ? insertText($N("mn", { text: e }), t) : "+−±×÷<>≤≥=%!".includes(e) ? insertText($N("mo", { text: e, value: e }), t) : "frac" === e ? insertText($N("mfrac", { html: '<mrow class="empty"></mrow><mrow class="empty"></mrow>' }), t) : "sqrt" === e ? insertText($N("msqrt", { html: '<mrow class="empty"></mrow>' }), t) : isOneOf(e, "^", "sup") ? insertText($N("msup", { html: '<mrow class="empty"></mrow>' }), t) : "brackets" === e || "([{|".includes(e) ? insertText($N("mfenced", { html: '<mrow class="empty"></mrow>', type: "(" }), t) : ")]}".includes(e) && (t.next || "MFENCED" !== t.parent.parent.tagName || t.parent.parent.insertAfter(t)) }

  function cleanGroups(t, e) { const s = t.$$(`${e}:first-child, *:not(${e}) + ${e}`); for (let t of s)
      if ("MFRAC" !== t.parent.tagName)
        for (; t.next && t.next.tagName === e.toUpperCase();) t.text += t.next.text, t.next.remove() }
  const DEFAULT_ERROR = "This is not a valid mathematical expression.",
    PLACEHOLDERS_ERROR = "Fill in all empty placeholders in the expression.",
    FN_NAMES = { "+": "addition", "×": "multiplication", "/": "fractions or division", "−": "subtraction", sqrt: "square roots", "^": "powers" };

  function toString(t, e) { if (t instanceof Text) return t.textContent || ""; if (t.hasClass("cursor")) return ""; const s = t.childNodes; return "MI" === t.tagName ? t.text + (e ? " " : "") : "MFENCED" === t.tagName ? "(" + toString(s[0], e) + ")" : "MSUP" === t.tagName ? "^(" + toString(s[0], e) + ")" : "MFRAC" === t.tagName ? `(${toString(s[0],e)})/(${toString(s[1],e)})` : "MSQRT" === t.tagName ? "sqrt(" + toString(s[0], e) + ")" : s.map(t => toString(t, e)).join("") }

  function parseInput$1(t) { try { return { expr: Expression.parse(t, !0) } } catch (t) { return { error: t instanceof ExprError ? t.message : DEFAULT_ERROR } } }

  function checkVariables(t, e, s) { const i = t.variables; if (e.length) { const t = i.find(t => !e.includes(t)); if (t) { const i = autoCorrect(t, s || e); return i ? `Did you mean “<em>${i}</em>” instead of “<em>${t}</em>”?` : `There shouldn’t be a variable called “<em>${t}</em>”.` } const n = e.find(t => !i.includes(t)); if (n) return `Your expression should contain “<em>${n}</em>”.` } }

  function checkFunctions(t, e) { if (e.length) { const s = t.functions.find(t => !e.includes(t)); if (s) { return `This expression should not contain ${FN_NAMES[s]||"“"+s+"”"}.` } } }

  function checkNumeric(t, e, s = .001) { try { return nearlyEquals(t.evaluate(), e.evaluate(), s) } catch (t) { return !1 } }
  let Equation = class extends CustomElementView { constructor() { super(...arguments), this.isDone = !1, this.shortVar = !1, this.lastAttempt = "", this.errorCount = 0, this.hints = [], this.fns = [], this.validate = void 0 } ready() { if (this.$math = this.$(".math"), this.$textarea = this.$("textarea"), this.$cursor = this.$(".cursor"), this.$error = this.$(".error-message"), this.$step = this.getModel().$step, this.solution = Expression.parse(this.attr("solution")), this.hasAttr("numeric") && (this.numeric = +this.attr("precision") || .01), this.vars = this.hasAttr("vars") ? words(this.attr("vars")) : this.solution ? this.solution.variables : [], this.hasAttr("fns") && (this.fns = words(this.attr("fns"))), this.solution && this.fns.push(...this.solution.functions), this.fns.includes("/") && !this.fns.includes("×") && this.fns.push("×"), this.hasAttr("hints") && (this.hints = words(this.attr("hints"))), this.hasAttr("substitutions")) { this.substitutions = {}, this.autocomplete = this.vars.slice(0); for (let t of this.attr("substitutions").split("|"))
          if (t.trim()) { const [e, s] = t.split(":");
            this.autocomplete.push(e.trim()), this.substitutions[e.trim()] = Expression.parse(s) } } for (let t of ["solution", "precision", "vars", "fns", "vars-required", "substitutions"]) this.removeAttr(t);
      this.shortVar = this.hasAttr("short-var"); const t = words(this.attr("keys") || "+ − × ÷ frac sup sqrt brackets"),
        e = this.$(".keys"); for (let s of e.children) t.includes(s.data.type) ? (s.on("pointerdown", t => t.preventDefault()), s.on("pointerup", () => { type(this.$cursor, s.data.type), this.check() })) : s.remove();
      this.on("pointerdown", t => this.onPointerdown(t)), this.$textarea.on("blur", () => this.onBlur()), this.$textarea.on("key", t => this.onKey(t)) } focus() { this.trigger("pointerdown") } onPointerdown(t) { if (this.isDone) return;
      t.preventDefault && t.preventDefault(), this.addClass("active"), this.$textarea.focus(); const e = t.target ? $(t.target) : this; if ("X-EQUATION" === e.tagName || e.hasClass("math")) { const e = total(this.$math.children.map(t => t.outerWidth)) / 2;
        pointerPosition(t).x < this.$math.bounds.left + e ? this.$math.prepend(this.$cursor) : this.$math.append(this.$cursor) } else if ("M" === e.tagName[0]) { const s = pointerPosition(t).x < e.boxCenter.x; "MROW" === e.tagName ? s ? e.prepend(this.$cursor) : e.append(this.$cursor) : s ? e.insertBefore(this.$cursor) : e.insertAfter(this.$cursor) } } onKey(t) { if (isOneOf(t.code, keys.enter, keys.escape)) this.$textarea.blur();
      else if (t.code === keys.left) goLeft(this.$cursor);
      else if (t.code === keys.right) goRight(this.$cursor);
      else if (t.code === keys.up) goUp(this.$cursor);
      else if (t.code === keys.down) goDown(this.$cursor);
      else if (isOneOf(t.code, keys.backspace, keys.delete)) backspace(this.$cursor), this.check();
      else { let e = t.key.replace("*", "×").replace("/", "÷").replace("-", "−");
        type(this.$cursor, e), this.check() } } onBlur() { if (this.isDone) return; if (!this.value) return this.removeClass("active has-error"); if (this.removeClass("active"), this.addClass("has-error"), this.value === this.lastAttempt) return; if (this.lastAttempt = this.value, !this.$step) return; const t = this.error || (this.hints || []).shift() || "incorrect",
        e = this.$step.addHint(t, { class: "incorrect" });
      this.$error.html = e.text, this.errorCount += 1, this.trigger("error", { count: this.errorCount, msg: t }), this.errorCount >= 5 && this.$step.addHint(`Hmmm… maybe try ${this.solution.toMathML()}?`) } check() { if (this.error = void 0, this.value = toString(this.$math, this.shortVar).trim(), !this.value) return; if (this.$math.$(".empty")) return this.error = PLACEHOLDERS_ERROR; const t = parseInput$1(this.value); if (t.error) return this.error = t.error; const e = this.substitutions ? t.expr.substitute(this.substitutions) : t.expr; if (this.numeric && checkNumeric(this.solution, e, this.numeric)) return this.solve(); if (this.solution && Expression.numEquals(this.solution, e)) return this.complete(t.expr); const s = checkVariables(e, this.vars, this.autocomplete); if (s) return this.error = s; if (this.validate) { const e = this.validate(t.expr) || {}; if (e.isCorrect) return this.complete(t.expr); if (e.error) return this.error = e.error } const i = checkFunctions(e, this.fns); return i ? this.error = i : void 0 } complete(t) { this.isDone || (this.isDone = !0, this.removeClass("has-error active"), this.addClass("done"), this.$textarea.blur(), this.shortVar || cleanGroups(this.$math, "mi"), cleanGroups(this.$math, "mn"), this.trigger("solve", { expr: t })) } solve() { this.$math.removeClass("empty"), this.$math.html = this.solution.toMathML(), this.complete(this.solution) } };
  Equation = __decorate([register("x-equation", { templateId: "#equation" })], Equation);
  const KEYFRAMES = { opacity: [0, 1], transform: ["translateX(-50px)", "none"] },
    REPEAT_ERROR = { error: "You’ve already had this expression before. Try simplifying it." },
    SOLUTION = "You have to fully simplify this expression. The correct solution is $0.";
  let EquationSystem = class extends CustomElementView { constructor() { super(...arguments), this.rowCount = 1, this.previousAnswers = [], this.isSolved = !1, this.maxRows = 6, this.steps = [], this.hints = [] } created() { this.$table = this.$("table tbody"), this.lastRowContent = this.$table.$("tr:last-child").html } ready() { this.hasAttr("max-rows") && (this.maxRows = +this.attr("max-rows")), this.hasAttr("steps") && (this.steps = this.attr("steps").split("|")), this.hasAttr("hints") && (this.hints = this.attr("hints").split("|")), this.removeAttr("steps"), this.removeAttr("hints"), this.setupEquation(this.$("x-equation")) } setupEquation(t) { this.$equation = t, t.one("solve", t => this.onSolveRow(t.expr)), t.hints = this.hints, t.validate = t => this.previousAnswers.includes(t.toString()) ? REPEAT_ERROR : this.validate ? this.validate(t) : {} } onSolveRow(t) { if (this.trigger("solve-row", { expr: t, $math: this.$equation.$math }), this.isFinal && this.isFinal(t)) return this.trigger("solve"); if (this.isSolved) return; if (this.rowCount += 1, this.previousAnswers.push(t.toString()), this.rowCount > this.maxRows) { const t = this.$equation.solution.toMathML();
        this.trigger("hint", SOLUTION.replace("$0", t)), this.trigger("solve") } const e = $N("tr", { html: this.lastRowContent }, this.$table);
      e.animate(KEYFRAMES, 400, 500), this.setupEquation(e.$("x-equation")), setTimeout(() => this.$equation.focus(), 1200) } solve() { if (this.isSolved = !0, this.steps.length) { const t = this.$table.$("tr:last-child"),
          e = this.lastRowContent.replace(/<x-equation.*<\/x-equation>/, '<div class="math"></div>'); for (let s of this.steps) { const i = $N("tr", { html: e }, this.$table),
            n = i.$(".math"),
            r = Expression.parse(s);
          n.html = r.toMathML(), t.insertBefore(i), this.trigger("solve-row", { expr: r, $math: n }) } } this.$equation.solve() } };
  EquationSystem = __decorate([register("x-equation-system")], EquationSystem);
  let Gallery = class extends CustomElementView { ready() { const t = this.$(".wrapper"),
        e = this.$(".panel"),
        s = e.children,
        i = this.$(".next"),
        n = this.$(".back"),
        r = this.$(".dots"),
        o = s.map(() => $N("div", { class: "dot" }, r)); let a = s.length,
        h = +this.attr("slide-width") || void 0,
        l = this.width,
        c = 1,
        d = l,
        u = 0,
        p = 0; const f = t => { p = t, e.translate(t, 0), this.trigger("move", t) },
        g = t => { u = t; for (const [e, s] of o.entries()) s.setClass("on", e >= t && e < t + c);
          i.setClass("disabled", t === a - c), n.setClass("disabled", 0 === t), this.trigger("change", t) };
      Browser.onResize(() => { l = this.width, c = h ? Math.ceil(l / h) : 1, d = l / c; for (const t of s) t.css("width", d + "px");
        e.css("width", a * d + "px"), f(-u * d), g(u) }); let m, w, y, x, $, v, b, E, S = "quad",
        T = 500,
        C = !1;

      function M() {!C && m < T && requestAnimationFrame(M), m = Date.now() - x, f(w + y * ease(S, m / T)) }

      function P(t) { C = !1, m = 0, w = p, y = -t * d - p, x = Date.now(), g(t), M() } i.on("click", (function() { S = "quad", u < a - c && P(u + 1) })), n.on("click", (function() { S = "quad", u > 0 && P(u - 1) })), slide(t, { start: t => { C = !0, $ = p, v = t.x, E = b = v }, move: t => { b = E, E = t.x; let e = $ - v + t.x,
            s = -(a - c) * d;
          f(e > 0 ? e / 4 : e < s ? s + (e - s) / 4 : e), this.css("pointer-events", "none") }, end: () => { let t = E - b,
            e = t > 12 ? 1 : t < -12 ? -1 : 0;
          S = "quad-out", P(clamp(Math.round(-p / d - e), 0, a - c)), setTimeout(() => this.css("pointer-events", "auto")) } }) } };
  Gallery = __decorate([register("x-gallery", { templateId: "#gallery" })], Gallery);
  let Gameplay = class extends CustomElementView { constructor() { super(...arguments), this.history = [], this.playing = !1, this.completed = !1, this.slideGenerator = () => {} } ready() { this.addClass("paused"); const t = this.$(".slide-template");
      this.slideTemplate = t.html, t.remove(), this.time = +this.attr("time") || 8e3, this.goal = (this.attr("goal") || "6/8").split("/").map(t => +t), this.$progress = this.$(".progress"), this.$dots = this.$(".dots"), this.$dots.css("margin-left", -8 * this.goal[1] + "px"); for (let t = 0; t < this.goal[1]; ++t) $N("div", { class: "dot" }, this.$dots);
      this.$(".toggle").on("click", () => { this[this.playing ? "pause" : "play"]() }) } score(t) { if (this.$dots.children[this.history.length].addClass(t ? "green" : "red"), this.history.push(t), !this.completed && total(this.history) >= this.goal[0]) return this.completed = !0, this.$("x-solved").enter(), this.trigger("score"), this.pause(), !0 } makeSlide() { if (!this.playing) return; if (this.history.length >= this.goal[1]) { this.history.shift(), this.$dots.animate({ transform: ["none", "translateX(-16px)"] }, 300).promise.then(() => this.$dots.css("transform", "none")); let t = this.$dots.children[0];
        t.exit("fade", 300).promise.then(() => t.remove()), $N("div", { class: "dot" }, this.$dots).enter("fade", 300) } if (this.$currentSlide) { let t = this.$currentSlide;
        t.animate({ transform: ["none", "translateX(-100%)"] }, 400).promise.then(() => { t.remove() }) } let t = $N("div", { class: "slide", html: this.slideTemplate }, this);
      t.animate({ transform: ["translateX(100%)", "none"] }, 400); let e = this.time * (1 - total(this.history) / this.goal[1] / 2),
        s = this.$progress.animate({ width: ["100%", "0%"] }, e, 400, "linear"); const i = e => { t.addClass("done"); let i = this.score(e);
        s.cancel(), i || setTimeout(() => this.makeSlide(), 1e3) };

      function n(e) { t.trigger("error", e), i(0) } s.promise.then(n), this.$currentSlide = t, this.currentAnimation = s, this.slideGenerator(t, (function(e) { t.trigger("success", e), i(1) }), n) } setFirstSlide(t) { this.$currentSlide = $N("div", { class: "slide", html: this.slideTemplate }, this), t(this.$currentSlide) } play() { this.playing || (this.playing = !0, this.removeClass("paused"), this.makeSlide(), this.$("x-solved").hide()) } pause() { this.playing && (this.playing = !1, this.currentAnimation && this.currentAnimation.cancel(), this.addClass("paused")) } };

  function makeLabel(t, e, s) { const i = t.hasClass("fill") || t.hasClass("move"),
      n = s || t.attr("label-colour"); return $N("text", { target: t.attr("target") || "", class: t.attr("class") || "", "data-when": t.data.when, fill: n || t.css(i ? "fill" : "stroke") }, e.$labels) }

  function labelOverlap(t, e, s, i) { const n = new Rectangle(new Point(-10, -20), 20, 23).rotate(s),
      r = e.paths.filter(e => e.tVal && e.tVal !== t); return i.find(t => r.every(e => !intersections(n.translate(t), e.tVal).length)) || i[0] }

  function labelPosn(t, e, s) { if (isLineLike(t)) { let i = t.perpendicularVector,
        n = t.angle;
      i.y >= 0 && (i = i.scale(-1), n += Math.PI); const r = []; for (let e of [.5, .35, .65])
        for (let s of [-15, 5]) r.push(t.at(e).add(i.scale(s))); let o = labelOverlap(t, s, n, r); return e.hasAttr("mark") && (o = o.add(t.unitVector.scale(12))), [o, n] } if ("arc" === t.type) { const e = new Line((t = t).start, t.end),
        s = e.perpendicularVector.y >= 0,
        i = e.angle + (s ? Math.PI : 0); return [t.at(.5).add(e.perpendicularVector.scale(s ? 14 : 5)), i] } if ("angle" === t.type) { t = t; const s = (+e.attr("size") || angleSize(t, { round: e.hasAttr("round") })) + 8; return [t.b.add(t.bisector.unitVector.scale(s + 5)).shift(0, 3)] } if ("point" === t.type) { t = t; const i = e.hasClass("move") ? 10 : 8,
        n = [t.shift(i, -i), t.shift(-i, -i), t.shift(i, 10 + i), t.shift(-i, 10 + i)]; return [labelOverlap(t, s, 0, n)] } return isOneOf(t.type, "polygon", "polyline") ? [(t = t).centroid.shift(0, 5)] : "sector" === t.type ? [(t = t).at(.5).subtract(t.c).scale(.6).add(t.c).shift(0, 5)] : "circle" === t.type ? [(t = t).c.shift(0, 5)] : [] } Gameplay = __decorate([register("x-gameplay", { templateId: "#gameplay" })], Gameplay);
  class GeoElement { constructor(t, e, s, i) { this.$geopad = t, this.removed = !1, this.pending = !1, this.x = e, this.name = i || t.model.name(), this.$el = s || this.makeEl(), t.elements.set(this.name, this), this.$el.hasAttr("label") && this.setLabel(this.$el.attr("label")), this.val = e(t.model), this.val && t.model.set(this.name, this.val), t.model.watch(t => { this.removed || (this.val = this.x(t), this.$el.setClass("hidden", !this.val), (this.val || this.name in t) && (t[this.name] = this.val), this.val && (this.update(this.tVal), this.$label && this.updateLabel(t, this.tVal))) }) } get tVal() { return this.$geopad.hasGrid && this.val ? this.val.transform(this.$geopad.gridTransform) : this.val } setLabel(t, e, s) { this.$label || (this.$label = makeLabel(this.$el, this.$geopad, e)), this.labelStr = parse(t), s && (this.labelPosition = parse(s, !1)) } updateLabel(t, e) { if (this.$label.text = this.labelStr(t) || "", this.labelPosition) this.$label.setTransform(this.labelPosition(t).shift(0, 5));
      else { const [t, s] = labelPosn(e, this.$el, this.$geopad);
        this.$label.setTransform(t, s) } } remove(t = 400) { this.$label && this.$label.exit(), this.exit(t).promise.then(() => { this.$geopad.elements.delete(this.name), this.removed = !0 }) } } class GeoPath extends GeoElement { constructor() { super(...arguments), this.points = [] } update(t) { try { this.$el.draw(t, { box: this.$geopad.box }) } catch (t) { this.$el.setAttr("d", "") } } makeEl() { return $N("path", {}, this.$geopad.$paths) } exit(t = 400) { return this.$el.exit("draw", t) } } class GeoPoint extends GeoElement { makeEl() { return $N("circle", { r: 4 }, this.$geopad.$points) } exit(t) { return this.$el.exit("pop", t) } update(t) { this.$el.setCenter(t), this.$halo && this.$halo.setCenter(t) } addHalo() { this.$halo = $N("circle", { class: "halo", r: 18 }, this.$geopad.$pulses), this.$halo.setCenter(this.$el.center), this.$halo.enter("pop") } removeHalo() { return __awaiter(this, void 0, void 0, (function*() { this.$halo && (yield this.$halo.exit("pop").promise, this.$halo.remove(), this.$halo = void 0) })) } } class GeoMovablePoint extends GeoPoint { constructor(t, e, s, i, n) { let r = !0;
      super(t, t => { const s = r ? e : t[this.name],
          i = r ? n : this.projection; return i ? i(t).project(s) : s }, s, i), r = !1, this.$el.hasClass("pulsate") && this.pulsate(), this.projection = n, this.locked = !1 } project(t) { this.projection = t, this.$geopad.model.update() } pulsate() { this.$pulse = $N("circle", { class: "pulse", r: 8 }, this.$geopad.$pulses), this.$pulse.setCenter(this.$el.center), this.$el.one("mouseover pointerdown", () => this.$pulse.remove()) } lock() { this.$el.removeClass("move"), this.$el.setAttr("r", 4), this.locked = !0 } makeEl() { return $N("circle", { class: "move", r: 8 }, this.$geopad.noPoints ? void 0 : this.$geopad.$points) } } class GeoTool { constructor(t) { this.$geopad = t } start(t, e) {} move(t, e) {} end(t, e) {} click(t, e) {} cancel() {} addMovablePoint(t) { const e = new GeoMovablePoint(this.$geopad, t); return this.$geopad.trigger("add:point", e), e } } class MoveTool extends GeoTool { start(t) { t && t instanceof GeoMovablePoint && !t.locked && (this.startPoint = t) } move(t, e) { this.startPoint && !this.startPoint.val.equals(e) && this.$geopad.model.set(this.startPoint.name, e) } end() { this.startPoint = void 0, this.$geopad.trigger("moveEnd", this.startPoint) } } class PointTool extends MoveTool { click(t, e) { t || this.addMovablePoint(e) } } class DrawTool extends GeoTool { constructor() { super(...arguments), this.clicked = !1 } start(t, e) { if (this.pending) return;
      this.startPoint = t || this.addMovablePoint(e), this.endPosn = this.startPoint.val;
      this.pending = new GeoPath(this.$geopad, () => this.path(this.startPoint.val, this.endPosn)), this.pending.$el.addClass("thin"), this.pending.pending = !0, this.$geopad.trigger("begin:path", this.pending) } move(t, e) { this.pending && (this.endPosn = t ? t.val : e, this.$geopad.model.update()) } end(t, e) { if (!this.pending) return; if (t === this.startPoint) return this.cancel(); const s = this.pending;
      s.points = [this.startPoint, t || this.addMovablePoint(e)], s.$el.removeClass("thin"), s.x = () => this.path(s.points[0].val, s.points[1].val), s.pending = !1, this.$geopad.model.update(), this.$geopad.trigger("add:path", s), this.startPoint = this.endPosn = this.pending = void 0, this.clicked = !1 } click(t, e) { if (this.pending) return this.clicked ? void this.end(t, e) : this.clicked = !0 } hover(t, e) { this.pending && this.move(t, e) } cancel() { this.pending && this.pending.remove(), this.startPoint = this.endPosn = this.pending = void 0, this.clicked = !1 } } class LineTool extends DrawTool { path(t, e) { return new Segment(t, e) } } class CircleTool extends DrawTool { path(t, e) { const s = Point.distance(t, e); return new Circle(t, s) } } class RectangleTool extends DrawTool { path(t, e) { return new Rectangle(t, e.x - t.x, e.y - t.y) } } class PerpBisectorTool extends DrawTool { path(t, e) { return new Segment(t, e).perpendicularBisector } } class AngleBisectorTool extends GeoTool { click(t, e) { if (t || (t = this.addMovablePoint(e)), this.startPoint)
        if (this.secondPoint) { this.pending.$el.removeClass("thin"); const e = this.startPoint,
            s = this.secondPoint;
          this.pending.x = () => new Angle(e.val, s.val, t.val).bisector, this.$geopad.model.update(), this.$geopad.trigger("add:path", this.pending), e.removeHalo(), s.removeHalo(), this.startPoint = this.secondPoint = this.endPosn = this.pending = void 0 } else { this.secondPoint = t, t.addHalo(), this.endPosn = t.val; const e = () => new Angle(this.startPoint.val, this.secondPoint.val, this.endPosn).bisector;
          this.pending = new GeoPath(this.$geopad, e), this.$geopad.trigger("begin:path", this.pending) } else this.startPoint = t, t.addHalo() } hover(t, e) { this.pending && (this.endPosn = t ? t.val : e, this.$geopad.model.update()) } cancel() { this.startPoint && this.startPoint.removeHalo(), this.secondPoint && this.secondPoint.removeHalo(), this.pending && this.pending.remove(), this.startPoint = this.endPosn = this.pending = void 0 } }
  const COMPASS = "M100,50h0l-5.2-4.9L52.6,10.2v-9C52.6.6,51.4,0,50,0s-2.6.6-2.6,1.2v9L5.2,45.1,0,50H0l6.6-3L35,25.9H65L93.4,47ZM38.4,23.5,50,14.8l11.6,8.7Z",
    RULER = "M0,0V8H100V0ZM7,6A2,2,0,1,1,9,4,2,2,0,0,1,7,6Z",
    MODEL_FUNCTIONS = { pi: Math.PI, point: (t, e) => new Point(t, e), angle: (t, e, s) => new Angle(t, e, s), line: (t, e) => new Line(t, e), ray: (t, e) => new Ray(t, e), segment: (t, e) => new Segment(t, e), circle: (t, e) => new Circle(t, e), arc: (t, e, s) => new Arc(t, e, s), sector: (t, e, s) => new Sector(t, e, s), polygon: (...t) => new Polygon(...t), polyline: (...t) => new Polyline(...t), triangle: (t, e, s) => new Triangle(t, e, s), rectangle: (t, e, s) => new Rectangle(t, e, s), distance: Point.distance, round: (t, e = 0) => round(t, e), sqrt: t => Math.sqrt(t), intersections: intersections };

  function getToolTransform(t, e, s, i) { return `translate(${t.x}px, ${t.y-e}px) scale(${i/100}) rotate(${s}rad)` }
  let Geopad = class extends CustomElementView { constructor() { super(...arguments), this.elements = new Map, this.hasGrid = !1, this.gridTransform = [
        [1, 0, 0],
        [0, 1, 0]
      ], this.gridTransformInverse = [
        [1, 0, 0],
        [0, 1, 0]
      ] } ready() { const t = +this.attr("width") || this.width,
        e = +this.attr("height") || +this.attr("width") || this.height;
      this.box = new Rectangle(new Point(0, 0), t, e), this.css({ width: t + "px", height: e + "px" }), this.hasClass("sticky") && this.css("top", `calc(50vh - ${e/2}px)`), this.$svg = this.children.filter(t => "SVG" === t.tagName)[0], this.model = this.getModel(), this.model.assign(MODEL_FUNCTIONS), this.findIntersections = this.hasAttr("intersect"), this.noPoints = this.hasAttr("no-points"), this.model.watch(() => this.cachedIntersections = void 0); const s = +this.attr("grid"); if (s) { this.hasGrid = !0, this.gridTransformInverse = [
          [1 / s, 0, -.5],
          [0, 1 / s, -.5]
        ], this.gridTransform = [
          [s, 0, s / 2],
          [0, s, s / 2]
        ]; const i = $N("g", { class: "grid" }, this.$svg); for (let n = s / 2; n < t; n += s) $N("line", { x1: n, x2: n, y1: 0, y2: e }, i); for (let n = s / 2; n < e; n += s) $N("line", { x1: 0, x2: t, y1: n, y2: n }, i) } this.$paths = $N("g", { class: "paths" }, this.$svg), this.$pulses = $N("g", { class: "pulses" }, this.$svg), this.$points = $N("g", { class: "points" }, this.$svg), this.$labels = $N("g", { class: "labels" }, this.$svg); const i = this.$svg.$$("path[x], circle"); for (const t of i) { const e = t.hasAttr("x") ? parse(t.attr("x"), !1) : void 0,
          s = t.attr("name") || this.model.name(); if ("PATH" === t.tagName) this.$paths.append(t), new GeoPath(this, e, t, s);
        else if (this.$points.append(t), t.hasClass("move")) { t.setAttr("r", 8); const e = t.hasAttr("project") ? parse(t.attr("project"), !1) : void 0;
          new GeoMovablePoint(this, t.center, t, s, e) } else e && (t.setAttr("r", 4), new GeoPoint(this, e, t, s)) } const n = { move: new MoveTool(this), point: new PointTool(this), line: new LineTool(this), circle: new CircleTool(this), perpBisector: new PerpBisectorTool(this), angleBisector: new AngleBisectorTool(this), rectangle: new RectangleTool(this) };
      this.$tools = this.$(".tools"); let r = n[this.$tools.$active.data.tool];
      this.$tools.on("change", t => r = n[t.data.tool]); const o = s => s.clamp(5, t - 5, 5, e - 5).transform(this.gridTransformInverse).round();
      slide(this.$svg, { start: t => r.start(this.vertexAt(t), o(t)), move: t => r.move(this.vertexAt(t), o(t)), end: (t, e) => { const s = Point.distance(t, e) < 10 ? "click" : "end";
          r[s](this.vertexAt(t), o(t)) } }), this.$svg.on("mousemove", t => { if (r instanceof DrawTool || r instanceof AngleBisectorTool) { const e = svgPointerPosn(t, this.$svg);
          r.hover(this.vertexAt(e), o(e)) } }), Browser.onKey("escape", () => r.cancel()) } lock() { this.$svg.css("pointer-events", "none") } unlock() { this.$svg.css("pointer-events", "all") } get points() { if (this.noPoints) return []; return Array.from(this.elements.values()).filter(t => t instanceof GeoPoint && t.val && !t.removed) } get paths() { return Array.from(this.elements.values()).filter(t => t instanceof GeoPath && t.val && !t.removed) } get intersections() { if (!this.findIntersections) return []; if (this.cachedIntersections) return this.cachedIntersections; const t = this.paths,
        e = []; for (let s of t)
        if (!s.pending)
          for (let i of t) { if (i.pending || s === i) continue; const t = intersections(s.val, i.val); for (let n = 0; n < t.length; ++n) { const r = () => intersections(s.val, i.val)[n];
              e.push({ val: t[n], x: r }) } }
      return this.cachedIntersections = e, e } vertexAt(t) { let e = void 0,
        s = 1 / 0,
        i = this.hasGrid ? this.gridTransform[0][0] / 2 : 20; const n = this.points,
        r = n.filter(t => t instanceof GeoMovablePoint),
        o = n.filter(t => !(t instanceof GeoMovablePoint)); for (let n of [...r, ...o, ...this.intersections]) { const r = Point.distance(t, n.val.transform(this.gridTransform));
        r < i && r < s - 1 && (s = r, e = n) } return e instanceof GeoPoint ? e : e ? this.drawPoint(e.x, { animated: 0 }) : void 0 } setActiveTool(t) { this.$tools.makeActive(this.$(`.tool[data-tool="${t}"]`)) } drawPath(t, { classes: e, animated: s, target: i, name: n } = {}) { const r = $N("path", { class: e, target: i }, this.$paths); "string" == typeof t && (t = parse(t, !1)); const o = new GeoPath(this, t, r, n); return s && r.enter(r.hasClass("fill") ? "fade" : "draw", s), o } drawPoint(t, { classes: e, animated: s = 1, target: i, name: n } = {}) { const r = $N("circle", { r: 4, class: e, target: i }, this.$points); "string" == typeof t && (t = parse(t, !1)); const o = new GeoPoint(this, t, r, n); return s && r.enter("pop"), o } drawMovablePoint(t, { classes: e, animated: s = 1, target: i, name: n } = {}) { const r = $N("circle", { r: 4, class: e, target: i }, this.$points),
        o = new GeoMovablePoint(this, t, r, n); return s && r.enter("pop"), o } animatePoint(t, e, s = 400) { const i = new Line(this.model[t], e);
      animate(e => this.model.set(t, i.at(e)), s) } animateConstruction(t, e = 2e3) { return __awaiter(this, void 0, void 0, (function*() { let s = this.elements.get(t),
          i = s.val; if (isCircle(i) && (i = i.arc), isLineLike(i)) { this.$ruler || (this.$ruler = $N("path", { d: RULER, class: "sketch" }, this.$svg)); const t = getToolTransform(i.at(-.1), 12, i.angle - .3, 1.2 * i.length),
            n = getToolTransform(i.at(-.1), 12, i.angle, 1.2 * i.length);
          this.$ruler.show(), s.$el.hide(), yield this.$ruler.animate({ opacity: [0, 1], transform: [t, n] }, 500).promise, yield s.$el.enter("draw", e).promise, yield this.$ruler.animate({ opacity: [1, 0], transform: [n, t] }, 500).promise } else if (i instanceof Arc) { this.$compass || (this.$compass = $N("path", { d: COMPASS, class: "sketch" }, this.$svg)); const t = getToolTransform(i.c, 50, i.startAngle, 1.5 * i.radius),
            n = getToolTransform(i.c, 50, i.startAngle, i.radius),
            r = getToolTransform(i.c, 50, i.startAngle + i.angle, i.radius),
            o = getToolTransform(i.c, 50, i.startAngle + i.angle, 1.5 * i.radius);
          this.$compass.show(), s.$el.hide(), yield this.$compass.animate({ opacity: [0, 1], transform: [t, n] }, 500).promise, s.$el.enter("draw", e), yield this.$compass.animate({ transform: [n, r] }, e, 0, "linear").promise, yield this.$compass.animate({ opacity: [1, 0], transform: [r, o] }, 500).promise } })) } showGesture(t, e) { this.$gesture || (this.$gesture = $N("x-gesture", {}, this)), this.$gesture.stop(); const s = parse(t, !1)(this.model); if (this.$gesture.from = s, e) { const t = parse(e, !1)(this.model);
        this.$gesture.start(t.subtract(s)) } else this.$gesture.start();
      this.one("click mouseover pointerdown", () => this.$gesture.stop()) } waitForPath(t) { const e = defer(),
        s = () => { for (let i of this.paths)
            if (t(i)) return e.resolve(i), void this.off("add:path moveEnd", s) }; return this.on("add:path moveEnd", s), e.promise } waitForPaths(t, { onCorrect: e, onIncorrect: s, onHint: i, onComplete: n, maxErrors: r = 4 } = {}) { const o = t.map(t => "string" == typeof t ? parse(t, !1) : () => t),
        a = repeat(!1, t.length); let h = 0,
        l = !1;
      this.on("add:path", t => { if (l) return; const c = o.findIndex(e => e(this.model).equals(t.val)); if (c >= 0) return a[c] ? t.remove(0) : (a[c] = !0, e && e(t, c), h = 0, void(a.every(t => t) && (l = !0, n && n(!1)))); if (t.remove(), !(isLineLike(t.val) && t.val.length < 1))
          if ((h += 1) >= r) { const t = a.findIndex(t => !t),
              e = this.drawPath(o[t], { animated: 1e3 });
            a[t] = !0, i && i(e, t), h = 0, a.every(t => t) && (l = !0, n && n(!0)) } else s && s(t) }) } };
  Geopad = __decorate([register("x-geopad", { templateId: "#geopad" })], Geopad);
  const glossary = JSON.parse($("#glossary").text),
    bios = JSON.parse($("#bios").text),
    WIDTH_SMALL = 600;
  let activeGloss = void 0;
  Browser.onResize(() => { activeGloss && activeGloss.hide() });
  let Gloss = class extends CustomElementView { ready() { this.xid = this.attr("xid"), this.$target = this.$(".target"), this.$popup = this.$(".popup"), this.$popup.html = this.body() || "", this.setClass("left", Browser.width > WIDTH_SMALL && this.$target.bounds.left + this.$popup.width > Browser.width - 15), hover(this, { enter: () => this.show(), exit: () => this.hide(), delay: 100, exitDelay: 200, $clickTarget: this.$target, preventMouseover: () => Browser.width <= WIDTH_SMALL }) } show() { if (activeGloss = this, this.addClass("on"), Browser.width <= WIDTH_SMALL) { const t = $("#glossary-modal"); return t.$(".modal-body").html = this.body(), t.open() } const t = this.$target.bounds,
        e = this.$popup.width,
        s = this.$popup.height,
        i = t.top + t.height + s < Browser.height - 10,
        n = t.top - s > (window.isWebView ? 10 : 54);
      this.setClass("top", n && !i), this.setClass("left", t.left + e > Browser.width - 15) } hide() { activeGloss = void 0, this.removeClass("on") } body() { const t = glossary[this.xid]; if (!t) return console.warn("missing gloss:", this.xid); let e = t.text; if (t.image && (e += `<img class="gloss-img" src="/resources/shared/glossary/${t.image}"/>`), t.link && !window.isWebView) { location.pathname === t.link.split("#")[0] || (e += `<p><a href="${t.link}" target="_blank">Learn more…</a></p>`) } return e } };
  Gloss = __decorate([register("x-gloss", { templateId: "#gloss" })], Gloss);
  let Bio = class extends Gloss { body() { const t = bios[this.xid]; return t ? `<img class="bio-img" src="/resources/shared/bios/${this.xid}.jpg"/>` + t.bio : console.warn("missing bio:", this.xid) } };
  Bio = __decorate([register("x-bio", { templateId: "#gloss" })], Bio);
  let isOpen = !1,
    transform = { x: 0, y: 0, s: 1 },
    $activeImg = void 0;
  const $lightbox = $N("div", { class: "lightbox-overlay" }, $body),
    $lightboxImg = $N("div", { class: "lightbox-img" }, $lightbox);

  function openLightbox(t, e, s) { isOpen = !0, $activeImg = t, $lightbox.show(), $lightboxImg.show(); let i = t.bounds,
      n = $lightboxImg.bounds,
      r = i.left + i.width / 2 - n.left - n.width / 2,
      o = i.top + i.height / 2 - n.top - n.height / 2,
      a = Math.max(i.width / n.width, i.height / n.height);
    transform = { x: r, y: o, s: a }, $lightboxImg.css("background-image", `url(${s}), url(${e})`), $lightboxImg.css("transform", `translate(${r}px, ${o}px) scale(${a})`), Browser.redraw(), $lightboxImg.addClass("transitions"), Browser.redraw(), t.css("visibility", "hidden"), $lightbox.addClass("on"), $lightboxImg.css("transform", "scale(1) translate(0,0)") }

  function closeLightbox() { isOpen && (isOpen = !1, $lightbox.removeClass("on"), $lightboxImg.setTransform(transform, 0, transform.s), setTimeout(() => { $activeImg.css("visibility", "visible"), $lightbox.css("display", "none"), $lightboxImg.css("transform", "none"), $lightboxImg.removeClass("transitions") }, 400)) } $lightbox.on("click touchmove", closeLightbox), Browser.onKey("escape", closeLightbox), $lightbox.on("scrollwheel touchmove", t => { t.preventDefault(), t.stopPropagation() }), Browser.onKey("space up down left right pagedown pageup", t => { isOpen && (t.preventDefault(), t.stopPropagation()) });
  let Media = class extends CustomElementView { ready() { const t = this.attr("src"),
        e = this.$(".wrap"),
        s = this.attr("width"),
        i = this.attr("height");
      this.css("width", s + "px"), e.css("padding-bottom", +i / +s * 100 + "%"); const n = e.$("img");
      n.setAttr("src", t), t.endsWith(".gif") && n.on("click", () => n.setAttr("src", t)); const r = e.$(".credit"),
        o = this.attr("credit");
      o ? r.text = o : r.remove(); const a = e.$(".zoom"); if (this.hasAttr("lightbox")) { this.addClass("interactive"); const e = t.replace(/\.(?=[^.]*$)/, "-large.");
        this.on("click", () => openLightbox(this, t, e)) } else a.remove() } };
  Media = __decorate([register("x-media", { templateId: "#media" })], Media);
  let Picker = class extends CustomElementView { constructor() { super(...arguments), this.correctCount = 0, this.solvedCount = 0, this.isSolved = !1 } ready() { this.$items = this.children, this.itemsClicked = this.$items.map(() => !1), this.$items.forEach((t, e) => { const s = t.data.error,
          i = s ? "incorrect" : "correct";
        s || (this.correctCount += 1), t.one("click", () => { this.itemsClicked[e] || this.isSolved || (this.trigger("hint", { msg: s || "correct", class: i }), t.addClass(i), s || (this.solvedCount += 1, this.trigger("score", "picker-" + e), this.checkSolved())) }) }) } restore(t) { const e = t.map(t => +t.slice(7)); for (let t of e) this.itemsClicked[t] = !0, this.$items[t].addClass("correct");
      this.solvedCount = e.length, this.checkSolved() } checkSolved() { this.solvedCount < this.correctCount || (this.addClass("solved"), this.isSolved = !0) } };
  Picker = __decorate([register("x-picker")], Picker);
  let PlayBtn = class extends CustomElementView { constructor() { super(...arguments), this.visible = !0 } ready() { this.on("click", () => { this.play(), setTimeout(() => this.trigger("play"), 400) }) } play() { this.visible && (this.visible = !1, this.exit("pop", 400)) } reset() { this.visible || (this.visible = !0, setTimeout(() => this.enter("pop"), 400)) } };
  PlayBtn = __decorate([register("x-play-btn", { templateId: "#play-btn" })], PlayBtn);
  let PlayToggle = class extends CustomElementView { constructor() { super(...arguments), this.playing = !1 } ready() { this.$icon = this.$("x-icon-btn"), this.$("button").on("click", () => this.toggle()) } toggle() { this.playing ? this.pause() : this.play() } play() { this.playing || (this.playing = !0, this.$icon.setAttr("icon", "pause"), this.trigger("play")) } pause() { this.playing && (this.playing = !1, this.$icon.setAttr("icon", "play"), this.trigger("pause")) } };
  PlayToggle = __decorate([register("x-play-toggle", { templateId: "#play-toggle" })], PlayToggle);
  let ScaleBox = class extends CustomElementView { ready() { const t = this.children[0],
        e = +this.attr("width") || 760;
      t.css("width", e + "px"); const s = t.height;
      Browser.onResize(() => { const i = this.width / e;
        this.css("height", s * i + "px"), t.css("transform", `scale(${i})`) }) } };
  ScaleBox = __decorate([register("x-scale-box", { template: "<div><slot></slot></div>" })], ScaleBox);
  let Slider = class extends CustomElementView { constructor() { super(...arguments), this.playing = !1, this.current = 0 } ready() { this.steps = +this.attr("steps"), this.speed = +this.attr("speed") || 1; const t = this.$(".bar"),
        e = this.$(".knob");
      this.drag = new Draggable(e, t, { moveY: !1 }), this.drag.on("start", () => this.playing = !1), this.drag.on("move", t => { const e = Math.round(t.x / this.drag.width * this.steps);
        e !== this.current && (this.current = e, this.trigger("move", e)) }), this.drag.on("end", () => this.trigger("slide-end")); const s = this.$(".play");
      this.hasAttr("no-play") ? s.remove() : s.on("click", () => this.play()), this.on("attr:steps", t => this.steps = +t.newAttr) } play() { if (this.playing) return;
      this.playing = !0, this.current >= this.steps && this.set(0); const t = () => { const e = this.drag.position.x;
        this.playing && e < this.drag.width ? window.requestAnimationFrame(t) : this.playing && (this.playing = !1, this.trigger("slide-end")); const s = Math.min(this.drag.width, e + 2 * this.speed);
        this.drag.setPosition(s, 0) };
      t() } set(t) { this.drag.setPosition(t * this.drag.width / this.steps, 0) } moveTo(t, e = 300) { return __awaiter(this, void 0, void 0, (function*() { if (t === this.current) return; const s = this.current;
        yield animate(e => this.set(s + (t - s) * e), e).promise, this.trigger("slide-end") })) } };
  Slider = __decorate([register("x-slider", { attributes: ["steps"], templateId: "#slider" })], Slider);
  let Slideshow = class extends CustomElementView { constructor() { super(...arguments), this.length = 0, this.current = 0, this.locked = !1 } ready() { this.$legend = this.$(".legend-box"), this.$steps = this.$legend.children, this.$back = this.$(".back"), this.$next = this.$(".next"); const t = this.$(".dots");
      this.$dots = this.$steps.map(() => $N("div", { class: "dot" }, t)), this.length = this.$steps.length, this.current = 0, this.$back.on("click", () => this.goBack()), this.$next.on("click", () => this.goNext()), this.$steps[0].show(), this.$dots[0].addClass("on") } go(t) { if (this.locked || t < 0 || t > this.length - 1 || t === this.current) return;
      this.locked = !0, setTimeout(() => this.locked = !1, 600), this.$back.setClass("disabled", 0 === t), this.$next.setClass("disabled", t === this.length - 1), this.$dots[this.current].removeClass("on"), this.$dots[t].addClass("on"), this.$steps[t].show(); const e = this.$steps[t].height + "px";
      this.$steps[t].hide(), this.$steps[this.current].exit("fade", 300).promise.then(() => this.$steps[t].enter("fade", 300)), this.$legend.animate({ height: e }, 600).promise.then(() => this.$legend.css("height", "auto")), this.current = t, this.trigger("step", t) } goNext() { this.locked || (this.go(this.current + 1), this.trigger("next", this.current)) } goBack() { this.locked || (this.go(this.current - 1), this.trigger("back", this.current)) } };
  Slideshow = __decorate([register("x-slideshow", { templateId: "#slideshow" })], Slideshow);
  const COLORS = loop(Color.rainbow(8)),
    IMAGES = loop(["badge", "homework", "laurels", "lightbulb", "owl", "scroll", "trophy"]);
  let Solved = class extends CustomElementView { constructor() { super(...arguments), this.visible = !1 } ready() { this.$svg = this.$("use"), this.$text = this.$(".message"), this.$step = this.getModel().$step, this.on("click", () => this.exit()) } enter() { if (this.visible) return ResolvedAnimation;
      this.visible = !0; const t = this.$step ? this.$step.addHint("correct").text : "correct",
        e = COLORS(),
        s = IMAGES(); return this.css("background-color", e.toString()), this.$text.text = t.replace(/<.*?>/g, ""), this.$svg.setAttr("xlink:href", "/sketch.svg#" + s), replaceSvgImports(), enter(this, "pop", 300, 600) } exit() { return this.visible ? (this.visible = !1, exit(this, "pop", 300)) : ResolvedAnimation } };

  function position(t, e) { let s = cumulative(t.map(t => t.h + 10)); for (const [i, n] of t.entries()) n !== e && n.drag.setPosition(0, s[i - 1] || 0) }

  function check(t) { return t.every((t, e) => t.index === e) || t.every((e, s) => e.index === t.length - s - 1) } Solved = __decorate([register("x-solved", { templateId: "#solved" })], Solved);
  let Sortable = class extends CustomElementView { ready() { this.items = this.children.map(t => ({ drag: new Draggable(t, this, { moveX: !1, useTransform: !0 }), index: +t.data.index, h: 0 })); for (const t of this.children) t.removeAttr("data-index"); for (const t of this.items) t.drag.on("drag", () => { this.items = sortBy(this.items, e => e.drag.position.y - (e === t ? 10 : 0)), position(this.items, t) }), t.drag.on("end", () => { position(this.items), check(this.items) && this.solve() });
      Browser.onResize(() => { for (const t of this.items) t.h = t.drag.$el.height; const t = total(this.items.map(t => t.h));
        this.css("height", t + 10 * this.items.length - 10 + "px"), position(this.items) }) } solve() { this.trigger("solve"), this.addClass("solved"); for (let t of this.items) t.drag.disabled = !0 } };
  Sortable = __decorate([register("x-sortable")], Sortable);
  const colours = loop(["#cd0e66", "#0f82f2", "#22ab24", "#fd8c00"]);
  class Particle { constructor(t) { this.index = t, this.color = colours(), this.tilt = Math.floor(10 * Math.random()) - 10, this.tiltAngleIncrement = .07 * Math.random() + .05, this.tiltAngle = 0, this.x = Math.random() * Browser.width, this.y = (Math.random() - 1) * Browser.height, this.r = Random.uniform(10, 30) } draw(t) { t.beginPath(), t.lineWidth = this.r / 2, t.strokeStyle = this.color, t.moveTo(this.x + this.tilt + this.r / 4, this.y), t.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4), t.stroke() } update(t, e) { this.tiltAngle += this.tiltAngleIncrement, this.y += (Math.cos(t) + 3 + this.r / 2) / 2, this.x += Math.sin(t), this.tilt = 15 * Math.sin(this.tiltAngle - this.index / 3), this.x < -20 ? (this.x = -20, this.y = Math.random() * Browser.height, this.tilt = Math.floor(10 * Math.random()) - 20) : this.x > Browser.width + 20 ? (this.x = Browser.width + 20, this.y = Math.random() * Browser.height, this.tilt = Math.floor(10 * Math.random()) - 20) : e && this.y > Browser.height && (this.x = Math.random() * Browser.width, this.y = -10, this.tilt = Math.floor(10 * Math.random()) - 20) } }
  const style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999";
  let $confetti = void 0;

  function confetti(t = 2e3, e = 150) { $confetti || ($confetti = $N("canvas", { style: style }, $body)), $confetti.setAttr("width", Browser.width), $confetti.setAttr("height", Browser.height), $confetti.show(); const s = $confetti.ctx,
      i = tabulate(t => new Particle(t), e),
      n = animate(e => { s.clearRect(0, 0, Browser.width, Browser.height); const r = e < t; let o = 0; for (let t of i) t.draw(s), t.update(e, r), t.y < Browser.height && (o += 1);
        o || (n.cancel(), $confetti.hide()) }) }
  let Step = class extends CustomElementView { constructor() { super(...arguments), this.model = observable({ $step: this }), this.tools = { confetti: confetti }, this.isShown = !1, this.isCompleted = !1, this.scores = new Set } ready() { this.goals = words(this.attr("goals")), this.$course = (this.getModel() || {}).$course, this.$blanks = this.$$("x-blank, x-blank-input"); for (const [t, e] of this.$blanks.entries()) e.on("valid", () => { this.addHint("correct"), this.score("blank-" + t) }), e.on("invalid", () => this.addHint("incorrect")), e.on("hint", t => this.addHint(`Hmmm… maybe try ${t}?`));
      this.$equations = this.$$("x-equation, x-equation-system").filter(t => !t.parents("x-equation-system").length); for (const [t, e] of this.$equations.entries()) e.on("solve", () => { this.addHint("correct"), this.score("eqn-" + t) }); for (const t of this.$$("x-equation-system")) t.on("hint", t => this.addHint(t));
      this.$reveals = this.$$(".reveal"); for (let t of this.$reveals) { t.data.display = "visibility"; const e = +t.data.duration || 400,
          s = +t.data.delay || 0;
        this.onScore(t.data.when, () => __awaiter(this, void 0, void 0, (function*() { "visible" !== t.css("visibility") && (yield t.enter(t.data.animation || "fade", e, s).promise, t.css("opacity", "")) }))) } this.$nextBtn = this.$$(".next-step"); for (const [t, e] of this.$nextBtn.entries()) this.onScore("next-" + t, () => e.exit("pop")), e.one("click", () => this.score("next-" + t)); for (let t of this.$$(".check[data-when]")) this.onScore(t.data.when, () => t.addClass("visible"));
      this.$picker = this.$("x-picker"), this.$picker && (this.$picker.on("hint", t => this.addHint(t.msg, { class: t.class })), this.$picker.on("score", t => this.score(t))); for (const t of this.$$(".step-target")) hover(t, { enter: () => { const e = this.$$('[target~="' + t.data.to + '"]'); for (let t of e) t.addClass("focus");
          this.addClass("focus") }, exit: () => { for (let t of this.$$(".focus")) t.removeClass("focus");
          this.removeClass("focus") } }); const t = this.$("x-slideshow");
      t && t.on("next", t => this.score("slide-" + (t - 1))); const e = this.$("x-algebra-flow");
      e && e.on("next", ({ step: t }) => this.score("algebra-flow-" + (t - 1))), this.$sortables = this.$$("x-sortable"); for (const [t, e] of this.$sortables.entries()) e.on("solve", () => { this.addHint("correct"), this.score("sortable-" + t) }); const s = this.$("x-gameplay");
      s && s.on("score", () => this.score("gameplay")), this.$$("x-slider").forEach((t, e) => { t.on("slide-end", () => this.score("slider-" + e)) }); const i = this.$("x-quill");
      i && i.on("submit", () => this.score("quill")); for (const [t, e] of this.$$("x-var").entries()) e.on("slide-end", () => this.score("var-" + t)); for (let t of this.$$(".var")) t.bindObservable(this.model, !1) } show() { if (this.isShown) return;
      this.isShown = !0; try { const t = toCamelCase(this.id);
        window.StepFunctions && window.StepFunctions[t] && window.StepFunctions[t](this) } catch (t) { console.error(t) } this.initialData && this.restore(this.initialData); const t = this.$$("x-gesture[target]");
      setTimeout(() => { if (!this.isReady)
          for (let e of t) e.start() }, 2e3), this.$course && this.$course.log("Step", "show", this.id), this.trigger("show"), this.addClass("on"), Browser.resize() } complete() { if (!this.isCompleted) { this.isShown || this.show(), this.isCompleted = !0; for (let t of this.$reveals) "visible" !== t.css("visibility") && t.enter("fade", 400).promise.then(() => t.css("opacity", "")); for (let t = 0; t < this.$nextBtn.length; ++t) this.score("next-" + t);
        this.trigger("complete") } } restore(t) { this.$blanks.forEach((e, s) => { t.scores.includes("blank-" + s) && e.solve(!0) }), this.$equations.forEach((e, s) => { t.scores.includes("eqn-" + s) && e.solve() }), this.$sortables.forEach((e, s) => { t.scores.includes("sortable-" + s) && e.solve() }), this.$picker && this.$picker.restore(t.scores.filter(t => t.startsWith("picker-"))), t.scores.forEach(t => this.score(t, !1)) } get isReady() { return this.goals.every(t => this.scores.has(t)) } get isPageLoaded() { return !this.$course || this.$course.isReady } score(t, e = !0) { this.scores.has(t) || (this.scores.add(t), this.trigger("score-" + t), this.trigger("score"), this.$course && (this.$course.trigger("score"), this.$course.saveProgress({ steps: {
          [this.id]: { scores: [t] } } }), this.$course.log("Step", "score", this.id + "/" + t)), e && this.isReady && this.$course && this.$course.isReady && setTimeout(() => { this.$course.$activeStep === this && this.$course.nextStep() }, 1e3)) } storeData(t, e) { this.$course && this.$course.saveProgress({ steps: {
          [this.id]: { data: {
              [t]: e } } } }) } onScore(t, e) { const s = words(t); if (s.every(t => this.scores.has(t))) return e && e(), Promise.resolve(); const i = defer(),
        n = () => { s.every(t => this.scores.has(t)) && (e && e(), i.resolve(), this.off("score", n)) }; return this.on("score", n), i.promise } addHint(t, e = {}) { return this.trigger("hint", t), this.$course && this.$course.isReady ? this.isInViewport ? this.$course.$tutor.showHint(t, e) : (this.one("enterViewport", () => this.$course.$tutor.showHint(t, e)), { text: this.$course.$tutor.hints[t] || t }) : { text: t } } getText(t) { return this.$course && this.$course.$tutor && this.$course.$tutor.hints[t] || t } getHelp() {} delayedHint(t, e = 1e4) { let s = setTimeout(t, e);
      this.on("score", () => { clearTimeout(s), this.isCompleted || (s = setTimeout(t, 2e4)) }), this.on("complete", () => clearTimeout(s)) } };
  Step = __decorate([register("x-step")], Step);
  const $fixed = $$("header, x-tutor, .sidebar"),
    $targets = $N("svg", { class: "target-body", style: "position: fixed; top: 0; left: 0; width: 100%; height: 100%;\n            display: none; pointer-events: none; z-index: 900; opacity: 0;\n            transform: translateZ(0); will-change: opacity; transition: opacity .3s;", html: '<defs>\n      <mask id="masking"><rect width="100%" height="100%" fill="white"/></mask>\n    </defs>\n    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">\n      <path d="M 0 0 L 10 5 L 0 10 z"/>\n    </marker>\n    <rect x="0" y="0" width="100%" height="100%" mask="url(#masking)" fill="white" opacity="0.9"/>\n    <path id="target-arrow" stroke="black" stroke-width="5" marker-end="url(#arrow)" opacity="0.3" stroke-linecap="round"/>' }, $body);

  function connect(t, e, s, i) { let n = new Point(t.left - 15, t.top + s - 15),
      r = new Rectangle(n, t.width + 30, t.height + 30).project({ x: e.left + e.width / 2, y: e.top + e.height / 2 + i }),
      o = new Point(e.left - 15, e.top + i - 15); return [r, new Rectangle(o, e.width + 30, e.height + 30).project({ x: t.left + t.width / 2, y: t.top + t.height / 2 + s })] }

  function distance(t, e) { return Math.abs(t[0] - e[0]) + Math.abs(t[1] - e[1]) }
  const $mask = $targets.$("mask"),
    $arrow = $targets.$("#target-arrow");
  let active = !1,
    $bounds = [],
    Target = class extends CustomElementView { ready() { const t = this; let e, s, i, n = t.attr("to"),
          r = t.hasAttr("no-margins"),
          o = void 0;

        function a() { s && $body.scrollBy(-s, 300), $targets.css("display", "block"), Browser.redraw(), delay((function() { $targets.css("opacity", 1) }), s ? 300 : 0) }

        function h(s) { if (active) { if (s) { if (isOneOf(s.type, "mousemove", "pointermove") && distance(e, [s.clientX, s.clientY]) < 40) return } clearTimeout(i), active = !1, $targets.css("opacity", 0), setTimeout(() => { active || $targets.css("display", "none") }, 300), $body.off("mousewheel mousemove touchend touchmove", h), t.off("mouseleave", h) } }

        function l() { s && !o ? $body.on("mousemove", h) : t.on("mouseleave", h), $body.on("mousewheel touchend touchmove", h) } t.on("mouseenter touchstart", (function(h) { e = [h.clientX, h.clientY],
            function() { active = !0; let e = $$(n); if (!e.length) return; let i = e[0].hasParent(...$fixed);
              void 0 === o && (o = t.hasParent(...$fixed)); let a = t.bounds,
                h = e.map(t => t.bounds).filter(t => t.width || t.height); if (s = 0, !i) { let t = Math.min(...h.map(t => t.top)),
                  e = Math.max(...h.map(t => t.top + t.height)),
                  i = Browser.height - 12 - e,
                  n = (window.isWebView ? 12 : 56) - t;
                s = i < 0 ? i : n > 0 ? n : 0 } for (const t of $bounds) t.remove();
              $bounds = [a].concat(h).map((t, e) => { let i = e && !r ? 10 : 4; return $N("rect", { x: t.left - i, y: t.top - i + (e || !o ? s : 0), width: t.width + 2 * i, height: t.height + 2 * i, rx: 4, ry: 4 }, $mask) }), $arrow.points = connect(a, h[0], o ? 0 : s, i ? 0 : s) }(), i = window.setTimeout(a, s ? 50 : 30), l() })), t.on("click", t => { active ? (t.handled = !0, h(), setTimeout(() => $(n).trigger("click mousedown"))) : (active = !0, s = 0, a(), l()) }) } };
  Target = __decorate([register("x-target")], Target);
  const MATHS_REGEX = /[0-9+\-*/()^\s]+/g;

  function createMsgElement(t, e, s = {}) { const i = $N("div", { class: "msg-wrap", "data-display": "flex" }),
      n = $N("div", { class: "msg " + e }, i); return s.class && n.addClass(s.class), s.visible || i.hide(), isOneOf(e, "hint", "question") ? n.html = t : "img" === e ? n.css("background-image", `url(${t})`) : "video" === e && $N("iframe", { src: t, allowfullscreen: !0 }, n), i }
  let Tutor = class Tutor extends CustomElementView { constructor() { super(...arguments), this.recentMessages = [], this.isOpen = !1, this.queuePromise = Promise.resolve() } ready() { this.$course = (this.getModel() || {}).$course, this.hints = JSON.parse($("#hints").text) || {}, this.correct = loop(Random.shuffle(this.hints.correct || [])), this.incorrect = loop(Random.shuffle(this.hints.incorrect || [])), this.$toasts = this.$(".toasts"), this.$chat = this.$(".chat"), this.$chatBody = this.$(".chat-body"), this.$toasts.on("click", t => { t.handled || this.open() }), this.$(".close").on("click", () => this.close()); const t = this.$(".chat-footer");
      this.$query = t.$(".input"), this.$query.onKeyDown("enter", t => { t.preventDefault(), this.askQuestion(this.$query.text.trim()), this.$query.text = "" }), this.$query.on("focus", () => t.addClass("focus")), this.$query.on("blur", () => t.removeClass("focus")), this.$(".hint").on("click", () => { this.queue(this.hints.tutorial1), this.queue(this.$course.user ? this.hints.tutorial2 : this.hints.account) }) } open() { this.isOpen || (this.isOpen = !0, this.$chat.enter("slide-up", 200), this.$chatBody.scrollTop = this.$chatBody.scrollHeight, this.trigger("open")) } close() { this.isOpen && (this.isOpen = !1, this.$query.blur(), this.trigger("close"), this.$chat.exit("slide-down", 200)) } queue(t, e = "hint", s = {}) { this.queuePromise = this.queuePromise.then(() => (this.display(t, e, s), wait(500))) } display(t, e = "hint", s = {}) { let i = s.timeout || 8e3; if (Browser.width < 640 && (i *= .7), (null == s.toast || s.toast) && !this.isOpen) { const n = createMsgElement(t, e, s);
        this.$toasts.append(n), n.enter("reveal-right"), setTimeout(() => n.exit("reveal-right", 400, 0, !0), i), this.on("open", () => n.exit("reveal", 200, 0, !0)) } const n = createMsgElement(t, e, { class: s.class, visible: !this.isOpen });
      this.$chatBody.append(n), this.isOpen && (n.enter("reveal", 300), animate(() => this.$chatBody.scrollTop = this.$chatBody.scrollHeight, 200)) } showHint(t, e = {}) { if (isOneOf(t, "correct", "incorrect")) { const s = "correct" === t ? this.correct() : this.incorrect(),
          i = "correct" === t ? 3e3 : 5e3; return this.queue(s, "hint", { class: e.class || t, timeout: i }), { text: s } } let s = this.hints[t] || t; if (e.variables)
        for (let [t, i] of Object.entries(e.variables)) s = s.replace(new RegExp("\\$" + t, "g"), i); return !e.force && this.recentMessages.includes(t) ? { text: s } : (this.recentMessages.push(t), setTimeout(() => this.recentMessages.shift(), 1e4), !1 !== e.store && this.$course.saveProgress({ hints: [{ content: s, kind: "hint" }] }), this.queue(s, "hint", { class: e.class }), { text: s }) } askQuestion(query) { if (!query) return;
      this.queue(query, "question"), this.$course && this.$course.log("Tutor", "ask", query); const equation = (query.match(MATHS_REGEX) || []).filter(t => t.length >= 3 && !t.match(/^[\s0-9]+$/)); if (equation.length) try { const result = eval(equation[0].replace(/\b0+/g, "0").replace(/\^/g, "**")); return this.queue("= " + result) } catch (t) { console.error("Parse Error:", equation[0]) } } meanEasterEgg() {} };
  Tutor = __decorate([register("x-tutor", { templateId: "#tutor" })], Tutor);
  const $overlay = $N("div", { class: "var-overlay" }, $body);
  let Variable = class extends CustomElementView { ready() { const t = this,
        e = t.attr("bind"); if (!e) return; let [s, i, n] = e.split("|"), [r, o, a] = n.split(",").map(t => +t), h = +i; const l = this.getModel();
      l.set(s, h), this.$(".content").bindObservable(l); let c = t.$(".progress");
      c.css("width", 116 * (+h - r) / (o - r) + "px"); let d = 0,
        u = 0,
        p = Math.max((o - r) / 240, a / 20),
        f = !1;
      slide(t, { start(e) { d = e.x, u = h, t.addClass("on"), f = !1, $overlay.show() }, move(t) { let e = (t.x - d) * p,
            i = roundTo(clamp(u + e, r, o), a);
          (i = round(i, 2)) !== h && (h = i, f = !0, l && l.set(s, h), c.css("width", 116 * (h - r) / (o - r) + "px")) }, end() { t.removeClass("on"), f && t.trigger("slide-end"), $overlay.hide() } }) } };

  function formatTime(t) { const e = Math.floor(t / 60),
      s = Math.floor(t % 60); return e + ":" + (s < 10 ? "0" : "") + s } Variable = __decorate([register("x-var", { templateId: "#var" })], Variable);
  let Video = class extends CustomElementView { ready() { const t = this.attr("src"),
        e = this.$(".video-wrap"),
        s = this.$("video"),
        i = this.attr("width"),
        n = this.attr("height");
      this.css("width", i + "px"), e.css("padding-bottom", +n / +i * 100 + "%"), s.setAttr("poster", this.attr("poster") || t.replace(/mp4$/, "jpg")), this.hasAttr("loop") && (s._el.loop = !0), this.hasAttr("audio") || (s._el.muted = !0), $N("source", { src: t, type: "video/mp4" }, s), this.hasAttr("credit") && (this.$(".credit").text = this.attr("credit")); const r = this.$(".bar"),
        o = this.$(".progress"),
        a = this.$(".buffer"),
        h = this.$(".timecode"),
        l = new Draggable(this.$(".handle"), r, { moveY: !1 }),
        c = this.video = s._el; let d = this.width - 110;
      Browser.onResize(() => d = this.width - 110), s.on("canplay", () => { h.text = formatTime(+c.duration) }), s.on("timeupdate", () => { const t = c.currentTime / c.duration;
        o.css("width", 100 * t + "%"), h.text = formatTime(+c.currentTime), l.setPosition(t * d, 0), this.trigger("timeupdate", c.currentTime) }), s.on("progress", () => { if (c.buffered.length <= 0 || c.duration <= 0) return; const t = c.buffered.end(c.buffered.length - 1) / c.duration * 100;
        a.css("width", t + "%") }), s.on("ended", () => { c.pause(), this.removeClass("playing"), this.trigger("end") }); const u = () => c.paused ? this.play() : this.pause(),
        p = t => this.setTime(t / d * c.duration);
      this.hasAttr("hover") ? (s.on("mouseover touchstart", () => this.play()), s.on("mouseout touchend touchcancel", () => this.pause())) : s.on("click", u), this.hasAttr("controls") && (this.$(".controls").show(), this.$(".play-pause-btn").on("click", u), l.on("start", () => this.pause()), l.on("drag", t => p(t.x)), r.on("click", t => p(t.offsetX))) } setTime(t) { this.video.currentTime = t } play() { this.video.play(), this.addClass("playing"), this.trigger("play") } pause() { this.video.pause(), this.removeClass("playing") } };
  Video = __decorate([register("x-video", { templateId: "#video" })], Video);
  let QuizCard = class extends CustomElementView { constructor() { super(...arguments), this.solved = !1, this.correctChoice = 1 } loadBody(t) { return __awaiter(this, void 0, void 0, (function*() { const e = yield fetch(`/quiz/${t}?xhr=1`);
        this.html = yield e.text(), this.setUp() })) } setUp() { this.$choices = this.$$("button.choice"); for (const [t, e] of this.$choices.entries()) e.on("click", () => this.solve(t)) } solve(t) { return __awaiter(this, void 0, void 0, (function*() { if (this.solved) return;
        this.solved = !0; const e = post("", { cardId: this.$(".card-body").id, correct: t === this.correctChoice }); for (const t of this.$choices) t.addClass("done");
        this.$choices[t].addClass("selected"), yield wait(500), this.$choices[this.correctChoice].addClass("correct"), t !== this.correctChoice && this.$choices[t].addClass("incorrect"), yield Promise.all([e, wait(1500)]), this.trigger("solve") })) } };
  QuizCard = __decorate([register("x-quiz-card")], QuizCard);
  let Quiz = class extends CustomElementView { ready() { this.cards = this.$$("x-quiz-card").reverse(), this.cardStack = this.$(".card-stack"), this.cards[0].setUp(), this.cards[0].on("solve", () => this.nextCard()) } nextCard() { return __awaiter(this, void 0, void 0, (function*() { const t = this.cards.shift();
        yield this.cards[0].loadBody(this.id), t.addClass("done"), setTimeout(() => t.remove(), 600); for (const [t, e] of this.cards.entries()) e.removeClass("s1 s2 s3 s4"), t > 0 && e.addClass(`s${t}`);
        this.cards[0].on("solve", () => this.nextCard()); const e = $N("x-quiz-card", { class: "s4" });
        this.cardStack.prepend(e), this.cards.push(e) })) } };

  function getPosition(t, e) { const s = e.positionLeft - t.positionLeft + e.width / 2,
      i = e.positionTop - t.positionTop + e.height / 2; return new Point(s, i) }

  function parseAttr(t) { return t ? new Point(...t.split(",").map(t => +t)) : void 0 } Quiz = __decorate([register("x-quiz")], Quiz);
  let Gesture = class extends CustomElementView { constructor() { super(...arguments), this.doAnimation = !1 } created() { this.slide = parseAttr(this.attr("slide")), this.shift = parseAttr(this.attr("offset")) } ready() { this.$target = $(this.attr("target")), this.$target && (this.$target.on("click pointerdown", () => this.stop()), this.hasAttr("start") && this.start()) } setTarget(t, e, s) { this.$target = "string" == typeof t ? $(t) : t, e && (this.slide = e), s && (this.slide = s) } start(t) {!this.doAnimation && this.$target && (this.doAnimation = !0, t && (this.slide = t), this.slide || this.$end ? this.runSlideAnimation() : this.runClickAnimation()) } startSlide(t, e) { this.$target = t, this.$end = e, this.start() } stop() { this.doAnimation = !1 } runSlideAnimation() { return __awaiter(this, void 0, void 0, (function*() { this.show(); let t = this.from || getPosition(this, this.$target);
        this.shift && (t = t.add(this.shift)); const e = this.slide ? t.add(this.slide) : getPosition(this, this.$end),
          s = `translate(${t.x-15}px,${t.y-10}px)`,
          i = `translate(${e.x-15}px,${e.y-10}px)`;
        yield this.animate({ transform: [s + " scale(2)", s], opacity: [0, 1] }, 300).promise, yield this.animate({ transform: [s, i] }, 1e3).promise, yield this.animate({ transform: [i, i + " scale(2)"], opacity: [1, 0] }, 300).promise, this.hide(), setTimeout(() => { this.doAnimation && this.runSlideAnimation() }, 1e3) })) } runClickAnimation() { return __awaiter(this, void 0, void 0, (function*() { this.show(); let t = this.from || getPosition(this, this.$target);
        this.shift && (t = t.add(this.shift)); const e = `translate(${t.x-15}px,${t.y-10}px)`;
        yield this.animate({ transform: [e + " scale(2)", e], opacity: [0, 1] }, 500).promise, yield this.animate({ transform: [e, e + " scale(2)"], opacity: [1, 0] }, 500, 200).promise, this.hide(), setTimeout(() => { this.doAnimation && this.runClickAnimation() }, 1e3) })) } };
  Gesture = __decorate([register("x-gesture", { templateId: "#gesture" })], Gesture);
  let IconBtn = class extends CustomElementView { ready() { const t = this.$("use"),
        e = t.attr("xlink:href").replace("#xxx", "#");
      t.setAttr("xlink:href", e + this.attr("icon")), this.on("attr:icon", ({ newVal: s }) => t.setAttr("xlink:href", e + s)) } };
  IconBtn = __decorate([register("x-icon-btn", { templateId: "#icon-btn", attributes: ["icon"] })], IconBtn);
  let Parallax = class extends CustomElementView { ready() { const t = this.$(".image"),
        e = this.positionTop < 50; let s, i;
      t.css({ "background-image": `url("${this.attr("background")}")`, height: e ? "100%" : "150%" });
      Browser.onResize(({ height: t }) => { const e = this.positionTop;
        s = Math.max(0, e - t), i = e + this.height }), $body.on("scroll", (function(n) { if (n.top < s || n.top > i) return; const r = (n.top - s) / (i - s) * (e ? 50 : 33);
        t.css("transform", `translateY(${r}%)`) })) } };
  Parallax = __decorate([register("x-parallax", { templateId: "#parallax" })], Parallax);
  let Popup = class extends CustomElementView { constructor() { super(...arguments), this.isOpen = !1 } ready() { this.animation = this.attr("animation") || "pop", this.$bubble = this.$(".popup-body"), this.$bubble.hide(), this.$(".popup-target").on("click", () => this.toggle()), this.on("clickOutside", () => this.close()); for (const t of this.$bubble.$$("a")) t.on("click", () => this.close()) } toggle() { this.isOpen ? this.close() : this.open() } open() { this.isOpen || (this.isOpen = !0, this.addClass("active"), this.$bubble.enter(this.animation, 200)) } close() { this.isOpen && (this.isOpen = !1, this.removeClass("active"), this.$bubble.exit(this.animation, 200)) } };
  Popup = __decorate([register("x-popup")], Popup);
  const template = '<div class="titles"></div><div class="body"><slot></slot></div>';
  let Tabbox = class extends CustomElementView { constructor() { super(...arguments), this.$titles = [], this.active = 0 } ready() { const t = this.$(".titles");
      this.$body = this.$(".body"), this.$tabs = this.$$(".tab"); for (let e = 0; e < this.$tabs.length; ++e) { const s = this.$tabs[e].$("h3") || $N("h3");
        t.append(s), this.$titles.push(s), s.on("click", () => this.makeActive(e)) } this.$titles[0].addClass("active"), this.$tabs[0].show() } makeActive(t) { if (this.active === t) return;
      this.$titles[this.active].removeClass("active"), this.$titles[t].addClass("active"), this.$tabs[t].show(); const e = this.$tabs[t].outerHeight + "px";
      this.$tabs[t].hide(), this.$tabs[this.active].exit("fade", 300).promise.then(() => this.$tabs[t].enter("fade", 300)), this.$body.animate({ height: e }, 600).promise.then(() => this.$body.css("height", "auto")), this.active = t, this.trigger("change", t) } };
  Tabbox = __decorate([register("x-tabbox", { template: template })], Tabbox);
  const PADDING = 12;

  function getProgress(t) { return `M${t},${t/2}a${t/2},${t/2},0,0,1,0,${t}A${t/2},${t/2},0,0,1,${t},${t/2}` }

  function getCheck(t) { return `M ${t},0 C ${t/2},0,0,${t/2},0,${t}  s ${t/2},${t},${t},${t} ` + `s ${t}-${t/2},${t}-${t}     S ${1.5*t},0,${t},0 z ` + `M ${44.6*t/50},${76.1*t/50} L ${19.2*t/50},${48.8*t/50} ` + `l ${4*t/50}-${4.2*t/50}     l ${19.8*t/50},${11.9*t/50} ` + `l ${34.2*t/50}-${32.6*t/50} l ${3.5*t/50},${3.5*t/50} ` + `L ${44.6*t/50},${76.1*t/50} z` }
  let Progress = class extends CustomElementView { constructor() { super(...arguments), this.completed = !1 } ready() { this.r = +this.attr("r") || 10, this.r1 = this.r + PADDING, this.$svg = $N("svg", { width: 2 * this.r1, height: 2 * this.r1 }, this), this.$progress = $N("path", { class: "pie", d: getProgress(this.r), "stroke-width": this.r }, this.$svg), this.setProgress(+this.attr("p"), !1) } setProgress(t, e = !0) { if (t > .99) return this.complete(e); const s = Math.PI * this.r;
      this.$progress.css("stroke", t ? "currentColor" : "none"), this.$progress.css("stroke-dasharray", `${t*s} ${s}`) } complete(t = !0) { if (this.completed) return; if (this.completed = !0, this.$progress.css("stroke", "none"), this.$progress.css("fill", "currentColor"), this.$progress.setAttr("d", getCheck(this.r)), !t) return; const e = $N("g", { transform: `translate(${this.r1} ${this.r1})` }, this.$svg),
        s = tabulate(() => $N("line", {}, e), 18);
      animate(t => { const e = this.r + PADDING * ease("quint-out", t),
          i = this.r + PADDING * t; for (let t = 0; t < 18; ++t) { const n = Math.cos(2 * Math.PI * t / 18),
            r = Math.sin(2 * Math.PI * t / 18);
          s[t].setLine({ x: n * e, y: r * e }, { x: n * i, y: r * i }) } }, 800).promise.then(() => e.remove()) } };
  Progress = __decorate([register("x-progress")], Progress);
  const $modalBackground = $N("div", { class: "modal-background" }, $body);
  let $openModal = void 0;

  function tryClose() { $openModal && $openModal.canClose && $openModal.close() } $modalBackground.on("click", tryClose), Browser.onKey("escape", tryClose), $modalBackground.on("scrollwheel touchmove", t => { t.preventDefault(), t.stopPropagation() }), Browser.onKey("space up down pagedown pageup", t => { $openModal && (t.preventDefault(), t.stopPropagation()) }), Browser.onResize(() => { $openModal && $openModal.css("transform", "translate(-50%, -50%)") });
  let Modal = class extends CustomElementView { constructor() { super(...arguments), this.isOpen = !1, this.canClose = !0 } ready() { this.canClose = !this.hasAttr("no-close"), this.$iframe = this.$("iframe[data-src]"); const t = $$(`[data-modal=${this.id}]`); for (let e of t) e.on("click", () => this.open());
      RouterInstance.on("afterChange", ({ $viewport: t }) => { const e = t.$$(`[data-modal=${this.id}]`); for (let t of e) t.on("click", () => this.open()) }), this.hasClass("open") && !$openModal && ($modalBackground.show(), this.show(), this.isOpen = !0, $openModal = this); const e = this.$(".close");
      e && e.on("click", () => this.close()) } open() { this.isOpen || ($modalBackground.setClass("light", this.hasClass("light")), $openModal ? $openModal.close(!0) : $modalBackground.enter("fade", 250), this.isOpen = !0, $openModal = this, this.$iframe && this.$iframe.setAttr("src", this.$iframe.data.src), this.enter("pop", 250), this.trigger("open")) } close(t = !1, e = !1) { this.isOpen && (this.isOpen = !1, $openModal = void 0, this.$iframe && this.$iframe.setAttr("src", ""), t || $modalBackground.exit("fade", 250), this.exit("pop", 250).promise.then(() => this.css("transform", "")), e || this.trigger("close")) } };
  Modal = __decorate([register("x-modal")], Modal);
  let Select = class extends CustomElementView { ready() { const t = this.children;
      this.$active = this.$(".active") || t[0], this.$active.addClass("active"); for (let e of t) e.on("click", () => this.makeActive(e));
      this.trigger("change", this.$active) } makeActive(t) { t !== this.$active && (this.$active.removeClass("active"), this.$active = t, t.addClass("active"), this.trigger("change", t)) } };
  Select = __decorate([register("x-select")], Select);
  const VERSION = "2.4.1",
    DEV_ID = "i5iSjo",
    VERSION_PARAM = "_av",
    USAGE_PARAM = "_au",
    NULL_DIMENSION = "(not set)",
    instances = [];
  class MethodChain { static add(t, e, s) { getOrCreateMethodChain(t, e).add(s) } static remove(t, e, s) { getOrCreateMethodChain(t, e).remove(s) } constructor(t, e) { this.context = t, this.methodName = e, this.isTask = /Task$/.test(e), this.originalMethodReference = this.isTask ? t.get(e) : t[e], this.methodChain = [], this.boundMethodChain = [], this.wrappedMethod = (...t) => { return (0, this.boundMethodChain[this.boundMethodChain.length - 1])(...t) }, this.isTask ? t.set(e, this.wrappedMethod) : t[e] = this.wrappedMethod } add(t) { this.methodChain.push(t), this.rebindMethodChain() } remove(t) { const e = this.methodChain.indexOf(t);
      e > -1 && (this.methodChain.splice(e, 1), this.methodChain.length > 0 ? this.rebindMethodChain() : this.destroy()) } rebindMethodChain() { this.boundMethodChain = []; for (let t, e = 0; t = this.methodChain[e]; e++) { const s = this.boundMethodChain[e - 1] || this.originalMethodReference.bind(this.context);
        this.boundMethodChain.push(t(s)) } } destroy() { const t = instances.indexOf(this);
      t > -1 && (instances.splice(t, 1), this.isTask ? this.context.set(this.methodName, this.originalMethodReference) : this.context[this.methodName] = this.originalMethodReference) } }

  function getOrCreateMethodChain(t, e) { let s = instances.filter(s => s.context == t && s.methodName == e)[0]; return s || (s = new MethodChain(t, e), instances.push(s)), s }
  const a = document.createElement("a");

  function createFieldsObj(t, e, s, i, n, r) { if ("function" == typeof i) { const o = s.get("buildHitTask"); return { buildHitTask: s => { s.set(t, null, !0), s.set(e, null, !0), i(s, n, r), o(s) } } } return assign({}, t, e) }
  const queueMap = {};

  function deferUntilPluginsLoaded(t, e) { const s = t.get("trackingId"),
      i = queueMap[s] = queueMap[s] || {},
      n = () => { clearTimeout(i.timeout), i.send && MethodChain.remove(t, "send", i.send), delete queueMap[s], i.queue.forEach(t => t()) };
    clearTimeout(i.timeout), i.timeout = setTimeout(n, 0), i.queue = i.queue || [], i.queue.push(e), i.send || (i.send = t => (...e) => { n(), t(...e) }, MethodChain.add(t, "send", i.send)) }
  const assign = Object.assign || function(t, ...e) { for (let s = 0, i = e.length; s < i; s++) { const i = Object(e[s]); for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (t[e] = i[e]) } return t };

  function capitalize(t) { return t.charAt(0).toUpperCase() + t.slice(1) }

  function isObject(t) { return "object" == typeof t && null !== t }

  function now() { return +new Date }
  const uuid = function t(e) { return e ? (e ^ 16 * Math.random() >> e / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, t) };

  function provide(t, e) { const s = window.GoogleAnalyticsObject || "ga";
    window[s] = window[s] || function(...t) {
      (window[s].q = window[s].q || []).push(t) }, window.gaDevIds = window.gaDevIds || [], window.gaDevIds.indexOf(DEV_ID) < 0 && window.gaDevIds.push(DEV_ID), window[s]("provide", t, e), window.gaplugins = window.gaplugins || {}, window.gaplugins[capitalize(t)] = e } class EventEmitter { constructor() { this.registry_ = {} } on(t, e) { this.getRegistry_(t).push(e) } off(t, e) { if (t && e) { const s = this.getRegistry_(t),
          i = s.indexOf(e);
        i > -1 && s.splice(i, 1) } else this.registry_ = {} } emit(t, ...e) { this.getRegistry_(t).forEach(t => t(...e)) } getEventCount() { let t = 0; return Object.keys(this.registry_).forEach(e => { t += this.getRegistry_(e).length }), t } getRegistry_(t) { return this.registry_[t] = this.registry_[t] || [] } }
  const AUTOTRACK_PREFIX = "autotrack",
    instances$1 = {};
  let isListening = !1,
    browserSupportsLocalStorage;
  class Store extends EventEmitter { static getOrCreate(t, e, s) { const i = [AUTOTRACK_PREFIX, t, e].join(":"); return instances$1[i] || (instances$1[i] = new Store(i, s), isListening || initStorageListener()), instances$1[i] } static isSupported_() { if (null != browserSupportsLocalStorage) return browserSupportsLocalStorage; try { window.localStorage.setItem(AUTOTRACK_PREFIX, AUTOTRACK_PREFIX), window.localStorage.removeItem(AUTOTRACK_PREFIX), browserSupportsLocalStorage = !0 } catch (t) { browserSupportsLocalStorage = !1 } return browserSupportsLocalStorage } static get_(t) { return window.localStorage.getItem(t) } static set_(t, e) { window.localStorage.setItem(t, e) } static clear_(t) { window.localStorage.removeItem(t) } constructor(t, e = {}) { super(), this.key_ = t, this.defaults_ = e, this.cache_ = null } get() { if (this.cache_) return this.cache_; if (Store.isSupported_()) try { this.cache_ = parse$2(Store.get_(this.key_)) } catch (t) {}
      return this.cache_ = assign({}, this.defaults_, this.cache_) } set(t) { if (this.cache_ = assign({}, this.defaults_, this.cache_, t), Store.isSupported_()) try { Store.set_(this.key_, JSON.stringify(this.cache_)) } catch (t) {} } clear() { if (this.cache_ = {}, Store.isSupported_()) try { Store.clear_(this.key_) } catch (t) {} } destroy() { delete instances$1[this.key_], Object.keys(instances$1).length || removeStorageListener() } }

  function initStorageListener() { window.addEventListener("storage", storageListener), isListening = !0 }

  function removeStorageListener() { window.removeEventListener("storage", storageListener), isListening = !1 }

  function storageListener(t) { const e = instances$1[t.key]; if (e) { const s = assign({}, e.defaults_, parse$2(t.oldValue)),
        i = assign({}, e.defaults_, parse$2(t.newValue));
      e.cache_ = i, e.emit("externalSet", i, s) } }

  function parse$2(t) { let e = {}; if (t) try { e = JSON.parse(t) } catch (t) {}
    return e }
  const SECONDS = 1e3,
    MINUTES = 60 * SECONDS,
    instances$2 = {};
  class Session { static getOrCreate(t, e, s) { const i = t.get("trackingId"); return instances$2[i] ? instances$2[i] : instances$2[i] = new Session(t, e, s) } constructor(t, e, s) { this.tracker = t, this.timeout = e || Session.DEFAULT_TIMEOUT, this.timeZone = s, this.sendHitTaskOverride = this.sendHitTaskOverride.bind(this), MethodChain.add(t, "sendHitTask", this.sendHitTaskOverride); try { this.dateTimeFormatter = new Intl.DateTimeFormat("en-US", { timeZone: this.timeZone }) } catch (t) {} this.store = Store.getOrCreate(t.get("trackingId"), "session", { hitTime: 0, isExpired: !1 }), this.store.get().id || this.store.set({ id: uuid() }) } getId() { return this.store.get().id } isExpired(t = this.getId()) { if (t != this.getId()) return !0; const e = this.store.get(); if (e.isExpired) return !0; const s = e.hitTime; if (s) { const t = new Date,
          e = new Date(s); if (t - e > this.timeout * MINUTES || this.datesAreDifferentInTimezone(t, e)) return !0 } return !1 } datesAreDifferentInTimezone(t, e) { return !!this.dateTimeFormatter && this.dateTimeFormatter.format(t) != this.dateTimeFormatter.format(e) } sendHitTaskOverride(t) { return e => { t(e); const s = e.get("sessionControl"),
          i = "start" == s || this.isExpired(),
          n = "end" == s,
          r = this.store.get();
        r.hitTime = now(), i && (r.isExpired = !1, r.id = uuid()), n && (r.isExpired = !0), this.store.set(r) } } destroy() { MethodChain.remove(this.tracker, "sendHitTask", this.sendHitTaskOverride), this.store.destroy(), delete instances$2[this.tracker.get("trackingId")] } } Session.DEFAULT_TIMEOUT = 30;
  const plugins = { CLEAN_URL_TRACKER: 1, EVENT_TRACKER: 2, IMPRESSION_TRACKER: 3, MEDIA_QUERY_TRACKER: 4, OUTBOUND_FORM_TRACKER: 5, OUTBOUND_LINK_TRACKER: 6, PAGE_VISIBILITY_TRACKER: 7, SOCIAL_WIDGET_TRACKER: 8, URL_CHANGE_TRACKER: 9, MAX_SCROLL_TRACKER: 10 },
    PLUGIN_COUNT = Object.keys(plugins).length;

  function trackUsage(t, e) { trackVersion(t), trackPlugin(t, e) }

  function convertHexToBin(t) { return parseInt(t || "0", 16).toString(2) }

  function convertBinToHex(t) { return parseInt(t || "0", 2).toString(16) }

  function padZeros(t, e) { if (t.length < e) { let s = e - t.length; for (; s;) t = "0" + t, s-- } return t }

  function flipBitOn(t, e) { return t.substr(0, e) + 1 + t.substr(e + 1) }

  function trackPlugin(t, e) { let s = padZeros(convertHexToBin(t.get("&" + USAGE_PARAM)), PLUGIN_COUNT);
    s = flipBitOn(s, PLUGIN_COUNT - e), t.set("&" + USAGE_PARAM, convertBinToHex(s)) }

  function trackVersion(t) { t.set("&" + VERSION_PARAM, VERSION) }
  const HIDDEN = "hidden",
    VISIBLE = "visible",
    PAGE_ID = uuid(),
    SECONDS$1 = 1e3;
  class PageVisibilityTracker { constructor(t, e) { if (trackUsage(t, plugins.PAGE_VISIBILITY_TRACKER), !document.visibilityState) return; const s = { sessionTimeout: Session.DEFAULT_TIMEOUT, visibleThreshold: 5 * SECONDS$1, sendInitialPageview: !1, fieldsObj: {} };
      this.opts = assign(s, e), this.tracker = t, this.lastPageState = document.visibilityState, this.visibleThresholdTimeout_ = null, this.isInitialPageviewSent_ = !1, this.trackerSetOverride = this.trackerSetOverride.bind(this), this.handleChange = this.handleChange.bind(this), this.handleWindowUnload = this.handleWindowUnload.bind(this), this.handleExternalStoreSet = this.handleExternalStoreSet.bind(this), this.store = Store.getOrCreate(t.get("trackingId"), "plugins/page-visibility-tracker"), this.store.on("externalSet", this.handleExternalStoreSet), this.session = Session.getOrCreate(t, this.opts.sessionTimeout, this.opts.timeZone), MethodChain.add(t, "set", this.trackerSetOverride), window.addEventListener("unload", this.handleWindowUnload), document.addEventListener("visibilitychange", this.handleChange), deferUntilPluginsLoaded(this.tracker, () => { document.visibilityState == VISIBLE ? (this.opts.sendInitialPageview && (this.sendPageview({ isPageLoad: !0 }), this.isInitialPageviewSent_ = !0), this.store.set({ time: now(), state: VISIBLE, pageId: PAGE_ID, sessionId: this.session.getId() })) : this.opts.sendInitialPageview && this.opts.pageLoadsMetricIndex && this.sendPageLoad() }) } handleChange() { if (document.visibilityState != VISIBLE && document.visibilityState != HIDDEN) return; const t = this.getAndValidateChangeData(),
        e = { time: now(), state: document.visibilityState, pageId: PAGE_ID, sessionId: this.session.getId() };
      document.visibilityState == VISIBLE && this.opts.sendInitialPageview && !this.isInitialPageviewSent_ && (this.sendPageview(), this.isInitialPageviewSent_ = !0), document.visibilityState == HIDDEN && this.visibleThresholdTimeout_ && clearTimeout(this.visibleThresholdTimeout_), this.session.isExpired(t.sessionId) ? (this.store.clear(), this.lastPageState == HIDDEN && document.visibilityState == VISIBLE && (clearTimeout(this.visibleThresholdTimeout_), this.visibleThresholdTimeout_ = setTimeout(() => { this.store.set(e), this.sendPageview({ hitTime: e.time }) }, this.opts.visibleThreshold))) : (t.pageId == PAGE_ID && t.state == VISIBLE && this.sendPageVisibilityEvent(t), this.store.set(e)), this.lastPageState = document.visibilityState } getAndValidateChangeData() { const t = this.store.get(); return this.lastPageState == VISIBLE && t.state == HIDDEN && t.pageId != PAGE_ID && (t.state = VISIBLE, t.pageId = PAGE_ID, this.store.set(t)), t } sendPageVisibilityEvent(t, { hitTime: e } = {}) { const s = this.getTimeSinceLastStoredChange(t, { hitTime: e }); if (s && s >= this.opts.visibleThreshold) { const t = Math.round(s / SECONDS$1),
          i = { transport: "beacon", nonInteraction: !0, eventCategory: "Page Visibility", eventAction: "track", eventValue: t, eventLabel: NULL_DIMENSION };
        e && (i.queueTime = now() - e), this.opts.visibleMetricIndex && (i["metric" + this.opts.visibleMetricIndex] = t), this.tracker.send("event", createFieldsObj(i, this.opts.fieldsObj, this.tracker, this.opts.hitFilter)) } } sendPageLoad() { const t = { transport: "beacon", eventCategory: "Page Visibility", eventAction: "page load", eventLabel: NULL_DIMENSION, ["metric" + this.opts.pageLoadsMetricIndex]: 1, nonInteraction: !0 };
      this.tracker.send("event", createFieldsObj(t, this.opts.fieldsObj, this.tracker, this.opts.hitFilter)) } sendPageview({ hitTime: t, isPageLoad: e } = {}) { const s = { transport: "beacon" };
      t && (s.queueTime = now() - t), e && this.opts.pageLoadsMetricIndex && (s["metric" + this.opts.pageLoadsMetricIndex] = 1), this.tracker.send("pageview", createFieldsObj(s, this.opts.fieldsObj, this.tracker, this.opts.hitFilter)) } trackerSetOverride(t) { return (e, s) => { const i = isObject(e) ? e : {
          [e]: s };
        i.page && i.page !== this.tracker.get("page") && this.lastPageState == VISIBLE && this.handleChange(), t(e, s) } } getTimeSinceLastStoredChange(t, { hitTime: e } = {}) { return t.time ? (e || now()) - t.time : 0 } handleExternalStoreSet(t, e) { t.time != e.time && (e.pageId != PAGE_ID || e.state != VISIBLE || this.session.isExpired(e.sessionId) || this.sendPageVisibilityEvent(e, { hitTime: t.time })) } handleWindowUnload() { this.lastPageState != HIDDEN && this.handleChange() } remove() { this.store.destroy(), this.session.destroy(), MethodChain.remove(this.tracker, "set", this.trackerSetOverride), window.removeEventListener("unload", this.handleWindowUnload), document.removeEventListener("visibilitychange", this.handleChange) } } provide("pageVisibilityTracker", PageVisibilityTracker), window.$ = $, window.$$ = $$, window.Browser = Browser, replaceSvgImports(), $html.addClass((Browser.isMobile ? "is" : "not") + "-mobile"), Browser.isSafari && $html.addClass("is-safari"), setTimeout(() => $html.addClass("ready")), exports.Course = class extends CustomElementView { constructor() { super(...arguments), this.user = window.user, this.model = observable({ $course: this }), this.isCompleted = !1, this.isReady = !1 } created() { this.glossary = JSON.parse(this.$("#glossary").text) || {}, this.userData = JSON.parse(this.$("#userdata").text) || {}, this.$steps = this.$$("x-step"); for (let t of this.$steps) t.on("score", () => this.trigger("score")), t.initialData = (this.userData.steps || {})[t.id] || void 0 } ready() { this.$footer = this.$("footer"), this.$skipStep = this.$footer.$(".skip-step"), this.$progress = this.$(".sidebar-row.on x-progress"), this.$tutor = this.$("x-tutor"), this.$stepsWrap = this.$(".steps"); const t = this.findStep(Browser.getHash()),
        e = this.findStep(this.userData.activeStep);
      this.$activeStep = e || this.$steps[0]; for (let t of this.$steps) { if (t.show(), t === this.$activeStep) break;
        t.complete() } if (this.userData.completed || "full" === Browser.getHash()) this.complete();
      else
        for (; this.$activeStep && this.$activeStep.isReady && !this.isCompleted;) this.nextStep();
      (t || e && !this.userData.completed) && this.goToStep(t || e, !1), this.$(".section-dev") && this.complete(); const s = this.$(".reveal-banner");
      setTimeout(() => { this.isCompleted || (s.removeClass("off"), this.on("score complete", () => s.addClass("off"))) }, 1500), s.$(".complete").one("click", () => this.complete()), Browser.onKey("space", t => { t.preventDefault(), this.nextStep(), s.addClass("off") }), this.$footer.$(".skip").on("click", () => this.nextStep()), this.$footer.$(".show-all").on("click", () => this.complete()), this.isReady = !0, setTimeout(() => this.addClass("ready")) } nextStep() { if (this.isCompleted) return; let t = this.$activeStep; const e = this.$stepsWrap.height;
      do { if (t.complete(), !(t = this.$steps[this.$steps.indexOf(t) + 1])) return this.complete(!0);
        t.show() } while (t.isReady);
      this.$stepsWrap.animate({ height: [e + "px", "auto"] }, 800), this.$activeStep = t, this.saveProgress({ activeStep: t.id }) } goToStep(t, e = !0) { const s = this.$stepsWrap.height; for (let e of this.$steps) { if (e.isShown || (this.$activeStep = e), e.show(), t.isShown && !e.isReady) break;
        e.complete() } const i = t.positionTop - Math.max(50, (Browser.height - t.height) / 2);
      e ? (this.$stepsWrap.animate({ height: [s + "px", "auto"] }, 800), $body.scrollTo(i)) : $body.scrollTop = i; const n = last(this.$steps); if (n.isShown && n.isReady) return this.complete();
      this.$activeStep && this.saveProgress({ activeStep: this.$activeStep.id }) } complete(t = !1) { if (this.isCompleted) return;
      this.isCompleted = !0, this.$steps.forEach(t => t.complete()), this.$activeStep = void 0; const e = this.$footer.$(".next-section");
      t ? (this.$skipStep.exit("fade", 200), e && e.enter("pop")) : (this.$skipStep.hide(), e && e.show()), this.trigger("complete"), this.saveProgress({ completed: !0 }), this.log("Course", "complete") } findStep(t) { for (let e of this.$steps)
        if (e.id === t) return e } saveProgress(t) { if (!this.isReady) return; const e = total(this.$steps.map(t => t.scores.size));
      this.$progress.setProgress(e / +this.data.goals || 0) } log(t, e, s) {} }, exports.Course = __decorate([register("x-course")], exports.Course);
  const $sidebar = $(".sidebar");
  return $sidebar && ($(".sidebar-toggle").on("click", () => $sidebar.addClass("open")), $(".sidebar-shadow").on("pointerdown", () => $sidebar.removeClass("open"))), exports
}({});