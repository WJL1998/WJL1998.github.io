import React,{Component} from 'react'
import "./index.scss"
import axios from "axios"
import { Badge } from 'antd'
class Details extends Component{
    constructor(){
        super();
        this.state = {
            topimg:'',
            success:false,
            count:0
        }
    }
    componentDidMount(){
        axios.get('https://h5.watsons.com.cn/tms/aladdin/get?code=h5_topfixed_img')
        .then(resp=>{
            // console.log(resp.data.data.datas[0].image_url)
            this.setState({
                topimg:resp.data.data.datas[0].image_url
            })
        })
		this.totalFunc();
    }
    totalFunc=()=>{
		let arr =  JSON.parse(localStorage.getItem('cart'));
		var count = 0;
		if(arr != null && arr.length){//有，追加数据
			//判断如果是同一种商品，需要修改num，如果不同的商品，直接将数据追加到 data数组中
			arr.map((item)=>{
			    return	count += item.num
			})
			this.setState({
				count:count
			})
		}
	}
    back=()=>{
        this.props.history.go(-1)
    }
    backhome=()=>{
        this.props.history.push("/")
    }
    gotocart=()=>{
        this.props.history.push("/cart")
    }
    buy=()=>{
		let timeout = '';
        this.setState({
            count:this.state.count+1,
            success:true
        })
        clearTimeout(timeout)
        timeout = setTimeout(()=>{
            this.setState({
                success:false,
            })
        },1000)
        let data = [];
        let flag = true;
        let arr =  JSON.parse(localStorage.getItem('cart'));
		// console.log(arr);
        if(arr != null && arr.length){//有，追加数据
			//判断如果是同一种商品，需要修改num，如果不同的商品，直接将数据追加到 data数组中
			   arr.map((item)=>{ 
				if(item.id === this.props.location.state.data.item_id){//同种商品
					item.num++;
                    flag = false;
                    item.zongjia=Math.round(item.max_app_price*item.num);
				}
				return data.push(item);
			})
		}
        if (flag) {
            data.push({
                id:this.props.location.state.data.item_id,
				over_image_url:this.props.location.state.data.over_image_url,
				max_app_price:this.props.location.state.data.max_app_price/100,
				max_market_price:this.props.location.state.data.max_market_price/100,
				name:this.props.location.state.data.item_short_name,
                num:1,
                zongjia:this.props.location.state.data.max_app_price/100
            })
        }
		localStorage.setItem('cart',JSON.stringify(data));
		this.totalFunc();        
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    render(){
        return (
            <div id="Details">
                <div className="top-img">
                    <img src={this.state.topimg} alt=""/>
                    {/* {console.log(this.props.location.state.data)} */}
                    <h1><span className="login-back" onClick={this.back}>{"<"}</span> <span className="login-title">{this.props.location.state.data.item_short_name}</span></h1>
                    <div className="images"><img src={this.props.location.state.data.over_image_url} alt="" /></div>
                    <ul className="swiper-menu-list">
                        <li className="menu active">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAXNSR0IArs4c6QAAAJJJREFUGBlj+P//PxMQWzAQAkBF+kAMAnuAWBWneqCkMUgVFHwH0jVAzIahASiIrBCq/v81IMMWRTEOhSAN/4B4DhALgTUAGdhMBArDwSsgK4gJxXjsHFGgcCgDUDU+E98C5ZOBmBGfwsVABSDTIACLibeBYs4weTiNpPAnkN0MxBxwSWQGUEIYiOcCsSayODobABbHAWKltdvCAAAAAElFTkSuQmCC" alt="" />
                            <span>开箱</span>
                        </li>
                        <li className="menu">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAXNSR0IArs4c6QAAAJJJREFUGBlj+P//PxMQWzAQAkBF+kAMAnuAWBWneqCkMUgVFHwH0jVAzIahASiIrBCq/v81IMMWRTEOhSAN/4B4DhALgTUAGdhMBArDwSsgK4gJxXjsHFGgcCgDUDU+E98C5ZOBmBGfwsVABSDTIACLibeBYs4weTiNpPAnkN0MxBxwSWQGUEIYiOcCsSayODobABbHAWKltdvCAAAAAElFTkSuQmCC" alt="" ></img>
                            <span>体验</span>
                        </li>
                        <li className="menu">
                            <span>图片</span>
                        </li>
                    </ul>
                    <div className="seckill">
                        <div className="Ion-seckill">秒杀</div>
                        <div className="snap-up">抢购中</div>
                        <div className="count">剩余时间: &nbsp;&nbsp;                                    
                            <span>00</span>:
                            <span>00</span>:
                            <span>00</span>
                        </div> 
                    </div>
                    <div className="goods-info">
                        <p className="sale_point">{this.props.location.state.data.item_short_name}</p>
                        <br />
                        <p className="item_long_name">{this.props.location.state.data.item_long_name}</p>
                        <br />
                        <i className="max_app_price">￥{this.props.location.state.data.max_app_price/100}</i> <i>￥{this.props.location.state.data.max_market_price/100}</i>
                    </div>
                    <div className="btns">
                        <div onClick={this.buy}>加入购物车</div>
                        <div>立即购买</div>
                    </div>
                </div>
                <p className="fa fa-home" onClick={this.backhome}><span>首页</span></p>
                <Badge count={this.state.count}>
                    <p className="fa fa-shopping-cart head-example" onClick={this.gotocart}></p>
                </Badge>
                <div className="add_success" style={this.state.success?{'display':'block'}:{'display':'none'}}>添加成功</div>
            </div>
        )
    }
}
export default Details;
