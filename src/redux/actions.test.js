import actions from './actions';
import { SET_NUMBER_OF_BLOCKS } from './constants';

describe('actions', () => {
  it('Should create an action to change the number of blocks in the dataset', () => {
    const nBlocks = 14;
    const expectedAction = {
      type: SET_NUMBER_OF_BLOCKS,
      nBlocks,
    };
    expect(actions.setNBlocks(nBlocks)).toEqual(expectedAction);
  });

  it('Should create an action that triggers the async middleware', () => {
    const transactionHash = '0xd5404d7c1822c79e98f6e7098326b1d3003ad89241309a56eb9577c0d2b7ecaa';
    expect(actions.getTransactionReceipt(transactionHash)).toHaveProperty('triggerAsync');
  });
});
