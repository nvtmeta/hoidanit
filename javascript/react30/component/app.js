// import html from "../core.js";
// import { connect } from "../store.js";
// const connector = connect()
// function App({cars}) {
//     return html`

//     <ul>
//     ${cars.map(car => `<li>${car}</li>`)}
//     </ul>

//     <button onclick="dispatch('add','bmv')">add car</button>
//     `
// }
// export default connector(App) 

import html from "../core.js";
import Header from "../component/Header.js"
import TodoList from "../component/Header.js";

function App() {
    return html`    <section class="todoapp">
    ${Header()}
    ${TodoList()}

    <section>
    
    
    </section>
    `
}
export default App