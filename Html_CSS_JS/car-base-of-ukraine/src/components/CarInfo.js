import React from 'react'
import axios from 'axios'
import Info from './Info'

class CarInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            carInformation: {},
            errorNumber: null,
            carInfo: null
        }

        this.REQUEST_ADDRESS = "https://baza-gai.com.ua/nomer/";
        this.setCarNumber = this.setCarNumber.bind(this);

    }

    setCarNumber(event) {
        this.setState({
            numberPlate: null,
            numberPlate: event.target.value.trim().toLowerCase()
        })
    }

    Search = event => {
        event.preventDefault();
        axios.get(`${this.REQUEST_ADDRESS}+${this.state.numberPlate}`)

            .then((res) => {

                console.dir("then.response" + res);
                this.state.show = true;
                const carInformation = res.data;
                this.setState({
                    carInformation,
                    errorNumber: ""
                });
                this.state.carInformatio = carInformation

            })
            .catch((err) => {

                this.state.show = false;
                this.setState({
                    errorNumber: "Номер не существует,или не корректный ввод!!!"
                })

            })
    }

    render() {

        this.carInfo = this.state.carInformation;
        console.dir("EMTY" + this.carInfo);

        return (
            <div className="infoNumber" >

                <div className="formIn">
                    <form id="carNumberForm" onSubmit={this.Search}>
                        <div>
                            <input type="text" placeholder="AA7777AA" onBlur={this.setCarNumber} />
                        </div>
                        <div>
                            <input type="submit" value="Search" className="btn btn-secondary" />
                        </div>
                    </form>
                </div>

                {this.state.show ? <Info numberErr={this.state.numberErr} carInformation={this.state.carInformation} /> : ""}

                <div id="errorOut"> {this.state.errorNumber}</div>

            </div>
        )
    }
}

export default CarInfo