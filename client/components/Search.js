const Search = () => {
    return (
        <div className="search-bar form-inline">
            <input className="form-control" type="text" />
            <button className="btn hidden-sm-down" onClick={function() { props.handleSubmit($('form-control').val()); } }>
                <span className="glyphicon glyphicon-search"></span>
            </button>
        </div> 
    )
};