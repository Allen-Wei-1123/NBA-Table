import React,{Fragment} from 'react'; 
import ReactDOM from 'react-dom'; 
import $ from 'jquery'
import NavBar from './Header';
import './App.scss'
import axios from 'axios'
var apikey = "AIzaSyALc98ybYjPtF1J8xo4_z8sJWhxbJ9tZnA";




class Res extends React.Component{
    state  = {
        data: [],
        itemsize:0,
        year : "1996-97",
        team : "BOS"
        
    };

    constructor(props){
        super(props)
        this.state_update =  this.state_update.bind(this)

    }
    
    componentDidMount(){  
        console.log("reentered")  
        
        axios.get('http://localhost:8081/nba')
      .then(res => {
        const newdata = res.data;
        console.log(newdata)

        var team = this.state.team;
        var season = this.state.year; 


        var filtered = newdata.filter((items => items["team_abbreviation" ]== team && items["season"] == season ));


        this.setState({ 
            data : filtered,
            itemsize:filtered.length

         });
      })
      
    }

     state_update(team,year){
        
        axios.get('http://localhost:8081/nba')
        .then(res => {
            const newdata = res.data;
            console.log(newdata)

            

            var filtered = newdata.filter((items => items["team_abbreviation" ]== team && items["season"] == year ));


            this.setState({ 
                data : filtered,
                itemsize:filtered.length

            });
      })
    }

    handleName = e=>{
        var prev = [...this.state.data]
        prev = prev.sort(function(a,b){
            if(a["player_name"] < b["player_name"]) return -1;
            if(a["player_name"] > b["player_name"]) return 1;
            return 0 ;
        })
        this.setState({
            data :prev
        })
    }


    handleAge = e=>{
        var prev = [...this.state.data]
        prev = prev.sort((a,b)=>a["age"] - b["age"])
        this.setState({
            data:prev,
        })
    }



    handlePts = e =>{
        var prev = [...this.state.data]
        prev = prev.sort((a,b)=>a["pts"] - b["pts"])
        this.setState({
            data:prev
        })
    }
    

    handleReb = e=>{
        var prev = [...this.state.data]
        prev = prev.sort((a,b)=>a["reb"] - b["reb"])
        this.setState({
            data:prev
        })
    }


    handleAst = e=>{
        var prev = [...this.state.data]
        prev =prev.sort((a,b) => a["ast"] - b["ast"])
        this.setState({
            data : prev
        })
    }
    
   
    render(){
        return(
            <Fragment>
                <NavBar statedata = {this.state_update} defaultteam = {this.state.team} defaultyear = {this.state.year}/>
                <table id = "table" class="table is-striped is-selected">
                    <thead>
                        <tr>
                            <th>
                                <a onClick ={this.handleName}>Player Name</a>
                            </th>
                            <th>
                                <a>Team</a>
                            </th>
                            <th>
                                <a onClick = {this.handleAge}>Age</a>
                            </th>
                            <th>
                                <a onClick = {this.handlePts}>Pts</a>
                            </th>
                            <th>
                                    <a onClick = {this.handleReb}>Reb</a>
                            </th>
                            <th>
                                    <a onClick = {this.handleAst} >Ast</a>
                            </th>
                            <th>
                                <a>Country</a>
                            </th>
                            <th>
                                    <a>College</a>
                            </th>
                            <th>
                                <a>Season</a>
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            
                            this.state.data.map(function(item){
                               return  <tr>
                                    <td>
                                        {item["player_name"]}
                                    </td>
                                    <td>
                                        {item["team_abbreviation"]}
                                    </td>
                                    <td>
                                        {item["age"]}
                                    </td>
                                    <td>
                                        {item["pts"]}
                                    </td>
                                    <td>
                                        {item["reb"]}
                                    </td>
                                    <td>
                                        {item["ast"]}
                                    </td>
                                    <td>
                                        {item["country"]}
                                    </td>
                                    <td>
                                        {item["college"]}
                                    </td>
                                    <td>
                                        {item["season"]}
                                    </td>
                                </tr>
                            })
                        }
                        
                    </tbody>
                   
            </table>
                
            </Fragment>
        )
    }
}

export default Res