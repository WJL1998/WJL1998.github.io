import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Popup from "../components/popup/popup"
import Recommend from "../pages/recommend";
import Mask from "../pages/mask";
import Life from "../pages/life";
import Global from "../pages/global";
import Zmf from "../pages/recommend/zmf";
import Conter from "../pages/conter";
import Login from "../pages/login";
import Details from "../pages/details";
import Cart from "../pages/cart";

import "./index.scss"
class App extends Component {
    render() {
      return (
        <BrowserRouter className="App">
            <div>
              <Popup />
              <Switch>
                  <Route path="/" exact component={Recommend}></Route>
                  <Route path="/mask"  component={Mask}></Route>
                  <Route path="/life"  component={Life}></Route>
                  <Route path="/global"  component={Global}></Route>
                  <Route path="/conter"  component={Conter}></Route>
                  <Route path="/login"  component={Login}></Route>
                  <Route path="/details"  component={Details}></Route>
                  <Route path="/recommend/zmf"  component={Zmf}></Route>
                  <Route path="/cart"  component={Cart}></Route>
              </Switch>
            </div>          
        </BrowserRouter>
      );
    }
  }
  
  export default App;