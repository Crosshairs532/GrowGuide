"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRouter = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user-management/user.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const post_routes_1 = require("../modules/post/post.routes");
const routes_1 = require("../modules/PDF/routes");
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/auth',
        route: auth_routes_1.authRoute,
    },
    {
        path: '/user-management',
        route: user_routes_1.userRoute,
    },
    {
        path: '/payment',
        route: payment_routes_1.paymentRoute,
    },
    {
        path: '/post',
        route: post_routes_1.postRoute,
    },
    {
        path: '/generate',
        route: routes_1.pdfRouter,
    },
];
routes.forEach(route => {
    router.use(route.path, route.route);
});
exports.allRouter = router;
