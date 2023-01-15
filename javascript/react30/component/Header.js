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

import html from "../core.js"
function Header() {
    return html`    <header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" autofocus>
</header>
    `
}
export default Header