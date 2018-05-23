import { ADD, DEL } from './constant';

export const add = (item) => {
  console.log('item', item);
  return {
    type: ADD,
    item
  };
};

export const del = id => ({
  type: DEL,
  id
});

