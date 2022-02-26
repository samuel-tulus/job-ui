import Moment from 'moment';
import React from 'react';
import styled from 'styled-components';

const Row = ({ id, title, company, type, location, createdAt }) => {
    const created = new Date(createdAt);
    const timestamp = created.getTime();
    
    return <Wrapper>
        <div id={id} key={id} className="row product">
            <div className="col-md-10 product-detail">
                <a href={`/${id}`} >{title}</a>
                <p>{company} - {type}</p>
            </div>
            <div className="col-md-2 product-detail">
                <p>{location}</p>
                <p>{Moment(timestamp).fromNow()}</p>
            </div>
        </div>
    </Wrapper>
};

const Wrapper = styled.header`
    .main-content {
        margin-top: 2rem;
    }

    a {
        font-size: 2rem;
    }
    
    .product {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 1rem 0;
        margin: 1rem 0;
    }
    
    .product-detail {
        padding: 0 2rem;
    }
    
    .product-price {
        font-weight: bold;
        font-size: 140%;
    }
`;

export default Row;