import React, { Component } from 'react';
import './App.css';
import './fixed-data-table.min.css';
import './bootstrap.css';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      sortedBy: "recent"
    };
  }
  getData() {
    fetch("https://fcctop100.herokuapp.com/api/fccusers/top/recent").then(response => {
    // console.log(response.json());
      console.log("received response")
      return response.json();
    }).then(json => {
      console.log("received json", json)
      this.setState({data: json});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="App">
        <div className="table-container">
          <div className="table-heading">
            <p><a href="http://www.freecodecamp.com">Free Code Camp Camper Leader Board</a></p>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <LeaderBoardHeading currentSort={this.state.sortedBy} onSortChange={
                column =>
                  this.setState({sortedBy: column})
                } />
            </thead>
            <CamperLeaderBoard data={this.state.data} sortedBy={this.state.sortedBy}/>
          </table>
        </div>
      </div>
    );
  }
}

function User(props) {
  return (
      <tr>
        <td>{props.number}</td>
        <td className="text-left">
          <a href={"http://freecodecamp.com/"+props.data.username}>
            <img className="camper-image" src={props.data.img} alt="camper" />
            {props.data.username} 
          </a>
        </td>
        <td>{props.data.recent}</td>
        <td>{props.data.alltime}</td>
      </tr>
  );
}
function CamperLeaderBoard(props) {
  if (!props.data) {
    console.log("Props is null");
    return <tbody><tr/></tbody>;
  }

  var rows = [];
  let sortedData = null;
  if (props.sortedBy === "recent") {
    sortedData = props.data.sort(compareRecent);
  } else {
    sortedData = props.data.sort(compareAlltime);
  }
  for (var i=0; i < sortedData.length; i++) {
    rows.push(
      <User number={i+1} data={sortedData[i]} />
    );
  }
  return <tbody>{rows}</tbody>;
}

function LeaderBoardHeading(props) {
  return (
    <tr className="heading">
      <th className="text-center id-heading">#</th>
      <th className="text-center user-heading">User</th>
      <th className="text-center sortable recent-heading" onClick={()=>props.onSortChange("recent")}>Recent {props.currentSort==="recent" ? <FaArrowDown /> : null}</th>
      <th className="text-center sortable alltime-heading" onClick={()=>props.onSortChange("alltime")}>All Time {props.currentSort==="alltime" ? <FaArrowDown /> : null}</th>
    </tr>
  );
}
function compareRecent(a,b) {
    if (a.recent > b.recent)
      return -1;
    if (a.recent < b.recent)
      return 1;
    return 0;
}

function compareAlltime(a,b) {
    if (a.alltime > b.alltime)
      return -1;
    if (a.alltime < b.alltime)
      return 1;
    return 0;
}

export default App;
