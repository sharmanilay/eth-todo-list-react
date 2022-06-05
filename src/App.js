import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import './App.css'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'
import TodoList from './TodoList'


const App = () => {
  const [account, setAccount] = useState('')
  const [todoList, setTodoList] = useState([])
  const [taskCount, setTaskCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])

  useEffect(() => {

    const loadBlockChainData = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
      const accounts = await web3.eth.requestAccounts()
      console.log(accounts)
      const ethTodoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
      const ethTaskCount = await ethTodoList.methods.taskCount().call()
      setTodoList(ethTodoList)
      setAccount(accounts[0])
      setTaskCount(ethTaskCount)
      for (var i = 1; i <= ethTaskCount; i++) {
        const task = await ethTodoList.methods.tasks(i).call()
        setTasks([...tasks, task])
      }
      setLoading(false)

    }
    loadBlockChainData()

  }, [])

  const createTask = (content) => {
    setLoading(true)
    todoList.methods.createTask(content).send({ from: account }).once('recipet', (receipt) => {
      setLoading(false)
    })
  }

  return (
<div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://www.dappuniversity.com/free-download" target="_blank">Dapp University | Todo List</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="#"><span id="account"></span></a></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
            {loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <TodoList tasks={tasks} createTask={createTask} />
              }
            </main>
          </div>
        </div>
      </div>
  )
}

export default App