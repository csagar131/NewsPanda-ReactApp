import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

class App extends React.Component { 

  apiKey = process.env.REACT_APP_API_KEY 
  pageSize = 10;

  render() {
    return (

      <div>
        <Router>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<News apiKey={this.apiKey}  key="general" pageSize={this.pageSize} country="in" category='general'/>} />
            <Route exact path="/general" element={<News apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category='general' />} />
            <Route exact path="/technology" element={<News apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category='technology' />} />
            <Route exact path="/health" element={<News apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category='health' />} />
            <Route exact path="/science" element={ <News apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category='science' />} />
            <Route exact path="/entertainment" element={<News apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category='entertainment' />} />
            <Route exact path="/sports" element={<News apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category='sports' />} />
            <Route exact path="/business" element={<News apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category='business' />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App;
