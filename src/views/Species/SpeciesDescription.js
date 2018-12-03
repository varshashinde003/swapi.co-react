import React, { Component } from 'react';
import EntityDetails from '../../components/DataTable/EntityDetails';
class SpeciesDescription extends Component {

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
        const { species } = this.props
        return (<div><EntityDetails
            tableData={[{ "label": "Name", "key": "name", "isArray": false },
            { "label": "Classification", "key": "classification", "isArray": false },
            { "label": "Designation", "key": "designation", "isArray": false },
            { "label": "Average Height", "key": "average_height", "isArray": false },
            { "label": "Skin Colors", "key": "skin_colors", "isArray": false },
            { "label": "Eye Colors", "key": "eye_colors", "isArray": false },
            { "label": "Hair Colors", "key": "hair_colors", "isArray": false },
            { "label": "Average Lifespan", "key": "average_lifespan", "isArray": false },
            { "label": "Homeworld", "key": "homeworld", "isArray": false },
            { "label": "Language", "key": "language", "isArray": false },
            { "label": "Films", "key": "films", "isArray": true },
            { "label": "People", "key": "people", "isArray": true },          
            { "label": "Url", "key": "url", "isArray": false }]}
            data={species} />
        </div>

        )
    }
}

export default SpeciesDescription;