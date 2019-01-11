import React,{Component} from 'react';
import axios from 'axios';
import ReactSwipe from 'react-swipe'
import "./swipe.scss";

class Swipe extends Component{   
    constructor(){
        super();
        this.state = {
            list:[]
        }
    }
    componentDidMount(){
        axios.get('aladdin/get_batch_data?codes=["chajian"]&version=&app_channel=wap&plat=wap&access_token=&device_id=228e2ac0-0da8-11e9-8dde-ad5fde1d6947')
        .then(resp=>{
            // console.log(resp.data.data.chajian)
            this.setState({
                list:resp.data.data.chajian.datas
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
            <div id="Swipe">
                    <ReactSwipe
                        className="carousel"
                        swipeOptions={{ continuous: true,auto:2000 }}
                        key={this.state.list.length}
                        showPagination={true}
                        // ref={el => (reactSwipeEl = el)}
                    >
                        {
                            this.state.list.map((item)=><div key={item.id}>
                            <img src={item.image_url} alt="" />
                            </div>)
                        }
                    </ReactSwipe>
            </div>
        )
    }
}
export default Swipe;