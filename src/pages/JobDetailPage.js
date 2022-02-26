import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { API_HOST, URL } from '../utils/constants';

const initialJobDetailState = {
    loading: false,
    error: false,
    jobDetail: {}
};

const JobDetailPage = () => {
    const { id } = useParams();
    const [ jobDetailState, setJobDetailState ] = useState(initialJobDetailState);

    useEffect(() => {
        getJobDetail();
        // eslint-disable-next-line
    }, []);
    
    const getJobDetail = async () => {        
        setJobDetailState({ ...jobDetailState, loading: true });

        try {
            const url = API_HOST + URL.GET_JOB_DETAIL + `/${id}`;
            const response = await axios.get(url);
            const result = (response && response.data && response.data.data) || {};
            if (response && response.data && response.data.status === false) {
                throw response.data.error;
            }
            
            setJobDetailState({ ...jobDetailState, loading: false, jobDetail: result });
        } catch (error) {
            setJobDetailState({ ...jobDetailState, loading: false, error: true });
            alert(error);
        }
    };

    return <Wrapper>
        <Link to='/' className='btn'>
            Back
        </Link>

        <div className="row">
            <div className="leftcolumn">
                <div className="card">
                <h5>{jobDetailState.jobDetail.type || ''} / {jobDetailState.jobDetail.location || ''}</h5>
                    <h2>{jobDetailState.jobDetail.title || ''}</h2>
                    <div className='description'>{parse(jobDetailState.jobDetail.description || '')}</div>
                </div>
            </div>
            <div className="rightcolumn">
                <div className="card">
                    <h2>{jobDetailState.jobDetail.company}</h2>
                    <img src={jobDetailState.jobDetail.companyLogo || ''} alt={jobDetailState.jobDetail.company || ''} className="fakeimg" style={{height: 'auto'}}/>
                    <a href={jobDetailState.jobDetail.companyUrl || ''}>{jobDetailState.jobDetail.companyUrl || ''}</a>
                </div>
                <div className="card">
                    <h3>How to apply</h3>
                    <div>{parse(jobDetailState.jobDetail.howToApply || '')}</div>
                </div>
            </div>
        </div>
    </Wrapper>
};

const Wrapper = styled.header`
    .btn {
        text-transform: uppercase;
        background: blue;
        color: white;
        padding: 0.375rem 0.75rem;
        letter-spacing: 0.1rem;;
        display: inline-block;
        font-weight: 400;
        transition: all 0.3s linear;
        font-size: 0.875rem;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        border-radius: 0.25rem;
        border-color: transparent;
        margin-left: 1rem;
        margin-top: 1rem;
    }

    .leftcolumn {
        float: left;
        width: 75%;
    }

    .rightcolumn {
        float: left;
        width: 25%;
        padding-left: 20px;
    }

    .fakeimg {
        background-color: #aaa;
        width: 100%;
        padding: 20px;
    }

    .card {
        background-color: white;
        padding: 20px;
        margin-top: 20px;
    }

    .row:after {
        content: "";
        display: table;
        clear: both;
    }

    .description {
        margin: 1rem 0rem;
    }

    @media screen and (max-width: 800px) {
        .leftcolumn, .rightcolumn {
            width: 100%;
            padding: 0;
        }
    }
`;

export default JobDetailPage;
