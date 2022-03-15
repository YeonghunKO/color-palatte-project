import { useNavigate } from 'react-router';

function withNavigate(Component) {
  const Wrapper = props => {
    const navigation = useNavigate();
    return <Component {...props} navigation={navigation} />;
  };

  return Wrapper;
}

export default withNavigate;
