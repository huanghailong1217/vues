import Vue from 'vue'
import messages from "@/components/messages";

let ToastConstructor = Vue.extend(messages)
function gets (obj,duration) {
    const toastDom = new ToastConstructor({
        el: document.createElement('div'),
        data(){
            return {
                title: obj.title,
                isShow: obj.toggle,
                message: obj.content
            }
        }
        
    })
   
    document.body.appendChild(toastDom.$el)
    setTimeout(() => {toastDom.isShow=false},duration)
}

function fete () {
    Vue.prototype.$tocat = gets
}
export default fete