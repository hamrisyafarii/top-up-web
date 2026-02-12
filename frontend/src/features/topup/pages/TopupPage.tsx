import {useParams} from "react-router-dom";

const TopupPage = () => {
  const params = useParams();

  const id = params.id;

  return <div>This top up page with id: {id}</div>;
};

export default TopupPage;
