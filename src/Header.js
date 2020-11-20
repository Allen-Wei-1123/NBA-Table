import React,{Fragment} from 'react'; 
import ReactDOM from 'react-dom'; 
import $ from 'jquery'
import './App.scss'
var teams = ["ATL",
            "BKN","BOS","CHA","CHI","CLE","DAL","DEN","DET","GSW","HOU","IND","LAC","LAL","MEM","MIA","MIL","MIN","NOP","NYK",
            "OKC","ORL","PHI","PHX","POR","SAC","SAS","TOR","UTA","WAS"
        ];

var years = ["1996-97","1997-98","1999-00","2000-01","2001-02","2002-03","2004-05","2006-07","2007-08","2008-09","2010-11","2011-12","2012-13",
                "2013-14","2015-16","2017-18","2018-19"
            ]


class NavBar extends React.Component{

    state = {
        year : this.props.defaultyear,
        teams: this.props.defaultteam

    }

    constructor(props){
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }

    
    
    handleTeams = e=>{
        console.log("change "+e.target.value)
        this.setState({
            teams : e.target.value
        })
    }

    handleYear = e =>{
        this.setState({
            year : e.target.value
        })
    }

    handleSearch = e =>{
        this.props.statedata(this.state.teams,this.state.year);
    }
    render(){
        return(

            <Fragment>
                <div id = "navbar">
                    
                    <div id = "teams" class="select">
                        <select onChange = {this.handleTeams}>
                            {

                                teams.map((item)=>
                                    <option >{item}</option>
                                )

                            }
                        </select>
                    </div>
                    <div id = "years" class="select">
                        <select onChange = {this.handleYear} >
                            {

                                years.map((item)=>
                                    <option >{item}</option>
                                )

                            }
                        </select>
                    </div>
                    <button id = "btn" class="button is-success" onClick = {this.handleSearch}>Search</button>
                </div>
            </Fragment>
        )
    }
}

 export default NavBar;
