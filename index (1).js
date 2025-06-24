
/*

Comments here are for the people who could understand these code
(better not to read the code if your brain is weak)
*/


let express=require("express"),app=express(),djs=require("discord.js"); //define our application from express and djs
app.use((r,s,n)=>{s.header('Access-Control-Allow-Origin','https://icodeinbdfd.leziuwu.repl.co');n()});
[{p:"/",r:async(q,s)=>s.send(`Api is ready, now paste the codes from https://pastebin.com/u/Lezi_Dev`)},{p:"/find",r:async(q,s)=>{let c=q.query.code;if(!c)return s.json({message:`No code provided`});let f=await cf(tf(c));s.json({functions:f,names:f.map(x=>x.replace(/\$(\w+)\[?\]?/, `$1`)),count:f.length.toString()})}},{p:"/info",r:async(q,s)=>{let F=q.query.function;if(!F)return s.json({message:`No function provided`});let f=(await cf([F]))[0];if(!f)return s.json({message:`Function ${F} not found..`});let i = await ra(`/function/${f}`),n=f.replace(/\$(\w+)\[?\]?/,'$1'),gh;try{gh=(await require("axios").get(`https://raw.githubusercontent.com/NilPointer-Software/bdfd-wiki/dev/src/bdscript/${f.replace(/\$(\w+)\[?\]?/,'$1')}.md`)).data}catch(_){gh=""};let ex=(gh?.split(`## Example`)[1]?.split("```")[1]),im=(gh?.split(/!\[(?:\w+)?\]\(/)[1]?.split(")")[0]),gi=gui(n);i.intents=djs.GatewayIntentBits[i.intents]||"None";s.json({...i,...{exampleCode:ex,image:im,name:n},...gi}) }}].forEach(t=>{app.get(t.p,t.r);console.log(`loaded "${t.p}"`)}); app.listen(3e3,()=>console.log("Ready")) //Loads Routes


//require('./test.js')()

//<-------- Functions for api -------->//
function tf(c){let t=[],n=0;while(n<c.length){if("$"===c[n]){let e=n+1;while(e<c.length&&/[a-zA-Z]/.test(c[e]))e++;let r=c.slice(n,e),a=!1,o=e;while(o<c.length&&!/\s/.test(c[o])){if("["===c[o]){a=!0;break}o++}let i=a?`${r}[]`:r;t.push(i),n=o}else n++}return [...new Set(t)].sort()} //Find Functions From Code (not proper all time aka buggy)
async function cf(f) {let a=await ra("/function_tag_list");f=f.filter(e=>a.includes(e)||a.includes(e.replace('[]','')));return f.map(e=>(!a.includes(e)&&a.includes(e.replace("[]",'')))?e.replace('[]',''):e).map(e=>(!a.includes(e)&&a.includes(e+"[]"))?e+'[]':e)} //return the functions that exists
async function ra(r) {let a=require("axios"),p="https://botdesignerdiscord.com/public/api",rs=(await a.get(p+r)).data;return rs} //send request to bdfd official api
function gui(f) {let a=`https://nilpointer-software.github.io/bdfd-wiki`,b=f=="awaitFunc"?"/guides/awaitedCommands.html":["await","endasync","async"].includes(f)?"/guides/async.html":["try","catch","error","endtry"].includes(f)?"/guides/trycatch.html":(f.includes("Button")||f=="removeComponent")?"/guides/buttons.html":f.includes("http")?"/guides/httpResquests.html":(f.includes("$if")||f.includes("$else")||f=="$endif")?"/guides/ifStatements.html":f.includes("json")?"/guides/json.html":["newModal","input","addTextInput"].includes(f)?"/guides/modals.html":f.includes("SelectMenu")?"/guides/selectmenu.html":f.includes("Option")?"/guides/autoComplete.html":(f.includes("Thread")||f.includes("thread"))?"/guides/threads.html":f.toLowerCase().includes("split")?"/guides/textSplitting.html":f.includes("webhook")?"/guides/webhooks.html":`/bdscript/${f}`;return {guide:{link:a+b,title:`Guide for ${b.includes("bdscript")?`"\$${f}"`:b.split("/")[2].replace(/(\w+)\.html/,'$1').split(/(?=[A-Z])/).map(w =>w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}`}};} //get guide link