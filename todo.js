function setCookie(name, val) {
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    document.cookie = name + "=" + JSON.stringify(val) + "; expires=" + date.toGMTString() + "; path=/";
}

function getCookie(name) {
    try {
        return JSON.parse(document.cookie.split(';').find(cookie => cookie.split('=')[0] === name).split('=')[1]);
    } catch (e) {
        setCookie('todos', ["ToDoを追加してみましょう", "ToDoを削除してみましょう"])
        return getCookie('todos')
    }
}

const app = Vue.createApp({
    data() {
        return {
            newToDo: '',
            todos: getCookie('todos')
        };
    },
    methods: {
        addTodo() {
            if (this.newToDo.trim().length > 0) {
                this.todos.push(this.newToDo);
                this.newToDo = '';
                setCookie('todos', this.todos);
            }
        },
        removeTodo(index) {
            if (confirm('本当に削除しますか?')) {
                this.todos.splice(index, 1);
                setCookie('todos', this.todos);
            }
        },
    },
});

app.mount('#app');
