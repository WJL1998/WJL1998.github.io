import React,{Component} from 'react';
import ReactSwipe from 'react-swipe'

import "./contents.scss";

class Contents extends Component{   
    
    render(){
        return (
            <div id="Contents">
            <ReactSwipe
                className="carousel"
                swipeOptions={{ continuous: true,auto:2000 }}
                key={this.props.list.length}
                showPagination={true}
                // ref={el => (reactSwipeEl = el)}
            >
                {
                    this.props.list.map((item)=><div key={item.id} className="bj">
                    <img src={item.image_url} alt="" />
                    </div>)
                }
            </ReactSwipe>
            <div className="denglu"></div>
            </div>
        )
    }
}
export default Contents;