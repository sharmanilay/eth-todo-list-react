import './App.css';
import Web3 from 'web3';

function App() {
  const [account, setAccount] = useState('')

  useEffect(() => {
    const loadBlockChainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0] )
    }

    loadBlockChainData()
  
    return () => {
      second
    }
  }, [])
  

  return (
    <div className="App">
      <div className="container">
        <h1>Hello, World!</h1>
        <p>Your account: {account}</p>
      </div>
    </div>
  );
}

export default App;
