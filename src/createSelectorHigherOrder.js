import _ from 'mudash'
import o from 'duxtape'

export default function createSelectorHigherOrder(selectors) {
  const selector = o.reduceReducers(selectors)
  return reducer => (state, action) => {
    let prevState = state
    state = reducer(state, action)
    while (!_.isEqual(prevState, state)) {
      prevState = state
      state = selector(state)
    }
    return state
  }
}
