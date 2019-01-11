import React,{Component} from 'react';
import {Link} from "react-router-dom";

import axios from 'axios';
import "./content.scss";

class Content extends Component{   
    constructor(){
        super();
        this.state = {
            list:[],
            one:[],
            two:[],
            three:[],
            four:[],
            five:[]
        }
    }
    componentDidMount(){
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12780&device_id=f9d37f30-0e2f-11e9-9746-17a5ca6b47d9')
        .then(resp=>{
            // console.log(resp.data.data.item_list)
            this.setState({
                one:resp.data.data.item_list
            })
        })
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12781&device_id=f9d37f30-0e2f-11e9-9746-17a5ca6b47d9')
        .then(resp=>{
            // console.log(resp.data.data.item_list)
            this.setState({
                two:resp.data.data.item_list
            })
        })
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12543&device_id=f9d37f30-0e2f-11e9-9746-17a5ca6b47d9')
        .then(resp=>{
            // console.log(resp.data.data.item_list)
            this.setState({
                three:resp.data.data.item_list
            })
        })
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12545&device_id=f9d37f30-0e2f-11e9-9746-17a5ca6b47d9')
        .then(resp=>{
            // console.log(resp.data.data.item_list)
            this.setState({
                four:resp.data.data.item_list
            })
        })
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12782&device_id=f9d37f30-0e2f-11e9-9746-17a5ca6b47d9')
        .then(resp=>{
            // console.log(resp.data.data.item_list)
            this.setState({
                five:resp.data.data.item_list
            })
        })
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    render(){
        return (
            <div id="Content">
                <div style={{'backgroundImage':'url("https://image.watsons.com.cn//upload/5d0d63f6.jpg?x-oss-process=image/quality,q_80/format,webp")','height':'60px'}}></div>
                <Link to="/recommend/zmf"><div style={{'backgroundImage':'url("https://image.watsons.com.cn//upload/3965e404.jpg?x-oss-process=image/quality,q_80/format,webp")','height':'150px'}}></div></Link>
                <div className="bb">
                {
                    this.state.one.map((item)=><ul className="goodslist" key={item.item_id}>
                    <li style={{backgroundImage:`url(${item.over_image_url})`}}></li>
                    <li>{item.item_name}</li>
                    <li>
                        <i>￥{item.max_app_price/100}</i> 
                        <i>￥{item.max_market_price/100}</i> 
                        <p style={{backgroundImage:`url("https://image.watsons.com.cn/upload/6232b1ca.png")`}}></p>
                    </li>
                    </ul>)
                }
                </div>
                <div style={{'backgroundImage':'url("https://image.watsons.com.cn//upload/283306f5.jpg?x-oss-process=image/quality,q_80/format,webp")','height':'150px'}}></div>
                <div className="bb">
                {
                    this.state.two.map((item)=><ul className="goodslist" key={item.item_id}>
                    <li style={{backgroundImage:`url(${item.over_image_url})`}}></li>
                    <li>{item.item_name}</li>
                    <li><i>￥{item.max_app_price/100}</i> <i>￥{item.max_market_price/100}</i> <p style={{backgroundImage:`url("https://image.watsons.com.cn/upload/6232b1ca.png")`}}></p></li>
                    </ul>)
                }
                </div>
                <div style={{'backgroundImage':'url("https://image.watsons.com.cn//upload/13bbaf39.jpg?x-oss-process=image/quality,q_80/format,webp")','height':'150px'}}></div>
                <div className="bb">
                {   
                    this.state.three.map((item,index,length)=>index<=5?<ul className="goodslist" key={item.item_id}>
                    <li style={{backgroundImage:`url(${item.over_image_url})`}}></li>
                    <li>{item.item_name}</li>
                    <li><i>￥{item.max_app_price/100}</i> <i>￥{item.max_market_price/100}</i> <p style={{backgroundImage:`url("https://image.watsons.com.cn/upload/6232b1ca.png")`}}></p></li>
                    </ul>:'')
                }
                </div>
                <div style={{'backgroundImage':'url("https://image.watsons.com.cn//upload/af3f458d.jpg?x-oss-process=image/quality,q_80/format,webp")','height':'150px'}}></div>
                <div className="bb">
                {
                    this.state.four.map((item,index,length)=>index<=8?<ul className="goodslist" key={item.item_id}>
                    <li style={{backgroundImage:`url(${item.over_image_url})`}}></li>
                    <li>{item.item_name}</li>
                    <li><i>￥{item.max_app_price/100}</i> <i>￥{item.max_market_price/100}</i> <p style={{backgroundImage:`url("https://image.watsons.com.cn/upload/6232b1ca.png")`}}></p></li>
                    </ul>:'')
                }
                </div>
                <div style={{'backgroundImage':'url("https://image.watsons.com.cn//upload/f6eae2cd.jpg?x-oss-process=image/quality,q_80/format,webp")','height':'150px'}}></div>
                <div className="bb">
                {
                    this.state.five.map((item,index,length)=>index<=8?<ul className="goodslist" key={item.item_id}>
                    <li style={{backgroundImage:`url(${item.over_image_url})`}}></li>
                    <li>{item.item_name}</li>
                    <li><i>￥{item.max_app_price/100}</i> <i>￥{item.max_market_price/100}</i> <p style={{backgroundImage:`url("https://image.watsons.com.cn/upload/6232b1ca.png")`}}></p></li>
                    </ul>:'')
                }
                </div>
            </div>
        )
    }
}
export default Content;