
var __cov_$0Kgd0rAJjexUm0AkCi3IA = (Function('return this'))();
if (!__cov_$0Kgd0rAJjexUm0AkCi3IA.__coverage__) { __cov_$0Kgd0rAJjexUm0AkCi3IA.__coverage__ = {}; }
__cov_$0Kgd0rAJjexUm0AkCi3IA = __cov_$0Kgd0rAJjexUm0AkCi3IA.__coverage__;
if (!(__cov_$0Kgd0rAJjexUm0AkCi3IA['app/config/routes.js'])) {
   __cov_$0Kgd0rAJjexUm0AkCi3IA['app/config/routes.js'] = {"path":"app/config/routes.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":1,"20":0,"21":0,"22":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"(anonymous_1)","line":5,"loc":{"start":{"line":5,"column":17},"end":{"line":5,"column":50}}},"2":{"name":"(anonymous_2)","line":8,"loc":{"start":{"line":8,"column":23},"end":{"line":8,"column":54}}},"3":{"name":"(anonymous_3)","line":21,"loc":{"start":{"line":21,"column":23},"end":{"line":21,"column":49}}},"4":{"name":"isLoggedIn","line":41,"loc":{"start":{"line":41,"column":4},"end":{"line":41,"column":40}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":47}},"2":{"start":{"line":2,"column":0},"end":{"line":2,"column":49}},"3":{"start":{"line":3,"column":0},"end":{"line":3,"column":35}},"4":{"start":{"line":5,"column":0},"end":{"line":54,"column":2}},"5":{"start":{"line":8,"column":4},"end":{"line":15,"column":6}},"6":{"start":{"line":9,"column":8},"end":{"line":9,"column":33}},"7":{"start":{"line":10,"column":8},"end":{"line":13,"column":11}},"8":{"start":{"line":16,"column":4},"end":{"line":16,"column":26}},"9":{"start":{"line":21,"column":4},"end":{"line":23,"column":7}},"10":{"start":{"line":22,"column":8},"end":{"line":22,"column":42}},"11":{"start":{"line":27,"column":4},"end":{"line":27,"column":83}},"12":{"start":{"line":28,"column":4},"end":{"line":28,"column":46}},"13":{"start":{"line":29,"column":4},"end":{"line":29,"column":91}},"14":{"start":{"line":31,"column":4},"end":{"line":31,"column":74}},"15":{"start":{"line":32,"column":4},"end":{"line":32,"column":63}},"16":{"start":{"line":33,"column":4},"end":{"line":33,"column":68}},"17":{"start":{"line":34,"column":4},"end":{"line":34,"column":74}},"18":{"start":{"line":35,"column":4},"end":{"line":35,"column":73}},"19":{"start":{"line":41,"column":4},"end":{"line":49,"column":5}},"20":{"start":{"line":44,"column":8},"end":{"line":45,"column":26}},"21":{"start":{"line":45,"column":12},"end":{"line":45,"column":26}},"22":{"start":{"line":48,"column":8},"end":{"line":48,"column":26}}},"branchMap":{"1":{"line":44,"type":"if","locations":[{"start":{"line":44,"column":8},"end":{"line":44,"column":8}},{"start":{"line":44,"column":8},"end":{"line":44,"column":8}}]}}};
}
__cov_$0Kgd0rAJjexUm0AkCi3IA = __cov_$0Kgd0rAJjexUm0AkCi3IA['app/config/routes.js'];
__cov_$0Kgd0rAJjexUm0AkCi3IA.s['1']++;var project=require('../controller/Project');__cov_$0Kgd0rAJjexUm0AkCi3IA.s['2']++;var security=require('../controller/Security');__cov_$0Kgd0rAJjexUm0AkCi3IA.s['3']++;var passport=require('passport');__cov_$0Kgd0rAJjexUm0AkCi3IA.s['4']++;module.exports=function(app,config,passport){__cov_$0Kgd0rAJjexUm0AkCi3IA.f['1']++;__cov_$0Kgd0rAJjexUm0AkCi3IA.s['5']++;var errorHandler=function(err,req,res,next){__cov_$0Kgd0rAJjexUm0AkCi3IA.f['2']++;__cov_$0Kgd0rAJjexUm0AkCi3IA.s['6']++;console.error(err.stack);__cov_$0Kgd0rAJjexUm0AkCi3IA.s['7']++;res.status(500).json({text:'Internal error',error:err});};__cov_$0Kgd0rAJjexUm0AkCi3IA.s['8']++;app.use(errorHandler);__cov_$0Kgd0rAJjexUm0AkCi3IA.s['9']++;app.route('/').get(function(req,res,next){__cov_$0Kgd0rAJjexUm0AkCi3IA.f['3']++;__cov_$0Kgd0rAJjexUm0AkCi3IA.s['10']++;res.send(200,'PAC timetracker3');});__cov_$0Kgd0rAJjexUm0AkCi3IA.s['11']++;app.post('/auth/login',passport.authenticate('local'),security.sendAuthData);__cov_$0Kgd0rAJjexUm0AkCi3IA.s['12']++;app.post('/auth/logout',security.logout);__cov_$0Kgd0rAJjexUm0AkCi3IA.s['13']++;app.post('/auth/signup',passport.authenticate('local-signup'),security.sendAuthData);__cov_$0Kgd0rAJjexUm0AkCi3IA.s['14']++;app.get('/projects/visible',isLoggedIn,project.listVisibleProjects);__cov_$0Kgd0rAJjexUm0AkCi3IA.s['15']++;app.get('/projects/',isLoggedIn,project.listAllProjects);__cov_$0Kgd0rAJjexUm0AkCi3IA.s['16']++;app.put('/project/:projectId',isLoggedIn,project.saveProject);__cov_$0Kgd0rAJjexUm0AkCi3IA.s['17']++;app.post('/project/:projectId',isLoggedIn,project.createNewProject);__cov_$0Kgd0rAJjexUm0AkCi3IA.s['18']++;app.delete('/project/:projectId',isLoggedIn,project.deleteProject);function isLoggedIn(req,res,next){__cov_$0Kgd0rAJjexUm0AkCi3IA.f['4']++;__cov_$0Kgd0rAJjexUm0AkCi3IA.s['20']++;if(req.isAuthenticated()){__cov_$0Kgd0rAJjexUm0AkCi3IA.b['1'][0]++;__cov_$0Kgd0rAJjexUm0AkCi3IA.s['21']++;return next();}else{__cov_$0Kgd0rAJjexUm0AkCi3IA.b['1'][1]++;}__cov_$0Kgd0rAJjexUm0AkCi3IA.s['22']++;res.redirect('/');}};