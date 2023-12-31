! function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function (A) {
    var a, e, t, i = (e = document.createElement("input"), t = "onpaste", e.setAttribute(t, ""), ("function" == typeof e[t] ? "paste" : "input") + ".mask"),
        n = navigator.userAgent,
        S = /iphone/i.test(n),
        T = /chrome/i.test(n),
        w = /android/i.test(n);
    A.mask = {
        definitions: {
            9: "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, A.fn.extend({
        caret: function (e, t) {
            var n;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function () {
                this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && ((n = this.createTextRange()).collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select())
            })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), {
                begin: e,
                end: t
            })
        },
        unmask: function () {
            return this.trigger("unmask")
        },
        mask: function (t, v) {
            var n, b, k, y, x, j, R;
            if (!t && 0 < this.length) {
                var e = A(this[0]).data(A.mask.dataName);
                return e ? e() : void 0
            }
            return v = A.extend({
                autoclear: A.mask.autoclear,
                placeholder: A.mask.placeholder,
                completed: null
            }, v), n = A.mask.definitions, b = [], k = j = t.length, y = null, A.each(t.split(""), function (e, t) {
                "?" == t ? (j--, k = e) : n[t] ? (b.push(new RegExp(n[t])), null === y && (y = b.length - 1), e < k && (x = b.length - 1)) : b.push(null)
            }), this.trigger("unmask").each(function () {
                function o() {
                    if (v.completed) {
                        for (var e = y; e <= x; e++)
                            if (b[e] && m[e] === c(e)) return;
                        v.completed.call(g)
                    }
                }

                function c(e) {
                    return v.placeholder.charAt(e < v.placeholder.length ? e : 0)
                }

                function u(e) {
                    for (; ++e < j && !b[e];);
                    return e
                }

                function l(e, t) {
                    var n, a;
                    if (!(e < 0)) {
                        for (n = e, a = u(t); n < j; n++)
                            if (b[n]) {
                                if (!(a < j && b[n].test(m[a]))) break;
                                m[n] = m[a], m[a] = c(a), a = u(a)
                            } s(), g.caret(Math.max(y, e))
                    }
                }

                function r() {
                    h(), g.val() != p && g.change()
                }

                function f(e, t) {
                    for (var n = e; n < t && n < j; n++) b[n] && (m[n] = c(n))
                }

                function s() {
                    g.val(m.join(""))
                }

                function h(e) {
                    for (var t, n = g.val(), a = -1, i = 0, r = 0; i < j; i++)
                        if (b[i]) {
                            for (m[i] = c(i); r++ < n.length;)
                                if (t = n.charAt(r - 1), b[i].test(t)) {
                                    m[i] = t, a = i;
                                    break
                                } if (r > n.length) {
                                f(i + 1, j);
                                break
                            }
                        } else m[i] === n.charAt(r) && r++, i < k && (a = i);
                    return e ? s() : a + 1 < k ? v.autoclear || m.join("") === d ? (g.val() && g.val(""), f(0, j)) : s() : (s(), g.val(g.val().substring(0, a + 1))), k ? i : y
                }
                var g = A(this),
                    m = A.map(t.split(""), function (e, t) {
                        return "?" != e ? n[e] ? c(t) : e : void 0
                    }),
                    d = m.join(""),
                    p = g.val();
                g.data(A.mask.dataName, function () {
                    return A.map(m, function (e, t) {
                        return b[t] && e != c(t) ? e : null
                    }).join("")
                }), g.one("unmask", function () {
                    g.off(".mask").removeData(A.mask.dataName)
                }).on("focus.mask", function () {
                    var e;
                    g.prop("readonly") || (clearTimeout(a), p = g.val(), e = h(), a = setTimeout(function () {
                        s(), e == t.replace("?", "").length ? g.caret(0, e) : g.caret(e)
                    }, 10))
                }).on("blur.mask", r).on("keydown.mask", function (e) {
                    var t, n, a, i;
                    g.prop("readonly") || (i = e.which || e.keyCode, R = g.val(), 8 === i || 46 === i || S && 127 === i ? (n = (t = g.caret()).begin, (a = t.end) - n == 0 && (n = 46 !== i ? function (e) {
                        for (; 0 <= --e && !b[e];);
                        return e
                    }(n) : a = u(n - 1), a = 46 === i ? u(a) : a), f(n, a), l(n, a - 1), e.preventDefault()) : 13 === i ? r.call(this, e) : 27 === i && (g.val(p), g.caret(0, h()), e.preventDefault()))
                }).on("keypress.mask", function (e) {
                    var t, n, a, i, r;
                    g.prop("readonly") || (i = e.which || e.keyCode, r = g.caret(), e.ctrlKey || e.altKey || e.metaKey || i < 32 || !i || 13 === i || (r.end - r.begin != 0 && (f(r.begin, r.end), l(r.begin, r.end - 1)), (t = u(r.begin - 1)) < j && (n = String.fromCharCode(i), b[t].test(n)) && (function (e) {
                        for (var t, n, a = e, i = c(e); a < j; a++)
                            if (b[a]) {
                                if (t = u(a), n = m[a], m[a] = i, !(t < j && b[t].test(n))) break;
                                i = n
                            }
                    }(t), m[t] = n, s(), a = u(t), w ? setTimeout(function () {
                        A.proxy(A.fn.caret, g, a)()
                    }, 0) : g.caret(a), r.begin <= x && o()), e.preventDefault()))
                }).on(i, function () {
                    g.prop("readonly") || setTimeout(function () {
                        var e = h(!0);
                        g.caret(e), o()
                    }, 0)
                }), T && w && g.off("input.mask").on("input.mask", function () {
                    var e = g.val(),
                        t = g.caret();
                    if (e.length < R.length) {
                        for (h(!0); 0 < t.begin && !b[t.begin - 1];) t.begin--;
                        if (0 === t.begin)
                            for (; t.begin < y && !b[t.begin];) t.begin++;
                        g.caret(t.begin, t.begin)
                    } else {
                        for (h(!0); t.begin < j && !b[t.begin];) t.begin++;
                        g.caret(t.begin, t.begin)
                    }
                    o()
                }), h()
            })
        }
    })
});