import {
  appendErrors,
  get
} from "./chunk-XIHYDKOK.js";
import "./chunk-JBG67EE7.js";
import "./chunk-UV5CTPV7.js";

// node_modules/@hookform/resolvers/dist/resolvers.mjs
var t = function(t2, n2, e2) {
  if (t2 && "reportValidity" in t2) {
    var i2 = get(e2, n2);
    t2.setCustomValidity(i2 && i2.message || ""), t2.reportValidity();
  }
};
var n = function(r, n2) {
  var e2 = function(e3) {
    var i3 = n2.fields[e3];
    i3 && i3.ref && "reportValidity" in i3.ref ? t(i3.ref, e3, r) : i3.refs && i3.refs.forEach(function(n3) {
      return t(n3, e3, r);
    });
  };
  for (var i2 in n2.fields)
    e2(i2);
};
var e = function(r) {
  return r instanceof Date;
};
var i = function(r) {
  return null == r;
};
var a = function(r) {
  return "object" == typeof r;
};
var o = function(r) {
  return !i(r) && !Array.isArray(r) && a(r) && !e(r);
};
var f = function(r) {
  return /^\w*$/.test(r);
};
var s = function(r, t2, n2) {
  for (var e2 = -1, i2 = f(t2) ? [t2] : function(r2) {
    return t3 = r2.replace(/["|']|\]/g, "").split(/\.|\[/), Array.isArray(t3) ? t3.filter(Boolean) : [];
    var t3;
  }(t2), a2 = i2.length, s2 = a2 - 1; ++e2 < a2; ) {
    var u2 = i2[e2], c2 = n2;
    if (e2 !== s2) {
      var l = r[u2];
      c2 = o(l) || Array.isArray(l) ? l : isNaN(+i2[e2 + 1]) ? {} : [];
    }
    r[u2] = c2, r = r[u2];
  }
  return r;
};
var u = function(t2, e2) {
  e2.shouldUseNativeValidation && n(t2, e2);
  var i2 = {};
  for (var a2 in t2) {
    var o3 = get(e2.fields, a2), f2 = Object.assign(t2[a2] || {}, { ref: o3 && o3.ref });
    if (c(e2.names || Object.keys(t2), a2)) {
      var u2 = Object.assign({}, get(i2, a2));
      s(u2, "root", f2), s(i2, a2, u2);
    } else
      s(i2, a2, f2);
  }
  return i2;
};
var c = function(r, t2) {
  return r.some(function(r2) {
    return r2.startsWith(t2 + ".");
  });
};

// node_modules/@hookform/resolvers/yup/dist/yup.mjs
function o2(o3, n2, a2) {
  return void 0 === n2 && (n2 = {}), void 0 === a2 && (a2 = {}), function(s2, i2, c2) {
    try {
      return Promise.resolve(function(t2, r) {
        try {
          var u2 = (n2.context && true && console.warn("You should not used the yup options context. Please, use the 'useForm' context object instead"), Promise.resolve(o3["sync" === a2.mode ? "validateSync" : "validate"](s2, Object.assign({ abortEarly: false }, n2, { context: i2 }))).then(function(t3) {
            return c2.shouldUseNativeValidation && n({}, c2), { values: a2.raw ? s2 : t3, errors: {} };
          }));
        } catch (e2) {
          return r(e2);
        }
        return u2 && u2.then ? u2.then(void 0, r) : u2;
      }(0, function(e2) {
        if (!e2.inner)
          throw e2;
        return { values: {}, errors: u((o4 = e2, n3 = !c2.shouldUseNativeValidation && "all" === c2.criteriaMode, (o4.inner || []).reduce(function(e3, t2) {
          if (e3[t2.path] || (e3[t2.path] = { message: t2.message, type: t2.type }), n3) {
            var o5 = e3[t2.path].types, a3 = o5 && o5[t2.type];
            e3[t2.path] = appendErrors(t2.path, n3, e3, t2.type, a3 ? [].concat(a3, t2.message) : t2.message);
          }
          return e3;
        }, {})), c2) };
        var o4, n3;
      }));
    } catch (e2) {
      return Promise.reject(e2);
    }
  };
}
export {
  o2 as yupResolver
};
//# sourceMappingURL=@hookform_resolvers_yup.js.map
