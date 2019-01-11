import React,{Component} from 'react'
import axios from 'axios';
import Header from '../../components/header';
import 'swiper/dist/css/swiper.min.css'
import Swiper from "swiper"
import "./index.scss";
    
class Mask extends Component{
    constructor(){
        super();
        this.state = {
            list:[]
        }
    }
    componentDidMount(){
        new Swiper(".swiper-container",{
            autoplay:2000,//--每2秒轮播一次
            loop:true,//--可以让图片循环轮播
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            autoplayDisableOnInteraction:false,//--在点击之后可以继续实现轮播
            pagination:".swiper-pagination",//--让小圆点显示
            paginationClickable:true,//--实现小圆点点击
            prevButton:".swiper-button-prev",//--实现上一页的点击
            nextButton:".swiper-button-next",//--实现下一页的点击
            // effect:"flip"//--可以实现3D效果的轮播
        })
        axios.get('tms/aladdin/get?code=Mask_center_banner_index_1')
        .then(resp=>{
            this.setState({
                list:resp.data.data.datas
            })
            console.log(resp.data.data.datas)
        })
    }
    render(){
        return (
            <div id="Mask">
            <Header />
            <div className="swiper-container">
                <div className="swiper-wrapper">
                {
                    this.state.list.map((item,index)=>{
                        return <div className="swiper-slide" key={item.id+index}>
                            <img src={item.image_url} alt='' style={{'width':'100%'}} />
                        </div>
                    })
                }
                </div>
                <div className="swiper-pagination"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
            </div>
        )
    }
}
export default Mask;
