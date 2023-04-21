import http from 'http'
const server =http.createServer((req, res)=>{
    res.end('hola')
})
server.listen(8081,()=>{
    console.log('Server listen on port 8081')
})