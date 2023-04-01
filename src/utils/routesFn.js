export function initRoutes(data,subObj){
    data.forEach(item => {
        let obj = {
          path: item.url,
          name: item.name,
          meta:{title:item.title},
          component: () => import(`@/views/Home/${item.component}/index.vue`)
        }
        if(subObj instanceof Array){
          subObj.push(obj);
        }else{
          if(!subObj.children){
            subObj.children = [];
          }
          subObj.children.push(obj)
        }
        
        //递归
        if(item.children){
          initRoutes(item.children,obj)
        }
    });
  }