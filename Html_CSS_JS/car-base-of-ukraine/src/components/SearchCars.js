import React from 'react'
import axios from 'axios'
import InfoMark from './InfoMark';
import InfoModel from './InfoModel'

class SearchCars extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            show: true,
            showModel:true,
            errorNumber: "",
            vendor: "",
            catalog_model: "",
            carsInformation: {}
        }

        this.REQUEST_ADDRESS_SEARCH = "https://baza-gai.com.ua/make";
    }

    SearchCars() {

        let vendor = document.querySelector("#vendor").value.trim().toLowerCase();
        let model = document.querySelector("#model").value.trim().toLowerCase();

        if (vendor) vendor = `/${vendor}`;

        if (model) {
            model = `/${model}`;
            this.state.show = false;
        }
        else {
            this.state.show = true;
        }

        console.log(this.REQUEST_ADDRESS_SEARCH)

        let url = `${this.REQUEST_ADDRESS_SEARCH}${vendor}${model}`

        if (vendor) {
            document.querySelector("#errr").innerText = "" 
            axios.get(url)
                .then((res) => {
                    this.state.showModel = true;
                   
                    this.setState({
                        carsInformation: res.data,
                        errorNumber: ""
                    });
                    console.dir(this.state.carsInformation);
                })
                .catch((err) => {
                      this.state.showModel = false;
                    this.setState({
                        errorNumber: "Не корректный ввод данных!!!"
                    })
                })
        }
        else {

            document.querySelector("#errr").innerText = "Поле MARK должно быть заполнено!"
        }
        // if (vendor&& model) {
        //     document.querySelector("#errr").innerText = ""
        //     axios.get(url)
        //         .then((res) => {
        //             this.setState({
        //                 carsInformation: res.data
        //             });
        //             console.dir(this.state.carsInformation);
        //         })
        //         .catch((err) => {
        //               this.state.show = true;
        //             this.setState({
        //                 errorNumber: "Не корректный ввод данных!!!"
        //             })
        //         })
        // }


    }

    render() {

        return (

            <div>

                <div className="formMake">

                    <div>
                        <div>MARK:</div> <div ><input id="vendor" type="text" placeholder="Enter mark" /></div> <div id="errr"></div>
                    </div>

                    <div>
                        <div>MODEL:</div> <div><input id="model" type="text" placeholder="Enter model" /></div>
                    </div>

                    <div>
                        <input type="button" value="Search" onClick={() => this.SearchCars()} className="btn btn-secondary" />
                    </div>

                </div>

                { this.state.show ? <InfoMark carInfo={this.state.carsInformation.catalogModels} /> :
                this.state.showModel ? <InfoModel carInfo={this.state.carsInformation} />:""
                }

                <div id="errorOut"> {this.state.errorNumber}</div>

            </div>
        )
    }
}

export default SearchCars