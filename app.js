const express = require('express')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Server has been started...')
})

app.use('/', express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

