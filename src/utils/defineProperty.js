function defineProperty(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', val)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal
      }
    }
  })
}
const obj = {}
defineProperty(obj,'foo','foo')
obj.foo
obj.foo = 'peter'
export default defineProperty