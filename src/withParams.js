import { useParams } from 'react-router';

const withParams = Child => {
  return props => {
    const { id } = useParams();
    return <Child {...props} param={id} />;
  };
};

export default withParams;
