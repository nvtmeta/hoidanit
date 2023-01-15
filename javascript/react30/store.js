// import { createstore } from "./core.js";
// import reducer from "./reducer.js";
// const {attach, connect ,dispatch} =createstore(reducer)


// window.dispatch=dispatch

// export {
//     attach,
//     connect
// }

import { createstore } from "./core.js";

import reducer from "./reducer.js";

const  {attach, connect, dispatch} = createstore(reducer)
window.dispatch = dispatch
export {
    attach,
    connect
}