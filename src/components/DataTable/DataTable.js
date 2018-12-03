import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import TableFooter from '@material-ui/core/TableFooter';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import './DataTable.scss';

class DataTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, columnData } = this.props;
        return (
            <TableHead>
                <TableRow>
                    {columnData.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                                className="grow"
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}
DataTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit
    },
    highlight: theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
        },
    spacer: {
        flex: '1 1 100%'
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: '0 0 auto'
    }
});

let DataTableToolbar = props => {
    const { classes } = props;
    return (<Toolbar>
        <div className={classes.spacer} />
    </Toolbar>);
};
DataTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

DataTableToolbar = withStyles(toolbarStyles)(DataTableToolbar);
const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5
    }
});
class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage)) - 1);
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (<div className={classes.root}>
            <IconButton onClick={this.handleFirstPageButtonClick} disabled={page === 0} aria-label="First Page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={this.handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={this.handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Next Page">
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={this.handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Last Page">
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>);
    }

}
const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);
const styles = theme => ({
    root: {
        width: '100%',
    },
    table: {
        minWidth: 1020,
        fontFamily: 'Acme, sans-serif !important',
    },
    tableWrapper: {
        overflowX: 'auto'
    }
});

class DataTable extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props = props
        this.state = {
            order: 'asc',
            orderBy: this.props.orderBy,
            data: this.props.data,
            page: 0,
            actualPage: 1,
            rowsPerPage: 10
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data = order === 'desc'
            ? this.props.data.sort((a, b) => (
                b[orderBy] < a[orderBy]
                    ? -1
                    : 1))
            : this.props.data.sort((a, b) => (
                a[orderBy] < b[orderBy]
                    ? -1
                    : 1));

        this.setState({ data, order, orderBy });
    };
    
    handleChangePage = (event, page) => {
        const counter = this.state.rowsPerPage * page
        if (counter < this.props.count) {
            this.setState({ page });
            this.props.handleChangePage(page)
        }
    };

    handleChangeRowsPerPage = event => {
        console.error('Not supported')
    };

    render() {
        const { classes, data, columnData, onRowClick } = this.props;
        const {
            order,
            orderBy,
            rowsPerPage,
            page
        } = this.state;

        return (<Paper className={classes.root}>
            <Table className={classes.table}>
                <DataTableHead order={order} orderBy={orderBy} onRequestSort={this.handleRequestSort} rowCount={this.props.count} columnData={this.props.columnData} />
                <TableBody>
                    {
                        data.map(details => {
                            return (<TableRow hover={true} onClick={() => onRowClick(details.url)} tabIndex={-1} key={details.url}>
                                {
                                    columnData.map((columndetails, index) => {
                                        return (<TableCell key={`${details.id}-${index}`} className="grow">
                                            {details[columndetails.id]}
                                        </TableCell>)
                                    })
                                }
                            </TableRow>);
                        })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination colSpan={5} count={this.props.count} rowsPerPage={rowsPerPage} page={page} onChangePage={this.handleChangePage} onChangeRowsPerPage={this.handleChangeRowsPerPage} ActionsComponent={TablePaginationActionsWrapped} />
                    </TableRow>
                </TableFooter>
            </Table>
        </Paper>);
    }
}

DataTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataTable);