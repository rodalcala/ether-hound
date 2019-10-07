import reducer from './reducer';
import { GET_BLOCKS_SUCCESS } from './constants';

describe('reducer', () => {
  it('The initial state should set the number of blocks to 10 (default)', () => {
    expect(reducer(undefined, {})).toHaveProperty('nBlocks', 10);
  });

  it('Succesfully fetching the blocks should flag the app as ready', () => {
    expect(reducer(undefined, {
      type: GET_BLOCKS_SUCCESS,
      response: 'test',
    })).toHaveProperty('isAppReady', true);
  });

  it('The web3 object should always be defined', () => {
    expect(reducer(undefined, {})).toBeDefined();
  });
});
