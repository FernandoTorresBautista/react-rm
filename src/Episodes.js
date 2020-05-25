import React from 'react';
import { connect } from 'react-redux';
import { getEpisodes } from './reducer';
import Pagination from '@material-ui/lab/Pagination';
import DemoCarousel from './DemoCarousel';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class component extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPageEpi: 1,
      todosPerPageEpi: 6,
      todosEpi: [],
    }
    //this.handleClick = this.handleClick.bind(this);
  }

  /*handleClick(e) {
    this.setState({
      currentPageEpi: Number(e.target.id),
    })
  }*/

  handlePageChange(pageNumber) {
    if (pageNumber.target.innerText !== undefined) {
      this.setState({
        currentPageEpi: Number(pageNumber.target.innerText),
      });
    } else {
      let auxUpdatePage = pageNumber.currentTarget.getAttribute('aria-label');
      if (auxUpdatePage === "Go to next page") {
        //actualizar los items o 
        //manejar una nueva petición de axios
      }//or get back page
      else {
        //
        //
      }
    }
  }

  render() {
    const { currentPageEpi, todosPerPageEpi } = this.state;
    console.log("todos episodes");

    const indexOfLastTodo = currentPageEpi * todosPerPageEpi;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPageEpi;
    const currentTodos = this.props.items.slice(indexOfFirstTodo, indexOfLastTodo);

    const styleNoFlex = {
      display: 'inline-block',
      margin: 0,
    }

    const imgDivStyle = {
      display: "block",
      width: "80%",
      heigth: "40%",
      margin: "0 auto"
    }

    const paginationDivStyle = {
      margin: "0 auto"
    }

/*    const styleImg = {
      width: "150px",
      height: "200px",
      margin: "0 auto"
    }*/

    const renderTodos = currentTodos.map((todo, index) => {
      return (
        <div className="col-xs-12 col-md-4 col-lg-4" style={styleNoFlex} id={todo.id} key={todo.id}>
          <div className="col-xs-12 col-md-12 col-lg-12">
            <Card>
              <CardActionArea>
                <div style={imgDivStyle}>
                  <DemoCarousel imgs={todo.characters} />
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {todo.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Release Date {todo.air_date}  <br />
                    Acronym of episode: {todo.episode} <br />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>);
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.items.length / todosPerPageEpi); i++) {
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

    const styleEpisodesContect = {
      display: "block",
    }
/*    const blockSmallButton = {
      display: "inline-flex",
      position: "relative",
      margin: "0 10px 0 5px ",
      maxWidth: "4%"
    }*/

    return (
      <div className="EpisodesContainerDiv">
        <h4>Episodes</h4>
        <div className="row" id="items-content" style={styleEpisodesContect}>
          {renderTodos}
        </div>
        <div className="row">
          <Pagination style={paginationDivStyle}
            count={renderPageNumbers.length}
            page={this.props.currentPageEpi}
            onChange={this.handlePageChange.bind(this)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: getEpisodes(state),
});
export default connect(mapStateToProps)(component);
