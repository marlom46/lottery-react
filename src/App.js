import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import { Component } from 'react';

class App extends Component {

  state = {

    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  componentDidMount = async () => {

    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {

    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting for transaction to complete...' });

    await lottery.methods.enterLottery().send({

      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'Congrats! You have successfully entered the Lottery' });
  }

  pickWinner = async () => {

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Picking a winner...' });

    await lottery.methods.pickWinner().send({

      from: accounts[0]
    });

    this.setState({ message: 'Winnre has been picked!' });
  }

  render = () => {
    return (
      <div className="App" >
        <h3>Lottery Contract</h3>
        <p>Managed by: {this.state.manager}</p>
        <p>There are currently {this.state.players.length} people entered in the Lottery, to win {web3.utils.fromWei(this.state.balance, 'ether')}</p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h3>Try your luck !</h3>
          <div>
            <label>Amount of ether to Enter: </label>
            <input value={this.state.value} onChange={event => this.setState({ value: event.target.value })} placeholder="Min. 0.01 ETH" />
          </div>
          <button>Enter</button>
        </form>

        <hr />
        <h3>Pick a Winner!</h3>
        <button onClick={this.pickWinner}>Click Here</button>
        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
