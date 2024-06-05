import axios from 'axios';

const users_url = "https://jsonplaceholder.typicode.com/users"
const todos_url = "https://jsonplaceholder.typicode.com/todos"
const posts_url = "https://jsonplaceholder.typicode.com/posts"


const getUsersData = async () => {
    const { data: users } = await axios.get(users_url)
    const users_ids = users.map(user => user.id)
    const users_info = []
    // const users_todos = []
    // const users_posts = []
    for (const id of users_ids) {
        const user = await getUserBasicData(id)
        users_info.push(user)
        // const user_todos = await getUserTodos(id)
        // users_todos.push(user_todos)
        // const user_posts = await getUserPosts(id)
        // users_posts.push(user_posts)
    }
    return users_info
}

const getUserBasicData = async (id) => {
    const { data: user } = await axios.get(users_url+'/'+id)
    const { data: todos } = await axios.get(todos_url+'?userId='+id)
    const { data: posts } = await axios.get(posts_url+'?userId='+id)

    // const todos_slice = todos.slice(0, 2)
    // const posts_slice = posts.slice(0, 2)
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        street: user.address.street,
        city: user.address.city,
        zipcode: user.address.zipcode,
        todosUser: {userId: user.id, todos},
        postsUser: {userId: user.id, posts}
    }
}

const getUserTodos = async (id) => {
    const { data: todos } = await axios.get(todos_url+'?userId='+id)
    const todos_slice = todos.slice(0, 2)
    return {userId: id, todos: todos_slice}
}

const getUserPosts = async (id) => {
    const { data: posts } = await axios.get(posts_url+'?userId='+id)
    const posts_slice = posts.slice(0, 2)
    return {userId: id, posts: posts_slice}
}

/*const getUserFullData = async (id) => {
    const { data: user } = await axios.get(users_url+'/'+id)
    const { data: todos } = await axios.get(todos_url+'?userId='+id)
    const { data: posts } = await axios.get(posts_url+'?userId='+id)

    const todos_slice = todos.slice(0, 2)
    // const todos_title = todos_slice.map(todo => todo.title)
    const posts_slice = posts.slice(0, 2)
    // const posts_title = posts_slice.map(post => post.title)
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        street: user.address.street,
        city: user.address.city,
        zipcode: user.address.zipcode,
        todos: todos_slice,
        posts: posts_slice
    }
}*/

// const checkTasksStatus = async (id) => {
//     const { data: todos } = await axios.get(todos_url+'?userId='+id)
//     const todos_slice = todos.slice(0, 2)
//     const unfinishedTasks = todos_slice.filter(todo => todo.completed === false)
//     return unfinishedTasks.length === 0 ? true : false
// }

export {
    getUserBasicData,
    getUserTodos,
    getUserPosts,
    // getUserFullData,
    getUsersData,
}