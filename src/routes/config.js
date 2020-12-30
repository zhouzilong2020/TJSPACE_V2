export default {
    routes: [
        {
<<<<<<< HEAD
            path: "/courseComment/:courseId",
            name: 'courseComment',
            component: () => import("@/components/courseInfo/CourseComment"),
=======
            path: "/:postId",
            name: 'index',
            component: () => import("@/pages/Forum"),
>>>>>>> f7c72e8c997b8ab6cc47e514967164d2e7259f43
        },
        {
            path: "/courseInfo/:courseId/:teacherId",
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
            path: "/makeComment/:courseId/:teacherId",
            name: 'MakeComment',
            component: () => import("@/pages/MakeComment"),
        },
<<<<<<< HEAD
        {
            path: "/",
            name: 'index',
            component: () => import("@/pages/index"),
        },
=======
         {
             path: "/",  //表示匹配所有路径
             name: 'index',
             component: () => import("@/pages/index"),
         }, 
>>>>>>> f7c72e8c997b8ab6cc47e514967164d2e7259f43
        {
            path: "*",  //表示匹配所有路径
            component: () => import("@/pages/index"),
        }
    ],
    mode: "history",
}