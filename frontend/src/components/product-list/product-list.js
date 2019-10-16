import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from "axios";

const classes = {};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: []
    };
  }

  componentDidMount() {
    // TODO move to provider
    axios.get('api/v1/products/all', {method: 'GET'})
      .then((response) => {
        this.setState({productList: response.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      productList
    } = this.state;

    return (
      <Box p={4}>
        <Grid container alignItems="stretch" justify="flex-start" spacing={2}>

          {productList.map(product => (
            <Grid key={product.id} item sm={12} md={6} lg={3} >
              <Card >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={product.description}
                    image={product.image}
                    title={product.title}
                  />
                  <CardContent>
                    <Typography variant="h5" color="textSecondary" component="h5">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {product.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Buy
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default connect(
  null
)(Main);
