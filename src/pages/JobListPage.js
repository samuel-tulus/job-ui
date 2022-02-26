import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row } from '../components';
import { API_HOST, URL } from '../utils/constants';

const initialJobListState = {
    loading: false,
    error: false,
    jobList: [],
    currentPage: 1,
    loadMore: true
};

const JobListPage = () => {
    const [ jodDesc, setJobDesc ] = useState();
    const [ location, setLocation ] = useState();
    const [ fullTime, setFullTime ] = useState();
    const [ jobListState, setJobListState ] = useState(initialJobListState);

    useEffect(() => {
        handleFilter();
        // eslint-disable-next-line
    }, []);

    const handleFilter = async e => {
        if (e) e.preventDefault();
        
        setJobListState({ ...jobListState, loading: true });

        try {
            const url = API_HOST + URL.GET_JOB_LIST;
            const params = {
                page: 1
            };
            if (jodDesc) params.description = jodDesc;
            if (location) params.location = location;
            if (fullTime) params.full_time = fullTime;
            
            const opts = {
                params: params
            };
            const response = await axios.get(url, opts);
            const result = (response && response.data && response.data.data) || [];
            if (response && response.data && response.data.status === false) {
                throw response.data.error;
            }
            
            setJobListState({ ...jobListState, loading: false, jobList: result, currentPage: 1, loadMore: true });
        } catch (error) {
            setJobListState({ ...jobListState, loading: false, error: true });
            alert(error);
        }
    };

    const handleLoadMore = async e => {
        e.preventDefault();
        setJobListState({ ...jobListState, loading: true });

        try {
            const url = API_HOST + URL.GET_JOB_LIST;
            const params = {
                page: jobListState.currentPage + 1
            };
            if (jodDesc) params.description = jodDesc;
            if (location) params.location = location;
            if (fullTime) params.full_time = fullTime;
            const opts = {
                params: params
            };
            const response = await axios.get(url, opts);
            if (response && response.data && response.data.status === false) {
                throw response.data.error;
            }
            const result = (response && response.data && response.data.data) || [];
            let allData = jobListState.jobList;
            let currentPage = jobListState.currentPage;
            if (result && result.length > 0) {
                allData = [ ...allData, ...result ];
                currentPage += 1;
                setJobListState({ ...jobListState, loading: false, jobList: allData, currentPage: currentPage });
            } else {
                setJobListState({ ...jobListState, loading: false, loadMore: false });
            }
        } catch (error) {
            setJobListState({ ...jobListState, loading: false, error: true });
            alert(error);
        }
    };

    return <Wrapper>
        <form onSubmit={handleFilter} className='filter-form'>
            <div className="form-group row space">
                <label className="col-sm-2 col-form-label">Job Description</label>
                <div className="col-sm-10">
                    <input onChange={e => setJobDesc(e.target.value)} type="text" className="form-control" id="jodDesc" placeholder="Job Description"/>
                </div>
            </div>
            <div className="form-group row space">
                <label className="col-sm-2 col-form-label">Location</label>
                <div className="col-sm-10">
                    <input onChange={e => setLocation(e.target.value)} type="text" className="form-control" id="location" placeholder="Location"/>
                </div>
            </div>
            <div className="form-group row space">
                <label className="col-sm-2 col-form-label">Full Time Only</label>
                <div className="col-sm-10 checkbox-custom">
                    <input onChange={e => setFullTime(e.target.checked)} type="checkbox" className="form-check-input" id="fullTime"/>
                </div>
            </div>
            <div className="form-group row space">
                <div className='search-container'>
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </div>
        </form>
        
        {jobListMapping(jobListState)}

        <form onSubmit={handleLoadMore} className='load-form' hidden={!initialJobListState.loadMore}>
            <div className="form-group row space">
                <button type="submit" className="btn btn-primary">More Jobs</button>
            </div>
        </form>

    </Wrapper>
};

const jobListMapping = (jobListState) => {
    if (!jobListState || jobListState.lenght === 0) {
        return;
    }

    return jobListState.jobList.map(item => {
        return <Row key={item.id} id={item.id} title= {item.title} company={item.company} type={item.type} location={item.location} createdAt={item.createdAt}/>;
    });
};

const Wrapper = styled.header`
    margin: 1rem 1rem;

    .filter-form {
        margin: 2rem 0rem;
    }

    .load-form {
        margin: 2rem 0rem;
    }

    .checkbox-custom {
        margin: auto;
    }

    .search-container {
        text-align: left;
    }

    .space {
        margin-bottom: 0.5rem;
    }
`;

export default JobListPage;
