'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var router = new _koaRouter2.default();
router.get('/', function (ctx) {
    ctx.body = JSON.stringify(ctx);
});exports.default =

router;
//# sourceMappingURL=json.js.map