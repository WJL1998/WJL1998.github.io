import React,{Component} from 'react';
import axios from 'axios';

import "./goods.scss";
class Goods extends Component{
    constructor(){
        super();
        this.state = {
            list:[],
        }
    }
    componentDidMount(){
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12779&device_id=228e2ac0-0da8-11e9-8dde-ad5fde1d6947')
        .then(resp=>{
            // console.log(resp.data.data.item_list)
            this.setState({
                list:resp.data.data.item_list
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
            <div id="Goods">
                <div className="bj00"></div>
                <div className="bj01"></div>
                <div className="bb">
                    {
                        this.state.list.map((item)=><ul className="goodslist" key={item.item_id}>
                        <li style={{backgroundImage:`url(${item.over_image_url})`}}></li>
                        <li>{item.item_name}</li>
                        <li><i>￥{item.max_app_price/100}</i> <i>￥{item.max_market_price/100}</i> <p style={{backgroundImage:`url("https://image.watsons.com.cn/upload/6232b1ca.png")`}}></p></li>
                        </ul>)
                    }
                </div>
            </div>
        )
    }
}
export default Goods;
