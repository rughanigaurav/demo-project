
import { useTranslation, Trans } from "react-i18next";
import RWIRE_IMAGES from "../../common/common-functions/rwire-images";
const RWirePatentsHeader = (handleClick, isActive)=>{
    const { t } = useTranslation();
    return(
        <div className="header-patent-main">
            <Trans>
            <div className="header-patent-result">
              <div className="nav-details-patent">
                Search &gt; {t('fielded')} &gt; {t('result')}
              </div>
              <div className="tab-patents">
                <button> <img alt="" src={RWIRE_IMAGES.RwireSetting} />{t('Incremental')}</button>
                <button className={isActive ? 'bg-toggle' : ''} onClick={handleClick}>{t('edit_fielded')}</button>
                <button>{t('hide_query')}</button>
              </div>
            </div>
            </Trans>
          </div>
    )
}

export default RWirePatentsHeader;
