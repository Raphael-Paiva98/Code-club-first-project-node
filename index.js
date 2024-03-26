const { request } = require('express')
const express = require('express')
const port = 3000
const app = express()
const uuid = require('uuid')

app.use(express.json())

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id
    next()
}

app.get('/users', (request, response) => {

    return response.json(users)
    // const { name, age } = request.query
    //  return response.json({name: name, age: age})
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId
    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)
    return response.status(204).json()
})
app.listen(port, () => {
    console.log(`run ${port}`)
})



/*

- Query params => meusite.com/users?nome=raphael&age=25 // FILTROS
- Route Params => /users/2    // BUSCAR, DELETAR, OU ATUALIZAR ALGO ESPECÍFICO
- REQUEST BODY - {"name" = "Raphael", "age" = "25" }

-  GET - Bucar informação no backend.
- POST - Criar informações no backend.
- PUT/PATCH - Alterar/Atualizar informações no backend.
- DELETE Deletar - informações do backend.
- MIDDLEWARE => INTERCEPTADOR Tem o poder de parar ou alterar dados da requisição
*/
