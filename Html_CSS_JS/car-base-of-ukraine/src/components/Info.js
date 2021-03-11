import React from 'react'

 function Info(props) {
   
    let flag = false;
    flag = props.carInformation.stolen;

    return (
    
    <div className="info" >

        <div>
            <img src={props.carInformation.photoUrl} alt="NO PHOTO" />
        </div>

        <div >

            <div >
                <span>Car Brand :  </span><span> {props.carInformation.vendor}</span>
            </div>
            <div >
                <span>Model :  </span><span> {props.carInformation.model}</span>
            </div>
            <div >
                <span>Number Plate :  </span><span> {props.carInformation.digits}</span>
            </div>
            <div >
                <span>Year of issue :  </span><span> {props.carInformation.year}</span>
            </div>
            <div >
                <span>Specifications:  </span><span> {props.carInformation.operations[0].notes}</span>
            </div>
            <div >
                <span> Last registration :  </span><span> {props.carInformation.operations[0].regAt}</span>
            </div>
            <div >
                <span>Events:  </span><span > {props.carInformation.operations[0].operation}</span>
            </div>
            <div >
                <span>Registration address:  </span><span> {props.carInformation.operations[0].address}</span>
            </div>
            <div >
                <span>Hijacked:  </span><span>{flag ? 'Автомобиль в розыске' : 'Автомобиль не в розыске'}</span>
            </div>

        </div>

    </div>
    )
} 

export default Info