import { Link, useParams } from "react-router-dom";

const LocaleLink = (props) => {
  let { locale } = useParams();
  const { children, to, ...rest } = props;

  return (
    <Link to={`/${locale}/${to}`} {...rest}>
      {children}
    </Link>
  )
}

export default LocaleLink;
