class APIFilters {
  query: any;
  queryStr: any;

  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //the search method first sets up the object we wish to use to query the db, it then runs the find method using this object and saves to this.query, we than return this.
  search(): APIFilters {
    const location = this.queryStr?.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: 'i'
          }
        }
      : {};
    //console.log(location);
    this.query = this.query.find({ ...location }); //spread in the location object values
    return this;
  }
  //add filter method (seems to pretty much filter everthing)
  filter(): APIFilters {
    const queryCopy = { ...this.queryStr }; //copy the existing query
    const removeFields = ['location', 'page'];
    removeFields.forEach(el => delete queryCopy[el]);

    this.query = this.query.find(queryCopy);

    return this;
  }
  //add pagination method
  pagination(resPerPage: number): APIFilters {
    const currentPage = Number(this.queryStr?.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);

    return this;
  }
}

export default APIFilters;
