import React from 'react'

export default function InfoMark(props) {

    if (props.carInfo == null) {
        return (
            <div></div>
        )
    }
    else {

        console.dir(props.carInfo)

        return (

            <div className="infoModel">

                <div className="modelInfo">

                    <div>
                        <img src={props.carInfo.catalogModel.photoUrl} alt="NO PHOTO" />
                    </div>


                    <div >

                        <div >
                            <span>Full title :  </span><span> {props.carInfo.fullTitle}</span>
                        </div>
                        <div >
                            <span>Model :  </span><span> {props.carInfo.catalogModel.title}</span>
                        </div>
                        <div >
                            <span>Years of release :  </span><span> {props.carInfo.catalogModel.years}</span>
                        </div>
                        <div >
                            <span>Number of models in Ukraine :  </span><span> {props.carInfo.catalogModel.plate_count}</span>
                        </div>
                        <div >
                            <span>History :  </span> {props.carInfo.catalogModel.description}
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}