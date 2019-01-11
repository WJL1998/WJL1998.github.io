import React,{Component} from 'react'
import axios from 'axios';
import {Link} from "react-router-dom"
import "./index.scss"
class Zmf extends Component{
    constructor(){
        super();
        this.state = {
            topimg:'',
            Arr:[],
            coust:1,
            end:false,
            type:false,
            group_id:12983,
			topArr:[
				{'id':0,'name':'洁面卸妆','group_id':12983,'type':true},
				{'id':1,'name':'水乳面霜','group_id':12984,'type':false},
				{'id':2,'name':'精华眼霜','group_id':12985,'type':false}
			]
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
        axios.get('https://h5.watsons.com.cn/item/ws/group_list?current_page=1&page_size=24&group_id=12983&device_id=f9d37f30-0e2f-11e9-9746-17a5ca6b47d9')
        .then(resp=>{
            // console.log(resp.data.data)
            this.setState({
                Arr:resp.data.data.item_list
            })
        })
        this.scroll()
    }
    scroll(){
        let _this =this
        window.onscroll=function(){
            //获取滚动高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //获取窗口可视高度
            // console.log(scrollTop)            
            let windowHeigt = document.documentElement.clientHeight;
            //页面的总高度
            let scrollHeight = document.body.scrollHeight
            if(scrollHeight-scrollTop<=windowHeigt){
                    _this.setState({
                        coust:_this.state.coust+1,
                        type:true
                    })
                    _this.moreData(_this.state.coust+1);
            }
        }
    }
    moreData(i){
        // console.log(i)
        if(!this.state.end){
            axios.get('https://h5.watsons.com.cn/item/ws/group_list?current_page='+i+'&page_size=24&group_id='+this.state.group_id+'&device_id=f9d37f30-0e2f-11e9-9746-17a5ca6b47d9')
        .then(resp=>{
            // console.log(resp.data.data)
            if(resp.data.data.item_list === undefined){
                this.setState({
                    end:true
                })
            }else{
                let oldArr = this.state.Arr;
                let NewARR = [];
                NewARR = oldArr.concat(resp.data.data.item_list)
                // console.log(NewARR)
                this.setState({
                    Arr:NewARR,
                    type:false
                })
            }
        })
        }
    }
    fun=()=>{
        // console.log(this.props.history)
        this.props.history.go(-1)
    }
    changeBorder(id,group_id){
        let newArr = this.state.topArr
        for(var i = 0;i<newArr.length;i++){
			if(i === id){
				newArr[i].type = true;
			}else{
				newArr[i].type = false;
			}
        }
        this.setState({
			topArr:newArr,
			group_id:group_id,
            coust:1,
            end:false
        });
        this.getData(group_id)
    }
    getData(group_id){
        axios.get('https://h5.watsons.com.cn/item/ws/group_list?current_page=1&page_size=24&group_id='+group_id+'&device_id=20b178f0-0fc0-11e9-8e3d-1ff5ed74673e').then(res=>{
			// console.log(res);
			this.setState({
				Arr:res.data.data.item_list
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
            <div id="Zmf">
                <div className="top-img">
                    <img src={this.state.topimg} alt=""/>
                </div>
                <div className="nav">
                    <span onClick={this.fun}>{"<"}</span>
                    <span>新宠精致美肌</span>
                </div>
                <ul className="list_top">
                    {
                        this.state.topArr.map((item,index)=><li onClick={()=>this.changeBorder(item.id,item.group_id)} className={item.type?"active":""} key={index}>{item.name}</li>)
                    }
                </ul>
                <ul className="list_item">
                {
                    this.state.Arr.map((item)=><li className="goodslist" key={item.item_id}>
                    <Link to={{ pathname:'/details/'+item.item_id,state:{data:item}}}>
                        <div className="frame"><img src={item.over_image_url} alt="" /></div>
                        <div className="frame1">{item.item_name}</div>
                        <div className="frame2">
                            <i>￥{item.max_app_price/100} ￥{item.max_market_price/100}</i> 
                            <p style={{backgroundImage:`url("https://image.watsons.com.cn/upload/6232b1ca.png")`}}></p>
                        </div>
                    </Link>
                    </li>)
                }
                </ul>
                <div className='hehe'>{this.state.type&&this.state.end===false?"正在加载,别逼逼":""}</div>
                <div className='hehe'>{this.state.end?"爸爸是有底线的知道吗":""}</div>
            </div>
        )
    }
}
export default Zmf;
