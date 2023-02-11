(function(){"use strict";var e={8725:function(e,t,n){var i=n(9242),s=n(3396),o=n(7139);const a={class:"wrapper"},r={class:"left-panel"},l=["onClick","title"],d={class:"groups-panel"},c={class:"actions-panel"},u={class:"list list-group"},p=["onClick"],k={class:"title-panel"},m={class:"title"},b={class:"actions-panel"},f=(0,s._)("button",{class:"btn"},[(0,s._)("i",{class:"bi bi-filter"}),(0,s.Uk)("Фильтр")],-1),g={class:"tasks-panel"},h={class:"block-name"},_={class:"title"};function v(e,t,n,v,w,D){const y=(0,s.up)("dropdown"),C=(0,s.up)("draggable_tasks_list");return(0,s.wg)(),(0,s.iD)("div",a,[(0,s._)("div",r,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(w.aMenu,((e,t)=>((0,s.wg)(),(0,s.iD)("button",{key:t,class:"btn",onClick:t=>D.fnClickLeftMenu(e),title:e.title},[(0,s._)("i",{class:(0,o.C_)("bi "+e.icon)},null,2)],8,l)))),128))]),"tasks"==e.sMode?((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[(0,s._)("div",d,[(0,s._)("div",c,[(0,s.wy)((0,s._)("input",{type:"text",class:"form-control","onUpdate:modelValue":t[0]||(t[0]=e=>w.sGroupsFilter=e)},null,512),[[i.nr,w.sGroupsFilter]]),(0,s.Wm)(y,{items:w.aGroupsDropdownMenu,onClickitem:e.fnGroupClickItem},null,8,["items","onClickitem"])]),(0,s._)("div",u,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(D.aGroups,((t,n)=>((0,s.wg)(),(0,s.iD)("button",{key:n,type:"button",class:(0,o.C_)("list-group-item list-group-item-action "+(t.id==e.sSelectedGroupID?"active":"")),onClick:n=>e.fnSelectGroup(t.id),"aria-current":"true"},(0,o.zw)(t.name),11,p)))),128))])]),e.oCurrentGroup?((0,s.wg)(),(0,s.iD)("div",{key:0,class:"tasks-panel-wrapper",style:(0,o.j5)({background:e.oCurrentGroup.color})},[(0,s._)("div",k,[(0,s._)("div",m,(0,o.zw)(e.oCurrentGroup.name),1),(0,s._)("div",b,[f,(0,s.Wm)(y,{items:w.aGroupsOptionsDropdownMenu,onClickitem:D.fnGroupOptionsClickItem},null,8,["items","onClickitem"])])]),(0,s._)("div",g,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.aCurrentGroupBlocks,((t,n)=>((0,s.wg)(),(0,s.iD)("div",{key:n,class:"block-panel"},[(0,s._)("div",h,[(0,s._)("div",_,(0,o.zw)(t.name),1),(0,s.Wm)(y,{items:w.aBlockDropdownMenu,onClickitem:e.fnBlockClickItem},null,8,["items","onClickitem"])]),(0,s.Wm)(C,{block_id:t.id},null,8,["block_id"])])))),128))])],4)):(0,s.kq)("",!0)],64)):(0,s.kq)("",!0)])}const w={class:"block-tasks list list-group"},D=(0,s._)("div",{class:"actions-panel"},[(0,s._)("div",{class:"btn"},[(0,s._)("i",{class:"bi bi-pencil"})])],-1),y={class:"title"},C={class:"description"};function I(e,t,n,i,a,r){const l=(0,s.up)("draggable");return(0,s.wg)(),(0,s.iD)("div",w,[(0,s.Wm)(l,{modelValue:r.aTasks,"onUpdate:modelValue":t[0]||(t[0]=e=>r.aTasks=e),"item-key":"id",group:"people","ghost-class":"ghost",onStart:t[1]||(t[1]=e=>a.drag=!0),onEnd:t[2]||(t[2]=e=>a.drag=!1)},{item:(0,s.w5)((({element:t})=>[(0,s._)("div",{type:"button",class:(0,o.C_)("list-card "+(t.id==e.sSelectedTaskID?"active":"")),"aria-current":"true"},[D,t.color?((0,s.wg)(),(0,s.iD)("div",{key:0,class:"task-color",style:(0,o.j5)({background:t.color})},null,4)):(0,s.kq)("",!0),(0,s._)("div",y,(0,o.zw)(t.name),1),(0,s._)("div",C,(0,o.zw)(t.short_description),1)],2)])),_:1},8,["modelValue"])])}var G=n(6983),O=n.n(G);function S(e){return e[0].split(" ")}function M(e){return{[e]:{get(){return this.$store.state[e]},set(t){this.$store.commit("fnUpdateVar",{sName:e,sV:t})}}}}function F(e){var t={},n=e.split(" ");for(var i of n)t=Object.assign(t,M(i));return t}var T={components:{draggable:O()},props:["block_id"],computed:{...F("sSelectedTaskID"),aTasks:{get(){return this.$store.getters.fnGetBlockTasks(this.block_id)},set(e){this.$store.commit("fnUpdateTasksListForBlock",{sBlockID:this.block_id,aList:e})}}},data(){return{drag:!1}}},B=n(89);const R=(0,B.Z)(T,[["render",I]]);var W=R;const z={class:"dropdown"},A=(0,s._)("i",{class:"bi bi-three-dots-vertical"},null,-1),E=[A],H=["onClick","innerHTML"];function P(e,t,n,i,a,r){return(0,s.wg)(),(0,s.iD)("div",z,[(0,s._)("a",{class:"btn dropdown-toggle",href:"#",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false",onClick:t[0]||(t[0]=(...e)=>r.fnMenuOpen&&r.fnMenuOpen(...e))},E),(0,s._)("ul",{class:(0,o.C_)("dropdown-menu "+(a.bOpened?"show":""))},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(a.aItems,(e=>((0,s.wg)(),(0,s.iD)("li",{key:e.id},[(0,s._)("a",{class:"dropdown-item",href:"#",onClick:t=>r.fnOnItemClick(e),innerHTML:e.title},null,8,H)])))),128))],2)])}var L={props:["items"],emits:["clickitem"],data(){return{aItems:this.items,bOpened:!1}},methods:{fnFocusOut(){this.bOpened=!1},fnMenuOpen(){this.bOpened=!this.bOpened},fnOnItemClick(e){this.bOpened=!1,this.$emit("clickitem",e)}},created(){window.addEventListener("click",(e=>{this.$el.contains(e.target)||(this.bOpened=!1)}))}};const j=(0,B.Z)(L,[["render",P]]);var K=j,x=n(65),U={name:"App",components:{dropdown:K,draggable_tasks_list:W},computed:{...(0,x.Se)(S`aCurrentGroupBlocks oCurrentGroup fnGetBlockTasks aTasks`),...F("sSelectedGroupID sSelectedTaskID sMode"),aGroups(){return this.$store.getters.fnFilterGroups(this.sGroupsFilter)}},data(){return{aMenu:[{id:"repo-window",title:"Выбрать репозиторий",icon:"bi-person-fill"},{id:"tasks",title:"Задачи",icon:"bi-layout-three-columns"}],sGroupsFilter:"",aGroupsDropdownMenu:[{id:"add",title:'<i class="bi bi-plus-lg"></i> Добавить'},{id:"edit",title:'<i class="bi bi-pencil"></i> Редактировать'},{id:"delete",title:'<i class="bi bi-trash"></i> Удалить'}],aBlockDropdownMenu:[{id:"add-task",title:'<i class="bi bi-plus-lg"></i> Добавить задачу'},{id:"edit",title:'<i class="bi bi-pencil"></i> Редактировать'},{id:"delete",title:'<i class="bi bi-trash"></i> Удалить'}],aGroupsOptionsDropdownMenu:[]}},methods:{...(0,x.OI)(S`fnSelectGroup fnSelectTask`),fnClickLeftMenu(e){"tasks"==e.id&&(this.sMode="tasks")},fnGroupOptionsClickItem(e){}}};const V=(0,B.Z)(U,[["render",v]]);var Z=V,N={tasks_groups_last_id:4,tasks_groups:[{id:1,color:"green",name:"Проект 1"},{id:2,color:"blue",name:"Проект 2"},{id:3,color:"darkgrey",name:"Проект 3"},{id:4,color:"brown",name:"Проект 4 длинное название"}],tasks_blocks_last_id:8,tasks_blocks:[{id:1,group_id:1,color:"grey",name:"Бэклог"},{id:2,group_id:1,color:"blue",name:"Анализ"},{id:3,group_id:1,color:"green",name:"Выполняются"},{id:4,group_id:1,color:"brown",name:"Выполнены"},{id:5,group_id:2,color:"grey",name:"Бэклог 2"},{id:6,group_id:2,color:"blue",name:"Анализ 2"},{id:7,group_id:2,color:"green",name:"Выполняются 2"},{id:8,group_id:2,color:"brown",name:"Выполнены 2"}],tasks_last_id:22,tasks:[{id:1,block_id:1,color:"#f5dd29",name:"Начать задачу 1",short_description:"Bei jedem in der Bankenaufsicht weltweit über 25 verschiedene Messgrössen und Konzepte verwendet werden. Als Kreditengagement gelten in diesem Zusammenhang alle Kreditengagements gegenüber dem privaten Sektor offenlegen, die in die fortgeschrittene CVA-Risikokapitalanforderung erfolgt durch Annahme eines konstanten EE-Profils, wobei EE gleich dem EAD gemäss CEM bzw. Diese Einheit muss die Integrität der zur Durchführung von Nachschussforderungen verwendeten Daten prüfen und sicherstellen, dass sie ihre Anforderungen für das antizyklische Kapitalpolster als den gewichteten Durchschnitt der Anforderungen in den Ländern, in denen keine tägliche Preisfeststellung erfolgt sowie Instrumente, für die spezielle buchhalterische Bewertungsregeln gelten (wie z.B. Mit Ausnahme von Bedienungsrechten von Hypotheken abzuziehen ist, als die Summe sämtlicher oben aufgeführter Positionen 10% des harten Kernkapitals am gesamten Eigenkapital. Für international tätige Banken ist das Polster der gewichtete Durchschnitt der geltenden antizyklischen Kapitalpolster sollen die Kapitalanforderungen für den Bankensektor das globale Finanzumfeld berücksichtigen, in dem die Banken tätig sind. Alle oben genannten Beteiligungen, bei denen es sich auch bei den Liquiditätsstandards um Mindestanforderungen, die auf internationaler Ebene gleiche Rahmenbedingungen fördern und dazu beitragen werden, einen Wettlauf in Richtung der niedrigsten Standards zu verhindern. Mit Ausnahme von Bedienungsrechten von Hypotheken abzuziehen ist, als die Summe sämtlicher Beteiligungspositionen, die insgesamt mehr als 10% des harten Kernkapitals („Common Equity Tier 1“, CET1) einhalten müssen.\n        ",description:"<b>Bei jedem in der Bankenaufsicht weltweit</b>"},{id:2,block_id:1,name:"Начать задачу 2"},{id:3,block_id:1,name:"Начать задачу 3"},{id:4,block_id:1,name:"Начать задачу 4"},{id:5,block_id:1,name:"Начать задачу 5"},{id:6,block_id:1,name:"Начать задачу 6"},{id:7,block_id:1,name:"Начать задачу 2"},{id:8,block_id:1,name:"Начать задачу 3"},{id:9,block_id:1,name:"Начать задачу 4"},{id:10,block_id:1,name:"Начать задачу 5"},{id:11,block_id:1,name:"Начать задачу 6"},{id:12,block_id:1,name:"Начать задачу 2"},{id:13,block_id:1,name:"Начать задачу 3"},{id:14,block_id:1,name:"Начать задачу 4"},{id:15,block_id:1,name:"Начать задачу 5"},{id:16,block_id:1,name:"Начать задачу 6"},{id:17,block_id:2,name:"Сделать задачу 1"},{id:18,block_id:2,name:"Сделать задачу 2"},{id:19,block_id:2,name:"Сделать задачу 3"},{id:20,block_id:2,name:"Сделать задачу 4"},{id:21,block_id:2,name:"Сделать задачу 5"},{id:22,block_id:2,name:"Сделать задачу 6"}],archived_tasks_last_id:0,archived_tasks:[]},$=n(7327),q=n(13),J=n(8228),Y=n(6704);class Q{static fnInit(e){Q.oRepoItem=e,"github"==e.type&&Q.fnInitGit(),"webdav"==e.type&&Q.fnInitWebdav()}static fnInitGit(){Q.octokit=new q.v({auth:Q.oRepoItem.key})}static fnInitWebdav(){Q.webdav=(0,J.createClient)(Q.oRepoItem.url,{username:Q.oRepoItem.username,password:Q.oRepoItem.password})}static fnReadFileJSON(e){return new Promise(((t,n)=>{this.fnReadFile(e).then((({sData:e})=>{t(JSON.parse(e))})).catch((e=>{n(e)}))}))}static fnReadFile(e){return"github"==Q.oRepoItem.type?Q.fnReadFileGithub(e):"webdav"==Q.oRepoItem.type?Q.fnReadFileWebdav(e):void 0}static fnWriteFileJSON(e,t){return this.fnWriteFile(e,JSON.stringify(t))}static fnWriteFile(e,t){return"github"==Q.oRepoItem.type?Q.fnWriteFileGithub(e,t):"webdav"==Q.oRepoItem.type?Q.fnWriteFileWebdav(e,t):void 0}static fnCreateDir(e){if("webdav"==Q.oRepoItem.type)return Q.fnCreateDirWebdav(e)}static fnCreateDirWebdav(e){return new Promise(((t,n)=>{_l(">>>",e),Q.webdav.createDirectory(e),t()}))}static fnReadFileWebdav(e){Q.oRepoItem;return new Promise((async(t,n)=>{try{var i=await Q.webdav.getFileContents(e),s=new TextDecoder("utf-8"),o=s.decode(i);Q.oSHA[e]="",t({sData:o,sSHA:""})}catch(a){console.error(a),n(a)}}))}static fnReadFileGithub(e){return new Promise((async(t,n)=>{var i=Q.oRepoItem;return e=e.replace(/^\/+/,""),Q.octokit.rest.repos.getContent({owner:i.login,repo:i.repo,path:e}).then((({data:n})=>{var i=(0,Y.Jx)(n.content);Q.oSHA[e]=n.sha,t({sData:i,sSHA:n.sha})})).catch((e=>{console.error(e),n(e)}))}))}static fnWriteFileGithub(e,t,n=null){return new Promise((async(i,s)=>{var o=Q.oRepoItem;return Q.octokit.rest.repos.createOrUpdateFileContents({owner:o.sLogin,repo:o.sRepo,path:e,sha:n||oSHA[e],message:Q.fnGetUpdateMessage(),content:(0,Y.cv)(t)}).then((()=>{i()})).catch((e=>{console.error(e),s(e)}))}))}static fnWriteFileWebdav(e,t){return new Promise((async(n,i)=>{Q.oRepoItem;return new Promise((async(n,i)=>{try{var s=new TextEncoder,o=s.encode(t);await Q.webdav.putFileContents(e,o,{contentLength:!1,overwrite:!0}),n()}catch(a){i(a)}}))}))}static fnGetUpdateMessage(){return"update: "+new Date}}(0,$.Z)(Q,"octokit",null),(0,$.Z)(Q,"oSHA",{}),(0,$.Z)(Q,"webdav",null),(0,$.Z)(Q,"oRepoItem",null);var X=(0,x.MT)({state(){return{oDatabase:N,oDefaultDatabase:{tasks_groups_last_id:0,tasks_groups:[],tasks_blocks_last_id:0,tasks_blocks:[],tasks_last_id:0,tasks:[],archived_tasks_last_id:0,archived_tasks:[]},sSelectedGroupID:null,sSelectedTaskID:null,sMode:"tasks"}},mutations:{fnUpdateVar(e,{sName:t,sV:n}){e[t]=n},fnSelectGroup(e,t){e.sSelectedGroupID=t},fnSelectTask(e,t){e.sSelectedTaskID=t},fnUpdateTasks(e,t){e.oDatabase.tasks=t},fnUpdateTasksListForBlock(e,{sBlockID:t,aList:n}){for(var i of(console.log({sBlockID:t,aList:n,tasks:e.oDatabase.tasks}),n))i.block_id=t}},actions:{},getters:{fnFilterGroups:e=>t=>e.oDatabase.tasks_groups.filter((e=>~e.name.indexOf(t))),aGroups(e){return e.oDatabase.tasks_groups},aTasks(e){return e.oDatabase.tasks},oCurrentGroup(e){return e.oDatabase.tasks_groups.find((t=>t.id==e.sSelectedGroupID))},aCurrentGroupBlocks(e){return e.oDatabase.tasks_blocks.filter((t=>t.group_id==e.sSelectedGroupID))},fnGetBlockTasks:e=>t=>e.oDatabase.tasks.filter((e=>e.block_id==t))}});(0,i.ri)(Z).use(X).mount("#app")}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var o=t[i]={exports:{}};return e[i].call(o.exports,o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,i,s,o){if(!i){var a=1/0;for(c=0;c<e.length;c++){i=e[c][0],s=e[c][1],o=e[c][2];for(var r=!0,l=0;l<i.length;l++)(!1&o||a>=o)&&Object.keys(n.O).every((function(e){return n.O[e](i[l])}))?i.splice(l--,1):(r=!1,o<a&&(a=o));if(r){e.splice(c--,1);var d=s();void 0!==d&&(t=d)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[i,s,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,i){var s,o,a=i[0],r=i[1],l=i[2],d=0;if(a.some((function(t){return 0!==e[t]}))){for(s in r)n.o(r,s)&&(n.m[s]=r[s]);if(l)var c=l(n)}for(t&&t(i);d<a.length;d++)o=a[d],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},i=self["webpackChunkwapp_simple_todo_vue"]=self["webpackChunkwapp_simple_todo_vue"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(8725)}));i=n.O(i)})();
//# sourceMappingURL=app.713ee4c9.js.map