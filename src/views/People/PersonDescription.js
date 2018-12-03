import React, { Component } from 'react';
import EntityDetails from '../../components/DataTable/EntityDetails';
class PersonDescription extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {

        }
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        const { person } = this.props
        return (<div><EntityDetails
            tableData={[{ "label": "Name", "key": "name", "isArray": false },
            { "label": "Height", "key": "height", "isArray": false },
            { "label": "Mass", "key": "mass", "isArray": false },
            { "label": "Hair Color", "key": "hair_color", "isArray": false },
            { "label": "Skin Color", "key": "skin_color", "isArray": false },
            { "label": "Eye Color", "key": "eye_color", "isArray": false },
            { "label": "Birth Year", "key": "birth_year", "isArray": false },
            { "label": "Gender", "key": "gender", "isArray": false },
            { "label": "Homeworld", "key": "homeworld", "isArray": false },
            { "label": "Films", "key": "films", "isArray": true },
            { "label": "Species", "key": "species", "isArray": true },
            { "label": "Vehicles", "key": "vehicles", "isArray": true },
            { "label": "Starships", "key": "starships", "isArray": true },            
            { "label": "Url", "key": "url", "isArray": false }]}
            data={person} />
        </div>

        )
    }
}

export default PersonDescription;