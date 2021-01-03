export default {
    routes: [
        {
            path: "/courseInfo/:courseId/:currentPage",
            name: 'courseInfo',
            meta: {
                requireAuth: true
            },
            component: () => import("@/pages/CourseInfo"),
        },
        {
            path: "/login",
            name: "login",
            meta: {
                requireAuth: false,
            },
            component: () => import("@/pages/Login"),
        }, {
            path: "/register",
            name: "register",
            meta: {
                requireAuth: false,
            },
            component: () => import("@/pages/Reg"),
        }, {
            path: "/BBSHomepage",
            name: "BBSHomepage",
            meta: {
                requireAuth: true,
            },
            component: () => import("@/pages/BBSHomePage"),
        }, {
            path: "/Forum/:postId",
            name: "Forum",
            meta: {
                requireAuth: true,
            },
            component: () => import("@/pages/Forum"),
        }, {
            path: "/Forum",
            name: "EmptyForum",
            meta: {
                requireAuth: true,
            },
            component: () => import("@/pages/Forum"),
        }, {
            path: "/SearchCourse/:keyword",
            name: "SearchCourse",
            meta: {
                requireAuth: true,
            },
            component: () => import("@/pages/SearchCourse"),
        }, {
            path: "/SearchCourse",
            name: "SearchCourseNoKeyword",
            meta: {
                requireAuth: true,
            },
            component: () => import("@/pages/SearchCourse"),
        }, {
            path: "/Homepage",
            name: "Homepage",
            meta: {
                requireAuth: true,
            },
            component: () => import("@/pages/Homepage"),
        }, {
            path: "/SelfInfoModify",
            name: 'SelfInfoModify',
            meta: {
                requireAuth: true,
            },
            component: () => import("@/pages/SelfInfoModify"),
        }, {
            path: "/makeComment/:courseId",
            name: 'MakeComment',
            meta: {
                requireAuth: true,
            },
            component: () => import("@/pages/MakeComment"),
        },
        {
            path: "/",  //表示匹配所有路径
            name: 'index',
            component: () => import("@/pages/index"),
        },
        {
            path: "*",  //表示匹配所有路径
            component: () => import("@/pages/index"),
        }
    ],
    mode: "history",
}