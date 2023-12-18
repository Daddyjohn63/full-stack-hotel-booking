class APIFilters {
  query: any;
  queryStr: any;

  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //the search method first sets up the object we wish to use to query the db, it then runs the fins method using this object and saves to this.query, we than return this.
  search(): APIFilters {
    const location = this.queryStr?.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: 'i'
          }
        }
      : {};
    this.query = this.query.find({ ...location }); //spread in the location object values
    return this;
  }
}

export default APIFilters;
