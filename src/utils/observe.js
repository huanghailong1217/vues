import defineProperty from './defineProperty';

function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return 
  }
  Object.keys(obj).forEach(key=> defineProperty(obj, key, obj[key]))
}

export default observe