import React,{Component} from 'react'
import './index.scss';
import {Input,Button} from 'antd';
import axios from "axios"


class Login extends Component{
    constructor(){
        super();
        this.state={
            phone:'13751686606',
            msm:'',
            des:'',
            type:false,
            text:"获取验证码",
            smsCode:''
        }
    }
    changephone=(ev)=>{
        this.setState({
            phone:ev.target.value
        })
    }
    changesms=(ev)=>{
        this.setState({
            msm:ev.target.value
        })
    }
    Getyzm=()=>{
        let phone = this.state.phone.trim();
        let re = /\S/.test(phone);
        let res = /^1[34578]\d{9}$/.test(phone);
        let loginPhone = document.getElementsByClassName("login-phone")[0];
        if (phone===""||!re) {
            alert("请输入手机号码");
            loginPhone.value="";
        } else if(!res){
            alert("手机号码输入有误");
            loginPhone.value="";   
        } else{
            axios.get("http://192.168.2.251:7001/sms/addSms?phone="+phone)
            .then((resp)=>{
                this.setState({
                    des:resp.data.success,
                    type:true,
                })
                axios.get("http://192.168.2.251:7001/sms/querySms?phone="+phone)
                .then((resp)=>{
                    console.log(resp.data)
                    this.setState({
                        smsCode:resp.data.success.smsCode
                    })
                })
            })           
            let j = 60;
            let SS = setInterval(()=>{
                this.setState({
                    text:"重发("+j+")s"
                })
                j=j-1
                if(j<=0){
                    this.setState({
                        text:"获取验证码",
                        des:'',
                        type:false
                    })
                    clearInterval(SS)
                }
            },1000)          
        }
    }
    Join=()=>{
        if(this.state.phone===""){
            alert("请输入手机号码")
        }else if(this.state.msm===""){
            alert("请输入验证码")
        }else if(Number(this.state.msm)!==this.state.smsCode){
            alert("验证码输入有误"); 
        }else if(Number(this.state.msm)===this.state.smsCode){
            var params = new URLSearchParams();
            params.append("phone",this.state.phone);
            params.append("smsCode",this.state.msm);
            console.log(params)
            axios({
                method:'post',
                url:"http://192.168.2.251:7001/user/login",
                data:params
            })
            .then((resp)=>{
                console.log(resp)
                localStorage['token']=resp.data.data.token;
                this.props.history.push("/conter");
            }).catch((err)=>{

            })
        }
    }
    back=()=>{
        this.props.history.go(-1)
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    render(){
        return (
            <div id="Login">
                <h1><span className="login-back" onClick={this.back}>{"<"}</span> <span className="login-title">登录/注册</span></h1>
				<div className="tip-wrap">商城全新版本上线，手机登录更安全哦</div>
                <div className="film_login">
					<Input type="text" placeholder="输入手机号" name="phone" className="login-phone" onInput={this.changephone}/>
					<br/>
					<br/>
					<Input type="code" className="yzm" placeholder="输入验证码" name="smsCode" onInput={this.changesms}/>
					<Button className="film_btn" type="primary" disabled={this.state.type} onClick={this.Getyzm} onInput={this.changesms}>{this.state.text}</Button>
					<div className="des"> {this.state.des}</div>
					<Button className="film_btn1" type="primary" onClick={this.Join}>登录/注册</Button>
				</div>
            </div>
        )
    }
}
export default Login;
