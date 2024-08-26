import React from 'react';
import { ViewContentContainer } from "../containers/view-content";
import { useLocation, useNavigate } from 'react-router-dom';


export default function ViewContents() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const userEmail = queryParams.get('userEmail');
    return <ViewContentContainer userEmail={userEmail}/>;

}
