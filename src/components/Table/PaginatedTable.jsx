import {
  FirstPageOutlined,
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  LastPageOutlined,
} from "@mui/icons-material";
import { CircularProgress, IconButton, MenuItem, Select } from "@mui/material";
import { parseInt } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { setPageNo, setPageSize } from "../../redux/actions";
import "./PaginatedTable.css";

function PaginatedTable({
  rows,
  totalPages,
  pageSize,
  pageNo,
  setPageSize,
  isFirst,
  isLast,
  setPageNo,
  loading,
}) {
  const handleFirstPageButtonClick = () => {
    setPageNo(0);
  };

  const handleNextButtonClick = () => {
    setPageNo(pageNo + 1);
  };

  const handleBackButtonClick = () => {
    setPageNo(pageNo - 1);
  };

  const handleLastPageButtonClick = () => {
    setPageNo(totalPages - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
  };

  return (
    <div className="paginatedtable_main">
      {!loading ? (
        <table>
          <thead>
            <tr>
              <td>Pincode</td>
              <td>City</td>
              <td>State</td>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.districtName}</td>
                <td>{row.stateName}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                Rows per page :
                <Select
                  value={pageSize}
                  onChange={handleChangeRowsPerPage}
                  sx={{ m: 1, height: 30 }}
                >
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="20">20</MenuItem>
                  <MenuItem value="-1">All</MenuItem>
                </Select>
              </td>
              <td colSpan={2}>
                <IconButton
                  onClick={handleFirstPageButtonClick}
                  disabled={isFirst}
                >
                  <FirstPageOutlined />
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={isFirst}>
                  <KeyboardArrowLeftOutlined />
                </IconButton>
                <span>
                  Page {pageNo + 1} of {totalPages}
                </span>
                <IconButton onClick={handleNextButtonClick} disabled={isLast}>
                  <KeyboardArrowRightOutlined />
                </IconButton>
                <IconButton
                  onClick={handleLastPageButtonClick}
                  disabled={isLast}
                >
                  <LastPageOutlined />
                </IconButton>
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <CircularProgress color="inherit" />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    totalPages: state.totalPages,
    pageSize: state.pageSize,
    pageNo: state.pageNo,
    isFirst: state.isFirst,
    isLast: state.isLast,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageSize: (size) => dispatch(setPageSize(size)),
    setPageNo: (pageNo) => dispatch(setPageNo(pageNo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginatedTable);
