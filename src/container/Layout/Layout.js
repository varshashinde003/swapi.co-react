import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../../components/Navbar/Navbar';
import './Layout.scss';

const drawerWidth = 150;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    link: {
        textDecoration: 'none !important',
        color: '#000',
        padding: '1rem 0',
    }
});

class Layout extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes, theme, tableTitle } = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List component="nav" className="sidebar-links">
                    <ListItem>
                        <Link to="/films" className={classes.link}>Films</Link>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Link to="/people" className={classes.link}>People</Link>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Link to="/planets" className={classes.link}>Planets</Link>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Link to="/spaceships" className={classes.link}>Spaceships</Link>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Link to="/vehicles" className={classes.link}>Vehicles</Link>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Link to="/species" className={classes.link}>Species</Link>
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <CssBaseline />
                <NavBar onClick={this.handleDrawerToggle} title={tableTitle} />
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.children}
                </main>
            </div>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Layout);
