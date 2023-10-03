import React from "react";

export default function SelectedBox({placeholder}) {

    return(
        <select name={placeholder}>
            <option value={"Item 1"}>Item 1</option>
            <option value={"Item 2"}>Item 2</option>
            <option value={"Item 3"}>Item 3</option>
        </select>
    )
}