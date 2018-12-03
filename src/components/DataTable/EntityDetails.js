import React,{Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    fontSize: '15px',
    lineHeight: '180%',
  },
  paper: {
    width:'80%',
    margin:'auto',
    marginTop: theme.spacing.unit * 2,
    backgroundColor: '#d3d8f3',
    padding: theme.spacing.unit * 2,
    textAlign: 'justify',
    color: theme.palette.text.primary,
  },
  wrapper:{
    wordWrap: 'break-word'
  }
});

class EntityDetails extends Component{
  constructor(props){
    super(props)
    this.props = props
  }
  render(){
    const {classes, tableData, data} = this.props
      return(
        <div className="div-table">
          { tableData.map((tableDetails,index)=>
              {
                return(
                  <div className={classes.root} key={index}>
                  <Paper className={classes.paper}>
                    <Grid container spacing={0}>
                      <Grid item xs={3}>
                        <div><strong>{tableDetails.label}</strong></div>
                      </Grid>
                      <Grid item xs={9}>
                        <div>{tableDetails.IsArray ? data[tableDetails.key].map((detail,innerIndex)=><div key={`${innerIndex}-1`}>{detail.label}</div>):<div className={classes.wrapper}>{data[tableDetails.key]}<br /></div>}
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                  </div>
               )
              }
           )
         }
       </div>
      )
  }
}


EntityDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EntityDetails);