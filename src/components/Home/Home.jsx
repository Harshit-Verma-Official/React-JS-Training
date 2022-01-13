import React, { useEffect } from "react";
import { connect } from "react-redux";
import { APIGetCities } from "../../axios/axios";
import PaginatedTable from "./Table/PaginatedTable";

function Home({
  cities,
  totalPages,
  pageSize,
  pageNo,
  isFirst,
  isLast,
  loading,
}) {
  // Fetch Data
  useEffect(() => {
    APIGetCities(5, 0);
  }, []);
  // Fetch Data

  let headers = [
    { label: "Pincode", key: "id" },
    { label: "City", key: "districtName" },
    { label: "State", key: "stateName" },
    { label: "Name", key: "name" },
  ];

  return (
    <div className="home_container">
      <PaginatedTable
        rows={cities}
        headers={headers}
        totalPages={totalPages}
        pageSize={pageSize}
        pageNo={pageNo}
        isFirst={isFirst}
        isLast={isLast}
        loading={loading}
        handleFirstPageButtonClick={() => APIGetCities(pageSize, 0)}
        handleBackButtonClick={() => APIGetCities(pageSize, pageNo - 1)}
        handleNextButtonClick={() => APIGetCities(pageSize, pageNo + 1)}
        handleLastPageButtonClick={() => APIGetCities(pageSize, totalPages - 1)}
        handleChangeRowsPerPage={(pageSize) => APIGetCities(pageSize, 0)}
        pageSizes={[5, 10, 15, 20, 25]}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    totalPages: state.totalPages,
    pageSize: state.pageSize,
    pageNo: state.pageNo,
    isFirst: state.isFirst,
    isLast: state.isLast,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, null)(Home);
