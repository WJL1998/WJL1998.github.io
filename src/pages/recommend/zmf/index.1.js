import React,{Component} from 'react'
import axios from 'axios';

import "./index.scss"
class Zmf extends Component{
    constructor(){
        super();
        this.state = {
            topimg:'',
            Arr:[],
            coust:1,
            end:false
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
            //加载的页数
            let count = Math.floor(scrollTop/(windowHeigt-50))+1;
            // console.log(count)            
            if(count>1){
                for(let i=2;i<=count;i++){
                    // console.log(i)
                    if(i>_this.state.coust){
                        // console.log(i)
                        //判断这一页的数据是否已经获取过
                        //运行获取数据的函数
						_this.moreData(i);
						
						//更新当前页
						_this.setState({
							coust:_this.state.coust+1
						})						
					}
                }
            }
        }
    }
    moreData(i){
        // console.log(i)
        if(!this.state.end){
            axios.get('https://h5.watsons.com.cn/item/ws/group_list?current_page='+i+'&page_size=24&group_id=12983&device_id=f9d37f30-0e2f-11e9-9746-17a5ca6b47d9')
        .then(resp=>{
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
                    Arr:NewARR
                })
            }
        })
        }
    }
    fun=()=>{
        // console.log(this.props.history)
        this.props.history.go(-1)
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
                <ul>
                    {
                        this.state.Arr.map((item,index)=><li key={index}>
                        <img src={item.over_image_url} alt='item_short_name' />
                    </li>)
                    }
                </ul>
                <div className='hehe'>{this.state.end?"爸爸是有底线的知道吗":""}</div>
            </div>
        )
    }
}
export default Zmf;
