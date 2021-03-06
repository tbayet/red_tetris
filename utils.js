import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { ReactWrapper } from "enzyme";
import { routerReducer, routerMiddleware } from "react-router-redux";

/* Sets up basic variables to be used by integration tests
 * Params:
 *   reducers: should be an object with all the reducers your page uses
 *   initialRouterState: an optional object to set as the initial state for the router
 * Returns:
 *   an object with the following attributes:
 *     store: the reducer store which contains the main dispatcher and the state
 *     dispatchSpy: a jest spy function to be used on assertions of dispatch action calls
 */
export function setupIntegrationTest(
  reducers,
  initialRouterState = {},
  history
) {
  // creating the router's reducer
  function myRouterReducer(state = initialRouterState, action) {
    // override the initial state of the router so it can be used in test.
    return routerReducer(state, action);
  }

  const routingMiddleware = routerMiddleware(history);

  // creating a jest mock function to serve as a dispatch spy for asserting dispatch actions if needed
  const dispatchSpy = () => ({});
  const reducerSpy = (state, action) => dispatchSpy(action);
  // applying thunk middleware to the the store
  const emptyStore = applyMiddleware(thunk)(createStore);
  const combinedReducers = combineReducers(
    {
      reducerSpy,
      router: myRouterReducer,
      ...reducers
    },
    {},
    applyMiddleware(routerMiddleware)
  );
  // creating the store
  const store = emptyStore(combinedReducers);

  return { store, dispatchSpy };
}
