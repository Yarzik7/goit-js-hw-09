!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var r=t[e];delete t[e];var o={id:e,exports:{}};return n[e]=o,r.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},e.parcelRequired7c6=r);var o=r("h6c0i"),i=document.querySelector(".form");function u(e,n){return new Promise((function(t,r){return setTimeout((function(){var o=Math.random()>.3,i={position:e,delay:n};o?t(i):r(i)}),n)}))}i.addEventListener("submit",(function(e){e.preventDefault();var n=e.currentTarget.elements,t=n.delay.value,r=n.step.value,a=n.amount.value;t=Number(t),r=Number(r),a=Number(a);for(var c=1;c<=a;c+=1)u(c,t).then((function(e){var n=e.position,t=e.delay;return o.Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(t,"ms"))})).catch((function(e){var n=e.position,t=e.delay;return o.Notify.failure("❌ Rejected promise ".concat(n," in ").concat(t,"ms"))})),t+=r;i.reset()}))}();
//# sourceMappingURL=03-promises.441d9950.js.map
