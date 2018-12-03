import React, { Component } from 'react';
import EntityDetails from '../../components/DataTable/EntityDetails';
class VehicleDescription extends Component {

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
        const { vehicle } = this.props
        return (<div><EntityDetails
            tableData={[{ "label": "Name", "key": "name", "isArray": false },
            { "label": "Model", "key": "model", "isArray": false },
            { "label": "Manufacturer", "key": "manufacturer", "isArray": false },
            { "label": "Cost In Credits", "key": "cost_in_credits", "isArray": false },
            { "label": "Length", "key": "length", "isArray": false },
            { "label": "Max Atmosphering Speed", "key": "max_atmosphering_speed", "isArray": false },
            { "label": "Crew", "key": "crew", "isArray": false },
            { "label": "Passengers", "key": "passengers", "isArray": false },
            { "label": "Cargo Capacity", "key": "cargo_capacity", "isArray": false },
            { "label": "Consumables", "key": "consumables", "isArray": false },
            { "label": "Vehicle Class", "key": "vehicle_class", "isArray": false },
            { "label": "Pilots", "key": "pilots", "isArray": true },
            { "label": "Films", "key": "films", "isArray": true },            
            { "label": "Url", "key": "url", "isArray": false }]}
            data={vehicle} />
        </div>

        )
    }
}

export default VehicleDescription;