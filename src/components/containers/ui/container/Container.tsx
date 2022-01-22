import * as React from "react";
import "./container.css";


export interface LayoutProps  { 
   children: React.ReactNode
}

function Container(props: LayoutProps) {
    return (
        <div className="container">
            {props.children}
        </div>
    )
}

export default Container
