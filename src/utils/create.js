import Vue from 'vue'

function create(Component, props) {
    let vm = new Vue({
        render(h){
           return h(Component, { props })
        }
    }).$mount()
    console.log(vm.$el)
    document.body.appendChild(vm.$el)
 
    const comp = vm.$children[0]
    comp.remove= ()=>{
       document.body.removeChild(vm.$el)
       vm.$destroy()
    }
    return comp
} 

export default create