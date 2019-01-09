/** convert array into Map object
 * @param data(array) - users list **/
export const convertToMap = (data) => {
  if(data instanceof Array){
    const map = new Map();
    data.forEach(item => {
      const {_id: id,  ...rest} = item;
      map.set(id, rest);
    });

    return map;
  }
};