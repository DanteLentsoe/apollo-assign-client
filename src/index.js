import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { gql } from '@apollo/client';
import { InMemoryCache, ApolloClient , ApolloProvider } from '@apollo/client';



const client = new ApolloClient({
  uri:'https://apollo-assign-server.dantelentsoe.repl.co/',
  cache :new InMemoryCache()
});

ReactDOM.render(
 <ApolloProvider client={client}>
 <Router>
    <App />
    </Router>
</ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();