let lastSrcs; //上次获取到的script地址
let vm = new Vue();
const scriptReg = /\<script.*src=["'](?<scr>[^"']+)/gm;

/**
* 获取页面中最新的script链接
* @param
* @returns
*/
async function extractNewScript(){ 
    let url = process.env.NODE_ENV === 'production' ?'./?_timestamp='+Date.now():'/?_timestamp='+Date.now();
    const html = await fetch(url).then((resp)=>resp.text());
    scriptReg.lastIndex = 0;
    let result =[];
    let match;
    while(((match)=scriptReg.exec(html))){
        result.push(match.groups.scr);
    }
    return result;
}

async function needUpdate(){
    const newScripts = await extractNewScript();
    if(!lastSrcs){
        lastSrcs = newScripts;
    }
    let result = false;
    if(lastSrcs.length!==newScripts.length){
        result =true;
        
    }
    for(let i=0;i<lastSrcs.length;i++){
        if(lastSrcs[i]!==newScripts[i]){
            result = true;
            break;
        }
    }
    lastSrcs = newScripts;
    return result;
   
}

const DURATION = 2000;
function autoRefresh(){
    setTimeout(async() => {
        const willUpdate =await needUpdate();
        if(willUpdate){
            vm.$confirm('页面有更新，点击确定刷新页面')
            .then(_ => {
                location.reload();
            })
            .catch(_ => {});
            // const result = confirm('页面有更新，点击确定刷新页面');
            // if(result){
            //     location.reload();
            // }
        }
        autoRefresh();
    }, DURATION);
}

autoRefresh();