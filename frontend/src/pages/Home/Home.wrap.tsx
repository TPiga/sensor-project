import { connect } from 'react-redux';
import Home from './Home';
import { getNumberOfMessages, selectNumberOfMessages } from 'redux/Home';
import { RootState } from 'redux/types';

const mapStateToProps = (state: RootState) => ({
  numberOfMessages: selectNumberOfMessages(state),
});

const mapDispatchToProps = {
  getNumberOfMessages: getNumberOfMessages.request,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
