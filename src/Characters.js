import React from 'react';
import { connect } from 'react-redux';
import { getCharacters } from './reducer';
import Pagination from '@material-ui/lab/Pagination';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/*
const imgStl = {
  width: "120px",
  heigth: "120px",
  float: "left"
};
*/
class component extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      todosPerPage: 6,
    }
    //this.handleClick = this.handleClick.bind(this);
  }

  /*handleClick(e) {
    this.setState({
      currentPage: Number(e.target.id),
    })
  }*/

  handlePageChange(pageNumber) {
    if (pageNumber.target.innerText !== undefined) {
      this.setState({
        currentPage: Number(pageNumber.target.innerText),
      });
    } else {
      let auxUpdatePage = pageNumber.currentTarget.getAttribute('aria-label');
      if (auxUpdatePage === "Go to next page") {
        //actualizar los items o 
        let actualPagePag = this.state.currentPage + 1;
        this.setState({
          currentPage: actualPagePag,
        });
      }//or get back page
      else {
        let actualPagePag = this.state.currentPage - 1;
        this.setState({
          currentPage: actualPagePag,
        });
      }
    }
  }

  render() {
    const { currentPage, todosPerPage } = this.state;
    console.log("todos character");

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = this.props.items.slice(indexOfFirstTodo, indexOfLastTodo);

    const styleNoFlex = {
      display: 'inline-flex',
      margin: "1em 0 1em 0",
    }

    const styleImg = {
      width: "150px",
      height: "200px",
      margin: "0 auto"
    }

    
    const renderTodos = currentTodos.map((todo, index) => {
      return (
        <div className="col-xs-12 col-md-4 col-lg-4" style={styleNoFlex} id={todo.id} key={todo.id}>
          <div className="col-xs-12 col-md-12 col-lg-12">
            <Card>
              <CardActionArea>
                <CardMedia
                  style={styleImg}
                  image={todo.image}
                  title="avatar"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {todo.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <span class="status__icon"></span> {todo.species} - {todo.status} <br />
                    Gender: {todo.gender} <br />
                    Number of chapther where appears: {todo.episode.length} <br />
                    Last known location endpoint:  {todo.location.name} <br />
                    character's origin location: {todo.origin.name} <br />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.items.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <div
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </div>
      );
    });

    const styleChacatersContect = {
      display: "block",
    }
    const charactersStyledCard = {
      margin: "2em 0 2em 0"
    }
    const paginationDivStyle = {
      margin: "0 auto"
    }

    return (
      <div className="CharactersContainerDiv" style={charactersStyledCard}>
        <h4>Personajes</h4>
        <div className="row" id="items-content" style={styleChacatersContect}>
          {renderTodos}
        </div>
        <div className="row">
          <Pagination style={paginationDivStyle}
            count={renderPageNumbers.length}
            page={this.props.currentPage}
            onChange={this.handlePageChange.bind(this)} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  items: getCharacters(state),
});

export default connect(mapStateToProps)(component);

