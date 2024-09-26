import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleTrainingProviderInformationPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("trainingProviderInformation")
            .get(urlParams.singleTrainingProviderInformationId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "TrainingProviderInformation", type: "error", message: error.message || "Failed get trainingProviderInformation" });
            });
    }, [props,urlParams.singleTrainingProviderInformationId]);


    const goBack = () => {
        navigate("/trainingProviderInformation");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Training Provider Information</h3>
                </div>
                <p>trainingProviderInformation/{urlParams.singleTrainingProviderInformationId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Organization Name</label><p className="m-0 ml-3" >{_entity?.organizationName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Personal Contact</label><p className="m-0 ml-3" >{_entity?.personalContact}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Trainer Provider Address</label><p className="m-0 ml-3" >{_entity?.trainerProviderAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Personal Contact_1</label><p className="m-0 ml-3" >{_entity?.personalContact1}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleTrainingProviderInformationPage);
