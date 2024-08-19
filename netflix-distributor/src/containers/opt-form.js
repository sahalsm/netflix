import React from "react";
import { OptForm } from "../components";

export function OptFormContainer(){
    return(
        <OptForm>
            <OptForm.Button>Click</OptForm.Button>
            <OptForm.Input></OptForm.Input>
        </OptForm>
    );
}