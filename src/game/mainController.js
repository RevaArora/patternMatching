import React,{Component} from 'react';
import './main.css'

class MainComponent extends Component {
    constructor(){
        super();
        const patterns =[ 
                        ['red','blue','green','yellow'],
                        ['blue','red','green','yellow'],
                        ['blue','green','red','yellow'],
                        ['yellow','green','blue','red'],
                        ['red','green','blue','yellow']
                        ]; 
        this.state ={
            level:0,
            inputCounter:0,
            patterns:patterns,
            currentPattern:patterns[0],
            red:"",
            green:"",
            yellow:"",
            blue:"",
            userInputPattern:[],
            message:"Click PLAY to play the pattern, and play after that"
        }
    }
   
    playPattern(){
        this.state.inputCounter = 0;
        this.state.userInputPattern = [];
        let gindex=0;
        let playertimer = setInterval(()=>{
            if(gindex===4){
                gindex = 0;
                clearInterval(playertimer);
                this.removehighlight()
            }
            else{
                this.highlight(this.state.currentPattern[gindex]);
                gindex++;
            }
        },1000)
    }
    removehighlight(){
        this.setState({red:"",green:"",yellow:"",blue:"" });
    }
    highlight(element){
        this.setState({[element]:"highlight" });
    }   
    recordinput(e){
        this.setState({message:"Recording input..."});
        if(this.state.inputCounter<4){
            if(this.state.userInputPattern.indexOf(e.target.id)==-1){
                this.state.userInputPattern.push(e.target.id);
                this.state.inputCounter++;
            }
            if(this.state.inputCounter === 4){
                this.validatePattern();
            }
        }
    }
    validatePattern(){
        if(this.arrays_equal(this.state.userInputPattern,this.state.currentPattern)){
            this.setState({message:"Thats Correct ! You moved to nextLevel"});
            setTimeout(()=>{this.setState({message:"Click PLAY to play the pattern, and play after that"})},2000);
        }else{
            this.setState({message:"Thats not correct, lets try again, Click PLAY to play pattern"})
        }
        this.state.inputCounter = 0;
        this.state.userInputPattern = [];
    }
    arrays_equal(a, b) {
        return JSON.stringify(a) == JSON.stringify(b);
    }
    render(){
        return(<div>
            <header><h4>Level {this.state.level}</h4><h1 >{this.state.message}</h1> </header>
            <section>
                <div id="red" className={"box red "+this.state.red } onClick={this.recordinput.bind(this)}></div>
                <div id="blue" className={"box blue "+this.state.blue } onClick={this.recordinput.bind(this)}></div>
                <div id="green" className={"box green "+this.state.green } onClick={this.recordinput.bind(this)}></div>
                <div id="yellow" className={"box yellow "+this.state.yellow } onClick={this.recordinput.bind(this)}></div>
            </section>
            <footer><button onClick={this.playPattern.bind(this)}>PLAY</button></footer>
        </div>
        )
    }
}
export default MainComponent;