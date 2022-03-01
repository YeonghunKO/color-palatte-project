import { useParams } from 'react-router';

const withParams = Child => {
  return props => {
    const { id, colorId } = useParams();

    return <Child {...props} colorIdParam={colorId} PaleltteIdParam={id} />;
  };
};

export default withParams;
