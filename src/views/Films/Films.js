import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Service from '../../service/service';
import DataTable from '../../components/DataTable/DataTable';
import Layout from '../../container/Layout/Layout';
import FilmDescription from './FilmDescription';
import './styles/Films.scss'

const styles = {
    appBar: {
        position: 'relative',
        marginTop: '60px'
    },
    flex: {
        flex: 1,
        fontFamily: 'Acme, sans-serif !important'
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Films extends React.Component {

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    constructor(props) {
        super(props)
        this.state = {
            "page": 1,
            "data": [],
            "film": null,
            "open": false,
            "columnData": [
                { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
                { id: 'episode_id', numeric: false, disablePadding: false, label: 'Episode' },
                { id: 'director', numeric: false, disablePadding: false, label: 'Director' },
                { id: 'producer', numeric: false, disablePadding: false, label: 'Producer' },
                { id: 'release_date', numeric: false, disablePadding: false, label: 'Released on' }]
        }
    }
    async componentDidMount() {
        try {
            const data = await Service.getData("films", this.state.page)
            this.setState({ data: data.results, count: data.count })
        } catch (e) {
            console.error(e)
        }
    }
    render() {
        const { classes } = this.props;
        if (this.state.data.length > 0) {
            return (<Layout tableTitle="Films"><DataTable data={this.state.data}
                orderBy="episode_id"
                columnData={[
                    { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
                    { id: 'episode_id', numeric: false, disablePadding: false, label: 'Episode' },
                    { id: 'director', numeric: false, disablePadding: false, label: 'Director' },
                    { id: 'producer', numeric: false, disablePadding: false, label: 'Producer' },
                    { id: 'release_date', numeric: false, disablePadding: false, label: 'Released on' }]}
                handleChangePage={() => this.handleChangePage()}
                count={this.state.count}
                onRowClick={url => this.onRowClick(url)}
            />
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Film Description
                        </Typography>
                        </Toolbar>
                    </AppBar>
                    <FilmDescription film={this.state.film} />
                </Dialog>
            </Layout>

            )
        } else {
            return (<div>Loading...</div>)
        }
    }

    async handleChangePage() {
        try {
            let page = this.state.page
            page = page + 1
            let data = await Service.getData("films", page)
            this.setState({ data: data.results, page })
        } catch (e) {
            console.error(e)
            throw e
        }
    }
    async onRowClick(url) {
        try {
            let film = await Service.getDetails(url)
            this.setState({ film })
            this.handleClickOpen();
        } catch (e) {
            console.error(e)
            throw e
        }

    }
}

Films.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Films);