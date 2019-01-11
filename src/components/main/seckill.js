import React,{Component} from 'react';
import axios from 'axios';

import "./seckill.scss";

class Seckill extends Component{   
    constructor(){
        super();
        this.state = {
            list:[],
            Time:'',
            H:'',
            M:'',
            S:''
        }
    }
    componentDidMount(){
        axios.get('activity/specials/info?count=8&code=Home_flashSale__Top_Img&device_id=1a459af0-0c5a-11e9-88c2-ffb8e7737f73')
        .then(resp=>{
            // console.log(resp.data.data)
            this.setState({
                list:resp.data.data.specials_item_v_o_s,
                Time:resp.data.data.specials_info_d_t_o.end_time
            })
            clearInterval(this.time)
            this.time()
        })
    }
    time=()=>{
        setInterval(()=>{
            let now = (new Date()).getTime();
            let differ = ((Number(this.state.Time) - now)/1000)<0?0:((Number(this.state.Time) - now)/1000);
            let S = Math.floor(differ%60)<10?'0'+Math.floor(differ%60):Math.floor(differ%60);
            let M = Math.floor(differ/60%60)<10?'0'+Math.floor(differ/60%60):Math.floor(differ/60%60);
            let H = Math.floor(differ/60/60%24)<10?'0'+Math.floor(differ/60/60%24):Math.floor(differ/60/60%24);

            this.setState({
                H:H,
                M:M,
                S:S,
            })
            // console.log(this.state.H)
        },1000)
    }
    componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
	}
    render(){
        return (
            <div>
                <div id="Seckill">
                        <div>今日秒杀 &nbsp;&nbsp;                                    
                            <span>{this.state.H}</span>:
                            <span>{this.state.M}</span>:
                            <span>{this.state.S}</span>
                        </div>               
                        <div>更多好货></div>               
                </div>
                <div id="goods">
                        {
                            this.state.list.map((item)=><div className="goodslist" key={item.item_id}>
                                <img src={item.image_url} alt="" />
                                <span>{item.item_short_name}</span>
                                <i>￥{item.promotion_price/100}</i> <i>￥{item.market_price/100}</i>
                            </div>)
                        }
                </div>
                <div className="aa"></div>
            </div>
        )
    }
}
export default Seckill;