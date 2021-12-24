import {
  FirstPageOutlined,
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  LastPageOutlined,
} from "@mui/icons-material";
import { IconButton, MenuItem, Select } from "@mui/material";
import { parseInt } from "lodash";
import React, { useState } from "react";
import "./PaginatedTable.css";

function PaginatedTable({ rows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFirstPageButtonClick = () => {
    setPage(0);
  };

  const handleNextButtonClick = () => {
    setPage(page + 1);
  };

  const handleBackButtonClick = () => {
    setPage(page - 1);
  };

  const handleLastPageButtonClick = () => {
    setPage(Math.max(0, Math.ceil(rows.length / rowsPerPage) - 1));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isFirstPage = () => {
    return page === 0;
  };

  const isLastPage = () => {
    return page >= Math.ceil(rows.length / rowsPerPage) - 1;
  };

  return (
    <div className="paginatedtable_main">
      <table>
        <thead>
          <tr>
            <td>Roll No</td>
            <td>Name</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <tr key={row.roll}>
              <td>{row.roll}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              Rows per page :
              <Select
                value={rowsPerPage}
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
                disabled={isFirstPage()}
              >
                <FirstPageOutlined />
              </IconButton>
              <IconButton
                onClick={handleBackButtonClick}
                disabled={isFirstPage()}
              >
                <KeyboardArrowLeftOutlined />
              </IconButton>
              <span>{page + 1}</span>
              <IconButton
                onClick={handleNextButtonClick}
                disabled={isLastPage()}
              >
                <KeyboardArrowRightOutlined />
              </IconButton>
              <IconButton
                onClick={handleLastPageButtonClick}
                disabled={isLastPage()}
              >
                <LastPageOutlined />
              </IconButton>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default PaginatedTable;
