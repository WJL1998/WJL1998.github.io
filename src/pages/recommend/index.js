import React,{Component} from 'react';
import axios from 'axios';
import {BrowserRouter,Route,Switch} from "react-router-dom";

import Header from '../../components/header';
import Seckill from "../../components/main/seckill";
import Goods from "../../components/main/goods";
import Swipe from "../../components/main/swipe";
import Content  from "../../components/main/content";
import Zmf from "./zmf/index";

import "./index.scss";
class Recommend extends Component{
    constructor(){
        super();
        this.state = {
            navlist:[],
            gg:[],
            one:[],
            two:[]
        }
    }
    componentDidMount(){
        axios.get('aladdin/get_batch_data?codes=["new_header","new_Home_4navs_180105_1","new_Home_coupon_180105_4","Home_pingo_170505_5","Home_AboveTopic_activity_170505_7","Home_TopicCase_170505_7","Home_CategaryNavs_170505_7"]&version=&app_channel=wap&plat=wap&access_token=&device_id=fa9f1180-0c4b-11e9-9a45-21907515ab81')
        .then(resp=>{
            // console.log(resp.data.data)
            this.setState({
                navlist:resp.data.data.new_Home_4navs_180105_1.datas,
                gg:resp.data.data.new_Home_coupon_180105_4.datas
            })
        })
        axios.get('aladdin/get_batch_data?codes=["new_header","new_Home_4navs_180105_1","new_Home_coupon_180105_4","Home_pingo_170505_5","Home_AboveTopic_activity_170505_7","Home_TopicCase_170505_7","Home_CategaryNavs_170505_7"]&version=&app_channel=wap&plat=wap&access_token=&device_id=f9d37f30-0e2f-11e9-9746-17a5ca6b47d9')
        .then(resp=>{
            // console.log(resp.data.data)
            this.setState({
                one:resp.data.data.Home_TopicCase_170505_7.datas,
                two:resp.data.data.Home_CategaryNavs_170505_7.datas
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
            <div id="Recommend">
            <Header />
            <BrowserRouter>
              <Switch>
                  <Route path="/recommend/zmf"  component={Zmf}></Route>
              </Switch>        
            </BrowserRouter>
                <div className="bj"></div>
                <div className="bj1"></div>
                <div className="navwall">
                    {
                        this.state.navlist.map((item)=><div key={item.id}>
                            <img src={item.image_url} alt="" />
                        </div>)
                    }
                </div>
                <div className="gg">
                    {
                        this.state.gg.map((item)=><div key={item.id}>
                            <img src={item.image_url} alt="" />
                        </div>)
                    }
                </div>
                <Seckill />
                <Goods />
                <Swipe />
                <Content />
                {/* <div style={{'backgroundImage':'url("https://image.watsons.com.cn//upload/6639a5cc.jpg?x-oss-process=image/resize,w_75/blur,r_3,s_2/quality,q_80/format,webp")','height':'60px'}}></div> */}
                {
                    this.state.one.map((item)=><div className="Advertisement" key={item.id}>
                    <img src={item.image_url} alt="" />
                    </div>)
                }
                <div className="buzhidaojiaoshenme">
                {
                    this.state.two.map((item)=><div className="Advertisement" key={item.id}>
                    <img src={item.image_url} alt="" />
                    </div>)
                }
                </div>
            </div>
        )
    }
}
export default Recommend;
