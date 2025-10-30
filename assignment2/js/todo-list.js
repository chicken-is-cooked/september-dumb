const app = Vue.createApp({})

app.component('todo-list', {
    data:function() {
        return {
            newTask: '',
            tasks: []
        }
    },
    template:`
    <label>Status </label> \
                    <input type="text" v-model="newTask" @keyup.enter="add"/> \
                    <button @click="add">Add</button> \
                    <ul> \
                        <li v-for="(task, index) in tasks" :key="index" style="test-decoration: none;"> \
                            <span>{{ task.text }}
                            <span v-if="task.high">(High Priority)</span>
                            <span v-else>(Low Priority)</span></span> \

                            <button @click="togglePriority(task)">
                                {{ task.high ? 'Mark as Low Priority' : 'Mark as High Priority' }}
                            </button>
                            <button @click="deleteTask(index)">Delete</button> \
                        </li> \
                    </ul>`,
    methods: {
        add:function(){
            const text = this.newTask.trim();
            if (!text) return;

            const status = this.newTask.trim();
            if(status){
                this.tasks.push(
                    { text, high: false }
                );
                this.newTask = '';
            }

            },deleteTask:function(index){
                this.tasks.splice(index, 1);
            },
            togglePriority(task) {
                task.high = !task.high;
            }
    }
});
app.mount('#app');
