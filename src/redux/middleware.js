/* Middleware to handle asynchronous calls to the blockchain */

const middleware = store => next => async action => {
  
  if (!action.nBlocks) return next(action);
  
  const { type } = action;
  const { web3 } = store.getState();

  next({
    type: `${type}_PENDING`,
  });

  const getBlocks = async (n) => {
    const latestBlock = await web3.eth.getBlockNumber();
    const allBlocks = [];

    for (let i = 0; i < n; i++) {
      const block = await web3.eth.getBlock(latestBlock - i, true);
      allBlocks.push(block);
    };

    return allBlocks;
  }

  try {
    const blocks = await getBlocks(action.nBlocks);
  
    store.dispatch({
      type: `${type}_SUCCESS`,
      blocks
    })
  } catch(err) {
    store.dispatch({
      type: `${type}_FAILURE`,
      err
    })
  }

};

export default middleware;
