import React from 'react';
import { connect } from 'react-redux';
import { addSearch, resetSearch } from './reducer';
import axios from 'axios';
import Button from '@material-ui/core/Button';
//import { Characters, /*Species, TypeCharacter,*/ Episodes } from './rmJSON';
import $ from 'jquery';
import CustomizedHook from './customHook';

const styleButtonSection = {
  display: "inline-block",
  margin: "5px 10px 5px 5px",
};

const styleButton = {
  width: "45%",
};

function refreshPage() {
  window.location.reload(false);
}

function showEpisodes(){
  $(".EpisodesContainerDiv").css("display", "block");
  $(".CharactersContainerDiv").css("display", "none");
}

function showCharacters(){
  $(".EpisodesContainerDiv").css("display", "none");
  $(".CharactersContainerDiv").css("display", "block");
}

class component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async getTodos(props) {
    axios.all(
      [
        axios.get('https://rickandmortyapi.com/api/episode/?page=2'),
        axios.get('https://rickandmortyapi.com/api/character/?page=20')
      ])
      .then(axios.spread((firstResponse, secondResponse) => {
        let episodesResponse = JSON.stringify(firstResponse.data.results);
        let charactersResponse = JSON.stringify(secondResponse.data.results);
        props.resetSearch();
        props.addSearch(['EPISODES', episodesResponse]);
        props.addSearch(['CHARACTERS', charactersResponse]);
      }))
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.getTodos(this.props);
  }

  componentDidUpdate(props) {
    console.log("Here");
    axios.all(
      [
        axios.get('https://rickandmortyapi.com/api/episode/36'),
        axios.get('https://rickandmortyapi.com/api/character/591')
      ])
      .then(axios.spread((firstResponse, secondResponse) => {
        let episodesResponse = JSON.stringify(firstResponse.data);
        let charactersResponse = JSON.stringify(secondResponse.data);
        props.resetSearch();
        props.addSearch(['EPISODES', episodesResponse]);
        props.addSearch(['CHARACTERS', charactersResponse]);
      }))
      .catch(error => console.log(error));
  }

  render() {
    const props = this.props;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          let optionsEP = document.getElementsByClassName('searchOptions EP');
          let optionsCH = document.getElementsByClassName('searchOptions CH');
          //let addFilters = false;
          console.log(optionsEP);
          console.log(optionsCH);
          let searchCharacters = [], searchEpisodes = [];
          //let idsCharacters = []; 
          //let idsEpisodes = []; 
          if (optionsEP.length > 0) {
            for (let i = 0; i < optionsEP.length; i++) {
              console.log(optionsEP[i].id);
              searchEpisodes.push(optionsEP[i].id)
            }
          }
          if (optionsCH.length > 0) {
            for (let i = 0; i < optionsCH.length; i++) {
              console.log(optionsCH[i].id);
              searchCharacters.push(optionsCH[i].id)
            }
          }
          /*console.log(idsCharacters);
          console.log(idsEpisodes);
          if (this.state.inputValue !== "") {
            searchCharacters = this.state.inputValue.split(",").filter(item => Number.isNaN(parseInt(item)));
            searchEpisodes = this.state.inputValue.split(",").filter(item => Number.isInteger(parseInt(item)));
          }else{
            searchCharacters = [];
            searchEpisodes = [];
          }*/
          console.log(searchCharacters);
          console.log(searchEpisodes);
          // some episodes only
          if (searchEpisodes.length > 0 && searchCharacters.length === 0) {
            console.log("case 1");
            let auxEpisodes = searchEpisodes.join(",");
            auxEpisodes = auxEpisodes.trim();
            axios.get('https://rickandmortyapi.com/api/episode/' + auxEpisodes).then((response) => {
              if (response.status === 200) {
                let myJSON = JSON.stringify(response.data);
                console.log("episodes api");
                console.log(myJSON);
                props.resetSearch();
                props.addSearch(['EPISODES', myJSON]);
                return false;
              }
              else {
                console.log('something went wrong');
              }
            }).catch((error) => {
              console.log(error);
            });
          } // some characters only
          else if (searchEpisodes.length === 0 && searchCharacters.length > 0) {
            console.log("case 2");
            let auxCharacters = searchCharacters.join(",");
            auxCharacters = auxCharacters.trim();
            axios.get('https://rickandmortyapi.com/api/character/' + auxCharacters).then((response) => {
              if (response.status === 200) {
                let myJSON = JSON.stringify(response.data);
                console.log("characters api");
                console.log(myJSON);
                props.resetSearch();
                props.addSearch(['CHARACTERS', myJSON]);
                return false;
              }
              else {
                console.log('something went wrong');
              }
            }).catch((error) => {
              console.log(error);
            });
          } // both episodes & characters on the search 
          else if (searchEpisodes.length > 0 && searchCharacters.length > 0) {
            console.log("case 3");
            let auxEpisodes = searchEpisodes.join(",");
            auxEpisodes = auxEpisodes.trim();
            let auxCharacters = searchCharacters.join(",");
            auxCharacters = auxCharacters.trim();
            console.log("before call to api");
            console.log(auxEpisodes);
            console.log(auxCharacters);
            axios.all(
              [
                axios.get('https://rickandmortyapi.com/api/episode/' + auxEpisodes),
                axios.get('https://rickandmortyapi.com/api/character/' + auxCharacters)
              ])
              .then(axios.spread((firstResponse, secondResponse) => {
                let episodesResponse = JSON.stringify(firstResponse.data);
                let charactersResponse = JSON.stringify(secondResponse.data);
                props.resetSearch();
                props.addSearch(['EPISODES', episodesResponse]);
                props.addSearch(['CHARACTERS', charactersResponse]);
              }))
              .catch(error => console.log(error));

          } // no one search so get the page 1 of characters & episodes
          else if (searchEpisodes.length === 0 && searchCharacters.length === 0) {

            console.log("case 4");
            axios.all(
              [
                axios.get('https://rickandmortyapi.com/api/episode/'),
                axios.get('https://rickandmortyapi.com/api/character/')
              ])
              .then(axios.spread((firstResponse, secondResponse) => {
                let episodesResponse = JSON.stringify(firstResponse.data.results);
                let charactersResponse = JSON.stringify(secondResponse.data.results);
                props.resetSearch();
                props.addSearch(['EPISODES', episodesResponse]);
                props.addSearch(['CHARACTERS', charactersResponse]);
              }))
              .catch(error => console.log(error));
          }
        }}

        onLoad={e => {
          e.preventDefault();
          console.log("Here");
          axios.all(
            [
              axios.get('https://rickandmortyapi.com/api/episode/36'),
              axios.get('https://rickandmortyapi.com/api/character/591')
            ])
            .then(axios.spread((firstResponse, secondResponse) => {
              let episodesResponse = JSON.stringify(firstResponse.data);
              let charactersResponse = JSON.stringify(secondResponse.data);
              props.resetSearch();
              props.addSearch(['EPISODES', episodesResponse]);
              props.addSearch(['CHARACTERS', charactersResponse]);
            }))
            .catch(error => console.log(error));
        }}
      >
        <div className="col-xs-12 col-md-12 col-lg-12">
          <CustomizedHook />
        </div>
        <div className="col-xs-12 col-md-12 col-lg-12" style={styleButtonSection}>
        <Button color="primary" size="small" variant="outlined" style={styleButton} onClick={refreshPage}>Home</Button>
          <Button color="primary" size="small" variant="outlined" style={styleButton} type="submit">Search</Button>
        </div>
        <div className="col-xs-12 col-md-12 col-lg-12" style={styleButtonSection}>
          <Button size="small" variant="outlined" style={styleButton} onClick={showEpisodes}>Episodes</Button>
          <Button size="small" variant="outlined" style={styleButton} onClick={showCharacters}>Characters</Button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addSearch: function (item) {
    dispatch(addSearch(item));
  },
  resetSearch: function (item) {
    dispatch(resetSearch(item));
  },
});

export default connect(null, mapDispatchToProps)(component);


/**
        <input
          type="text"
          value={this.state.inputValue}
          placeholder="episodes number or name characters"
          onFocus={e => e.target.value = ""}
          onChange={e => this.setState({ inputValue: e.target.value })}
        />
        <br/>
        <input
          type="text"
          value={this.state.inputValue}
          placeholder="episodes number or name characters"
          onFocus={e => e.target.value = ""}
          onChange={e => this.setState({ inputValue: e.target.value })}
        />
        <ul style={styleList}>
          {Characters.map(item => <li key={item.id} className="characters-list">{item.name}</li>)}
        </ul>
        <ul style={styleList}>
          {Episodes.map(item => <li key={item.id} className="episodes-list">{item.name} {item.episode}</li>)}
        </ul>

 */
