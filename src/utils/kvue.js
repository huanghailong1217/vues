
function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return
  }
  // Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  new Observer(obj)
}

function defineReactive(obj, key, val) {
  observe(obj)
  Object.defineProperty(obj, key, {
    get() {
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        observe(newVal)
        val = newVal
      }
    }
  })
}

function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(newVal) {
        vm.$data[key] = newVal
      }
    })
  })
}

class KVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    observe(this.$data)
    proxy(this)
    new Compile('#app',this)
   }
}

class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }
  walk(obj) {
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if (this.$el) {
      this.compile(this.$el)
    }
  }
  compile(el) {
    el.childNodes.for(node => {
      if (this.isElement(node)) {
        console.log('编译元素', node.nodeName)
      } else if(this.isInter(node)){
        console.log('编译元素', node.textContent)
        this.compileText(node)
      }
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }
  
  compileText(node) {
    node.textContent = this.$vm[RegExp.$1]
  }

  isElement(node) {
    return node.nodeType === 1 
  }
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node)
  }
}

export default KVue