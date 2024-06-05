import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const ExcelExportHelper = ({ data }) => {
  const createDownLoadData = () => {
    handleExport().then((url) => {
      console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "student_report.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout = XLSX.write(workbook, wopts);

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length);

    console.log(buf);

    //create a 8 bit integer array
    const view = new Uint8Array(buf);

    console.log(view);
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
     // console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {
    const title = [{A:"Payment Report"  }, {}];

    let table1 = [
      {
        A: "Name",
        B: "Email ID",
        C: "Mobile No",
        D: "Machine ID",
        E: "Assigned Date",
      },
    ];

    data.forEach((row) => {
    //   const studentDetails = row.STUDENT_DETAILS;
      const marksDetails = row.MARKS;
const userdata=row;

      table1.push({
        A: userdata.user_name,
        B:userdata.user_Id,
        C:userdata.mobile_no,
        D:userdata.machine_id,
        E:userdata.machine_assigned_date,
      });

   
    });

    table1 = [{ A: "" },{B:""},{B:""}]
      .concat(table1)
      .concat([""])
    const finalData = [...title, ...table1];

    console.log(finalData);

    //create a new workbook
    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "vendingMachine_report");

   
    const workbookBlob = workbook2blob(wb);

    var headerIndexes = [];
    finalData.forEach((data, index) =>
      data["A"] === "Name" ? headerIndexes.push(index) : null
    );

    const totalRecords = data.length;

    const dataInfo = {
      titleCell: "C2",
      titleRange: "A1:E4",
      tbodyRange: `A3:H${finalData.length}`,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:E${headerIndexes[0] + 1}`
          : null,
     
      tFirstColumnRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
          : null,
      tLastColumnRange:
        headerIndexes?.length >= 1
          ? `E${headerIndexes[0] + 1}:E${totalRecords + headerIndexes[0] + 1}`
          : null,

    };

    return addStyle(workbookBlob, dataInfo);
  };

  const addStyle = (workbookBlob, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        sheet.usedRange().style({
          fontFamily: "Arial",
          verticalAlignment: "center",
        });

        sheet.column("A").width(15);
        sheet.column("B").width(15);
        sheet.column("C").width(15);
        sheet.column("E").width(15);
        // sheet.column("G").width(15);

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
        //   verticalAlignment: "center",
        });

        if (dataInfo.tbodyRange) {
          sheet.range(dataInfo.tbodyRange).style({
            horizontalAlignment: "center",
          });
        }

        sheet.range(dataInfo.theadRange).style({
           fill: "FFFD04",
        // fill:"#3385ff",black
          bold: true,
          horizontalAlignment: "center",
        //   border:{top: { style: "thin", color: "000000" },
        //   bottom: { style: "thin", color: "000000" },
        //   left: { style: "thin", color: "000000" },
        //   right: { style: "thin", color: "000000" }},
        });


        // if (dataInfo.tFirstColumnRange) {
        //   sheet.range(dataInfo.tFirstColumnRange).style({
        //     bold: true,
        //   });
        // }

        // if (dataInfo.tLastColumnRange) {
        //   sheet.range(dataInfo.tLastColumnRange).style({
        //     bold: true,
        //   });
        // }
      });

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <button
      onClick={() => {
        createDownLoadData();
      }}
      className="btn btn-primary float-end"
    >
      Export
    </button>
  );
};

export default ExcelExportHelper;
