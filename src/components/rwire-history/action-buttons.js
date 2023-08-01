import RWireButton from "../rwire-ui/rwire-button/rwire-button";
import reRunIcon from "../../images/refresh.svg";
import exportIcon from "../../images/export.svg";
import combineIcon from "../../images/combine-icon.svg";
import { useTranslation } from "react-i18next";

const Actionbuttons = (props) => {
    const { t } = useTranslation();

    const { selectedRows, onFetchHistory, onUpdateQueryCount, data, onExportHistory , setSelectedField} = props;

    const handleUpdateCount = async () => {

        await selectedRows.map(async(item, index) => {
            const filterItem = data.filter((i) => `${i.id}` === `${item}`);

            await onUpdateQueryCount(item, filterItem[0].query).then(async() => {
                if(selectedRows.length - 1 === index) {
                    await onFetchHistory();
                }
            });
        })
    }

    const handleExport = () => {
        onExportHistory();
    }
    const handleCombineClick = () =>{
        if(selectedRows.length > 1){
            setSelectedField("Combine")
        }
    }

    return (
        <div className="d-flex justify-content-between">
            <div>
                <RWireButton
                    cNameDiv="search-query"
                    buttonCName="input-button-text-form big-width"
                    name={t("history-update-count")}
                    buttonImg={reRunIcon}
                    onClick={handleUpdateCount}
                />
            </div>
            <div className="d-flex">
                <div className="">
                    <RWireButton
                        cNameDiv="search-query"
                        buttonCName="input-button-text-form"
                        name={t("history-update-combine")}
                        buttonImg={combineIcon}
                        onClick={handleCombineClick}
                    />
                </div>
                <div className="ms-2">
                    <RWireButton
                        cNameDiv="search-query"
                        buttonCName="input-button-text-form"
                        name={t("history-update-export")}
                        buttonImg={exportIcon}
                        onClick={handleExport}
                    />
                </div>
            </div>
        </div>
    )
}

export default Actionbuttons;
