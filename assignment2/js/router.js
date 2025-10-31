const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
      {
        path: '/job/:id',
        component: JobDetails
      },
      {path: '/', component: JobOverview}
  ]

});

const app = Vue.createApp({});
app.component('job-list', JobList); 
app.use(router);
app.mount('#app');