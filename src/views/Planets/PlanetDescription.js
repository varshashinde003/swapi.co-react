import React, { Component } from 'react';
import EntityDetails from '../../components/DataTable/EntityDetails';
class PlanetDescription extends Component {

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
        const { planet } = this.props
        return (<div><EntityDetails
            tableData={[{ "label": "Name", "key": "name", "isArray": false },
            { "label": "Rotation Period", "key": "rotation_period", "isArray": false },
            { "label": "Orbital Period", "key": "orbital_period", "isArray": false },
            { "label": "Diameter", "key": "diameter", "isArray": false },
            { "label": "Climate", "key": "climate", "isArray": false },
            { "label": "Gravity", "key": "gravity", "isArray": false },
            { "label": "Terrain", "key": "terrain", "isArray": false },
            { "label": "Surface Water", "key": "surface_water", "isArray": false },
            { "label": "Popoulation", "key": "population", "isArray": false },
            { "label": "Residents", "key": "residents", "isArray": true },
            { "label": "Films", "key": "films", "isArray": true },         
            { "label": "Url", "key": "url", "isArray": false }]}
            data={planet} />
        </div>

        )
    }
}

export default PlanetDescription;