import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return <Wrapper>
        <div className='header'>
            <p>&nbsp;GitHub Jobs</p>
        </div>
    </Wrapper>
};

const Wrapper = styled.header`
    .header {
        padding: padding: 0.5rem;
        background: blue;
        border-color: black;
        border-radius: 1rem;
        p {
            color: white;
            font-size: 5rem;
        }
        margin: 0rem 0.25rem;
    }
    
`;

export default Header;
