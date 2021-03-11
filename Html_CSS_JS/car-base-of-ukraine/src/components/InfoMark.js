import React from 'react'

export default function InfoMark(props) {

    if (props.carInfo == null) {
        return (
            <div></div>
        )
    }
    else {

        return (

            <div className="infoMark">

                {props.carInfo.map((item) => {

                    return (

                        <div className="markInfo">

                            <div>
                                <img src={item.photoUrl} alt="NO PHOTO" />
                            </div>

                            <div >
                                <div >
                                    <span>Model :  </span><span> {item.title}</span>
                                </div>
                                <div >
                                    <span>Years of release :  </span><span> {item.years}</span>
                                </div>
                                <div >
                                    <span>Number of models in Ukraine :  </span><span> {item.plate_count}</span>
                                </div>

                            </div>

                        </div>
                    )
                })}

            </div>

        )
    }
}