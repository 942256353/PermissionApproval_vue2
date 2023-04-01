import Vue from 'vue';
const conText = require.context('./',true,/\.js/);

conText.keys().forEach(element => {
    const configComponet =conText(element);
    const module = configComponet.default || configComponet;
    if(module?.name){
        Vue.component(module.name,module);
    }
});