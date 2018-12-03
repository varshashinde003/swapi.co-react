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
import SpeciesDescription from './SpeciesDescription';
import './styles/Species.scss'

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

class Species extends React.Component {

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
            "species": null,
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
            const data = await Service.getData("species", this.state.page)
            this.setState({ data: data.results, count: data.count })
        } catch (e) {
            console.error(e)
        }
    }
    render() {
        const { classes } = this.props;
        if (this.state.data.length > 0) {
            return (<Layout tableTitle="Species"><DataTable data={this.state.data}
                orderBy="name"
                columnData={[
                    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
                    { id: 'classification', numeric: false, disablePadding: false, label: 'Classification' },
                    { id: 'designation', numeric: false, disablePadding: false, label: 'Designation' },
                    { id: 'average_height', numeric: false, disablePadding: false, label: 'Average Height' },
                    { id: 'language', numeric: false, disablePadding: false, label: 'Language' }]}
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
                                species Description
                        </Typography>
                        </Toolbar>
                    </AppBar>
                    <SpeciesDescription species={this.state.species} />
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
            let data = await Service.getData("species", page)
            this.setState({ data: data.results, page })
        } catch (e) {
            console.error(e)
            throw e
        }
    }
    async onRowClick(url) {
        try {
            let species = await Service.getDetails(url)
            this.setState({ species })
            this.handleClickOpen();
        } catch (e) {
            console.error(e)
            throw e
        }

    }
}

Species.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Species);