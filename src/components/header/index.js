import React,{Component} from 'react';
import {Input,Icon} from 'antd';
import {NavLink,Link} from "react-router-dom";


import "./index.scss";

class Header extends Component{ 
    constructor(){
        super();
        this.state = { 
            
        };
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    render(){
        return (
            <div id="Header">
                {localStorage["token"]?<Link to="/conter"><div className="portrait"></div></Link>:<div><Link to="/conter"><Icon type="user" /></Link></div>}
                <div className="Inputwall">
                    <Input
                    onClick={this.showDrawer}
                    placeholder="面膜"
                    prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)'}} />}
                    onChange={this.onChangeUserName}
                    ref={node => this.userNameInput = node}
                    />
                </div>
                <div><Icon type="shopping-cart" /></div>
                <div className="nav">
                    <NavLink to="/" exact activeClassName="active">今日推荐</NavLink>
                    <NavLink to="/mask" activeClassName="active">面膜中心</NavLink>
                    <NavLink to="/life" activeClassName="active">居家生活</NavLink>
                    <NavLink to="/global" activeClassName="active">全球购</NavLink>
                </div>               
            </div>
        )
    }
}
export default Header;
