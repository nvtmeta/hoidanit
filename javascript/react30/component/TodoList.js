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
function TodoList() {
    return html`    <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
       
        <li class="completed">
            <div class="view">
                <input class="toggle" type="checkbox" checked>
                <label>Taste JavaScript</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
        <li>
            <div class="view">
                <input class="toggle" type="checkbox">
                <label>Buy a unicorn</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Rule the web">
        </li>
    </ul>
</section>
    `
}
export default TodoList