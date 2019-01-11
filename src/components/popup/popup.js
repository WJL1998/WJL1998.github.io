import React,{Component} from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import './popup.scss'

let agreemask = '/tms/aladdin/get?code=start_alert_image'

export default class AgreeMask extends Component {
    constructor(){
        super();
        this.state = {
             visible: true,
             agreemask:[] 
            }
    }
    showModal = () => {
      this.setState({
        visible: true,
      });
    }
  
    handleOk = (e) => {
      this.setState({
        visible: false,
      });
    }
  
    handleCancel = (e) => {
      this.setState({
        visible: false,
      });
    }
    componentDidMount(){
        axios.get(agreemask).then((resp)=>{
            // console.log(resp.data.data.datas);
            this.setState({
                agreemask:resp.data.data.datas[0]
            })
        })
    }
    render(){
        return(
            <Modal
              footer={null}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}  
            >
            <img src={this.state.agreemask.image_url} style={{'width':'100%'}} alt=''/>
            </Modal>
        )
    }
}
