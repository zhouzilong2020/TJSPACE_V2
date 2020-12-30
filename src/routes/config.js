export default {
    routes: [
        {
            path: "/courseInfo/:courseId/:currentPage",
            name: 'courseInfo',
            component: () => import("@/pages/CourseInfo"),
        }, {
            path: "/login",
            name: "login",
            component: () => import("@/pages/Login"),
        }, {
            path: "/register",
            name: "register",
            component: () => import("@/pages/Reg"),
        }, {
            path: "/BBSHomepage",
            name: "BBSHomepage",
            component: () => import("@/pages/BBSHomePage"),
        }, {
            path: "/Forum/:postId",
            name: "Forum",
            component: () => import("@/pages/Forum"),
        }, {
            path: "/Forum",
            name: "EmptyForum",
            component: () => import("@/pages/Forum"),
        }, {
            path: "/SearchCourse/:keyword",
            name: "SearchCourse",
            component: () => import("@/pages/SearchCourse"),
        }, {
            path: "/SearchCourse",
            name: "SearchCourseNoKeyword",
            component: () => import("@/pages/SearchCourse"),
        }, {
            path: "/Homepage/:userId",
            name: "Homepage",
            component: () => import("@/pages/Homepage"),
        }, {
            path: "/SelfInfoModify/:userId",
            name: 'SelfInfoModify',
            component: () => import("@/pages/SelfInfoModify"),
        }, {
            path: "/makeComment/:courseId",
            name: 'MakeComment',
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