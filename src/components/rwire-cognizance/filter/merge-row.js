import { useEffect, useState } from "react";
import Edit from "../../../images/edit.svg";
import Close from "../../../images/close-icon-black.svg";
import checkIcon from "../../../images/checkbox-right.svg";

const MergeRow = (props) => {
  const { item, onSelect, selectData, listMergeData, listMerge, chartId, onSetChart, onGetResult, onChangeChartDataAsPerMerge, id } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(item.newLabel ? item.newLabel : item.label)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit])

  const handleClick = () => {
    onSelect(item.label);
  }

  const handleRemove = (e) => {

    if(item.data && item.data.length <= 2) {
      const innerList = item.data;

      listMergeData.splice(parseInt(id), 1);
      listMergeData.splice(id, 0, ...innerList);
    } else {

      listMergeData.splice(id, 0, {...item.data[parseInt(e.currentTarget.id)]});
      item.data.splice(parseInt(e.currentTarget.id), 1);
    }

    let newListMerge = {...listMerge};

    newListMerge[chartId] = {
      data: [...listMergeData]
    };

    onSetChart({listMerge: {...newListMerge}});

    onGetResult(newListMerge);

  }

  const handleEdit = () => {
    setIsEdit(!isEdit);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleBlur = () => {
    item.newLabel = value;

    let newListMerge = {...listMerge};

    newListMerge[chartId] = {
      data: [...listMergeData]
    };

    onSetChart({listMerge: {...newListMerge}});

    onChangeChartDataAsPerMerge(newListMerge);

    setValue(value);
    setIsEdit(false);
  }

  const handleEnter = (e) => {
    if(e.keyCode === 13) {
      e.preventDefault();
      return handleBlur();
    }
  }

  return (
    <div className="d-flex justify-content-start align-items-start px-2 merge-element">
      <div>
        <input type="checkbox"
          onClick={handleClick}
          checked={selectData.includes(item.label)}
        />
      </div>
      <div>
        {isEdit ?
          (<div className="d-flex">
              <input
                className="ms-2 merge-name-input form-control-sm"
                type={"text"}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleEnter}
              />
              <div className="px-2 input-submit cursor-pointer">
                <img src={checkIcon} alt="" width="20" height="20" />
              </div>
            </div>
          ) :
          <label className="ps-2">{item.newLabel ? item.newLabel : item.label}
            {item.data ? (<span onClick={handleEdit}><img src={Edit} className="ms-2" width="10" height="10" alt=""/></span>)

            : ""}
          </label>
        }
        <div className="flex-fill ps-3">
          {item.data ? (
            item.data.map((i, k) => {
              return (
                <div className="d-flex">
                  <span onClick={handleRemove} id={k}><img src={Close} className="me-2" width="10" height="10" alt=""/></span>
                  <label>{i.label}</label>
                </div>
              )
            })) : null
          }
        </div>
      </div>



    </div>
  );
}

export default MergeRow;
