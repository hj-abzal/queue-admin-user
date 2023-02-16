import React from 'react';
import {Table} from "../components/Table";

export const OrdersPage: React.FC = () => {
    return (
        <div>
            <Table isDone={false}/>
            <Table isDone={true}/>
        </div>
    );
};
