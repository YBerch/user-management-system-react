/** sagas **/
export const getToken = state => state.session.token;

/** debounce function **/
export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }
}

/** return object with specific property **/
export function findObject(context, propName, value) {
  const type = Object.prototype.toString.call(context).slice(8, -1);
  if(type === 'Array' && context.length){
    return context.find(item => item[propName] === value)
  } else if(type === 'Object' && Object.keys(context).length){
    return Object.values(context).find(item => item[propName] === value)
  }
}

/** return index of object in array with specific property **/
export function findIndexOfObject(array, propName, value){
  if(array.length){
    return array.findIndex(item => item[propName] === value)
  }
}

/** clone object **/
export function clone(object){
  return JSON.parse(JSON.stringify(object));
}

/** check if the object is empty **/
export function isObjectEmpty(object){
  return Object.getOwnPropertyNames(object).length === 0
}

/** generate unique value (String) **/
export function uniqueKey(){
  function s4(){
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/** get random color **/
export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}