import {
  FirstPageOutlined,
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  LastPageOutlined,
} from "@mui/icons-material";
import { CircularProgress, IconButton, MenuItem, Select } from "@mui/material";
import React from "react";
import "./PaginatedTable.css";

function PaginatedTable({
  rows,
  headers,
  totalPages,
  pageSize,
  pageNo,
  isFirst,
  isLast,
  loading,
  handleFirstPageButtonClick,
  handleNextButtonClick,
  handleBackButtonClick,
  handleLastPageButtonClick,
  handleChangeRowsPerPage,
  pageSizes,
}) {
  return (
    <div className="paginatedtable_main">
      {!loading ? (
        <table>
          <thead>
            <tr>
              {headers.map((label) => (
                <td>{label.label}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {headers.map((label) => (
                  <td>{row[label.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                Rows per page :
                <Select
                  value={pageSize}
                  onChange={(e) => handleChangeRowsPerPage(e.target.value)}
                  sx={{ m: 1, height: 30 }}
                >
                  {pageSizes.map((size) => (
                    <MenuItem value={size}>{size}</MenuItem>
                  ))}
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

export default PaginatedTable;
