/* Middleware that catches every API request and handle them */

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

    const blockToRetrieve = [];
    for (let i = 0; i < n; i++) {
      blockToRetrieve.push(latestBlock - i);
    };

    const batch = new web3.eth.BatchRequest();
    blockToRetrieve.forEach(blockNumber => batch.add(
        web3.eth.getBlock.request(blockNumber, (_, block) => allBlocks.push(block))
    ));

    batch.execute()
    return allBlocks;
  }

  const blocks = await getBlocks(action.nBlocks);
  console.log('blocks', blocks)

  store.dispatch({
    type: `${type}_SUCCESS`,
    blocks
  })

  // fetch(`${baseUrl}/${parameters}`, {
  //   method: method || 'GET',
  //   headers: {
  //     ...defaultHeaders,
  //     ...headers
  //   },
  //   body: body || null
  // })
  // .then(res => res.json())
  // .then(response => {
  //   /* NOTE: On every succesful call to the API, we request an update on the user's list thru socket.io */
  //   socket.emit('updateRequired', { user });
  //   store.dispatch({
  //     type: `${type}_SUCCESS`,
  //     response
  //   })
  // })
  // .catch(error => {
  //   store.dispatch({
  //     type: `${type}_FAILURE`,
  //     error,
  //   });
  //   return next(action);
  // });
};

export default middleware;
