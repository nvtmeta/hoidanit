// const init = {
//     cars: ['vinfast']
// }

// export default function reducer(state = init, action, args) {

//     switch (action) {
//         case 'add':
//             const [newcar] = args
//             return {
//                 ...state,
//                 cars: [...state.cars, newcar]
//             }



//         default:
//             return state
//     }
// }
const init = {} 

export default function reducer(state=init,action, args) {

    switch (action) {
        default: state

    }
}