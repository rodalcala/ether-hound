/* Middleware to handle asynchronous calls to the blockchain */

const middleware = store => next => async action => {
  
  if (!action.triggerAsync) return next(action);
  
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
    let response;

    if (action.nBlocks) {
      response = await getBlocks(action.nBlocks);
    } else if (action.transactionHash) {
      response = await web3.eth.getTransactionReceipt(action.transactionHash)
    }
  
    store.dispatch({
      type: `${type}_SUCCESS`,
      response,
    })
  } catch(err) {
    store.dispatch({
      type: `${type}_FAILURE`,
      err,
    })
  }

};

export default middleware;
