import axios from 'axios';

const users_url = "https://jsonplaceholder.typicode.com/users"
const todos_url = "https://jsonplaceholder.typicode.com/todos"
const posts_url = "https://jsonplaceholder.typicode.com/posts"

// main function to be called at beginning of app rendering
const getUsersData = async () => {
    const { data: users } = await axios.get(users_url)
    const users_ids = users.map(user => user.id)
    const users_info = []
    for (const id of users_ids) {
        const user = await getUserBasicData(id)
        users_info.push(user)
    }
    return users_info
}

// function to serve getUsersData, 
// organizing user's info, todo and posts
const getUserBasicData = async (id) => {
    const { data: user } = await axios.get(users_url+'/'+id)
    const { data: todos } = await axios.get(todos_url+'?userId='+id)
    const { data: posts } = await axios.get(posts_url+'?userId='+id)
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

export {
    getUserBasicData,
    getUsersData
}