import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './Navbar.scss';

const styles = theme => ({
  typography: {
    useNextVariants: true,
  },
  root: {
    // flexGrow: 1,
    zIndex: 10000,
  },
  brandLogo: {
    fontFamily: 'Roboto',
    flexGrow: 1
  },
  logoColor: {
    color: '#666'
  },
  appBar: {
    zIndex: -1,
    background: '#3399db',
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'none !important',
    color: '#fff',
  }
});

class NavBar extends React.PureComponent {
  render() {
    const { classes, onClick, title } = this.props;
    // const option = 'All';
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={onClick}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className="fontFamily">
            <Link to="/" className={classes.link}>StarWarsApi [swapi.co] - {title || 'Home'}</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
