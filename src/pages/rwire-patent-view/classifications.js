import React, { useEffect, useState } from "react";
import CPCTable from "./CPCTable";
import ECLATable from "./ECLATable";
import IPCTable from "./IPCTable";
import JPFITable from "./JPFITable";
import USTable from "./USTable";

function Classifications({
  cpcd,
  ipcd,
  us,
  jpfi,
  ecla,
  values,
  extraClass,
  highlightword,
  isExact,
  queryKeywordsHighlightColor,
  classesTableData = [],
  onSearchForClassAndKeyword
}) {
  const [iPC, setIPC] = useState(false);
  const [cPC, setCPC] = useState(false);
  const [uS, setUS] = useState(false);
  const [jPFI, setJPFI] = useState(false);
  const [eCLA, setECLA] = useState(false);
  useEffect(() => {
    if (values.indexOf("A") !== -1) {
      setIPC(true);
    } else {
      setIPC(false);
    }
    if (values.indexOf("B") !== -1) {
      setCPC(true);
    } else {
      setCPC(false);
    }
    if (values.indexOf("C") !== -1) {
      setUS(true);
    } else {
      setUS(false);
    }
    if (values.indexOf("D") !== -1) {
      setJPFI(true);
    } else {
      setJPFI(false);
    }
    if (values.indexOf("E") !== -1) {
      setECLA(true);
    } else {
      setECLA(false);
    }
  }, [values]);

  return (
    <div>
      {(cpcd && cpcd.length > 0) ||
      (ipcd && ipcd.length > 0) ||
      (cpcd && cpcd.length > 0) ||
      (us && us.length > 0) ||
      (jpfi && jpfi.length > 0) ||
      (ecla && ecla.length > 0) ? (
        <>
          {iPC && (
            <IPCTable
              ipcd={ipcd}
              extraClass={extraClass}
              queryKeywordsHighlightColor={
                queryKeywordsHighlightColor
              }
              highlightword={highlightword}
              isExact={isExact}
              classesTableData={classesTableData}
              onSearchForClassAndKeyword={onSearchForClassAndKeyword}
            />
          )}
          {cPC && (
            <CPCTable
              cpcd={cpcd}
              extraClass={extraClass}
              queryKeywordsHighlightColor={
                queryKeywordsHighlightColor
              }
              highlightword={highlightword}
              isExact={isExact}
              classesTableData={classesTableData}
              onSearchForClassAndKeyword={onSearchForClassAndKeyword}
            />
          )}
          {uS && (
            <USTable
              us={us}
              extraClass={extraClass}
              queryKeywordsHighlightColor={
                queryKeywordsHighlightColor
              }
              highlightword={highlightword}
              isExact={isExact}
              classesTableData={classesTableData}
              onSearchForClassAndKeyword={onSearchForClassAndKeyword}
            />
          )}
          {jPFI && (
            <JPFITable
              jpfi={jpfi}
              extraClass={extraClass}
              queryKeywordsHighlightColor={
                queryKeywordsHighlightColor
              }
              highlightword={highlightword}
              isExact={isExact}
            />
          )}
          {eCLA && (
            <ECLATable
              ecla={ecla}
              extraClass={extraClass}
              queryKeywordsHighlightColor={
                queryKeywordsHighlightColor
              }
              highlightword={highlightword}
              isExact={isExact}
            />
          )}
        </>
      ) : (
        <p className="pt-2">Data not available</p>
      )}
    </div>
  );
}

export default Classifications;
