import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import { Component } from 'react';

class App extends Component {

  state = {
    
    manager: ''
  };
  
  componentDidMount = async () => {
    
    const manager = await lottery.methods.manager().call();
    this.setState({ manager });
  }

  render = () => {
    return (
      <div className="App" >
        <h3>Lottery Contract</h3>
        <p>Managed by: {this.state.manager}</p>
      </div>
    );
  }  
}

export default App;
