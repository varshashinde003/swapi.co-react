import React,{Component} from 'react';
import EntityDetails from '../../components/DataTable/EntityDetails';
class FilmDescription extends Component{

  constructor(props){
    super(props)
    this.props = props
    this.state={

    }
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
 render(){
      const {film} = this.props
      return (<div><EntityDetails
            tableData={[{"label":"Title","key":"title","isArray":false},
                        {"label":"Episode","key":"episode_id","isArray":false},
                      {"label":"Opening Crawler","key":"opening_crawl","isArray":false},
                    {"label":"Director","key":"director","isArray":false},
                  {"label":"Producer","key":"producer","isArray":false},
                {"label":"Released On","key":"release_date","isArray":false},
              {"label":"Characters","key":"characters","isArray":true},
            {"label":"Planets","key":"planets","isArray":true},
          {"label":"Starships","key":"starships","isArray":true},
          {"label":"Created on","key":"created","isArray":false},
          {"label":"Edited on","key":"edited","isArray":false},
          {"label":"Url","key":"url","isArray":false}]}
            data={film}/>
      </div>

        )
 }
}

export default FilmDescription;