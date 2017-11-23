import React from 'react';


const Search = (props) => {
    return (
        <div className="search-bar form-inline">
            <input className="form-control" type="text" />
            <button className="btn hidden-sm-down" onClick={() => { props.handleSubmit($('.form-control').val()); $('.form-control').val('');} }>
            <span className="glyphicon glyphicon-search"></span>
            </button>
        </div> 
    )
};

export default Search;