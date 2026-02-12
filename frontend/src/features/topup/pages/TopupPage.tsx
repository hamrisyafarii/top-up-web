import {useParams} from "react-router-dom";

const TopupPage = () => {
  const params = useParams();

  const slug = params.slug;

  return <div>This top up page with slug: {slug}</div>;
};

export default TopupPage;
