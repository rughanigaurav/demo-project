import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import LayoutWrapper from "../layout-wrapper";
import { getUserProfile  } from "../action/app";
import { setQuery } from "../action/search-query";
import { useEffect } from "react";

const Container = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(!sessionStorage.getItem('token')) {

            navigate('/en/login');
        } else {

            props.onGetUserProfile();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <LayoutWrapper {...props} />;
};


const mapStateToProps = ({ app: { userName } }) => ({
    userName
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onGetUserProfile: getUserProfile,
      onSetQuery: setQuery
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Container);
